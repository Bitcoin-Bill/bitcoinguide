import React from "react";
import { Link } from "react-router-dom";

export default function ThankYouSection() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center gap-6">
          <p className="font-heading text-xl md:text-2xl text-ink italic">
            Thank you for visiting.
          </p>

          <Link
            to="/resources"
            className="flex items-center gap-3 group"
          >
            <img
              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/0476c95c6_Newblock.png"
              alt="Cube"
              className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-lead group-hover:text-verdigris transition-colors duration-300">
              More Resources
            </span>
          </Link>

          <a
            href="https://thesaifhouse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 group mt-8"
          >
            <img
              src="https://cdn.prod.website-files.com/64fee27528c4095c908b5078/64fef221cb1c5b1ba3f1e516_image_2023-09-11_125528448.avif"
              alt="The Saif House"
              className="w-24 h-24 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-heading text-lg text-ink group-hover:text-verdigris transition-colors duration-300">
              Print Books, Not Money
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead">
              thesaifhouse.com
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}