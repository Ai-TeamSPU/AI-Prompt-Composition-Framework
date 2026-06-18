# Visual Enterprise AI Workspace Simulator
## Complete Design Brief — Ready for Claude / Lovable / v0 / Figma / Cursor

---

## 1. Project Overview

**Product Name:** Visual Enterprise AI Workspace Simulator  
**Type:** No-code Visual Prompt Composition Platform  
**Core Idea:** Users drag and drop departments, tools, and workflows into an office canvas. The system converts visual selections into modular prompt layers and sends them to an AI agent (Claude / GPT / Gemini / Manus) to generate enterprise software systems.

**Target Users:** Business owners, Executives, Managers, IT teams, Non-technical enterprise users  
**Design Principle:** No-code first. Visual before text. JSON as source of truth.

---

## 2. Design System Tokens

### Typography
| Role | Font | Size | Weight |
|---|---|---|---|
| UI / Body | Inter | 14px | 400 |
| Headings | Inter | 16–22px | 500 |
| Code / Prompt Preview | JetBrains Mono | 11–12px | 400 |
| Labels / Badges | Inter | 10–11px | 500 |

### Color System — Department Colors
| Department | HEX | Usage |
|---|---|---|
| Management | `#185FA5` / bg `#E6F1FB` | Blue |
| HR | `#D4537E` / bg `#FBEAF0` | Pink |
| Finance | `#1D9E75` / bg `#E1F5EE` | Teal |
| Sales | `#E24B4A` / bg `#FCEBEB` | Red |
| Marketing | `#BA7517` / bg `#FAEEDA` | Amber |
| Operations | `#639922` / bg `#EAF3DE` | Green |
| IT | `#534AB7` / bg `#EEEDFE` | Purple |
| R&D | `#0F6E56` / bg `#E1F5EE` | Dark Teal |
| Purchasing | `#993C1D` / bg `#FAECE7` | Coral |
| Customer Service | `#5F5E5A` / bg `#F1EFE8` | Gray |

### Semantic Colors
```
Background Primary:   #FFFFFF  (white cards)
Background Secondary: #F8F9FA  (surfaces, panel bg)
Border Default:       rgba(0,0,0,0.12)  (0.5px)
Border Hover:         rgba(0,0,0,0.25)
Text Primary:         #1A1A1A
Text Secondary:       #6B7280
Text Hint:            #9CA3AF
Success:              #1D9E75
Warning:              #BA7517
Error:                #E24B4A
```

### Spacing Scale
```
4px / 8px / 12px / 16px / 24px / 32px / 48px
```

### Border Radius
```
sm: 4px   (chips, tags)
md: 8px   (inputs, small cards)
lg: 12px  (main cards, panels)
xl: 16px  (modals)
```

---

## 3. Application Layout

### Main Layout — 3-Column Panel (Desktop 1440px)
```
┌─────────────────────────────────────────────────────────────────┐
│  TOPBAR: Logo + App Name + Step Progress (5 steps)  + Settings  │
├──────────────┬──────────────────────────────┬───────────────────┤
│              │                              │                   │
│  LEFT PANEL  │      CENTER CANVAS           │   RIGHT PANEL     │
│   220px      │         flex                 │     260px         │
│              │                              │                   │
│ Department   │  Office Canvas               │ AI Agent Select   │
│ Library      │  (Drop Zone)                 │ Prompt Layers     │
│              │                              │ Prompt Inspector  │
│ Tool         │  Dept Blocks +               │ Generate Button   │
│ Marketplace  │  Tool Chips +                │                   │
│              │  Workflow Connectors         │                   │
└──────────────┴──────────────────────────────┴───────────────────┘
```

### Column Specs
**Left Panel (220px)**
- Header: "Department Library" + count badge
- Tabbed: `Departments` | `Tools` | `Workflows`
- Dept grouped by: Management Core / Business / Support
- Each item: color dot + name + english label + add badge

**Center Canvas (flex)**
- Background: `#F8F9FA` grid pattern (20px dot grid)
- Dropped DepartmentBlocks: 2–3 column auto-flow grid
- Connector line area (bottom strip): workflow arrow display
- Empty state: centered icon + instructional text

**Right Panel (260px)**
- AI Agent Selector: 2x2 grid (Claude / GPT / Gemini / Manus)
- Prompt Layers: list of 12 with status dot
- Prompt Inspector: monospace textarea preview
- Generate CTA button (full width, primary blue)

---

## 4. Screen List (5 Screens)

