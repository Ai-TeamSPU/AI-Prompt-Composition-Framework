/* DeptRoom — pixel-art room background scenes per department.
   roomBg SVG inner content ported faithfully from DeptRoomCard.tsx (viewBox 0 0 320 132).
   The existing PixelCharacter is composited on top, standing on the room floor. */

const DEPT_ROOMS = {
  dept_management: `
    <rect x="0" y="0" width="320" height="132" fill="#1a2a3a"/>
    <rect x="0" y="104" width="320" height="28" fill="#2a1a0a"/>
    <rect x="0" y="104" width="320" height="3" fill="#3a2510"/>
    <rect x="8" y="8" width="50" height="70" fill="#4a7aaa" opacity=".4"/>
    <rect x="8" y="8" width="2" height="70" fill="#0c2a4a"/>
    <rect x="56" y="8" width="2" height="70" fill="#0c2a4a"/>
    <rect x="32" y="8" width="2" height="70" fill="#0c2a4a"/>
    <rect x="8" y="8" width="50" height="2" fill="#0c2a4a"/>
    <rect x="8" y="44" width="50" height="2" fill="#0c2a4a"/>
    <rect x="10" y="12" width="8" height="30" fill="#0a1a2a"/>
    <rect x="22" y="18" width="6" height="24" fill="#0a1a2a"/>
    <rect x="34" y="10" width="8" height="32" fill="#0a1a2a"/>
    <rect x="44" y="14" width="8" height="28" fill="#0a1a2a"/>
    <rect x="220" y="8" width="62" height="96" fill="#3a2010"/>
    <rect x="220" y="8" width="62" height="3" fill="#5a3820"/>
    <rect x="220" y="36" width="62" height="2" fill="#5a3820"/>
    <rect x="220" y="62" width="62" height="2" fill="#5a3820"/>
    <rect x="223" y="12" width="5" height="22" fill="#E24B4A"/>
    <rect x="229" y="12" width="5" height="22" fill="#185FA5"/>
    <rect x="235" y="12" width="7" height="22" fill="#1D9E75"/>
    <rect x="243" y="12" width="5" height="22" fill="#BA7517"/>
    <rect x="249" y="12" width="7" height="22" fill="#534AB7"/>
    <rect x="257" y="12" width="5" height="22" fill="#993C1D"/>
    <rect x="223" y="39" width="7" height="21" fill="#D4537E"/>
    <rect x="231" y="39" width="6" height="21" fill="#0F6E56"/>
    <rect x="238" y="39" width="8" height="21" fill="#639922"/>
    <rect x="247" y="39" width="6" height="21" fill="#185FA5"/>
    <rect x="254" y="39" width="6" height="21" fill="#993C1D"/>
    <rect x="268" y="62" width="11" height="14" fill="#ccaa22"/>
    <rect x="269" y="62" width="9" height="10" fill="#ffdd44"/>
    <rect x="268" y="72" width="11" height="3" fill="#ccaa22"/>
    <rect x="269" y="75" width="9" height="3" fill="#ccaa22"/>
    <circle cx="145" cy="44" r="28" fill="#ffffff"/>
    <circle cx="145" cy="44" r="22" fill="#E24B4A"/>
    <circle cx="145" cy="44" r="15" fill="#ffffff"/>
    <circle cx="145" cy="44" r="9" fill="#E24B4A"/>
    <circle cx="145" cy="44" r="4" fill="#ffdd00"/>
    <rect x="70" y="96" width="140" height="8" fill="#5a3820"/>
    <rect x="70" y="104" width="5" height="20" fill="#4a2810"/>
    <rect x="205" y="104" width="5" height="20" fill="#4a2810"/>
    <rect x="0" y="80" width="320" height="2" fill="#0c1a2a"/>`,

  dept_hr: `
    <rect x="0" y="0" width="320" height="132" fill="#f5e8e0"/>
    <rect x="0" y="104" width="320" height="28" fill="#5a3010"/>
    <rect x="0" y="104" width="320" height="2" fill="#7a4820"/>
    <rect x="0" y="0" width="320" height="4" fill="#e8c8b8"/>
    <rect x="8" y="8" width="92" height="72" fill="#cc9966"/>
    <rect x="9" y="9" width="90" height="70" fill="#ddaa77"/>
    <rect x="11" y="11" width="36" height="22" fill="#fff" opacity=".9"/>
    <rect x="12" y="12" width="34" height="2" fill="#D4537E"/>
    <rect x="12" y="15" width="24" height="1" fill="#cc9988"/>
    <rect x="12" y="17" width="28" height="1" fill="#cc9988"/>
    <rect x="49" y="11" width="20" height="22" fill="#fff" opacity=".9"/>
    <circle cx="59" cy="18" r="5" fill="#F4C0D1"/>
    <rect x="50" y="28" width="18" height="2" fill="#D4537E"/>
    <rect x="11" y="34" width="20" height="22" fill="#fff" opacity=".9"/>
    <circle cx="21" cy="41" r="5" fill="#F4C0D1"/>
    <rect x="12" y="52" width="18" height="2" fill="#D4537E"/>
    <rect x="49" y="34" width="20" height="22" fill="#fff" opacity=".9"/>
    <circle cx="59" cy="41" r="5" fill="#F4C0D1"/>
    <rect x="50" y="52" width="18" height="2" fill="#D4537E"/>
    <circle cx="28" cy="11" r="2" fill="#E24B4A"/>
    <circle cx="59" cy="11" r="2" fill="#185FA5"/>
    <circle cx="21" cy="34" r="2" fill="#1D9E75"/>
    <circle cx="59" cy="34" r="2" fill="#E24B4A"/>
    <rect x="230" y="18" width="48" height="82" fill="#888878"/>
    <rect x="230" y="18" width="48" height="4" fill="#aaa898"/>
    <rect x="230" y="48" width="48" height="3" fill="#aaa898"/>
    <rect x="230" y="72" width="48" height="3" fill="#aaa898"/>
    <rect x="240" y="26" width="18" height="5" rx="1" fill="#555"/>
    <rect x="243" y="27" width="12" height="3" fill="#888"/>
    <rect x="240" y="56" width="18" height="5" rx="1" fill="#555"/>
    <rect x="243" y="57" width="12" height="3" fill="#888"/>
    <rect x="240" y="78" width="18" height="5" rx="1" fill="#555"/>
    <rect x="243" y="79" width="12" height="3" fill="#888"/>
    <rect x="190" y="88" width="14" height="14" fill="#7a5020"/>
    <ellipse cx="197" cy="80" rx="12" ry="10" fill="#2a6a1a"/>
    <ellipse cx="190" cy="76" rx="7" ry="8" fill="#3a8a2a"/>
    <rect x="40" y="96" width="150" height="8" fill="#cc9966"/>
    <rect x="40" y="104" width="5" height="20" fill="#aa7744"/>
    <rect x="185" y="104" width="5" height="20" fill="#aa7744"/>`,

  dept_finance: `
    <rect x="0" y="0" width="320" height="132" fill="#c8d8c0"/>
    <rect x="0" y="104" width="320" height="28" fill="#dde8e0"/>
    <rect x="0" y="104" width="320" height="2" fill="#b0c4a8"/>
    <rect x="0" y="80" width="320" height="2" fill="#b0c4a8"/>
    <rect x="8" y="6" width="55" height="72" fill="#88ccaa" opacity=".4"/>
    <rect x="8" y="6" width="2" height="72" fill="#6a9a78"/>
    <rect x="61" y="6" width="2" height="72" fill="#6a9a78"/>
    <rect x="34" y="6" width="2" height="72" fill="#6a9a78"/>
    <rect x="8" y="6" width="55" height="2" fill="#6a9a78"/>
    <rect x="8" y="40" width="55" height="2" fill="#6a9a78"/>
    <circle cx="190" cy="40" r="38" fill="#fff" opacity=".9"/>
    <path d="M190 40 L190 2 A38 38 0 0 1 223 59 Z" fill="#1D9E75"/>
    <path d="M190 40 L223 59 A38 38 0 0 1 165 75 Z" fill="#5DCAA5"/>
    <path d="M190 40 L165 75 A38 38 0 0 1 152 14 Z" fill="#085041"/>
    <path d="M190 40 L152 14 A38 38 0 0 1 190 2 Z" fill="#9FE1CB"/>
    <rect x="262" y="10" width="50" height="72" fill="#fff" opacity=".9"/>
    <rect x="265" y="42" width="8" height="36" fill="#1D9E75"/>
    <rect x="275" y="30" width="8" height="48" fill="#085041"/>
    <rect x="285" y="22" width="8" height="56" fill="#5DCAA5"/>
    <rect x="295" y="35" width="8" height="43" fill="#1D9E75"/>
    <rect x="80" y="96" width="130" height="8" fill="#9aaa88"/>
    <rect x="80" y="104" width="5" height="20" fill="#7a8a68"/>
    <rect x="205" y="104" width="5" height="20" fill="#7a8a68"/>
    <rect x="82" y="70" width="26" height="30" rx="1" fill="#333"/>
    <rect x="83" y="71" width="24" height="8" fill="#1D9E75"/>
    <rect x="84" y="82" width="3" height="3" fill="#555"/>
    <rect x="88" y="82" width="3" height="3" fill="#555"/>
    <rect x="92" y="82" width="3" height="3" fill="#555"/>
    <rect x="84" y="87" width="3" height="3" fill="#555"/>
    <rect x="88" y="87" width="3" height="3" fill="#1D9E75"/>
    <rect x="92" y="87" width="3" height="3" fill="#555"/>`,

  dept_sales: `
    <rect x="0" y="0" width="320" height="132" fill="#2a1010"/>
    <rect x="0" y="104" width="320" height="28" fill="#1a1010"/>
    <rect x="0" y="104" width="320" height="2" fill="#2a1818"/>
    <rect x="0" y="80" width="320" height="2" fill="#1a0808"/>
    <rect x="8" y="6" width="120" height="72" fill="#333"/>
    <rect x="9" y="7" width="118" height="70" fill="#1a0808"/>
    <rect x="9" y="7" width="118" height="9" fill="#E24B4A"/>
    <rect x="10" y="8" width="116" height="7" fill="#cc2222"/>
    <rect x="10" y="18" width="24" height="56" fill="#2a1010"/>
    <rect x="10" y="18" width="24" height="4" fill="#E24B4A"/>
    <rect x="35" y="18" width="24" height="56" fill="#2a1010"/>
    <rect x="35" y="18" width="24" height="4" fill="#BA7517"/>
    <rect x="60" y="18" width="24" height="56" fill="#2a1010"/>
    <rect x="60" y="18" width="24" height="4" fill="#185FA5"/>
    <rect x="85" y="18" width="42" height="56" fill="#2a1010"/>
    <rect x="85" y="18" width="42" height="4" fill="#1D9E75"/>
    <rect x="11" y="24" width="22" height="12" rx=".5" fill="#3a1515"/>
    <rect x="11" y="38" width="22" height="12" rx=".5" fill="#3a1515"/>
    <rect x="36" y="24" width="22" height="12" rx=".5" fill="#3a1515"/>
    <rect x="61" y="24" width="22" height="12" rx=".5" fill="#3a1515"/>
    <rect x="61" y="38" width="22" height="12" rx=".5" fill="#3a1515"/>
    <rect x="86" y="24" width="38" height="12" rx=".5" fill="#3a1515"/>
    <rect x="86" y="38" width="38" height="12" rx=".5" fill="#3a1515"/>
    <rect x="155" y="8" width="155" height="72" fill="#222"/>
    <rect x="156" y="9" width="153" height="70" fill="#111"/>
    <path d="M165 16 L300 16 L278 36 L187 36 Z" fill="#E24B4A" opacity=".8"/>
    <path d="M187 36 L278 36 L260 52 L205 52 Z" fill="#BA7517" opacity=".8"/>
    <path d="M205 52 L260 52 L248 64 L217 64 Z" fill="#185FA5" opacity=".8"/>
    <rect x="222" y="64" width="18" height="12" fill="#1D9E75" opacity=".8"/>
    <rect x="40" y="96" width="210" height="8" fill="#3a1818"/>
    <rect x="40" y="104" width="5" height="20" fill="#2a1010"/>
    <rect x="245" y="104" width="5" height="20" fill="#2a1010"/>`,

  dept_marketing: `
    <rect x="0" y="0" width="320" height="132" fill="#f0d8a0"/>
    <rect x="0" y="104" width="320" height="28" fill="#3a2510"/>
    <rect x="0" y="104" width="320" height="2" fill="#5a3820"/>
    <rect x="0" y="80" width="320" height="3" fill="#e0c080"/>
    <rect x="8" y="8" width="130" height="68" fill="#e8c870"/>
    <rect x="9" y="9" width="128" height="66" fill="#ffe8a0"/>
    <rect x="11" y="11" width="22" height="20" rx="2" fill="#185FA5"/>
    <rect x="14" y="14" width="12" height="4" fill="white"/>
    <rect x="16" y="13" width="4" height="8" fill="white"/>
    <rect x="34" y="11" width="22" height="20" rx="2" fill="#E24B4A"/>
    <circle cx="45" cy="21" r="6" fill="white"/>
    <rect x="57" y="11" width="22" height="20" rx="2" fill="#333"/>
    <path d="M59 22 L63 14 L67 22 L71 14 L73 22" fill="none" stroke="white" stroke-width="1.5"/>
    <rect x="80" y="11" width="22" height="20" rx="2" fill="#1D9E75"/>
    <circle cx="91" cy="21" r="6" fill="white" opacity=".8"/>
    <rect x="103" y="11" width="22" height="20" rx="2" fill="#E24B4A"/>
    <rect x="11" y="33" width="55" height="28" fill="#fff" opacity=".8"/>
    <path d="M14 58 L22 46 L32 50 L44 38 L54 42 L62 34" fill="none" stroke="#BA7517" stroke-width="2"/>
    <circle cx="22" cy="46" r="2" fill="#E24B4A"/>
    <circle cx="44" cy="38" r="2" fill="#BA7517"/>
    <circle cx="62" cy="34" r="2" fill="#1D9E75"/>
    <rect x="67" y="33" width="9" height="9" fill="#E24B4A"/>
    <rect x="77" y="33" width="9" height="9" fill="#185FA5"/>
    <rect x="87" y="33" width="9" height="9" fill="#1D9E75"/>
    <rect x="97" y="33" width="9" height="9" fill="#BA7517"/>
    <rect x="67" y="43" width="9" height="9" fill="#534AB7"/>
    <rect x="77" y="43" width="9" height="9" fill="#D4537E"/>
    <rect x="155" y="14" width="80" height="55" fill="#fff" opacity=".85"/>
    <path d="M168 60 L168 28 L198 18 L198 70 Z" fill="#BA7517"/>
    <rect x="158" y="38" width="10" height="18" fill="#5a3010"/>
    <path d="M198 32 Q216 36 216 50 Q216 64 198 68" fill="none" stroke="#EF9F27" stroke-width="3"/>
    <rect x="40" y="96" width="210" height="8" fill="#cc8822"/>
    <rect x="40" y="104" width="5" height="20" fill="#aa6610"/>
    <rect x="245" y="104" width="5" height="20" fill="#aa6610"/>`,

  dept_operations: `
    <rect x="0" y="0" width="320" height="132" fill="#3a4a2a"/>
    <rect x="0" y="104" width="320" height="28" fill="#888878"/>
    <rect x="0" y="104" width="320" height="2" fill="#aaa898"/>
    <rect x="0" y="80" width="320" height="3" fill="#2a3a1a"/>
    <rect x="188" y="6" width="130" height="98" fill="#5a5040"/>
    <rect x="188" y="6" width="130" height="3" fill="#7a7060"/>
    <rect x="188" y="34" width="130" height="3" fill="#7a7060"/>
    <rect x="188" y="60" width="130" height="3" fill="#7a7060"/>
    <rect x="190" y="10" width="22" height="22" fill="#cc9944"/>
    <rect x="214" y="10" width="26" height="22" fill="#aa7722"/>
    <rect x="242" y="10" width="26" height="22" fill="#cc9944"/>
    <rect x="270" y="10" width="44" height="22" fill="#aa7722"/>
    <rect x="190" y="38" width="20" height="20" fill="#aa7722"/>
    <rect x="212" y="38" width="28" height="20" fill="#cc9944"/>
    <rect x="242" y="38" width="30" height="20" fill="#aa7722"/>
    <rect x="274" y="38" width="40" height="20" fill="#cc9944"/>
    <rect x="8" y="8" width="172" height="70" fill="#2a3a1a"/>
    <rect x="9" y="9" width="170" height="68" fill="#1a2a0a"/>
    <rect x="14" y="16" width="30" height="16" rx="1" fill="#3B6D11"/>
    <rect x="15" y="17" width="28" height="14" fill="#639922"/>
    <rect x="52" y="16" width="30" height="16" rx="1" fill="#3B6D11"/>
    <rect x="53" y="17" width="28" height="14" fill="#639922"/>
    <rect x="90" y="16" width="30" height="16" rx="1" fill="#3B6D11"/>
    <rect x="91" y="17" width="28" height="14" fill="#639922"/>
    <rect x="132" y="16" width="40" height="16" rx="1" fill="#3B6D11"/>
    <rect x="133" y="17" width="38" height="14" fill="#639922"/>
    <rect x="44" y="24" width="8" height="3" fill="#97C459"/>
    <rect x="82" y="24" width="8" height="3" fill="#97C459"/>
    <rect x="122" y="24" width="10" height="3" fill="#97C459"/>
    <polygon points="51,23 51,27 54,25" fill="#97C459"/>
    <polygon points="89,23 89,27 92,25" fill="#97C459"/>
    <polygon points="131,23 131,27 134,25" fill="#97C459"/>
    <polygon points="42,52 28,60 42,68 56,60" fill="#BA7517"/>
    <polygon points="42,54 30,60 42,66 54,60" fill="#EF9F27"/>
    <rect x="56" y="57" width="50" height="6" fill="#97C459"/>
    <rect x="106" y="46" width="60" height="14" rx="1" fill="#1D9E75"/>
    <rect x="107" y="47" width="58" height="12" fill="#5DCAA5"/>
    <rect x="8" y="90" width="100" height="8" fill="#4a5a3a"/>
    <rect x="8" y="98" width="5" height="20" fill="#3a4a2a"/>
    <rect x="103" y="98" width="5" height="20" fill="#3a4a2a"/>`,

  dept_it: `
    <rect x="0" y="0" width="320" height="132" fill="#1a1535"/>
    <rect x="0" y="104" width="320" height="28" fill="#111122"/>
    <rect x="0" y="104" width="320" height="2" fill="#222233"/>
    <rect x="0" y="80" width="320" height="2" fill="#100f22"/>
    <rect x="228" y="6" width="88" height="98" fill="#1a1a2a"/>
    <rect x="228" y="6" width="88" height="4" fill="#2a2a3a"/>
    <rect x="230" y="12" width="84" height="9" fill="#222244"/>
    <rect x="310" y="13" width="5" height="7" fill="#1D9E75"/>
    <rect x="230" y="23" width="84" height="9" fill="#222244"/>
    <rect x="310" y="24" width="5" height="7" fill="#1D9E75"/>
    <rect x="230" y="34" width="84" height="9" fill="#222244"/>
    <rect x="310" y="35" width="5" height="7" fill="#E24B4A"/>
    <rect x="230" y="45" width="84" height="9" fill="#222244"/>
    <rect x="310" y="46" width="5" height="7" fill="#1D9E75"/>
    <rect x="230" y="56" width="84" height="9" fill="#222244"/>
    <rect x="310" y="57" width="5" height="7" fill="#BA7517"/>
    <rect x="230" y="67" width="84" height="9" fill="#222244"/>
    <rect x="310" y="68" width="5" height="7" fill="#1D9E75"/>
    <rect x="230" y="78" width="84" height="9" fill="#222244"/>
    <rect x="310" y="79" width="5" height="7" fill="#1D9E75"/>
    <rect x="230" y="12" width="4" height="9" fill="#185FA5"/>
    <rect x="230" y="23" width="4" height="9" fill="#534AB7"/>
    <rect x="230" y="34" width="4" height="9" fill="#E24B4A"/>
    <rect x="230" y="45" width="4" height="9" fill="#185FA5"/>
    <rect x="230" y="56" width="4" height="9" fill="#534AB7"/>
    <rect x="8" y="6" width="212" height="70" fill="#111122"/>
    <rect x="9" y="7" width="210" height="68" fill="#0a0a18"/>
    <path d="M50 18 Q50 8 68 8 Q86 8 86 18" fill="none" stroke="#5F5E5A" stroke-width="4"/>
    <rect x="44" y="18" width="8" height="14" rx="2" fill="#444441"/>
    <rect x="82" y="18" width="8" height="14" rx="2" fill="#444441"/>
    <rect x="60" y="34" width="12" height="5" rx="1" fill="#5F5E5A"/>
    <rect x="66" y="39" width="4" height="9" fill="#888780"/>
    <rect x="62" y="48" width="12" height="3" rx="1" fill="#5F5E5A"/>
    <circle cx="135" cy="34" r="18" fill="#1a2a4a"/>
    <circle cx="135" cy="34" r="14" fill="#185FA5" opacity=".6"/>
    <rect x="128" y="30" width="6" height="8" fill="#85B7EB"/>
    <polygon points="122,30 122,42 134,36" fill="#B5D4F4"/>
    <path d="M160 16 Q160 8 170 8 Q180 8 180 16" fill="none" stroke="#7F77DD" stroke-width="2"/>
    <rect x="158" y="16" width="5" height="8" rx="1" fill="#534AB7"/>
    <rect x="177" y="16" width="5" height="8" rx="1" fill="#534AB7"/>
    <rect x="168" y="28" width="8" height="3" fill="#7F77DD"/>
    <rect x="35" y="90" width="185" height="8" fill="#1a1a2a"/>
    <rect x="35" y="98" width="5" height="20" fill="#111122"/>
    <rect x="215" y="98" width="5" height="20" fill="#111122"/>`,

  dept_rd: `
    <rect x="0" y="0" width="320" height="132" fill="#e0f0ec"/>
    <rect x="0" y="104" width="320" height="28" fill="#e8e8f0"/>
    <rect x="0" y="104" width="320" height="2" fill="#ccccdd"/>
    <rect x="0" y="80" width="320" height="2" fill="#b8ddd2"/>
    <rect x="8" y="6" width="140" height="72" fill="#ddd"/>
    <rect x="9" y="7" width="138" height="70" fill="#f8f8f8"/>
    <circle cx="50" cy="28" r="8" fill="#185FA5" opacity=".8"/>
    <circle cx="82" cy="20" r="7" fill="#E24B4A" opacity=".8"/>
    <circle cx="108" cy="32" r="8" fill="#1D9E75" opacity=".8"/>
    <circle cx="75" cy="50" r="7" fill="#BA7517" opacity=".8"/>
    <circle cx="50" cy="60" r="6" fill="#534AB7" opacity=".8"/>
    <circle cx="110" cy="58" r="6" fill="#D4537E" opacity=".8"/>
    <line x1="50" y1="28" x2="82" y2="20" stroke="#555" stroke-width="2"/>
    <line x1="82" y1="20" x2="108" y2="32" stroke="#555" stroke-width="2"/>
    <line x1="108" y1="32" x2="75" y2="50" stroke="#555" stroke-width="1.5"/>
    <line x1="75" y1="50" x2="50" y2="60" stroke="#555" stroke-width="1.5"/>
    <line x1="50" y1="60" x2="110" y2="58" stroke="#555" stroke-width="1.5"/>
    <circle cx="128" cy="24" r="14" fill="#ffee88" opacity=".7"/>
    <circle cx="128" cy="24" r="11" fill="#ffdd44" opacity=".8"/>
    <rect x="125" y="34" width="6" height="3" fill="#cc9900"/>
    <rect x="8" y="78" width="140" height="4" fill="#bbb"/>
    <rect x="198" y="6" width="120" height="98" fill="#c8d8cc"/>
    <rect x="198" y="6" width="120" height="2" fill="#a0b8aa"/>
    <rect x="198" y="36" width="120" height="2" fill="#a0b8aa"/>
    <rect x="198" y="62" width="120" height="2" fill="#a0b8aa"/>
    <rect x="200" y="10" width="10" height="22" rx="1" fill="#88ccff" opacity=".8"/>
    <rect x="200" y="10" width="10" height="5" fill="#555" opacity=".8"/>
    <rect x="212" y="13" width="14" height="18" rx="7" fill="#ffaaaa" opacity=".8"/>
    <rect x="212" y="13" width="14" height="4" fill="#555" opacity=".8"/>
    <rect x="228" y="10" width="10" height="22" rx="1" fill="#aaffaa" opacity=".8"/>
    <rect x="228" y="10" width="10" height="5" fill="#555" opacity=".8"/>
    <rect x="240" y="11" width="12" height="20" rx="6" fill="#ffeeaa" opacity=".8"/>
    <rect x="240" y="11" width="12" height="4" fill="#555" opacity=".8"/>
    <rect x="254" y="10" width="10" height="22" rx="1" fill="#ccaaff" opacity=".8"/>
    <rect x="254" y="10" width="10" height="5" fill="#555" opacity=".8"/>
    <rect x="258" y="36" width="20" height="26" fill="#888"/>
    <rect x="264" y="24" width="8" height="18" fill="#aaa"/>
    <rect x="260" y="22" width="16" height="5" fill="#888"/>
    <rect x="266" y="18" width="4" height="8" fill="#777"/>
    <rect x="8" y="90" width="170" height="8" fill="#a0bbb0"/>
    <rect x="8" y="98" width="5" height="20" fill="#889a8a"/>
    <rect x="173" y="98" width="5" height="20" fill="#889a8a"/>`,

  dept_purchasing: `
    <rect x="0" y="0" width="320" height="132" fill="#d4b888"/>
    <rect x="0" y="104" width="320" height="28" fill="#4a2a0a"/>
    <rect x="0" y="104" width="320" height="2" fill="#6a3a18"/>
    <rect x="0" y="80" width="320" height="2" fill="#b89860"/>
    <rect x="8" y="8" width="100" height="70" fill="#c8a060"/>
    <rect x="9" y="9" width="98" height="68" fill="#e8d0a0"/>
    <rect x="9" y="9" width="98" height="10" fill="#993C1D"/>
    <rect x="10" y="10" width="96" height="8" fill="#aa4422"/>
    <rect x="11" y="21" width="94" height="10" fill="#fff8e8" opacity=".8"/>
    <rect x="12" y="23" width="10" height="6" fill="#1D9E75"/>
    <rect x="24" y="24" width="60" height="3" fill="#993C1D"/>
    <rect x="11" y="33" width="94" height="10" fill="#fff8e8" opacity=".8"/>
    <rect x="12" y="35" width="10" height="6" fill="#E24B4A"/>
    <rect x="24" y="36" width="60" height="3" fill="#993C1D"/>
    <rect x="11" y="45" width="94" height="10" fill="#fff8e8" opacity=".8"/>
    <rect x="12" y="47" width="10" height="6" fill="#185FA5"/>
    <rect x="24" y="48" width="60" height="3" fill="#993C1D"/>
    <rect x="11" y="57" width="94" height="10" fill="#fff8e8" opacity=".8"/>
    <rect x="12" y="59" width="10" height="6" fill="#1D9E75"/>
    <rect x="24" y="60" width="60" height="3" fill="#993C1D"/>
    <rect x="130" y="8" width="182" height="70" fill="#c8a060"/>
    <rect x="131" y="9" width="180" height="68" fill="#e8d0a0"/>
    <path d="M144 36 L152 36 L164 62 L218 62 L224 40 L158 40" fill="none" stroke="#993C1D" stroke-width="3"/>
    <circle cx="158" cy="72" r="6" fill="#993C1D"/>
    <circle cx="214" cy="72" r="6" fill="#993C1D"/>
    <rect x="144" y="28" width="8" height="8" fill="#993C1D"/>
    <rect x="145" y="29" width="6" height="6" fill="#F0997B"/>
    <rect x="240" y="18" width="32" height="24" fill="#e8d0a0"/>
    <path d="M244 30 Q248 22 254 26 L260 30 Q264 22 268 30" fill="none" stroke="#993C1D" stroke-width="2"/>
    <rect x="242" y="30" width="6" height="10" fill="#F5C4B3"/>
    <rect x="264" y="30" width="6" height="10" fill="#F5C4B3"/>
    <rect x="248" y="32" width="18" height="8" fill="#F5C4B3"/>
    <rect x="242" y="70" width="70" height="18" fill="#cc9944"/>
    <rect x="250" y="62" width="54" height="8" fill="#aa7722"/>
    <rect x="258" y="56" width="38" height="6" fill="#cc9944"/>
    <rect x="10" y="96" width="200" height="8" fill="#9a7040"/>
    <rect x="10" y="104" width="5" height="20" fill="#7a5020"/>
    <rect x="205" y="104" width="5" height="20" fill="#7a5020"/>`,

  dept_cs: `
    <rect x="0" y="0" width="320" height="132" fill="#c8ccd8"/>
    <rect x="0" y="104" width="320" height="28" fill="#888880"/>
    <rect x="0" y="104" width="320" height="2" fill="#aaa898"/>
    <rect x="0" y="80" width="320" height="2" fill="#a8aab8"/>
    <rect x="6" y="6" width="70" height="70" fill="#88aacc" opacity=".35"/>
    <rect x="6" y="6" width="2" height="70" fill="#6a88aa"/>
    <rect x="74" y="6" width="2" height="70" fill="#6a88aa"/>
    <rect x="40" y="6" width="2" height="70" fill="#6a88aa"/>
    <rect x="6" y="6" width="70" height="2" fill="#6a88aa"/>
    <rect x="6" y="40" width="70" height="2" fill="#6a88aa"/>
    <rect x="8" y="10" width="10" height="28" fill="#5a7890" opacity=".6"/>
    <rect x="22" y="14" width="8" height="24" fill="#5a7890" opacity=".6"/>
    <rect x="44" y="8" width="10" height="30" fill="#5a7890" opacity=".6"/>
    <rect x="56" y="12" width="10" height="26" fill="#5a7890" opacity=".6"/>
    <rect x="88" y="6" width="160" height="72" fill="#e8eaf0"/>
    <rect x="89" y="7" width="158" height="70" fill="#f0f2f8"/>
    <rect x="91" y="12" width="68" height="12" rx="2" fill="#5F5E5A"/>
    <rect x="92" y="13" width="66" height="10" fill="#888880"/>
    <rect x="93" y="14" width="50" height="3" fill="#f0f0f0"/>
    <rect x="93" y="18" width="36" height="2" fill="#e0e0e0"/>
    <rect x="130" y="26" width="68" height="12" rx="2" fill="#185FA5"/>
    <rect x="131" y="27" width="66" height="10" fill="#378ADD"/>
    <rect x="132" y="28" width="50" height="3" fill="#ffffff"/>
    <rect x="91" y="40" width="78" height="12" rx="2" fill="#5F5E5A"/>
    <rect x="92" y="41" width="76" height="10" fill="#888880"/>
    <rect x="93" y="42" width="58" height="3" fill="#f0f0f0"/>
    <rect x="118" y="54" width="60" height="12" rx="2" fill="#1D9E75"/>
    <rect x="119" y="55" width="58" height="10" fill="#5DCAA5"/>
    <rect x="120" y="56" width="40" height="3" fill="#ffffff"/>
    <circle cx="180" cy="58" r="5" fill="#ffcc00"/>
    <circle cx="192" cy="62" r="5" fill="#ffcc00"/>
    <circle cx="204" cy="58" r="5" fill="#E24B4A"/>
    <rect x="258" y="6" width="58" height="72" fill="#e8eaf0"/>
    <rect x="259" y="7" width="56" height="70" fill="#f0f2f8"/>
    <path d="M288 18 Q288 8 298 8 Q308 8 308 18" fill="none" stroke="#5F5E5A" stroke-width="4"/>
    <rect x="284" y="18" width="7" height="12" rx="2" fill="#444441"/>
    <rect x="305" y="18" width="7" height="12" rx="2" fill="#444441"/>
    <rect x="292" y="34" width="12" height="5" rx="1" fill="#5F5E5A"/>
    <rect x="296" y="39" width="4" height="8" fill="#888780"/>
    <circle cx="268" cy="52" r="5" fill="#E24B4A"/>
    <circle cx="278" cy="48" r="5" fill="#BA7517"/>
    <circle cx="288" cy="50" r="5" fill="#1D9E75"/>
    <rect x="5" y="96" width="315" height="8" fill="#888880"/>
    <rect x="5" y="104" width="5" height="20" fill="#666660"/>
    <rect x="314" y="104" width="5" height="20" fill="#666660"/>`,
};

/* Renders a department room scene with the animated PixelCharacter standing inside it.
   state: idle | walking | waving | working — passed straight to PixelCharacter. */
function DeptRoom({ deptId, state = "idle", charSize = 42, className = "" }) {
  const rid = (typeof charId === "function") ? charId(deptId) : deptId;
  const bg = DEPT_ROOMS[rid];
  return (
    <span className={"dept-room " + className}>
      {bg && (
        <svg
          className="dept-room-bg"
          viewBox="0 0 320 132"
          shapeRendering="crispEdges"
          preserveAspectRatio="xMidYMax slice"
          dangerouslySetInnerHTML={{ __html: bg }}
        />
      )}
      <span className="dept-room-char">
        <PixelCharacter deptId={deptId} size={charSize} state={state} animated />
      </span>
    </span>
  );
}

Object.assign(window, { DeptRoom, DEPT_ROOMS });
