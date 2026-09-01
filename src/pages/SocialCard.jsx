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
  { key: "minimal", label: "Minimal", Icon: Type },
];

export default function SocialCard() {
  const [layout, setLayout] = useState("bento");
  const [selected, setSelected] = useState(SECTIONS.map((s) => s.key));
  const [theme, setTheme] = useState("dark");
  const [tagline, setTagline] = useState(TAGLINES[1]);
  const [title, setTitle] = useState("Bitcoin Guide");
  const [eyebrowText, setEyebrowText] = useState("A Curated Guide");
  const [showLogo, setShowLogo] = useState(true);
  const [showTagline, setShowTagline] = useState(true);
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / 1200));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
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
                    background: bg,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    padding: layout === "bento" ? "48px 56px" : "56px 64px",
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  {/* Header */}
                  <div style={{ textAlign: "center", marginBottom: layout === "minimal" ? 0 : layout === "bento" ? 36 : 48, marginTop: layout === "minimal" ? "auto" : 0 }}>
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
                          background: bg,
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
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: layout === "minimal" ? 84 : 62,
                            height: layout === "minimal" ? 84 : 62,
                            marginTop: layout === "minimal" ? -42 : -31,
                            marginLeft: layout === "minimal" ? -42 : -31,
                            objectFit: "cover",
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