### S1 — Onboarding / Create Organization
**Purpose:** First-run setup  
**Elements:**
- Centered card (max-width 480px)
- Fields: Organization Name, Industry (dropdown), Company Size (S/M/L/Enterprise)
- Template quick-select: "Start from scratch" / "Retail Company" / "Tech Startup" / "Manufacturing"
- CTA: "Build My Office →"

### S2 — Main Builder Canvas (Primary Screen)
**Purpose:** Core drag-and-drop experience  
**Elements:** Full 3-column layout as above  
**States:** Empty / Building / Ready to Generate  
**Key Interactions:**
- Click dept in library → adds to canvas
- Drag dept block on canvas → reposition
- Click dept block → expand to show tool slots
- Click tool in library → attaches to selected dept
- Hover connector strip → show workflow editor

### S3 — Tool Marketplace (Modal or Side Drawer)
**Purpose:** Browse and attach tools to departments  
**Elements:**
- Search input
- Filter by: Category / Department / Status
- Tool grid: icon + name + description + "Add to [Dept]" button
- Tool categories: HR Ops / Finance / Sales / IT Security / Analytics / Operations

### S4 — Workflow Designer (Inline or Modal)
**Purpose:** Define cross-department business flows  
**Elements:**
- Visual connector: Dept A → action label → Dept B
- Preset workflows: Employee Onboarding / Order to Cash / Budget Approval / IT Incident
- Custom workflow builder: pick from dept + action input + pick to dept
- Workflow list: expandable accordion

### S5 — AI Output / Blueprint Panel
**Purpose:** Display generated system blueprint  
**Elements:**
- Tab bar: Architecture / DB Schema / API Design / Manus Plan / Docker / Security
- Code block (monospace) per tab
- Copy button per section
- Download as Markdown / JSON
- "Regenerate" + "Edit Prompt" actions

---

## 5. Component Specs

### DepartmentCard (Draggable Library Item)
```
States: idle | hover | dragging | added
Size: full-width of left panel, height 52px
Layout: [color-dot 8px] [dept-name 500 12px] [eng-label 10px muted] [badge right]
Border: 0.5px border-tertiary, radius-md
On added: border changes to dept color, badge shows tool count
```

### DepartmentBlock (Dropped on Canvas)
```
States: idle | selected | hover
Size: ~180px wide, auto height
Header: [dept-icon 24px in colored bg] [dept-name 11px 500]
Body: flex-wrap of ToolChip components
Border: 0.5px colored border (dept color 200 stop)
Selected: 2px border (dept color 600 stop)
```

### ToolChip (Attached to DeptBlock)
```
Size: auto-width pill, height 20px
Style: font 9px 500, bg = dept color 50, color = dept color 800
States: default | hover (shows remove x)
```

### PromptLayerBadge
```
Size: full-width row, height 26px
Layout: [status-dot 6px] [layer-name 10px] [order-num right muted]
Status dot colors:
  ready    = #1D9E75 (green)
  pending  = #EF9F27 (amber)
  waiting  = #B4B2A9 (gray)
  error    = #E24B4A (red)
```

### AIAgentButton
```
Size: flex 1 in 2x2 grid, height 52px
Layout: centered [name 11px 500] [provider 10px muted]
States: default | selected
Selected: border 1.5px dept blue, bg #E6F1FB
```

### GenerateButton
```
Size: full-width, height 40px
Default: bg #0C447C, text white, "Generate Enterprise Blueprint"
Loading: pulsing animation + "Compiling 12 layers..."
Success: bg #1D9E75 + "Blueprint Ready!"
Error: bg #E24B4A + "Try Again"
```

### WorkflowConnector Strip
```
Height: 36px auto strip at bottom of canvas
Layout: horizontal scroll row of workflow pills
Pill: [icon arrows-shuffle] [from-dept] [→] [to-dept] [action label]
Colors: soft border, dept color accents on names
```

---

## 6. Interaction & Animation Specs

### Drag and Drop
```
Drag start:   card lifts (scale 1.05), opacity 0.85, cursor: grabbing
Drag over:    canvas zone highlights (dashed border → solid), bg tint
Drop success: block snaps to grid, fade-in scale 0.95→1.0, 150ms ease-out
Drop fail:    card returns to origin, shake animation 200ms
```

### Generate Flow
```
1. Button press:    ripple effect, button → loading state
2. Layer compile:   layer badges animate left-to-right: gray→amber→green, 100ms stagger
3. Prompt preview:  monospace text streams into inspector box
4. Output ready:    right panel slides open, tab bar appears
5. Duration:        ~2-3 seconds simulated or real API time
```

