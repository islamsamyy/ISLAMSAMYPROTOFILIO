export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  companyLogo: string;
  category: 'Distributed Systems' | 'Lakehouse & BI' | 'AI & Machine Learning' | 'Cloud Native';
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
}

export const initialProjects: ProjectItem[] = [
  {
    id: 'safir-lakehouse',
    title: 'Hospitality Multi-Property Real-Time Lakehouse',
    client: 'Safir Hotels & Resorts',
    companyLogo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80',
    category: 'Lakehouse & BI',
    role: 'Lead Data & Solutions Architect',
    impactMetric: '1.4M msg/sec',
    metrics: [
      { label: 'Throughput', value: '1.4M msg/sec' },
      { label: 'Latency', value: '< 250ms p99' },
      { label: 'Data Lake Sync', value: '5-min incremental' },
      { label: 'Properties Unified', value: '14 Hotels' }
    ],
    techStack: ['OPERA PMS', 'Apache Kafka', 'ClickHouse', 'Python', 'Power BI', 'Docker', 'Kubernetes'],
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
    liveDemoUrl: 'https://github.com/islam-samy',
    featured: true
  },
  {
    id: 'fintech-predictive-engine',
    title: 'Real-Time Fraud & Anomaly Prediction Gateway',
    client: 'FinTech Cloud International',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
    category: 'AI & Machine Learning',
    role: 'Principal ML Engineer',
    impactMetric: '95% Accuracy',
    metrics: [
      { label: 'Model Precision', value: '95.4%' },
      { label: 'Inference SLA', value: '< 18ms' },
      { label: 'False Positives', value: '-62%' },
      { label: 'Prevented Losses', value: '$4.2M' }
    ],
    techStack: ['Python', 'XGBoost', 'FastAPI', 'Redis', 'Kubernetes', 'Prometheus', 'Triton'],
    summary: 'Engineered sub-20ms latency machine learning scoring engine handling 45,000 requests per minute with automated retraining pipelines.',
    challenge: 'Payment fraud attack vectors evolved faster than traditional rule-based transaction scoring engines could handle. Legitimate cardholders experienced high false-positive decline rates (causing cart abandonment), while fraudulent syndicate patterns slipped through rule checks during flash sale spikes of 45,000 requests per minute.',
    solution: 'Constructed an ultra-low latency predictive scoring microservice powered by an ensemble of XGBoost and LightGBM models. Integrated an in-memory Redis feature store for sub-millisecond retrieval of user behavioral history, device fingerprints, and geolocation velocity. Deployed horizontally on Kubernetes behind FastAPI with gRPC fallback.',
    architectureHighlights: [
      'Trained gradient boosting ensemble on 12M historical transaction records with feature store caching in Redis.',
      'Implemented canary deployment strategy with Prometheus drift detection and fallback rule heuristics.',
      'Prevented over $4.2M in unauthorized chargebacks across the first two quarters of production rollout.',
      'Achieved p99 inference latency of 14.2ms under peak load.'
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
      'Audit Logging: Dispatches async event to Kafka for offline model retraining and drift analysis.'
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
    id: 'telecom-streaming-pipeline',
    title: 'Distributed Network CDR Processing Cluster',
    client: 'EMEA Telecom Alliance',
    companyLogo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=120&q=80',
    category: 'Distributed Systems',
    role: 'Senior Systems Architect',
    impactMetric: '60% Cost Reduction',
    metrics: [
      { label: 'Cloud Cost', value: '-60%' },
      { label: 'CDR Volume', value: '800M daily' },
      { label: 'Availability', value: '99.99%' },
      { label: 'Processing SLA', value: 'Real-time' }
    ],
    techStack: ['Go', 'Apache Spark', 'AWS S3', 'Terraform', 'PostgreSQL', 'Grafana', 'Prometheus'],
    summary: 'Replaced legacy on-premise batch infrastructure with serverless streaming architecture cutting operational compute costs by 60%.',
    challenge: 'A major telecom operator generated 800M Call Detail Records (CDRs) daily across cellular towers. Legacy on-premise mainframe batch processing was unable to finish daily rating calculations within 24 hours, causing delayed billing, disputed international roaming charges, and escalating hardware maintenance expenses.',
    solution: 'Designed and deployed an elastic event-driven stream processing architecture in Go and Apache Spark. Raw binary telecom packets are parsed on edge nodes, dispatched into segmented cloud topics, and partitioned into Parquet columnar files on object storage for instant distributed SQL querying via Trino/Athena.',
    architectureHighlights: [
      'Migrated legacy monolithic ETL scripts to decoupled Go event microservices deployed on Kubernetes.',
      'Configured partitioned Parquet storage on S3 integrated with AWS Athena for ad-hoc analytical queries.',
      'Built distributed tracing with OpenTelemetry ensuring full auditability of regulatory compliance records.',
      'Implemented automated spot-instance auto-scaling reducing infrastructure expenditure by 60%.'
    ],
    keyDecisions: [
      {
        title: 'Go Microservices vs Java JVM Services',
        rationale: 'Go binaries consumed 85% less memory per container, eliminated JVM garbage collection pauses, and booted in milliseconds on auto-scaled worker nodes.',
        tradeOff: 'Lower availability of pre-built telecom proprietary protocol decoding libraries compared to legacy Java ecosystems.'
      },
      {
        title: 'Partitioned Parquet on S3 vs Dedicated Data Warehouse',
        rationale: 'Decoupled compute from storage, allowing historical CDRs to be stored at cold object storage prices while remaining instantly queryable.',
        tradeOff: 'Requires disciplined partition pruning and file size compaction routines.'
      }
    ],
    systemFlow: [
      'Cellular Tower Telemetry: Tower switches stream raw binary CDR byte streams.',
      'Go Edge Parsers: Decodes ASN.1 telecom protocol packets into structured JSON/Avro events.',
      'Cloud Event Ingestion: Kinesis/Kafka topic receives rated events with checksum validations.',
      'Apache Spark Streaming: Aggregates tower density, roaming partner splits, and billing tiers.',
      'S3 Parquet Lake: Snappy compressed partitions organized by year/month/day/tower_id.',
      'Grafana Observability: Live network utilization and anomaly alarm monitors.'
    ],
    outcomeMetrics: [
      { label: 'Compute Cost Savings', value: '60%', description: 'Massive reduction in dedicated on-prem hardware and licensing fees.' },
      { label: 'Daily Throughput', value: '800M', description: 'Processed daily CDR volume with zero batch lag or data backpressure.' },
      { label: 'Audit Readiness', value: '100%', description: 'Immutable cryptographic hashes on every CDR for regulatory compliance.' }
    ],
    liveDemoUrl: 'https://github.com/islam-samy',
    featured: true
  },
  {
    id: 'logistics-fleet-telemetry',
    title: 'Autonomous Fleet IoT Dispatch & Geo-Tracking',
    client: 'TransGlobal Freight Networks',
    companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    category: 'Cloud Native',
    role: 'Solutions Architect & Consultant',
    impactMetric: 'Sub-second Geo Sync',
    metrics: [
      { label: 'Active Sensors', value: '18,500+' },
      { label: 'Route Efficiency', value: '+24%' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Latency', value: 'Sub-second' }
    ],
    techStack: ['Node.js', 'MQTT', 'WebSockets', 'Next.js', 'PostGIS', 'TailwindCSS', 'Redis'],
    summary: 'Created a high-concurrency dispatch system aggregating GPS telemetry, temperature sensors, and vehicle OBD-II diagnostics in real-time.',
    challenge: 'A continental logistics fleet of 18,500 cold-chain freight vehicles suffered spoilage risks and shipment delays due to lack of real-time temperature, humidity, and location tracking. Existing GPS trackers updated only once every 15 minutes, making it impossible to alert dispatchers before cargo spoiled.',
    solution: 'Architected an end-to-end IoT ingestion platform using MQTT and persistent WebSockets. Edge vehicle telemetry units transmit second-by-second sensor readings. Spatial queries in PostGIS calculate instantaneous proximity alerts and geofence breaches, pushing live vehicle markers to dispatchers on an interactive vector map.',
    architectureHighlights: [
      'Designed resilient MQTT broker gateway handling network dropouts and intermittent satellite connectivity.',
      'Implemented spatial indexing via PostGIS to calculate automated proximity geofences and delivery alerts.',
      'Developed responsive WebSocket client dashboard with smooth vector maps and fleet alerts.',
      'Integrated cold-chain threshold alerts automatically dispatching emergency SMS/email notifications.'
    ],
    keyDecisions: [
      {
        title: 'MQTT Protocol vs HTTP REST Polling',
        rationale: 'MQTT reduced cellular packet overhead by 92% and maintained persistent low-power connections across cellular dead zones.',
        tradeOff: 'Required deploying dedicated clustered MQTT broker nodes with TLS termination.'
      },
      {
        title: 'PostGIS Spatial Engine vs NoSQL Geospatial',
        rationale: 'PostGIS provided native spatial bounding box indexing (R-Tree) with complex polygon intersects for precise warehouse boundaries.',
        tradeOff: 'Higher indexing overhead during massive burst writes, mitigated by batching coordinates in Redis first.'
      }
    ],
    systemFlow: [
      'Vehicle Sensor Array: OBD-II, GPS, and cryogenic temperature sensors sample every second.',
      'Cellular IoT Transmitter: Packages sensor frames into lightweight MQTT payloads.',
      'MQTT Broker Cluster: Receives encrypted packets with QoS level 1 reliability.',
      'Redis Ingestion Buffer: De-dups and calculates delta distance and speed anomalies.',
      'PostGIS Storage: Persists historical trail trajectories with spatial R-tree indexes.',
      'Dispatcher WebSocket HUD: Live dashboard streams vehicle positions with zero page refresh.'
    ],
    outcomeMetrics: [
      { label: 'Cold-Chain Spoilage', value: '-88%', description: 'Instant temperature excursion warnings prevented spoilage before cargo was damaged.' },
      { label: 'Fuel & Route Optimization', value: '+24%', description: 'Dynamic rerouting avoided severe traffic bottlenecks and highway closures.' },
      { label: 'Connected Devices', value: '18,500+', description: 'Simultaneously connected telemetry sensors streaming continuous telemetry.' }
    ],
    liveDemoUrl: 'https://github.com/islam-samy',
    featured: true
  }
];
