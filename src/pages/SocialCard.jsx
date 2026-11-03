import React, { useRef, useState, useEffect } from "react";
import {
  BookOpen,
  Boxes,
  Newspaper,
  Dices,
  KeyRound,
  Sparkles,
  Clapperboard,
  Sun,
  Moon,
  LayoutGrid,
  Columns3,
  Type,
  LayoutDashboard,
  PanelLeft,
  Twitter,
  BadgeCheck,
  X,
} from "lucide-react";
import html2canvas from "html2canvas";

const SECTIONS = [
  { key: "literature", label: "Literature", sub: "The essential essays & articles", Icon: BookOpen, color: "#3B82F6" },
  { key: "resources", label: "Resources", sub: "Everything to buy, store & understand", Icon: Boxes, color: "#FF8C00" },
  { key: "this-week", label: "This Week", sub: "Weekly news & Bitcoin events", Icon: Newspaper, color: "#10B981" },
  { key: "dice", label: "Dice Rolls", sub: "Generate seeds with dice entropy", Icon: Dices, color: "#8B5CF6" },
  { key: "passphrase", label: "Passphrase", sub: "Dice-based BIP39 passphrase guide", Icon: KeyRound, color: "#16A34A" },
  { key: "video-essays", label: "Video Essays", sub: "Modular slideshows & visual essays", Icon: Clapperboard, color: "#FACC15" },
  { key: "faq", label: "AI FAQ", sub: "Ask anything about Bitcoin", Icon: Sparkles, color: "#EC4899" },
];

const BENTO_WIDE = ["literature", "resources", "video-essays"];
const BENTO_NARROW = ["this-week", "dice", "passphrase", "faq"];