### Empty States
```
Canvas empty:   Building icon (24px) + "Drag a department to start"
No tools:       Puzzle icon + "Click a department to add tools"
Generating:     Animated dot ring + "Claude is building your system..."
No output yet:  Sparkles icon + "Select departments and click Generate"
```

---

## 7. User Flow (7 Steps)

```
Step 1: CREATE ORG
  User fills org name, industry, size → clicks "Build My Office"

Step 2: ADD DEPARTMENTS
  User clicks/drags departments from library → appear on canvas
  Each dept block shows with empty tool slots

Step 3: ADD TOOLS
  User opens Tool Marketplace → attaches tools to departments
  ToolChips appear on dept blocks, layer count updates

Step 4: DEFINE WORKFLOWS
  User clicks connector strip → opens workflow editor
  Draws: HR → IT (Employee Onboarding), Sales → Finance (Order to Cash)

Step 5: JSON GENERATED (auto)
  Every action updates internal JSON state (Zustand store)
  Prompt Inspector shows compiled preview updating live

Step 6: COMPILE LAYERS (auto on Generate)
  12 prompt layers fill in order 1→12
  Each layer status: waiting → pending → ready

Step 7: AI OUTPUT
  Generated blueprint appears in output panel (S5)
  Tabs: Architecture / DB Schema / API / Manus Plan / Docker / Security
```

---

## 8. Prompt Layer Architecture (12 Layers)

| Order | Layer ID | Purpose | Required |
|---|---|---|---|
| 1 | `persona_layer` | AI role + expertise domain | Yes |
| 2 | `mission_layer` | Main objective | Yes |
| 3 | `organization_layer` | Selected departments structure | Yes |
| 4 | `business_context_layer` | Business goals + pain points | Yes |
| 5 | `feature_layer` | Selected tools + features | Yes |
| 6 | `workflow_layer` | Cross-dept workflows | Yes |
| 7 | `ux_layer` | UX/UI expectations | No |
| 8 | `architecture_layer` | Tech architecture rules | Yes |
| 9 | `tech_stack_layer` | Required technologies | No |
| 10 | `execution_layer` | Agent task breakdown format | Yes |
| 11 | `governance_layer` | Quality + security + scope | Yes |
| 12 | `output_format_layer` | Output structure definition | Yes |

---

## 9. JSON Data Schema

### Organization Object
```json
{
  "organization": {
    "name": "Demo Enterprise",
    "industry": "General Business",
    "size": "SME",
    "system_level": "Basic MVP"
  }
}
```

### Department Object
```json
{
  "id": "dept_hr",
  "name": "HR",
  "display_name": "Human Resources",
  "color": "#D4537E",
  "color_bg": "#FBEAF0",
  "icon": "users",
  "prompt_fragment": "The Human Resources department manages the full employee lifecycle...",
  "business_capabilities": ["Recruitment", "Payroll", "Performance", "Compliance"],
  "default_tools": ["tool_payroll", "tool_recruitment", "tool_performance_review"],
  "cross_dept_dependencies": [
    { "dept": "dept_it", "reason": "Account provisioning for new hires" },
    { "dept": "dept_finance", "reason": "Payroll transfer and budget approval" }
  ],
  "position": { "x": 120, "y": 80 },
  "tags": ["people", "talent", "workforce", "hr"]
}
```

### Tool Object
```json
{
  "id": "tool_iam",
  "name": "IAM",
  "category": "Security",
  "parent_departments": ["dept_it"],
  "prompt_fragment": "Identity and Access Management system that controls user authentication...",
  "feature_requirements": ["RBAC", "SSO", "Audit Log", "MFA Support"],
  "dependencies": [],
  "tags": ["security", "auth", "access"]
}
```

### Prompt Layer Object
```json
{
  "id": "persona_layer",
  "name": "Persona Layer",
  "order": 1,
  "purpose": "Defines AI agent role and expertise domain",
  "prompt_template": "You are a {{role}} with deep expertise in {{domains}}. You have designed and delivered enterprise systems for {{industry}} organizations of {{scale}} scale, and you understand both technical architecture and business operations. You approach every problem with production-readiness, security, and maintainability as non-negotiable standards.",
  "variables": [
    {
      "key": "role",
      "description": "AI agent professional title",
      "default": "Lead Enterprise Software Architect and Senior Fullstack Developer",
      "examples": ["Senior Backend Engineer", "Enterprise System Consultant"]
    },
    {
      "key": "domains",
      "description": "Comma-separated expertise areas derived from selected departments",
      "default": "enterprise systems, UX design, cybersecurity, database architecture, and AI agent workflows"
    },
    {
      "key": "industry",
      "default": "general business"
    },
    {
      "key": "scale",
      "default": "small to mid-sized"
    }
  ],
  "is_required": true,
  "compiler_position": "always_first",
  "tags": ["persona", "role", "system", "context"]
}
```

