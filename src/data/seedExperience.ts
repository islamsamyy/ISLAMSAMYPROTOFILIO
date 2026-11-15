export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  type: 'Executive' | 'Full-Time' | 'Internship' | 'Contract';
  summary: string;
  highlights: string[];
  metrics: Array<{ label: string; value: string }>;
  technologies: string[];
}

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp-nexalytix',
    role: 'Founder & Lead Data Engineer / ERP Architect',
    company: 'Nexalytix',
    location: 'Cairo, Egypt (Remote / International)',
    period: 'May 2025 – Present',
    current: true,
    type: 'Executive',
    summary: 'Founded Nexalytix to architect enterprise custom ERP systems, autonomous multi-agent AI networks, event-driven workflow automations, and executive business intelligence frameworks.',
    highlights: [
      'Architected custom modular ERP solutions synchronizing inventory, procurement, and financial ledgers across disparate branches.',
      'Constructed autonomous multi-agent systems using CrewAI, LangChain, and n8n that eliminated 60% of manual repetitive operations.',
      'Engineered high-throughput streaming lakehouses ingesting 1.4M msg/sec into ClickHouse with sub-250ms p99 query latency.',
      'Developed high-performance full-stack web applications and executive cockpits in Next.js 15, React 19, and Power BI.',
    ],
    metrics: [
      { label: 'Operational Cost Cut', value: '60%' },
      { label: 'Predictive Model Precision', value: '95%' },
      { label: 'Lakehouse Stream Rate', value: '1.4M msg/sec' },
    ],
    technologies: ['Custom ERP', 'Python', 'CrewAI', 'LangChain', 'n8n', 'Next.js 15', 'ClickHouse', 'Kafka', 'Power BI'],
  },
  {
    id: 'exp-safir',
    role: 'Enterprise ERP & Operations Data Engineer',
    company: 'Safir Hotels & Resorts',
    location: 'Cairo, Egypt',
    period: 'Jan 2023 – Dec 2024',
    current: false,
    type: 'Full-Time',
    summary: 'Spearheaded reservation data engineering, custom ERP integrations, and operational business intelligence handling live transactional workloads across Oracle OPERA PMS and 14 hotel properties.',
    highlights: [
      'Engineered bi-directional data pipelines and dimensional star schema models from OPERA PMS relational databases handling 200+ daily live transactions.',
      'Reduced executive night audit reporting latency from 8 hours overnight batch cycles to sub-2-second automated real-time refreshes.',
      'Constructed multi-currency RevPAR, ADR, and occupancy dashboards in Power BI connecting financial ledgers to corporate decision makers.',
      'Automated hotel guest reconciliation workflows using Python and custom database stored procedures, cutting data discrepancies by 80%.',
    ],
    metrics: [
      { label: 'Properties Unified', value: '14 Hotels' },
      { label: 'Reporting Speedup', value: 'Sub-2s' },
      { label: 'Query Latency Cut', value: '80%' },
    ],
    technologies: ['OPERA PMS', 'Custom ERP', 'MySQL', 'Python', 'Power BI', 'DAX', 'Star Schemas', 'ETL Automation'],
  },
  {
    id: 'exp-sotex',
    role: 'Industrial ERP Specialist & Data Analyst',
    company: 'Sotex Factory',
    location: 'Gharbia, Egypt',
    period: 'Jun 2020 – Dec 2022',
    current: false,
    type: 'Full-Time',
    summary: 'Modernized industrial manufacturing workflows, designing and deploying an integrated custom ERP system for bill of materials, inventory reconciliation, and production telemetry.',
    highlights: [
      'Engineered a normalized relational database schema in PostgreSQL replacing manual paperwork and fragmented spreadsheets.',
      'Built a full-stack web portal for plant floor barcode scanning, reducing inventory reconciliation discrepancies by 75%.',
      'Automated recurring machine yield scorecards and executive KPI reports, saving over $18,000 annually in unrecorded scrap loss.',
      'Configured custom web analytics and conversion funnels supporting commercial business-to-business growth.',
    ],
    metrics: [
      { label: 'Discrepancy Reduction', value: '75%' },
      { label: 'Annual Cost Savings', value: '$18K+' },
      { label: 'Inventory Accuracy', value: '99.4%' },
    ],
    technologies: ['Custom ERP', 'PostgreSQL', 'SQL', 'Python', 'Next.js', 'Excel Advanced', 'ETL', 'Process Optimization'],
  },
  {
    id: 'exp-codealpha',
    role: 'Applied Machine Learning & Data Science Intern',
    company: 'CodeAlpha',
    location: 'Remote',
    period: 'Dec 2024 – May 2025',
    current: false,
    type: 'Internship',
    summary: 'Trained high-precision predictive machine learning models, engineered robust feature pipelines, and formulated automated multivariate statistical visualizations.',
    highlights: [
      'Built classification and regression models utilizing Scikit-Learn and XGBoost ensembles, achieving over 88% validation accuracy.',
      'Constructed automated feature engineering pipelines reducing input dimensionality by 45% with zero variance loss.',
      'Formulated exploratory data analysis (EDA) notebooks with automated statistical visual storytelling.',
    ],
    metrics: [
      { label: 'Validation Accuracy', value: '88%+' },
      { label: 'Pipelines Deployed', value: '12' },
      { label: 'Dimensionality Cut', value: '45%' },
    ],
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Feature Engineering', 'Jupyter', 'XGBoost'],
  }
];
