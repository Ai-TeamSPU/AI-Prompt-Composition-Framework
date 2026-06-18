import { Clipboard, Loader2, Wand2 } from "lucide-react";

interface PromptInspectorProps {
  prompt: string;
  isCompiling: boolean;
  error?: string;
  onCompile: () => void;
}

export const PromptInspector = ({ prompt, isCompiling, error, onCompile }: PromptInspectorProps) => (
  <section className="flex min-h-[360px] flex-col rounded-xl border border-slate-200 bg-slate-950 shadow-xl shadow-slate-300/60">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-4 py-4">
      <div>
        <h2 className="text-base font-black text-white">Prompt Preview</h2>
        <p className="text-xs font-semibold text-emerald-200">Markdown-ready prompt สำหรับส่งต่อให้ AI</p>
      </div>
      <div className="flex gap-2">
        <button
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-600 bg-slate-800 px-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:opacity-50"
          type="button"
          title="Copy Prompt"
          disabled={!prompt}
          onClick={() => void navigator.clipboard?.writeText(prompt)}
        >
          <Clipboard size={16} />
          Copy Prompt
        </button>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-400 px-3 text-sm font-black text-emerald-950 transition hover:bg-emerald-300 disabled:opacity-50"
          type="button"
          title="Generate Prompt"
          disabled={isCompiling}
          onClick={onCompile}
        >
          {isCompiling ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
          สร้าง Prompt สำหรับระบบนี้
        </button>
      </div>
    </div>
    {error ? <div className="border-b border-amber-500/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-100">{error}</div> : null}
    <pre
      data-testid="compiled-prompt"
      className="min-h-0 flex-1 overflow-auto whitespace-pre-wrap p-4 text-xs leading-relaxed text-emerald-100"
    >
      {prompt}
    </pre>
  </section>
);
