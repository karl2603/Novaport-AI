from fastapi import FastAPI, File, UploadFile, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import tempfile
from google import genai
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- WARNING: PASTE YOUR ACTUAL API KEY HERE ---
client = genai.Client(api_key="AIzaSyCy6E_Qo5U1b0Fze6Nv96Auvw41vHsmSPg")

# ==========================================
# SCHEMAS FOR PAGE 1: EXTRACTION
# ==========================================
class LineItem(BaseModel):
    product_description: str
    hs_code: str
    quantity: str
    weight_kg: float
    value_usd: float

class ExtractionResponse(BaseModel):
    document_type: str
    invoice_number: str
    invoice_date: str
    shipper_name: str
    consignee_name: str
    origin_country: str
    destination_country: str
    port_of_loading: str
    port_of_discharge: str
    shipping_method: str
    incoterms: str
    total_weight_kg: float
    total_value_usd: float
    line_items: List[LineItem]
    missing_fields: List[str]

# ==========================================
# SCHEMAS FOR PAGE 3: HS CODE GENERATOR (TEXT)
# ==========================================
class HSCodeRequest(BaseModel):
    description: str

class AlternativeHSCode(BaseModel):
    code: str
    description: str
    confidence_percentage: int

class HSCodeGeneratorResponse(BaseModel):
    primary_hs_code: str
    confidence_percentage: int
    confidence_label: str # "Very High", "High", "Medium", "Low"
    explanation: str
    official_description: str
    alternatives: List[AlternativeHSCode] # Must be exactly 3
    special_notes: str
    duty_rate: str
    required_certificates: List[str]

# ==========================================
# SCHEMAS FOR PAGE 2: COMPLIANCE CHECKER
# ==========================================
class ComplianceIssue(BaseModel):
    type: str
    severity: str 
    description: str
    fix: str

class ExtractedComplianceData(BaseModel):
    hs_code: str
    destination: str
    total_weight: float
    shipment_method: str

class ComplianceResponse(BaseModel):
    status: str 
    compliance_report: List[ComplianceIssue]
    extracted_data: ExtractedComplianceData

# Helper function for Carbon Math
def calculate_carbon_footprint(weight_kg: float, method: str) -> dict:
    distance_km = 3000
    factors = {"air": 1.500, "sea": 0.015, "rail": 0.030}
    factor = factors.get(method.lower() if method else "air", 1.500) 
    emissions = (weight_kg / 1000) * distance_km * factor
    alt_method = "sea" if (method and method.lower() == "air") else "rail"
    alt_emissions = (weight_kg / 1000) * distance_km * factors.get(alt_method, 0.015)
    
    return {
        "current_method": method.capitalize() if method else "Air",
        "estimated_co2_kg": round(emissions, 2),
        "greener_alternative": alt_method.capitalize(),
        "potential_savings_kg": round(max(0, emissions - alt_emissions), 2)
    }

async def process_with_gemini(file: UploadFile, prompt: str, schema):
    allowed_extensions = ('.pdf', '.png', '.jpg', '.jpeg')
    if not file.filename.lower().endswith(allowed_extensions):
        raise HTTPException(status_code=400, detail="Please upload a PDF or Image.")

    temp_file_path = None
    uploaded_gemini_file = None

    try:
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        uploaded_gemini_file = client.files.upload(file=temp_file_path)

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[uploaded_gemini_file, prompt],
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=schema,
            ),
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Gemini Error: {e}")
        raise HTTPException(status_code=500, detail="AI Vision processing failed.")
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        if uploaded_gemini_file:
            try:
                client.files.delete(name=uploaded_gemini_file.name)
            except Exception:
                pass

# ==========================================
# API ENDPOINTS
# ==========================================

@app.post("/api/extract")
async def extract_document(file: UploadFile = File(...)):
    prompt = """You are an elite customs AI. Extract EVERY piece of information from this trade document perfectly.
    Extract all line items separately. Missing fields go to missing_fields. Output strictly matching the schema."""
    return await process_with_gemini(file, prompt, ExtractionResponse)

@app.post("/api/hscode")
async def generate_hscode(request: HSCodeRequest):
    try:
        prompt = f"""
        You are an elite customs classification AI. The user has provided the following product description:
        "{request.description}"

        CLASSIFICATION RULES YOU MUST FOLLOW:
        1. Use 8-digit HS codes in Indian format (first 6 international, last 2 India-specific).
        2. Read carefully — material composition matters immensely.
        3. Consider primary function and material. Apply GRI if multiple headings apply.
        4. Confidence Rules:
           - 90-100% = clear, obvious code
           - 70-89% = good description, minor ambiguity
           - 50-69% = could reasonably fall under 2-3 headings
           - Below 50% = too vague, note this in special_notes
        5. ALWAYS provide EXACTLY 3 alternatives.
        6. For duty_rate, provide standard Indian export duty or "Refer to Customs Tariff".
        7. For required_certificates, list typical Indian export certs (e.g., APEDA, BIS, Phytosanitary).

        Return the data strictly matching the requested JSON schema.
        """
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=HSCodeGeneratorResponse,
            ),
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Gemini Error: {e}")
        raise HTTPException(status_code=500, detail="AI Text processing failed.")

@app.post("/api/compliance")
async def check_compliance(file: UploadFile = File(...)):
    prompt = """
    You are a customs compliance AI system. Analyze this commercial invoice and detect ALL errors and compliance risks.
    Determine STATUS: GREEN, YELLOW, or RED based on strict trade regulations.
    """
    result = await process_with_gemini(file, prompt, ComplianceResponse)
    carbon_data = calculate_carbon_footprint(
        result.get("extracted_data", {}).get("total_weight", 0), 
        result.get("extracted_data", {}).get("shipment_method", "air")
    )
    result["carbon_footprint"] = carbon_data
    return result