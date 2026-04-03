import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, AlertTriangle, CheckCircle, Leaf, ShieldAlert, 
  FileText, Cpu, Activity, Loader2, ArrowRight, Package, MapPin, 
  Globe, DollarSign, Calendar, Hash, AlertCircle, 
  ListPlus, Sparkles, Zap, Info, FileSearch, ShieldCheck, Percent, Download, Boxes, X, Send, Bot, ChevronDown
} from 'lucide-react';

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

const languages = {
  en: { name: 'English', apiName: 'English', dir: 'ltr' },
  ar: { name: 'Arabic', apiName: 'Arabic', dir: 'rtl' },
  es: { name: 'Spanish', apiName: 'Spanish', dir: 'ltr' },
  zh: { name: 'Chinese', apiName: 'Mandarin Chinese', dir: 'ltr' }
};

// 100% Comprehensive Translation Dictionary
const dict = {
  en: {
    nav_about: 'Overview', nav_extract: 'Extract', nav_audit: 'Audit', nav_hs: 'HS Generator',
    hero_line1: 'Global Trade.', hero_line2: 'Automated by AI.',
    hero_sub: 'Replace manual compliance with autonomous infrastructure. Novaport digitizes commercial documents, instantly audits regulatory risk, and maps complex global tariffs with unprecedented precision.',
    btn_start_ext: 'Start Extraction', btn_run_audit: 'Run Compliance Audit',
    card1_title: 'Cognitive Extraction', card1_sub: 'Transform unstructured commercial PDFs into precise JSON schemas instantly. Perfect mapping of line items and incoterms.',
    card2_title: 'Automated Auditing', card2_sub: 'Cross-reference shipments against global trade corridors. Detect missing certificates and mathematical anomalies preemptively.',
    card3_title: 'HS Generator', card3_sub: 'Stop manually searching through thousands of HS codes. Our NLP models instantly predict the exact 6-digit global tariff for any item.',
    chat_placeholder: 'Ask a compliance question...', chat_welcome: 'Welcome to Novaport. How can I assist your logistics today?',
    pred_tag: 'Predictive Intelligence', pred_title: 'Pre-empt Customs Holds Before They Happen', pred_desc: 'Our neural architecture maps your entire export payload against real-time global trade regulations, geopolitical risk factors, and millions of historical clearance records—neutralizing compliance bottlenecks before your cargo even leaves the dock.', pred_btn: 'Run Risk Assessment',
    speed_title1: 'Built for speed.', speed_title2: 'Designed for scale.', speed_desc: "Whether you are verifying commercial invoices, parsing complex shipping bills, or validating certificates of origin, Novaport's architecture processes multi-page PDFs in milliseconds. Secure, scalable, and relentlessly accurate.", tag_invoice: 'Commercial Invoices', tag_bill: 'Shipping Bills', tag_cert: 'Certificates of Origin',
    upload_click: 'Click to upload or drag and drop', upload_limit: 'PDF, PNG, or JPG (max 10MB)', btn_processing: 'Analyzing Document...',
    node_select: 'Select Neural Extraction Nodes', node_entities: 'Shipper & Consignee', node_logistics: 'Ports & Routing', node_products: 'Line Items & Values',
    res_payload: 'Structured Payload', res_export: 'Export JSON', res_new_scan: 'New Scan',
    ext_doc: 'Commercial Document', ext_missing: 'Missing Fields', ext_entities: 'Trade Entities', ext_shipper: 'Shipper / Exporter', ext_consignee: 'Consignee / Importer', ext_logistics: 'Logistics Framework', ext_origin: 'Origin', ext_dest: 'Destination', ext_method: 'Method & Terms', ext_total_pay: 'Total Payload', ext_line_items: 'Extracted Line Items', ext_invoice_total: 'Invoice Total', ext_declared: 'Declared Value', ext_qty: 'Qty', ext_wgt: 'Wgt', ext_hs: 'HS',
    audit_report: 'Audit Report', audit_new: 'New Audit', audit_risk_high: 'HIGH RISK — DO NOT SHIP', audit_risk_warn: 'WARNING — ACTION NEEDED', audit_risk_clear: 'APPROVED — CLEAR TO SHIP', audit_hold: 'Hold Probability', audit_loss: 'Estimated Loss', audit_action: 'Suggested Action', audit_anomalies: 'Regulatory Anomalies', audit_no_violations: 'No regulatory violations detected.', audit_clear_msg: 'Shipment meets all international compliance standards and is clear for dispatch.', audit_action_req: 'Action Required',
    carb_tag: 'DP World ESG Intelligence · GLEC Framework', carb_title: 'Scope 3 Carbon Footprint Analysis', carb_live: 'Live Calculation', carb_total: 'Total Transit Emissions', carb_trees: 'Trees needed to offset', carb_trees_sub: 'mature trees for 1 year', carb_phones: 'Smartphone full charges', carb_phones_sub: 'equivalent energy used', carb_route: 'route', carb_compare: 'Mode Comparison · GLEC Standard', carb_switch: 'Switch to Ocean Freight and save', carb_saving: 'Potential saving', carb_air: 'Air Freight', carb_rail: 'Rail Freight', carb_ocean: 'Ocean Freight', carb_rec: 'RECOMMENDED', carb_dp: 'DP World "Our World, Our Future" ESG Target', carb_switch_text1: 'Switching to ocean freight reduces your carbon footprint by', carb_switch_text2: 'on this shipment.', carb_view_routes: 'View Green Routes',
    hs_gen_title: 'HS Generator', hs_gen_desc: 'Stop manually searching through thousands of HS codes. Our NLP models analyze product descriptions, material compositions, and intended use to instantly generate the exact 6-digit global tariff.', hs_placeholder: "e.g. 100% Cotton Men's Woven Formal Shirts, long sleeve...", hs_btn: 'Generate HS Code', hs_res_title: 'Classification Results', hs_res_desc: 'Review primary HS code and AI reasoning matrix.', hs_new: 'New Product', hs_primary: 'Primary Code (Export)', hs_match: 'MATCH', hs_official: 'Official Description', hs_diag: 'Diagnostic Reasoning', hs_alt: 'Alternatives', hs_intel: 'Trade Intelligence', hs_duty: 'Standard Duty', hs_certs: 'Certificates', hs_no_certs: 'No special certificates required.', hs_notes: 'Special Notes',
    foot_desc: 'The enterprise-grade trade compliance infrastructure. Powering global logistics with advanced neural networks and seamless workflows.', foot_plat: 'Platform', foot_comp: 'Company', foot_legal: 'Legal', foot_rights: 'All rights reserved. Built for global scale.', foot_about: 'About Us', foot_data: 'Data Extraction', foot_cust: 'Customers', foot_sec: 'Security & Trust', foot_careers: 'Careers', foot_priv: 'Privacy Policy', foot_terms: 'Terms of Service', foot_cook: 'Cookie Policy'
  },
  ar: {
    nav_about: 'نظرة عامة', nav_extract: 'استخراج', nav_audit: 'تدقيق', nav_hs: 'مولد HS',
    hero_line1: 'التجارة العالمية.', hero_line2: 'مؤتمتة بالذكاء الاصطناعي.',
    hero_sub: 'استبدل الامتثال اليدوي ببنية تحتية مستقلة. تقوم Novaport برقمنة المستندات التجارية وتدقيق المخاطر التنظيمية على الفور وتعيين التعريفات العالمية بدقة.',
    btn_start_ext: 'بدء الاستخراج', btn_run_audit: 'تشغيل تدقيق الامتثال',
    card1_title: 'الاستخراج المعرفي', card1_sub: 'قم بتحويل ملفات PDF التجارية غير المنظمة إلى مخططات JSON دقيقة على الفور.',
    card2_title: 'التدقيق الآلي', card2_sub: 'مطابقة الشحنات عبر ممرات التجارة العالمية. اكتشاف الحالات الشاذة بشكل استباقي.',
    card3_title: 'مولد HS', card3_sub: 'توقف عن البحث اليدوي في آلاف رموز HS. تعيين تعريفي فوري ودقيق لأي عنصر.',
    chat_placeholder: 'اطرح سؤالاً حول الامتثال...', chat_welcome: 'مرحبًا بك في Novaport. كيف يمكنني مساعدة خدماتك اللوجستية اليوم؟',
    pred_tag: 'الذكاء التنبؤي', pred_title: 'توقع حجز الجمارك قبل حدوثه', pred_desc: 'تقوم بنيتنا العصبية بمطابقة شحنة التصدير الخاصة بك بالكامل مع لوائح التجارة العالمية في الوقت الفعلي وعوامل الخطر الجيوسياسية، مما يؤدي إلى تحييد اختناقات الامتثال قبل مغادرة البضائع.', pred_btn: 'تشغيل تقييم المخاطر',
    speed_title1: 'صمم للسرعة.', speed_title2: 'بني للتوسع.', speed_desc: 'سواء كنت تتحقق من الفواتير التجارية أو وثائق الشحن المعقدة، تقوم بنية Novaport بمعالجة ملفات PDF متعددة الصفحات في أجزاء من الثانية. دقة لا هوادة فيها.', tag_invoice: 'الفواتير التجارية', tag_bill: 'بوالص الشحن', tag_cert: 'شهادات المنشأ',
    upload_click: 'انقر للتحميل أو اسحب وأفلت', upload_limit: 'PDF أو PNG أو JPG (الحد الأقصى 10 ميغابايت)', btn_processing: 'جاري تحليل المستند...',
    node_select: 'حدد عقد الاستخراج العصبي', node_entities: 'الشاحن والمرسل إليه', node_logistics: 'الموانئ والتوجيه', node_products: 'العناصر والقيم',
    res_payload: 'البيانات المنظمة', res_export: 'تصدير JSON', res_new_scan: 'مسح جديد',
    ext_doc: 'مستند تجاري', ext_missing: 'الحقول المفقودة', ext_entities: 'الكيانات التجارية', ext_shipper: 'الشاحن / المصدر', ext_consignee: 'المرسل إليه / المستورد', ext_logistics: 'إطار العمل اللوجستي', ext_origin: 'الأصل', ext_dest: 'الوجهة', ext_method: 'الطريقة والشروط', ext_total_pay: 'إجمالي الحمولة', ext_line_items: 'العناصر المستخرجة', ext_invoice_total: 'إجمالي الفاتورة', ext_declared: 'القيمة المصرح بها', ext_qty: 'الكمية', ext_wgt: 'الوزن', ext_hs: 'رمز HS',
    audit_report: 'تقرير التدقيق', audit_new: 'تدقيق جديد', audit_risk_high: 'مخاطر عالية — لا تشحن', audit_risk_warn: 'تحذير — إجراء مطلوب', audit_risk_clear: 'موافق عليه — جاهز للشحن', audit_hold: 'احتمالية الحجز', audit_loss: 'الخسارة المقدرة', audit_action: 'الإجراء المقترح', audit_anomalies: 'الشذوذ التنظيمي', audit_no_violations: 'لم يتم اكتشاف انتهاكات تنظيمية.', audit_clear_msg: 'الشحنة تفي بجميع معايير الامتثال الدولية وهي جاهزة للإرسال.', audit_action_req: 'إجراء مطلوب',
    carb_tag: 'ذكاء DP World ESG', carb_title: 'تحليل البصمة الكربونية النطاق 3', carb_live: 'حساب مباشر', carb_total: 'إجمالي انبعاثات العبور', carb_trees: 'الأشجار اللازمة للتعويض', carb_trees_sub: 'أشجار ناضجة لمدة عام', carb_phones: 'شحن الهواتف الذكية', carb_phones_sub: 'الطاقة المعادلة المستخدمة', carb_route: 'طريق', carb_compare: 'مقارنة الوضع', carb_switch: 'قم بالتبديل إلى الشحن البحري ووفر', carb_saving: 'توفير محتمل', carb_air: 'شحن جوي', carb_rail: 'شحن بالسكك الحديدية', carb_ocean: 'شحن بحري', carb_rec: 'موصى به', carb_dp: 'هدف DP World ESG', carb_switch_text1: 'يقلل التبديل إلى الشحن البحري من بصمتك الكربونية بنسبة', carb_switch_text2: 'في هذه الشحنة.', carb_view_routes: 'عرض الطرق الخضراء',
    hs_gen_title: 'مولد HS', hs_gen_desc: 'توقف عن البحث اليدوي في آلاف رموز HS. تقوم نماذجنا بتحليل أوصاف المنتج والمواد لتوليد التعريفة العالمية الدقيقة المكونة من 6 أرقام على الفور.', hs_placeholder: 'مثال: قمصان رجالية رسمية منسوجة من القطن 100٪...', hs_btn: 'توليد رمز HS', hs_res_title: 'نتائج التصنيف', hs_res_desc: 'مراجعة رمز HS الأساسي ومصفوفة التفكير المنطقي للذكاء الاصطناعي.', hs_new: 'منتج جديد', hs_primary: 'الرمز الأساسي (تصدير)', hs_match: 'تطابق', hs_official: 'الوصف الرسمي', hs_diag: 'الاستدلال التشخيصي', hs_alt: 'بدائل', hs_intel: 'استخبارات التجارة', hs_duty: 'الرسوم القياسية', hs_certs: 'الشهادات', hs_no_certs: 'لا توجد شهادات خاصة مطلوبة.', hs_notes: 'ملاحظات خاصة',
    foot_desc: 'البنية التحتية لامتثال التجارة على مستوى المؤسسات. دعم الخدمات اللوجستية العالمية بشبكات عصبية متقدمة.', foot_plat: 'المنصة', foot_comp: 'الشركة', foot_legal: 'قانوني', foot_rights: 'جميع الحقوق محفوظة. بنيت على نطاق عالمي.', foot_about: 'معلومات عنا', foot_data: 'استخراج البيانات', foot_cust: 'العملاء', foot_sec: 'الأمان والثقة', foot_careers: 'وظائف', foot_priv: 'سياسة الخصوصية', foot_terms: 'شروط الخدمة', foot_cook: 'سياسة ملفات تعريف الارتباط'
  },
  es: {
    nav_about: 'Resumen', nav_extract: 'Extraer', nav_audit: 'Auditoría', nav_hs: 'Generador HS',
    hero_line1: 'Comercio Global.', hero_line2: 'Automatizado por IA.',
    hero_sub: 'Reemplace el cumplimiento manual con infraestructura autónoma. Novaport digitaliza documentos comerciales y audita instantáneamente el riesgo regulatorio.',
    btn_start_ext: 'Iniciar Extracción', btn_run_audit: 'Ejecutar Auditoría',
    card1_title: 'Extracción Cognitiva', card1_sub: 'Transforme archivos PDF comerciales no estructurados en esquemas JSON precisos al instante.',
    card2_title: 'Auditoría Automatizada', card2_sub: 'Cruce envíos con corredores comerciales globales. Detecte anomalías preventivamente.',
    card3_title: 'Generador HS', card3_sub: 'Deje de buscar manualmente en miles de códigos HS. Mapeo arancelario exacto al instante.',
    chat_placeholder: 'Haz una pregunta de cumplimiento...', chat_welcome: 'Bienvenido a Novaport. ¿Cómo puedo ayudar a su logística hoy?',
    pred_tag: 'Inteligencia Predictiva', pred_title: 'Anticipe las Retenciones Aduaneras', pred_desc: 'Nuestra arquitectura neuronal cruza su carga de exportación con las regulaciones comerciales globales en tiempo real y los factores de riesgo geopolítico, neutralizando los cuellos de botella.', pred_btn: 'Ejecutar Evaluación',
    speed_title1: 'Construido para la velocidad.', speed_title2: 'Diseñado para escalar.', speed_desc: 'Ya sea verificando facturas comerciales o validando certificados de origen, Novaport procesa archivos PDF en milisegundos. Seguro y preciso.', tag_invoice: 'Facturas Comerciales', tag_bill: 'Conocimientos de Embarque', tag_cert: 'Certificados de Origen',
    upload_click: 'Haz clic para subir o arrastra y suelta', upload_limit: 'PDF, PNG o JPG (máx. 10 MB)', btn_processing: 'Analizando Documento...',
    node_select: 'Seleccionar Nodos de Extracción', node_entities: 'Remitente y Consignatario', node_logistics: 'Puertos y Rutas', node_products: 'Artículos y Valores',
    res_payload: 'Carga Estructurada', res_export: 'Exportar JSON', res_new_scan: 'Nuevo Escaneo',
    ext_doc: 'Documento Comercial', ext_missing: 'Campos Faltantes', ext_entities: 'Entidades Comerciales', ext_shipper: 'Remitente / Exportador', ext_consignee: 'Consignatario / Importador', ext_logistics: 'Marco Logístico', ext_origin: 'Origen', ext_dest: 'Destino', ext_method: 'Método y Términos', ext_total_pay: 'Carga Total', ext_line_items: 'Artículos Extraídos', ext_invoice_total: 'Total de Factura', ext_declared: 'Valor Declarado', ext_qty: 'Cant', ext_wgt: 'Peso', ext_hs: 'HS',
    audit_report: 'Informe de Auditoría', audit_new: 'Nueva Auditoría', audit_risk_high: 'ALTO RIESGO — NO ENVIAR', audit_risk_warn: 'ADVERTENCIA — REQUIERE ACCIÓN', audit_risk_clear: 'APROBADO — LISTO PARA ENVIAR', audit_hold: 'Probabilidad de Retención', audit_loss: 'Pérdida Estimada', audit_action: 'Acción Sugerida', audit_anomalies: 'Anomalías Regulatorias', audit_no_violations: 'No se detectaron violaciones regulatorias.', audit_clear_msg: 'El envío cumple con todos los estándares internacionales de cumplimiento y está listo para su despacho.', audit_action_req: 'Acción Requerida',
    carb_tag: 'Inteligencia ESG DP World', carb_title: 'Análisis de Huella de Carbono Alcance 3', carb_live: 'Cálculo en Vivo', carb_total: 'Emisiones Totales de Tránsito', carb_trees: 'Árboles necesarios para compensar', carb_trees_sub: 'árboles maduros por 1 año', carb_phones: 'Cargas de teléfono inteligente', carb_phones_sub: 'energía equivalente utilizada', carb_route: 'ruta', carb_compare: 'Comparación de Modo', carb_switch: 'Cambie a Flete Marítimo y ahorre', carb_saving: 'Ahorro potencial', carb_air: 'Flete Aéreo', carb_rail: 'Flete Ferroviario', carb_ocean: 'Flete Marítimo', carb_rec: 'RECOMENDADO', carb_dp: 'Objetivo ESG de DP World', carb_switch_text1: 'Cambiar al flete marítimo reduce su huella de carbono en un', carb_switch_text2: 'en este envío.', carb_view_routes: 'Ver Rutas Verdes',
    hs_gen_title: 'Generador HS', hs_gen_desc: 'Deje de buscar en miles de códigos HS. Nuestros modelos analizan descripciones de productos y materiales para generar la tarifa global exacta de 6 dígitos al instante.', hs_placeholder: 'ej. Camisas formales tejidas 100% algodón para hombre, manga larga...', hs_btn: 'Generar Código HS', hs_res_title: 'Resultados de Clasificación', hs_res_desc: 'Revise el código HS primario y la matriz de razonamiento de IA.', hs_new: 'Nuevo Producto', hs_primary: 'Código Primario (Exportación)', hs_match: 'COINCIDENCIA', hs_official: 'Descripción Oficial', hs_diag: 'Razonamiento Diagnóstico', hs_alt: 'Alternativas', hs_intel: 'Inteligencia Comercial', hs_duty: 'Arancel Estándar', hs_certs: 'Certificados', hs_no_certs: 'No se requieren certificados especiales.', hs_notes: 'Notas Especiales',
    foot_desc: 'La infraestructura de cumplimiento comercial de nivel empresarial. Impulsando la logística global con redes neuronales avanzadas.', foot_plat: 'Plataforma', foot_comp: 'Compañía', foot_legal: 'Legal', foot_rights: 'Todos los derechos reservados. Construido para escala global.', foot_about: 'Sobre Nosotros', foot_data: 'Extracción de Datos', foot_cust: 'Clientes', foot_sec: 'Seguridad y Confianza', foot_careers: 'Carreras', foot_priv: 'Política de Privacidad', foot_terms: 'Términos de Servicio', foot_cook: 'Política de Cookies'
  },
  zh: {
    nav_about: '概览', nav_extract: '数据提取', nav_audit: '合规审计', nav_hs: 'HS 生成器',
    hero_line1: '全球贸易。', hero_line2: '由AI自动化。',
    hero_sub: '用自主基础设施取代手动合规检查。Novaport 数字化商业文件，实时审计监管风险，并以空前的精度映射复杂的全球关税。',
    btn_start_ext: '开始提取', btn_run_audit: '运行合规审计',
    card1_title: '认知提取', card1_sub: '瞬间将非结构化商业PDF转换为精确的JSON数据架构。',
    card2_title: '自动化审计', card2_sub: '跨全球贸易走廊交叉验证货物。主动检测异常。',
    card3_title: 'HS 生成器', card3_sub: '停止手动搜索数千个HS代码。瞬间提供精确的6位数全球关税代码。',
    chat_placeholder: '提出合规问题...', chat_welcome: '欢迎来到 Novaport。今天我能为您提供什么物流协助？',
    pred_tag: '预测智能', pred_title: '防患于未然，预防海关扣留', pred_desc: '我们的神经架构将您的整个出口货物与实时全球贸易法规、地缘政治风险因素和数百万历史清关记录进行比对——在您的货物离开码头之前就消除合规瓶颈。', pred_btn: '运行风险评估',
    speed_title1: '为速度而生。', speed_title2: '为规模设计。', speed_desc: '无论您是在验证商业发票、解析复杂的货运单，还是验证原产地证书，Novaport的架构都能在毫秒内处理多页PDF。安全、可扩展且绝对准确。', tag_invoice: '商业发票', tag_bill: '海运提单', tag_cert: '原产地证书',
    upload_click: '点击上传或拖放', upload_limit: 'PDF、PNG 或 JPG（最大 10MB）', btn_processing: '正在分析文件...',
    node_select: '选择神经提取节点', node_entities: '发货人与收货人', node_logistics: '港口与路线', node_products: '项目与价值',
    res_payload: '结构化数据', res_export: '导出 JSON', res_new_scan: '新扫描',
    ext_doc: '商业文件', ext_missing: '缺失字段', ext_entities: '贸易实体', ext_shipper: '发货人 / 出口商', ext_consignee: '收货人 / 进口商', ext_logistics: '物流框架', ext_origin: '原产地', ext_dest: '目的地', ext_method: '方式与条款', ext_total_pay: '总载荷', ext_line_items: '提取的项目', ext_invoice_total: '发票总额', ext_declared: '申报价值', ext_qty: '数量', ext_wgt: '重量', ext_hs: 'HS代码',
    audit_report: '审计报告', audit_new: '新审计', audit_risk_high: '高风险 — 请勿发货', audit_risk_warn: '警告 — 需要采取行动', audit_risk_clear: '批准 — 准备发货', audit_hold: '扣留概率', audit_loss: '预估损失', audit_action: '建议行动', audit_anomalies: '监管异常', audit_no_violations: '未检测到违规行为。', audit_clear_msg: '货物符合所有国际合规标准，可随时发货。', audit_action_req: '需要采取行动',
    carb_tag: 'DP World ESG 智能', carb_title: '范围3 碳足迹分析', carb_live: '实时计算', carb_total: '总运输排放量', carb_trees: '需要抵消的树木', carb_trees_sub: '成熟树木1年', carb_phones: '智能手机充满电', carb_phones_sub: '等效能量消耗', carb_route: '路线', carb_compare: '模式比较', carb_switch: '切换到海运并节省', carb_saving: '潜在节省', carb_air: '航空货运', carb_rail: '铁路货运', carb_ocean: '海运货运', carb_rec: '推荐', carb_dp: 'DP World ESG 目标', carb_switch_text1: '在此次货运中，改用海运可将您的碳足迹减少', carb_switch_text2: '。', carb_view_routes: '查看绿色路线',
    hs_gen_title: 'HS 生成器', hs_gen_desc: '停止手动搜索数千个HS代码。我们的NLP模型分析产品描述和材料，瞬间生成精确的6位数全球关税代码。', hs_placeholder: '例如：100%全棉男士梭织正装衬衫，长袖...', hs_btn: '生成 HS 代码', hs_res_title: '分类结果', hs_res_desc: '审查主要HS代码和AI推理矩阵。', hs_new: '新产品', hs_primary: '主要代码 (出口)', hs_match: '匹配', hs_official: '官方描述', hs_diag: '诊断推理', hs_alt: '替代方案', hs_intel: '贸易情报', hs_duty: '标准关税', hs_certs: '证书', hs_no_certs: '不需要特殊证书。', hs_notes: '特别注意事项',
    foot_desc: '企业级贸易合规基础设施。通过先进的神经网络和无缝工作流为全球物流提供动力。', foot_plat: '平台', foot_comp: '公司', foot_legal: '法律', foot_rights: '保留所有权利。为全球规模而建。', foot_about: '关于我们', foot_data: '数据提取', foot_cust: '客户', foot_sec: '安全与信任', foot_careers: '招贤纳士', foot_priv: '隐私政策', foot_terms: '服务条款', foot_cook: 'Cookie 政策'
  }
};

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
    <span className="relative z-10 flex items-center justify-center gap-2.5 text-[15px] tracking-wide font-[Satoshi] rtl:flex-row-reverse">
      {children}
      {Icon && <Icon size={18} className="transform rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition-transform duration-400 ease-out opacity-90" />}
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
    <span className="relative z-10 flex items-center justify-center gap-2.5 text-[15px] tracking-wide font-[Satoshi] rtl:flex-row-reverse">
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

