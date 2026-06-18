/* Pixel Art output tab — real pixel characters in office rooms + image-prompt export. */

function PixelRoomCard({ dept, lang }) {
  const t = useT();
  const tools = dept.default_tools.map((id) => { const tl = window.WS.TOOLS.find((x) => x.id === id); return tl ? tl.name : id; });
  return (
    <div className="pix-room" style={{ "--dept": dept.color }}>
      <div className="pix-room-banner">
        <span className="pix-room-th">{dName(dept, "th")}</span>
        <span className="pix-room-en">{dept.name}</span>
      </div>
      <div className="pix-room-scene">
        <div className="pix-room-window"><span /><span /><span /></div>
        <div className="pix-room-char"><PixelCharacter deptId={dept.id} size={74} state="working" /></div>
        <div className="pix-room-desk" />
      </div>
      <div className="pix-room-floor">
        {dept.default_tools.map((id) => { const tl = window.WS.TOOLS.find((x) => x.id === id); return tl ? <span key={id} className="pix-room-tool"><PixelToolIcon toolId={id} size={16} animated={false} />{tl.name}</span> : null; })}
      </div>
    </div>
  );
}

function buildPixelImagePrompt(depts) {
  const cols = Math.min(3, depts.length || 1);
  const rooms = depts.map((d) => `${d.name} (${d.color})`).join(", ");
  return `Pixel art office floor plan, 16-bit SNES RPG style, top-down isometric view.
${depts.length} department rooms in a grid layout (${cols} columns).
Each room shows: a colored banner with the Thai + English department name, a pixel-art staff character in dept-appropriate outfit, computer screens with simplified dept UI, plus dept-relevant tools and furniture (desks, monitors, plants, windows).
Rooms and colors: ${rooms}.
Bottom row: shared lobby with reception desk, plants, and a "ONE TEAM ONE GOAL" sign.
Vibrant cozy colors, clear room separation, crisp pixels, soft drop shadows. Resolution 1536x1024.`;
}

function PixelRooms({ depts, lang }) {
  const t = useT();
  const [copied, setCopied] = React.useState(false);
  const copyPrompt = () => {
    navigator.clipboard && navigator.clipboard.writeText(buildPixelImagePrompt(depts));
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div>
      <div className="pix-head">
        <span className="pix-intro">{t("pixel_intro")}</span>
        <button className={"insp-copy" + (copied ? " copied" : "")} onClick={copyPrompt}>
          <Icon name={copied ? "check" : "copy"} size={13} /> {copied ? t("copied") : t("copy_img_prompt")}
        </button>
      </div>
      <div className="pix-grid">
        {depts.map((d) => <PixelRoomCard key={d.id} dept={d} lang={lang} />)}
      </div>
    </div>
  );
}

Object.assign(window, { PixelRooms, buildPixelImagePrompt });
