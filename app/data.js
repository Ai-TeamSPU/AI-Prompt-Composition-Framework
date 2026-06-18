/* =========================================================================
   AI Workspace Prompt Composer — Data Registry + Prompt Compiler
   Plain JS, exported on window. No build step.
   ========================================================================= */

/* ----------------------------- Departments ----------------------------- */
const DEPARTMENTS = [
  {
    id: "dept_management", name: "Management", display_name: "Management & Strategy",
    monogram: "MG", color: "#185FA5", color_bg: "#E6F1FB", group: "Management Core",
    fragment: "The Management department owns company strategy, OKRs, and cross-functional oversight. It requires executive dashboards, approval routing, and consolidated reporting that rolls up every other department's KPIs into a single source of truth.",
    capabilities: ["Strategy", "OKRs", "Approvals", "Oversight"],
    default_tools: ["tool_dashboard", "tool_kpi", "tool_reporting"],
    deps: [{ dept: "Finance", reason: "Budget consolidation and forecasting" }],
  },
  {
    id: "dept_hr", name: "HR", display_name: "Human Resources",
    monogram: "HR", color: "#D4537E", color_bg: "#FBEAF0", group: "Support",
    fragment: "The Human Resources department manages the full employee lifecycle — recruitment, onboarding, payroll, performance, and compliance. It needs role-based access to sensitive records and tight integration with IT for provisioning and Finance for payroll.",
    capabilities: ["Recruitment", "Payroll", "Performance", "Compliance"],
    default_tools: ["tool_payroll", "tool_recruitment", "tool_performance"],
    deps: [{ dept: "IT", reason: "Account provisioning for new hires" }, { dept: "Finance", reason: "Payroll transfer and budget approval" }],
  },
  {
    id: "dept_finance", name: "Finance", display_name: "Finance & Accounting",
    monogram: "FN", color: "#1D9E75", color_bg: "#E1F5EE", group: "Business",
    fragment: "The Finance department governs budgeting, accounts payable/receivable, and financial reporting. It demands an immutable audit trail, multi-level approval workflows, and double-entry integrity across every monetary transaction in the system.",
    capabilities: ["Budgeting", "AP / AR", "Reporting", "Audit"],
    default_tools: ["tool_budget", "tool_reporting", "tool_activitylog"],
    deps: [{ dept: "Purchasing", reason: "Purchase order and invoice matching" }],
  },
  {
    id: "dept_sales", name: "Sales", display_name: "Sales",
    monogram: "SL", color: "#E24B4A", color_bg: "#FCEBEB", group: "Business",
    fragment: "The Sales department drives revenue through pipeline management, quoting, and deal closure. It relies on a CRM with stage automation, real-time pipeline visibility, and a clean hand-off to Finance for order-to-cash.",
    capabilities: ["Pipeline", "Quoting", "Forecasting", "Closing"],
    default_tools: ["tool_crm", "tool_pipeline", "tool_dashboard"],
    deps: [{ dept: "Finance", reason: "Order-to-cash and invoicing" }],
  },
  {
    id: "dept_marketing", name: "Marketing", display_name: "Marketing",
    monogram: "MK", color: "#BA7517", color_bg: "#FAEEDA", group: "Business",
    fragment: "The Marketing department plans campaigns, manages content, and tracks attribution across channels. It needs a campaign manager, lead-scoring rules, and analytics that feed qualified leads directly into the Sales pipeline.",
    capabilities: ["Campaigns", "Content", "Attribution", "Lead Gen"],
    default_tools: ["tool_campaign", "tool_kpi", "tool_reporting"],
    deps: [{ dept: "Sales", reason: "Qualified lead hand-off" }],
  },
  {
    id: "dept_operations", name: "Operations", display_name: "Operations",
    monogram: "OP", color: "#639922", color_bg: "#EAF3DE", group: "Business",
    fragment: "The Operations department coordinates production, fulfillment, and quality control. It requires project tracking, a QC monitor with pass/fail gates, and workflow automation that connects upstream Purchasing to downstream delivery.",
    capabilities: ["Production", "Fulfillment", "Quality", "Scheduling"],
    default_tools: ["tool_project", "tool_qc", "tool_workflow"],
    deps: [{ dept: "Purchasing", reason: "Raw material availability" }],
  },
  {
    id: "dept_it", name: "IT", display_name: "Information Technology",
    monogram: "IT", color: "#534AB7", color_bg: "#EEEDFE", group: "Support",
    fragment: "The IT department secures infrastructure, manages identity, and runs the service desk. It is the security backbone — owning IAM, backups, audit logging, and incident response that every other department depends on.",
    capabilities: ["Identity", "Security", "Service Desk", "Backups"],
    default_tools: ["tool_iam", "tool_backup", "tool_ticketing"],
    deps: [],
  },
  {
    id: "dept_rnd", name: "R&D", display_name: "Research & Development",
    monogram: "RD", color: "#0F6E56", color_bg: "#E1F5EE", group: "Business",
    fragment: "The R&D department drives product innovation, experiments, and the new-product pipeline. It needs lab and experiment tracking, project management, and a structured stage-gate hand-off to Operations for production readiness.",
    capabilities: ["Innovation", "Experiments", "Prototyping", "Stage-Gate"],
    default_tools: ["tool_lab", "tool_project", "tool_activitylog"],
    deps: [{ dept: "Operations", reason: "Production readiness hand-off" }],
  },
  {
    id: "dept_purchasing", name: "Purchasing", display_name: "Purchasing & Procurement",
    monogram: "PU", color: "#993C1D", color_bg: "#FAECE7", group: "Business",
    fragment: "The Purchasing department manages vendors, purchase orders, and procurement approvals. It requires a vendor manager, three-way invoice matching, and approval thresholds wired directly into Finance controls.",
    capabilities: ["Vendors", "Purchase Orders", "Sourcing", "Approvals"],
    default_tools: ["tool_vendor", "tool_workflow", "tool_budget"],
    deps: [{ dept: "Finance", reason: "Invoice matching and payment" }],
  },
  {
    id: "dept_cs", name: "Customer Service", display_name: "Customer Service",
    monogram: "CS", color: "#5F5E5A", color_bg: "#F1EFE8", group: "Support",
    fragment: "The Customer Service department resolves tickets, manages SLAs, and captures voice-of-customer feedback. It needs a helpdesk with SLA timers, escalation routing to Operations and IT, and a knowledge base for self-service.",
    capabilities: ["Tickets", "SLAs", "Escalation", "Feedback"],
    default_tools: ["tool_helpdesk", "tool_ticketing", "tool_activitylog"],
    deps: [{ dept: "Operations", reason: "Fulfillment issue escalation" }],
  },
];

