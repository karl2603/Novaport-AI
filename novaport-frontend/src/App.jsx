import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, AlertTriangle, CheckCircle, Leaf, ShieldAlert, 
  FileText, Cpu, Activity, Loader2, ArrowRight, Package, MapPin, 
  Globe, DollarSign, Calendar, Hash, Ship, Plane, AlertCircle, ListPlus, Sparkles, Zap, Info
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const pageVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1], staggerChildren: 0.05 } },
  exit: { opacity: 0, y: -15, filter: 'blur(8px)', transition: { duration: 0.2 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } }
};

// --- COMPONENTS ---
const UploadBox = ({ file, setFile, onUpload, loading, title, description, buttonText, icon: Icon }) => (
  <motion.div variants={cardVariants} className="mt-8 text-center max-w-2xl mx-auto">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center justify-center p-4 bg-white shadow-sm border border-slate-200 text-slate-800 rounded-3xl mb-8">
      <Icon size={36} strokeWidth={1.5} />
    </motion.div>
    <h2 className="text-5xl font-black text-slate-900 mb-5 tracking-tight">{title}</h2>
    <p className="text-lg text-slate-500 mb-10 font-medium leading-relaxed max-w-xl mx-auto">{description}</p>
    
    <div className="bg-white/60 backdrop-blur-xl p-3 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
      <form onSubmit={onUpload} className="flex flex-col gap-3">
        <div className="w-full border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[1.5rem] p-16 text-center hover:bg-slate-100/50 hover:border-slate-300 transition-all duration-300 cursor-pointer relative group overflow-hidden">
          <UploadCloud className="mx-auto h-16 w-16 text-slate-400 group-hover:text-slate-600 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
          <input type="file" accept=".pdf, .png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <p className="text-lg text-slate-800 font-bold mt-6 mb-2 relative z-10 tracking-tight">
            {file ? <span className="text-slate-900 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">{file.name}</span> : "Select or drop your document here"}
          </p>
          <p className="text-sm text-slate-500 font-medium relative z-10">High-res PDF, PNG, JPG scans</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.98 }}
          type="submit" disabled={!file || loading} 
          className="w-full bg-slate-900 text-white px-8 py-5 rounded-[1.25rem] font-bold text-base hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
        >
          {loading ? (
            <><Loader2 className="animate-spin text-slate-400" /> Processing via AI Engine...</>
          ) : (
            <><Sparkles size={18} className="text-slate-400" /> {buttonText}</>
          )}
        </motion.button>
      </form>
    </div>
  </motion.div>
);

