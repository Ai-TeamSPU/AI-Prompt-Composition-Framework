import type { DepartmentDefinition, ToolDefinition } from "../types/officeBuilder";

export const departmentLibrary: DepartmentDefinition[] = [
  {
    id: "dept_management",
    nameTh: "ฝ่ายบริหาร",
    nameEn: "Management",
    icon: "🎯",
    color: "#8B5A2B",
    accentClass: "bg-amber-800",
    softClass: "bg-amber-50 border-amber-200",
    description: "ดูแลกลยุทธ์ KPI การอนุมัติ และรายงานผู้บริหาร",
    defaultTools: ["tool_dashboard", "tool_reporting"]
  },
  {
    id: "dept_hr",
    nameTh: "ฝ่ายทรัพยากรบุคคล",
    nameEn: "HR",
    icon: "👥",
    color: "#D4537E",
    accentClass: "bg-rose-500",
    softClass: "bg-rose-50 border-rose-200",
    description: "ดูแลพนักงาน การสรรหา เงินเดือน และการประเมินผล",
    defaultTools: ["tool_recruitment", "tool_payroll"]
  },
  {
    id: "dept_finance",
    nameTh: "ฝ่ายการเงินและบัญชี",
    nameEn: "Finance & Accounting",
    icon: "🧮",
    color: "#547D2D",
    accentClass: "bg-lime-700",
    softClass: "bg-lime-50 border-lime-200",
    description: "ดูแลงบประมาณ บัญชี ใบแจ้งหนี้ และรายงานการเงิน",
    defaultTools: ["tool_reporting", "tool_dashboard"]
  },
  {
    id: "dept_marketing",
    nameTh: "ฝ่ายการตลาด",
    nameEn: "Marketing",
    icon: "📣",
    color: "#2C63B3",
    accentClass: "bg-blue-600",
    softClass: "bg-blue-50 border-blue-200",
    description: "วางแผนแคมเปญ คอนเทนต์ ลูกค้าเป้าหมาย และผลลัพธ์การตลาด",
    defaultTools: ["tool_dashboard", "tool_reporting"]
  },
  {
    id: "dept_sales",
    nameTh: "ฝ่ายขาย",
    nameEn: "Sales",
    icon: "🤝",
    color: "#C65A00",
    accentClass: "bg-orange-600",
    softClass: "bg-orange-50 border-orange-200",
    description: "ดูแลลีด ลูกค้า โอกาสการขาย และรายได้",
    defaultTools: ["tool_crm", "tool_reporting"]
  },
  {
    id: "dept_operations",
    nameTh: "ฝ่ายปฏิบัติการ",
    nameEn: "Operations",
    icon: "⚙️",
    color: "#258B8B",
    accentClass: "bg-teal-600",
    softClass: "bg-teal-50 border-teal-200",
    description: "จัดการงานประจำวัน เวิร์กโฟลว์ มาตรฐาน และการส่งมอบ",
    defaultTools: ["tool_workflow", "tool_task_tracking"]
  },
  {
    id: "dept_it",
    nameTh: "ฝ่ายไอที",
    nameEn: "IT",
    icon: "🖥️",
    color: "#6B3F7A",
    accentClass: "bg-purple-700",
    softClass: "bg-purple-50 border-purple-200",
    description: "ดูแลระบบ ผู้ใช้ ความปลอดภัย สำรองข้อมูล และ Monitoring",
    defaultTools: ["tool_iam", "tool_backup", "tool_activity_log", "tool_monitoring"]
  },
  {
    id: "dept_rd",
    nameTh: "ฝ่ายวิจัยและพัฒนา",
    nameEn: "R&D",
    icon: "🔬",
    color: "#7357B8",
    accentClass: "bg-violet-600",
    softClass: "bg-violet-50 border-violet-200",
    description: "ทดลองไอเดีย วิเคราะห์ข้อมูล สร้างต้นแบบ และพัฒนาผลิตภัณฑ์",
    defaultTools: ["tool_dashboard", "tool_workflow"]
  },
  {
    id: "dept_purchasing",
    nameTh: "ฝ่ายจัดซื้อ",
    nameEn: "Purchasing",
    icon: "🛒",
    color: "#C69300",
    accentClass: "bg-yellow-600",
    softClass: "bg-yellow-50 border-yellow-200",
    description: "จัดการผู้ขาย ใบขอซื้อ ใบสั่งซื้อ และสถานะการจัดซื้อ",
    defaultTools: ["tool_workflow", "tool_reporting"]
  },
  {
    id: "dept_customer_service",
    nameTh: "ฝ่ายบริการลูกค้า",
    nameEn: "Customer Service",
    icon: "🎧",
    color: "#347AC0",
    accentClass: "bg-sky-600",
    softClass: "bg-sky-50 border-sky-200",
    description: "รับเรื่องลูกค้า ติดตามทิกเก็ต ความพึงพอใจ และ SLA",
    defaultTools: ["tool_ticketing", "tool_dashboard"]
  }
];

