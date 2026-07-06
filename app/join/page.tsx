"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ContentImage, PageShell, renderMultiline } from "@/components/SiteChrome";
import siteContent from "@/content/siteContent.json";

export default function JoinPage() {
  const [joined, setJoined] = useState(false);

  return (
    <PageShell>
      <motion.section
        className="mx-auto max-w-5xl rounded-[46px] border border-gold/40 bg-[linear-gradient(135deg,rgba(215,179,90,0.34),rgba(255,255,255,0.08),rgba(79,245,200,0.12))] p-8 text-center shadow-glow backdrop-blur-2xl md:p-16"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {siteContent.join.image && (
          <ContentImage image={siteContent.join.image} imageAlt={siteContent.join.imageAlt} fallback={null} className="mx-auto mb-9 aspect-video w-full max-w-2xl overflow-hidden rounded-[30px] border border-gold/20 bg-black/30 shadow-emerald" />
        )}
        <p className="text-sm font-black tracking-[0.42em] text-gold">{renderMultiline(siteContent.join.eyebrow)}</p>
        <h1 className="mt-5 text-4xl font-black text-white md:text-6xl">{renderMultiline(siteContent.join.title)}</h1>
        <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/70">{renderMultiline(siteContent.join.body)}</p>
        <button type="button" onClick={() => setJoined(true)} className="glow-button mt-10 rounded-full bg-gold px-10 py-5 text-sm font-black tracking-[0.28em] text-black">
          {renderMultiline(siteContent.join.buttonLabel)}
        </button>
        {joined && (
          <motion.div className="mx-auto mt-8 max-w-2xl whitespace-pre-line rounded-3xl border border-gold/35 bg-black/45 p-6 text-xl font-black text-gold shadow-glow" initial={{ opacity: 0, scale: 0.82, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
            {siteContent.join.successMessage}
          </motion.div>
        )}
      </motion.section>
    </PageShell>
  );
}
