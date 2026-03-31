import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, AlertTriangle, CheckCircle, Leaf } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 p-8 text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Novaport AI</h1>
          <p className="text-slate-500">Instant Trade Compliance & Carbon Estimator for SME Exporters</p>
        </header>

        {/* Upload Zone */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
            <div className="w-full border-2 border-dashed border-blue-200 rounded-lg p-12 text-center hover:bg-blue-50 transition">
              <UploadCloud className="mx-auto h-12 w-12 text-blue-400 mb-4" />
              <input 
                type="file" 
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <button 
              type="submit" 
              disabled={!file || loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? 'Analyzing Document...' : 'Run Compliance Check'}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>

        {/* Results Dashboard */}
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Risk Score Card */}
            <div className={`col-span-1 p-6 rounded-xl border-2 flex flex-col items-center justify-center text-center
              ${results.risk_score === 'Red' ? 'bg-red-50 border-red-200 text-red-700' : 
                results.risk_score === 'Yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 
                'bg-green-50 border-green-200 text-green-700'}`}
            >
              {results.risk_score === 'Green' ? <CheckCircle size={48} className="mb-4" /> : <AlertTriangle size={48} className="mb-4" />}
              <h2 className="text-2xl font-bold uppercase">{results.risk_score} STATUS</h2>
              <p className="mt-2 text-sm font-medium">
                {results.risk_score === 'Red' ? 'Do not ship. Critical compliance failures detected.' : 
                 results.risk_score === 'Yellow' ? 'Action required before shipping.' : 
                 'Shipment cleared. No major issues detected.'}
              </p>
            </div>

            {/* Compliance Issues */}
            <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-4">Compliance Report</h3>
              {results.compliance_issues.length === 0 ? (
                <p className="text-slate-500">No issues found. Everything looks great!</p>
              ) : (
                <ul className="space-y-4">
                  {results.compliance_issues.map((issue, idx) => (
                    <li key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-slate-800">{issue.issue}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          issue.severity === 'High' ? 'bg-red-100 text-red-700' : 
                          issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-blue-100 text-blue-700'
                        }`}>{issue.severity}</span>
                      </div>
                      <p className="text-sm text-slate-600"><strong>Fix:</strong> {issue.fix_instruction}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Extracted Data Card */}
            <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-4">Extracted Data</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><span className="text-slate-500">HS Code:</span> <span className="font-mono font-medium">{results.extracted_data.hs_code}</span></p>
                <p><span className="text-slate-500">Destination:</span> {results.extracted_data.destination_country}</p>
                <p><span className="text-slate-500">Weight:</span> {results.extracted_data.weight_kg} kg</p>
                <p><span className="text-slate-500">Method:</span> <span className="capitalize">{results.extracted_data.shipping_method}</span></p>
              </div>
            </div>

            {/* Carbon Footprint Card */}
            <div className="col-span-1 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-2 mb-4 text-emerald-800">
                <Leaf size={24} />
                <h3 className="text-lg font-bold">Carbon Impact</h3>
              </div>
              <p className="text-3xl font-black text-emerald-900">{results.carbon_footprint.estimated_co2_kg} <span className="text-sm font-medium text-emerald-700">kg CO₂</span></p>
              <p className="text-sm text-emerald-700 mt-2">Using {results.carbon_footprint.current_method} freight.</p>
              
              <div className="mt-4 pt-4 border-t border-emerald-200">
                <p className="text-sm text-emerald-800">
                  <strong>Tip:</strong> Switch to {results.carbon_footprint.greener_alternative} to save {results.carbon_footprint.potential_savings_kg} kg CO₂.
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;