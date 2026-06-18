import { create } from "zustand";
import { departmentLibrary, toolLibrary } from "../data/demoRegistry";
import type { CanvasDepartment, LocalBlueprint, OfficeCanvasJson } from "../types/officeBuilder";

interface OfficeBuilderState {
  departments: CanvasDepartment[];
  selectedDepartmentId: string | null;
  canvasJson: OfficeCanvasJson;
  promptPreview: string;
  blueprint: LocalBlueprint;
  addDepartment: (departmentId: string) => void;
  removeDepartment: (departmentId: string) => void;
  attachTool: (departmentId: string, toolId: string) => void;
  detachTool: (departmentId: string, toolId: string) => void;
  selectDepartment: (departmentId: string | null) => void;
  reset: () => void;
}

const organization = {
  name: "Demo Enterprise",
  industry: "General Business",
  scale: "SME",
  system_level: "production_mvp"
};

const selectedToolsFrom = (departments: CanvasDepartment[]) => [
  ...new Set(departments.flatMap((department) => department.toolIds))
];

const getDepartments = (departments: CanvasDepartment[]) =>
  departments
    .map((department) => departmentLibrary.find((item) => item.id === department.id))
    .filter(Boolean);

const getTools = (toolIds: string[]) => toolIds.map((toolId) => toolLibrary.find((tool) => tool.id === toolId)).filter(Boolean);

const toCanvasJson = (departments: CanvasDepartment[]): OfficeCanvasJson => {
  const selectedTools = selectedToolsFrom(departments);

  return {
    organization,
    selected_departments: departments.map((department) => department.id),
    selected_tools: selectedTools,
    workflows:
      departments.some((department) => department.id === "dept_hr") &&
      departments.some((department) => department.id === "dept_it")
        ? [
            {
              id: "workflow_employee_onboarding",
              name: "Employee Onboarding",
              from_department: "dept_hr",
              to_department: "dept_it",
              trigger: "new_employee_created",
              expected_result: "IT provisions user account and access permissions."
            }
          ]
        : [],
    positions: Object.fromEntries(departments.map((department, index) => [department.id, { x: index % 3, y: Math.floor(index / 3) }]))
  };
};

const buildPrompt = (departments: CanvasDepartment[]) => {
  const selectedDepartments = getDepartments(departments);
  const selectedTools = getTools(selectedToolsFrom(departments));

  if (!selectedDepartments.length) {
    return [
      "เลือกแผนกทางซ้ายเพื่อเริ่มสร้าง Prompt สำหรับระบบองค์กร",
      "",
      "เมื่อเลือกแผนกและเครื่องมือแล้ว ระบบจะแสดง Prompt Preview ที่พร้อมนำไปใช้กับ AI coding agent"
    ].join("\n");
  }

  const departmentText = selectedDepartments.map((department) => `${department!.nameTh} (${department!.nameEn})`).join(", ");
  const toolText = selectedTools.length
    ? selectedTools.map((tool) => `${tool!.nameTh} (${tool!.nameEn})`).join(", ")
    : "ยังไม่ได้เลือกเครื่องมือเฉพาะ";
  const featureText = selectedTools.length
    ? selectedTools.map((tool, index) => `${index + 1}. ${tool!.promptFragment}`).join("\n")
    : "1. ออกแบบ module พื้นฐานสำหรับจัดการข้อมูลและ workflow ของแผนกที่เลือก";

  return [
    "คุณเป็น Software Architect และ Fullstack Developer",
    "โปรดออกแบบระบบเว็บแอปสำหรับองค์กร โดยมีฝ่ายงานดังนี้:",
    departmentText,
    "",
    "ระบบต้องรองรับเครื่องมือ:",
    toolText,
    "",
    "โปรดออกแบบ:",
    "1. System Overview",
    "2. User Roles",
    "3. Key Features",
    "4. Page Structure",
    "5. Database Schema",
    "6. REST API",
    "7. Frontend Components",
    "8. Backend Structure",
    "9. Deployment Plan",
    "",
    "Generated Features:",
    featureText,
    "",
    "ตอบเป็นภาษาไทยเป็นหลัก และคงศัพท์เทคนิคภาษาอังกฤษ เช่น REST API, Database Schema, RBAC, Dashboard, Workflow"
  ].join("\n");
};

const buildBlueprint = (departments: CanvasDepartment[]): LocalBlueprint => {
  const selectedDepartments = getDepartments(departments);
  const selectedTools = getTools(selectedToolsFrom(departments));

  return {
    departments: selectedDepartments.map((department) => `${department!.nameTh} (${department!.nameEn})`),
    tools: selectedTools.map((tool) => `${tool!.nameTh} (${tool!.nameEn})`),
    suggestedSystemType: selectedDepartments.length > 4 ? "Enterprise Operations Platform" : "Department Workflow Web App",
    generatedFeatures: selectedTools.length
      ? selectedTools.map((tool) => tool!.promptFragment)
      : ["เลือกเครื่องมือเพื่อสร้างรายการ features อัตโนมัติ"]
  };
};

const derive = (departments: CanvasDepartment[]) => ({
  canvasJson: toCanvasJson(departments),
  promptPreview: buildPrompt(departments),
  blueprint: buildBlueprint(departments)
});

export const useOfficeBuilderStore = create<OfficeBuilderState>((set) => ({
  departments: [],
  selectedDepartmentId: null,
  ...derive([]),
  addDepartment: (departmentId) =>
    set((state) => {
      if (state.departments.some((department) => department.id === departmentId)) {
        return { selectedDepartmentId: departmentId };
      }

      const definition = departmentLibrary.find((department) => department.id === departmentId);
      const nextDepartments = [
        ...state.departments,
        {
          id: departmentId,
          toolIds: definition?.defaultTools ?? []
        }
      ];

      return {
        departments: nextDepartments,
        selectedDepartmentId: departmentId,
        ...derive(nextDepartments)
      };
    }),
  removeDepartment: (departmentId) =>
    set((state) => {
      const nextDepartments = state.departments.filter((department) => department.id !== departmentId);
      return {
        departments: nextDepartments,
        selectedDepartmentId: state.selectedDepartmentId === departmentId ? nextDepartments[0]?.id ?? null : state.selectedDepartmentId,
        ...derive(nextDepartments)
      };
    }),
  attachTool: (departmentId, toolId) =>
    set((state) => {
      const nextDepartments = state.departments.map((department) =>
        department.id === departmentId && !department.toolIds.includes(toolId)
          ? { ...department, toolIds: [...department.toolIds, toolId] }
          : department
      );

      return {
        departments: nextDepartments,
        ...derive(nextDepartments)
      };
    }),
  detachTool: (departmentId, toolId) =>
    set((state) => {
      const nextDepartments = state.departments.map((department) =>
        department.id === departmentId ? { ...department, toolIds: department.toolIds.filter((id) => id !== toolId) } : department
      );

      return {
        departments: nextDepartments,
        ...derive(nextDepartments)
      };
    }),
  selectDepartment: (departmentId) => set({ selectedDepartmentId: departmentId }),
  reset: () => set({ departments: [], selectedDepartmentId: null, ...derive([]) })
}));

export { departmentLibrary, toolLibrary };
