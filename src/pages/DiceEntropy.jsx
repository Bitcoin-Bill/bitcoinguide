import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AlternativeVideoLink from "@/components/dice/AlternativeVideoLink";
import OfflineInstructionsPdf from "@/components/dice/OfflineInstructionsPdf";
import EntropyExplainer from "@/components/dice/EntropyExplainer";
import EntropyLabLink from "@/components/EntropyLabLink";
import { Dices, ExternalLink, AlertTriangle, CheckCircle, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const steps = [
  {
    n: 1,
    text: "Go to",
    link: { label: "iancoleman.io/bip39", href: "https://iancoleman.io/bip39/" },
    after: "",
  },
  {
    n: 2,
    text: 'Scroll down and check the box labeled',
    bold: '"Show entropy details"',
    after: ".",
  },
  {
    n: 3,
    text: "A new",
    bold: "Entropy",
    after: "section will appear on the page.",
  },
  {
    n: 4,
    text: "In the Entropy section:",
    sub: [
      <>Change the dropdown (entropy type) from the default to <strong>Dice [1-6]</strong>.</>,
      <>Paste or type your dice roll sequence into the <strong>Entropy</strong> text box (e.g. <code className="font-mono text-xs bg-secondary px-1 py-0.5 rounded">523146261435…</code>).</>,
    ],
  },
  {
    n: 5,
    text: "Select your desired",
    bold: "Mnemonic Length",
    after: "(most people choose 24 words).",
  },
  {
    n: 6,
    text: "The tool will automatically convert the dice rolls into a BIP39 seed phrase.",
  },
];

const notes = [
  "Use only the digits 1–6. Spaces between numbers are usually fine but not required.",
  "For a full 24-word seed you typically need 99–100 dice rolls.",
  "If generating a real seed, prefer running the page offline — save via File → Save As, or download from the project's GitHub releases.",
  "Never share the resulting seed phrase or the entropy you entered with anyone.",
];

export default function DiceEntropy() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <section className="relative pt-28 pb-2 md:pt-36 md:pb-4">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-2">
            <Dices strokeWidth={1.5} className="h-12 w-12 md:h-14 md:w-14 text-[#8B5CF6]" />
            <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight">
              Dice Rolls & Entropy
            </h1>
          </div>
          <p className="font-heading text-lg text-lead italic mb-3">
            Generate a verifiably random Bitcoin seed phrase using physical dice.
          </p>
          <div className="w-12 h-px bg-[var(--page-accent)]" />

          <EntropyExplainer />

          <div className="mt-4 max-w-xl space-y-3">
            <OfflineInstructionsPdf />
          </div>

          <div className="mt-4 border border-border bg-secondary/30 rounded-sm p-4">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-2">
              Prefer to save the page itself?
            </p>
            <p className="font-body text-sm text-lead leading-relaxed mb-2">
              You can keep these instructions without a PDF by saving this page directly to your device:
            </p>
            <ul className="space-y-1.5 pl-2 border-l border-border">
              <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                <span className="text-[var(--page-accent)] mt-1">•</span>
                <span><strong>Desktop:</strong> Press <code className="font-mono text-xs bg-secondary px-1 py-0.5 rounded">Ctrl+S</code> (Windows/Linux) or <code className="font-mono text-xs bg-secondary px-1 py-0.5 rounded">Cmd+S</code> (Mac) and choose <strong>Save as Web Page (Complete)</strong>.</span>
              </li>
              <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                <span className="text-[var(--page-accent)] mt-1">•</span>
                <span><strong>Mobile (Chrome/Safari):</strong> Open the browser menu and tap <strong>Download page</strong> or <strong>Add to Reading List</strong> for offline access.</span>
              </li>
              <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                <span className="text-[var(--page-accent)] mt-1">•</span>
                <span>Open the saved file on an offline (air-gapped) machine whenever you need it.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-10 space-y-10">

          {/* High-visibility disclaimer */}
          <div className="border-2 border-red-500/70 bg-red-50 dark:bg-red-950/20 rounded-sm p-5">
            <div className="flex gap-2 items-start">
              <AlertTriangle size={18} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-red-600 dark:text-red-400 mb-1.5">
                  Critical Warning — Read Before Using
                </p>
                <p className="font-body text-sm text-ink leading-relaxed">
                  Any seed phrase created with this tool <span className="font-bold underline">while online must never be used for an actual wallet</span>. The tool can and should be downloaded and run entirely offline (air-gapped) for the purpose of generating seeds that will hold real funds.
                </p>
              </div>
            </div>
          </div>

          {/* Intro */}
          <div>
            <p className="font-body text-base text-lead leading-relaxed">
              The Ian Coleman BIP39 tool is the most widely trusted open-source mnemonic converter in Bitcoin. By supplying your own physical dice rolls as entropy, you can prove to yourself that your seed phrase was generated with true randomness — not an algorithm you can't inspect.
            </p>
          </div>

          {/* Steps */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-4">Steps</p>
            <ol className="space-y-4">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-[var(--page-accent)] text-[var(--page-accent)] font-mono text-[10px] mt-0.5">
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <p className="font-body text-base text-ink leading-relaxed">
                      {s.text}{" "}
                      {s.bold && <strong>{s.bold}</strong>}{" "}
                      {s.link && (
                        <a
                          href={s.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--page-accent)] underline underline-offset-2 hover:text-primary transition-colors"
                        >
                          {s.link.label}
                        </a>
                      )}{" "}
                      {s.after}
                    </p>
                    {s.sub && (
                      <ul className="mt-2 space-y-1.5 pl-2 border-l border-border">
                        {s.sub.map((item, i) => (
                          <li key={i} className="font-body text-sm text-lead leading-relaxed flex gap-2">
                            <span className="text-[var(--page-accent)] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Important notes */}
          <div className="border border-border rounded-sm p-5 bg-secondary/30">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-3">Important Notes</p>
            <ul className="space-y-2">
              {notes.map((note, i) => (
                <li key={i} className="flex gap-2 text-sm text-lead font-body leading-relaxed">
                  <CheckCircle size={14} className="text-[var(--page-accent)] shrink-0 mt-0.5" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Security reminder */}
          <div className="border border-orange-400/60 bg-orange-50/40 dark:bg-orange-950/20 rounded-sm p-5">
            <div className="flex gap-2 items-start">
              <AlertTriangle size={16} className="text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-orange-600 dark:text-orange-400 mb-1">
                  Security Reminder
                </p>
                <p className="font-body text-sm text-ink/90 leading-relaxed">
                  Generating a seed with your own dice is excellent for verifiable randomness, but the conversion must still be done on a trusted, preferably air-gapped machine. Always verify the resulting words on a second independent tool or hardware wallet before sending funds.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://iancoleman.io/bip39/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--page-accent)] text-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-parchment transition-colors duration-300 px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase"
          >
            Open Ian Coleman BIP39 Tool
            <ExternalLink size={14} />
          </a>

          <p className="font-mono text-[10px] tracking-widest uppercase text-lead/40">
            Source: iancoleman.io/bip39 — open-source, MIT licensed
          </p>

          {/* EntropyLab — alternative air-gapped calculator */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-4">
              Also Try
            </p>
            <div className="max-w-xl">
              <EntropyLabLink color="#8B5CF6" openLabel="Open EntropyLab" />
            </div>
          </div>

          {/* What to do next */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-4">What to Do Next</p>
            <p className="font-heading text-lg text-ink/80 italic mb-6">
              After Generating the Seed on Ian Coleman BIP39 Tool
            </p>

            {/* Step 1 */}
            <div className="mb-8">
              <div className="flex gap-3 items-baseline mb-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-[var(--page-accent)] text-[var(--page-accent)] font-mono text-[10px]">
                  1
                </span>
                <h3 className="font-heading text-lg text-ink">Record the Critical Information (While Still Offline)</h3>
              </div>
              <p className="font-body text-sm text-lead leading-relaxed mb-3">
                From the tool, carefully write down (or stamp on metal later):
              </p>
              <ul className="space-y-2 pl-2 border-l border-border">
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span>The <strong>24-word BIP39 Mnemonic</strong> (this is your seed phrase — the most important thing)</span>
                </li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span>Any <strong>BIP39 Passphrase</strong> you added (the optional "25th word")</span>
                </li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span>The first 2–3 receiving addresses shown for your chosen derivation path (usually <code className="font-mono text-xs bg-secondary px-1 py-0.5 rounded">m/84'/0'/0'</code> for Native Segwit)</span>
                </li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span>Optionally: the <strong>BIP32 Root Key (xprv)</strong> — but you normally only need the mnemonic</span>
                </li>
              </ul>
              <p className="font-body text-sm text-ink/80 leading-relaxed mt-3 italic">
                Do not leave the seed or entropy on the computer longer than necessary. Clear the page / close the browser after recording.
              </p>
            </div>

            {/* Step 2 */}
            <div className="mb-8">
              <div className="flex gap-3 items-baseline mb-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-[var(--page-accent)] text-[var(--page-accent)] font-mono text-[10px]">
                  2
                </span>
                <h3 className="font-heading text-lg text-ink">Verify the Seed</h3>
              </div>
              <ul className="space-y-2 pl-2 border-l border-border">
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span>Confirm the tool shows a valid mnemonic (no error about checksum).</span>
                </li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span>Note the first receiving address. You will check this matches later when you restore the wallet.</span>
                </li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span>Strongly recommended: verify the same seed on a second independent tool or hardware wallet before putting real funds on it.</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="mb-8">
              <div className="flex gap-3 items-baseline mb-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-[var(--page-accent)] text-[var(--page-accent)] font-mono text-[10px]">
                  3
                </span>
                <h3 className="font-heading text-lg text-ink">Import into Sparrow Wallet</h3>
              </div>
              <ol className="space-y-2 pl-2 border-l border-border">
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">1.</span><span>Open Sparrow Wallet.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">2.</span><span>Go to <strong>File → New Wallet</strong>.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">3.</span><span>Give the wallet a name and click <strong>Create</strong>.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">4.</span><span>On the Settings screen:</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2 pl-4"><span className="text-[var(--page-accent)] mt-1">◦</span><span><strong>Policy Type:</strong> Single Signature (default)</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2 pl-4"><span className="text-[var(--page-accent)] mt-1">◦</span><span><strong>Script Type:</strong> Native Segwit (P2WPKH) — this is the modern recommended choice (addresses start with <code className="font-mono text-xs bg-secondary px-1 py-0.5 rounded">bc1q…</code>). (You can also choose Nested Segwit or Taproot if you have a specific reason.)</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">5.</span><span>Under Keystores, click <strong>New or Imported Software Wallet</strong>.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">6.</span><span>Select <strong>Mnemonic Words (BIP39)</strong>.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">7.</span><span>Choose <strong>Enter 24 Words</strong>.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">8.</span><span>Carefully type (or paste if you are on a trusted offline machine) your 24-word seed phrase in the correct order.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">9.</span><span>If you used a BIP39 passphrase, check the box and enter it carefully (it is case-sensitive).</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">10.</span><span>Click <strong>Create Keystore</strong>.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">11.</span><span>Click <strong>Import Keystore</strong>.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">12.</span><span>Click <strong>Apply</strong>.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] font-mono text-xs mt-0.5">13.</span><span>Set a strong wallet password if prompted (this encrypts the wallet file on your computer — it is not the same as the BIP39 passphrase).</span></li>
              </ol>
              <div className="mt-4 border border-border bg-secondary/30 rounded-sm p-4">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--page-accent)] mb-1">Verification Step</p>
                <p className="font-body text-sm text-ink/90 leading-relaxed">
                  Go to the <strong>Receive</strong> tab and check that the first address matches the one you noted from the Ian Coleman tool (for the same script type / derivation path). If it matches, the import was successful.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-8">
              <div className="flex gap-3 items-baseline mb-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-[var(--page-accent)] text-[var(--page-accent)] font-mono text-[10px]">
                  4
                </span>
                <h3 className="font-heading text-lg text-ink">Restore on a Hardware Wallet (Recommended for Long-Term Storage)</h3>
              </div>
              <p className="font-body text-sm text-lead leading-relaxed mb-3">
                Most hardware wallets support BIP39 seed restore:
              </p>
              <ul className="space-y-2 pl-2 border-l border-border">
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span><strong>Coldcard:</strong> Use the "Import Existing" / restore seed flow and enter the 24 words (and passphrase if used).</span>
                </li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2">
                  <span className="text-[var(--page-accent)] mt-1">•</span>
                  <span><strong>Trezor / Ledger / BitBox / Foundation Passport / Jade / etc.:</strong> During setup or recovery, choose "Restore wallet" / "Recover from seed" and enter the words.</span>
                </li>
              </ul>
              <p className="font-body text-sm text-ink/80 leading-relaxed mt-3">
                After restoring on the hardware wallet, always verify the first receiving address matches what you recorded from the Ian Coleman tool.
              </p>
              <p className="font-body text-sm text-ink/80 leading-relaxed mt-2 italic">
                <strong>Best practice:</strong> Many people generate the seed offline (as you did), then restore it directly onto a hardware wallet and never put the seed into Sparrow (or any software wallet) if the amounts are significant. Sparrow can still be used later as a watch-only wallet by importing the xpub.
              </p>
            </div>

            {/* Step 5 */}
            <div className="mb-8">
              <div className="flex gap-3 items-baseline mb-3">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-[var(--page-accent)] text-[var(--page-accent)] font-mono text-[10px]">
                  5
                </span>
                <h3 className="font-heading text-lg text-ink">Final Security Steps</h3>
              </div>
              <ul className="space-y-2 pl-2 border-l border-border">
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] mt-1">•</span><span>Transfer the seed to a metal backup (steel plate, Capsule, etc.) and destroy any paper notes.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] mt-1">•</span><span>Test the wallet with a small amount of bitcoin first.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] mt-1">•</span><span>Only after successful receive + send of a small test amount should you move larger funds.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] mt-1">•</span><span>Never enter the seed phrase on an internet-connected device if it will hold meaningful funds.</span></li>
                <li className="font-body text-sm text-lead leading-relaxed flex gap-2"><span className="text-[var(--page-accent)] mt-1">•</span><span>Consider adding a strong BIP39 <Link to="/passphrase" className="text-[#8B5CF6] underline underline-offset-2 hover:text-primary transition-colors">passphrase</Link> for extra protection (just never lose it).</span></li>
              </ul>
            </div>
          </div>

          {/* Alternative to dice roll — coin flip with 256 coins */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-4">Alternative to Dice Roll</p>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-ink leading-tight mb-5">
              Coin Flip with 256 Coins
            </h2>
            <Image
              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/61d4446ff_IMG_0093.jpeg"
              alt="How to make a 24-word seed phrase with 256 coins"
              className="w-full max-w-md rounded-sm mb-5"
            />
            <div className="max-w-xl">
              <AlternativeVideoLink />
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}