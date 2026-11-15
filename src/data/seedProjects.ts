export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  companyLogo: string;
  category: 'Distributed Systems' | 'Lakehouse & BI' | 'AI & Machine Learning' | 'Cloud Native';
  role: string;
  impactMetric: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  summary: string;
  architectureHighlights: string[];
  liveDemoUrl?: string;
  featured: boolean;
  challenge?: string;
  solution?: string;
  keyDecisions?: { title: string; rationale: string; tradeOff: string }[];
  systemFlow?: string[];
  outcomeMetrics?: { label: string; value: string; description: string }[];
  galleryImages?: string[];
  steps?: { title: string; description: string }[];
}

export const initialProjects: ProjectItem[] = [
  {
    id: 'safir-lakehouse',
    title: 'Hospitality Multi-Property ERP & Real-Time Lakehouse',
    client: 'Safir Hotels & Resorts',
    companyLogo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80',
    category: 'Lakehouse & BI',
    role: 'Lead Data & Solutions Architect',
    impactMetric: '1.4M msg/sec',
    metrics: [
      { label: 'Throughput', value: '1.4M msg/sec' },
      { label: 'Latency', value: '< 250ms p99' },
      { label: 'Data Lake Sync', value: '5-min incremental' },
      { label: 'Properties Unified', value: '14 Hotels' }
    ],
    techStack: ['OPERA PMS', 'Custom ERP', 'Apache Kafka', 'ClickHouse', 'Python', 'Power BI', 'Docker'],
    summary: 'Architected and deployed a multi-tenant telemetry and reporting lakehouse ingesting transactional records across 14 hospitality properties with zero service downtime.',
    challenge: 'Safir Hotels & Resorts operated 14 distinct regional properties each using on-premise Oracle OPERA PMS databases. Night audit reporting took 8+ hours, preventing corporate leadership from obtaining consolidated RevPAR (Revenue Per Available Room) and occupancy telemetry before morning executive briefings. In addition, network connectivity between resort locations and headquarters suffered frequent drops, creating data drift and duplicate records.',
    solution: 'Designed an event-driven Change Data Capture (CDC) streaming lakehouse. Deployed lightweight edge Go daemons at each property to stream delta journals directly into a partitioned Apache Kafka cluster. Real-time stream workers cleaned, enriched, and upserted transactional events into a high-performance ClickHouse columnar store with automatic materialized views, providing sub-250ms query SLAs for corporate Power BI telemetry cockpits.',
    architectureHighlights: [
      'Engineered bi-directional CDC connectors parsing OPERA PMS raw transaction journals into Apache Kafka topics.',
      'Constructed columnar ClickHouse analytical store achieving 18x compression and sub-second query latency.',
      'Automated executive KPI dashboards refreshing real-time RevPAR and ADR metrics across 14 properties.',
      'Configured local edge buffer queues ensuring zero data loss during resort internet outages.'
    ],
    keyDecisions: [
      {
        title: 'ClickHouse Columnar vs PostgreSQL with TimescaleDB',
        rationale: 'ClickHouse delivered 18x higher analytical query throughput on 500M+ reservation rows and reduced hardware costs by 70% due to aggressive LZ4 compression.',
        tradeOff: 'ClickHouse does not support full multi-table ACID transactions, which was mitigated by keeping transactional state in Kafka and OPERA.'
      },
      {
        title: 'Kafka Edge CDC vs Batch Overnight DB Dumps',
        rationale: 'Streaming CDC decoupled operational hospitality front-desks from analytics load, turning an 8-hour batch window into sub-minute live dashboards.',
        tradeOff: 'Required establishing reliable mutual TLS tunneling and local buffering for resort edge connections.'
      }
    ],
    systemFlow: [
      'OPERA PMS Edge DB: Night audits and guest folios trigger local journal updates.',
      'Edge Ingestion Daemon: Go daemon captures CDC event streams and buffers locally on disk if offline.',
      'Apache Kafka Message Hub: Multi-tenant partitioned topics buffer millions of events per hour with snappy compression.',
      'Stream Processors: Python & Faust workers deduplicate, normalize currencies (EGP, USD, SAR), and enrich guest loyalty metadata.',
      'ClickHouse Analytical Lakehouse: Columnar storage with materialized views for fast aggregations.',
      'Power BI & Executive Telemetry: Live cockpit queried with sub-250ms p99 latency.'
    ],
    outcomeMetrics: [
      { label: 'Audit Time Reduction', value: '96%', description: 'Night audit consolidation dropped from 8 hours to under 12 minutes.' },
      { label: 'Storage Savings', value: '18x', description: 'ClickHouse columnar compression reduced multi-terabyte logs to a fraction of original size.' },
      { label: 'Uptime SLA', value: '99.99%', description: 'Zero reported lost transactions across 18 consecutive operating months.' }
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    ],
    steps: [
      { title: 'Edge CDC Extraction', description: 'Deployed lightweight Go daemons across 14 properties to capture OPERA PMS transaction journals with local disk buffering.' },
      { title: 'Kafka Event Streaming', description: 'Routed compressed delta events into partitioned Apache Kafka topics for fault-tolerant multi-tenant ingestion.' },
      { title: 'ClickHouse Lakehouse & BI', description: 'Materialized real-time RevPAR and ADR views in ClickHouse powering sub-250ms executive Power BI dashboards.' }
    ],
    liveDemoUrl: 'https://github.com/islam-samy',
    featured: true
  },
  {
    id: 'autonomous-ai-agents',
    title: 'Autonomous Multi-Agent AI System & Workflow Orchestration',
    client: 'Nexalytix Enterprise Intelligence',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    category: 'AI & Machine Learning',
    role: 'Lead AI Engineer & Solutions Architect',
    impactMetric: '60% Cost Reduction',
    metrics: [
      { label: 'Operational Cost', value: '-60%' },
      { label: 'Autonomous Tasks', value: '120K / month' },
      { label: 'Agent Routing SLA', value: '< 450ms' },
      { label: 'Human Handoff Rate', value: '< 4%' }
    ],
    techStack: ['Python', 'CrewAI', 'LangChain', 'n8n Automation', 'OpenAI API', 'FastAPI', 'Redis', 'Docker'],
    summary: 'Constructed an enterprise autonomous multi-agent AI network orchestrating document analysis, customer inquiry routing, and automated business operations with n8n event bridges.',
    challenge: 'Enterprise client operations spent over 350 staff hours each week manually reviewing unstructured supplier invoices, triaging complex inbound support requests, and updating isolated ERP and CRM databases. Latency in manual triage resulted in missed SLA deadlines and elevated payroll expenses.',
    solution: 'Engineered an autonomous multi-agent swarm using CrewAI and LangChain connected to self-hosted n8n workflow triggers. Specialized agent personas (Document Parser, Reasoning Validator, Database Mutator, and Executive Notifier) collaborate through shared Redis state to parse, validate, and write business records into production databases automatically.',
    architectureHighlights: [
      'Built multi-agent reasoning graphs with LangChain & CrewAI for autonomous invoice verification and anomaly flags.',
      'Integrated self-hosted n8n webhooks with automatic retries, zero-loss queues, and Telegram/Slack alerts.',
      'Engineered vector-augmented RAG memory with Redis for sub-50ms context retrieval on domain business rules.',
      'Automated bidirectional synchronization between customer web applications, relational databases, and ERPs.'
    ],
    keyDecisions: [
      {
        title: 'Multi-Agent Specialization vs Single Monolithic LLM Call',
        rationale: 'Splitting tasks across dedicated lightweight agent roles improved accuracy from 74% to 98.2% and cut prompt token consumption by 52%.',
        tradeOff: 'Requires maintaining state choreography and circuit breakers between agent steps.'
      },
      {
        title: 'Self-Hosted n8n Orchestrator vs Cloud SaaS Webhooks',
        rationale: 'Self-hosted n8n retained enterprise data sovereignty on-premise, reduced API cost per execution to zero, and supported custom Python worker extensions.',
        tradeOff: 'Required establishing dedicated monitoring with Prometheus and automated database backups.'
      }
    ],
    systemFlow: [
      'Event Ingestion: Webhooks capture inbound emails, documents, or ERP change events.',
      'Triage Agent: Classifies intent, extracts metadata, and triggers specialized agent sub-tasks.',
      'Validation Agent: Compares invoice line items against purchase orders via SQL queries.',
      'Mutation Agent: Automatically executes database upserts and triggers downstream billing workflows.',
      'Audit & Alert Dispatcher: Pushes executive summary briefings to Slack and records audit hashes.'
    ],
    outcomeMetrics: [
      { label: 'Operational Cost Reduction', value: '60%', description: 'Eliminated manual invoice processing and data entry across department teams.' },
      { label: 'Task Execution Speed', value: '12x', description: 'Average ticket processing speed accelerated from 4 hours to under 20 seconds.' },
      { label: 'Accuracy Rating', value: '98.2%', description: 'Validated zero error rate on high-volume financial data extractions.' }
    ],
    liveDemoUrl: 'https://github.com/islam-samy',
    featured: true
  },
  {
    id: 'sotex-manufacturing-erp',
    title: 'Industrial Manufacturing ERP & Real-Time Telemetry System',
    client: 'Sotex Factory & Industrial Group',
    companyLogo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&q=80',
    category: 'Distributed Systems',
    role: 'Principal ERP & Data Architect',
    impactMetric: '75% Discrepancy Cut',
    metrics: [
      { label: 'Inventory Accuracy', value: '99.4%' },
      { label: 'Discrepancy Cut', value: '-75%' },
      { label: 'Annual Cost Savings', value: '$18K+' },
      { label: 'Real-Time Sync', value: 'Sub-second' }
    ],
    techStack: ['Custom ERP', 'PostgreSQL', 'Python', 'Next.js 15', 'n8n', 'Power BI', 'TailwindCSS'],
    summary: 'Architected and deployed a full-scale industrial manufacturing ERP platform synchronizing shop-floor raw material procurement, inventory reconciliation, web portals, and executive telemetry.',
    challenge: 'Sotex Factory struggled with disparate manual logbooks and fragmented spreadsheets across yarn spinning, textile weaving, and finishing divisions. Inventory records suffered 75% reconciliation lag, causing sudden material stockouts, production halts, and untracked scrap material losses.',
    solution: 'Designed and deployed an integrated custom manufacturing ERP system. Built a normalized PostgreSQL relational foundation with strict ACID transaction guarantees. Developed role-based Next.js 15 web portals for warehouse supervisors and shift leads, automated barcode scan updates via n8n webhooks, and linked live inventory depletion to executive Power BI dashboards.',
    architectureHighlights: [
      'Modeled complete multi-stage Bill of Materials (BOM) schema in PostgreSQL with automated yield calculations.',
      'Engineered full-stack responsive web portal in Next.js 15 & React 19 for real-time plant floor order logging.',
      'Implemented automated n8n inventory reorder triggers dispatching purchase alerts when stock reached safety thresholds.',
      'Designed executive visual dashboards tracking daily machine throughput, downtime causes, and operator efficiency.'
    ],
    keyDecisions: [
      {
        title: 'Custom Modular ERP vs Expensive Legacy Proprietary Suite (SAP/Odoo)',
        rationale: 'Building a tailored Next.js + PostgreSQL ERP saved the enterprise $65,000 in upfront licensing and provided 100% exact alignment with textile production line steps.',
        tradeOff: 'Required upfront software architecture and dedicated database design sprints.'
      },
      {
        title: 'Next.js Server Actions vs Separate Client/API Architecture',
        rationale: 'Next.js App Router and Server Actions reduced client bundle footprint, delivered instant UI updates on low-spec plant tablets, and simplified data mutations.',
        tradeOff: 'Strict adherence to server/client boundary patterns required in UI components.'
      }
    ],
    systemFlow: [
      'Raw Material Intake: Weigh-scale and barcode scans record lot numbers directly via tablet UI.',
      'PostgreSQL Relational Ledger: Enforces atomic inventory decrements during weaving batch production.',
      'n8n Event Daemon: Automatically reconciles shift outputs against work orders every 15 minutes.',
      'Next.js Management Dashboard: Displays live order fulfillment stages and machine status telemetry.',
      'Power BI Executive Suite: Calculates monthly EBITDA margins, scrap percentages, and supplier lead times.'
    ],
    outcomeMetrics: [
      { label: 'Inventory Discrepancy Drop', value: '75%', description: 'Physical audits matched digital ERP balances within 0.6% tolerance.' },
      { label: 'Annual Operational Savings', value: '$18,500', description: 'Prevented emergency raw material freight fees and unrecorded scrap loss.' },
      { label: 'Supervisor Adoption', value: '100%', description: 'All plant shifts transitioned completely off paper manifests within 3 weeks.' }
    ],
    liveDemoUrl: 'https://github.com/islam-samy',
    featured: true
  },
  {
    id: 'fintech-predictive-engine',
    title: 'Real-Time Fraud & Anomaly Prediction Web Gateway',
    client: 'FinTech Cloud International',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    category: 'Cloud Native',
    role: 'Lead ML & Full-Stack Engineer',
    impactMetric: '95% Accuracy',
    metrics: [
      { label: 'Model Precision', value: '95.4%' },
      { label: 'Inference SLA', value: '< 18ms' },
      { label: 'False Positives', value: '-62%' },
      { label: 'Prevented Losses', value: '$4.2M' }
    ],
    techStack: ['Python', 'XGBoost', 'Next.js', 'FastAPI', 'Redis', 'Kubernetes', 'Prometheus'],
    summary: 'Engineered sub-20ms latency machine learning scoring engine and full-stack Next.js administrative console handling 45,000 requests per minute with automated retraining pipelines.',
    challenge: 'Payment fraud attack vectors evolved faster than traditional rule-based transaction scoring engines could handle. Legitimate cardholders experienced high false-positive decline rates (causing cart abandonment), while fraudulent syndicate patterns slipped through rule checks during flash sale spikes of 45,000 requests per minute.',
    solution: 'Constructed an ultra-low latency predictive scoring microservice powered by an ensemble of XGBoost and LightGBM models. Integrated an in-memory Redis feature store for sub-millisecond retrieval of user behavioral history, device fingerprints, and geolocation velocity. Deployed horizontally on Kubernetes behind FastAPI with a Next.js real-time operator portal.',
    architectureHighlights: [
      'Trained gradient boosting ensemble on 12M historical transaction records with feature store caching in Redis.',
      'Built modern Next.js 15 administrative console with live WebSocket alerts for suspicious transaction telemetry.',
      'Implemented canary deployment strategy with Prometheus drift detection and fallback rule heuristics.',
      'Prevented over $4.2M in unauthorized chargebacks across the first two quarters of production rollout.'
    ],
    keyDecisions: [
      {
        title: 'Tree-based Ensemble (XGBoost/LightGBM) vs Deep Neural Network',
        rationale: 'Gradient boosted trees offered superior inference speed (<15ms) on tabular transaction features and clear feature interpretability (SHAP values) required for financial regulatory compliance.',
        tradeOff: 'Deep networks might capture complex sequence relationships better, but their 80ms+ latency violated checkout SLAs.'
      },
      {
        title: 'Redis In-Memory Feature Store vs DynamoDB',
        rationale: 'Sub-millisecond read latency on user behavioral aggregations (e.g. transactions in last 10 minutes) was strictly necessary.',
        tradeOff: 'Higher RAM memory expense, mitigated by key eviction policies on non-active user accounts.'
      }
    ],
    systemFlow: [
      'Payment Gateway Inbound: Webhook sends authorization request with card and device fingerprint.',
      'Feature Store Lookup: Redis pipeline retrieves 124 pre-computed feature vectors in < 2ms.',
      'Inference Engine: Optimized C++ runtime evaluates XGBoost ensemble in < 12ms.',
      'Decision Orchestrator: Combines ML risk probability with regional compliance rules.',
      'Next.js Operator Console: Real-time fraud analyst dashboard streams flagged transactions via WebSockets.'
    ],
    outcomeMetrics: [
      { label: 'False Decline Reduction', value: '62%', description: 'Drastically reduced legitimate customer friction at payment checkout.' },
      { label: 'Inference SLA', value: '14.2ms', description: 'Exceeded strict 20ms payment gateway timeout SLA requirements.' },
      { label: 'Fraud Capital Saved', value: '$4.2M', description: 'Prevented fraudulent chargebacks within the first two operating quarters.' }
    ],
    liveDemoUrl: 'https://github.com/islam-samy',
    featured: true
  }
];
