export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  category: 'Machine Learning' | 'Data Analytics' | 'Academic' | 'Cloud & Big Data' | 'Marketing Ops';
  status: 'Verified' | 'In Progress';
  skills: string[];
  description: string;
}

export const initialCertifications: CertificationItem[] = [
  {
    id: 'cert-datacamp-ds',
    title: 'Associate Data Scientist',
    issuer: 'DataCamp',
    issueDate: '2024',
    credentialId: 'DC-ADS-89421',
    verificationUrl: 'https://www.datacamp.com/statement-of-accomplishment/track',
    category: 'Machine Learning',
    status: 'Verified',
    skills: ['Python', 'Statistical Inference', 'Scikit-Learn', 'Feature Engineering', 'Model Validation'],
    description: 'Rigorous assessment in supervised and unsupervised ML, model tuning, exploratory data analysis, and predictive validation with Python.',
  },
  {
    id: 'cert-datacamp-da',
    title: 'Associate Data Analyst',
    issuer: 'DataCamp',
    issueDate: '2024',
    credentialId: 'DC-ADA-76214',
    verificationUrl: 'https://www.datacamp.com/statement-of-accomplishment/track',
    category: 'Data Analytics',
    status: 'Verified',
    skills: ['SQL', 'PostgreSQL', 'EDA', 'Business Metrics', 'Data Storytelling'],
    description: 'Demonstrated mastery in complex relational joins, aggregations, data hygiene, and translating raw relational data into actionable KPI metrics.',
  },
  {
    id: 'cert-cisco-analytics',
    title: 'Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    issueDate: '2024',
    credentialId: 'CISCO-DAE-3921',
    verificationUrl: 'https://www.netacad.com',
    category: 'Data Analytics',
    status: 'Verified',
    skills: ['Data Ingestion', 'Statistical Telemetry', 'Dashboarding', 'Pipeline Flow'],
    description: 'Foundational certification covering data lifecycle, collection paradigms, pipeline architecture, and analytical telemetry visualization.',
  },
  {
    id: 'cert-maharatech-dl',
    title: 'Deep Learning & Neural Network Foundations',
    issuer: 'MaharaTech / ITI (Information Technology Institute)',
    issueDate: '2024',
    credentialId: 'ITI-DL-58192',
    verificationUrl: 'https://maharatech.gov.eg',
    category: 'Machine Learning',
    status: 'Verified',
    skills: ['TensorFlow', 'Keras', 'Feedforward Networks', 'Backpropagation', 'Loss Optimization'],
    description: 'Specialized deep learning coursework covering multi-layer perceptrons, activation dynamics, hyperparameter tuning, and gradient descent optimization.',
  },
  {
    id: 'cert-ibm-data',
    title: 'Data Fundamentals & Database Architecture',
    issuer: 'IBM',
    issueDate: '2023',
    credentialId: 'IBM-DF-10928',
    verificationUrl: 'https://www.credly.com/organizations/ibm',
    category: 'Cloud & Big Data',
    status: 'Verified',
    skills: ['Relational Schemas', 'Star Schemas', 'Distributed Querying', 'Enterprise Storage'],
    description: 'Core IBM curriculum examining enterprise relational systems, star/snowflake modeling, database normalization, and query performance tuning.',
  },
  {
    id: 'cert-google-ga4',
    title: 'Google Analytics 4 (GA4) Certification',
    issuer: 'Google Analytics Academy',
    issueDate: '2024',
    credentialId: 'GA4-CERT-44912',
    verificationUrl: 'https://skillshop.exceedlms.com',
    category: 'Marketing Ops',
    status: 'Verified',
    skills: ['Custom Event Tracking', 'Conversion Funnels', 'Attribution Modeling', 'BigQuery Export'],
    description: 'Certified expertise in event-based web telemetry, conversion funnel diagnosis, user cohort tracking, and automated attribution pipelines.',
  },
  {
    id: 'cert-tanta-bis',
    title: 'Bachelor of Business Information Systems (BIS)',
    issuer: 'Faculty of Commerce, Tanta University',
    issueDate: '2020 – 2024',
    credentialId: 'TU-BIS-DEGREE',
    verificationUrl: 'https://tanta.edu.eg',
    category: 'Academic',
    status: 'Verified',
    skills: ['Software Engineering', 'Enterprise Systems', 'Database Modeling', 'Management Analytics'],
    description: 'Rigorous four-year academic foundation blending computer science, software engineering, enterprise relational databases, and business management analytics.',
  },
  {
    id: 'cert-masters-prog',
    title: 'Master of Science in Business Information Systems',
    issuer: 'Tanta University (In Progress)',
    issueDate: '2024 – Present',
    credentialId: 'TU-MS-ENROLLED',
    verificationUrl: 'https://tanta.edu.eg',
    category: 'Academic',
    status: 'In Progress',
    skills: ['Distributed Lakehouses', 'Advanced Predictive Models', 'Big Data Engineering', 'Research'],
    description: 'Postgraduate research exploring scalable distributed ingestion, real-time lakehouses, and high-precision machine learning inference for enterprise systems.',
  },
];
