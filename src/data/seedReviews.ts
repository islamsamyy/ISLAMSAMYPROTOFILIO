export interface ClientReview {
  id: string;
  clientName: string;
  clientTitle: string;
  companyName: string;
  companyLogo: string;
  rating: number;
  projectTag: string;
  quote: string;
  date: string;
  featured: boolean;
}

export const initialReviews: ClientReview[] = [
  {
    id: 'rev-safir',
    clientName: 'Tarek Mansour',
    clientTitle: 'Group Chief Information Officer',
    companyName: 'Safir Hotels & Resorts',
    companyLogo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    projectTag: 'OPERA PMS Lakehouse & BI',
    quote: 'Islam re-architected our entire hospitality data ecosystem. What used to take our financial teams 3 days to consolidate across 14 hotels now happens in sub-second real-time dashboards. His deep knowledge of distributed systems and OPERA PMS internals is unmatched.',
    date: 'Dec 2024',
    featured: true
  },
  {
    id: 'rev-fintech',
    clientName: 'Sarah Al-Ghamdi',
    clientTitle: 'VP of Engineering',
    companyName: 'FinTech Cloud International',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    projectTag: 'Sub-20ms ML Fraud Detection',
    quote: 'We hired Islam to diagnose latency spikes in our ML inference pipeline. Within 3 weeks, he restructured our feature store and cut our p99 inference time down to 14ms while reducing false positive alerts by over 60%. Highly recommended for mission-critical architectures.',
    date: 'Oct 2024',
    featured: true
  },
  {
    id: 'rev-telecom',
    clientName: 'Markus Lindholm',
    clientTitle: 'Head of Infrastructure',
    companyName: 'EMEA Telecom Alliance',
    companyLogo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    projectTag: 'Streaming CDR Pipeline',
    quote: 'Islam led our migration from on-prem batch jobs to Kubernetes streaming microservices in Go. The platform now processes over 800M daily records seamlessly, and our cloud infrastructure bill was literally slashed by 60%. His architectural discipline is world-class.',
    date: 'Aug 2024',
    featured: true
  },
  {
    id: 'rev-logistics',
    clientName: 'Omar El-Sayed',
    clientTitle: 'Operations Director',
    companyName: 'TransGlobal Freight Networks',
    companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    projectTag: 'IoT Fleet Dispatch Platform',
    quote: 'Working with Islam gave our dispatch managers full sub-second visibility over 18,000 active vehicle sensors. His communication was spotless, delivery was ahead of schedule, and the platform has maintained 99.98% uptime since launch.',
    date: 'Jun 2024',
    featured: true
  }
];

