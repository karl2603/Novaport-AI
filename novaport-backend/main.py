from fastapi import FastAPI, File, UploadFile, HTTPException
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
# SCHEMAS FOR PAGE 3: HS CODE VALIDATION
# ==========================================
class HSCodeResponse(BaseModel):
    product_description: str
    declared_code: str
    is_match: bool
    confidence_level: str 
    suggested_correct_code: str
    alternatives: List[str]
    reasoning: str

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
    prompt = """You are an elite customs AI. Your task is to extract EVERY piece of information from this trade document with perfect accuracy.

    CRITICAL RULES:
    1. Extract ALL line items separately — if the invoice has 10 products, return 10 objects in line_items.
    2. For each line item, find or infer the most likely HS code based on the product description.
    3. Never combine multiple products into one string — each product is its own line item.
    4. If a field is genuinely missing from the document, add its exact name to the missing_fields list.
    5. For weight: if individual weights are listed per item, extract them. Sum them for total_weight_kg if a stated total is missing.
    6. For quantities: extract exactly as written (e.g. "500 PCS", "300 MTR").
    7. For HS codes: use 8-digit Indian export HS codes where possible, 6-digit minimum.
    8. Incoterms: FOB, CIF, CFR, EXW, DAP — extract exactly as stated.
    9. Shipping method: "Air", "Sea", "Rail", or "Road". Infer from Carrier/AWB/BL if needed.
    10. If invoice number or date not found, set as "Not Specified".

    PRODUCT-SPECIFIC HS CODE GUIDANCE:
    - Cotton woven shirts → 62052000
    - Cotton knitted shirts/t-shirts → 61091000  
    - Cotton fabric rolls → 52081190
    - Polyester blend garments → 62059090
    - Denim jeans → 62034200
    - Cotton bedsheets → 63031990
    - Cotton towels → 63021000
    - Textile waste/scrap → 63101000
    - Women's blouses woven → 62061000

    Extract everything. Miss nothing. Be precise."""
    return await process_with_gemini(file, prompt, ExtractionResponse)

@app.post("/api/hscode")
async def validate_hscode(file: UploadFile = File(...)):
    prompt = """You are an AI Customs Broker. Find the primary product description and its declared HS code on this document. 
    Analyze if they logically match. Give a confidence level. If wrong, provide the correct 6-digit HS code, alternatives, and explain the mismatch."""
    return await process_with_gemini(file, prompt, HSCodeResponse)

@app.post("/api/compliance")
async def check_compliance(file: UploadFile = File(...)):
    prompt = """
    You are a customs compliance AI system. Analyze this commercial invoice and detect ALL errors and compliance risks.
    STEP 1: EXTRACT HS Codes, Descriptions, Origins, Destinations, Weights, Values, Method.
    STEP 2: VALIDATE:
    1. HS CODE: Present, 6-8 digits, matches product.
    2. DESCRIPTIONS: Specific, flag vague terms.
    3. MISSING FIELDS: HS code, weight, origin, values.
    4. CONSISTENCY: Math totals match line items.
    5. TRADE RULES: India -> UAE implicitly needs Certificate of Origin.
    6. RISK ANALYSIS: Suspicious pricing/mismatches.
    STEP 3: OUTPUT GREEN (No issues), YELLOW (Minor/Moderate), RED (Critical). Provide strict fixes.
    """
    result = await process_with_gemini(file, prompt, ComplianceResponse)
    carbon_data = calculate_carbon_footprint(
        result.get("extracted_data", {}).get("total_weight", 0), 
        result.get("extracted_data", {}).get("shipment_method", "air")
    )
    result["carbon_footprint"] = carbon_data
    return result