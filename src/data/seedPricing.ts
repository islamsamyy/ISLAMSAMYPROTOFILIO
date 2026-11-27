export interface PricingPackage {
  id: string;
  name: string;
  badge: string;
  headline: string;
  price: string;
  frequency: string;
  duration: string;
  deliverables: string[];
  isPopular?: boolean;
  // Rich business details & ROI (also mapped via PACKAGE_DETAILS_MAP for Supabase rows)
  targetAudience?: string;
  detailedDescription?: string;
  businessRoi?: string;
  roiMetric?: string;
  ar?: {
    name: string;
    badge: string;
    headline: string;
    frequency: string;
    duration: string;
    targetAudience: string;
    detailedDescription: string;
    businessRoi: string;
    roiMetric: string;
    deliverables: string[];
  };
}

export interface ConsultationRates {
  hourlyRate: string;
  session30Min: string;
  session60Min: string;
  availableDays: string[];
  availableSlots: string[];
  availableTimezones: string[];
}

export const initialPackages: PricingPackage[] = [
  {
    id: 'pkg-custom-web',
    name: 'Custom Web & Corporate Platforms',
    badge: 'Digital Presence',
    headline:
      'High-speed custom Next.js websites and bespoke web applications built to convert enterprise visitors into qualified B2B leads 24/7.',
    price: '$800',
    frequency: 'starting from / project',
    duration: '2–3 Weeks',
    targetAudience: 'Enterprises, Factories, Consulting Firms & Founders',
    detailedDescription:
      'A custom-engineered web platform (not a slow template) designed around your brand identity, bilingual audience (Arabic/English), and lead-capture funnel. Includes a full Admin CMS, WhatsApp & booking integrations, and technical SEO.',
    businessRoi:
      'Acts as a 24/7 digital sales representative—elevating brand authority with high-ticket B2B clients and turning organic traffic into booked meetings instead of losing leads on social media.',
    roiMetric: '3x Higher B2B Lead Trust & Conversion',
    deliverables: [
      'Custom Next.js / React architecture with ultra-fast loading & technical SEO',
      'Full Admin Dashboard to manage content, projects, services, and inquiries',
      'WhatsApp integration, online booking engine, and built-in lead CRM',
      'Bilingual (Arabic / English) support, SSL security, and cloud deployment'
    ],
    isPopular: false,
    ar: {
      name: 'الحضور الرقمي والمشاريع الخاصة',
      badge: 'واجهتك الاحترافية',
      headline:
        'مواقع إلكترونية وتطبيقات ويب مخصصة بالكامل عالية السرعة، مصممة لتحويل الزوار إلى عملاء فعليين على مدار الساعة.',
      frequency: 'يبدأ من / مشروع',
      duration: '2–3 أسابيع',
      targetAudience: 'الشركات، المصانع، المكاتب الاستشارية، ورواد الأعمال',
      detailedDescription:
        'تصميم وبرمجة منصة ويب خاصة بالكامل (بأحدث تقنيات Next.js بدون قوالب بطيئة) مع لوحة تحكم شاملة لإدارة المحتوى والمشاريع، وربط مباشر مع واتساب وحجز المواعيد ونظام متابعة العملاء، ودعم كامل للغتين العربية والإنجليزية.',
      businessRoi:
        'الموقع يعمل كمندوب مبيعاتك الذي لا يتوقف 24/7؛ يرفع قيمة البراند أمام الشركات الكبرى (B2B)، ويبني ثقة فورية ويضاعف تحويل الزوار إلى عملاء بدلاً من ضياعهم في رسائل السوشيال ميديا.',
      roiMetric: 'مضاعفة ثقة العملاء وتحويل الزوار 3x',
      deliverables: [
        'برمجة مخصصة فائقة السرعة (Next.js / React) متوافقة مع محركات البحث SEO',
        'لوحة تحكم شاملة لإدارة المحتوى، المشاريع، المقالات، والرسائل',
        'ربط مباشر مع WhatsApp ونظام حجز مواعيد و CRM مدمج لمتابعة العملاء',
        'دعم اللغتين (عربي / إنجليزي) مع استضافة سحابية آمنة وشهادة SSL'
      ]
    }
  },
  {
    id: 'pkg-ecommerce-engine',
    name: 'Full-Scale E-Commerce Engine',
    badge: 'Online Sales',
    headline:
      'End-to-end online store engineered for high conversion, automated payments, real-time inventory sync, and built-in sales analytics.',
    price: '$1,800',
    frequency: 'starting from / store',
    duration: '3–4 Weeks',
    targetAudience: 'Retail Brands, Wholesalers & Direct-to-Consumer Factories',
    detailedDescription:
      'A scalable e-commerce platform capable of handling thousands of concurrent shoppers. Connects seamlessly with local & global payment gateways (Paymob, Stripe, Fawry, Tabby/Tamara) and shipping couriers with automated order tracking.',
    businessRoi:
      'Opens an unlimited 24/7 sales channel with zero branch rent or extra staff overhead. Smooth checkout flows and automated inventory control boost conversion rates and eliminate overselling losses.',
    roiMetric: 'Unlimited Market Reach & Lower Sales Overhead',
    deliverables: [
      'High-conversion storefront optimized for mobile checkout & high traffic',
      'Automated payment gateways (Paymob, Stripe, Fawry, Tabby) & shipping APIs',
      'Real-time inventory control, discount coupons, and automated order tracking',
      'Built-in sales analytics dashboard tracking top products & customer LTV'
    ],
    isPopular: false,
    ar: {
      name: 'التجارة الإلكترونية الذكية',
      badge: 'مبيعات أونلاين',
      headline:
        'متجر إلكتروني متكامل عالي الأداء مع ربط آلي لبوابات الدفع وشركات الشحن وإدارة لحظية للمخزون وتحليلات المبيعات.',
      frequency: 'يبدأ من / متجر',
      duration: '3–4 أسابيع',
      targetAudience: 'البراندات، تجار الجملة والتجزئة، والمصانع (D2C)',
      detailedDescription:
        'بناء متجر إلكتروني احترافي يتحمل آلاف الزيارات المتزامنة، مربوط تلقائياً ببوابات الدفع الإلكتروني (Paymob, Stripe, Fawry, Tamara/Tabby) وشركات الشحن مع إدارة ذكية للمخزون والكوبونات وتتبع الطلبات.',
      businessRoi:
        'يفتح لك سوقاً مفتوحاً بلا حدود جغرافية بدون إيجارات فروع أو زيادة في عدد الموظفين، ويرفع معدل إتمام الشراء (Conversion Rate) ويمنع خسائر نفاذ المخزون.',
      roiMetric: 'مبيعات بلا حدود جغرافية وتكلفة تشغيل أقل',
      deliverables: [
        'متجر فائق السرعة مصمم لرفع معدل الشراء وتجربة مثالية على الموبايل',
        'ربط آلي ببوابات الدفع الإلكتروني وشركات الشحن وحساب المصاريف تلقائياً',
        'إدارة لحظية للمخزون، الكوبونات، العروض، وتتبع حالة الطلبات',
        'لوحة تحليلات مبيعات لمعرفة المنتجات الأكثر ربحاً وسلوك العملاء'
      ]
    }
  },
  {
    id: 'pkg-local-server-systems',
    name: 'On-Premise Local Server Systems',
    badge: 'Offline & Secure',
    headline:
      'Zero-internet local server software for retail shops, schools, clinics, and factories requiring 100% data ownership and speed.',
    price: '$1,200',
    frequency: 'starting from / deployment',
    duration: '2–4 Weeks',
    targetAudience: 'Retail Stores, Schools, Clinics & Local Factories',
    detailedDescription:
      'Runs directly on your internal local server (Intranet) with instant response times and zero dependency on internet stability. Tailored modules for POS & Barcode inventory, School Management (students, fees, attendance), or Factory shop-floor operations—with optional cloud backup.',
    businessRoi:
      'Eliminates cash leakage, manual billing errors, and internet downtime. Gives owners 100% control over treasury, inventory, and staff permissions while keeping sensitive data strictly inside the premises.',
    roiMetric: '100% Data Ownership & Zero Leakage',
    deliverables: [
      'Internal local-server deployment (works 100% offline with instant speed)',
      'Retail/Factory POS, barcode scanning, live stock, and supplier/client ledgers',
      'School module option: students, attendance, installments, schedules & reports',
      'Multi-role permissions, automated daily backups, and optional cloud sync'
    ],
    isPopular: false,
    ar: {
      name: 'أنظمة السيرفر الداخلي (محلات • مدارس • مصانع)',
      badge: 'بدون إنترنت وأمان 100%',
      headline:
        'برامج تعمل على سيرفر داخلي داخل المنشأة بسرعة فائقة وملكية كاملة للبيانات بدون التأثر بانقطاع الإنترنت.',
      frequency: 'يبدأ من / نظام',
      duration: '2–4 أسابيع',
      targetAudience: 'المحلات التجارية، السوبر ماركت، المدارس، العيادات، والمصانع',
      detailedDescription:
        'نظام محلي متكامل يعمل على شبكتك الداخلية (Intranet)؛ للمحلات والمخازن يشمل الكاشير والباركود والجرد والحسابات، وللمدارس يشمل شؤون الطلاب والأقساط والحضور والنتائج، مع صلاحيات دقيقة ونسخ احتياطي تلقائي وإمكانية المزامنة أونلاين.',
      businessRoi:
        'يمنع التسريب المالي والأخطاء البشرية بالكامل، ويمنح صاحب العمل سيطرة تامة على الخزينة والمخزن والموظفين بضغطة زر مع حفظ 100% من البيانات داخل منشأتك.',
      roiMetric: 'سيطرة مالية كاملة ومنع التسريب 100%',
      deliverables: [
        'تشغيل كامل على سيرفر داخلي بسرعة فائقة دون الحاجة لاتصال دائم بالإنترنت',
        'للمحلات والمصانع: نقاط بيع POS، باركود، جرد لحظي، وحسابات عملاء وموردين',
        'للمدارس: شؤون طلاب، حضور وغياب، مصروفات وأقساط، وتقارير أولياء الأمور',
        'صلاحيات متعددة للموظفين، نسخ احتياطي يومي تلقائي، ومزامنة سحابية اختيارية'
      ]
    }
  },
  {
    id: 'pkg-qr-or-systems',
    name: 'Smart QR Tracking & Operations Research (OR)',
    badge: 'Waste Reduction',
    headline:
      'QR-driven asset/inventory tracking combined with mathematical Operations Research (OR) algorithms to optimize schedules and cut waste.',
    price: '$1,500',
    frequency: 'starting from / system',
    duration: '3 Weeks',
    targetAudience: 'Warehouses, Logistics, Production Lines & Multi-Shift Operations',
    detailedDescription:
      'Combines instant QR code traceability (tracking every item, slab, shipment, or maintenance log from intake to delivery) with Operations Research (OR) optimization models for shift scheduling, cutting-plan waste reduction, and optimal delivery routing.',
    businessRoi:
      'Cuts raw-material waste by 10%–25% and speeds up inventory audits by 10x compared to manual spreadsheets—translating directly into measurable monthly cash savings.',
    roiMetric: '10%–25% Raw Material Waste Reduction',
    deliverables: [
      'End-to-end QR code generation & mobile scanning for stock, assets, or orders',
      'Operations Research (OR) optimization for shift scheduling & cutting/trimming plans',
      'Route optimization & bottleneck minimization for logistics and fulfillment',
      'Real-time traceability audit trail with instant discrepancy alerts'
    ],
    isPopular: false,
    ar: {
      name: 'أنظمة الـ QR الذكية وبحوث العمليات (OR)',
      badge: 'تقليل الهالك والتتبع الفوري',
      headline:
        'تتبع دقيق للمنتجات والمخازن والشحنات بكود QR مدمج مع خوارزميات بحوث العمليات (OR) لتقليل الهالك وتحسين الجدولة.',
      frequency: 'يبدأ من / نظام',
      duration: '3 أسابيع',
      targetAudience: 'المخازن، خطوط الإنتاج، شركات الشحن، والمنشآت متعددة الورديات',
      detailedDescription:
        'نظام يمنح كل قطعة أو بلوك أو شحنة أو ماكينة كود QR فريد لتتبع حركتها من لحظة الدخول حتى التسليم، مدعوم بخوارزميات بحوث العمليات (Operations Research) لجدولة الورديات، تقليل الهالك في التقطيع والخامات، وتحديد أفضل مسارات التوزيع.',
      businessRoi:
        'يقلل الهالك في الخامات بنسبة 10% إلى 25% ويجعل الجرد والتتبع أسرع بـ 10 أضعاف من الطريقة اليدوية، مما يتحول مباشرة إلى وفر مالي ضخم شهرياً.',
      roiMetric: 'توفير 10%–25% من هالك الخامات شهرياً',
      deliverables: [
        'توليد ومسح أكواد QR من الموبايل لتتبع المخزون، الشحنات، والصيانة لحظياً',
        'خوارزميات بحوث العمليات (OR) لتقليل الهالك وجدولة خطوط الإنتاج والورديات',
        'تحسين مسارات التوزيع وتقليل زمن الانتظار والاختناقات التشغيلية',
        'سجل تتبع كامل (Audit Trail) وتنبيهات فورية لأي عجز أو تأخير'
      ]
    }
  },
  {
    id: 'pkg-data-bi-suite',
    name: 'Data Analytics & Executive Power BI Suite',
    badge: 'Decision Intelligence',
    headline:
      'Transform scattered Excel sheets and ERP databases into unified, interactive Power BI dashboards with real-time KPIs.',
    price: '$1,500',
    frequency: 'starting from / suite',
    duration: '2–3 Weeks',
    targetAudience: 'CEOs, CFOs & Mid-to-Large Enterprises',
    detailedDescription:
      'End-to-end data engineering and Business Intelligence: we clean, model, and connect your ERP, CRM, SQL, and Excel sources into a unified analytical warehouse powering executive Power BI dashboards for Sales, Profit, Inventory, HR, and Customer Churn.',
    businessRoi:
      'Shifts leadership from gut-feeling decisions to instant, data-backed clarity—immediately exposing where cash is leaking, which products drive real margin, and which customers are at risk of churning.',
    roiMetric: '100% Visibility Into Hidden Profit Leaks',
    deliverables: [
      'Data cleaning, ETL pipelines & star-schema modeling across ERP/SQL/Excel',
      'Interactive Power BI executive dashboards (Sales, Margins, Inventory, HR, Churn)',
      'Automated scheduled refreshes and threshold alerts for KPI drops',
      'Executive training & full documentation for your management team'
    ],
    isPopular: false,
    ar: {
      name: 'تحليل البيانات ولوحات Power BI التنفيذية',
      badge: 'ذكاء الأعمال والقرارات',
      headline:
        'تحويل ملفات الإكسل وقواعد البيانات المتفرقة إلى لوحات تحكم تفاعلية (Power BI) تكشف الأرباح والخسائر لحظياً.',
      frequency: 'يبدأ من / منظومة',
      duration: '2–3 أسابيع',
      targetAudience: 'الإدارة العليا، المديرين الماليين، والشركات المتوسطة والكبرى',
      detailedDescription:
        'تنظيف وربط جميع مصادر بياناتك (Excel, ERP, SQL, CRM) في نموذج بيانات موحد وبناء لوحات تحكم احترافية على Power BI لمتابعة المبيعات، هوامش الربح، المخزون، الموارد البشرية، وتحليل تسرب العملاء.',
      businessRoi:
        'ينقل الإدارة من القرارات المبنية على التخمين إلى قرارات دقيقة مبنية على الأرقام في ثوانٍ، ويكشف فوراً أين تنزف الشركة أموالها وأين توجد فرص الربح المخفية.',
      roiMetric: 'كشف فوري لنزيف التكاليف وفرص الربح',
      deliverables: [
        'تنظيف وربط البيانات المتفرقة وبناء نموذج بيانات موحد (Data Modeling)',
        'لوحات Power BI تفاعلية للمبيعات، الأرباح، المخزون، HR، وتسرب العملاء',
        'تحديث تلقائي مجدول للبيانات وتنبيهات عند انخفاض مؤشرات الأداء KPIs',
        'تدريب الإدارة العليا وتسليم كامل التوثيق الفني للنظام'
      ]
    }
  },
  {
    id: 'pkg-ai-operational-excellence',
    name: 'Operational Excellence, Big Data & AI Automation',
    badge: 'High ROI • Popular',
    headline:
      'Eliminate repetitive manual work with autonomous AI Agents, n8n workflows, and Big Data predictive models that cut operating costs.',
    price: '$2,500',
    frequency: 'starting from / system',
    duration: '3–4 Weeks',
    targetAudience: 'Growth-Focused Companies & High-Volume Operations',
    detailedDescription:
      'We audit your operational bottlenecks and deploy autonomous AI Agents (RAG company brains, customer support, lead generation) + self-hosted n8n automations + Big Data predictive analytics to forecast demand, sales, and failures before they happen.',
    businessRoi:
      'Saves hundreds of staff hours every month, reduces operational overhead by up to 40%, and lets your company double its transaction volume without doubling headcount.',
    roiMetric: 'Up to 40% Operational Cost Reduction',
    deliverables: [
      'Full workflow audit & bottleneck elimination blueprint',
      'Autonomous AI Agents (WhatsApp/Web support, RAG knowledge base, lead gen)',
      'Self-hosted n8n automation pipelines connecting CRM, ERP, Sheets & APIs',
      'Big Data processing & ML predictive models for demand, churn, and forecasting'
    ],
    isPopular: true,
    ar: {
      name: 'رفع الكفاءة التشغيلية والبيانات الضخمة وأتمتة AI',
      badge: 'الأعلى عائداً • الأكثر طلباً',
      headline:
        'أتمتة العمليات الروتينية بوكلاء الذكاء الاصطناعي (AI Agents) و n8n وتحليل البيانات الضخمة لخفض التكلفة التشغيلية.',
      frequency: 'يبدأ من / منظومة',
      duration: '3–4 أسابيع',
      targetAudience: 'الشركات الساعية للتوسع السريع وتقليل الهدر التشغيلي',
      detailedDescription:
        'تحليل شامل لدورة العمل واكتشاف نقاط الاختناق، ثم بناء وكلاء ذكاء اصطناعي (لخدمة العملاء، المبيعات، وقاعدة المعرفة الداخلية RAG) وأنظمة أتمتة n8n ونماذج تنبؤية للبيانات الضخمة لتوقع الطلب والمبيعات قبل حدوثها.',
      businessRoi:
        'يوفر مئات ساعات العمل شهرياً، يقلل التكاليف التشغيلية بنسبة تصل إلى 40%، ويجعل شركتك قادرة على مضاعفة حجم المبيعات والعمليات بدون مضاعفة عدد الموظفين.',
      roiMetric: 'خفض التكاليف التشغيلية حتى 40%',
      deliverables: [
        'تحليل شامل لدورة العمل (Workflow Audit) وخطة إزالة الاختناقات',
        'بناء وكلاء ذكاء اصطناعي (AI Agents & RAG) للمبيعات وخدمة العملاء والبحث الداخلي',
        'أتمتة كاملة بـ n8n تربط WhatsApp و CRM و Google Sheets و ERP تلقائياً',
        'معالجة البيانات الضخمة ونماذج تنبؤية (ML) لتوقع الطلب والأعطال'
      ]
    }
  },
  {
    id: 'pkg-custom-erp-core',
    name: 'Custom Cloud / Hybrid ERP System',
    badge: 'Enterprise Core',
    headline:
      'Tailor-made ERP connecting Procurement, Inventory, Sales, Finance, HR, and Production—with zero per-user subscription traps.',
    price: '$4,500',
    frequency: 'starting from / milestone',
    duration: '4–8 Weeks',
    targetAudience: 'Mid-to-Large Companies, Distributors & Manufacturing Plants',
    detailedDescription:
      'A complete ERP engineered around your exact business workflow—available on the Cloud or Hybrid Local Server. Unifies Purchasing, Warehousing, Sales, Accounting & Costing, HR/Payroll, and Production Orders in one secure system accessible from desktop and mobile.',
    businessRoi:
      'Eliminates disconnected spreadsheets and accounting errors, stops revenue leakage across departments, and saves tens of thousands in recurring per-seat SaaS ERP licensing fees.',
    roiMetric: '360° Control & Zero Per-User License Fees',
    deliverables: [
      'Custom ERP modules: Inventory, Purchasing, Sales, Accounting, HR & Production',
      'Flexible deployment: Cloud (Online) or Hybrid Local Server with mobile access',
      'Real-time P&L, cash flow, and per-order cost tracking ledgers',
      'Role-based access control, full audit logs, and 30-day post-launch SLA'
    ],
    isPopular: false,
    ar: {
      name: 'نظام ERP متكامل للشركات والمصانع',
      badge: 'النظام المؤسسي الشامل',
      headline:
        'نظام ERP مفصّل على مقاس شركتك يربط المشتريات والمخازن والمبيعات والحسابات و HR والإنتاج بدون اشتراكات شهرية لكل موظف.',
      frequency: 'يبدأ من / مرحلة',
      duration: '4–8 أسابيع',
      targetAudience: 'الشركات المتوسطة والكبرى، شركات التوزيع، والمصانع',
      detailedDescription:
        'بناء نظام ERP متكامل يناسب دورتك المستندية بدقة، يعمل أونلاين (Cloud) أو بسيرفر داخلي (Hybrid) مع واجهة متابعة للمديرين من الموبايل. يربط جميع الإدارات في قاعدة بيانات واحدة لحظية.',
      businessRoi:
        'يقضي نهائياً على الجزر المنعزلة والأخطاء المحاسبية والتلاعب، ويوفر آلاف الدولارات سنوياً كانت تُدفع كاشتراكات متكررة لأنظمة ERP جاهزة، ويمنحك رؤية 360 درجة لبيزنيسك من أي مكان.',
      roiMetric: 'سيطرة 360° بدون اشتراكات شهرية لكل مستخدم',
      deliverables: [
        'وحدات ERP مخصصة: المخازن، المشتريات، المبيعات، الحسابات، HR، والإنتاج',
        'تشغيل مرن أونلاين (Cloud) أو سيرفر داخلي (Hybrid) مع متابعة من الموبايل',
        'تقارير أرباح وخسائر لحظية، تدفقات نقدية، وتكلفة كل أمر تشغيل',
        'صلاحيات دقيقة وسجل تدقيق كامل (Audit Trail) وضمان 30 يوماً بعد الإطلاق'
      ]
    }
  },
  {
    id: 'pkg-industrial-erp-plc',
    name: 'Industrial ERP & PLC Machine Telemetry (Flagship)',
    badge: 'Heavy Industry • PLC',
    headline:
      'Specialized heavy-industry ERP directly connected to PLC machines & factory sensors for live OEE, downtime tracking, and real-time unit costing.',
    price: '$10,000',
    frequency: 'starting from / plant',
    duration: '6–12 Weeks',
    targetAudience: 'Heavy Industries & PLC-Driven Factories (Marble, Textile, Plastics, Metals, Food)',
    detailedDescription:
      'Engineered for specialized manufacturing (proven by WireCut OS). Connects directly to your PLC machines and industrial sensors to capture real-time machine utilization, categorized downtime, power & consumable wear, and calculates the exact cost per meter/ton/unit tied to every customer order.',
    businessRoi:
      'Pays for itself within months: cutting unplanned machine downtime by just 10%, exposing energy & consumable waste, and pricing orders on true real-time cost instead of estimates saves factories hundreds of thousands annually.',
    roiMetric: 'Pays for Itself in Months via Downtime & Cost Control',
    deliverables: [
      'Direct PLC & industrial sensor telemetry integration (multi-channel live feed)',
      'Real-time Unit Costing Engine (energy, consumables, labor & waste per order)',
      'Live OEE monitoring, categorized downtime tracking & shift performance analytics',
      'Hybrid factory-server + secure executive cloud dashboard with predictive alerts'
    ],
    isPopular: true,
    ar: {
      name: 'ERP الصناعات المتخصصة وربط ماكينات الـ PLC',
      badge: 'باقة النخبة • المصانع الكبرى',
      headline:
        'نظام ERP صناعي متخصص متصل مباشرة بماكينات الـ PLC وحساسات المصنع لمراقبة التشغيل وحساب التكلفة الحقيقية لحظياً.',
      frequency: 'يبدأ من / مصنع',
      duration: '6–12 أسبوع',
      targetAudience: 'المصانع الكبرى والصناعات الثقيلة (الرخام، النسيج، البلاستيك، المعادن، الأغذية)',
      detailedDescription:
        'منظومة صناعية متقدمة (مثل WireCut OS) تربط مباشرة مع ماكينات الـ PLC لقراءة ساعات التشغيل الفعلية، أسباب التوقف (Downtime)، استهلاك الكهرباء والخامات، ومحرك حساب تكلفة لحظي يحسب تكلفة كل متر/طن/قطعة ويربطها بأمر العميل.',
      businessRoi:
        'هذه الباقة تدفع ثمنها بنفسها خلال أشهر قليلة! لأن تقليل توقف الماكينات غير المخطط بنسبة 10% فقط، وكشف هدر الطاقة والخامات، والتسعير بناءً على التكلفة الفعلية يوفّر للمصنع مئات الآلاف سنوياً.',
      roiMetric: 'تغطي تكلفتها خلال أشهر عبر تقليل التوقف والهدر',
      deliverables: [
        'ربط مباشر مع ماكينات الـ PLC وحساسات المصنع (قراءة لحظية متعددة القنوات)',
        'محرك حساب التكلفة الحقيقية لحظياً (كهرباء، مستهلكات، هالك، وعمالة لكل أمر)',
        'مراقبة كفاءة المعدات الكلية (OEE)، تتبع أسباب التوقف، وأداء الورديات',
        'تشغيل هجين (سيرفر المصنع + لوحة سحابية لمجلس الإدارة) وتنبيهات صيانة تنبؤية'
      ]
    }
  }
];

