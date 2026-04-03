import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, AlertTriangle, CheckCircle, Leaf, ShieldAlert, 
  FileText, Cpu, Activity, Loader2, ArrowRight, Package, MapPin, 
  Globe, DollarSign, Calendar, Hash, AlertCircle, 
  ListPlus, Sparkles, Zap, Info, FileSearch, ShieldCheck, ScrollText, Percent, Download, Network, Boxes,MessageSquare, X, Send
} from 'lucide-react';

// ==========================================
// 1. ELITE PHYSICS & VARIANTS
// ==========================================
const spring = { type: "spring", stiffness: 200, damping: 20 };
const fastSpring = { type: "spring", stiffness: 400, damping: 25 };

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: spring } };
const scaleUp = { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: spring } };

const pageVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.05 } },
  exit: { opacity: 0, y: -10, filter: 'blur(5px)', transition: { duration: 0.2 } }
};

// ==========================================
// 2. INTERACTIVE UI COMPONENTS
// ==========================================

// Visually Stunning Primary Button with Glass Sheen Hover
const PrimaryButton = ({ children, onClick, disabled, className = "", icon: Icon, type = "button" }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`relative group overflow-hidden bg-slate-900 text-white font-bold rounded-[1.25rem] shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 ${className}`}
  >
    {/* Gradient Background Reveal */}
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
    
    {/* Sweeping Light Sheen */}
    <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_0.75s_ease-in-out_forwards]"></div>

    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
      {Icon && <Icon size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />}
    </span>
  </motion.button>
);

// Clean, High-Contrast Secondary Button
const SecondaryButton = ({ children, onClick, disabled, className = "", icon: Icon, type = "button" }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`group relative overflow-hidden flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold rounded-[1.25rem] transition-all duration-300 hover:border-blue-400 hover:text-blue-600 shadow-sm hover:shadow-[0_8px_20px_rgba(37,99,235,0.1)] disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 ${className}`}
  >
    <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <span className="relative z-10 flex items-center justify-center gap-2">
      {Icon && <Icon size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />}
      {children}
    </span>
  </motion.button>
);

