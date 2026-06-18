import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { compilerApi } from "../api/compilerApi";
import { OfficeCanvas } from "../components/canvas/OfficeCanvas";
import { DepartmentLibrary } from "../components/library/DepartmentLibrary";
import { ToolLibrary } from "../components/library/ToolLibrary";
import { AIBlueprintPanel } from "../components/panels/AIBlueprintPanel";
import { PromptInspector } from "../components/panels/PromptInspector";
import { departmentLibrary, toolLibrary, useOfficeBuilderStore } from "../store/useOfficeBuilderStore";

export const OfficeBuilderPage = () => {
  const [compiledPrompt, setCompiledPrompt] = useState<string | undefined>();
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileError, setCompileError] = useState<string | undefined>();
  const {
    departments,
    selectedDepartmentId,
    canvasJson,
    promptPreview,
    blueprint,
    addDepartment,
    removeDepartment,
    attachTool,
    selectDepartment
  } = useOfficeBuilderStore();

  const selectedDepartment = departmentLibrary.find((department) => department.id === selectedDepartmentId);
  const activeToolIds = useMemo(
    () => departments.find((department) => department.id === selectedDepartmentId)?.toolIds ?? [],
    [departments, selectedDepartmentId]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id !== "office-canvas") return;
    const departmentId = event.active.data.current?.departmentId as string | undefined;
    if (departmentId) addDepartment(departmentId);
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    setCompileError(undefined);
    setCompiledPrompt(undefined);

    try {
      const result = await compilerApi.compileCanvas(canvasJson);
      setCompiledPrompt(result.master_prompt);
    } catch {
      setCompileError("Backend compiler ยังไม่พร้อมสำหรับชุด demo data ทั้งหมด จึงแสดง Prompt Preview แบบ local ให้ใช้งานต่อได้");
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dff7ff_0,#eef6ff_26%,#f8fafc_50%,#ecfdf5_100%)] p-4 text-ink md:p-6">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-5">
          <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-xl shadow-slate-200/80">
            <div className="relative flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <div className="absolute right-6 top-4 hidden text-7xl opacity-10 md:block">🏢</div>
              <div className="relative">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                  <Sparkles size={14} />
                  Student-friendly office simulator
                </div>
                <h1 className="text-3xl font-black text-slate-950 md:text-4xl">AI Office Prompt Builder</h1>
                <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-slate-600 md:text-base">
                  ลากวางแผนกและเครื่องมือ เพื่อสร้าง Prompt สำหรับออกแบบระบบงานองค์กร
                </p>
              </div>
              <button
                className="relative inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-base font-black text-white shadow-[0_6px_0_rgba(15,23,42,0.20)] transition hover:-translate-y-0.5 hover:bg-emerald-600"
                type="button"
                onClick={handleCompile}
              >
                <Sparkles size={18} />
                Generate Prompt
              </button>
            </div>
          </header>

          <div className="grid min-h-[700px] grid-cols-1 gap-5 xl:grid-cols-[330px_minmax(0,1fr)_430px]">
            <DepartmentLibrary
              departments={departmentLibrary}
              selectedDepartmentId={selectedDepartmentId}
              onAddDepartment={addDepartment}
            />

            <OfficeCanvas
              departments={departments}
              selectedDepartmentId={selectedDepartmentId}
              onSelectDepartment={selectDepartment}
              onRemoveDepartment={removeDepartment}
            />

            <aside className="flex min-h-0 flex-col gap-5">
              <ToolLibrary
                tools={toolLibrary}
                selectedDepartmentName={selectedDepartment ? `${selectedDepartment.nameTh} (${selectedDepartment.nameEn})` : undefined}
                activeToolIds={activeToolIds}
                canAttach={Boolean(selectedDepartmentId)}
                onAttachTool={(toolId) => selectedDepartmentId && attachTool(selectedDepartmentId, toolId)}
              />
              <PromptInspector
                prompt={compiledPrompt ?? promptPreview}
                isCompiling={isCompiling}
                error={compileError}
                onCompile={handleCompile}
              />
            </aside>
          </div>

          <AIBlueprintPanel blueprint={blueprint} />
        </div>
      </main>
    </DndContext>
  );
};
