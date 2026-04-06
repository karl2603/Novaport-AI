import React from 'react';
import { motion } from 'framer-motion';
import { Download, ListPlus, FileText, Hash, Calendar, AlertCircle, Globe, ArrowRight, MapPin, Package, DollarSign } from 'lucide-react';
import { pageVariants, fadeUp, scaleUp, stagger, fluidSpring, PrimaryButton, SecondaryButton, UploadBox } from '../App';

export default function ExtractionPage({ activeDict, changePage, file, setFile, loading, onUpload, results, selectedFields, setSelectedFields, handleDownload }) {
  return (
    <motion.div key="extract" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
      {!results ? (
        <UploadBox title={activeDict.card1_title} description={activeDict.card1_sub} buttonText={activeDict.btn_start_ext} file={file} setFile={setFile} loading={loading} onUpload={onUpload} icon={Boxes} selectedFields={selectedFields} setSelectedFields={setSelectedFields} activePage="extraction" activeDict={activeDict}/>
      ) : (
        <div className="space-y-10 md:space-y-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h2 className="text-[40px] md:text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">{activeDict.res_payload}</h2>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-5">
              <SecondaryButton onClick={handleDownload} icon={Download}>
                {activeDict.res_export}
              </SecondaryButton>
              <PrimaryButton onClick={() => changePage('extraction')} icon={ListPlus}>
                {activeDict.res_new_scan}
              </PrimaryButton>
            </div>
          </div>

          <motion.div variants={scaleUp} className="bg-white/70 backdrop-blur-3xl rounded-[32px] md:rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1),_inset_0_2px_0_rgba(255,255,255,1)] border border-white overflow-hidden relative">
            
            <div className="p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200/60 gap-8 bg-slate-50/50 relative">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-[20px] md:rounded-[28px] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex items-center justify-center flex-shrink-0"><FileText size={32} className="text-slate-900 md:w-[40px] md:h-[40px]" strokeWidth={1.5}/></div>
                <div>
                  <h3 className="font-[Satoshi] font-extrabold text-[28px] md:text-[36px] tracking-[-0.03em] text-slate-900 mb-3 md:mb-4">{results.document_type || activeDict.ext_doc}</h3>
                  <div className="flex flex-wrap items-center gap-3 md:gap-5">
                    <span className="flex items-center gap-2 md:gap-2.5 text-slate-600 font-bold font-[Satoshi] text-[13px] md:text-[15px] bg-white px-4 py-2 md:px-5 md:py-2.5 rounded-[12px] md:rounded-[16px] border border-slate-200 shadow-sm"><Hash size={16} className="text-slate-400 md:w-[18px] md:h-[18px]"/> {results.invoice_number}</span>
                    <span className="flex items-center gap-2 md:gap-2.5 text-slate-600 font-bold font-[Satoshi] text-[13px] md:text-[15px] bg-white px-4 py-2 md:px-5 md:py-2.5 rounded-[12px] md:rounded-[16px] border border-slate-200 shadow-sm"><Calendar size={16} className="text-slate-400 md:w-[18px] md:h-[18px]"/> {results.invoice_date}</span>
                  </div>
                </div>
              </div>
              {results.missing_fields?.length > 0 && (
                <div className="w-full md:w-auto flex items-center justify-center gap-3 bg-white border border-red-100 text-red-700 px-5 py-3 md:px-6 md:py-4 rounded-[16px] md:rounded-[20px] text-[14px] md:text-[15px] font-bold shadow-[0_10px_30px_rgba(239,68,68,0.1)] font-[Satoshi]">
                  <AlertCircle size={20} /> {results.missing_fields.length} {activeDict.ext_missing}
                </div>
              )}
            </div>

            <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-white/40">
              {selectedFields?.includes('entities') && (
                <div className="space-y-6">
                  <h4 className="text-[12px] md:text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-6 md:mb-8 font-[Satoshi]"><Globe size={18}/> {activeDict.ext_entities}</h4>
                  <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-6 md:p-10 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-slate-900"></div>
                    <p className="text-[11px] md:text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3 md:mb-4 font-[Satoshi]">{activeDict.ext_shipper}</p>
                    <p className="text-[22px] md:text-[28px] font-[Satoshi] font-bold text-slate-900 leading-tight">{results.shipper_name !== "N/A" ? results.shipper_name : "-"}</p>
                  </motion.div>
                  <div className="flex justify-center -my-3 md:-my-4 relative z-10"><div className="bg-white border border-slate-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] p-2 md:p-3 rounded-full text-slate-400"><ArrowRight size={20} className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]" /></div></div>
                  <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-6 md:p-10 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-slate-400"></div>
                    <p className="text-[11px] md:text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-3 md:mb-4 font-[Satoshi]">{activeDict.ext_consignee}</p>
                    <p className="text-[22px] md:text-[28px] font-[Satoshi] font-bold text-slate-900 leading-tight">{results.consignee_name !== "N/A" ? results.consignee_name : "-"}</p>
                  </motion.div>
                </div>
              )}
              
              {selectedFields?.includes('logistics') && (
                <div className="space-y-6">
                  <h4 className="text-[12px] md:text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-6 md:mb-8 font-[Satoshi]"><MapPin size={18}/> {activeDict.ext_logistics}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-6 md:p-10 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                      <p className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4 font-[Satoshi]">{activeDict.ext_origin}</p>
                      <p className="font-[Satoshi] font-extrabold text-slate-900 text-[22px] md:text-[26px] tracking-tight">{results.origin_country !== "N/A" ? results.origin_country : "-"}</p>
                      <p className="text-[14px] md:text-[15px] text-slate-500 mt-2 font-medium truncate">{results.port_of_loading !== "N/A" ? results.port_of_loading : ""}</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-6 md:p-10 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                      <p className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4 font-[Satoshi]">{activeDict.ext_dest}</p>
                      <p className="font-[Satoshi] font-extrabold text-slate-900 text-[22px] md:text-[26px] tracking-tight">{results.destination_country !== "N/A" ? results.destination_country : "-"}</p>
                      <p className="text-[14px] md:text-[15px] text-slate-500 mt-2 font-medium truncate">{results.port_of_discharge !== "N/A" ? results.port_of_discharge : ""}</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="sm:col-span-2 p-6 md:p-10 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div>
                        <p className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-3 md:mb-4 font-[Satoshi]">{activeDict.ext_method}</p>
                        <p className="font-[Satoshi] font-extrabold text-slate-900 flex flex-wrap items-center gap-2 md:gap-3 text-[22px] md:text-[28px] tracking-tight">{results.shipping_method !== "N/A" ? results.shipping_method : "-"} <span className="text-slate-300 font-normal">/</span> <span className="text-slate-600">{results.incoterms !== "N/A" ? results.incoterms : "-"}</span></p>
                      </div>
                      <div className="sm:text-right border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-8 md:pl-10 border-slate-200 w-full sm:w-auto">
                        <p className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-2 md:mb-4 font-[Satoshi]">{activeDict.ext_total_pay}</p>
                        <p className="font-[Satoshi] font-extrabold text-slate-900 text-[28px] md:text-[36px] tracking-tight">{results.total_weight_kg || 0} <span className="text-[16px] md:text-[18px] text-slate-500 font-bold">kg</span></p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>

            {selectedFields?.includes('products') && results.line_items && results.line_items.length > 0 && (
              <div className="border-t border-slate-200/80 bg-white relative">
                <div className="p-8 md:p-12 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 border-b border-slate-100">
                  <h4 className="text-[24px] md:text-[28px] font-[Satoshi] font-extrabold text-slate-900 flex items-center gap-3 md:gap-4"><Package size={28} className="text-slate-900 md:w-[32px] md:h-[32px]" strokeWidth={1.5} /> {activeDict.ext_line_items}</h4>
                  <div className="w-full md:w-auto bg-slate-50 border border-slate-200 px-6 py-4 md:px-8 md:py-5 rounded-[20px] md:rounded-[24px] text-[16px] md:text-[18px] font-bold font-[Satoshi] text-slate-800 flex items-center gap-4 shadow-inner">
                    <div className="p-2 md:p-2.5 bg-white border border-slate-200 text-slate-900 rounded-[12px] md:rounded-[14px] shadow-sm"><DollarSign size={20} className="md:w-[24px] md:h-[24px]" strokeWidth={2.5} /></div> {activeDict.ext_invoice_total}: <span className="text-slate-900 text-[24px] md:text-[32px] font-black tracking-tight">${results.total_value_usd?.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="p-4 md:p-12 lg:px-16 bg-slate-50/50">
                  <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4 md:space-y-6">
                    {results.line_items?.map((item, idx) => (
                      <motion.div key={idx} variants={fadeUp} whileHover={{ y: -4, scale: 1.005, shadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-6 md:p-10 bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-10 group relative overflow-hidden">
                        <div className="flex-1 w-full">
                          <p className="font-bold font-[Satoshi] text-slate-900 text-[18px] md:text-[20px] mb-4 md:mb-5">{item.product_description}</p>
                          <div className="flex flex-wrap gap-3 md:gap-4 text-[14px] md:text-[15px] font-bold font-[Satoshi] text-slate-500">
                            <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 md:px-5 md:py-2.5 rounded-[14px] md:rounded-[16px] border border-slate-200"><Hash size={16} className="text-slate-400 md:w-[18px] md:h-[18px]"/> {activeDict.ext_hs}: <span className="font-mono text-slate-800 tracking-tight">{item.hs_code}</span></span>
                            <span className="bg-slate-50 px-4 py-2 md:px-5 md:py-2.5 rounded-[14px] md:rounded-[16px] border border-slate-200">{activeDict.ext_qty}: <span className="text-slate-800">{item.quantity}</span></span>
                            <span className="bg-slate-50 px-4 py-2 md:px-5 md:py-2.5 rounded-[14px] md:rounded-[16px] border border-slate-200">{activeDict.ext_wgt}: <span className="text-slate-800">{item.weight_kg} kg</span></span>
                          </div>
                        </div>
                        <div className="w-full lg:w-auto md:text-right bg-slate-50/50 lg:bg-transparent p-5 lg:p-0 rounded-[16px] lg:rounded-none">
                          <p className="text-[11px] md:text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 md:mb-3 font-[Satoshi]">{activeDict.ext_declared}</p>
                          <p className="font-[Satoshi] font-black text-[28px] md:text-[36px] text-slate-900 tracking-tight">${item.value_usd?.toLocaleString()}</p>
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
  );
}