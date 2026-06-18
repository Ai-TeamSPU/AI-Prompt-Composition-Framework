/* PixelToolIcons — ported from PixelToolIcons.tsx. 20 animated 16×16 pixel icons. */

const PIXEL_TOOL_CSS = `
  @keyframes t-pulse   { 0%,100%{transform:scale(1)}        50%{transform:scale(1.08)} }
  @keyframes t-spin    { 0%{transform:rotate(0deg)}          100%{transform:rotate(360deg)} }
  @keyframes t-blink   { 0%,80%,100%{opacity:1}             90%{opacity:.3} }
  @keyframes t-bounce  { 0%,100%{transform:translateY(0)}   40%{transform:translateY(-3px)} 60%{transform:translateY(-1px)} }
  @keyframes t-shake   { 0%,100%{transform:rotate(0deg)}    20%{transform:rotate(-8deg)}    60%{transform:rotate(8deg)} }
  @keyframes t-flash   { 0%,100%{opacity:1}                 50%{opacity:.4} }
  @keyframes t-slide   { 0%,100%{transform:translateX(0)}   50%{transform:translateX(2px)} }
  @keyframes t-grow    { 0%,100%{transform:scaleY(1)}        50%{transform:scaleY(1.15)} }
  @keyframes t-float   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-2px)} }
  @keyframes t-tick    { 0%,90%,100%{transform:scaleX(1)}   95%{transform:scaleX(0)} }
`;

// My data tool ids -> icon registry ids (mostly identical; a couple differ)
const TOOL_ICON_ALIAS = { tool_activitylog: "tool_actlog", tool_lab: "tool_project" };

const TOOL_ANIM = {
  tool_dashboard: "t-blink 2s ease-in-out infinite", tool_crm: "t-bounce .8s ease-in-out infinite",
  tool_payroll: "t-bounce .9s ease-in-out infinite", tool_recruitment: "t-float 1s ease-in-out infinite",
  tool_iam: "t-shake .6s ease-in-out infinite", tool_backup: "t-spin 2s linear infinite|8px 3px",
  tool_actlog: "t-slide .7s ease-in-out infinite", tool_workflow: "t-pulse .9s ease-in-out infinite",
  tool_reporting: "t-grow .8s ease-in-out infinite|8px 12px", tool_ticketing: "t-bounce .7s ease-in-out infinite",
  tool_kpi: "t-spin 3s linear infinite|8px 8px", tool_budget: "t-grow .9s ease-in-out infinite|8px 11px",
  tool_performance: "t-pulse .8s ease-in-out infinite", tool_campaign: "t-flash .6s ease-in-out infinite",
  tool_pipeline: "t-slide .7s ease-in-out infinite", tool_qc: "t-tick 1.2s ease-in-out infinite|8px 8px",
  tool_project: "t-pulse .9s ease-in-out infinite", tool_vendor: "t-shake .7s ease-in-out infinite",
  tool_helpdesk: "t-bounce .8s ease-in-out infinite", tool_notification: "t-shake .4s ease-in-out infinite",
};

