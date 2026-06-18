/* Left Panel — Department / Tool / Workflow library */
function LeftPanel({ ws, actions, selectedDeptId, tab, setTab }) {
  const { DEPARTMENTS, TOOLS, WORKFLOWS } = window.WS;
  const lang = useLang(); const t = useT();
  const [q, setQ] = React.useState("");

  const groups = [["Management Core", "grp_mgmt"], ["Business", "grp_business"], ["Support", "grp_support"]];
  const selDept = DEPARTMENTS.find((d) => d.id === selectedDeptId);
  const attachedToSel = new Set((ws.toolsByDept[selectedDeptId] || []));

  const filt = (d) => !q || dName(d, lang).toLowerCase().includes(q.toLowerCase()) || d.name.toLowerCase().includes(q.toLowerCase()) || d.display_name.toLowerCase().includes(q.toLowerCase());
  const filtTxt = (txt) => !q || txt.toLowerCase().includes(q.toLowerCase());

  return (
    <aside className="panel panel-left">
      <div className="panel-head">
        <span className="panel-title">{t("library")}</span>
        <span className="count-badge">{ws.deptIds.length}</span>
      </div>

      <div className="tabs">
        <button className={"tab" + (tab === "dept" ? " active" : "")} onClick={() => setTab("dept")}>{t("tab_dept")}</button>
        <button className={"tab" + (tab === "tool" ? " active" : "")} onClick={() => setTab("tool")}>{t("tab_tool")}</button>
        <button className={"tab" + (tab === "wf" ? " active" : "")} onClick={() => setTab("wf")}>{t("tab_wf")}</button>
      </div>

      <div style={{ padding: "10px 12px 0" }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-hint)", display: "grid" }}><Icon name="search" size={14} /></span>
          <input className="input" style={{ height: 34, paddingLeft: 32, fontSize: 13 }} placeholder={t(tab === "dept" ? "search_dept" : tab === "tool" ? "search_tool" : "search_wf")} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="panel-scroll">
        {tab === "dept" && groups.map(([g, gk]) => {
          const items = DEPARTMENTS.filter((d) => d.group === g && filt(d));
          if (!items.length) return null;
          return (
            <div key={g}>
              <div className="group-label">{t(gk)}</div>
              {items.map((d) => {
                const added = ws.deptIds.includes(d.id);
                const isActive = added && d.id === selectedDeptId;
                const toolCount = (ws.toolsByDept[d.id] || []).length;
                const roomState = isActive ? "working" : added ? "waving" : "idle";
                return (
                  <button key={d.id} className={"dept-card" + (added ? " added" : "") + (isActive ? " active" : "")} style={{ "--dept": d.color }}
                    onClick={() => added ? actions.selectDept(d.id) : actions.addDept(d.id)}>
                    <span className="dept-room-wrap">
                      <DeptRoom deptId={d.id} state={roomState} charSize={42} />
                      {isActive && <span className="dept-room-flag">{t("active")}</span>}
                    </span>
                    <span className="dept-card-foot">
                      <span className="dept-card-body">
                        <span className="dept-card-name">{dName(d, lang)}</span>
                        <span className="dept-card-sub">{dSub(d, lang)}</span>
                      </span>
                      <span className="add-pill">
                        {added ? <>{toolCount ? t("tools_n", toolCount) : t("added")}</> : <><Icon name="plus" size={11} /> {t("add")}</>}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}

        {tab === "tool" && (
          <div>
            {!selDept && <div className="hint-line">{t("tool_hint")}</div>}
            {selDept && (
              <div className="group-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: selDept.color }} />
                {t("attaching_to", dName(selDept, lang))}
              </div>
            )}
            {TOOLS.filter((tl) => filtTxt(tl.name) || filtTxt(tl.category)).map((tl) => {
              const recommended = selDept && tl.parents.includes(selDept.id);
              const attached = attachedToSel.has(tl.id);
              return (
                <button key={tl.id} className={"tool-row" + (attached ? " attached" : "")} disabled={!selDept}
                  onClick={() => selDept && actions.toggleTool(selDept.id, tl.id)}
                  title={tl.fragment}>
                  <span className="tool-ic"><PixelToolIcon toolId={tl.id} size={22} /></span>
                  <span className="tool-row-body">
                    <span className="tool-row-name">{tl.name} {recommended && !attached && <span style={{ fontSize: 9, color: "var(--accent)", fontWeight: 700 }}>· {t("suggested")}</span>}</span>
                    <span className="tool-row-cat">{tl.category} · {t("features_n", tl.features.length)}</span>
                  </span>
                  {attached ? <span className="tool-check"><Icon name="check" size={15} /></span> : selDept && <span style={{ color: "var(--text-hint)" }}><Icon name="plus" size={14} /></span>}
                </button>
              );
            })}
          </div>
        )}

        {tab === "wf" && (
          <div>
            <div className="hint-line">{t("wf_hint")}</div>
            {WORKFLOWS.filter((w) => filtTxt(w.name) || filtTxt(wfName(w, lang))).map((w) => {
              const added = ws.workflowIds.includes(w.id);
              return (
                <button key={w.id} className={"wf-item" + (added ? " added" : "")}
                  onClick={() => actions.toggleWorkflow(w.id)}>
                  <div className="wf-item-top">
                    <span className="wf-name">{wfName(w, lang)}</span>
                    <span className="add-pill" style={added ? { background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" } : {}}>
                      {added ? <><Icon name="check" size={11} /> {t("on")}</> : <><Icon name="plus" size={11} /> {t("add")}</>}
                    </span>
                  </div>
                  <div className="wf-flow">
                    {w.depts.map((dn, i) => (
                      <React.Fragment key={dn}>
                        <span className="wf-node">{nodeTh(dn, lang)}</span>
                        {i < w.depts.length - 1 && <Icon name="arrow-right" size={12} style={{ color: "var(--text-hint)" }} />}
                      </React.Fragment>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

Object.assign(window, { LeftPanel });
