from fastapi import FastAPI, File, UploadFile, HTTPException, Body, Form
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import tempfile
from google import genai
from pydantic import BaseModel
from typing import Optional, List
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

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
    currency: Optional[str] = "USD"
    payment_terms: Optional[str] = "N/A"
    purchase_order_number: Optional[str] = "N/A"

class HSCodeRequest(BaseModel):
    description: str
    language: str = "English"

class AlternativeHSCode(BaseModel):
    code: str
    description: str
    confidence_percentage: int

class HSCodeGeneratorResponse(BaseModel):
    primary_hs_code: str
    confidence_percentage: int
    confidence_label: str 
    explanation: str
    official_description: str
    alternatives: List[AlternativeHSCode] 
    special_notes: str
    duty_rate: str
    required_certificates: List[str]

class ChatRequest(BaseModel):
    message: str
    language: str = "English"

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
    customs_hold_probability: str 
    estimated_loss: str           
    headline_action: str           
    compliance_report: List[ComplianceIssue]
    extracted_data: ExtractedComplianceData

def calculate_carbon_footprint(weight_kg: float, origin: str, destination: str, shipping_method: str):
    method = str(shipping_method).lower()
    if any(word in method for word in ["air", "flight", "dhl", "fedex", "express"]):
        factor = 0.500
        mode_name = "Air Freight"
    elif any(word in method for word in ["sea", "ocean", "ship", "vessel", "fcl", "lcl"]):
        factor = 0.015
        mode_name = "Ocean Freight"
    elif any(word in method for word in ["rail", "train"]):
        factor = 0.030
        mode_name = "Rail Freight"
    else:
        factor = 0.060
        mode_name = "Road Freight"

    origin_lower = str(origin).lower()
    dest_lower = str(destination).lower()
    
    distance_km = 5000 
    
    if "india" in origin_lower:
        if "uae" in dest_lower or "dubai" in dest_lower: distance_km = 2200 
        elif "usa" in dest_lower or "america" in dest_lower: distance_km = 13500
        elif "uk" in dest_lower or "europe" in dest_lower: distance_km = 7200
        elif "singapore" in dest_lower: distance_km = 3000
    elif "china" in origin_lower:
        if "usa" in dest_lower: distance_km = 11600
        elif "europe" in dest_lower: distance_km = 8000
        elif "uae" in dest_lower: distance_km = 6000

    weight_tons = float(weight_kg) / 1000.0 if weight_kg else 1.0 
    co2_kg = weight_tons * distance_km * factor

    trees_needed = max(1, int(co2_kg / 21)) 
    smartphones = int(co2_kg / 0.0082) 

    potential_savings = 0
    if mode_name == "Air Freight":
        ocean_co2 = weight_tons * distance_km * 0.015
        potential_savings = co2_kg - ocean_co2

    return {
        "co2_emissions_kg": round(co2_kg, 2),
        "distance_km": distance_km,
        "mode_used": mode_name,
        "trees_equivalent": trees_needed,
        "smartphones_equivalent": f"{smartphones:,}", 
        "potential_savings_kg": round(potential_savings, 2)
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
                temperature=0.1
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

@app.post("/api/extract")
async def extract_document(
    file: UploadFile = File(...),
    requested_fields: str = Form(default="ALL"),
    language: str = Form(default="English")
):
    prompt = f"""You are an elite customs AI. Extract information from this trade document.
    CRITICAL INSTRUCTION: The user ONLY wants to extract the following specific sections: {requested_fields}.
    If a field is NOT in that list, ignore it and return "N/A" for strings or 0 for numbers.
    If 'Products' or 'Line Items' is requested, extract all line items perfectly.
    
    LANGUAGE INSTRUCTION: Keep all JSON keys exactly in English, but translate all extracted string values, product descriptions, and output text into {language}.
    Output strictly matching the JSON schema."""
    
    return await process_with_gemini(file, prompt, ExtractionResponse)

@app.post("/api/chat")
async def trade_assistant_chat(request: ChatRequest):
    try:
        prompt = f"""
        You are 'NovaPort', DP World's elite trade compliance and logistics assistant.
        The user is asking: "{request.message}"
        
        If they are asking about shipping goods between specific countries, 
        provide a clear, bulleted checklist of the MANDATORY documents required for export and import.
        Always include standard documents AND any specific certificates required for that specific route.
        Keep your response concise, professional, and easy to read.
        
        CRITICAL: You must write your entire response fluently in {request.language}.
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return {"reply": response.text}
    except Exception as e:
        print(f"Chatbot Error: {e}")
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail="Chat processing failed.")

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

        LANGUAGE INSTRUCTION: Keep all JSON schema keys exactly as requested in English. However, translate ALL text values (explanation, official_description, alternatives description, special_notes, required_certificates, confidence_label) into {request.language}.
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
async def check_compliance(
    file: UploadFile = File(...),
    language: str = Form(default="English")
):
    prompt = f"""
    You are a highly practical international customs auditor. 
    
    STEP 1: Identify the exact type of trade document attached.
    
    STEP 2: Perform a compliance scan based ONLY on critical international trade requirements.
    CRITICAL INSTRUCTION: DO NOT hallucinate errors. ONLY flag actual missing critical data (missing HS codes, tax IDs, math mismatches, Incoterms, etc.).

    STEP 3: Calculate the exact `document_accuracy_rate` using this STRICT MATH:
    Start at 100%, then deduct:
    - 25% per CRITICAL/HIGH error.
    - 10% per MEDIUM error.
    - 5% per MINOR error.

    STEP 4: Determine status based on Accuracy:
    - GREEN: 100% (ZERO errors). estimated_loss MUST be "₹0".
    - YELLOW: 75%-95% (1-3 minor/medium errors).
    - RED: 74% or lower (Critical errors).
    
    LANGUAGE INSTRUCTION: Keep all JSON keys exactly in English. Translate all string VALUES (especially headline_action, descriptions, fixes, and extracted text) into {language}. Keep the status exact strings as RED, YELLOW, or GREEN.
    """
    
    result = await process_with_gemini(file, prompt, ComplianceResponse)
    
    try:
        extracted = result.get("extracted_data", {})
        weight = extracted.get("total_weight", 500.0)
        dest = extracted.get("destination", "UAE")
        method = extracted.get("shipment_method", "air")
        
        carbon_data = calculate_carbon_footprint(weight, "India", dest, method)
        result["carbon_footprint"] = carbon_data
    except Exception as e:
        print(f"Carbon calculation skipped: {e}")
        
    return result