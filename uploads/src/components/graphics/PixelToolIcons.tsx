// PixelToolIcons.tsx
// Pixel Art Tool Icons — 20 tools for Visual Enterprise AI Workspace Simulator
// viewBox="0 0 16 16" · shape-rendering="crispEdges" · CSS keyframe animations
// Usage: <PixelToolIcon toolId="tool_dashboard" size={32} animated />

import React, { useState } from 'react'

export type ToolId =
  | 'tool_dashboard' | 'tool_crm'      | 'tool_payroll'    | 'tool_recruitment'
  | 'tool_iam'       | 'tool_backup'    | 'tool_actlog'     | 'tool_workflow'
  | 'tool_reporting' | 'tool_ticketing' | 'tool_kpi'        | 'tool_budget'
  | 'tool_performance'| 'tool_campaign' | 'tool_pipeline'   | 'tool_qc'
  | 'tool_project'   | 'tool_vendor'    | 'tool_helpdesk'   | 'tool_notification'

// CSS keyframes — add to index.css or inject via StyleSheet
export const PIXEL_TOOL_CSS = `
  @keyframes t-pulse   { 0%,100%{transform:scale(1)}        50%{transform:scale(1.08)} }
  @keyframes t-spin    { 0%{transform:rotate(0deg)}          100%{transform:rotate(360deg)} }
  @keyframes t-blink   { 0%,80%,100%{opacity:1}             90%{opacity:.3} }
  @keyframes t-bounce  { 0%,100%{transform:translateY(0)}   40%{transform:translateY(-3px)} 60%{transform:translateY(-1px)} }
  @keyframes t-shake   { 0%,100%{transform:rotate(0deg)}    20%{transform:rotate(-8deg)}    60%{transform:rotate(8deg)} }
  @keyframes t-flash   { 0%,100%{opacity:1}                 50%{opacity:.4} }
  @keyframes t-slide   { 0%,100%{transform:translateX(0)}   50%{transform:translateX(2px)} }
  @keyframes t-grow    { 0%,100%{transform:scaleY(1)}        50%{transform:scaleY(1.15)} }
  @keyframes t-float   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-2px)} }
  @keyframes t-tick    { 0%,90%,100%{transform:scaleX(1)}   95%{transform:scaleX(0)} }
`

export interface ToolMeta {
  id: ToolId
  nameEn: string
  nameTh: string
  category: string
  color: string
  colorBg: string
  animStyle: string
  animOrigin?: string
  promptFragment: string
  featureRequirements: string[]
  description: string
}

