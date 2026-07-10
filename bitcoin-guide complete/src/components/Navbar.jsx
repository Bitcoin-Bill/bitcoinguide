import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-parchment/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <a href="#archive" className="flex items-center gap-2.5">
          <span className="font-heading text-lg tracking-wide text-ink">
            Bitcoin Guide
          </span>
        </a>
        <div className="flex items-center gap-4 md:gap-6">
          <SearchBar />
          <Link
            to="/"
            className="flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
          >
            <img
              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/28cff2465_cubeslarge.png"
              alt="Literature"
              className="h-4 w-4 object-contain"
            />
            Literature
          </Link>
          <Link
            to="/resources"
            className="flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
          >
            <img
              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ba056143e_Newblock-2.png"
              alt="Resources"
              className="h-4 w-4 object-contain"
            />
            Resources
          </Link>
          <span className="font-mono text-xs text-lead/40 hidden md:inline">
            /
          </span>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-lead hidden md:inline">
            SoV ≺ MoE
          </span>
        </div>
      </div>
    </nav>
  );
}