/* -------------------------------- Tools -------------------------------- */
const TOOLS = [
  { id: "tool_dashboard", name: "Dashboard", category: "Analytics", parents: ["dept_management", "dept_sales"], fragment: "A configurable analytics dashboard surfacing real-time KPIs with drill-down and date-range filtering.", features: ["Real-time widgets", "Drill-down", "Saved views"] },
  { id: "tool_crm", name: "CRM", category: "Sales", parents: ["dept_sales"], fragment: "Customer relationship management with contact records, deal stages, and activity timelines.", features: ["Contact 360", "Stage automation", "Activity log"] },
  { id: "tool_payroll", name: "Payroll", category: "HR Ops", parents: ["dept_hr", "dept_finance"], fragment: "Automated payroll runs with tax handling, payslip generation, and Finance reconciliation.", features: ["Pay runs", "Tax tables", "Payslips"] },
  { id: "tool_recruitment", name: "Recruitment", category: "HR Ops", parents: ["dept_hr"], fragment: "Applicant tracking from job posting through offer with interview scheduling and scorecards.", features: ["ATS pipeline", "Scorecards", "Offer letters"] },
  { id: "tool_iam", name: "IAM", category: "Security", parents: ["dept_it"], fragment: "Identity and Access Management controlling authentication and authorization across the platform.", features: ["RBAC", "SSO", "MFA", "Audit log"] },
  { id: "tool_backup", name: "Backup", category: "Security", parents: ["dept_it"], fragment: "Scheduled, encrypted backups with point-in-time restore and retention policies.", features: ["Scheduled jobs", "Encryption", "PITR restore"] },
  { id: "tool_workflow", name: "Workflow", category: "Operations", parents: ["dept_operations", "dept_purchasing"], fragment: "A no-code workflow engine for routing approvals and automating cross-department handoffs.", features: ["Visual builder", "Conditional routing", "SLA timers"] },
  { id: "tool_reporting", name: "Reporting", category: "Analytics", parents: ["dept_finance", "dept_management"], fragment: "Scheduled and ad-hoc reporting with export to PDF, CSV, and shareable links.", features: ["Report builder", "Scheduling", "Export"] },
  { id: "tool_ticketing", name: "Ticketing", category: "IT Security", parents: ["dept_it", "dept_cs"], fragment: "Issue ticketing with priority, assignment, and SLA-bound resolution tracking.", features: ["Queues", "Priority", "SLA tracking"] },
  { id: "tool_activitylog", name: "Activity Log", category: "Security", parents: ["dept_finance", "dept_cs", "dept_rnd"], fragment: "Immutable activity and audit log capturing every user and system action with timestamps.", features: ["Immutable trail", "Filtering", "Export"] },
  { id: "tool_kpi", name: "KPI Tracker", category: "Analytics", parents: ["dept_management", "dept_marketing"], fragment: "Goal and KPI tracking with targets, trends, and automated threshold alerts.", features: ["Targets", "Trend charts", "Alerts"] },
  { id: "tool_budget", name: "Budget Tracker", category: "Finance", parents: ["dept_finance", "dept_purchasing"], fragment: "Budget planning and variance tracking with per-department allocations and approval gates.", features: ["Allocations", "Variance", "Approval gates"] },
  { id: "tool_performance", name: "Performance Review", category: "HR Ops", parents: ["dept_hr"], fragment: "Structured performance cycles with goals, 360 feedback, and rating calibration.", features: ["Review cycles", "360 feedback", "Calibration"] },
  { id: "tool_campaign", name: "Campaign Manager", category: "Marketing", parents: ["dept_marketing"], fragment: "Multi-channel campaign planning with scheduling, A/B testing, and attribution.", features: ["Channel scheduling", "A/B tests", "Attribution"] },
  { id: "tool_pipeline", name: "Pipeline Manager", category: "Sales", parents: ["dept_sales"], fragment: "Visual sales pipeline with stage probabilities, forecasting, and aging alerts.", features: ["Kanban stages", "Forecasting", "Aging alerts"] },
  { id: "tool_qc", name: "QC Monitor", category: "Operations", parents: ["dept_operations"], fragment: "Quality control monitoring with inspection checklists, pass/fail gates, and defect logging.", features: ["Inspection plans", "Pass/fail gates", "Defect log"] },
  { id: "tool_project", name: "Project Tracker", category: "Operations", parents: ["dept_operations", "dept_rnd"], fragment: "Project and task tracking with milestones, dependencies, and Gantt visualization.", features: ["Milestones", "Dependencies", "Gantt"] },
  { id: "tool_lab", name: "Lab Manager", category: "Operations", parents: ["dept_rnd"], fragment: "Experiment and lab tracking with protocols, sample registry, and result capture.", features: ["Protocols", "Sample registry", "Results"] },
  { id: "tool_vendor", name: "Vendor Manager", category: "Operations", parents: ["dept_purchasing"], fragment: "Vendor master data with scorecards, contract terms, and renewal reminders.", features: ["Vendor master", "Scorecards", "Renewals"] },
  { id: "tool_helpdesk", name: "Helpdesk", category: "IT Security", parents: ["dept_cs"], fragment: "Customer-facing helpdesk with knowledge base, live chat, and CSAT surveys.", features: ["Knowledge base", "Live chat", "CSAT"] },
];

