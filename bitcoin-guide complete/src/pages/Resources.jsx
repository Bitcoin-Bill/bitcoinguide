import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ResourceLink from "@/components/resources/ResourceLink";

export const sections = [
  {
    title: "Introduction",
    subtitle: "Start here — videos to understand the basics of Bitcoin and money.",
    links: [
      {
        title: "What is Bitcoin?",
        url: "https://www.youtube.com/watch?v=Gc2en3nHxA4",
        description: "A clear, accessible introduction to what Bitcoin is and how it works.",
      },
      {
        title: "What is Bitcoin? Explained in 3 Minutes",
        url: "https://youtu.be/BL5vUVQvmX4",
        description: "A quick, kid-friendly 3-minute explanation of Bitcoin from Tuttle Twins.",
      },
      {
        title: "The History of Money Explained Easy as a Cartoon",
        url: "https://youtu.be/we222w0GKAo",
        description: "A fun animated walkthrough of how money evolved — from seashells to gold to fiat to Bitcoin.",
      },
      {
        title: "How Money & Banking Work (and Why They're Broken Today)",
        url: "https://youtu.be/jk_HWmmwiAs",
        description: "Lyn Alden takes a step back through history to explain the intricacies of money and banking — and why our financial system is failing us.",
      },
      {
        title: "What's The Problem?",
        url: "https://youtu.be/YtFOxNbmD38",
        description: "Joe Bryan uses an engaging story of two societies to show how the root of most of our problems lies in the quality of our money — and why Bitcoin is the solution.",
      },
      {
        title: "The Lightning Network Explained in 90 Seconds",
        url: "https://x.com/simpleminingio/status/1982794055349334101?s=20",
        description: "A short, clear video from Simple Mining that explains the Lightning Network — Bitcoin's layer 2 for instant, low-fee payments — in just 90 seconds.",
      },
      {
        title: "Bitcoin.org — Getting Started",
        url: "https://bitcoin.org/en/",
        description: "The original community resource for Bitcoin — how it works, getting started guides, how to choose a wallet, and developer documentation. Available in 30+ languages.",
      },
      {
        title: "Bitcoin Mining Explained",
        url: "https://youtu.be/G3_3RTXl9uI",
        description: "A 3-minute beginner-friendly explainer from CoinGeek covering how Bitcoin mining works — miners, nodes, transaction processing, block rewards, and transaction fees.",
      },
      {
        title: "How Does Bitcoin Mining ACTUALLY Work? Explained In 3 Minutes",
        url: "https://youtu.be/4HTtZhhXiAw",
        description: "CoinGecko's clear breakdown of Bitcoin mining — the guessing game of proof-of-work, difficulty adjustment, why it's hard, and how it secures the network.",
      },
      {
        title: "Bitcoin Mining & Energy: Bitcoin Atlantis 2024 Panel",
        url: "https://youtu.be/LbqFab9OXtA",
        description: "A panel from Bitcoin Atlantis 2024 featuring entrepreneurs using Bitcoin mining heat for greenhouses, district heating, water desalination, and more — showing how mining waste heat is being repurposed across Europe.",
      },
      {
        title: "15 Quick Bitcoin Videos for Newbies",
        url: "https://x.com/JayW132/status/1892266476041589090?s=20",
        description: "Jordan Walker's curated thread of 10+ short videos covering the problem Bitcoin fixes, what it is, scarcity, inflation, resilience, and more — perfect for sharing with friends just starting their Bitcoin journey.",
      },
      {
        title: "Cyphermunk House — London Bitcoin Hub",
        url: "https://www.cyphermunkhouse.com/",
        description: "London's Bitcoin community and open-source culture hub — meetups, workshops, and events, plus curated short-form articles (Boyapati, Lewis, DerGigi) and films to read and watch about Bitcoin.",
      },
      {
        title: "Bitcoin Degree — YouTube Shorts",
        url: "https://www.youtube.com/@BitcoinDegree/shorts",
        description: "Bite-sized educational YouTube Shorts covering Bitcoin fundamentals — quick, visual explainers perfect for onboarding new bitcoiners in under a minute each.",
      },
      {
        title: "XRP, RLUSD, and Ripple Labs Explained — Is XRP a Scam?",
        url: "https://youtu.be/ZJKfub1mbzI",
        description: "Forrest HODL's deep dive on XRP and Ripple Labs — what XRP is, how it differs from Bitcoin, why it's a pre-mined token controlled by a private company, and why pricing it in Bitcoin tells the real story. Essential viewing for anyone tempted by altcoin hype.",
      },
      {
        title: "What is Nostr?",
        url: "https://www.youtube.com/watch?v=5W-jtbbh3eA",
        description: "A short, clear explainer from LNbits — Nostr (Notes and Other Stuff Transmitted by Relays) is a simple, decentralized protocol that lets users sign and share notes without corporate platforms. Learn how it could replace Twitter and other centralized services.",
      },
    ],
  },
  {
    title: "Where to Buy Bitcoin",
    subtitle: "Exchanges and on-ramps for Canada, the US, and beyond.",
    links: [
      {
        title: "Bull Bitcoin",
        url: "https://www.bullbitcoin.com/",
        description: "A non-custodial Bitcoin exchange and OTC desk — buy, sell, and spend Bitcoin with self-custody. Available in Canada, Europe, Mexico, Costa Rica, Argentina, and Colombia.",
      },
      {
        title: "Strike",
        url: "https://strike.me/",
        description: "An all-in-one Bitcoin platform — buy, sell, send, spend, and borrow against bitcoin with ultra-low fees, no limits, and Lightning Network integration. Licensed and regulated in the US.",
      },
      {
        title: "Shakepay",
        url: "https://shakepay.com/",
        description: "A Canadian Bitcoin exchange — buy and sell bitcoin commission-free, earn free bitcoin by shaking your phone daily, and get up to 1.5% cashback on spending. Regulated and CIRO-registered.",
      },
    ],
  },
  {
    title: "Cold Storage & Hardware Wallets",
    subtitle: "Take control of your keys with self-custody tools.",
    links: [
      {
        title: "Sparrow Wallet",
        url: "https://sparrowwallet.com/",
        description: "A desktop Bitcoin wallet built for security, privacy, and usability — supports single sig and multisig, all common hardware wallets, full coin and fee control, and built-in Tor. Free and open source.",
      },
      {
        title: "COLDCARD Q",
        url: "https://coldcard.com/q",
        description: "Coinkite's most advanced Bitcoin hardware wallet — full QWERTY keyboard, built-in QR scanner, dual secure elements, air-gapped operation, and trick PIN features like duress wallets and brick codes.",
      },
      {
        title: "Bitcoin Security Guide",
        url: "https://bitcoinsecurity.org/",
        description: "A comprehensive guide to Bitcoin self-custody — covering hardware wallets, metal backups, passphrases, privacy, and operational security best practices. Start here if you're new to holding your own keys.",
      },
      {
        title: "Start9 — Sovereign Computing",
        url: "https://start9.com/",
        description: "Run your own private server with StartOS — discover, install, and manage open-source software like Bitcoin nodes, Electrum servers, and more, all from your own hardware. Take back control of your data and your sovereignty.",
      },
      {
        title: "Umbrel — Your Cloud, In Your Home",
        url: "https://umbrel.com/",
        description: "A plug-and-play home server with umbrelOS — run your own Bitcoin node, store files privately, stream media, block ads network-wide, and self-host AI models. Available as Umbrel Home hardware or free to install on your own device.",
      },
      {
        title: "Stay Sovereign — Sovereignty Score Quiz",
        url: "https://staysovereign.vercel.app/",
        description: "Answer 12 questions about your Bitcoin setup and get a Sovereignty Score from 0–100 with personalized recommendations to close your security gaps. Covers key custody, seed backup, inheritance, and privacy.",
      },
      {
        title: "Bitcoin Self-Custody vs. Custodial — Full Guide (PDF)",
        url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/5ec25af38_Bitcoin-Self-Custody-vs-Custodial.pdf",
        description: "A comprehensive, proofread and expanded guide to understanding your custody options — what self-custody and custodial storage mean, the trade-offs of each, and how to choose. Covers app wallets (Phoenix, Muun, Manna), hardware wallets (COLDCARD, Jade, Trezor), seed backup on steel (SEEDPLATE, Stamp Seed), multisig with Unchained Capital and Casa, running your own node (Start9, Umbrel), Bitcoin mining as an acquisition strategy, and step-by-step buying guides for Canadians and US users. Download or view in browser.",
      },
      {
        title: "Mullvad VPN",
        url: "https://mullvad.net/en",
        description: "A privacy-focused VPN with no logging and anonymous accounts — encrypt your traffic, mask your IP address, and protect your online activity from mass surveillance and data collection. €5/month, open source, available on all platforms.",
      },
      {
        title: "Bitaxe — Open Source Bitcoin Miner",
        url: "https://www.bitaxe.org/",
        description: "A fully open-source, standalone Bitcoin miner you can run at home — plugs in over Wi-Fi, no external computer needed. Quiet, low power, and mine to any stratum pool. Pair with your own node for top-to-bottom self-sovereign Bitcoin mining.",
      },
      {
        title: "Solo Satoshi — Bitcoin Hardware Shop",
        url: "https://www.solosatoshi.com/",
        description: "A trusted shop for Bitcoin solo miners and hardware — Bitaxe, Nerdaxe, Avalon, Blockstream Jade wallets, and Start9 servers. Everything you need to mine, store, and run your own Bitcoin infrastructure, all in one place.",
      },
    ],
  },
  {
    title: "Seed Backup",
    subtitle: "Durable, physical backups for your seed phrase.",
    links: [
      {
        title: "SEEDPLATE",
        url: "https://seedplate.com/",
        description: "A steel seed backup plate by Coinkite — etch your 12 or 24-word recovery phrase into tough 2mm steel, 12 words per side. Fire-resistant, crush-resistant, and designed to last forever.",
      },
      {
        title: "Stamp Seed",
        url: "https://www.stampseed.com/",
        description: "A titanium seed stamping kit — stamp your full recovery words into solid titanium with deep, clear letters. Fire-resistant, crush-resistant, non-corrosive, and waterproof. Includes a practice piece and alignment jig.",
      },
    ],
  },
  {
    title: "Cold Storage with Inheritance",
    subtitle: "Institutional-grade custody with inheritance services.",
    links: [
      {
        title: "Casa — Multisig Self-Custody & Inheritance",
        url: "https://casa.io/",
        description: "A Bitcoin self-custody platform with multi-key vault security — multiple keys across devices and locations protect against hacks, wrench attacks, human error, device failure, and natural disasters. Includes white-glove support, inheritance planning to pass bitcoin to your family, a dedicated OTC trading desk, and an in-app buy/sell with low fees. Over $10 billion protected for 40,000+ clients since 2018.",
      },
      {
        title: "Unchained — Collaborative Custody & Financial Services",
        url: "https://www.unchained.com/",
        description: "Bitcoin financial services with collaborative multisig custody — you hold your own keys while Unchained holds one, giving you institutional-grade security without giving up control. Includes cold storage vaults, Bitcoin IRAs (roll over your 401(k) into real bitcoin), a trading desk that settles direct to your vault, bitcoin-backed loans with zero rehypothecation, and a full inheritance system.",
      },
    ],
  },
  {
    title: "App Wallets",
    subtitle: "Mobile wallets for everyday Bitcoin use.",
    links: [
      {
        title: "Phoenix Wallet",
        url: "https://phoenix.acinq.co/",
        description: "A non-custodial Bitcoin wallet with native Lightning support — send and receive bitcoin instantly and cheaply. Phoenix handles channel management under the hood, so you barely notice it's Lightning. Available on iOS and Android.",
      },
      {
        title: "Manna Bitcoin",
        url: "https://mannabitcoin.com/",
        description: "A self-custodial Bitcoin payments wallet — Lightning-fast payments, integrated merchant toolkit with point-of-sale, built-in encrypted messaging, and a BTC merchant map. No personal data required. Available on iOS and Android.",
      },
      {
        title: "Muun",
        url: "https://muun.com/",
        description: "A self-custodial wallet for Bitcoin and Lightning — make all payments from a single balance with a mempool-based fee estimator that avoids overpaying. 2-of-2 multisig security with an Emergency Kit for recovery. Available on iOS and Android.",
      },
    ],
  },
  {
    title: "Spend & Earn Bitcoin",
    subtitle: "Bitcoin rewards, payments, and the circular economy.",
    links: [
      {
        title: "Fold — Bitcoin Rewards Card",
        url: "https://foldapp.com/",
        description: "A personal finance platform powered by Bitcoin — earn sats on every swipe with the Fold Visa Card, buy bitcoin with zero fees, pay bills for rewards, split your paycheck between cash and bitcoin, and withdraw cash at any ATM. Stack sats passively on everyday spending.",
      },
      {
        title: "Speed — Lightning Payment Gateway",
        url: "https://www.tryspeed.com/",
        description: "A Lightning payment gateway for businesses — accept Bitcoin and stablecoin payments with instant settlement, low fees, and global scalability. APIs, POS integrations, onramp/offramp, and payouts, all on one unified platform. Backed by Tether.",
      },
      {
        title: "Airbtc — Bitcoin-Friendly Stays",
        url: "https://www.airbtc.online/",
        description: "Book Bitcoin-friendly stays and travel the world paying in bitcoin — browse listings, plan your trip, or list your own property. Airbtc is evolving into Hodliday with the same mission and a better experience.",
      },
      {
        title: "Support the Bitcoin Guide — Donate via Lightning",
        url: "https://buy.tryspeed.com/plink_live_m7s1lvyvbSoFIppP",
        description: "Support this project with a Lightning donation — pay $1 in BTC, USDT, or USDC over Lightning or on-chain, and receive an access code to download 'Escaping the Fiat Matrix: The Case for Bitcoin.' Powered by Speed.",
      },
    ],
  },
  {
    title: "Books",
    subtitle: "Essential Bitcoin reading, available for free.",
    links: [
      {
        title: "SOFTWAR — Audiobook",
        url: "https://youtu.be/P5yBrxQARY8",
        description: "An unofficial audiobook of 'Softwar: A Novel Theory on Power Projection and the National Strategic Significance of Bitcoin' by Jason P. Lowery — exploring Bitcoin not just as money, but as a new form of electro-cyber power projection and national strategic security technology.",
      },
      {
        title: "The Bitcoin Whitepaper",
        url: "https://ugc.production.linktr.ee/301f8849-6738-45d3-b07a-93e78aac039f_bitcoin-whitepaper.pdf",
        description: "Satoshi Nakamoto's original 2008 whitepaper — 'Bitcoin: A Peer-to-Peer Electronic Cash System.' The foundational document that started it all. Nine pages that changed the world.",
      },
      {
        title: "21 Truths of Bitcoin — Michael Saylor",
        url: "https://assets.contentstack.io/v3/assets/bltdef7a3f3c28ddd84/bltc220da119bbf3c34/67dc7adb37e25aa78d1e3ca5/Digital_Assets_25_Final.pdf",
        description: "Michael Saylor's concise presentation of 21 truths about Bitcoin — from ideology and protocol to digital energy, digital defense, and an emerging solar system. A powerful distillation of why Bitcoin matters.",
      },
      {
        title: "Konsensus — Books for Liberty",
        url: "https://konsensus.net/books/",
        description: "A curated bookstore of 78 Bitcoin and liberty-focused titles — from Svanholm, Saylor, and Rothbard to fiction anthologies and self-help. Many titles available as free eBooks or audiobooks. Build your own reading list and send it to a friend.",
      },
      {
        title: "Bitlyrics — Bitcoin Blog",
        url: "https://bitlyrics.wordpress.com/",
        description: "A Bitcoin blog featuring articles and full transcripts — including the 'Boiling the Oceans' panel on what Bitcoin mining does besides mining, financial freedom across 25 countries, and Bitcoin's role in Africa.",
      },
      {
        title: "Tuttle Twins — Books for Kids",
        url: "https://www.tuttletwins.com/",
        description: "An innovative series of colorful, engaging children's books that use storytelling to teach economics, liberty, civics, and real history — including titles on money, inflation, and free markets. For ages 5–12 and teens.",
      },
      {
        title: "The Saif House — Bitcoin Bookstore",
        url: "https://thesaifhouse.com/",
        description: "Saifedean Ammous's official bookstore — the best Bitcoin books delivered worldwide in all formats (hardcover, ebook, audiobook). Includes The Bitcoin Standard, The Fiat Standard, Principles of Economics, Fiat Food, Broken Money, Gradually Then Suddenly, and more. Pay with Bitcoin on-chain or Lightning for 10% off, with bulk discounts up to 33% off.",
      },
    ],
  },
  {
    title: "Podcasts",
    subtitle: "Listen and learn on the go.",
    links: [
      {
        title: "The Bitcoin Standard Podcast — Strike with Jack Mallers",
        url: "https://youtu.be/FqWGQZJevH0",
        description: "Saifedean Ammous interviews Strike CEO Jack Mallers on Bitcoin as a global financial services platform, how Strike operates across 100+ markets, and how people worldwide are using Bitcoin to escape fiat and store wealth.",
      },
      {
        title: "Joe Burnett — YouTube Channel",
        url: "https://www.youtube.com/@JoeBurnett27",
        description: "Joe Burnett's Bitcoin analysis channel — market simulations, wealth shortage dynamics, energy-driven price models, AI and Bitcoin collateral, and deep-dive collaborations with analysts like Joe Consorti and Luke Gromen.",
      },
    ],
  },
  {
    title: "Charts & Data",
    subtitle: "On-chain data, metrics, and visualizations.",
    links: [
      {
        title: "BTC Frame — Live Bitcoin Dashboard",
        url: "https://btcframe.com/dashboard/",
        description: "A real-time Bitcoin dashboard — price, sats per dollar, block height, hash rate, network difficulty, circulating supply, market cap, transaction fees, and the next difficulty adjustment, all on a single clean page.",
      },
      {
        title: "Timechain Calendar",
        url: "https://timechaincalendar.com/en",
        description: "A beautiful Bitcoin timechain calendar — live block height, halving countdown, difficulty adjustment progress, mempool depth, block production timing, hashrate, and the full subsidy/fee/reward breakdown for each block.",
      },
      {
        title: "Root (@therationalroot) — On-chain & Cycle Analyst",
        url: "https://x.com/therationalroot?s=20",
        description: "Root is a Bitcoin on-chain and cycle analyst supported by Bitcoin Magazine and Roxom — sharing data-driven insights on Bitcoin's 4-year cycles, realized price, and market sentiment. Follow for clear, chart-based Bitcoin analysis.",
      },
      {
        title: "Clark Moody — Bitcoin Dashboard",
        url: "https://bitcoin.clarkmoody.com/dashboard/",
        description: "A comprehensive real-time Bitcoin dashboard — price, market cap, gold comparison, corporate treasury holdings, supply metrics, blockchain stats, Lightning Network capacity, mining economics, difficulty retarget, and transaction rates.",
      },
      {
        title: "Strategy (MSTR) — Bitcoin Treasury Dashboard",
        url: "https://www.strategy.com/",
        description: "Michael Saylor's Strategy (formerly MicroStrategy) — a live dashboard tracking MSTR price, Bitcoin per share in sats, BTC reserve, market cap, enterprise value, and debt. The world's first publicly traded Bitcoin treasury company.",
      },
    ],
  },
  {
    title: "Nostr",
    subtitle: "A decentralized, censorship-resistant social protocol built on Bitcoin & Lightning.",
    links: [
      {
        title: "Nostr — Official Site",
        url: "https://nostr.com/",
        description: "Nostr (Notes and Other Stuff Transmitted by Relays) — a simple, open, decentralized protocol that lets users sign and share notes using cryptographic key pairs. No central authority, no registration, no censorship. Anyone can build a client or run a relay.",
      },
      {
        title: "Damus — Nostr Social Client",
        url: "https://damus.io/",
        description: "The most popular Nostr client — a social network you control, available on iOS, Android, and desktop. No ads, no addictive algorithms, no censorship. Tip friends and stack sats with Bitcoin & Lightning. Banned in China within two days of launch.",
      },
      {
        title: "Primal — Nostr Client & Infrastructure",
        url: "https://primal.net/home",
        description: "A fast, feature-rich Nostr client with a beautiful feed, built-in Lightning zaps, and media support. Primal also provides the relay and infrastructure layer that powers the Nostr ecosystem at scale.",
      },
    ],
  },
  {
    title: "Bitcoin Mining & Green Energy",
    subtitle: "Sustainable Bitcoin mining and energy infrastructure investments.",
    links: [
      {
        title: "CGCSC — Green Energy Bitcoin Mining",
        url: "https://cgcsc.tech/",
        description: "A green energy and Bitcoin mining company in Alberta, Canada — developing 5–100 MW facilities on 140+ acres near Calgary, with 10 additional sites totaling 1,100 MW planned in BC. Combines carbon capture, data center infrastructure, and BTC treasury holdings with Indigenous community partnerships.",
      },
    ],
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-3">
            Curated by Bitcoin Bill
          </p>
          <div className="flex items-center gap-3 mb-2">
            <img
              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ba056143e_Newblock-2.png"
              alt="Bitcoin Guide"
              className="h-12 w-12 md:h-14 md:w-14 object-contain"
            />
            <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight">
              Resources
            </h1>
          </div>
          <p className="font-heading text-lg text-lead italic mb-3">
            Everything you need to buy, store, and understand Bitcoin.
          </p>
          <p className="font-mono text-[10px] tracking-widest uppercase text-verdigris/50 border border-verdigris/30 inline-block px-2 py-1 rounded mb-6">
            Hover any link to preview
          </p>
          <div className="w-12 h-px bg-verdigris" />
        </div>
      </section>

      <section className="relative pb-20">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {sections.map((section, si) => (
            <div key={si} className="mb-12 md:mb-16">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-2">
                {section.title}
              </p>
              <p className="font-body text-sm text-lead/80 mb-6 max-w-xl">
                {section.subtitle}
              </p>

              <div className="flex flex-col gap-3">
                {section.links.length > 0 ? (
                  section.links.map((link, li) => (
                    <ResourceLink key={li} link={link} />
                  ))
                ) : (
                  <p className="font-mono text-xs text-lead/30 italic border border-dashed border-border p-5">
                    Coming soon
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}