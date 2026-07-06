"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ContentImage, PageShell, renderMultiline, SectionTitle } from "@/components/SiteChrome";
import siteContent from "@/content/siteContent.json";

type ExpandedImage = {
  src: string;
  alt: string;
};

export default function SayingsPage() {
  const [expandedImage, setExpandedImage] = useState<ExpandedImage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = expandedImage ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedImage]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <PageShell>
      <SectionTitle eyebrow={siteContent.sayings.eyebrow} title={siteContent.sayings.title} />

      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {siteContent.sayings.items.map((item, index) => (
          <motion.article
            key={item.text}
            className="glass-card p-8"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            {item.image && (
              <button
                type="button"
                className="mb-7 block w-full cursor-zoom-in overflow-hidden rounded-[24px] border border-white/10 bg-white/5 transition hover:border-gold/40"
                onClick={() => setExpandedImage({ src: item.image, alt: item.imageAlt })}
                aria-label={`${item.imageAlt}を拡大表示`}
              >
                <ContentImage
                  image={item.image}
                  imageAlt={item.imageAlt}
                  fallback={null}
                  className="aspect-[4/3] w-full"
                />
              </button>
            )}
            <p className="mb-6 text-sm font-black tracking-[0.35em] text-gold">0{index + 1}</p>
            <h2 className="text-2xl font-black leading-9 text-white">{renderMultiline(item.text)}</h2>
          </motion.article>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {expandedImage && (
              <motion.div
                className="saying-lightbox-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 pt-24 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedImage(null)}
              >
                <button
                  type="button"
                  className="saying-lightbox-close absolute right-6 top-6 z-10 grid size-12 place-items-center rounded-full border border-white/20 bg-black/60 text-2xl text-white/80 transition hover:border-gold/50 hover:text-gold"
                  aria-label="拡大表示を閉じる"
                  onClick={() => setExpandedImage(null)}
                >
                  ×
                </button>
                <motion.img
                  src={expandedImage.src}
                  alt={expandedImage.alt}
                  className="saying-lightbox-image max-h-[calc(100dvh-7rem)] max-w-full object-contain"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  onClick={(event) => event.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </PageShell>
  );
}
