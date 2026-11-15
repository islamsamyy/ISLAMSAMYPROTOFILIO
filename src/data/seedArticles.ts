export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  title_ar?: string;
  category: 'Architecture' | 'Data Engineering' | 'Machine Learning' | 'Performance';
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  excerpt_ar?: string;
  content: string;
  content_ar?: string;
  tags: string[];
  featured: boolean;
}

export const initialArticles: ArticleItem[] = [
  {
    id: 'art-custom-erp-lakehouse-opera',
    slug: 'zero-downtime-lakehouse-opera-pms',
    title: 'Building a Zero-Downtime Real-Time Lakehouse & Custom ERP Connectors for Hospitality Enterprises',
    title_ar: 'بناء مستودع بيانات لحظي بدون توقف وموصلات ERP مخصصة لمؤسسات الضيافة والفنادق',
    category: 'Data Engineering',
    readTime: '8 min read',
    date: 'Nov 2024',
    author: 'Islam Samy',
    excerpt: 'How we captured Change Data Capture streams from legacy Oracle/OPERA PMS systems into ClickHouse with sub-250ms latency across 14 hotel chains.',
    excerpt_ar: 'كيف قمنا بالتقاط تدفقات تغيير البيانات (CDC) من أنظمة Oracle/OPERA PMS القديمة إلى ClickHouse بزمن استجابة أقل من 250 مللي ثانية عبر 14 سلسلة فندقية.',
    content: `### The Challenge: Legacy Transactional Silos & ERP Lockouts
Hospitality enterprises operating on OPERA PMS often suffer from fragmented databases that lock away critical reservation and financial metrics. Querying production transaction tables for executive reports frequently leads to database lockouts and degraded check-in speeds.

### The Architecture: CDC + Kafka + ClickHouse Lakehouse
To bypass reporting locks entirely, we engineered a non-invasive Change Data Capture (CDC) pipeline:
1. **Debezium Connectors** monitor Oracle redo logs asynchronously without database overhead.
2. **Kafka Brokers** buffer transaction events into partitioned topics keyed by Property ID.
3. **ClickHouse Consumer Services** ingest micro-batches with high-density columnar compression.

\`\`\`sql
-- ClickHouse MergeTree Table for High-Concurrency RevPAR Queries
CREATE TABLE hotel_analytics.reservations_stream (
    property_id UInt32,
    booking_id String,
    check_in_date Date,
    check_out_date Date,
    adr_amount Decimal(10, 2),
    status LowCardinality(String),
    event_timestamp DateTime
) ENGINE = ReplacingMergeTree(event_timestamp)
ORDER BY (property_id, check_in_date, booking_id);
\`\`\`

### Production Results
- **Zero lockups:** Operational PMS load reduced by 78%.
- **Sub-second dashboards:** Financial rollups execute in under 180ms across 12M historical rows.
- **Immediate ROI:** Automated ADR yield recommendations captured an estimated 6.2% revenue lift.`,
    content_ar: `### التحدي الهندسي: عزل البيانات القديمة وتوقف قواعد بيانات ERP
تعاني مؤسسات الضيافة والفنادق التي تعمل بنظام OPERA PMS من قواعد بيانات مجزأة تحجب المؤشرات المالية الحيوية وحجوزات النزلاء. وغالباً ما يؤدي الاستعلام المباشر من جداول المعاملات الحية لإنشاء التقارير التنفيذية إلى إقفال قاعدة البيانات (Lockouts) وبطء إجراءات تسجيل الدخول للنزلاء.

### المعمارية المنفذة: تدفق CDC + وسطاء Kafka + مستودع ClickHouse
لتجاوز أقفال التقارير تماماً، قمنا بهندسة خط معالجة غير تدخلي لالتقاط تغييرات البيانات (CDC):
1. **موصلات Debezium:** مراقبة سجلات Oracle Redo بشكل غير متزامن دون أي حمل إضافي على قاعدة البيانات.
2. **وسطاء Kafka:** تخزين ومعالجة أحداث المعاملات في موضوعات مقسمة حسب معرف الفندق (Property ID).
3. **خدمات استهلاك ClickHouse:** استيعاب دفعات دقيقة بضغط عمودي فائق الكثافة.

\`\`\`sql
-- ClickHouse MergeTree Table for High-Concurrency RevPAR Queries
CREATE TABLE hotel_analytics.reservations_stream (
    property_id UInt32,
    booking_id String,
    check_in_date Date,
    check_out_date Date,
    adr_amount Decimal(10, 2),
    status LowCardinality(String),
    event_timestamp DateTime
) ENGINE = ReplacingMergeTree(event_timestamp)
ORDER BY (property_id, check_in_date, booking_id);
\`\`\`

### النتائج في بيئة الإنتاج الحية
- **انعدام أقفال النظام تماماً:** انخفض الحمل التشغيلي على نظام PMS بنسبة 78%.
- **لوحات قيادة لحظية فائقة السرعة:** تنفيذ التجميعات المالية في أقل من 180 مللي ثانية عبر 12 مليون سجل تاريخي.
- **عائد استثماري فوري:** توصيات آلية لمعدل السعر اليومي (ADR) حققت زيادة تقديرية في الإيرادات بنسبة 6.2%.`,
    tags: ['Custom ERP', 'Kafka', 'ClickHouse', 'OPERA PMS', 'CDC', 'Data Engineering'],
    featured: true
  },
  {
    id: 'art-autonomous-ai-agents-automation',
    slug: 'autonomous-ai-agents-workflow-automation',
    title: 'Architecting Autonomous Multi-Agent AI Systems for Enterprise Workflow Automation',
    title_ar: 'هندسة أنظمة وكلاء الذكاء الاصطناعي المستقلة لأتمتة مسارات العمل المؤسسية',
    category: 'Machine Learning',
    readTime: '7 min read',
    date: 'Oct 2024',
    author: 'Islam Samy',
    excerpt: 'How to combine CrewAI, LangChain, and self-hosted n8n webhooks to build production-grade autonomous agent networks that eliminate 60% of manual operational overhead.',
    excerpt_ar: 'كيفية الجمع بين CrewAI وLangChain وتكاملات n8n المدارة ذاتياً لبناء شبكات وكلاء مستقلة تلغي 60% من الهدر التشغيلي اليدوي.',
    content: `### Beyond Chatbots: Autonomous Agent Systems in Production
Most enterprises struggle with single-prompt LLM scripts that hallucinate or fail silently on multi-step workflows. True operational ROI requires autonomous agent graphs with strict task specialization, memory checkpoints, and deterministic fallback loops.

### The 4-Tier Agent Architecture
1. **Triage & Classification Agent:** Evaluates inbound payloads (invoices, emails, webhooks) and maps them to deterministic intent classes.
2. **Context Retrieval Agent (RAG):** Queries an in-memory Redis vector store for enterprise operational policies and business constraints.
3. **Execution Agent:** Interacts with self-hosted n8n APIs to mutate database states and dispatch transactions.
4. **Validation & Audit Agent:** Verifies output schema integrity, computes cryptographic hashes, and notifies stakeholders via Slack.

### Production Results
- **60% Cost Reduction:** Automated over 120,000 monthly operational events without adding administrative headcount.
- **Sub-450ms Routing:** Average agent dispatch latency kept under half a second.
- **Zero Hallucination Leaks:** Multi-agent peer validation reduced data mutation errors to near zero.`,
    content_ar: `### ما وراء روبوتات الدردشة: أنظمة الوكلاء المستقلة في بيئة الإنتاج
تواجه معظم المؤسسات صعوبة مع سكربتات LLM البسيطة التي تهلوس أو تفشل بصمت في مسارات العمل متعددة المراحل. إن تحقيق العائد الاستثماري الحقيقي يتطلب شبكات وكلاء مستقلة ذات تخصص مهام صارم، ونقاط حفظ للذاكرة، وحلقات تصحيح حتمية.

### المعمارية الرباعية للوكلاء
1. **وكيل الفرز والتصنيف:** تقييم البيانات الواردة (الفواتير، رسائل البريد، الويب هوك) ومطابقتها مع نوايا محددة.
2. **وكيل استرجاع السياق (RAG):** الاستعلام من قاعدة متجهات Redis للسياسات التشغيلية للمؤسسة.
3. **وكيل التنفيذ:** التفاعل مع واجهات n8n لتعديل حالات قواعد البيانات وإرسال المعاملات.
4. **وكيل التدقيق والتحقق:** التحقق من سلامة المخرجات، وحساب التوقيع التشفيري، وإشعار المعنيين فوراً.

### النتائج في بيئة الإنتاج الحية
- **خفض التكاليف بنسبة 60%:** أتمتة أكثر من 120,000 عملية تشغيلية شهرية دون الحاجة لزيادة الكادر الإداري.
- **توجيه في أقل من 450 مللي ثانية:** استجابة وسرعة فائقة للوكلاء في توجيه المهام.
- **انعدام أخطاء الهلوسة:** خفض أخطاء تعديل البيانات إلى الصفر تقريباً بفضل المراجعة التبادلية بين الوكلاء.`,
    tags: ['AI Agents', 'CrewAI', 'LangChain', 'n8n', 'Python', 'Workflow Automation'],
    featured: true
  },
  {
    id: 'art-manufacturing-erp-architecture',
    slug: 'custom-manufacturing-erp-architecture',
    title: 'Designing Custom Manufacturing ERP Systems: From Paper Manifests to Sub-Second Telemetry',
    title_ar: 'تصميم أنظمة ERP مخصصة للصناعة: من السجلات الورقية إلى القياسات اللحظية',
    category: 'Architecture',
    readTime: '9 min read',
    date: 'Sep 2024',
    author: 'Islam Samy',
    excerpt: 'Key lessons learned designing a tailored Next.js and PostgreSQL manufacturing ERP: Bill of Materials modeling, shop-floor barcode telemetry, and real-time scrap reduction.',
    excerpt_ar: 'أهم الدروس المستفادة من تصميم نظام ERP صناعي مخصص باستخدام Next.js وPostgreSQL: نمذجة قوائم المواد BOM، وقراءات الباركود اللحظية، وخفض الهدر الصناعي.',
    content: `### Why Generic Off-The-Shelf ERPs Fail Industrial Plants
Commercial ERP behemoths often cost hundreds of thousands of dollars, demand painful multi-year implementations, and force unique factory shop floors into rigid generic molds. A tailored modular ERP solves this by mirroring exact physical manufacturing stages.

### Core Architectural Pillars
1. **Multi-Stage BOM Relational Schema:** Modeling yarn, weaving, and dye stages with dynamic loss coefficients in PostgreSQL.
2. **Low-Latency Shop-Floor UI:** Next.js 15 App Router delivering lightning-fast touch interfaces on ruggedized industrial tablets.
3. **Automated Barcode & n8n Reorder Daemons:** Immediate atomic decrements prevent inventory reconciliation discrepancies before shifts end.
4. **Live Executive Cockpits:** Real-time Power BI scorecards translating plant-floor telemetry into immediate executive profit metrics.

### Production Results
- **75% Reconciliation Discrepancy Reduction:** Physical inventory audits matched digital ledgers within 0.6% tolerance.
- **$18,500 Annual Savings:** Stopped emergency material orders and undiscovered scrap loss.`,
    content_ar: `### لماذا تفشل أنظمة ERP التجارية الجاهزة في المنشآت الصناعية
تكلف أنظمة ERP التجارية العملاقة مئات الآلاف من الدولارات وتتطلب سنوات من التطبيق المعقد، وتجبر صالات الإنتاج الصناعية الفريدة على قوالب جامدة لا تناسبها. نظام الـ ERP المعياري المخصص يحل هذه المعضلة عبر محاكاة مراحل التصنيع الواقعية بدقة.

### الركائز المعمارية الأساسية
1. **مخطط علائقي متعدد المراحل لقوائم المواد (BOM):** نمذجة مراحل الغزل والنسيج والصباغة مع معاملات الفاقد الديناميكية في PostgreSQL.
2. **واجهة استخدام فائقة السرعة لصالة المصنع:** Next.js 15 App Router يقدم واجهات لمس فورية للأجهزة اللوحية الصناعية.
3. **أتمتة الباركود ومهام إعادة الطلب عبر n8n:** خصم ذري فوري يمنع فروقات الجرد قبل انتهاء ورديات العمل.
4. **لوحات قيادة تنفيذية حية:** تقارير Power BI فورية تترجم قياسات خط الإنتاج إلى أرقام أرباح مباشرة لصناع القرار.

### النتائج في بيئة الإنتاج الحية
- **خفض فروقات الجرد بنسبة 75%:** تطابقت عمليات الجرد الفعلي مع الدفاتر الرقمية بنسبة خطأ أقل من 0.6%.
- **توفير سنوي قدره 18,500 دولار:** إيقاف طلبات المواد الطارئة واكتشاف الهدر غير المسجل.`,
    tags: ['Custom ERP', 'PostgreSQL', 'Next.js 15', 'Full-Stack Web', 'Manufacturing', 'BI'],
    featured: true
  }
];