function App() {
  const [activePage, setActivePage] = useState('extraction');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const changePage = (page) => {
    setActivePage(page); setFile(null); setResults(null); setError('');
  };

  const handleUpload = async (e, endpoint) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true); setError('');
    const formData = new FormData(); formData.append('file', file);
    try {
      const response = await axios.post(`http://localhost:8000/api/${endpoint}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResults(response.data);
    } catch (err) { setError('AI core offline. Ensure backend is running.'); } finally { setLoading(false); }
  };

  const navItems = [
    { id: 'extraction', label: 'Extraction', icon: FileText },
    { id: 'compliance', label: 'Compliance Audit', icon: Activity },
    { id: 'hscode', label: 'HS Code AI', icon: Cpu },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col text-slate-900 font-sans selection:bg-slate-200 relative overflow-x-hidden">
      
      {/* Background Blobs for that Premium Vercel/Linear look */}
      <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-slate-200/40 to-transparent pointer-events-none -z-10"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed top-[20%] right-[-5%] w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* --- TOP NAVBAR (Horizontal) --- */}
      <header className="fixed top-0 inset-x-0 h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => changePage('extraction')}>
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <ShieldAlert className="text-white" size={20} strokeWidth={2.5} />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900">NOVA<span className="text-slate-400">PORT</span></span>
          </div>

          {/* Navigation Links (Magic Pill Effect) */}
          <nav className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-[1.25rem] border border-slate-200/50">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => changePage(item.id)} 
                className={`relative px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors duration-300 ${activePage === item.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {activePage === item.id && (
                  <motion.div 
                    layoutId="navIndicator" 
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/60"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <item.icon size={16} className={activePage === item.id ? 'text-blue-600' : ''} />
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Right Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-green-700 tracking-wide">Gemini Online</span>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 pt-32 pb-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-red-50/80 backdrop-blur-md border border-red-200 text-red-600 rounded-2xl font-bold flex items-center gap-3 shadow-sm">
              <AlertTriangle size={20} /> {error}
            </motion.div>
          )}
          
          <AnimatePresence mode="wait">

            {/* ========================================= */}
            {/* PAGE 0: ABOUT (EMPTY STATE) */}
            {/* ========================================= */}
            {activePage === 'about' && (
              <motion.div key="about" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="p-6 bg-slate-100 rounded-full mb-6 text-slate-400">
                  <Info size={48} strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">About Novaport AI</h2>
                <p className="text-slate-500 font-medium max-w-md">This section is ready for development. Code your company mission, team details, and tech stack here.</p>
              </motion.div>
            )}

            {/* ========================================= */}
            {/* PAGE 1: EXTRACTION */}
            {/* ========================================= */}
            {activePage === 'extraction' && (
              <motion.div key="extract" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <UploadBox title="Intelligent Data Extraction" description="Upload complex commercial invoices. Our vision models structure every line item, weight, and value instantly." buttonText="Digitize Document" file={file} setFile={setFile} loading={loading} onUpload={(e) => handleUpload(e, 'extract')} icon={FileText}/>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Structured Document</h2>
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => changePage('extraction')} className="text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
                        <ListPlus size={16} /> New Extraction
                      </motion.button>
                    </div>

                    <motion.div variants={cardVariants} className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                      {/* Meta Header */}
                      <div className="bg-slate-900 p-8 flex flex-col md:flex-row justify-between items-start md:items-center text-white gap-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/10 rounded-xl border border-white/5"><FileText className="text-slate-300" size={24} /></div>
                          <div>
                            <h3 className="font-bold text-xl tracking-tight text-white">{results.document_type}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-1.5">
                              <span className="flex items-center gap-1.5 text-slate-400 font-medium text-sm"><Hash size={14}/> {results.invoice_number}</span>
                              <span className="flex items-center gap-1.5 text-slate-400 font-medium text-sm"><Calendar size={14}/> {results.invoice_date}</span>
                            </div>
                          </div>
                        </div>
                        {results.missing_fields?.length > 0 && (
                          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-lg text-sm font-bold">
                            <AlertCircle size={16} /> {results.missing_fields.length} Missing Fields
                          </div>
                        )}
                      </div>

                      {/* Main Grid */}
                      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50">
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Globe size={14} /> Trade Entities</h4>
                          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Shipper</p><p className="text-lg font-black text-slate-800 leading-tight">{results.shipper_name}</p></div>
                          <div className="flex justify-center -my-3 relative z-10"><div className="bg-white p-1.5 rounded-full border border-slate-200 text-slate-300"><ArrowRight size={14} /></div></div>
                          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Consignee</p><p className="text-lg font-black text-slate-800 leading-tight">{results.consignee_name}</p></div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={14} /> Logistics</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Origin</p><p className="font-bold text-slate-800">{results.origin_country}</p><p className="text-xs text-slate-500 mt-0.5 truncate">{results.port_of_loading}</p></div>
                            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Destination</p><p className="font-bold text-slate-800">{results.destination_country}</p><p className="text-xs text-slate-500 mt-0.5 truncate">{results.port_of_discharge}</p></div>
                            <div className="col-span-2 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Method & Terms</p><p className="font-bold text-slate-800 flex items-center gap-2">{results.shipping_method} <span className="text-slate-300">/</span> {results.incoterms}</p></div>
                              <div className="text-right"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gross Weight</p><p className="font-black text-slate-800 text-lg">{results.total_weight_kg} kg</p></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Line Items */}
                      <div className="bg-white border-t border-slate-200">
                        <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 bg-slate-50/50">
                          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Package className="text-slate-400" size={20} /> Extracted Line Items</h3>
                          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-800 flex items-center gap-2 shadow-sm">
                            <DollarSign size={16} className="text-slate-400" /> Invoice Total: <span className="font-black">${results.total_value_usd?.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="p-6 md:p-8">
                          <motion.div variants={pageVariants} className="space-y-3">
                            {results.line_items?.map((item, idx) => (
                              <motion.div key={idx} variants={cardVariants} whileHover={{ scale: 1.005, backgroundColor: "#f8fafc" }} className="p-5 border border-slate-200 rounded-2xl bg-white transition-all flex flex-col md:flex-row md:items-center gap-4 group shadow-sm hover:shadow">
                                <div className="flex-1 pl-1">
                                  <p className="font-bold text-slate-800 text-base mb-2">{item.product_description}</p>
                                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md border border-slate-200/60"><Hash size={12}/> HS: <span className="font-mono text-slate-900">{item.hs_code}</span></span>
                                    <span className="bg-slate-100 px-2 py-1 rounded-md border border-slate-200/60">Qty: {item.quantity}</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded-md border border-slate-200/60">Wgt: {item.weight_kg} kg</span>
                                  </div>
                                </div>
                                <div className="md:text-right pl-1 md:pl-0">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Declared Value</p>
                                  <p className="text-lg font-black text-slate-900">${item.value_usd?.toLocaleString()}</p>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================= */}
            {/* PAGE 2: COMPLIANCE CHECKER */}
            {/* ========================================= */}
            {activePage === 'compliance' && (
              <motion.div key="comp" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <UploadBox title="Compliance Risk Audit" description="Automated clearance checks. Validate against international trade rules instantly." buttonText="Run Audit" file={file} setFile={setFile} loading={loading} onUpload={(e) => handleUpload(e, 'compliance')} icon={Activity}/>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Audit Report</h2>
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => changePage('compliance')} className="text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
                         New Audit
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="col-span-1 lg:col-span-2 space-y-6">
                        
                        {/* Huge Status Card */}
                        <motion.div variants={cardVariants} className={`p-8 rounded-[2rem] border-2 flex items-center gap-6 relative overflow-hidden bg-white ${results.status === 'RED' ? 'border-red-200 shadow-sm' : results.status === 'YELLOW' ? 'border-yellow-300 shadow-sm' : 'border-green-200 shadow-sm'}`}>
                          <div className={`p-5 rounded-2xl bg-slate-50 border ${results.status === 'RED' ? 'text-red-500 border-red-100' : results.status === 'YELLOW' ? 'text-yellow-500 border-yellow-100' : 'text-green-500 border-green-100'}`}>
                            {results.status === 'GREEN' ? <CheckCircle size={48} /> : <ShieldAlert size={48} />}
                          </div>
                          <div>
                            <h3 className={`text-4xl font-black tracking-tight mb-1 ${results.status === 'RED' ? 'text-red-600' : results.status === 'YELLOW' ? 'text-yellow-600' : 'text-green-600'}`}>{results.status}</h3>
                            <p className={`text-sm font-bold ${results.status === 'RED' ? 'text-red-900/60' : results.status === 'YELLOW' ? 'text-yellow-900/60' : 'text-green-900/60'}`}>{results.status === 'RED' ? 'Critical failures. Customs hold imminent.' : results.status === 'YELLOW' ? 'Action required. Resolve before shipping.' : 'Shipment cleared. Ready for export.'}</p>
                          </div>
                        </motion.div>

                        {/* Actionable Issues */}
                        <motion.div variants={cardVariants} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                          <h3 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-2">Detected Risks</h3>
                          {results.compliance_report?.length === 0 ? (
                            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                               <CheckCircle className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                               <p className="text-slate-500 font-semibold text-sm">No regulatory violations found.</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {results.compliance_report?.map((issue, idx) => (
                                <motion.div whileHover={{ scale: 1.01 }} key={idx} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex gap-5 relative overflow-hidden transition-all">
                                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${issue.severity === 'HIGH' ? 'bg-red-500' : issue.severity === 'MEDIUM' ? 'bg-yellow-400' : 'bg-blue-500'}`} />
                                  <div className="mt-0.5"><span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest ${issue.severity === 'HIGH' ? 'bg-red-50 text-red-600 border border-red-100' : issue.severity === 'MEDIUM' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>{issue.severity}</span></div>
                                  <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{issue.type}</p>
                                    <p className="text-base text-slate-800 font-bold mb-4 leading-relaxed">{issue.description}</p>
                                    <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100"><p className="text-xs"><span className="font-black text-slate-900 mr-2 uppercase tracking-widest text-[9px] bg-slate-200 px-1.5 py-0.5 rounded">Fix</span><span className="text-slate-700 font-semibold">{issue.fix}</span></p></div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>

                      {/* Carbon Card (Minimalist Premium) */}
                      <motion.div variants={cardVariants} className="col-span-1 h-full">
                        <div className="bg-slate-900 p-8 rounded-[2rem] shadow-xl relative overflow-hidden border border-slate-800 h-full flex flex-col justify-center">
                          <Leaf className="h-10 w-10 text-emerald-400 mb-6" />
                          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Carbon Impact</h2>
                          <div className="mb-8">
                            <p className="text-6xl font-black text-white tracking-tighter mb-1">{results.carbon_footprint.estimated_co2_kg}</p>
                            <p className="text-sm text-slate-400 font-semibold">kg CO₂ • {results.carbon_footprint.current_method}</p>
                          </div>
                          <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                            <p className="text-slate-300 font-medium text-xs leading-relaxed">
                              Switch to <span className="text-white font-bold">{results.carbon_footprint.greener_alternative}</span> to save
                            </p>
                            <p className="text-emerald-400 font-black text-lg mt-1">
                              {results.carbon_footprint.potential_savings_kg} kg CO₂
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================= */}
            {/* PAGE 3: HS CODE ENGINE */}
            {/* ========================================= */}
            {activePage === 'hscode' && (
              <motion.div key="hs" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <UploadBox title="HS Code Validation" description="Our AI reads the product description and strictly validates your 6-digit HS code against global databases." buttonText="Validate Classification" file={file} setFile={setFile} loading={loading} onUpload={(e) => handleUpload(e, 'hscode')} icon={Cpu}/>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tariff Classification</h2>
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => changePage('hscode')} className="text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
                         New Code
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <motion.div variants={cardVariants} className={`p-8 rounded-[2rem] border-2 flex flex-col justify-center shadow-sm bg-white ${results.is_match ? 'border-green-200' : 'border-red-200'}`}>
                        <div className="flex items-center gap-5 mb-8">
                          <div className={`p-4 rounded-2xl bg-slate-50 border ${results.is_match ? 'border-green-100 text-green-500' : 'border-red-100 text-red-500'}`}>
                            {results.is_match ? <CheckCircle size={36}/> : <AlertTriangle size={36}/>}
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Declared Code</p>
                            <h3 className="text-5xl font-black font-mono tracking-tighter text-slate-800">{results.declared_code}</h3>
                          </div>
                        </div>
                        <span className={`self-start px-4 py-2 rounded-lg font-black uppercase tracking-widest text-[10px] ${results.is_match ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {results.confidence_level} MATCH
                        </span>
                      </motion.div>

                      <motion.div variants={cardVariants} className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-lg border border-slate-800">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Sparkles size={12}/> Recognized Product</p>
                        <p className="text-xl font-bold text-white mb-8 leading-snug">{results.product_description}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Zap size={12}/> AI Reasoning</p>
                        <p className="text-slate-300 font-medium text-sm leading-relaxed">{results.reasoning}</p>
                      </motion.div>

                      {!results.is_match && (
                        <motion.div variants={cardVariants} className="col-span-1 lg:col-span-2 bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
                          <div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">AI Correction</h3>
                            <p className="text-6xl font-black font-mono text-slate-900 tracking-tighter">{results.suggested_correct_code}</p>
                          </div>
                          {results.alternatives?.length > 0 && (
                            <div className="w-full md:w-auto md:border-l border-slate-100 md:pl-10">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Alternatives</p>
                              <div className="flex flex-wrap gap-2">
                                {results.alternatives.map((alt, idx) => (
                                  <motion.span whileHover={{ scale: 1.02 }} key={idx} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono font-bold text-slate-600 cursor-default">
                                    {alt}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;