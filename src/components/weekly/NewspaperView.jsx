import React from "react";
import { ExternalLink } from "lucide-react";

const CATEGORIES = [
  { key: "hot_topic", label: "Hot Topics" },
  { key: "x_post", label: "Posts from X" },
  { key: "news", label: "News & Articles" },
  { key: "other", label: "More" },
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

function NewspaperItem({ item }) {
  if (item.popup) {
    return (
      <div className="border-2 border-double border-[#2a2520] p-3 bg-[#e6dcc4]">
        <p className="font-heading text-[10px] font-bold tracking-[0.3em] uppercase text-[#8a2a1a] mb-1.5">
          Bulletin
        </p>
        <h4 className="font-heading text-lg font-bold leading-tight text-[#2a2520] mb-1">
          {item.title}
        </h4>
        {item.source && (
          <p className="np-serif text-[11px] italic text-[#5a4a3a] mb-1.5">
            — {item.source}
          </p>
        )}
        {item.description && (
          <p className="np-serif text-sm leading-relaxed text-[#2a2520]/85 whitespace-pre-line">
            {item.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {item.source && (
        <p className="np-serif text-[10px] tracking-[0.15em] uppercase text-[#5a4a3a] mb-0.5">
          By {item.source}
        </p>
      )}
      <h4 className="font-heading text-lg font-bold leading-tight text-[#2a2520] mb-1">
        {item.title}
      </h4>
      {item.description && (
        <p className="np-serif text-[14px] leading-[1.6] text-[#2a2520]/85 text-justify mb-1.5">
          {item.description}
        </p>
      )}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="np-serif inline-flex items-center gap-1 text-[11px] italic text-[#5a4a3a] hover:text-[#2a2520] underline underline-offset-2"
        >
          <ExternalLink size={10} />
          Open source article
        </a>
      )}
    </div>
  );
}

function NewspaperPost({ post, index }) {
  const items = post.items || [];
  return (
    <article className="mb-12">
      <div className="flex items-center justify-between border-y border-[#2a2520]/30 py-1.5 mb-5 text-[10px] tracking-[0.25em] uppercase text-[#5a4a3a]">
        <span>Week of {formatDate(post.week_of)}</span>
        <span className="hidden sm:block">Section {String.fromCharCode(65 + index)}</span>
      </div>

      <h2 className="font-heading text-3xl md:text-5xl font-bold leading-[1.05] text-[#2a2520] mb-3 text-center">
        {post.title}
      </h2>

      {post.summary && (
        <p className="np-serif np-dropcap text-[17px] leading-[1.7] text-[#2a2520] mb-6 text-justify max-w-2xl mx-auto">
          {post.summary}
        </p>
      )}

      <div className="border-t border-[#2a2520]/30 mb-6" />

      {items.length === 0 ? (
        <p className="np-serif text-sm italic text-[#5a4a3a] text-center">
          This week’s edition is being curated — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {CATEGORIES.map((cat) => {
            const catItems = items.filter(
              (i) => (i.category || "news") === cat.key
            );
            if (catItems.length === 0) return null;
            const span = catItems.length > 2 ? "md:col-span-2" : "";
            return (
              <div key={cat.key} className={span}>
                <h3 className="font-heading text-sm font-bold tracking-[0.2em] uppercase text-[#2a2520] border-b border-[#2a2520]/40 pb-1 mb-3">
                  {cat.label}
                </h3>
                <div className="flex flex-col gap-4">
                  {catItems.map((item, i) => (
                    <NewspaperItem key={i} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

export default function NewspaperView({ posts }) {
  const latestDate = posts[0] ? formatDate(posts[0].week_of) : formatDate(new Date().toISOString().slice(0, 10));
  return (
    <div className="np-serif">
      <header className="text-center mb-10">
        <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#5a4a3a] mb-1.5">
          <span>Vol. I · No. {posts.length || 1}</span>
          <span className="hidden sm:block">Est. MMIX</span>
          <span>One Sat Per Byte</span>
        </div>
        <div className="border-y-[3px] border-double border-[#2a2520] py-4">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-[#2a2520]">
            The Bitcoin Bulletin
          </h1>
          <p className="np-serif text-[11px] italic tracking-[0.2em] uppercase text-[#5a4a3a] mt-1.5">
            “All the hashes that are fit to print”
          </p>
        </div>
        <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#5a4a3a] mt-1.5">
          <span>{latestDate}</span>
          <span className="hidden sm:block">Sound Money · Sound Mind</span>
          <span>∞ / 21M</span>
        </div>
      </header>

      {posts.map((post, idx) => (
        <NewspaperPost key={post.id} post={post} index={idx} />
      ))}
    </div>
  );
}