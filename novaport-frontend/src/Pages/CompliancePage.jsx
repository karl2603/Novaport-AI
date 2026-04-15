import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, ShieldAlert, AlertTriangle, Leaf, Zap, Globe, FileText, Sparkles } from 'lucide-react';
import { pageVariants, fadeUp, scaleUp, stagger, fluidSpring, PrimaryButton, UploadBox } from '../App';

export default function CompliancePage({ activeDict, changePage, file, setFile, loading, onUpload, results, lang }) {
  return (
    <motion.div key="comp" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
      {!results ? (
        <UploadBox title={activeDict.card2_title} description={activeDict.card2_sub} buttonText={activeDict.btn_run_audit} file={file} setFile={setFile} loading={loading} onUpload={onUpload} icon={Activity} activePage="compliance" activeDict={activeDict}/>
      ) : (
        <div className="space-y-10 md:space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h2 className="text-[40px] md:text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">{activeDict.audit_report}</h2>
            </div>
            <PrimaryButton onClick={() => changePage('compliance')} icon={Activity} className="w-full md:w-auto">
              {activeDict.audit_new}
            </PrimaryButton>
          </div>

          <motion.div variants={scaleUp} className={`p-8 md:p-16 rounded-[32px] md:rounded-[48px] border flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 bg-white/80 backdrop-blur-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden ${results.status === 'RED' ? 'border-red-200' : results.status === 'YELLOW' ? 'border-yellow-300' : 'border-emerald-200'}`}>
            <div className={`absolute top-[-50%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-[100px] md:blur-[140px] opacity-20 pointer-events-none ${results.status === 'RED' ? 'bg-red-500' : results.status === 'YELLOW' ? 'bg-yellow-500' : 'bg-emerald-500'}`}></div>
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-[24px] md:rounded-[32px] border shadow-[0_20px_50px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] flex items-center justify-center flex-shrink-0 z-10 ${results.status === 'RED' ? 'bg-white border-red-200 text-red-600' : results.status === 'YELLOW' ? 'bg-white border-yellow-200 text-yellow-600' : 'bg-white border-emerald-200 text-emerald-600'}`}>
              {results.status === 'GREEN' ? <CheckCircle size={48} className="md:w-[64px] md:h-[64px]" strokeWidth={1.5}/> : <ShieldAlert size={48} className="md:w-[64px] md:h-[64px]" strokeWidth={1.5}/>}
            </div>
            <div className="flex-1 w-full z-10">
              <h3 className={`text-[28px] md:text-[44px] font-[Satoshi] font-extrabold tracking-tight mb-6 md:mb-10 leading-[1.1] ${results.status === 'RED' ? 'text-red-700' : results.status === 'YELLOW' ? 'text-yellow-700' : 'text-emerald-700'}`}>
                {results.status === 'RED' ? activeDict.audit_risk_high : results.status === 'YELLOW' ? activeDict.audit_risk_warn : activeDict.audit_risk_clear}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="p-6 md:p-8 rounded-[24px] md:rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 text-slate-400 font-[Satoshi]">{activeDict.audit_hold}</p>
                  <p className={`text-[24px] md:text-[32px] font-[Satoshi] font-extrabold tracking-tight ${results.status === 'RED' ? 'text-red-700' : 'text-slate-900'}`}>{results.customs_hold_probability || "N/A"}</p>
                </div>
                <div className="p-6 md:p-8 rounded-[24px] md:rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 text-slate-400 font-[Satoshi]">{activeDict.audit_loss}</p>
                  <p className={`text-[24px] md:text-[32px] font-[Satoshi] font-extrabold tracking-tight ${results.status === 'RED' ? 'text-red-700' : 'text-slate-900'}`}>{results.estimated_loss || "N/A"}</p>
                </div>
                <div className="p-6 md:p-8 rounded-[24px] md:rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                  <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 text-slate-400 font-[Satoshi]">{activeDict.audit_action}</p>
                  <p className={`text-[15px] md:text-[18px] font-bold font-[Satoshi] leading-snug ${results.status === 'RED' ? 'text-red-700' : 'text-slate-800'}`}>{results.headline_action}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-3xl p-8 md:p-16 rounded-[32px] md:rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] border border-white">
            <h3 className="text-[24px] md:text-[32px] font-[Satoshi] font-extrabold mb-8 md:mb-12 text-slate-900 flex items-center gap-4 md:gap-5"><AlertTriangle size={28} className="text-slate-900 md:w-[36px] md:h-[36px]" strokeWidth={1.5}/> {activeDict.audit_anomalies}</h3>
            {results.compliance_report?.length === 0 ? (
              <div className="text-center py-16 md:py-24 bg-slate-50/80 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[inset_0_10px_40px_rgba(0,0,0,0.02)]">
                 <div className="w-16 h-16 md:w-24 md:h-24 bg-white text-emerald-500 rounded-[20px] md:rounded-[32px] flex items-center justify-center mx-auto mb-6 md:mb-8 border border-emerald-100 shadow-[0_15px_40px_rgba(16,185,129,0.15)]"><CheckCircle size={36} className="md:w-[48px] md:h-[48px]" strokeWidth={1.5}/></div>
                 <p className="text-slate-900 font-extrabold font-[Satoshi] text-[20px] md:text-[24px] mb-2 md:mb-3">{activeDict.audit_no_violations}</p>
                 <p className="text-slate-500 text-[16px] md:text-[18px] font-medium max-w-md mx-auto">{activeDict.audit_clear_msg}</p>
              </div>
            ) : (
              <div className="space-y-6 md:space-y-8">
                {results.compliance_report?.map((issue, idx) => (
                  <motion.div whileHover={{ scale: 1.01, y: -5 }} transition={fluidSpring} key={idx} className="p-6 md:p-10 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white flex flex-col md:flex-row gap-6 md:gap-10 relative overflow-hidden">
                    <div className={`absolute left-0 top-0 md:bottom-0 h-2 md:h-auto w-full md:w-2.5 ${issue.severity === 'HIGH' ? 'bg-red-500' : issue.severity === 'MEDIUM' ? 'bg-yellow-400' : 'bg-slate-900'}`} />
                    <div className="mt-4 md:mt-2"><span className={`px-4 py-1.5 md:px-5 md:py-2 text-[11px] md:text-[12px] font-bold rounded-[10px] md:rounded-[12px] uppercase tracking-[0.2em] border ${issue.severity === 'HIGH' ? 'bg-red-50 text-red-700 border-red-200' : issue.severity === 'MEDIUM' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-slate-50 text-slate-800 border-slate-200'}`}>{issue.severity}</span></div>
                    <div className="flex-1">
                      <p className="text-[12px] md:text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4 font-[Satoshi]">{issue.type}</p>
                      <p className="text-[18px] md:text-[20px] text-slate-900 font-bold font-[Satoshi] mb-6 md:mb-8 leading-relaxed">{issue.description}</p>
                      <div className="bg-slate-50/80 px-6 py-5 md:px-8 md:py-6 rounded-[20px] md:rounded-[24px] border border-slate-200 shadow-inner"><p className="text-[15px] md:text-[16px] flex flex-col lg:flex-row lg:items-start gap-4 md:gap-5"><span className="font-bold font-[Satoshi] text-slate-700 uppercase tracking-[0.2em] text-[11px] md:text-[12px] bg-white border border-slate-200 px-3 py-1.5 md:px-4 md:py-2 rounded-[8px] md:rounded-[10px] inline-block mt-0.5 shadow-sm w-fit">{activeDict.audit_action_req}</span><span className="text-slate-800 font-medium leading-relaxed">{issue.fix}</span></p></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {results.carbon_footprint && (
            <motion.div variants={scaleUp} className="rounded-[32px] md:rounded-[56px] overflow-hidden border border-emerald-100 shadow-[0_40px_120px_-20px_rgba(16,185,129,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
              <div className="bg-slate-900 px-8 py-8 md:px-20 md:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:28px_28px]"></div>
                <div className="absolute top-0 left-0 md:left-1/3 w-[300px] md:w-[600px] h-[150px] md:h-[200px] bg-emerald-500/10 rounded-full blur-[60px] md:blur-[80px]"></div>
                <div className="relative z-10 flex items-center gap-4 md:gap-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-[16px] md:rounded-[18px] bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <Leaf size={24} className="text-emerald-400 md:w-[26px] md:h-[26px]" strokeWidth={1.5}/>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400 mb-1 font-[Satoshi]">{activeDict.carb_tag}</p>
                    <h3 className="text-[22px] md:text-[28px] font-[Satoshi] font-extrabold text-white tracking-tight">{activeDict.carb_title}</h3>
                  </div>
                </div>
                <div className="relative z-10 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 md:px-6 md:py-3 rounded-[14px] md:rounded-[16px] w-full lg:w-auto">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-[12px] md:text-[13px] font-bold text-emerald-300 font-[Satoshi]">{activeDict.carb_live} · {results.carbon_footprint.mode_used}</span>
                </div>
              </div>

              <div className="bg-gradient-to-b from-white to-emerald-50/30 px-6 py-8 md:px-20 md:pt-14 md:pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-14">
                  <div className="lg:col-span-1 bg-white rounded-[24px] md:rounded-[40px] p-8 md:p-12 border border-emerald-100 shadow-[0_20px_60px_rgba(16,185,129,0.08)] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-[120px] md:w-[180px] h-[120px] md:h-[180px] bg-emerald-100/60 rounded-full blur-[50px] md:blur-[60px]"></div>
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4 md:mb-6 font-[Satoshi]">{activeDict.carb_total}</p>
                    <div className="relative z-10">
                      <p className="text-[56px] md:text-[80px] font-[Satoshi] font-black text-slate-900 tracking-[-0.04em] leading-none">{results.carbon_footprint.co2_emissions_kg}</p>
                      <p className="text-[18px] md:text-[22px] font-bold text-emerald-600 font-[Satoshi] mt-2 md:mt-3">kg CO₂e</p>
                      <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                        <span className="px-4 py-2 md:px-5 md:py-2.5 bg-emerald-50 border border-emerald-200 rounded-[12px] md:rounded-[14px] text-[12px] md:text-[13px] font-bold text-emerald-800 font-[Satoshi]">{results.carbon_footprint.distance_km.toLocaleString()} km</span>
                        <span className="px-4 py-2 md:px-5 md:py-2.5 bg-slate-50 border border-slate-200 rounded-[12px] md:rounded-[14px] text-[12px] md:text-[13px] font-bold text-slate-700 font-[Satoshi]">{results.carbon_footprint.mode_used}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[16px] bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 md:mb-8">
                        <Leaf size={20} className="text-emerald-600 md:w-[22px] md:h-[22px]" strokeWidth={1.5}/>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 md:mb-3 font-[Satoshi]">{activeDict.carb_trees}</p>
                        <p className="text-[40px] md:text-[52px] font-[Satoshi] font-black text-emerald-600 tracking-[-0.03em] leading-none">{results.carbon_footprint.trees_equivalent}</p>
                        <p className="text-[14px] md:text-[15px] font-medium text-slate-500 mt-2 md:mt-3">{activeDict.carb_trees_sub}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[16px] bg-blue-50 border border-blue-100 flex items-center justify-center mb-6 md:mb-8">
                        <Zap size={20} className="text-blue-600 md:w-[22px] md:h-[22px]" strokeWidth={1.5}/>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 md:mb-3 font-[Satoshi]">{activeDict.carb_phones}</p>
                        <p className="text-[40px] md:text-[52px] font-[Satoshi] font-black text-blue-600 tracking-[-0.03em] leading-none">{results.carbon_footprint.smartphones_equivalent}</p>
                        <p className="text-[14px] md:text-[15px] font-medium text-slate-500 mt-2 md:mt-3">{activeDict.carb_phones_sub}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 bg-slate-50/80 rounded-[20px] md:rounded-[28px] p-6 md:p-8 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6">
                      <div className="flex items-center gap-3 md:gap-5 w-full">
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-900"></span>
                          <span className="font-bold font-[Satoshi] text-slate-900 text-[14px] md:text-[16px]">India</span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-slate-300 via-emerald-400 to-slate-300 w-10 md:w-20 mx-1 md:mx-2"></div>
                        <span className="text-[11px] md:text-[13px] font-bold font-[Satoshi] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 md:px-4 md:py-1.5 rounded-[8px] md:rounded-[10px] truncate max-w-[100px] md:max-w-none">{results.carbon_footprint.mode_used}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-slate-300 via-emerald-400 to-slate-300 w-10 md:w-20 mx-1 md:mx-2"></div>
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="font-bold font-[Satoshi] text-slate-900 text-[14px] md:text-[16px] truncate max-w-[80px] md:max-w-[150px]">{results.extracted_data?.destination || "Destination"}</span>
                          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500"></span>
                        </div>
                      </div>
                      <span className="text-[12px] md:text-[13px] font-bold text-slate-500 font-[Satoshi] w-full sm:w-auto text-center mt-2 sm:mt-0 flex-shrink-0">{results.carbon_footprint.distance_km.toLocaleString()} km {activeDict.carb_route}</span>
                    </div>
                  </div>
                </div>

                {results.carbon_footprint.potential_savings_kg > 0 && (
                  <div className="bg-white rounded-[28px] md:rounded-[40px] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="px-6 py-8 md:px-12 md:pt-12 md:pb-8 border-b border-slate-100">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-0">
                        <div>
                          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1 md:mb-2 font-[Satoshi]">{activeDict.carb_compare}</p>
                          <h4 className="text-[20px] md:text-[24px] font-[Satoshi] font-extrabold text-slate-900">{activeDict.carb_switch}</h4>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-1 font-[Satoshi]">{activeDict.carb_saving}</p>
                          <p className="text-[32px] md:text-[40px] font-[Satoshi] font-black text-emerald-600 tracking-[-0.03em] leading-none">{results.carbon_footprint.potential_savings_kg} <span className="text-[16px] md:text-[20px]">kg CO₂e</span></p>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-8 md:px-12 md:py-10 space-y-6 md:space-y-8">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 md:mb-4 gap-2 sm:gap-0">
                          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400"></span>
                            <span className="font-bold font-[Satoshi] text-slate-700 text-[14px] md:text-[15px]">{activeDict.carb_air}</span>
                            <span className="text-[11px] md:text-[12px] text-slate-400 font-[Satoshi]">0.500 kg CO₂e/ton-km</span>
                          </div>
                          <span className="font-black font-[Satoshi] text-slate-900 text-[16px] md:text-[18px]">{results.carbon_footprint.co2_emissions_kg} kg</span>
                        </div>
                        <div className="w-full h-8 md:h-10 bg-slate-50 rounded-full overflow-hidden border border-slate-100 relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className={`h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-end pr-4 absolute top-0 left-0`}
                          >
                            <span className="text-white text-[11px] md:text-[12px] font-bold font-[Satoshi]">100%</span>
                          </motion.div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 md:mb-4 gap-2 sm:gap-0">
                          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400"></span>
                            <span className="font-bold font-[Satoshi] text-slate-700 text-[14px] md:text-[15px]">{activeDict.carb_rail}</span>
                            <span className="text-[11px] md:text-[12px] text-slate-400 font-[Satoshi]">0.030 kg CO₂e/ton-km</span>
                          </div>
                          <span className="font-black font-[Satoshi] text-slate-900 text-[16px] md:text-[18px]">{Math.round(results.carbon_footprint.co2_emissions_kg * 0.06)} kg</span>
                        </div>
                        <div className="w-full h-8 md:h-10 bg-slate-50 rounded-full overflow-hidden border border-slate-100 relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '6%' }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full absolute top-0 left-0"
                          >
                          </motion.div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 md:mb-4 gap-2 sm:gap-0">
                          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                            <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500"></span>
                            <span className="font-bold font-[Satoshi] text-emerald-700 text-[14px] md:text-[15px]">{activeDict.carb_ocean}</span>
                            <span className="text-[11px] md:text-[12px] text-slate-400 font-[Satoshi]">0.015 kg CO₂e/ton-km</span>
                            <span className="px-2 md:px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-[6px] md:rounded-[8px] text-[10px] md:text-[11px] font-bold text-emerald-700 font-[Satoshi]">{activeDict.carb_rec}</span>
                          </div>
                          <span className="font-black font-[Satoshi] text-emerald-700 text-[16px] md:text-[18px]">{Math.round(results.carbon_footprint.co2_emissions_kg * 0.03)} kg</span>
                        </div>
                        <div className="w-full h-8 md:h-10 bg-emerald-50 rounded-full overflow-hidden border border-emerald-100 relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '3%' }}
                            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full absolute top-0 left-0"
                          >
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-4 md:mx-6 mb-4 md:mb-6 bg-slate-900 rounded-[20px] md:rounded-[28px] px-6 py-6 md:px-12 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[100px] md:h-[150px] bg-emerald-500/15 rounded-full blur-[40px] md:blur-[60px]"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                          <Sparkles size={14} className="text-emerald-400 md:w-[16px] md:h-[16px]"/>
                          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400 font-[Satoshi]">{activeDict.carb_dp}</span>
                        </div>
                        <p className="text-[15px] md:text-[18px] font-bold font-[Satoshi] text-white leading-snug">
                          {activeDict.carb_switch_text1} <span className="text-emerald-400">{Math.round((results.carbon_footprint.potential_savings_kg / results.carbon_footprint.co2_emissions_kg) * 100)}%</span> {activeDict.carb_switch_text2}
                        </p>
                      </div>
                      <div className="relative z-10 w-full md:w-auto mt-2 md:mt-0">
                        <div className="bg-emerald-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-[16px] md:rounded-[20px] font-bold font-[Satoshi] text-[14px] md:text-[15px] flex justify-center items-center gap-2 md:gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform cursor-pointer">
                          <Globe size={16} className="md:w-[18px] md:h-[18px]"/> {activeDict.carb_view_routes}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      )}
    </motion.div>
  );
}