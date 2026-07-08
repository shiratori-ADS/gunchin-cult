"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ContentImage, PageShell, renderMultiline } from "@/components/SiteChrome";
import siteContent from "@/content/siteContent.json";

function createMemberId() {
  return `GC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function JoinPage() {
  const [joined, setJoined] = useState(false);
  const [memberId, setMemberId] = useState<string | null>(null);

  const handleJoin = () => {
    setJoined(true);
    setMemberId(createMemberId());
  };

  const certificate = siteContent.join.certificate;

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
        {!joined && (
          <button type="button" onClick={handleJoin} className="glow-button mt-10 rounded-full bg-gold px-10 py-5 text-sm font-black tracking-[0.28em] text-black">
            {renderMultiline(siteContent.join.buttonLabel)}
          </button>
        )}
        {joined && (
          <>
            <motion.div
              className="mx-auto mt-8 max-w-2xl whitespace-pre-line rounded-3xl border border-gold/35 bg-black/45 p-6 text-xl font-black text-gold shadow-glow"
              initial={{ opacity: 0, scale: 0.82, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
            >
              {siteContent.join.successMessage}
            </motion.div>

            <motion.div
              className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-[32px] border-2 border-gold/50 bg-[linear-gradient(180deg,rgba(215,179,90,0.22),rgba(5,5,5,0.92))] p-8 shadow-glow"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {certificate.image ? (
                <ContentImage
                  image={certificate.image}
                  imageAlt={certificate.imageAlt}
                  fallback={null}
                  className="aspect-[3/4] w-full overflow-hidden rounded-[24px] border border-gold/30 bg-black/40"
                  imageClassName="h-full w-full object-contain"
                />
              ) : (
                <>
                  <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full border border-gold/50 bg-black/50 shadow-glow">
                    <ContentImage
                      image={siteContent.brand.emblemImage}
                      imageAlt="グンチーン教団エンブレム"
                      fallback={renderMultiline(siteContent.brand.emblemText)}
                      className="grid size-14 place-items-center text-3xl font-black text-gold"
                      imageClassName="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-xs font-black tracking-[0.38em] text-gold/80">{renderMultiline(certificate.eyebrow)}</p>
                  <h2 className="mt-3 text-3xl font-black text-white">{renderMultiline(certificate.title)}</h2>
                  <p className="mt-5 whitespace-pre-line text-sm leading-8 text-white/72">{renderMultiline(certificate.body)}</p>
                  {memberId && <p className="mt-6 text-xs font-black tracking-[0.28em] text-gold">信者番号 {memberId}</p>}
                  <p className="mt-6 border-t border-gold/25 pt-5 text-sm font-black tracking-[0.22em] text-gold">{renderMultiline(certificate.footer)}</p>
                </>
              )}
            </motion.div>
          </>
        )}
      </motion.section>
    </PageShell>
  );
}
