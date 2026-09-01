import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, LogIn, MessagesSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

export default function DebateIntro() {
  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />

      <section className="relative pt-28 pb-10 md:pt-36">
        <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-verdigris mb-3">
            Live — free and open
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight mb-2 flex items-center gap-3">
            <MessagesSquare className="text-[#F7931A] h-12 w-12 md:h-14 md:w-14" strokeWidth={1.4} />
            Debate Forum
          </h1>
          <p className="font-heading text-lg text-lead italic mb-3">
            Free for all members — create an account to join the debate.
          </p>
          <div className="w-12 h-px bg-verdigris mb-4" />

          <div className="border border-border bg-parchment rounded-sm p-5 mb-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-verdigris shrink-0 mt-0.5 w-12">
                Step 1
              </span>
              <p className="font-body text-sm text-ink leading-relaxed">
                Create an account or sign in — it only takes a moment.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-verdigris shrink-0 mt-0.5 w-12">
                Step 2
              </span>
              <p className="font-body text-sm text-ink leading-relaxed">
                Post claims, respond, vote, and fork debates — unlimited, free.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center! gap-3">
            <Link
              to="/register?redirect=/debate"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase border border-verdigris text-verdigris px-4 py-2.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300"
            >
              <UserPlus size={14} /> Create account
            </Link>
            <Link
              to="/login?redirect=/debate"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase border border-border text-lead px-4 py-2.5 rounded-sm hover:text-ink hover:border-ink transition-colors duration-300"
            >
              <LogIn size={14} /> Sign in
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}