/* ----------------------------- Prompt Layers --------------------------- */
/* 12 ordered layers. Each compiles from live workspace state. */
const PROMPT_LAYERS = [
  {
    id: "persona_layer", name: "Persona", order: 1, required: true,
    purpose: "Defines the AI agent's role and expertise domain.",
    compile: (s) => `You are a ${s.role}. You have designed and delivered production enterprise systems for ${s.industry} organizations at ${s.scale} scale, and you understand both technical architecture and business operations. You treat production-readiness, security, and maintainability as non-negotiable standards.`,
  },
  {
    id: "mission_layer", name: "Mission", order: 2, required: true,
    purpose: "States the single main objective.",
    compile: (s) => `MISSION: Design a ${s.systemLevel} enterprise software system for "${s.orgName}", a ${s.size} ${s.industry} organization. The system must digitize the selected departments, connect them through the defined workflows, and be buildable by an autonomous coding agent.`,
  },
  {
    id: "organization_layer", name: "Organization", order: 3, required: true,
    purpose: "Encodes the selected department structure.",
    compile: (s) => {
      if (!s.depts.length) return "ORGANIZATION: (no departments selected yet)";
      const lines = s.depts.map((d) => `- ${d.display_name} [${d.capabilities.join(", ")}]: ${d.fragment}`);
      return `ORGANIZATION STRUCTURE (${s.depts.length} departments):\n${lines.join("\n")}`;
    },
  },
  {
    id: "business_context_layer", name: "Business Context", order: 4, required: true,
    purpose: "Captures business goals and pain points.",
    compile: (s) => `BUSINESS CONTEXT: As a ${s.size} ${s.industry} company, "${s.orgName}" aims to reduce manual coordination between departments, enforce approval governance, and gain real-time visibility across operations. Prioritize features that remove repetitive manual work and surface decision-ready data to management.`,
  },
  {
    id: "feature_layer", name: "Features", order: 5, required: true,
    purpose: "Lists selected tools and their feature requirements.",
    compile: (s) => {
      const tools = s.tools;
      if (!tools.length) return "FEATURES: (no tools attached yet)";
      const lines = tools.map((t) => `- ${t.name} (${t.category}): ${t.fragment} Required: ${t.features.join(", ")}.`);
      return `FEATURE MODULES (${tools.length}):\n${lines.join("\n")}`;
    },
  },
  {
    id: "workflow_layer", name: "Workflows", order: 6, required: true,
    purpose: "Describes cross-department business flows.",
    compile: (s) => {
      if (!s.workflows.length) return "WORKFLOWS: (none defined yet)";
      const lines = s.workflows.map((w) => `- ${w.name} (trigger: ${w.trigger}): ${w.steps.map((st) => `${st.from} → ${st.to} [${st.action}]`).join("; ")}.`);
      return `CROSS-DEPARTMENT WORKFLOWS (${s.workflows.length}):\n${lines.join("\n")}`;
    },
  },
  {
    id: "ux_layer", name: "UX / UI", order: 7, required: false,
    purpose: "Sets UX and UI expectations.",
    compile: () => `UX EXPECTATIONS: Deliver a clean, responsive web UI with a left navigation, role-aware dashboards, and consistent data tables with search, filter, and bulk actions. Favor clarity over decoration; every screen must state its primary action.`,
  },
  {
    id: "architecture_layer", name: "Architecture", order: 8, required: true,
    purpose: "Sets technical architecture rules.",
    compile: () => `ARCHITECTURE: Use a modular, service-oriented backend with clear domain boundaries per department. Enforce a single shared identity layer, an event log for cross-module communication, and stateless API services behind an authenticated gateway.`,
  },
  {
    id: "tech_stack_layer", name: "Tech Stack", order: 9, required: false,
    purpose: "Declares required technologies.",
    compile: (s) => `TECH STACK: ${s.techStack}. Use environment-based configuration, migrations for all schema changes, and infrastructure-as-code for reproducible deployments.`,
  },
  {
    id: "execution_layer", name: "Execution", order: 10, required: true,
    purpose: "Defines the agent task breakdown format.",
    compile: () => `EXECUTION FORMAT: Break the build into numbered, independently shippable tasks. For each task provide: objective, files to create or modify, acceptance criteria, and a test to verify. Sequence tasks so the app is runnable after every step.`,
  },
  {
    id: "governance_layer", name: "Governance", order: 11, required: true,
    purpose: "Sets quality, security, and scope guardrails.",
    compile: () => `GOVERNANCE: Enforce role-based access control on every endpoint, validate and sanitize all input, never log secrets, and keep an audit trail for state-changing actions. Stay strictly within the defined scope — do not add departments, tools, or integrations that were not specified.`,
  },
  {
    id: "output_format_layer", name: "Output Format", order: 12, required: true,
    purpose: "Defines the structure of the generated output.",
    compile: (s) => `OUTPUT FORMAT: Respond as ${s.agentName}. Produce, in order: (1) System Architecture overview, (2) Database Schema, (3) REST API design, (4) a step-by-step build plan, (5) a deployment plan, and (6) a security checklist. Use clear headings and fenced code blocks. No prose outside these sections.`,
  },
];