export const TOOL_REGISTRY: Record<ToolId, ToolMeta> = {
  tool_dashboard:    { id:'tool_dashboard',    nameEn:'Dashboard',       nameTh:'แผงควบคุม',       category:'Analytics',             color:'#185FA5', colorBg:'#E6F1FB', animStyle:'t-blink 2s ease-in-out infinite',     promptFragment:'A centralized dashboard provides real-time KPI visualization, summary cards, and drill-down analytics.',         featureRequirements:['Real-time refresh','Widget customization','Role-based views'],     description:'แผงควบคุมหลักแสดง KPI และข้อมูลสรุป' },
  tool_crm:          { id:'tool_crm',          nameEn:'CRM',             nameTh:'ระบบลูกค้า',      category:'Sales',                 color:'#E24B4A', colorBg:'#FCEBEB', animStyle:'t-bounce .8s ease-in-out infinite',   promptFragment:'The CRM tracks customer contacts, interaction history, deal stages, and relationship health scores.',            featureRequirements:['Contact management','Deal pipeline','Interaction timeline'],       description:'ระบบจัดการความสัมพันธ์ลูกค้า' },
  tool_payroll:      { id:'tool_payroll',      nameEn:'Payroll',         nameTh:'เงินเดือน',        category:'HR',                    color:'#1D9E75', colorBg:'#E1F5EE', animStyle:'t-bounce .9s ease-in-out infinite',   promptFragment:'The Payroll system handles monthly salary computation, tax deductions, social security, and payslip generation.', featureRequirements:['Salary calculation','Tax & SSO deduction','Payslip generation'],   description:'ระบบจัดการเงินเดือนและค่าตอบแทน' },
  tool_recruitment:  { id:'tool_recruitment',  nameEn:'Recruitment',     nameTh:'สรรหาบุคลากร',    category:'HR',                    color:'#D4537E', colorBg:'#FBEAF0', animStyle:'t-float 1s ease-in-out infinite',     promptFragment:'Recruitment manages job postings, applicant tracking, interview scheduling, and offer management.',              featureRequirements:['Job posting','Applicant tracking','Interview scheduling'],         description:'ระบบสรรหาและคัดเลือกพนักงาน' },
  tool_iam:          { id:'tool_iam',          nameEn:'IAM',             nameTh:'จัดการสิทธิ์',    category:'IT Security',           color:'#534AB7', colorBg:'#EEEDFE', animStyle:'t-shake .6s ease-in-out infinite',    promptFragment:'IAM controls user authentication, RBAC permissions, SSO integration, and access audit logs.',                    featureRequirements:['RBAC','SSO / OAuth2','Audit trail'],                               description:'ระบบจัดการ Identity และสิทธิ์การเข้าถึง' },
  tool_backup:       { id:'tool_backup',       nameEn:'Backup',          nameTh:'สำรองข้อมูล',     category:'IT Infrastructure',     color:'#639922', colorBg:'#EAF3DE', animStyle:'t-spin 2s linear infinite',          promptFragment:'The Backup system schedules automated backups, manages retention policies, and provides restore verification.',  featureRequirements:['Scheduled backup','Retention policy','Restore verification'],      description:'ระบบสำรองและกู้คืนข้อมูลอัตโนมัติ', animOrigin:'8px 3px' },
  tool_actlog:       { id:'tool_actlog',       nameEn:'Activity Log',    nameTh:'บันทึกกิจกรรม',   category:'IT Security',           color:'#5F5E5A', colorBg:'#F1EFE8', animStyle:'t-slide .7s ease-in-out infinite',    promptFragment:'Activity Log records all user actions, system events, and security incidents with timestamp and severity.',      featureRequirements:['Immutable audit trail','Severity tagging','Search & export'],      description:'บันทึก activity logs ทุก action' },
  tool_workflow:     { id:'tool_workflow',     nameEn:'Workflow',        nameTh:'กระบวนการ',        category:'Operations',            color:'#BA7517', colorBg:'#FAEEDA', animStyle:'t-pulse .9s ease-in-out infinite',    promptFragment:'The Workflow engine manages multi-step approval processes, task assignments, and SLA tracking.',                 featureRequirements:['Multi-step approval','SLA tracking','Escalation rules'],           description:'ระบบจัดการ workflow และ approval' },
  tool_reporting:    { id:'tool_reporting',    nameEn:'Reporting',       nameTh:'รายงาน',           category:'Analytics',             color:'#185FA5', colorBg:'#E6F1FB', animStyle:'t-grow .8s ease-in-out infinite',     promptFragment:'Reporting generates scheduled and on-demand reports with chart visualizations and multi-format export.',         featureRequirements:['Scheduled reports','Chart builder','PDF/Excel export'],            description:'ระบบออกรายงานและ data visualization', animOrigin:'8px 12px' },
  tool_ticketing:    { id:'tool_ticketing',    nameEn:'Ticketing',       nameTh:'ระบบ Ticket',      category:'Customer Service',      color:'#993C1D', colorBg:'#FAECE7', animStyle:'t-bounce .7s ease-in-out infinite',   promptFragment:'The Ticketing system manages support requests with priority queues, SLA timers, and resolution tracking.',       featureRequirements:['Priority queues','SLA timer','Resolution tracking'],               description:'ระบบจัดการ support tickets' },
  tool_kpi:          { id:'tool_kpi',          nameEn:'KPI Tracker',     nameTh:'ติดตาม KPI',       category:'Management',            color:'#185FA5', colorBg:'#E6F1FB', animStyle:'t-spin 3s linear infinite',          promptFragment:'KPI Tracker monitors organizational objectives, team targets, and individual metrics with trend alerts.',        featureRequirements:['OKR/KPI hierarchy','Progress tracking','Alert thresholds'],        description:'ระบบติดตาม KPI และ OKR องค์กร', animOrigin:'8px 8px' },
  tool_budget:       { id:'tool_budget',       nameEn:'Budget',          nameTh:'งบประมาณ',         category:'Finance',               color:'#1D9E75', colorBg:'#E1F5EE', animStyle:'t-grow .9s ease-in-out infinite',     promptFragment:'Budget manages annual planning, departmental allocation, expense tracking, and variance analysis.',              featureRequirements:['Budget planning','Expense tracking','Variance reports'],           description:'ระบบจัดการงบประมาณและค่าใช้จ่าย', animOrigin:'8px 11px' },
  tool_performance:  { id:'tool_performance',  nameEn:'Performance',     nameTh:'ประเมินผล',        category:'HR',                    color:'#D4537E', colorBg:'#FBEAF0', animStyle:'t-pulse .8s ease-in-out infinite',    promptFragment:'Performance Review manages 360-degree evaluations, goal setting, competency scoring, and development planning.',  featureRequirements:['360-degree review','Competency scoring','Development plan'],       description:'ระบบประเมินผลการทำงาน' },
  tool_campaign:     { id:'tool_campaign',     nameEn:'Campaign',        nameTh:'แคมเปญ',           category:'Marketing',             color:'#BA7517', colorBg:'#FAEEDA', animStyle:'t-flash .6s ease-in-out infinite',    promptFragment:'Campaign Manager plans and tracks marketing campaigns with budget allocation, ROI measurement, and A/B testing.',  featureRequirements:['Multi-channel tracking','Budget allocation','ROI analytics'],      description:'ระบบวางแผน marketing campaigns' },
  tool_pipeline:     { id:'tool_pipeline',     nameEn:'Pipeline',        nameTh:'ท่อขาย',           category:'Sales',                 color:'#E24B4A', colorBg:'#FCEBEB', animStyle:'t-slide .7s ease-in-out infinite',    promptFragment:'Sales Pipeline visualizes deals by stage, forecasts revenue, and tracks conversion rates with win/loss analysis.', featureRequirements:['Stage visualization','Revenue forecast','Win/loss analysis'],      description:'Sales pipeline และ deal tracking' },
  tool_qc:           { id:'tool_qc',           nameEn:'QC Monitor',      nameTh:'ควบคุมคุณภาพ',    category:'Operations',            color:'#639922', colorBg:'#EAF3DE', animStyle:'t-tick 1.2s ease-in-out infinite',    promptFragment:'QC Monitor tracks quality checkpoints, defect rates, inspection checklists, and corrective action workflows.',    featureRequirements:['Inspection checklists','Defect tracking','Corrective actions'],    description:'ระบบควบคุมและติดตามคุณภาพ', animOrigin:'8px 8px' },
  tool_project:      { id:'tool_project',      nameEn:'Project Tracker', nameTh:'ติดตามโครงการ',   category:'R&D / Operations',      color:'#0F6E56', colorBg:'#E1F5EE', animStyle:'t-pulse .9s ease-in-out infinite',    promptFragment:'Project Tracker manages milestones, task assignments, resource utilization, and Gantt-style progress.',          featureRequirements:['Milestone tracking','Task assignments','Resource utilization'],    description:'ระบบติดตาม project และ milestones' },
  tool_vendor:       { id:'tool_vendor',       nameEn:'Vendor Mgmt',     nameTh:'จัดการคู่ค้า',    category:'Purchasing',            color:'#993C1D', colorBg:'#FAECE7', animStyle:'t-shake .7s ease-in-out infinite',    promptFragment:'Vendor Management handles supplier onboarding, contract management, performance evaluation, and PO workflows.',   featureRequirements:['Supplier onboarding','Contract management','PO workflow'],         description:'ระบบจัดการ vendors และ suppliers' },
  tool_helpdesk:     { id:'tool_helpdesk',     nameEn:'Helpdesk',        nameTh:'ศูนย์ช่วยเหลือ',  category:'Customer Service / IT', color:'#5F5E5A', colorBg:'#F1EFE8', animStyle:'t-bounce .8s ease-in-out infinite',   promptFragment:'Helpdesk provides support through a knowledge base, live chat routing, and ticket escalation system.',           featureRequirements:['Knowledge base','Live chat routing','Escalation rules'],           description:'ศูนย์รับแจ้งปัญหาและ helpdesk' },
  tool_notification: { id:'tool_notification', nameEn:'Notification',    nameTh:'แจ้งเตือน',        category:'General',               color:'#BA7517', colorBg:'#FAEEDA', animStyle:'t-shake .4s ease-in-out infinite',    promptFragment:'Notification delivers real-time alerts via in-app, email, LINE, or webhook with per-user preference controls.',  featureRequirements:['Multi-channel delivery','Per-user preferences','Webhook support'], description:'ระบบแจ้งเตือน real-time หลายช่องทาง' },
}

