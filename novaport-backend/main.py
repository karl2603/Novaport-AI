from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import tempfile
from google import genai
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- WARNING: PASTE YOUR ACTUAL API KEY HERE ---
client = genai.Client(api_key="AIzaSyDx-J0k2X5rZvFRmQjzkLOxof_lq6X636c")

# Upgraded Schema to match the Elite Customs Officer output
class ComplianceIssue(BaseModel):
    type: str
    severity: str
    description: str
    fix: str

class ExtractedData(BaseModel):
    hs_code: str
    destination_country: str
    weight_kg: float
    shipping_method: str

class AnalysisResult(BaseModel):
    extracted_data: ExtractedData
    compliance_issues: list[ComplianceIssue]
    risk_score: str

def calculate_carbon_footprint(weight_kg: float, distance_km: float, method: str) -> dict:
    factors = {"air": 1.500, "sea": 0.015, "rail": 0.030} # Adjusted air factor for realistic long-haul cargo
    factor = factors.get(method.lower(), 1.500) 
    
    emissions = (weight_kg / 1000) * distance_km * factor
    
    alt_method = "sea" if method.lower() == "air" else "rail"
    alt_emissions = (weight_kg / 1000) * distance_km * factors.get(alt_method, 0.015)
    saved = max(0, emissions - alt_emissions)

    return {
        "current_method": method.capitalize() if method else "Unknown",
        "estimated_co2_kg": round(emissions, 2),
        "greener_alternative": alt_method.capitalize(),
        "potential_savings_kg": round(saved, 2)
    }

@app.post("/analyze-document")
async def analyze_document(file: UploadFile = File(...)):
    allowed_extensions = ('.pdf', '.png', '.jpg', '.jpeg')
    if not file.filename.lower().endswith(allowed_extensions):
        raise HTTPException(status_code=400, detail="Please upload a PDF or an Image (PNG/JPG).")

    temp_file_path = None
    uploaded_gemini_file = None

    try:
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        uploaded_gemini_file = client.files.upload(file=temp_file_path)

        # The Elite Customs Officer Prompt
        prompt = """
        You are an elite customs compliance AI system for DP World. 
        Your task is to visually analyze the attached commercial document and detect ALL possible errors, inconsistencies, and compliance risks.
        You must behave exactly like a real customs officer and logistics compliance expert.

        STEP 1: VALIDATION RULES
        Check ALL of the following:
        1. HS CODE VALIDATION: Must be present for every item (6-8 digits). Must logically match the product description. 
        2. PRODUCT DESCRIPTION: Must be specific. Flag vague terms.
        3. MISSING FIELDS: Detect missing overall weights, origins, or values.
        4. DATA CONSISTENCY: The mathematical sum of item totals MUST equal the invoice subtotal/total. Verify weight consistency.
        5. TRADE COMPLIANCE: Dynamically apply customs rules for major trade corridors (including India to UAE, US, EU, UK, and Singapore). Check if the declared value triggers any additional permit requirements, if the product category has restrictions for the destination, and if any mandatory filings (like Certificates of Origin) are missing.
        6. RISK ANALYSIS: Detect suspicious pricing, mismatches, or missing totals.

        STEP 2: SCORING
        Determine STATUS:
        - 'Green' -> No issues
        - 'Yellow' -> Minor / moderate issues (like missing Certificate of Origin)
        - 'Red' -> Critical issues (like mathematical total mismatches, severe HS code mismatches)

        STEP 3: EXTRACTION
        Extract the primary HS Code, Destination, Total Weight (calculate manually if unit weights exist but total is missing, otherwise return 0), and infer Shipment Method (e.g., DHL implies Air).
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[uploaded_gemini_file, prompt],
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=AnalysisResult,
            ),
        )
        
        analysis = json.loads(response.text)

        # Carbon Math Integration
        weight = analysis["extracted_data"].get("weight_kg") or 0
        method = analysis["extracted_data"].get("shipping_method") or "air"
        
        # Default distance 3000km for Chennai to Dubai demo
        analysis["carbon_footprint"] = calculate_carbon_footprint(weight, 3000, method)

        return analysis

    except Exception as e:
        print(f"Error during analysis: {e}")
        raise HTTPException(status_code=500, detail="AI Vision processing failed. Please try again.")
    
    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        if uploaded_gemini_file:
            try:
                client.files.delete(name=uploaded_gemini_file.name)
            except Exception:
                pass