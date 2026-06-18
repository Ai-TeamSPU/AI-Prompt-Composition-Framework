/* PixelCharacters — ported faithfully from PixelCharacters.tsx (browser Babel JSX).
   10 departments · idle / walking / waving / working · crispEdges. */

const PIXEL_CHARACTER_CSS = `
  @keyframes px-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
  @keyframes px-walk-body { 0%,100%{transform:translateY(0)} 25%{transform:translateY(-2px)} 75%{transform:translateY(-1px)} }
  @keyframes px-leg-l { 0%,100%{transform:rotate(0)} 50%{transform:rotate(22deg)} }
  @keyframes px-leg-r { 0%,100%{transform:rotate(0)} 50%{transform:rotate(-22deg)} }
  @keyframes px-wave { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-30deg)} 75%{transform:rotate(15deg)} }
  @keyframes px-type { 0%,100%{transform:translateY(0)} 33%{transform:translateY(-1px)} 66%{transform:translateY(1px)} }
  @keyframes px-blink { 0%,88%,100%{transform:scaleY(1)} 92%{transform:scaleY(0.08)} }
  @keyframes px-shadow-pulse { 0%,100%{transform:scaleX(1);opacity:.25} 50%{transform:scaleX(.7);opacity:.15} }
  .px-char-root { cursor: pointer; display: inline-block; user-select: none; }
  .px-char-root:focus-visible { outline: 2px solid #185FA5; outline-offset: 4px; border-radius: 4px; }
  @media (prefers-reduced-motion: no-preference) {
    .px-state-idle .px-body { animation: px-bob 1.4s ease-in-out infinite; }
    .px-state-idle .px-eyes { animation: px-blink 4s ease-in-out infinite; }
    .px-state-idle .px-shadow { animation: px-shadow-pulse 1.4s ease-in-out infinite; }
    .px-state-walking .px-body { animation: px-walk-body .45s linear infinite; }
    .px-state-walking .px-leg-l { animation: px-leg-l .45s linear infinite; transform-origin: top center; }
    .px-state-walking .px-leg-r { animation: px-leg-r .45s linear infinite; transform-origin: top center; }
    .px-state-walking .px-shadow { animation: px-shadow-pulse .45s linear infinite; }
    .px-state-waving .px-body { animation: px-bob 1.2s ease-in-out infinite; }
    .px-state-waving .px-arm-r { animation: px-wave .7s ease-in-out infinite; transform-origin: 80% 10%; }
    .px-state-waving .px-shadow { animation: px-shadow-pulse 1.2s ease-in-out infinite; }
    .px-state-working .px-body { animation: px-type .5s ease-in-out infinite; }
    .px-state-working .px-shadow { animation: px-shadow-pulse .5s ease-in-out infinite; }
  }
`;

const SKIN = "#F5C5A0";
const P = (x, y, w, h, fill, key) => <rect key={key ?? `${x}-${y}-${w}-${h}-${fill}`} x={x} y={y} width={w} height={h} fill={fill} />;

