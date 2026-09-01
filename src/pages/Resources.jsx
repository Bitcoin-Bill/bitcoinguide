import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowUp, Boxes } from "lucide-react";
import ResourceLink from "@/components/resources/ResourceLink";
import ReadingListLink from "@/components/resources/ReadingListLink";
import ResourceSectionNav from "@/components/resources/ResourceSectionNav";


export const sections = [
  {
    title: "Introduction",
    subtitle: "Start here — videos to understand the basics of Bitcoin and money.",
    links: [
      {
        title: "What is Bitcoin?",
        url: "https://www.youtube.com/watch?v=Gc2en3nHxA4",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1a0cce762_WhatisBitcoin.png",
        description: "A clear, accessible introduction to what Bitcoin is and how it works.",
      },
      {
        title: "How Money & Banking Work (and Why They're Broken Today)",
        url: "https://youtu.be/jk_HWmmwiAs",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/24c683137_Screenshot2026-07-19at114324AM.png",
        fit: "contain",
        description: "Lyn Alden takes a step back through history to explain the intricacies of money and banking — and why our financial system is failing us.",
      },
      {
        title: "What's The Problem?",
        url: "https://youtu.be/YtFOxNbmD38",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/2cea34207_WhatstheProblem.png",
        description: "Joe Bryan uses an engaging story of two societies to show how the root of most of our problems lies in the quality of our money — and why Bitcoin is the solution.",
      },
      {
        title: "If You Don't Have Bitcoin in Self-Custody — Joe Bryan",
        url: "https://video.twimg.com/amplify_video/2061765370034180096/vid/avc1/1920x1080/cKsD-0dxekDq1D1J.mp4?tag=27",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/64cb4deea_Screenshot2026-07-19at104248AM.png",
        description: "Joe Bryan's presentation to treasury company shareholders at the first UK Bitcoin Treasuries conference — making the case that if you don't hold Bitcoin in self-custody, you're on the wrong side of the wall. Shares can be useful exposure, but Bitcoin only really becomes yours when you hold the keys.",
      },
      {
        title: "What is Bitcoin? Explained in 3 Minutes",
        url: "https://youtu.be/BL5vUVQvmX4",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/b8894e7a8_Whatisbitcoinforkids.png",
        description: "A quick, kid-friendly 3-minute explanation of Bitcoin from Tuttle Twins.",
      },
      {
        title: "The History of Money Explained Easy as a Cartoon",
        url: "https://youtu.be/we222w0GKAo",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/eded87be9_TheHistoryofMoneyexplainedin3minutes.png",
        description: "A fun animated walkthrough of how money evolved — from seashells to gold to fiat to Bitcoin.",
      },
    ],
  },
  {
    title: "Where to Buy Bitcoin",
    subtitle: "Exchanges and on-ramps for Canada, the US, and beyond.",
    links: [
      {
        title: "Bitcoin Well",
        url: "https://bitcoinwell.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/40fa4e03d_7D938F96-1A3B-4CA1-AA69-629E5A0659B2.png",
        fit: "contain",
        description: "A non-custodial Bitcoin platform that delivers real bitcoin directly to your personal wallet — you hold the keys from the start. Buy and sell with ACH settlement, CAD funding, and a premium OTC desk (Bitcoin Well Infinite) for transfers of $50,000+. Publicly traded (OTCQB: BCNWF), FinCEN-registered MSB, serving bitcoiners since 2013.",
      },
      {
        title: "Bull Bitcoin",
        url: "https://www.bullbitcoin.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/51a3364ca_Screenshot2026-07-19at105308AM.png",
        description: "A non-custodial Bitcoin exchange and OTC desk — buy, sell, and spend Bitcoin with self-custody. Available in Canada, Europe, Mexico, Costa Rica, Argentina, and Colombia.",
      },
      {
        title: "Strike",
        url: "https://strike.me/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/98084e5b2_Screenshot2026-07-19at105402AM.png",
        description: "An all-in-one Bitcoin platform — buy, sell, send, spend, and borrow against bitcoin with ultra-low fees, no limits, and Lightning Network integration. Licensed and regulated in the US.",
      },
      {
        title: "Shakepay",
        url: "https://shakepay.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/f7731c7b3_Screenshot2026-07-19at105418AM.png",
        description: "A Canadian Bitcoin exchange — buy and sell bitcoin commission-free, earn free bitcoin by shaking your phone daily, and get up to 1.5% cashback on spending. Regulated and CIRO-registered.",
      },
      {
        title: "OKX",
        url: "https://www.okx.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/50ff0ced8_Screenshot2026-07-30at40653PM.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/625385e18_Screenshot2026-07-30at40643PM.png",
        fit: "contain",
        description: "A global crypto exchange — buy, sell, and trade Bitcoin and hundreds of digital assets with spot, margin, futures, and options markets. Includes an integrated Web3 wallet, earn products, and a mobile app. Available worldwide with deep liquidity and low fees.",
      },
    ],
  },
  {
    title: "Guides & Tools",
    subtitle: "Essential guides and interactive tools for your Bitcoin journey — start with the EntropyLab air-gapped calculator and the full self-custody guide.",
    links: [
      {
        title: "Learn to Bitcoin",
        url: "https://learntobitcoin.org/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/8dd2206c9_IMG_9250.jpg",
        fit: "contain",
        description: "A practical starting point for your Bitcoin journey — start with small amounts and learn the custody boundary before the balance gets serious.",
      },
      {
        title: "Bitcoin Self-Custody vs. Custodial — Full Guide (PDF)",
        url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/8e6d86cf3_Bitcoin-Self-Custody-vs-Custodial.pdf",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/834ed770f_Newblock-3.png",
        description: "A comprehensive, proofread and expanded guide to understanding your custody options — what self-custody and custodial storage mean, the trade-offs of each, and how to choose. Covers app wallets (Phoenix, Muun, Manna), hardware wallets (Jade, Trezor), seed backup on steel (SEEDPLATE, Stamp Seed), multisig with Unchained Capital and Casa, running your own node (Start9, Umbrel), Bitcoin mining as an acquisition strategy, and step-by-step buying guides for Canadians and US users. Download or view in browser.",
      },
      {
        title: "Bitcoin.org — Getting Started",
        url: "https://bitcoin.org/en/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/edd1b1d9f_Bitcoin-opensourcep2pmoneybitcoinorg.png",
        description: "The original community resource for Bitcoin — how it works, getting started guides, how to choose a wallet, and developer documentation. Available in 30+ languages.",
      },
      {
        title: "Stay Sovereign — Sovereignty Score Quiz",
        url: "https://staysovereign.vercel.app/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/fd6683d3c_Selfcustodyscorecard.png",
        description: "Answer 12 questions about your Bitcoin setup and get a Sovereignty Score from 0–100 with personalized recommendations to close your security gaps. Covers key custody, seed backup, inheritance, and privacy.",
      },
      {
        title: "EntropyLab — Air-Gapped Bitcoin Calculator",
        url: "https://entropylab.online/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1bb5221ca_IMG_0225.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/6350497ea_IMG_0226.png",
        fit: "contain",
        description: "A free, open-source, air-gapped Bitcoin calculator built as a collaboration from multiple contributors (github.com/w-s-bitcoin/entropylab). Save it to a removable drive and run it on a computer that never goes online. Turn dice rolls or an existing seed into receive addresses, export an xpub for a watch-only wallet, build multisig, and inspect PSBTs, all without exposing your private keys to the internet. Supports multiple dice-roll methods (COLDCARD, SeedSigner, Keystone, BitBox diceware, D++) and an optional BIP39 passphrase.",
      },
      {
        title: "Wicked Smart Bitcoin — Bitcoin Dashboards",
        url: "https://wickedsmartbitcoin.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/84eefe023_Screenshot2026-07-29at103524PM.png",
        description: "A collection of interactive Bitcoin dashboards from Wicked — track Bitcoin net worth, quantum exposure, DCA cost basis, issuance rate, Bitcoin dominance, node count, and more. Live block height, supply, hashrate, and difficulty data with timezone-aware charts.",
      },
    ],
  },
  {
    title: "Cold Storage & Hardware Wallets",
    subtitle: "Take control of your keys with self-custody tools. Start here if you're new to holding your own keys.",
    links: [
      {
        title: "Blockstream Jade — Hardware Wallet",
        url: "https://blockstream.com/jade/",
        thumbnail: "https://blockstream.com/img/jade/plus_compare.svg",
        thumbnailDark: "https://blockstream.com/img/jade/plus_compare.svg",
        fit: "contain",
        description: "Blockstream's open-source, air-gapped Bitcoin hardware wallet — secure self-custody with a camera-based QR workflow, no direct USB data connection, native multisig and BIP39 passphrase support, and full compatibility with Sparrow, BlueWallet, and the Blockstream App. Available as Jade and the enhanced Jade Plus. Confirmed unaffected by the recent COLDCARD entropy vulnerability.",
      },
      {
        title: "Trezor Suite — Hardware Wallet App",
        url: "https://trezor.io/trezor-suite",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/402a8c32d_trezor2.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/402a8c32d_trezor2.png",
        fit: "contain",
        description: "The official companion app for Trezor hardware wallets — securely buy, sell, swap, and manage your Bitcoin and thousands of other coins from desktop or mobile (iOS and Android) while keeping full control of your private keys. Built-in Tor, coin control, Taproot, passphrase support, discreet mode, and the option to connect to your own full node for total self-sovereignty. Pairs with Trezor Safe 7, Safe 5, Safe 3, Model T, and Model One.",
      },
      {
        title: "Bitkey — Bitcoin Self-Custody Wallet",
        url: "https://bitkey.world/",
        thumbnail: "https://cdn.sanity.io/images/ozrlz7k9/production/f138b46ddf129bdb679991ecae977bbc8479769e-1920x1920.png",
        thumbnailDark: "https://cdn.sanity.io/images/ozrlz7k9/production/f138b46ddf129bdb679991ecae977bbc8479769e-1920x1920.png",
        fit: "contain",
        description: "A bitcoin-only self-custody wallet built as one integrated system — a 2-of-3 multisig setup where you hold two keys (the hardware device and your phone app) and Bitkey's server holds the third, so there's no single point of failure and no seed phrase to manage. On-device OLED touchscreen lets you verify transactions and sensitive changes right on the device, with a biometric fingerprint sensor, NFC connectivity, and up to a year of battery life. Includes built-in inheritance so your bitcoin passes to your family if something happens to you.",
      },
      {
        title: "BitBox02 — Swiss Hardware Wallet",
        url: "https://bitbox.swiss/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/bf38b6e27_Screenshot2026-07-31112626.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/bf38b6e27_Screenshot2026-07-31112626.png",
        fit: "contain",
        description: "A Swiss-made Bitcoin hardware wallet by Shift Crypto — over ten years of self-custody engineering in a compact USB-C device. Pioneered the dual-chip security architecture: a secure chip (EAL6+ on the Nova) paired with fully open-source firmware for transparency you can verify. Instant microSD backup and recovery, touch sliders for a premium input feel, and a companion desktop app that pairs with your own full node for total sovereignty. Available as the BitBox02 and the new BitBox02 Nova.",
      },
      {
        title: "SeedSigner — Open-Source Air-Gapped Signer",
        url: "https://seedsigner.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/9f00c5158_Screenshot2026-07-31113559.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/9f00c5158_Screenshot2026-07-31113559.png",
        fit: "contain",
        description: "A fully open-source, air-gapped Bitcoin signing device you can build yourself for around $50 in off-the-shelf parts (Raspberry Pi Zero, camera, screen, and a 3D-printed case). State-less by design — it stores no keys persistently, loading your seed via QR code or microSD each session and signing transactions over an air gap with no USB or network connection. Perfect for multisig setups where it serves as one of your keys, and ideal for privacy-minded bitcoiners who want verifiable, sovereign hardware with zero vendor lock-in.",
      },
      {
        title: "Keystone 3 Pro — Air-Gapped Hardware Wallet",
        url: "https://keyst.one/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/52f93d849_Screenshot2026-07-31114332.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/52f93d849_Screenshot2026-07-31114332.png",
        fit: "contain",
        description: "A premier air-gapped Bitcoin hardware wallet with a large 4-inch touchscreen — sign transactions entirely over QR codes with no USB, Bluetooth, or wireless attack surface. Fully open-source firmware (auditable and reproducible builds), secure element chip (EAL 5+), native multisig and BIP39 passphrase support, and compatibility with Sparrow, BlueWallet, and other major coordinators. The fingerprint scanner and on-device verification make confirming transactions intuitive and secure. Bitcoin-only firmware keeps the attack surface minimal.",
      },
      {
        title: "Foundation — Passport Prime Hardware Wallet",
        url: "https://foundation.xyz/?ref=BITCOINBILL",
        thumbnail: "https://storage.googleapis.com/cdn-foundation/website3/images/sections/buybox/gallery-2.jpg",
        fit: "contain",
        description: "Foundation's Passport Prime — the world's first 'Human Authority Hardware,' an open-source device that moves your digital authority onto dedicated, secure hardware. Beyond Bitcoin self-custody keys, it secures 2FA codes, hardware security keys (NFC/USB), and 50GB of encrypted file storage. Runs KeyOS, a Rust microkernel with sandboxed, isolated apps, and pairs with the Envoy mobile app (iOS, Android, and F-Droid) over encrypted QuantumLink Bluetooth. Independently audited and assembled in the USA.",
      },
    ],
  },
  {
    title: "Build Your Own Air-Gapped Wallet",
    subtitle: "Repurpose an older Lenovo ThinkPad into a dedicated, permanently offline Bitcoin signer — the guide, operating systems, and reference videos to do it yourself.",
    links: [
      {
        title: "Air-Gapped ThinkPad — Offline Signer Guide (PDF)",
        url: "https://base44.app/api/apps/6a4d10bcc776843a6d26b955/files/mp/public/6a4d10bcc776843a6d26b955/5120fc432_Air-Gapped-ThinkPad-Guide.pdf",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/60845842c_IMG_9992.jpeg",
        fit: "contain",
        description: "A complete step-by-step guide to repurposing an older Lenovo ThinkPad into a dedicated, permanently offline Bitcoin signer. Covers physically removing the Wi-Fi and Bluetooth cards, locking down the BIOS, installing Tails or a minimal Debian distribution, running Sparrow or Electrum entirely offline, and signing transactions over an air gap using QR codes or a microSD card. Open it in your browser or download it for reference.",
      },
      {
        title: "Tails — Portable Amnesic Operating System",
        url: "https://tails.net/",
        description: "A portable, amnesic OS that runs entirely from a USB stick and leaves no trace on the computer. Every boot starts clean and nothing is saved unless you explicitly configure encrypted persistent storage — the simplest way to guarantee your offline signing environment is fresh and malware-free each session. Download the image and verify its signature before flashing.",
      },
      {
        title: "Debian — The Universal Operating System",
        url: "https://www.debian.org/",
        description: "A free, open-source Linux distribution ideal for a minimal, persistent air-gapped signer. Install it with no desktop (or a minimal one), enable full-disk encryption (LUKS), and never connect the machine to a network after install. Transfer Sparrow or Electrum installers in via USB and verify their GPG signatures offline.",
      },
      {
        title: "How To Replace the Wi-Fi / Bluetooth Card — ThinkPad T460s",
        url: "https://www.youtube.com/watch?v=672t4g6kIJA",
        thumbnail: "https://img.youtube.com/vi/672t4g6kIJA/hqdefault.jpg",
        description: "A clear video walkthrough showing how to safely access and remove the Wi-Fi / Bluetooth card on a Lenovo ThinkPad T460s ultrabook. Use it as a reference for the physical wireless-removal step in the air-gapped guide — the same approach applies to most ThinkPad models with an accessible bottom panel.",
      },
      {
        title: "ThinkPad X230 Wi-Fi Card Replacement Repair",
        url: "https://www.youtube.com/watch?v=78m9nDKnsoI",
        thumbnail: "https://img.youtube.com/vi/78m9nDKnsoI/hqdefault.jpg",
        description: "A full disassembly and Wi-Fi card replacement guide for the Lenovo ThinkPad X230 — one of the most popular cheap, second-hand models for air-gapped builds. Covers opening the chassis, disconnecting the antenna leads, and removing the wireless card so the laptop can never reach a network.",
      },
      {
        title: "Best Buy — Refurbished ThinkPad Laptops",
        url: "https://www.bestbuy.com/site/searchpage.jsp?st=thinkpad+refurbished",
        description: "Best Buy sells refurbished Lenovo ThinkPads — an affordable source of the older, easy-to-open models (T and X series) that make ideal air-gapped signers. Browse the refurbished selection, check the condition rating and return policy, and pick a model with a removable bottom panel and accessible Wi-Fi card.",
      },
    ],
  },
  {
    title: "Desktop Wallet Software",
    subtitle: "Desktop companions for managing your Bitcoin with full coin control and hardware-wallet integration.",
    links: [
      {
        title: "Sparrow Wallet",
        url: "https://sparrowwallet.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/31c455090_SparrowWallet.png",
        description: "A desktop Bitcoin wallet built for security, privacy, and usability — supports single sig and multisig, all common hardware wallets, full coin and fee control, and built-in Tor. Free and open source.",
      },
      {
        title: "Electrum — Bitcoin Wallet",
        url: "https://electrum.org/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/a4bbfb9cb_IMG_9984.jpeg",
        fit: "contain",
        description: "One of the oldest and most trusted Bitcoin wallets — a lightweight, open-source desktop client that connects to remote servers instead of downloading the full blockchain. Features cold storage, hardware wallet integration, multisig, custom fee control, and seed recovery. Available for Windows, macOS, and Linux.",
      },
      {
        title: "Bitcoin Core — Full Node Wallet",
        url: "https://bitcoin.org/en/download",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/885d525f5_IMG_9985.png",
        fit: "contain",
        description: "The original Bitcoin reference client — a full node wallet that validates and stores the entire blockchain, giving you the highest level of security, privacy, and self-sovereignty by verifying every transaction yourself. Run it to strengthen the network and trust no one but your own node. Available for Windows, macOS, and Linux.",
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
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/5ab4366d0_seedplatecom.png",
        description: "A steel seed backup plate by Coinkite — etch your 12 or 24-word recovery phrase into tough 2mm steel, 12 words per side. Fire-resistant, crush-resistant, and designed to last forever.",
      },
      {
        title: "Stamp Seed",
        url: "https://www.stampseed.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/4f4adbf06_Stampseed.png",
        description: "A titanium seed stamping kit — stamp your full recovery words into solid titanium with deep, clear letters. Fire-resistant, crush-resistant, non-corrosive, and waterproof. Includes a practice piece and alignment jig.",
      },
    ],
  },
  {
    title: "Hot Wallets (App Wallets)",
    subtitle: "Mobile wallets for everyday Bitcoin use.",
    links: [
      {
        title: "Phoenix Wallet",
        url: "https://phoenix.acinq.co/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/36bec2dce_phoenix.png",
        description: "A non-custodial Bitcoin wallet with native Lightning support — send and receive bitcoin instantly and cheaply. Phoenix handles channel management under the hood, so you barely notice it's Lightning. Available on iOS and Android.",
      },
      {
        title: "Manna Bitcoin",
        url: "https://mannabitcoin.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/5d13abecb_manna.png",
        description: "A self-custodial Bitcoin payments wallet — Lightning-fast payments, integrated merchant toolkit with point-of-sale, built-in encrypted messaging, and a BTC merchant map. No personal data required. Available on iOS and Android.",
      },
      {
        title: "Muun",
        url: "https://muun.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1cb866794_muun.png",
        description: "A self-custodial wallet for Bitcoin and Lightning — make all payments from a single balance with a mempool-based fee estimator that avoids overpaying. 2-of-2 multisig security with an Emergency Kit for recovery. Available on iOS and Android.",
      },
      {
        title: "BlueWallet",
        url: "https://bluewallet.io/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/608eb3ad2_Screenshot2026-07-30at33951PM.png",
        fit: "contain",
        description: "A popular open-source, non-custodial Bitcoin wallet — supports on-chain and Lightning via a watch-only or custodial Lightning mode, multisig vaults, and full coin control. Available on iOS and Android.",
      },
      {
        title: "Wallet of Satoshi",
        url: "https://www.walletofsatoshi.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/94f672190_Screenshot2026-07-30at34247PM.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/94f672190_Screenshot2026-07-30at34247PM.png",
        fit: "contain",
        description: "A custodial Lightning wallet for iOS and Android — send and receive instant, low-fee Bitcoin payments over the Lightning Network with a simple, beginner-friendly interface. The easiest way to get started with Lightning without managing channels or liquidity.",
      },
    ],
  },
  {
    title: "Lightning Payment Infrastructure",
    subtitle: "SDKs, Layer 2 protocols, and payment gateways for integrating Bitcoin, Lightning, and stablecoin payments into wallets, apps, and businesses — no channels, nodes, or liquidity management required.",
    links: [
      {
        title: "The Lightning Network Explained in 90 Seconds",
        url: "https://x.com/simpleminingio/status/1982794055349334101?s=20",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/78be5a039_Thelightningnetworkexplained.png",
        description: "A short, clear video from Simple Mining that explains the Lightning Network — Bitcoin's layer 2 for instant, low-fee payments — in just 90 seconds.",
      },
      {
        title: "Spark",
        url: "https://www.spark.money/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/e80ad27ab_Screenshot2026-07-30at34523PM.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/e80ad27ab_Screenshot2026-07-30at34523PM.png",
        fit: "contain",
        description: "A Bitcoin Layer 2 for instant, near-zero-cost payments and stablecoins — one SDK adds Bitcoin, Lightning, and stablecoin (USDB, USDC) support to any wallet. Instant 0-conf deposits, sub-second transfers, no nodes or channels to run, true offline receive, and an Issuer SDK for minting tokens natively on Bitcoin. Fully open source; backed by a16z crypto, Paradigm, and Tether.",
      },
      {
        title: "Speed — Lightning Payment Gateway",
        url: "https://www.tryspeed.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ad5ede62d_speed.png",
        description: "A Lightning payment gateway for businesses — accept Bitcoin and stablecoin payments with instant settlement, low fees, and global scalability. APIs, POS integrations, onramp/offramp, and payouts, all on one unified platform. Backed by Tether.",
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
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/076a880ef_Screenshot2026-07-19at104713AM.png",
        description: "A Bitcoin self-custody platform with multi-key vault security — multiple keys across devices and locations protect against hacks, wrench attacks, human error, device failure, and natural disasters. Includes white-glove support, inheritance planning to pass bitcoin to your family, a dedicated OTC trading desk, and an in-app buy/sell with low fees. Over $10 billion protected for 40,000+ clients since 2018.",
      },
      {
        title: "Unchained — Collaborative Custody & Financial Services",
        url: "https://www.unchained.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/379b42d4c_unchained.png",
        description: "Bitcoin financial services with collaborative multisig custody — you hold your own keys while Unchained holds one, giving you institutional-grade security without giving up control. Includes cold storage vaults, Bitcoin IRAs (roll over your 401(k) into real bitcoin), a trading desk that settles direct to your vault, bitcoin-backed loans with zero rehypothecation, and a full inheritance system.",
      },
      {
        title: "AnchorWatch — Insured Bitcoin Custody & Inheritance",
        url: "https://www.anchorwatch.com/",
        thumbnail: "https://cdn.prod.website-files.com/690dad5309b06d61b96c33b8/6916652158202d9ed80ed952_secure-your-bitcoin.webp",
        fit: "contain",
        description: "Bitcoin-native custody and insurance for individuals and institutions — AnchorWatch combines Trident Vault multisig technology with optional Lloyd's of London insurance (up to $500M per customer). Hold your own keys in Flagship Custody or share custody across multiple institutions (MIC). SOC 2 certified, independently audited, with custody models designed for secure inheritance and regulated qualified-custodian service arriving in 2026.",
      },
    ],
  },
  {
    title: "Nodes",
    subtitle: "Run your own Bitcoin node and take full control of your data.",
    links: [
      {
        title: "Umbrel — Your Cloud, In Your Home",
        url: "https://umbrel.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/adda870e1_Screenshot2026-07-19at105008AM.png",
        description: "A plug-and-play home server with umbrelOS — run your own Bitcoin node, store files privately, stream media, block ads network-wide, and self-host AI models. Available as Umbrel Home hardware or free to install on your own device.",
      },
      {
        title: "Start9 — StartOS Personal Server",
        url: "https://start9.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/b3c36e645_IMG_0231.jpeg",
        fit: "contain",
        description: "A sovereign personal server platform — StartOS is a free, open-source operating system that lets you run your own Bitcoin node, Lightning, Electrum server, and dozens of self-hosted services from a single dashboard. Install on your own hardware or buy a pre-built Start9 server. Fully self-sovereign: your data and keys never leave your home.",
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
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/da16afe2b_BTCFrame-Livebitcoindashboard.png",
        description: "A real-time Bitcoin dashboard — price, sats per dollar, block height, hash rate, network difficulty, circulating supply, market cap, transaction fees, and the next difficulty adjustment, all on a single clean page.",
      },
      {
        title: "Root (@therationalroot) — On-chain & Cycle Analyst",
        url: "https://x.com/therationalroot?s=20",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/2da1874b8_TheRationalRootonX.png",
        description: "Root is a Bitcoin on-chain and cycle analyst supported by Bitcoin Magazine and Roxom — sharing data-driven insights on Bitcoin's 4-year cycles, realized price, and market sentiment. Follow for clear, chart-based Bitcoin analysis.",
      },
      {
        title: "Timechain Calendar",
        url: "https://timechaincalendar.com/en",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/730a855f9_Screenshot2026-07-19at11443PM.png",
        description: "A beautiful Bitcoin timechain calendar — live block height, halving countdown, difficulty adjustment progress, mempool depth, block production timing, hashrate, and the full subsidy/fee/reward breakdown for each block.",
      },
      {
        title: "Clark Moody — Bitcoin Dashboard",
        url: "https://bitcoin.clarkmoody.com/dashboard/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1d9f0837e_ClarkMoodyLivefinancials.png",
        description: "A comprehensive real-time Bitcoin dashboard — price, market cap, gold comparison, corporate treasury holdings, supply metrics, blockchain stats, Lightning Network capacity, mining economics, difficulty retarget, and transaction rates.",
      },
      {
        title: "Strategy (MSTR) — Bitcoin Treasury Dashboard",
        url: "https://www.strategy.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/4e977d70d_Screenshot2026-07-19at114623AM.png",
        fit: "contain",
        description: "Michael Saylor's Strategy (formerly MicroStrategy) — a live dashboard tracking MSTR price, Bitcoin per share in sats, BTC reserve, market cap, enterprise value, and debt. The world's first publicly traded Bitcoin treasury company.",
      },
    ],
  },
  {
    title: "Books & Literature",
    subtitle: "Essential Bitcoin reading, available for free.",
    links: [
      {
        title: "SOFTWAR — Audiobook",
        url: "https://youtu.be/P5yBrxQARY8",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/bbadc891d_SOFTWAR-Audiobook.png",
        description: "An unofficial audiobook of 'Softwar: A Novel Theory on Power Projection and the National Strategic Significance of Bitcoin' by Jason P. Lowery — exploring Bitcoin not just as money, but as a new form of electro-cyber power projection and national strategic security technology.",
      },
      {
        title: "Softwar — PDF Book",
        url: "https://tr.ee/C_XbupT6mA",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/2b79826b1_Softwarpdfbook.png",
        description: "Major Jason P. Lowery's full thesis — 'Softwar: A Novel Theory on Power Projection and the National Strategic Significance of Bitcoin.' A groundbreaking exploration of Bitcoin as a new form of electro-cyber power projection and national strategic security technology.",
      },
      {
        title: "The Gold Standard — PDF Book",
        url: "https://tr.ee/0LwgZP110m",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/63bc972a9_TheGoldstandardBookpdf.png",
        description: "An alternative history of the twentieth century through the lens of the gold standard — exploring how monetary policy shaped the major events and conflicts of the modern era.",
      },
      {
        title: "The Saif House — Bitcoin Bookstore",
        url: "https://thesaifhouse.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/4046ae1f5_Screenshot2026-07-19at115340AM.png",
        fit: "contain",
        darkInvert: true,
        description: "Saifedean Ammous's official bookstore — the best Bitcoin books delivered worldwide in all formats (hardcover, ebook, audiobook). Includes The Bitcoin Standard, The Fiat Standard, Principles of Economics, Fiat Food, Broken Money, Gradually Then Suddenly, and more. Pay with Bitcoin on-chain or Lightning for 10% off, with bulk discounts up to 33% off.",
      },
      {
        title: "The Bitcoin Whitepaper",
        url: "https://ugc.production.linktr.ee/301f8849-6738-45d3-b07a-93e78aac039f_bitcoin-whitepaper.pdf",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/3c2139798_TheBitcoinWhitepaper.png",
        description: "Satoshi Nakamoto's original 2008 whitepaper — 'Bitcoin: A Peer-to-Peer Electronic Cash System.' The foundational document that started it all. Nine pages that changed the world.",
      },
      {
        title: "21 Truths of Bitcoin — Michael Saylor",
        url: "https://assets.contentstack.io/v3/assets/bltdef7a3f3c28ddd84/bltc220da119bbf3c34/67dc7adb37e25aa78d1e3ca5/Digital_Assets_25_Final.pdf",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ef5071424_21TruthsofBitcoin.png",
        description: "Michael Saylor's concise presentation of 21 truths about Bitcoin — from ideology and protocol to digital energy, digital defense, and an emerging solar system. A powerful distillation of why Bitcoin matters.",
      },
      {
        title: "Konsensus — Books for Liberty",
        url: "https://konsensus.net/books/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/519d12e63_BitcoinBookshopcollection.png",
        description: "A curated bookstore of 78 Bitcoin and liberty-focused titles — from Svanholm, Saylor, and Rothbard to fiction anthologies and self-help. Many titles available as free eBooks or audiobooks. Build your own reading list and send it to a friend.",
      },
      {
        title: "Tuttle Twins — Books for Kids",
        url: "https://www.tuttletwins.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/256547788_Teachingkidscriticalthinking.png",
        description: "An innovative series of colorful, engaging children's books that use storytelling to teach economics, liberty, civics, and real history — including titles on money, inflation, and free markets. For ages 5–12 and teens.",
      },
    ],
  },
  {
    title: "Bitcoin Mining Videos",
    subtitle: "Understand how mining works and how it powers the network.",
    links: [
      {
        title: "Bitcoin Mining Explained",
        url: "https://youtu.be/G3_3RTXl9uI",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/22158a422_Bitcoinminingexplain.png",
        description: "A 3-minute beginner-friendly explainer from CoinGeek covering how Bitcoin mining works — miners, nodes, transaction processing, block rewards, and transaction fees.",
      },
      {
        title: "How Does Bitcoin Mining ACTUALLY Work? Explained In 3 Minutes",
        url: "https://youtu.be/4HTtZhhXiAw",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/7f06b4fa9_HowdoesBitcoinMiningactuallywork.png",
        description: "CoinGecko's clear breakdown of Bitcoin mining — the guessing game of proof-of-work, difficulty adjustment, why it's hard, and how it secures the network.",
      },
      {
        title: "Bitcoin Mining & Energy: Bitcoin Atlantis 2024 Panel",
        url: "https://youtu.be/LbqFab9OXtA",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/50aa25b05_Whatdoesbitcoinminingdobesidesminingbitcoin.png",
        description: "A panel from Bitcoin Atlantis 2024 featuring entrepreneurs using Bitcoin mining heat for greenhouses, district heating, water desalination, and more — showing how mining waste heat is being repurposed across Europe.",
      },
    ],
  },
  {
    title: "Podcasts & Substacks",
    subtitle: "Listen and learn on the go — or read along.",
    links: [
      {
        title: "The Bitcoin Standard Podcast — Strike with Jack Mallers",
        url: "https://youtu.be/FqWGQZJevH0",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/7a75f5315_BitcoinstandarpodcastwJackMallers.png",
        description: "Saifedean Ammous interviews Strike CEO Jack Mallers on Bitcoin as a global financial services platform, how Strike operates across 100+ markets, and how people worldwide are using Bitcoin to escape fiat and store wealth.",
      },
      {
        title: "Joe Burnett — YouTube Channel",
        url: "https://www.youtube.com/@JoeBurnett27",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/bc3cbf1b1_JoeBurnettonyoutube.png",
        description: "Joe Burnett's Bitcoin analysis channel — market simulations, wealth shortage dynamics, energy-driven price models, AI and Bitcoin collateral, and deep-dive collaborations with analysts like Joe Consorti and Luke Gromen.",
      },
      {
        title: "Dr. Jeff Ross — Substack",
        url: "https://substack.com/@drjeffross?r=412k19&utm_medium=ios&utm_source=stories&shareImageVariant=image",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/c1ca445b2_Screenshot2026-07-30at11427PM.png",
        description: "Dr. Jeff Ross's Substack — sharp, data-driven Bitcoin and macro analysis from a medical doctor turned full-time Bitcoiner. Essays on monetary policy, market cycles, and why Bitcoin is the only sound money, plus his The Bitcoin Matrix podcast conversations.",
      },
    ],
  },
  {
    title: "Spend & Earn Bitcoin",
    subtitle: "Bitcoin rewards, payments, and the circular economy.",
    links: [
      {
        title: "Radar — Private Messaging & Self-Custodial Bitcoin",
        url: "https://radar.chat/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/20e595381_IMG_0250.webp",
        fit: "contain",
        description: "The first app to bring private messaging and self-custodial Bitcoin together — send sats like you send a text, settled instantly over Lightning, right inside the conversation. Built on Signal's end-to-end encrypted protocol, fully open source, with no ads or trackers. From the team behind Cake Wallet, trusted by 2M people. Available on iOS and Android.",
      },
      {
        title: "Airbtc — Bitcoin-Friendly Stays",
        url: "https://www.airbtc.online/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/7d64109df_Screenshot2026-07-19at111035AM.png",
        description: "Book Bitcoin-friendly stays and travel the world paying in bitcoin — browse listings, plan your trip, or list your own property. Airbtc is evolving into Hodliday with the same mission and a better experience.",
      },
      {
        title: "Fold — Bitcoin Rewards Card",
        url: "https://foldapp.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/e4d842d0e_Screenshot2026-07-19at110545AM.png",
        description: "A personal finance platform powered by Bitcoin — earn sats on every swipe with the Fold Visa Card, buy bitcoin with zero fees, pay bills for rewards, split your paycheck between cash and bitcoin, and withdraw cash at any ATM. Stack sats passively on everyday spending.",
      },
      {
        title: "Bitrefill — Spend Bitcoin on Gift Cards & Bills",
        url: "https://www.bitrefill.com",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/c08b957d9_IMG_0051.png",
        fit: "contain",
        description: "Live on Bitcoin without cashing out — buy gift cards for Amazon, Starbucks, Uber, airlines, and thousands of other merchants, pay utility and phone bills, and top up prepaid cards, all with Bitcoin or Lightning. Instant delivery, available globally, and a core pillar of the Bitcoin circular economy.",
      },
    ],
  },
  {
    title: "Bitcoin Services",
    subtitle: "Privacy, mining hardware, and tools for your Bitcoin stack.",
    links: [
      {
        title: "Mullvad VPN",
        url: "https://mullvad.net/en",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/aca603f7c_MullvadVPN.png",
        description: "A privacy-focused VPN with no logging and anonymous accounts — encrypt your traffic, mask your IP address, and protect your online activity from mass surveillance and data collection. €5/month, open source, available on all platforms.",
      },
      {
        title: "Bitaxe — Open Source Bitcoin Miner",
        url: "https://www.bitaxe.org/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/3073337b0_Screenshot2026-07-19at112900AM.png",
        description: "A fully open-source, standalone Bitcoin miner you can run at home — plugs in over Wi-Fi, no external computer needed. Quiet, low power, and mine to any stratum pool. Pair with your own node for top-to-bottom self-sovereign Bitcoin mining.",
      },
      {
        title: "Solo Satoshi — Bitcoin Hardware Shop",
        url: "https://www.solosatoshi.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/9bec81ec2_Screenshot2026-07-19at113002AM.png",
        description: "A trusted shop for Bitcoin solo miners and hardware — Bitaxe, Nerdaxe, Avalon, Blockstream Jade wallets, and Start9 servers. Everything you need to mine, store, and run your own Bitcoin infrastructure, all in one place.",
      },
    ],
  },
  {
    title: "Additional Resources",
    subtitle: "More tools, communities, and content for your Bitcoin journey.",
    links: [
      {
        title: "Sats vs Fiat — Bitcoin Starter Guide",
        url: "https://www.satsvsfiat.com/starter",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/64cb4deea_Screenshot2026-07-19at104248AM.png",
        description: "Joe Bryan (@satmojoe)'s free beginner hub — a curated roadmap of the first six videos and six books to start your Bitcoin journey, from 'What's The Problem?' and Broken Money to The Bitcoin Standard and Resistance Money. A charitable project to make Bitcoin accessible to everyone, regardless of background.",
      },
      {
        title: "15 Quick Bitcoin Videos for Newbies",
        url: "https://x.com/JayW132/status/1892266476041589090?s=20",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/6422c5b68_Xbitcoinvideosthread.png",
        description: "Jordan Walker's curated thread of 10+ short videos covering the problem Bitcoin fixes, what it is, scarcity, inflation, resilience, and more — perfect for sharing with friends just starting their Bitcoin journey.",
      },
      {
        title: "Cyphermunk House — London Bitcoin Hub",
        url: "https://www.cyphermunkhouse.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/98fe7cb6d_Cyphermunkhouse.png",
        description: "London's Bitcoin community and open-source culture hub — meetups, workshops, and events, plus curated short-form articles (Boyapati, Lewis, DerGigi) and films to read and watch about Bitcoin.",
      },
      {
        title: "Bitcoin Degree — YouTube Shorts",
        url: "https://www.youtube.com/@BitcoinDegree/shorts",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/8bd0b6a6d_Bitcoindegree-youtubeshorts.png",
        description: "Bite-sized educational YouTube Shorts covering Bitcoin fundamentals — quick, visual explainers perfect for onboarding new bitcoiners in under a minute each.",
      },
      {
        title: "XRP, RLUSD, and Ripple Labs Explained — Is XRP a Scam?",
        url: "https://youtu.be/ZJKfub1mbzI",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/12e3a3593_XRPRLUSDRipplelabsexplained.png",
        description: "Forrest HODL's deep dive on XRP and Ripple Labs — what XRP is, how it differs from Bitcoin, why it's a pre-mined token controlled by a private company, and why pricing it in Bitcoin tells the real story. Essential viewing for anyone tempted by altcoin hype.",
      },
    ],
  },
  {
    title: "Nostr",
    subtitle: "A decentralized, censorship-resistant social protocol built on Bitcoin & Lightning.",
    links: [
      {
        title: "What is Nostr?",
        url: "https://www.youtube.com/watch?v=5W-jtbbh3eA",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/fffc7b25e_whatisnostr.png",
        description: "A short, clear explainer from LNbits — Nostr (Notes and Other Stuff Transmitted by Relays) is a simple, decentralized protocol that lets users sign and share notes without corporate platforms. Learn how it could replace Twitter and other centralized services.",
      },
      {
        title: "Damus — Nostr Social Client",
        url: "https://damus.io/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/381174ca6_Damussocialnetworkyoucontrol.png",
        description: "The most popular Nostr client — a social network you control, available on iOS, Android, and desktop. No ads, no addictive algorithms, no censorship. Tip friends and stack sats with Bitcoin & Lightning. Banned in China within two days of launch.",
      },
      {
        title: "Primal — Nostr Client & Infrastructure",
        url: "https://primal.net/home",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/5c728ca5d_primaldecentralizedsocialnetwork.png",
        description: "A fast, feature-rich Nostr client with a beautiful feed, built-in Lightning zaps, and media support. Primal also provides the relay and infrastructure layer that powers the Nostr ecosystem at scale.",
      },
      {
        title: "Nostr — Official Site",
        url: "https://nostr.com/",
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/1a42e954c_NOSTR.png",
        description: "Nostr (Notes and Other Stuff Transmitted by Relays) — a simple, open, decentralized protocol that lets users sign and share notes using cryptographic key pairs. No central authority, no registration, no censorship. Anyone can build a client or run a relay.",
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
        thumbnail: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/54550acb8_generated_image.png",
        thumbnailDark: "https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/191e46903_generated_image.png",
        description: "A green energy and Bitcoin mining company in Alberta, Canada — developing 5–100 MW facilities on 140+ acres near Calgary, with 10 additional sites totaling 1,100 MW planned in BC. Combines carbon capture, data center infrastructure, and BTC treasury holdings with Indigenous community partnerships.",
      },
    ],
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <section className="relative pt-28 pb-2 md:pt-36 md:pb-4">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-2">
            <Boxes strokeWidth={1.5} className="h-12 w-12 md:h-14 md:w-14 text-[#FF8C00]" />
            <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight">
              Resources
            </h1>
          </div>
          <p className="font-heading text-lg text-lead italic mb-3">
            Everything you need to buy, store, and understand Bitcoin.
          </p>
          <div className="w-12 h-px bg-[var(--page-accent)]" />
        </div>
      </section>

      <section className="relative pb-20">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="sticky top-[100px] md:top-16 z-40 mb-8 md:mb-10 -mx-6 lg:-mx-12 px-6 lg:px-12 py-3 bg-parchment/95 backdrop-blur-sm border-b border-border/60">
            <ResourceSectionNav sections={sections} />
          </div>

          {sections.map((section, si) => (
            <div key={si} id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} className="mb-10 md:mb-14 scroll-mt-40">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead">
                  {section.title}
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  aria-label="Return to top"
                  className="flex items-center justify-center h-5 w-5 rounded-sm text-[#FF8C00] hover:text-[#FFA940] transition-colors duration-300 shrink-0"
                >
                  <ArrowUp size={14} />
                </button>
              </div>
              <p className="font-body text-sm text-lead/80 mb-6 max-w-xl">
                {section.subtitle}
              </p>

              <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-x-12">
                {section.links.length > 0 ? (
                  section.links.map((link, li) => (
                    <ResourceLink key={li} link={link} />
                  ))
                ) : (
                  <p className="font-mono text-xs text-lead/30 italic border border-dashed border-border p-5">
                    Coming soon
                  </p>
                )}
                {section.title === "Books & Literature" && <ReadingListLink />}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}