import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, AlertTriangle, CheckCircle, Leaf, ShieldAlert, 
  FileText, Cpu, Activity, Loader2, ArrowRight, Package, MapPin, 
  Globe, DollarSign, Calendar, Hash, AlertCircle, 
  ListPlus, Sparkles, Zap, Info, FileSearch, ShieldCheck, Percent, Download, Network, Boxes, MessageSquare, X, Send, Bot, ArrowUpRight
} from 'lucide-react';

// ==========================================
// 1. ELITE PHYSICS & MOTION SYSTEM
// ==========================================
const fluidSpring = { type: "spring", stiffness: 250, damping: 25, mass: 0.5 };
const snappySpring = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 };

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 40, filter: 'blur(12px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: fluidSpring } };
const scaleUp = { hidden: { opacity: 0, scale: 0.95, y: 30, filter: 'blur(12px)' }, visible: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: fluidSpring } };

const pageVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(16px)', scale: 0.98 },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, filter: 'blur(12px)', scale: 0.98, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

// ==========================================
// 2. ULTRA-PREMIUM UI COMPONENTS
// ==========================================

const AmbientLightEngine = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[-15%] left-[-10%] w-[900px] h-[900px] bg-blue-200/30 rounded-full blur-[140px]" />
    <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[-15%] right-[-10%] w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-[120px]" />
    <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[700px] h-[700px] bg-cyan-100/30 rounded-full blur-[140px]" />
  </div>
);

const PrimaryButton = ({ children, onClick, disabled, className = "", icon: Icon, type = "button" }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
    whileTap={!disabled ? { scale: 0.97, y: 1 } : {}}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`relative group overflow-hidden bg-slate-900 text-white font-semibold rounded-[20px] shadow-[inset_0px_1px_1px_rgba(255,255,255,0.2),_0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[inset_0px_1px_1px_rgba(255,255,255,0.3),_0_20px_40px_-10px_rgba(0,0,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_ease-in-out_infinite]"></div>
    <span className="relative z-10 flex items-center justify-center gap-2.5 text-[15px] tracking-wide font-[Satoshi]">
      {children}
      {Icon && <Icon size={18} className="transform group-hover:translate-x-1 transition-transform duration-400 ease-out opacity-90" />}
    </span>
  </motion.button>
);

const SecondaryButton = ({ children, onClick, disabled, className = "", icon: Icon, type = "button" }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
    whileTap={!disabled ? { scale: 0.97, y: 1 } : {}}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`group relative overflow-hidden flex items-center justify-center gap-2.5 bg-white/70 backdrop-blur-2xl text-slate-700 font-semibold rounded-[20px] border border-white shadow-[0_4px_20px_rgba(0,0,0,0.04),_inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-500 hover:border-slate-200 hover:bg-white hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 ${className}`}
  >
    <span className="relative z-10 flex items-center justify-center gap-2.5 text-[15px] tracking-wide font-[Satoshi]">
      {Icon && <Icon size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors duration-400 group-hover:scale-110" />}
      {children}
    </span>
  </motion.button>
);

const NovaportLogo = ({ onClick, light = false }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-3.5 cursor-pointer group" onClick={onClick}>
    <div className={`relative flex items-center justify-center w-12 h-12 rounded-[16px] overflow-hidden transition-all duration-500 border ${light ? 'bg-slate-800 border-slate-700 shadow-[0_8px_20px_rgba(0,0,0,0.2)]' : 'bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] border-slate-100/80 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)]'}`}>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${light ? 'bg-gradient-to-br from-slate-700 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-white'}`}></div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={light ? "#ffffff" : "#0F172A"} />
        <path d="M2 17L12 22L22 17" fill={light ? "#cbd5e1" : "#334155"} />
        <path d="M2 12L12 17L22 12" fill={light ? "#94a3b8" : "#64748B"} />
      </svg>
    </div>
    <div className="flex flex-col justify-center">
      <div className="flex items-center leading-none tracking-tight font-[Satoshi]">
        <span className={`font-extrabold text-[24px] tracking-[-0.04em] ${light ? 'text-white' : 'text-slate-900'}`}>Novaport</span>
      </div>
    </div>
  </motion.div>
);

const TradeBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Welcome to Novaport. How can I assist your logistics today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput(''); setIsTyping(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat', { message: userMsg });
      setMessages(prev => [...prev, { role: 'bot', text: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection to core systems temporarily unavailable." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            transition={fluidSpring}
            className="absolute bottom-24 right-0 w-[420px] bg-white/80 backdrop-blur-3xl rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)] border border-white overflow-hidden flex flex-col h-[600px]"
          >
            <div className="bg-white/50 backdrop-blur-2xl p-6 border-b border-slate-200/50 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                   <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-[Satoshi] font-bold text-slate-900 text-[16px]">Novaport AI Chatbot</h3>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 hover:shadow-sm transition-all duration-300">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/30">
              {messages.map((msg, idx) => (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-[15px] leading-relaxed font-medium ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-[24px] rounded-tr-[8px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]' : 'bg-white border border-slate-100 text-slate-700 rounded-[24px] rounded-tl-[8px] shadow-[0_8px_20px_rgba(0,0,0,0.04)]'}`}>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-[24px] rounded-tl-[8px] shadow-sm flex gap-1.5 items-center h-[48px]">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: i * 0.15 }} className="w-2 h-2 bg-slate-300 rounded-full" />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-5 bg-white/60 backdrop-blur-2xl border-t border-white">
              <div className="relative flex items-center bg-white border border-slate-200 rounded-[24px] focus-within:ring-4 focus-within:ring-slate-900/5 focus-within:border-slate-400 transition-all duration-400 shadow-[0_4px_15px_rgba(0,0,0,0.02)]">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask a compliance question..." 
                  className="flex-1 bg-transparent text-[15px] font-medium text-slate-900 px-6 py-4 outline-none placeholder:text-slate-400"
                />
                <button 
                  onClick={sendMessage}
                  disabled={isTyping || !input.trim()}
                  className="mr-2 p-3 rounded-[18px] bg-slate-900 hover:bg-slate-800 text-white transition-all duration-300 disabled:opacity-50 hover:scale-105 hover:-translate-y-0.5"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -4, shadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-[72px] h-[72px] bg-slate-900 text-white rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4),_inset_0_2px_2px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all duration-400"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Bot size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, content }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20, opacity: 0 }} 
          animate={{ scale: 1, y: 0, opacity: 1 }} 
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={fluidSpring}
          onClick={e => e.stopPropagation()}
          className="bg-white/90 backdrop-blur-3xl rounded-[40px] p-10 md:p-14 max-w-2xl w-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3),_inset_0_2px_0_rgba(255,255,255,1)] border border-white relative"
        >
          <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"><X size={20}/></button>
          <h3 className="text-[36px] font-[Satoshi] font-extrabold text-slate-900 mb-8 tracking-tight">{title}</h3>
          <div className="text-slate-600 space-y-6 text-[17px] leading-[1.8] font-medium">
            {content}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Footer = ({ onOpenModal, changePage }) => (
  <footer className="relative w-full border-t border-slate-800 bg-slate-900 pt-32 pb-16 mt-auto overflow-hidden">
    {/* Stunning Ambient Background for Footer */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-blue-900/30 to-transparent rounded-full blur-[140px] pointer-events-none z-0"></div>
    
    <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
        <div className="md:col-span-4 lg:col-span-5 pr-8">
          <div className="mb-8 w-max">
            <NovaportLogo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} light={true} />
          </div>
          <p className="text-slate-400 text-[16px] font-medium leading-[1.8] max-w-sm">
            The enterprise-grade trade compliance infrastructure. Powering global logistics with advanced neural networks and seamless workflows.
          </p>
        </div>
        
        <div className="md:col-span-3 lg:col-span-2 md:col-start-6">
          <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.2em] mb-8 font-[Satoshi]">Platform</h4>
          <ul className="space-y-5 text-[15px] text-slate-400 font-medium">
            <li onClick={() => changePage('about')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">About Us</li>
            <li onClick={() => changePage('extraction')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">Data Extraction</li>
            <li onClick={() => changePage('compliance')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">Compliance Audit</li>
            <li onClick={() => changePage('hscode')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">HS Generator</li>
          </ul>
        </div>
        
        <div className="md:col-span-3 lg:col-span-2">
          <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.2em] mb-8 font-[Satoshi]">Company</h4>
          <ul className="space-y-5 text-[15px] text-slate-400 font-medium">
            <li onClick={() => onOpenModal('customers')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">Customers</li>
            <li onClick={() => onOpenModal('security')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">Security & Trust</li>
            <li onClick={() => onOpenModal('careers')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">Careers</li>
          </ul>
        </div>
        
        <div className="md:col-span-2 lg:col-span-2">
          <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.2em] mb-8 font-[Satoshi]">Legal</h4>
          <ul className="space-y-5 text-[15px] text-slate-400 font-medium">
            <li onClick={() => onOpenModal('privacy')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">Privacy Policy</li>
            <li onClick={() => onOpenModal('terms')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">Terms of Service</li>
            <li onClick={() => onOpenModal('cookies')} className="hover:text-white hover:translate-x-1 transition-all duration-400 cursor-pointer">Cookie Policy</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-[15px] font-medium">
          &copy; {new Date().getFullYear()} Novaport. All rights reserved. Built for global scale.
        </p>
      </div>
    </div>
  </footer>
);

// ==========================================
// 3. REUSABLE UPLOAD WIDGET
// ==========================================
const UploadBox = ({ file, setFile, onUpload, loading, title, description, buttonText, icon: Icon, selectedFields, setSelectedFields, activePage }) => {
  const options = [
    { id: 'entities', label: 'Shipper & Consignee', icon: Globe },
    { id: 'logistics', label: 'Ports & Routing', icon: MapPin },
    { id: 'products', label: 'Line Items & Values', icon: Package }
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="mt-12 text-center max-w-[850px] mx-auto z-10 relative">
      <motion.div variants={fadeUp} className="mb-16">
        <motion.div whileHover={{ scale: 1.05, rotate: 5, y: -5 }} transition={fluidSpring} className="inline-flex items-center justify-center w-28 h-28 rounded-[32px] bg-white border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] mb-10 relative overflow-hidden group">
           <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
           <Icon size={44} strokeWidth={1.5} className="text-slate-900 relative z-10 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
        </motion.div>
        <h2 className="text-[64px] md:text-[80px] font-[Satoshi] font-extrabold text-slate-900 mb-6 tracking-[-0.04em] leading-[1.05] drop-shadow-sm">{title}</h2>
        <p className="text-[20px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{description}</p>
      </motion.div>
      
      {activePage === 'extraction' && selectedFields && (
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 font-[Satoshi]">Select Neural Extraction Nodes</p>
          <div className="flex flex-wrap justify-center gap-4">
            {options.map(opt => {
              const isActive = selectedFields.includes(opt.id);
              return (
                <motion.label whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} key={opt.id} className={`flex items-center gap-3 px-6 py-4 rounded-[20px] border-2 cursor-pointer transition-all duration-400 select-none ${isActive ? 'bg-slate-900 border-slate-900 text-white shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)]' : 'bg-white/70 backdrop-blur-xl border-transparent shadow-[0_4px_15px_rgba(0,0,0,0.04),_inset_0_1px_0_rgba(255,255,255,1)] text-slate-500 hover:border-slate-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)]'}`}>
                  <input type="checkbox" className="hidden" checked={isActive} onChange={() => {
                    if(isActive) setSelectedFields(selectedFields.filter(f => f !== opt.id));
                    else setSelectedFields([...selectedFields, opt.id]);
                  }} />
                  <opt.icon size={18} className={`${isActive ? 'text-white' : 'text-slate-400'} transition-colors duration-400`}/>
                  <span className="text-[15px] font-bold tracking-wide font-[Satoshi]">{opt.label}</span>
                  <div className={`w-5 h-5 ml-2 rounded-full border-2 flex items-center justify-center transition-colors duration-400 ${isActive ? 'border-white/50 bg-white/20' : 'border-slate-300'}`}>
                    {isActive && <motion.div layoutId={`check-${opt.id}`} className="w-2.5 h-2.5 rounded-full bg-white"></motion.div>}
                  </div>
                </motion.label>
              )
            })}
          </div>
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="bg-white/60 backdrop-blur-3xl p-6 rounded-[48px] border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] group relative z-20">
        <form onSubmit={onUpload} className="flex flex-col gap-6">
          <div className="w-full border-2 border-dashed border-slate-300/80 bg-slate-50/50 rounded-[40px] p-24 text-center hover:bg-slate-100/50 hover:border-slate-400 transition-all duration-500 cursor-pointer overflow-hidden relative shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)]">
            <UploadCloud className="mx-auto h-24 w-24 text-slate-300 group-hover:text-slate-900 group-hover:scale-110 group-hover:-translate-y-3 transition-all duration-700 ease-[0.16,1,0.3,1]" strokeWidth={1} />
            <input type="file" accept=".pdf, .png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="mt-8 relative z-10">
              {file ? (
                <motion.span initial={{ scale: 0.9, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="inline-block text-slate-900 bg-white px-8 py-4 rounded-[20px] border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] font-bold text-[18px] font-[Satoshi]">{file.name}</motion.span>
              ) : (
                <>
                  <p className="text-[22px] text-slate-900 font-extrabold font-[Satoshi] tracking-tight mb-3">Click to upload or drag and drop</p>
                  <p className="text-[16px] text-slate-500 font-medium">PDF, PNG, or JPG (max 10MB)</p>
                </>
              )}
            </div>
          </div>
          
          <PrimaryButton 
            type="submit"
            icon={ArrowRight}
            disabled={!file || loading || (activePage === 'extraction' && selectedFields.length === 0)}
            className="w-full py-6 rounded-[32px] text-[18px]"
          >
            {loading ? <><Loader2 className="animate-spin" size={22}/> <span>Analyzing Document...</span></> : <span>{buttonText}</span>}
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
  
  // Modal State
  const [activeModalKey, setActiveModalKey] = useState(null);

  const modalData = {
    customers: { 
      title: "Our Customers", 
      content: (
        <div className="space-y-4">
          <p>Novaport partners with leading global supply chain operators, Fortune 500 logistics firms, and emerging D2C brands. We process millions of commercial invoices daily, ensuring zero-friction cross-border trade.</p>
          <p>By leveraging our neural infrastructure, our enterprise clients experience a <strong className="text-slate-900">99.8% reduction</strong> in customs hold times and a 40x acceleration in document processing throughput.</p>
        </div>
      ) 
    },
    security: { 
      title: "Security & Trust", 
      content: (
        <div className="space-y-4">
          <p>Enterprise-grade security is in our DNA. Novaport is SOC 2 Type II, ISO 27001, and GDPR compliant, utilizing AES-256 encryption at rest and TLS 1.3 in transit.</p>
          <p>Your trade data is processed inside isolated neural containers, meaning zero spillage across client partitions. We employ continuous penetration testing and automated vulnerability scanning to safeguard your global supply chain data.</p>
        </div>
      ) 
    },
    careers: { 
      title: "Careers at Novaport", 
      content: (
        <div className="space-y-4">
          <p>Join the team building the neural nervous system of global trade. We are actively hiring senior AI researchers, logistics domain experts, and full-stack engineers to help us eliminate international trade borders.</p>
          <p>Benefits include fully remote work options, highly competitive equity packages, comprehensive premium health coverage, and a $5k annual learning and home-office stipend.</p>
        </div>
      ) 
    },
    privacy: { 
      title: "Privacy Policy", 
      content: (
        <div className="space-y-4">
          <p>We respect your data sovereignty. Novaport strictly adheres to international privacy regulations including GDPR and CCPA. We collect only what is strictly necessary to perform our compliance auditing and extraction services.</p>
          <p>We never sell your data to third parties. Furthermore, commercial data processed through our extraction endpoints is strictly isolated and is <strong>never</strong> used to train public foundational AI models.</p>
        </div>
      ) 
    },
    terms: { 
      title: "Terms of Service", 
      content: (
        <div className="space-y-4">
          <p>By accessing Novaport's APIs, dashboards, and associated software, you agree to our enterprise SLA terms. Usage is strictly bound to authorized trade compliance auditing and HS classification limits as dictated by your specific subscription tier.</p>
          <p>We guarantee 99.99% uptime for Enterprise tier customers. Misuse of the API, including attempted reverse engineering of our classification models, will result in immediate API key revocation.</p>
        </div>
      ) 
    },
    cookies: { 
      title: "Cookie Policy", 
      content: (
        <div className="space-y-4">
          <p>Novaport uses essential cookies to securely maintain your session and authenticate API requests. These are strictly necessary for the platform to function and cannot be disabled.</p>
          <p>Analytics and performance cookies are strictly opt-in. If enabled, they help us understand dashboard utilization to improve our UI flows and cognitive extraction models. You can manage your preferences at any time via your account settings.</p>
        </div>
      ) 
    }
  };

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
    } catch (err) { setError('Connection anomaly. Unable to reach Novaport Core.'); } finally { setLoading(false); }
  };

  const handleHSCodeGenerate = async (e) => {
    e.preventDefault(); if (!hsInputText.trim()) return;
    setLoading(true); setError('');
    try {
      const response = await axios.post(`http://localhost:8000/api/hscode`, { description: hsInputText });
      setResults(response.data);
    } catch (err) { setError('Connection anomaly. Unable to reach Novaport Core.'); } finally { setLoading(false); }
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
    { id: 'about', label: 'Overview', icon: Info },
    { id: 'extraction', label: 'Extract', icon: Boxes },
    { id: 'compliance', label: 'Audit', icon: Activity },
    { id: 'hscode', label: 'HS Generator', icon: Cpu }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col text-slate-900 selection:bg-slate-900 selection:text-white relative overflow-x-hidden" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(150%) skewX(-25deg); }
        }
        .font-\\[Satoshi\\] { font-family: 'Satoshi', sans-serif; }
      `}} />

      <AmbientLightEngine />

      <Modal 
        isOpen={!!activeModalKey} 
        onClose={() => setActiveModalKey(null)} 
        title={modalData[activeModalKey]?.title}
        content={modalData[activeModalKey]?.content}
      />

      {/* --- FLOATING GLASS NAVBAR --- */}
      <motion.header initial={{ y: -50, x: "-50%", opacity: 0 }} animate={{ y: 0, x: "-50%", opacity: 1 }} transition={fluidSpring} className="fixed top-8 left-1/2 w-[calc(100%-4rem)] max-w-6xl h-[88px] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] rounded-[28px] z-50 flex items-center justify-between px-8">
        <NovaportLogo onClick={() => changePage('about')} />
        
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 bg-slate-50/50 border border-slate-200/50 rounded-[20px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => changePage(item.id)} className={`relative px-6 py-3 rounded-[16px] text-[15px] font-bold font-[Satoshi] flex items-center gap-2.5 transition-all duration-500 ${activePage === item.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'}`}>
              {activePage === item.id && <motion.div layoutId="navIndicator" className="absolute inset-0 bg-white rounded-[16px] shadow-[0_8px_20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] border border-slate-100" transition={snappySpring}/>}
              <span className="relative z-10 flex items-center gap-2.5"><item.icon size={18} className={`${activePage === item.id ? 'text-slate-900' : 'text-slate-400'}`} />{item.label}</span>
            </button>
          ))}
        </nav>
        
        {/* Placeholder div to keep layout balanced without the pill */}
        <div className="w-[160px] hidden md:flex justify-end"></div>
      </motion.header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 pt-56 pb-40 px-6 md:px-10 z-10 flex flex-col relative">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          
          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(8px)' }} transition={fluidSpring} className="mb-12 p-6 bg-red-50/80 backdrop-blur-xl border border-red-200 text-red-700 rounded-[28px] font-semibold text-[16px] flex items-center gap-5 shadow-[0_20px_50px_-10px_rgba(239,68,68,0.2)]">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-red-100 flex-shrink-0"><AlertTriangle size={24} className="text-red-500" /></div>
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence mode="wait" layout>

            {/* PAGE 0: ABOUT */}
            {activePage === 'about' && (
              <motion.div key="about" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col w-full pb-10">
                <div className="flex flex-col items-center justify-center min-h-[55vh] text-center mb-40 relative mt-4">
                  <motion.h1 variants={fadeUp} className="text-[72px] md:text-[110px] font-[Satoshi] font-extrabold tracking-[-0.04em] mb-8 leading-[1.05] drop-shadow-sm text-slate-900">
                    Global Trade.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900">Automated by AI.</span>
                  </motion.h1>
                  <motion.p variants={fadeUp} className="text-[22px] md:text-[24px] text-slate-500 font-medium max-w-[800px] leading-[1.6] mb-16">
                    Replace manual compliance with autonomous infrastructure. Novaport digitizes commercial documents, instantly audits regulatory risk, and maps complex global tariffs with unprecedented precision.
                  </motion.p>
                  <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto">
                    <PrimaryButton onClick={() => changePage('extraction')} icon={ArrowRight}>
                      Start Extraction
                    </PrimaryButton>
                    <SecondaryButton onClick={() => changePage('compliance')} icon={Activity}>
                      Run Compliance Audit
                    </SecondaryButton>
                  </motion.div>
                </div>

                <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[48px] p-12 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
                    <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-blue-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center text-slate-900 mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Boxes size={36} strokeWidth={1.5}/></div>
                      <h3 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-4 tracking-[-0.03em]">Cognitive Extraction</h3>
                      <p className="text-[17px] text-slate-500 font-medium leading-[1.7]">Transform unstructured commercial PDFs into precise JSON schemas instantly. Perfect mapping of line items and incoterms.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[48px] p-12 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
                    <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-indigo-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center text-slate-900 mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Activity size={36} strokeWidth={1.5}/></div>
                      <h3 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-4 tracking-[-0.03em]">Automated Auditing</h3>
                      <p className="text-[17px] text-slate-500 font-medium leading-[1.7]">Cross-reference shipments against global trade corridors. Detect missing certificates and mathematical anomalies preemptively.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[48px] p-12 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
                    <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-cyan-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center text-slate-900 mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Cpu size={36} strokeWidth={1.5}/></div>
                      <h3 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-4 tracking-[-0.03em]">HS Generator</h3>
                      <p className="text-[17px] text-slate-500 font-medium leading-[1.7]">Stop manually searching through thousands of HS codes. Our NLP models instantly predict the exact 6-digit global tariff for any item.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleUp} whileHover={{ y: -8, scale: 1.005 }} transition={fluidSpring} className="md:col-span-3 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-[48px] p-14 md:p-20 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5),_inset_0_2px_0_rgba(255,255,255,0.1)] group text-white">
                    <div className="absolute -left-20 -bottom-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
                    <Globe className="absolute -left-10 -bottom-10 text-white/5 transform rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms] ease-out" size={400} strokeWidth={1}/>
                    
                    <div className="relative z-10 max-w-[750px]">
                      <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-[14px] bg-white/10 border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] text-white text-[12px] font-bold uppercase tracking-[0.2em] mb-10 font-[Satoshi] backdrop-blur-md">Predictive Intelligence</div>
                      <h3 className="text-[48px] md:text-[56px] font-[Satoshi] font-extrabold text-white mb-8 tracking-[-0.04em] leading-[1.1]">Pre-empt Customs Holds Before They Happen</h3>
                      <p className="text-[20px] text-slate-300 font-medium leading-[1.7]">Our neural architecture maps your entire export payload against real-time global trade regulations, geopolitical risk factors, and millions of historical clearance records—neutralizing compliance bottlenecks before your cargo even leaves the dock.</p>
                    </div>
                    <div className="relative z-10 shrink-0">
                      <button onClick={() => changePage('compliance')} className="group/btn flex items-center gap-4 bg-white text-slate-900 px-10 py-6 rounded-[32px] font-bold font-[Satoshi] text-[18px] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] border border-white hover:scale-105 transition-all duration-500">
                        Run Risk Assessment <ArrowRight size={22} className="group-hover/btn:translate-x-1.5 transition-transform duration-500"/>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>

                {/* NEW CAPABILITIES SECTION */}
                <motion.div variants={scaleUp} className="mt-10 bg-white/60 backdrop-blur-3xl border border-white rounded-[48px] p-14 md:p-20 relative overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)]">
                  <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl">
                       <h3 className="text-[36px] md:text-[48px] font-[Satoshi] font-extrabold text-slate-900 mb-6 tracking-[-0.03em] leading-tight">Built for speed.<br/>Designed for scale.</h3>
                       <p className="text-[18px] text-slate-500 font-medium leading-[1.8] mb-8">Whether you are verifying commercial invoices, parsing complex shipping bills, or validating certificates of origin, Novaport's architecture processes multi-page PDFs in milliseconds. Secure, scalable, and relentlessly accurate.</p>
                       <div className="flex flex-wrap gap-4">
                          <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-[16px] text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> Commercial Invoices</span>
                          <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-[16px] text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> Shipping Bills</span>
                          <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-[16px] text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> Certificates of Origin</span>
                       </div>
                    </div>
                    <div className="flex-shrink-0 relative mt-10 md:mt-0">
                       <div className="w-64 h-64 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-8 border-white relative z-10">
                         <Zap size={80} className="text-white" strokeWidth={1} />
                       </div>
                       <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20px] border border-dashed border-slate-300 rounded-full z-0"></motion.div>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            )}

            {/* PAGE 1: EXTRACTION */}
            {activePage === 'extraction' && (
              <motion.div key="extract" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <UploadBox title="Data Extraction" description="Digitize commercial documents instantly. Upload a PDF to map fields directly to structured JSON schema with 99.9% accuracy." buttonText="Digitize Document" file={file} setFile={setFile} loading={loading} onUpload={(e) => handleFileUpload(e, 'extract')} icon={Boxes} selectedFields={selectedFields} setSelectedFields={setSelectedFields} activePage={activePage}/>
                ) : (
                  <div className="space-y-16">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-8">
                      <div>
                        <h2 className="text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">Structured Payload</h2>
                      </div>
                      <div className="flex items-center gap-5">
                        <SecondaryButton onClick={handleDownload} icon={Download}>
                          Export JSON
                        </SecondaryButton>
                        <PrimaryButton onClick={() => changePage('extraction')} icon={ListPlus}>
                          New Scan
                        </PrimaryButton>
                      </div>
                    </div>

                    <motion.div variants={scaleUp} className="bg-white/70 backdrop-blur-3xl rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1),_inset_0_2px_0_rgba(255,255,255,1)] border border-white overflow-hidden relative">
                      
                      <div className="p-12 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200/60 gap-10 bg-slate-50/50 relative">
                        <div className="flex items-center gap-8">
                          <div className="w-24 h-24 bg-white rounded-[28px] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex items-center justify-center flex-shrink-0"><FileText size={40} className="text-slate-900" strokeWidth={1.5}/></div>
                          <div>
                            <h3 className="font-[Satoshi] font-extrabold text-[36px] tracking-[-0.03em] text-slate-900 mb-4">{results.document_type || "Commercial Document"}</h3>
                            <div className="flex flex-wrap items-center gap-5">
                              <span className="flex items-center gap-2.5 text-slate-600 font-bold font-[Satoshi] text-[15px] bg-white px-5 py-2.5 rounded-[16px] border border-slate-200 shadow-sm"><Hash size={18} className="text-slate-400"/> {results.invoice_number}</span>
                              <span className="flex items-center gap-2.5 text-slate-600 font-bold font-[Satoshi] text-[15px] bg-white px-5 py-2.5 rounded-[16px] border border-slate-200 shadow-sm"><Calendar size={18} className="text-slate-400"/> {results.invoice_date}</span>
                            </div>
                          </div>
                        </div>
                        {results.missing_fields?.length > 0 && (
                          <div className="flex items-center gap-3 bg-white border border-red-100 text-red-700 px-6 py-4 rounded-[20px] text-[15px] font-bold shadow-[0_10px_30px_rgba(239,68,68,0.1)] font-[Satoshi]">
                            <AlertCircle size={20} /> {results.missing_fields.length} Missing Fields
                          </div>
                        )}
                      </div>

                      <div className="p-12 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/40">
                        {selectedFields?.includes('entities') && (
                          <div className="space-y-6">
                            <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-8 font-[Satoshi]"><Globe size={18}/> Trade Entities</h4>
                            <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-2 h-full bg-slate-900"></div>
                              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 font-[Satoshi]">Shipper / Exporter</p>
                              <p className="text-[28px] font-[Satoshi] font-bold text-slate-900 leading-tight">{results.shipper_name !== "N/A" ? results.shipper_name : "Not Extracted"}</p>
                            </motion.div>
                            <div className="flex justify-center -my-4 relative z-10"><div className="bg-white border border-slate-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] p-3 rounded-full text-slate-400"><ArrowRight size={20} /></div></div>
                            <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-2 h-full bg-slate-400"></div>
                              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 font-[Satoshi]">Consignee / Importer</p>
                              <p className="text-[28px] font-[Satoshi] font-bold text-slate-900 leading-tight">{results.consignee_name !== "N/A" ? results.consignee_name : "Not Extracted"}</p>
                            </motion.div>
                          </div>
                        )}
                        
                        {selectedFields?.includes('logistics') && (
                          <div className="space-y-6">
                            <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-8 font-[Satoshi]"><MapPin size={18}/> Logistics Framework</h4>
                            <div className="grid grid-cols-2 gap-6">
                              <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">Origin</p>
                                <p className="font-[Satoshi] font-extrabold text-slate-900 text-[26px] tracking-tight">{results.origin_country !== "N/A" ? results.origin_country : "-"}</p>
                                <p className="text-[15px] text-slate-500 mt-2 font-medium truncate">{results.port_of_loading !== "N/A" ? results.port_of_loading : ""}</p>
                              </motion.div>
                              <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">Destination</p>
                                <p className="font-[Satoshi] font-extrabold text-slate-900 text-[26px] tracking-tight">{results.destination_country !== "N/A" ? results.destination_country : "-"}</p>
                                <p className="text-[15px] text-slate-500 mt-2 font-medium truncate">{results.port_of_discharge !== "N/A" ? results.port_of_discharge : ""}</p>
                              </motion.div>
                              <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="col-span-2 p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex justify-between items-center">
                                <div>
                                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">Method & Terms</p>
                                  <p className="font-[Satoshi] font-extrabold text-slate-900 flex items-center gap-3 text-[28px] tracking-tight">{results.shipping_method !== "N/A" ? results.shipping_method : "-"} <span className="text-slate-300 font-normal">/</span> <span className="text-slate-600">{results.incoterms !== "N/A" ? results.incoterms : "-"}</span></p>
                                </div>
                                <div className="text-right border-l border-slate-200 pl-10">
                                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">Total Payload</p>
                                  <p className="font-[Satoshi] font-extrabold text-slate-900 text-[36px] tracking-tight">{results.total_weight_kg || 0} <span className="text-[18px] text-slate-500 font-bold">kg</span></p>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </div>

                      {selectedFields?.includes('products') && results.line_items && results.line_items.length > 0 && (
                        <div className="border-t border-slate-200/80 bg-white relative">
                          <div className="p-12 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-slate-100">
                            <h4 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 flex items-center gap-4"><Package size={32} className="text-slate-900" strokeWidth={1.5} /> Extracted Line Items</h4>
                            <div className="bg-slate-50 border border-slate-200 px-8 py-5 rounded-[24px] text-[18px] font-bold font-[Satoshi] text-slate-800 flex items-center gap-5 shadow-inner">
                              <div className="p-2.5 bg-white border border-slate-200 text-slate-900 rounded-[14px] shadow-sm"><DollarSign size={24} strokeWidth={2.5} /></div> Invoice Total: <span className="text-slate-900 text-[32px] font-black tracking-tight">${results.total_value_usd?.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="p-12 md:px-16 bg-slate-50/50">
                            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                              {results.line_items?.map((item, idx) => (
                                <motion.div key={idx} variants={fadeUp} whileHover={{ y: -4, scale: 1.005, shadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row justify-between items-start md:items-center gap-10 group relative overflow-hidden">
                                  <div className="flex-1">
                                    <p className="font-bold font-[Satoshi] text-slate-900 text-[20px] mb-5">{item.product_description}</p>
                                    <div className="flex flex-wrap gap-4 text-[15px] font-bold font-[Satoshi] text-slate-500">
                                      <span className="flex items-center gap-2 bg-slate-50 px-5 py-2.5 rounded-[16px] border border-slate-200"><Hash size={18} className="text-slate-400"/> HS: <span className="font-mono text-slate-800 tracking-tight">{item.hs_code}</span></span>
                                      <span className="bg-slate-50 px-5 py-2.5 rounded-[16px] border border-slate-200">Qty: <span className="text-slate-800">{item.quantity}</span></span>
                                      <span className="bg-slate-50 px-5 py-2.5 rounded-[16px] border border-slate-200">Wgt: <span className="text-slate-800">{item.weight_kg} kg</span></span>
                                    </div>
                                  </div>
                                  <div className="md:text-right w-full md:w-auto bg-slate-50/50 md:bg-transparent p-6 md:p-0 rounded-[20px]">
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 font-[Satoshi]">Declared Value</p>
                                    <p className="font-[Satoshi] font-black text-[36px] text-slate-900 tracking-tight">${item.value_usd?.toLocaleString()}</p>
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

            {/* PAGE 2: COMPLIANCE CHECKER */}
            {activePage === 'compliance' && (
              <motion.div key="comp" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <UploadBox title="Compliance Audit" description="Enterprise-grade clearance checks. Validate documents against global trade regulations with deep neural inspection." buttonText="Initiate Audit" file={file} setFile={setFile} loading={loading} onUpload={(e) => handleFileUpload(e, 'compliance')} icon={Activity}/>
                ) : (
                  <div className="space-y-16">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h2 className="text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">Audit Report</h2>
                      </div>
                      <PrimaryButton onClick={() => changePage('compliance')} icon={Activity}>
                        New Audit
                      </PrimaryButton>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="col-span-1 lg:col-span-2 space-y-12">
                        
                        <motion.div variants={scaleUp} className={`p-12 md:p-16 rounded-[48px] border flex flex-col md:flex-row items-start md:items-center gap-12 bg-white/80 backdrop-blur-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden ${results.status === 'RED' ? 'border-red-200' : results.status === 'YELLOW' ? 'border-yellow-300' : 'border-emerald-200'}`}>
                          <div className={`absolute top-[-50%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none ${results.status === 'RED' ? 'bg-red-500' : results.status === 'YELLOW' ? 'bg-yellow-500' : 'bg-emerald-500'}`}></div>

                          <div className={`w-32 h-32 rounded-[32px] border shadow-[0_20px_50px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] flex items-center justify-center flex-shrink-0 z-10 ${results.status === 'RED' ? 'bg-white border-red-200 text-red-600' : results.status === 'YELLOW' ? 'bg-white border-yellow-200 text-yellow-600' : 'bg-white border-emerald-200 text-emerald-600'}`}>
                            {results.status === 'GREEN' ? <CheckCircle size={64} strokeWidth={1.5}/> : <ShieldAlert size={64} strokeWidth={1.5}/>}
                          </div>
                          
                          <div className="flex-1 w-full z-10">
                            <h3 className={`text-[36px] md:text-[44px] font-[Satoshi] font-extrabold tracking-tight mb-10 leading-[1.1] ${results.status === 'RED' ? 'text-red-700' : results.status === 'YELLOW' ? 'text-yellow-700' : 'text-emerald-700'}`}>
                              {results.status === 'RED' ? 'HIGH RISK — DO NOT SHIP' : results.status === 'YELLOW' ? 'WARNING — ACTION NEEDED' : 'APPROVED — CLEAR TO SHIP'}
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="p-8 rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                                <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-400 font-[Satoshi]">Hold Probability</p>
                                <p className={`text-[32px] font-[Satoshi] font-extrabold tracking-tight ${results.status === 'RED' ? 'text-red-700' : 'text-slate-900'}`}>{results.customs_hold_probability || "N/A"}</p>
                              </div>
                              <div className="p-8 rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                                <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-400 font-[Satoshi]">Estimated Loss</p>
                                <p className={`text-[32px] font-[Satoshi] font-extrabold tracking-tight ${results.status === 'RED' ? 'text-red-700' : 'text-slate-900'}`}>{results.estimated_loss || "N/A"}</p>
                              </div>
                              <div className="p-8 rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                                <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-400 font-[Satoshi]">Suggested Action</p>
                                <p className={`text-[18px] font-bold font-[Satoshi] leading-snug ${results.status === 'RED' ? 'text-red-700' : 'text-slate-800'}`}>{results.headline_action || "Review required"}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-3xl p-12 md:p-16 rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] border border-white">
                          <h3 className="text-[32px] font-[Satoshi] font-extrabold mb-12 text-slate-900 flex items-center gap-5"><AlertTriangle size={36} className="text-slate-900" strokeWidth={1.5}/> Regulatory Anomalies</h3>
                          {results.compliance_report?.length === 0 ? (
                            <div className="text-center py-24 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-[inset_0_10px_40px_rgba(0,0,0,0.02)]">
                               <div className="w-24 h-24 bg-white text-emerald-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-emerald-100 shadow-[0_15px_40px_rgba(16,185,129,0.15)]"><CheckCircle size={48} strokeWidth={1.5}/></div>
                               <p className="text-slate-900 font-extrabold font-[Satoshi] text-[24px] mb-3">No regulatory violations detected.</p>
                               <p className="text-slate-500 text-[18px] font-medium max-w-md mx-auto">Shipment meets all international compliance standards and is clear for dispatch.</p>
                            </div>
                          ) : (
                            <div className="space-y-8">
                              {results.compliance_report?.map((issue, idx) => (
                                <motion.div whileHover={{ scale: 1.01, y: -5, shadow: "0 30px_60px_-15px_rgba(0,0,0,0.1)" }} transition={fluidSpring} key={idx} className="p-10 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white flex gap-10 relative overflow-hidden">
                                  <div className={`absolute left-0 top-0 bottom-0 w-2.5 ${issue.severity === 'HIGH' ? 'bg-red-500' : issue.severity === 'MEDIUM' ? 'bg-yellow-400' : 'bg-slate-900'}`} />
                                  <div className="mt-2"><span className={`px-5 py-2 text-[12px] font-bold rounded-[12px] uppercase tracking-[0.2em] border ${issue.severity === 'HIGH' ? 'bg-red-50 text-red-700 border-red-200' : issue.severity === 'MEDIUM' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-slate-50 text-slate-800 border-slate-200'}`}>{issue.severity}</span></div>
                                  <div className="flex-1">
                                    <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">{issue.type}</p>
                                    <p className="text-[20px] text-slate-900 font-bold font-[Satoshi] mb-8 leading-relaxed">{issue.description}</p>
                                    <div className="bg-slate-50/80 px-8 py-6 rounded-[24px] border border-slate-200 shadow-inner"><p className="text-[16px] flex flex-col md:flex-row md:items-start gap-5"><span className="font-bold font-[Satoshi] text-slate-700 uppercase tracking-[0.2em] text-[12px] bg-white border border-slate-200 px-4 py-2 rounded-[10px] inline-block mt-0.5 shadow-sm">Action Required</span><span className="text-slate-800 font-medium leading-relaxed">{issue.fix}</span></p></div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>

                      <div className="col-span-1">
                        {results.carbon_footprint && (
                          <motion.div variants={scaleUp} className="bg-gradient-to-b from-white to-emerald-50/50 p-12 md:p-14 rounded-[48px] border border-emerald-100 shadow-[0_30px_80px_-20px_rgba(16,185,129,0.15),_inset_0_2px_0_rgba(255,255,255,1)] h-full flex flex-col relative overflow-hidden group">
                            <Leaf className="absolute -bottom-10 -right-10 text-emerald-900/5 transform rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-[2000ms] ease-out" size={350} strokeWidth={1} />
                            <div className="relative z-10 flex flex-col h-full">
                              <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-12 flex items-center gap-3 text-emerald-700 font-[Satoshi] bg-white border border-emerald-200 w-max px-5 py-2.5 rounded-[16px] shadow-[0_10px_20px_rgba(16,185,129,0.08)]">
                                <Leaf size={18}/> Scope 3 Analytics
                              </h3>
                              
                              <div className="mb-14">
                                <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-5 font-[Satoshi]">Transit Emissions</p>
                                <div className="flex items-baseline gap-4 mb-3">
                                  <span className="text-[72px] font-[Satoshi] font-black text-slate-900 tracking-[-0.04em] leading-none drop-shadow-sm">{results.carbon_footprint.co2_emissions_kg}</span>
                                </div>
                                <span className="text-emerald-600 font-extrabold font-[Satoshi] text-[24px] tracking-tight">kg CO₂e</span>
                                
                                <div className="mt-10 flex flex-wrap items-center gap-4">
                                  <p className="text-[15px] font-bold font-[Satoshi] text-emerald-900 bg-white px-6 py-3 rounded-[16px] border border-emerald-200 shadow-[0_8px_20px_rgba(16,185,129,0.06)]">Via {results.carbon_footprint.mode_used}</p>
                                  <p className="text-[15px] font-medium text-slate-500">{results.carbon_footprint.distance_km} km Route</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-6 mb-auto">
                                <div className="bg-white p-8 rounded-[28px] border border-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,0.05)]">
                                  <p className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mb-4 font-[Satoshi]">Tree Offset</p>
                                  <p className="text-[32px] font-[Satoshi] font-black tracking-tight text-emerald-600">{results.carbon_footprint.trees_equivalent}</p>
                                </div>
                                <div className="bg-white p-8 rounded-[28px] border border-emerald-100 shadow-[0_10px_30px_rgba(16,185,129,0.05)]">
                                  <p className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mb-4 font-[Satoshi]">Device Charges</p>
                                  <p className="text-[32px] font-[Satoshi] font-black tracking-tight text-emerald-600">{results.carbon_footprint.smartphones_equivalent}</p>
                                </div>
                              </div>

                              {results.carbon_footprint.potential_savings_kg > 0 && (
                                <div className="bg-slate-900 p-10 rounded-[32px] flex flex-col gap-4 mt-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4),_inset_0_2px_0_rgba(255,255,255,0.2)] relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/20 rounded-full blur-[60px]"></div>
                                  <div className="flex items-center gap-3 text-emerald-300 relative z-10"><Sparkles size={18}/> <span className="text-[12px] font-bold uppercase tracking-[0.2em] font-[Satoshi]">Optimization Insight</span></div>
                                  <p className="text-[18px] font-medium text-slate-300 leading-relaxed mt-2 relative z-10">
                                    Switch to <span className="text-white font-bold font-[Satoshi]">Ocean Freight</span> to save <span className="font-black text-white block text-[32px] mt-3 font-[Satoshi] drop-shadow-md">{results.carbon_footprint.potential_savings_kg} kg CO₂e</span>
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

            {/* PAGE 3: HS GENERATOR */}
            {activePage === 'hscode' && (
              <motion.div key="hs" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <motion.div variants={stagger} className="mt-12 text-center max-w-[850px] mx-auto z-10 relative">
                    <motion.div variants={fadeUp} className="mb-16">
                      <motion.div whileHover={{ scale: 1.05, rotate: 5, y: -5 }} transition={fluidSpring} className="inline-flex items-center justify-center w-28 h-28 rounded-[32px] bg-white border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] mb-10 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                         <Cpu size={44} strokeWidth={1.5} className="text-slate-900 relative z-10 group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                      </motion.div>
                      <h2 className="text-[64px] md:text-[80px] font-[Satoshi] font-extrabold text-slate-900 mb-6 tracking-[-0.04em] leading-[1.05] drop-shadow-sm">HS Generator</h2>
                      <p className="text-[20px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">Stop manually searching through thousands of HS codes. Our NLP models analyze product descriptions, material compositions, and intended use to instantly generate the exact 6-digit global tariff.</p>
                    </motion.div>
                    
                    <motion.div variants={fadeUp} className="bg-white/60 backdrop-blur-3xl p-6 rounded-[48px] border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)]">
                      <form onSubmit={handleHSCodeGenerate} className="flex flex-col gap-6">
                        <div className="relative">
                          <textarea 
                            rows="4" value={hsInputText} onChange={(e) => setHsInputText(e.target.value)}
                            placeholder="e.g. 100% Cotton Men's Woven Formal Shirts, long sleeve..."
                            className="w-full bg-slate-50/50 border-2 border-slate-200/80 rounded-[40px] p-12 text-[22px] font-medium font-[Satoshi] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all duration-500 resize-none shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)]"
                            required
                          />
                        </div>
                        
                        <PrimaryButton 
                          type="submit" 
                          icon={Cpu}
                          disabled={!hsInputText.trim() || loading} 
                          className="w-full py-6 rounded-[32px] text-[18px]"
                        >
                          {loading ? <><Loader2 className="animate-spin" size={22}/> <span>Running Neural Diagnostic...</span></> : <span>Generate HS Code</span>}
                        </PrimaryButton>
                      </form>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="space-y-16">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h2 className="text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">Classification Results</h2>
                        <p className="text-slate-500 font-medium mt-4 text-[20px]">Review primary HS code and AI reasoning matrix.</p>
                      </div>
                      <SecondaryButton onClick={() => changePage('hscode')} icon={FileSearch}>
                        New Product
                      </SecondaryButton>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="col-span-1 lg:col-span-2 space-y-12">
                        
                        <motion.div variants={scaleUp} className="bg-white/80 backdrop-blur-3xl p-14 md:p-16 rounded-[48px] border border-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-14">
                          <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-slate-100/50 rounded-full blur-[120px] pointer-events-none"></div>

                          <div className="z-10">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3 font-[Satoshi]"><Globe size={18}/> Primary Code (Export)</p>
                            <h3 className="text-[80px] md:text-[110px] font-black font-mono tracking-tighter text-slate-900 leading-none drop-shadow-sm">{results.primary_hs_code}</h3>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center bg-white p-12 rounded-[40px] border border-slate-100 z-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
                            <div className="relative w-40 h-40 flex items-center justify-center mb-10">
                               <svg className="w-full h-full transform -rotate-90 filter drop-shadow-sm" viewBox="0 0 100 100">
                                 <circle cx="50" cy="50" r="45" fill="none" stroke="#f8fafc" strokeWidth="8" />
                                 <motion.circle cx="50" cy="50" r="45" fill="none" stroke={results.confidence_percentage >= 80 ? '#0f172a' : results.confidence_percentage >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="8" strokeLinecap="round" strokeDasharray="283" initial={{ strokeDashoffset: 283 }} animate={{ strokeDashoffset: 283 - (283 * results.confidence_percentage) / 100 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} />
                               </svg>
                               <div className="absolute flex flex-col items-center mt-1">
                                 <span className="text-[40px] font-[Satoshi] font-black text-slate-900 tracking-tight">{results.confidence_percentage}</span>
                                 <span className="text-[16px] font-bold text-slate-500 mt-[-8px]">%</span>
                               </div>
                            </div>
                            <span className={`px-8 py-3 rounded-[16px] font-bold font-[Satoshi] uppercase tracking-[0.2em] text-[12px] shadow-sm border ${results.confidence_percentage >= 80 ? 'bg-slate-900 text-white border-slate-800' : results.confidence_percentage >= 50 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                              {results.confidence_label} MATCH
                            </span>
                          </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-3xl p-14 md:p-16 rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden border border-white">
                          <div className="relative z-10 space-y-14">
                            <div>
                              <p className="text-[13px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-[Satoshi]"><Sparkles size={18}/> Official Description</p>
                              <p className="text-[24px] font-bold font-[Satoshi] text-slate-900 leading-relaxed">{results.official_description}</p>
                            </div>
                            <div>
                              <p className="text-[13px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-[Satoshi]"><Zap size={18}/> Diagnostic Reasoning</p>
                              <p className="text-slate-600 font-medium leading-[1.8] text-[18px] bg-slate-50/80 p-10 rounded-[32px] border border-slate-100 shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)]">{results.explanation}</p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
                          <h3 className="text-[14px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2.5 ml-2 font-[Satoshi]"><ListPlus size={20}/> Alternatives</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {results.alternatives?.map((alt, idx) => (
                              <motion.div variants={fadeUp} whileHover={{ y: -8, shadow: "0 30px 60px -15px rgba(0,0,0,0.08)", scale: 1.02 }} transition={fluidSpring} key={idx} className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full group">
                                <div>
                                  <div className="flex justify-between items-center mb-6">
                                    <span className="font-mono font-bold text-[22px] text-slate-900 group-hover:text-slate-600 transition-colors">{alt.code}</span>
                                    <span className="text-[13px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-[12px]">{alt.confidence_percentage}%</span>
                                  </div>
                                  <p className="text-[15px] font-medium text-slate-500 leading-relaxed group-hover:text-slate-800 transition-colors">{alt.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                      </div>

                      <motion.div variants={fadeUp} className="col-span-1 h-full">
                        <div className="bg-white/80 backdrop-blur-3xl p-12 md:p-16 rounded-[48px] border border-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] h-full flex flex-col">
                          <h3 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-12 flex items-center gap-4 border-b border-slate-200/60 pb-10"><ShieldCheck size={32} className="text-slate-900" strokeWidth={1.5}/> Trade Intelligence</h3>
                          
                          <div className="space-y-14 flex-1">
                            <div>
                              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2.5 font-[Satoshi]"><Percent size={18}/> Standard Duty</p>
                              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                                <p className="font-[Satoshi] font-black text-slate-900 text-[32px] tracking-tight">{results.duty_rate}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2.5 font-[Satoshi]"><FileText size={18}/> Certificates</p>
                              <div className="space-y-5">
                                {results.required_certificates?.map((cert, idx) => (
                                  <div key={idx} className="flex items-start gap-5 p-6 rounded-[24px] bg-slate-50 border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.03)] text-slate-900">
                                    <CheckCircle size={22} className="text-slate-900 mt-0.5 flex-shrink-0" />
                                    <p className="text-[16px] font-bold font-[Satoshi] leading-snug">{cert}</p>
                                  </div>
                                ))}
                                {results.required_certificates?.length === 0 && (
                                  <p className="text-[16px] font-medium text-slate-500 italic p-8 bg-slate-50/50 rounded-[28px] border border-slate-100 text-center">No special certificates required.</p>
                                )}
                              </div>
                            </div>

                            <div className="mt-auto pt-12 border-t border-slate-200/60">
                              <p className="text-[12px] font-bold text-yellow-600 uppercase tracking-[0.2em] mb-5 flex items-center gap-2.5 font-[Satoshi]"><AlertCircle size={18}/> Special Notes</p>
                              <div className="bg-yellow-50/80 p-8 rounded-[32px] border border-yellow-100 shadow-inner">
                                <p className="text-[16px] font-medium text-yellow-800 leading-[1.8]">{results.special_notes}</p>
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

      <Footer onOpenModal={setActiveModalKey} changePage={changePage} />
      <TradeBot />
    </div>
  );
}

export default App;