### Workflow Object
```json
{
  "id": "workflow_onboarding",
  "name": "Employee Onboarding",
  "steps": [
    { "from": "HR", "to": "IT", "action": "Provision account and access rights" },
    { "from": "HR", "to": "Finance", "action": "Set up payroll record" }
  ],
  "prompt_fragment": "When a new employee joins, HR initiates the onboarding sequence...",
  "trigger": "New hire confirmed by HR",
  "tags": ["hr", "it", "people", "onboarding"]
}
```

---

## 10. Prompt for Lovable.dev / v0.dev

Copy and paste this directly:

```
Build a React web application called "Visual Enterprise AI Workspace Simulator".

LAYOUT: 3-column panel
- Left panel (220px): Department Library with clickable DepartmentCards grouped by category (Management Core, Business Departments, Support Departments). Each card shows color dot + dept name + english label + count badge.
- Center canvas (flex): Office Canvas — white/light-gray background with subtle dot grid. Shows dropped DepartmentBlocks with colored ToolChips. Empty state shows centered icon + "Drag a department to start building".
- Right panel (260px): Stack of 3 cards — (1) AI Agent Selector 2x2 grid with Claude/GPT-4o/Gemini/Manus buttons, (2) Prompt Layers list showing 12 layers with colored status dots (green=ready, amber=pending, gray=waiting), (3) Prompt Inspector with monospace textarea. Bottom: full-width Generate button in dark blue.

DESIGN SYSTEM:
- Font: Inter for UI, JetBrains Mono for code/monospace
- Light theme — white cards, #F8F9FA canvas background
- 0.5px borders, border-radius 8–12px
- Department colors: Management=#185FA5, HR=#D4537E, Finance=#1D9E75, Sales=#E24B4A, Marketing=#BA7517, Operations=#639922, IT=#534AB7, R&D=#0F6E56, Purchasing=#993C1D, CustomerService=#5F5E5A
- Each dept has a light bg variant at 10% opacity for chip backgrounds

COMPONENTS:
- DepartmentCard: color dot (8px) + dept name (12px 500) + eng label (10px muted) + badge right. Hover: bg-secondary
- DepartmentBlock: header with colored icon bg + dept name, body with ToolChips, colored border (dept color). Click to select.
- ToolChip: pill 20px height, 9px font, dept color bg 50 + dept color 800 text
- PromptLayerBadge: 6px status dot + layer name + order number right
- AIAgentButton: name + provider label, selected state = blue border + light blue bg
- GenerateButton: dark blue #0C447C, white text, full width 40px height

STATE (Zustand):
- org: { name, industry, size }
- selectedDepts: Department[]
- attachedTools: { [deptId]: Tool[] }
- workflows: Workflow[]
- selectedAgent: string
- promptLayers: { id, status }[]
- generatedPrompt: string
- outputBlueprint: string

INTERACTIONS:
- Click dept in library → push to selectedDepts, show DepartmentBlock on canvas
- Click DeptBlock → select it (highlighted border)
- Click tool in library → attach to selected dept, show ToolChip
- When any state changes → recompile prompt preview in inspector
- Click Generate → animate layers 1→12 from gray to green with 80ms stagger, then show blueprint output

TOP BAR:
- Logo icon (building) + "Visual Enterprise AI Workspace Simulator" + tagline "Build your office visually — AI generates the system"
- Step pills: Organization ✓ / Departments (active) / Tools / Workflows / Generate

Use Tailwind CSS utility classes throughout. Make it clean, professional, enterprise-grade.
```

---

## 11. Prompt for Cursor / Claude Code (Scaffold)

