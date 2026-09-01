import { sections } from "@/pages/Resources";
import {
  essays,
  saifedeanItems,
  parkerLewisItems,
  farringtonItems,
  unchainedItems,
} from "@/components/ArchiveSection";

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const PAGES = [
  { name: "Literature", route: "/literature", desc: "Original essays and further reading on the economics, philosophy, and technology of Bitcoin." },
  { name: "Resources", route: "/resources", desc: "Curated links to buy, store, and understand Bitcoin — wallets, hardware, nodes, books, charts, and more." },
  { name: "This Week in Bitcoin", route: "/this-week", desc: "A weekly digest of Bitcoin news, hot topics, and notable posts." },
  { name: "Dice Entropy", route: "/dice-entropy", desc: "A guide to generating verifiable, high-entropy Bitcoin seed phrases with physical dice." },
  { name: "BIP39 Passphrase", route: "/passphrase", desc: "A dice-based tutorial for creating a BIP39 passphrase." },
  { name: "AI FAQ", route: "/faq", desc: "Ask anything about Bitcoin — this AI guide." },
  { name: "Gradually Then Suddenly Summary", route: "/gradually-then-suddenly-summary", desc: "A chapter-by-chapter summary of Parker A. Lewis's 'Gradually, Then Suddenly'." },
];

function renderResources() {
  return sections
    .map((section) => {
      const slug = slugify(section.title);
      const links = section.links
        .map((l) => {
          const desc = l.description ? ` — ${l.description}` : "";
          return `    - ${l.title} (${l.url})${desc}`;
        })
        .join("\n");
      return `Section: "${section.title}" (deep link: /resources#${slug})\n  ${section.subtitle}\n  Links:\n${links}`;
    })
    .join("\n\n");
}

function renderLiterature(items, group) {
  return items
    .map((it) => {
      const url = it.url || (it.links || []).map((l) => l.url).join(", ") || "(in-site page)";
      const desc = it.description ? ` — ${it.description}` : "";
      return `  - ${it.title} (${url})${desc}`;
    })
    .join("\n");
}

export const SITE_KNOWLEDGE = [
  "You are the AI guide for bitcoinguide.app, an educational Bitcoin portal.",
  "",
  "## Site Pages",
  PAGES.map((p) => `- ${p.name} (${p.route}) — ${p.desc}`).join("\n"),
  "",
  "## Resources Page Sections (with deep links)",
  "Each section lives on the Resources page. Use the deep link (e.g. /resources#cold-storage-hardware-wallets) so users jump straight to it.",
  renderResources(),
  "",
  "## Literature Archive (on the Literature page, /literature)",
  "### Essays",
  renderLiterature(essays),
  "### Saifedean Ammous",
  renderLiterature(saifedeanItems),
  "### Parker A. Lewis",
  renderLiterature(parkerLewisItems),
  "### Allen Farrington",
  renderLiterature(farringtonItems),
  "### Phil Geiger (Unchained)",
  renderLiterature(unchainedItems),
].join("\n");

export const SITE_INSTRUCTIONS = [
  "Answer as the guide for bitcoinguide.app. When a question relates to something available on this site, recommend the matching page or section and include a clickable markdown link:",
  '- For on-site pages/sections, link the route, e.g. [Cold Storage & Hardware Wallets](/resources#cold-storage-hardware-wallets) or [Literature](/literature).',
  '- For off-site resources (exchanges, wallets, books, videos), link the external URL from the knowledge base, e.g. [Blockstream Jade](https://blockstream.com/jade/).',
  "Keep general Bitcoin answers clear, accurate, and concise — use plain language, short paragraphs, and bullet points where helpful. Do not give financial advice.",
  "Never claim the site sells products it does not sell — bitcoinguide.app is an educational guide that links out to third parties; it does not sell hardware or run an exchange.",
  "If a question is off-topic or unrelated to Bitcoin or this site, briefly say so and steer back to what the site offers.",
].join("\n");