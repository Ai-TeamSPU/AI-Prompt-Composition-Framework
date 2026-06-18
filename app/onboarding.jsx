/* Onboarding — S1 Create Organization */
function Onboarding({ onComplete }) {
  const { INDUSTRIES, SIZES, TEMPLATES, DEPARTMENTS } = window.WS;
  const lang = useLang(); const t = useT();
  const [name, setName] = React.useState("");
  const [industry, setIndustry] = React.useState(INDUSTRIES[0]);
  const [size, setSize] = React.useState("M");
  const [tpl, setTpl] = React.useState("scratch");

  const submit = () => {
    const t = TEMPLATES.find((x) => x.id === tpl);
    onComplete({
      org: { name: name.trim() || "Demo Enterprise", industry, size },
      deptIds: t ? [...t.depts] : [],
    });
  };

    const dotsFor = (ids) =>
    ids.slice(0, 4).map((id) => {
      const d = DEPARTMENTS.find((x) => x.id === id);
      return <span key={id} style={{ width: 8, height: 8, borderRadius: 99, background: d ? d.color : "var(--border)", marginRight: -2, boxShadow: "0 0 0 1.5px var(--bg-secondary)" }} />;
    });

  return (
    <div className="onboard-stage">
      <div className="onboard-bg" />
      <div className="onboard-card">
        <div className="onboard-brand">
          <div className="brand-mark"><Icon name="building" size={17} /></div>
          <div>
            <div className="brand-name">AI Workspace Prompt Composer</div>
            <div className="brand-tag">Visual prompt composition for enterprise systems</div>
          </div>
          <div className="onboard-helper"><PixelCharacter deptId="dept_hr" size={56} state="waving" /></div>
        </div>

        <h1 className="onboard-h1">{t("onb_title")}</h1>
        <p className="onboard-p">{t("onb_p")}</p>

        <div className="field">
          <label className="field-label">{t("f_org")}</label>
          <input className="input" placeholder={t("ph_org")} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} autoFocus />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          <div className="field">
            <label className="field-label">{t("f_industry")}</label>
            <select className="select" value={industry} onChange={(e) => setIndustry(e.target.value)}>
              {INDUSTRIES.map((i) => <option key={i} value={i}>{industryLabel(i, lang)}</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label className="field-label">{t("f_size")}</label>
          <div className="size-grid">
            {SIZES.map((s) => (
              <button key={s.id} className={"size-btn" + (size === s.id ? " sel" : "")} onClick={() => setSize(s.id)}>
                <span className="size-label">{sizeLabel(s.id, s.label, lang)}</span>
                <span className="size-hint">{s.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="field-label">{t("f_template")}</label>
          <div className="tpl-grid">
            {TEMPLATES.map((tp) => (
              <button key={tp.id} className={"tpl-btn" + (tpl === tp.id ? " sel" : "")} onClick={() => setTpl(tp.id)}>
                <div className="tpl-dots">{tp.depts.length ? dotsFor(tp.depts) : <span style={{ width: 8, height: 8, borderRadius: 99, border: "1.5px dashed var(--border-hover)" }} />}</div>
                <div style={{ minWidth: 0 }}>
                  <div className="tpl-name">{tmplName(tp.id, tp.name, lang)}</div>
                  <div className="tpl-count">{tp.depts.length ? t("depts_n", tp.depts.length) : t("empty_canvas")}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button className="onboard-cta" onClick={submit}>
          {t("build_office")} <Icon name="arrow-right" size={17} />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Onboarding });
