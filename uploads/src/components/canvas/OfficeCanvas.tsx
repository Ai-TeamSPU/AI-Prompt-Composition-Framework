import { useDroppable } from "@dnd-kit/core";
import { Plus, Trash2 } from "lucide-react";
import { departmentLibrary, toolLibrary } from "../../data/demoRegistry";
import type { CanvasDepartment } from "../../types/officeBuilder";

interface OfficeCanvasProps {
  departments: CanvasDepartment[];
  selectedDepartmentId: string | null;
  onSelectDepartment: (departmentId: string) => void;
  onRemoveDepartment: (departmentId: string) => void;
}

const officePeople = ["👩‍💼", "👨‍💼", "👩‍💻", "👨‍🔧", "👩‍🔬", "👨‍💻"];

export const OfficeCanvas = ({
  departments,
  selectedDepartmentId,
  onSelectDepartment,
  onRemoveDepartment
}: OfficeCanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: "office-canvas" });

  return (
    <section className="flex min-h-[560px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/90 shadow-xl shadow-slate-200/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">Office Canvas</h2>
          <p className="text-sm font-semibold text-slate-500">วางห้องแผนกให้เป็นออฟฟิศองค์กรของคุณ</p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-extrabold text-slate-700">
          {departments.length} rooms selected
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={`office-grid relative min-h-0 flex-1 overflow-auto p-5 transition ${
          isOver ? "bg-emerald-50/80 ring-4 ring-inset ring-emerald-200" : ""
        }`}
      >
        {!departments.length ? (
          <div className="grid min-h-[500px] place-items-center rounded-xl border-2 border-dashed border-slate-300 bg-white/60 p-8 text-center">
            <div>
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-2xl bg-sky-100 text-5xl shadow-[0_8px_0_rgba(15,23,42,0.08)]">
                🏢
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-950">เริ่มจากเลือกแผนกทางซ้าย</h3>
              <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-relaxed text-slate-600">
                เพื่อสร้างออฟฟิศของคุณ แล้วเพิ่มเครื่องมือทางขวาเพื่อให้ Prompt Preview ฉลาดขึ้น
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white">
                <Plus size={16} />
                Drag or click a department
              </div>
            </div>
          </div>
        ) : (
          <div className="grid auto-rows-[250px] grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {departments.map((canvasDepartment, index) => {
              const definition = departmentLibrary.find((department) => department.id === canvasDepartment.id);
              if (!definition) return null;
              const attachedTools = canvasDepartment.toolIds
                .map((toolId) => toolLibrary.find((tool) => tool.id === toolId))
                .filter(Boolean);

              return (
                <article
                  key={canvasDepartment.id}
                  className={`room-tile group relative flex h-full flex-col overflow-hidden rounded-xl border-2 bg-stone-100 text-left shadow-[0_8px_0_rgba(15,23,42,0.12)] transition hover:-translate-y-1 ${
                    selectedDepartmentId === canvasDepartment.id ? "border-slate-950" : "border-white"
                  }`}
                  onClick={() => onSelectDepartment(canvasDepartment.id)}
                >
                  <div className={`flex min-h-12 items-center justify-between gap-2 px-4 py-3 text-white ${definition.accentClass}`}>
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="text-xl">{definition.icon}</span>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-black">{definition.nameTh}</h3>
                        <p className="truncate text-xs font-bold opacity-90">{definition.nameEn}</p>
                      </div>
                    </div>
                    <button
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white/20 text-white opacity-80 transition hover:bg-white/30 hover:opacity-100"
                      type="button"
                      title={`Remove ${definition.nameEn}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemoveDepartment(canvasDepartment.id);
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="room-wall relative flex-1 p-4">
                    <div className="absolute left-4 top-4 h-16 w-20 rounded border-2 border-slate-300 bg-sky-100">
                      <div className="h-5 border-b-2 border-slate-300 bg-white/70" />
                      <div className="grid grid-cols-3 gap-1 p-2">
                        <span className="h-6 rounded-sm bg-amber-300" />
                        <span className="h-6 rounded-sm bg-emerald-300" />
                        <span className="h-6 rounded-sm bg-rose-300" />
                      </div>
                    </div>
                    <div className="absolute right-4 top-5 rounded-md border-2 border-slate-300 bg-white px-3 py-2 text-xs font-black text-slate-700">
                      KPI
                    </div>
                    <div className="absolute bottom-12 left-1/2 h-12 w-28 -translate-x-1/2 rounded-md border-2 border-amber-900 bg-amber-700 shadow-lg">
                      <div className="mx-auto mt-2 h-5 w-12 rounded-sm bg-slate-800" />
                    </div>
                    <div className="absolute bottom-12 right-10 text-4xl">{officePeople[index % officePeople.length]}</div>
                  </div>

                  <div className="room-floor min-h-[74px] border-t-2 border-stone-300 bg-[repeating-linear-gradient(90deg,#d6b27a_0,#d6b27a_18px,#c99a5f_18px,#c99a5f_20px)] p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {attachedTools.length ? (
                        attachedTools.map((tool) => (
                          <span key={tool!.id} className="rounded-md border border-white/70 bg-white/90 px-2 py-1 text-xs font-extrabold text-slate-800 shadow">
                            {tool!.icon} {tool!.nameEn}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-md bg-white/80 px-2 py-1 text-xs font-bold text-slate-500">ยังไม่มีเครื่องมือ</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
