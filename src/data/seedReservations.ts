export interface BookingReservation {
  id: string;
  type: 'package' | 'consultation';
  clientName: string;
  clientEmail: string;
  company: string;
  itemName: string;
  scheduledDate: string;
  scheduledTime: string;
  timezone: string;
  amount: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes: string;
  meetLink: string;
  createdAt: string;
}

export const initialReservations: BookingReservation[] = [
  {
    id: 'res-8941',
    type: 'consultation',
    clientName: 'Steven Jenkins',
    clientEmail: 's.jenkins@fintechcloud.io',
    company: 'FinTech Cloud International',
    itemName: 'Deep-Dive Technical Architecture Review (60 Mins)',
    scheduledDate: 'Nov 18, 2024',
    scheduledTime: '11:00 AM',
    timezone: 'Cairo EET (UTC+2)',
    amount: '$150',
    status: 'confirmed',
    notes: 'Reviewing cross-datacenter Kafka replication topology and partition balancing.',
    meetLink: 'https://meet.google.com/isl-samy-adv',
    createdAt: '2024-11-04'
  },
  {
    id: 'res-8942',
    type: 'package',
    clientName: 'Nadia Kamel',
    clientEmail: 'nadia@mena-logistics.com',
    company: 'MENA Logistics Group',
    itemName: 'Lakehouse & Data Pipeline Scaffolding (4-Week Build)',
    scheduledDate: 'Dec 01, 2024',
    scheduledTime: '02:00 PM',
    timezone: 'Cairo EET (UTC+2)',
    amount: '$6,500',
    status: 'pending',
    notes: 'Kickoff call for fleet GPS sensor telemetry stream migration.',
    meetLink: 'https://meet.google.com/isl-samy-adv',
    createdAt: '2024-11-05'
  }
];

