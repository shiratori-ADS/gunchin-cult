"use client";

import { motion } from "framer-motion";
import { PageShell, renderMultiline, SectionTitle } from "@/components/SiteChrome";
import siteContent from "@/content/siteContent.json";

export default function ScripturePage() {
  const { scripture } = siteContent;

  return (
    <PageShell>
      <SectionTitle eyebrow={scripture.eyebrow} title={scripture.title} />
      <div className="mx-auto max-w-3xl">
        {scripture.chapters.map((chapter, index) => (
          <motion.article
            key={chapter.title}
            className="glass-card mb-8 p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.6 }}
          >
            <h2 className="mb-5 border-b border-gold/25 pb-4 text-sm font-black tracking-[0.12em] text-gold md:text-base">
              {renderMultiline(chapter.title)}
            </h2>
            <p className="whitespace-pre-line text-xs leading-8 text-white/68 md:text-sm md:leading-8">
              {renderMultiline(chapter.body)}
            </p>
            {"chant" in chapter && chapter.chant && (
              <p className="mt-5 text-center text-sm font-black text-gold md:text-base">{chapter.chant}</p>
            )}
            {"bodyAfter" in chapter && chapter.bodyAfter && (
              <p className="mt-5 whitespace-pre-line text-xs leading-8 text-white/68 md:text-sm md:leading-8">
                {renderMultiline(chapter.bodyAfter)}
              </p>
            )}
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
