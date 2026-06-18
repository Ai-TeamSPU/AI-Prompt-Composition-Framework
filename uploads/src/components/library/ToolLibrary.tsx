import { Boxes, Link2 } from "lucide-react";
import type { ToolDefinition } from "../../types/officeBuilder";

interface ToolLibraryProps {
  tools: ToolDefinition[];
  selectedDepartmentName?: string;
  activeToolIds: string[];
  canAttach: boolean;
  onAttachTool: (toolId: string) => void;
}

export const ToolLibrary = ({ tools, selectedDepartmentName, activeToolIds, canAttach, onAttachTool }: ToolLibraryProps) => {
  const groupedTools = tools.reduce<Record<string, ToolDefinition[]>>((groups, tool) => {
    groups[tool.category] = [...(groups[tool.category] ?? []), tool];
    return groups;
  }, {});

  return (
    <section className="rounded-xl border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/70">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-emerald-100 text-emerald-700">
            <Boxes size={19} />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-slate-950">เครื่องมือ</h2>
            <p className="text-xs font-semibold text-slate-500">Tool Library</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {selectedDepartmentName ?? "เลือกห้องก่อน"}
        </span>
      </div>
      <div className="max-h-[360px] space-y-4 overflow-y-auto p-4">
        {Object.entries(groupedTools).map(([category, categoryTools]) => (
          <div key={category}>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">{category}</p>
            <div className="grid gap-2">
              {categoryTools.map((tool) => {
                const isActive = activeToolIds.includes(tool.id);
                return (
                  <button
                    key={tool.id}
                    className={`flex min-h-14 items-center justify-between rounded-lg border-2 px-3 py-2 text-left transition disabled:cursor-not-allowed disabled:opacity-45 ${
                      isActive
                        ? "border-emerald-400 bg-emerald-50 text-emerald-950"
                        : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-white"
                    }`}
                    type="button"
                    title={canAttach ? `Attach ${tool.nameEn} to ${selectedDepartmentName}` : `Attach ${tool.nameEn}`}
                    disabled={!canAttach}
                    onClick={() => onAttachTool(tool.id)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{tool.icon}</span>
                      <span>
                        <span className="block text-sm font-extrabold">{tool.nameTh}</span>
                        <span className="block text-xs font-semibold text-slate-500">{tool.nameEn}</span>
                      </span>
                    </span>
                    <Link2 size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