// SVG pixel-art content per tool (viewBox 0 0 16 16)
export const getToolSVGContent = (id: ToolId, animated: boolean): string => {
  const m = TOOL_REGISTRY[id]
  const a = animated
  const aStyle = a ? `style="animation:${m.animStyle}${m.animOrigin ? `;transform-origin:${m.animOrigin}` : ''}"` : ''

  const map: Partial<Record<ToolId,string>> = {
    tool_dashboard:    `<rect x="1" y="1" width="14" height="14" rx="1" fill="#0C447C"/><rect x="2" y="2" width="6" height="6" rx=".5" fill="#378ADD"/><rect x="9" y="2" width="6" height="3" rx=".5" fill="#185FA5"/><rect x="9" y="6" width="6" height="2" rx=".5" fill="#85B7EB"/><rect x="2" y="9" width="3" height="6" rx=".5" fill="#85B7EB"/><rect x="6" y="11" width="3" height="4" rx=".5" fill="#378ADD"/><rect x="10" y="9" width="3" height="6" rx=".5" fill="#185FA5"/><rect x="3" y="3" width="4" height="4" rx=".5" fill="#B5D4F4" ${aStyle}/>`,
    tool_crm:          `<rect x="2" y="4" width="12" height="10" rx="1" fill="#A32D2D"/><rect x="3" y="5" width="10" height="8" rx=".5" fill="#791F1F"/><circle cx="5" cy="7" r="1.5" fill="#F09595"/><circle cx="9" cy="7" r="1.5" fill="#F09595"/><circle cx="13" cy="7" r="1.5" fill="#F09595"/><rect x="4" y="10" width="3" height="1.5" rx=".5" fill="#E24B4A"/><rect x="8" y="10" width="3" height="1.5" rx=".5" fill="#E24B4A"/><g ${aStyle}><path d="M7 2 Q8 1 9 2" fill="none" stroke="#E24B4A" stroke-width="1"/><circle cx="8" cy="2" r="1" fill="#E24B4A"/></g>`,
    tool_payroll:      `<rect x="2" y="3" width="12" height="10" rx="1" fill="#085041"/><rect x="3" y="5" width="10" height="7" rx=".5" fill="#0F6E56"/><rect x="4" y="6" width="8" height=".8" rx=".3" fill="#5DCAA5"/><rect x="4" y="8" width="5" height=".8" rx=".3" fill="#9FE1CB"/><rect x="4" y="10" width="6" height=".8" rx=".3" fill="#9FE1CB"/><g ${aStyle}><circle cx="8" cy="2" r="1.5" fill="#1D9E75"/><text x="8" y="2.7" text-anchor="middle" fill="white" font-size="2" font-weight="bold">฿</text></g>`,
    tool_recruitment:  `<rect x="3" y="3" width="10" height="12" rx="1" fill="#72243E"/><rect x="4" y="4" width="8" height="10" rx=".5" fill="#993556"/><circle cx="8" cy="7" r="2" fill="#F4C0D1"/><rect x="5" y="10" width="6" height="1" rx=".3" fill="#D4537E"/><rect x="6" y="12" width="4" height="1" rx=".3" fill="#ED93B1"/><g ${aStyle}><rect x="12" y="1" width="4" height="4" rx="1" fill="#D4537E"/><rect x="13" y="2" width="1" height="2" rx=".3" fill="white"/><rect x="12.5" y="2.5" width="2" height="1" rx=".3" fill="white"/></g>`,
    tool_iam:          `<rect x="4" y="6" width="8" height="9" rx="1" fill="#3C3489"/><rect x="5" y="7" width="6" height="7" rx=".5" fill="#534AB7"/><g ${aStyle}><path d="M6 6 Q8 2 10 6" fill="none" stroke="#7F77DD" stroke-width="1.5"/><circle cx="8" cy="6" r="1" fill="#AFA9EC"/></g><rect x="7" y="9" width="2" height="3" rx=".5" fill="#AFA9EC"/><circle cx="8" cy="9" r="1" fill="#CECBF6"/>`,
    tool_backup:       `<rect x="2" y="5" width="12" height="8" rx="1" fill="#27500A"/><rect x="3" y="6" width="10" height="6" rx=".5" fill="#3B6D11"/><rect x="4" y="8" width="8" height="1" rx=".3" fill="#97C459"/><rect x="4" y="10" width="5" height="1" rx=".3" fill="#C0DD97"/><g ${aStyle}><path d="M5 3 A3 3 0 0 1 11 3" fill="none" stroke="#639922" stroke-width="1.5" stroke-linecap="round"/><polygon points="5,1.5 5,4.5 7,3" fill="#639922"/></g>`,
    tool_actlog:       `<rect x="2" y="2" width="12" height="13" rx="1" fill="#444441"/><rect x="3" y="3" width="10" height="11" rx=".5" fill="#5F5E5A"/><g ${aStyle}><rect x="4" y="5" width="8" height="1" rx=".3" fill="#D3D1C7"/><rect x="4" y="7" width="6" height="1" rx=".3" fill="#B4B2A9"/><rect x="4" y="9" width="7" height="1" rx=".3" fill="#D3D1C7"/><rect x="4" y="11" width="5" height="1" rx=".3" fill="#B4B2A9"/></g><rect x="12" y="4" width="1" height="1" rx=".2" fill="#97C459"/><rect x="12" y="6" width="1" height="1" rx=".2" fill="#EF9F27"/><rect x="12" y="8" width="1" height="1" rx=".2" fill="#E24B4A"/>`,
    tool_workflow:     `<circle cx="3" cy="4" r="2" fill="#854F0B"/><circle cx="8" cy="4" r="2" fill="#854F0B"/><circle cx="13" cy="4" r="2" fill="#854F0B"/><circle cx="5" cy="11" r="2" fill="#854F0B"/><circle cx="11" cy="11" r="2" fill="#854F0B"/><line x1="5" y1="4" x2="6" y2="4" stroke="#EF9F27" stroke-width="1"/><line x1="10" y1="4" x2="11" y2="4" stroke="#EF9F27" stroke-width="1"/><line x1="3" y1="6" x2="5" y2="9" stroke="#EF9F27" stroke-width=".8"/><line x1="13" y1="6" x2="11" y2="9" stroke="#EF9F27" stroke-width=".8"/><circle cx="8" cy="4" r="2" fill="#EF9F27" ${aStyle}/>`,
    tool_reporting:    `<rect x="2" y="2" width="12" height="13" rx="1" fill="#0C447C"/><rect x="3" y="3" width="10" height="11" rx=".5" fill="#185FA5"/><rect x="4" y="5" width="8" height=".8" rx=".3" fill="#B5D4F4"/><rect x="4" y="7" width="8" height=".8" rx=".3" fill="#B5D4F4"/><g ${aStyle}><rect x="4" y="9" width="2" height="4" rx=".3" fill="#85B7EB"/><rect x="7" y="10" width="2" height="3" rx=".3" fill="#378ADD"/><rect x="10" y="8" width="2" height="5" rx=".3" fill="#85B7EB"/></g>`,
    tool_ticketing:    `<rect x="1" y="5" width="14" height="7" rx="1" fill="#712B13"/><rect x="2" y="6" width="12" height="5" rx=".5" fill="#993C1D"/><circle cx="2.5" cy="8.5" r="1.5" fill="#712B13"/><circle cx="13.5" cy="8.5" r="1.5" fill="#712B13"/><rect x="4" y="7" width="8" height="1" rx=".3" fill="#F5C4B3"/><rect x="4" y="9" width="5" height="1" rx=".3" fill="#F0997B"/><g ${aStyle}><rect x="6" y="2" width="4" height="3" rx=".5" fill="#D85A30"/><rect x="7" y="3" width="2" height="1" rx=".2" fill="white"/></g>`,
    tool_kpi:          `<circle cx="8" cy="8" r="6.5" fill="#0C447C"/><circle cx="8" cy="8" r="5" fill="#185FA5"/><path d="M8 8 L8 4" fill="none" stroke="#B5D4F4" stroke-width="1.2" stroke-linecap="round" ${aStyle}/><path d="M8 8 L11 9" fill="none" stroke="#E6F1FB" stroke-width=".8" stroke-linecap="round"/><circle cx="8" cy="8" r="1" fill="#E6F1FB"/><rect x="6.5" y="12" width="3" height="1" rx=".4" fill="#B5D4F4"/>`,
    tool_budget:       `<rect x="2" y="3" width="12" height="11" rx="1" fill="#085041"/><rect x="3" y="4" width="10" height="9" rx=".5" fill="#0F6E56"/><rect x="4" y="6" width="8" height=".8" rx=".3" fill="#5DCAA5"/><g ${aStyle}><rect x="4" y="8" width="2.5" height="3" rx=".3" fill="#5DCAA5"/><rect x="7" y="9" width="2.5" height="2" rx=".3" fill="#1D9E75"/><rect x="10" y="7" width="2.5" height="4" rx=".3" fill="#9FE1CB"/></g>`,
    tool_performance:  `<polygon points="8,1 9.5,6 15,6 10.5,9 12,14 8,11 4,14 5.5,9 1,6 6.5,6" fill="#72243E"/><polygon points="8,2 9.2,6.2 14,6.2 10.1,8.8 11.3,13 8,10.5 4.7,13 5.9,8.8 2,6.2 6.8,6.2" fill="#D4537E" ${aStyle}/><circle cx="8" cy="7.5" r="2" fill="#F4C0D1"/>`,
    tool_campaign:     `<rect x="1" y="5" width="10" height="7" rx="1" fill="#633806"/><rect x="2" y="6" width="8" height="5" rx=".5" fill="#854F0B"/><rect x="3" y="7.5" width="6" height="1" rx=".3" fill="#FAC775"/><rect x="3" y="9.5" width="4" height="1" rx=".3" fill="#EF9F27"/><g ${aStyle}><path d="M12 2 L14 5 L12 5 L14 8 L11 5 L13 5 Z" fill="#EF9F27"/></g><circle cx="14" cy="3" r="1.5" fill="#BA7517"/><circle cx="14" cy="3" r=".5" fill="#FAC775"/>`,
    tool_pipeline:     `<rect x="1" y="4" width="3" height="9" rx=".5" fill="#A32D2D"/><rect x="5" y="6" width="3" height="7" rx=".5" fill="#E24B4A"/><rect x="9" y="8" width="3" height="5" rx=".5" fill="#A32D2D"/><rect x="13" y="10" width="2" height="3" rx=".5" fill="#E24B4A"/><g ${aStyle}><circle cx="2.5" cy="3" r="1.5" fill="#F09595"/><circle cx="6.5" cy="5" r="1.5" fill="#E24B4A"/><circle cx="10.5" cy="7" r="1.5" fill="#F09595"/><circle cx="14" cy="9" r="1.5" fill="#E24B4A"/></g>`,
    tool_qc:           `<circle cx="8" cy="8" r="6.5" fill="#27500A"/><circle cx="8" cy="8" r="5.5" fill="#3B6D11"/><path d="M5 8 L7 10 L11 6" fill="none" stroke="#97C459" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${aStyle}/><circle cx="8" cy="8" r="5.5" fill="none" stroke="#C0DD97" stroke-width=".5"/>`,
    tool_project:      `<rect x="1" y="3" width="14" height="11" rx="1" fill="#04342C"/><rect x="2" y="4" width="12" height="9" rx=".5" fill="#085041"/><rect x="3" y="6" width="10" height="1" rx=".3" fill="#5DCAA5"/><rect x="3" y="8" width="7" height="1" rx=".3" fill="#9FE1CB"/><rect x="3" y="10" width="9" height="1" rx=".3" fill="#5DCAA5"/><g ${aStyle}><rect x="11" y="7.5" width="2" height="2" rx=".3" fill="#1D9E75"/><path d="M11.3 8.2 L11.8 9 L12.8 7.7" fill="none" stroke="white" stroke-width=".5" stroke-linecap="round"/></g>`,
    tool_vendor:       `<rect x="2" y="5" width="5" height="9" rx=".5" fill="#712B13"/><rect x="9" y="5" width="5" height="9" rx=".5" fill="#712B13"/><g ${aStyle}><path d="M7 8.5 Q8 7.5 9 8.5" fill="none" stroke="#F0997B" stroke-width="1.2" stroke-linecap="round"/><circle cx="7" cy="8.5" r="1" fill="#993C1D"/><circle cx="9" cy="8.5" r="1" fill="#993C1D"/></g><rect x="3" y="6" width="3" height="1" rx=".3" fill="#F5C4B3"/><rect x="10" y="6" width="3" height="1" rx=".3" fill="#F5C4B3"/><rect x="3" y="8" width="3" height="1" rx=".3" fill="#F0997B"/><rect x="10" y="8" width="3" height="1" rx=".3" fill="#F0997B"/>`,
    tool_helpdesk:     `<circle cx="8" cy="7" r="5.5" fill="#444441"/><circle cx="8" cy="7" r="4.5" fill="#5F5E5A"/><text x="8" y="9.2" text-anchor="middle" fill="#D3D1C7" font-size="6" font-weight="bold">?</text><g ${aStyle}><rect x="6" y="13" width="4" height="2.5" rx=".5" fill="#888780"/><rect x="5" y="15" width="6" height="1" rx=".3" fill="#5F5E5A"/></g>`,
    tool_notification: `<path d="M8 2.5 Q11.5 3.5 11.5 8 L12.5 11.5 L3.5 11.5 L4.5 8 Q4.5 3.5 8 2.5 Z" fill="#633806"/><path d="M8 2.5 Q11.5 3.5 11.5 8 L12.5 11.5 L3.5 11.5 L4.5 8 Q4.5 3.5 8 2.5 Z" fill="#BA7517" ${aStyle}/><path d="M6 11.5 Q6 14 8 14 Q10 14 10 11.5" fill="#EF9F27"/><circle cx="12.5" cy="3" r="2" fill="#E24B4A"/><circle cx="12.5" cy="3" r="1" fill="#F09595"/>`,
  }
  return map[id] ?? ''
}

