import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Menu,
  X,
  BookOpen,
  Boxes,
  MessageSquare,
  Sparkles,
  Newspaper,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Compass,
  Dices,
  KeyRound,
  Clapperboard,
} from "lucide-react";
import OogaPalmTreeIcon from "@/components/OogaPalmTreeIcon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import BtcTicker from "@/components/BtcTicker";
import OrangeCubeLogo from "@/components/OrangeCubeLogo";
import SearchBar from "@/components/SearchBar";
import BeerTip from "@/components/BeerTip";
import { useTheme } from "@/components/ThemeProvider";
import { Image } from "@/components/ui/image";
import { ENTROPYLAB_URL, ENTROPYLAB_THUMB_LIGHT, ENTROPYLAB_THUMB_DARK } from "@/components/EntropyLabLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const pageOrder = ["/", "/literature", "/resources", "/this-week", "/dice-entropy", "/passphrase", "/video-essays", "/faq", "/oogabooga-land"];
  const goRelative = (dir) => {
    const idx = pageOrder.indexOf(location.pathname);
    const next = idx === -1 ? 0 : (idx + dir + pageOrder.length) % pageOrder.length;
    navigate(pageOrder[next]);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-parchment/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <OrangeCubeLogo className="h-6 w-6 shrink-0" />
          <span className="font-heading text-lg tracking-wide text-ink">
            Bitcoin Guide
          </span>
        </Link>
        <div className="hidden md:flex flex-1 max-w-xs ml-8">
          <SearchBar />
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-1">
            <button
              onClick={() => goRelative(-1)}
              aria-label="Go back"
              className="flex items-center justify-center h-8 w-8 rounded text-lead hover:text-ink transition-colors duration-300"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => goRelative(1)}
              aria-label="Go forward"
              className="flex items-center justify-center h-8 w-8 rounded text-lead hover:text-ink transition-colors duration-300"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300">
                <Compass size={15} className="text-[var(--page-accent)]" />
                Navigate
                <ChevronDown size={12} className="opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-52 bg-popover border-border"
            >
              <DropdownMenuLabel className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead/60">
                Pages
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/literature"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <BookOpen size={15} className="text-[#3B82F6]" />
                  Literature
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/resources"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <Boxes size={15} className="text-[#FF8C00]" />
                  Resources
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/this-week"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <Newspaper size={15} className="text-ink" />
                  This Week
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/dice-entropy"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <Dices size={15} className="text-[#8B5CF6]" />
                  Dice Rolls
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/passphrase"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <KeyRound size={15} className="text-[#16A34A]" />
                  Passphrase
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/video-essays"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <Clapperboard size={15} className="text-[#FACC15]" />
                  Video Essays
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/faq"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <Sparkles size={15} className="text-[#EC4899]" />
                  AI FAQ
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  to="/oogabooga-land"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <OogaPalmTreeIcon className="w-[15px] h-[15px] shrink-0" />
                  Ooga Booga Land
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-lead/50 ml-auto">(make a caveman)</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={ENTROPYLAB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-mono text-xs tracking-[0.15em] uppercase text-lead hover:text-ink"
                >
                  <Image
                    src={theme === "dark" ? ENTROPYLAB_THUMB_DARK : ENTROPYLAB_THUMB_LIGHT}
                    alt="EntropyLab"
                    className="w-[15px] h-[15px] rounded-sm object-cover"
                  />
                  EntropyLab
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-lead/50 ml-auto">(third-party site)</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open navigation menu"
            className="md:hidden flex items-center justify-center h-8 w-8 rounded text-lead hover:text-ink transition-colors duration-300 menu-pulse"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <BeerTip />
          <button
            onClick={toggleTheme}
            aria-label="Toggle light or dark theme"
            className={`flex items-center justify-center h-8 w-8 rounded transition-colors duration-300 ${
              theme === "dark"
                ? "text-yellow-400 hover:text-yellow-300"
                : "text-lead hover:text-ink"
            }`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} className="text-teal-500" />}
          </button>

          <BtcTicker className="hidden md:block" />
        </div>
      </div>

      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 z-50 bg-parchment border-b border-border shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-1">
            <div className="flex items-center gap-1 mb-2">
              <button
                onClick={() => goRelative(-1)}
                aria-label="Go back"
                className="flex items-center justify-center h-8 w-8 rounded text-lead hover:text-ink transition-colors duration-300"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => goRelative(1)}
                aria-label="Go forward"
                className="flex items-center justify-center h-8 w-8 rounded text-lead hover:text-ink transition-colors duration-300"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <Link
              to="/literature"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <BookOpen size={15} className="text-[#009DFF]" />
              Literature
            </Link>
            <Link
              to="/resources"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <Boxes size={15} className="text-[#FF8C00]" />
              Resources
            </Link>
            <Link
              to="/this-week"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <Newspaper size={15} className="text-ink" />
              This Week
            </Link>
            <Link
              to="/dice-entropy"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <Dices size={15} className="text-[#8B5CF6]" />
              Dice Rolls
            </Link>
            <Link
              to="/passphrase"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <KeyRound size={15} className="text-[#16A34A]" />
              Passphrase
            </Link>
            <Link
              to="/video-essays"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <Clapperboard size={15} className="text-[#FACC15]" />
              Video Essays
            </Link>
            <Link
              to="/faq"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <Sparkles size={15} className="text-[#EC4899]" />
              AI FAQ
            </Link>
            <Link
              to="/oogabooga-land"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <OogaPalmTreeIcon className="w-[15px] h-[15px] shrink-0" />
              Ooga Booga Land
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-lead/50">(make a caveman)</span>
            </Link>
            <a
              href={ENTROPYLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <Image
                src={theme === "dark" ? ENTROPYLAB_THUMB_DARK : ENTROPYLAB_THUMB_LIGHT}
                alt="EntropyLab"
                className="w-[15px] h-[15px] rounded-sm object-cover"
              />
              EntropyLab
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-lead/50">(third-party site)</span>
            </a>
          </div>
        </div>
      )}

      <div className="md:hidden fixed left-0 right-0 top-16 z-30 h-9 flex items-center justify-center bg-parchment/95 backdrop-blur-sm border-b border-border">
        <BtcTicker />
      </div>
    </nav>
  );
}