```
Scaffold a React + Vite + TypeScript + Tailwind CSS + Zustand project for "Visual Enterprise AI Workspace Simulator".

FOLDER STRUCTURE:
src/
  components/
    layout/
      TopBar.tsx
      LeftPanel.tsx
      CenterCanvas.tsx
      RightPanel.tsx
    library/
      DepartmentCard.tsx
      ToolChip.tsx
      WorkflowItem.tsx
    canvas/
      OfficeCanvas.tsx
      DepartmentBlock.tsx
      WorkflowConnector.tsx
    prompt/
      PromptLayerBadge.tsx
      PromptInspector.tsx
      AIAgentSelector.tsx
      GenerateButton.tsx
    output/
      BlueprintPanel.tsx
      OutputTab.tsx
  store/
    useWorkspaceStore.ts   (Zustand store)
  data/
    departments.ts         (10 dept definitions with colors, icons, prompt_fragments)
    tools.ts               (20+ tool definitions)
    promptLayers.ts        (12 layer definitions with templates)
    workflows.ts           (10 workflow presets)
  lib/
    promptCompiler.ts      (compile JSON state → master prompt string)
    jsonToPrompt.ts        (map each layer template + fill variables)
  types/
    index.ts               (Department, Tool, Workflow, PromptLayer, AgentConfig types)
  App.tsx
  main.tsx

DEPENDENCIES to install:
- @dnd-kit/core @dnd-kit/sortable (drag and drop)
- zustand (state management)
- lucide-react (icons)
- tailwind-merge clsx (class utilities)

TYPES to define first (types/index.ts):
- Department: { id, name, display_name, color, color_bg, icon, prompt_fragment, business_capabilities, default_tools, cross_dept_dependencies, position, tags }
- Tool: { id, name, category, parent_departments, prompt_fragment, feature_requirements, dependencies, tags }
- PromptLayer: { id, name, order, purpose, prompt_template, variables, is_required, status }
- Workflow: { id, name, steps, prompt_fragment, trigger, tags }
- AgentConfig: { id, name, provider, style_hint }

ZUSTAND STORE (store/useWorkspaceStore.ts):
- state: org, selectedDepts, attachedTools, workflows, selectedAgent, layerStatuses, compiledPrompt, outputBlueprint
- actions: addDept, removeDept, attachTool, detachTool, addWorkflow, setAgent, compilePrompt, setOutput

PROMPT COMPILER (lib/promptCompiler.ts):
- input: current Zustand state
- process: iterate layers 1→12, fill {{variables}} from state, concatenate
- output: final master prompt string
- also export: compiledJSON() → structured JSON snapshot of current config

Start by creating all type definitions and the Zustand store. Then scaffold empty components with prop interfaces. Add data files with all 10 departments and 12 prompt layers populated.
```

---

## 12. Master Prompt for GPT — Generate Full Prompt Registry JSON

**SYSTEM MESSAGE:**
```
You are a Senior Prompt Architect and Enterprise System Designer. Your job is to generate a complete, structured JSON prompt library for a visual no-code platform called "Visual Enterprise AI Workspace Simulator". This platform allows non-technical users to drag and drop departments, tools, and workflows into an office canvas. The system then compiles these visual selections into modular prompt layers and sends them to an AI agent to generate enterprise software systems. You must follow these rules strictly: (1) All output must be valid parseable JSON. (2) Every prompt fragment must be self-contained and composable. (3) Prompts must be in clear professional English for AI agents. (4) Each item must include: id, name, prompt_template or prompt_fragment, variables[], tags[]. (5) No explanations outside JSON. (6) Tone: technical, precise, enterprise-grade.
```

