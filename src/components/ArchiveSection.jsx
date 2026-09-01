import React from "react";
import LiteratureCard from "@/components/LiteratureCard";
import ReadingListLink from "@/components/resources/ReadingListLink";

export const essays = [
  {
    title: "Evolution of Money",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/efe742dd7_Moneys.png",
    accent: "#F97316",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/4f43a791b_Understanding_Money.pdf",
    description: "Trace the lineage of money from Rai stones and cowrie shells to gold, fiat, and Bitcoin. Understanding what came before is the foundation of understanding what comes next.",
  },
  {
    title: "Game Theory",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/f66b036e3_Gametheory.png",
    accent: "#FF2D95",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/8f1e3fc95_GameTheory.pdf",
    description: "How rational actors in adversarial environments inevitably converge on the hardest money available — and why Bitcoin's incentive structure is unbreakable.",
  },
  {
    title: "Gresham's Law",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/16766f4bd_Greshamslaw.png",
    accent: "#9CA3AF",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/e2255ce16_GreshamsLaw.pdf",
    description: "Bad money drives out good — when legal tender laws force acceptance of debased currency, people hoard the superior money. Bitcoin inverts this dynamic.",
  },
  {
    title: "Low Time Preference",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/79ac2fd82_Lowtimepreferene.png",
    accent: "#FACC15",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/8baddb763_LowTimePreference.pdf",
    description: "The civilizational importance of delayed gratification. Sound money rewards patience; fiat money punishes it. This text reframes your relationship with time.",
  },
  {
    title: "Innovations: Zero to One",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/a9b5387db_Innovations.png",
    accent: "#14B8A6",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/15c5f7df9_Innovations.pdf",
    description: "Bitcoin as a true zero-to-one innovation — not an incremental improvement but a category creation. How sound money fuels the greatest breakthroughs in human history.",
  },
  {
    title: "Value",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/89b0043aa_value.png",
    accent: "#FF6FB5",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/f691bd3a5_Value.pdf",
    description: "Energy, nodes, mining, and scarcity — a deep examination of what makes Bitcoin valuable as sound money and how it embodies the purest form of stored human energy.",
  },
  {
    title: "Liminal State of Fiat",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1c090c010_Liminalstate.png",
    accent: "#10B981",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/026138d09_LiminalState.pdf",
    description: "Fiat currency traps us in a state of transition — neither here nor there. This text maps the existential disorientation of living within an abstract monetary paradigm.",
  },
  {
    title: "Cognitive Dissonance",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/90ad8dd2b_cognitivedissonance.png",
    accent: "#9F1239",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/9559550af_CognitiveDissonance.pdf",
    description: "Why intelligent people reject Bitcoin — the psychological barriers to accepting a paradigm shift, and the internal enemy that keeps us trapped in the fiat system.",
  },
  {
    title: "Monetary Abuse",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/36dbbfe62_monetaryabuse.png",
    accent: "#CC5500",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/207343932_MonetaryAbuse.pdf",
    description: "The striking parallels between centralized banking and narcissistic abuse — control through scarcity, gaslighting through inflation, and the erosion of individual autonomy.",
  },
  {
    title: "Human Nature",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/b1e0599c1_humannature.png",
    accent: "#34D399",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/74ace02c2_HumanNature.pdf",
    description: "Bitcoin doesn't aim to change human nature — it designs for it. Aligning incentives toward fairness and sustainability without requiring anyone to become less human.",
  },
  {
    title: "Intuition",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/da2e0827a_intuition.png",
    accent: "#0891B2",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/39d20a9fe_Intuition.pdf",
    description: "The problem is deeply intuitive once you grasp it — and if you don't, it's because you haven't tried. Building a first-principles understanding of money and freedom.",
  },
  {
    title: "Conclusion",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/dda3bc4e7_conclusion.png",
    accent: "#000000",
    url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/4b66b4e00_Conclusion.pdf",
    description: "The synthesis of all preceding texts — bringing together economics, philosophy, and technology into a unified understanding of Bitcoin's transformative potential.",
  },
];

export const saifedeanItems = [
  {
    title: "Excerpt from 'The Bitcoin Standard'",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1f985c846_IMG_8705.jpeg",
    url: "https://media.base44.com/files/public/6a4d10bcc776843a6d26b955/3a59c6d4c_Zero_to_One_Excerpt.pdf",
    description: "Pages 96–104 from Saifedean Ammous's landmark work — exploring how sound money fuelled the zero-to-one innovations of the nineteenth century and the artistic flourishing that came with it.",
  },
  {
    title: "Articles by Saifedean",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/4f0197467_IMG_8764.webp",
    description: "Two short texts from Saifedean Ammous — the first on how money emerges naturally from the market, the second on why deflation is economic growth, not the enemy we've been told it is.",
    links: [
      { title: "Emergence of Money", url: "https://media.base44.com/files/public/6a4d10bcc776843a6d26b955/1d6c01f20_EmergenceofMoney-SaifedeanAmmous.pdf" },
      { title: "Deflation", url: "https://media.base44.com/files/public/6a4d10bcc776843a6d26b955/7579e8346_Deflation-SaifedeanAmmous.pdf" },
    ],
  },
];