/* ------------------------------ Workflows ------------------------------ */
const WORKFLOWS = [
  { id: "wf_onboarding", name: "Employee Onboarding", trigger: "New hire confirmed", depts: ["HR", "IT", "Finance"], steps: [{ from: "HR", to: "IT", action: "Provision account & access" }, { from: "HR", to: "Finance", action: "Set up payroll record" }] },
  { id: "wf_otc", name: "Order to Cash", trigger: "Deal marked won", depts: ["Sales", "Finance"], steps: [{ from: "Sales", to: "Finance", action: "Generate invoice" }, { from: "Finance", to: "Sales", action: "Confirm payment received" }] },
  { id: "wf_procurement", name: "Procurement Approval", trigger: "Purchase request raised", depts: ["Purchasing", "Finance"], steps: [{ from: "Purchasing", to: "Finance", action: "Request budget approval" }, { from: "Finance", to: "Purchasing", action: "Approve & release PO" }] },
  { id: "wf_budget", name: "Budget Request", trigger: "Department submits budget", depts: ["Management", "Finance"], steps: [{ from: "Management", to: "Finance", action: "Submit budget proposal" }, { from: "Finance", to: "Management", action: "Approve allocation" }] },
  { id: "wf_incident", name: "IT Incident", trigger: "Incident reported", depts: ["Customer Service", "IT"], steps: [{ from: "Customer Service", to: "IT", action: "Escalate incident" }, { from: "IT", to: "Customer Service", action: "Resolve & notify" }] },
  { id: "wf_complaint", name: "Customer Complaint", trigger: "Complaint logged", depts: ["Customer Service", "Operations"], steps: [{ from: "Customer Service", to: "Operations", action: "Route fulfillment issue" }, { from: "Operations", to: "Customer Service", action: "Confirm resolution" }] },
  { id: "wf_launch", name: "New Product Launch", trigger: "Product approved for launch", depts: ["R&D", "Operations", "Marketing"], steps: [{ from: "R&D", to: "Operations", action: "Hand off to production" }, { from: "Operations", to: "Marketing", action: "Trigger launch campaign" }] },
  { id: "wf_reporting", name: "Monthly Reporting", trigger: "Month-end close", depts: ["Finance", "Management"], steps: [{ from: "Finance", to: "Management", action: "Deliver consolidated report" }] },
];

