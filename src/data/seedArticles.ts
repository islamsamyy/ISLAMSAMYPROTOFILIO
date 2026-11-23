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
    id: 'art-wirecut-os-operations-research',
    slug: 'wirecut-os-marble-granite-erp-operations-research',
    title: 'WireCut OS: Operations Research, 28-Channel PLC Telemetry & Costing ERP for Marble & Granite Factories',
    title_ar: 'نظام WireCut OS: بحوث العمليات وبيانات الـ PLC لإدارة وتحسين أداء مصانع الرخام والجرانيت',
    category: 'Architecture',
    readTime: '10 min read',
    date: 'Nov 2026',
    author: 'Islam Samy',
    excerpt: 'How WireCut OS combines MES, a 28-channel PLC Telemetry Historian, and Operations Research modeling to cut diamond wire waste by 15%, recover lost uptime, and deliver 8–20x ROI.',
    excerpt_ar: 'عرض فني ومالي متكامل لنظام WireCut OS المصمم لمناشير السلك الماسي متعدد الأسلاك: تطبيق بحوث العمليات، مراقبة 28 قناة حساس PLC، ضبط التكاليف، وتحقيق عائد استثماري يتراوح بين 8 إلى 20 ضعفاً.',
    content: `## 1. Executive Summary: Why WireCut OS Instead of Generic Accounting or Dashboards?
Most marble and granite factories rely on paper shift logs or fragmented Excel sheets that record what happened "after the fact"—leading to eroded profit margins through diamond wire waste, silent machine micro-stops, catastrophic breakdowns, and mispriced stone types.

**WireCut OS** is an integrated industrial operations and analytics platform (**MES + PLC Telemetry Historian + Costing ERP**) engineered specifically for **Multi-Wire Diamond Saws**. Built on **Operations Research (OR)** methodologies, it transforms raw machine and operator telemetry into real-time operational and financial decisions that reduce variable costs and expand effective plant throughput.

---

## 2. Scientific Foundation: How WireCut OS Applies Operations Research (OR)

Operations Research applies **mathematical modeling and operational data analytics** to achieve optimal utilization of constrained factory resources (machine hours, diamond wire, electrical power, and skilled labor). WireCut OS operationalizes OR across 4 core pillars:

1. **Time-Motion & Bottleneck Decomposition:**
   - Rather than just tracking block start and end times, WireCut OS decomposes total \`Elapsed Time\` from PLC sensor streams into:
   - **Active Cutting Minutes** vs. **Retraction Minutes**
   - **In-Operation Stops** pinpointing the exact cutting depth (\`mm\`) at the moment of stoppage
   - **Downtime Gaps** automatically calculated between the end of one block and the start of the next
   - Computes **Active Cutting Efficiency %** and **Mean Time Between Stops (MTBS)** to isolate the #1 production bottleneck.

2. **Plan vs. Actual & Recipe Adherence Modeling:**
   - Ingests the PLC's programmed cutting plan (\`Planned Time\`, \`Max Slices\`, \`Planned Wire Cost\`, \`12-Slot Step Recipe\`) and compares it live against execution to calculate **Adherence %**, immediately flagging **Cutting Direction Changes** (\`A1→A2\` / \`A2→A1\`) or **Loop Mismatches**.

3. **Unit-Economics & Resource Optimization:**
   - Links geometric production formulas (\`L × W × H × 52 = Area m²\`) with diamond wire consumption (\`m/m²\`), energy intensity (\`kWh/m²\`), stone hardness coefficients, and labor overhead to compute the **true cost per m² and per slab** for every block and stone variety—preventing loss-making pricing and optimizing **Order Allocations**.

4. **Reliability & Preventive Maintenance Modeling:**
   - Time-series analysis across **28 PLC sensor channels** (motor temperatures \`°C\`, torque \`%\`, wire tension \`A1/A2 N\`, feed rate, and wire speed) paired with **Alert Rules** and **Roller Grooves 1..6** wear tracking to intervene before catastrophic failures.

---

## 3. End-to-End Plant Modules & Capabilities

### Production Monitoring & Paper-to-Machine Reconciliation
- **Multi-Source Ingestion:** Direct parsing of native PLC \`log.CSV\` files alongside operator Excel/CSV sheets (with automatic Arabic numeral \`٠-٩\` normalization and \`mm / cm / m\` unit conversion).
- **Telemetry Zoom Chart:** 60-second granularity interactive curve from block start to finish.
- **Block Ownership Separation:** Clean separation between factory-owned blocks and third-party contract cutting (\`Block Owner\`).
- **Live Jobs:** Real-time visibility across every active multi-wire saw from a single command deck.

### Diamond Wire & Roller Management (Largest Variable Cost)
- Tracks lifecycle performance across **First Use** and **Second Use** spools.
- Measures true wear rate (\`m/m²\`) and benchmarks diamond wire suppliers with objective telemetry instead of guesswork.
- Tracks cut surface area and job counts across **Roller Grooves 1..6** to ensure straight cuts and prevent premature wire snaps.

### Mechanical Health, Downtime & Energy Analytics
- **Machine Health:** Captures motor temperature and torque peaks to surface early overload anomalies.
- **Downtime & Stops Classification:** Categorizes stops (wire snap/weld, tension check, water/cooling, power outage, machine setup, operator inspection).
- **Energy Analytics:** Meter readings before/after every cut compute \`kWh/m²\` and electricity cost per stone type.

### Factory ERP, Governance & RBAC
- **Costing Engine:** Combines wire + energy + labor + overhead per job against expected selling price to reveal net block margin.
- **Inventory, Orders, Quality & Maintenance:** Storage locations, consumables ledger, customer order allocations, slab/table/roller quality checks, and hour-based preventive maintenance.
- **Data Quality, Immutable Raw Logs Archive & 5-Tier RBAC:** Automated anomaly scoring (\`%\`), non-deletable raw log archive, full before/after **Audit Log**, and **11 one-click CSV export suites**.

---

## 4. ROI & Compounding Value Over Time

Assuming a single multi-wire diamond saw operating 22 days/month at **1,500 – 2,500 m²/month**:
- **8% – 15% Diamond Wire Savings:** Optimizing feed rate, tension, and supplier selection saves **15,000 – 35,000 EGP/month** in Egypt (**$500 – $1,200/month** in GCC).
- **10% – 15% Lost Uptime Recovery:** Cutting wait gaps and micro-stops adds **150 – 300 m²/month** of extra output with zero added rent or fixed payroll (**25,000 – 60,000 EGP/month** in Egypt, **$1,200 – $2,800/month** in GCC).
- **Catastrophic Failure Prevention:** Early motor torque/thermal or roller groove alerts prevent single-incident losses of **50,000 – 200,000 EGP**.

> **Bottom Line:** WireCut OS pays for its monthly subscription by optimizing just **1 to 2 blocks per month**, delivering **8x to 20x ROI** that compounds across Visibility (Month 1), Calibration (Months 2–3), Optimization (Months 4–6), and Institutional Memory (Month 6+).

---

## 5. Implementation Roadmap (3–4 Weeks)
1. **Week 1 (Analysis & Integration):** Ingest sample PLC/Excel logs, configure stone hardness & cost parameters, and provision 5-tier RBAC accounts.
2. **Week 2 (Launch & Training):** Backfill historical baseline data and train operators, accountants, and plant managers.
3. **Weeks 3–4 (Operational Review):** Deliver the first bottleneck, downtime gap, and true stone-costing report to capture immediate savings.

> **Free 48-Hour Diagnostic Offer:** Send the last 15 days of machine logs and receive a complimentary diagnostic report detailing lost downtime hours, active cutting efficiency %, and wire consumption variance before committing.`,
    content_ar: `## 1. المقدمة التنفيذية: لماذا WireCut OS وليس مجرد برنامج حسابات أو داشبورد؟
أغلب المصانع تعتمد على تقارير ورقية أو ملفات إكسيل متفرقة تسجل ما حدث "بعد فوات الأوان"، مما يؤدي إلى تآكل هامش الربح في هدر السلك الماسي، والتوقفات الصامتة، والأعطال المفاجئة، وتسعير خاطئ لبعض أنواع الحجر.

**WireCut OS** هو منصة تشغيل وتحليل إنتاج (**MES + PLC Telemetry Historian + Costing ERP**) مصممة خصيصاً لـ **مناشير السلك الماسي متعدد الأسلاك (Multi-Wire Diamond Saws)**، ومبنية على منهجية **بحوث العمليات (Operations Research — OR)** لتحويل بيانات الماكينة والمشغلين إلى قرارات تشغيلية ومالية تقلل التكلفة وترفع الطاقة الإنتاجية الفعلية للمصنع.

---

## 2. القوة العلمية للنظام: كيف يطبق WireCut OS بحوث العمليات (Operations Research)؟

بحوث العمليات تعني استخدام **النمذجة الرياضية وتحليل البيانات التشغيلية** للوصول إلى أفضل استغلال للموارد المحدودة (وقت الماكينة، السلك الماسي، الكهرباء، والعمالة). يطبق النظام هذا المفهوم عملياً في 4 محاور داخل المصنع:

1. **تفكيك الزمن وكشف الاختناقات (\`Time-Motion & Bottleneck Decomposition\`):**
   - النظام لا يكتفي بمعرفة "متى بدأ البلوك ومتى انتهى"، بل يفكك الزمن الكلي للعملية (\`Elapsed Time\`) من بيانات حساسات الـ PLC إلى:
   - **زمن القطع الفعلي (\`Active Cutting Minutes\`)**
   - **زمن السحب والرجوع (\`Retraction Minutes\`)**
   - **التوقفات الدقيقة داخل العملية (\`In-Operation Stops\`)** مع تحديد عمق القطع (\`mm\`) لحظة التوقف.
   - **فجوات التوقف بين البلوكات (\`Downtime Gaps\`)** المحسوبة تلقائياً بين نهاية عملية وبداية التالية.
   - من خلال ذلك يحسب النظام **كفاءة القطع الفعلي (\`Active Cutting Efficiency %\`)** و**متوسط الوقت بين التوقفات (\`MTBS\`)** لتوجيه الإدارة نحو أكبر عنق زجاجة يلتهم ساعات الإنتاج.

2. **النمذجة المقارنة بين الخطة والواقع (\`Plan vs. Actual & Recipe Adherence\`):**
   - يقرأ النظام خطة الماكينة المبرمجة داخل الـ PLC (\`Planned Time\`, \`Max Slices\`, \`Planned Wire Cost\`, \`12-Slot Step Recipe\`) ويقارنها لحظياً بالتنفيذ الفعلي، ليحسب **نسبة الالتزام بالريسيبي (\`Adherence %\`)**، ويكشف فوراً أي **تغيير في اتجاه القطع (\`A1→A2\` / \`A2→A1\`)** أو **اختلاف في اللفات (\`Loop Mismatch\`)**.

3. **تحسين اقتصاديات الوحدة وتخصيص الموارد (\`Unit-Economics & Resource Optimization\`):**
   - يربط المعادلات الهندسية للإنتاج (\`L × W × H × 52 = Area m²\`) بمتغيرات استهلاك السلك الماسي (\`m/m²\`)، وكثافة الطاقة (\`kWh/m²\`)، ومعامل صلابة الحجر، وأجور التشغيل، للوصول إلى **التكلفة الحقيقية للمتر المربع ولللوح** لكل بلوك ولكل نوع رخام، مما يمنع التسعير العشوائي ويحسن تخصيص البلوكات لأوامر الشغل (\`Order Allocations\`).

4. **نمذجة الموثوقية والصيانة الوقائية (\`Reliability & Threshold Modeling\`):**
   - تحليل السلاسل الزمنية لـ **28 قناة حساس** (حرارة المواتير \`°C\`، عزم الدوران \`Torque %\`، شد السلك \`A1/A2 Tension N\`، سرعة التغذية وسرعة السلك) مع قواعد تنبيه (\`Alert Rules\`) وتآكل مجاري البكر (\`Roller Grooves 1..6\`) للتدخل قبل وقوع العطل الكارثي.

---

## 3. فوائد النظام الكاملة للمصنع (كيف يفيد المصنع في كل قسم؟)

### أولاً: مراقبة الإنتاج ومطابقة الورق بالماكينة
- **استيعاب كل مصادر البيانات:** قراءة مباشرة لملفات الـ PLC الأصلية (\`log.CSV\`)، بالإضافة لملفات الإكسيل/CSV الخاصة بالمشغلين (مع دعم تلقائي للأرقام العربية \`٠-٩\` ووحدات القياس المختلفة \`mm / cm / m\`)، أو الإدخال الرقمي المباشر.
- **تحليل مكبّر لكل عملية نشر:** رسم بياني تفاعلي (\`Telemetry Zoom Chart\`) يوضح أداء الماكينة كل 60 ثانية من بداية البلوك لنهايته.
- **فصل نشر المصنع عن نشر الغير (\`Block Owner\`):** تتبع دقيق للبلوكات المملوكة للمصنع مقابل بلوكات العملاء (أجرة النشر).
- **بث حالة التشغيل (\`Live Jobs\`):** متابعة العمليات الجارية حالياً وحالة كل منشار من لوحة واحدة.

### ثانياً: إدارة السلك الماسي والبكر (أكبر بند تكلفة متغيرة)
- تتبع عمر كل بكرة سلك ماسي في **الاستخدام الأول (\`First Use\`) والاستخدام الثاني (\`Second Use\`)**.
- قياس معدل التآكل الحقيقي (\`m/m²\`) ومقارنة أداء موردين السلك الماسي بالأرقام بدلاً من الانطباعات.
- تتبع المساحة المنشورة وعدد العمليات على **مجاري البكر الـ 6 (\`Roller Grooves 1..6\`)** لضمان استقامة القطع ومنع تلف السلك.

### ثالثاً: خفض الأعطال والطاقة والتوقفات
- **الصحة الميكانيكية (\`Machine Health\`):** رصد ذروة حرارة وعزم كل موتور واكتشاف أي أحمال زائدة مبكراً.
- **كشف أسباب التوقفات (\`Downtime & Stops\`):** تصنيف التوقفات (قطع/لحام سلك، فحص شد، مياه/تبريد، كهرباء، ضبط ماكينة، تفتيش مشغل) لمعرفة السبب رقم 1 في ضياع وقت الوردية.
- **مراقبة الطاقة (\`Energy Analytics\`):** قراءة العداد قبل وبعد كل عملية لحساب تكلفة واستهلاك الكهرباء لكل متر مربع (\`kWh/m²\`) حسب نوع الحجر.

### رابعاً: الإدارة المالية والمخازن وأوامر الشغل (Factory ERP)
- **محرك التكاليف والأرباح (\`Costing Engine\`):** حساب تكلفة السلك + الكهرباء + العمالة + المصاريف الإدارية لكل عملية وربطها بسعر البيع المتوقع لمعرفة صافي ربح كل بلوك.
- **المخازن (\`Inventory\`):** إدارة مواقع التخزين، أرصدة السلك الماسي والمستهلكات، وحركات الصرف والإضافة.
- **العملاء وأوامر الشغل والجودة (\`Orders & Quality\`):** تسجيل طلبات العملاء، ربط الألواح والبلوكات بها، وتسجيل فحص الجودة (استقامة القطع، حالة الطاولات، البكر، والسليكات).
- **الصيانة (\`Maintenance\`):** جدولة مهام الصيانة الوقائية والعلاجية المرتبطة بساعات التشغيل وتآكل البكر.

### خامساً: الحوكمة ومنع التلاعب والأخطاء
- **تدقيق جودة البيانات (\`Data Quality\`):** فحص آلي يكشف القيم الشاذة أو الناقصة ويعطي مؤشر جودة للبيانات (\`%\`).
- **الأرشيف غير القابل للحذف (\`Raw Logs Archive\`):** حفظ نسخة أصلية من كل ملف مرفوع مع إمكانية إعادة استيراده في أي وقت.
- **5 مستويات صلاحيات (\`RBAC\`) وسجل رقابة (\`Audit Log\`):** صلاحيات منفصلة للمدير، المشرف، المشغل، المحاسب، والمشاهد؛ مع تسجيل كل إضافة أو تعديل بالاسم والتوقيت والبيانات قبل وبعد التعديل، وتصدير **11 نوع تقرير CSV** بضغطة واحدة.

---

## 4. العائد على الاستثمار... ولماذا "العائد على الاستمرار" يتضاعف؟

### أ. العائد المالي المباشر (ROI) على منشار السلك الواحد
بافتراض منشار سلك ماسي يعمل 22 يوماً شهرياً بمعدل إنتاج متوسط **1,500 – 2,500 m² / شهر**:
1. **توفير 8% – 15% من استهلاك السلك الماسي:** عبر ضبط التغذية والشد واختيار المورد الأنسب لكل نوع حجر ← وفر تقديري **15,000 – 35,000 ج.م / شهر** في مصر (أو **$500 – $1,200 / شهر** في الخليج).
2. **استعادة 10% – 15% من ساعات التشغيل الضائعة:** تقليل فجوات الانتظار والتوقفات داخل العملية يضيف **150 – 300 m² إنتاجاً إضافياً شهرياً** بدون زيادة في الإيجار أو الرواتب الثابتة ← زيادة صافي هامش **25,000 – 60,000 ج.م / شهر** في مصر (أو **$1,200 – $2,800 / شهر** في الخليج).
3. **تفادي الأعطال الكارثية وتصحيح تسعير الأحجار الخاسرة:** إنذار مبكر لارتفاع حرارة/عزم موتور أو تلف مجرى بكر يوفر خسائر قد تصل إلى **50,000 – 200,000 ج.م** في الواقعة الواحدة.

> **النتيجة:** النظام يغطي اشتراكه الشهري بالكامل من توفير **بلوك واحد إلى بلوكين شهرياً**، ويحقق للمصنع عائداً يتراوح بين **8 إلى 20 ضعف قيمة الاشتراك**.

### ب. العائد على الاستمرار (Compounding Value Over Time)
في **WireCut OS**، قيمة النظام لا تظل ثابتة، بل **تتضاعف كلما استمر المصنع في استخدامه**:

| المرحلة الزمنية | ما الذي يحدث داخل المصنع؟ | العائد المركّب من الاستمرار |
| :--- | :--- | :--- |
| **الشهر 1 (مرحلة الكشف — Visibility)** | تجميع بيانات الـ PLC والمشغلين في مكان واحد وتأسيس خط الأساس (\`Baseline\`). | كشف التوقفات المخفية، حصر استهلاك السلك الفعلي، ووقف أخطاء الإدخال الورقي. |
| **الأشهر 2 – 3 (مرحلة المعايرة — Calibration)** | توفر بيانات مقارنة بين أكثر من 30–60 بلوكاً، وبين عدة بكر سلك ومشغلين. | تحديد "أفضل وصفة قطع (Recipe)" لكل نوع حجر، كشف الموردين الأعلى كفاءة، وتعديل أسعار الأحجار ذات الهوامش الضعيفة. |
| **الأشهر 4 – 6 (مرحلة التحسين — Optimization)** | اكتمال دورة حياة بكرات السلك ومراقبة تآكل مجاري البكر عبر مئات الساعات. | تقليل التشتت (\`Variance\`) بين الورديات، توحيد سرعات القطع المثلى، ورفع نسبة استغلال الماكينات لأقصى حد مستقر. |
| **الشهر 6+ (الذاكرة المؤسسية — Institutional Memory)** | يصبح لدى المصنع قاعدة معرفة تاريخية موثقة لأداء الماكينات والأحجار والمشغلين. | تحول الإدارة من رد الفعل ("إصلاح بعد العطل") إلى الإدارة التنبؤية، وعدم تأثر المصنع بتغيير مشغل أو مدير وردية لأن "وصفة النجاح" موثقة بالأرقام. |

---

## 5. باقات التسعير (في مصر وخارج مصر)

يعتمد التسعير على عدد المناشير/الخطوط المربوطة بالنظام، ويشمل **رسوم تأسيس وتدريب تدفع مرة واحدة** + **اشتراك شهري أو سنوي**.

### أ. التسعير داخل مصر (بالجنيه المصري)
*(مناسب لمناطق شق التعبان، بدر، السادات، العاشر من رمضان، العين السخنة، والمنيا)*

| الباقة | النطاق المناسب | التأسيس والتدريب (مرة واحدة) | الاشتراك الشهري | الاشتراك السنوي (خصم شهرين) |
| :--- | :--- | :---: | :---: | :---: |
| **باقة البداية (Starter)** | منشار واحد (\`1 Saw\`) | **15,000 – 25,000 ج.م** | **4,500 – 6,500 ج.م** | **45,000 – 65,000 ج.م** |
| **باقة النمو (Full ERP)** (الأكثر طلباً) | من **2 إلى 4 مناشير** | **30,000 – 50,000 ج.م** | **8,500 – 13,000 ج.م** | **85,000 – 130,000 ج.م** |
| **باقة المجمعات (Enterprise)** | **5 مناشير فأكثر** / متعدد الفروع | **60,000 – 120,000 ج.م** | **18,000 – 30,000+ ج.م** | اتفاق سنوي خاص |

- **منشار إضافي:** 2,000 – 3,000 ج.م / شهر.
- **خيار التجربة الميدانية (Paid Pilot):** تشغيل فعلي لمدة 30 يوماً بـ **10,000 – 15,000 ج.م** (تُخصم بالكامل من رسوم التأسيس عند التعاقد).

### ب. التسعير خارج مصر (الخليج العربي والسوق الدولي)

| الباقة (الخليج والأردن) | النطاق المناسب | التأسيس والتدريب (مرة واحدة) | الاشتراك الشهري | الاشتراك السنوي |
| :--- | :--- | :---: | :---: | :---: |
| **Starter (1–2 Saws)** | مصنع متوسط | **$1,500 – $2,500** | **$350 – $500** | **$3,500 – $5,000** |
| **Growth / Full ERP (3–5 Saws)** | مصنع متكامل | **$3,500 – $6,000** | **$750 – $1,200** | **$7,500 – $12,000** |
| **Enterprise (6+ Saws)** | مجموعات صناعية | **$8,000 – $15,000+** | **$1,800 – $3,000+** | **$18,000 – $30,000+** |

- **السوق الدولي (تركيا، أوروبا، البرازيل، الهند):** تسعير بالماكينة (\`$250 – $450 / منشار / شهر\` بحد أدنى $500 شهرياً)، تخصيص قارئ بيانات ماكينات أخرى عن \`MWS-01\` (\`$3,000 – $8,000\`)، وخيار الترخيص الدائم على سيرفر المصنع (\`$15,000 – $35,000\` + 20% صيانة سنوية).

---

## 6. خطة التنفيذ والتسليم (خلال 3 إلى 4 أسابيع)
1. **الأسبوع الأول (التحليل والربط):** استلام عينات ملفات الـ PLC والإكسيل من المصنع، ضبط معاملات التكلفة (سعر الكهرباء، السلك، العمالة، وأنواع الحجر)، وتجهيز الحسابات والصلاحيات.
2. **الأسبوع الثاني (الإطلاق والتدريب):** رفع البيانات التاريخية لبناء الـ Baseline، وتدريب المشغلين والمحاسب ومدير الإنتاج عملياً.
3. **الأسبوع الثالث والرابع (المراجعة التشغيلية):** تسليم أول تقرير تحليل فجوات وتوقفات وتكلفة حجر فعلية لتحقيق أول موجة توفير مباشر للمصنع.

> **عرض تشخيصي مجاني خلال 48 ساعة:** أرسل لنا ملفات تشغيل آخر 15 يوماً من الماكينة، وسنستخرج لك خلال 48 ساعة تقريراً مجانياً يوضح: ساعات التوقف الضائعة، كفاءة القطع الفعلي، ونسبة انحراف استهلاك السلك قبل التعاقد.`,
    tags: ['WireCut OS', 'Operations Research', 'Industrial ERP', 'MES', 'PLC Telemetry', 'Marble & Granite'],
    featured: true
  },
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
