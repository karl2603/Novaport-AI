import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, AlertTriangle, CheckCircle, Leaf, ShieldAlert } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/analyze-document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(response.data);
    } catch (err) {
      setError('Failed to analyze document. Ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-black text-blue-950 mb-2 tracking-tight">Novaport AI</h1>
          <p className="text-slate-500 font-medium">Automated Trade Compliance & Risk Analysis Engine</p>
        </header>

        {/* Upload Zone */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
            <div className="w-full border-2 border-dashed border-blue-200 rounded-xl p-12 text-center hover:bg-blue-50 transition cursor-pointer relative">
              <UploadCloud className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <input 
                type="file" 
                accept=".pdf, .png, .jpg, .jpeg"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <p className="text-slate-600 font-medium mb-1">
                {file ? file.name : "Drag and drop your commercial invoice"}
              </p>
              <p className="text-sm text-slate-400">Supports PDF, PNG, JPG</p>
            </div>
            <button 
              type="submit" 
              disabled={!file || loading}
              className="bg-blue-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition shadow-md"
            >
              {loading ? 'Analyzing with Customs Engine...' : 'Run Compliance Audit'}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4 font-medium">{error}</p>}
        </div>

        {/* Results Dashboard */}
        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Status & Extraction */}
            <div className="col-span-1 space-y-6">
              
              {/* Risk Score Card */}
              <div className={`p-8 rounded-2xl border-2 flex flex-col items-center justify-center text-center shadow-sm
                ${results.risk_score === 'Red' ? 'bg-red-50 border-red-200 text-red-700' : 
                  results.risk_score === 'Yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 
                  'bg-green-50 border-green-200 text-green-700'}`}
              >
                {results.risk_score === 'Green' ? <CheckCircle size={56} className="mb-4" /> : <ShieldAlert size={56} className="mb-4" />}
                <h2 className="text-3xl font-black uppercase tracking-wide">{results.risk_score} STATUS</h2>
                <p className="mt-3 text-sm font-semibold px-4 py-1 rounded-full bg-white/50">
                  {results.risk_score === 'Red' ? 'Do not ship. Critical compliance failures detected.' : 
                   results.risk_score === 'Yellow' ? 'Action required before shipping.' : 
                   'Shipment cleared. No major issues detected.'}
                </p>
              </div>

              {/* Extracted Data Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Extracted Shipment Data</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Primary HS Code</span>
                    <span className="font-mono font-bold text-slate-800">{results.extracted_data.hs_code}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Destination</span>
                    <span className="font-medium text-slate-800">{results.extracted_data.destination_country}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Total Weight</span>
                    <span className="font-medium text-slate-800">{results.extracted_data.weight_kg} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Method</span>
                    <span className="font-medium text-slate-800">{results.extracted_data.shipping_method}</span>
                  </div>
                </div>
              </div>

              {/* Carbon Footprint Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-emerald-800">
                  <Leaf size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Carbon Impact</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <p className="text-4xl font-black text-emerald-900">{results.carbon_footprint.estimated_co2_kg}</p>
                  <span className="text-sm font-bold text-emerald-700">kg CO₂</span>
                </div>
                <p className="text-xs font-semibold text-emerald-700/70 mt-1 uppercase tracking-wider">
                  Using {results.carbon_footprint.current_method} freight
                </p>
                
                <div className="mt-5 pt-4 border-t border-emerald-200/50 bg-white/40 p-3 rounded-lg">
                  <p className="text-sm text-emerald-900 font-medium">
                    💡 <strong className="text-emerald-700">Suggestion:</strong> Switch to {results.carbon_footprint.greener_alternative} freight to save <span className="font-bold underline decoration-emerald-400">{results.carbon_footprint.potential_savings_kg} kg CO₂</span>.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Compliance Audit Report */}
            <div className="col-span-1 lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <AlertTriangle className="text-slate-400" size={24} />
                <h3 className="text-2xl font-bold text-slate-800">Compliance Audit Report</h3>
              </div>

              {results.compliance_issues.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-300 mb-4" />
                  <p className="text-lg font-medium text-slate-500">No regulatory issues found. Ready for customs clearance.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.compliance_issues.map((issue, idx) => (
                    <div key={idx} className="p-6 rounded-xl border border-slate-100 bg-slate-50 shadow-sm relative overflow-hidden">
                      {/* Left color bar indicating severity */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                          issue.severity.toUpperCase() === 'HIGH' ? 'bg-red-500' : 
                          issue.severity.toUpperCase() === 'MEDIUM' ? 'bg-yellow-400' : 
                          'bg-blue-400'
                        }`} 
                      />
                      
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Issue {idx + 1}</span>
                          <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">
                            {issue.type}
                          </span>
                        </div>
                        <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                          issue.severity.toUpperCase() === 'HIGH' ? 'bg-red-100 text-red-700 border border-red-200' : 
                          issue.severity.toUpperCase() === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 
                          'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                          {issue.severity}
                        </span>
                      </div>
                      
                      <p className="text-slate-800 font-medium leading-relaxed mb-4">
                        {issue.description}
                      </p>
                      
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <p className="text-sm">
                          <span className="font-black text-slate-800 uppercase tracking-wider text-xs mr-2">Fix:</span> 
                          <span className="text-slate-600 font-medium">{issue.fix}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;