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
    id: 'pkg-erp-architecture',
    name: 'Custom ERP Architecture & System Build',
    badge: 'Enterprise Core',
    headline: 'Turnkey custom ERP engineering, database schema architecture, modular operational ledgers, and third-party API/PMS integrations.',
    price: '$4,500',
    frequency: '/ milestone review',
    duration: '3 Weeks Sprint',
    deliverables: [
      'Custom ERP module design (Inventory, Procurement, Billing, and Operations)',
      'High-throughput database schema modeling (PostgreSQL / MySQL) & indexing',
      'OPERA PMS / SAP / Legacy ERP bi-directional sync connectors',
      'Production deployment architecture, CI/CD pipelines & role-based access control'
    ],
    isPopular: false
  },
  {
    id: 'pkg-ai-agents-automation',
    name: 'Autonomous AI Agents & Workflow Automation',
    badge: 'Most Popular',
    headline: 'Multi-agent autonomous LLM orchestration and zero-overhead n8n workflows that eliminate manual operational bottlenecks.',
    price: '$6,800',
    frequency: '/ system deployment',
    duration: '4 Weeks Build',
    deliverables: [
      'Autonomous multi-agent task networks (CrewAI, LangChain, OpenAI & Anthropic APIs)',
      'Self-hosted n8n workflow automations with automated error recovery & queues',
      'Real-time data synchronization between web apps, databases, and third-party APIs',
      'Executive telemetry dashboard integration & 30-day post-launch warranty SLA'
    ],
    isPopular: true
  },
  {
    id: 'pkg-lakehouse-fractional',
    name: 'Enterprise Lakehouse & Fractional CTO',
    badge: 'Executive Retainer',
    headline: 'Dedicated weekly architecture leadership, streaming lakehouse engineering, and high-concurrency systems governance.',
    price: '$5,200',
    frequency: '/ month retainer',
    duration: 'Month-to-Month SLA',
    deliverables: [
      '15 hours weekly direct architectural governance, code review & system design',
      'Kafka & ClickHouse streaming lakehouse deployment for real-time executive BI',
      'Executive Power BI / Tableau dashboard suites with sub-second query speeds',
      'Priority emergency SLA for production systems & vendor contract negotiation'
    ],
    isPopular: false
  }
];

export const initialConsultationRates: ConsultationRates = [
  {
    hourlyRate: '$150',
    session30Min: '$90',
    session60Min: '$150',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    availableSlots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM', '07:00 PM'],
    availableTimezones: ['Cairo EET (UTC+2)', 'London GMT (UTC+0)', 'New York EST (UTC-5)', 'Dubai GST (UTC+4)']
  }
][0];
