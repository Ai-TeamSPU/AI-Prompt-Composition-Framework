import { useDraggable } from "@dnd-kit/core";
import { Building2, GripVertical, Plus } from "lucide-react";
import type { DepartmentDefinition } from "../../types/officeBuilder";

interface DepartmentLibraryProps {
  departments: DepartmentDefinition[];
  selectedDepartmentId: string | null;
  onAddDepartment: (departmentId: string) => void;
}

const DraggableDepartment = ({
  department,
  isSelected,
  onAddDepartment
}: {
  department: DepartmentDefinition;
  isSelected: boolean;
  onAddDepartment: (departmentId: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${department.id}`,
    data: { departmentId: department.id }
  });

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`group rounded-lg border-2 p-3 shadow-[0_4px_0_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_rgba(15,23,42,0.10)] ${
        isSelected ? "border-slate-900 bg-white" : department.softClass
      } ${isDragging ? "opacity-60" : ""}`}
    >
      <div className="flex items-start gap-3">
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-slate-200 bg-white text-slate-500"
          type="button"
          title={`Drag ${department.nameEn}`}
          {...listeners}
          {...attributes}
        >
          <GripVertical size={18} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-xl shadow-inner">{department.icon}</span>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-extrabold text-slate-950">{department.nameTh}</h3>
              <p className="truncate text-xs font-semibold text-slate-600">{department.nameEn}</p>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">{department.description}</p>
        </div>
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-slate-950 text-white transition group-hover:bg-emerald-600"
          type="button"
          title={`Add ${department.nameEn}`}
          onClick={() => onAddDepartment(department.id)}
        >
          <Plus size={18} />
        </button>
      </div>
    </article>
  );
};

export const DepartmentLibrary = ({ departments, selectedDepartmentId, onAddDepartment }: DepartmentLibraryProps) => (
  <section className="flex min-h-0 flex-col rounded-xl border border-slate-200 bg-white/90 shadow-xl shadow-slate-200/70 backdrop-blur">
    <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-4">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-sky-100 text-sky-700">
        <Building2 size={19} />
      </span>
      <div>
        <h2 className="text-base font-extrabold text-slate-950">คลังแผนก</h2>
        <p className="text-xs font-semibold text-slate-500">Department Library</p>
      </div>
    </div>
    <div className="grid min-h-0 max-h-[600px] gap-3 overflow-y-auto p-4">
      {departments.map((department) => (
        <DraggableDepartment
          key={department.id}
          department={department}
          isSelected={selectedDepartmentId === department.id}
          onAddDepartment={onAddDepartment}
        />
      ))}
    </div>
  </section>
);
