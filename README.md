# Novaport AI

**Autonomous Trade Compliance & Export Document Intelligence**

Novaport AI is an enterprise-grade trade compliance infrastructure designed to replace manual regulatory checks with an autonomous, AI-driven workflow. Built to eliminate international trade bottlenecks before cargo leaves the dock.

## ⚠️ The Problem

Global supply chains are frequently delayed by manual document verification, complex HS code classification, and unforeseen regulatory anomalies. These bottlenecks result in:
* **Customs Holds:** Caused by missing or conflicting information across commercial invoices and shipping bills.
* **Tariff Misclassification:** Manual HS code lookups are prone to human error, leading to regulatory fines or delayed clearance.
* **Opaque ESG Tracking:** Difficulty in accurately calculating Scope 3 transit emissions to meet modern global sustainability targets.

## 💡 The Solution

Novaport utilizes an LLM-driven architecture to digitize and audit trade documents in real-time. Core modules include:
1. **Cognitive Extraction:** Parses unstructured commercial PDFs into strict JSON schemas, mapping line items, entities, and incoterms with zero manual data entry.
2. **Automated Compliance Auditing:** Cross-references shipments against global trade corridors to preemptively detect missing certificates, mathematical anomalies, and regulatory risks. Outputs a clear "Clear to Ship" or "Hold Probability" risk matrix.
3. **Generative HS Classification:** Uses NLP to instantly predict the exact 6-digit global tariff and country-specific extensions based on product descriptions, materials, and intended use.
4. **ESG Intelligence:** Real-time Scope 3 Carbon Footprint analysis using the GLEC framework, comparing transit modes (Air, Sea, Rail) to optimize for both cost and sustainability.

## 🛠 Tech Stack

* **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons
* **Backend:** Python 3, FastAPI, Uvicorn
* **AI/Inference:** Google Gemini 2.5 Flash (Multimodal Document Processing & NLP)

---

## 📁 Repository Structure

```text
novaport/
├── backend/
│   ├── .env                   # Environment variables (Add your Gemini API key here)
│   ├── main.py                # Core FastAPI application and AI inference logic
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx            # Main React application and UI components
│   │   ├── index.css          # Tailwind directives
│   │   └── main.jsx           # React DOM rendering
│   ├── package.json           # Node dependencies and scripts
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── vite.config.js         # Vite bundler configuration
└── README.md
🚀 Local Development Setup
Prerequisites
Node.js (v18+)

Python (3.8+)

A valid Google Gemini API Key

1. Backend Setup (FastAPI)
The backend serves as the core orchestration layer for AI inference and data formatting.

Bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv

# On macOS/Linux:
source venv/bin/activate  
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment Variables
# Create a .env file in the root of the /backend directory and add your API key
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Start the development server
uvicorn main:app --reload --port 8000
The API will be available at http://localhost:8000. You can view the interactive Swagger docs at http://localhost:8000/docs.

2. Frontend Setup (React/Vite)
The frontend is a fully responsive, animated SPA that interacts with the FastAPI backend.

Bash
# Open a new terminal instance and navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
The application will be running at http://localhost:5173 (or the port specified in your terminal).