/* ------------------------------ AI Agents ------------------------------ */
const AI_AGENTS = [
  { id: "agent_claude", name: "Claude", provider: "Anthropic", style: "Rigorous, security-first reasoning" },
  { id: "agent_gpt", name: "GPT-4o", provider: "OpenAI", style: "Fast, broad code generation" },
  { id: "agent_gemini", name: "Gemini", provider: "Google", style: "Strong multimodal & data" },
  { id: "agent_manus", name: "Manus", provider: "Manus", style: "Autonomous multi-step builds" },
];

/* ------------------------------ Industries ----------------------------- */
const INDUSTRIES = ["General Business", "Retail & E-commerce", "Technology / SaaS", "Manufacturing", "Healthcare", "Financial Services", "Logistics", "Education"];
const SIZES = [
  { id: "S", label: "Startup", hint: "1–20" },
  { id: "M", label: "SME", hint: "21–200" },
  { id: "L", label: "Mid-Market", hint: "201–1000" },
  { id: "XL", label: "Enterprise", hint: "1000+" },
];
const TEMPLATES = [
  { id: "scratch", name: "Start from scratch", depts: [] },
  { id: "retail", name: "Retail Company", depts: ["dept_sales", "dept_finance", "dept_operations", "dept_cs", "dept_purchasing"] },
  { id: "tech", name: "Tech Startup", depts: ["dept_management", "dept_it", "dept_rnd", "dept_sales"] },
  { id: "mfg", name: "Manufacturing", depts: ["dept_operations", "dept_purchasing", "dept_finance", "dept_rnd"] },
];

