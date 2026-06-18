/* Center Canvas — a living office: grid of department room tiles with pixel characters */
function OfficeCanvas({ ws, actions, selectedDeptId, generating, genStatus }) {
  const { DEPARTMENTS, TOOLS, WORKFLOWS } = window.WS;
  const lang = useLang(); const t = useT();

  const depts = ws.deptIds.map((id) => DEPARTMENTS.find((d) => d.id === id)).filter(Boolean);
  const workflows = ws.workflowIds.map((id) => WORKFLOWS.find((w) => w.id === id)).filter(Boolean);
  const toolCount = Object.values(ws.toolsByDept).reduce((n, a) => n + (a ? a.length : 0), 0);

  return (
    <div className="canvas-wrap">
      <div className="canvas-toolbar">
        <Icon name="grid" size={15} style={{ color: "var(--text-hint)" }} />
        <span className="canvas-title">{t("canvas_title")}</span>
        <span className="canvas-sub">· {depts.length} {t("w_depts")} · {toolCount} {t("w_tools")} · {workflows.length} {t("w_workflows")}</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span className="rooms-pill">{depts.length} {lang === "th" ? "ห้อง" : "rooms"}</span>
        </div>
      </div>

      <div className="canvas-area office-grid">
        {depts.length === 0 ? (
          <div className="empty-office">
            <div className="empty-office-card">
              <div className="empty-helper">
                <PixelCharacter deptId="dept_management" size={92} state="waving" />
              </div>
              <div className="empty-title">{t("empty_title")}</div>
              <div className="empty-sub">{t("empty_sub")}</div>
              <div className="empty-cta"><Icon name="plus" size={15} /> {lang === "th" ? "คลิกแผนกทางซ้าย" : "Click a department on the left"}</div>
              <div className="empty-floor" />
            </div>
          </div>
        ) : (
          <div className="rooms">
            {depts.map((d) => {
              const tools = (ws.toolsByDept[d.id] || []).map((id) => TOOLS.find((tl) => tl.id === id)).filter(Boolean);
              const isSel = selectedDeptId === d.id;
              const active = tools.length > 0;
              const th = window.WS.DEPT_BG_THEMES[d.id] || { wall: "#f5ead8", floor: "#d6b27a", mood: "", moodTh: "" };
              const wallDark = window.WS.DEPT_BG_THEMES.__isDark(th.wall);
              const floorDark = window.WS.DEPT_BG_THEMES.__isDark(th.floor);
              return (
                <article key={d.id} className={"room" + (isSel ? " selected" : "")} style={{ "--dept": d.color, "--wall": th.wall, "--floor": th.floor }}
                  onClick={() => actions.selectDept(d.id)}>
                  <div className="room-banner">
                    <span className="room-mono">{d.monogram}</span>
                    <div className="room-banner-body">
                      <span className="room-name">{dName(d, lang)}</span>
                      <span className="room-name-sub">{lang === "th" ? d.name : d.display_name}</span>
                    </div>
                    <span className="room-mood">{lang === "th" ? th.moodTh : th.mood}</span>
                    <button className="room-x" onClick={(e) => { e.stopPropagation(); actions.removeDept(d.id); }} title={lang === "th" ? "ลบห้อง" : "Remove room"}><Icon name="x" size={14} /></button>
                  </div>

                  <div className={"room-wall" + (wallDark ? " wall-dark" : " wall-light")}>
                    <div className="room-window">
                      <div className="rw-sky" />
                      <div className="rw-bars"><span /><span /><span /></div>
                    </div>
                    <div className="room-kpi">{active ? `${tools.length} ${lang === "th" ? "เครื่องมือ" : "tools"}` : "KPI"}</div>
                    <div className="room-plant"><span className="plant-pot" /><span className="plant-leaf l1" /><span className="plant-leaf l2" /><span className="plant-leaf l3" /></div>
                    <div className="room-char"><DeptRoomCharacter deptId={d.id} isSelected={isSel} isActive={active} size={62} /></div>
                    <div className="room-desk"><span className="desk-monitor" /><span className="desk-top" /></div>
                  </div>

                  <div className={"room-floor" + (floorDark ? " floor-dark" : " floor-light")}>
                    <div className="room-tools">
                      {tools.length ? tools.map((tl) => (
                        <span key={tl.id} className="room-tool-chip">
                          <PixelToolIcon toolId={tl.id} size={18} />
                          {tl.name}
                          <button className="rtc-x" onClick={(e) => { e.stopPropagation(); actions.toggleTool(d.id, tl.id); }}><Icon name="x" size={9} /></button>
                        </span>
                      )) : <span className="room-tool-empty">{t("no_tools_yet")}</span>}
                      <button className="room-add" onClick={(e) => { e.stopPropagation(); actions.selectDept(d.id); actions.requestToolTab(); }}>
                        <Icon name="plus" size={12} /> {t("add_tool")}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {generating && (
          <div className="gen-overlay">
            <div className="gen-helper"><PixelCharacter deptId="dept_it" size={84} state="working" /></div>
            <div className="gen-text">{t("composing", ws.agentName || "Claude")}</div>
            <div className="gen-sub">{genStatus}</div>
          </div>
        )}
      </div>

      {/* workflow strip */}
      <div className="wf-strip">
        <span className="wf-strip-label"><Icon name="flow" size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />{t("workflows_label")}</span>
        {workflows.length === 0 ? (
          <span className="wf-strip-empty">{t("wf_strip_empty")}</span>
        ) : (
          <div className="wf-strip-scroll">
            {workflows.map((w) => (
              <span key={w.id} className="wf-pill">
                <span className="wf-pill-name">{wfName(w, lang)}</span>
                <span className="wf-pill-route">{nodeTh(w.steps[0].from, lang)} <Icon name="arrow-right" size={11} /> {nodeTh(w.steps[0].to, lang)}</span>
                <button className="wf-rm" onClick={() => actions.toggleWorkflow(w.id)}><Icon name="x" size={12} /></button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { OfficeCanvas });
