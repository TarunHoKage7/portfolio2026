export interface Skill {
  name: string;
  /** 1 = touched, 2 = used in prod, 3 = deep. */
  depth?: 1 | 2 | 3;
}

export interface Cluster {
  id: string;
  name: string;
  blurb: string;
  skills: Skill[];
}

export const clusters: Cluster[] = [
  {
    id: "serverless",
    name: "Serverless",
    blurb: "Event-driven, pay-per-call backends. The default tool for SaaS that doesn't pencil on EC2.",
    skills: [
      { name: "AWS Lambda", depth: 3 },
      { name: "API Gateway", depth: 3 },
      { name: "SQS", depth: 3 },
      { name: "SNS", depth: 2 },
      { name: "EventBridge", depth: 2 },
      { name: "Step Functions", depth: 2 },
      { name: "AWS CDK", depth: 3 },
    ],
  },
  {
    id: "data",
    name: "Data & Storage",
    blurb: "OLTP, geospatial, and object storage with cost-aware schema choices.",
    skills: [
      { name: "Aurora Postgres Serverless v2", depth: 3 },
      { name: "PostGIS", depth: 2 },
      { name: "DynamoDB", depth: 2 },
      { name: "RDS Proxy", depth: 2 },
      { name: "S3", depth: 3 },
      { name: "Redis Streams", depth: 2 },
    ],
  },
  {
    id: "containers",
    name: "Containerization",
    blurb: "When serverless isn't the right answer — long-running services, GPU work, fleet orchestration.",
    skills: [
      { name: "Docker", depth: 3 },
      { name: "ECS Fargate", depth: 2 },
      { name: "Kubernetes", depth: 1 },
    ],
  },
  {
    id: "observability",
    name: "Observability",
    blurb: "Production isn't done at deploy — it's done when you can debug it at 3am.",
    skills: [
      { name: "CloudWatch", depth: 3 },
      { name: "X-Ray", depth: 2 },
      { name: "CloudTrail", depth: 2 },
      { name: "OpenTelemetry", depth: 1 },
    ],
  },
  {
    id: "ai",
    name: "AI & ML",
    blurb: "Pipelines that ship, not notebooks that demo.",
    skills: [
      { name: "LangGraph", depth: 2 },
      { name: "LangChain", depth: 2 },
      { name: "OpenAI API", depth: 3 },
      { name: "Anthropic API", depth: 2 },
      { name: "Bedrock", depth: 2 },
      { name: "Vector DBs", depth: 2 },
    ],
  },
  {
    id: "cicd",
    name: "CI/CD & IaC",
    blurb: "Repeatable infra, gated rollouts, no snowflake environments.",
    skills: [
      { name: "AWS CDK", depth: 3 },
      { name: "GitHub Actions", depth: 3 },
      { name: "Jenkins", depth: 2 },
      { name: "Terraform", depth: 1 },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    blurb: "What I reach for first, second, and grudgingly.",
    skills: [
      { name: "Python", depth: 3 },
      { name: "TypeScript", depth: 3 },
      { name: "JavaScript", depth: 3 },
      { name: "SQL", depth: 3 },
      { name: "Bash", depth: 2 },
      { name: "Go", depth: 1 },
    ],
  },
  {
    id: "security",
    name: "Security & IAM",
    blurb: "Banking-grade auth, least-privilege resource policies, audited secrets.",
    skills: [
      { name: "AWS IAM", depth: 3 },
      { name: "Cognito", depth: 3 },
      { name: "Secrets Manager", depth: 2 },
      { name: "KMS", depth: 2 },
      { name: "OAuth/OIDC", depth: 2 },
    ],
  },
];
