import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex items-center pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-lead mb-6"
        >
          A Curated Guide
        </motion.p>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="#archive" className="block">
            <img
              src="https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/28cff2465_cubeslarge.png"
              alt="Bitcoin Guide Literature cube composition"
              className="w-48 h-auto md:w-64 object-contain drop-shadow-lg rounded-sm hover:opacity-80 transition-opacity duration-300"
            />
            </a>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-ink leading-[0.9] tracking-tight"
          >
            Bitcoin Guide <span className="italic text-verdigris">Literature</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-16 h-px bg-verdigris mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-heading text-xl md:text-2xl text-ink/70 italic leading-relaxed"
        >
          Money grows in value, not volume.
        </motion.p>
      </div>
    </section>
  );
}