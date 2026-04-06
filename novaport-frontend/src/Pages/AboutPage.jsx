import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Boxes, Cpu, Globe, Zap, FileText } from 'lucide-react';
import { pageVariants, fadeUp, scaleUp, stagger, fluidSpring, PrimaryButton, SecondaryButton, languages } from '../App';

export default function AboutPage({ activeDict, changePage, lang }) {
  return (
    <motion.div key="about" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col w-full pb-10">
      <div className="flex flex-col items-center justify-center min-h-[45vh] md:min-h-[55vh] text-center mb-24 md:mb-40 relative mt-4">
        <motion.h1 variants={fadeUp} className="text-[48px] sm:text-[64px] md:text-[90px] lg:text-[110px] font-[Satoshi] font-extrabold tracking-[-0.04em] mb-6 md:mb-8 leading-[1.05] drop-shadow-sm text-slate-900">
          {activeDict.hero_line1}<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900">{activeDict.hero_line2}</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-[18px] md:text-[24px] text-slate-500 font-medium max-w-[800px] leading-[1.6] mb-10 md:mb-16 px-2">
          {activeDict.hero_sub}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full sm:w-auto">
          <PrimaryButton onClick={() => changePage('extraction')} icon={ArrowRight}>
            {activeDict.btn_start_ext}
          </PrimaryButton>
          <SecondaryButton onClick={() => changePage('compliance')} icon={Activity}>
            {activeDict.btn_run_audit}
          </SecondaryButton>
        </motion.div>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[32px] md:rounded-[48px] p-8 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
          <div className={`absolute top-[-50px] w-[200px] h-[200px] bg-blue-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${languages[lang].dir === 'rtl' ? 'left-[-50px]' : 'right-[-50px]'}`}></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-[20px] md:rounded-[24px] flex items-center justify-center text-slate-900 mb-8 md:mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Boxes size={28} className="md:w-[36px] md:h-[36px]" strokeWidth={1.5}/></div>
            <h3 className="text-[24px] md:text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-3 md:mb-4 tracking-[-0.03em]">{activeDict.card1_title}</h3>
            <p className="text-[16px] md:text-[17px] text-slate-500 font-medium leading-[1.7]">{activeDict.card1_sub}</p>
          </div>
        </motion.div>

        <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[32px] md:rounded-[48px] p-8 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
          <div className={`absolute top-[-50px] w-[200px] h-[200px] bg-indigo-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${languages[lang].dir === 'rtl' ? 'left-[-50px]' : 'right-[-50px]'}`}></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-[20px] md:rounded-[24px] flex items-center justify-center text-slate-900 mb-8 md:mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Activity size={28} className="md:w-[36px] md:h-[36px]" strokeWidth={1.5}/></div>
            <h3 className="text-[24px] md:text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-3 md:mb-4 tracking-[-0.03em]">{activeDict.card2_title}</h3>
            <p className="text-[16px] md:text-[17px] text-slate-500 font-medium leading-[1.7]">{activeDict.card2_sub}</p>
          </div>
        </motion.div>

        <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[32px] md:rounded-[48px] p-8 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
          <div className={`absolute top-[-50px] w-[200px] h-[200px] bg-cyan-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ${languages[lang].dir === 'rtl' ? 'left-[-50px]' : 'right-[-50px]'}`}></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-[20px] md:rounded-[24px] flex items-center justify-center text-slate-900 mb-8 md:mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Cpu size={28} className="md:w-[36px] md:h-[36px]" strokeWidth={1.5}/></div>
            <h3 className="text-[24px] md:text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-3 md:mb-4 tracking-[-0.03em]">{activeDict.card3_title}</h3>
            <p className="text-[16px] md:text-[17px] text-slate-500 font-medium leading-[1.7]">{activeDict.card3_sub}</p>
          </div>
        </motion.div>

        <motion.div variants={scaleUp} whileHover={{ y: -8, scale: 1.005 }} transition={fluidSpring} className="md:col-span-3 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-[32px] md:rounded-[48px] p-8 md:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-16 relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5),_inset_0_2px_0_rgba(255,255,255,0.1)] group text-white">
          <div className={`absolute -bottom-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000 ${languages[lang].dir === 'rtl' ? '-right-20' : '-left-20'}`}></div>
          <Globe className={`absolute -bottom-10 text-white/5 transform rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms] ease-out w-[250px] md:w-[400px] h-[250px] md:h-[400px] ${languages[lang].dir === 'rtl' ? '-right-10' : '-left-10'}`} strokeWidth={1}/>
          
          <div className="relative z-10 max-w-[750px]">
            <div className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2 rounded-[12px] md:rounded-[14px] bg-white/10 border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] text-white text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-10 font-[Satoshi] backdrop-blur-md">{activeDict.pred_tag}</div>
            <h3 className="text-[32px] md:text-[56px] font-[Satoshi] font-extrabold text-white mb-4 md:mb-8 tracking-[-0.04em] leading-[1.1]">{activeDict.pred_title}</h3>
            <p className="text-[16px] md:text-[20px] text-slate-300 font-medium leading-[1.7]">{activeDict.pred_desc}</p>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <button onClick={() => changePage('compliance')} className="group/btn w-full md:w-auto flex justify-center items-center gap-3 md:gap-4 bg-white text-slate-900 px-8 py-5 md:px-10 md:py-6 rounded-[24px] md:rounded-[32px] font-bold font-[Satoshi] text-[16px] md:text-[18px] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] border border-white hover:scale-105 transition-all duration-500">
              {activeDict.pred_btn} <ArrowRight size={20} className="transition-transform duration-500 group-hover/btn:translate-x-1.5 md:w-[22px] md:h-[22px]"/>
            </button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div variants={scaleUp} className="mt-6 md:mt-10 bg-white/60 backdrop-blur-3xl border border-white rounded-[32px] md:rounded-[48px] p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)]">
        <div className={`absolute top-[-100px] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-100/50 rounded-full blur-[80px] md:blur-[100px] pointer-events-none ${languages[lang].dir === 'rtl' ? 'left-[50px] md:left-[-100px]' : 'right-[-50px] md:right-[-100px]'}`}></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
          <div className="max-w-2xl w-full">
              <h3 className="text-[32px] md:text-[48px] font-[Satoshi] font-extrabold text-slate-900 mb-4 md:mb-6 tracking-[-0.03em] leading-tight">{activeDict.speed_title1}<br/>{activeDict.speed_title2}</h3>
              <p className="text-[16px] md:text-[18px] text-slate-500 font-medium leading-[1.8] mb-6 md:mb-8">{activeDict.speed_desc}</p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <span className="px-4 py-2 md:px-5 md:py-2.5 bg-white border border-slate-200 rounded-[12px] md:rounded-[16px] text-[13px] md:text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> {activeDict.tag_invoice}</span>
                <span className="px-4 py-2 md:px-5 md:py-2.5 bg-white border border-slate-200 rounded-[12px] md:rounded-[16px] text-[13px] md:text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> {activeDict.tag_bill}</span>
                <span className="px-4 py-2 md:px-5 md:py-2.5 bg-white border border-slate-200 rounded-[12px] md:rounded-[16px] text-[13px] md:text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> {activeDict.tag_cert}</span>
              </div>
          </div>
          <div className="flex-shrink-0 mt-8 lg:mt-0 w-full lg:w-auto flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 bg-slate-900 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-[6px] md:border-8 border-white z-10">
                  <Zap className="text-white w-16 h-16 md:w-20 md:h-20" strokeWidth={1} />
                </div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-16px] md:inset-[-20px] border border-dashed border-slate-300 rounded-full z-0"></motion.div>
              </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}