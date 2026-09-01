import React from "react";
import { MessageSquare, Flame, FileText, Sparkles } from "lucide-react";
import WeeklyItem from "@/components/weekly/WeeklyItem";

const CATEGORIES = [
  { key: "hot_topic", label: "Hot Topics", icon: Flame },
  { key: "x_post", label: "Posts from X", icon: MessageSquare },
  { key: "news", label: "News & Articles", icon: FileText },
  { key: "other", label: "More", icon: Sparkles },
];

function formatDate(d) {
  if (!d) return "";
  try {
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export default function WeeklyPost({ post }) {
  const items = post.items || [];

  return (
    <div className="mb-14">
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--page-accent)] mb-2">
        Week of {formatDate(post.week_of)}
      </p>
      <h2 className="font-heading text-2xl md:text-3xl font-light text-ink leading-tight mb-2">
        {post.title}
      </h2>
      {post.summary && (
        <p className="font-body text-base text-lead mb-4 max-w-xl leading-relaxed">
          {post.summary}
        </p>
      )}
      <div className="w-12 h-px bg-[var(--page-accent)] mb-6" />

      {items.length === 0 ? (
        <p className="font-mono text-xs text-lead/40 italic border border-dashed border-border p-5 rounded-sm">
          This week's post is being curated — check back soon.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {CATEGORIES.map((cat) => {
            const catItems = items.filter(
              (i) => (i.category || "news") === cat.key
            );
            if (catItems.length === 0) return null;
            const Icon = cat.icon;
            return (
              <div key={cat.key}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} className="text-[var(--page-accent)]" />
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-lead">
                    {cat.label}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {catItems.map((item, i) => (
                    <WeeklyItem key={i} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}