// PixelToolIcon component
interface PixelToolIconProps {
  toolId: ToolId
  size?: number
  animated?: boolean
  showLabel?: boolean
  onClick?: () => void
  selected?: boolean
  className?: string
}

export const PixelToolIcon: React.FC<PixelToolIconProps> = ({
  toolId, size = 32, animated = true, showLabel = false,
  onClick, selected = false, className = '',
}) => {
  const [hovered, setHovered] = useState(false)
  const meta = TOOL_REGISTRY[toolId]
  if (!meta) return null
  const isActive = animated && (hovered || selected)

  return (
    <div
      className={`pixel-tool-icon ${className}`}
      style={{
        display:'inline-flex', flexDirection:'column', alignItems:'center', gap:4,
        cursor:'pointer', padding: showLabel ? '8px 6px' : '4px',
        background: selected ? meta.colorBg : 'transparent',
        border: selected ? `2px solid ${meta.color}` : '0.5px solid transparent',
        borderRadius:8, transition:'all .15s',
      }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      onClick={onClick}
      role="button"
      aria-label={`${meta.nameEn} — ${meta.nameTh}`}
      tabIndex={0}
    >
      <svg
        width={size} height={size} viewBox="0 0 16 16"
        shapeRendering="crispEdges"
        style={{ display:'block', overflow:'visible' }}
        dangerouslySetInnerHTML={{ __html: getToolSVGContent(toolId, isActive) }}
      />
      {showLabel && <>
        <span style={{ fontSize:10, fontWeight:500, color:meta.color, whiteSpace:'nowrap' }}>{meta.nameEn}</span>
        <span style={{ fontSize:9, color:'#888', whiteSpace:'nowrap' }}>{meta.nameTh}</span>
      </>}
    </div>
  )
}

// ToolMarketplace — grouped view
export const ToolMarketplace: React.FC<{
  selectedTools?: ToolId[]
  onSelect?: (id: ToolId) => void
}> = ({ selectedTools = [], onSelect }) => {
  const cats = Object.values(TOOL_REGISTRY).reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = []
    acc[t.category].push(t)
    return acc
  }, {} as Record<string, ToolMeta[]>)

  return (
    <div style={{ fontFamily:'sans-serif' }}>
      <style>{PIXEL_TOOL_CSS}</style>
      {Object.entries(cats).map(([cat, tools]) => (
        <div key={cat} style={{ marginBottom:16 }}>
          <div style={{ fontSize:10, fontWeight:500, color:'#888', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:8 }}>{cat}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {tools.map(t => (
              <PixelToolIcon key={t.id} toolId={t.id} size={32} animated showLabel
                selected={selectedTools.includes(t.id)}
                onClick={() => onSelect?.(t.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PixelToolIcon