/* ------------------------ Simulated blueprint output ------------------- */
/* Used for the demo "Generate" result. The compiled PROMPT above is real. */
function buildBlueprint(state) {
  const depts = state.depts.map((d) => d.name);
  const tools = state.tools.map((t) => t.name);
  const tabs = {};

  tabs["Architecture"] = `# System Architecture — ${state.orgName}

Pattern: Modular monolith with per-department domain modules behind an authenticated API gateway.

Modules:
${state.depts.map((d) => `  • ${d.display_name.toLowerCase().replace(/[^a-z]/g, "-")}-service  →  ${d.capabilities.join(", ")}`).join("\n") || "  (no departments selected)"}

Shared infrastructure:
  • identity-service  (IAM, RBAC, SSO, MFA)
  • event-bus         (cross-module workflow events)
  • audit-log         (immutable trail of state changes)
  • reporting-service (cross-department KPI rollup)

Cross-department workflows wired via the event bus:
${state.workflows.map((w) => `  • ${w.name}: ${w.steps.map((s) => `${s.from}→${s.to}`).join(", ")}`).join("\n") || "  (none defined)"}`;

  tabs["DB Schema"] = `-- Database Schema (excerpt)  ·  PostgreSQL
CREATE TABLE organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,        -- ${state.orgName}
  industry    TEXT NOT NULL,        -- ${state.industry}
  size        TEXT NOT NULL,        -- ${state.size}
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID REFERENCES organizations(id),
  email       CITEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL,        -- rbac role
  dept        TEXT                  -- ${depts.join(" | ") || "—"}
);
${state.depts.map((d) => `
CREATE TABLE ${d.name.toLowerCase().replace(/[^a-z]/g, "_")}_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID REFERENCES organizations(id),
  status      TEXT NOT NULL DEFAULT 'open',
  payload     JSONB NOT NULL,
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);`).join("\n") || "-- (select departments to generate their tables)"}`;

  tabs["API Design"] = `# REST API  ·  /api/v1  ·  Bearer auth on every route

POST   /auth/login                 → { token }
GET    /me                         → current user + role

${state.depts.map((d) => {
    const base = "/" + d.name.toLowerCase().replace(/[^a-z]/g, "-");
    return `# ${d.display_name}
GET    ${base}                     → list (paginated, filterable)
POST   ${base}                     → create
GET    ${base}/:id                 → read
PATCH  ${base}/:id                 → update  (audit-logged)
DELETE ${base}/:id                 → archive (soft delete)`;
  }).join("\n\n") || "# (select departments to scaffold their endpoints)"}`;

  tabs["Build Plan"] = `# Agent Build Plan — sequenced & independently shippable

1. Bootstrap: repo, env config, CI, Postgres + migrations
2. identity-service: users, RBAC, SSO, MFA, audit-log
3. App shell: left nav, role-aware dashboard, data-table component
${state.depts.map((d, i) => `${i + 4}. ${d.display_name} module: CRUD + ${d.capabilities[0]} + ${d.capabilities[1] || "reporting"}`).join("\n")}
${state.depts.length + 4}. Wire workflows on the event bus${state.workflows.length ? ` (${state.workflows.map((w) => w.name).join(", ")})` : ""}
${state.depts.length + 5}. reporting-service: cross-department KPI rollup
${state.depts.length + 6}. Hardening: input validation, rate limits, audit coverage
${state.depts.length + 7}. Deploy: containerize, IaC, staging → production

Acceptance: app is runnable and demoable after every numbered step.`;

  tabs["Deployment"] = `# Deployment Plan  ·  Docker + IaC

services:
  gateway:    nginx, TLS termination, rate limiting
  api:        node/python services, stateless, HPA-scaled
  worker:     async jobs (payroll runs, report scheduling)
  db:         managed Postgres, PITR backups, read replica
  cache:      redis (sessions, rate limits)
  objstore:   S3-compatible (documents, exports, backups)

Pipeline:  build → test → scan → migrate → blue/green deploy
Secrets:   managed secret store, never in env files or logs
Tools wired: ${tools.join(", ") || "—"}`;

  tabs["Security"] = `# Security Checklist

[✓] RBAC enforced on every endpoint (deny by default)
[✓] All input validated & sanitized at the boundary
[✓] MFA available; SSO for enterprise tenants
[✓] Secrets in managed store; nothing sensitive logged
[✓] Immutable audit trail on every state-changing action
[✓] Encrypted backups with tested point-in-time restore
[✓] Dependency & container scanning in CI
[✓] Least-privilege DB roles per service
${state.depts.find((d) => d.id === "dept_finance") ? "[✓] Double-entry integrity + approval gates on monetary records\n" : ""}${state.depts.find((d) => d.id === "dept_hr") ? "[✓] PII access restricted to HR role; field-level encryption\n" : ""}Generated for: ${state.orgName} — reviewed by ${state.agentName}`;

  return tabs;
}

