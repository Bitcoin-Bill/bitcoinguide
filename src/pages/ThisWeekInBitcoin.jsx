import React, { useState, useEffect } from "react";
import { Newspaper } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WeeklyPost from "@/components/weekly/WeeklyPost";
import NewspaperView from "@/components/weekly/NewspaperView";

export default function ThisWeekInBitcoin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") return "digital";
    return localStorage.getItem("tw_mode") || "digital";
  });

  useEffect(() => {
    localStorage.setItem("tw_mode", mode);
  }, [mode]);

  useEffect(() => {
    (async () => {
      try {
        const list = await base44.entities.WeeklyBitcoin.list("-week_of", 50);
        setPosts(list || []);
      } catch (e) {
        console.error("load weekly posts failed", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const isPaper = mode === "newspaper";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isPaper ? "bg-[#ece3cf]" : "bg-parchment"
      }`}
    >
      <Navbar />

      <section className="relative pt-28 pb-8 md:pt-36 md:pb-10">
        {!isPaper && (
          <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        )}
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex justify-end mb-6">
            <div className="inline-flex items-center border border-border rounded-sm overflow-hidden bg-parchment/50">
              <button
                onClick={() => setMode("digital")}
                className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 transition-colors duration-300 ${
                  mode === "digital"
                    ? "bg-ink text-parchment"
                    : "text-lead hover:text-ink"
                }`}
              >
                Digital
              </button>
              <button
                onClick={() => setMode("newspaper")}
                className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 transition-colors duration-300 ${
                  mode === "newspaper"
                    ? "bg-ink text-parchment"
                    : "text-lead hover:text-ink"
                }`}
              >
                Newspaper
              </button>
            </div>
          </div>

          {!isPaper && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <Newspaper className="h-12 w-12 md:h-14 md:w-14 text-ink" />
                <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight">
                  This Week in Bitcoin
                </h1>
              </div>
              <p className="font-heading text-lg text-lead italic mb-3">
                Current events from X, hot topics, and news — fresh every Sunday.
              </p>
              <div className="w-12 h-px bg-[var(--page-accent)]" />
            </>
          )}
        </div>
      </section>

      <section className="relative pb-20">
        {!isPaper && (
          <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        )}
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-lead/60">
              <span className="inline-block w-3 h-3 border border-lead/40 border-t-lead rounded-full animate-spin" />
              Loading…
            </div>
          ) : posts.length === 0 ? (
            <p className="font-mono text-sm text-lead/40 italic">
              No posts yet — check back Sunday.
            </p>
          ) : isPaper ? (
            <NewspaperView posts={posts} />
          ) : (
            <>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-4 mt-2">
                This week’s posts
              </p>
              {posts.map((p) => (
                <WeeklyPost key={p.id} post={p} />
              ))}
            </>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}