"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PageShell, renderMultiline, SectionTitle } from "@/components/SiteChrome";
import siteContent from "@/content/siteContent.json";

type ExpandedImage = {
  src: string;
  alt: string;
};

export default function ShopPage() {
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
      <SectionTitle eyebrow={siteContent.goods.eyebrow} title="グンチーンショップ" />
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {siteContent.goods.items.map((item, index) => (
          <motion.article
            key={`${item.name}-${index}`}
            className="glass-card group overflow-hidden p-6 transition duration-300 hover:-translate-y-2 hover:border-gold/50 hover:shadow-glow"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {item.image ? (
              <button
                type="button"
                className="mb-6 block w-full cursor-zoom-in overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle,rgba(215,179,90,0.28),rgba(255,255,255,0.06)_42%,rgba(0,0,0,0.4))] transition hover:border-gold/40 group-hover:scale-[1.03]"
                onClick={() => setExpandedImage({ src: item.image, alt: item.imageAlt })}
                aria-label={`${item.imageAlt}を拡大表示`}
              >
                <img src={item.image} alt={item.imageAlt} className="aspect-[4/3] w-full object-cover" />
              </button>
            ) : (
              <div className="mb-6 grid aspect-[4/3] place-items-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle,rgba(215,179,90,0.28),rgba(255,255,255,0.06)_42%,rgba(0,0,0,0.4))] text-6xl font-black text-gold transition group-hover:scale-[1.03]">
                {renderMultiline(siteContent.goods.imageGlyph)}
              </div>
            )}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-black text-white">{renderMultiline(item.name)}</h2>
              <p className="shrink-0 text-sm font-black text-gold">{renderMultiline(item.price)}</p>
            </div>
            <p className="mt-4 leading-8 text-white/62">{renderMultiline(item.detail)}</p>
          </motion.article>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {expandedImage && (
              <motion.div
                key="shop-lightbox"
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
