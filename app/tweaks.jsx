/* Tweaks layer — accent, density, corners, canvas style, theme. */
const TWEAK_DEFAULTS = {
  accent: "#185FA5",
  density: "regular",
  corners: "regular",
  canvas: "dots",
};

const DENSITY_MAP = { compact: 0.84, regular: 1, comfy: 1.16 };
const CORNER_MAP = {
  sharp: { sm: "2px", md: "4px", lg: "6px", xl: "9px" },
  regular: { sm: "4px", md: "8px", lg: "12px", xl: "16px" },
  round: { sm: "7px", md: "12px", lg: "17px", xl: "22px" },
};

function TweaksLayer({ theme, setTheme }) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const root = document.documentElement;

  useEffect(() => { root.style.setProperty("--accent", t.accent); }, [t.accent]);
  useEffect(() => { root.style.setProperty("--density", String(DENSITY_MAP[t.density] || 1)); }, [t.density]);
  useEffect(() => {
    const c = CORNER_MAP[t.corners] || CORNER_MAP.regular;
    root.style.setProperty("--r-sm", c.sm); root.style.setProperty("--r-md", c.md);
    root.style.setProperty("--r-lg", c.lg); root.style.setProperty("--r-xl", c.xl);
  }, [t.corners]);
  useEffect(() => { root.dataset.canvas = t.canvas; }, [t.canvas]);

  return (
    <TweaksPanel>
      <TweakSection label="Brand" />
      <TweakColor label="Accent color" value={t.accent}
        options={["#185FA5", "#0F6E56", "#534AB7", "#993C1D", "#1A1A1A"]}
        onChange={(v) => setTweak("accent", v)} />

      <TweakSection label="Layout" />
      <TweakRadio label="Density" value={t.density} options={["compact", "regular", "comfy"]}
        onChange={(v) => setTweak("density", v)} />
      <TweakRadio label="Corners" value={t.corners} options={["sharp", "regular", "round"]}
        onChange={(v) => setTweak("corners", v)} />
      <TweakRadio label="Canvas" value={t.canvas} options={["dots", "lines", "plain"]}
        onChange={(v) => setTweak("canvas", v)} />

      <TweakSection label="Theme" />
      <TweakToggle label="Dark mode" value={theme === "dark"}
        onChange={(v) => setTheme(v ? "dark" : "light")} />
    </TweaksPanel>
  );
}

Object.assign(window, { TweaksLayer });
