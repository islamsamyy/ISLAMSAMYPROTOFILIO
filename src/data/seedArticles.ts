export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: 'Architecture' | 'Data Engineering' | 'Machine Learning' | 'Performance';
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
}

export const initialArticles: ArticleItem[] = [
  {
    id: 'art-lakehouse-zero-downtime',
    slug: 'zero-downtime-lakehouse-opera-pms',
    title: 'Building a Zero-Downtime Real-Time Lakehouse for Hospitality Enterprises',
    category: 'Data Engineering',
    readTime: '8 min read',
    date: 'Nov 2024',
    author: 'Islam Samy',
    excerpt: 'How we captured Change Data Capture streams from legacy Oracle/OPERA PMS systems into ClickHouse with sub-250ms latency across 14 hotel chains.',
    content: `### The Challenge: Legacy Transactional Silos
Hospitality enterprises operating on OPERA PMS often suffer from fragmented databases that lock away critical reservation and financial metrics. Querying production transaction tables for executive reports frequently leads to database lockouts and degraded check-in speeds.

### The Architecture: CDC + Kafka + ClickHouse
To bypass reporting locks entirely, we engineered a non-invasive Change Data Capture (CDC) pipeline:
1. **Debezium Connectors** monitor Oracle redo logs asynchronously without database overhead.
2. **Kafka Brokers** buffer transaction events into partitioned topics keyed by Property ID.
3. **ClickHouse Consumer Services** ingest micro-batches with high-density columnar compression.

\`\`\`sql
-- ClickHouse MergeTree Table for High-Concurrency RevPAR Queries
CREATE TABLE hotel_analytics.reservations_stream (
    property_id UInt32,
    booking_id String,
    check_in_date Date,
    check_out_date Date,
    adr_amount Decimal(10, 2),
    status LowCardinality(String),
    event_timestamp DateTime
) ENGINE = ReplacingMergeTree(event_timestamp)
ORDER BY (property_id, check_in_date, booking_id);
\`\`\`

### Production Results
- **Zero lockups:** Operational PMS load reduced by 78%.
- **Sub-second dashboards:** Financial rollups execute in under 180ms across 12M historical rows.
- **Immediate ROI:** Automated ADR yield recommendations captured an estimated 6.2% revenue lift.`,
    tags: ['Kafka', 'ClickHouse', 'OPERA PMS', 'CDC', 'Distributed Systems'],
    featured: true
  },
  {
    id: 'art-sub-20ms-fraud-detection',
    slug: 'sub-20ms-ml-scoring-pipeline',
    title: 'Designing Sub-20ms Machine Learning Inference Pipelines in FinTech',
    category: 'Machine Learning',
    readTime: '6 min read',
    date: 'Oct 2024',
    author: 'Islam Samy',
    excerpt: 'Optimizing feature store retrieval, model quantization, and asynchronous scoring to prevent fraud on high-volume payment rails.',
    content: `### High-Throughput Fraud Detection
When evaluating 45,000 requests per minute on payment authorization gateways, every millisecond counts. A traditional ML server with remote database lookups introduces latency spikes that violate merchant SLAs.

### Optimization Strategies
- **Redis Cluster Feature Store:** Pre-aggregating customer transaction frequencies into sliding memory windows.
- **Model Quantization:** Compiling XGBoost ensembles into optimized C-bindings via Treelite, reducing CPU inference time from 42ms to 4.5ms.
- **Asynchronous Telemetry:** Streaming audit trails to Prometheus and ClickHouse asynchronously off the critical request path.`,
    tags: ['Machine Learning', 'FastAPI', 'Redis', 'Python', 'XGBoost'],
    featured: false
  },
  {
    id: 'art-distributed-event-driven-pitfalls',
    slug: 'distributed-event-driven-pitfalls',
    title: '5 Costly Traps in Distributed Event-Driven Architecture (And How to Evade Them)',
    category: 'Architecture',
    readTime: '10 min read',
    date: 'Sep 2024',
    author: 'Islam Samy',
    excerpt: 'Key lessons learned over 6 years of architecting distributed event-driven systems: ordering guarantees, poison pill deadlocks, and idempotency.',
    content: `### 1. Dual-Write Inconsistencies
Updating a relational database and publishing a Kafka message inside a standard application transaction leads to orphan states if the broker rejects the network call.

**The Solution:** The Transactional Outbox Pattern with automated CDC or dedicated log-tailing workers.

### 2. Underestimating Poison Pills
One corrupted payload can crash a consumer group, creating backpressure that overwhelms your cluster. Always construct automated Dead Letter Queues (DLQ) with retry policies.`,
    tags: ['Event-Driven', 'Kafka', 'System Design', 'Microservices'],
    featured: false
  }
];