const CHARACTERS = {
  dept_management: {
    label: "แผนกบริหาร", labelEn: "Management", accentColor: "#185FA5", description: "ผู้บริหาร สวมสูทกรมท่า ท่าทางมั่นใจ",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#0c2a4a","ll")}{P(5,11,1,4,"#1a3a6a","lr")}{P(3,14,2,1,"#222","sl")}{P(5,14,2,1,"#222","sr")}</g>,
    body: <g>{P(2,6,6,5,"#1a3a6a","suit")}{P(2,6,6,1,"#0c2a4a","lapel")}{P(4,7,2,3,"#ffffff","shirt")}{P(4,7,2,1,"#eeeeee","tt")}{P(4,8,1,2,"#cc2222","tie")}</g>,
    armL: <g>{P(1,7,1,4,SKIN,"alb")}</g>, armR: <g>{P(8,7,1,4,SKIN,"arb")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,1,6,2,"#1a1a1a","hair")}{P(2,2,1,1,"#2a2a2a","sl")}</g>,
    eyes: <g>{P(3,3,1,1,"#3a2010","el")}{P(6,3,1,1,"#3a2010","er")}</g>, mouth: <g>{P(4,5,2,1,"#cc7755","m")}</g>,
    accessory: <g>{P(4,7,2,1,"#cccc44","pin")}</g>,
  },
  dept_hr: {
    label: "ฝ่ายทรัพยากรบุคคล", labelEn: "HR", accentColor: "#D4537E", description: "ผู้จัดการ HR สวมเสื้อสีชมพู ถือ clipboard",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#602040","ll")}{P(5,11,1,4,"#602040","lr")}{P(3,14,2,1,"#cc99aa","sl")}{P(5,14,2,1,"#cc99aa","sr")}</g>,
    body: <g>{P(2,6,6,5,"#c04060","b")}{P(2,6,6,1,"#e06080","c")}{P(4,7,2,3,"#fff0f4","i")}</g>,
    armL: <g>{P(1,7,1,4,SKIN,"al")}</g>, armR: <g>{P(8,7,2,3,SKIN,"ar")}{P(8,8,2,3,"#f5f5e0","clip")}{P(8,8,2,1,"#ccaa44","cb")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,0,6,2,"#8B4513","ht")}{P(2,1,6,1,"#6a3410","h2")}{P(1,1,1,3,"#8B4513","hl")}{P(8,1,1,3,"#8B4513","hrr")}</g>,
    eyes: <g>{P(3,3,1,1,"#3a2010","el")}{P(6,3,1,1,"#3a2010","er")}</g>, mouth: <g>{P(4,5,2,1,"#ff8888","m")}</g>,
  },
  dept_finance: {
    label: "ฝ่ายการเงินและบัญชี", labelEn: "Finance", accentColor: "#1D9E75", description: "นักบัญชี สวมเสื้อกั๊กสีเขียว ถือเครื่องคิดเลข",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#0d3a22","ll")}{P(5,11,1,4,"#155a35","lr")}{P(3,14,2,1,"#333","sl")}{P(5,14,2,1,"#333","sr")}</g>,
    body: <g>{P(2,6,6,5,"#155a35","b")}{P(3,6,4,5,"#1D9E75","v")}{P(4,7,2,3,"#fff8f0","s")}</g>,
    armL: <g>{P(1,7,1,4,SKIN,"al")}</g>, armR: <g>{P(8,7,2,4,SKIN,"ar")}{P(8,9,2,2,"#dddddd","calc")}{P(9,9,1,1,"#aaaaaa","cbtn")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,1,6,2,"#333333","hair")}{P(8,1,1,1,"#444","side")}</g>,
    eyes: <g>{P(3,3,1,1,"#222","el")}{P(6,3,1,1,"#222","er")}{P(2,3,2,1,"#555588","gl")}{P(5,3,2,1,"#555588","gr")}{P(4,3,1,1,"#555588","br")}</g>, mouth: <g>{P(4,5,2,1,"#cc7755","m")}</g>,
  },
  dept_sales: {
    label: "ฝ่ายขาย", labelEn: "Sales", accentColor: "#E24B4A", description: "พนักงานขาย สวมแจ็กเก็ตแดง ถือกระเป๋าเอกสาร",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#5a0a0a","ll")}{P(5,11,1,4,"#7a1010","lr")}{P(3,14,2,1,"#222","sl")}{P(5,14,2,1,"#222","sr")}</g>,
    body: <g>{P(2,6,6,5,"#8a1010","b")}{P(2,6,6,1,"#aa2020","c")}{P(4,7,2,3,"#ffffff","s")}{P(4,8,1,2,"#1a1a7a","tie")}</g>,
    armL: <g>{P(1,7,1,4,SKIN,"al")}</g>, armR: <g>{P(8,7,1,4,SKIN,"ar")}{P(8,10,2,3,"#5a3a10","bag")}{P(8,10,2,1,"#7a5a20","bt")}{P(9,10,1,1,"#cc9944","h")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,1,6,2,"#4a2a0a","hair")}</g>,
    eyes: <g>{P(3,3,1,1,"#3a2010","el")}{P(6,3,1,1,"#3a2010","er")}</g>, mouth: <g>{P(4,5,2,1,"#ff8888","m")}</g>,
    accessory: <g>{P(3,5,4,1,"#cc8844","sw")}</g>,
  },
  dept_marketing: {
    label: "ฝ่ายการตลาด", labelEn: "Marketing", accentColor: "#BA7517", description: "นักการตลาด สวมฮู้ดดี้สีส้ม ถือแท็บเล็ต",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#4a2a04","ll")}{P(5,11,1,4,"#7a4a08","lr")}{P(3,14,2,1,"#664422","sl")}{P(5,14,2,1,"#664422","sr")}</g>,
    body: <g>{P(1,6,8,5,"#7a4a08","b")}{P(1,6,8,1,"#EF9F27","hr")}{P(1,6,3,5,"#6a3a05","bl")}{P(6,6,3,5,"#6a3a05","brr")}{P(3,6,4,5,"#BA7517","center")}</g>,
    armL: <g>{P(0,7,2,4,SKIN,"al")}</g>, armR: <g>{P(8,7,2,4,SKIN,"ar")}{P(8,9,2,3,"#111111","tab")}{P(8,9,2,1,"#555555","tt")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,0,6,3,"#cc6600","hair")}{P(1,1,1,2,"#dd7700","s")}{P(8,1,1,2,"#dd7700","sr")}</g>,
    eyes: <g>{P(3,3,1,1,"#3a2010","el")}{P(6,3,1,1,"#3a2010","er")}</g>, mouth: <g>{P(4,5,2,1,"#cc8855","m")}</g>,
  },
  dept_operations: {
    label: "ฝ่ายปฏิบัติการ", labelEn: "Operations", accentColor: "#639922", description: "วิศวกร สวมชุดสีเขียว หมวกนิรภัยสีเหลือง",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#1a3a05","ll")}{P(5,11,1,4,"#2a5a10","lr")}{P(3,14,2,1,"#333","sl")}{P(5,14,2,1,"#333","sr")}</g>,
    body: <g>{P(2,6,6,5,"#3a5a10","b")}{P(2,6,6,1,"#5a8a20","c")}{P(3,8,4,2,"#ffcc44","v")}</g>,
    armL: <g>{P(1,7,1,4,SKIN,"al")}</g>, armR: <g>{P(8,7,1,4,SKIN,"ar")}{P(8,9,2,2,"#dddddd","cb")}{P(8,9,2,1,"#888","cl")}</g>,
    head: <g>{P(2,2,6,5,SKIN,"head")}</g>, hair: <g></g>,
    eyes: <g>{P(3,4,1,1,"#3a2010","el")}{P(6,4,1,1,"#3a2010","er")}</g>, mouth: <g>{P(4,6,2,1,"#cc7755","m")}</g>,
    accessory: <g>{P(1,1,8,2,"#ffcc00","hb")}{P(2,0,6,2,"#ffdd22","ht")}{P(1,2,8,1,"#cc9900","hband")}</g>,
  },
  dept_it: {
    label: "ฝ่ายไอที", labelEn: "IT", accentColor: "#534AB7", description: "นักพัฒนา สวมฮู้ดดี้สีม่วง แว่นตา ถือแล็ปท็อป",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#1a1a5a","ll")}{P(5,11,1,4,"#2a2a7a","lr")}{P(3,14,2,1,"#555","sl")}{P(5,14,2,1,"#555","sr")}</g>,
    body: <g>{P(1,6,8,5,"#2a2a7a","b")}{P(2,6,6,1,"#534AB7","c")}{P(4,7,2,3,"#111133","i")}</g>,
    armL: <g>{P(0,7,2,5,SKIN,"al")}{P(0,10,3,3,"#333344","lb")}</g>, armR: <g>{P(8,7,2,5,SKIN,"ar")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,0,6,2,"#222244","hair")}{P(1,1,1,1,"#333366","s")}</g>,
    eyes: <g>{P(3,3,1,1,"#333388","el")}{P(6,3,1,1,"#333388","er")}{P(2,3,2,1,"#7F77DD","gl")}{P(5,3,2,1,"#7F77DD","gr")}{P(4,3,1,1,"#534AB7","br")}</g>, mouth: <g>{P(4,5,2,1,"#aaaaaa","m")}</g>,
    accessory: <g>{P(0,10,4,2,"#111122","lap")}{P(0,11,4,1,"#88aaff","scr")}</g>,
  },
  dept_rd: {
    label: "ฝ่ายวิจัยและพัฒนา", labelEn: "R&D", accentColor: "#0F6E56", description: "นักวิทยาศาสตร์ สวมเสื้อกาวน์ขาว ถือ clipboard",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#555580","ll")}{P(5,11,1,4,"#555580","lr")}{P(3,14,2,1,"#222","sl")}{P(5,14,2,1,"#222","sr")}</g>,
    body: <g>{P(2,6,6,5,"#e8e8f0","coat")}{P(2,6,6,1,"#ddddee","c")}{P(4,7,2,3,"#c0d8ff","i")}{P(3,9,1,1,"#1D9E75","badge")}</g>,
    armL: <g>{P(1,7,1,4,"#e8e8f0","al")}</g>, armR: <g>{P(8,7,2,4,SKIN,"ar")}{P(8,9,2,3,"#f5f5e0","bd")}{P(8,9,2,1,"#ccaa44","cl")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,1,6,2,"#333333","hair")}</g>,
    eyes: <g>{P(3,3,1,1,"#222222","el")}{P(6,3,1,1,"#222222","er")}</g>, mouth: <g>{P(4,5,2,1,"#cc7755","m")}</g>,
    accessory: <g>{P(2,3,2,1,"#88aacc","gl")}{P(5,3,2,1,"#88aacc","gr")}{P(4,3,1,1,"#88aacc","br")}</g>,
  },
  dept_purchasing: {
    label: "ฝ่ายจัดซื้อ", labelEn: "Purchasing", accentColor: "#993C1D", description: "ผู้จัดการจัดซื้อ สวมเสื้อกั๊กสีน้ำตาล ถือใบสั่งซื้อ",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#3a1005","ll")}{P(5,11,1,4,"#5a2010","lr")}{P(3,14,2,1,"#222","sl")}{P(5,14,2,1,"#222","sr")}</g>,
    body: <g>{P(2,6,6,5,"#7a4a1a","b")}{P(3,6,4,5,"#993C1D","v")}{P(4,7,2,3,"#fff8f0","s")}</g>,
    armL: <g>{P(1,7,1,4,SKIN,"al")}</g>, armR: <g>{P(8,7,2,5,SKIN,"ar")}{P(7,10,3,4,"#f5f5e0","po")}{P(7,10,3,1,"#cccc99","pt")}{P(8,11,1,1,"#aaa","l1")}{P(8,12,1,1,"#aaa","l2")}{P(8,13,1,1,"#aaa","l3")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,1,6,2,"#2a1a0a","hair")}</g>,
    eyes: <g>{P(3,3,1,1,"#3a2010","el")}{P(6,3,1,1,"#3a2010","er")}</g>, mouth: <g>{P(4,5,2,1,"#cc7755","m")}</g>,
  },
  dept_cs: {
    label: "ฝ่ายบริการลูกค้า", labelEn: "Customer Service", accentColor: "#5F5E5A", description: "เจ้าหน้าที่ Call Center สวมชุดเทา ใส่หูฟัง",
    shadow: <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033" />,
    legs: <g>{P(3,11,1,4,"#2a2a3a","ll")}{P(5,11,1,4,"#3a3a4a","lr")}{P(3,14,2,1,"#222","sl")}{P(5,14,2,1,"#222","sr")}</g>,
    body: <g>{P(2,6,6,5,"#3a3a4a","b")}{P(2,6,6,1,"#5a5a6a","c")}{P(4,7,2,3,"#ffffff","s")}</g>,
    armL: <g>{P(1,7,1,4,SKIN,"al")}</g>, armR: <g>{P(8,7,1,4,SKIN,"ar")}</g>,
    head: <g>{P(2,1,6,5,SKIN,"head")}</g>, hair: <g>{P(2,1,6,2,"#5a4a3a","hair")}</g>,
    eyes: <g>{P(3,3,1,1,"#3a2010","el")}{P(6,3,1,1,"#3a2010","er")}</g>, mouth: <g>{P(4,5,2,1,"#ff9966","m")}</g>,
    accessory: <g>
      <path d="M2 2 Q5 -0.5 8 2" fill="none" stroke="#2a2a50" strokeWidth="0.8" />
      {P(1,2,1,2,"#2a2a50","pl")}{P(8,2,1,2,"#2a2a50","pr")}
      <path d="M2 4 L0 6" fill="none" stroke="#444466" strokeWidth="0.5" />
      {P(0,5,1,1,"#55aaff","mic")}
    </g>,
  },
};