export const parkerLewisItems = [
  {
    title: "Gradually, Then Suddenly",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1a7c67650_IMG_8558.jpeg",
    url: "https://ugc.production.linktr.ee/bf8cd524-1547-43ae-a11f-c3d8613db5d5_Gradually-Then-Suddenly.pdf",
    description: "Parker A. Lewis's 'Gradually, Then Suddenly' is a systematic, chapter-by-chapter framework for understanding Bitcoin as money — why it's different, why it can't be copied, and why it's the only viable alternative to a broken fiat system.",
  },
  {
    title: "Gradually, Then Summary",
    url: "/gradually-then-suddenly-summary",
    description: "A comprehensive summary of 'Gradually, Then Suddenly' — the key arguments and takeaways distilled into an accessible read.",
  },
  {
    title: "Bitcoin is Money (&) Currency",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/17edb581b_IMG_8768.jpg",
    url: "https://media.base44.com/files/public/6a4d10bcc776843a6d26b955/0db27fb46_BitcoinisMoneyCurrency.pdf",
    description: "Parker Lewis makes the case that bitcoin isn't just money — it is the first money in history to also function as a currency without an issuer. No central bank, no standard weights and measures, no intermediary. Bitcoin does it all natively.",
  },
  {
    title: "Bitcoin is the Greatest Asymmetry",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/388f6fff6_Screenshot2026-07-09at105227AM.png",
    url: "https://x.com/parkeralewis/status/2009379860066799953?s=20",
    externalOnly: true,
    description: "A presentation Parker A. Lewis gave at Old Parkland in Dallas on December 10th — Bitcoin is the Greatest Asymmetry. It builds on the conclusion of his book, Gradually, Then Suddenly, exploring why bitcoin is the greatest asymmetry in the world today and what a bitcoin standard will look like.",
  },
];

export const farringtonItems = [
  {
    title: "Number Go Down",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/0dee233b5_IMG_8769.jpg",
    url: "https://x.com/allenf32/status/2045477517201477686",
    externalOnly: true,
    description: "Allen Farrington and Sacha Meyers dismantle the fiat economist's fear of deflation — distinguishing good deflation (the dividend of entrepreneurial progress) from bad deflation (the penance of credit unwinds) — and argue that in a society with honest money, the number should go down.",
  },
];

export const unchainedItems = [
  {
    title: "21 Million is Non-Negotiable",
    icon: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ccb146dd7_IMG_9252.jpeg",
    url: "https://www.unchained.com/blog/21-million-is-non-negotiable",
    externalOnly: true,
    externalLabel: "Read article",
    description: "An essay from Unchained on why Bitcoin's fixed supply of 21 million is the one line that cannot be moved — the engineering, incentive, and consensus reasons no one can credibly change the cap, and why that certainty is the foundation of Bitcoin's value.",
  },
];

export default function ArchiveSection() {
  return (
    <section id="archive" className="relative py-12 md:py-16">
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Essays list — two columns on desktop to reduce scrolling */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {essays.map((item, i) => (
            <LiteratureCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Bitcoin Bill Reading List */}
        <div className="mt-12 md:mt-16 mb-12 md:mb-16">
          <ReadingListLink />
        </div>

        {/* Saifedean Ammous section */}
        <div className="mt-12 md:mt-16 mb-8 md:mb-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-3">
            Further Reading
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-ink leading-tight">
            Saifedean Ammous
          </h2>
          <div className="w-12 h-px bg-[var(--page-accent)] mt-4" />
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {saifedeanItems.map((item, i) => (
            <LiteratureCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Parker A. Lewis section */}
        <div className="mt-12 md:mt-16 mb-8 md:mb-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-3">
            Further Reading
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-ink leading-tight">
            Parker A. Lewis
          </h2>
          <div className="w-12 h-px bg-[var(--page-accent)] mt-4" />
          <img
            src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/8c1a70660_IMG_8767.jpeg"
            alt="Parker A. Lewis"
            className="w-16 h-16 md:w-20 md:h-20 mt-6 object-cover"
          />
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {parkerLewisItems.map((item, i) => (
            <LiteratureCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Allen Farrington section */}
        <div className="mt-12 md:mt-16 mb-8 md:mb-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-3">
            Further Reading
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-ink leading-tight">
            Allen Farrington
          </h2>
          <div className="w-12 h-px bg-[var(--page-accent)] mt-4" />
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {farringtonItems.map((item, i) => (
            <LiteratureCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Further Reading */}
        <div className="mt-12 md:mt-16 mb-8 md:mb-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-3">
            Further Reading
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-ink leading-tight">
            Phil Geiger
          </h2>
          <p className="font-mono text-xs text-lead/70 mt-1 tracking-wide">
            unchained.com
          </p>
          <div className="w-12 h-px bg-[var(--page-accent)] mt-4" />
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {unchainedItems.map((item, i) => (
            <LiteratureCard key={item.title} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}