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
    role: 'Founder & Lead AI / BI Solutions Architect',
    company: 'Nexalytix',
    location: 'Cairo, Egypt (Remote / International)',
    period: 'May 2025 – Present',
    current: true,
    type: 'Executive',
    summary: 'Founded Nexalytix to architect enterprise distributed systems, predictive machine learning engines, and executive business intelligence frameworks for hospitality, retail, and financial tech firms.',
    highlights: [
      'Architected end-to-end automated data ingestion pipelines connecting multi-source databases, OPERA PMS, and REST APIs.',
      'Constructed production ML pipelines with XGBoost & TensorFlow delivering 95%+ predictive accuracy for demand forecasting.',
      'Engineered self-hosted n8n workflow orchestrations reducing recurring operational overhead by 60%.',
      'Designed executive telemetry cockpits in Power BI & Tableau enabling real-time drill-downs across cross-functional revenue streams.',
    ],
    metrics: [
      { label: 'Predictive Model Accuracy', value: '95%' },
      { label: 'Operational Cost Reduction', value: '60%' },
      { label: 'Daily Data Throughput', value: '1.4M msg/sec' },
    ],
    technologies: ['Python', 'SQL', 'TensorFlow', 'XGBoost', 'n8n', 'Power BI', 'OPERA PMS', 'Node.js'],
  },
  {
    id: 'exp-codealpha',
    role: 'Data Science Intern',
    company: 'CodeAlpha',
    location: 'Remote',
    period: 'Dec 2024 – May 2025',
    current: false,
    type: 'Internship',
    summary: 'Developed applied machine learning pipelines, performed rigorous feature engineering, and trained high-precision time series forecasting models across complex multivariate datasets.',
    highlights: [
      'Engineered data cleaning, normalization, and outlier detection routines for high-dimensional financial and sales datasets.',
      'Built classification and regression models utilizing Scikit-Learn ensembles, achieving over 85% validation accuracy.',
      'Formulated exploratory data analysis (EDA) notebooks with automated statistical visual storytelling.',
    ],
    metrics: [
      { label: 'Model Validation Accuracy', value: '88%+' },
      { label: 'Pipelines Deployed', value: '12' },
      { label: 'Feature Dimensionality Reduced', value: '45%' },
    ],
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter', 'Feature Engineering'],
  },
  {
    id: 'exp-safir',
    role: 'Reservations & Operations BI Developer',
    company: 'Safir Hotels & Resorts',
    location: 'Cairo, Egypt',
    period: 'Jan 2023 – Dec 2024',
    current: false,
    type: 'Full-Time',
    summary: 'Spearheaded reservation data telemetry and business intelligence systems handling 200+ daily live transactions across Oracle OPERA PMS and enterprise hospitality ERPs.',
    highlights: [
      'Engineered SQL extraction queries and star schema analytical models from OPERA PMS relational databases.',
      'Built live Power BI executive cockpits tracking daily RevPAR, ADR, occupancy rates, and cancellation probabilities.',
      'Reduced manual reporting latency from 4 hours daily to sub-2-second automated dashboard refreshes.',
      'Collaborated closely with general management and revenue directors to forecast seasonal room allocation.',
    ],
    metrics: [
      { label: 'Daily Transactions Handled', value: '200+' },
      { label: 'Query Latency Reduction', value: '80%' },
      { label: 'Executive Reporting Speed', value: 'Sub-2s' },
    ],
    technologies: ['OPERA PMS', 'MySQL', 'Power BI', 'DAX', 'Star Schemas', 'Hospitality Analytics', 'Excel VBA'],
  },
  {
    id: 'exp-sotex',
    role: 'Data Analyst & Operations Specialist',
    company: 'Sotex Factory',
    location: 'Gharbia, Egypt',
    period: 'Jun 2020 – Dec 2022',
    current: false,
    type: 'Full-Time',
    summary: 'Analyzed industrial manufacturing workflows, inventory turnover, and operational KPIs, modernizing relational databases and implementing executive performance reporting.',
    highlights: [
      'Redesigned inventory tracking databases, eliminating stock discrepancies and material reconciliation lag.',
      'Formulated custom Google Analytics GA4 event tracking and conversion funnel analysis for Sotex web channels.',
      'Automated recurring production reports and KPI scorecards for executive plant leadership.',
    ],
    metrics: [
      { label: 'Inventory Discrepancy Reduction', value: '75%' },
      { label: 'Production Tracking Efficiency', value: '+40%' },
      { label: 'Annual Cost Savings', value: '$18K+' },
    ],
    technologies: ['SQL', 'Relational Databases', 'Google Analytics 4', 'Excel Advanced', 'ETL', 'Process Optimization'],
  },
];
