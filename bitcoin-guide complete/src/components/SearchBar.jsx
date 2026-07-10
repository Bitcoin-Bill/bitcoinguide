import React, { useState, useRef, useEffect } from "react";
import { Search, X, FileText, BookOpen, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { essays, saifedeanItems, parkerLewisItems, farringtonItems } from "@/components/ArchiveSection";
import { sections } from "@/pages/Resources";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildIndex() {
  const items = [];

  const addLit = (arr, category) => {
    arr.forEach((item) => {
      const anchor = `/#${slugify(item.title)}`;
      if (item.url) {
        items.push({
          title: item.title,
          description: item.description || "",
          url: item.url,
          location: item.url.startsWith("/") ? item.url : anchor,
          category,
          icon: item.icon || null,
          type: item.url.startsWith("/") ? "page" : item.url.endsWith(".pdf") ? "pdf" : "external",
        });
      }
      if (item.links) {
        item.links.forEach((sub) => {
          items.push({
            title: sub.title,
            description: item.description || "",
            url: sub.url,
            location: sub.url.startsWith("/") ? sub.url : anchor,
            category,
            icon: item.icon || null,
            type: sub.url.endsWith(".pdf") ? "pdf" : "external",
          });
        });
      }
    });
  };

  addLit(essays, "Essays");
  addLit(saifedeanItems, "Saifedean Ammous");
  addLit(parkerLewisItems, "Parker A. Lewis");
  addLit(farringtonItems, "Allen Farrington");

  sections.forEach((section) => {
    section.links.forEach((link) => {
      items.push({
        title: link.title,
        description: link.description || "",
        url: link.url,
        location: `/resources#${slugify(link.title)}`,
        category: "Resources",
        icon: null,
        type: "resource",
      });
    });
  });

  return items;
}

const searchIndex = buildIndex();

function ResultIcon({ type }) {
  if (type === "pdf") return <FileText size={14} className="text-verdigris shrink-0" />;
  if (type === "page") return <BookOpen size={14} className="text-verdigris shrink-0" />;
  if (type === "resource") return <Link2 size={14} className="text-verdigris shrink-0" />;
  return <Link2 size={14} className="text-verdigris shrink-0" />;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const onClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleResultClick = (item) => {
    const loc = item.location;
    setOpen(false);
    setQuery("");
    if (!loc) return;

    if (loc.startsWith("/resources#")) {
      const anchorId = loc.split("#")[1];
      navigate("/resources");
      setTimeout(() => {
        document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else if (loc.startsWith("/#")) {
      const anchorId = loc.split("#")[1];
      navigate("/");
      setTimeout(() => {
        document.getElementById(anchorId)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      navigate(loc);
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-xs">
      <div className="flex items-center gap-2 border border-border bg-parchment/80 rounded px-3 py-1.5 focus-within:border-verdigris transition-colors duration-300">
        <Search size={14} className="text-lead/50 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search…"
          className="font-body text-sm text-ink bg-transparent outline-none w-full placeholder:text-lead/40"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="text-lead/40 hover:text-ink transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-parchment border border-verdigris/30 shadow-lg rounded-md z-50">
          {results.length > 0 ? (
            results.map((item, i) => (
              <button
                key={i}
                onClick={() => handleResultClick(item)}
                className="w-full text-left flex items-start gap-2.5 px-3 py-2.5 hover:bg-verdigris/5 border-b border-border/50 last:border-0 transition-colors duration-200"
              >
                {item.icon ? (
                  <img src={item.icon} alt="" className="w-5 h-5 object-cover rounded shrink-0 mt-0.5" />
                ) : (
                  <ResultIcon type={item.type} />
                )}
                <div className="min-w-0">
                  <p className="font-heading text-sm text-ink line-clamp-1">{item.title}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase text-verdigris/50 mt-0.5">
                    {item.category}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="px-3 py-4">
              <p className="font-mono text-xs text-lead/50">No results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}