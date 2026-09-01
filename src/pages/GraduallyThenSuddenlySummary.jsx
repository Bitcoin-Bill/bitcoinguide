import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

export default function GraduallyThenSuddenlySummary() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <article className="max-w-3xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        <Link
          to="/#archive"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-[var(--page-accent)] transition-colors duration-300 mb-10"
        >
          <ArrowLeft size={14} />
          Back to Archive
        </Link>

        <p className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-3">
          Book Summary
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight mb-2">
          Gradually, Then Suddenly
        </h1>
        <p className="font-heading text-lg text-lead italic mb-6">
          A Framework for Understanding Bitcoin as Money — Parker A. Lewis
        </p>
        <div className="w-12 h-px bg-[var(--page-accent)] mb-10" />

        <div className="font-body text-ink/90 space-y-6 text-[17px] leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl text-ink mb-3">1. Why Our Current Money System Is Broken</h2>
            <p>
              Imagine our current money system — often called "fiat money" (like the US dollar) — is like a giant IOU system run by governments and central banks. The 2008 financial crisis exposed a fundamental flaw: when large financial institutions made reckless decisions and lost billions, governments didn't let them fail. Instead, they printed more money to cover the losses and bailed them out. It's like a parent giving their child an endless allowance to fix every mistake, rather than letting them learn from consequences.
            </p>
            <p>
              The problem is that printing money doesn't create real value. Think of it like printing extra tickets for a concert venue that only holds a certain number of people. When there are too many tickets, each one becomes worth less. That's inflation — your hard-earned money buys less and less over time. As Lewis puts it: <em>"There is simply too much debt and not enough dollars."</em> The fiat system is so deeply flawed that it can't be reformed from within; it's on a path of monetary ruin. Every bailout, every round of "quantitative easing," and every interest rate cut kicks the can further down a road with no exit.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-ink mb-3">2. What Makes Bitcoin Different from All Other Money</h2>
            <p>
              Bitcoin emerged in January 2009 — right as the financial system was melting down — as an entirely new kind of money. Its creator, the anonymous Satoshi Nakamoto, designed it to solve the exact problems that caused the 2008 crisis.
            </p>
            <p>
              <strong>Fixed Supply.</strong> Unlike dollars, euros, or pounds — which central banks can print in unlimited quantities — Bitcoin has a hard cap: there will never be more than 21 million bitcoins. This scarcity is written into the code and enforced by a global network of computers. No CEO, government, or central bank can change it. It's like gold: there's only so much in the world, and extracting more takes real effort. But Bitcoin is digital, meaning it can be sent anywhere in the world instantly.
            </p>
            <p>
              <strong>No Middleman.</strong> Bitcoin is "peer-to-peer." When you send Bitcoin to someone, it goes directly to them — no bank, no payment processor, no government approval needed. It's like handing someone cash in person, except you can do it across the internet with anyone on earth.
            </p>
            <p>
              <strong>Beyond Control.</strong> Because no single entity controls Bitcoin, it exists outside the reach of any government or corporation. No one can freeze your Bitcoin account. No one can decide to "print more" and dilute your savings. Lewis argues that Bitcoin — not "blockchain" as a buzzword — is the real innovation. Blockchain is just the technology; Bitcoin is the only network that has achieved the scarcity, security, and decentralization needed to function as sound money.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-ink mb-3">3. Addressing Common Fears and Misconceptions</h2>
            <p>
              Lewis devotes a large portion of the book to systematically dismantling the most common objections to Bitcoin:
            </p>
            <p>
              <strong>"It can't be copied."</strong> Unlike a digital photo or document you can duplicate endlessly, Bitcoin's scarcity is enforced by its global network. You can't just "copy" Bitcoin any more than you can print your own gold. Finite scarcity only happens once — and Bitcoin got there first.
            </p>
            <p>
              <strong>"It's too volatile."</strong> Yes, Bitcoin's price swings dramatically. But volatility doesn't prevent adoption. Early internet stocks were wildly volatile, yet that didn't stop the internet from changing the world. Bitcoin is a new monetary asset finding its footing on a global stage. Over time, as adoption grows, volatility will decrease.
            </p>
            <p>
              <strong>"It wastes energy."</strong> The energy used by Bitcoin mining isn't waste — it's the cost of creating real-world scarcity and security for a digital asset. Gold mining, bank vaults, armoured trucks, and entire banking infrastructure also consume enormous energy. Bitcoin's energy use is simply more transparent. Without this real-world cost, the system's security and scarcity couldn't exist.
            </p>
            <p>
              <strong>"It's too slow."</strong> A Bitcoin transaction takes about 10 minutes — slower than a credit card swipe. But the innovation isn't speed; it's having a monetary asset with a fixed supply that no one can inflate. Speed improvements can be layered on top, just as the internet evolved from dial-up to broadband.
            </p>
            <p>
              <strong>"It's for criminals."</strong> Cash is used by criminals too, but we don't ban cash. Bitcoin's censorship resistance — the fact that no one can block a transaction or seize funds — is a feature that protects everyone's financial freedom, not just criminals. It's all or nothing: either everyone has financial sovereignty, or no one does.
            </p>
            <p>
              <strong>"It can be banned."</strong> Governments can try to regulate Bitcoin, but they cannot shut it down. It runs on a decentralised network of thousands of computers worldwide. No single jurisdiction controls it. China has "banned" Bitcoin multiple times; it's still running.
            </p>
            <p>
              <strong>"It's a pyramid scheme."</strong> Pyramid schemes depend on recruiting new people to pay earlier investors, with no underlying value. Bitcoin's value comes from fundamental demand: a growing number of people worldwide want a form of money that can't be inflated, seized, or controlled. Its fixed supply combined with increasing demand is basic economics — not a scam.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl text-ink mb-3">4. Why Bitcoin Matters for Ordinary People</h2>
            <p>
              Bitcoin isn't just for tech enthusiasts or investors. It's about the money you use every day to buy groceries, pay rent, and save for the future.
            </p>
            <p>
              When governments print money, they're quietly taking value from your savings without your consent. If you've noticed that houses, food, and everything else cost more than they did ten years ago — that's not a coincidence. That's inflation, and it's a hidden tax on everyone who saves in fiat currency.
            </p>
            <p>
              Bitcoin offers an alternative: a form of money that can't be debased. No one can print more of it. No one can inflate it away. It's the first time in human history that ordinary people have access to a monetary asset with an absolutely fixed supply — one they can hold directly, without relying on a bank.
            </p>
            <p>
              Lewis calls Bitcoin the "Great Definancialization" — a return to saving rather than speculating. In a fiat world, you're forced to invest in stocks, property, and complex financial products just to outpace inflation. With sound money, simply holding your savings preserves their value. You don't need to be a hedge fund manager to protect your wealth.
            </p>
            <p>
              The book's title — <em>"Gradually, Then Suddenly"</em> — captures how Bitcoin adoption works. It creeps in slowly: first a few tech pioneers, then small businesses, then publicly traded companies, then nation states like El Salvador. But at some point, the shift becomes obvious and irreversible. The question isn't whether Bitcoin will succeed, but whether you'll understand it before or after it does.
            </p>
            <p>
              <strong>Bitcoin is common sense.</strong> Money should be scarce. Money should be yours. Money should work for the people who earn it — not the institutions that print it. That's the entire argument of the book, distilled to its essence.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            to="/#archive"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-lead hover:text-[var(--page-accent)] transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back to Archive
          </Link>
        </div>
      </article>

      <FooterSection />
    </div>
  );
}