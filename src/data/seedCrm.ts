export type CrmStage = 'new' | 'discovery' | 'proposal' | 'active' | 'retained' | 'closed';
export type CrmPriority = 'High' | 'Medium' | 'Low' | 'high' | 'medium' | 'low';

export interface CrmActivityLog {
  id: string;
  date: string;
  type: 'Note' | 'Call' | 'Meeting' | 'Proposal' | 'Contract';
  summary: string;
}

export interface CrmLead {
  id: string;
  clientName: string;
  company: string;
  email: string;
  phone?: string;
  stage: CrmStage;
  engagementType: 'Distributed Lakehouse' | 'Machine Learning Systems' | 'Executive BI Telemetry' | 'Strategic Advisory Retainer';
  dealValue: number;
  priority: 'High' | 'Medium' | 'Low';
  source: 'Website Intake' | 'Direct Referral' | 'LinkedIn' | 'Advisory Call';
  createdAt: string;
  lastContacted: string;
  requirements: string;
  activities: CrmActivityLog[];
  techInterests?: string[];
  contactName?: string;
  notes?: string;
  nextFollowUp?: string;
}

export const initialCrmLeads: CrmLead[] = [
  {
    id: 'crm-lead-001',
    clientName: 'Tarek Mansour',
    company: 'Safir Hospitality Group',
    email: 't.mansour@safirhotels.com',
    phone: '+20 100 234 5678',
    stage: 'active',
    engagementType: 'Executive BI Telemetry',
    dealValue: 6500,
    priority: 'High',
    source: 'Direct Referral',
    createdAt: '2025-01-15',
    lastContacted: '2025-02-10',
    requirements: 'Real-time OPERA PMS multi-property telemetry cockpit with sub-2s latency and automated daily RevPAR forecasting.',
    activities: [
      { id: 'act-1', date: '2025-01-15', type: 'Call', summary: 'Initial discovery call with VP of Revenue Management.' },
      { id: 'act-2', date: '2025-01-22', type: 'Proposal', summary: 'Sent milestone-based delivery scope ($6,500 total).' },
      { id: 'act-3', date: '2025-02-01', type: 'Contract', summary: 'NDA and milestone contract executed.' },
    ],
  },
  {
    id: 'crm-lead-002',
    clientName: 'Farah El-Khatib',
    company: 'FinVortex Global',
    email: 'f.khatib@finvortex.io',
    phone: '+971 50 123 4567',
    stage: 'proposal',
    engagementType: 'Machine Learning Systems',
    dealValue: 8200,
    priority: 'High',
    source: 'Website Intake',
    createdAt: '2025-02-02',
    lastContacted: '2025-02-14',
    requirements: 'Supervised transaction fraud detection pipeline processing 25,000 requests/sec with under 15ms inference latency.',
    activities: [
      { id: 'act-4', date: '2025-02-02', type: 'Note', summary: 'Submitted advisory intake form via website.' },
      { id: 'act-5', date: '2025-02-06', type: 'Meeting', summary: 'Deep technical architecture alignment with Head of Risk.' },
      { id: 'act-6', date: '2025-02-12', type: 'Proposal', summary: 'Submitted technical architecture blueprint and milestone gates.' },
    ],
  },
  {
    id: 'crm-lead-003',
    clientName: 'Karim Abdel-Rahman',
    company: 'Sotex Industrial Holdings',
    email: 'k.abdelrahman@sotexfabrics.com',
    phone: '+20 122 987 6543',
    stage: 'retained',
    engagementType: 'Strategic Advisory Retainer',
    dealValue: 4200,
    priority: 'High',
    source: 'Direct Referral',
    createdAt: '2024-11-10',
    lastContacted: '2025-02-18',
    requirements: 'Monthly fractional architecture leadership, automated n8n production pipelines, and junior data team mentorship.',
    activities: [
      { id: 'act-7', date: '2024-11-10', type: 'Contract', summary: 'Retainer renewed for Q1/Q2 at $4,200/mo.' },
      { id: 'act-8', date: '2025-02-10', type: 'Meeting', summary: 'Bi-weekly sprint review: automated supply chain alerts operational.' },
    ],
  },
  {
    id: 'crm-lead-004',
    clientName: 'Sarah Jenkins',
    company: 'Apex Logistics UK',
    email: 'sarah.jenkins@apexlogistics.co.uk',
    phone: '+44 20 7946 0912',
    stage: 'discovery',
    engagementType: 'Distributed Lakehouse',
    dealValue: 12500,
    priority: 'High',
    source: 'LinkedIn',
    createdAt: '2025-02-16',
    lastContacted: '2025-02-20',
    requirements: 'Migrating legacy SQL warehouse to PySpark Apache Iceberg lakehouse with automated schema evolution and Kafka ingestion.',
    activities: [
      { id: 'act-9', date: '2025-02-16', type: 'Note', summary: 'Inbound message on LinkedIn after viewing Lakehouse case study.' },
      { id: 'act-10', date: '2025-02-19', type: 'Call', summary: 'Completed 30-min discovery call. High technical alignment.' },
    ],
  },
  {
    id: 'crm-lead-005',
    clientName: 'Omar Hegazy',
    company: 'RetailHub E-Commerce',
    email: 'o.hegazy@retailhub.me',
    phone: '+966 54 876 5432',
    stage: 'new',
    engagementType: 'Machine Learning Systems',
    dealValue: 5500,
    priority: 'Medium',
    source: 'Website Intake',
    createdAt: '2025-02-22',
    lastContacted: '2025-02-22',
    requirements: 'Gradient boosting sales and inventory forecasting model to prevent out-of-stock events across 4 fulfillment centers.',
    activities: [
      { id: 'act-11', date: '2025-02-22', type: 'Note', summary: 'Inbound intake submitted through Book Advisory page.' },
    ],
  },
];