export const PACKAGE_ENRICHMENT_MAP: Record<string, PricingPackage> = Object.fromEntries(
  initialPackages.map((pkg) => [pkg.id, pkg])
);

const PACKAGE_BY_NAME_MAP: Record<string, PricingPackage> = Object.fromEntries(
  initialPackages.map((pkg) => [pkg.name.trim().toLowerCase(), pkg])
);

const FREQUENCY_AR_MAP: Record<string, string> = {
  'starting from / project': 'يبدأ من / مشروع',
  'starting from / store': 'يبدأ من / متجر',
  'starting from / deployment': 'يبدأ من / نظام',
  'starting from / system': 'يبدأ من / منظومة',
  'starting from / suite': 'يبدأ من / منظومة',
  'starting from / milestone': 'يبدأ من / مرحلة',
  'starting from / plant': 'يبدأ من / مصنع',
  'per sprint': 'لكل مرحلة تنفيذية',
  'per project': 'لكل مشروع',
  'per month': 'شهرياً',
  '/ month': '/ شهرياً',
};

export function localizePackage(rawPkg: PricingPackage, isAr: boolean): PricingPackage {
  const enriched =
    PACKAGE_ENRICHMENT_MAP[rawPkg.id] ||
    PACKAGE_BY_NAME_MAP[rawPkg.name?.trim().toLowerCase() || ''];
  const merged: PricingPackage = enriched
    ? { ...enriched, ...rawPkg, ar: rawPkg.ar || enriched.ar }
    : rawPkg;
  if (!isAr) return merged;
  if (merged.ar) {
    return {
      ...merged,
      name: merged.ar.name,
      badge: merged.ar.badge,
      headline: merged.ar.headline,
      frequency: merged.ar.frequency,
      duration: merged.ar.duration,
      targetAudience: merged.ar.targetAudience,
      detailedDescription: merged.ar.detailedDescription,
      businessRoi: merged.ar.businessRoi,
      roiMetric: merged.ar.roiMetric,
      deliverables: merged.ar.deliverables,
    };
  }
  const freqKey = merged.frequency?.trim().toLowerCase() || '';
  return {
    ...merged,
    frequency: FREQUENCY_AR_MAP[freqKey] || merged.frequency,
  };
}

export const initialConsultationRates: ConsultationRates = {
  hourlyRate: '$150',
  session30Min: '$90',
  session60Min: '$150',
  availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
  availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM', '07:00 PM'],
  availableTimezones: ['Cairo EET (UTC+2)', 'London GMT (UTC+0)', 'New York EST (UTC-5)', 'Dubai GST (UTC+4)']
};
