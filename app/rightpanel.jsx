/* Right Panel — AI agent, prompt layers, live inspector, generate */
function RightPanel({ ws, actions, compiled, layerStatus, genState, onGenerate }) {
  const { AI_AGENTS } = window.WS;
  const lang = useLang(); const t = useT();
  const [inspTab, setInspTab] = React.useState("prompt"); // prompt | json
  const [copied, setCopied] = React.useState(false);

  const readyCount = compiled.layers.filter((l) => l.active).length;

  const copy = () => {
    const text = inspTab === "prompt" ? compiled.master : buildJSON();
    navigator.clipboard && navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const buildJSON = () => JSON.stringify({
    organization: ws.org,
    departments: compiled.deptObjs.map((d) => ({ id: d.id, name: d.name, tools: (ws.toolsByDept[d.id] || []) })),
    workflows: compiled.workflowObjs.map((w) => ({ id: w.id, name: w.name, steps: w.steps })),
    agent: compiled.agent.id,
    active_layers: compiled.layers.filter((l) => l.active).map((l) => l.id),
  }, null, 2);

  const canGenerate = ws.deptIds.length > 0 && genState !== "loading";

  return (
    <aside className="panel panel-right">
      <div className="panel-scroll" style={{ padding: 0, flex: 1, minHeight: 0 }}>
        {/* agent selector */}
        <div className="section">
          <div className="section-head">
            <span className="section-title">{t("ai_agent")}</span>
            <span style={{ fontSize: 10.5, color: "var(--text-hint)" }}>{compiled.agent.style}</span>
          </div>
          <div className="agent-grid">
            {AI_AGENTS.map((a) => (
              <button key={a.id} className={"agent-btn" + (ws.agentId === a.id ? " sel" : "")} onClick={() => actions.setAgent(a.id)}>
                <span className="agent-name">{a.name}</span>
                <span className="agent-prov">{a.provider}</span>
              </button>
            ))}
          </div>
        </div>

        {/* prompt layers */}
        <div className="section" style={{ paddingBottom: 10 }}>
          <div className="section-head">
            <span className="section-title">{t("prompt_layers")}</span>
            <span className="count-badge">{t("layer_x12", readyCount)}</span>
          </div>
          <div className="layers-list">
            {compiled.layers.map((l) => {
              const st = layerStatus[l.id] || (l.active ? "ready" : "waiting");
              return (
                <div key={l.id} className={"layer-row" + (l.active ? "" : " inactive")} title={l.purpose}>
                  <span className="layer-order">{l.order}</span>
                  <span className={"layer-dot " + st} />
                  <span className="layer-name">{layerName(l.name, lang)}</span>
                  {l.required ? <span className="layer-req">{t("req")}</span> : <span className="layer-req" style={{ opacity: 0.5 }}>{t("opt")}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* inspector */}
        <div className="inspector-wrap">
          <div className="inspector-head">
            <div className="insp-tabs">
              <button className={"insp-tab" + (inspTab === "prompt" ? " active" : "")} onClick={() => setInspTab("prompt")}>{t("t_prompt")}</button>
              <button className={"insp-tab" + (inspTab === "json" ? " active" : "")} onClick={() => setInspTab("json")}>{t("t_json")}</button>
            </div>
            <button className={"insp-copy" + (copied ? " copied" : "")} onClick={copy}>
              <Icon name={copied ? "check" : "copy"} size={13} /> {copied ? t("copied") : t("copy")}
            </button>
          </div>
          <div className="inspector">
            {inspTab === "prompt" ? (
              <pre>
                {compiled.layers.filter((l) => l.active).map((l) => (
                  <React.Fragment key={l.id}>
                    <span className="ly-head">{`### ${l.order}. ${l.name.toUpperCase()} LAYER`}</span>
                    {"\n" + l.text + "\n\n"}
                  </React.Fragment>
                ))}
                {readyCount === 0 && t("prompt_empty")}
              </pre>
            ) : (
              <pre>{buildJSON()}</pre>
            )}
          </div>
          <div className="insp-foot">
            <span>{t("chars_n", compiled.master.length)}</span>
            <span>{t("tokens_n", Math.max(1, Math.round(compiled.master.split(/\s+/).filter(Boolean).length * 1.3)))}</span>
          </div>
        </div>
      </div>

      {/* generate */}
      <div className="generate-wrap">
        <button
          className={"btn-generate" + (genState === "loading" ? " loading" : "") + (genState === "success" ? " success" : "")}
          disabled={!canGenerate}
          onClick={onGenerate}>
          {genState === "loading" ? (<><span className="spinner" /> {t("compiling")}</>)
            : genState === "success" ? (<><Icon name="check" size={16} /> {t("ready")}</>)
            : (<><Icon name="zap" size={16} /> {t("generate")}</>)}
        </button>
        {ws.deptIds.length === 0 && <div style={{ fontSize: 11, color: "var(--text-hint)", textAlign: "center", marginTop: 8 }}>{t("need_dept")}</div>}
      </div>
    </aside>
  );
}

Object.assign(window, { RightPanel });
