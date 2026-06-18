// PixelCharacters.tsx
// Pixel Art Characters for Visual Enterprise AI Workspace Simulator
// 10 departments · CSS keyframe animations · shape-rendering crispEdges
// Usage: <PixelCharacter deptId="dept_hr" size={56} state="idle" />

import React, { useState } from 'react'

// ─── Animation states ───────────────────────────────────────────────────────
// 'idle'     → gentle bob up/down
// 'walking'  → triggered on hover, legs alternate
// 'waving'   → triggered on selected, arm raises
// 'working'  → typing/working pose on canvas drop
// ─────────────────────────────────────────────────────────────────────────────

export type CharacterState = 'idle' | 'walking' | 'waving' | 'working'
export type DeptId =
  | 'dept_management' | 'dept_hr' | 'dept_finance' | 'dept_sales'
  | 'dept_marketing'  | 'dept_operations' | 'dept_it' | 'dept_rd'
  | 'dept_purchasing' | 'dept_cs'

interface PixelCharacterProps {
  deptId: DeptId
  size?: number          // rendered height in px (width auto, ~70% of height)
  state?: CharacterState
  animated?: boolean     // false = static for screenshots/export
  onClick?: () => void
  className?: string
}

// ─── CSS keyframes (inject once via <style> or global CSS) ───────────────────
export const PIXEL_CHARACTER_CSS = `
  @keyframes px-bob {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-3px); }
  }
  @keyframes px-walk-body {
    0%, 100% { transform: translateY(0px); }
    25%      { transform: translateY(-2px); }
    75%      { transform: translateY(-1px); }
  }
  @keyframes px-leg-l {
    0%, 100% { transform: rotate(0deg); }
    50%      { transform: rotate(22deg); }
  }
  @keyframes px-leg-r {
    0%, 100% { transform: rotate(0deg); }
    50%      { transform: rotate(-22deg); }
  }
  @keyframes px-wave {
    0%, 100% { transform: rotate(0deg); }
    25%      { transform: rotate(-30deg); }
    75%      { transform: rotate(15deg); }
  }
  @keyframes px-type {
    0%, 100% { transform: translateY(0px); }
    33%      { transform: translateY(-1px); }
    66%      { transform: translateY(1px); }
  }
  @keyframes px-blink {
    0%, 88%, 100% { transform: scaleY(1); }
    92%           { transform: scaleY(0.08); }
  }
  @keyframes px-shadow-pulse {
    0%, 100% { transform: scaleX(1); opacity: 0.25; }
    50%      { transform: scaleX(0.7); opacity: 0.15; }
  }

  .px-char-root { cursor: pointer; display: inline-block; user-select: none; }
  .px-char-root:focus-visible { outline: 2px solid #185FA5; outline-offset: 4px; border-radius: 4px; }

  /* idle — body bobs */
  .px-state-idle   .px-body  { animation: px-bob 1.4s ease-in-out infinite; }
  .px-state-idle   .px-eyes  { animation: px-blink 4s ease-in-out infinite; }
  .px-state-idle   .px-shadow{ animation: px-shadow-pulse 1.4s ease-in-out infinite; }

  /* walking — body + legs alternate */
  .px-state-walking .px-body  { animation: px-walk-body 0.45s linear infinite; }
  .px-state-walking .px-leg-l { animation: px-leg-l 0.45s linear infinite; transform-origin: top center; }
  .px-state-walking .px-leg-r { animation: px-leg-r 0.45s linear infinite; transform-origin: top center; }
  .px-state-walking .px-shadow{ animation: px-shadow-pulse 0.45s linear infinite; }

  /* waving — right arm swings */
  .px-state-waving .px-body  { animation: px-bob 1.2s ease-in-out infinite; }
  .px-state-waving .px-arm-r { animation: px-wave 0.7s ease-in-out infinite; transform-origin: 80% 10%; }
  .px-state-waving .px-shadow{ animation: px-shadow-pulse 1.2s ease-in-out infinite; }

  /* working — head bobs like typing */
  .px-state-working .px-body  { animation: px-type 0.5s ease-in-out infinite; }
  .px-state-working .px-shadow{ animation: px-shadow-pulse 0.5s ease-in-out infinite; }
`