**USER MESSAGE:**
```
Generate a complete prompt component library for the Visual Enterprise AI Workspace Simulator.

Generate ALL categories in one response:

CATEGORY A — departments (10): Management, HR, Finance, Sales, Marketing, Operations, IT, R&D, Purchasing, Customer Service
CATEGORY B — tools (20+): Dashboard, CRM, Payroll, Recruitment, IAM, Backup, Workflow, Reporting, Ticketing, Activity Log, KPI Tracker, Budget Tracker, Performance Review, Campaign Manager, Pipeline Manager, QC Monitor, Project Tracker, Lab Manager, Vendor Manager, Helpdesk
CATEGORY C — prompt_layers (12, ordered 1-12): Persona, Mission, Organization, BusinessContext, Feature, Workflow, UX, Architecture, TechStack, Execution, Governance, OutputFormat
CATEGORY D — workflows (10): Employee Onboarding, Order to Cash, Procurement Approval, Budget Request, IT Incident, Customer Complaint, New Product Launch, Monthly Reporting, Vendor Evaluation, Performance Review Cycle
CATEGORY E — output_types (8): System Architecture, Database Schema, REST API Design, Manus Build Plan, Docker Deployment Plan, Testing Checklist, Security Checklist, UX Page Plan
CATEGORY F — ai_agents (4): Claude, GPT-4o, Gemini, Manus

JSON structure:
{
  "registry_version": "1.0.0",
  "generated_by": "GPT",
  "categories": {
    "departments": [...DepartmentPromptObject],
    "tools": [...ToolPromptObject],
    "prompt_layers": [...LayerPromptObject],
    "workflows": [...WorkflowPromptObject],
    "output_types": [...OutputTypeObject],
    "ai_agents": [...AgentConfigObject]
  }
}

Schemas:
DepartmentPromptObject: { id, name, display_name, color, icon, prompt_fragment, business_capabilities[], default_tools[], cross_dept_dependencies[{dept,reason}], tags[] }
ToolPromptObject: { id, name, category, parent_departments[], prompt_fragment, feature_requirements[], dependencies[], tags[] }
LayerPromptObject: { id, name, order, purpose, prompt_template, variables[{key,description,default,examples[]}], is_required, compiler_position, tags[] }
WorkflowPromptObject: { id, name, steps[{from,to,action}], prompt_fragment, trigger, tags[] }
OutputTypeObject: { id, name, description, prompt_instruction, tags[] }
AgentConfigObject: { id, name, provider, style_hint, max_tokens, tags[] }

Quality rules:
1. prompt_fragment: 2–4 sentences, enterprise-grade, third-person, present tense
2. Variables: {{double_curly_brace}} syntax
3. IDs: snake_case with prefix: dept_, tool_, layer_, workflow_, output_, agent_
4. tags: lowercase, 1–2 words, max 5 per object
5. All prompt_fragments must be composable (concatenated at runtime)
6. No markdown inside JSON string values
7. Tools: minimum 3 feature_requirements
8. Layer order: Persona(1) Mission(2) Organization(3) BusinessContext(4) Feature(5) Workflow(6) UX(7) Architecture(8) TechStack(9) Execution(10) Governance(11) OutputFormat(12)
```

---

## 13. Figma Design Brief

### What to Design in Figma

**Frame sizes to create:**
- Desktop Main (1440 × 900px) — S2 Main Builder Canvas
- Desktop Onboarding (1440 × 900px) — S1 Create Organization
- Desktop Output (1440 × 900px) — S5 Blueprint Output
- Component Sheet (auto height) — all components
- Design System Sheet (auto height) — colors, typography, spacing

**Design System to set up:**
- Color styles: all department colors (10 x 2 = 20 swatches + semantics)
- Text styles: H1/H2/H3/Body/Label/Code as defined in section 2
- Component variants for each component in section 5
- Auto-layout for all components

**Component variants needed:**
- DepartmentCard: idle / hover / added
- DepartmentBlock: idle / selected / has-tools
- ToolChip: default / hover (shows ×)
- PromptLayerBadge: ready / pending / waiting / error
- AIAgentButton: default / selected
- GenerateButton: idle / loading / success / error
- Empty states: canvas-empty / no-tools / generating / no-output

**Prototype flows to connect:**
1. Onboarding → Main Canvas (on "Build My Office" click)
2. Click dept in library → block appears on canvas
3. Click "Generate" → loading state → output panel

---

## 14. Quick Reference Checklist

### Before Starting Design
- [ ] Confirm font licenses (Inter = free, JetBrains Mono = free)
- [ ] Set up design token library in Figma / code
- [ ] Decide: pixel art office illustration for canvas bg? (optional, from reference image)
- [ ] Decide: dark mode support? (recommended to plan early)

### MVP Screen Priority
1. S2 Main Builder (most complex, most important)
2. S1 Onboarding (simple, needed first)
3. S5 Output Panel (high value for demo)
4. S3 Tool Marketplace (can be simplified to sidebar)
5. S4 Workflow Designer (can be deferred to v2)

### Component Build Order (for code)
1. Design tokens + theme (colors, spacing, fonts)
2. Types + Zustand store
3. Static data (departments.ts, tools.ts, layers.ts)
4. DepartmentCard + DepartmentBlock (no drag yet)
5. ToolChip
6. OfficeCanvas (click to add, no drag)
7. PromptLayerBadge + PromptInspector
8. AIAgentSelector + GenerateButton
9. Add @dnd-kit drag and drop
10. PromptCompiler logic
11. Output display
12. Workflow connector (v2)

---

*Document generated from Claude.ai session — Visual Enterprise AI Workspace Simulator Design Sprint*  
*Version 1.0 — Ready for Figma / Lovable / v0 / Cursor / Claude Code*