export const toolLibrary: ToolDefinition[] = [
  {
    id: "tool_dashboard",
    nameTh: "แดชบอร์ด",
    nameEn: "Dashboard",
    icon: "📊",
    category: "Analytics",
    promptFragment: "ออกแบบ Dashboard สำหรับ KPI, trend charts, status cards และ executive summary"
  },
  {
    id: "tool_crm",
    nameTh: "ซีอาร์เอ็ม",
    nameEn: "CRM",
    icon: "🧲",
    category: "Sales",
    promptFragment: "ออกแบบ CRM สำหรับจัดการ lead, customer, pipeline และ sales activity"
  },
  {
    id: "tool_payroll",
    nameTh: "เงินเดือน",
    nameEn: "Payroll",
    icon: "💸",
    category: "HR",
    promptFragment: "ออกแบบระบบ Payroll สำหรับจัดการเงินเดือน ค่าตอบแทน และรายงานฝ่ายบุคคล"
  },
  {
    id: "tool_recruitment",
    nameTh: "สรรหา",
    nameEn: "Recruitment",
    icon: "📝",
    category: "HR",
    promptFragment: "ออกแบบระบบ Recruitment สำหรับตำแหน่งงาน ผู้สมัคร การสัมภาษณ์ และ onboarding"
  },
  {
    id: "tool_iam",
    nameTh: "สิทธิ์ผู้ใช้",
    nameEn: "IAM",
    icon: "🔐",
    category: "Security",
    promptFragment: "ออกแบบ IAM พร้อม login, JWT authentication, RBAC และ permission matrix"
  },
  {
    id: "tool_backup",
    nameTh: "สำรองข้อมูล",
    nameEn: "Backup",
    icon: "☁️",
    category: "Infrastructure",
    promptFragment: "ออกแบบ Backup jobs, restore points, status monitoring และ failure alerts"
  },
  {
    id: "tool_activity_log",
    nameTh: "บันทึกกิจกรรม",
    nameEn: "Activity Log",
    icon: "📜",
    category: "Security",
    promptFragment: "ออกแบบ Activity Log และ Audit Trail สำหรับตรวจสอบการใช้งานระบบ"
  },
  {
    id: "tool_workflow",
    nameTh: "เวิร์กโฟลว์",
    nameEn: "Workflow",
    icon: "🔁",
    category: "Operations",
    promptFragment: "ออกแบบ Workflow สำหรับ task assignment, approval steps และ status tracking"
  },
  {
    id: "tool_reporting",
    nameTh: "รายงาน",
    nameEn: "Reporting",
    icon: "📈",
    category: "Analytics",
    promptFragment: "ออกแบบ Reporting module สำหรับ export, scheduled reports และ comparison views"
  },
  {
    id: "tool_ticketing",
    nameTh: "ทิกเก็ต",
    nameEn: "Ticketing",
    icon: "🎫",
    category: "Service",
    promptFragment: "ออกแบบ Ticketing สำหรับรับเรื่อง ติดตาม SLA และวัดความพึงพอใจลูกค้า"
  },
  {
    id: "tool_task_tracking",
    nameTh: "ติดตามงาน",
    nameEn: "Task Tracking",
    icon: "✅",
    category: "Operations",
    promptFragment: "ออกแบบ Task Tracking สำหรับ owner, due date, priority และ progress visibility"
  },
  {
    id: "tool_monitoring",
    nameTh: "มอนิเตอร์ระบบ",
    nameEn: "Monitoring",
    icon: "📡",
    category: "Infrastructure",
    promptFragment: "ออกแบบ Monitoring สำหรับ uptime, alerts, infrastructure health และ incident visibility"
  }
];
