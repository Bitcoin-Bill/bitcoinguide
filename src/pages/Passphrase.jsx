import React from "react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PassphraseExternalLink from "@/components/passphrase/PassphraseExternalLink";
import EntropyLabLink from "@/components/EntropyLabLink";
import { KeyRound, AlertTriangle, CheckCircle, Dices, FileText } from "lucide-react";

const steps = [
  {
    n: 1,
    text: "Roll five dice at once (or one die five times) and record the five digits in order, e.g.",
    code: "42156",
    after: ".",
  },
  {
    n: 2,
    text: "Look up that 5-digit number in the EFF large wordlist to find the matching word, e.g. 42156 →",
    code: "stumper",
    after: ".",
  },
  {
    n: 3,
    text: "Repeat for as many words as you want — 5 to 7 words makes a very strong passphrase.",
  },
  {
    n: 4,
    text: "Write the words down in order, separated by spaces or hyphens. That string is your passphrase.",
  },
];

const notes = [
  "The EFF large wordlist contains 7,776 words (6^5) — each roll maps to exactly one word.",
  "A 5-word passphrase from this list provides roughly 51 bits of entropy; 6 words ≈ 62 bits; 7 words ≈ 72 bits.",
  "Generate the rolls on a clean, offline surface. Never reuse the same roll sequence twice.",
  "Store the passphrase separately from your seed phrase — together they control your wallet.",
];

export default function Passphrase() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <section className="relative pt-28 pb-2 md:pt-36 md:pb-4">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-3 mb-2">
            <KeyRound strokeWidth={1.5} className="h-12 w-12 md:h-14 md:w-14 text-[#16A34A]" />
            <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight">
              BIP39 Passphrase
            </h1>
          </div>
          <p className="font-heading text-lg text-lead italic mb-3">
            Generate a strong passphrase with dice and the EFF wordlist.
          </p>
          <div className="w-12 h-px bg-[var(--page-accent)]" />
        </div>
      </section>

      <section className="relative pb-20">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-3xl mx-auto px-6 lg:px-12 pt-10 space-y-10">

          {/* What is a passphrase */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-3">What it is</p>
            <p className="font-body text-base text-lead leading-relaxed">
              A BIP39 passphrase is an optional "25th word" added to your seed phrase. It is not stored
              on the blockchain and is not part of the 12/24 words — it is a single secret string you
              choose and must remember. The same seed plus a different passphrase produces a
              completely different wallet, so a passphrase acts as a second factor: even if someone
              finds your seed phrase, they cannot access your funds without the passphrase.
            </p>
          </div>

          {/* Warning */}
          <div className="border-2 border-red-500/70 bg-red-50 dark:bg-red-950/20 rounded-sm p-5">
            <div className="flex gap-2 items-start">
              <AlertTriangle size={18} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-red-600 dark:text-red-400 mb-1.5">
                  Critical Warning
                </p>
                <p className="font-body text-sm text-ink leading-relaxed">
                  If you lose the passphrase, the wallet is <span className="font-bold underline">unrecoverable</span> —
                  no one can restore it, ever. There is no "forgot passphrase" flow. Store it carefully
                  and separately from your seed phrase.
                </p>
              </div>
            </div>
          </div>

          {/* EFF intro */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-3">
              The EFF Dice Method
            </p>
            <p className="font-body text-base text-lead leading-relaxed mb-3">
              The Electronic Frontier Foundation publishes a free wordlist designed specifically for
              generating strong passphrases with physical dice. Each word is chosen by rolling five
              dice and looking up the result — giving you a passphrase you can recreate from dice and
              the published list, with no computer required.
            </p>
            <div className="space-y-3 max-w-xl">
              <PassphraseExternalLink
                icon={Dices}
                title="EFF — Dice Guide"
                subtitle="How it works"
                description="The EFF's official guide to generating passphrases with dice. It explains the method, why it's secure, and how to use the wordlist. Clicking open will take you to eff.org."
                url="https://www.eff.org/dice"
                openLabel="Open EFF Dice Guide"
              />
              <PassphraseExternalLink
                icon={FileText}
                title="EFF — Large Wordlist"
                subtitle="7,776 words"
                description="The full EFF large wordlist as a plain text file — 7,776 words indexed by five-dice rolls (11111 through 66666). Save a copy for offline use. Clicking open will download or display the .txt file from eff.org."
                url="https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt"
                openLabel="Open Wordlist"
              />
              <EntropyLabLink color="#16A34A" openLabel="Open EntropyLab" />
            </div>
          </div>

          {/* Steps */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-4">Steps</p>
            <ol className="space-y-4">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full border border-[#16A34A] text-[#16A34A] font-mono text-[10px] mt-0.5">
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <p className="font-body text-base text-ink leading-relaxed">
                      {s.text}{" "}
                      {s.code && (
                        <code className="font-mono text-xs bg-secondary px-1.5 py-0.5 rounded text-[#16A34A]">
                          {s.code}
                        </code>
                      )}{" "}
                      {s.after}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Example */}
          <div className="border border-[#16A34A]/40 bg-[#16A34A]/5 rounded-sm p-5">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#16A34A] mb-2">Example</p>
            <p className="font-body text-sm text-ink/90 leading-relaxed mb-2">
              Five rolls of five dice each:
            </p>
            <p className="font-mono text-sm text-lead leading-relaxed mb-2">
              42156 &nbsp; 33124 &nbsp; 55201 &nbsp; 21344 &nbsp; 46432
            </p>
            <p className="font-body text-sm text-ink/90 leading-relaxed">
              Looked up in the wordlist becomes, for example:
              <span className="block font-mono text-sm text-[#16A34A] mt-1">
                stumper-glimpse-outgas-rebating-yummy
              </span>
            </p>
          </div>

          {/* Notes */}
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

          {/* Using it */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-3">
              Using the passphrase
            </p>
            <p className="font-body text-base text-lead leading-relaxed">
              When you import your seed into Sparrow, a hardware wallet, or any BIP39-compatible tool,
              look for the "passphrase" or "BIP39 passphrase" option and enter your dice-generated words
              there. The same seed + the same passphrase always opens the same wallet — get one character
              wrong and you get a different, empty wallet (which is why you should test with a small
              amount first).
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}