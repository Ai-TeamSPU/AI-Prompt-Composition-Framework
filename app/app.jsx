/* Main App — state, top bar, generate flow, mounting */
const { useState, useRef, useCallback, useMemo, useEffect } = React;

// Configure localforage for IndexedDB prompt history storage
if (window.localforage) {
  window.localforage.config({
    name: 'AI_Prompt_Composer',
    storeName: 'prompt_history_store',
    description: 'ประวัติการสร้าง Blueprint และโครงสร้าง Workspace ขององค์กร'
  });
}

function App() {
  const WS = window.WS;
  const [screen, setScreen] = useState("onboard"); // onboard | builder
  const [leftTab, setLeftTab] = useState("dept");
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [genState, setGenState] = useState("idle"); // idle | loading | success
  const [genStatus, setGenStatus] = useState("");
  const [layerStatus, setLayerStatus] = useState({});
  const [blueprint, setBlueprint] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const [toast, setToast] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyList, setHistoryList] = useState([]);

  const [ws, setWs] = useState({
    org: { name: "Demo Enterprise", industry: "General Business", size: "M" },
    deptIds: [],
    toolsByDept: {},
    workflowIds: [],
    positions: {},
    agentId: "agent_claude",
    agentName: "Claude",
  });

  const nameToId = useMemo(() => {
    const m = {}; WS.DEPARTMENTS.forEach((d) => (m[d.name] = d.id)); return m;
  }, []);

  const toastIt = (msg) => { setToast(msg); setTimeout(() => setToast(null), 1600); };

  /* ----- position helper ----- */
  const nextPos = (existing) => {
    const n = Object.keys(existing).length;
    const col = n % 3, row = Math.floor(n / 3);
    return { x: 24 + col * 224, y: 24 + row * 168 };
  };

  /* --------------------------------- actions -------------------------------- */
  const actions = useMemo(() => ({
    selectDept: (id) => setSelectedDeptId(id),
    requestToolTab: () => setLeftTab("tool"),
    addDept: (id) => setWs((p) => {
      if (p.deptIds.includes(id)) return p;
      const positions = { ...p.positions, [id]: nextPos(p.positions) };
      setSelectedDeptId(id);
      return { ...p, deptIds: [...p.deptIds, id], positions };
    }),
    removeDept: (id) => setWs((p) => {
      const toolsByDept = { ...p.toolsByDept }; delete toolsByDept[id];
      const positions = { ...p.positions }; delete positions[id];
      return { ...p, deptIds: p.deptIds.filter((x) => x !== id), toolsByDept, positions };
    }),
    toggleTool: (deptId, toolId) => setWs((p) => {
      const cur = p.toolsByDept[deptId] || [];
      const next = cur.includes(toolId) ? cur.filter((t) => t !== toolId) : [...cur, toolId];
      return { ...p, toolsByDept: { ...p.toolsByDept, [deptId]: next } };
    }),
    moveDept: (id, x, y) => setWs((p) => ({ ...p, positions: { ...p.positions, [id]: { x, y } } })),
    autoArrange: () => setWs((p) => {
      const positions = {};
      p.deptIds.forEach((id, i) => {
        const col = i % 3, row = Math.floor(i / 3);
        positions[id] = { x: 24 + col * 224, y: 24 + row * 168 };
      });
      return { ...p, positions };
    }),
    toggleWorkflow: (id) => setWs((p) => {
      const wf = WS.WORKFLOWS.find((w) => w.id === id);
      if (p.workflowIds.includes(id)) return { ...p, workflowIds: p.workflowIds.filter((x) => x !== id) };
      let deptIds = [...p.deptIds]; const positions = { ...p.positions };
      wf.depts.forEach((dn) => {
        const did = nameToId[dn];
        if (did && !deptIds.includes(did)) { positions[did] = nextPos(positions); deptIds.push(did); }
      });
      return { ...p, workflowIds: [...p.workflowIds, id], deptIds, positions };
    }),
    setAgent: (id) => setWs((p) => ({ ...p, agentId: id, agentName: WS.AI_AGENTS.find((a) => a.id === id).name })),
  }), [nameToId]);

  /* --------------------------------- compile -------------------------------- */
  const compiled = useMemo(() => WS.compileWorkspace(ws), [ws]);

  /* --------------------------------- generate ------------------------------- */
  const runGenerate = useCallback(async () => {
    setGenState("loading");
    setShowOutput(false);
    const active = compiled.layers.filter((l) => l.active);
    const ls = {}; compiled.layers.forEach((l) => (ls[l.id] = "waiting"));
    setLayerStatus({ ...ls });
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (let i = 0; i < active.length; i++) {
      const l = active[i];
      setGenStatus(`Layer ${l.order}/12 · ${l.name}`);
      setLayerStatus((prev) => ({ ...prev, [l.id]: "pending" }));
      await sleep(90);
      setLayerStatus((prev) => ({ ...prev, [l.id]: "ready" }));
      await sleep(60);
    }
    setGenStatus("Assembling blueprint…");
    await sleep(400);
    const bp = WS.buildBlueprint({ ...compiled.ctx, depts: compiled.deptObjs, tools: compiled.toolObjs, workflows: compiled.workflowObjs });
    setBlueprint(bp);
    setGenState("success");
    setShowOutput(true);

    // Save to IndexedDB history
    if (window.localforage) {
      try {
        const list = await window.localforage.getItem('promptHistory') || [];
        const newRecord = {
          id: Date.now().toString(),
          title: `Workspace (${ws.org.name})`,
          description: `${ws.org.industry} · Size: ${ws.org.size} · ${new Date().toLocaleString('th-TH')}`,
          date: new Date().toISOString(),
          ws: JSON.parse(JSON.stringify(ws)), // deep clone to preserve current config
          blueprint: bp
        };
        const updatedList = [newRecord, ...list].slice(0, 100);
        await window.localforage.setItem('promptHistory', updatedList);
        setHistoryList(updatedList);
      } catch (err) {
        console.error("Failed to auto-save history:", err);
      }
    }

    await sleep(2000);
    setGenState("idle");
  }, [compiled, ws]);

  /* ----------------------------------- steps -------------------------------- */
  const steps = useMemo(() => {
    const hasTools = Object.values(ws.toolsByDept).some((a) => a && a.length);
    return [
      { key: "org", label: "Organization", state: "done" },
      { key: "dept", label: "Departments", state: ws.deptIds.length ? "done" : "active" },
      { key: "tool", label: "Tools", state: hasTools ? "done" : (ws.deptIds.length ? "active" : "idle") },
      { key: "wf", label: "Workflows", state: ws.workflowIds.length ? "done" : "idle" },
      { key: "gen", label: "Generate", state: blueprint ? "done" : (ws.deptIds.length ? "active" : "idle") },
    ];
  }, [ws, blueprint]);

  /* --------------------------------- history -------------------------------- */
  useEffect(() => {
    async function loadHistory() {
      if (window.localforage) {
        try {
          const list = await window.localforage.getItem('promptHistory') || [];
          setHistoryList(list);
        } catch (err) {
          console.error("Failed to load history from IndexedDB:", err);
        }
      }
    }
    loadHistory();
  }, []);

  /* ----------------------------------- theme -------------------------------- */
  const [theme, setTheme] = useState("light");
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  /* --------------------------------- language ------------------------------- */
  const [lang, setLang] = useState("en");
  const t = (k, ...a) => { const v = (window.I18N[lang] && window.I18N[lang][k]) ?? window.I18N.en[k] ?? k; return typeof v === "function" ? v(...a) : v; };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  if (screen === "onboard") {
    return <LangCtx.Provider value={lang}><Onboarding lang={lang} onComplete={({ org, deptIds }) => {
      const positions = {};
      deptIds.forEach((id, i) => { const col = i % 3, row = Math.floor(i / 3); positions[id] = { x: 24 + col * 224, y: 24 + row * 168 }; });
      const toolsByDept = {};
      deptIds.forEach((id) => { const d = WS.DEPARTMENTS.find((x) => x.id === id); if (d) toolsByDept[id] = [...d.default_tools]; });
      setWs((p) => ({ ...p, org, deptIds, positions, toolsByDept }));
      setSelectedDeptId(deptIds[0] || null);
      setScreen("builder");
    }} /></LangCtx.Provider>;
  }

  return (
    <LangCtx.Provider value={lang}>
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark"><Icon name="building" size={17} /></div>
          <div>
            <div className="brand-name">AI Workspace Prompt Composer</div>
            <div className="brand-tag">{ws.org.name} · {industryLabel(ws.org.industry, lang)}</div>
          </div>
        </div>

        <div className="steps">
          {steps.map((s, i) => (
            <React.Fragment key={s.key}>
              {i > 0 && <span className="step-sep" />}
              <div className={"step" + (s.state === "active" ? " active" : s.state === "done" ? " done" : "")}>
                <span className="step-num">{s.state === "done" ? <Icon name="check" size={11} /> : i + 1}</span>
                {t("step_" + s.key)}
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="tb-actions">
          <div className="lang-toggle" role="group" aria-label={t("language")}>
            <button className={"lang-seg" + (lang === "th" ? " active" : "")} onClick={() => setLang("th")}>TH</button>
            <button className={"lang-seg" + (lang === "en" ? " active" : "")} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="icon-btn" onClick={() => setTheme((t2) => t2 === "light" ? "dark" : "light")} title={t("toggle_theme")}>
            <Icon name={theme === "light" ? "moon" : "sun"} size={17} />
          </button>
          <button className={"icon-btn" + (showHistory ? " active" : "")} onClick={() => setShowHistory(p => !p)} title={t("history_title")}>
            <Icon name="history" size={17} />
          </button>
          <button className="icon-btn" onClick={() => { setScreen("onboard"); }} title={t("settings")}><Icon name="settings" size={17} /></button>
        </div>
      </header>

      <div className="workspace">
        <LeftPanel ws={ws} actions={actions} selectedDeptId={selectedDeptId} tab={leftTab} setTab={setLeftTab} />
        <OfficeCanvas ws={ws} actions={actions} selectedDeptId={selectedDeptId} generating={genState === "loading"} genStatus={genStatus} />
        <RightPanel ws={ws} actions={actions} compiled={compiled} layerStatus={genState === "idle" ? {} : layerStatus} genState={genState} onGenerate={runGenerate} />
      </div>

      {showOutput && blueprint && (
        <BlueprintPanel blueprint={blueprint} agentName={ws.agentName} orgName={ws.org.name} depts={compiled.deptObjs}
          onClose={() => setShowOutput(false)}
          onRegenerate={() => { setShowOutput(false); runGenerate(); }} />
      )}

      {showHistory && (
        <HistoryPanel
          historyList={historyList}
          onClose={() => setShowHistory(false)}
          onRestore={async (item) => {
            if (confirm(t("history_restore_confirm"))) {
              setWs(item.ws);
              setSelectedDeptId(item.ws.deptIds[0] || null);
              setShowHistory(false);
              toastIt(lang === "th" ? "กู้คืนการตั้งค่าสำเร็จ!" : "Workspace restored successfully!");
            }
          }}
          onDelete={async (id) => {
            if (window.localforage) {
              try {
                const list = await window.localforage.getItem('promptHistory') || [];
                const updatedList = list.filter(x => x.id !== id);
                await window.localforage.setItem('promptHistory', updatedList);
                setHistoryList(updatedList);
                toastIt(lang === "th" ? "ลบประวัติเรียบร้อย" : "Deleted history item");
              } catch (err) {
                console.error("Failed to delete history item:", err);
              }
            }
          }}
          onClearAll={async () => {
            if (confirm(lang === "th" ? "ลบประวัติทั้งหมด?" : "Clear all history?")) {
              if (window.localforage) {
                try {
                  await window.localforage.setItem('promptHistory', []);
                  setHistoryList([]);
                  toastIt(lang === "th" ? "ล้างประวัติทั้งหมดเรียบร้อย" : "History cleared");
                } catch (err) {
                  console.error("Failed to clear history:", err);
                }
              }
            }
          }}
          lang={lang}
          t={t}
        />
      )}

      <TweaksLayer theme={theme} setTheme={setTheme} />

      {toast && <div className="toast">{toast}</div>}
    </div>
    </LangCtx.Provider>
  );
}

function HistoryPanel({ historyList, onClose, onRestore, onDelete, onClearAll, lang, t }) {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopy = (item) => {
    let fullPrompt = "";
    if (typeof item.blueprint === "object") {
      const dataTabs = Object.keys(item.blueprint);
      fullPrompt = `# ${item.ws.org.name} — Enterprise Blueprint\nGenerated by ${item.ws.agentName}\n\n` + 
        dataTabs.map((k) => `## ${k}\n\n${item.blueprint[k]}`).join("\n\n");
    } else {
      fullPrompt = String(item.blueprint);
    }
    
    navigator.clipboard && navigator.clipboard.writeText(fullPrompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1400);
  };

  return (
    <div className="output-overlay" style={{ animation: "fadein 0.2s ease-out" }}>
      <div className="output-scrim" onClick={onClose} />
      <div className="history-panel" style={{ animation: "slidein 0.2s ease-out" }}>
        <div className="output-head">
          <div className="output-badge" style={{ backgroundColor: "var(--accent-tint)", color: "var(--accent)" }}>
            <Icon name="history" size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="output-h">{t("history_title")}</div>
            <div className="output-sub">
              {lang === "th" ? `เก็บประวัติไว้ ${historyList.length} รายการ` : `Saved ${historyList.length} items`}
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>

        <div className="output-body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {historyList.length === 0 ? (
            <div className="history-empty">
              {t("history_empty")}
            </div>
          ) : (
            <div className="history-list">
              {historyList.map((item) => (
                <div key={item.id} className="history-card">
                  <div className="history-card-header">
                    <div>
                      <div className="history-card-title">{item.title}</div>
                      <div className="history-card-desc">{item.description}</div>
                    </div>
                  </div>
                  <div className="history-card-actions">
                    <button className="btn-ghost" onClick={() => onRestore(item)} title={lang === "th" ? "กู้คืนค่านี้" : "Restore config"}>
                      <Icon name="arrow-right" size={12} style={{ marginRight: 4 }} />
                      {lang === "th" ? "กู้คืน" : "Restore"}
                    </button>
                    <button className="btn-ghost" onClick={() => handleCopy(item)} title={lang === "th" ? "คัดลอกพรอมป์ตสำเร็จรูป" : "Copy full blueprint"}>
                      <Icon name={copiedId === item.id ? "check" : "copy"} size={12} style={{ marginRight: 4 }} />
                      {copiedId === item.id ? t("copied") : t("copy")}
                    </button>
                    <button className="btn-small-danger" onClick={() => onDelete(item.id)} title={lang === "th" ? "ลบรายการนี้" : "Delete item"}>
                      <Icon name="x" size={11} style={{ marginRight: 3 }} />
                      {lang === "th" ? "ลบ" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {historyList.length > 0 && (
          <div className="output-foot">
            <button className="btn-small-danger" style={{ cursor: "pointer" }} onClick={onClearAll}>
              <Icon name="x" size={12} style={{ marginRight: 4 }} />
              {t("history_clear")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
