import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Loader2, FileSearch, Globe, Sparkles, Zap, ListPlus, ShieldCheck, Percent, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { pageVariants, fadeUp, scaleUp, stagger, fluidSpring, PrimaryButton, SecondaryButton } from '../App';

export default function HSCodePage({ activeDict, changePage, hsInputText, setHsInputText, loading, onSubmit, results }) {
  return (
    <motion.div key="hs" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
      {!results ? (
        <motion.div variants={stagger} className="mt-8 md:mt-12 text-center max-w-[850px] mx-auto z-10 relative">
          <motion.div variants={fadeUp} className="mb-10 md:mb-16 px-4">
            <motion.div whileHover={{ scale: 1.05, rotate: 5, y: -5 }} transition={fluidSpring} className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-[24px] md:rounded-[32px] bg-white border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] mb-6 md:mb-10 relative overflow-hidden group">
               <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               <Cpu size={36} strokeWidth={1.5} className="text-slate-900 relative z-10 group-hover:scale-110 transition-transform duration-700 md:w-11 md:h-11" />
            </motion.div>
            <h2 className="text-[42px] md:text-[80px] font-[Satoshi] font-extrabold text-slate-900 mb-4 md:mb-6 tracking-[-0.04em] leading-[1.05] drop-shadow-sm">{activeDict.hs_gen_title}</h2>
            <p className="text-[16px] md:text-[20px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{activeDict.hs_gen_desc}</p>
          </motion.div>
          
          <motion.div variants={fadeUp} className="bg-white/60 backdrop-blur-3xl p-4 md:p-6 rounded-[32px] md:rounded-[48px] border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] mx-4 md:mx-0">
            <form onSubmit={onSubmit} className="flex flex-col gap-4 md:gap-6">
              <div className="relative">
                <textarea 
                  rows="4" value={hsInputText} onChange={(e) => setHsInputText(e.target.value)}
                  placeholder={activeDict.hs_placeholder}
                  className="w-full bg-slate-50/50 border-2 border-slate-200/80 rounded-[24px] md:rounded-[40px] p-6 md:p-12 text-[16px] md:text-[22px] font-medium font-[Satoshi] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 focus:bg-white transition-all duration-500 resize-none shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)]"
                  required
                />
              </div>
              
              <PrimaryButton 
                type="submit" 
                icon={Cpu}
                disabled={!hsInputText.trim() || loading} 
                className="w-full py-5 md:py-6 rounded-[24px] md:rounded-[32px] text-[16px] md:text-[18px]"
              >
                {loading ? <><Loader2 className="animate-spin" size={20}/> <span>{activeDict.btn_processing}</span></> : <span>{activeDict.hs_btn}</span>}
              </PrimaryButton>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-10 md:space-y-16">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-6 md:mb-8">
            <div>
              <h2 className="text-[40px] md:text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">{activeDict.hs_res_title}</h2>
              <p className="text-slate-500 font-medium mt-2 md:mt-4 text-[16px] md:text-[20px]">{activeDict.hs_res_desc}</p>
            </div>
            <SecondaryButton onClick={() => changePage('hscode')} icon={FileSearch} className="w-full sm:w-auto">
              {activeDict.hs_new}
            </SecondaryButton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="col-span-1 lg:col-span-2 space-y-8 md:space-y-12">
              
              <motion.div variants={scaleUp} className="bg-white/80 backdrop-blur-3xl p-8 md:p-16 rounded-[32px] md:rounded-[48px] border border-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-14">
                <div className="absolute top-[-50%] left-[-20%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-slate-100/50 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"></div>

                <div className="z-10 text-center md:text-left w-full md:w-auto">
                  <p className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 md:mb-6 flex justify-center md:justify-start items-center gap-2 md:gap-3 font-[Satoshi]"><Globe size={18}/> {activeDict.hs_primary}</p>
                  <h3 className="text-[64px] sm:text-[80px] md:text-[110px] font-black font-mono tracking-tighter text-slate-900 leading-none drop-shadow-sm">{results.primary_hs_code}</h3>
                </div>
                
                <div className="flex flex-col items-center justify-center bg-white p-8 md:p-12 rounded-[28px] md:rounded-[40px] border border-slate-100 z-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] w-full md:w-auto">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-6 md:mb-10">
                     <svg className="w-full h-full transform -rotate-90 filter drop-shadow-sm" viewBox="0 0 100 100">
                       <circle cx="50" cy="50" r="45" fill="none" stroke="#f8fafc" strokeWidth="8" />
                       <motion.circle cx="50" cy="50" r="45" fill="none" stroke={results.confidence_percentage >= 80 ? '#0f172a' : results.confidence_percentage >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="8" strokeLinecap="round" strokeDasharray="283" initial={{ strokeDashoffset: 283 }} animate={{ strokeDashoffset: 283 - (283 * results.confidence_percentage) / 100 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} />
                     </svg>
                     <div className="absolute flex flex-col items-center mt-1">
                       <span className="text-[32px] md:text-[40px] font-[Satoshi] font-black text-slate-900 tracking-tight">{results.confidence_percentage}</span>
                       <span className="text-[14px] md:text-[16px] font-bold text-slate-500 mt-[-4px] md:mt-[-8px]">%</span>
                     </div>
                  </div>
                  <span className={`px-6 py-2.5 md:px-8 md:py-3 rounded-[14px] md:rounded-[16px] font-bold font-[Satoshi] uppercase tracking-[0.2em] text-[11px] md:text-[12px] shadow-sm border text-center ${results.confidence_percentage >= 80 ? 'bg-slate-900 text-white border-slate-800' : results.confidence_percentage >= 50 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {results.confidence_label} {activeDict.hs_match}
                  </span>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-3xl p-8 md:p-16 rounded-[32px] md:rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden border border-white">
                <div className="relative z-10 space-y-10 md:space-y-14">
                  <div>
                    <p className="text-[12px] md:text-[13px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-2 md:gap-3 font-[Satoshi]"><Sparkles size={16} className="md:w-[18px] md:h-[18px]"/> {activeDict.hs_official}</p>
                    <p className="text-[18px] md:text-[24px] font-bold font-[Satoshi] text-slate-900 leading-relaxed">{results.official_description}</p>
                  </div>
                  <div>
                    <p className="text-[12px] md:text-[13px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-2 md:gap-3 font-[Satoshi]"><Zap size={16} className="md:w-[18px] md:h-[18px]"/> {activeDict.hs_diag}</p>
                    <p className="text-slate-600 font-medium leading-[1.6] md:leading-[1.8] text-[15px] md:text-[18px] bg-slate-50/80 p-6 md:p-10 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)]">{results.explanation}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6 md:space-y-8">
                <h3 className="text-[13px] md:text-[14px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 md:gap-2.5 font-[Satoshi] ml-2"><ListPlus size={18} className="md:w-[20px] md:h-[20px]"/> {activeDict.hs_alt}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  {results.alternatives?.map((alt, idx) => (
                    <motion.div variants={fadeUp} whileHover={{ y: -8, shadow: "0 30px 60px -15px rgba(0,0,0,0.08)", scale: 1.02 }} transition={fluidSpring} key={idx} className="bg-white p-6 md:p-10 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full group">
                      <div>
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                          <span className="font-mono font-bold text-[18px] md:text-[22px] text-slate-900 group-hover:text-slate-600 transition-colors">{alt.code}</span>
                          <span className="text-[12px] md:text-[13px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 md:px-4 md:py-2 rounded-[10px] md:rounded-[12px]">{alt.confidence_percentage}%</span>
                        </div>
                        <p className="text-[14px] md:text-[15px] font-medium text-slate-500 leading-relaxed group-hover:text-slate-800 transition-colors">{alt.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>

            <motion.div variants={fadeUp} className="col-span-1 h-full mt-6 lg:mt-0">
              <div className="bg-white/80 backdrop-blur-3xl p-8 md:p-12 lg:p-16 rounded-[32px] md:rounded-[48px] border border-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] h-full flex flex-col">
                <h3 className="text-[24px] md:text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-8 md:mb-12 flex items-center gap-3 md:gap-4 border-b border-slate-200/60 pb-6 md:pb-10"><ShieldCheck size={28} className="text-slate-900 md:w-[32px] md:h-[32px]" strokeWidth={1.5}/> {activeDict.hs_intel}</h3>
                
                <div className="space-y-10 md:space-y-14 flex-1">
                  <div>
                    <p className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 md:mb-5 flex items-center gap-2 md:gap-2.5 font-[Satoshi]"><Percent size={16} className="md:w-[18px] md:h-[18px]"/> {activeDict.hs_duty}</p>
                    <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                      <p className="font-[Satoshi] font-black text-slate-900 text-[24px] md:text-[32px] tracking-tight">{results.duty_rate}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 md:mb-5 flex items-center gap-2 md:gap-2.5 font-[Satoshi]"><FileText size={16} className="md:w-[18px] md:h-[18px]"/> {activeDict.hs_certs}</p>
                    <div className="space-y-4 md:space-y-5">
                      {results.required_certificates?.map((cert, idx) => (
                        <div key={idx} className="flex items-start gap-4 md:gap-5 p-5 md:p-6 rounded-[20px] md:rounded-[24px] bg-slate-50 border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.03)] text-slate-900">
                          <CheckCircle size={20} className="text-slate-900 mt-0.5 flex-shrink-0 md:w-[22px] md:h-[22px]" />
                          <p className="text-[14px] md:text-[16px] font-bold font-[Satoshi] leading-snug">{cert}</p>
                        </div>
                      ))}
                      {results.required_certificates?.length === 0 && (
                        <p className="text-[14px] md:text-[16px] font-medium text-slate-500 italic p-6 md:p-8 bg-slate-50/50 rounded-[24px] md:rounded-[28px] border border-slate-100 text-center">{activeDict.hs_no_certs}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-8 md:pt-12 border-t border-slate-200/60">
                    <p className="text-[11px] md:text-[12px] font-bold text-yellow-600 uppercase tracking-[0.2em] mb-4 md:mb-5 flex items-center gap-2 md:gap-2.5 font-[Satoshi]"><AlertCircle size={16} className="md:w-[18px] md:h-[18px]"/> {activeDict.hs_notes}</p>
                    <div className="bg-yellow-50/80 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-yellow-100 shadow-inner">
                      <p className="text-[14px] md:text-[16px] font-medium text-yellow-800 leading-[1.6] md:leading-[1.8]">{results.special_notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}