const TradeBot = ({ lang, activeLangDict }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: activeLangDict.chat_welcome }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput(''); setIsTyping(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat', { 
        message: userMsg,
        language: languages[lang].apiName 
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection anomaly. Backend unavailable." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`fixed bottom-8 ${languages[lang].dir === 'rtl' ? 'left-8' : 'right-8'} z-[100]`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            transition={fluidSpring}
            className={`absolute bottom-24 ${languages[lang].dir === 'rtl' ? 'left-0' : 'right-0'} w-[420px] bg-white/80 backdrop-blur-3xl rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)] border border-white overflow-hidden flex flex-col h-[600px]`}
          >
            <div className="bg-white/50 backdrop-blur-2xl p-6 border-b border-slate-200/50 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                   <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-[Satoshi] font-bold text-slate-900 text-[16px]">Novaport AI</h3>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 hover:shadow-sm transition-all duration-300">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/30">
              {messages.map((msg, idx) => (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-[15px] leading-relaxed font-medium ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-[24px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] ' + (languages[lang].dir === 'rtl' ? 'rounded-tl-[8px]' : 'rounded-tr-[8px]') : 'bg-white border border-slate-100 text-slate-700 rounded-[24px] shadow-[0_8px_20px_rgba(0,0,0,0.04)] ' + (languages[lang].dir === 'rtl' ? 'rounded-tr-[8px]' : 'rounded-tl-[8px]')}`}>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className={`bg-white border border-slate-100 p-4 rounded-[24px] shadow-sm flex gap-1.5 items-center h-[48px] ${languages[lang].dir === 'rtl' ? 'rounded-tr-[8px]' : 'rounded-tl-[8px]'}`}>
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
                  placeholder={activeLangDict.chat_placeholder} 
                  className="flex-1 bg-transparent text-[15px] font-medium text-slate-900 px-6 py-4 outline-none placeholder:text-slate-400"
                />
                <button 
                  onClick={sendMessage}
                  disabled={isTyping || !input.trim()}
                  className={`p-3 rounded-[18px] bg-slate-900 hover:bg-slate-800 text-white transition-all duration-300 disabled:opacity-50 hover:scale-105 hover:-translate-y-0.5 ${languages[lang].dir === 'rtl' ? 'ml-2' : 'mr-2'}`}
                >
                  <Send size={18} className={languages[lang].dir === 'rtl' ? 'rotate-180' : ''}/>
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

const Modal = ({ isOpen, onClose, title, content, dir }) => (
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
          <button onClick={onClose} className={`absolute top-8 ${dir === 'rtl' ? 'left-8' : 'right-8'} p-3 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors`}><X size={20}/></button>
          <h3 className="text-[36px] font-[Satoshi] font-extrabold text-slate-900 mb-8 tracking-tight">{title}</h3>
          <div className="text-slate-600 space-y-6 text-[17px] leading-[1.8] font-medium">
            {content}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Footer = ({ onOpenModal, changePage, activeDict }) => (
  <footer className="relative w-full border-t border-slate-800 bg-slate-900 pt-32 pb-16 mt-auto overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-blue-900/30 to-transparent rounded-full blur-[140px] pointer-events-none z-0"></div>
    
    <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
        <div className="md:col-span-4 lg:col-span-5 md:pe-8">
          <div className="mb-8 w-max">
            <NovaportLogo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} light={true} />
          </div>
          <p className="text-slate-400 text-[16px] font-medium leading-[1.8] max-w-sm">
            {activeDict.foot_desc}
          </p>
        </div>
        
        <div className="md:col-span-3 lg:col-span-2 md:col-start-6">
          <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.2em] mb-8 font-[Satoshi]">{activeDict.foot_plat}</h4>
          <ul className="space-y-5 text-[15px] text-slate-400 font-medium">
            <li onClick={() => changePage('about')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.foot_about}</li>
            <br/><li onClick={() => changePage('extraction')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.foot_data}</li>
            <br/><li onClick={() => changePage('compliance')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.nav_audit}</li>
            <br/><li onClick={() => changePage('hscode')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.nav_hs}</li>
          </ul>
        </div>
        
        <div className="md:col-span-3 lg:col-span-2">
          <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.2em] mb-8 font-[Satoshi]">{activeDict.foot_comp}</h4>
          <ul className="space-y-5 text-[15px] text-slate-400 font-medium">
            <li onClick={() => onOpenModal('customers')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.foot_cust}</li>
            <br/><li onClick={() => onOpenModal('security')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.foot_sec}</li>
            <br/><li onClick={() => onOpenModal('careers')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.foot_careers}</li>
          </ul>
        </div>
        
        <div className="md:col-span-2 lg:col-span-2">
          <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.2em] mb-8 font-[Satoshi]">{activeDict.foot_legal}</h4>
          <ul className="space-y-5 text-[15px] text-slate-400 font-medium">
            <li onClick={() => onOpenModal('privacy')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.foot_priv}</li>
            <br/><li onClick={() => onOpenModal('terms')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.foot_terms}</li>
            <br/><li onClick={() => onOpenModal('cookies')} className="hover:text-white hover:-translate-y-0.5 transition-all duration-400 cursor-pointer inline-block">{activeDict.foot_cook}</li>
          </ul>
        </div>
      </div>
      
      <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-[15px] font-medium">
          &copy; {new Date().getFullYear()} Novaport. {activeDict.foot_rights}
        </p>
      </div>
    </div>
  </footer>
);

const UploadBox = ({ file, setFile, onUpload, loading, title, description, buttonText, icon: Icon, selectedFields, setSelectedFields, activePage, activeDict }) => {
  const options = [
    { id: 'entities', label: activeDict.node_entities, icon: Globe },
    { id: 'logistics', label: activeDict.node_logistics, icon: MapPin },
    { id: 'products', label: activeDict.node_products, icon: Package }
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
          <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 font-[Satoshi]">{activeDict.node_select}</p>
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
                  <div className={`w-5 h-5 ms-2 rounded-full border-2 flex items-center justify-center transition-colors duration-400 ${isActive ? 'border-white/50 bg-white/20' : 'border-slate-300'}`}>
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
                  <p className="text-[22px] text-slate-900 font-extrabold font-[Satoshi] tracking-tight mb-3">{activeDict.upload_click}</p>
                  <p className="text-[16px] text-slate-500 font-medium">{activeDict.upload_limit}</p>
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
            {loading ? <><Loader2 className="animate-spin" size={22}/> <span>{activeDict.btn_processing}</span></> : <span>{buttonText}</span>}
          </PrimaryButton>
        </form>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [lang, setLang] = useState('en');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const activeDict = dict[lang];

  const [activePage, setActivePage] = useState('about'); 
  const [file, setFile] = useState(null);
  const [selectedFields, setSelectedFields] = useState(['entities', 'logistics', 'products']);
  const [hsInputText, setHsInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  
  const [activeModalKey, setActiveModalKey] = useState(null);

  const modalData = {
    customers: { title: activeDict.foot_cust, content: <p>Novaport partners with leading global supply chain operators, Fortune 500 logistics firms, and emerging D2C brands. We process millions of commercial invoices daily, ensuring zero-friction cross-border trade.</p> },
    security: { title: activeDict.foot_sec, content: <p>Enterprise-grade security is in our DNA. Novaport is SOC 2 Type II, ISO 27001, and GDPR compliant, utilizing AES-256 encryption at rest and TLS 1.3 in transit.</p> },
    careers: { title: activeDict.foot_careers, content: <p>Join the team building the neural nervous system of global trade. We are actively hiring senior AI researchers, logistics domain experts, and full-stack engineers to help us eliminate international trade borders.</p> },
    privacy: { title: activeDict.foot_priv, content: <p>We respect your data sovereignty. Novaport strictly adheres to international privacy regulations including GDPR and CCPA.</p> },
    terms: { title: activeDict.foot_terms, content: <p>By accessing Novaport's APIs, dashboards, and associated software, you agree to our enterprise SLA terms.</p> },
    cookies: { title: activeDict.foot_cook, content: <p>Novaport uses essential cookies to securely maintain your session and authenticate API requests.</p> }
  };

  const changePage = (page) => {
    setActivePage(page); setFile(null); setHsInputText(''); setResults(null); setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (e, endpoint) => {
    e.preventDefault(); if (!file) return;
    setLoading(true); setError('');
    const formData = new FormData(); 
    formData.append('file', file);
    formData.append('language', languages[lang].apiName);
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
      const response = await axios.post(`http://localhost:8000/api/hscode`, { 
        description: hsInputText,
        language: languages[lang].apiName
      });
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
    { id: 'about', label: activeDict.nav_about, icon: Info },
    { id: 'extraction', label: activeDict.nav_extract, icon: Boxes },
    { id: 'compliance', label: activeDict.nav_audit, icon: Activity },
    { id: 'hscode', label: activeDict.nav_hs, icon: Cpu }
  ];

  return (
    <div dir={languages[lang].dir} className="min-h-screen bg-[#FAFAFA] flex flex-col text-slate-900 selection:bg-slate-900 selection:text-white relative overflow-x-hidden" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>
      
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
        dir={languages[lang].dir}
      />

      {/* --- FLOATING GLASS NAVBAR - ENFORCED LTR TO PREVENT INVERSION --- */}
      <motion.header dir="ltr" initial={{ y: -50, x: "-50%", opacity: 0 }} animate={{ y: 0, x: "-50%", opacity: 1 }} transition={fluidSpring} className="fixed top-8 left-1/2 w-[calc(100%-4rem)] max-w-6xl h-[88px] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] rounded-[28px] z-50 flex items-center justify-between px-8">
        
        <div className="flex-1 flex justify-start">
          <NovaportLogo onClick={() => changePage('about')} />
        </div>
        
        {/* NAV ITSELF REMAINS LANGUAGE-DIRECTION AWARE SO ARABIC WORDS RENDER CORRECTLY */}
        <nav dir={languages[lang].dir} className="hidden md:flex justify-center items-center gap-1.5 p-1.5 bg-slate-50/50 border border-slate-200/50 rounded-[20px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => changePage(item.id)} className={`relative px-6 py-3 rounded-[16px] text-[15px] font-bold font-[Satoshi] flex items-center gap-2.5 transition-all duration-500 ${activePage === item.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'}`}>
              {activePage === item.id && <motion.div layoutId="navIndicator" className="absolute inset-0 bg-white rounded-[16px] shadow-[0_8px_20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] border border-slate-100" transition={snappySpring}/>}
              <span className="relative z-10 flex items-center gap-2.5"><item.icon size={18} className={`${activePage === item.id ? 'text-slate-900' : 'text-slate-400'}`} />{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="flex-1 flex justify-end relative">
          {isLangOpen && <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>}

          <div className="relative z-50">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-3 bg-white/70 hover:bg-white border border-slate-200 hover:border-slate-300 px-5 py-3 rounded-[16px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 group"
            >
              <Globe size={18} className="text-slate-500 group-hover:text-slate-700 transition-colors" />
              <span className="text-[14px] font-bold font-[Satoshi] text-slate-700 min-w-[55px] text-center">
                {languages[lang].name}
              </span>
              <ChevronDown size={16} className={`text-slate-400 group-hover:text-slate-600 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(10px)' }}
                  transition={snappySpring}
                  className="absolute top-full mt-4 right-0 w-[180px] bg-white/90 backdrop-blur-3xl border border-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1),_inset_0_2px_0_rgba(255,255,255,1)] rounded-[20px] overflow-hidden py-2"
                >
                  {Object.entries(languages).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => { setLang(key); setIsLangOpen(false); }}
                      className={`w-full flex items-center justify-between px-5 py-3 text-[14px] font-bold font-[Satoshi] transition-colors ${lang === key ? 'bg-slate-50 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                    >
                      {val.name}
                      {lang === key && <CheckCircle size={14} className="text-emerald-500" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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

            {activePage === 'about' && (
              <motion.div key="about" variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col w-full pb-10">
                <div className="flex flex-col items-center justify-center min-h-[55vh] text-center mb-40 relative mt-4">
                  <motion.h1 variants={fadeUp} className="text-[72px] md:text-[110px] font-[Satoshi] font-extrabold tracking-[-0.04em] mb-8 leading-[1.05] drop-shadow-sm text-slate-900">
                    {activeDict.hero_line1}<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-600 to-slate-900">{activeDict.hero_line2}</span>
                  </motion.h1>
                  <motion.p variants={fadeUp} className="text-[22px] md:text-[24px] text-slate-500 font-medium max-w-[800px] leading-[1.6] mb-16">
                    {activeDict.hero_sub}
                  </motion.p>
                  <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto">
                    <PrimaryButton onClick={() => changePage('extraction')} icon={ArrowRight}>
                      {activeDict.btn_start_ext}
                    </PrimaryButton>
                    <SecondaryButton onClick={() => changePage('compliance')} icon={Activity}>
                      {activeDict.btn_run_audit}
                    </SecondaryButton>
                  </motion.div>
                </div>

                <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[48px] p-12 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
                    <div className={`absolute top-[-50px] ${languages[lang].dir === 'rtl' ? 'left-[-50px]' : 'right-[-50px]'} w-[200px] h-[200px] bg-blue-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center text-slate-900 mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Boxes size={36} strokeWidth={1.5}/></div>
                      <h3 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-4 tracking-[-0.03em]">{activeDict.card1_title}</h3>
                      <p className="text-[17px] text-slate-500 font-medium leading-[1.7]">{activeDict.card1_sub}</p>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[48px] p-12 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
                    <div className={`absolute top-[-50px] ${languages[lang].dir === 'rtl' ? 'left-[-50px]' : 'right-[-50px]'} w-[200px] h-[200px] bg-indigo-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center text-slate-900 mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Activity size={36} strokeWidth={1.5}/></div>
                      <h3 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-4 tracking-[-0.03em]">{activeDict.card2_title}</h3>
                      <p className="text-[17px] text-slate-500 font-medium leading-[1.7]">{activeDict.card2_sub}</p>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleUp} whileHover={{ y: -10, scale: 1.01 }} transition={fluidSpring} className="bg-white/60 backdrop-blur-3xl border border-white rounded-[48px] p-12 md:p-14 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
                    <div className={`absolute top-[-50px] ${languages[lang].dir === 'rtl' ? 'left-[-50px]' : 'right-[-50px]'} w-[200px] h-[200px] bg-cyan-100/50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-20 h-20 bg-white rounded-[24px] flex items-center justify-center text-slate-900 mb-10 border border-slate-100 shadow-[0_15px_30px_rgba(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"><Cpu size={36} strokeWidth={1.5}/></div>
                      <h3 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-4 tracking-[-0.03em]">{activeDict.card3_title}</h3>
                      <p className="text-[17px] text-slate-500 font-medium leading-[1.7]">{activeDict.card3_sub}</p>
                    </div>
                  </motion.div>

                  <motion.div variants={scaleUp} whileHover={{ y: -8, scale: 1.005 }} transition={fluidSpring} className="md:col-span-3 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-[48px] p-14 md:p-20 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5),_inset_0_2px_0_rgba(255,255,255,0.1)] group text-white">
                    <div className={`absolute -bottom-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none group-hover:scale-110 transition-transform duration-1000 ${languages[lang].dir === 'rtl' ? '-right-20' : '-left-20'}`}></div>
                    <Globe className={`absolute -bottom-10 text-white/5 transform rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms] ease-out ${languages[lang].dir === 'rtl' ? '-right-10' : '-left-10'}`} size={400} strokeWidth={1}/>
                    
                    <div className="relative z-10 max-w-[750px]">
                      <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-[14px] bg-white/10 border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.2)] text-white text-[12px] font-bold uppercase tracking-[0.2em] mb-10 font-[Satoshi] backdrop-blur-md">{activeDict.pred_tag}</div>
                      <h3 className="text-[48px] md:text-[56px] font-[Satoshi] font-extrabold text-white mb-8 tracking-[-0.04em] leading-[1.1]">{activeDict.pred_title}</h3>
                      <p className="text-[20px] text-slate-300 font-medium leading-[1.7]">{activeDict.pred_desc}</p>
                    </div>
                    <div className="relative z-10 shrink-0">
                      <button onClick={() => changePage('compliance')} className="group/btn flex items-center gap-4 bg-white text-slate-900 px-10 py-6 rounded-[32px] font-bold font-[Satoshi] text-[18px] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] border border-white hover:scale-105 transition-all duration-500 rtl:flex-row-reverse">
                        {activeDict.pred_btn} <ArrowRight size={22} className={`transition-transform duration-500 ${languages[lang].dir === 'rtl' ? 'group-hover/btn:-translate-x-1.5 rotate-180' : 'group-hover/btn:translate-x-1.5'}`}/>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div variants={scaleUp} className="mt-10 bg-white/60 backdrop-blur-3xl border border-white rounded-[48px] p-14 md:p-20 relative overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.06),_inset_0_2px_0_rgba(255,255,255,1)]">
                  <div className={`absolute top-[-100px] w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none ${languages[lang].dir === 'rtl' ? 'left-[-100px]' : 'right-[-100px]'}`}></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl">
                       <h3 className="text-[36px] md:text-[48px] font-[Satoshi] font-extrabold text-slate-900 mb-6 tracking-[-0.03em] leading-tight">{activeDict.speed_title1}<br/>{activeDict.speed_title2}</h3>
                       <p className="text-[18px] text-slate-500 font-medium leading-[1.8] mb-8">{activeDict.speed_desc}</p>
                       <div className="flex flex-wrap gap-4">
                          <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-[16px] text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> {activeDict.tag_invoice}</span>
                          <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-[16px] text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> {activeDict.tag_bill}</span>
                          <span className="px-5 py-2.5 bg-white border border-slate-200 rounded-[16px] text-[14px] font-bold text-slate-700 shadow-sm flex items-center gap-2"><FileText size={16}/> {activeDict.tag_cert}</span>
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

            {activePage === 'extraction' && (
              <motion.div key="extract" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <UploadBox title={activeDict.card1_title} description={activeDict.card1_sub} buttonText={activeDict.btn_start_ext} file={file} setFile={setFile} loading={loading} onUpload={(e) => handleFileUpload(e, 'extract')} icon={Boxes} selectedFields={selectedFields} setSelectedFields={setSelectedFields} activePage={activePage} activeDict={activeDict}/>
                ) : (
                  <div className="space-y-16">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-8">
                      <div>
                        <h2 className="text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">{activeDict.res_payload}</h2>
                      </div>
                      <div className="flex items-center gap-5">
                        <SecondaryButton onClick={handleDownload} icon={Download}>
                          {activeDict.res_export}
                        </SecondaryButton>
                        <PrimaryButton onClick={() => changePage('extraction')} icon={ListPlus}>
                          {activeDict.res_new_scan}
                        </PrimaryButton>
                      </div>
                    </div>

                    <motion.div variants={scaleUp} className="bg-white/70 backdrop-blur-3xl rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1),_inset_0_2px_0_rgba(255,255,255,1)] border border-white overflow-hidden relative">
                      
                      <div className="p-12 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200/60 gap-10 bg-slate-50/50 relative">
                        <div className="flex items-center gap-8">
                          <div className="w-24 h-24 bg-white rounded-[28px] border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex items-center justify-center flex-shrink-0"><FileText size={40} className="text-slate-900" strokeWidth={1.5}/></div>
                          <div>
                            <h3 className="font-[Satoshi] font-extrabold text-[36px] tracking-[-0.03em] text-slate-900 mb-4">{results.document_type || activeDict.ext_doc}</h3>
                            <div className="flex flex-wrap items-center gap-5">
                              <span className="flex items-center gap-2.5 text-slate-600 font-bold font-[Satoshi] text-[15px] bg-white px-5 py-2.5 rounded-[16px] border border-slate-200 shadow-sm"><Hash size={18} className="text-slate-400"/> {results.invoice_number}</span>
                              <span className="flex items-center gap-2.5 text-slate-600 font-bold font-[Satoshi] text-[15px] bg-white px-5 py-2.5 rounded-[16px] border border-slate-200 shadow-sm"><Calendar size={18} className="text-slate-400"/> {results.invoice_date}</span>
                            </div>
                          </div>
                        </div>
                        {results.missing_fields?.length > 0 && (
                          <div className="flex items-center gap-3 bg-white border border-red-100 text-red-700 px-6 py-4 rounded-[20px] text-[15px] font-bold shadow-[0_10px_30px_rgba(239,68,68,0.1)] font-[Satoshi]">
                            <AlertCircle size={20} /> {results.missing_fields.length} {activeDict.ext_missing}
                          </div>
                        )}
                      </div>

                      <div className="p-12 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/40">
                        {selectedFields?.includes('entities') && (
                          <div className="space-y-6">
                            <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-8 font-[Satoshi]"><Globe size={18}/> {activeDict.ext_entities}</h4>
                            <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                              <div className={`absolute top-0 ${languages[lang].dir === 'rtl' ? 'right-0' : 'left-0'} w-2 h-full bg-slate-900`}></div>
                              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 font-[Satoshi]">{activeDict.ext_shipper}</p>
                              <p className="text-[28px] font-[Satoshi] font-bold text-slate-900 leading-tight">{results.shipper_name !== "N/A" ? results.shipper_name : "-"}</p>
                            </motion.div>
                            <div className="flex justify-center -my-4 relative z-10"><div className="bg-white border border-slate-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] p-3 rounded-full text-slate-400"><ArrowRight size={20} className={languages[lang].dir === 'rtl' ? 'rotate-180' : ''} /></div></div>
                            <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
                              <div className={`absolute top-0 ${languages[lang].dir === 'rtl' ? 'right-0' : 'left-0'} w-2 h-full bg-slate-400`}></div>
                              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-4 font-[Satoshi]">{activeDict.ext_consignee}</p>
                              <p className="text-[28px] font-[Satoshi] font-bold text-slate-900 leading-tight">{results.consignee_name !== "N/A" ? results.consignee_name : "-"}</p>
                            </motion.div>
                          </div>
                        )}
                        
                        {selectedFields?.includes('logistics') && (
                          <div className="space-y-6">
                            <h4 className="text-[13px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3 mb-8 font-[Satoshi]"><MapPin size={18}/> {activeDict.ext_logistics}</h4>
                            <div className="grid grid-cols-2 gap-6">
                              <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">{activeDict.ext_origin}</p>
                                <p className="font-[Satoshi] font-extrabold text-slate-900 text-[26px] tracking-tight">{results.origin_country !== "N/A" ? results.origin_country : "-"}</p>
                                <p className="text-[15px] text-slate-500 mt-2 font-medium truncate">{results.port_of_loading !== "N/A" ? results.port_of_loading : ""}</p>
                              </motion.div>
                              <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">{activeDict.ext_dest}</p>
                                <p className="font-[Satoshi] font-extrabold text-slate-900 text-[26px] tracking-tight">{results.destination_country !== "N/A" ? results.destination_country : "-"}</p>
                                <p className="text-[15px] text-slate-500 mt-2 font-medium truncate">{results.port_of_discharge !== "N/A" ? results.port_of_discharge : ""}</p>
                              </motion.div>
                              <motion.div whileHover={{ y: -4, shadow: "0 20px 50px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="col-span-2 p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex justify-between items-center">
                                <div>
                                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">{activeDict.ext_method}</p>
                                  <p className="font-[Satoshi] font-extrabold text-slate-900 flex items-center gap-3 text-[28px] tracking-tight">{results.shipping_method !== "N/A" ? results.shipping_method : "-"} <span className="text-slate-300 font-normal">/</span> <span className="text-slate-600">{results.incoterms !== "N/A" ? results.incoterms : "-"}</span></p>
                                </div>
                                <div className={`${languages[lang].dir === 'rtl' ? 'text-left border-r pr-10' : 'text-right border-l pl-10'} border-slate-200`}>
                                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">{activeDict.ext_total_pay}</p>
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
                            <h4 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 flex items-center gap-4"><Package size={32} className="text-slate-900" strokeWidth={1.5} /> {activeDict.ext_line_items}</h4>
                            <div className="bg-slate-50 border border-slate-200 px-8 py-5 rounded-[24px] text-[18px] font-bold font-[Satoshi] text-slate-800 flex items-center gap-5 shadow-inner">
                              <div className="p-2.5 bg-white border border-slate-200 text-slate-900 rounded-[14px] shadow-sm"><DollarSign size={24} strokeWidth={2.5} /></div> {activeDict.ext_invoice_total}: <span className="text-slate-900 text-[32px] font-black tracking-tight">${results.total_value_usd?.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="p-12 md:px-16 bg-slate-50/50">
                            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                              {results.line_items?.map((item, idx) => (
                                <motion.div key={idx} variants={fadeUp} whileHover={{ y: -4, scale: 1.005, shadow: "0 25px 50px -12px rgba(0,0,0,0.08)" }} transition={fluidSpring} className="p-10 bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row justify-between items-start md:items-center gap-10 group relative overflow-hidden">
                                  <div className="flex-1">
                                    <p className="font-bold font-[Satoshi] text-slate-900 text-[20px] mb-5">{item.product_description}</p>
                                    <div className="flex flex-wrap gap-4 text-[15px] font-bold font-[Satoshi] text-slate-500">
                                      <span className="flex items-center gap-2 bg-slate-50 px-5 py-2.5 rounded-[16px] border border-slate-200"><Hash size={18} className="text-slate-400"/> {activeDict.ext_hs}: <span className="font-mono text-slate-800 tracking-tight">{item.hs_code}</span></span>
                                      <span className="bg-slate-50 px-5 py-2.5 rounded-[16px] border border-slate-200">{activeDict.ext_qty}: <span className="text-slate-800">{item.quantity}</span></span>
                                      <span className="bg-slate-50 px-5 py-2.5 rounded-[16px] border border-slate-200">{activeDict.ext_wgt}: <span className="text-slate-800">{item.weight_kg} kg</span></span>
                                    </div>
                                  </div>
                                  <div className={`${languages[lang].dir === 'rtl' ? 'md:text-left' : 'md:text-right'} w-full md:w-auto bg-slate-50/50 md:bg-transparent p-6 md:p-0 rounded-[20px]`}>
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 font-[Satoshi]">{activeDict.ext_declared}</p>
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

            {activePage === 'compliance' && (
              <motion.div key="comp" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
                {!results ? (
                  <UploadBox title={activeDict.card2_title} description={activeDict.card2_sub} buttonText={activeDict.btn_run_audit} file={file} setFile={setFile} loading={loading} onUpload={(e) => handleFileUpload(e, 'compliance')} icon={Activity} activeDict={activeDict}/>
                ) : (
                  <div className="space-y-16">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h2 className="text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">{activeDict.audit_report}</h2>
                      </div>
                      <PrimaryButton onClick={() => changePage('compliance')} icon={Activity}>
                        {activeDict.audit_new}
                      </PrimaryButton>
                    </div>

                    <motion.div variants={scaleUp} className={`p-12 md:p-16 rounded-[48px] border flex flex-col md:flex-row items-start md:items-center gap-12 bg-white/80 backdrop-blur-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden ${results.status === 'RED' ? 'border-red-200' : results.status === 'YELLOW' ? 'border-yellow-300' : 'border-emerald-200'}`}>
                      <div className={`absolute top-[-50%] ${languages[lang].dir === 'rtl' ? 'left-[-10%]' : 'right-[-10%]'} w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none ${results.status === 'RED' ? 'bg-red-500' : results.status === 'YELLOW' ? 'bg-yellow-500' : 'bg-emerald-500'}`}></div>
                      <div className={`w-32 h-32 rounded-[32px] border shadow-[0_20px_50px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] flex items-center justify-center flex-shrink-0 z-10 ${results.status === 'RED' ? 'bg-white border-red-200 text-red-600' : results.status === 'YELLOW' ? 'bg-white border-yellow-200 text-yellow-600' : 'bg-white border-emerald-200 text-emerald-600'}`}>
                        {results.status === 'GREEN' ? <CheckCircle size={64} strokeWidth={1.5}/> : <ShieldAlert size={64} strokeWidth={1.5}/>}
                      </div>
                      <div className="flex-1 w-full z-10">
                        <h3 className={`text-[36px] md:text-[44px] font-[Satoshi] font-extrabold tracking-tight mb-10 leading-[1.1] ${results.status === 'RED' ? 'text-red-700' : results.status === 'YELLOW' ? 'text-yellow-700' : 'text-emerald-700'}`}>
                          {results.status === 'RED' ? activeDict.audit_risk_high : results.status === 'YELLOW' ? activeDict.audit_risk_warn : activeDict.audit_risk_clear}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-8 rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-400 font-[Satoshi]">{activeDict.audit_hold}</p>
                            <p className={`text-[32px] font-[Satoshi] font-extrabold tracking-tight ${results.status === 'RED' ? 'text-red-700' : 'text-slate-900'}`}>{results.customs_hold_probability || "N/A"}</p>
                          </div>
                          <div className="p-8 rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-400 font-[Satoshi]">{activeDict.audit_loss}</p>
                            <p className={`text-[32px] font-[Satoshi] font-extrabold tracking-tight ${results.status === 'RED' ? 'text-red-700' : 'text-slate-900'}`}>{results.estimated_loss || "N/A"}</p>
                          </div>
                          <div className="p-8 rounded-[28px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                            <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4 text-slate-400 font-[Satoshi]">{activeDict.audit_action}</p>
                            <p className={`text-[18px] font-bold font-[Satoshi] leading-snug ${results.status === 'RED' ? 'text-red-700' : 'text-slate-800'}`}>{results.headline_action}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-3xl p-12 md:p-16 rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] border border-white">
                      <h3 className="text-[32px] font-[Satoshi] font-extrabold mb-12 text-slate-900 flex items-center gap-5"><AlertTriangle size={36} className="text-slate-900" strokeWidth={1.5}/> {activeDict.audit_anomalies}</h3>
                      {results.compliance_report?.length === 0 ? (
                        <div className="text-center py-24 bg-slate-50/80 rounded-[32px] border border-slate-100 shadow-[inset_0_10px_40px_rgba(0,0,0,0.02)]">
                           <div className="w-24 h-24 bg-white text-emerald-500 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-emerald-100 shadow-[0_15px_40px_rgba(16,185,129,0.15)]"><CheckCircle size={48} strokeWidth={1.5}/></div>
                           <p className="text-slate-900 font-extrabold font-[Satoshi] text-[24px] mb-3">{activeDict.audit_no_violations}</p>
                           <p className="text-slate-500 text-[18px] font-medium max-w-md mx-auto">{activeDict.audit_clear_msg}</p>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {results.compliance_report?.map((issue, idx) => (
                            <motion.div whileHover={{ scale: 1.01, y: -5 }} transition={fluidSpring} key={idx} className="p-10 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-white flex gap-10 relative overflow-hidden">
                              <div className={`absolute ${languages[lang].dir === 'rtl' ? 'right-0' : 'left-0'} top-0 bottom-0 w-2.5 ${issue.severity === 'HIGH' ? 'bg-red-500' : issue.severity === 'MEDIUM' ? 'bg-yellow-400' : 'bg-slate-900'}`} />
                              <div className="mt-2"><span className={`px-5 py-2 text-[12px] font-bold rounded-[12px] uppercase tracking-[0.2em] border ${issue.severity === 'HIGH' ? 'bg-red-50 text-red-700 border-red-200' : issue.severity === 'MEDIUM' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-slate-50 text-slate-800 border-slate-200'}`}>{issue.severity}</span></div>
                              <div className="flex-1">
                                <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4 font-[Satoshi]">{issue.type}</p>
                                <p className="text-[20px] text-slate-900 font-bold font-[Satoshi] mb-8 leading-relaxed">{issue.description}</p>
                                <div className="bg-slate-50/80 px-8 py-6 rounded-[24px] border border-slate-200 shadow-inner"><p className="text-[16px] flex flex-col md:flex-row md:items-start gap-5"><span className="font-bold font-[Satoshi] text-slate-700 uppercase tracking-[0.2em] text-[12px] bg-white border border-slate-200 px-4 py-2 rounded-[10px] inline-block mt-0.5 shadow-sm">{activeDict.audit_action_req}</span><span className="text-slate-800 font-medium leading-relaxed">{issue.fix}</span></p></div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {results.carbon_footprint && (
                      <motion.div variants={scaleUp} className="rounded-[56px] overflow-hidden border border-emerald-100 shadow-[0_40px_120px_-20px_rgba(16,185,129,0.15),_inset_0_2px_0_rgba(255,255,255,1)]">
                        <div className="bg-slate-900 px-14 md:px-20 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:28px_28px]"></div>
                          <div className="absolute top-0 left-1/3 w-[600px] h-[200px] bg-emerald-500/10 rounded-full blur-[80px]"></div>
                          <div className="relative z-10 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-[18px] bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                              <Leaf size={26} className="text-emerald-400" strokeWidth={1.5}/>
                            </div>
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400 mb-1 font-[Satoshi]">{activeDict.carb_tag}</p>
                              <h3 className="text-[28px] font-[Satoshi] font-extrabold text-white tracking-tight">{activeDict.carb_title}</h3>
                            </div>
                          </div>
                          <div className="relative z-10 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-[16px]">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                            <span className="text-[13px] font-bold text-emerald-300 font-[Satoshi]">{activeDict.carb_live} · {results.carbon_footprint.mode_used}</span>
                          </div>
                        </div>

                        <div className="bg-gradient-to-b from-white to-emerald-50/30 px-14 md:px-20 pt-14 pb-10">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
                            <div className="md:col-span-1 bg-white rounded-[40px] p-12 border border-emerald-100 shadow-[0_20px_60px_rgba(16,185,129,0.08)] flex flex-col justify-between relative overflow-hidden">
                              <div className={`absolute bottom-0 ${languages[lang].dir === 'rtl' ? 'left-0' : 'right-0'} w-[180px] h-[180px] bg-emerald-100/60 rounded-full blur-[60px]`}></div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-6 font-[Satoshi]">{activeDict.carb_total}</p>
                              <div className="relative z-10">
                                <p className="text-[80px] font-[Satoshi] font-black text-slate-900 tracking-[-0.04em] leading-none">{results.carbon_footprint.co2_emissions_kg}</p>
                                <p className="text-[22px] font-bold text-emerald-600 font-[Satoshi] mt-3">kg CO₂e</p>
                                <div className="mt-8 flex flex-wrap gap-3">
                                  <span className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-[14px] text-[13px] font-bold text-emerald-800 font-[Satoshi]">{results.carbon_footprint.distance_km.toLocaleString()} km</span>
                                  <span className="px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-[14px] text-[13px] font-bold text-slate-700 font-[Satoshi]">{results.carbon_footprint.mode_used}</span>
                                </div>
                              </div>
                            </div>

                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between">
                                <div className="w-12 h-12 rounded-[16px] bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-8">
                                  <Leaf size={22} className="text-emerald-600" strokeWidth={1.5}/>
                                </div>
                                <div>
                                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 font-[Satoshi]">{activeDict.carb_trees}</p>
                                  <p className="text-[52px] font-[Satoshi] font-black text-emerald-600 tracking-[-0.03em] leading-none">{results.carbon_footprint.trees_equivalent}</p>
                                  <p className="text-[15px] font-medium text-slate-500 mt-3">{activeDict.carb_trees_sub}</p>
                                </div>
                              </div>

                              <div className="bg-white rounded-[32px] p-10 border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between">
                                <div className="w-12 h-12 rounded-[16px] bg-blue-50 border border-blue-100 flex items-center justify-center mb-8">
                                  <Zap size={22} className="text-blue-600" strokeWidth={1.5}/>
                                </div>
                                <div>
                                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 font-[Satoshi]">{activeDict.carb_phones}</p>
                                  <p className="text-[52px] font-[Satoshi] font-black text-blue-600 tracking-[-0.03em] leading-none">{results.carbon_footprint.smartphones_equivalent}</p>
                                  <p className="text-[15px] font-medium text-slate-500 mt-3">{activeDict.carb_phones_sub}</p>
                                </div>
                              </div>

                              <div className="sm:col-span-2 bg-slate-50/80 rounded-[28px] p-8 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                  <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-slate-900"></span>
                                    <span className="font-bold font-[Satoshi] text-slate-900 text-[16px]">India</span>
                                  </div>
                                  <div className="flex-1 h-px bg-gradient-to-r from-slate-300 via-emerald-400 to-slate-300 w-20 mx-2"></div>
                                  <span className="text-[13px] font-bold font-[Satoshi] text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-[10px]">{results.carbon_footprint.mode_used}</span>
                                  <div className="flex-1 h-px bg-gradient-to-r from-slate-300 via-emerald-400 to-slate-300 w-20 mx-2"></div>
                                  <div className="flex items-center gap-3">
                                    <span className="font-bold font-[Satoshi] text-slate-900 text-[16px]">{results.extracted_data?.destination || "Destination"}</span>
                                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                  </div>
                                </div>
                                <span className="text-[13px] font-bold text-slate-500 font-[Satoshi]">{results.carbon_footprint.distance_km.toLocaleString()} km {activeDict.carb_route}</span>
                              </div>
                            </div>
                          </div>

                          {results.carbon_footprint.potential_savings_kg > 0 && (
                            <div className="bg-white rounded-[40px] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
                              <div className="px-12 pt-12 pb-8 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2 font-[Satoshi]">{activeDict.carb_compare}</p>
                                    <h4 className="text-[24px] font-[Satoshi] font-extrabold text-slate-900">{activeDict.carb_switch}</h4>
                                  </div>
                                  <div className={`${languages[lang].dir === 'rtl' ? 'text-left' : 'text-right'}`}>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-1 font-[Satoshi]">{activeDict.carb_saving}</p>
                                    <p className="text-[40px] font-[Satoshi] font-black text-emerald-600 tracking-[-0.03em] leading-none">{results.carbon_footprint.potential_savings_kg} <span className="text-[20px]">kg CO₂e</span></p>
                                  </div>
                                </div>
                              </div>

                              <div className="px-12 py-10 space-y-8">
                                <div>
                                  <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                      <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                      <span className="font-bold font-[Satoshi] text-slate-700 text-[15px]">{activeDict.carb_air}</span>
                                      <span className="text-[12px] text-slate-400 font-[Satoshi]">0.500 kg CO₂e/ton-km</span>
                                    </div>
                                    <span className="font-black font-[Satoshi] text-slate-900 text-[18px]">{results.carbon_footprint.co2_emissions_kg} kg</span>
                                  </div>
                                  <div className="w-full h-10 bg-slate-50 rounded-full overflow-hidden border border-slate-100 relative">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: '100%' }}
                                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                      className={`h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center ${languages[lang].dir === 'rtl' ? 'justify-start pl-4' : 'justify-end pr-4'} absolute top-0 ${languages[lang].dir === 'rtl' ? 'right-0' : 'left-0'}`}
                                    >
                                      <span className="text-white text-[12px] font-bold font-[Satoshi]">100%</span>
                                    </motion.div>
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                      <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                      <span className="font-bold font-[Satoshi] text-slate-700 text-[15px]">{activeDict.carb_rail}</span>
                                      <span className="text-[12px] text-slate-400 font-[Satoshi]">0.030 kg CO₂e/ton-km</span>
                                    </div>
                                    <span className="font-black font-[Satoshi] text-slate-900 text-[18px]">{Math.round(results.carbon_footprint.co2_emissions_kg * 0.06)} kg</span>
                                  </div>
                                  <div className="w-full h-10 bg-slate-50 rounded-full overflow-hidden border border-slate-100 relative">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: '6%' }}
                                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                      className={`h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full absolute top-0 ${languages[lang].dir === 'rtl' ? 'right-0' : 'left-0'}`}
                                    >
                                    </motion.div>
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                      <span className="font-bold font-[Satoshi] text-emerald-700 text-[15px]">{activeDict.carb_ocean}</span>
                                      <span className="text-[12px] text-slate-400 font-[Satoshi]">0.015 kg CO₂e/ton-km</span>
                                      <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-[8px] text-[11px] font-bold text-emerald-700 font-[Satoshi]">{activeDict.carb_rec}</span>
                                    </div>
                                    <span className="font-black font-[Satoshi] text-emerald-700 text-[18px]">{Math.round(results.carbon_footprint.co2_emissions_kg * 0.03)} kg</span>
                                  </div>
                                  <div className="w-full h-10 bg-emerald-50 rounded-full overflow-hidden border border-emerald-100 relative">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: '3%' }}
                                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                                      className={`h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full absolute top-0 ${languages[lang].dir === 'rtl' ? 'right-0' : 'left-0'}`}
                                    >
                                    </motion.div>
                                  </div>
                                </div>
                              </div>

                              <div className="mx-6 mb-6 bg-slate-900 rounded-[28px] px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                                <div className={`absolute top-0 ${languages[lang].dir === 'rtl' ? 'left-0' : 'right-0'} w-[300px] h-[150px] bg-emerald-500/15 rounded-full blur-[60px]`}></div>
                                <div className="relative z-10">
                                  <div className="flex items-center gap-3 mb-3">
                                    <Sparkles size={16} className="text-emerald-400"/>
                                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-400 font-[Satoshi]">{activeDict.carb_dp}</span>
                                  </div>
                                  <p className="text-[18px] font-bold font-[Satoshi] text-white leading-snug">
                                    {activeDict.carb_switch_text1} <span className="text-emerald-400">{Math.round((results.carbon_footprint.potential_savings_kg / results.carbon_footprint.co2_emissions_kg) * 100)}%</span> {activeDict.carb_switch_text2}
                                  </p>
                                </div>
                                <div className="relative z-10 flex-shrink-0">
                                  <div className="bg-emerald-500 text-white px-8 py-4 rounded-[20px] font-bold font-[Satoshi] text-[15px] flex items-center gap-3 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:scale-105 transition-transform cursor-pointer">
                                    <Globe size={18}/> {activeDict.carb_view_routes}
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
                      <h2 className="text-[64px] md:text-[80px] font-[Satoshi] font-extrabold text-slate-900 mb-6 tracking-[-0.04em] leading-[1.05] drop-shadow-sm">{activeDict.hs_gen_title}</h2>
                      <p className="text-[20px] text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{activeDict.hs_gen_desc}</p>
                    </motion.div>
                    
                    <motion.div variants={fadeUp} className="bg-white/60 backdrop-blur-3xl p-6 rounded-[48px] border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)]">
                      <form onSubmit={handleHSCodeGenerate} className="flex flex-col gap-6">
                        <div className="relative">
                          <textarea 
                            rows="4" value={hsInputText} onChange={(e) => setHsInputText(e.target.value)}
                            placeholder={activeDict.hs_placeholder}
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
                          {loading ? <><Loader2 className="animate-spin" size={22}/> <span>{activeDict.btn_processing}</span></> : <span>{activeDict.hs_btn}</span>}
                        </PrimaryButton>
                      </form>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="space-y-16">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <h2 className="text-[56px] font-[Satoshi] font-extrabold text-slate-900 tracking-[-0.04em] drop-shadow-sm">{activeDict.hs_res_title}</h2>
                        <p className="text-slate-500 font-medium mt-4 text-[20px]">{activeDict.hs_res_desc}</p>
                      </div>
                      <SecondaryButton onClick={() => changePage('hscode')} icon={FileSearch}>
                        {activeDict.hs_new}
                      </SecondaryButton>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      <div className="col-span-1 lg:col-span-2 space-y-12">
                        
                        <motion.div variants={scaleUp} className="bg-white/80 backdrop-blur-3xl p-14 md:p-16 rounded-[48px] border border-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-14">
                          <div className={`absolute top-[-50%] ${languages[lang].dir === 'rtl' ? 'right-[-20%]' : 'left-[-20%]'} w-[600px] h-[600px] bg-slate-100/50 rounded-full blur-[120px] pointer-events-none`}></div>

                          <div className="z-10">
                            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3 font-[Satoshi]"><Globe size={18}/> {activeDict.hs_primary}</p>
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
                              {results.confidence_label} {activeDict.hs_match}
                            </span>
                          </div>
                        </motion.div>

                        <motion.div variants={fadeUp} className="bg-white/80 backdrop-blur-3xl p-14 md:p-16 rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),_inset_0_2px_0_rgba(255,255,255,1)] relative overflow-hidden border border-white">
                          <div className="relative z-10 space-y-14">
                            <div>
                              <p className="text-[13px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-[Satoshi]"><Sparkles size={18}/> {activeDict.hs_official}</p>
                              <p className="text-[24px] font-bold font-[Satoshi] text-slate-900 leading-relaxed">{results.official_description}</p>
                            </div>
                            <div>
                              <p className="text-[13px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-[Satoshi]"><Zap size={18}/> {activeDict.hs_diag}</p>
                              <p className="text-slate-600 font-medium leading-[1.8] text-[18px] bg-slate-50/80 p-10 rounded-[32px] border border-slate-100 shadow-[inset_0_10px_30px_rgba(0,0,0,0.02)]">{results.explanation}</p>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
                          <h3 className={`text-[14px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2.5 font-[Satoshi] ${languages[lang].dir === 'rtl' ? 'mr-2' : 'ml-2'}`}><ListPlus size={20}/> {activeDict.hs_alt}</h3>
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
                          <h3 className="text-[28px] font-[Satoshi] font-extrabold text-slate-900 mb-12 flex items-center gap-4 border-b border-slate-200/60 pb-10"><ShieldCheck size={32} className="text-slate-900" strokeWidth={1.5}/> {activeDict.hs_intel}</h3>
                          
                          <div className="space-y-14 flex-1">
                            <div>
                              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2.5 font-[Satoshi]"><Percent size={18}/> {activeDict.hs_duty}</p>
                              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                                <p className="font-[Satoshi] font-black text-slate-900 text-[32px] tracking-tight">{results.duty_rate}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2.5 font-[Satoshi]"><FileText size={18}/> {activeDict.hs_certs}</p>
                              <div className="space-y-5">
                                {results.required_certificates?.map((cert, idx) => (
                                  <div key={idx} className="flex items-start gap-5 p-6 rounded-[24px] bg-slate-50 border border-slate-100 shadow-[0_8px_20px_rgba(0,0,0,0.03)] text-slate-900">
                                    <CheckCircle size={22} className="text-slate-900 mt-0.5 flex-shrink-0" />
                                    <p className="text-[16px] font-bold font-[Satoshi] leading-snug">{cert}</p>
                                  </div>
                                ))}
                                {results.required_certificates?.length === 0 && (
                                  <p className="text-[16px] font-medium text-slate-500 italic p-8 bg-slate-50/50 rounded-[28px] border border-slate-100 text-center">{activeDict.hs_no_certs}</p>
                                )}
                              </div>
                            </div>

                            <div className="mt-auto pt-12 border-t border-slate-200/60">
                              <p className="text-[12px] font-bold text-yellow-600 uppercase tracking-[0.2em] mb-5 flex items-center gap-2.5 font-[Satoshi]"><AlertCircle size={18}/> {activeDict.hs_notes}</p>
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

      <Footer onOpenModal={setActiveModalKey} changePage={changePage} activeDict={activeDict} />
      <TradeBot lang={lang} activeLangDict={activeDict} />
    </div>
  );
}
  
export default App;