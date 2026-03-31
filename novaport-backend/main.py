import fitz  # PyMuPDF
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from google import genai
from pydantic import BaseModel

# Initialize FastAPI
app = FastAPI()

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- WARNING: PASTE YOUR ACTUAL API KEY HERE ---
# It should look something like "AIzaSy..."
client = genai.Client(api_key="AIzaSyBjcRCX7_q5Hvpn6FN5GHdvGSf1uGpy88o")

# Define the exact JSON structure we want back from the AI
class ComplianceIssue(BaseModel):
    severity: str
    issue: str
    fix_instruction: str

class ExtractedData(BaseModel):
    shipper: str
    consignee: str
    hs_code: str
    product_description: str
    weight_kg: float
    shipping_method: str
    origin_country: str
    destination_country: str

class AnalysisResult(BaseModel):
    extracted_data: ExtractedData
    compliance_issues: list[ComplianceIssue]
    risk_score: str

def calculate_carbon_footprint(weight_kg: float, distance_km: float, method: str) -> dict:
    """A simple algorithmic calculation for carbon footprint, no AI needed."""
    factors = {"air": 0.500, "sea": 0.015, "rail": 0.030}
    factor = factors.get(method.lower(), 0.500) 
    
    emissions = (weight_kg / 1000) * distance_km * factor
    
    alt_method = "sea" if method.lower() == "air" else "rail"
    alt_emissions = (weight_kg / 1000) * distance_km * factors.get(alt_method, 0.015)
    saved = max(0, emissions - alt_emissions)

    return {
        "current_method": method,
        "estimated_co2_kg": round(emissions, 2),
        "greener_alternative": alt_method,
        "potential_savings_kg": round(saved, 2)
    }

@app.post("/analyze-document")
async def analyze_document(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported for this MVP.")

    try:
        # 1. Read and Extract Text from PDF
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")
        text_content = ""
        for page in doc:
            text_content += page.get_text()
        doc.close()

        # 2. Call Gemini using the NEW SDK and Pydantic Schema
        prompt = f"""
        You are an elite customs compliance AI for DP World. Analyze the following trade document text.
        Extract the shipment details and cross-reference them against these strict rules:
        
        RULES:
        1. Every document MUST have a 6-digit HS Code. If missing, severity is HIGH.
        2. The HS code MUST logically match the product description. If it mismatches (e.g., code for spices applied to electronics), severity is HIGH and flag as RED risk.
        3. Weight and Destination Country are mandatory. If missing, severity is MEDIUM.
        4. If shipping from India to UAE, a Certificate of Origin is implicitly required. Note this as a LOW severity reminder.

        Based on these rules, assess the document. 
        If there are HIGH severity issues, Risk Score is 'Red'. 
        If only MEDIUM/LOW, Risk Score is 'Yellow'. 
        If perfectly compliant, Risk Score is 'Green'.

        Document Text:
        {text_content}
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=AnalysisResult,
            ),
        )
        
        analysis = json.loads(response.text)

        # 3. Calculate Carbon Footprint (Default to 1000kg and 3000km if missing)
        weight = analysis["extracted_data"].get("weight_kg") or 1000
        method = analysis["extracted_data"].get("shipping_method") or "air"
        carbon_data = calculate_carbon_footprint(weight, 3000, method)

        analysis["carbon_footprint"] = carbon_data

        return analysis

    except Exception as e:
        print(f"Error during analysis: {e}")
        raise HTTPException(status_code=500, detail="AI processing failed. Please try again.")