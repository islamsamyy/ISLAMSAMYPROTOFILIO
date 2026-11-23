export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  companyLogo: string;
  category:
    | 'ERP Systems'
    | 'Data Engineering'
    | 'Software Engineering & Online Systems'
    | 'Data Analysis & Power BI'
    | 'AI & Machine Learning';
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
  readmeContent?: string;
  githubUrl?: string;
  displayOrder?: number;
}

export const initialProjects: ProjectItem[] = [
  {
    id: 'wirecut-os-marble-erp',
    title: 'WireCut OS — Industrial MES, 28-Channel PLC Historian & Costing ERP',
    client: 'Marble & Granite Manufacturing Plants (Multi-Wire Diamond Saws)',
    companyLogo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&q=80',
    category: 'ERP Systems',
    role: 'Principal Solutions Architect & Data Engineer',
    impactMetric: '8–20x ROI · -15% Diamond Wire Waste',
    metrics: [
      { label: 'PLC Channels', value: '28 Live Sensors' },
      { label: 'Wire Cost Saving', value: '8% – 15%' },
      { label: 'Uptime Recovery', value: '+10% – 15%' },
      { label: 'Export Suites', value: '11 CSV Reports' }
    ],
    techStack: [
      'Operations Research',
      'PLC Telemetry (MWS-01)',
      'TypeScript',
      'Next.js',
      'Costing ERP & MES',
      '28-Channel Historian',
      'RBAC (5 Tiers)',
      'Audit Logging'
    ],
    summary:
      'Industrial MES, PLC Telemetry Historian, and Costing ERP engineered specifically for Multi-Wire Diamond Saws in marble and granite factories. Built on Operations Research (OR) mathematical modeling to decompose cutting vs. downtime, benchmark diamond wire spools (1st/2nd use), track Roller Grooves 1..6 wear, and calculate true cost per m² across 28 live PLC sensor channels.',
    architectureHighlights: [
      'Time-Motion & Bottleneck Decomposition: Splits PLC Elapsed Time into Active Cutting Minutes, Retraction Minutes, In-Operation Stops (with exact cut depth in mm), and inter-block Downtime Gaps to compute Active Cutting Efficiency % and MTBS.',
      'Plan vs. Actual & Recipe Adherence: Compares PLC 12-Slot Step Recipes, Planned Time, Max Slices, and Planned Wire Cost against live execution—flagging A1→A2 / A2→A1 direction shifts and Loop Mismatches.',
      'Multi-Source Ingestion: Parses native PLC log.CSV alongside operator Excel/CSV files with automatic Arabic numeral (٠-٩) normalization and mm/cm/m unit unification.',
      'Unit-Economics Costing Engine: Connects L × W × H × 52 = Area (m²), wire consumption (m/m²), energy intensity (kWh/m²), stone hardness, and labor overhead per job and Block Owner (factory vs. contract cutting).',
      '28-Channel Predictive Machine Health: Monitors motor temperatures (°C), Torque %, A1/A2 wire tension (N), feed rate, wire speed, and Roller Grooves 1..6 degradation with automated Alert Rules.',
      'Enterprise Governance: Automated Data Quality % scoring, immutable Raw Logs Archive, 5-tier RBAC (Admin, Supervisor, Operator, Accountant, Viewer), full before/after Audit Log, and 11 one-click CSV report exports.'
    ],
    challenge:
      'Marble and granite factories traditionally rely on paper shift logs and disconnected Excel sheets that capture production data after the shift ends. This blind spot causes silent profit erosion through 8–15% unnecessary diamond wire wear, unrecorded micro-stops, unexpected motor or roller failures, and mispriced stone varieties.',
    solution:
      'Architected WireCut OS—an end-to-end MES + PLC Telemetry Historian + Costing ERP grounded in Operations Research. By streaming and parsing 28 PLC channels at 60-second telemetry zoom resolution alongside operator logs, inventory, orders, quality checks, and preventive maintenance, plant leadership gains true per-block unit economics and predictive mechanical alerts.',
    keyDecisions: [
      {
        title: 'Operations Research Decomposition vs. Basic Job Timestamps',
        rationale:
          'Separating Active Cutting, Retraction, In-Operation Stops (at exact mm depth), and inter-block Downtime Gaps isolates true machine utilization and MTBS rather than hiding micro-stops inside total elapsed hours.',
        tradeOff:
          'Requires dedicated PLC parser alignment (such as MWS-01 log.CSV schemas) and configurable sensor thresholds per machine.'
      },
      {
        title: 'Unified MES + Costing ERP + Inventory Ledger',
        rationale:
          'Linking diamond wire spool lifecycles (First & Second Use), Roller Grooves 1..6 wear, energy meter readings (kWh/m²), and customer Order Allocations produces exact net profit per block and per stone type.',
        tradeOff:
          'Requires initial calibration of stone hardness coefficients, electricity tariffs, and operator workflows during Week 1.'
      }
    ],
    systemFlow: [
      'Multi-Source Ingestion: Native PLC log.CSV (28 channels) + Operator Excel/CSV (auto Arabic numeral ٠-٩ & mm/cm/m normalization).',
      'Time-Motion & Recipe Engine: Decomposes Active Cutting vs. Retraction, flags Loop Mismatches, and computes Adherence % and MTBS.',
      '28-Channel Historian & Telemetry Zoom: 60-second resolution tracking motor °C, Torque %, A1/A2 Tension N, and Roller Grooves 1..6.',
      'Unit-Economics Costing Engine: Combines Wire (m/m²) + Energy (kWh/m²) + Labor + Overhead against Block Owner & Order Allocations.',
      'Governance & Reporting: Immutable Raw Logs Archive, Data Quality % audit, 5-tier RBAC Audit Log, and 11 one-click CSV exports.'
    ],
    outcomeMetrics: [
      {
        label: 'Diamond Wire Savings',
        value: '8% – 15%',
        description: 'Saves 15,000–35,000 EGP/mo (Egypt) or $500–$1,200/mo (GCC) per multi-wire saw via feed/tension optimization and supplier benchmarking.'
      },
      {
        label: 'Lost Uptime Recovered',
        value: '+10% – 15%',
        description: 'Adds 150–300 m²/month of extra slab output per saw with zero increase in fixed rent or payroll.'
      },
      {
        label: 'System ROI',
        value: '8x – 20x',
        description: 'Covers monthly subscription from 1–2 optimized blocks while preventing 50,000–200,000 EGP catastrophic motor/roller failures.'
      }
    ],
    steps: [
      {
        title: 'Production Monitoring & Telemetry Zoom',
        description: 'Live Jobs command deck, 60-second block telemetry curves, and clean separation between Factory vs. Third-Party Block Owners.'
      },
      {
        title: 'Diamond Wire & Roller Grooves 1..6',
        description: 'First Use vs. Second Use spool tracking, supplier wear-rate benchmarking (m/m²), and 6-groove roller utilization tracking.'
      },
      {
        title: 'Machine Health, Downtime & Energy (kWh/m²)',
        description: '28-channel PLC anomaly alerts, categorized stop reasons (wire snap, water, power, setup), and per-stone energy costing.'
      },
      {
        title: 'Factory ERP, Inventory, Orders & 5-Tier RBAC',
        description: 'Net block profit costing, storage & consumables ledger, customer order allocations, slab quality inspection, and immutable audit logs.'
      }
    ],
    featured: true,
    readmeContent: `# WireCut OS — Industrial MES, PLC Telemetry Historian & Costing ERP

**WireCut OS** is a specialized Operations Research platform built for **Marble & Granite Multi-Wire Diamond Saws**, combining **MES**, **28-Channel PLC Telemetry**, and **Unit-Economics Costing ERP**.

## Core Modules
- **Time-Motion & OR Decomposition:** Active Cutting Minutes, Retraction Minutes, In-Operation Stops (mm depth), Downtime Gaps, Active Cutting Efficiency %, and MTBS.
- **Plan vs. Actual & Recipe Adherence:** Evaluates 12-Slot Step Recipes, Planned Time, Max Slices, direction changes (\`A1→A2\` / \`A2→A1\`), and Loop Mismatches.
- **Diamond Wire & Roller Lifecycle:** First Use & Second Use tracking, supplier \`m/m²\` benchmarking, and Roller Grooves 1..6 area tracking.
- **28-Channel Machine Health & Energy:** Motor temperatures (\`°C\`), Torque \`%\`, A1/A2 wire tension (\`N\`), feed/wire speed, and \`kWh/m²\` stone energy intensity.
- **Factory ERP & Governance:** Costing Engine, Inventory, Customer Orders, Quality Inspection, Preventive Maintenance, immutable Raw Logs Archive, 5-tier RBAC, Audit Log, and 11 CSV report exports.`
  },
  {
    id: 'telco-churn-analysis',
    title: 'Telco Customer Churn Analysis — Python & Power BI',
    client: 'Telecommunications Retention Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    category: 'AI & Machine Learning',
    role: 'Data Scientist & BI Developer',
    impactMetric: '7,043 Customers · Churn Drivers',
    metrics: [
      { label: 'Total Customers', value: '7,043' },
      { label: 'Gender Split', value: '50.5% M / 49.5% F' },
      { label: 'Dashboard Pages', value: '3 Interactive' },
      { label: 'Stack', value: 'Python + Power BI' }
    ],
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Power BI', 'DAX', 'Power Query'],
    summary: 'In-depth customer churn analysis for a telecom company combining Python (data preprocessing, feature engineering, predictive modeling) with a 3-page interactive Power BI dashboard to uncover attrition drivers and enable targeted retention strategies.',
    architectureHighlights: [
      'Python preprocessing pipeline handling missing values, categorical encoding, and Tenure Category engineering.',
      'Predictive modeling to identify high-risk churn segments across contract types and service tiers.',
      'Multi-page Power BI report: All Customer Profile, Churned Customer Profile, and Churned Customer Details.',
      'Customer ID drill-through view surfacing personal, service, and contract attributes for individual churned accounts.'
    ],
    challenge: 'The telecom operator lacked visibility into how contract structure, tenure, payment methods, and add-on services (OnlineSecurity, TechSupport, DeviceProtection) contributed to customer attrition.',
    solution: 'Built a Python-to-Power BI analytics pipeline that engineered customer tenure segments, modeled churn risk, and delivered an interactive 3-page retention dashboard.',
    systemFlow: [
      'Data Preprocessing (Python): Clean raw telecom records and engineer Tenure Categories.',
      'Predictive Modeling: Identify key churn drivers across contracts, services, and demographics.',
      'Power BI Modeling: Build DAX measures and multi-page navigation.',
      'Customer Drill-Through: Inspect individual churned customer profiles by Customer ID.'
    ],
    outcomeMetrics: [
      { label: 'Customer Base', value: '7,043', description: '3,555 Male and 3,488 Female customers analyzed' },
      { label: 'Contract Insights', value: '3.88K', description: 'Month-to-month contracts identified as primary churn risk' },
      { label: 'Drill-Through', value: '100%', description: 'Granular Customer ID inspection for retention teams' }
    ],
    featured: true,
    githubUrl: 'https://github.com/islamsamyy/telco-customer-churn-analysis',
    steps: [
      {
        title: 'All Customer Profile (7,043 Customers)',
        description: 'Comprehensive overview of demographics, phone/internet services, tenure categories, contracts, and payment methods.'
      },
      {
        title: 'Churned Customer Details (Drill-Through)',
        description: 'Granular Customer ID inspection (e.g., 0004-TLHLJ) displaying personal details, subscribed services, and contract metadata.'
      }
    ],
    galleryImages: [
      '/projects/telco-churn-analysis/all-customer-profile.jpg',
      '/projects/telco-churn-analysis/churned-customer-details.jpg'
    ]
  },
  {
    id: 'call-center-powerbi',
    title: 'Call Center Analysis Dashboard — Power BI & SLA Intelligence',
    client: 'Customer Operations & Support Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    category: 'Data Analysis & Power BI',
    role: 'BI Developer & Data Analyst',
    impactMetric: '33K Calls · 75.3% SLA Response',
    metrics: [
      { label: 'Total Calls', value: '33,000' },
      { label: 'Avg Call Duration', value: '25.02 min' },
      { label: 'Response Time', value: '75.3% SLA' },
      { label: 'Total Duration', value: '13.74K Hrs' }
    ],
    techStack: ['Power BI', 'DAX', 'Power Query', 'Bing Maps', 'Data Modeling'],
    summary: 'Multidimensional Power BI Call Center Analysis Dashboard providing comprehensive visibility into 33,000+ support calls, average handle time (25.02 min), SLA response rate (75.3%), caller sentiment, support channels, call reasons, and geographic state-level distribution.',
    architectureHighlights: [
      'Tracks 33K total calls and 824.2K minutes (13.74K hours) of cumulative support volume.',
      'Sentiment analysis breakdown from Very Negative to Very Positive across both call count and duration.',
      'Channel distribution donut chart comparing Call-Center, Chatbot, Email, and Web volumes.',
      'Interactive US State Map and slicer enabling instant drill-down into state-level KPIs.'
    ],
    challenge: 'Call center managers lacked a unified view of SLA response rates, handle times, and customer sentiment across multiple support channels and US states.',
    solution: 'Designed an interactive dark-themed Power BI dashboard with DAX-driven KPIs, sentiment & reason breakdowns, channel analytics, and state-level geographic filtering.',
    systemFlow: [
      'Data Ingestion & Modeling: Clean and model 33K call records in Power Query.',
      'DAX KPI Engine: Compute Total Calls, Avg Call Duration, Response Time %, and Total Duration.',
      'Visual Analytics: Build Sentiment, Reason, Channel, and State Map visuals.',
      'Interactive Slicing: Enable state-level filtering with real-time KPI recalculation.'
    ],
    outcomeMetrics: [
      { label: 'Call Volume', value: '33K', description: 'Total support interactions analyzed' },
      { label: 'SLA Response', value: '75.3%', description: 'Calls answered within target response time' },
      { label: 'Total Handle Time', value: '824.2K min', description: '13.74K hours of tracked call duration' }
    ],
    featured: true,
    githubUrl: 'https://github.com/islamsamyy/call-center-analysis-powerbi',
    steps: [
      {
        title: 'Full Dashboard Overview (33K Calls)',
        description: 'Executive view of Total Calls, Avg Call Duration, SLA Response %, Sentiment, Channel, Reason, and US State Map.'
      },
      {
        title: 'State Hover Tooltip (Texas)',
        description: 'Interactive tooltip displaying state-level call volume (Texas: 3,572 calls).'
      },
      {
        title: 'Dynamic State Slicer — Arkansas & Idaho',
        description: 'Real-time KPI recalculation when filtering by individual states such as Arkansas (204 calls) and Idaho (174 calls).'
      }
    ],
    galleryImages: [
      '/projects/call-center-powerbi/dashboard-overview.jpg',
      '/projects/call-center-powerbi/state-tooltip-texas.jpg',
      '/projects/call-center-powerbi/state-filter-arkansas.jpg',
      '/projects/call-center-powerbi/state-filter-idaho.jpg'
    ]
  },
  {
    id: 'india-unemployment-eda',
    title: 'India Unemployment Rate Analysis — Interactive Data Science & EDA',
    client: 'Data Science & Economic Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    category: 'Data Analysis & Power BI',
    role: 'Data Scientist & BI Analyst',
    impactMetric: '5 Regions · 27+ States Analyzed',
    metrics: [
      { label: 'Timeframe', value: 'Jan–Oct 2020' },
      { label: 'Visualizations', value: '6 Interactive' },
      { label: 'Stack', value: 'Python + Plotly' },
      { label: 'Output', value: 'final.csv + Notebook' }
    ],
    techStack: ['Python', 'Pandas', 'Plotly Express', 'Seaborn', 'Matplotlib', 'Jupyter Notebook'],
    summary: 'Comprehensive Exploratory Data Analysis (EDA) of India’s 2020 unemployment trends across 5 regions and 27+ states. Built animated Plotly histograms, hierarchical sunburst charts, state-level box plots, scatter matrices, and Seaborn correlation heatmaps.',
    architectureHighlights: [
      'Animated regional histogram tracking unemployment rate shifts across North, South, East, West, and Northeast India.',
      'Hierarchical Sunburst chart mapping regional-to-state unemployment distribution.',
      'Interactive state-level box plots exposing medians, IQRs, and pandemic-era outliers.',
      'Multi-dimensional scatter matrix & Seaborn correlation heatmap quantifying employment vs. labour participation.'
    ],
    challenge: 'Raw labour and unemployment datasets across Indian states contained temporal gaps, regional hierarchies, and multi-variable interactions that were difficult to interpret in static spreadsheets.',
    solution: 'Cleaned and exported the structured dataset (final.csv) in Pandas and built an interactive visual analytics suite using Plotly Express and Seaborn in Jupyter Notebook.',
    systemFlow: [
      'Data Ingestion & Cleaning: Load raw CSVs in Pandas, normalize dates/regions, and export final.csv.',
      'Temporal & Regional EDA: Build animated Plotly histograms and hierarchical Sunburst charts.',
      'Distribution & Outlier Analysis: Generate sorted state-level box plots.',
      'Multivariate Correlation: Compute scatter matrices and Seaborn correlation heatmaps.'
    ],
    outcomeMetrics: [
      { label: 'Regional Coverage', value: '5 Regions', description: 'North, South, East, West, and Northeast India' },
      { label: 'Interactive Charts', value: '6+', description: 'Animated histograms, sunburst, box plots, and heatmaps' },
      { label: 'Clean Dataset', value: 'final.csv', description: 'Analysis-ready output exported for downstream BI' }
    ],
    featured: true,
    githubUrl: 'https://github.com/islamsamyy/india-unemployment-eda-plotly',
    steps: [
      {
        title: 'Animated Regional Histogram',
        description: 'Plotly Express histogram with date animation frame tracking unemployment across India’s 5 regions.'
      },
      {
        title: 'Region-to-State Sunburst Chart',
        description: 'Hierarchical breakdown of unemployment rates from macro regions down to individual states.'
      },
      {
        title: 'State-Level Box Plots & Outliers',
        description: 'Sorted box plots revealing state medians, interquartile ranges, and extreme pandemic spikes.'
      },
      {
        title: 'Scatter Matrix & Correlation Heatmap',
        description: 'Multivariate relationships and Pearson correlation matrix across employment, labour participation, and geography.'
      }
    ],
    galleryImages: [
      '/projects/india-unemployment-eda/animated-region-histogram.jpg',
      '/projects/india-unemployment-eda/sunburst-region-state.jpg',
      '/projects/india-unemployment-eda/boxplot-state-sikkim.jpg',
      '/projects/india-unemployment-eda/boxplot-state-punjab.jpg',
      '/projects/india-unemployment-eda/state-bar-scatter-matrix.jpg',
      '/projects/india-unemployment-eda/pairplot-correlation-heatmap.jpg'
    ]
  },
  {
    id: 'nexalytix-company-brain',
    title: 'Nexalytix Company Brain — RAG AI Agent & Growth Hacking Pipeline',
    client: 'Nexalytix',
    companyLogo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=120&q=80',
    category: 'AI & Machine Learning',
    role: 'Founder & AI Automation Architect',
    impactMetric: 'Real-Time RAG + Auto-Sync',
    metrics: [
      { label: 'Architecture', value: 'Dual-Pipeline RAG' },
      { label: 'Vector Store', value: 'Supabase pgvector' },
      { label: 'Memory', value: 'Postgres Chat' },
      { label: 'Knowledge Sync', value: 'Google Drive Auto' }
    ],
    techStack: ['n8n', 'OpenAI', 'Ollama', 'Supabase Vector Store', 'PostgreSQL', 'Google Drive', 'RAG'],
    summary: 'What happens when Data Science meets Growth Hacking and n8n? Built Nexalytix Company Brain: an end-to-end Retrieval-Augmented Generation (RAG) AI Agent with persistent PostgreSQL chat memory, hybrid OpenAI + Ollama embeddings, and an automated Google Drive-to-Supabase vector ingestion pipeline.',
    architectureHighlights: [
      'Dual-pipeline n8n architecture separating real-time conversational RAG from automated document ingestion.',
      'Google Drive triggers (File Created & File Updated) automatically sync new or modified company docs.',
      'Deduplication step deletes stale vector rows in Supabase before re-indexing updated files.',
      'Recursive Character Text Splitter and Ollama Embeddings chunk and vectorize documents into Supabase.',
      'PostgreSQL Chat Memory persists multi-turn conversation context per session.'
    ],
    challenge: 'Growing data & automation teams struggle with fragmented knowledge across documents, making it hard to deliver instant, accurate answers about services, pricing, and operations without manual prompt updates.',
    solution: 'Engineered an autonomous RAG AI Agent in n8n that watches Google Drive for document changes, keeps Supabase Vector Store continuously synchronized, and grounds OpenAI/Ollama responses with persistent PostgreSQL memory.',
    systemFlow: [
      'Google Drive Triggers: Detect File Created or File Updated events in the nexaRag folder.',
      'Deduplication & Extraction: Delete old Supabase rows by File ID, download the file, and extract text.',
      'Chunking & Vectorization: Split text recursively, generate Ollama embeddings, and insert into Supabase Vector Store.',
      'RAG Chat Agent: Receive chat messages, load PostgreSQL Chat Memory, retrieve relevant vector chunks, and generate grounded responses.'
    ],
    outcomeMetrics: [
      { label: 'Knowledge Freshness', value: 'Real-Time', description: 'Auto-reindexes whenever Google Drive files change' },
      { label: 'Context Retention', value: 'Multi-Turn', description: 'Backed by PostgreSQL Chat Memory per session' },
      { label: 'Hybrid AI Stack', value: 'OpenAI + Ollama', description: 'Combines cloud reasoning with local embeddings' }
    ],
    featured: true,
    githubUrl: 'https://github.com/islamsamyy/nexalytix-company-brain-rag',
    steps: [
      {
        title: 'Nexalytix Company Brain — Full RAG Workflow',
        description: 'Complete n8n orchestration showing both the real-time RAG AI Agent and the automated Google Drive-to-Supabase ingestion pipeline.'
      },
      {
        title: 'Grounded Knowledge Retrieval',
        description: 'Live chat demonstrating accurate, document-grounded answers about Nexalytix mission and founder.'
      },
      {
        title: 'Service & Pricing Retrieval + Memory Logs',
        description: 'Detailed service breakdown retrieved from vector store alongside live PostgreSQL Chat Memory execution logs.'
      }
    ],
    galleryImages: [
      '/projects/nexalytix-company-brain/rag-agent-chat.jpg',
      '/projects/nexalytix-company-brain/rag-founder-query.jpg',
      '/projects/nexalytix-company-brain/rag-services-query.jpg'
    ]
  },
  {
    id: 'n8n-lead-generation',
    title: 'Automated B2B Lead Generation & Supplier Discovery Pipeline',
    client: 'Egyptian Garment Export Factory',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    category: 'Data Engineering',
    role: 'Automation & Data Pipeline Architect',
    impactMetric: '1,000+ Verified Leads < 2h',
    metrics: [
      { label: 'Leads Extracted', value: '1,000+ Verified' },
      { label: 'Execution Time', value: '< 2 Hours' },
      { label: 'Manual Effort', value: 'Zero' },
      { label: 'Reusability', value: 'Any Domain' }
    ],
    techStack: ['n8n', 'Apify API', 'Google Maps Scraper', 'Google Sheets', 'Telegram Bot API', 'JSON'],
    summary: 'End-to-end low-code automation workflow built with n8n, Apify API, Google Sheets, and Telegram to automate B2B supplier discovery from Google Maps. Replaced slow, error-prone manual searches with a repeatable pipeline that extracts, cleans, and structures 1,000+ verified leads in under 2 hours.',
    architectureHighlights: [
      'Telegram Trigger initiates the workflow on-demand from a simple bot command.',
      'Google Sheets Input dynamically supplies the target search query (e.g., textile suppliers Dubai).',
      'HTTP Request via Apify API scrapes Google Maps business data (Name, Category, Country Code, Rating, Phone, Website).',
      'Data Cleaning & Structuring node transforms raw JSON payloads into normalized, analysis-ready records.',
      'Google Sheets Append writes verified leads directly to the sheet and triggers an instant Telegram notification.'
    ],
    challenge: 'An Egyptian garment factory exporting in large quantities needed to quickly reach reliable textile suppliers in Dubai, but manual searching on Google Maps was extremely time-consuming, prone to human error, and non-repeatable.',
    solution: 'Built an end-to-end n8n low-code automation pipeline integrating Telegram, Google Sheets, and the Apify Google Maps Scraper API to extract, clean, structure, and deliver verified supplier leads automatically.',
    systemFlow: [
      'Telegram Trigger: Client sends a command (e.g., start) to the Nexalytix Lead Generation bot.',
      'Google Sheets Input: Reads the search domain and query parameters.',
      'Apify HTTP Request: Scrapes Google Maps listings with active website filtering.',
      'Edit Fields: Normalizes raw JSON into clean, structured columns.',
      'Google Sheets Append & Telegram Notification: Appends leads to the sheet and sends an instant update.'
    ],
    outcomeMetrics: [
      { label: 'Verified Leads', value: '1,000+', description: 'Extracted and structured in under 2 hours' },
      { label: 'Manual Effort', value: '0%', description: 'Fully automated end-to-end execution' },
      { label: 'Domain Flexibility', value: '100%', description: 'Reusable across any industry or location' }
    ],
    featured: true,
    githubUrl: 'https://github.com/islamsamyy/n8n-lead-generation-automation',
    steps: [
      {
        title: 'End-to-End n8n Workflow & Live Output',
        description: 'Complete n8n orchestration connecting Telegram Trigger, Google Sheets, Apify HTTP Request, Edit Fields, and Telegram Notification alongside live Google Sheets output.'
      },
      {
        title: 'Apify HTTP Request Configuration',
        description: 'JSON payload configuration for the Apify Google Maps Scraper API with skipClosedPlaces and withWebsite filters.'
      }
    ],
    galleryImages: [
      '/projects/n8n-lead-generation/workflow-overview.jpg',
      '/projects/n8n-lead-generation/http-request-config.jpg'
    ]
  },
  {
    id: 'nexawriter',
    title: 'NexaWriter — AI Growth Hacking & Multi-Platform Content Automation',
    client: 'Nexalytix (Internal Growth System)',
    companyLogo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=120&q=80',
    category: 'AI & Machine Learning',
    role: 'Growth & AI Automation Architect',
    impactMetric: '100% Automated Publishing',
    metrics: [
      { label: 'Trigger', value: 'Google Sheets (Row Added)' },
      { label: 'AI Agent', value: 'HumanizeIt + Groq LLM' },
      { label: 'Channels', value: 'LinkedIn, X, Blog, FB' },
      { label: 'Manual Effort', value: 'Zero' }
    ],
    techStack: ['n8n', 'Google Sheets API', 'Groq Chat Model', 'AI Tools Agent', 'LinkedIn API', 'X (Twitter) API', 'Tavily Search'],
    summary: 'An intelligent growth-hacking and content automation system built with n8n that combines Data Science content planning with AI Agents. Every new record added to Google Sheets automatically triggers an AI refinement pipeline (HumanizeIt) that rewrites, enhances clarity and engagement, and publishes or schedules content across LinkedIn and X.',
    architectureHighlights: [
      'Google Sheets Trigger (rowAdded) monitors content calendars and fires immediately when a new record is added.',
      'Edit Fields (manual) normalizes raw sheet columns into structured prompts for downstream AI Agents.',
      'HumanizeIt (Tools Agent) powered by Groq Chat Model and Think reasoning tool refines tone, clarity, and hook strength.',
      'Automated multi-platform publishing nodes post directly to LinkedIn Company Pages and X (Twitter).',
      'Extensible research-to-drafting pipeline using Tavily Search, Split Out, Aggregate, and platform-specific AI writers (NexaLinkedInWriter, NexaFBWriter, NexaXwriteR, NexaBlogWriter).'
    ],
    challenge: 'Maintaining a consistent, high-quality brand presence across multiple social platforms while scaling content production manually is time-consuming and unsustainable.',
    solution: 'Built NexaWriter in n8n to connect structured Google Sheets content plans directly to Groq-powered AI Agents (HumanizeIt) for automated humanization, formatting, and multi-channel publishing.',
    systemFlow: [
      'Google Sheets Trigger (rowAdded): Detects new content records in real time.',
      'Edit Fields: Extracts and structures raw text, topic, and metadata.',
      'HumanizeIt AI Agent (Groq Chat Model + Think): Reviews, rewrites, and optimizes the message for clarity and engagement.',
      'Platform Publishers (LinkedIn / X): Automatically publishes or schedules the finalized post.'
    ],
    outcomeMetrics: [
      { label: 'Publishing Cadence', value: '100%', description: 'Consistent monthly content delivery without manual posting' },
      { label: 'AI Quality Gate', value: 'Every Post', description: 'Reviewed and humanized by AI Agent before going live' },
      { label: 'Channel Coverage', value: 'Multi-Platform', description: 'Supports LinkedIn, X, Facebook, Blog, and Video/Reels expansion' }
    ],
    featured: true,
    githubUrl: 'https://github.com/islamsamyy',
    steps: [
      {
        title: 'NexaWriter Workflow Execution & Live LinkedIn Output',
        description: 'Full n8n workflow canvas showing Google Sheets triggers, Edit Fields, HumanizeIt AI Agents, and live published output on the Nexalytix LinkedIn Company Page.'
      },
      {
        title: 'Active LinkedIn Automation Pipeline',
        description: 'Highlighted LinkedIn publishing branch executing Google Sheets Trigger -> Edit Fields1 -> HumanizeIt (Groq Chat Model3) -> LinkedIn create:post.'
      }
    ],
    galleryImages: [
      '/projects/nexawriter/workflow-execution-success.jpg',
      '/projects/nexawriter/linkedin-pipeline-active.jpg'
    ]
  },
  {
    id: 'global-sales-analysis',
    title: 'Global Sales Analysis — Power BI Executive & Territorial Intelligence Dashboard',
    client: 'Global Retail & E-Commerce Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    category: 'Data Analysis & Power BI',
    role: 'BI & Data Analytics Developer',
    impactMetric: '$1.26M+ Total Sales Tracked',
    metrics: [
      { label: 'Cities Covered', value: '1,268' },
      { label: 'Total Sales', value: '$1.26M+' },
      { label: 'Total Profit', value: '$144.7K' },
      { label: 'Top Category', value: 'Technology' }
    ],
    techStack: ['Power BI', 'DAX', 'Data Modeling', 'Decomposition Tree', 'Geo-Spatial Maps', 'KPI Cards'],
    summary: 'Interactive Power BI executive dashboard analyzing global sales performance, profit margins, and territorial distribution across 1,268 cities. Combines trend analysis, category breakdowns, decomposition trees, and product-level tables to uncover sales drop-offs and guide market expansion.',
    architectureHighlights: [
      'Globally Integrated Sales: Line chart tracks regional sales and profit trends, surfacing declining trajectories that require root-cause investigation.',
      'Category & Sub-Category Analysis: Donut and bar charts compare Technology, Furniture, and Office Supplies, identifying Technology as the top-performing category.',
      'Territorial Intelligence: Geo-spatial map and Decomposition Tree (Country -> State) highlight strongholds in the US and Europe while pinpointing under-penetrated regions.',
      'Product & Order-Level Insights: Granular table tracks Order ID, Order Date, Category, Sales, and Shipping Cost ($136.7K total shipping) for portfolio optimization.'
    ],
    challenge: 'Decision-makers needed a unified view of global sales, profit, and shipping costs to understand why overall sales were trending downward in key regions and which product categories warranted targeted investment.',
    solution: 'Built a dark-themed Power BI executive report featuring real-time KPI cards, monthly sales vs. profit bar charts, a Country-to-State Decomposition Tree, and interactive city/category filters.',
    systemFlow: [
      'KPI Summary Layer: Displays 1,268 Cities, 1.97K Shipping (Last Week), $16.71K (Last 7 Days Sales), $19.4K (Last Day), and $797.04 (Last Week Profit).',
      'Trend & Seasonality Analysis: Monthly bar chart and regional line chart track Sum of Sales vs. Sum of Profit.',
      'Hierarchical Drill-Down: Decomposition Tree breaks down $144,749.86 Sum of Profit by Country and State.',
      'Granular Order Table: Exposes order-level sales and shipping cost metrics for SKU and logistics optimization.'
    ],
    outcomeMetrics: [
      { label: 'Root-Cause Visibility', value: '100%', description: 'Identified declining regional trends for targeted intervention' },
      { label: 'Category Focus', value: 'Technology', description: 'Top-performing segment prioritized for marketing & supply chain spend' },
      { label: 'Expansion Strategy', value: 'Global', description: 'Mapped US & Europe dominance to guide entry into emerging markets' }
    ],
    featured: true,
    githubUrl: 'https://github.com/islamsamyy',
    steps: [
      {
        title: 'Global Sales Analysis Power BI Dashboard',
        description: 'Complete dark-mode Power BI report featuring KPI cards, monthly sales vs. profit bars, category donut chart, Country-to-State decomposition tree, geo map, and order-level table.'
      }
    ],
    galleryImages: [
      '/projects/global-sales-analysis/dashboard-overview.jpg'
    ]
  },
  {
    id: 'telco-customer-churn',
    title: 'Telco Customer Churn Analysis — Python Predictive Modeling & Power BI',
    client: 'Telecommunications Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    category: 'Data Analysis & Power BI',
    role: 'Data Scientist & BI Developer',
    impactMetric: '7,043 Customers Analyzed',
    metrics: [
      { label: 'Total Customers', value: '7,043' },
      { label: 'Gender Split', value: '50.5% M / 49.5% F' },
      { label: 'Modeling', value: 'Python + ML' },
      { label: 'Visualization', value: 'Power BI' }
    ],
    techStack: ['Python', 'Pandas', 'Scikit-Learn', 'Power BI', 'DAX', 'Feature Engineering'],
    summary: 'In-depth customer churn analysis for a telecom company combining Python (data preprocessing, feature engineering, and predictive modeling) with interactive Power BI dashboards to uncover churn drivers and support retention strategies.',
    architectureHighlights: [
      'Python Data Pipeline: Performed data cleaning, missing-value handling, and feature engineering (e.g., tenure categorization into short, long, and very long).',
      'Predictive Modeling: Trained classification models in Python to identify high-risk churn segments and key attrition predictors.',
      'All Customer Profile Dashboard: Visualizes 7,043 customers across Demographics (Gender, SeniorCitizen, Partner, Dependents), Phone Services (InternetService, OnlineSecurity, TechSupport, DeviceProtection, OnlineBackup), and Contracts.',
      'Churned Customer Details Drill-Through: Enables granular inspection of individual churned customer profiles by Customer ID, including contract type, tenure, and payment method.'
    ],
    challenge: 'The telecom provider needed to understand why customers were leaving and which service, contract, or demographic factors most strongly correlated with attrition.',
    solution: 'Combined Python-based preprocessing and predictive modeling with a multi-page Power BI report featuring All Customer Profile, Churned Customer Profile, and Churned Customer Details views.',
    systemFlow: [
      'Data Preprocessing & Feature Engineering (Python): Cleaned raw telecom records and engineered tenure and service-adoption features.',
      'Predictive Churn Modeling (Python): Evaluated key churn drivers such as month-to-month contracts, electronic check payments, and lack of tech support.',
      'Interactive Power BI Reporting: Built multi-page navigation (All Customer Profile, Churned Customer Profile, Churned Customer Details) for executive and operational drill-down.'
    ],
    outcomeMetrics: [
      { label: 'Customer Base', value: '7,043', description: 'Full telecom customer portfolio analyzed across demographics and services' },
      { label: 'Key Churn Drivers', value: 'Identified', description: 'Month-to-month contracts, electronic check, and missing tech support/security' },
      { label: 'Retention Strategy', value: 'Actionable', description: 'Enabled targeted retention offers for high-risk customer segments' }
    ],
    featured: true,
    githubUrl: 'https://github.com/islamsamyy',
    steps: [
      {
        title: 'All Customer Profile Overview',
        description: 'Power BI dashboard showing 7,043 total customers (3,555 Male / 3,488 Female) segmented by demographics, phone & internet services, and contract/payment methods.'
      },
      {
        title: 'Churned Customer Details Drill-Through',
        description: 'Interactive customer-level lookup view displaying Personal Details, Phone Services, Other Details, and Contract attributes for individual churned accounts.'
      }
    ],
    galleryImages: [
      '/projects/telco-customer-churn/all-customer-profile.jpg',
      '/projects/telco-customer-churn/churned-customer-details.jpg'
    ]
  },
  {
    id: 'wirecut-os',
    title: 'WireCut OS — Industrial Operations & Costing Analytics Platform',
    client: 'Maadi Marble',
    companyLogo: 'https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/maadi-logo.png',
    category: 'ERP Systems',
    role: 'Creator & Lead Solutions Architect',
    impactMetric: '28-Channel PLC Telemetry',
    metrics: [
      { label: 'Dashboard Modules', value: '19 Pages' },
      { label: 'PLC Telemetry', value: '28 Channels' },
      { label: 'Costing Engine', value: 'Real-Time' },
      { label: 'Stack', value: 'Next.js + PostgreSQL' }
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Recharts'],
    summary: 'Operations, PLC telemetry, and production costing platform for Maadi Marble multi-wire diamond saw operations. Consolidates machine exports and operator logs into a unified analytics system with real-time utilization, wire wear tracking, energy analytics, and unit costing.',
    architectureHighlights: [
      'Tracks diamond wire consumption (m/m²) across first-use and second-use spools alongside roller groove wear.',
      'Calculates real machine utilization and downtime gaps between consecutive cuts with categorized cause tracking.',
      'Correlates planned cut schedules and wire budgets against actual operator logs and 28-channel sensor telemetry.',
      'Computes actual cost per m² and cost per slab per block tied directly to customer orders.',
      'Validates and archives uploaded machine logs with automated anomaly detection and full audit history.'
    ],
    liveDemoUrl: 'https://wirecut.vercel.app',
    featured: true,
    steps: [
      {
        title: 'Production Dashboard',
        description: 'Executive overview of daily production output, machine utilization rates, and real-time operational KPIs across shifts.'
      },
      {
        title: 'Operations & Cut Tracking',
        description: 'Detailed tracking of individual marble block cuts, slab yields, cycle times, and operator shift logs.'
      },
      {
        title: 'Wires & Diamond Wear',
        description: 'Monitors diamond wire consumption per square meter across first-use and second-use spools alongside roller groove wear.'
      },
      {
        title: 'Machine Health & Telemetry',
        description: 'Live 28-channel PLC sensor telemetry, feed speed, and wire tension monitoring to detect anomalies before a wire snaps.'
      },
      {
        title: 'Energy Analytics',
        description: 'Tracks electrical power consumption per cut and per shift to optimize energy efficiency and accurate unit costing.'
      },
      {
        title: 'Upload Log & CSV Ingestor',
        description: 'Automated ingestion and validation pipeline for machine logs with anomaly flagging and complete audit history.'
      }
    ],
    galleryImages: [
      'https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/ffdbc38d3a544bc6972fcccd0f8d2100.png',
      'https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/c285f87d7aff46aabd93547175640b28.png',
      'https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/aec4682b481140f38b9e5086c8714335.png',
      'https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/456fffa65a1a44dd9ec964328580c824.png',
      'https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/37e0cb72351945999556696b5f600f60.png',
      'https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/f0721e168bdb4e18ac359e0fc80ac3ef.png'
    ],
  },
  {
    id: 'safir-lakehouse',
    title: 'Hospitality Multi-Property ERP & Real-Time Lakehouse',
    client: 'Safir Hotels & Resorts',
    companyLogo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80',
    category: 'Data Engineering',
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
    category: 'ERP Systems',
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
    category: 'Data Engineering',
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
  },
  {
    id: 'safir-hospitality-bi',
    title: 'Safir Hotels — Hospitality KPI & Competitive BI Suite',
    client: 'Safir Hotels & Resorts (Dahab)',
    companyLogo: '/projects/safir-hospitality-bi/safir-kpi-dashboard.jpg',
    category: 'Data Analysis & Power BI',
    role: 'Lead BI & Hospitality Data Engineer',
    impactMetric: '308 Rooms • $7,070 Weekly Food Cost',
    metrics: [
      { label: 'Weekly Food Cost', value: '$7,070' },
      { label: 'Rooms Sold', value: '308' },
      { label: 'Avg Room Rate', value: '13,569' },
      { label: 'Guest Calls', value: '144' },
    ],
    techStack: ['Power BI', 'DAX', 'SQL', 'Excel / Power Query', 'Hospitality KPIs', 'Competitive Intelligence'],
    summary: 'Comprehensive 6-screen Power BI hospitality intelligence suite for Safir Hotels & Resorts covering executive KPIs, Guest Relations (41 housekeeping, 29 room, and 15 food complaints), Food Cost control ($7,070 weekly per person), Front Desk arrivals/departures (289/99), Guest Meal Plans (BB/Hal/HB/SAL), and Competitive Market Share analysis across 6 rival resorts.',
    architectureHighlights: [
      'Guest Relations & Complaints: Tracked 144 total guest calls (60 satisfied), pinpointing 41 housekeeping complaints, 29 room condition complaints, and 15 food complaints for immediate service recovery.',
      'Food Cost & Budget Control: Monitored $7,070 weekly food cost per person across Buffet ($280.97 avg), Cafeteria ($352.03 avg), and Beverage ($264.30 avg) with 0–400 daily cost distribution and over-budget tracking.',
      'Competitive Market Share by Hotel: Benchmarked Safir Dahab Resort (15.77%) against Jaz Dahabaya (22.45%), Ecotel (20.96%), Dahab Lagoon (18.58%), SwissInn (11.22%), and Retac (11.02%).',
      'Average Room Rate & Rooms Sold: Analyzed 308 rooms sold and 13,569.15 average room rate across properties to enable dynamic pricing and targeted occupancy campaigns.',
      'Meal Plan & Front Desk Telemetry: Tracked 289 expected arrivals, 99 expected departures, and daily GIH BB (509), HB (175), Dinner (357), and Lunch (201) meal-plan volumes.',
    ],
    liveDemoUrl: 'https://github.com/islamsamyy',
    featured: true,
    challenge: 'Hotel operations lacked unified visibility across guest satisfaction, F&B cost overruns, front-desk occupancy, and regional competitor market share, making it difficult to prioritize housekeeping improvements or optimize dynamic room pricing.',
    solution: 'Engineered a 6-dashboard Power BI executive suite integrating Front Desk PMS, Guest Relations call logs, F&B cost ledgers, Meal Plan forecasts, and STR-style competitive market-share benchmarks into a single interactive decision cockpit.',
    keyDecisions: [
      {
        title: 'Unified 6-Dashboard Executive Cockpit',
        rationale: 'Separated operational views (Front Desk, Meal Plan, Food Cost, Guest Relations) from executive strategy (Safir KPI & Competitive Analysis) so department heads and general managers each have tailored KPIs.',
        tradeOff: 'Requires standardized daily exports from PMS and F&B cost systems.',
      },
      {
        title: 'Complaint Root-Cause Decomposition Trees',
        rationale: 'Used Power BI decomposition trees by Room Number and Complaint Category (Housekeeping: 41, Rooms: 29, Food: 15) to isolate recurring room-level maintenance issues.',
        tradeOff: 'Depends on consistent front-desk call logging by guest relations staff.',
      },
    ],
    systemFlow: [
      '1. Guest Relations Tracking: 144 total calls, 60 satisfied guests, 41 housekeeping complaints, 29 room complaints, and 15 food complaints.',
      '2. Food Cost Monitoring: $7,070 weekly food cost per person with 0–400 cost distribution across Cafeteria, Buffet, and Beverage.',
      '3. Competitive Market Share: Pie chart benchmarking across 6 hotels (11.02%–22.45% / 11.24%–23.95%).',
      '4. Revenue & Occupancy: Average Room Rate (13,569.15) and Rooms Sold (308) with dynamic pricing insights.',
      '5. Daily Meal Plan Operations: GIH BB, GIH Hal, GIH HB, and GIH SAL tracked by day of week (509 breakfast, 201 lunch, 357 dinner).',
    ],
    outcomeMetrics: [
      { label: 'Housekeeping Complaints', value: '41', description: 'Top priority service-recovery area identified via Guest Relations decomposition.' },
      { label: 'Room Complaints', value: '29', description: 'Second-largest complaint category isolated down to specific room numbers.' },
      { label: 'Weekly Food Cost', value: '$7,070', description: 'Total food cost this week per person with daily over-budget tracking.' },
      { label: 'Rooms Sold', value: '308', description: 'Tracked alongside Average Room Rate (13,569.15) and 289 weekly arrivals.' },
    ],
    galleryImages: [
      '/projects/safir-hospitality-bi/safir-kpi-dashboard.jpg',
      '/projects/safir-hospitality-bi/guest-relation-dashboard.jpg',
      '/projects/safir-hospitality-bi/food-cost-dashboard.jpg',
      '/projects/safir-hospitality-bi/front-desk-dashboard.jpg',
      '/projects/safir-hospitality-bi/guest-meal-plan-dashboard.jpg',
      '/projects/safir-hospitality-bi/competitive-analysis-dashboard.jpg',
    ],
    steps: [
      { title: '1. Guest Relations & Service Recovery', description: 'Prioritize the 41 housekeeping complaints and 29 room complaints to boost guest satisfaction and retention.' },
      { title: '2. F&B Cost & Distribution Control', description: 'Monitor the $7,070 weekly food cost per person and 0–400 cost distribution to curb daily over-budget spending.' },
      { title: '3. Market Share & Dynamic Pricing', description: 'Leverage hotel market share (11.24%–23.95%), Average Room Rate, and Rooms Sold (308) for targeted campaigns.' },
      { title: '4. Daily Meal Plan & Front Desk Sync', description: 'Track GHI BB, GHI Hal, GHI HB, and GHI SAL by day alongside 289 expected arrivals and 99 departures.' },
    ],
    readmeContent: `# Safir Hotels & Resorts — Hospitality KPI & Competitive BI Suite

## Executive Summary
A 6-dashboard Power BI hospitality analytics suite built for **Safir Hotels & Resorts**, unifying **Guest Relations**, **Food Cost Control**, **Front Desk Operations**, **Guest Meal Plans**, **Executive KPIs**, and **Competitive Market Share Analysis**.

---

## Key Analytical Insights & Recommendations

### 1. Guest Relations & Complaint Analysis
- **Complaints about Housekeeping Services:** \`41\`
- **Complaints about Rooms:** \`29\`
- **Complaints about Food:** \`15\`
- **Total Calls:** \`144\` (**Satisfied Guests:** \`60\`)
- **Insights:** Housekeeping services are the most significant concern, followed by room conditions and food quality. Addressing these complaints should be a top priority to enhance guest satisfaction and retention.

### 2. Total Food Cost
- **Total Food Cost This Week Per Person:** \`$7,070\`
- **Average Daily Costs:** Buffet \`$280.97\` | Cafeteria \`$352.03\` | Beverage \`$264.30\`
- **Insights:** Monitoring food costs helps in budget management and maintaining profitability. High food costs per person may indicate inefficiencies or the need for menu adjustments.

### 3. Cost Distribution
- **Metrics:** Bar chart showing cost distribution across Cafeteria, Buffet, and Beverage categories, with values ranging from \`0\` to \`400\`.
- **Insights:** Analyzing cost distribution reveals areas with excessive spending, offering opportunities for targeted cost-saving measures.

### 4. Market Share by Hotel
- **Pie Chart Distribution:** \`11.24%\` | \`11.72%\` | \`15.77%\` | \`14.88%\` | \`22.44%\` | \`23.95%\`
- **Insights:** Market share varies significantly among competing hotels. Focused marketing and promotional strategies can help boost the market share of underperforming properties.

### 5. Average Room Rate
- **Insights:** Competitive room rates are essential for attracting guests. Ensure that room rates reflect the value offered and consider dynamic pricing strategies to maximize revenue.

### 6. Rooms Sold
- **Rooms Sold:** \`308\` | **Arrivals Expected This Week:** \`289\` | **Departures Expected:** \`99\`
- **Insights:** Tracking room sales helps in understanding occupancy rates and revenue generation. Develop targeted campaigns to boost room sales, especially for hotels with lower occupancy rates.

### 7. GHI BB, GHI Hal, GHI HB, and GHI SAL by Day
- **Weekly Meal Plan Volume:** \`509\` Breakfast (BB) | \`201\` Lunch | \`357\` Dinner | \`175\` Half Board (HB)
- **Insights:** Daily tracking of these metrics reveals trends and patterns, helping optimize F&B operations and guest experiences on specific days of the week.
`,
  },
  {
    id: 'north-hejaz-hr-bi',
    title: 'North Hejaz HR — Recruitment Platform & Power BI Analytics Suite',
    client: 'North Hejaz HR Co. (شركة شمال الحجاز للتوظيف)',
    companyLogo: '/projects/north-hejaz-hr-bi/web-platform-hero.jpg',
    category: 'Data Analysis & Power BI',
    role: 'Lead Full-Stack & BI Architect',
    impactMetric: '2.0M SAR Revenue • 288 Clients',
    metrics: [
      { label: 'Total Revenue', value: '2.0M SAR' },
      { label: 'Total Clients', value: '288' },
      { label: 'Submissions', value: '940 Done' },
      { label: 'Avg Client Rev', value: '5.46K' },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Power BI', 'DAX', '12-Table Star Schema'],
    summary: 'End-to-end Saudi Vision 2030 recruitment web platform and 4-screen Power BI executive intelligence suite for North Hejaz HR Co. (شركة شمال الحجاز للتوظيف). Unifies Silver/Gold/Diamond subscription tiers, Mada & bank-transfer revenue tracking (2.0M SAR), 288 candidate/client profiles, and 940+ job submissions across Riyadh, Jeddah, Madinah, Dammam, and Tabuk.',
    architectureHighlights: [
      'Full-Stack Recruitment Portal (React / TypeScript): Built an RTL Arabic web application featuring Silver, Gold, and Diamond package selection, interactive upgrade modals, comparison tables, and testimonials.',
      'Revenue & Payments BI (2.0M SAR): Tracked 96 Gold, 98 Silver, and 94 Diamond packages with 85.34% Mada card vs bank-transfer breakdown and regional revenue (Riyadh 930K, Madinah 324K, Jeddah 4K).',
      'Client & Candidate Demographics: Analyzed 288 clients (261 Saudi, 26 Non-Saudi), active/inactive ratios, academic specializations (Business Admin, Marketing, Accounting, Law), and CV approval rates.',
      'Submissions & Employment Funnel: Monitored 940 completed submissions and 760 remaining client quota across Riyadh, Dammam, and Jeddah with employee-level performance slicing.',
      '12-Table Power BI Star Schema: Modeled Date_Table, Package Consumption, Subscriptions, Packages, Submissions, Final Employment, CVs, Clients, Payments, Interviews, and Employees.',
    ],
    liveDemoUrl: 'https://github.com/islamsamyy/SHMAL-ELHEJAZ',
    featured: true,
    challenge: 'North Hejaz HR Co. needed both a modern Arabic-first recruitment web portal for Saudi job seekers and an executive BI cockpit to track package consumption, Mada payment flows, CV approvals, and city-level placement performance.',
    solution: 'Delivered a React/TypeScript recruitment storefront paired with a 12-table Power BI star-schema analytics suite covering Overview, Revenue & Payments, Client Demographics, and Submissions & Interviews.',
    keyDecisions: [
      {
        title: '12-Table Normalized Power BI Star Schema',
        rationale: 'Separated transactional tables (Payments, Submissions, Interviews, Package Consumption) from dimension tables (Clients, Packages, Employees, Date_Table) for fast DAX aggregation.',
        tradeOff: 'Requires scheduled refresh synchronization between the web portal database and Power BI.',
      },
      {
        title: 'RTL-First Arabic Web Experience',
        rationale: 'Engineered the recruitment portal with native Arabic typography, Saudi Vision 2030 branding, and instant package-upgrade modals.',
        tradeOff: 'Custom modal and toast state management maintained in React.',
      },
    ],
    systemFlow: [
      '1. Candidate Onboarding: Candidates browse Silver, Gold, and Diamond packages on the North Hejaz React/TypeScript web platform.',
      '2. Payment & Subscription Ingestion: Mada (85.34%) and bank-transfer payments are recorded into the Payments & Subscriptions tables.',
      '3. CV Review & Submissions: 940 completed submissions and 760 remaining quota tracked by city (Riyadh, Jeddah, Madinah, Dammam, Tabuk).',
      '4. Executive Power BI Cockpit: 4 interactive dashboards (Overview, Payments, Clients, Submissions) surface 2.0M SAR revenue and 5.46K avg client revenue.',
    ],
    outcomeMetrics: [
      { label: 'Total Revenue', value: '2.0M SAR', description: 'Tracked across 288 clients with 85.34% Mada payment adoption.' },
      { label: 'Completed Submissions', value: '940', description: 'Alongside 760 remaining client package submissions.' },
      { label: 'Packages Sold', value: '288', description: '96 Gold, 98 Silver, and 94 Diamond recruitment packages.' },
      { label: 'Data Model', value: '12 Tables', description: 'Full Power BI star schema with custom DAX measures.' },
    ],
    galleryImages: [
      '/projects/north-hejaz-hr-bi/web-platform-hero.jpg',
      '/projects/north-hejaz-hr-bi/revenue-payments-dashboard.jpg',
      '/projects/north-hejaz-hr-bi/client-analytics-dashboard.jpg',
      '/projects/north-hejaz-hr-bi/submissions-tracking-dashboard.jpg',
      '/projects/north-hejaz-hr-bi/powerbi-data-model.jpg',
    ],
    steps: [
      { title: '1. Recruitment Web Portal', description: 'Saudi Vision 2030 RTL React/TypeScript platform with Silver, Gold, and Diamond career packages.' },
      { title: '2. Revenue & Mada Payments BI', description: '2.0M SAR revenue tracking across Riyadh (930K), Madinah (324K), and Jeddah with 85.34% Mada share.' },
      { title: '3. Client & CV Analytics', description: '288 clients segmented by Saudi/Non-Saudi nationality, degree major, and CV acceptance status.' },
      { title: '4. Submissions & Star Schema', description: '940 completed submissions and 760 remaining quota modeled across a 12-table Power BI schema.' },
    ],
    readmeContent: `# North Hejaz HR Co. (شركة شمال الحجاز للتوظيف) — Recruitment Platform & Power BI Analytics Suite

## Executive Summary
An end-to-end **Saudi Vision 2030** recruitment web platform and **Power BI Executive Analytics Suite** built for **North Hejaz HR Co. (شركة شمال الحجاز للتوظيف)**. The solution combines a React/TypeScript Arabic-first web portal with a **12-table Power BI star-schema** cockpit tracking **2.0M SAR in revenue**, **288 clients**, and **940+ job submissions**.

---

## Platform & Dashboard Showcase

### 1. North Hejaz Recruitment Web Platform (React / TypeScript)
- Arabic RTL landing experience aligned with **Saudi Vision 2030**.
- Interactive **Silver**, **Gold**, and **Diamond** career package cards, comparison tables, and instant upgrade modals.

### 2. Revenue & Payments Dashboard
- **Total Revenue:** \`2.0M SAR\` | **Avg Revenue per Client:** \`5.46K\`
- **Package Breakdown:** \`96 Gold\` | \`98 Silver\` | \`94 Diamond\`
- **Payment Methods:** \`85.34% Mada\` vs Bank Transfer
- **Regional Revenue:** Riyadh (\`930K\`), Madinah (\`324K\`), Jeddah (\`4K\`)

### 3. Client & Candidate Demographics Dashboard
- **Total Clients:** \`288\` (\`242\` Inactive, \`41\` Active) | **Avg Package Price:** \`1.63K\`
- **Nationality Split:** \`261 Saudi\` vs \`26 Non-Saudi\`
- **Top Cities:** Riyadh (\`78\`), Jeddah (\`19\`), Tabuk (\`9\`)
- **Education & CV Status:** Business Administration, Marketing, Accounting, and Law degree distributions with CV acceptance/rejection tracking.

### 4. Submissions & Operations Dashboard
- **Completed Submissions:** \`940\` | **Remaining Client Quota:** \`760\`
- City-level submission velocity across Riyadh, Dammam, and Jeddah with employee-level filtering.

### 5. Power BI 12-Table Star Schema
- \`Date_Table\`, \`العملاء\` (Clients), \`الباقات\` (Packages), \`اشتراك الباقات\` (Subscriptions), \`استهلاك الباقة\` (Package Consumption), \`التقديمات\` (Submissions), \`المدفوعات\` (Payments), \`المقابلات\` (Interviews), \`التوظيف النهائي\` (Final Employment), \`السير الذاتية\` (CVs), \`الموظفين\` (Employees), and \`MEASURES\`.
`,
  },
  {
    id: 'hr-attrition-bi',
    title: 'Human Resource Analytics — Workforce Attrition & Compensation BI',
    client: 'Enterprise HR Intelligence (Power BI)',
    companyLogo: '/projects/hr-attrition-bi/hr-dashboard-overview.jpg',
    category: 'Data Analysis & Power BI',
    role: 'Lead BI & People Analytics Engineer',
    impactMetric: '1,470 Employees • 3.31x Attrition Driver',
    metrics: [
      { label: 'Total Employees', value: '1,470' },
      { label: 'Retained Staff', value: '1,233' },
      { label: 'Attrition Count', value: '237' },
      { label: 'Top Driver', value: '3.31x OT' },
    ],
    techStack: ['Power BI', 'DAX', 'Key Influencers AI', 'People Analytics', 'SQL', 'Data Storytelling'],
    summary: 'Interactive Power BI People Analytics & Attrition Intelligence dashboard evaluating 1,470 employees (1,233 retained vs 237 attrition). Uses Power BI AI Key Influencers to quantify attrition multipliers (OverTime 3.31x, Tenure <= 1 yr 2.74x, Low Job Satisfaction 1.79x), department payroll distribution (R&D 12.7M, Sales 6.5M, HR 3.8M), and age demographics (peak at age 35).',
    architectureHighlights: [
      'AI Key Influencers for Attrition: Identified OverTime = Yes as the #1 attrition driver (3.31x higher likelihood), followed by YearsAtCompany <= 1 (2.74x) and JobSatisfaction <= 1 (1.79x).',
      'Workforce Composition & Gender Split: Tracked 1,470 total employees (1,233 retained, 237 attrition) with a 60% Male (882) / 40% Female (588) gender breakdown.',
      'Monthly Income by Department: Visualized payroll allocation across Research & Development (~12.7M), Sales (~6.5M), and Human Resources (~3.8M) to align budgets with innovation priorities.',
      'Employee Age Distribution: Histogram spanning ages 18–60 showing a strong mid-career concentration in the 30–40 range, peaking around age 35.',
      'Tenure & Attrition Correlation: Analyzed attrition percentages across YearsAtCompany (0–40 years) to pinpoint early-career retention risks.',
    ],
    liveDemoUrl: 'https://github.com/islamsamyy',
    featured: true,
    challenge: 'HR leadership lacked visibility into why employees were leaving, how overtime and job satisfaction impacted turnover, and whether departmental payroll aligned with strategic R&D priorities.',
    solution: 'Built an executive Power BI People Analytics dashboard combining demographic histograms, departmental compensation breakdowns, and Power BI AI Key Influencers to surface actionable retention strategies.',
    keyDecisions: [
      {
        title: 'Power BI AI Key Influencers Integration',
        rationale: 'Embedded native Key Influencers visuals to automatically rank statistical attrition multipliers (3.31x OverTime, 2.74x Tenure, 1.79x Satisfaction) instead of relying on static correlations.',
        tradeOff: 'Requires clean categorical encoding of survey and HRIS attributes.',
      },
      {
        title: 'Departmental Payroll & Age Histograms',
        rationale: 'Paired departmental monthly income bars with an 18–60 age distribution histogram to connect compensation planning with workforce lifecycle stages.',
        tradeOff: 'Focused on monthly base income rather than variable bonus structures.',
      },
    ],
    systemFlow: [
      '1. HRIS Data Ingestion: Loaded 1,470 employee records covering demographics, tenure, overtime, job satisfaction, and monthly income.',
      '2. KPI & Demographic Modeling: Computed retention (1,233), attrition (237), gender split (882M / 588F), and age histogram (peak age 35).',
      '3. Departmental Payroll Analysis: Aggregated Sum of MonthlyIncome across R&D (12.7M), Sales (6.5M), and HR (3.8M).',
      '4. AI Key Influencers: Ranked attrition multipliers (OverTime 3.31x, Tenure <= 1 yr 2.74x, JobSatisfaction <= 1 1.79x) for targeted retention.',
    ],
    outcomeMetrics: [
      { label: 'Workforce Analyzed', value: '1,470', description: '1,233 retained employees and 237 attrition cases.' },
      { label: 'OverTime Multiplier', value: '3.31x', description: 'Employees working overtime are 3.31x more likely to leave.' },
      { label: 'R&D Monthly Payroll', value: '12.7M', description: 'Highest departmental investment, followed by Sales (6.5M) and HR (3.8M).' },
      { label: 'Peak Workforce Age', value: '35 yrs', description: 'Core mid-career concentration in the 30–40 age bracket.' },
    ],
    galleryImages: [
      '/projects/hr-attrition-bi/hr-dashboard-overview.jpg',
      '/projects/hr-attrition-bi/key-influencers-attrition.jpg',
      '/projects/hr-attrition-bi/monthly-income-department.jpg',
      '/projects/hr-attrition-bi/employee-age-distribution.jpg',
      '/projects/hr-attrition-bi/hr-analysis-cover.jpg',
    ],
    steps: [
      { title: '1. Workforce & Attrition Overview', description: '1,470 total employees (1,233 retained, 237 attrition) with 60% Male / 40% Female split.' },
      { title: '2. AI Key Influencers', description: 'OverTime (3.31x), Tenure <= 1 yr (2.74x), and Low Job Satisfaction (1.79x) identified as top drivers.' },
      { title: '3. Departmental Income Analysis', description: 'Monthly income distributed across R&D (12.7M), Sales (6.5M), and Human Resources (3.8M).' },
      { title: '4. Age & Tenure Distribution', description: '18–60 age histogram peaking at age 35, guiding mid-career retention and resource allocation.' },
    ],
    readmeContent: `# Human Resource Dashboard Analysis — Workforce Attrition & Compensation BI

## Executive Summary
An interactive **Power BI People Analytics** suite analyzing **1,470 employees** (\`1,233\` retained vs \`237\` attrition) to uncover the root causes of employee turnover, departmental compensation allocation, and workforce age dynamics.

---

## Key Analytical Findings

### 1. Key Influencers (Employee Attrition Drivers)
- **OverTime = Yes:** \`3.31x\` more likely to result in attrition.
- **YearsAtCompany <= 1:** \`2.74x\` more likely to result in attrition.
- **JobSatisfaction <= 1:** \`1.79x\` more likely to result in attrition.
- **Conclusion:** Addressing overtime, early-tenure onboarding, job satisfaction, and work-life balance can significantly reduce attrition and foster a more engaged workforce.

### 2. Workforce Overview & Gender Split
- **Total Employees:** \`1,470\`
- **Retained Employees:** \`1,233\` | **Attrition:** \`237\`
- **Gender Distribution:** \`882 Male (60%)\` | \`588 Female (40%)\`

### 3. Sum of Monthly Income by Department
- **Research & Development:** \`~12.7M\` (highest investment, reflecting innovation & product focus)
- **Sales:** \`~6.5M\`
- **Human Resources:** \`~3.8M\`

### 4. Count of Employee by Age
- **Range:** \`18\` to \`60\` years
- **Key Insight:** High concentration in the \`30–40\` age range, peaking around **age 35**, indicating a predominantly mid-career workforce.
`,
  },
  {
    id: 'nexa-whatsapp-connector',
    title: 'NexaWhatsApp Connector — n8n Growth Hacking & AI Sales Agent',
    client: 'Nexalytix Growth Hacking Tools (Series 2–7)',
    companyLogo: '/projects/nexa-whatsapp-connector/n8n-workflow-architecture.jpg',
    category: 'AI & Machine Learning',
    role: 'Growth Automation & AI Systems Architect',
    impactMetric: '500+ Leads • Zero Manual Effort',
    metrics: [
      { label: 'Leads Processed', value: '500+' },
      { label: 'Automation', value: 'n8n + AI' },
      { label: 'Messaging API', value: 'WA Cloud' },
      { label: 'Memory', value: 'Postgres' },
    ],
    techStack: ['n8n', 'WhatsApp Cloud API', 'Google Sheets', 'Groq LLM', 'PostgreSQL', 'Supabase'],
    summary: 'Smart growth-hacking automation system built with n8n for Nexalytix. Automatically reads 500+ campaign leads from Google Sheets, generates personalized Icebreaker messages based on column data, dispatches them via WhatsApp Business Cloud API, tracks Sent/Failed status back in the sheet, and routes incoming replies to an AI Sales Agent (Groq + Postgres Chat Memory + Supabase).',
    architectureHighlights: [
      'Automated Google Sheets Lead Ingestion: Connects directly to campaign spreadsheets (Name, Category, Rating, Website, Phone, Address, Query, Status) with zero manual CSV uploads.',
      'Dynamic Personalized Icebreaker Engine: Uses n8n Loop Over Items & Edit Fields to craft tailored outreach messages per lead category and business context.',
      'WhatsApp Business Cloud API Dispatch: Sends messages at scale with rate-limit-safe Wait nodes and automatic Sent/Failed status write-back to Google Sheets.',
      'NexaSalesAgent (AI Reply Handler): Routes incoming WhatsApp text/voice replies through a Switch node to an AI Tools Agent powered by Groq Chat Model, Postgres Chat Memory, and Supabase.',
      'Zero SaaS Bottlenecks: Eliminates monthly per-seat fees, strict message caps, and buggy third-party outreach tools.',
    ],
    liveDemoUrl: 'https://github.com/islamsamyy',
    featured: true,
    challenge: 'After collecting 500+ leads from multiple campaigns in Google Sheets, reaching out to each lead with a personalized Icebreaker without manual work or errors became a major bottleneck. Off-the-shelf tools had strict message limits, high monthly fees, manual CSV uploads, and slow/buggy execution.',
    solution: 'Engineered NexaWhatsApp Connector in n8n: a dual-branch automation combining scheduled/real-time Google Sheets outreach via WhatsApp Cloud API with an intelligent Groq-powered NexaSalesAgent backed by Postgres Chat Memory and Supabase.',
    keyDecisions: [
      {
        title: 'n8n Self-Hosted Orchestration over SaaS Outreach Tools',
        rationale: 'Eliminated monthly SaaS fees, message caps, and manual CSV exports while gaining full control over rate-limiting (Wait nodes) and status write-backs.',
        tradeOff: 'Requires maintaining an n8n instance and Meta WhatsApp Cloud API webhook credentials.',
      },
      {
        title: 'Stateful AI Sales Agent (Groq + Postgres + Supabase)',
        rationale: 'Connected incoming WhatsApp replies to NexaSalesAgent with Postgres Chat Memory and Supabase pricing/client tools so leads receive instant, context-aware responses.',
        tradeOff: 'Requires structured Supabase tables (nexalytixpricinglist, client details) for accurate tool calling.',
      },
    ],
    systemFlow: [
      '1. Lead Ingestion: Google Sheets node reads 500+ campaign leads (Name, Category, Rating, Website, Phone, Address, Status).',
      '2. Batch Loop & Personalization: Loop Over Items + Edit Fields generate a custom Icebreaker per lead.',
      '3. WhatsApp Cloud Dispatch & Tracking: Sends via WhatsApp Business Cloud API, updates Sent/Failed status in Google Sheets, and pauses via Wait node.',
      '4. AI Sales Agent Reply Loop: Incoming WhatsApp replies hit WhatsApp Trigger1 -> Switch (text/voice) -> NexaSalesAgent (Groq + Postgres Memory + Supabase) -> WhatsApp reply.',
    ],
    outcomeMetrics: [
      { label: 'Campaign Leads', value: '500+', description: 'Automated personalized Icebreaker outreach from Google Sheets.' },
      { label: 'SaaS Cost', value: '$0 / mo', description: 'Replaced expensive, rate-limited third-party WhatsApp tools.' },
      { label: 'Status Tracking', value: 'Real-Time', description: 'Automatic Sent/Failed status write-back to the source Google Sheet.' },
      { label: 'AI Reply Agent', value: '24/7', description: 'Groq-powered NexaSalesAgent with Postgres memory & Supabase tools.' },
    ],
    galleryImages: [
      '/projects/nexa-whatsapp-connector/n8n-workflow-architecture.jpg',
      '/projects/nexa-whatsapp-connector/google-sheets-leads.jpg',
    ],
    steps: [
      { title: '1. Google Sheets Connection', description: 'Automatically reads 500+ leads and column metadata with zero manual CSV uploads.' },
      { title: '2. Personalized Icebreaker', description: 'Generates tailored outreach messages per lead category, rating, and business profile.' },
      { title: '3. WhatsApp Cloud API & Tracking', description: 'Sends messages reliably and writes Sent/Failed status back to the same Google Sheet.' },
      { title: '4. NexaSalesAgent AI Follow-Up', description: 'Handles incoming replies autonomously using Groq LLM, Postgres Chat Memory, and Supabase.' },
    ],
    readmeContent: `# NexaWhatsApp Connector — What Happens When Data Science Meets Growth Hacking and n8n?
*My Journey to Develop Nexalytix Growth Hacking Tools (2–7)*

## The Bottleneck
بعد ما جمعت **+500 lead** من حملات مختلفة، وصلت لأول نقطة bottleneck:
إزاي أبدأ التواصل مع كل lead برسالة ذكية مخصصة (**Icebreaker**).

كنت محتاج **Smart Automation System**:
- يقرأ الـ **Google Sheet**
- يختار لكل lead الرسالة المناسبة
- ويبعتهاله على **WhatsApp** من غير تدخل يدوي أو أخطاء

جربت tools جاهزة، لكن كلهم عندهم limitations:
- Message limits
- Monthly fees
- Manual CSV uploads
- Slow or buggy execution

هنا كان لازم يكون في حل لـ **Nexalytix**.

---

## The Solution: NexaWhatsApp Connector (Built with n8n)

### Core Capabilities
1. **Automatically connects to your Google Sheet** — Reads lead rows (\`Name\`, \`Category\`, \`countryCode\`, \`Rating\`, \`website\`, \`phone\`, \`address\`, \`query\`, \`status\`).
2. **Personalized Icebreaker Generation** — Uses column-driven logic to craft a tailored message for each lead.
3. **WhatsApp Cloud API Dispatch** — Sends messages reliably through the official WhatsApp Business Cloud API with controlled batching (\`Loop Over Items\` + \`Wait\`).
4. **Real-Time Status Tracking** — Tracks \`Sent\` / \`Failed\` status and updates it directly in the same Google Sheet.
5. **Fully Automated** — Runs daily on schedule or in real time.

---

## AI Reply & Sales Agent Architecture (\`NexaSalesAgent\`)
When a lead replies on WhatsApp:
- **WhatsApp Trigger** -> **Switch** (Text / Voice) -> **Merge** -> **NexaSalesAgent (Tools Agent)**
- **LLM:** Groq Chat Model
- **Memory:** Postgres Chat Memory
- **Tools:** \`nexalytixpricinglist\`, \`addclientdetails\`, \`Supabase\`, \`Google Sheets\`, and \`Think\`
- **Response:** Dispatched back automatically via WhatsApp Business Cloud API.
`,
  },
  {
    id: 'adventureworks-sales-bi',
    title: 'AdventureWorksDW2019 — Enterprise Sales, Product & Customer BI Suite',
    client: 'AdventureWorks Enterprise Analytics (SQL Server & Power BI)',
    companyLogo: '/projects/adventureworks-sales-bi/01-dashboards-overview.jpg',
    category: 'Data Analysis & Power BI',
    role: 'Lead BI & SQL Data Warehouse Engineer',
    impactMetric: '$22.24M Sales • 105.46% Budget Ratio',
    metrics: [
      { label: 'Actual Sales', value: '$22.24M' },
      { label: 'Budget Target', value: '$21.10M' },
      { label: 'Sales Variance', value: '+$1.14M' },
      { label: 'Budget Ratio', value: '105.46%' },
    ],
    techStack: ['SQL Server (SSMS)', 'T-SQL', 'Power BI', 'DAX', 'Star Schema', 'AdventureWorksDW2019'],
    summary: 'End-to-end SQL Server (AdventureWorksDW2019) to Power BI enterprise sales intelligence suite. Tracks $22,239,730 in actual sales against a $21,100,000 budget (+$1,139,730 variance / 105.46% budget utilization) across 3 interactive dashboards: Sales Overview, Product Overview, and Customer Overview.',
    architectureHighlights: [
      'Dynamic T-SQL Data Cleaning (SSMS): Cleaned FactInternetSales using LEFT(OrderDateKey, 4) >= YEAR(GETDATE()) - 2 for rolling 2-year automatic refreshes.',
      'Star Schema Data Modeling: Connected DIM_CUSTOMER (CustomerKey) and DIM_PRODUCT (ProductKey) to FactInternetSales and FactBudget.',
      'Sales vs Budget KPIs: $22,239,730 Actual Sales vs $21,100,000 Budget (+$1,139,730 positive variance, 105.46% Sales-to-Budget Ratio).',
      'Product Category & Top Sellers: Bikes (95.32%), Accessories (3.15%), Clothing (1.5%), led by Mountain-200 series.',
      'Customer & Geographic Insights: Ranked Top Ten Customers (Jordan Turner, Jessica Shaw) with gender split, monthly trends, and interactive 2019–2022 slicers.',
    ],
    liveDemoUrl: 'https://github.com/islamsamyy',
    featured: true,
    challenge: 'Leadership lacked clarity on actual-vs-budget performance, monthly sales variance, top-performing products and customers, and regional/category revenue distribution across multi-year AdventureWorksDW2019 data.',
    solution: 'Built a 7-stage SQL-to-Power BI pipeline: cleaning FactInternetSales in SSMS, modeling a clean star schema (DIM_CUSTOMER, DIM_PRODUCT, FactInternetSales, FactBudget), writing DAX variance measures, and delivering 3 executive dashboards.',
    keyDecisions: [
      {
        title: 'Dynamic Rolling 2-Year SQL Filter',
        rationale: 'Used LEFT(OrderDateKey, 4) >= YEAR(GETDATE()) - 2 in T-SQL instead of hardcoded years so the warehouse query stays automatically up to date.',
        tradeOff: 'Assumes OrderDateKey follows YYYYMMDD integer formatting.',
      },
      {
        title: '3-Dashboard Modular Cockpit',
        rationale: 'Split Sales Overview, Product Overview, and Customer Overview with synchronized Year (2019–2022), Month, City, and Category slicers.',
        tradeOff: 'Requires consistent cross-filtering rules across FactInternetSales and FactBudget.',
      },
    ],
    systemFlow: [
      '1. SQL Cleaning (SSMS): Filtered FactInternetSales for rolling 2-year window and removed unused columns.',
      '2. Data Transformation & Integration: Standardized DIM_CUSTOMER, DIM_PRODUCT, and FactBudget tables.',
      '3. Power BI Star Schema: Linked CustomerKey and ProductKey relationships to FactInternetSales.',
      '4. DAX Measures & Visuals: Computed Sales ($22.24M), Budget ($21.10M), Variance (+$1.14M), and 105.46% Ratio.',
    ],
    outcomeMetrics: [
      { label: 'Actual Sales', value: '$22.24M', description: 'Total internet sales ($22,239,730) across Bikes, Accessories, and Clothing.' },
      { label: 'Sales Variance', value: '+$1.14M', description: 'Exceeded the $21.10M budget by $1,139,730 (105.46% ratio).' },
      { label: 'Bikes Share', value: '95.32%', description: 'Dominant product category, followed by Accessories (3.15%) and Clothing (1.5%).' },
      { label: 'Pipeline Stages', value: '7 Stages', description: 'SQL Cleaning -> Transformation -> Integration -> Prep -> Power BI -> Model -> DAX.' },
    ],
    galleryImages: [
      '/projects/adventureworks-sales-bi/01-dashboards-overview.jpg',
      '/projects/adventureworks-sales-bi/07-sales-overview-kpis.jpg',
      '/projects/adventureworks-sales-bi/08-category-breakdown.jpg',
      '/projects/adventureworks-sales-bi/09-top-products-customers.jpg',
      '/projects/adventureworks-sales-bi/10-sales-vs-budget-trend.jpg',
      '/projects/adventureworks-sales-bi/04-sql-cleaning.jpg',
      '/projects/adventureworks-sales-bi/05-dim-customer.jpg',
      '/projects/adventureworks-sales-bi/06-dim-product.jpg',
    ],
    steps: [
      { title: '1. SQL Cleaning & Integration', description: 'Cleaned AdventureWorksDW2019.dbo.FactInternetSales in SSMS with dynamic rolling-year T-SQL.' },
      { title: '2. Star Schema Modeling', description: 'Connected DIM_CUSTOMER, DIM_PRODUCT, FactInternetSales, and FactBudget in Power BI.' },
      { title: '3. Sales vs Budget Variance', description: 'Tracked $22.24M Actual Sales vs $21.10M Budget (+$1.14M variance / 105.46% ratio).' },
      { title: '4. Product & Customer Drilldown', description: 'Identified Mountain-200 series, Bikes (95.32%), and Top 10 Customers (Jordan Turner, Jessica Shaw).' },
    ],
    readmeContent: `# AdventureWorksDW2019 — Enterprise Sales, Product & Customer BI Suite

## Executive Summary
An end-to-end **SQL Server (SSMS)** and **Power BI** analytics suite built on \`AdventureWorksDW2019\`, tracking **$22,239,730 in actual sales** against a **$21,100,000 budget** (**+$1,139,730 variance** / **105.46% Sales-to-Budget Ratio**).

---

## 7-Stage Data Engineering & BI Pipeline
1. **Data Cleaning in SQL:** Cleaned \`FactInternetSales\` using \`LEFT(OrderDateKey, 4) >= YEAR(GETDATE()) - 2\` for automatic rolling-year updates.
2. **Data Transformation:** Structured and standardized raw tables into analysis-ready formats.
3. **Data Integration:** Combined multiple sales, product, customer, and budget sources.
4. **Data Preparation:** Finalized datasets for Power BI ingestion.
5. **Inserting Data into Power BI:** Loaded cleaned SQL views into Power BI Desktop.
6. **Creating Model Tables:** Built star-schema relationships (\`DIM_CUSTOMER\` via \`CustomerKey\`, \`DIM_PRODUCT\` via \`ProductKey\`).
7. **DAX Formulas:** Authored calculated measures for Sales, Budget, Variance, and Sales-to-Budget Ratio.

---

## Key Business Insights
- **Sales KPI:** \`$22,239,730\` Actual vs \`$21,100,000\` Budget (**105.46%**)
- **Category Breakdown:** Bikes (\`95.32%\`), Accessories (\`3.15%\`), Clothing (\`1.5%\`)
- **Top Products:** \`Mountain-200\` series leads unit and revenue volume
- **Top Customers:** Jordan Turner, Jessica Shaw, and top 10 high-value accounts
`,
  },
  // --- IMPORTED GITHUB PROJECTS ---
  {
    "id": "gh-nexa",
    "title": "Nexa",
    "client": "GitHub • islamsamyy/nexa",
    "companyLogo": "/projects/gh-nexa/overview.svg",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "HTML",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "HTML"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/nexa"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "5 Items"
      }
    ],
    "techStack": [
      "HTML",
      "HTML5",
      "CSS3"
    ],
    "summary": "NexaLytix single-page HTML5/CSS3 corporate landing page. nexa is a lightweight single-page HTML5/CSS3 marketing landing page (nexa.html) for NexaLytix (\"Connecting Data, Inspiring Growth\"), built with zero build tooling for instant deployment on any static host.",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Rapid Brand Presence: Provides an immediate, zero-maintenance web presence for a data analytics consultancy, ready to embed Calendly/webhook lead-capture forms."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/nexa",
    "featured": false,
    "challenge": "nexa is a lightweight single-page HTML5/CSS3 marketing landing page (nexa.html) for NexaLytix (\"Connecting Data, Inspiring Growth\"), built with zero build tooling for instant deployment on any static host. Organizations and engineering teams working in ai & machine learning frequently face fragmented workflows, manual data reconciliation, and limited real-time visibility. Nexa was engineered to eliminate these bottlenecks with a structured, auditable, and scalable architecture.",
    "solution": "nexa is a lightweight single-page HTML5/CSS3 marketing landing page (nexa.html) for NexaLytix (\"Connecting Data, Inspiring Growth\"), built with zero build tooling for instant deployment on any static host. The platform is built using HTML, HTML5, CSS3, combining modular service boundaries, clean state management, and automated validation. Every module is documented in islamsamyy/nexa with reproducible setup instructions, clear data flows, and production-ready patterns.",
    "keyDecisions": [
      {
        "title": "Core Architecture: HTML + HTML5 + CSS3",
        "rationale": "Selected HTML, HTML5, CSS3 to deliver high reliability, clean modularity, and fast iteration for Nexa.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/nexa.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Rapid Brand Presence: Provides an immediate, zero-maintenance web presence for a data analytics consultancy, ready to embed Calendly/webhook lead-capture forms."
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "1 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "3 Stack",
        "description": "HTML, HTML5, CSS3"
      }
    ],
    "galleryImages": [
      "/projects/gh-nexa/overview.svg",
      "/projects/gh-nexa/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 3",
        "description": "Getting Started"
      },
      {
        "title": "Capability 4",
        "description": "Business Value, ROI & Growth Opportunities"
      }
    ],
    "readmeContent": "# NexaLytix Landing Page (`nexa`)\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`nexa` is a lightweight single-page HTML5/CSS3 marketing landing page (`nexa.html`) for **NexaLytix** (*\"Connecting Data, Inspiring Growth\"*), built with zero build tooling for instant deployment on any static host.\n\n---\n\n## System Architecture & Layers\n| Layer | Artifact | Responsibility |\n| :--- | :--- | :--- |\n| **Markup & Presentation** | `nexa.html` | Self-contained HTML5 + embedded CSS3 dark-mode layout |\n\n---\n\n## Getting Started\n```bash\ngit clone https://github.com/islamsamyy/nexa.git\n# Open nexa.html in any modern browser or serve via GitHub Pages / Vercel\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Rapid Brand Presence**: Provides an immediate, zero-maintenance web presence for a data analytics consultancy, ready to embed Calendly/webhook lead-capture forms.\n",
    "githubUrl": "https://github.com/islamsamyy/nexa"
  },
  {
    "id": "gh-nexaa",
    "title": "Nexaa",
    "client": "GitHub • islamsamyy/nexaa",
    "companyLogo": "/projects/gh-nexaa/overview.svg",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "HTML",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "HTML"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/nexaa"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "5 Items"
      }
    ],
    "techStack": [
      "HTML",
      "HTML5",
      "CSS3"
    ],
    "summary": "NexaLytix standalone HTML5/CSS3 dark-theme data analytics landing page. nexaa is a standalone, zero-dependency single-page HTML5/CSS3 corporate landing page (nexaa.html) for NexaLytix (\"Connecting Data, Inspiring Growth\"), engineered with a dark gradient aesthetic (0a0a0a - 121212) and responsive typography for instant static deployment.",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Zero-Cost Campaign Microsite: Instant-loading landing page ideal for paid traffic tests, consulting credibility, and linking directly to lead-finder-nexus-tool or input-to-sheets-app."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/nexaa",
    "featured": false,
    "challenge": "nexaa is a standalone, zero-dependency single-page HTML5/CSS3 corporate landing page (nexaa.html) for NexaLytix (\"Connecting Data, Inspiring Growth\"), engineered with a dark gradient aesthetic (0a0a0a - 121212) and responsive typography for instant static deployment. Organizations and engineering teams working in ai & machine learning frequently face fragmented workflows, manual data reconciliation, and limited real-time visibility. Nexaa was engineered to eliminate these bottlenecks with a structured, auditable, and scalable architecture.",
    "solution": "nexaa is a standalone, zero-dependency single-page HTML5/CSS3 corporate landing page (nexaa.html) for NexaLytix (\"Connecting Data, Inspiring Growth\"), engineered with a dark gradient aesthetic (0a0a0a - 121212) and responsive typography for instant static deployment. The platform is built using HTML, HTML5, CSS3, combining modular service boundaries, clean state management, and automated validation. Every module is documented in islamsamyy/nexaa with reproducible setup instructions, clear data flows, and production-ready patterns.",
    "keyDecisions": [
      {
        "title": "Core Architecture: HTML + HTML5 + CSS3",
        "rationale": "Selected HTML, HTML5, CSS3 to deliver high reliability, clean modularity, and fast iteration for Nexaa.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/nexaa.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Zero-Cost Campaign Microsite: Instant-loading landing page ideal for paid traffic tests, consulting credibility, and linking directly to lead-finder-nexus-tool or input-to-sheets-app."
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "1 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "3 Stack",
        "description": "HTML, HTML5, CSS3"
      }
    ],
    "galleryImages": [
      "/projects/gh-nexaa/overview.svg",
      "/projects/gh-nexaa/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 3",
        "description": "Getting Started"
      },
      {
        "title": "Capability 4",
        "description": "Business Value, ROI & Growth Opportunities"
      }
    ],
    "readmeContent": "# NexaLytix Landing Page (`nexaa`)\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`nexaa` is a standalone, zero-dependency single-page HTML5/CSS3 corporate landing page (`nexaa.html`) for **NexaLytix** (*\"Connecting Data, Inspiring Growth\"*), engineered with a dark gradient aesthetic (`#0a0a0a` -> `#121212`) and responsive typography for instant static deployment.\n\n---\n\n## System Architecture & Layers\n| Layer | Artifact | Responsibility |\n| :--- | :--- | :--- |\n| **Markup & Presentation** | `nexaa.html` | Self-contained HTML5 structure and embedded CSS3 dark-theme styling |\n\n---\n\n## Getting Started\n```bash\ngit clone https://github.com/islamsamyy/nexaa.git\n# Open nexaa.html directly in any browser or deploy to GitHub Pages / Vercel / Netlify\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Zero-Cost Campaign Microsite**: Instant-loading landing page ideal for paid traffic tests, consulting credibility, and linking directly to `lead-finder-nexus-tool` or `input-to-sheets-app`.\n",
    "githubUrl": "https://github.com/islamsamyy/nexaa"
  },
  {
    "id": "gh-shmal-elhejaz",
    "title": "SHMAL ELHEJAZ",
    "client": "GitHub • islamsamyy/SHMAL-ELHEJAZ",
    "companyLogo": "/projects/gh-shmal-elhejaz/overview.svg",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "CSS",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "CSS"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/SHMAL-ELHEJAZ"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "7 Items"
      }
    ],
    "techStack": [
      "CSS",
      "React",
      "TypeScript",
      "Tailwind CSS"
    ],
    "summary": "Tailwind CSS design tokens and Arabic subscription pricing UI snippets (Silver/Gold/Diamond). SHMAL-ELHEJAZ is a reusable frontend UI & design-system archive containing Tailwind CSS HSL design tokens (INDEX.CSS), component hover/spin keyframes (CARD CSS), and a React/TypeScript Arabic subscription pricing screen (JAVA SCRIPT) supporting Silver, Gold, and Diamond tiers with interactive upgrade modal triggers (UpgradeModal) and localized toast confirmations.",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Application Modules",
      "Business Value, ROI & Growth Opportunities",
      "Tier Selection Handler (handleSelectPlan): Triggers an automatic UpgradeModal upsell when selecting the silver tier, and displays localized Arabic confirmation toasts for gold and diamond plans.",
      "Conversion-Optimized Upsell Funnel: Built-in modal upsell logic nudges entry-tier (silver) buyers toward higher-ARPU gold/diamond plans.",
      "Drop-In SaaS Module: Ready to plug directly into shamalelhejaz or other Arabic SaaS/marketplace storefronts."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/SHMAL-ELHEJAZ",
    "featured": false,
    "challenge": "SHMAL-ELHEJAZ is a reusable frontend UI & design-system archive containing Tailwind CSS HSL design tokens (INDEX.CSS), component hover/spin keyframes (CARD CSS), and a React/TypeScript Arabic subscription pricing screen (JAVA SCRIPT) supporting Silver, Gold, and Diamond tiers with interactive upgrade modal triggers (UpgradeModal) and localized toast confirmations.",
    "solution": "SHMAL-ELHEJAZ is a reusable frontend UI & design-system archive containing Tailwind CSS HSL design tokens (INDEX.CSS), component hover/spin keyframes (CARD CSS), and a React/TypeScript Arabic subscription pricing screen (JAVA SCRIPT) supporting Silver, Gold, and Diamond tiers with interactive upgrade modal triggers (UpgradeModal) and localized toast confirmations.",
    "keyDecisions": [
      {
        "title": "Core Architecture: CSS + React + TypeScript",
        "rationale": "Selected CSS, React, TypeScript to deliver high reliability, clean modularity, and fast iteration for SHMAL ELHEJAZ.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: Tailwind CSS",
        "rationale": "Integrated Tailwind CSS to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/SHMAL-ELHEJAZ.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Application Modules",
      "Business Value, ROI & Growth Opportunities",
      "Tier Selection Handler (handleSelectPlan): Triggers an automatic UpgradeModal upsell when selecting the silver tier, and displays localized Arabic confirmation toasts for gold and diamond plans.",
      "Conversion-Optimized Upsell Funnel: Built-in modal upsell logic nudges entry-tier (silver) buyers toward higher-ARPU gold/diamond plans."
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "2 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "4 Stack",
        "description": "CSS, React, TypeScript, Tailwind CSS"
      }
    ],
    "galleryImages": [
      "/projects/gh-shmal-elhejaz/overview.svg",
      "/projects/gh-shmal-elhejaz/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 3",
        "description": "Application Modules"
      },
      {
        "title": "Capability 4",
        "description": "Business Value, ROI & Growth Opportunities"
      }
    ],
    "readmeContent": "# Shmal El-Hejaz — Pricing & Design System Snippets (`SHMAL-ELHEJAZ`)\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Application Modules](#application-modules)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`SHMAL-ELHEJAZ` is a reusable frontend UI & design-system archive containing Tailwind CSS HSL design tokens (`INDEX.CSS`), component hover/spin keyframes (`CARD CSS`), and a React/TypeScript Arabic subscription pricing screen (`JAVA SCRIPT`) supporting **Silver**, **Gold**, and **Diamond** tiers with interactive upgrade modal triggers (`UpgradeModal`) and localized toast confirmations.\n\n---\n\n## System Architecture & Layers\n| Layer | File | Responsibility |\n| :--- | :--- | :--- |\n| **Design Tokens Layer** | `INDEX.CSS` | Tailwind `@layer base` HSL CSS variables (`--background`, `--foreground`, `--card`, `--primary`, `--popover`) |\n| **Animation & Layout CSS** | `CARD CSS` | `#root` container grid, `.logo` filter hover transitions, and `@keyframes logo-spin` |\n| **React Pricing UI Layer** | `JAVA SCRIPT` | `Index` component integrating `Header`, `PricingCard`, `ComparisonTable`, `Testimonials`, `UpgradeModal`, and `useToast` |\n\n---\n\n## Application Modules\n- **Tier Selection Handler (`handleSelectPlan`)**: Triggers an automatic `UpgradeModal` upsell when selecting the `silver` tier, and displays localized Arabic confirmation toasts for `gold` and `diamond` plans.\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Conversion-Optimized Upsell Funnel**: Built-in modal upsell logic nudges entry-tier (`silver`) buyers toward higher-ARPU `gold`/`diamond` plans.\n- **Drop-In SaaS Module**: Ready to plug directly into `shamalelhejaz` or other Arabic SaaS/marketplace storefronts.\n",
    "githubUrl": "https://github.com/islamsamyy/SHMAL-ELHEJAZ"
  },
  {
    "id": "gh-sotexerp",
    "title": "Sotexerp",
    "client": "GitHub • islamsamyy/sotexerp",
    "companyLogo": "/projects/gh-sotexerp/logo.png",
    "category": "ERP Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/sotexerp"
      },
      {
        "label": "Visuals",
        "value": "6 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Supabase"
    ],
    "summary": "sotexerp (sotex-workspace / sotex/) is an enterprise-grade, multi-branch Textile & Garment Manufacturing ERP built with Next.js, Radix UI, TypeScript, and Supabase. It unifies every core factory department—Fabric & Material Inventory, Product SKUs, BOM & Multi-Stage Production (OEE), Inline Quality Inspections, Procurement, Sales, Double-Entry Finance, HR/Payroll, and Granular RBAC Approval Workflows—into one auditable platform. Live UI screens located in sotex/public/screens/: subgraph L2[\"2. Governance, RBAC & Approval Engine\"] Roles[\"/settings/roles (create, compare, permissions)\"] Scope[\"/settings/permissions/{matrix,data-scope}\"] Approvals[\"/settings/approvals/{workflows,limits,delegation}\"] Sec[\"/settings/security/sessions • /settings/audit-log • /settings/users\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Analytics",
      "Database Schema, Migrations & RLS",
      "Application Modules & Workflows",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Zero-Blindspot Factory Control: Links fabric roll wastage and inline defect rates directly to production order margins and P&L statements.",
      "Enterprise Governance Out-of-the-Box: Multi-branch data scopes (userdatascopes), approval monetary limits, and delegation rules make sotexerp ready for mid-to-large multi-plant textile groups.",
      "Vertical SaaS Commercialization: Generic ERPs struggle with textile BOMs and inline sewing/knitting quality checks—package sotexerp as a multi-tenant SaaS for apparel & textile manufacturers across Egypt, Turkey, and MENA.",
      "Shop-Floor Barcode/RFID Add-On: Connect handheld QR scanners directly to /inventory/fabrics and /production/stages."
    ],
    "liveDemoUrl": "https://sotex-one.vercel.app",
    "featured": false,
    "challenge": "sotexerp (sotex-workspace / sotex/) is an enterprise-grade, multi-branch Textile & Garment Manufacturing ERP built with Next.js, Radix UI, TypeScript, and Supabase. It unifies every core factory department—Fabric & Material Inventory, Product SKUs, BOM & Multi-Stage Production (OEE), Inline Quality Inspections, Procurement, Sales, Double-Entry Finance, HR/Payroll, and Granular RBAC Approval Workflows—into one auditable platform. Live UI screens located in sotex/public/screens/:",
    "solution": "Live UI screens located in sotex/public/screens/: subgraph L2[\"2. Governance, RBAC & Approval Engine\"] Roles[\"/settings/roles (create, compare, permissions)\"] Scope[\"/settings/permissions/{matrix,data-scope}\"] Approvals[\"/settings/approvals/{workflows,limits,delegation}\"] Sec[\"/settings/security/sessions • /settings/audit-log • /settings/users\"] end subgraph L3[\"3. Persistence, Seed & Testing Layer\"] Supa[\"Supabase Postgres (20261109000001sotexerpschema.sql + seed.sql)\"] Tests[\"tsx Frontend Logic Tests & WebSocket Backend Tests\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Supabase",
        "rationale": "Selected TypeScript, Next.js, Supabase to deliver high reliability, clean modularity, and fast iteration for Sotexerp.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (6 images), and clear module boundaries in islamsamyy/sotexerp.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Analytics",
      "Database Schema, Migrations & RLS",
      "Application Modules & Workflows"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "8 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "6 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "3 Stack",
        "description": "TypeScript, Next.js, Supabase"
      }
    ],
    "galleryImages": [
      "/projects/gh-sotexerp/screen_1_dashboard.png",
      "/projects/gh-sotexerp/screen_2_inventory.png",
      "/projects/gh-sotexerp/screen_3_production-orders.png",
      "/projects/gh-sotexerp/screen_4_products-management.png",
      "/projects/gh-sotexerp/screen_5_logo.png",
      "/projects/gh-sotexerp/screen_6_sotex-logo.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Analytics"
      }
    ],
    "readmeContent": "# Sotex ERP (`sotexerp`) — Enterprise Textile & Garment Manufacturing ERP\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/sotexerp/main/sotex/public/sotex-logo.png\" alt=\"Sotex ERP Logo\" width=\"200\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Analytics](#data-model--analytics)\n- [Database Schema, Migrations & RLS](#database-schema-migrations--rls)\n- [Application Modules & Workflows](#application-modules--workflows)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`sotexerp` (`sotex-workspace` / `sotex/`) is an enterprise-grade, multi-branch **Textile & Garment Manufacturing ERP** built with Next.js, Radix UI, TypeScript, and Supabase. It unifies every core factory department—**Fabric & Material Inventory, Product SKUs, BOM & Multi-Stage Production (OEE), Inline Quality Inspections, Procurement, Sales, Double-Entry Finance, HR/Payroll, and Granular RBAC Approval Workflows**—into one auditable platform.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nLive UI screens located in `sotex/public/screens/`:\n\n| Executive ERP Dashboard | Fabric & Materials Inventory | Production Orders |\n| :---: | :---: | :---: |\n| ![Dashboard](https://raw.githubusercontent.com/islamsamyy/sotexerp/main/sotex/public/screens/dashboard.png) | ![Inventory](https://raw.githubusercontent.com/islamsamyy/sotexerp/main/sotex/public/screens/inventory.png) | ![Production Orders](https://raw.githubusercontent.com/islamsamyy/sotexerp/main/sotex/public/screens/production-orders.png) |\n\n| Products Management | New Product Wizard |\n| :---: | :---: |\n| ![Products Management](https://raw.githubusercontent.com/islamsamyy/sotexerp/main/sotex/public/screens/products-management.png) | ![New Product Wizard](https://raw.githubusercontent.com/islamsamyy/sotexerp/main/sotex/public/screens/new-product-wizard.png) |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Departmental UI & Presentation Layer\"]\n        Core[\"/dashboard • /reports • /tasks\"]\n        Mfg[\"/inventory/* • /production/* • /quality/* • /products/*\"]\n        BackOffice[\"/procurement/* • /sales/* • /finance/* • /hr/*\"]\n    end\n\n    subgraph L2[\"2. Governance, RBAC & Approval Engine\"]\n        Roles[\"/settings/roles (create, compare, permissions)\"]\n        Scope[\"/settings/permissions/{matrix,data-scope}\"]\n        Approvals[\"/settings/approvals/{workflows,limits,delegation}\"]\n        Sec[\"/settings/security/sessions • /settings/audit-log • /settings/users\"]\n    end\n\n    subgraph L3[\"3. Persistence, Seed & Testing Layer\"]\n        Supa[\"Supabase Postgres (20261109000001_sotex_erp_schema.sql + seed.sql)\"]\n        Tests[\"tsx Frontend Logic Tests & WebSocket Backend Tests\"]\n    end\n\n    L1 --> L2 --> L3\n```\n\n| Layer | Responsibility | Key Modules |\n| :--- | :--- | :--- |\n| **Manufacturing & Quality Layer** | Fabric roll inventory, stock counts, transfers, BOM, production planning, OEE, and inline defect inspections | `sotex/app/{inventory,production,quality,products}/*` |\n| **Commercial & Back-Office Layer** | Supplier quotations/invoices, customer sales, general ledgers, P&L, treasury, attendance, and payroll | `sotex/app/{procurement,sales,finance,hr}/*` |\n| **RBAC & Approval Governance Layer** | Role comparison, data-scope isolation (branch/department/warehouse), monetary approval limits, delegation, and audit trails | `sotex/app/settings/{roles,permissions,approvals,security,users,audit-log}/*` |\n| **Persistence & Verification Layer** | Supabase Postgres schema + seed data + dual `tsx` automated test suites | `sotex/supabase/migrations/20261109000001_sotex_erp_schema.sql`, `sotex/supabase/seed.sql`, `sotex/tests/*` |\n\n---\n\n## Data Model & Analytics\n```mermaid\nerDiagram\n    BRANCHES ||--o{ DEPARTMENTS : contains\n    BRANCHES ||--o{ WAREHOUSES : houses\n    BRANCHES ||--o{ PRODUCTION_LINES : operates\n    ROLES ||--o{ USER_ROLES : assigned_to\n    PROFILES ||--o{ USER_ROLES : holds\n    PROFILES ||--o{ USER_DATA_SCOPES : restricted_by\n    PRODUCTS ||--o{ PRODUCTION_ORDERS : manufactured_via\n    WAREHOUSES ||--o{ MATERIALS_INVENTORY : stores\n    PROFILES ||--o{ APPROVAL_REQUESTS : submits\n    PROFILES ||--o{ AUDIT_LOGS : generates\n```\n\n---\n\n## Database Schema, Migrations & RLS\nDefined in `sotex/supabase/migrations/20261109000001_sotex_erp_schema.sql` (plus `sotex/supabase/seed.sql`):\n\n| Table | Purpose |\n| :--- | :--- |\n| `public.branches`, `public.departments`, `public.warehouses`, `public.production_lines` | Multi-branch organizational & plant topology |\n| `public.roles`, `public.profiles`, `public.user_roles`, `public.user_data_scopes` | Fine-grained RBAC and row-level branch/warehouse data scoping |\n| `public.products`, `public.production_orders`, `public.materials_inventory` | Core SKU catalog, factory work orders, and fabric/material stock |\n| `public.approval_requests`, `public.audit_logs` | Multi-step approval workflow state and immutable compliance logs |\n\n---\n\n## Application Modules & Workflows\n\n| Domain | Routes Implemented |\n| :--- | :--- |\n| **Executive** | `/dashboard`, `/reports`, `/tasks`, `/login` |\n| **Inventory** | `/inventory`, `/inventory/fabrics`, `/inventory/fabrics/[id]`, `/inventory/stock-count`, `/inventory/transactions`, `/inventory/transfers` |\n| **Production** | `/production`, `/production/[id]`, `/production/bom`, `/production/oee`, `/production/planning`, `/production/stages` |\n| **Quality** | `/quality`, `/quality/defects`, `/quality/inline`, `/quality/inspections` |\n| **Products** | `/products`, `/products/[id]`, `/products/new`, `/products/pricing`, `/products/skus` |\n| **Procurement & Sales** | `/procurement/{suppliers,quotations,invoices}`, `/sales/{customers,quotations}` |\n| **Finance & HR** | `/finance/{accounts,ledgers,pnl,treasury}`, `/hr/{employees,attendance,payroll}` |\n| **Enterprise Settings** | `/settings/roles/{new,compare,[id]/permissions}`, `/settings/permissions/{matrix,data-scope}`, `/settings/approvals/{workflows,limits,delegation}`, `/settings/security/sessions`, `/settings/users/*`, `/settings/audit-log` |\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/sotexerp.git\ncd sotexerp\nnpm --prefix sotex install\ncp .env.example .env.local\n```\n\n| Script | Command | Description |\n| :--- | :--- | :--- |\n| Dev | `npm run dev` | Start Next.js dev server (`sotex/`) |\n| Build | `npm run build` | Production build (`next build --webpack`) |\n| Lint | `npm run lint` | Run ESLint |\n| Backend Tests | `npm --prefix sotex run test:backend` | Run WebSocket backend integration tests |\n| Frontend Tests | `npm --prefix sotex run test:frontend` | Run frontend logic unit tests |\n| All Tests | `npm --prefix sotex test` | Run both frontend and backend test suites |\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Zero-Blindspot Factory Control**: Links fabric roll wastage and inline defect rates directly to production order margins and P&L statements.\n- **Enterprise Governance Out-of-the-Box**: Multi-branch data scopes (`user_data_scopes`), approval monetary limits, and delegation rules make `sotexerp` ready for mid-to-large multi-plant textile groups.\n- **Vertical SaaS Commercialization**: Generic ERPs struggle with textile BOMs and inline sewing/knitting quality checks—package `sotexerp` as a multi-tenant SaaS for apparel & textile manufacturers across Egypt, Turkey, and MENA.\n- **Shop-Floor Barcode/RFID Add-On**: Connect handheld QR scanners directly to `/inventory/fabrics` and `/production/stages`.\n",
    "githubUrl": "https://github.com/islamsamyy/sotexerp"
  },
  {
    "id": "gh-shamalelhejaz",
    "title": "Shamalelhejaz",
    "client": "GitHub • islamsamyy/shamalelhejaz",
    "companyLogo": "/projects/gh-shamalelhejaz/logo.png",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "HTML",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "HTML"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/shamalelhejaz"
      },
      {
        "label": "Visuals",
        "value": "3 Assets"
      },
      {
        "label": "Highlights",
        "value": "11 Items"
      }
    ],
    "techStack": [
      "HTML",
      "Next.js",
      "Next.js 16",
      "React",
      "Supabase",
      "Prisma",
      "Stripe",
      "HyperPay",
      "Moyasar"
    ],
    "summary": "Multi-vendor MENA e-commerce marketplace (Next.js 16, Prisma, Supabase) with HyperPay, Moyasar, Tap & Stripe. shamalelhejaz (souq) is a full-stack Next.js 16, React 19, Prisma, and Supabase multi-vendor e-commerce marketplace built for Saudi Arabia and the broader MENA market. It supports multi-merchant storefronts (/store/[storeId]), localized categories/products, loyalty wallets & referrals, real-time order tracking (/orders/[id]/tracking), dedicated Vendor (/vendor/) and Admin (/admin/) portals, and 4 integrated payment gateways: HyperPay, Moyasar, Tap, and Stripe. Brand identity assets in public/ (plus UI screen specs in stitchscreens/): subgraph L2[\"2. Vendor Self-Service Portal (/vendor)\"] Vendor[\"/vendor/register • /vendor/catalog(/add) • /vendor/orders • /vendor/financials • /vendor/settings\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Multi-Gateway Commerce",
      "Database Schema, Migrations & Prisma",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Zero Single-Gateway Risk: Supporting HyperPay, Moyasar, Tap, and Stripe simultaneously lets operators route transactions to the lowest-fee or highest-converting regional acquirer.",
      "Built-In Retention Engine: Wallets, reward rules, referral tracking, and coupons reduce reliance on paid ads.",
      "B2B / Vendor Subscription + Commission: Monetize via per-order marketplace commissions (vendorpayouts) plus paid vendor marketing placements (/admin/marketing)."
    ],
    "liveDemoUrl": "https://shamalelhejaz.vercel.app",
    "featured": false,
    "challenge": "shamalelhejaz (souq) is a full-stack Next.js 16, React 19, Prisma, and Supabase multi-vendor e-commerce marketplace built for Saudi Arabia and the broader MENA market. It supports multi-merchant storefronts (/store/[storeId]), localized categories/products, loyalty wallets & referrals, real-time order tracking (/orders/[id]/tracking), dedicated Vendor (/vendor/) and Admin (/admin/) portals, and 4 integrated payment gateways: HyperPay, Moyasar, Tap, and Stripe. Brand identity assets in public/ (plus UI screen specs in stitchscreens/):",
    "solution": "Brand identity assets in public/ (plus UI screen specs in stitchscreens/): subgraph L2[\"2. Vendor Self-Service Portal (/vendor)\"] Vendor[\"/vendor/register • /vendor/catalog(/add) • /vendor/orders • /vendor/financials • /vendor/settings\"] end subgraph L3[\"3. Marketplace Admin Suite (/admin)\"] Admin[\"/admin/{products,categories,vendors,orders,customers,finance,marketing,settings}\"] end subgraph L4[\"4. Multi-Gateway Payment & Auth API Layer\"] Pay[\"/api/checkout • /api/payments/{hyperpay,moyasar,tap,stripe} • /auth/callback\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: HTML + Next.js + Next.js 16",
        "rationale": "Selected HTML, Next.js, Next.js 16 to deliver high reliability, clean modularity, and fast iteration for Shamalelhejaz.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: React, Supabase, Prisma",
        "rationale": "Integrated React, Supabase, Prisma to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (3 images), and clear module boundaries in islamsamyy/shamalelhejaz.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Multi-Gateway Commerce",
      "Database Schema, Migrations & Prisma",
      "Application Modules & API Endpoints"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "7 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "3 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "9 Stack",
        "description": "HTML, Next.js, Next.js 16, React, Supabase, Prisma, Stripe, HyperPay, Moyasar"
      }
    ],
    "galleryImages": [
      "/projects/gh-shamalelhejaz/screen_1_logo-mark.png",
      "/projects/gh-shamalelhejaz/screen_2_logo-square.png",
      "/projects/gh-shamalelhejaz/screen_3_logo.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Multi-Gateway Commerce"
      }
    ],
    "readmeContent": "# Shamal El-Hejaz / Souq (`shamalelhejaz`) — Multi-Vendor MENA E-Commerce Marketplace\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/shamalelhejaz/main/public/logo.png\" alt=\"Shamal El-Hejaz Souq Logo\" width=\"180\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Multi-Gateway Commerce](#data-model--multi-gateway-commerce)\n- [Database Schema, Migrations & Prisma](#database-schema-migrations--prisma)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`shamalelhejaz` (`souq`) is a full-stack Next.js 16, React 19, Prisma, and Supabase **multi-vendor e-commerce marketplace** built for Saudi Arabia and the broader MENA market. It supports multi-merchant storefronts (`/store/[storeId]`), localized categories/products, loyalty wallets & referrals, real-time order tracking (`/orders/[id]/tracking`), dedicated **Vendor** (`/vendor/*`) and **Admin** (`/admin/*`) portals, and **4 integrated payment gateways**: **HyperPay**, **Moyasar**, **Tap**, and **Stripe**.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nBrand identity assets in `public/` (plus UI screen specs in `stitch_screens/`):\n\n| Primary Logo | Brand Mark | Square App Icon |\n| :---: | :---: | :---: |\n| ![Logo](https://raw.githubusercontent.com/islamsamyy/shamalelhejaz/main/public/logo.png) | ![Logo Mark](https://raw.githubusercontent.com/islamsamyy/shamalelhejaz/main/public/logo-mark.png) | ![Square Logo](https://raw.githubusercontent.com/islamsamyy/shamalelhejaz/main/public/logo-square.png) |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Buyer Storefront & Engagement Layer\"]\n        Shop[\"/catalog • /categories • /deals • /search • /products/[id] • /store/[storeId] • /magazine\"]\n        OrderUI[\"/cart • /checkout • /orders/[id]/confirmation • /orders/[id]/tracking • /returns\"]\n    end\n\n    subgraph L2[\"2. Vendor Self-Service Portal (/vendor)\"]\n        Vendor[\"/vendor/register • /vendor/catalog(/add) • /vendor/orders • /vendor/financials • /vendor/settings\"]\n    end\n\n    subgraph L3[\"3. Marketplace Admin Suite (/admin)\"]\n        Admin[\"/admin/{products,categories,vendors,orders,customers,finance,marketing,settings}\"]\n    end\n\n    subgraph L4[\"4. Multi-Gateway Payment & Auth API Layer\"]\n        Pay[\"/api/checkout • /api/payments/{hyperpay,moyasar,tap,stripe} • /auth/callback\"]\n    end\n\n    subgraph L5[\"5. Dual ORM, Persistence & QA Layer\"]\n        DB[\"Prisma (prisma/schema.prisma) + Supabase Postgres (4 SQL files) + RLS\"]\n        QA[\"Vitest + Testing Library + TanStack Table + Recharts + Zod\"]\n    end\n\n    L1 --> L4 --> L5\n    L2 --> L5\n    L3 --> L5\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Buyer Storefront Layer** | Catalog filtering, deals, vendor storefronts, cart, checkout, order tracking, returns, and policies | `app/{catalog,categories,deals,search,store,cart,checkout,orders,returns,magazine,portals}/` |\n| **Vendor Self-Service Layer** | Vendor onboarding, SKU publishing, order fulfillment, and payout reconciliation | `app/vendor/{register,catalog,catalog/add,orders,financials,settings}/page.tsx` |\n| **Marketplace Admin Layer** | Platform-wide management of vendors, categories, finance, marketing, and customers | `app/admin/{vendors,products,categories,orders,customers,finance,marketing,settings}/page.tsx` |\n| **Multi-Gateway Payment Layer** | Unified checkout endpoint + 4 payment gateway adapters for mada, Apple Pay, STC Pay, and cards | `app/api/checkout/route.ts`, `app/api/payments/{hyperpay,moyasar,tap,stripe}/route.ts` |\n| **ORM, Schema & QA Layer** | Prisma relational schema, Supabase production migrations, and Vitest test coverage | `prisma/schema.prisma`, `supabase/migrations/*.sql`, `__tests__/` |\n\n---\n\n## Data Model & Multi-Gateway Commerce\n```mermaid\nerDiagram\n    USER ||--o| WALLET : owns\n    WALLET ||--o{ TRANSACTION : logs\n    CATEGORY ||--o{ CATEGORYTRANSLATION : localized_by\n    PRODUCT ||--o{ PRODUCTTRANSLATION : localized_by\n    ORDER ||--|{ ORDERITEM : contains\n    ORDER ||--o| SHIPPINGINFO : ships_via\n    ORDER ||--o| PAYMENTINFO : paid_via\n    REWARDPROGRAM ||--|{ REWARDRULE : defines\n```\n\n---\n\n## Database Schema, Migrations & Prisma\nCombined Prisma (`prisma/schema.prisma`) and Supabase SQL (`supabase/schema.sql` + `supabase/migrations/20261110000001..000002*.sql`):\n\n| Domain | Tables / Models |\n| :--- | :--- |\n| **Identity & Vendors** | `User`, `public.profiles`, `public.vendors`, `public.addresses`, `Follow` |\n| **Localized Catalog & SEO** | `Category`, `CategoryTranslation`, `Product`, `ProductTranslation`, `Image`, `SEOData`, `Review`, `ReviewMedia` |\n| **Cart, Orders & Shipping** | `public.cart_items`, `public.wishlists`, `Order`, `OrderItem`, `public.order_items`, `ShippingInfo` |\n| **Payments, Wallets & Payouts** | `public.payment_gateways`, `public.payments`, `PaymentInfo`, `public.invoices`, `public.vendor_payouts`, `Wallet`, `Transaction`, `public.wallets`, `public.wallet_transactions` |\n| **Growth, Loyalty & Governance** | `RewardProgram`, `RewardRule`, `Referral`, `Coupon`, `Notification`, `public.app_settings`, `public.audit_log` |\n\n---\n\n## Application Modules & API Endpoints\n\n| Endpoint | Purpose |\n| :--- | :--- |\n| `/api/checkout` | Multi-vendor order creation & checkout orchestration |\n| `/api/payments/moyasar` | Moyasar payment processing (mada, Visa/MC, Apple Pay) |\n| `/api/payments/hyperpay` | HyperPay payment processing |\n| `/api/payments/tap` | Tap Payments gateway integration |\n| `/api/payments/stripe` | Stripe international card processing |\n| `/auth/callback` | Supabase auth callback handler |\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/shamalelhejaz.git\ncd shamalelhejaz\nnpm install\nnpm run dev\n```\n\n| Script | Command | Description |\n| :--- | :--- | :--- |\n| Dev | `npm run dev` | Start Next.js 16 dev server |\n| Build | `npm run build` | Production build (`next build --webpack`) |\n| Typecheck | `npm run typecheck` | Run `tsc --noEmit` |\n| Lint | `npm run lint` | Run ESLint 9 |\n| Test | `npm test` | Run Vitest suite |\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Zero Single-Gateway Risk**: Supporting HyperPay, Moyasar, Tap, and Stripe simultaneously lets operators route transactions to the lowest-fee or highest-converting regional acquirer.\n- **Built-In Retention Engine**: Wallets, reward rules, referral tracking, and coupons reduce reliance on paid ads.\n- **B2B / Vendor Subscription + Commission**: Monetize via per-order marketplace commissions (`vendor_payouts`) plus paid vendor marketing placements (`/admin/marketing`).\n",
    "githubUrl": "https://github.com/islamsamyy/shamalelhejaz"
  },
  {
    "id": "gh-naafs",
    "title": "Naafs",
    "client": "GitHub • islamsamyy/naafs",
    "companyLogo": "/projects/gh-naafs/logo.svg",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/naafs"
      },
      {
        "label": "Visuals",
        "value": "8 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Next.js 16",
      "React",
      "Supabase",
      "Stripe",
      "HyperPay",
      "Moyasar",
      "shadcn/ui",
      "next-intl"
    ],
    "summary": "Live reverse-auction & freelance bidding marketplace built with Next.js 16, Supabase, and next-intl. naafs (nafis-app) is an internationalized Next.js 16, React 19, next-intl, and Supabase freelance marketplace built around live reverse-auctions and competitive bidding. Clients publish project briefs (/projects/create), watch real-time competitive bids arrive (/auctions/live), evaluate proposals side-by-side (/projects/[id]/bids/compare), and release funds through an audited escrow ledger (escrowledger) across dedicated Client and Freelancer dashboards. Verified desktop & responsive UI screenshots from tests/screenshots/ and public/images/: subgraph L2[\"2. Live Auction & Dual-Dashboard Layer\"] App[\"(app): /auctions/live • /projects/create • /projects/[id]/bids/compare • /projects/[id]/manage\"] Dash[\"/dashboard/{client,freelancer,wallet,reviews,settings} • /admin/messages\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Escrow Mechanics",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "public.bids — Freelancer proposals (price, timeline, pitch, selection status) linked to projects",
      "public.escrowledger — Financial ledger tracking held, released, and refunded milestone funds",
      "Profile RLS policies ensuring users can only mutate their own records",
      "Reverse-Auction Price Discovery: Drives transparent competition among vetted freelancers while protecting quality through side-by-side comparison (/bids/compare) and reviews."
    ],
    "liveDemoUrl": "https://naafs.vercel.app",
    "featured": false,
    "challenge": "naafs (nafis-app) is an internationalized Next.js 16, React 19, next-intl, and Supabase freelance marketplace built around live reverse-auctions and competitive bidding. Clients publish project briefs (/projects/create), watch real-time competitive bids arrive (/auctions/live), evaluate proposals side-by-side (/projects/[id]/bids/compare), and release funds through an audited escrow ledger (escrowledger) across dedicated Client and Freelancer dashboards. Verified desktop & responsive UI screenshots from tests/screenshots/ and public/images/:",
    "solution": "Verified desktop & responsive UI screenshots from tests/screenshots/ and public/images/: subgraph L2[\"2. Live Auction & Dual-Dashboard Layer\"] App[\"(app): /auctions/live • /projects/create • /projects/[id]/bids/compare • /projects/[id]/manage\"] Dash[\"/dashboard/{client,freelancer,wallet,reviews,settings} • /admin/messages\"] end subgraph L3[\"3. REST API & Storage Layer (11 Route Handlers)\"] API[\"/api/projects/ • /api/bids/ • /api/messages/ • /api/notifications/ • /api/reviews • /api/upload-avatar • /api/storage/ensure-bucket\"] MW[\"src/middleware.ts (Session & Route Guard)\"] end subgraph L4[\"4. Persistence, Escrow & QA Layer\"] Supa[\"Supabase Postgres (20260416biddingschema.sql + 20260419rlsprofilesupdate.sql) + Storage\"] Tests[\"specs/ + tests/ + tests/ (20+ automated visual & a11y screenshots)\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Next.js 16",
        "rationale": "Selected TypeScript, Next.js, Next.js 16 to deliver high reliability, clean modularity, and fast iteration for Naafs.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: React, Supabase, Stripe",
        "rationale": "Integrated React, Supabase, Stripe to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (8 images), and clear module boundaries in islamsamyy/naafs.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Escrow Mechanics",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "7 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "8 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "10 Stack",
        "description": "TypeScript, Next.js, Next.js 16, React, Supabase, Stripe, HyperPay, Moyasar, shadcn/ui, next-intl"
      }
    ],
    "galleryImages": [
      "/projects/gh-naafs/screen_1_hero.png",
      "/projects/gh-naafs/screen_2_01_home.png",
      "/projects/gh-naafs/screen_3_02_explore.png",
      "/projects/gh-naafs/screen_4_03_freelancers.png",
      "/projects/gh-naafs/screen_5_04_auctions.png",
      "/projects/gh-naafs/screen_6_05_how_it_works.png",
      "/projects/gh-naafs/screen_7_06_pricing.png",
      "/projects/gh-naafs/screen_8_07_login.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Escrow Mechanics"
      }
    ],
    "readmeContent": "# Naafs (`naafs`) — Live Reverse-Auction & Freelance Bidding Marketplace\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/naafs/main/public/logo.svg\" alt=\"Naafs Logo\" width=\"180\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Escrow Mechanics](#data-model--escrow-mechanics)\n- [Database Schema, Migrations & RLS](#database-schema-migrations--rls)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`naafs` (`nafis-app`) is an internationalized Next.js 16, React 19, `next-intl`, and Supabase freelance marketplace built around **live reverse-auctions** and competitive bidding. Clients publish project briefs (`/projects/create`), watch real-time competitive bids arrive (`/auctions/live`), evaluate proposals side-by-side (`/projects/[id]/bids/compare`), and release funds through an audited **escrow ledger** (`escrow_ledger`) across dedicated Client and Freelancer dashboards.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nVerified desktop & responsive UI screenshots from `tests/screenshots/` and `public/images/`:\n\n| Landing Hero | Explore Marketplace | Freelancers Directory |\n| :---: | :---: | :---: |\n| ![Home](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/01_home.png) | ![Explore](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/02_explore.png) | ![Freelancers](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/03_freelancers.png) |\n\n| Live Reverse Auctions | How It Works | Pricing & Tiers |\n| :---: | :---: | :---: |\n| ![Auctions](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/04_auctions.png) | ![How It Works](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/05_how_it_works.png) | ![Pricing](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/06_pricing.png) |\n\n| RTL Login Support | Responsive Mobile (375px) | Live Auction Room |\n| :---: | :---: | :---: |\n| ![RTL Login](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/10_rtl_login.png) | ![Mobile 375px](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/11_responsive_mobile_375.png) | ![Live Auctions](https://raw.githubusercontent.com/islamsamyy/naafs/main/tests/screenshots/17_auctions_live.png) |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Marketing, RTL & Discovery Layer\"]\n        Mkt[\"(marketing): / • /explore • /auctions • /freelancers • /projects • /how-it-works • /pricing\"]\n        UI[\"@base-ui/react • shadcn/ui • next-intl (EN/AR RTL) • Sonner\"]\n    end\n\n    subgraph L2[\"2. Live Auction & Dual-Dashboard Layer\"]\n        App[\"(app): /auctions/live • /projects/create • /projects/[id]/bids/compare • /projects/[id]/manage\"]\n        Dash[\"/dashboard/{client,freelancer,wallet,reviews,settings} • /admin/messages\"]\n    end\n\n    subgraph L3[\"3. REST API & Storage Layer (11 Route Handlers)\"]\n        API[\"/api/projects/* • /api/bids/* • /api/messages/* • /api/notifications/* • /api/reviews • /api/upload-avatar • /api/storage/ensure-bucket\"]\n        MW[\"src/middleware.ts (Session & Route Guard)\"]\n    end\n\n    subgraph L4[\"4. Persistence, Escrow & QA Layer\"]\n        Supa[\"Supabase Postgres (20260416_bidding_schema.sql + 20260419_rls_profiles_update.sql) + Storage\"]\n        Tests[\"specs/ + tests/ + __tests__/ (20+ automated visual & a11y screenshots)\"]\n    end\n\n    L1 --> L2 --> L3 --> L4\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Marketing & RTL Layer** | Bilingual discovery pages, pricing, and responsive desktop/tablet/mobile layouts | `src/app/(marketing)/*`, `tests/screenshots/*` |\n| **Live Bidding & Comparison Layer** | Real-time reverse auctions and `BidSelectionList.tsx` side-by-side proposal evaluator | `src/app/(app)/auctions/live/page.tsx`, `src/app/(app)/projects/[id]/bids/compare/page.tsx`, `src/components/bidding/BidSelectionList.tsx` |\n| **Role Dashboards & Wallet** | Role onboarding (`/onboarding/role`), Client & Freelancer cockpits, escrow wallet, and reviews | `src/app/(app)/dashboard/{client,freelancer,wallet,reviews,settings}/page.tsx` |\n| **REST API & Storage Layer** | 11 route handlers for bidding, messaging read-receipts, notifications, reviews, and avatar uploads | `src/app/api/{bids,projects,messages,notifications,reviews,upload-avatar,storage/ensure-bucket}/**` |\n| **Schema, RLS & Spec Layer** | Bidding/escrow SQL migrations, RLS profile policies, specs, and visual/a11y tests | `supabase/migrations/*.sql`, `specs/`, `tests/`, `__tests__/` |\n\n---\n\n## Data Model & Escrow Mechanics\n```mermaid\nerDiagram\n    PROJECTS ||--o{ BIDS : attracts\n    BIDS ||--o| ESCROW_LEDGER : locks_funds_in\n    PROJECTS ||--o{ REVIEWS : receives\n```\n\n---\n\n## Database Schema, Migrations & RLS\nDefined in `supabase/migrations/20260416_bidding_schema.sql` and `20260419_rls_profiles_update.sql`:\n- `public.bids` — Freelancer proposals (price, timeline, pitch, selection status) linked to projects\n- `public.escrow_ledger` — Financial ledger tracking held, released, and refunded milestone funds\n- Profile RLS policies ensuring users can only mutate their own records\n\n---\n\n## Application Modules & API Endpoints\n\n| Endpoint | Purpose |\n| :--- | :--- |\n| `/api/projects` & `/api/projects/[id]` | Project creation, listing & detail operations |\n| `/api/bids` & `/api/bids/[id]` | Submit, update, and accept/reject competitive bids |\n| `/api/messages` & `/api/messages/[id]/mark-read` | Client-freelancer messaging with read state |\n| `/api/notifications` & `/api/notifications/[id]/mark-read` | Real-time alerts & read tracking |\n| `/api/reviews` | Verified post-project reviews |\n| `/api/upload-avatar` & `/api/storage/ensure-bucket` | Supabase Storage bucket provisioning & avatar uploads |\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/naafs.git\ncd naafs\nnpm install\ncp .env.example .env.local\nnpm run dev\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Reverse-Auction Price Discovery**: Drives transparent competition among vetted freelancers while protecting quality through side-by-side comparison (`/bids/compare`) and reviews.\n- **Escrow Commission Engine**: `escrow_ledger` is ready to support a 10–15% marketplace take-rate plus featured auction boosts.\n- **Regional Payment Integration**: Wire `escrow_ledger` to Moyasar/HyperPay/Stripe Connect for automated payouts across Saudi Arabia and MENA.\n",
    "githubUrl": "https://github.com/islamsamyy/naafs"
  },
  {
    "id": "gh-breast-cancer-prediction",
    "title": "Breast Cancer Prediction",
    "client": "GitHub • islamsamyy/Breast-Cancer-prediction",
    "companyLogo": "/projects/gh-breast-cancer-prediction/screen_1_chart_1.png",
    "category": "AI & Machine Learning",
    "role": "Creator & Lead Engineer",
    "impactMetric": "Jupyter Notebook",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "Jupyter Notebook"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/Breast-Cancer-prediction"
      },
      {
        "label": "Visuals",
        "value": "1 Assets"
      },
      {
        "label": "Highlights",
        "value": "11 Items"
      }
    ],
    "techStack": [
      "Jupyter Notebook",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "XGBoost"
    ],
    "summary": "Binary classification ML model for breast cancer diagnosis prediction. Breast-Cancer-prediction is a 22-cell healthcare machine learning project (breast-cancer-predict.ipynb) trained on 4,024 clinical oncology records (BreastCancer.csv). Because false negatives in cancer prognosis/status prediction are unacceptable, the pipeline applies Random Oversampling (imblearn.oversampling.RandomOverSampler) to neutralize class imbalance and benchmarks 5 classifiers across accuracy, precision, recall, and F1-score. Exploratory & clinical visualization extracted from breast-cancer-predict.ipynb:",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Clinical Schema",
      "Model Pipeline & Benchmarks",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Dataset: BreastCancer.csv (4,024 patient records)",
      "Columns (16): Age, Race, Marital Status, T Stage , N Stage, 6th Stage, differentiate, Grade, A Stage, Tumor Size, Estrogen Status, Progesterone Status, Regional Node Examined, Reginol Node Positive, Survival Months, Status",
      "High-Recall Clinical Triage Support: Prioritizes minority positive cases via oversampling to minimize missed high-risk patients (for research/decision-support workflows).",
      "Explainable AI (SHAP) Upgrade: Adding SHAP waterfall plots makes tumor stage, node positivity, and hormone-receptor contributions transparent to oncology researchers."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/Breast-Cancer-prediction",
    "featured": false,
    "challenge": "Breast-Cancer-prediction is a 22-cell healthcare machine learning project (breast-cancer-predict.ipynb) trained on 4,024 clinical oncology records (BreastCancer.csv). Because false negatives in cancer prognosis/status prediction are unacceptable, the pipeline applies Random Oversampling (imblearn.oversampling.RandomOverSampler) to neutralize class imbalance and benchmarks 5 classifiers across accuracy, precision, recall, and F1-score. Exploratory & clinical visualization extracted from breast-cancer-predict.ipynb:",
    "solution": "Exploratory & clinical visualization extracted from breast-cancer-predict.ipynb: The platform is built using Jupyter Notebook, Pandas, NumPy, Matplotlib, Seaborn, XGBoost, combining modular service boundaries, clean state management, and automated validation. Every module is documented in islamsamyy/Breast-Cancer-prediction with reproducible setup instructions, clear data flows, and production-ready patterns.",
    "keyDecisions": [
      {
        "title": "Core Architecture: Jupyter Notebook + Pandas + NumPy",
        "rationale": "Selected Jupyter Notebook, Pandas, NumPy to deliver high reliability, clean modularity, and fast iteration for Breast Cancer Prediction.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: Matplotlib, Seaborn, XGBoost",
        "rationale": "Integrated Matplotlib, Seaborn, XGBoost to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (1 images), and clear module boundaries in islamsamyy/Breast-Cancer-prediction.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Clinical Schema",
      "Model Pipeline & Benchmarks",
      "Getting Started"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "3 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "1 Image",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "6 Stack",
        "description": "Jupyter Notebook, Pandas, NumPy, Matplotlib, Seaborn, XGBoost"
      }
    ],
    "galleryImages": [
      "/projects/gh-breast-cancer-prediction/screen_1_chart_1.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Clinical Schema"
      }
    ],
    "readmeContent": "# Breast Cancer Prediction (`Breast-Cancer-prediction`) — Imbalanced Clinical Classification Benchmark\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Clinical Schema](#data-model--clinical-schema)\n- [Model Pipeline & Benchmarks](#model-pipeline--benchmarks)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`Breast-Cancer-prediction` is a 22-cell healthcare machine learning project (`breast-cancer-predict.ipynb`) trained on **4,024 clinical oncology records** (`Breast_Cancer.csv`). Because false negatives in cancer prognosis/status prediction are unacceptable, the pipeline applies **Random Oversampling (`imblearn.over_sampling.RandomOverSampler`)** to neutralize class imbalance and benchmarks **5 classifiers** across accuracy, precision, recall, and F1-score.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nExploratory & clinical visualization extracted from `breast-cancer-predict.ipynb`:\n\n![Breast Cancer Analysis Plot](https://raw.githubusercontent.com/islamsamyy/Breast-Cancer-prediction/main/docs/images/chart_1.png)\n\n---\n\n## System Architecture & Layers\n```mermaid\nflowchart LR\n    L1[\"1. Clinical Dataset (Breast_Cancer.csv • 4,024 rows)\"] --> L2[\"2. Encoding & Balancing (LabelEncoder • RandomOverSampler)\"]\n    L2 --> L3[\"3. 5-Model Benchmark (LogisticRegression • RandomForest • SVC • XGBoost • KNN)\"]\n    L3 --> L4[\"4. Clinical Metrics (Accuracy • Precision • Recall • F1 • Report)\"]\n```\n\n| Layer | Tools & Libraries |\n| :--- | :--- |\n| **Preprocessing & Class Balancing** | `pandas`, `numpy`, `LabelEncoder`, `imblearn.over_sampling.RandomOverSampler`, `train_test_split` |\n| **Visualization** | `matplotlib.pyplot`, `seaborn` |\n| **Benchmarked Models** | `LogisticRegression`, `RandomForestClassifier`, `SVC`, `XGBClassifier`, `KNeighborsClassifier` |\n| **Evaluation** | `accuracy_score`, `precision_score`, `recall_score`, `f1_score`, `classification_report` |\n\n---\n\n## Data Model & Clinical Schema\n- **Dataset**: `Breast_Cancer.csv` (**4,024 patient records**)\n- **Columns (16)**: `Age`, `Race`, `Marital Status`, `T Stage `, `N Stage`, `6th Stage`, `differentiate`, `Grade`, `A Stage`, `Tumor Size`, `Estrogen Status`, `Progesterone Status`, `Regional Node Examined`, `Reginol Node Positive`, `Survival Months`, `Status`\n\n---\n\n## Getting Started\n```bash\ngit clone https://github.com/islamsamyy/Breast-Cancer-prediction.git\ncd Breast-Cancer-prediction\njupyter notebook breast-cancer-predict.ipynb\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **High-Recall Clinical Triage Support**: Prioritizes minority positive cases via oversampling to minimize missed high-risk patients (for research/decision-support workflows).\n- **Explainable AI (SHAP) Upgrade**: Adding SHAP waterfall plots makes tumor stage, node positivity, and hormone-receptor contributions transparent to oncology researchers.\n",
    "githubUrl": "https://github.com/islamsamyy/Breast-Cancer-prediction"
  },
  {
    "id": "gh-customer-churn-analysis",
    "title": "Customer Churn Analysis",
    "client": "GitHub • islamsamyy/customer-Churn-analysis",
    "companyLogo": "/projects/gh-customer-churn-analysis/overview.svg",
    "category": "Data Analysis & Power BI",
    "role": "Creator & Lead Engineer",
    "impactMetric": "Open Source",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "Power BI"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/customer-Churn-analysis"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "Power BI"
    ],
    "summary": "Power BI telecom customer churn analytics dashboard. customer-Churn-analysis is a Power BI retention analytics solution (customer Churn.pbix) built over 7,043 telecom subscriber records (Telco Churn Data.csv). It diagnoses why customers cancel, quantifies Monthly Recurring Revenue (MRR) at risk, and segments churn across contract types, tenure cohorts, internet services, tech-support adoption, and billing methods. 1. Clone: git clone https://github.com/islamsamyy/customer-Churn-analysis.git 2. Open customer Churn.pbix in Power BI Desktop.",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Data Model & Dataset Schema",
      "BI Metrics & Retention Capabilities",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Dataset: Telco Churn Data.csv (7,043 rows)",
      "Demographics: customerID, gender, SeniorCitizen, Partner, Dependents",
      "Services: tenure, PhoneService, MultipleLines, InternetService, OnlineSecurity, OnlineBackup, DeviceProtection, TechSupport, StreamingTV, StreamingMovies",
      "Billing & Target: Contract, PaperlessBilling, PaymentMethod, MonthlyCharges, TotalCharges, Churn",
      "Contract & Payment Risk Profiling: Compare churn across Month-to-Month vs. 1-Year/2-Year contracts and Electronic Check vs. auto-pay methods.",
      "Value-Added Service Stickiness: Measure how OnlineSecurity and TechSupport reduce churn rates."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/customer-Churn-analysis",
    "featured": false,
    "challenge": "customer-Churn-analysis is a Power BI retention analytics solution (customer Churn.pbix) built over 7,043 telecom subscriber records (Telco Churn Data.csv). It diagnoses why customers cancel, quantifies Monthly Recurring Revenue (MRR) at risk, and segments churn across contract types, tenure cohorts, internet services, tech-support adoption, and billing methods. 1. Clone: git clone https://github.com/islamsamyy/customer-Churn-analysis.git 2. Open customer Churn.pbix in Power BI Desktop.",
    "solution": "1. Clone: git clone https://github.com/islamsamyy/customer-Churn-analysis.git 2. Open customer Churn.pbix in Power BI Desktop. The platform is built using Power BI, combining modular service boundaries, clean state management, and automated validation. Every module is documented in islamsamyy/customer-Churn-analysis with reproducible setup instructions, clear data flows, and production-ready patterns.",
    "keyDecisions": [
      {
        "title": "Core Architecture: Power BI",
        "rationale": "Selected Power BI to deliver high reliability, clean modularity, and fast iteration for Customer Churn Analysis.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/customer-Churn-analysis.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Data Model & Dataset Schema",
      "BI Metrics & Retention Capabilities",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "3 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "1 Stack",
        "description": "Power BI"
      }
    ],
    "galleryImages": [
      "/projects/gh-customer-churn-analysis/overview.svg",
      "/projects/gh-customer-churn-analysis/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 3",
        "description": "Data Model & Dataset Schema"
      },
      {
        "title": "Capability 4",
        "description": "BI Metrics & Retention Capabilities"
      }
    ],
    "readmeContent": "# Telecom Customer Churn Analysis (`customer-Churn-analysis`) — Power BI Retention Intelligence\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Dataset Schema](#data-model--dataset-schema)\n- [BI Metrics & Retention Capabilities](#bi-metrics--retention-capabilities)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`customer-Churn-analysis` is a Power BI retention analytics solution (`customer Churn.pbix`) built over **7,043 telecom subscriber records** (`Telco Churn Data.csv`). It diagnoses why customers cancel, quantifies Monthly Recurring Revenue (MRR) at risk, and segments churn across contract types, tenure cohorts, internet services, tech-support adoption, and billing methods.\n\n---\n\n## System Architecture & Layers\n```mermaid\nflowchart LR\n    L1[\"1. Subscriber Dataset (Telco Churn Data.csv • 7,043 rows)\"] --> L2[\"2. Power BI Semantic & DAX Layer (customer Churn.pbix)\"] --> L3[\"3. Retention Dashboards & Cohort Drill-Downs\"]\n```\n\n| Layer | Artifact | Role |\n| :--- | :--- | :--- |\n| **Data Source Layer** | `Telco Churn Data.csv` | 7,043 customer accounts across 21 demographic, service, and billing attributes |\n| **Semantic & DAX Layer** | `customer Churn.pbix` | Churn rate %, revenue at risk, tenure bucketing, and service attach-rate measures |\n| **Presentation Layer** | `customer Churn.pbix` | Interactive Power BI report for CRM & executive retention teams |\n\n---\n\n## Data Model & Dataset Schema\n- **Dataset**: `Telco Churn Data.csv` (**7,043 rows**)\n- **Columns (21)**:\n  - **Demographics**: `customerID`, `gender`, `SeniorCitizen`, `Partner`, `Dependents`\n  - **Services**: `tenure`, `PhoneService`, `MultipleLines`, `InternetService`, `OnlineSecurity`, `OnlineBackup`, `DeviceProtection`, `TechSupport`, `StreamingTV`, `StreamingMovies`\n  - **Billing & Target**: `Contract`, `PaperlessBilling`, `PaymentMethod`, `MonthlyCharges`, `TotalCharges`, `Churn`\n\n---\n\n## BI Metrics & Retention Capabilities\n- **Contract & Payment Risk Profiling**: Compare churn across Month-to-Month vs. 1-Year/2-Year contracts and Electronic Check vs. auto-pay methods.\n- **Value-Added Service Stickiness**: Measure how `OnlineSecurity` and `TechSupport` reduce churn rates.\n\n---\n\n## Getting Started\n1. Clone: `git clone https://github.com/islamsamyy/customer-Churn-analysis.git`\n2. Open `customer Churn.pbix` in **Power BI Desktop**.\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Targeted Win-Back & Loyalty Offers**: Retaining even 5% of high-MRR month-to-month subscribers yields massive LTV expansion compared to paid acquisition.\n- **ML Churn Scoring Upgrade**: Train an `XGBClassifier` on `Telco Churn Data.csv` to score active customers' churn probability inside Power BI and trigger automated CRM retention workflows.\n",
    "githubUrl": "https://github.com/islamsamyy/customer-Churn-analysis"
  },
  {
    "id": "gh-iris-flower-classification",
    "title": "Iris Flower Classification",
    "client": "GitHub • islamsamyy/Iris-Flower-Classification",
    "companyLogo": "/projects/gh-iris-flower-classification/screen_1_chart_1.png",
    "category": "AI & Machine Learning",
    "role": "Creator & Lead Engineer",
    "impactMetric": "Jupyter Notebook",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "Jupyter Notebook"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/Iris-Flower-Classification"
      },
      {
        "label": "Visuals",
        "value": "1 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "Jupyter Notebook",
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn"
    ],
    "summary": "Supervised ML classification of Iris flower species using Python and Jupyter Notebook. Iris-Flower-Classification implements a clean, reproducible supervised machine learning classification workflow in Python (iris.ipynb, 15 cells) on Iris.csv (150 samples) using Logistic Regression to classify Iris-setosa, Iris-versicolor, and Iris-virginica from morphological measurements. Exploratory & evaluation visualization extracted from iris.ipynb: 1. Load & inspect Iris.csv distributions with Seaborn/Matplotlib. 2. Split into training and test sets (traintestsplit). 3. Fit LogisticRegression and evaluate multi-class precision, recall, F1, and accuracy.",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Dataset Schema",
      "Model Pipeline & Evaluation",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Source: Iris.csv (150 rows)",
      "Columns: Id, SepalLengthCm, SepalWidthCm, PetalLengthCm, PetalWidthCm, Species",
      "Load & inspect Iris.csv distributions with Seaborn/Matplotlib.",
      "Split into training and test sets (traintestsplit).",
      "Fit LogisticRegression and evaluate multi-class precision, recall, F1, and accuracy."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/Iris-Flower-Classification",
    "featured": false,
    "challenge": "Iris-Flower-Classification implements a clean, reproducible supervised machine learning classification workflow in Python (iris.ipynb, 15 cells) on Iris.csv (150 samples) using Logistic Regression to classify Iris-setosa, Iris-versicolor, and Iris-virginica from morphological measurements. Exploratory & evaluation visualization extracted from iris.ipynb:",
    "solution": "Exploratory & evaluation visualization extracted from iris.ipynb: The platform is built using Jupyter Notebook, Python, Pandas, NumPy, Matplotlib, Seaborn, combining modular service boundaries, clean state management, and automated validation. Every module is documented in islamsamyy/Iris-Flower-Classification with reproducible setup instructions, clear data flows, and production-ready patterns.",
    "keyDecisions": [
      {
        "title": "Core Architecture: Jupyter Notebook + Python + Pandas",
        "rationale": "Selected Jupyter Notebook, Python, Pandas to deliver high reliability, clean modularity, and fast iteration for Iris Flower Classification.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: NumPy, Matplotlib, Seaborn",
        "rationale": "Integrated NumPy, Matplotlib, Seaborn to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (1 images), and clear module boundaries in islamsamyy/Iris-Flower-Classification.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Dataset Schema",
      "Model Pipeline & Evaluation",
      "Getting Started"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "3 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "1 Image",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "6 Stack",
        "description": "Jupyter Notebook, Python, Pandas, NumPy, Matplotlib, Seaborn"
      }
    ],
    "galleryImages": [
      "/projects/gh-iris-flower-classification/screen_1_chart_1.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Dataset Schema"
      }
    ],
    "readmeContent": "# Iris Flower Classification (`Iris-Flower-Classification`)\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Dataset Schema](#data-model--dataset-schema)\n- [Model Pipeline & Evaluation](#model-pipeline--evaluation)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`Iris-Flower-Classification` implements a clean, reproducible supervised machine learning classification workflow in Python (`iris.ipynb`, 15 cells) on `Iris.csv` (150 samples) using **Logistic Regression** to classify *Iris-setosa*, *Iris-versicolor*, and *Iris-virginica* from morphological measurements.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nExploratory & evaluation visualization extracted from `iris.ipynb`:\n\n![Iris Classification Plot](https://raw.githubusercontent.com/islamsamyy/Iris-Flower-Classification/main/docs/images/chart_1.png)\n\n---\n\n## System Architecture & Layers\n```mermaid\nflowchart LR\n    L1[\"1. Data Ingestion (Iris.csv • Pandas)\"] --> L2[\"2. Exploratory Visualization (Matplotlib • Seaborn)\"]\n    L2 --> L3[\"3. Train/Test Split & Modeling (LogisticRegression)\"]\n    L3 --> L4[\"4. Evaluation (Accuracy, Recall, F1, Classification Report)\"]\n```\n\n| Layer | Tools & Libraries |\n| :--- | :--- |\n| **Data Processing** | `pandas`, `numpy` |\n| **Visualization** | `matplotlib.pyplot`, `seaborn` |\n| **ML Modeling** | `sklearn.model_selection.train_test_split`, `sklearn.linear_model.LogisticRegression` |\n| **Metrics** | `accuracy_score`, `f1_score`, `recall_score`, `classification_report` |\n\n---\n\n## Data Model & Dataset Schema\n- **Source**: `Iris.csv` (**150 rows**)\n- **Columns**: `Id`, `SepalLengthCm`, `SepalWidthCm`, `PetalLengthCm`, `PetalWidthCm`, `Species`\n\n---\n\n## Model Pipeline & Evaluation\n1. Load & inspect `Iris.csv` distributions with Seaborn/Matplotlib.\n2. Split into training and test sets (`train_test_split`).\n3. Fit `LogisticRegression` and evaluate multi-class precision, recall, F1, and accuracy.\n\n---\n\n## Getting Started\n```bash\ngit clone https://github.com/islamsamyy/Iris-Flower-Classification.git\ncd Iris-Flower-Classification\njupyter notebook iris.ipynb\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Modular Tabular Classification Baseline**: Serves as a clean template for rapid multi-class classification PoCs (e.g., product SKU categorization, customer segment classification) and can be wrapped in a FastAPI inference service.\n",
    "githubUrl": "https://github.com/islamsamyy/Iris-Flower-Classification"
  },
  {
    "id": "gh-multi-class-prediction-of-obesity-risk",
    "title": "Multi Class Prediction Of Obesity Risk",
    "client": "GitHub • islamsamyy/Multi-Class-Prediction-of-Obesity-Risk",
    "companyLogo": "/projects/gh-multi-class-prediction-of-obesity-risk/overview.svg",
    "category": "AI & Machine Learning",
    "role": "Creator & Lead Engineer",
    "impactMetric": "Jupyter Notebook",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "Jupyter Notebook"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/Multi-Class-Prediction-of-Obesity-Risk"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "11 Items"
      }
    ],
    "techStack": [
      "Jupyter Notebook",
      "Pandas",
      "NumPy"
    ],
    "summary": "Multi-class ML classification model for obesity risk categories. Multi-Class-Prediction-of-Obesity-Risk is a 38-cell end-to-end machine learning pipeline (multi-class-prediction-of-obesity-risk.ipynb) processing 20,758 training records (train.csv) and 13,840 test records (test.csv). It benchmarks 6 classification algorithms paired with GridSearchCV hyperparameter optimization to stratify individuals into multi-class obesity risk tiers (NObeyesdad) based on biometric and lifestyle habits.",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Data Model & Feature Schema",
      "Model Pipeline & Hyperparameter Tuning",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Training Set: train.csv (20,758 rows, 18 columns including target NObeyesdad)",
      "Test Set: test.csv (13,840 rows, 17 feature columns)",
      "Features: id, Gender, Age, Height, Weight, familyhistorywithoverweight, FAVC (high-caloric food), FCVC (vegetable frequency), NCP (main meals), CAEC (snacking), SMOKE, CH2O (water intake), SCC (calorie monitoring), FAF (physical activity), TUE (tech use), CALC (alcohol), MTRANS (transportation)",
      "Digital Health & InsurTech Risk Stratification: Enables wellness apps, corporate health programs, and insurers to segment metabolic risk early and trigger personalized coaching.",
      "Production Inference API: Export the GridSearchCV-tuned XGBClassifier / GradientBoostingClassifier via joblib behind a FastAPI microservice to power real-time mobile health screenings."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/Multi-Class-Prediction-of-Obesity-Risk",
    "featured": false,
    "challenge": "Multi-Class-Prediction-of-Obesity-Risk is a 38-cell end-to-end machine learning pipeline (multi-class-prediction-of-obesity-risk.ipynb) processing 20,758 training records (train.csv) and 13,840 test records (test.csv). It benchmarks 6 classification algorithms paired with GridSearchCV hyperparameter optimization to stratify individuals into multi-class obesity risk tiers (NObeyesdad) based on biometric and lifestyle habits.",
    "solution": "Multi-Class-Prediction-of-Obesity-Risk is a 38-cell end-to-end machine learning pipeline (multi-class-prediction-of-obesity-risk.ipynb) processing 20,758 training records (train.csv) and 13,840 test records (test.csv). It benchmarks 6 classification algorithms paired with GridSearchCV hyperparameter optimization to stratify individuals into multi-class obesity risk tiers (NObeyesdad) based on biometric and lifestyle habits.",
    "keyDecisions": [
      {
        "title": "Core Architecture: Jupyter Notebook + Pandas + NumPy",
        "rationale": "Selected Jupyter Notebook, Pandas, NumPy to deliver high reliability, clean modularity, and fast iteration for Multi Class Prediction Of Obesity Risk.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/Multi-Class-Prediction-of-Obesity-Risk.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Data Model & Feature Schema",
      "Model Pipeline & Hyperparameter Tuning",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "3 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "3 Stack",
        "description": "Jupyter Notebook, Pandas, NumPy"
      }
    ],
    "galleryImages": [
      "/projects/gh-multi-class-prediction-of-obesity-risk/overview.svg",
      "/projects/gh-multi-class-prediction-of-obesity-risk/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 3",
        "description": "Data Model & Feature Schema"
      },
      {
        "title": "Capability 4",
        "description": "Model Pipeline & Hyperparameter Tuning"
      }
    ],
    "readmeContent": "# Multi-Class Prediction of Obesity Risk (`Multi-Class-Prediction-of-Obesity-Risk`)\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Feature Schema](#data-model--feature-schema)\n- [Model Pipeline & Hyperparameter Tuning](#model-pipeline--hyperparameter-tuning)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`Multi-Class-Prediction-of-Obesity-Risk` is a 38-cell end-to-end machine learning pipeline (`multi-class-prediction-of-obesity-risk.ipynb`) processing **20,758 training records** (`train.csv`) and **13,840 test records** (`test.csv`). It benchmarks **6 classification algorithms** paired with **`GridSearchCV` hyperparameter optimization** to stratify individuals into multi-class obesity risk tiers (`NObeyesdad`) based on biometric and lifestyle habits.\n\n---\n\n## System Architecture & Layers\n```mermaid\nflowchart LR\n    L1[\"1. Ingestion (train.csv: 20,758 • test.csv: 13,840)\"] --> L2[\"2. Transform Layer (LabelEncoder • StandardScaler)\"]\n    L2 --> L3[\"3. GridSearchCV Tuning (6 Classifiers)\"]\n    L3 --> L4[\"4. Multi-Class Evaluation (classification_report)\"]\n```\n\n| Layer | Tools & Libraries |\n| :--- | :--- |\n| **Feature Transformation** | `pandas`, `numpy`, `LabelEncoder`, `StandardScaler` |\n| **Tuning & Validation** | `train_test_split`, `GridSearchCV` |\n| **Benchmarked Algorithms** | `LogisticRegression`, `RandomForestClassifier`, `GradientBoostingClassifier`, `GaussianNB`, `XGBClassifier`, `KNeighborsClassifier` |\n| **Evaluation** | Multi-class Precision, Recall, and F1 via `classification_report` |\n\n---\n\n## Data Model & Feature Schema\n- **Training Set**: `train.csv` (**20,758 rows**, 18 columns including target `NObeyesdad`)\n- **Test Set**: `test.csv` (**13,840 rows**, 17 feature columns)\n- **Features**: `id`, `Gender`, `Age`, `Height`, `Weight`, `family_history_with_overweight`, `FAVC` (high-caloric food), `FCVC` (vegetable frequency), `NCP` (main meals), `CAEC` (snacking), `SMOKE`, `CH2O` (water intake), `SCC` (calorie monitoring), `FAF` (physical activity), `TUE` (tech use), `CALC` (alcohol), `MTRANS` (transportation)\n\n---\n\n## Getting Started\n```bash\ngit clone https://github.com/islamsamyy/Multi-Class-Prediction-of-Obesity-Risk.git\ncd Multi-Class-Prediction-of-Obesity-Risk\njupyter notebook multi-class-prediction-of-obesity-risk.ipynb\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Digital Health & InsurTech Risk Stratification**: Enables wellness apps, corporate health programs, and insurers to segment metabolic risk early and trigger personalized coaching.\n- **Production Inference API**: Export the `GridSearchCV`-tuned `XGBClassifier` / `GradientBoostingClassifier` via `joblib` behind a FastAPI microservice to power real-time mobile health screenings.\n",
    "githubUrl": "https://github.com/islamsamyy/Multi-Class-Prediction-of-Obesity-Risk"
  },
  {
    "id": "gh-startup-expansion-analysis",
    "title": "Startup Expansion & Market ROI Intelligence",
    "client": "GitHub • islamsamyy/Startup-Expansion-Analysis-",
    "companyLogo": "/projects/gh-startup-expansion-analysis/dashboard-overview.jpg",
    "category": "Data Analysis & Power BI",
    "role": "Creator & Lead Engineer",
    "impactMetric": "$5.0M Profit • 150 Stores",
    "metrics": [
      {
        "label": "Total Profit",
        "value": "$5.0M"
      },
      {
        "label": "Marketing ROI",
        "value": "203.5K"
      },
      {
        "label": "Marketing Spend",
        "value": "$428K"
      },
      {
        "label": "ROMS Efficiency",
        "value": "1,890%"
      }
    ],
    "techStack": [
      "Power BI",
      "Python",
      "Jupyter Notebook",
      "K-Means Clustering",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "DAX",
      "Excel"
    ],
    "summary": "Comprehensive Power BI retail analytics and machine learning expansion model evaluating 150 store branches across the United States. Integrates K-Means clustering in Python with an interactive 3-screen executive cockpit (Overview, States, and Cities) to analyze $5M total profit, $428K marketing expenditure, and 1,890% ROMS, delivering 9 strategic recommendations for capital allocation and territory expansion.",
    "architectureHighlights": [
      "Interactive 3-tier Power BI telemetry suite: Executive Overview, State-level Performance, and City Granularity.",
      "Comprehensive business metrics tracked: $5.0M Profit, $428K Marketing Spend, 203.5K ROI, 188.7K ROMS, and 1,890% ROMS efficiency.",
      "Recommendation 1: Optimize Marketing Spending in High-Performing States (California, Texas, Florida) with rigorous ROI verification.",
      "Recommendation 2: Increase Marketing Spend in Mid-Performing States (Tennessee, New Jersey, Arizona) to capture proven revenue upside.",
      "Recommendation 3: Focus on High-Performing Cities (Los Angeles, Chicago, Houston) to isolate success drivers and replicate them nationally.",
      "Recommendation 4: Prioritize Promising Cities with Low Marketing Spend to achieve high growth with minimal capital outlay.",
      "Recommendation 5: Reallocate resources from underperforming areas with high marketing spend but low revenue to more profitable regions.",
      "Recommendation 6: Expand into new regions with targeted feasibility studies focusing on high growth potential and low competitive density.",
      "Recommendation 7: Develop a structured strategic expansion plan evaluating market potential, competition, and logistics infrastructure.",
      "Recommendation 8: Continuously monitor and adjust regional marketing campaigns in real time using interactive dashboard telemetry.",
      "Recommendation 9: Invest in enhanced data visualization and Power BI reporting to facilitate fast, stakeholder-aligned decision-making.",
      "Unsupervised K-Means clustering in Jupyter Notebook to segment store profiles by revenue density and spend efficiency."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/Startup-Expansion-Analysis-",
    "featured": false,
    "challenge": "Retail enterprises and multi-unit startups often face severe challenges allocating expansion capital and marketing budgets across national territories. Without granular state- and city-level unit economics, businesses risk overspending in saturated markets while underfunding high-potential growth regions. In this portfolio of 150 branches across 2 sales regions (138 established stores vs 10 new expansion locations), leadership required clear data visualization to identify why certain territories yielded high revenue despite low marketing spend, and how to restructure budgets for maximum ROI.",
    "solution": "Constructed an end-to-end analytical intelligence platform combining unsupervised Python machine learning with a dark-themed, tri-screen Power BI command center. In Python, standardized commercial metrics and executed K-Means clustering to identify store profitability archetypes. In Power BI, built interconnected dashboards across Overview KPIs, State-level treemaps/scatter plots, and City-level unit distributions. Formulated 9 concrete executive recommendations to optimize high-performing states, scale mid-tier opportunities, and reallocate capital from underperforming branches.",
    "keyDecisions": [
      {
        "title": "Tri-Screen Hierarchical Architecture (Overview -> States -> Cities)",
        "rationale": "Allowed C-level executives to view top-line $5M profit and $428K spend immediately, while enabling regional directors and store managers to drill into specific states (e.g. California vs Texas) and city-level scatter distributions.",
        "tradeOff": "Required building clean star-schema data modeling in Power BI and synchronized cross-filtering across all 3 dashboard pages."
      },
      {
        "title": "Return on Marketing Spend (ROMS) Normalization",
        "rationale": "Raw revenue alone distorts performance by favoring large metropolitan stores. Calculating ROMS (188.7K) and ROMS % (1,890%) provided a fair efficiency benchmark for both established and new expansion branches.",
        "tradeOff": "Required custom DAX measures and handling zero/near-zero spend outlier edge cases in Python prep."
      },
      {
        "title": "Actionable 9-Point Recommendation Framework",
        "rationale": "Directly translated data distributions (e.g. top profitable cities like Elgin, Rochester, and West Palm Beach) into actionable budget optimization steps rather than leaving the dashboards as passive reporting.",
        "tradeOff": "Requires regular dashboard re-ingestion to validate post-implementation ROI changes across the 150 stores."
      }
    ],
    "systemFlow": [
      "1. Raw Ingestion: Ingested 150 store records across commercial attributes (State, City, Sales Region, New Expansion, Spend, Revenue).",
      "2. Feature Engineering: Computed Net Profit, ROI, ROMS, and ROMS % in Python using Pandas and NumPy.",
      "3. Unsupervised Clustering: Performed K-Means clustering in Jupyter Notebook to group branches into investment archetypes.",
      "4. Power BI Modeling: Modeled star schema and DAX measures across Overview, State, and City dimensions.",
      "5. Visual Dashboarding: Built geographic GIS maps, state treemaps, store profit rankings, and marketing-to-revenue scatter matrices.",
      "6. Executive Strategic Plan: Formulated 9 actionable recommendations for regional budget reallocation and territory expansion."
    ],
    "outcomeMetrics": [
      {
        "label": "Total Profit",
        "value": "$5.0M",
        "description": "Consolidated profit generated across 150 analyzed commercial stores."
      },
      {
        "label": "Marketing ROI",
        "value": "203.5K",
        "description": "Overall return on investment index across all evaluated regions."
      },
      {
        "label": "Marketing Spend",
        "value": "$428K",
        "description": "Total capital invested in store marketing and customer acquisition."
      },
      {
        "label": "ROMS Efficiency",
        "value": "1,890%",
        "description": "Return on Marketing Spend ratio proving high operational leverage."
      }
    ],
    "galleryImages": [
      "/projects/gh-startup-expansion-analysis/dashboard-overview.jpg",
      "/projects/gh-startup-expansion-analysis/dashboard-states.jpg",
      "/projects/gh-startup-expansion-analysis/dashboard-cities.jpg"
    ],
    "steps": [
      {
        "title": "1. Regional & State Optimization",
        "description": "Audit ROI in California, Texas, and Florida while scaling spend in high-potential states like Tennessee, New Jersey, and Arizona."
      },
      {
        "title": "2. City-Level Capital Reallocation",
        "description": "Direct capital to low-spend high-yield cities and replicate Los Angeles, Chicago, and Houston operational models."
      },
      {
        "title": "3. Strategic New Territory Expansion",
        "description": "Leverage the 10 pilot expansion branches to execute structured feasibility studies in high-margin, low-competition markets."
      },
      {
        "title": "4. Continuous Monitoring & Visual BI",
        "description": "Use live Power BI interactive dashboards for continuous telemetry, rapid feedback loops, and stakeholder alignment."
      }
    ],
    "readmeContent": "# Startup Expansion & Market ROI Analysis (`Startup-Expansion-Analysis-`) — Power BI & K-Means Clustering\n\n## Executive Summary\nAn enterprise-grade commercial expansion and marketing ROI intelligence suite evaluating **150 stores** across the United States. Combining **Python machine learning (K-Means clustering)** with a **3-screen interactive Power BI executive cockpit**, this project analyzes **$5.0M in total profit**, **$428K in marketing spend**, and an exceptional **1,890% Return on Marketing Spend (ROMS)** to guide territory expansion and capital allocation.\n\n---\n\n## Interactive Power BI Dashboard Showcase\n\n### 1. Executive Overview Dashboard\nKey Metrics: **$5M Profit** | **203.50K ROI** | **$428K Marketing Spend** | **188.70K ROMS** | **1.89K% ROMS Ratio**\n- **Revenue by Sales Region**: Region 1 (43.3% / $3M) vs Region 2 (56.7% / $3M)\n- **Store Distribution**: 138 Established Stores (93.24%) vs 10 New Expansion Locations (6.76%)\n- **Geographic Mapping**: Store revenue and marketing spend distributed across US states and cities\n\n![Executive Overview Dashboard](/projects/gh-startup-expansion-analysis/dashboard-overview.jpg)\n\n---\n\n### 2. States Performance Analysis\n- **Top Revenue States**: California, Texas, Florida, Washington, Illinois, Alabama, New York, Connecticut, Georgia, Colorado\n- **Store Profitability Rankings**: Identified top 10 most profitable and 10 least profitable store locations\n- **Spend vs Revenue Scatter**: Precise correlation between state marketing allocations and generated returns\n- **Profit by State Treemap**: Visualizing revenue density across all 50 states\n\n![States Performance Analysis](/projects/gh-startup-expansion-analysis/dashboard-states.jpg)\n\n---\n\n### 3. City-Level Granularity & Unit Economics\n- **Top Profitable Cities**: Deep dive into Elgin, Rochester, West Palm Beach, Rialto, Temecula, Ventura, Murrieta, Lewisville, and Wichita Falls\n- **City Marketing Efficiency**: Highlighting cities with high revenue but minimal marketing expenditure\n- **Distribution Analysis**: Clustering stores by revenue brackets ($0K to $100K+) against local marketing budgets\n\n![City-Level Granularity Dashboard](/projects/gh-startup-expansion-analysis/dashboard-cities.jpg)\n\n---\n\n## Strategic Recommendations (Executive Action Plan)\n\nBased on the multi-dimensional analysis across the 150 store locations, the following 9 strategic recommendations have been developed:\n\n### 1. Optimize Marketing Spending in High-Performing States\n**California**, **Texas**, and **Florida** are among the top states in terms of total revenue. However, it is essential to ensure that the marketing spend in these states provides a strong return on investment (ROI). Conduct a detailed ROI analysis for these states to determine if the marketing budget can be optimized further without diminishing revenue velocity.\n\n### 2. Increase Marketing Spend in Mid-Performing States\nStates like **Tennessee**, **New Jersey**, and **Arizona** demonstrate strong potential for growth with relatively lower marketing spend compared to their revenue output. Increasing the marketing budget in these states can deliver a significant boost in incremental revenue with high capital efficiency.\n\n### 3. Focus on High-Performing Cities\nMajor metropolitan hubs like **Los Angeles**, **Chicago**, and **Houston** contribute significantly to overall revenue. Drill down into these specific cities to understand the unique operational and marketing factors driving their success, and replicate those proven playbooks in secondary markets.\n\n### 4. Invest in Promising Cities with Low Marketing Spend\nCities displaying high revenue despite low marketing expenditures (e.g., specific high-performing municipalities in California, Texas, and Florida) must be prioritized for increased marketing investment. These cities offer immediate growth potential with relatively low incremental cost.\n\n### 5. Reallocate Resources from Underperforming Areas\nCities and states with high marketing spend but lagging revenue must be reviewed immediately. Reduce the marketing budget in these unprofitable or saturated areas and reallocate capital toward higher-margin, under-marketed regions.\n\n### 6. Expand into New Regions\nThe **\"New Expansion\"** segment reveals compelling potential for greenfield territory growth. Conduct formal feasibility studies to identify the most promising new regional markets, focusing on territories with high demand indicators and low competitive density.\n\n### 7. Develop a Strategic Expansion Plan\nBased on the geographic and clustering analysis, formulate a phased strategic roadmap for entering new territories. Evaluate market potential, competitor presence, logistics, and infrastructure requirements prior to capital commitment.\n\n### 8. Monitor and Adjust Marketing Strategies in Real Time\nContinuously track the performance of regional and municipal marketing campaigns using the Power BI telemetry cockpit. Leverage real-time dashboards to dynamically adjust budget allocations based on emerging ROI signals.\n\n### 9. Invest in Data Visualization and Stakeholder Reporting\nContinuously enhance the Power BI dashboards with interactive drill-throughs, predictive scenario modeling, and automated alerting to facilitate faster, data-driven decisions across executive leadership.\n\n---\n\n## Technical Architecture & Pipeline\n\n```mermaid\nflowchart TD\n    A[\"Raw Commercial Dataset (150 Store Records)\"] --> B[\"Python / Pandas Preprocessing & Metric Engineering\"]\n    B --> C[\"K-Means Clustering & Segmentation (Jupyter Notebook)\"]\n    C --> D[\"Cleaned & Enriched Dataset (modified.csv)\"]\n    D --> E[\"Power BI Star Schema & DAX Modeling (nm.pbix)\"]\n    E --> F1[\"Overview Dashboard (KPIs, Maps, Regions)\"]\n    E --> F2[\"States Analysis (Treemaps, Spend vs Revenue)\"]\n    E --> F3[\"Cities Analysis (Top Profitable Cities, Scatter)\"]\n    F1 & F2 & F3 --> G[\"9-Point Strategic Executive Recommendation Plan\"]\n```\n\n| Component | Technology | Role |\n| :--- | :--- | :--- |\n| **Data Ingestion & Cleaning** | Python, Pandas, NumPy | Cleansed 150 commercial store records from Excel |\n| **Metric Engineering** | Python, DAX | Engineered Profit, ROI, ROMS, and ROMS % ratios |\n| **Unsupervised Segmentation** | `sklearn.cluster.KMeans` | Clustered store performance profiles |\n| **Business Intelligence** | Microsoft Power BI (`nm.pbix`) | 3-page interactive executive cockpit with GIS mapping |\n| **Exploratory Visuals** | Matplotlib, Seaborn | Distribution analysis and correlation plots in Jupyter |\n\n---\n\n## Key Metrics Summary\n- **Total Stores Analyzed**: 150\n- **Total Portfolio Profit**: $5.0M\n- **Total Marketing Spend**: $428K\n- **Portfolio Marketing ROI**: 203.50K\n- **Return on Marketing Spend (ROMS)**: $188.70K\n- **ROMS Efficiency Ratio**: 1,890%\n- **Sales Regions**: Region 1 ($3.0M / 43.3%) • Region 2 ($3.0M / 56.7%)\n- **Store Status**: 138 Established (93.24%) • 10 New Expansion (6.76%)\n",
    "githubUrl": "https://github.com/islamsamyy/Startup-Expansion-Analysis-"
  },
  {
    "id": "gh-supply-chain",
    "title": "Supply Chain",
    "client": "GitHub • islamsamyy/supply-chain-",
    "companyLogo": "/projects/gh-supply-chain/overview.svg",
    "category": "Data Analysis & Power BI",
    "role": "Creator & Lead Engineer",
    "impactMetric": "Open Source",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "Power BI"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/supply-chain-"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "Power BI"
    ],
    "summary": "Power BI supply chain analytics dashboard for shipments, products, and regional sales. supply-chain- is an executive Business Intelligence solution built in Power BI (supply chain.pbix) on a 5,000-row transactional shipment dataset (Shipment.csv) joined with normalized dimension tables (Country.csv, Product.csv, SalesPerson.csv). It provides operations and sales leadership with immediate visibility into delivery SLA performance, regional revenue, product unit margins, and salesperson productivity. 1. Clone the repository: git clone https://github.com/islamsamyy/supply-chain-.git 2. Open supply chain.pbix in Power BI Desktop. 3. Update CSV data source paths if refreshing locally.",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Data Model & Star Schema",
      "BI Metrics & Analytical Capabilities",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Gross Margin & Costing: Join Shipment.Sales against Product[Cost per Box] to track net profitability by product category and region.",
      "Delivery SLA & Status Monitoring: Track Status and Delivered On vs. Date to spot late corridors.",
      "Sales Leaderboard: Compare rep and team performance with photo-enriched cards (SalesPerson.Picture).",
      "Clone the repository: git clone https://github.com/islamsamyy/supply-chain-.git",
      "Open supply chain.pbix in Power BI Desktop.",
      "Update CSV data source paths if refreshing locally."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/supply-chain-",
    "featured": false,
    "challenge": "supply-chain- is an executive Business Intelligence solution built in Power BI (supply chain.pbix) on a 5,000-row transactional shipment dataset (Shipment.csv) joined with normalized dimension tables (Country.csv, Product.csv, SalesPerson.csv). It provides operations and sales leadership with immediate visibility into delivery SLA performance, regional revenue, product unit margins, and salesperson productivity. 1. Clone the repository: git clone https://github.com/islamsamyy/supply-chain-.git 2. Open supply chain.pbix in Power BI Desktop. 3. Update CSV data source paths if refreshing locally.",
    "solution": "1. Clone the repository: git clone https://github.com/islamsamyy/supply-chain-.git 2. Open supply chain.pbix in Power BI Desktop. 3. Update CSV data source paths if refreshing locally. The platform is built using Power BI, combining modular service boundaries, clean state management, and automated validation. Every module is documented in islamsamyy/supply-chain- with reproducible setup instructions, clear data flows, and production-ready patterns.",
    "keyDecisions": [
      {
        "title": "Core Architecture: Power BI",
        "rationale": "Selected Power BI to deliver high reliability, clean modularity, and fast iteration for Supply Chain.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/supply-chain-.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "System Architecture & Layers",
      "Data Model & Star Schema",
      "BI Metrics & Analytical Capabilities",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "3 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "1 Stack",
        "description": "Power BI"
      }
    ],
    "galleryImages": [
      "/projects/gh-supply-chain/overview.svg",
      "/projects/gh-supply-chain/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 3",
        "description": "Data Model & Star Schema"
      },
      {
        "title": "Capability 4",
        "description": "BI Metrics & Analytical Capabilities"
      }
    ],
    "readmeContent": "# Supply Chain Analytics Dashboard (`supply-chain-`) — Power BI Star-Schema Intelligence\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Star Schema](#data-model--star-schema)\n- [BI Metrics & Analytical Capabilities](#bi-metrics--analytical-capabilities)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`supply-chain-` is an executive Business Intelligence solution built in **Power BI** (`supply chain.pbix`) on a **5,000-row transactional shipment dataset** (`Shipment.csv`) joined with normalized dimension tables (`Country.csv`, `Product.csv`, `SalesPerson.csv`). It provides operations and sales leadership with immediate visibility into delivery SLA performance, regional revenue, product unit margins, and salesperson productivity.\n\n---\n\n## System Architecture & Layers\n```mermaid\nflowchart LR\n    subgraph L1[\"1. Source Data Layer (CSVs)\"]\n        C[\"Country.csv (10 regions)\"]\n        P[\"Product.csv (10 SKUs)\"]\n        SP[\"SalesPerson.csv (25 reps)\"]\n        S[\"Shipment.csv (5,000 shipments)\"]\n    end\n    subgraph L2[\"2. Semantic & DAX Layer\"]\n        Model[\"Power BI Star Schema & Measures (supply chain.pbix)\"]\n    end\n    subgraph L3[\"3. Presentation & Executive BI Layer\"]\n        Dash[\"Interactive Power BI Dashboards\"]\n    end\n\n    C & P & SP --> S --> Model --> Dash\n```\n\n| Layer | Artifact | Role |\n| :--- | :--- | :--- |\n| **Dimension Layer** | `Country.csv`, `Product.csv`, `SalesPerson.csv` | Geographic markets, product cost catalog, and sales team roster |\n| **Fact Layer** | `Shipment.csv` | 5,000 shipment transactions with status, delivery date, and sales amounts |\n| **BI & DAX Layer** | `supply chain.pbix` | Relational star-schema model, KPI calculations, and visual drill-downs |\n\n---\n\n## Data Model & Star Schema\n```mermaid\nerDiagram\n    COUNTRY ||--o{ SHIPMENT : ships_to\n    PRODUCT ||--o{ SHIPMENT : shipped_as\n    SALESPERSON ||--o{ SHIPMENT : closes\n```\n\n| File | Rows | Columns |\n| :--- | :--- | :--- |\n| `Shipment.csv` | 5,000 | `Shipment ID`, `Sales Person`, `Geography`, `Product`, `Date`, `Sales`, `Status`, `Delivered On` |\n| `Country.csv` | 10 | `Geography`, `Region` |\n| `Product.csv` | 10 | `Product`, `Category`, `Cost per Box` |\n| `SalesPerson.csv` | 25 | `Sales Person`, `Team`, `Picture` |\n\n---\n\n## BI Metrics & Analytical Capabilities\n- **Gross Margin & Costing**: Join `Shipment.Sales` against `Product[Cost per Box]` to track net profitability by product category and region.\n- **Delivery SLA & Status Monitoring**: Track `Status` and `Delivered On` vs. `Date` to spot late corridors.\n- **Sales Leaderboard**: Compare rep and team performance with photo-enriched cards (`SalesPerson.Picture`).\n\n---\n\n## Getting Started\n1. Clone the repository: `git clone https://github.com/islamsamyy/supply-chain-.git`\n2. Open `supply chain.pbix` in **Power BI Desktop**.\n3. Update CSV data source paths if refreshing locally.\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Logistics Cost & SLA Optimization**: Pinpoints high-delay geographies and low-margin SKUs to cut freight waste.\n- **Live ERP Gateway Upgrade**: Connect the star schema directly to `sotexerp` or `shamalelhejaz` Postgres views via Power BI Gateway for automated daily executive refreshes.\n",
    "githubUrl": "https://github.com/islamsamyy/supply-chain-"
  },
  {
    "id": "gh-sales-prediction-using-python",
    "title": "Sales Prediction Using Python",
    "client": "GitHub • islamsamyy/Sales-Prediction-using-Python",
    "companyLogo": "/projects/gh-sales-prediction-using-python/screen_1_chart_1.png",
    "category": "AI & Machine Learning",
    "role": "Creator & Lead Engineer",
    "impactMetric": "Jupyter Notebook",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "Jupyter Notebook"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/Sales-Prediction-using-Python"
      },
      {
        "label": "Visuals",
        "value": "8 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "Jupyter Notebook",
      "React",
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn"
    ],
    "summary": "Regression ML model predicting sales from advertising spend using Python. Sales-Prediction-using-Python is a 27-cell machine learning regression project (Sales Prediction using Python.ipynb) predicting product sales from multi-channel advertising budgets (Advertising.csv: TV, Radio, Newspaper). It benchmarks Linear Regression, Support Vector Machines (svm), and Gradient Boosting (GradientBoostingRegressor), scaling performance from an 86% baseline to a 95% accuracy milestone. 8 real exploratory, correlation, residual, and model-fit plots extracted from Sales Prediction using Python.ipynb:",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Dataset Schema",
      "Model Pipeline & Benchmarks",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Dataset: Advertising.csv (200 rows)",
      "Columns: TV, Radio, Newspaper, Sales",
      "Baseline linear/SVM modeling reaches 86% accuracy; feature scaling and GradientBoostingRegressor capture non-linear ad-spend synergies to reach 95% accuracy.",
      "Marketing Mix Modeling (MMM): Helps marketing agencies (such as spider-marketingagencyplateform) allocate client budgets toward channels with the highest marginal sales lift.",
      "Interactive Budget Simulator: Serve the 95%-accuracy GradientBoostingRegressor behind a FastAPI + React slider UI so CMOs can forecast revenue before spending."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/Sales-Prediction-using-Python",
    "featured": false,
    "challenge": "Sales-Prediction-using-Python is a 27-cell machine learning regression project (Sales Prediction using Python.ipynb) predicting product sales from multi-channel advertising budgets (Advertising.csv: TV, Radio, Newspaper). It benchmarks Linear Regression, Support Vector Machines (svm), and Gradient Boosting (GradientBoostingRegressor), scaling performance from an 86% baseline to a 95% accuracy milestone. 8 real exploratory, correlation, residual, and model-fit plots extracted from Sales Prediction using Python.ipynb:",
    "solution": "8 real exploratory, correlation, residual, and model-fit plots extracted from Sales Prediction using Python.ipynb: The platform is built using Jupyter Notebook, React, Python, Pandas, NumPy, Matplotlib, Seaborn, combining modular service boundaries, clean state management, and automated validation. Every module is documented in islamsamyy/Sales-Prediction-using-Python with reproducible setup instructions, clear data flows, and production-ready patterns.",
    "keyDecisions": [
      {
        "title": "Core Architecture: Jupyter Notebook + React + Python",
        "rationale": "Selected Jupyter Notebook, React, Python to deliver high reliability, clean modularity, and fast iteration for Sales Prediction Using Python.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: Pandas, NumPy, Matplotlib",
        "rationale": "Integrated Pandas, NumPy, Matplotlib to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (8 images), and clear module boundaries in islamsamyy/Sales-Prediction-using-Python.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Dataset Schema",
      "Model Pipeline & Benchmarks",
      "Getting Started"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "4 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "8 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "7 Stack",
        "description": "Jupyter Notebook, React, Python, Pandas, NumPy, Matplotlib, Seaborn"
      }
    ],
    "galleryImages": [
      "/projects/gh-sales-prediction-using-python/screen_1_chart_1.png",
      "/projects/gh-sales-prediction-using-python/screen_2_chart_2.png",
      "/projects/gh-sales-prediction-using-python/screen_3_chart_3.png",
      "/projects/gh-sales-prediction-using-python/screen_4_chart_4.png",
      "/projects/gh-sales-prediction-using-python/screen_5_chart_5.png",
      "/projects/gh-sales-prediction-using-python/screen_6_chart_6.png",
      "/projects/gh-sales-prediction-using-python/screen_7_chart_7.png",
      "/projects/gh-sales-prediction-using-python/screen_8_chart_8.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Dataset Schema"
      }
    ],
    "readmeContent": "# Sales Prediction Using Python (`Sales-Prediction-using-Python`) — Multi-Model Ad-Spend Forecasting\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Dataset Schema](#data-model--dataset-schema)\n- [Model Pipeline & Benchmarks](#model-pipeline--benchmarks)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`Sales-Prediction-using-Python` is a 27-cell machine learning regression project (`Sales Prediction using Python.ipynb`) predicting product sales from multi-channel advertising budgets (`Advertising.csv`: TV, Radio, Newspaper). It benchmarks **Linear Regression**, **Support Vector Machines (`svm`)**, and **Gradient Boosting (`GradientBoostingRegressor`)**, scaling performance from an **86% baseline to a 95% accuracy milestone**.\n\n---\n\n## Visual Showcase (UI & Dashboards)\n8 real exploratory, correlation, residual, and model-fit plots extracted from `Sales Prediction using Python.ipynb`:\n\n| Plot 1 | Plot 2 | Plot 3 | Plot 4 |\n| :---: | :---: | :---: | :---: |\n| ![Chart 1](https://raw.githubusercontent.com/islamsamyy/Sales-Prediction-using-Python/main/docs/images/chart_1.png) | ![Chart 2](https://raw.githubusercontent.com/islamsamyy/Sales-Prediction-using-Python/main/docs/images/chart_2.png) | ![Chart 3](https://raw.githubusercontent.com/islamsamyy/Sales-Prediction-using-Python/main/docs/images/chart_3.png) | ![Chart 4](https://raw.githubusercontent.com/islamsamyy/Sales-Prediction-using-Python/main/docs/images/chart_4.png) |\n\n| Plot 5 | Plot 6 | Plot 7 | Plot 8 |\n| :---: | :---: | :---: | :---: |\n| ![Chart 5](https://raw.githubusercontent.com/islamsamyy/Sales-Prediction-using-Python/main/docs/images/chart_5.png) | ![Chart 6](https://raw.githubusercontent.com/islamsamyy/Sales-Prediction-using-Python/main/docs/images/chart_6.png) | ![Chart 7](https://raw.githubusercontent.com/islamsamyy/Sales-Prediction-using-Python/main/docs/images/chart_7.png) | ![Chart 8](https://raw.githubusercontent.com/islamsamyy/Sales-Prediction-using-Python/main/docs/images/chart_8.png) |\n\n---\n\n## System Architecture & Layers\n```mermaid\nflowchart LR\n    L1[\"1. Ingestion (Advertising.csv • 200 campaigns)\"] --> L2[\"2. EDA & Scaling (Seaborn • StandardScaler • train_test_split)\"]\n    L2 --> L3[\"3. Regression Models (LinearRegression • SVM • GradientBoostingRegressor)\"]\n    L3 --> L4[\"4. Evaluation (MSE • R² Score • 86% → 95% Milestones)\"]\n```\n\n| Layer | Tools & Libraries |\n| :--- | :--- |\n| **Data & Scaling** | `pandas`, `numpy`, `StandardScaler`, `train_test_split` |\n| **Visualization** | `matplotlib.pyplot`, `seaborn` (8 analytical plots) |\n| **Models Benchmarked** | `LinearRegression`, `GradientBoostingRegressor`, `sklearn.svm` |\n| **Metrics** | `mean_squared_error`, `r2_score` |\n\n---\n\n## Data Model & Dataset Schema\n- **Dataset**: `Advertising.csv` (**200 rows**)\n- **Columns**: `TV`, `Radio`, `Newspaper`, `Sales`\n\n---\n\n## Model Pipeline & Benchmarks\n- Baseline linear/SVM modeling reaches **86% accuracy**; feature scaling and `GradientBoostingRegressor` capture non-linear ad-spend synergies to reach **95% accuracy**.\n\n---\n\n## Getting Started\n```bash\ngit clone https://github.com/islamsamyy/Sales-Prediction-using-Python.git\ncd Sales-Prediction-using-Python\njupyter notebook \"Sales Prediction using Python.ipynb\"\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Marketing Mix Modeling (MMM)**: Helps marketing agencies (such as `spider-marketingagencyplateform`) allocate client budgets toward channels with the highest marginal sales lift.\n- **Interactive Budget Simulator**: Serve the 95%-accuracy `GradientBoostingRegressor` behind a FastAPI + React slider UI so CMOs can forecast revenue before spending.\n",
    "githubUrl": "https://github.com/islamsamyy/Sales-Prediction-using-Python"
  },
  {
    "id": "gh-unemployment-data-in-india",
    "title": "Unemployment Data In India",
    "client": "GitHub • islamsamyy/Unemployment-Data-in-India",
    "companyLogo": "/projects/gh-unemployment-data-in-india/overview.svg",
    "category": "Data Analysis & Power BI",
    "role": "Creator & Lead Engineer",
    "impactMetric": "Jupyter Notebook",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "Jupyter Notebook"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/Unemployment-Data-in-India"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "Jupyter Notebook",
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn"
    ],
    "summary": "Unemployment-Data-in-India is a 33-cell Python Exploratory Data Analysis (EDA) project (Untitled-1.ipynb) examining state-by-state and month-by-month labor market dynamics across India (UnemploymentRateupto112020.csv - final.csv). Using Pandas, Matplotlib, Seaborn, and interactive Plotly charts (plotly.express & plotly.graphobjects), it visualizes regional shocks, labor participation shifts, and geospatial hotspots. Statistical & temporal visualizations extracted from Untitled-1.ipynb:",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Dataset Schema",
      "Analytical Modules",
      "Getting Started",
      "Business Value, ROI & Growth Opportunities",
      "Source & Output: UnemploymentRateupto112020.csv - final.csv (267 records)",
      "Columns: state, date, frequency, estimated unemployment rate, estimated employed, estimated labour participation rate, region, longitude, latitude, Monthint, Monthname",
      "Data Cleaning & Calendar Extraction: Normalizes column names, parses dates, and extracts Monthint and Monthname.",
      "State & Regional Heatmaps: Compares unemployment rates and labor participation across Indian regions and coordinates.",
      "Workforce & EdTech Market Sizing: Helps hiring marketplaces (bidjobsup) and online academies (fairer-academy) target high-unemployment states with localized upskilling and remote-work campaigns."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/Unemployment-Data-in-India",
    "featured": false,
    "challenge": "Unemployment-Data-in-India is a 33-cell Python Exploratory Data Analysis (EDA) project (Untitled-1.ipynb) examining state-by-state and month-by-month labor market dynamics across India (UnemploymentRateupto112020.csv - final.csv). Using Pandas, Matplotlib, Seaborn, and interactive Plotly charts (plotly.express & plotly.graphobjects), it visualizes regional shocks, labor participation shifts, and geospatial hotspots. Statistical & temporal visualizations extracted from Untitled-1.ipynb:",
    "solution": "Statistical & temporal visualizations extracted from Untitled-1.ipynb: The platform is built using Jupyter Notebook, Python, Pandas, NumPy, Matplotlib, Seaborn, combining modular service boundaries, clean state management, and automated validation. Every module is documented in islamsamyy/Unemployment-Data-in-India with reproducible setup instructions, clear data flows, and production-ready patterns.",
    "keyDecisions": [
      {
        "title": "Core Architecture: Jupyter Notebook + Python + Pandas",
        "rationale": "Selected Jupyter Notebook, Python, Pandas to deliver high reliability, clean modularity, and fast iteration for Unemployment Data In India.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: NumPy, Matplotlib, Seaborn",
        "rationale": "Integrated NumPy, Matplotlib, Seaborn to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/Unemployment-Data-in-India.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Dataset Schema",
      "Analytical Modules",
      "Getting Started"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "3 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "6 Stack",
        "description": "Jupyter Notebook, Python, Pandas, NumPy, Matplotlib, Seaborn"
      }
    ],
    "galleryImages": [
      "/projects/gh-unemployment-data-in-india/overview.svg",
      "/projects/gh-unemployment-data-in-india/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Dataset Schema"
      }
    ],
    "readmeContent": "# Unemployment Data Analysis in India (`Unemployment-Data-in-India`) — Temporal & Geospatial EDA\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Dataset Schema](#data-model--dataset-schema)\n- [Analytical Modules](#analytical-modules)\n- [Getting Started](#getting-started)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`Unemployment-Data-in-India` is a 33-cell Python Exploratory Data Analysis (EDA) project (`Untitled-1.ipynb`) examining state-by-state and month-by-month labor market dynamics across India (`Unemployment_Rate_upto_11_2020.csv` -> `final.csv`). Using Pandas, Matplotlib, Seaborn, and interactive Plotly charts (`plotly.express` & `plotly.graph_objects`), it visualizes regional shocks, labor participation shifts, and geospatial hotspots.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nStatistical & temporal visualizations extracted from `Untitled-1.ipynb`:\n\n| Distribution & Trend Analysis | Regional Comparison | Temporal Shock View |\n| :---: | :---: | :---: |\n| ![Chart 1](https://raw.githubusercontent.com/islamsamyy/Unemployment-Data-in-India/main/docs/images/chart_1.png) | ![Chart 2](https://raw.githubusercontent.com/islamsamyy/Unemployment-Data-in-India/main/docs/images/chart_2.png) | ![Chart 3](https://raw.githubusercontent.com/islamsamyy/Unemployment-Data-in-India/main/docs/images/chart_3.png) |\n\n---\n\n## System Architecture & Layers\n```mermaid\nflowchart LR\n    L1[\"1. Raw CSV (Unemployment_Rate_upto_11_2020.csv)\"] --> L2[\"2. Temporal & Geo Prep (datetime, calendar -> final.csv)\"]\n    L2 --> L3[\"3. Static EDA (Matplotlib & Seaborn)\"]\n    L2 --> L4[\"4. Interactive Geo/Time Visuals (Plotly Express & Graph Objects)\"]\n```\n\n| Layer | Tools & Artifacts |\n| :--- | :--- |\n| **Ingestion & Feature Engineering** | `pandas`, `numpy`, `datetime`, `calendar` (`final.csv`) |\n| **Static Statistical Plots** | `matplotlib.pyplot`, `seaborn` |\n| **Interactive Visuals** | `plotly.express`, `plotly.graph_objects` (geospatial `longitude`/`latitude` + monthly trends) |\n\n---\n\n## Data Model & Dataset Schema\n- **Source & Output**: `Unemployment_Rate_upto_11_2020.csv` -> `final.csv` (**267 records**)\n- **Columns**: `state`, `date`, `frequency`, `estimated unemployment rate`, `estimated employed`, `estimated labour participation rate`, `region`, `longitude`, `latitude`, `Month_int`, `Month_name`\n\n---\n\n## Analytical Modules\n- **Data Cleaning & Calendar Extraction**: Normalizes column names, parses dates, and extracts `Month_int` and `Month_name`.\n- **State & Regional Heatmaps**: Compares unemployment rates and labor participation across Indian regions and coordinates.\n\n---\n\n## Getting Started\n```bash\ngit clone https://github.com/islamsamyy/Unemployment-Data-in-India.git\ncd Unemployment-Data-in-India\njupyter notebook Untitled-1.ipynb\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Workforce & EdTech Market Sizing**: Helps hiring marketplaces (`bidjobsup`) and online academies (`fairer-academy`) target high-unemployment states with localized upskilling and remote-work campaigns.\n- **Interactive Public Data App**: Wrap the Plotly figures in Streamlit/Dash connected to live labor-force feeds for ongoing macroeconomic intelligence.\n",
    "githubUrl": "https://github.com/islamsamyy/Unemployment-Data-in-India"
  },
  {
    "id": "gh-faireer",
    "title": "Faireer",
    "client": "GitHub • islamsamyy/faireer",
    "companyLogo": "/projects/gh-faireer/logo.png",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "1 ★ GitHub",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/faireer"
      },
      {
        "label": "Visuals",
        "value": "1 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Supabase"
    ],
    "summary": "Modern Next.js & TypeScript web application styled with Tailwind CSS and shadcn/ui. faireer (fairer-app) is a full-stack Next.js and Supabase EdTech marketplace designed to connect learners, instructors, and scholarship sponsors. Beyond standard course sales (/courses, /cart, /checkout), it closes the loop between education and employment through verifiable certificates (/certificates), sponsored scholarships (/scholarships), community support (/support/chat, /support/community), and a direct /bidjobs career bridge. Hero and branding visuals stored in public/: subgraph L2[\"2. E-Commerce & Cart State Layer\"] Cart[\"CartContext.tsx - /cart - /checkout\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Learning Flows",
      "Application Modules & Workflows",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Student Flow: Discover (/courses, /search) - Add to Cart (CartContext) - Checkout (/checkout) - Learn (/courses/lesson) - Certify (/certificates) - Apply for Work (/bidjobs).",
      "Instructor Flow: Create Course (/courses/create) - Track Sales & Enrollments (/dashboard/instructor, /dashboard/orders).",
      "Courses: /courses, /courses/[id], /courses/lesson, /courses/create",
      "Commerce: /cart, /checkout, /dashboard/orders",
      "Dashboards: /dashboard, /dashboard/instructor, /dashboard/admin, /dashboard/notifications"
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/faireer",
    "featured": false,
    "challenge": "faireer (fairer-app) is a full-stack Next.js and Supabase EdTech marketplace designed to connect learners, instructors, and scholarship sponsors. Beyond standard course sales (/courses, /cart, /checkout), it closes the loop between education and employment through verifiable certificates (/certificates), sponsored scholarships (/scholarships), community support (/support/chat, /support/community), and a direct /bidjobs career bridge. Hero and branding visuals stored in public/:",
    "solution": "Hero and branding visuals stored in public/: subgraph L2[\"2. E-Commerce & Cart State Layer\"] Cart[\"CartContext.tsx - /cart - /checkout\"] end subgraph L3[\"3. Multi-Role Dashboards & Support Layer\"] Dash[\"/dashboard • /dashboard/instructor • /dashboard/admin • /dashboard/orders • /dashboard/notifications\"] Sup[\"/support/{page,chat,community,contact}\"] end subgraph L4[\"4. Middleware & Supabase Data Layer\"] MW[\"src/middleware.ts\"] Supa[\"src/lib/supabase.ts\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Supabase",
        "rationale": "Selected TypeScript, Next.js, Supabase to deliver high reliability, clean modularity, and fast iteration for Faireer.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (1 images), and clear module boundaries in islamsamyy/faireer.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Learning Flows",
      "Application Modules & Workflows",
      "Getting Started & Scripts"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "5 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "1 Image",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "3 Stack",
        "description": "TypeScript, Next.js, Supabase"
      }
    ],
    "galleryImages": [
      "/projects/gh-faireer/screen_1_hero-v2.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Learning Flows"
      }
    ],
    "readmeContent": "# Faireer (`faireer`) — EdTech Course Marketplace, Scholarships & Career Bridge\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/faireer/main/public/logo.png\" alt=\"Faireer Logo\" width=\"180\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Learning Flows](#data-model--learning-flows)\n- [Application Modules & Workflows](#application-modules--workflows)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`faireer` (`fairer-app`) is a full-stack Next.js and Supabase EdTech marketplace designed to connect learners, instructors, and scholarship sponsors. Beyond standard course sales (`/courses`, `/cart`, `/checkout`), it closes the loop between education and employment through verifiable certificates (`/certificates`), sponsored scholarships (`/scholarships`), community support (`/support/chat`, `/support/community`), and a direct `/bidjobs` career bridge.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nHero and branding visuals stored in `public/`:\n\n| Platform Hero Visual | Brand Identity |\n| :---: | :---: |\n| ![Faireer Hero](https://raw.githubusercontent.com/islamsamyy/faireer/main/public/hero-v2.png) | ![Faireer Logo](https://raw.githubusercontent.com/islamsamyy/faireer/main/public/logo.png) |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Learning & Discovery Layer\"]\n        Courses[\"/courses • /courses/[id] • /courses/lesson • /courses/create • /search\"]\n        Creds[\"/certificates • /scholarships • /bidjobs • /[username]\"]\n    end\n\n    subgraph L2[\"2. E-Commerce & Cart State Layer\"]\n        Cart[\"CartContext.tsx -> /cart -> /checkout\"]\n    end\n\n    subgraph L3[\"3. Multi-Role Dashboards & Support Layer\"]\n        Dash[\"/dashboard • /dashboard/instructor • /dashboard/admin • /dashboard/orders • /dashboard/notifications\"]\n        Sup[\"/support/{page,chat,community,contact}\"]\n    end\n\n    subgraph L4[\"4. Middleware & Supabase Data Layer\"]\n        MW[\"src/middleware.ts\"]\n        Supa[\"src/lib/supabase.ts\"]\n    end\n\n    L1 --> L2 --> L4\n    L3 --> L4\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Learning Experience Layer** | Course catalog, creation wizard, lesson player, certificates, scholarships, and public `[username]` profiles | `src/app/courses/*`, `src/app/{certificates,scholarships,bidjobs,[username]}/page.tsx` |\n| **Commerce & Cart Layer** | Client shopping cart state (`CartContext.tsx`) and checkout pipeline | `src/context/CartContext.tsx`, `src/app/{cart,checkout}/page.tsx` |\n| **Multi-Role Operations Layer** | Student, Instructor, and Admin dashboards with order and notification views | `src/app/dashboard/{page,instructor,admin,orders,notifications}/page.tsx` |\n| **Support & Community Layer** | Live support chat, community forums, and contact forms | `src/app/support/{page,chat,community,contact}/page.tsx` |\n| **Auth & Persistence Layer** | Request middleware and Supabase client | `src/middleware.ts`, `src/lib/supabase.ts`, `src/components/Header.tsx` |\n\n---\n\n## Data Model & Learning Flows\n- **Student Flow**: Discover (`/courses`, `/search`) -> Add to Cart (`CartContext`) -> Checkout (`/checkout`) -> Learn (`/courses/lesson`) -> Certify (`/certificates`) -> Apply for Work (`/bidjobs`).\n- **Instructor Flow**: Create Course (`/courses/create`) -> Track Sales & Enrollments (`/dashboard/instructor`, `/dashboard/orders`).\n\n---\n\n## Application Modules & Workflows\n- **Courses**: `/courses`, `/courses/[id]`, `/courses/lesson`, `/courses/create`\n- **Commerce**: `/cart`, `/checkout`, `/dashboard/orders`\n- **Dashboards**: `/dashboard`, `/dashboard/instructor`, `/dashboard/admin`, `/dashboard/notifications`\n- **Auth & Profiles**: `/login`, `/signup`, `/profile`, `/settings`, `/[username]`\n- **Support & Career**: `/support`, `/support/chat`, `/support/community`, `/support/contact`, `/scholarships`, `/certificates`, `/bidjobs`\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/faireer.git\ncd faireer\nnpm install\nnpm run dev\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Learn-to-Earn Retention**: Connecting `/certificates` to `/bidjobs` increases course completion rates and platform stickiness.\n- **Sponsored Seat Revenue (`/scholarships`)**: Sell bulk scholarship cohorts to NGOs, universities, and corporate CSR programs.\n- **Creator Marketplace Economics**: Take a platform commission on instructor-created courses while offering zero-setup hosting and student support.\n",
    "githubUrl": "https://github.com/islamsamyy/faireer"
  },
  {
    "id": "gh-fakret-mashrou-final",
    "title": "Fakret Mashrou Final",
    "client": "GitHub • islamsamyy/fakret-mashrou-final-",
    "companyLogo": "/projects/gh-fakret-mashrou-final/overview.svg",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/fakret-mashrou-final-"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Next.js 16",
      "React",
      "Supabase",
      "Stripe",
      "shadcn/ui"
    ],
    "summary": "Arabic startup & investor matching platform with KYC, funding progress, Stripe checkout, and analytics. fakret-mashrou-final- (arabic-platform) is a production-grade Next.js 16 and Supabase startup fundraising and investor matching marketplace. Founders pitch ideas (/add-idea), complete identity verification (/kyc), and manage capital raises (/dashboard/founder), while investors discover vetted opportunities (/discover, /opportunities/[id], /leaderboard), execute race-condition-safe investments (/api/invest), and track portfolios (/dashboard/investor)—backed by Upstash rate limiting, Stripe webhook idempotency, and structured Pino logging. Brand identity (public/LOGO.svg) and key interactive surfaces: - Founder & Investor Portals: /dashboard/founder, /dashboard/investor, /funding-progress (Recharts visualizations) - Deal Discovery & Trust: /discover, /opportunities/[id], /leaderboard, /k",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Atomic Investment Guarantees",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Founder & Investor Portals: /dashboard/founder, /dashboard/investor, /funding-progress (Recharts visualizations)",
      "Deal Discovery & Trust: /discover, /opportunities/[id], /leaderboard, /kyc, /admin/kyc",
      "Concurrency Safety: 20260426createconfirminvestmentrpc.sql and 20260426fixinvestmentrace.sql prevent double-allocation / oversubscription during concurrent investments.",
      "Webhook Idempotency: 20260426addwebhookidempotency.sql logs processed Stripe events in stripewebhookevents to guarantee at-most-once billing updates."
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/fakret-mashrou-final-",
    "featured": false,
    "challenge": "fakret-mashrou-final- (arabic-platform) is a production-grade Next.js 16 and Supabase startup fundraising and investor matching marketplace. Founders pitch ideas (/add-idea), complete identity verification (/kyc), and manage capital raises (/dashboard/founder), while investors discover vetted opportunities (/discover, /opportunities/[id], /leaderboard), execute race-condition-safe investments (/api/invest), and track portfolios (/dashboard/investor)—backed by Upstash rate limiting, Stripe webhook idempotency, and structured Pino logging. Brand identity (public/LOGO.svg) and key interactive surfaces: - Founder & Investor Portals: /dashboard/founder, /dashboard/investor, /funding-progress (Recharts visualizations) - Deal Discovery & Trust: /discover, /opportunities/[id], /leaderboard, /kyc, /admin/kyc",
    "solution": "Brand identity (public/LOGO.svg) and key interactive surfaces: - Founder & Investor Portals: /dashboard/founder, /dashboard/investor, /funding-progress (Recharts visualizations) - Deal Discovery & Trust: /discover, /opportunities/[id], /leaderboard, /kyc, /admin/kyc subgraph L2[\"2. Dual-Role Portal & KYC Layer\"] Founder[\"/dashboard/founder • /add-idea • /projects/[id]/edit\"] Investor[\"/dashboard/investor • /portfolio • /messages • /notifications • /kyc\"] Admin[\"/admin • /admin/kyc (KYCReviewClient) • /admin/users\"] end subgraph L3[\"3. API, Matching, Billing & Security Layer\"] APIs[\"/api/invest • /api/match • /api/search • /api/projects/{create,filter} • /api/notifications/email\"] Stripe[\"/checkout + /api/webhooks/stripe (Idempotent)\"] Sec[\"@upstash/ratelimit • isomorphic-dompurify • zod • pino\"] end subgraph L4[\"4. Atomic RPC & Persistence Layer\"] PG[\"Supabase Postgres + 33 Migrations + confirminvestment RPC\"] QA[\"Playwright E2E + testspritetests\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Next.js 16",
        "rationale": "Selected TypeScript, Next.js, Next.js 16 to deliver high reliability, clean modularity, and fast iteration for Fakret Mashrou Final.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: React, Supabase, Stripe",
        "rationale": "Integrated React, Supabase, Stripe to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/fakret-mashrou-final-.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Atomic Investment Guarantees",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "6 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "7 Stack",
        "description": "TypeScript, Next.js, Next.js 16, React, Supabase, Stripe, shadcn/ui"
      }
    ],
    "galleryImages": [
      "/projects/gh-fakret-mashrou-final/overview.svg",
      "/projects/gh-fakret-mashrou-final/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Atomic Investment Guarantees"
      }
    ],
    "readmeContent": "# Fakret Mashrou (`fakret-mashrou-final-`) — Arabic Startup Pitch, KYC & Investor Deal-Flow Platform\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/fakret-mashrou-final-/main/public/LOGO.svg\" alt=\"Fakret Mashrou Logo\" width=\"180\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Atomic Investment Guarantees](#data-model--atomic-investment-guarantees)\n- [Database Schema, Migrations & RLS](#database-schema-migrations--rls)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`fakret-mashrou-final-` (`arabic-platform`) is a production-grade Next.js 16 and Supabase startup fundraising and investor matching marketplace. Founders pitch ideas (`/add-idea`), complete identity verification (`/kyc`), and manage capital raises (`/dashboard/founder`), while investors discover vetted opportunities (`/discover`, `/opportunities/[id]`, `/leaderboard`), execute race-condition-safe investments (`/api/invest`), and track portfolios (`/dashboard/investor`)—backed by Upstash rate limiting, Stripe webhook idempotency, and structured Pino logging.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nBrand identity (`public/LOGO.svg`) and key interactive surfaces:\n- **Founder & Investor Portals**: `/dashboard/founder`, `/dashboard/investor`, `/funding-progress` (Recharts visualizations)\n- **Deal Discovery & Trust**: `/discover`, `/opportunities/[id]`, `/leaderboard`, `/kyc`, `/admin/kyc`\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Public Discovery & Visualization Layer\"]\n        Pub[\"/landing • /discover • /opportunities/[id] • /investors • /leaderboard • /funding-progress • /pricing\"]\n        UI[\"@base-ui/react • shadcn/ui • Recharts • Sonner\"]\n    end\n\n    subgraph L2[\"2. Dual-Role Portal & KYC Layer\"]\n        Founder[\"/dashboard/founder • /add-idea • /projects/[id]/edit\"]\n        Investor[\"/dashboard/investor • /portfolio • /messages • /notifications • /kyc\"]\n        Admin[\"/admin • /admin/kyc (KYCReviewClient) • /admin/users\"]\n    end\n\n    subgraph L3[\"3. API, Matching, Billing & Security Layer\"]\n        APIs[\"/api/invest • /api/match • /api/search • /api/projects/{create,filter} • /api/notifications/email\"]\n        Stripe[\"/checkout + /api/webhooks/stripe (Idempotent)\"]\n        Sec[\"@upstash/ratelimit • isomorphic-dompurify • zod • pino\"]\n    end\n\n    subgraph L4[\"4. Atomic RPC & Persistence Layer\"]\n        PG[\"Supabase Postgres + 33 Migrations + confirm_investment RPC\"]\n        QA[\"Playwright E2E + testsprite_tests\"]\n    end\n\n    L1 --> L2 --> L3 --> L4\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Marketplace & Charts Layer** | Opportunity discovery, funding progress charts (`recharts`), leaderboards, and blog | `app/{discover,opportunities,investors,leaderboard,funding-progress}/page.tsx` |\n| **Founder & Investor Workspaces** | Role dashboards, project editing, saved deals, messaging, and notifications | `app/dashboard/{founder,investor}/page.tsx`, `app/{add-idea,messages,notifications,portfolio}/page.tsx` |\n| **API & Security Layer** | 10 route handlers protected by Upstash rate limiting, DOMPurify sanitization, and Pino structured logs | `app/api/{auth,invest,match,notifications,projects,search,webhooks}/**` |\n| **Atomic Database & RPC Layer** | Race-condition-free investment confirmation (`confirm_investment` RPC), webhook idempotency, FX rates, and audit logs | `migrations/*.sql`, `supabase/migrations/*.sql` |\n| **E2E Verification Layer** | Playwright end-to-end tests and TestSprite specs | `tests/`, `testsprite_tests/` |\n\n---\n\n## Data Model & Atomic Investment Guarantees\n- **Concurrency Safety**: `20260426_create_confirm_investment_rpc.sql` and `20260426_fix_investment_race.sql` prevent double-allocation / oversubscription during concurrent investments.\n- **Webhook Idempotency**: `20260426_add_webhook_idempotency.sql` logs processed Stripe events in `stripe_webhook_events` to guarantee at-most-once billing updates.\n\n---\n\n## Database Schema, Migrations & RLS\n33 SQL migration files across `migrations/` and `supabase/migrations/`:\n\n| Table | Purpose |\n| :--- | :--- |\n| `profiles`, `kyc_verifications`, `kyc_data` | User accounts, roles (Founder/Investor/Admin), and KYC compliance records |\n| `projects`, `investments`, `payouts`, `exchange_rates` | Startup listings, investment commitments, payout ledgers, and currency conversion |\n| `messages`, `saved_opportunities`, `notifications`, `notification_preferences`, `contact_messages` | Deal-room communications, watchlists, and alert preferences |\n| `stripe_webhook_events`, `audit_logs` | Payment idempotency and security/compliance audit trails |\n\n---\n\n## Application Modules & API Endpoints\n\n| Endpoint | Purpose |\n| :--- | :--- |\n| `/api/auth/{login,register}` & `/auth/callback` | Authentication & OAuth callback |\n| `/api/projects/create` & `/api/projects/filter` | Project submission & multi-criteria filtering |\n| `/api/invest` | Atomic investment commitment handler |\n| `/api/match` & `/api/search` | Founder-investor matching & platform search |\n| `/api/notifications/email` | Transactional notification dispatch |\n| `/api/webhooks/stripe` | Idempotent Stripe payment webhook handler |\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/fakret-mashrou-final-.git\ncd fakret-mashrou-final-\nnpm install\nnpm run dev\n```\n\n| Script | Command | Description |\n| :--- | :--- | :--- |\n| Dev | `npm run dev` | Start Next.js 16 dev server |\n| Build | `npm run build` | Production build |\n| Lint | `npm run lint` | Run ESLint |\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Institutional-Grade Deal Integrity**: Atomic investment RPCs and Stripe idempotency make the platform safe for real financial transactions—not just a demo.\n- **Syndicate & Carry Monetization**: Charge platform success fees on closed rounds, featured listing fees via `/checkout`, and premium investor subscriptions (`/pricing`).\n- **Automated AI Due Diligence**: Extend `/api/match` to score pitch decks and financial projections before admin KYC review.\n",
    "githubUrl": "https://github.com/islamsamyy/fakret-mashrou-final-"
  },
  {
    "id": "gh-bidjobsup",
    "title": "Bidjobsup",
    "client": "GitHub • islamsamyy/bidjobsup",
    "companyLogo": "/projects/gh-bidjobsup/logo.png",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/bidjobsup"
      },
      {
        "label": "Visuals",
        "value": "1 Assets"
      },
      {
        "label": "Highlights",
        "value": "11 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Next.js 16",
      "React",
      "Supabase",
      "Stripe",
      "Anthropic SDK",
      "shadcn/ui",
      "next-intl",
      "Framer Motion"
    ],
    "summary": "AI-powered Next.js 16 & Supabase bidding and freelance marketplace with Stripe and Anthropic SDK. bidjobsup (bidjob) is a full-stack Next.js 16, Supabase, Anthropic AI, Resend, and Stripe talent marketplace. It combines competitive job bidding, AI-powered ATS resume optimization (/ats-optimize), milestone contracts & escrow, dispute resolution, community networking, and bilingual (EN/AR) support (/home-ar) into a unified hiring ecosystem powered by 4 progressive Stripe subscription tiers (SEEKERELITE, EMPLOYERPRO, EMPLOYERVISIONARY, EMPLOYERNEXUS). Brand identity and UI iconography assets stored in public/: subgraph L2[\"2. Auth, Dashboard & Internal Ops Layer\"] Auth[\"(auth): sign-in, sign-up, create-profile, forgot/reset-password\"] Ops[\"/dashboard • /admin • /internal • /contact-support\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Marketplace Mechanics",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Multi-Stream Monetization: Combines recurring SaaS subscriptions (4 Stripe tiers), escrow transaction fees on contracts/milestones, and AI ATS optimization credits (atsanalysishistory).",
      "MENA + Global Arbitrage: Arabic-first onboarding (/home-ar) + AI CV optimization positions BidJobs to capture high-growth MENA remote talent and GCC employers.",
      "Enterprise HR API: Expose /ats-optimize/batch as a metered B2B API for enterprise recruitment teams."
    ],
    "liveDemoUrl": "https://bidjobsup.vercel.app",
    "featured": false,
    "challenge": "bidjobsup (bidjob) is a full-stack Next.js 16, Supabase, Anthropic AI, Resend, and Stripe talent marketplace. It combines competitive job bidding, AI-powered ATS resume optimization (/ats-optimize), milestone contracts & escrow, dispute resolution, community networking, and bilingual (EN/AR) support (/home-ar) into a unified hiring ecosystem powered by 4 progressive Stripe subscription tiers (SEEKERELITE, EMPLOYERPRO, EMPLOYERVISIONARY, EMPLOYERNEXUS). Brand identity and UI iconography assets stored in public/:",
    "solution": "Brand identity and UI iconography assets stored in public/: subgraph L2[\"2. Auth, Dashboard & Internal Ops Layer\"] Auth[\"(auth): sign-in, sign-up, create-profile, forgot/reset-password\"] Ops[\"/dashboard • /admin • /internal • /contact-support\"] end subgraph L3[\"3. REST API, AI & Billing Layer (16 Route Handlers)\"] AuthAPI[\"/api/auth/{login,logout,register,user}\"] MarketAPI[\"/api/jobs/ • /api/bids/ • /api/contracts/ • /api/upload\"] PayAPI[\"/api/stripe/{checkout,portal,webhook} + Anthropic SDK + Resend\"] end subgraph L4[\"4. Persistence & Migrations Layer\"] Supa[\"Supabase Postgres + 18 SQL Migrations + RLS\"] Obs[\"@vercel/analytics\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Next.js 16",
        "rationale": "Selected TypeScript, Next.js, Next.js 16 to deliver high reliability, clean modularity, and fast iteration for Bidjobsup.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: React, Supabase, Stripe",
        "rationale": "Integrated React, Supabase, Stripe to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (1 images), and clear module boundaries in islamsamyy/bidjobsup.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Marketplace Mechanics",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "6 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "1 Image",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "10 Stack",
        "description": "TypeScript, Next.js, Next.js 16, React, Supabase, Stripe, Anthropic SDK, shadcn/ui, next-intl, Framer Motion"
      }
    ],
    "galleryImages": [
      "/projects/gh-bidjobsup/logo.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Marketplace Mechanics"
      }
    ],
    "readmeContent": "# BidJob (`bidjobsup`) — AI-Powered Talent Bidding, ATS Optimization & Hiring Marketplace\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/bidjobsup/main/public/logo.png\" alt=\"BidJobs Logo\" width=\"180\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Marketplace Mechanics](#data-model--marketplace-mechanics)\n- [Database Schema, Migrations & RLS](#database-schema-migrations--rls)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`bidjobsup` (`bidjob`) is a full-stack Next.js 16, Supabase, Anthropic AI, Resend, and Stripe talent marketplace. It combines **competitive job bidding, AI-powered ATS resume optimization (`/ats-optimize`), milestone contracts & escrow, dispute resolution, community networking, and bilingual (EN/AR) support (`/home-ar`)** into a unified hiring ecosystem powered by 4 progressive Stripe subscription tiers (`SEEKER_ELITE`, `EMPLOYER_PRO`, `EMPLOYER_VISIONARY`, `EMPLOYER_NEXUS`).\n\n---\n\n## Visual Showcase (UI & Dashboards)\nBrand identity and UI iconography assets stored in `public/`:\n\n| Brand Logo | Platform Architecture |\n| :---: | :---: |\n| ![BidJobs Logo](https://raw.githubusercontent.com/islamsamyy/bidjobsup/main/public/logo.png) | Next.js 16 App Router • Supabase SSR • Anthropic AI • Stripe Connect/Billing |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Presentation & Bilingual UI Layer\"]\n        Pub[\"(public): /jobs/browse, /jobs/[id], /talent/[id], /ats-optimize/*, /home-ar, /community, /pricing\"]\n        UI[\"shadcn/ui • Radix UI • Framer Motion • next-intl • React Hook Form + Zod\"]\n    end\n\n    subgraph L2[\"2. Auth, Dashboard & Internal Ops Layer\"]\n        Auth[\"(auth): sign-in, sign-up, create-profile, forgot/reset-password\"]\n        Ops[\"/dashboard • /admin • /internal • /contact-support\"]\n    end\n\n    subgraph L3[\"3. REST API, AI & Billing Layer (16 Route Handlers)\"]\n        AuthAPI[\"/api/auth/{login,logout,register,user}\"]\n        MarketAPI[\"/api/jobs/* • /api/bids/* • /api/contracts/* • /api/upload\"]\n        PayAPI[\"/api/stripe/{checkout,portal,webhook} + Anthropic SDK + Resend\"]\n    end\n\n    subgraph L4[\"4. Persistence & Migrations Layer\"]\n        Supa[\"Supabase Postgres + 18 SQL Migrations + RLS\"]\n        Obs[\"@vercel/analytics\"]\n    end\n\n    L1 --> L2 --> L3 --> L4\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Presentation & i18n Layer** | Job search/browse, talent discovery, Arabic landing (`/home-ar`), community feed, and pricing | `app/(public)/*`, `locales/`, `components/` |\n| **AI ATS Optimization Layer** | Single resume editor, keyword/score results, and batch screening | `app/(public)/ats-optimize/{page,editor,results,batch}/page.tsx` |\n| **REST API Layer** | 16 route handlers covering auth, jobs, bids, contract acceptance, Stripe billing, and file uploads | `app/api/{auth,bids,contracts,jobs,stripe,upload}/**/route.ts` |\n| **AI, Payments & Email Layer** | `@anthropic-ai/sdk` analysis, Stripe subscription webhooks, and Resend transactional emails | `app/api/stripe/*`, `.env.example` |\n| **Database & Governance Layer** | 18 SQL migrations covering jobs, bids, contracts, escrow, disputes, interviews, skills, and community | `supabase/migrations/*.sql`, `app/{admin,internal}/` |\n\n---\n\n## Data Model & Marketplace Mechanics\n```mermaid\nerDiagram\n    JOBS ||--o{ BIDS : receives\n    BIDS ||--o| CONTRACTS : accepted_into\n    CONTRACTS ||--|{ MILESTONES : defines\n    CONTRACTS ||--o{ ESCROW : secured_by\n    CONTRACTS ||--o{ DISPUTES : escalated_to\n    CONTRACTS ||--o{ REVIEWS : rated_via\n    JOBS ||--o{ INTERVIEWS : schedules\n```\n\n---\n\n## Database Schema, Migrations & RLS\n18 SQL migrations in `supabase/migrations/` (including `20260408_*`, `20260409_*`) provision a complete enterprise marketplace schema:\n\n| Domain | Tables |\n| :--- | :--- |\n| **Marketplace & Bidding** | `jobs`, `bids`, `invitations`, `offers`, `offer_notes`, `interviews`, `interview_notes` |\n| **Contracts, Escrow & Billing** | `contracts`, `milestones`, `payments`, `escrow`, `invoices`, `payment_receipts` |\n| **Trust & Disputes** | `disputes`, `dispute_evidence`, `dispute_messages`, `reviews`, `reports` |\n| **AI & Talent Profiles** | `ats_analysis_history`, `portfolio_items`, `skills`, `skill_categories`, `skill_endorsements`, `skill_verifications` |\n| **Community & Support** | `community_posts`, `community_post_likes`, `community_post_comments`, `profile_posts`, `post_likes`, `post_comments`, `comment_likes`, `saved_posts`, `post_mentions`, `contact_messages` |\n\n---\n\n## Application Modules & API Endpoints\n\n| Route | Purpose |\n| :--- | :--- |\n| `/api/auth/{login,logout,register,user}` | Session authentication & user state |\n| `/api/jobs`, `/api/jobs/[id]`, `/api/jobs/[id]/bids` | Job CRUD & job-scoped bid listing |\n| `/api/bids`, `/api/bids/[id]`, `/api/bids/[id]/accept` | Bid submission, updates & contract creation |\n| `/api/contracts`, `/api/contracts/[id]` | Active contract & milestone management |\n| `/api/stripe/{checkout,portal,webhook}` | Subscription checkout, customer portal & webhook sync |\n| `/api/upload` | Resume & portfolio asset upload |\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/bidjobsup.git\ncd bidjobsup\nnpm install\ncp .env.example .env.local\nnpm run dev\n```\n\n**Environment Variables (`.env.example`)**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_SEEKER_ELITE`, `STRIPE_PRICE_EMPLOYER_PRO`, `STRIPE_PRICE_EMPLOYER_VISIONARY`, `STRIPE_PRICE_EMPLOYER_NEXUS`, `RESEND_API_KEY`, `EMAIL_FROM`, `CONTACT_SUPPORT_EMAIL`, `NEXT_PUBLIC_SITE_URL`.\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Multi-Stream Monetization**: Combines recurring SaaS subscriptions (4 Stripe tiers), escrow transaction fees on `contracts`/`milestones`, and AI ATS optimization credits (`ats_analysis_history`).\n- **MENA + Global Arbitrage**: Arabic-first onboarding (`/home-ar`) + AI CV optimization positions BidJobs to capture high-growth MENA remote talent and GCC employers.\n- **Enterprise HR API**: Expose `/ats-optimize/batch` as a metered B2B API for enterprise recruitment teams.\n",
    "githubUrl": "https://github.com/islamsamyy/bidjobsup"
  },
  {
    "id": "gh-idea-business",
    "title": "Idea Business",
    "client": "GitHub • islamsamyy/idea-business",
    "companyLogo": "/projects/gh-idea-business/overview.svg",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/idea-business"
      },
      {
        "label": "Visuals",
        "value": "2 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "Stripe"
    ],
    "summary": "Arabic business & startup idea submission and moderation platform built with Next.js and Supabase. idea-business (arabic-platform) is a full-stack Next.js and Supabase platform designed to connect Arab entrepreneurs with angel and seed investors. It provides dedicated workflows for idea submission (/add-idea), startup editing (/projects/[id]/edit), investor discovery (/discover, /opportunities/[id], /leaderboard), identity verification (/kyc, /admin/kyc), on-platform messaging, and Stripe checkout. Key operational surfaces built with Next.js App Router & Tailwind CSS: - Founder Workspace: /dashboard/founder, /add-idea, /projects/[id]/edit - Investor Deal Room: /dashboard/investor, /discover, /opportunities/[id], /investors, /leaderboard, /funding-progress - Admin & KYC: /admin, /admin/kyc (KYCReviewClient.tsx), /admin/users subgraph L2[\"2. Founder & Investor Portals\"] Found[\"/dashboard/f",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Indexing",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Founder Workspace: /dashboard/founder, /add-idea, /projects/[id]/edit",
      "Investor Deal Room: /dashboard/investor, /discover, /opportunities/[id], /investors, /leaderboard, /funding-progress",
      "Admin & KYC: /admin, /admin/kyc (KYCReviewClient.tsx), /admin/users",
      "Routes: /add-idea, /projects/[id]/edit, /discover, /opportunities/[id], /investors, /leaderboard, /funding-progress, /portfolio, /pricing, /checkout, /kyc, /onboarding, /messages, /notifications, /admin/kyc, /admin/users"
    ],
    "liveDemoUrl": "https://idea-business.vercel.app",
    "featured": false,
    "challenge": "idea-business (arabic-platform) is a full-stack Next.js and Supabase platform designed to connect Arab entrepreneurs with angel and seed investors. It provides dedicated workflows for idea submission (/add-idea), startup editing (/projects/[id]/edit), investor discovery (/discover, /opportunities/[id], /leaderboard), identity verification (/kyc, /admin/kyc), on-platform messaging, and Stripe checkout. Key operational surfaces built with Next.js App Router & Tailwind CSS: - Founder Workspace: /dashboard/founder, /add-idea, /projects/[id]/edit - Investor Deal Room: /dashboard/investor, /discover, /opportunities/[id], /investors, /leaderboard, /funding-progress - Admin & KYC: /admin, /admin/kyc (KYCReviewClient.tsx), /admin/users",
    "solution": "Key operational surfaces built with Next.js App Router & Tailwind CSS: - Founder Workspace: /dashboard/founder, /add-idea, /projects/[id]/edit - Investor Deal Room: /dashboard/investor, /discover, /opportunities/[id], /investors, /leaderboard, /funding-progress - Admin & KYC: /admin, /admin/kyc (KYCReviewClient.tsx), /admin/users subgraph L2[\"2. Founder & Investor Portals\"] Found[\"/dashboard/founder • /add-idea • /projects/[id]/edit\"] Inv[\"/dashboard/investor • /portfolio • /messages • /notifications • /kyc\"] end subgraph L3[\"3. Compliance, Billing & API Layer\"] Admin[\"/admin • /admin/kyc • /admin/users\"] API[\"/checkout • /api/webhooks/stripe • /auth/callback\"] end subgraph L4[\"4. Supabase Database & Migration Layer\"] Supa[\"Supabase Postgres (8 Sequential Migrations + Indexes)\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Tailwind CSS",
        "rationale": "Selected TypeScript, Next.js, Tailwind CSS to deliver high reliability, clean modularity, and fast iteration for Idea Business.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: Supabase, Stripe",
        "rationale": "Integrated Supabase, Stripe to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (2 images), and clear module boundaries in islamsamyy/idea-business.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Indexing",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "5 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "2 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "5 Stack",
        "description": "TypeScript, Next.js, Tailwind CSS, Supabase, Stripe"
      }
    ],
    "galleryImages": [
      "/projects/gh-idea-business/overview.svg",
      "/projects/gh-idea-business/architecture.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Indexing"
      }
    ],
    "readmeContent": "# Idea Business (`idea-business`) — Arabic Founder-Investor & KYC Platform\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Indexing](#data-model--indexing)\n- [Database Schema, Migrations & RLS](#database-schema-migrations--rls)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`idea-business` (`arabic-platform`) is a full-stack Next.js and Supabase platform designed to connect Arab entrepreneurs with angel and seed investors. It provides dedicated workflows for idea submission (`/add-idea`), startup editing (`/projects/[id]/edit`), investor discovery (`/discover`, `/opportunities/[id]`, `/leaderboard`), identity verification (`/kyc`, `/admin/kyc`), on-platform messaging, and Stripe checkout.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nKey operational surfaces built with Next.js App Router & Tailwind CSS:\n- **Founder Workspace**: `/dashboard/founder`, `/add-idea`, `/projects/[id]/edit`\n- **Investor Deal Room**: `/dashboard/investor`, `/discover`, `/opportunities/[id]`, `/investors`, `/leaderboard`, `/funding-progress`\n- **Admin & KYC**: `/admin`, `/admin/kyc` (`KYCReviewClient.tsx`), `/admin/users`\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Public Discovery & Funnel Layer\"]\n        Pub[\"/discover • /opportunities/[id] • /investors • /leaderboard • /funding-progress • /pricing\"]\n    end\n\n    subgraph L2[\"2. Founder & Investor Portals\"]\n        Found[\"/dashboard/founder • /add-idea • /projects/[id]/edit\"]\n        Inv[\"/dashboard/investor • /portfolio • /messages • /notifications • /kyc\"]\n    end\n\n    subgraph L3[\"3. Compliance, Billing & API Layer\"]\n        Admin[\"/admin • /admin/kyc • /admin/users\"]\n        API[\"/checkout • /api/webhooks/stripe • /auth/callback\"]\n    end\n\n    subgraph L4[\"4. Supabase Database & Migration Layer\"]\n        Supa[\"Supabase Postgres (8 Sequential Migrations + Indexes)\"]\n    end\n\n    L1 --> L2 --> L3 --> L4\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Discovery & Showcase** | Opportunity browsing, investor profiles, funding progress, and leaderboards | `app/{discover,opportunities,investors,leaderboard,funding-progress}/page.tsx` |\n| **Role Dashboards & Comms** | Founder & investor dashboards, messaging, notifications, and profile pages | `app/dashboard/{founder,investor}/page.tsx`, `app/{messages,notifications,profile/[id]}/page.tsx` |\n| **KYC & Admin Governance** | KYC submission and admin approval actions | `app/kyc/page.tsx`, `app/admin/kyc/{actions.ts,KYCReviewClient.tsx,page.tsx}` |\n| **Billing & Persistence** | Stripe checkout/webhooks and 8 sequential Supabase SQL migrations | `app/checkout/*`, `app/api/webhooks/stripe/route.ts`, `supabase/migrations/20260417*.sql` |\n\n---\n\n## Data Model & Indexing\nDefined across 8 structured migrations (`20260417000001_create_enums.sql` through `20260417000008_create_indexes.sql`) with dedicated query indexes for fast deal-flow filtering and messaging lookups.\n\n---\n\n## Database Schema, Migrations & RLS\n| Table | Migration | Purpose |\n| :--- | :--- | :--- |\n| `profiles` | `000002_create_profiles.sql` | Founder, Investor, and Admin user profiles |\n| `projects` | `000003_create_projects.sql` | Startup pitches, funding targets, and stages |\n| `investments` | `000004_create_investments.sql` | Investor commitments linked to projects |\n| `messages` | `000005_create_messages.sql` | Direct founder-investor communication |\n| `saved_opportunities` | `000006_create_saved_opportunities.sql` | Investor deal bookmarks / watchlists |\n| `notifications` | `000007_create_notifications.sql` | Real-time platform alerts |\n| `contact_messages` | `supabase/migrations/` | Public inquiry submissions |\n\n---\n\n## Application Modules & API Endpoints\n- **Routes**: `/add-idea`, `/projects/[id]/edit`, `/discover`, `/opportunities/[id]`, `/investors`, `/leaderboard`, `/funding-progress`, `/portfolio`, `/pricing`, `/checkout`, `/kyc`, `/onboarding`, `/messages`, `/notifications`, `/admin/kyc`, `/admin/users`\n- **API Endpoints**:\n  - `app/api/webhooks/stripe/route.ts` — Stripe payment webhook handler\n  - `app/auth/callback/route.ts` — Supabase authentication callback\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/idea-business.git\ncd idea-business\nnpm install\nnpm run dev\n```\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Structured MENA Deal Flow**: Standardizes early-stage startup pitches and investor KYC in Arabic-first markets.\n- **Monetization Channels**: Featured pitch upgrades via `/checkout`, investor pro memberships, and deal syndication fees.\n- **Documentation Artifacts**: Includes `AUDIT_REPORT.md`, `ADMIN_ACCESS_GUIDE.md`, and `ENHANCEMENT_SUMMARY.md` for rapid engineering onboarding.\n",
    "githubUrl": "https://github.com/islamsamyy/idea-business"
  },
  {
    "id": "gh-maadi-website",
    "title": "Maadi Website",
    "client": "GitHub • islamsamyy/maadi-website",
    "companyLogo": "/projects/gh-maadi-website/logo.png",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/maadi-website"
      },
      {
        "label": "Visuals",
        "value": "6 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Next.js 16",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Moyasar"
    ],
    "summary": "Full-stack Next.js & Supabase stone/marble manufacturing catalog, quote request, and admin portal. maadi-website is a full-stack Next.js 16 and Supabase digital commerce and lead-generation platform engineered for Maadi Stone & Marble Manufacturing. It bridges the gap between raw quarry/factory supply and architects, interior designers, contractors, and homeowners by combining a searchable natural stone catalog, interactive visualization tools (Stone Finder, Architectural Visualizer, VR Tour), an educational Academy, and an end-to-end Request-for-Quote (RFQ) pipeline backed by a role-gated /admin portal. Real stone catalog assets served from public/stones/ and rendered across /stones, /stones/[slug], and /tools/: subgraph L2[\"2. Routing, Proxy & API Layer\"] Proxy[\"proxy.ts (Session & Auth Guard)\"] API[\"POST/GET /api/quotes\"] Queries[\"lib/queries.ts (Typed Server Data Layer)\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Analytics",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "/ (app/page.tsx) — Brand landing with HomeClient & HomeInteractiveSections",
      "/stones & /stones/[slug] — Filterable stone catalog (StonesCatalogClient) & detail specs (StoneDetailClient)",
      "/tools/stone-finder, /tools/visualizer, /tools/vr-tour — Interactive material selection & virtual tour",
      "/manufacturing, /projects, /our-story, /academy, /resources, /legal — Authority & trust pages"
    ],
    "liveDemoUrl": "https://github.com/islamsamyy/maadi-website",
    "featured": false,
    "challenge": "maadi-website is a full-stack Next.js 16 and Supabase digital commerce and lead-generation platform engineered for Maadi Stone & Marble Manufacturing. It bridges the gap between raw quarry/factory supply and architects, interior designers, contractors, and homeowners by combining a searchable natural stone catalog, interactive visualization tools (Stone Finder, Architectural Visualizer, VR Tour), an educational Academy, and an end-to-end Request-for-Quote (RFQ) pipeline backed by a role-gated /admin portal. Real stone catalog assets served from public/stones/ and rendered across /stones, /stones/[slug], and /tools/:",
    "solution": "Real stone catalog assets served from public/stones/ and rendered across /stones, /stones/[slug], and /tools/: subgraph L2[\"2. Routing, Proxy & API Layer\"] Proxy[\"proxy.ts (Session & Auth Guard)\"] API[\"POST/GET /api/quotes\"] Queries[\"lib/queries.ts (Typed Server Data Layer)\"] end subgraph L3[\"3. Domain & Admin Operations Layer\"] Admin[\"/admin (/stones, /quotes, /content, /users)\"] Customer[\"/sign-in • /account • /favorites • /request-price\"] end subgraph L4[\"4. Persistence & Auth Layer (Supabase)\"] Clients[\"lib/supabase/{client.ts, server.ts, admin.ts}\"] PG[\"Postgres + RLS (supabase/migrations/0001initialschema.sql)\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Next.js 16",
        "rationale": "Selected TypeScript, Next.js, Next.js 16 to deliver high reliability, clean modularity, and fast iteration for Maadi Website.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: Supabase, PostgreSQL, Stripe",
        "rationale": "Integrated Supabase, PostgreSQL, Stripe to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (6 images), and clear module boundaries in islamsamyy/maadi-website.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Analytics",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "8 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "6 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "7 Stack",
        "description": "TypeScript, Next.js, Next.js 16, Supabase, PostgreSQL, Stripe, Moyasar"
      }
    ],
    "galleryImages": [
      "/projects/gh-maadi-website/screen_1_adonis-beige-turkish-marble.jpg",
      "/projects/gh-maadi-website/screen_2_adranos-white-turkish-marble.jpg",
      "/projects/gh-maadi-website/screen_3_aegean-bordeaux-turkish-marble.jpg",
      "/projects/gh-maadi-website/screen_4_aegean-white-greek-marble.jpg",
      "/projects/gh-maadi-website/screen_5_afyon-white-turkish-marble.jpg",
      "/projects/gh-maadi-website/screen_6_agia-marina-clouded-semi-white.jpg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Analytics"
      }
    ],
    "readmeContent": "# Maadi Website — B2B/B2C Stone & Marble Manufacturing Platform\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/maadi-website/main/public/logo.png\" alt=\"Maadi Stone & Marble Logo\" width=\"180\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Analytics](#data-model--analytics)\n- [Database Schema, Migrations & RLS](#database-schema-migrations--rls)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`maadi-website` is a full-stack Next.js 16 and Supabase digital commerce and lead-generation platform engineered for **Maadi Stone & Marble Manufacturing**. It bridges the gap between raw quarry/factory supply and architects, interior designers, contractors, and homeowners by combining a searchable natural stone catalog, interactive visualization tools (Stone Finder, Architectural Visualizer, VR Tour), an educational Academy, and an end-to-end Request-for-Quote (RFQ) pipeline backed by a role-gated `/admin` portal.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nReal stone catalog assets served from `public/stones/` and rendered across `/stones`, `/stones/[slug]`, and `/tools/*`:\n\n| Adonis Beige Turkish Marble | Adranos White Turkish Marble | Aegean Bordeaux Turkish Marble |\n| :---: | :---: | :---: |\n| ![Adonis Beige](https://raw.githubusercontent.com/islamsamyy/maadi-website/main/public/stones/adonis-beige-turkish-marble.jpg) | ![Adranos White](https://raw.githubusercontent.com/islamsamyy/maadi-website/main/public/stones/adranos-white-turkish-marble.jpg) | ![Aegean Bordeaux](https://raw.githubusercontent.com/islamsamyy/maadi-website/main/public/stones/aegean-bordeaux-turkish-marble.jpg) |\n\n| Aegean White Greek Marble | Afyon White Turkish Marble | Agia Marina Clouded Semi-White |\n| :---: | :---: | :---: |\n| ![Aegean White](https://raw.githubusercontent.com/islamsamyy/maadi-website/main/public/stones/aegean-white-greek-marble.jpg) | ![Afyon White](https://raw.githubusercontent.com/islamsamyy/maadi-website/main/public/stones/afyon-white-turkish-marble.jpg) | ![Agia Marina](https://raw.githubusercontent.com/islamsamyy/maadi-website/main/public/stones/agia-marina-clouded-semi-white.jpg) |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Presentation & Interactive Tools Layer\"]\n        Pages[\"Public Pages (/ • /stones • /projects • /manufacturing • /academy • /resources)\"]\n        Tools[\"Interactive Tools (/tools/stone-finder • /tools/visualizer • /tools/vr-tour)\"]\n        Client[\"Client Components (HomeClient, StonesCatalogClient, StoneDetailClient, QuoteContext)\"]\n    end\n\n    subgraph L2[\"2. Routing, Proxy & API Layer\"]\n        Proxy[\"proxy.ts (Session & Auth Guard)\"]\n        API[\"POST/GET /api/quotes\"]\n        Queries[\"lib/queries.ts (Typed Server Data Layer)\"]\n    end\n\n    subgraph L3[\"3. Domain & Admin Operations Layer\"]\n        Admin[\"/admin (/stones, /quotes, /content, /users)\"]\n        Customer[\"/sign-in • /account • /favorites • /request-price\"]\n    end\n\n    subgraph L4[\"4. Persistence & Auth Layer (Supabase)\"]\n        Clients[\"lib/supabase/{client.ts, server.ts, admin.ts}\"]\n        PG[\"Postgres + RLS (supabase/migrations/0001_initial_schema.sql)\"]\n    end\n\n    L1 --> L2 --> L4\n    L3 --> L2\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Presentation & Interactive Layer** | Responsive storefront, animated counters (`AnimatedCounter`), scroll reveals (`Reveal`), quote cart state (`QuoteContext`), and 3 interactive buyer tools | `components/*.tsx`, `app/tools/{stone-finder,visualizer,vr-tour}/page.tsx` |\n| **Routing & Security Layer** | Request proxy, SSR cookie forwarding, and admin layout guard | `proxy.ts`, `app/admin/layout.tsx` |\n| **API & Query Layer** | RFQ ingestion (`app/api/quotes/route.ts`), typed queries (`lib/queries.ts`), static fallback seed (`lib/stones-data.ts`) | `app/api/quotes/route.ts`, `lib/{queries,stones-data,types}.ts` |\n| **Data & Auth Layer** | Browser, SSR, and service-role Supabase clients with PostgreSQL schema & RLS | `lib/supabase/{client,server,admin}.ts`, `supabase/migrations/0001_initial_schema.sql` |\n\n---\n\n## Data Model & Analytics\nThe platform models natural stone varieties, architectural case studies, educational articles, customer wishlists, and multi-item RFQ submissions (`quote_requests` + `quote_request_items`) alongside newsletter subscribers.\n\n```mermaid\nerDiagram\n    PROFILES ||--o{ FAVORITES : saves\n    STONES ||--o{ FAVORITES : bookmarked_in\n    PROFILES ||--o{ QUOTE_REQUESTS : submits\n    QUOTE_REQUESTS ||--|{ QUOTE_REQUEST_ITEMS : contains\n    STONES ||--o{ QUOTE_REQUEST_ITEMS : referenced_in\n```\n\n---\n\n## Database Schema, Migrations & RLS\nDefined in `supabase/migrations/0001_initial_schema.sql`:\n\n| Table | Purpose |\n| :--- | :--- |\n| `public.profiles` | Authenticated customer and admin user profiles & roles |\n| `public.stones` | Natural stone & marble catalog (slug, origin, finish, specs, imagery) |\n| `public.projects` | Completed architectural & commercial installations |\n| `public.academy_articles` | Technical stone-care, specification, and industry articles |\n| `public.favorites` | User-saved stone shortlists linked to `profiles` and `stones` |\n| `public.quote_requests` | Customer RFQ headers (contact info, project scope, status) |\n| `public.quote_request_items` | Line items linking requested `stones` and quantities to `quote_requests` |\n| `public.newsletter_subscribers` | Marketing & catalog update subscribers |\n\n---\n\n## Application Modules & API Endpoints\n\n### Public & Customer Routes\n- `/` (`app/page.tsx`) — Brand landing with `HomeClient` & `HomeInteractiveSections`\n- `/stones` & `/stones/[slug]` — Filterable stone catalog (`StonesCatalogClient`) & detail specs (`StoneDetailClient`)\n- `/tools/stone-finder`, `/tools/visualizer`, `/tools/vr-tour` — Interactive material selection & virtual tour\n- `/manufacturing`, `/projects`, `/our-story`, `/academy`, `/resources`, `/legal` — Authority & trust pages\n- `/request-price`, `/contact`, `/favorites`, `/account`, `/sign-in` — RFQ submission & customer portal\n\n### Admin Portal (`/admin`)\n- `/admin` — Admin overview (`AdminShell.tsx`)\n- `/admin/stones` — Catalog CRUD\n- `/admin/quotes` — Incoming RFQ triage & pricing workflow\n- `/admin/content` — Projects & academy CMS\n- `/admin/users` — Role & account management\n\n### API Endpoints\n| Endpoint | Purpose |\n| :--- | :--- |\n| `/api/quotes` (`app/api/quotes/route.ts`) | Validates and persists incoming customer RFQ requests and line items |\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/maadi-website.git\ncd maadi-website\nnpm install\ncp .env.example .env.local\n```\n\n**Environment Variables (`.env.example`)**:\n```env\nNEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key\n```\n\n| Script | Command | Description |\n| :--- | :--- | :--- |\n| Dev | `npm run dev` | Start Next.js 16 development server |\n| Build | `npm run build` | Production build |\n| Start | `npm run start` | Serve production build |\n| Lint | `npm run lint` | Run ESLint 9 checks |\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Pre-Qualified B2B Lead Engine**: The combination of `/tools/stone-finder`, `/tools/visualizer`, and `QuoteContext` educates architects and contractors before they submit `/request-price`, cutting sales engineering back-and-forth.\n- **Factory-to-Storefront Sync**: Connect `public.stones` and `public.quote_requests` directly to `wirecut-` production/inventory logs to display live slab stock (m²) and factory lead times.\n- **B2B Trade Portal**: Add tiered wholesale pricing, instant PDF spec-sheet generation, and sample-box ordering via Stripe/Moyasar.\n- **Multilingual Export Expansion**: Add Arabic/French/Italian localization on `/stones/[slug]` to capture international stone import buyers.\n",
    "githubUrl": "https://github.com/islamsamyy/maadi-website"
  },
  {
    "id": "gh-spider-marketingagencyplateform",
    "title": "Spider Marketingagencyplateform",
    "client": "GitHub • islamsamyy/spider-marketingagencyplateform",
    "companyLogo": "/projects/gh-spider-marketingagencyplateform/logo.png",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/spider-marketingagencyplateform"
      },
      {
        "label": "Visuals",
        "value": "6 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Next.js 16",
      "React",
      "Supabase",
      "Stripe",
      "Moyasar",
      "Framer Motion"
    ],
    "summary": "Black Spider Marketing Agency Platform with Stitch-extracted Tailwind design system. spider-marketingagencyplateform (black-spider / spider/) is a full-stack Next.js 16 (16.4.5), React 19, Framer Motion, and Supabase platform engineered for a full-service digital marketing agency. It pairs an interactive, high-converting public showcase (CyberSpiderWeb, /threejs, WhatsAppFAB, service packages, portfolio) with a synchronized /admin back-office for CRM, finance, projects, packages, blog publishing, client reviews, and user governance. Design screens captured from Stitch (stitchsource/ and screenslist.json): subgraph L2[\"2. Admin Back-Office Layer (/admin & /dashboard)\"] Admin[\"/admin/{crm,finance,packages,projects,blog,reviews,users,settings}\"] Shell[\"AdminSidebar • AdminHeader\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Synchronized Store",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Commercial Entities: Marketing Packages, Pricing Tiers, Client Projects, Portfolio Items, Financial Records.",
      "Growth & CRM Entities: CRM Leads, Client Reviews, Blog Articles, Admin Users, Site Settings.",
      "/, /about, /services, /packages, /pricing, /portfolio, /projects, /blog, /threejs, /contact, /dashboard, /privacy, /security, /terms",
      "/admin/login, /admin, /admin/crm, /admin/finance, /admin/packages, /admin/projects, /admin/blog, /admin/reviews, /admin/users, /admin/settings",
      "Zero-Sprawl Agency Operating System: Replaces separate subscriptions for Webflow, HubSpot, and spreadsheets by unifying lead capture, package pricing, CRM, and finance in one repo."
    ],
    "liveDemoUrl": "https://blackspider-smoky.vercel.app",
    "featured": false,
    "challenge": "spider-marketingagencyplateform (black-spider / spider/) is a full-stack Next.js 16 (16.4.5), React 19, Framer Motion, and Supabase platform engineered for a full-service digital marketing agency. It pairs an interactive, high-converting public showcase (CyberSpiderWeb, /threejs, WhatsAppFAB, service packages, portfolio) with a synchronized /admin back-office for CRM, finance, projects, packages, blog publishing, client reviews, and user governance. Design screens captured from Stitch (stitchsource/ and screenslist.json):",
    "solution": "Design screens captured from Stitch (stitchsource/ and screenslist.json): subgraph L2[\"2. Admin Back-Office Layer (/admin & /dashboard)\"] Admin[\"/admin/{crm,finance,packages,projects,blog,reviews,users,settings}\"] Shell[\"AdminSidebar • AdminHeader\"] end subgraph L3[\"3. Synchronized State & API Layer\"] Store[\"spider/lib/store.tsx\"] APIs[\"/api/admin/store • /api/admin/users\"] end subgraph L4[\"4. Persistence, Design Tokens & QA Layer\"] Supa[\"Supabase SSR (spider/lib/supabase.ts & spider/types/database.ts)\"] Tokens[\"tailwindthemeclean.json • tailwindthemedashboard.json\"] Tests[\"Vitest (admin-frontend-sync.test.tsx & full-suite-verification.test.tsx)\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Next.js 16",
        "rationale": "Selected TypeScript, Next.js, Next.js 16 to deliver high reliability, clean modularity, and fast iteration for Spider Marketingagencyplateform.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: React, Supabase, Stripe",
        "rationale": "Integrated React, Supabase, Stripe to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (6 images), and clear module boundaries in islamsamyy/spider-marketingagencyplateform.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Synchronized Store",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "7 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "6 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "8 Stack",
        "description": "TypeScript, Next.js, Next.js 16, React, Supabase, Stripe, Moyasar, Framer Motion"
      }
    ],
    "galleryImages": [
      "/projects/gh-spider-marketingagencyplateform/screen_1_screenshot.png",
      "/projects/gh-spider-marketingagencyplateform/screen_2_screenshot.png",
      "/projects/gh-spider-marketingagencyplateform/screen_3_screenshot.png",
      "/projects/gh-spider-marketingagencyplateform/screen_4_screenshot.png",
      "/projects/gh-spider-marketingagencyplateform/screen_5_screenshot.png",
      "/projects/gh-spider-marketingagencyplateform/screen_6_logo.svg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Synchronized Store"
      }
    ],
    "readmeContent": "# Black Spider (`spider-marketingagencyplateform`) — Marketing Agency Platform & Operations Suite\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/spider-marketingagencyplateform/main/spider/public/logo.svg\" alt=\"Black Spider Logo\" width=\"160\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Synchronized Store](#data-model--synchronized-store)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`spider-marketingagencyplateform` (`black-spider` / `spider/`) is a full-stack Next.js 16 (`16.4.5`), React 19, Framer Motion, and Supabase platform engineered for a full-service digital marketing agency. It pairs an interactive, high-converting public showcase (`CyberSpiderWeb`, `/threejs`, `WhatsAppFAB`, service packages, portfolio) with a synchronized `/admin` back-office for CRM, finance, projects, packages, blog publishing, client reviews, and user governance.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nDesign screens captured from Stitch (`stitch_source/` and `screens_list.json`):\n\n| Home & Services Showcase | Integrated Admin Dashboard | Agency Operations View |\n| :---: | :---: | :---: |\n| ![Home & Services](https://raw.githubusercontent.com/islamsamyy/spider-marketingagencyplateform/main/stitch_source/8181b86f49bc43d8946143e6a508bb65/screenshot.png) | ![Admin Dashboard](https://raw.githubusercontent.com/islamsamyy/spider-marketingagencyplateform/main/stitch_source/1b169ae7282443c7b1e065bc049508da/screenshot.png) | ![Operations Screen](https://raw.githubusercontent.com/islamsamyy/spider-marketingagencyplateform/main/stitch_source/1660bdd1d7b4462288254c7a7358682b/screenshot.png) |\n\n| Packages & Pricing | Portfolio & Case Studies | Settings & CRM View |\n| :---: | :---: | :---: |\n| ![Packages Screen](https://raw.githubusercontent.com/islamsamyy/spider-marketingagencyplateform/main/stitch_source/51ad4365b77240bf95e61c7a7354beb9/screenshot.png) | ![Portfolio Screen](https://raw.githubusercontent.com/islamsamyy/spider-marketingagencyplateform/main/stitch_source/6ac592b4cfc743c7b95ef99c1b96cef/screenshot.png) | ![CRM Screen](https://raw.githubusercontent.com/islamsamyy/spider-marketingagencyplateform/main/stitch_source/d97d3718474e4423bf4b6310c2182970/screenshot.png) |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Brand & Interactive Presentation Layer\"]\n        Pub[\"/ • /about • /services • /packages • /pricing • /portfolio • /projects • /blog • /threejs • /contact\"]\n        FX[\"CyberSpiderWeb • PageTransition • Counter • WhatsAppFAB • Navbar • Footer\"]\n    end\n\n    subgraph L2[\"2. Admin Back-Office Layer (/admin & /dashboard)\"]\n        Admin[\"/admin/{crm,finance,packages,projects,blog,reviews,users,settings}\"]\n        Shell[\"AdminSidebar • AdminHeader\"]\n    end\n\n    subgraph L3[\"3. Synchronized State & API Layer\"]\n        Store[\"spider/lib/store.tsx\"]\n        APIs[\"/api/admin/store • /api/admin/users\"]\n    end\n\n    subgraph L4[\"4. Persistence, Design Tokens & QA Layer\"]\n        Supa[\"Supabase SSR (spider/lib/supabase.ts & spider/types/database.ts)\"]\n        Tokens[\"tailwind_theme_clean.json • tailwind_theme_dashboard.json\"]\n        Tests[\"Vitest (admin-frontend-sync.test.tsx & full-suite-verification.test.tsx)\"]\n    end\n\n    L1 --> L3 --> L4\n    L2 --> L3\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Interactive Brand Layer** | Custom cybernetic spiderweb background, animated counters, page transitions, and WhatsApp lead widget | `spider/components/{CyberSpiderWeb,PageTransition,Counter,WhatsAppFAB,Navbar,Footer}.tsx` |\n| **Public Marketing Funnel** | Agency positioning, tiered packages, transparent pricing, portfolio, 3D demo, and legal pages | `spider/app/{about,services,packages,pricing,portfolio,projects,blog,threejs,contact,privacy,security,terms}/page.tsx` |\n| **Admin Operations Layer** | Internal CRM, financial tracking, package editor, project tracker, CMS, and RBAC users | `spider/app/admin/{crm,finance,packages,projects,blog,reviews,users,settings}/page.tsx` |\n| **Synchronized Store & API** | Real-time admin-to-frontend content sync and user management endpoints | `spider/lib/store.tsx`, `spider/app/api/admin/{store,users}/route.ts` |\n| **Design System & QA Layer** | Extracted Stitch Tailwind v4 tokens and automated Vitest sync tests | `tailwind_theme_*.json`, `spider/__tests__/{admin-frontend-sync,full-suite-verification}.test.tsx` |\n\n---\n\n## Data Model & Synchronized Store\nTyped in `spider/types/database.ts` and synchronized via `spider/lib/store.tsx` + `/api/admin/store`:\n- **Commercial Entities**: Marketing Packages, Pricing Tiers, Client Projects, Portfolio Items, Financial Records.\n- **Growth & CRM Entities**: CRM Leads, Client Reviews, Blog Articles, Admin Users, Site Settings.\n\n---\n\n## Application Modules & API Endpoints\n\n### Public & Client Routes\n- `/`, `/about`, `/services`, `/packages`, `/pricing`, `/portfolio`, `/projects`, `/blog`, `/threejs`, `/contact`, `/dashboard`, `/privacy`, `/security`, `/terms`\n\n### Admin Suite (`/admin`)\n- `/admin/login`, `/admin`, `/admin/crm`, `/admin/finance`, `/admin/packages`, `/admin/projects`, `/admin/blog`, `/admin/reviews`, `/admin/users`, `/admin/settings`\n\n### API Endpoints\n| Route | Purpose |\n| :--- | :--- |\n| `/api/admin/store` | Persists and synchronizes CMS, packages, projects, reviews, and CRM store state |\n| `/api/admin/users` | Admin staff account provisioning and role management |\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/spider-marketingagencyplateform.git\ncd spider-marketingagencyplateform\nnpm --prefix spider install\n```\n\n| Script | Command | Description |\n| :--- | :--- | :--- |\n| Dev | `npm run dev` | Start Next.js 16 dev server on port 3002 (`--webpack`) |\n| Build | `npm run build` | Production build |\n| Lint | `npm run lint` | Run ESLint 9 |\n| Test | `npm test` | Run Vitest (`admin-frontend-sync` & `full-suite-verification`) |\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Zero-Sprawl Agency Operating System**: Replaces separate subscriptions for Webflow, HubSpot, and spreadsheets by unifying lead capture, package pricing, CRM, and finance in one repo.\n- **Self-Serve Retainer Checkout**: Integrate Stripe/Moyasar on `/packages` so clients can purchase monthly marketing retainers online and auto-create a workspace in `/admin/projects`.\n- **Client Reporting Portal**: Upgrade `/dashboard` to pull live Meta/Google Ads ROAS metrics for active retainer clients.\n- **White-Label Agency Template**: Resell the Stitch-themed design system + synchronized admin engine to boutique agencies across MENA.\n",
    "githubUrl": "https://github.com/islamsamyy/spider-marketingagencyplateform"
  },
  {
    "id": "gh-amani-khalii",
    "title": "Amani KhalIi",
    "client": "GitHub • islamsamyy/Amani-KhalIi",
    "companyLogo": "/projects/gh-amani-khalii/logo.png",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/Amani-KhalIi"
      },
      {
        "label": "Visuals",
        "value": "8 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Next.js 16",
      "Supabase",
      "Moyasar"
    ],
    "summary": "Luxury bridal & occasion makeup artist platform in Riyadh with online booking, gallery, and admin CRM. Amani-KhalIi is a bilingual (Arabic-first, English second) Next.js 16 and Supabase luxury beauty booking and business management platform for Amani Khalil, a certified makeup artist providing private in-home sessions across Riyadh, Saudi Arabia. Designed to convert mobile visitors into deposit-secured bookings in under two minutes without requiring account registration, it combines SEO-targeted local landing pages, an artist-capacity-aware booking engine (Asia/Riyadh, SAR), and a full-featured /admin operations suite. Real brand & portfolio photography from public/ and public/gallery/: subgraph L2[\"2. Accountless Guest Booking Layer\"] Book[\"/book (booking-flow-client.tsx)\"] Confirm[\"/book/confirmation (Secure Manage-Booking Link)\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Business Rules",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Timezone & Currency: Strict Asia/Riyadh (UTC+3) display with UTC database persistence and SAR pricing.",
      "Zero Hardcoded Prices: All packages, add-ons, district travel fees, and deposit percentages live in servicepackages, addons, and riyadhareas.",
      "Artist-Aware Capacity: Designed around 2-hour sessions and 2 sessions/day per artist (CLIENTHOME now, STUDIO ready).",
      "Public & Booking Routes: /, /about, /services, /services/vip-bridal, /bridal-makeup-riyadh, /occasion-makeup-riyadh, /gallery, /reviews, /blog, /blog/[slug], /faq, /policies, /contact, /book, /book/confirmation"
    ],
    "liveDemoUrl": "https://amanikhalil.vercel.app",
    "featured": false,
    "challenge": "Amani-KhalIi is a bilingual (Arabic-first, English second) Next.js 16 and Supabase luxury beauty booking and business management platform for Amani Khalil, a certified makeup artist providing private in-home sessions across Riyadh, Saudi Arabia. Designed to convert mobile visitors into deposit-secured bookings in under two minutes without requiring account registration, it combines SEO-targeted local landing pages, an artist-capacity-aware booking engine (Asia/Riyadh, SAR), and a full-featured /admin operations suite. Real brand & portfolio photography from public/ and public/gallery/:",
    "solution": "Real brand & portfolio photography from public/ and public/gallery/: subgraph L2[\"2. Accountless Guest Booking Layer\"] Book[\"/book (booking-flow-client.tsx)\"] Confirm[\"/book/confirmation (Secure Manage-Booking Link)\"] end subgraph L3[\"3. Invite-Only Admin Operations Suite (/admin)\"] Admin[\"/admin/{bookings,calendar,customers,invoices,services,content,blog,settings}\"] Chrome[\"admin-chrome.tsx + Radix UI + Sonner\"] end subgraph L4[\"4. Domain Rules, Persistence & QA Layer\"] Proxy[\"proxy.ts & /auth/callback\"] Supa[\"Supabase Postgres + Server RPCs (002..005 migrations) + /api/supabase/seed\"] Tests[\"Vitest + Testing Library (admin-chrome, notifications, overview)\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Next.js 16",
        "rationale": "Selected TypeScript, Next.js, Next.js 16 to deliver high reliability, clean modularity, and fast iteration for Amani KhalIi.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: Supabase, Moyasar",
        "rationale": "Integrated Supabase, Moyasar to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (8 images), and clear module boundaries in islamsamyy/Amani-KhalIi.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Business Rules",
      "Database Schema, Migrations & RLS",
      "Application Modules & API Endpoints"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "8 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "8 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "5 Stack",
        "description": "TypeScript, Next.js, Next.js 16, Supabase, Moyasar"
      }
    ],
    "galleryImages": [
      "/projects/gh-amani-khalii/screen_1_amani-hero.jpg",
      "/projects/gh-amani-khalii/screen_2_hero_20section_20cover_20.jpeg",
      "/projects/gh-amani-khalii/screen_3_amani_20khalil.jpg",
      "/projects/gh-amani-khalii/screen_4_amani-1.jpg",
      "/projects/gh-amani-khalii/screen_5_amani-2.jpg",
      "/projects/gh-amani-khalii/screen_6_amani-3.jpg",
      "/projects/gh-amani-khalii/screen_7_amani-client-bridal.jpg",
      "/projects/gh-amani-khalii/screen_8_amani-mirror-glam.jpg"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Business Rules"
      }
    ],
    "readmeContent": "# Amani Khalil (`Amani-KhalIi`) — Luxury Bridal & Occasion Makeup Booking Platform (Riyadh)\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/Amani-KhalIi/main/public/ak-logo-full.png\" alt=\"Amani Khalil Studio Logo\" width=\"220\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Business Rules](#data-model--business-rules)\n- [Database Schema, Migrations & RLS](#database-schema-migrations--rls)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`Amani-KhalIi` is a bilingual (Arabic-first, English second) Next.js 16 and Supabase luxury beauty booking and business management platform for **Amani Khalil**, a certified makeup artist providing private in-home sessions across **Riyadh, Saudi Arabia**. Designed to convert mobile visitors into deposit-secured bookings in **under two minutes without requiring account registration**, it combines SEO-targeted local landing pages, an artist-capacity-aware booking engine (`Asia/Riyadh`, `SAR`), and a full-featured `/admin` operations suite.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nReal brand & portfolio photography from `public/` and `public/gallery/`:\n\n| Hero Brand Visual | Studio Portrait | Bridal Client Showcase |\n| :---: | :---: | :---: |\n| ![Amani Hero](https://raw.githubusercontent.com/islamsamyy/Amani-KhalIi/main/public/amani-hero.jpg) | ![Studio Portrait](https://raw.githubusercontent.com/islamsamyy/Amani-KhalIi/main/public/amani-studio-portrait.jpg) | ![Bridal Client](https://raw.githubusercontent.com/islamsamyy/Amani-KhalIi/main/public/amani-client-bridal.jpg) |\n\n| Gallery Look 1 | Gallery Look 2 | Gallery Look 3 |\n| :---: | :---: | :---: |\n| ![Look 1](https://raw.githubusercontent.com/islamsamyy/Amani-KhalIi/main/public/gallery/IMG_5729.webp) | ![Look 2](https://raw.githubusercontent.com/islamsamyy/Amani-KhalIi/main/public/gallery/IMG_5730.webp) | ![Look 3](https://raw.githubusercontent.com/islamsamyy/Amani-KhalIi/main/public/gallery/IMG_5731.webp) |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. Bilingual Marketing & Local SEO Layer\"]\n        Home[\"/ • /about • /services • /services/vip-bridal • /gallery • /reviews • /blog/[slug] • /faq • /policies • /contact\"]\n        LocalSEO[\"/bridal-makeup-riyadh • /occasion-makeup-riyadh\"]\n    end\n\n    subgraph L2[\"2. Accountless Guest Booking Layer\"]\n        Book[\"/book (booking-flow-client.tsx)\"]\n        Confirm[\"/book/confirmation (Secure Manage-Booking Link)\"]\n    end\n\n    subgraph L3[\"3. Invite-Only Admin Operations Suite (/admin)\"]\n        Admin[\"/admin/{bookings,calendar,customers,invoices,services,content,blog,settings}\"]\n        Chrome[\"admin-chrome.tsx + Radix UI + Sonner\"]\n    end\n\n    subgraph L4[\"4. Domain Rules, Persistence & QA Layer\"]\n        Proxy[\"proxy.ts & /auth/callback\"]\n        Supa[\"Supabase Postgres + Server RPCs (002..005 migrations) + /api/supabase/seed\"]\n        Tests[\"Vitest + Testing Library (admin-chrome, notifications, overview)\"]\n    end\n\n    L1 --> L2 --> L4\n    L3 --> L4\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **Marketing & Local SEO Layer** | Arabic-first trust building, animated studio banner, scroll reveals, and Riyadh SEO funnels | `app/(marketing)/*`, `app/{bridal-makeup-riyadh,occasion-makeup-riyadh,services/vip-bridal}/page.tsx` |\n| **Guest Booking Layer** | Frictionless <2 min mobile booking flow with phone verification, Riyadh district travel fees, and confirmation | `app/book/_components/booking-flow-client.tsx`, `app/book/confirmation/_components/confirmation-client.tsx` |\n| **Admin Operations Layer** | Role-gated calendar, booking triage, customer CRM, invoicing, dynamic service pricing, and CMS | `app/admin/{bookings,calendar,customers,invoices,services,content,blog,settings}/page.tsx` |\n| **Security & RPC Layer** | Server-side pricing calculation, atomic booking confirmation RPCs, and invite-only admin auth | `proxy.ts`, `supabase/migrations/002..005*.sql` |\n| **QA & Component Layer** | Radix UI primitives and Vitest component/admin tests | `components/ui/*`, `components/__tests__/*`, `app/admin/_components/__tests__/admin-overview.test.tsx` |\n\n---\n\n## Data Model & Business Rules\n- **Timezone & Currency**: Strict `Asia/Riyadh` (UTC+3) display with UTC database persistence and `SAR` pricing.\n- **Zero Hardcoded Prices**: All packages, add-ons, district travel fees, and deposit percentages live in `service_packages`, `addons`, and `riyadh_areas`.\n- **Artist-Aware Capacity**: Designed around ~2-hour sessions and ~2 sessions/day per artist (`CLIENT_HOME` now, `STUDIO` ready).\n\n```mermaid\nerDiagram\n    SERVICE_PACKAGES ||--o{ BOOKINGS : selected_in\n    RIYADH_AREAS ||--o{ BOOKINGS : determines_travel_fee\n    CUSTOMERS ||--o{ BOOKINGS : places\n    BOOKINGS ||--o| INVOICES : generates\n    BOOKINGS ||--o| REVIEWS : unlocks_consent_review\n```\n\n---\n\n## Database Schema, Migrations & RLS\nDefined across `supabase/schema.sql` and `supabase/migrations/002_relations_security_rpc.sql` through `005_admin_delete_operations.sql`:\n\n| Table | Purpose |\n| :--- | :--- |\n| `public.admin_users` | Invite-only admin accounts & RBAC roles |\n| `public.service_packages` | Dynamic bridal, VIP, and occasion makeup packages & SAR pricing |\n| `public.addons` | Optional add-on services (e.g., hair, trial session, extra guests) |\n| `public.riyadh_areas` | Riyadh neighborhoods and travel fee matrix |\n| `public.customers` | Guest & repeat client CRM records |\n| `public.bookings` | Core appointments, artist assignment, location type, deposit status |\n| `public.invoices` | Booking invoices & payment tracking |\n| `public.blocked_dates` | Calendar availability & blackout dates |\n| `public.reviews`, `public.gallery_looks`, `public.blog_posts`, `public.faqs` | Social proof & CMS content |\n\n---\n\n## Application Modules & API Endpoints\n- **Public & Booking Routes**: `/`, `/about`, `/services`, `/services/vip-bridal`, `/bridal-makeup-riyadh`, `/occasion-makeup-riyadh`, `/gallery`, `/reviews`, `/blog`, `/blog/[slug]`, `/faq`, `/policies`, `/contact`, `/book`, `/book/confirmation`\n- **Admin Routes**: `/admin`, `/admin/login`, `/admin/bookings`, `/admin/calendar`, `/admin/customers`, `/admin/invoices`, `/admin/services`, `/admin/services/new`, `/admin/content`, `/admin/blog`, `/admin/settings`\n- **API Endpoints**:\n  - `app/api/supabase/seed/route.ts` — Database seed initializer\n  - `app/auth/callback/route.ts` — Supabase invite/auth callback\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/Amani-KhalIi.git\ncd Amani-KhalIi\nnpm install\n```\n\n| Script | Command | Description |\n| :--- | :--- | :--- |\n| Dev | `npm run dev` | Start Next.js 16 dev server |\n| Build | `npm run build` | Production build |\n| Start | `npm run start` | Serve production build |\n| Lint | `npm run lint` | Run ESLint 9 |\n| Test | `npm test` | Run Vitest suite |\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Direct Revenue Without Marketplace Fees**: Eliminates manual WhatsApp/DM scheduling friction and retains 100% of bridal/VIP margins.\n- **Multi-Artist Studio Scaling**: Because scheduling and location (`CLIENT_HOME` / `STUDIO`) are already data-driven, Amani can onboard junior artists and operate as a Riyadh luxury beauty agency taking a commission per booking.\n- **Saudi Payments & BNPL (Moyasar / Tabby / Tamara)**: Integrating local Mada, Apple Pay, and Tabby/Tamara installments on `/book` directly lifts high-ticket VIP Bridal conversions.\n- **Automated WhatsApp Lifecycle**: Trigger pre-appointment prep guides and post-session consent review links automatically to compound organic trust.\n",
    "githubUrl": "https://github.com/islamsamyy/Amani-KhalIi"
  },
  {
    "id": "gh-wirecut",
    "title": "Wirecut",
    "client": "GitHub • islamsamyy/wirecut-",
    "companyLogo": "/projects/gh-wirecut/logo.png",
    "category": "ERP Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/wirecut-"
      },
      {
        "label": "Visuals",
        "value": "6 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Next.js 16",
      "React",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL"
    ],
    "summary": "Industrial operations & costing analytics platform for wire-cut production logs, downtime, energy, and inventory. Operations, PLC telemetry, and production costing platform for Marbelila / Maadi Marble multi-wire diamond saw operations ( MWS-01 ). Built with Next.js 16 (App Router, React 19, TypeScript) , Supabase (PostgreSQL 15+, RLS, Auth, Storage) , Tailwind CSS 4 , and Recharts 3 . 1. What It Does & Why It Matters 2. Screenshots 3. Architecture & Layers 4. CSV & PLC Ingestion Pipeline (/api/ingest) 5. Database Schema, Migrations & SQL Views 6. Dashboard Modules & API Routes 7. Access Control, Security & Operations 8. Local Setup & Verification Multi-wire diamond saws cut raw marble blocks where small differences in wire wear, feed rate, or unplanned idle time directly eat into margins. On the floor, data usually ends up split between PLC exports (log.CSV) and operator spreadsheets.",
    "architectureHighlights": [
      "What It Does & Why It Matters",
      "Architecture & Layers",
      "CSV & PLC Ingestion Pipeline (/api/ingest)",
      "Database Schema, Migrations & SQL Views",
      "Dashboard Modules & API Routes",
      "Access Control, Security & Operations",
      "Local Setup & Verification",
      "No placeholder numbers: Missing or inapplicable metrics render as \"—\" via fmt() in lib/kpi.ts, never 0 or NaN.",
      "Formulas stay in SQL: Slab area, wire wear ($m/m^2$), downtime gaps, and unit costs are calculated in Postgres views so UI tables and CSV exports always match.",
      "Service-role isolation: createServiceRoleClient() (lib/db.ts) is server-only and only called after requireRole() passes.",
      "Raw CSV text is saved to raw-logs/ / .",
      "public.importlogpayload(jsonb) atomically inserts the uploadbatches row and upserts operations, details, steps, checks, and the first 500 telemetry rows."
    ],
    "liveDemoUrl": "https://wirecut.vercel.app",
    "featured": false,
    "challenge": "Operations, PLC telemetry, and production costing platform for Marbelila / Maadi Marble multi-wire diamond saw operations ( MWS-01 ). Built with Next.js 16 (App Router, React 19, TypeScript) , Supabase (PostgreSQL 15+, RLS, Auth, Storage) , Tailwind CSS 4 , and Recharts 3 . Multi-wire diamond saws cut raw marble blocks where small differences in wire wear, feed rate, or unplanned idle time directly eat into margins. On the floor, data usually ends up split between PLC exports (log.CSV) and operator spreadsheets. WireCut OS pulls those sources into one Postgres-backed system:",
    "solution": "The app keeps business calculations in PostgreSQL views rather than React components. Next.js Server Components read directly through the user's Supabase session so Row Level Security applies on every query. subgraph L2[\"2. Request & Security Gate (Next.js 16)\"] MW[\"middleware.ts (Supabase SSR Session Check)\"] Headers[\"next.config.ts (CSP, HSTS, X-Frame-Options: DENY)\"] end subgraph L3[\"3. Server Logic, APIs & ETL\"] SC[\"Server Components - createUserServerClient()\"] SA[\"Server Actions (app/dashboard//actions.ts)\"] API[\"Route Handlers (/api/ingest, /api/export, /api/operations/save, /api/health)\"] ETL[\"TypeScript Parsers (lib/clean.ts, lib/ingest.ts, lib/machine-log.ts)\"] end subgraph L4[\"4. Postgres, Auth & Storage (Supabase)\"] Auth[\"Supabase Auth + public.profiles\"] Storage[\"Private Bucket: raw-logs (25 MB limit)\"] RPC[\"public.importlogpayload(jsonb)\"] Tables[\"28 Tables + auditlogtrigger()\"] Views[\"12 SQL KPI Views (securityinvoker = true)\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Next.js 16",
        "rationale": "Selected TypeScript, Next.js, Next.js 16 to deliver high reliability, clean modularity, and fast iteration for Wirecut.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: React, Tailwind CSS, Supabase",
        "rationale": "Integrated React, Tailwind CSS, Supabase to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (6 images), and clear module boundaries in islamsamyy/wirecut-.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "What It Does & Why It Matters",
      "Architecture & Layers",
      "CSV & PLC Ingestion Pipeline (/api/ingest)",
      "Database Schema, Migrations & SQL Views",
      "Dashboard Modules & API Routes",
      "Access Control, Security & Operations"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "15 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "6 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "7 Stack",
        "description": "TypeScript, Next.js, Next.js 16, React, Tailwind CSS, Supabase, PostgreSQL"
      }
    ],
    "galleryImages": [
      "/projects/gh-wirecut/screen_1_37e0cb72351945999556696b5f600f60.png",
      "/projects/gh-wirecut/screen_2_456fffa65a1a44dd9ec964328580c824.png",
      "/projects/gh-wirecut/screen_3_aec4682b481140f38b9e5086c8714335.png",
      "/projects/gh-wirecut/screen_4_c285f87d7aff46aabd93547175640b28.png",
      "/projects/gh-wirecut/screen_5_f0721e168bdb4e18ac359e0fc80ac3ef.png",
      "/projects/gh-wirecut/screen_6_ffdbc38d3a544bc6972fcccd0f8d2100.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "What It Does & Why It Matters"
      },
      {
        "title": "Capability 2",
        "description": "Architecture & Layers"
      },
      {
        "title": "Capability 3",
        "description": "CSV & PLC Ingestion Pipeline (/api/ingest)"
      },
      {
        "title": "Capability 4",
        "description": "Database Schema, Migrations & SQL Views"
      }
    ],
    "readmeContent": "<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/maadi-logo.png\" alt=\"Maadi Marble — WireCut OS\" width=\"140\" />\n</p>\n\n<h1 align=\"center\">WireCut OS</h1>\n\n<p align=\"center\">\n  Operations, PLC telemetry, and production costing platform for <strong>Marbelila / Maadi Marble</strong> multi-wire diamond saw operations (<code>MWS-01</code>).<br />\n  Built with <strong>Next.js 16 (App Router, React 19, TypeScript)</strong>, <strong>Supabase (PostgreSQL 15+, RLS, Auth, Storage)</strong>, <strong>Tailwind CSS 4</strong>, and <strong>Recharts 3</strong>.\n</p>\n\n---\n\n## Contents\n1. [What It Does & Why It Matters](#1-what-it-does--why-it-matters)\n2. [Screenshots](#2-screenshots)\n3. [Architecture & Layers](#3-architecture--layers)\n4. [CSV & PLC Ingestion Pipeline (`/api/ingest`)](#4-csv--plc-ingestion-pipeline-apiingest)\n5. [Database Schema, Migrations & SQL Views](#5-database-schema-migrations--sql-views)\n6. [Dashboard Modules & API Routes](#6-dashboard-modules--api-routes)\n7. [Access Control, Security & Operations](#7-access-control-security--operations)\n8. [Local Setup & Verification](#8-local-setup--verification)\n\n---\n\n## 1. What It Does & Why It Matters\n\nMulti-wire diamond saws cut raw marble blocks where small differences in wire wear, feed rate, or unplanned idle time directly eat into margins. On the floor, data usually ends up split between PLC exports (`log.CSV`) and operator spreadsheets.\n\n**WireCut OS** pulls those sources into one Postgres-backed system:\n\n| Problem on the Floor | How WireCut OS Handles It | Practical Impact |\n| :--- | :--- | :--- |\n| **Wire & groove wear goes untracked** | Tracks wire consumption ($m / m^2$) across `First use` and `Second use` spools and logs roller groove sets `1..6` (`wire_kpis`, `roller_groove_kpis`). | Helps catch abnormal wear before a wire snaps mid-cut and lets you compare wire batches objectively. |\n| **Downtime hides between shifts** | Calculates gaps between consecutive cuts using SQL window functions (`downtime_gaps`) and tags causes (`downtime_reasons`). | Shows real machine utilization (`%`) instead of guessed shift hours. |\n| **PLC plans don't match actual cuts** | Joins PLC planned time, max slices, and planned wire cost (`machine_jobs`) with actual operator logs (`plan_vs_actual`) and 28-channel sensor data. | Flags loop mismatches, feed-speed drops, and tension spikes early. |\n| **Unit costs are rough estimates** | Combines `cost_inputs` (wire $/m, kWh rate, labor, overhead) with slab area ($L \\times W \\times H \\times 52$) in `operation_cost_kpis`. | Gives actual **cost per $m^2$** and **cost per slab** per block, tied directly to customer `orders`. |\n| **Spreadsheet edits leave no trail** | Archives every uploaded CSV in private Supabase Storage (`raw-logs`), logs anomalies in `data_checks`, and records table writes in `audit_log`. | Prevents silent overwrites and keeps a clean audit trail for finance and operations. |\n\n---\n\n## 2. Screenshots\n\n| Production Dashboard | Operations & Cut Tracking |\n| :---: | :---: |\n| ![Production Dashboard](https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/ffdbc38d3a544bc6972fcccd0f8d2100.png) | ![Operations Tracking](https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/c285f87d7aff46aabd93547175640b28.png) |\n| **Wires & Diamond Wear** | **Machine Health & Telemetry** |\n| ![Wire Management](https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/aec4682b481140f38b9e5086c8714335.png) | ![Machine Health](https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/456fffa65a1a44dd9ec964328580c824.png) |\n| **Energy Analytics** | **Upload Log & CSV Ingestor** |\n| ![Energy Analytics](https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/37e0cb72351945999556696b5f600f60.png) | ![Upload Ingestor](https://raw.githubusercontent.com/islamsamyy/wirecut-/main/public/stitch/screenshots/f0721e168bdb4e18ac359e0fc80ac3ef.png) |\n\n---\n\n## 3. Architecture & Layers\n\nThe app keeps business calculations in PostgreSQL views rather than React components. Next.js Server Components read directly through the user's Supabase session so Row Level Security applies on every query.\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. UI Layer (React 19 + Recharts 3 + Tailwind 4)\"]\n        UI[\"19 Dashboard Pages (/dashboard/*)\"]\n        UploadUI[\"CSV Upload / Paste / Preview Form\"]\n        Charts[\"Telemetry Zoom & KPI Charts\"]\n    end\n\n    subgraph L2[\"2. Request & Security Gate (Next.js 16)\"]\n        MW[\"middleware.ts (Supabase SSR Session Check)\"]\n        Headers[\"next.config.ts (CSP, HSTS, X-Frame-Options: DENY)\"]\n    end\n\n    subgraph L3[\"3. Server Logic, APIs & ETL\"]\n        SC[\"Server Components -> createUserServerClient()\"]\n        SA[\"Server Actions (app/dashboard/*/actions.ts)\"]\n        API[\"Route Handlers (/api/ingest*, /api/export, /api/operations/save, /api/health)\"]\n        ETL[\"TypeScript Parsers (lib/clean.ts, lib/ingest.ts, lib/machine-log.ts)\"]\n    end\n\n    subgraph L4[\"4. Postgres, Auth & Storage (Supabase)\"]\n        Auth[\"Supabase Auth + public.profiles\"]\n        Storage[\"Private Bucket: raw-logs (25 MB limit)\"]\n        RPC[\"public.import_log_payload(jsonb)\"]\n        Tables[\"28 Tables + audit_log_trigger()\"]\n        Views[\"12 SQL KPI Views (security_invoker = true)\"]\n    end\n\n    L1 --> L2 --> L3\n    UploadUI --> API\n    UI --> SA\n    SC --> Views\n    API --> ETL --> RPC\n    API --> Storage\n    SA --> Tables\n    RPC --> Tables\n    Tables --> Views\n    Auth --> SC\n    Auth --> SA\n    Auth --> API\n```\n\n### Layer Summary\n\n| Layer | What It Does | Key Files |\n| :--- | :--- | :--- |\n| **UI & Charts** | KPI grids, saw status cards, Recharts graphs, telemetry zoom, and manual operation forms. | `app/dashboard/components/{ActiveSawCards,AnalyticsCharts,DowntimeChart,OperationsTable,ProductionKPIGrid,Sidebar,Header}.tsx` |\n| **Auth Gate & Headers** | Verifies sessions via `supabase.auth.getUser()`, redirects unauthenticated requests to `/login`, and sets security headers. | `middleware.ts`, `next.config.ts` |\n| **API & ETL** | Parses 3 CSV/PLC formats, validates inputs with `zod`, enforces roles via `requireRole()`, and exports CSVs. | `app/api/ingest/*`, `app/api/export/route.ts`, `app/api/operations/save/route.ts`, `app/api/health/route.ts`, `lib/{clean,ingest,machine-log,kpi,auth,db,env}.ts` |\n| **Database & Storage** | 28 tables, 12 `security_invoker` views, atomic `import_log_payload(jsonb)` RPC, `audit_log_trigger()`, and `raw-logs` bucket. | `supabase/migrations/001_schema.sql` – `007_update_slab_factor_52.sql` |\n| **Testing & CI** | TypeScript strict check, ESLint, Vitest unit tests, SQL view checks, Playwright smoke tests, and client-bundle secret scan. | `tests/*.test.ts`, `scripts/test-sql-views.ts`, `e2e/smoke.spec.ts`, `.github/workflows/ci.yml` |\n\n### Key Design Rules\n- **No placeholder numbers:** Missing or inapplicable metrics render as `\"—\"` via `fmt()` in `lib/kpi.ts`, never `0` or `NaN`.\n- **Formulas stay in SQL:** Slab area, wire wear ($m/m^2$), downtime gaps, and unit costs are calculated in Postgres views so UI tables and CSV exports always match.\n- **Service-role isolation:** `createServiceRoleClient()` (`lib/db.ts`) is server-only and only called after `requireRole()` passes.\n\n---\n\n## 4. CSV & PLC Ingestion Pipeline (`/api/ingest`)\n\n`detectCsvKind()` in `lib/ingest.ts` auto-detects three factory file formats from either multipart uploads (`<= 25 MB`, `<= 200,000` lines) or pasted CSV text:\n\n| Format | Detection Key | Source | Tables Written | Notes |\n| :--- | :--- | :--- | :--- | :--- |\n| **Native Machine Log (`log.CSV`)** | `Cutting Number` header | PLC export (`MWS-01`) | `operations`, `machine_jobs`, `operation_steps`, `telemetry`, `data_checks` | 3-block parser: `Block A` header, `Block B` 12-slot step recipe, `Block C` 5-second 28-channel telemetry averaged into 60s buckets. Requires `cuttingDate` (`YYYY-MM-DD`) since PLC files only store time-of-day. Does not create `operation_stones`. |\n| **Flat Operations Log** | `Operation ID` + `Start Date` | Operator logbook | `operations`, `operation_details`, `operation_wire`, `operation_stones`, `wires`, `stones`, `data_checks` | Supports multi-stone rows per operation, Arabic-Indic digits (`٠-٩`), decimal commas (`272,5`), unit suffixes (`2500mm`, `12647.17m`, `21h`), Excel serial dates, and `cm`/`mm` conversion. |\n| **Flat Steps Log** | `Operation ID` + `Steps` + `FeedPos` | Step recipe export | `operation_steps`, `data_checks` | Upserts feed position (`mm`), feed velocity (`mm/min`), line speed (`m/s`), forward/back length (`m`), A1/A2 tension (`N`), and recorded time/wire usage. |\n\n### How Persistence Works\n1. Raw CSV text is saved to `raw-logs/<YYYY-MM-DD>/<timestamp>_<filename>`.\n2. `public.import_log_payload(jsonb)` atomically inserts the `upload_batches` row and upserts operations, details, steps, checks, and the first `500` telemetry rows.\n3. Remaining telemetry rows are upserted in batches of `500` (`onConflict: \"operation_id,ts\"`).\n4. Validation warnings and errors are written to `data_checks` for review in `/dashboard/data-quality`.\n\n---\n\n## 5. Database Schema, Migrations & SQL Views\n\n### Migrations (`supabase/migrations/`)\n1. `001_schema.sql` — Core tables (`settings`, `upload_batches`, `stones`, `wires`, `operations`, `operation_details`, `operation_wire`, `operation_stones`, `operation_steps`, `data_checks`), base KPI views, and stone seed data.\n2. `002_machine_logs.sql` — `machine_jobs`, `telemetry`, `machine_health_kpis`, and `plan_vs_actual`.\n3. `003_production_erp_rls.sql` — `profiles` + `handle_new_user()` first-admin trigger, `audit_log` + `audit_log_trigger()`, ERP tables (`downtime_reasons`, `machine_alert_rules`, `inventory_*`, `roller_grooves`, `maintenance_tasks`, `work_orders`, `cost_inputs`, `customers`, `orders`, `order_lines`, `order_allocations`, `quality_records`), `import_log_payload(jsonb)`, and `raw-logs` Storage policies.\n4. `004_advisor_hardening.sql` — Revokes `PUBLIC`/`anon` execute on `SECURITY DEFINER` functions, sets `security_invoker = true` on all 12 views, adds FK indexes, and splits write RLS policies by operation.\n5. `005_service_role_rpc_fix.sql` — Allows `auth.role() = 'service_role'` inside `import_log_payload(jsonb)`.\n6. `006_machine_log_kpi_visibility.sql` — Adds fallback calculations for native PLC logs (planned area, slices, duration).\n7. `007_update_slab_factor_52.sql` — Updates `slab_factor` default from `53` to `52` (`L(m) × W(m) × H(m) × 52 = Area (m²)`) and aligns cm/mm parsing.\n\n### 12 SQL KPI Views (`security_invoker = true`)\n- `operation_steps_calc` — Step duration, wire travel, and forward/back deltas.\n- `operation_kpis` — Per-cut duration, slab count, area ($m^2$), output rate ($m^2/h$), wire used ($m$ & $m/m^2$), energy ($kWh$ & $kWh/m^2$), loop mismatch flag, stones, and blocks.\n- `wire_kpis` — Per-spool lifetime area, meters consumed, cut count, and wear rate.\n- `stone_kpis` — Cut volume, area, average speed, and energy/wire intensity by stone type.\n- `operator_kpis` — Shift handoffs, completed cuts, and total area per operator.\n- `daily_kpis` — Daily rolled-up area, slabs, machine hours, and kWh.\n- `downtime_gaps` — Inter-operation idle gaps via `LAG(ended_at)` joined with `downtime_reasons`.\n- `machine_health_kpis` — Aggregated telemetry averages (tension, feed/line speed, current/voltage) per cut.\n- `plan_vs_actual` — PLC `machine_jobs` plan vs. actual `operation_kpis`.\n- `data_quality_score` — Overall validation pass rate (`%`).\n- `operation_cost_kpis` — Wire, power, labor, and overhead costs per cut ($\\$/m^2$, $\\$/\\text{slab}$).\n- `roller_groove_kpis` — Cumulative area and cut count per `roller_grooves` slot (`1..6`).\n\n---\n\n## 6. Dashboard Modules & API Routes\n\n### Dashboard Pages (`app/dashboard/`)\n- **Production:** `/dashboard` (overview), `/dashboard/operations` (registry & manual form), `/dashboard/operations/[id]` (step comparison + 60s telemetry zoom chart), `/dashboard/live-jobs`, `/dashboard/wires`, `/dashboard/stones`, `/dashboard/operators`\n- **Analytics:** `/dashboard/machine-health`, `/dashboard/energy`, `/dashboard/downtime`\n- **Data:** `/dashboard/upload` (drag-and-drop, CSV paste, preview), `/dashboard/import-history` (download & re-import), `/dashboard/data-quality`\n- **ERP:** `/dashboard/inventory`, `/dashboard/maintenance`, `/dashboard/costing`, `/dashboard/orders`\n- **Admin:** `/dashboard/users`, `/dashboard/audit-log`, `/dashboard/settings`\n\n### API Endpoints (`app/api/`)\n\n| Endpoint | Method | Roles Allowed | Purpose |\n| :--- | :--- | :--- | :--- |\n| `/api/health` | `GET` | Health check | Checks DB connectivity on `settings` (`id = 1`) and returns latency in ms. |\n| `/api/ingest` | `POST` | `admin`, `supervisor`, `operator` | Ingests CSV files or pasted CSV text (20 req/min/actor limit). |\n| `/api/ingest/preview` | `POST` | `admin`, `supervisor`, `operator` | Dry-run parse for previewing and auto-filling operation forms. |\n| `/api/ingest/reimport` | `POST` | `admin`, `supervisor`, `operator` | Re-runs `processSingleCsvText()` on an archived file from `raw-logs`. |\n| `/api/ingest/download` | `GET` | All authenticated roles | Downloads the original archived CSV by `batchId`. |\n| `/api/ingest/delete` | `DELETE` | `admin`, `supervisor` | Deletes an `upload_batches` record, linked operations/checks, and storage file. |\n| `/api/operations/save` | `POST` | `admin`, `supervisor`, `operator` | JSON wrapper around `saveOperationDataAction()` to avoid Server Action payload limits. |\n| `/api/export` | `GET` | All authenticated roles | Exports 11 datasets (`operations`, `wires`, `stones`, `operators`, `downtime`, `data_checks`, `inventory`, `work_orders`, `costing`, `orders`, `audit_log`) as CSV. |\n\n---\n\n## 7. Access Control, Security & Operations\n\n### RBAC Matrix (5 Roles)\n\n| Role | Read KPIs & Tables | Upload / Re-Import CSVs | Data Checks & Master Data | Costing, Customers & Orders | Users, Roles & Deletes |\n| :--- | :---: | :---: | :---: | :---: | :---: |\n| **`viewer`** | ✅ | ❌ | ❌ | ❌ | ❌ |\n| **`operator`** | ✅ | ✅ | Work Orders & Quality Log only | ❌ | ❌ |\n| **`accountant`** | ✅ | ❌ | ❌ | ✅ | ❌ |\n| **`supervisor`** | ✅ | ✅ | ✅ | ✅ | ❌ |\n| **`admin`** | ✅ | ✅ | ✅ | ✅ | ✅ |\n\n- **Storage (`raw-logs`):** Private bucket (`25 MB` max; `text/csv`, `text/plain`, `application/vnd.ms-excel`).\n- **HTTP Headers (`next.config.ts`):** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, `Permissions-Policy`, and CSP restricting `connect-src` to `'self'` and `*.supabase.co`.\n- **Secret Leak Check:** `.github/workflows/ci.yml` scans `.next/static/` on every build to verify `sb_secret_` is absent from client JS.\n- **Backups:** Enable Supabase PITR or daily `pg_dump`. Analytical tables can also be rebuilt from `raw-logs` via `npm run seed:logs` or `/api/ingest/reimport`.\n\n---\n\n## 8. Local Setup & Verification\n\n### Environment\n- **Node.js 22 LTS** recommended (Node 20+ supported) and a **Supabase** project.\n- Copy `.env.example` to `.env.local` (never commit `.env.local`):\n\n```ini\nNEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...\nSUPABASE_SERVICE_ROLE_KEY=sb_secret_...\n```\n\n### Run Locally\n```bash\nnpm install\nnpm run dev\n```\nOpen [http://localhost:3000](http://localhost:3000). If `public.profiles` is empty, `/login` shows the **First Admin Bootstrap** form.\n\n### Verification Commands\n```bash\nnpm run typecheck   # tsc --noEmit\nnpm run lint        # eslint\nnpm test            # vitest run tests (26 tests)\nnpm run test:sql    # Live Supabase SQL view checks\nnpm run test:e2e    # Playwright E2E smoke tests\nnpm run build       # Production build\n```\n",
    "githubUrl": "https://github.com/islamsamyy/wirecut-"
  },
  {
    "id": "gh-islamsamyprotofilio",
    "title": "ISLAMSAMYPROTOFILIO",
    "client": "GitHub • islamsamyy/ISLAMSAMYPROTOFILIO",
    "companyLogo": "/projects/gh-islamsamyprotofilio/logo.png",
    "category": "Software Engineering & Online Systems",
    "role": "Creator & Lead Engineer",
    "impactMetric": "TypeScript",
    "metrics": [
      {
        "label": "Primary Stack",
        "value": "TypeScript"
      },
      {
        "label": "Repository",
        "value": "islamsamyy/ISLAMSAMYPROTOFILIO"
      },
      {
        "label": "Visuals",
        "value": "4 Assets"
      },
      {
        "label": "Highlights",
        "value": "12 Items"
      }
    ],
    "techStack": [
      "TypeScript",
      "Next.js",
      "Next.js 15",
      "React",
      "Supabase",
      "Stripe",
      "Three.js",
      "Framer Motion"
    ],
    "summary": "Interactive Next.js 15 & Three.js developer portfolio with client booking system, blog, and CRM admin. ISLAMSAMYPROTOFILIO (islam-samy-portfolio) is a full-stack Next.js 15, React 19, Three.js, Framer Motion, and Supabase platform engineered to serve as both a high-impact technical showcase and an autonomous client acquisition & CRM system. Prospective clients explore interactive 3D architecture case studies, verified reviews, certifications, and transparent service pricing, then book consultations directly via /book—while the owner manages leads, reservations, blog content, and portfolio items through an 8-module /admin suite. Brand identity and visual assets stored in public/images/ and src/app/: subgraph L2[\"2. Public Showcase & Booking Layer\"] Pub[\"/ • /projects/[id] • /blog/[slug] • /pricing • /reviews\"] Book[\"/book • /my-bookings • ArchitectureModal\"] end",
    "architectureHighlights": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Content Architecture",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts",
      "Business Value, ROI & Growth Opportunities",
      "Dynamic Entities (Supabase): Projects, Blog Articles, Certifications, Experience Timeline, Pricing Packages, Client Reservations/Bookings, CRM Leads, and Client Reviews.",
      "Static Fallbacks & Localization (src/data/, src/i18n/, src/context/): Structured datasets and context providers ensure fast initial rendering and multi-language readiness.",
      "/ — Home with CertificationsSection, ClientReviewsSection, ExperienceTimelineSection, and TechArsenalSection",
      "/projects & /projects/[id] — Case study showcase (ProjectDetailClient.tsx, ArchitectureModal.tsx)",
      "/blog & /blog/[slug] — Technical engineering articles (ArticleCard.tsx, BlogPostClient.tsx)"
    ],
    "liveDemoUrl": "https://islamsamy.vercel.app",
    "featured": false,
    "challenge": "ISLAMSAMYPROTOFILIO (islam-samy-portfolio) is a full-stack Next.js 15, React 19, Three.js, Framer Motion, and Supabase platform engineered to serve as both a high-impact technical showcase and an autonomous client acquisition & CRM system. Prospective clients explore interactive 3D architecture case studies, verified reviews, certifications, and transparent service pricing, then book consultations directly via /book—while the owner manages leads, reservations, blog content, and portfolio items through an 8-module /admin suite. Brand identity and visual assets stored in public/images/ and src/app/:",
    "solution": "Brand identity and visual assets stored in public/images/ and src/app/: subgraph L2[\"2. Public Showcase & Booking Layer\"] Pub[\"/ • /projects/[id] • /blog/[slug] • /pricing • /reviews\"] Book[\"/book • /my-bookings • ArchitectureModal\"] end subgraph L3[\"3. Admin CMS & CRM Layer (/admin)\"] Admin[\"/admin/{blog,certifications,crm,experience,pricing,projects,reservations,reviews}\"] Mutate[\"POST /api/admin/mutate\"] end subgraph L4[\"4. Persistence, SEO & QA Layer\"] Supa[\"Supabase (@supabase/supabase-js)\"] SEO[\"sitemap.ts • robots.ts • manifest.ts\"] QA[\"tests/runner.mjs & primitives.adversarial.test.tsx\"] end",
    "keyDecisions": [
      {
        "title": "Core Architecture: TypeScript + Next.js + Next.js 15",
        "rationale": "Selected TypeScript, Next.js, Next.js 15 to deliver high reliability, clean modularity, and fast iteration for ISLAMSAMYPROTOFILIO.",
        "tradeOff": "Requires adhering to the documented environment variables and runtime dependencies in the repository README."
      },
      {
        "title": "Ecosystem Integrations: React, Supabase, Stripe",
        "rationale": "Integrated React, Supabase, Stripe to handle specialized capabilities (persistence, styling, analytics, or automation) without reinventing core primitives.",
        "tradeOff": "Introduces external library/service configuration managed via environment setup."
      },
      {
        "title": "Documentation-First Repository Structure",
        "rationale": "Maintained structured README documentation, visual assets (4 images), and clear module boundaries in islamsamyy/ISLAMSAMYPROTOFILIO.",
        "tradeOff": "Requires keeping README documentation and screenshots synchronized as features evolve."
      }
    ],
    "systemFlow": [
      "Executive Summary & Business Utility",
      "Visual Showcase (UI & Dashboards)",
      "System Architecture & Layers",
      "Data Model & Content Architecture",
      "Application Modules & API Endpoints",
      "Getting Started & Scripts"
    ],
    "outcomeMetrics": [
      {
        "label": "Documentation",
        "value": "7 KB",
        "description": "Detailed README documentation covering architecture, features, setup, and usage."
      },
      {
        "label": "Visual Assets",
        "value": "4 Images",
        "description": "Screenshots, analytical charts, or architecture preview cards."
      },
      {
        "label": "Tech Modules",
        "value": "8 Stack",
        "description": "TypeScript, Next.js, Next.js 15, React, Supabase, Stripe, Three.js, Framer Motion"
      }
    ],
    "galleryImages": [
      "/projects/gh-islamsamyprotofilio/screen_1_islam-samy-portrait.jpg",
      "/projects/gh-islamsamyprotofilio/screen_2_artboard-logo.png",
      "/projects/gh-islamsamyprotofilio/screen_3_apple-icon.png",
      "/projects/gh-islamsamyprotofilio/screen_4_icon.png"
    ],
    "steps": [
      {
        "title": "Capability 1",
        "description": "Executive Summary & Business Utility"
      },
      {
        "title": "Capability 2",
        "description": "Visual Showcase (UI & Dashboards)"
      },
      {
        "title": "Capability 3",
        "description": "System Architecture & Layers"
      },
      {
        "title": "Capability 4",
        "description": "Data Model & Content Architecture"
      }
    ],
    "readmeContent": "# Islam Samy — 3D Interactive Engineering Portfolio, Booking & CRM Platform\n\n<p align=\"center\">\n  <img src=\"https://raw.githubusercontent.com/islamsamyy/ISLAMSAMYPROTOFILIO/main/public/images/artboard-logo.png\" alt=\"Islam Samy Portfolio Logo\" width=\"220\" />\n</p>\n\n## Table of Contents\n- [Executive Summary & Business Utility](#executive-summary--business-utility)\n- [Visual Showcase (UI & Dashboards)](#visual-showcase-ui--dashboards)\n- [System Architecture & Layers](#system-architecture--layers)\n- [Data Model & Content Architecture](#data-model--content-architecture)\n- [Application Modules & API Endpoints](#application-modules--api-endpoints)\n- [Getting Started & Scripts](#getting-started--scripts)\n- [Business Value, ROI & Growth Opportunities](#business-value-roi--growth-opportunities)\n\n---\n\n## Executive Summary & Business Utility\n`ISLAMSAMYPROTOFILIO` (`islam-samy-portfolio`) is a full-stack Next.js 15, React 19, Three.js, Framer Motion, and Supabase platform engineered to serve as both a **high-impact technical showcase** and an **autonomous client acquisition & CRM system**. Prospective clients explore interactive 3D architecture case studies, verified reviews, certifications, and transparent service pricing, then book consultations directly via `/book`—while the owner manages leads, reservations, blog content, and portfolio items through an 8-module `/admin` suite.\n\n---\n\n## Visual Showcase (UI & Dashboards)\nBrand identity and visual assets stored in `public/images/` and `src/app/`:\n\n| Brand Mark | Primary Logo | Founder Portrait |\n| :---: | :---: | :---: |\n| ![Artboard Mark](https://raw.githubusercontent.com/islamsamyy/ISLAMSAMYPROTOFILIO/main/public/images/artboard-mark.png) | ![250 Logo](https://raw.githubusercontent.com/islamsamyy/ISLAMSAMYPROTOFILIO/main/public/images/250LOGO.png) | ![Islam Samy Portrait](https://raw.githubusercontent.com/islamsamyy/ISLAMSAMYPROTOFILIO/main/public/images/islam-samy-portrait.jpg) |\n\n---\n\n## System Architecture & Layers\n\n```mermaid\nflowchart TB\n    subgraph L1[\"1. WebGL 3D & Motion Presentation Layer\"]\n        Three[\"Three.js Canvases (Hero3DOrbit, CyberneticGridCanvas, ParticleMeshCanvas, ProjectTelemetryCanvas, ThreeBackgroundCanvas)\"]\n        Motion[\"Framer Motion (ScrollRevealSection, TiltCard, motion-variants)\"]\n        UI[\"Radix UI Primitives • ThemeProvider • i18n • CairoTelemetry\"]\n    end\n\n    subgraph L2[\"2. Public Showcase & Booking Layer\"]\n        Pub[\"/ • /projects/[id] • /blog/[slug] • /pricing • /reviews\"]\n        Book[\"/book • /my-bookings • ArchitectureModal\"]\n    end\n\n    subgraph L3[\"3. Admin CMS & CRM Layer (/admin)\"]\n        Admin[\"/admin/{blog,certifications,crm,experience,pricing,projects,reservations,reviews}\"]\n        Mutate[\"POST /api/admin/mutate\"]\n    end\n\n    subgraph L4[\"4. Persistence, SEO & QA Layer\"]\n        Supa[\"Supabase (@supabase/supabase-js)\"]\n        SEO[\"sitemap.ts • robots.ts • manifest.ts\"]\n        QA[\"tests/runner.mjs & primitives.adversarial.test.tsx\"]\n    end\n\n    L1 --> L2 --> L3 --> L4\n```\n\n| Layer | Responsibility | Key Files |\n| :--- | :--- | :--- |\n| **3D WebGL & Motion Layer** | GPU-accelerated Three.js backgrounds/orbits, interactive 3D tilt cards, and reduced-motion-safe animations | `src/components/canvas/*.tsx`, `src/components/animation/*.tsx`, `src/components/ui/TiltCard.tsx` |\n| **Design System & Navigation** | Radix UI primitives, dark/light themes, Cairo live telemetry widget, mobile drawer, and scroll progress | `src/components/ui/*`, `src/components/navigation/{SiteHeader,SiteFooter,CairoTelemetry,MobileNavDrawer,ScrollProgress}.tsx` |\n| **Public Funnel & Booking Layer** | Project case studies with `ArchitectureModal`, technical blog, service tiers, and self-service booking tracker | `src/app/{projects,blog,pricing,reviews,book,my-bookings}/page.tsx` |\n| **Admin CMS & Lead CRM Layer** | Protected 8-module administration panel routed through a unified server mutation endpoint | `src/app/admin/*/page.tsx`, `src/app/api/admin/mutate/route.ts` |\n| **SEO & Testing Layer** | App Router `sitemap.ts`, `robots.ts`, `manifest.ts`, plus adversarial primitive tests | `src/app/{sitemap,robots,manifest}.ts`, `tests/runner.mjs` |\n\n---\n\n## Data Model & Content Architecture\n- **Dynamic Entities (Supabase)**: Projects, Blog Articles, Certifications, Experience Timeline, Pricing Packages, Client Reservations/Bookings, CRM Leads, and Client Reviews.\n- **Static Fallbacks & Localization (`src/data/`, `src/i18n/`, `src/context/`)**: Structured datasets and context providers ensure fast initial rendering and multi-language readiness.\n\n---\n\n## Application Modules & API Endpoints\n\n### Public Routes\n- `/` — Home with `CertificationsSection`, `ClientReviewsSection`, `ExperienceTimelineSection`, and `TechArsenalSection`\n- `/projects` & `/projects/[id]` — Case study showcase (`ProjectDetailClient.tsx`, `ArchitectureModal.tsx`)\n- `/blog` & `/blog/[slug]` — Technical engineering articles (`ArticleCard.tsx`, `BlogPostClient.tsx`)\n- `/pricing`, `/reviews`, `/book`, `/my-bookings` — Commercialization & booking management\n\n### Admin Suite (`/admin`)\n- `/admin/login` — Admin authentication\n- `/admin/crm` — Lead & client pipeline management\n- `/admin/reservations` — Consultation booking approvals & scheduling\n- `/admin/projects`, `/admin/blog`, `/admin/certifications`, `/admin/experience`, `/admin/pricing`, `/admin/reviews` — Full portfolio CMS\n\n### API Endpoints\n| Endpoint | Purpose |\n| :--- | :--- |\n| `/api/admin/mutate` (`src/app/api/admin/mutate/route.ts`) | Centralized server-side mutation handler for all Admin CMS & CRM CRUD actions |\n\n---\n\n## Getting Started & Scripts\n\n```bash\ngit clone https://github.com/islamsamyy/ISLAMSAMYPROTOFILIO.git\ncd ISLAMSAMYPROTOFILIO\nnpm install\ncp .env.example .env.local\n```\n\n| Script | Command | Description |\n| :--- | :--- | :--- |\n| Dev | `npm run dev` | Start Next.js 15 dev server |\n| Build | `npm run build` | Production build |\n| Start | `npm run start` | Start production server |\n| Lint | `npm run lint` | Run Next.js ESLint |\n| Test | `npm test` | Execute custom test runner (`node tests/runner.mjs`) |\n\n---\n\n## Business Value, ROI & Growth Opportunities\n- **Zero-Friction Consulting Funnel**: Converts technical credibility directly into booked consultations (`/pricing` -> `/book` -> `/admin/crm`) without paying for Calendly, HubSpot, or Webflow.\n- **Paid Discovery Deposits**: Adding Stripe Checkout to `/book` converts free calls into paid architecture reviews and eliminates calendar no-shows.\n- **Productized Boilerplate Licensing**: License this 3D + 8-module CRM Next.js codebase as a premium starter kit for senior engineers, agencies, and fractional CTOs.\n",
    "githubUrl": "https://github.com/islamsamyy/ISLAMSAMYPROTOFILIO"
  }
];