function toolSvg(rid, animated) {
  const spec = TOOL_ANIM[rid] || "";
  const [anim, origin] = spec.split("|");
  const a = animated && anim ? `style="animation:${anim}${origin ? `;transform-origin:${origin}` : ""}"` : "";
  const M = {
    tool_dashboard: `<rect x="1" y="1" width="14" height="14" rx="1" fill="#0C447C"/><rect x="2" y="2" width="6" height="6" rx=".5" fill="#378ADD"/><rect x="9" y="2" width="6" height="3" rx=".5" fill="#185FA5"/><rect x="9" y="6" width="6" height="2" rx=".5" fill="#85B7EB"/><rect x="2" y="9" width="3" height="6" rx=".5" fill="#85B7EB"/><rect x="6" y="11" width="3" height="4" rx=".5" fill="#378ADD"/><rect x="10" y="9" width="3" height="6" rx=".5" fill="#185FA5"/><rect x="3" y="3" width="4" height="4" rx=".5" fill="#B5D4F4" ${a}/>`,
    tool_crm: `<rect x="2" y="4" width="12" height="10" rx="1" fill="#A32D2D"/><rect x="3" y="5" width="10" height="8" rx=".5" fill="#791F1F"/><circle cx="5" cy="7" r="1.5" fill="#F09595"/><circle cx="9" cy="7" r="1.5" fill="#F09595"/><circle cx="13" cy="7" r="1.5" fill="#F09595"/><rect x="4" y="10" width="3" height="1.5" rx=".5" fill="#E24B4A"/><rect x="8" y="10" width="3" height="1.5" rx=".5" fill="#E24B4A"/><g ${a}><path d="M7 2 Q8 1 9 2" fill="none" stroke="#E24B4A" stroke-width="1"/><circle cx="8" cy="2" r="1" fill="#E24B4A"/></g>`,
    tool_payroll: `<rect x="2" y="3" width="12" height="10" rx="1" fill="#085041"/><rect x="3" y="5" width="10" height="7" rx=".5" fill="#0F6E56"/><rect x="4" y="6" width="8" height=".8" rx=".3" fill="#5DCAA5"/><rect x="4" y="8" width="5" height=".8" rx=".3" fill="#9FE1CB"/><rect x="4" y="10" width="6" height=".8" rx=".3" fill="#9FE1CB"/><g ${a}><circle cx="8" cy="2" r="1.5" fill="#1D9E75"/><text x="8" y="2.7" text-anchor="middle" fill="white" font-size="2" font-weight="bold">฿</text></g>`,
    tool_recruitment: `<rect x="3" y="3" width="10" height="12" rx="1" fill="#72243E"/><rect x="4" y="4" width="8" height="10" rx=".5" fill="#993556"/><circle cx="8" cy="7" r="2" fill="#F4C0D1"/><rect x="5" y="10" width="6" height="1" rx=".3" fill="#D4537E"/><rect x="6" y="12" width="4" height="1" rx=".3" fill="#ED93B1"/><g ${a}><rect x="12" y="1" width="4" height="4" rx="1" fill="#D4537E"/><rect x="13" y="2" width="1" height="2" rx=".3" fill="white"/><rect x="12.5" y="2.5" width="2" height="1" rx=".3" fill="white"/></g>`,
    tool_iam: `<rect x="4" y="6" width="8" height="9" rx="1" fill="#3C3489"/><rect x="5" y="7" width="6" height="7" rx=".5" fill="#534AB7"/><g ${a}><path d="M6 6 Q8 2 10 6" fill="none" stroke="#7F77DD" stroke-width="1.5"/><circle cx="8" cy="6" r="1" fill="#AFA9EC"/></g><rect x="7" y="9" width="2" height="3" rx=".5" fill="#AFA9EC"/><circle cx="8" cy="9" r="1" fill="#CECBF6"/>`,
    tool_backup: `<rect x="2" y="5" width="12" height="8" rx="1" fill="#27500A"/><rect x="3" y="6" width="10" height="6" rx=".5" fill="#3B6D11"/><rect x="4" y="8" width="8" height="1" rx=".3" fill="#97C459"/><rect x="4" y="10" width="5" height="1" rx=".3" fill="#C0DD97"/><g ${a}><path d="M5 3 A3 3 0 0 1 11 3" fill="none" stroke="#639922" stroke-width="1.5" stroke-linecap="round"/><polygon points="5,1.5 5,4.5 7,3" fill="#639922"/></g>`,
    tool_actlog: `<rect x="2" y="2" width="12" height="13" rx="1" fill="#444441"/><rect x="3" y="3" width="10" height="11" rx=".5" fill="#5F5E5A"/><g ${a}><rect x="4" y="5" width="8" height="1" rx=".3" fill="#D3D1C7"/><rect x="4" y="7" width="6" height="1" rx=".3" fill="#B4B2A9"/><rect x="4" y="9" width="7" height="1" rx=".3" fill="#D3D1C7"/><rect x="4" y="11" width="5" height="1" rx=".3" fill="#B4B2A9"/></g><rect x="12" y="4" width="1" height="1" rx=".2" fill="#97C459"/><rect x="12" y="6" width="1" height="1" rx=".2" fill="#EF9F27"/><rect x="12" y="8" width="1" height="1" rx=".2" fill="#E24B4A"/>`,
    tool_workflow: `<circle cx="3" cy="4" r="2" fill="#854F0B"/><circle cx="8" cy="4" r="2" fill="#854F0B"/><circle cx="13" cy="4" r="2" fill="#854F0B"/><circle cx="5" cy="11" r="2" fill="#854F0B"/><circle cx="11" cy="11" r="2" fill="#854F0B"/><line x1="5" y1="4" x2="6" y2="4" stroke="#EF9F27" stroke-width="1"/><line x1="10" y1="4" x2="11" y2="4" stroke="#EF9F27" stroke-width="1"/><line x1="3" y1="6" x2="5" y2="9" stroke="#EF9F27" stroke-width=".8"/><line x1="13" y1="6" x2="11" y2="9" stroke="#EF9F27" stroke-width=".8"/><circle cx="8" cy="4" r="2" fill="#EF9F27" ${a}/>`,
    tool_reporting: `<rect x="2" y="2" width="12" height="13" rx="1" fill="#0C447C"/><rect x="3" y="3" width="10" height="11" rx=".5" fill="#185FA5"/><rect x="4" y="5" width="8" height=".8" rx=".3" fill="#B5D4F4"/><rect x="4" y="7" width="8" height=".8" rx=".3" fill="#B5D4F4"/><g ${a}><rect x="4" y="9" width="2" height="4" rx=".3" fill="#85B7EB"/><rect x="7" y="10" width="2" height="3" rx=".3" fill="#378ADD"/><rect x="10" y="8" width="2" height="5" rx=".3" fill="#85B7EB"/></g>`,
    tool_ticketing: `<rect x="1" y="5" width="14" height="7" rx="1" fill="#712B13"/><rect x="2" y="6" width="12" height="5" rx=".5" fill="#993C1D"/><circle cx="2.5" cy="8.5" r="1.5" fill="#712B13"/><circle cx="13.5" cy="8.5" r="1.5" fill="#712B13"/><rect x="4" y="7" width="8" height="1" rx=".3" fill="#F5C4B3"/><rect x="4" y="9" width="5" height="1" rx=".3" fill="#F0997B"/><g ${a}><rect x="6" y="2" width="4" height="3" rx=".5" fill="#D85A30"/><rect x="7" y="3" width="2" height="1" rx=".2" fill="white"/></g>`,
    tool_kpi: `<circle cx="8" cy="8" r="6.5" fill="#0C447C"/><circle cx="8" cy="8" r="5" fill="#185FA5"/><path d="M8 8 L8 4" fill="none" stroke="#B5D4F4" stroke-width="1.2" stroke-linecap="round" ${a}/><path d="M8 8 L11 9" fill="none" stroke="#E6F1FB" stroke-width=".8" stroke-linecap="round"/><circle cx="8" cy="8" r="1" fill="#E6F1FB"/><rect x="6.5" y="12" width="3" height="1" rx=".4" fill="#B5D4F4"/>`,
    tool_budget: `<rect x="2" y="3" width="12" height="11" rx="1" fill="#085041"/><rect x="3" y="4" width="10" height="9" rx=".5" fill="#0F6E56"/><rect x="4" y="6" width="8" height=".8" rx=".3" fill="#5DCAA5"/><g ${a}><rect x="4" y="8" width="2.5" height="3" rx=".3" fill="#5DCAA5"/><rect x="7" y="9" width="2.5" height="2" rx=".3" fill="#1D9E75"/><rect x="10" y="7" width="2.5" height="4" rx=".3" fill="#9FE1CB"/></g>`,
    tool_performance: `<polygon points="8,1 9.5,6 15,6 10.5,9 12,14 8,11 4,14 5.5,9 1,6 6.5,6" fill="#72243E"/><polygon points="8,2 9.2,6.2 14,6.2 10.1,8.8 11.3,13 8,10.5 4.7,13 5.9,8.8 2,6.2 6.8,6.2" fill="#D4537E" ${a}/><circle cx="8" cy="7.5" r="2" fill="#F4C0D1"/>`,
    tool_campaign: `<rect x="1" y="5" width="10" height="7" rx="1" fill="#633806"/><rect x="2" y="6" width="8" height="5" rx=".5" fill="#854F0B"/><rect x="3" y="7.5" width="6" height="1" rx=".3" fill="#FAC775"/><rect x="3" y="9.5" width="4" height="1" rx=".3" fill="#EF9F27"/><g ${a}><path d="M12 2 L14 5 L12 5 L14 8 L11 5 L13 5 Z" fill="#EF9F27"/></g><circle cx="14" cy="3" r="1.5" fill="#BA7517"/><circle cx="14" cy="3" r=".5" fill="#FAC775"/>`,
    tool_pipeline: `<rect x="1" y="4" width="3" height="9" rx=".5" fill="#A32D2D"/><rect x="5" y="6" width="3" height="7" rx=".5" fill="#E24B4A"/><rect x="9" y="8" width="3" height="5" rx=".5" fill="#A32D2D"/><rect x="13" y="10" width="2" height="3" rx=".5" fill="#E24B4A"/><g ${a}><circle cx="2.5" cy="3" r="1.5" fill="#F09595"/><circle cx="6.5" cy="5" r="1.5" fill="#E24B4A"/><circle cx="10.5" cy="7" r="1.5" fill="#F09595"/><circle cx="14" cy="9" r="1.5" fill="#E24B4A"/></g>`,
    tool_qc: `<circle cx="8" cy="8" r="6.5" fill="#27500A"/><circle cx="8" cy="8" r="5.5" fill="#3B6D11"/><path d="M5 8 L7 10 L11 6" fill="none" stroke="#97C459" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${a}/><circle cx="8" cy="8" r="5.5" fill="none" stroke="#C0DD97" stroke-width=".5"/>`,
    tool_project: `<rect x="1" y="3" width="14" height="11" rx="1" fill="#04342C"/><rect x="2" y="4" width="12" height="9" rx=".5" fill="#085041"/><rect x="3" y="6" width="10" height="1" rx=".3" fill="#5DCAA5"/><rect x="3" y="8" width="7" height="1" rx=".3" fill="#9FE1CB"/><rect x="3" y="10" width="9" height="1" rx=".3" fill="#5DCAA5"/><g ${a}><rect x="11" y="7.5" width="2" height="2" rx=".3" fill="#1D9E75"/><path d="M11.3 8.2 L11.8 9 L12.8 7.7" fill="none" stroke="white" stroke-width=".5" stroke-linecap="round"/></g>`,
    tool_vendor: `<rect x="2" y="5" width="5" height="9" rx=".5" fill="#712B13"/><rect x="9" y="5" width="5" height="9" rx=".5" fill="#712B13"/><g ${a}><path d="M7 8.5 Q8 7.5 9 8.5" fill="none" stroke="#F0997B" stroke-width="1.2" stroke-linecap="round"/><circle cx="7" cy="8.5" r="1" fill="#993C1D"/><circle cx="9" cy="8.5" r="1" fill="#993C1D"/></g><rect x="3" y="6" width="3" height="1" rx=".3" fill="#F5C4B3"/><rect x="10" y="6" width="3" height="1" rx=".3" fill="#F5C4B3"/><rect x="3" y="8" width="3" height="1" rx=".3" fill="#F0997B"/><rect x="10" y="8" width="3" height="1" rx=".3" fill="#F0997B"/>`,
    tool_helpdesk: `<circle cx="8" cy="7" r="5.5" fill="#444441"/><circle cx="8" cy="7" r="4.5" fill="#5F5E5A"/><text x="8" y="9.2" text-anchor="middle" fill="#D3D1C7" font-size="6" font-weight="bold">?</text><g ${a}><rect x="6" y="13" width="4" height="2.5" rx=".5" fill="#888780"/><rect x="5" y="15" width="6" height="1" rx=".3" fill="#5F5E5A"/></g>`,
    tool_notification: `<path d="M8 2.5 Q11.5 3.5 11.5 8 L12.5 11.5 L3.5 11.5 L4.5 8 Q4.5 3.5 8 2.5 Z" fill="#633806"/><path d="M8 2.5 Q11.5 3.5 11.5 8 L12.5 11.5 L3.5 11.5 L4.5 8 Q4.5 3.5 8 2.5 Z" fill="#BA7517" ${a}/><path d="M6 11.5 Q6 14 8 14 Q10 14 10 11.5" fill="#EF9F27"/><circle cx="12.5" cy="3" r="2" fill="#E24B4A"/><circle cx="12.5" cy="3" r="1" fill="#F09595"/>`,
  };
  return M[rid] || `<rect x="2" y="2" width="12" height="12" rx="2" fill="#94a3b8"/><rect x="4" y="4" width="8" height="8" rx="1" fill="#cbd5e1" ${a}/>`;
}

function PixelToolIcon({ toolId, size = 28, animated = true }) {
  const [hovered, setHovered] = React.useState(false);
  const rid = TOOL_ICON_ALIAS[toolId] || toolId;
  const active = animated && hovered;
  return (
    <span className="px-tool" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: size, height: size, display: "inline-block" }}>
      <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges"
        style={{ display: "block", overflow: "visible" }}
        dangerouslySetInnerHTML={{ __html: toolSvg(rid, active) }} />
    </span>
  );
}

if (!document.getElementById("px-tool-css")) {
  const st = document.createElement("style");
  st.id = "px-tool-css"; st.textContent = PIXEL_TOOL_CSS;
  document.head.appendChild(st);
}

Object.assign(window, { PixelToolIcon, toolSvg, TOOL_ICON_ALIAS });