// my data uses dept_rnd; the character set uses dept_rd
function charId(deptId) { return deptId === "dept_rnd" ? "dept_rd" : deptId; }

function PixelCharacter({ deptId, size = 56, state = "idle", animated = true, onClick, className = "" }) {
  const [hovered, setHovered] = React.useState(false);
  const char = CHARACTERS[charId(deptId)];
  if (!char) return null;
  const effectiveState = !animated ? "idle" : (hovered && state === "idle" ? "walking" : state);
  const width = Math.round(size * 0.625);
  return (
    <div className={`px-char-root ${className}`} style={{ width, height: size }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={onClick} role="img" aria-label={char.description} tabIndex={0}>
      <svg width={width} height={size} viewBox="0 0 10 16" shapeRendering="crispEdges" className={`px-state-${effectiveState}`} style={{ display: "block", overflow: "visible" }}>
        <g className="px-shadow">{char.shadow}</g>
        <g className="px-body">
          {char.legs}
          {char.body}
          <g className="px-arm-l">{char.armL}</g>
          <g className="px-arm-r">{char.armR}</g>
          {char.head}
          {char.hair}
          <g className="px-eyes">{char.eyes}</g>
          {char.mouth}
          {char.accessory}
        </g>
      </svg>
    </div>
  );
}

function DeptRoomCharacter({ deptId, isSelected, isActive, size = 48 }) {
  const state = isActive ? "working" : isSelected ? "waving" : "idle";
  return <PixelCharacter deptId={deptId} size={size} state={state} animated />;
}

// inject keyframes once
if (!document.getElementById("px-char-css")) {
  const st = document.createElement("style");
  st.id = "px-char-css"; st.textContent = PIXEL_CHARACTER_CSS;
  document.head.appendChild(st);
}

Object.assign(window, { PixelCharacter, DeptRoomCharacter, CHARACTERS, charId, PIXEL_CHARACTER_CSS });
