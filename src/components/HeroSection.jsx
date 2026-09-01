import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-4 md:pt-36 md:pb-6">
      <div className="absolute left-6 lg:left-12 top-0 bottom-0 w-px bg-border hidden md:block" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="shrink-0"
          >
            <BookOpen strokeWidth={1.5} className="h-12 w-12 md:h-14 md:w-14 text-[#009DFF]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl font-light text-ink leading-tight"
          >
            Literature
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-lg text-lead italic mb-3"
        >
          Twelve essays exploring the economics, philosophy, and technology of sound money.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-12 h-px bg-[var(--page-accent)]"
        />
      </div>
    </section>
  );
}