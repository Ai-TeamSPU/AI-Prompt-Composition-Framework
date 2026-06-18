import { Boxes, Lightbulb, Network, Route } from "lucide-react";
import type { LocalBlueprint } from "../../types/officeBuilder";

interface AIBlueprintPanelProps {
  blueprint: LocalBlueprint;
}

export const AIBlueprintPanel = ({ blueprint }: AIBlueprintPanelProps) => (
  <section className="rounded-xl border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/70">
    <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-4">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-violet-100 text-violet-700">
        <Network size={19} />
      </span>
      <div>
        <h2 className="text-base font-extrabold text-slate-950">AI Blueprint</h2>
        <p className="text-xs font-semibold text-slate-500">สรุปภาพรวมระบบจากออฟฟิศที่เลือก</p>
      </div>
    </div>
    <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase text-slate-500">
          <Route size={14} />
          <span>Departments</span>
        </div>
        <p data-testid="blueprint-departments" className="text-sm font-bold leading-relaxed text-slate-900">
          {blueprint.departments.length ? blueprint.departments.join(", ") : "ยังไม่ได้เลือก"}
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase text-slate-500">
          <Boxes size={14} />
          <span>Tools</span>
        </div>
        <p data-testid="blueprint-tools" className="text-sm font-bold leading-relaxed text-slate-900">
          {blueprint.tools.length ? blueprint.tools.join(", ") : "ยังไม่ได้เลือก"}
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase text-slate-500">
          <Lightbulb size={14} />
          <span>System Type</span>
        </div>
        <p className="text-sm font-bold leading-relaxed text-slate-900">{blueprint.suggestedSystemType}</p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="mb-2 text-xs font-black uppercase text-slate-500">Generated Features</div>
        <p className="text-sm font-bold leading-relaxed text-slate-900">{blueprint.generatedFeatures.slice(0, 2).join(" • ")}</p>
      </div>
    </div>
  </section>
);