// ─── Character pixel data ────────────────────────────────────────────────────
// Each character is drawn on a 10×16 pixel grid (viewBox="0 0 10 16")
// Layers: shadow / legs / body / torso / arms / head / hair / accessory / eyes / mouth
// Colors: hardcoded per character, skin tones share a common value

const SKIN = '#F5C5A0'
const SKIN_DARK = '#D4956A'

interface CharDef {
  label: string
  labelEn: string
  accentColor: string  // banner / badge color
  description: string  // tooltip / aria-label
  shadow: React.ReactElement
  legs: React.ReactElement
  body: React.ReactElement   // torso
  armL: React.ReactElement
  armR: React.ReactElement
  head: React.ReactElement
  hair: React.ReactElement
  eyes: React.ReactElement
  mouth: React.ReactElement
  accessory?: React.ReactElement  // hat, glasses, hard-hat, headset…
}

// Helper — pixel rect shorthand
const P = (x:number, y:number, w:number, h:number, fill:string, key?:string) =>
  <rect key={key ?? `${x}${y}`} x={x} y={y} width={w} height={h} fill={fill}/>

const CHARACTERS: Record<DeptId, CharDef> = {

  // ── 1. Management — executive in navy suit, arms crossed ─────────────────
  dept_management: {
    label: 'แผนกบริหาร', labelEn: 'Management',
    accentColor: '#185FA5', description: 'ผู้บริหาร สวมสูทกรมท่า ท่าทางมั่นใจ',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#0c2a4a','ll')}{P(5,11,1,4,'#1a3a6a','lr')}{P(3,14,2,1,'#222','sl')}{P(5,14,2,1,'#222','sr')}</g>,
    body:      <g>{P(2,6,6,5,'#1a3a6a','suit')}{P(2,6,6,1,'#0c2a4a','lapel')}{P(4,7,2,3,'#ffffff','shirt')}{P(4,7,2,1,'#eeeeee','tie-top')}{P(4,8,1,2,'#cc2222','tie')}</g>,
    armL:      <g className="px-arm-l">{P(1,7,1,4,SKIN,'alb')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,1,4,SKIN,'arb')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,1,6,2,'#1a1a1a','hair')}{P(2,2,1,1,'#2a2a2a','sl')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#3a2010','el')}{P(6,3,1,1,'#3a2010','er')}</g>,
    mouth:     <g>{P(4,5,2,1,'#cc7755','m')}</g>,
    accessory: <g>{P(4,7,2,1,'#cccc44','pin')}</g>,
  },

  // ── 2. HR — manager in pink blazer, clipboard ────────────────────────────
  dept_hr: {
    label: 'ฝ่ายทรัพยากรบุคคล', labelEn: 'HR',
    accentColor: '#D4537E', description: 'ผู้จัดการ HR สวมเสื้อสีชมพู ถือ clipboard',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#602040','ll')}{P(5,11,1,4,'#602040','lr')}{P(3,14,2,1,'#cc99aa','sl')}{P(5,14,2,1,'#cc99aa','sr')}</g>,
    body:      <g>{P(2,6,6,5,'#c04060','body')}{P(2,6,6,1,'#e06080','collar')}{P(4,7,2,3,'#fff0f4','inner')}</g>,
    armL:      <g className="px-arm-l">{P(1,7,1,4,SKIN,'al')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,2,3,SKIN,'ar')}{P(8,8,2,3,'#f5f5e0','clip')}{P(8,8,2,1,'#ccaa44','clipbar')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,0,6,2,'#8B4513','hair-top')}{P(2,1,6,1,'#6a3410','hair2')}{P(1,1,1,3,'#8B4513','hair-l')}{P(8,1,1,3,'#8B4513','hair-r')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#3a2010','el')}{P(6,3,1,1,'#3a2010','er')}</g>,
    mouth:     <g>{P(4,5,2,1,'#ff8888','m')}</g>,
  },

  // ── 3. Finance — accountant in teal vest, calculator ────────────────────
  dept_finance: {
    label: 'ฝ่ายการเงินและบัญชี', labelEn: 'Finance',
    accentColor: '#1D9E75', description: 'นักบัญชี สวมเสื้อกั๊กสีเขียว ถือเครื่องคิดเลข',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#0d3a22','ll')}{P(5,11,1,4,'#155a35','lr')}{P(3,14,2,1,'#333','sl')}{P(5,14,2,1,'#333','sr')}</g>,
    body:      <g>{P(2,6,6,5,'#155a35','body')}{P(3,6,4,5,'#1D9E75','vest')}{P(4,7,2,3,'#fff8f0','shirt')}</g>,
    armL:      <g className="px-arm-l">{P(1,7,1,4,SKIN,'al')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,2,4,SKIN,'ar')}{P(8,9,2,2,'#dddddd','calc')}{P(9,9,1,1,'#aaaaaa','calcbtn')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,1,6,2,'#333333','hair')}{P(8,1,1,1,'#444','side')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#222','el')}{P(6,3,1,1,'#222','er')}{P(2,3,2,1,'#555588','glasses-l')}{P(5,3,2,1,'#555588','glasses-r')}{P(4,3,1,1,'#555588','bridge')}</g>,
    mouth:     <g>{P(4,5,2,1,'#cc7755','m')}</g>,
  },

  // ── 4. Sales — rep in red jacket, briefcase ──────────────────────────────
  dept_sales: {
    label: 'ฝ่ายขาย', labelEn: 'Sales',
    accentColor: '#E24B4A', description: 'พนักงานขาย สวมแจ็กเก็ตแดง ถือกระเป๋าเอกสาร',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#5a0a0a','ll')}{P(5,11,1,4,'#7a1010','lr')}{P(3,14,2,1,'#222','sl')}{P(5,14,2,1,'#222','sr')}</g>,
    body:      <g>{P(2,6,6,5,'#8a1010','body')}{P(2,6,6,1,'#aa2020','collar')}{P(4,7,2,3,'#ffffff','shirt')}{P(4,8,1,2,'#1a1a7a','tie')}</g>,
    armL:      <g className="px-arm-l">{P(1,7,1,4,SKIN,'al')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,1,4,SKIN,'ar')}{P(8,10,2,3,'#5a3a10','bag')}{P(8,10,2,1,'#7a5a20','bagTop')}{P(9,10,1,1,'#cc9944','handle')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,1,6,2,'#4a2a0a','hair')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#3a2010','el')}{P(6,3,1,1,'#3a2010','er')}</g>,
    mouth:     <g>{P(4,5,2,1,'#ff8888','m')}</g>,
    accessory: <g>{P(3,5,4,1,'#cc8844','smile-wide')}</g>,
  },

  // ── 5. Marketing — creative with orange hoodie, tablet ───────────────────
  dept_marketing: {
    label: 'ฝ่ายการตลาด', labelEn: 'Marketing',
    accentColor: '#BA7517', description: 'นักการตลาด สวมฮู้ดดี้สีส้ม ถือแท็บเล็ต',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#4a2a04','ll')}{P(5,11,1,4,'#7a4a08','lr')}{P(3,14,2,1,'#664422','sl')}{P(5,14,2,1,'#664422','sr')}</g>,
    body:      <g>{P(1,6,8,5,'#7a4a08','body')}{P(1,6,8,1,'#EF9F27','hood-rim')}{P(1,6,3,5,'#6a3a05','body-l')}{P(6,6,3,5,'#6a3a05','body-r')}{P(3,6,4,5,'#BA7517','center')}</g>,
    armL:      <g className="px-arm-l">{P(0,7,2,4,SKIN,'al')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,2,4,SKIN,'ar')}{P(8,9,2,3,'#111111','tablet')}{P(8,9,2,1,'#555555','tablet-top')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,0,6,3,'#cc6600','hair')}{P(1,1,1,2,'#dd7700','side')}{P(8,1,1,2,'#dd7700','side-r')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#3a2010','el')}{P(6,3,1,1,'#3a2010','er')}</g>,
    mouth:     <g>{P(4,5,2,1,'#cc8855','m')}</g>,
  },

  // ── 6. Operations — engineer in green uniform, hard hat ──────────────────
  dept_operations: {
    label: 'ฝ่ายปฏิบัติการ', labelEn: 'Operations',
    accentColor: '#639922', description: 'วิศวกร สวมชุดสีเขียว หมวกนิรภัยสีเหลือง',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#1a3a05','ll')}{P(5,11,1,4,'#2a5a10','lr')}{P(3,14,2,1,'#333','sl')}{P(5,14,2,1,'#333','sr')}</g>,
    body:      <g>{P(2,6,6,5,'#3a5a10','body')}{P(2,6,6,1,'#5a8a20','collar')}{P(3,8,4,2,'#ffcc44','vest')}</g>,
    armL:      <g className="px-arm-l">{P(1,7,1,4,SKIN,'al')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,1,4,SKIN,'ar')}{P(8,9,2,2,'#dddddd','clipboard')}{P(8,9,2,1,'#888','clipline')}</g>,
    head:      <g>{P(2,2,6,5,SKIN,'head')}</g>,
    hair:      <g></g>,
    eyes:      <g className="px-eyes">{P(3,4,1,1,'#3a2010','el')}{P(6,4,1,1,'#3a2010','er')}</g>,
    mouth:     <g>{P(4,6,2,1,'#cc7755','m')}</g>,
    accessory: <g>{P(1,1,8,2,'#ffcc00','hat-brim')}{P(2,0,6,2,'#ffdd22','hat-top')}{P(1,2,8,1,'#cc9900','hat-band')}</g>,
  },

  // ── 7. IT — dev with glasses, purple hoodie, laptop ──────────────────────
  dept_it: {
    label: 'ฝ่ายไอที', labelEn: 'IT',
    accentColor: '#534AB7', description: 'นักพัฒนา สวมฮู้ดดี้สีม่วง แว่นตา ถือแล็ปท็อป',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#1a1a5a','ll')}{P(5,11,1,4,'#2a2a7a','lr')}{P(3,14,2,1,'#555','sl')}{P(5,14,2,1,'#555','sr')}</g>,
    body:      <g>{P(1,6,8,5,'#2a2a7a','body')}{P(2,6,6,1,'#534AB7','collar')}{P(4,7,2,3,'#111133','inner')}</g>,
    armL:      <g className="px-arm-l">{P(0,7,2,5,SKIN,'al')}{P(0,10,3,3,'#333344','laptop-base')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,2,5,SKIN,'ar')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,0,6,2,'#222244','hair')}{P(1,1,1,1,'#333366','side')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#333388','el')}{P(6,3,1,1,'#333388','er')}{P(2,3,2,1,'#7F77DD','gl')}{P(5,3,2,1,'#7F77DD','gr')}{P(4,3,1,1,'#534AB7','bridge')}</g>,
    mouth:     <g>{P(4,5,2,1,'#aaaaaa','m')}</g>,
    accessory: <g>{P(0,10,4,2,'#111122','laptop')}{P(0,11,4,1,'#88aaff','screen')}</g>,
  },

  // ── 8. R&D — researcher in white lab coat, microscope ────────────────────
  dept_rd: {
    label: 'ฝ่ายวิจัยและพัฒนา', labelEn: 'R&D',
    accentColor: '#0F6E56', description: 'นักวิทยาศาสตร์ สวมเสื้อกาวน์ขาว ถือ clipboard',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#555580','ll')}{P(5,11,1,4,'#555580','lr')}{P(3,14,2,1,'#222','sl')}{P(5,14,2,1,'#222','sr')}</g>,
    body:      <g>{P(2,6,6,5,'#e8e8f0','coat')}{P(2,6,6,1,'#ddddee','collar')}{P(4,7,2,3,'#c0d8ff','inner')}{P(3,9,1,1,'#1D9E75','badge')}</g>,
    armL:      <g className="px-arm-l">{P(1,7,1,4,'#e8e8f0','al')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,2,4,SKIN,'ar')}{P(8,9,2,3,'#f5f5e0','board')}{P(8,9,2,1,'#ccaa44','clip')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,1,6,2,'#333333','hair')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#222222','el')}{P(6,3,1,1,'#222222','er')}</g>,
    mouth:     <g>{P(4,5,2,1,'#cc7755','m')}</g>,
    accessory: <g>{P(2,3,2,1,'#88aacc','gl')}{P(5,3,2,1,'#88aacc','gr')}{P(4,3,1,1,'#88aacc','bridge')}</g>,
  },

  // ── 9. Purchasing — manager in brown vest, holding PO list ───────────────
  dept_purchasing: {
    label: 'ฝ่ายจัดซื้อ', labelEn: 'Purchasing',
    accentColor: '#993C1D', description: 'ผู้จัดการจัดซื้อ สวมเสื้อกั๊กสีน้ำตาล ถือใบสั่งซื้อ',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#3a1005','ll')}{P(5,11,1,4,'#5a2010','lr')}{P(3,14,2,1,'#222','sl')}{P(5,14,2,1,'#222','sr')}</g>,
    body:      <g>{P(2,6,6,5,'#7a4a1a','body')}{P(3,6,4,5,'#993C1D','vest')}{P(4,7,2,3,'#fff8f0','shirt')}</g>,
    armL:      <g className="px-arm-l">{P(1,7,1,4,SKIN,'al')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,2,5,SKIN,'ar')}{P(7,10,3,4,'#f5f5e0','po')}{P(7,10,3,1,'#cccc99','po-top')}{P(8,11,1,1,'#aaa','line1')}{P(8,12,1,1,'#aaa','line2')}{P(8,13,1,1,'#aaa','line3')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,1,6,2,'#2a1a0a','hair')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#3a2010','el')}{P(6,3,1,1,'#3a2010','er')}</g>,
    mouth:     <g>{P(4,5,2,1,'#cc7755','m')}</g>,
  },

  // ── 10. Customer Service — agent in gray uniform, headset ────────────────
  dept_cs: {
    label: 'ฝ่ายบริการลูกค้า', labelEn: 'Customer Service',
    accentColor: '#5F5E5A', description: 'เจ้าหน้าที่ Call Center สวมชุดเทา ใส่หูฟัง',
    shadow:    <ellipse cx="5" cy="15.5" rx="3" ry="0.6" fill="#00000033"/>,
    legs:      <g className="px-legs">{P(3,11,1,4,'#2a2a3a','ll')}{P(5,11,1,4,'#3a3a4a','lr')}{P(3,14,2,1,'#222','sl')}{P(5,14,2,1,'#222','sr')}</g>,
    body:      <g>{P(2,6,6,5,'#3a3a4a','body')}{P(2,6,6,1,'#5a5a6a','collar')}{P(4,7,2,3,'#ffffff','shirt')}</g>,
    armL:      <g className="px-arm-l">{P(1,7,1,4,SKIN,'al')}</g>,
    armR:      <g className="px-arm-r">{P(8,7,1,4,SKIN,'ar')}</g>,
    head:      <g>{P(2,1,6,5,SKIN,'head')}</g>,
    hair:      <g>{P(2,1,6,2,'#5a4a3a','hair')}</g>,
    eyes:      <g className="px-eyes">{P(3,3,1,1,'#3a2010','el')}{P(6,3,1,1,'#3a2010','er')}</g>,
    mouth:     <g>{P(4,5,2,1,'#ff9966','m')}</g>,
    accessory: <g>
      {/* headset arc */}
      <path d="M2 2 Q5 -0.5 8 2" fill="none" stroke="#2a2a50" strokeWidth="0.8"/>
      {/* ear pads */}
      {P(1,2,1,2,'#2a2a50','pad-l')}
      {P(8,2,1,2,'#2a2a50','pad-r')}
      {/* mic boom */}
      <path d="M2 4 L0 6" fill="none" stroke="#444466" strokeWidth="0.5"/>
      {P(0,5,1,1,'#55aaff','mic')}
    </g>,
  },
}