const NovaportLogo = ({ onClick }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-3 cursor-pointer group" onClick={onClick}>
    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-[0_4px_15px_rgba(37,99,235,0.3)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_8px_25px_rgba(37,99,235,0.5)]">
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.95" />
        <path d="M2 17L12 22L22 17" fill="white" fillOpacity="0.75" />
        <path d="M2 12L12 17L22 12" fill="white" fillOpacity="0.5" />
      </svg>
    </div>
    <div className="flex flex-col justify-center">
      <div className="flex items-center leading-none tracking-tight">
        <span className="font-black text-[22px] text-slate-900">NOVA</span>
        <span className="font-black text-[22px] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">PORT</span>
      </div>
      <span className="text-[8px] font-black text-slate-400 tracking-[0.25em] uppercase leading-none mt-1">Intelligence</span>
    </div>
  </motion.div>
);
const TradeBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your DP World Copilot. Ask me about required documents for any trade route (e.g., 'What documents do I need to ship from India to UAE?')" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat', { message: userMsg });
      setMessages(prev => [...prev, { role: 'bot', text: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I lost connection to the DP World servers." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[450px]"
          >
            {/* Chat Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-blue-200" />
                <h3 className="font-bold text-sm">ClearPath AI Copilot</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}`}>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about documents..." 
                className="flex-1 bg-slate-100 text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button 
                onClick={sendMessage}
                disabled={isTyping}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl shadow-blue-600/30 flex items-center justify-center transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
};

// Visually Stunning Enterprise Footer
const Footer = () => (
  <footer className="relative w-full border-t border-slate-200/50 bg-slate-950 pt-20 pb-10 mt-auto overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
    
    <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <ShieldAlert size={16} className="text-white" strokeWidth={2.5}/>
            </div>
            <div className="flex items-center leading-none tracking-tight">
              <span className="font-black text-xl text-white">NOVA</span>
              <span className="font-black text-xl text-blue-400">PORT</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            The enterprise-grade trade compliance infrastructure. Powering global logistics with advanced neural networks.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Platform</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-400">
            <li className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">Data Extraction</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">Compliance Audit</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">Tariff Classification</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">ESG Analytics <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[9px] uppercase tracking-widest border border-emerald-500/20">New</span></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-400">
            <li className="hover:text-blue-400 transition-colors cursor-pointer">About Us</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Customers</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Security & Trust</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Careers</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Legal</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-400">
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Terms of Service</li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">Cookie Policy</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} Novaport AI Core. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-slate-600">
           <span className="text-xs font-bold uppercase tracking-widest">System Status:</span>
           <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Operational</span>
           </div>
        </div>
      </div>
    </div>
  </footer>
);

// ==========================================
// 3. REUSABLE UPLOAD WIDGET
// ==========================================
const UploadBox = ({ file, setFile, onUpload, loading, title, description, buttonText, icon: Icon, selectedFields, setSelectedFields, activePage }) => {
  const options = [
    { id: 'entities', label: 'Shipper & Consignee' },
    { id: 'logistics', label: 'Ports, Weights & Routing' },
    { id: 'products', label: 'Product Line Items & Values' }
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="mt-12 text-center max-w-3xl mx-auto z-10 relative">
      <motion.div variants={fadeUp} className="mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-white shadow-sm border border-slate-100 text-blue-600 rounded-[1.25rem] mb-6">
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter drop-shadow-sm">{title}</h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{description}</p>
      </motion.div>
      
      {activePage === 'extraction' && selectedFields && (
        <motion.div variants={fadeUp} className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center justify-center gap-2"><Cpu size={14}/> Active Neural Nodes</p>
          <div className="flex flex-wrap justify-center gap-3">
            {options.map(opt => {
              const isActive = selectedFields.includes(opt.id);
              return (
                <label key={opt.id} className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 select-none ${isActive ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-300'}`}>
                  <input type="checkbox" className="hidden" checked={isActive} onChange={() => {
                    if(isActive) setSelectedFields(selectedFields.filter(f => f !== opt.id));
                    else setSelectedFields([...selectedFields, opt.id]);
                  }} />
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'border-blue-500' : 'border-slate-300'}`}>
                    {isActive && <motion.div layoutId={`check-${opt.id}`} className="w-2 h-2 rounded-full bg-blue-500"></motion.div>}
                  </div>
                  <span className="text-sm font-bold tracking-tight">{opt.label}</span>
                </label>
              )
            })}
          </div>
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-xl p-3 rounded-[2.5rem] border border-slate-200/80 shadow-[0_10px_40px_rgb(0,0,0,0.05)] group">
        <form onSubmit={onUpload} className="flex flex-col gap-3">
          <div className="w-full border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[2rem] p-16 text-center hover:bg-blue-50/50 hover:border-blue-300 transition-all duration-500 cursor-pointer overflow-hidden relative">
            <UploadCloud className="mx-auto h-14 w-14 text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
            <input type="file" accept=".pdf, .png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <p className="text-lg text-slate-900 font-bold mt-6 mb-2 tracking-tight relative z-10">
              {file ? <span className="text-blue-700 bg-blue-50 px-4 py-2.5 rounded-xl border border-blue-200/60 shadow-sm">{file.name}</span> : "Drop commercial document here"}
            </p>
            <p className="text-sm text-slate-500 font-medium relative z-10">PDF, PNG, or JPG up to 10MB</p>
          </div>
          
          <PrimaryButton 
            type="submit"
            icon={ArrowRight}
            disabled={!file || loading || (activePage === 'extraction' && selectedFields.length === 0)}
            className="w-full py-6 rounded-[2rem] text-lg"
          >
            {loading ? <><Loader2 className="animate-spin" size={20}/> <span>Initializing Engine...</span></> : <span>{buttonText}</span>}
          </PrimaryButton>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 4. MAIN APP ARCHITECTURE
// ==========================================
function App() {
  const [activePage, setActivePage] = useState('about'); 
  const [file, setFile] = useState(null);
  const [selectedFields, setSelectedFields] = useState(['entities', 'logistics', 'products']);
  const [hsInputText, setHsInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const changePage = (page) => {
    setActivePage(page); setFile(null); setHsInputText(''); setResults(null); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (e, endpoint) => {
    e.preventDefault(); if (!file) return;
    setLoading(true); setError('');
    const formData = new FormData(); formData.append('file', file);
    if (endpoint === 'extract') formData.append('requested_fields', selectedFields.join(', '));

    try {
      const response = await axios.post(`http://localhost:8000/api/${endpoint}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResults(response.data);
    } catch (err) { setError('Network anomaly. Unable to reach AI Core.'); } finally { setLoading(false); }
  };

  const handleHSCodeGenerate = async (e) => {
    e.preventDefault(); if (!hsInputText.trim()) return;
    setLoading(true); setError('');
    try {
      const response = await axios.post(`http://localhost:8000/api/hscode`, { description: hsInputText });
      setResults(response.data);
    } catch (err) { setError('Network anomaly. Unable to reach AI Core.'); } finally { setLoading(false); }
  };

  const handleDownload = () => {
    if (!results) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `novaport_${activePage}_export.json`);
    document.body.appendChild(downloadAnchorNode); downloadAnchorNode.click(); downloadAnchorNode.remove();
  };

  const navItems = [
    { id: 'about', label: 'About', icon: Info },
    { id: 'extraction', label: 'Extraction', icon: Boxes },
    { id: 'compliance', label: 'Audit', icon: Activity },
    { id: 'hscode', label: 'HS AI', icon: Network }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col text-slate-900 selection:bg-blue-200 relative overflow-x-hidden" style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
      
      {/* --- CSS SHIMMER ANIMATION --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%) skewX(-20deg); }
        }
      `}} />

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px]"></div>
      </div>

      {/* --- MAGNETIC NAVBAR --- */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl h-20 bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-[1.5rem] z-50 flex items-center justify-between px-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <NovaportLogo onClick={() => changePage('about')} />
        
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-[1rem] border border-slate-200/50 shadow-inner">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => changePage(item.id)} className={`relative px-5 py-2.5 rounded-[12px] text-sm font-bold flex items-center gap-2 transition-colors duration-300 ${activePage === item.id ? 'text-blue-700' : 'text-slate-500 hover:text-slate-900'}`}>
              {activePage === item.id && <motion.div layoutId="navIndicator" className="absolute inset-0 bg-white rounded-[12px] shadow-sm border border-slate-200/60" transition={fastSpring}/>}
              <span className="relative z-10 flex items-center gap-2"><item.icon size={16} className={activePage === item.id ? 'text-blue-600' : ''} />{item.label}</span>
            </button>
          ))}
        </nav>
        
        {/* Placeholder to balance the logo width */}
        <div className="w-[160px] hidden md:block"></div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 pt-36 pb-24 px-4 md:px-8 z-10 flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          
          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl font-bold flex items-center gap-3 shadow-sm">
                <AlertTriangle size={20} /> {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait" layout>

            {/* ========================================= */}
            {/* PAGE 0: ABOUT (LANDING PAGE) */}
            {/* ========================================= */}
            {activePage === 'about' && (
              <motion.div key="about" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col w-full pb-10">
                <div className="flex flex-col items-center justify-center min-h-[55vh] text-center mb-16 relative mt-10">
                  <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 mb-8 tracking-wide shadow-sm">
                    <Sparkles size={14} className="text-blue-500"/> Core 1.0 — Smart Logistics
                  </motion.div>
                  <motion.h1 variants={fadeUp} className="text-6xl md:text-[5.5rem] font-black text-slate-900 tracking-tighter mb-6 leading-[1.05] drop-shadow-sm">
                    Global Trade.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Zero Friction.</span>
                  </motion.h1>
                  <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed mb-10">
                    Novaport AI is the enterprise-grade infrastructure for customs compliance. We digitize documents, audit regulations, and classify tariffs instantly using advanced neural networks.
                  </motion.p>
                  <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 w-full md:w-auto">
                    <PrimaryButton onClick={() => changePage('extraction')} icon={ArrowRight}>
                      Start Extraction
                    </PrimaryButton>
                    <SecondaryButton onClick={() => changePage('compliance')} icon={Activity}>
                      View Compliance Demo
                    </SecondaryButton>
                  </motion.div>
                </div>

                <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div variants={scaleUp} className="bg-white border border-slate-200/60 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-blue-500 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500"><Boxes size={100}/></div>
                    <div className="relative z-10 flex flex-col h-full justify-end pt-24">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-blue-100"><Boxes size={28}/></div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Cognitive Extraction</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">Transform unstructured commercial PDFs into precise JSON schemas instantly. We map line items, weights, and incoterms perfectly.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleUp} className="bg-white border border-slate-200/60 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-indigo-500 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500"><Activity size={100}/></div>
                    <div className="relative z-10 flex flex-col h-full justify-end pt-24">
                      <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm border border-indigo-100"><Activity size={28}/></div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Automated Auditing</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">Cross-reference shipments against international trade corridors. Detect missing certificates and math errors before dispatch.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleUp} className="bg-white border border-slate-200/60 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-cyan-500 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500"><Network size={100}/></div>
                    <div className="relative z-10 flex flex-col h-full justify-end pt-24">
                      <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 shadow-sm border border-cyan-100"><Network size={28}/></div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Neural Classification</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">Stop guessing HS codes. Our model processes plain-text descriptions to guarantee perfect 6-digit global tariff alignment.</p>
                    </div>
                  </motion.div>

                  {/* Wide ESG Card */}
                  <motion.div variants={scaleUp} className="md:col-span-3 bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-[2.5rem] p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-xl">
                    <Leaf className="absolute -left-10 -bottom-10 text-emerald-500/10" size={240}/>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
                    <div className="relative z-10 max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-5 border border-emerald-500/30">Scope 3 Analytics</div>
                      <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Integrated ESG Routing</h3>
                      <p className="text-base text-emerald-100/80 leading-relaxed font-medium">Every compliance audit automatically calculates transit carbon emissions using GLEC frameworks, providing actionable insights for greener logistics routing.</p>
                    </div>
                    <div className="relative z-10 shrink-0">
                      <PrimaryButton onClick={() => changePage('compliance')} className="bg-emerald-400 text-emerald-950 hover:bg-emerald-300 shadow-emerald-900/50" icon={ArrowRight}>
                        See Carbon Math
                      </PrimaryButton>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* ========================================= */}
            {/* PAGE 1: EXTRACTION */}
            {/* ========================================= */}
            {activePage === 'extraction' && (
              <motion.div key="extract" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <UploadBox title="Data Extraction" description="Digitize commercial documents with zero templates. Upload a PDF to map fields directly to structured JSON." buttonText="Digitize Document" file={file} setFile={setFile} loading={loading} onUpload={(e) => handleFileUpload(e, 'extract')} icon={Boxes} selectedFields={selectedFields} setSelectedFields={setSelectedFields} activePage={activePage}/>
                ) : (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8">
                      <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Structured Payload</h2>
                      </div>
                      <div className="flex items-center gap-4">
                        <SecondaryButton onClick={handleDownload} icon={Download}>
                          Export JSON
                        </SecondaryButton>
                        <PrimaryButton onClick={() => changePage('extraction')} icon={ListPlus}>
                          New Scan
                        </PrimaryButton>
                      </div>
                    </div>

                    <motion.div variants={scaleUp} className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden relative">
                      
                      <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 gap-6 bg-slate-900 text-white">
                        <div className="flex items-center gap-5">
                          <div className="p-4 bg-white/10 rounded-2xl border border-white/10"><FileText size={24} className="text-blue-300"/></div>
                          <div>
                            <h3 className="font-black text-2xl tracking-tight text-white">{results.document_type || "Commercial Document"}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                              <span className="flex items-center gap-1.5 text-slate-300 font-medium text-xs bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"><Hash size={12}/> {results.invoice_number}</span>
                              <span className="flex items-center gap-1.5 text-slate-300 font-medium text-xs bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"><Calendar size={12}/> {results.invoice_date}</span>
                            </div>
                          </div>
                        </div>
                        {results.missing_fields?.length > 0 && (
                          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-xl text-xs font-bold">
                            <AlertCircle size={14} /> {results.missing_fields.length} Missing Fields
                          </div>
                        )}
                      </div>

                      <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50/50">
                        {selectedFields?.includes('entities') && (
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4"><Globe size={14}/> Trade Entities</h4>
                            <motion.div whileHover={{ y: -2 }} className="p-6 bg-white rounded-[1.5rem] border border-slate-200 shadow-sm transition-all"><p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-1.5">Shipper / Exporter</p><p className="text-xl font-black text-slate-900 leading-tight">{results.shipper_name !== "N/A" ? results.shipper_name : "Not Extracted"}</p></motion.div>
                            <div className="flex justify-center -my-4 relative z-10"><div className="bg-slate-50 border border-slate-200 p-2 rounded-full text-slate-400"><ArrowRight size={16} /></div></div>
                            <motion.div whileHover={{ y: -2 }} className="p-6 bg-white rounded-[1.5rem] border border-slate-200 shadow-sm transition-all"><p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-1.5">Consignee / Importer</p><p className="text-xl font-black text-slate-900 leading-tight">{results.consignee_name !== "N/A" ? results.consignee_name : "Not Extracted"}</p></motion.div>
                          </div>
                        )}
                        
                        {selectedFields?.includes('logistics') && (
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4"><MapPin size={14}/> Logistics Framework</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white rounded-[1.5rem] border border-slate-200 shadow-sm"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Origin</p><p className="font-bold text-slate-900 text-lg">{results.origin_country !== "N/A" ? results.origin_country : "-"}</p><p className="text-xs text-slate-500 mt-1 truncate">{results.port_of_loading !== "N/A" ? results.port_of_loading : ""}</p></motion.div>
                              <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white rounded-[1.5rem] border border-slate-200 shadow-sm"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Destination</p><p className="font-bold text-slate-900 text-lg">{results.destination_country !== "N/A" ? results.destination_country : "-"}</p><p className="text-xs text-slate-500 mt-1 truncate">{results.port_of_discharge !== "N/A" ? results.port_of_discharge : ""}</p></motion.div>
                              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 p-6 bg-white rounded-[1.5rem] border border-slate-200 shadow-sm flex justify-between items-center">
                                <div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Method & Terms</p><p className="font-black text-slate-900 flex items-center gap-2 text-xl">{results.shipping_method !== "N/A" ? results.shipping_method : "-"} <span className="text-slate-300 font-normal">/</span> <span className="text-blue-600">{results.incoterms !== "N/A" ? results.incoterms : "-"}</span></p></div>
                                <div className="text-right border-l border-slate-100 pl-6"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Payload</p><p className="font-black text-slate-900 text-2xl">{results.total_weight_kg || 0} <span className="text-sm text-slate-500 font-bold">kg</span></p></div>
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </div>

                      {selectedFields?.includes('products') && results.line_items && results.line_items.length > 0 && (
                        <div className="border-t border-slate-200 bg-white">
                          <div className="p-8 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100">
                            <h4 className="text-xl font-black text-slate-900 flex items-center gap-3"><Package size={20} className="text-blue-500" /> Extracted Line Items</h4>
                            <div className="bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl text-sm font-bold text-slate-900 flex items-center gap-3 shadow-sm">
                              <div className="p-1.5 bg-green-100 text-green-600 rounded-lg"><DollarSign size={16} strokeWidth={3} /></div> Invoice Total: <span className="text-green-600 text-xl font-black">${results.total_value_usd?.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="p-8 md:px-10">
                            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">
                              {results.line_items?.map((item, idx) => (
                                <motion.div key={idx} variants={fadeUp} whileHover={{ scale: 1.01, backgroundColor: "#F8FAFC" }} className="p-6 bg-white rounded-[1.25rem] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group transition-all relative overflow-hidden">
                                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-100 group-hover:bg-blue-500 transition-colors"></div>
                                  <div className="flex-1 pl-4">
                                    <p className="font-bold text-slate-900 text-lg mb-3">{item.product_description}</p>
                                    <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                                      <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60"><Hash size={14} className="text-slate-400"/> HS: <span className="font-mono text-slate-900 font-bold">{item.hs_code}</span></span>
                                      <span className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">Qty: <span className="text-slate-900 font-bold">{item.quantity}</span></span>
                                      <span className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">Wgt: <span className="text-slate-900 font-bold">{item.weight_kg} kg</span></span>
                                    </div>
                                  </div>
                                  <div className="md:text-right w-full md:w-auto bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-xl">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Declared Value</p>
                                    <p className="font-black text-2xl text-slate-900">${item.value_usd?.toLocaleString()}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      )}
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
                  <UploadBox title="Compliance Audit" description="Automated clearance checks. Validate against global trade rules instantly." buttonText="Initiate Audit" file={file} setFile={setFile} loading={loading} onUpload={(e) => handleFileUpload(e, 'compliance')} icon={Activity}/>
                ) : (
                  <div className="space-y-8">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Audit Report</h2>
                      </div>
                      <PrimaryButton onClick={() => changePage('compliance')} icon={Activity}>
                        New Audit
                      </PrimaryButton>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="col-span-1 lg:col-span-2 space-y-8">
                        
                        <motion.div variants={scaleUp} className={`p-8 md:p-10 rounded-[2.5rem] border-2 flex flex-col md:flex-row items-start md:items-center gap-8 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${results.status === 'RED' ? 'border-red-200 shadow-red-500/10' : results.status === 'YELLOW' ? 'border-yellow-300' : 'border-green-200'}`}>
                          <div className={`p-6 rounded-[1.5rem] border flex-shrink-0 z-10 ${results.status === 'RED' ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : results.status === 'YELLOW' ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
                            {results.status === 'GREEN' ? <CheckCircle size={56} strokeWidth={2}/> : <ShieldAlert size={56} strokeWidth={2}/>}
                          </div>
                          
                          <div className="flex-1 w-full">
                            <h3 className={`text-3xl md:text-4xl font-black tracking-tight mb-6 ${results.status === 'RED' ? 'text-red-600' : results.status === 'YELLOW' ? 'text-yellow-600' : 'text-green-600'}`}>
                              {results.status === 'RED' ? 'HIGH RISK — DO NOT SHIP' : results.status === 'YELLOW' ? 'WARNING — ACTION NEEDED' : 'APPROVED — CLEAR TO SHIP'}
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className={`p-5 rounded-2xl border ${results.status === 'RED' ? 'bg-red-50 border-red-100' : results.status === 'YELLOW' ? 'bg-yellow-50 border-yellow-100' : 'bg-green-50 border-green-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${results.status === 'RED' ? 'text-red-800/70' : 'text-slate-500'}`}>Hold Probability</p>
                                <p className={`text-3xl font-black ${results.status === 'RED' ? 'text-red-700' : 'text-slate-800'}`}>{results.customs_hold_probability || "N/A"}</p>
                              </div>
                              <div className={`p-5 rounded-2xl border ${results.status === 'RED' ? 'bg-red-50 border-red-100' : results.status === 'YELLOW' ? 'bg-yellow-50 border-yellow-100' : 'bg-green-50 border-green-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${results.status === 'RED' ? 'text-red-800/70' : 'text-slate-500'}`}>Estimated Loss</p>
                                <p className={`text-3xl font-black ${results.status === 'RED' ? 'text-red-700' : 'text-slate-800'}`}>{results.estimated_loss || "N/A"}</p>
                              </div>
                              <div className={`p-5 rounded-2xl border ${results.status === 'RED' ? 'bg-red-50 border-red-100' : results.status === 'YELLOW' ? 'bg-yellow-50 border-yellow-100' : 'bg-green-50 border-green-100'}`}>
                                <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${results.status === 'RED' ? 'text-red-800/70' : 'text-slate-500'}`}>Suggested Action</p>
                                <p className={`text-lg font-bold leading-tight ${results.status === 'RED' ? 'text-red-800' : 'text-slate-800'}`}>{results.headline_action || "Review required"}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                          <h3 className="text-2xl font-black mb-8 text-slate-900 flex items-center gap-3"><AlertTriangle size={24} className="text-blue-500"/> Regulatory Anomalies</h3>
                          {results.compliance_report?.length === 0 ? (
                            <div className="text-center py-12 bg-slate-50 rounded-[2rem] border border-slate-100">
                               <CheckCircle className="mx-auto h-16 w-16 text-green-400 mb-4" strokeWidth={1.5} />
                               <p className="text-slate-500 font-bold text-lg">No regulatory violations detected.</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {results.compliance_report?.map((issue, idx) => (
                                <motion.div whileHover={{ scale: 1.01, y: -2 }} key={idx} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex gap-6 relative overflow-hidden transition-all">
                                  <div className={`absolute left-0 top-0 bottom-0 w-2 ${issue.severity === 'HIGH' ? 'bg-red-500' : issue.severity === 'MEDIUM' ? 'bg-yellow-400' : 'bg-blue-500'}`} />
                                  <div className="mt-1"><span className={`px-4 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-widest border ${issue.severity === 'HIGH' ? 'bg-red-50 text-red-600 border-red-200' : issue.severity === 'MEDIUM' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>{issue.severity}</span></div>
                                  <div className="flex-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{issue.type}</p>
                                    <p className="text-lg text-slate-800 font-bold mb-5 leading-snug">{issue.description}</p>
                                    <div className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-200/60"><p className="text-sm flex flex-col md:flex-row md:items-start gap-3"><span className="font-black text-slate-900 uppercase tracking-widest text-[9px] bg-slate-200 px-2 py-1 rounded inline-block mt-0.5">Action Required</span><span className="text-slate-700 font-semibold">{issue.fix}</span></p></div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>

                      <div className="col-span-1">
                        {results.carbon_footprint && (
                          <motion.div variants={scaleUp} className="bg-gradient-to-br from-emerald-900 to-emerald-950 p-8 md:p-10 rounded-[2.5rem] border border-emerald-800 shadow-2xl shadow-emerald-900/20 h-full flex flex-col relative overflow-hidden">
                            <Leaf className="absolute -bottom-10 -right-10 text-emerald-500/10 transform rotate-12" size={200} />
                            <div className="relative z-10 flex flex-col h-full">
                              <h3 className="text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-emerald-400">
                                <Leaf size={16}/> Scope 3 Analytics
                              </h3>
                              
                              <div className="mb-10">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-3">Transit Emissions</p>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-6xl font-black text-white tracking-tighter">{results.carbon_footprint.co2_emissions_kg}</span>
                                </div>
                                <span className="text-emerald-400 font-bold text-lg">kg CO₂e</span>
                                
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                  <p className="text-xs font-bold text-emerald-300 bg-emerald-800/50 px-3 py-1.5 rounded-lg border border-emerald-700/50 shadow-inner">Via {results.carbon_footprint.mode_used}</p>
                                  <p className="text-xs font-medium text-emerald-500">{results.carbon_footprint.distance_km} km Route</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-auto">
                                <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/50">
                                  <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 mb-1.5">Tree Offset</p>
                                  <p className="text-2xl font-black text-emerald-100">{results.carbon_footprint.trees_equivalent}</p>
                                </div>
                                <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800/50">
                                  <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 mb-1.5">Device Charges</p>
                                  <p className="text-2xl font-black text-emerald-100">{results.carbon_footprint.smartphones_equivalent}</p>
                                </div>
                              </div>

                              {results.carbon_footprint.potential_savings_kg > 0 && (
                                <div className="bg-black/20 border border-emerald-500/30 p-5 rounded-2xl flex flex-col gap-2 mt-8 backdrop-blur-sm">
                                  <div className="flex items-center gap-2 text-teal-400"><Sparkles size={14}/> <span className="text-[10px] font-black uppercase tracking-widest">Optimization</span></div>
                                  <p className="text-sm font-medium text-emerald-100/80 leading-relaxed mt-1">
                                    Switch to <span className="text-white font-bold">Ocean Freight</span> to save <span className="font-black text-teal-400 block text-xl mt-1">{results.carbon_footprint.potential_savings_kg} kg CO₂e</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>

                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================= */}
            {/* PAGE 3: HS CODE GENERATOR (TEXT INPUT) */}
            {/* ========================================= */}
            {activePage === 'hscode' && (
              <motion.div key="hs" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <motion.div variants={stagger} className="mt-12 text-center max-w-3xl mx-auto z-10 relative">
                    <motion.div variants={fadeUp} className="mb-10">
                      <div className="inline-flex items-center justify-center p-4 bg-white border border-slate-100 shadow-sm text-blue-600 rounded-3xl mb-6">
                        <Network size={32} strokeWidth={1.5} />
                      </div>
                      <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">AI Tariff Classification</h2>
                      <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">Predict global HS codes using natural language processing. Our model analyzes product descriptions and material composition for precise accuracy.</p>
                    </motion.div>
                    
                    <motion.div variants={fadeUp} className="bg-white p-4 rounded-[3rem] border border-slate-200/60 shadow-[0_8px_40px_rgb(0,0,0,0.06)]">
                      <form onSubmit={handleHSCodeGenerate} className="flex flex-col gap-4">
                        <div className="relative">
                          <textarea 
                            rows="4" value={hsInputText} onChange={(e) => setHsInputText(e.target.value)}
                            placeholder="e.g. 100% Cotton Men's Woven Formal Shirts, long sleeve..."
                            className="w-full bg-slate-50/50 border-2 border-slate-200 rounded-[2.5rem] p-8 text-xl font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all resize-none shadow-inner"
                            required
                          />
                        </div>
                        
                        <PrimaryButton 
                          type="submit" 
                          icon={Cpu}
                          disabled={!hsInputText.trim() || loading} 
                          className="w-full py-6 rounded-[2.5rem] text-lg"
                        >
                          {loading ? <><Loader2 className="animate-spin" size={20}/> <span>Processing via Neural Net...</span></> : <span>Classify Product</span>}
                        </PrimaryButton>
                      </form>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">AI Tariff Classification</h2>
                        <p className="text-slate-500 font-medium mt-1 text-lg">Neural diagnostic complete. Review the primary HS code, AI reasoning matrix, and related trade intelligence.</p>
                      </div>
                      <SecondaryButton onClick={() => changePage('hscode')} icon={FileSearch}>
                        New Product
                      </SecondaryButton>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="col-span-1 lg:col-span-2 space-y-8">
                        
                        <motion.div variants={scaleUp} className="bg-white p-10 md:p-12 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                          <div className="z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2"><Globe size={14}/> Primary Code (Export)</p>
                            <h3 className="text-7xl md:text-8xl font-black font-mono tracking-tighter text-blue-600">{results.primary_hs_code}</h3>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 z-10 shadow-inner">
                            <div className="relative w-32 h-32 flex items-center justify-center mb-5">
                               <svg className="w-full h-full transform -rotate-90 filter drop-shadow-sm" viewBox="0 0 100 100">
                                 <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                 <motion.circle cx="50" cy="50" r="45" fill="none" stroke={results.confidence_percentage >= 80 ? '#22c55e' : results.confidence_percentage >= 50 ? '#eab308' : '#ef4444'} strokeWidth="8" strokeLinecap="round" strokeDasharray="283" initial={{ strokeDashoffset: 283 }} animate={{ strokeDashoffset: 283 - (283 * results.confidence_percentage) / 100 }} transition={{ duration: 1.5, ease: "easeOut" }} />
                               </svg>
                               <div className="absolute flex flex-col items-center">
                                 <span className="text-4xl font-black text-slate-900">{results.confidence_percentage}</span>
                                 <span className="text-xs font-bold text-slate-500">%</span>
                               </div>
                            </div>
                            <span className={`px-5 py-2 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-sm border ${results.confidence_percentage >= 80 ? 'bg-green-100 text-green-700 border-green-200' : results.confidence_percentage >= 50 ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                              {results.confidence_label} MATCH
                            </span>
                          </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="bg-slate-900 text-white p-10 md:p-12 rounded-[3rem] shadow-xl relative overflow-hidden border border-slate-800">
                          <ScrollText className="absolute -bottom-10 -right-10 text-slate-800 opacity-40 blur-sm" size={300} strokeWidth={1}/>
                          <div className="relative z-10 space-y-10">
                            <div>
                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Sparkles size={14}/> Official Description</p>
                              <p className="text-2xl font-bold text-white leading-snug">{results.official_description}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Zap size={14}/> Diagnostic Reasoning</p>
                              <p className="text-slate-300 font-medium leading-relaxed text-lg bg-[#111] p-8 rounded-[2rem] border border-white/5 shadow-inner">{results.explanation}</p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">
                          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1"><ListPlus size={16}/> Alternatives</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {results.alternatives?.map((alt, idx) => (
                              <motion.div variants={fadeUp} whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }} key={idx} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm flex flex-col justify-between h-full transition-all group">
                                <div>
                                  <div className="flex justify-between items-center mb-4">
                                    <span className="font-mono font-black text-xl text-slate-900 group-hover:text-blue-600 transition-colors">{alt.code}</span>
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">{alt.confidence_percentage}%</span>
                                  </div>
                                  <p className="text-xs font-medium text-slate-500 leading-relaxed group-hover:text-slate-700">{alt.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                      </div>

                      <motion.div variants={fadeUp} className="col-span-1 h-full">
                        <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col">
                          <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3 border-b border-slate-100 pb-6"><ShieldCheck size={24} className="text-blue-500"/> Intelligence</h3>
                          
                          <div className="space-y-10 flex-1">
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Percent size={14}/> Standard Duty</p>
                              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <p className="font-black text-slate-900 text-xl">{results.duty_rate}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><FileText size={14}/> Certificates</p>
                              <div className="space-y-3">
                                {results.required_certificates?.map((cert, idx) => (
                                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900">
                                    <CheckCircle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm font-bold leading-snug">{cert}</p>
                                  </div>
                                ))}
                                {results.required_certificates?.length === 0 && (
                                  <p className="text-sm font-medium text-slate-500 italic p-5 bg-slate-50 rounded-2xl border border-slate-100">No special certificates required.</p>
                                )}
                              </div>
                            </div>

                            <div className="mt-auto pt-8 border-t border-slate-100">
                              <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle size={14}/> Notes</p>
                              <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200/60 shadow-inner">
                                <p className="text-sm font-medium text-yellow-800 leading-relaxed">{results.special_notes}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <TradeBot />
    </div>
  );
}

export default App;