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

export default function NewsPage() {
  const [expandedImage, setExpandedImage] = useState<ExpandedImage | null>(null);
  const [mounted, setMounted] = useState(false);
  const sortedItems = [...siteContent.news.items].sort((a, b) => b.date.localeCompare(a.date));

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
      <SectionTitle eyebrow={siteContent.news.eyebrow} title={siteContent.news.title} />

      <div className="mx-auto flex max-w-4xl flex-col gap-5">
        {sortedItems.map((item, index) => (
          <motion.article
            key={`${item.date}-${item.title}`}
            className="glass-card p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            {item.image && (
              <button
                type="button"
                className="mb-7 block w-full cursor-zoom-in overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-3 transition hover:border-gold/40"
                onClick={() => setExpandedImage({ src: item.image, alt: item.imageAlt })}
                aria-label={`${item.imageAlt}を拡大表示`}
              >
                <ContentImage
                  image={item.image}
                  imageAlt={item.imageAlt}
                  fallback={null}
                  className="w-full"
                  imageClassName="mx-auto max-h-[min(70vh,520px)] w-full object-contain"
                />
              </button>
            )}
            <p className="text-sm font-black tracking-[0.35em] text-emerald/80">{renderMultiline(item.date)}</p>
            <h2 className="mt-4 text-2xl font-black leading-9 text-white">{renderMultiline(item.title)}</h2>
            <p className="mt-4 text-lg leading-8 text-white/65">{renderMultiline(item.body)}</p>
          </motion.article>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {expandedImage && (
              <motion.div
                key="news-lightbox"
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
