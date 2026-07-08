"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ContentImage, PageShell, renderMultiline, SectionTitle } from "@/components/SiteChrome";
import siteContent from "@/content/siteContent.json";

export default function DoctrinePage() {
  const prefersReducedMotion = useReducedMotion();
  const adventImage = siteContent.mainDoctrine.adventImage;
  const [adventFinished, setAdventFinished] = useState(!adventImage || prefersReducedMotion);

  useEffect(() => {
    if (!adventImage || prefersReducedMotion) {
      setAdventFinished(true);
    }
  }, [adventImage, prefersReducedMotion]);

  return (
    <PageShell>
      <SectionTitle eyebrow={siteContent.mainDoctrine.eyebrow} title={siteContent.mainDoctrine.title} />
      <motion.div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[42px] border border-gold/30 bg-gradient-to-br from-gold/20 via-white/[0.07] to-emerald/10 p-8 text-center shadow-glow backdrop-blur-2xl md:p-16"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <ContentImage
            image={siteContent.mainDoctrine.image || siteContent.brand.emblemImage}
            imageAlt={siteContent.mainDoctrine.imageAlt}
            fallback={renderMultiline(siteContent.brand.emblemText)}
            className="mx-auto mb-8 grid size-24 place-items-center overflow-hidden rounded-full border border-gold/50 bg-black/50 text-5xl font-black text-gold shadow-glow"
          />
        </motion.div>

        {adventImage && (
          <div className="doctrine-advent mx-auto mb-8 w-full max-w-4xl">
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="doctrine-advent-beam"
                  initial={{ opacity: 0, scaleY: 0.2 }}
                  animate={{ opacity: [0, 1, 0.75], scaleY: [0.2, 1, 1] }}
                  transition={{ duration: 2.4, ease: "easeOut" }}
                  aria-hidden="true"
                />
                <motion.div
                  className="doctrine-advent-halo"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
                  aria-hidden="true"
                />
              </>
            )}

            <motion.div
              className="relative z-10"
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                  : { opacity: 0, y: -120, scale: 0.72, filter: "blur(18px)" }
              }
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : { duration: 2.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }
              }
              onAnimationComplete={() => setAdventFinished(true)}
            >
              <ContentImage
                image={adventImage}
                imageAlt={siteContent.mainDoctrine.adventImageAlt}
                fallback={null}
                className="aspect-square w-full overflow-hidden rounded-[30px] border border-gold/30 bg-black/30 shadow-[0_0_60px_rgba(215,179,90,0.35)]"
                imageClassName="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        )}

        <motion.p
          className="text-3xl font-black leading-tight text-white md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: adventFinished ? 1 : 0, y: adventFinished ? 0 : 24 }}
          transition={{ duration: 1, delay: adventFinished ? 0.15 : 0 }}
        >
          {renderMultiline(siteContent.mainDoctrine.text)}
        </motion.p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
        {siteContent.doctrines.map((item, index) => (
          <motion.article
            key={item.text}
            className="glass-card p-8"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: adventFinished ? 1 : 0, y: adventFinished ? 0 : 28 }}
            transition={{ delay: adventFinished ? 0.2 + index * 0.08 : 0, duration: 0.7 }}
          >
            {item.image && (
              <ContentImage
                image={item.image}
                imageAlt={item.imageAlt}
                fallback={null}
                className="mb-7 aspect-[4/3] overflow-hidden rounded-[24px] border border-white/10 bg-white/5"
              />
            )}
            <p className="mb-6 text-sm font-black tracking-[0.35em] text-gold">0{index + 1}</p>
            <h2 className="text-2xl font-black leading-9 text-white">{renderMultiline(item.text)}</h2>
            {item.body && <p className="mt-4 text-lg leading-8 text-white/65">{renderMultiline(item.body)}</p>}
          </motion.article>
        ))}
      </div>
    </PageShell>
  );
}
