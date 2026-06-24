/* Icon set — minimal geometric line icons. Exported on window for cross-file use. */
function Icon({ name, size = 16, stroke = 1.7, style }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", style };
  switch (name) {
    case "building": return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/></svg>;
    case "plus": return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "x": return <svg {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case "check": return <svg {...p}><path d="M20 6 9 17l-5-5"/></svg>;
    case "search": return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
    case "copy": return <svg {...p}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>;
    case "download": return <svg {...p}><path d="M12 3v12M7 11l5 5 5-5M5 21h14"/></svg>;
    case "settings": return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>;
    case "sun": return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>;
    case "moon": return <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>;
    case "arrow-right": return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "arrow-lr": return <svg {...p}><path d="M8 7l-4 5 4 5M16 7l4 5-4 5"/></svg>;
    case "sparkles": return <svg {...p}><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z"/><path d="M19 4v3M20.5 5.5h-3"/></svg>;
    case "layers": return <svg {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>;
    case "grid": return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "puzzle": return <svg {...p}><path d="M9 3h2a1 1 0 0 1 1 1v1.5a1.5 1.5 0 1 0 3 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h0a1.5 1.5 0 1 1 0 3h0a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v0a1.5 1.5 0 1 0-3 0v0a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2"/></svg>;
    case "flow": return <svg {...p}><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H15a3 3 0 0 1 3 3v6.5"/></svg>;
    case "wrench": return <svg {...p}><path d="M15 4a4.5 4.5 0 0 0-3.6 7.2L4 18.6 5.4 20l7.4-7.4A4.5 4.5 0 1 0 15 4Z"/></svg>;
    case "chevron-right": return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case "zap": return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>;
    case "shield": return <svg {...p}><path d="M12 3l8 3v5c0 4.5-3 8-8 10-5-2-8-5.5-8-10V6l8-3Z"/></svg>;
    case "db": return <svg {...p}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>;
    case "code": return <svg {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14"/></svg>;
    case "rocket": return <svg {...p}><path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5M9 14l-3-3a10 10 0 0 1 9-8c2 0 3 .5 3 .5s.5 1 .5 3a10 10 0 0 1-8 9l-3-3"/><circle cx="14" cy="10" r="1.5"/></svg>;
    case "list": return <svg {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>;
    case "history": return <svg {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

Object.assign(window, { Icon });