const RESOURCES_GRID = [
  { label: "Evolution of Money", color: "#F5A623", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/60f1062c4_IMG_0279.png" },
  { label: "Game Theory", color: "#EC4899", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/033d83c2d_IMG_0287.png" },
  { label: "Gresham's Law", color: "#C0C0C0", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/67a4dce1e_IMG_0290.png" },
  { label: "Low-Time Preference", color: "#A3E635", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/40dc1d2c0_IMG_0284.png" },
  { label: "Innovations", color: "#22D3EE", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/11289adef_IMG_0289.png" },
  { label: "Value", color: "#F9A8B0", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/f322604a6_IMG_0285.png" },
  { label: "Liminal State", color: "#2D5A3D", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/2b4223e46_IMG_0286.png" },
  { label: "Cognitive Dissonance", color: "#7C3AED", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ed50f6843_IMG_0283.png" },
  { label: "Monetary Abuse", color: "#F97316", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/7950e2137_IMG_0280.png" },
  { label: "Human Nature", color: "#A7F3D0", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/9a0cd7386_IMG_0282.png" },
  { label: "Intuition", color: "#1E40AF", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/fcbef2e7b_IMG_0281.png" },
  { label: "Conclusion", color: "#6366F1", image: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/74fdbfe4d_IMG_0288.png" },
];

const TAGLINES = [
  "Money grows in value, not volume.",
  "A starting point for learning Bitcoin.",
  "Learn Bitcoin the easy way.",
  "SoV ≺ MoE — Proof of Work, not Proof of Stake.",
];

const LAYOUTS = [
  { key: "bento", label: "Bento", Icon: LayoutGrid },
  { key: "columns", label: "Columns", Icon: Columns3 },
  { key: "icons", label: "Icons", Icon: LayoutDashboard },
  { key: "tweet", label: "Tweet", Icon: Twitter },
  { key: "split", label: "Split", Icon: PanelLeft },
  { key: "resources", label: "Resources", Icon: Boxes },
  { key: "minimal", label: "Minimal", Icon: Type },
];

const SITE_URL = "bitcoin-guide.base44.app";

export default function SocialCard() {
  const [layout, setLayout] = useState("bento");
  const [selected, setSelected] = useState(SECTIONS.map((s) => s.key));
  const [theme, setTheme] = useState("dark");
  const [tagline, setTagline] = useState(TAGLINES[1]);
  const [title, setTitle] = useState("Bitcoin Guide");
  const [eyebrowText, setEyebrowText] = useState("A Curated Guide");
  const [showLogo, setShowLogo] = useState(true);
  const [showTagline, setShowTagline] = useState(true);
  const [featuredKey, setFeaturedKey] = useState("literature");
  const [tweetUrl, setTweetUrl] = useState(SITE_URL);
  const [splitBubbleShape, setSplitBubbleShape] = useState("circle");
  const [splitShowLabels, setSplitShowLabels] = useState(true);
  const [splitRightMode, setSplitRightMode] = useState("icons");
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let frame = null;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        setScale((prev) => {
          const next = Math.min(1, el.clientWidth / 1200);
          return Math.abs(next - prev) < 0.001 ? prev : next;
        });
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  const toggle = (key) =>
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const dark = theme === "dark";
  const bg = dark ? "#111112" : "#F5F0E6";
  const titleColor = dark ? "#FFFFFF" : "#1A1C1E";
  const subColor = dark ? "#A0A0A0" : "#6B6863";
  const labelColor = dark ? "#FFFFFF" : "#1A1C1E";
  const cardBg = dark ? "#1A1A1C" : "#FFFFFF";
  const eyebrow = dark ? "#7A7A7A" : "#8A857C";

  const accent = (r) => (r.key === "this-week" ? (dark ? "#FFFFFF" : "#1A1C1E") : r.color);

  const activeSections = SECTIONS.filter((s) => selected.includes(s.key));
  const featured = SECTIONS.find((s) => s.key === featuredKey) || SECTIONS[0];

  const handleDownload = async () => {
    if (busy || (layout === "columns" && activeSections.length === 0)) return;
    setBusy(true);
    const scaler = cardRef.current?.parentElement;
    const prevTransform = scaler ? scaler.style.transform : "";
    if (scaler) scaler.style.transform = "none";
    try {
      const canvas = await html2canvas(cardRef.current, {
        width: 1200,
        height: 630,
        scale: 2,
        backgroundColor: bg,
        useCORS: true,
        logging: false,
      });
      setResultUrl(canvas.toDataURL("image/png"));
    } catch (e) {
      console.error("Render failed", e);
    } finally {
      if (scaler) scaler.style.transform = prevTransform;
      setBusy(false);
    }
  };

  const renderBentoCard = (key, wide) => {
    const r = SECTIONS.find((s) => s.key === key);
    if (!r) return null;
    return (
      <div
        style={{
          background: cardBg,
          borderRadius: 12,
          padding: wide ? "28px 30px" : "22px 18px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          flex: wide ? 1 : 1,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${accent(r)}, transparent)`,
          }}
        />
        <r.Icon size={wide ? 40 : 34} strokeWidth={1.5} style={{ color: accent(r), marginBottom: wide ? 16 : 12 }} />
        <div style={{ fontSize: wide ? 26 : 21, fontWeight: 600, color: labelColor, marginBottom: 6, fontFamily: "Inter, system-ui, sans-serif" }}>
          {r.label}
        </div>
        <div style={{ fontSize: wide ? 14 : 12, color: subColor, fontFamily: "Inter, system-ui, sans-serif", lineHeight: 1.4 }}>
          {r.sub}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-light text-ink">
            Social Banner Generator
          </h1>
          <p className="font-body text-sm text-lead mt-2 max-w-md mx-auto">
            Pick a layout, theme, and tagline — then download a 1200×630 banner to share.
          </p>
        </div>

        {/* Options panel */}
        <div className="bg-card border border-border rounded-lg p-5 mb-8 space-y-5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
              Layout
            </p>
            <div className="grid grid-cols-4 gap-2 max-w-md">
              {LAYOUTS.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setLayout(l.key)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                    layout === l.key
                      ? "border-verdigris bg-verdigris/10 text-ink"
                      : "border-border text-lead hover:border-verdigris/50"
                  }`}
                >
                  <l.Icon size={14} />
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
              Theme
            </p>
            <div className="inline-flex rounded-md border border-border overflow-hidden">
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  dark ? "bg-ink text-parchment" : "text-lead hover:text-ink"
                }`}
              >
                <Moon size={13} /> Dark
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  !dark ? "bg-ink text-parchment" : "text-lead hover:text-ink"
                }`}
              >
                <Sun size={13} /> Light
              </button>
            </div>
          </div>

          {layout === "columns" && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
                Sections
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SECTIONS.map((s) => {
                  const on = selected.includes(s.key);
                  return (
                    <button
                      key={s.key}
                      onClick={() => toggle(s.key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                        on
                          ? "border-verdigris bg-verdigris/10 text-ink"
                          : "border-border text-lead hover:border-verdigris/50"
                      }`}
                    >
                      <s.Icon size={14} style={{ color: s.color }} />
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(layout === "tweet" || layout === "split") && (
            <>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
                  Featured Section
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setFeaturedKey(s.key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                        featuredKey === s.key
                          ? "border-verdigris bg-verdigris/10 text-ink"
                          : "border-border text-lead hover:border-verdigris/50"
                      }`}
                    >
                      <s.Icon size={14} style={{ color: s.color }} />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
                  Card URL
                </p>
                <input
                  type="text"
                  value={tweetUrl}
                  onChange={(e) => setTweetUrl(e.target.value)}
                  maxLength={48}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-verdigris"
                  placeholder="e.g. bitcoin-guide.base44.app"
                />
              </div>
            </>
          )}

          {layout === "split" && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
                Split Options
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setSplitBubbleShape("circle")}
                  className={`px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                    splitBubbleShape === "circle"
                      ? "border-verdigris bg-verdigris/10 text-ink"
                      : "border-border text-lead hover:border-verdigris/50"
                  }`}
                >
                  Circle Bubbles
                </button>
                <button
                  type="button"
                  onClick={() => setSplitBubbleShape("rounded")}
                  className={`px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                    splitBubbleShape === "rounded"
                      ? "border-verdigris bg-verdigris/10 text-ink"
                      : "border-border text-lead hover:border-verdigris/50"
                  }`}
                >
                  Rounded Bubbles
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSplitShowLabels((v) => !v)}
                  className={`px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                    splitShowLabels
                      ? "border-verdigris bg-verdigris/10 text-ink"
                      : "border-border text-lead hover:border-verdigris/50"
                  }`}
                >
                  {splitShowLabels ? "✓ Labels" : "Labels"}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead self-center mr-1">Right Panel:</span>
                <button
                  type="button"
                  onClick={() => setSplitRightMode("icons")}
                  className={`px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                    splitRightMode === "icons"
                      ? "border-verdigris bg-verdigris/10 text-ink"
                      : "border-border text-lead hover:border-verdigris/50"
                  }`}
                >
                  {splitRightMode === "icons" ? "✓ Icons" : "Icons"}
                </button>
                <button
                  type="button"
                  onClick={() => setSplitRightMode("cubes")}
                  className={`px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                    splitRightMode === "cubes"
                      ? "border-verdigris bg-verdigris/10 text-ink"
                      : "border-border text-lead hover:border-verdigris/50"
                  }`}
                >
                  {splitRightMode === "cubes" ? "✓ Cubes" : "Cubes"}
                </button>
              </div>
            </div>
          )}

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
              Tagline
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {TAGLINES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTagline(t)}
                  className={`px-3 py-1.5 rounded-md border text-xs transition-colors ${
                    tagline === t
                      ? "border-verdigris bg-verdigris/10 text-ink"
                      : "border-border text-lead hover:border-verdigris/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              maxLength={60}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-verdigris"
              placeholder="Custom tagline"
            />
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
              Title & Eyebrow
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={24}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-verdigris"
                placeholder="Title (e.g. Bitcoin Guide)"
              />
              <input
                type="text"
                value={eyebrowText}
                onChange={(e) => setEyebrowText(e.target.value)}
                maxLength={32}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:border-verdigris"
                placeholder="Eyebrow (e.g. A Curated Guide)"
              />
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
              Show / Hide
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowLogo((v) => !v)}
                className={`px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                  showLogo
                    ? "border-verdigris bg-verdigris/10 text-ink"
                    : "border-border text-lead hover:border-verdigris/50"
                }`}
              >
                Logo
              </button>
              <button
                onClick={() => setShowTagline((v) => !v)}
                className={`px-3 py-1.5 rounded-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                  showTagline
                    ? "border-verdigris bg-verdigris/10 text-ink"
                    : "border-border text-lead hover:border-verdigris/50"
                }`}
              >
                Tagline
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-[#1f1f1f] rounded-lg p-4 md:p-6">
          <div
            ref={wrapRef}
            onClick={handleDownload}
            className={`w-full ${busy || (layout === "columns" && activeSections.length === 0) ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
            title={busy ? "Rendering…" : "Click the banner to download it"}
          >
            <div
              style={{
                width: 1200 * scale,
                height: 630 * scale,
                margin: "0 auto",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  width: 1200,
                  height: 630,
                }}
              >
                <div
                  ref={cardRef}
                  style={{
                    width: 1200,
                    height: 630,
                    background: layout === "tweet" ? "#000000" : bg,
                    position: "relative",
                    display: "flex",
                    flexDirection: layout === "split" ? "row" : "column",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    padding: layout === "bento" ? "48px 56px" : layout === "tweet" ? "44px 52px" : layout === "split" ? 0 : layout === "resources" ? "40px 56px" : "56px 64px",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  {/* Header */}
                  <div style={{ textAlign: "center", marginBottom: layout === "minimal" ? 0 : layout === "bento" ? 36 : 48, marginTop: layout === "minimal" ? "auto" : 0, display: layout === "tweet" || layout === "split" || layout === "resources" ? "none" : "block" }}>
                    {eyebrowText && (
                    <div
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: 13,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: eyebrow,
                        marginBottom: 14,
                      }}
                    >
                      {eyebrowText}
                    </div>
                    )}
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: 14,
                        lineHeight: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {showLogo && (
                      <div
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          width: layout === "minimal" ? 76 : 56,
                          height: layout === "minimal" ? 76 : 56,
                          borderRadius: "50%",
                          background: "#FFFFFF",
                          overflow: "hidden",
                          marginRight: 18,
                          position: "relative",
                          top: 4,
                        }}
                      >
                        <img
                          src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/09f1d867a_Untitleddesign3.png"
                          alt="Bitcoin Guide"
                          crossOrigin="anonymous"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                      )}
                      <div
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          fontSize: layout === "minimal" ? 84 : 60,
                          fontWeight: 300,
                          color: titleColor,
                          letterSpacing: "-0.01em",
                          lineHeight: 1,
                          }}
                          >
                          {title}
                          </div>
                    </div>
                    {showTagline && (
                    <div
                      style={{
                        fontSize: layout === "minimal" ? 26 : 20,
                        fontStyle: "italic",
                        color: subColor,
                        fontWeight: 400,
                      }}
                    >
                      {tagline}
                    </div>
                    )}
                  </div>

                  {/* Bento body */}
                  {layout === "bento" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
                      <div style={{ display: "flex", gap: 20, height: 190 }}>
                        {BENTO_WIDE.map((k) => (
                          <div key={k} style={{ flex: 1 }}>
                            {renderBentoCard(k, true)}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 20, height: 190 }}>
                        {BENTO_NARROW.map((k) => (
                          <div key={k} style={{ flex: 1 }}>
                            {renderBentoCard(k, false)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Columns body */}
                  {layout === "columns" && (
                    <div style={{ display: "flex", gap: 24, flex: 1 }}>
                      {activeSections.map((r) => (
                        <div
                          key={r.key}
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "20px 8px",
                          }}
                        >
                          <div style={{ marginBottom: 22, display: "flex", justifyContent: "center" }}>
                            <r.Icon size={52} strokeWidth={1.4} style={{ color: r.key === "this-week" ? (dark ? "#FFFFFF" : "#1A1C1E") : r.color }} />
                          </div>
                          <div
                            style={{
                              fontFamily: "Inter, system-ui, sans-serif",
                              fontSize: 11,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase",
                              color: labelColor,
                              lineHeight: 1.5,
                              marginBottom: 12,
                              minHeight: 33,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {r.sub}
                          </div>
                          <div
                            style={{
                              fontSize: 30,
                              fontWeight: 400,
                              color: titleColor,
                              paddingBottom: 8,
                              borderBottom: `2px solid ${r.key === "this-week" ? (dark ? "#FFFFFF" : "#1A1C1E") : r.color}`,
                              display: "inline-block",
                              paddingLeft: 18,
                              paddingRight: 18,
                            }}
                          >
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Icons body */}
                  {layout === "icons" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, flex: 1 }}>
                      {SECTIONS.map((r) => (
                        <div
                          key={r.key}
                          style={{
                            background: cardBg,
                            borderRadius: 12,
                            padding: "28px 18px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 3,
                              background: `linear-gradient(90deg, ${accent(r)}, transparent)`,
                            }}
                          />
                          <r.Icon size={44} strokeWidth={1.5} style={{ color: accent(r), marginBottom: 16 }} />
                          <div
                            style={{
                              fontSize: 24,
                              fontWeight: 600,
                              color: labelColor,
                              fontFamily: "Inter, system-ui, sans-serif",
                            }}
                          >
                            {r.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Minimal body */}
                  {layout === "minimal" && (
                    <div style={{ marginTop: "auto", marginBottom: "auto", display: "flex", justifyContent: "center" }}>
                      <div style={{ width: 80, height: 2, background: dark ? "#FFFFFF" : "#1A1C1E", opacity: 0.6 }} />
                    </div>
                  )}

                  {/* Tweet body */}
                  {layout === "tweet" && (
                    <div style={{ display: "flex", flexDirection: "column", flex: 1, fontFamily: "Inter, system-ui, sans-serif", color: "#fff" }}>
                      {/* Profile row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                          <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", flexShrink: 0, background: "#FFFFFF" }}>
                            <img
                              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/09f1d867a_Untitleddesign3.png"
                              alt="Bitcoin Guide"
                              crossOrigin="anonymous"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                              <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Bitcoin Guide</span>
                              <BadgeCheck size={18} color="#1D9BF0" fill="#1D9BF0" strokeWidth={2} />
                            </div>
                            <div style={{ fontSize: 15, color: "#71767B" }}>@bitcoinguideapp</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>X.com</div>
                      </div>

                      {/* Body text */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 18, color: "#1D9BF0", marginBottom: 6 }}>{tweetUrl}</div>
                        <div style={{ fontSize: 20, color: "#fff", lineHeight: 1.4, fontWeight: 400 }}>
                          {featured.sub}. DYOR. Not financial advice.
                        </div>
                      </div>

                      {/* Embedded link preview card */}
                      <div style={{ flex: 1, background: "#161616", borderRadius: 16, border: "1px solid #2f3336", display: "flex", overflow: "hidden", minHeight: 0 }}>
                        {/* Left: icon + text */}
                        <div style={{ flex: "0 0 380px", padding: "28px 30px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <div style={{ width: 56, height: 56, borderRadius: 12, background: "#0e0e0e", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, border: `1px solid ${featured.color}33` }}>
                            <featured.Icon size={30} strokeWidth={1.6} color={featured.color} />
                          </div>
                          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: featured.color, marginBottom: 10, fontWeight: 600 }}>
                            Bitcoin Guide · {featured.label}
                          </div>
                          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 30, fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.1 }}>
                            {featured.label}
                          </div>
                          <div style={{ fontSize: 15, color: "#a0a0a0", lineHeight: 1.5 }}>
                            {featured.sub}
                          </div>
                        </div>
                        {/* Right: mini mock */}
                        <div style={{ flex: 1, background: "#0b0b0b", padding: "24px", display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
                          <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#71767B" }}>{tweetUrl}</div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, flex: 1 }}>
                            {SECTIONS.slice(0, 6).map((s) => (
                              <div key={s.key} style={{ background: "#161616", borderRadius: 10, padding: "14px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                                <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: s.key === featuredKey ? s.color : `${s.color}55` }} />
                                <s.Icon size={20} strokeWidth={1.6} color={s.color} style={{ marginBottom: 8 }} />
                                <div style={{ fontSize: 11, color: "#e0e0e0", fontWeight: 600 }}>{s.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#71767B" }}>{tweetUrl}</span>
                        <span style={{ fontSize: 13, color: "#71767B" }}>From {tweetUrl}</span>
                      </div>
                    </div>
                  )}

                  {/* Split body */}
                  {layout === "split" && (
                    <>
                      {/* Left brand panel */}
                      <div style={{ width: "48%", background: dark ? "#0e0e10" : "#1A1C1E", padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                        <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${featured.color}, transparent)` }} />
                        {showLogo && (
                          <div style={{ width: 88, height: 88, borderRadius: "50%", overflow: "hidden", marginBottom: 28, position: "relative", background: "#FFFFFF" }}>
                            <img
                              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/09f1d867a_Untitleddesign3.png"
                              alt="Bitcoin Guide"
                              crossOrigin="anonymous"
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                          </div>
                        )}
                        {eyebrowText && (
                          <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase", color: featured.color, marginBottom: 14, fontWeight: 600 }}>
                            {eyebrowText}
                          </div>
                        )}
                        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 56, fontWeight: 300, color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1, marginBottom: 18 }}>
                          {title}
                        </div>
                        {showTagline && (
                          <div style={{ fontSize: 20, fontStyle: "italic", color: "#A0A0A0", fontWeight: 400, lineHeight: 1.4, maxWidth: 360 }}>
                            {tagline}
                          </div>
                        )}
                        <div style={{ position: "absolute", bottom: 44, left: 52, fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "#71767B", letterSpacing: "0.05em" }}>
                          {tweetUrl}
                        </div>
                      </div>

                      {/* Right content panel */}
                      <div style={{ flex: 1, background: cardBg, padding: splitRightMode === "cubes" ? "44px 40px" : "52px 48px", display: "flex", flexDirection: "column" }}>
                        {splitRightMode === "cubes" ? (
                          <>
                            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow, marginBottom: 14, fontWeight: 600 }}>
                              Resources
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: 12, flex: 1 }}>
                              {RESOURCES_GRID.map((r, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, position: "relative" }}>
                                  {i === 0 && (
                                    <div style={{ position: "absolute", top: "50%", left: "50%", width: 110, height: 110, marginTop: -55, marginLeft: -55, borderRadius: "50%", background: `radial-gradient(circle, ${r.color}66, transparent 70%)`, filter: "blur(8px)", zIndex: 0 }} />
                                  )}
                                  <div style={{ width: 56, height: 56, borderRadius: 12, overflow: "hidden", position: "relative", zIndex: 1, boxShadow: "0 3px 10px rgba(0,0,0,0.3)" }}>
                                    <img src={r.image} alt={r.label} crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                  </div>
                                  <div style={{ fontSize: 11, fontWeight: 600, color: dark ? "#ffffff" : "#1A1C1E", textAlign: "center", position: "relative", zIndex: 1, lineHeight: 1.15, maxWidth: 92 }}>
                                    {r.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: eyebrow, marginBottom: 18, fontWeight: 600 }}>
                              Featured
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
                              <div style={{ width: 64, height: 64, borderRadius: 14, background: dark ? "#0e0e0e" : "#F2EEE6", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${featured.color}33`, flexShrink: 0 }}>
                                <featured.Icon size={34} strokeWidth={1.6} color={featured.color} />
                              </div>
                              <div>
                                <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 34, fontWeight: 700, color: titleColor, lineHeight: 1.1, marginBottom: 4 }}>
                                  {featured.label}
                                </div>
                                <div style={{ fontSize: 15, color: subColor, lineHeight: 1.4 }}>
                                  {featured.sub}
                                </div>
                              </div>
                            </div>
                            <div style={{ height: 1, background: dark ? "#2a2a2c" : "#E6E0D4", marginBottom: 22 }} />
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18, alignContent: "center", flex: 1 }}>
                              {SECTIONS.filter((s) => s.key !== featuredKey).slice(0, 6).map((s) => (
                                <div key={s.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 92 }}>
                                  <div style={{ width: 64, height: 64, borderRadius: splitBubbleShape === "circle" ? "50%" : 18, background: dark ? "#161618" : "#F8F4EC", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${s.color}33`, position: "relative", overflow: "hidden" }}>
                                    <span style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.color }} />
                                    <s.Icon size={28} strokeWidth={1.6} color={s.color} />
                                  </div>
                                  {splitShowLabels && (
                                    <div style={{ fontSize: 12, fontWeight: 600, color: labelColor, fontFamily: "Inter, system-ui, sans-serif", textAlign: "center", lineHeight: 1.2 }}>
                                      {s.label}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}

                  {/* Resources body */}
                  {layout === "resources" && (
                    <div style={{ display: "flex", flexDirection: "column", flex: 1, fontFamily: "Inter, system-ui, sans-serif", background: dark ? "#16181a" : "#F2EEE6", margin: "-40px -56px", padding: "40px 56px" }}>
                      <div style={{ textAlign: "center", marginBottom: 24 }}>
                        {eyebrowText && (
                          <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: eyebrow, marginBottom: 8, fontWeight: 600 }}>
                            {eyebrowText}
                          </div>
                        )}
                        <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 42, fontWeight: 300, color: titleColor, letterSpacing: "-0.01em", lineHeight: 1 }}>
                          Resources
                        </div>
                        {showTagline && (
                          <div style={{ fontSize: 16, fontStyle: "italic", color: subColor, marginTop: 8 }}>
                            {tagline}
                          </div>
                        )}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: 14, flex: 1 }}>
                        {RESOURCES_GRID.map((r, i) => (
                          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, position: "relative" }}>
                            {i === 0 && (
                              <div style={{ position: "absolute", top: "50%", left: "50%", width: 150, height: 150, marginTop: -75, marginLeft: -75, borderRadius: "50%", background: `radial-gradient(circle, ${r.color}66, transparent 70%)`, filter: "blur(10px)", zIndex: 0 }} />
                            )}
                            <div style={{ width: 72, height: 72, borderRadius: 14, overflow: "hidden", position: "relative", zIndex: 1, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                              <img src={r.image} alt={r.label} crossOrigin="anonymous" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: dark ? "#ffffff" : "#1A1C1E", textAlign: "center", position: "relative", zIndex: 1, lineHeight: 1.2 }}>
                              {r.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
            {busy ? "Rendering…" : "Click the banner to save it"}
          </p>
          </div>

          {resultUrl && (
          <div className="fixed inset-0 z-50 bg-background flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lead">
                Long-press or right-click the image to save
              </p>
              <button
                onClick={() => setResultUrl(null)}
                aria-label="Close"
                className="flex items-center justify-center h-8 w-8 rounded-md border border-border text-ink hover:bg-muted transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-start justify-center p-4">
              <img src={resultUrl} alt="Bitcoin Guide banner" className="max-w-full h-auto rounded-md shadow-lg" />
            </div>
          </div>
          )}
          </div>
          </div>
          );
          }