// ─── PixelCharacter component ────────────────────────────────────────────────
export const PixelCharacter: React.FC<PixelCharacterProps> = ({
  deptId,
  size = 56,
  state = 'idle',
  animated = true,
  onClick,
  className = '',
}) => {
  const [hovered, setHovered] = useState(false)
  const char = CHARACTERS[deptId]
  if (!char) return null

  const effectiveState: CharacterState = !animated
    ? 'idle'
    : hovered && state === 'idle'
    ? 'walking'
    : state

  const width = Math.round(size * 0.625)  // 10/16 aspect ratio
  const stateClass = `px-state-${effectiveState}`

  return (
    <div
      className={`px-char-root ${className}`}
      style={{ width, height: size, display: 'inline-block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      role="img"
      aria-label={char.description}
      tabIndex={0}
    >
      <svg
        width={width}
        height={size}
        viewBox="0 0 10 16"
        shapeRendering="crispEdges"
        className={stateClass}
        style={{ display: 'block' }}
      >
        {/* render order: shadow → legs → body → armL → torso → armR → head → hair → eyes → mouth → accessory */}
        <g className="px-shadow">{char.shadow}</g>
        <g className="px-body">
          <g className="px-leg-l">{/* left leg */}</g>
          <g className="px-leg-r">{/* right leg */}</g>
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
  )
}

// ─── CharacterShowcase — dev preview of all 10 characters ───────────────────
export const CharacterShowcase: React.FC = () => {
  const [selectedState, setSelectedState] = useState<CharacterState>('idle')
  const deptIds = Object.keys(CHARACTERS) as DeptId[]

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <style>{PIXEL_CHARACTER_CSS}</style>

      {/* state selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {(['idle','walking','waving','working'] as CharacterState[]).map(s => (
          <button
            key={s}
            onClick={() => setSelectedState(s)}
            style={{
              padding: '4px 12px', fontSize: 12, borderRadius: 4, cursor: 'pointer',
              background: selectedState === s ? '#185FA5' : 'transparent',
              color: selectedState === s ? 'white' : '#185FA5',
              border: '1px solid #185FA5',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* character grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {deptIds.map(id => {
          const char = CHARACTERS[id]
          return (
            <div key={id} style={{ textAlign: 'center', width: 80 }}>
              <PixelCharacter deptId={id} size={64} state={selectedState} />
              <div style={{
                marginTop: 6, fontSize: 10, fontWeight: 500,
                background: char.accentColor + '22',
                color: char.accentColor,
                borderRadius: 3, padding: '2px 4px',
              }}>
                {char.labelEn}
              </div>
              <div style={{ fontSize: 9, color: '#888', marginTop: 2 }}>
                {char.label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── DeptRoomCharacter — renders character inside a department room tile ─────
// Usage: <DeptRoomCharacter deptId="dept_hr" isSelected={true} />
export const DeptRoomCharacter: React.FC<{
  deptId: DeptId
  isSelected?: boolean
  isActive?: boolean   // currently working (dropped on canvas)
}> = ({ deptId, isSelected, isActive }) => {
  const state: CharacterState = isActive ? 'working' : isSelected ? 'waving' : 'idle'
  return (
    <PixelCharacter
      deptId={deptId}
      size={48}
      state={state}
      animated
    />
  )
}

export default PixelCharacter