/* ------------------------- Master prompt compiler ---------------------- */
/* Per-department room atmosphere — wall / floor / accent / mood. */
const DEPT_BG_THEMES = {
  dept_management: { wall: "#1a2a3a", floor: "#2a1a0a", accent: "#378ADD", mood: "executive", moodTh: "ผู้บริหาร" },
  dept_hr:         { wall: "#f5e8e0", floor: "#5a3010", accent: "#D4537E", mood: "warm", moodTh: "อบอุ่น" },
  dept_finance:    { wall: "#c8d8c0", floor: "#dde8e0", accent: "#1D9E75", mood: "professional", moodTh: "มืออาชีพ" },
  dept_marketing:  { wall: "#f0d8a0", floor: "#3a2510", accent: "#BA7517", mood: "creative", moodTh: "สร้างสรรค์" },
  dept_sales:      { wall: "#2a1010", floor: "#1a1010", accent: "#E24B4A", mood: "aggressive", moodTh: "ดุดัน" },
  dept_operations: { wall: "#3a4a2a", floor: "#888878", accent: "#639922", mood: "industrial", moodTh: "อุตสาหกรรม" },
  dept_it:         { wall: "#1a1535", floor: "#111122", accent: "#534AB7", mood: "tech", moodTh: "เทคโนโลยี" },
  dept_rnd:        { wall: "#e0f0ec", floor: "#e8e8f0", accent: "#0F6E56", mood: "lab", moodTh: "ห้องแล็บ" },
  dept_purchasing: { wall: "#d4b888", floor: "#4a2a0a", accent: "#993C1D", mood: "warehouse", moodTh: "คลังสินค้า" },
  dept_cs:         { wall: "#c8ccd8", floor: "#888880", accent: "#5F5E5A", mood: "service", moodTh: "บริการ" },
};
function isDark(hex) {
  const c = hex.replace("#", ""); const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
  return (0.299*r + 0.587*g + 0.114*b) < 140;
}
DEPT_BG_THEMES.__isDark = isDark;

/* Derives compiler variables from live workspace state, then runs every
   layer's compile() in order. Returns { layers:[{id,name,text,active}], master } */
function compileWorkspace(ws) {
  const depts = ws.deptIds.map((id) => DEPARTMENTS.find((d) => d.id === id)).filter(Boolean);
  const toolIds = new Set();
  Object.values(ws.toolsByDept || {}).forEach((arr) => (arr || []).forEach((t) => toolIds.add(t)));
  const tools = [...toolIds].map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean);
  const workflows = ws.workflowIds.map((id) => WORKFLOWS.find((w) => w.id === id)).filter(Boolean);
  const agent = AI_AGENTS.find((a) => a.id === ws.agentId) || AI_AGENTS[0];
  const sizeObj = SIZES.find((s) => s.id === ws.org.size);

  const domains = depts.length
    ? depts.map((d) => d.capabilities[0].toLowerCase()).slice(0, 6).join(", ")
    : "enterprise systems, UX design, security, and database architecture";

  const ctx = {
    role: "Lead Enterprise Software Architect and Senior Fullstack Developer with deep expertise in " + domains,
    industry: (ws.org.industry || "general business").toLowerCase(),
    scale: sizeObj ? sizeObj.label.toLowerCase() : "small to mid-sized",
    orgName: ws.org.name || "Demo Enterprise",
    size: sizeObj ? sizeObj.label : "SME",
    systemLevel: depts.length > 5 ? "comprehensive" : "focused MVP",
    depts, tools, workflows,
    agentName: agent.name,
    techStack: "React + TypeScript frontend, Node.js (or Python) services, PostgreSQL, Redis, Docker",
  };

  const layers = PROMPT_LAYERS.map((L) => {
    let active = true;
    if (L.id === "organization_layer") active = depts.length > 0;
    if (L.id === "feature_layer") active = tools.length > 0;
    if (L.id === "workflow_layer") active = workflows.length > 0;
    return { id: L.id, name: L.name, order: L.order, required: L.required, purpose: L.purpose, text: L.compile(ctx), active };
  });

  const master = layers
    .filter((l) => l.active)
    .map((l) => `### ${l.order}. ${l.name.toUpperCase()} LAYER\n${l.text}`)
    .join("\n\n");

  return { layers, master, ctx, deptObjs: depts, toolObjs: tools, workflowObjs: workflows, agent };
}

window.WS = {
  DEPARTMENTS, TOOLS, PROMPT_LAYERS, WORKFLOWS, AI_AGENTS,
  INDUSTRIES, SIZES, TEMPLATES,
  compileWorkspace, buildBlueprint,
  DEPT_BG_THEMES,
};
