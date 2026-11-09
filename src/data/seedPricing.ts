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
    id: 'pkg-arch-audit',
    name: 'Architecture & System Audit',
    badge: 'Foundational Triage',
    headline: 'Comprehensive deep dive into legacy or modern systems to identify concurrency bottlenecks and cost drains.',
    price: '$3,500',
    frequency: '/ milestone review',
    duration: '2 Weeks Sprint',
    deliverables: [
      'Full code & infrastructure audit (Database, APIs, Cloud Infra)',
      'High-concurrency bottleneck identification & benchmark report',
      'Data model & schema optimization blueprint',
      'Executive roadmap with actionable refactoring priorities'
    ],
    isPopular: false
  },
  {
    id: 'pkg-lakehouse-build',
    name: 'Lakehouse & Stream Deployment',
    badge: 'Most Popular',
    headline: 'Turnkey data platform engineering connecting your operational databases into a high-speed analytical lakehouse.',
    price: '$6,500',
    frequency: '/ system deployment',
    duration: '4 Weeks Build',
    deliverables: [
      'End-to-end Kafka/CDC pipeline from ERP/PMS/DB to ClickHouse/S3',
      'Automated incremental ETL pipelines with data validation checks',
      '3x Executive BI Dashboards (Power BI / Grafana / Metabase)',
      'Full CI/CD IaC scripts & 30-day post-launch warranty'
    ],
    isPopular: true
  },
  {
    id: 'pkg-fractional-cto',
    name: 'Fractional Staff Architect / CTO',
    badge: 'Enterprise Retainer',
    headline: 'Dedicated weekly architecture leadership, sprint technical oversight, and senior engineering mentorship.',
    price: '$4,800',
    frequency: '/ month retainer',
    duration: 'Month-to-Month SLA',
    deliverables: [
      '15 hours weekly direct architectural governance & code review',
      'Sprint design leadership & high-concurrency technical direction',
      'Direct client & vendor negotiation for cloud contracts',
      'Priority emergency SLA for production incidents (< 1 hr response)'
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

