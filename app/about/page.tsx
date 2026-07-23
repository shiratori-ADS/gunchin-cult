"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ContentImage, PageShell, renderMultiline, SectionTitle } from "@/components/SiteChrome";
import siteContent from "@/content/siteContent.json";

const sectionHeadingClass = "mb-6 text-2xl font-black text-white md:text-3xl";

type GalleryItem = {
  image: string;
  imageAlt: string;
};

function getRitualGalleryLabel(eyebrow: string, index: number, fallback: string) {
  if (eyebrow !== "作法") {
    return fallback;
  }

  if (index === 0) {
    return "心得";
  }

  return `作法${index}`;
}

const ritualSections = [
  { eyebrow: "教団歌", heading: "グンチーン教団歌" },
  { eyebrow: "演舞", heading: "グンチーン教団舞踏" },
  { eyebrow: "作法", heading: "グン様を祈る正しい作法" }
] as const;

function getCardGallery(card: (typeof siteContent.ritualCards)[number]): GalleryItem[] {
  if (!("gallery" in card) || !Array.isArray(card.gallery)) {
    return [];
  }

  return card.gallery.filter((item) => item.image.trim());
}

function renderSongLyrics(text: string) {
  return text.split("\n").map((line, index) => {
    const isVerseHeading = /^[0-9０-９]+番$/.test(line.trim());

    if (isVerseHeading) {
      return (
        <p
          key={`verse-${index}`}
          className="mt-8 border-b border-gold/30 pb-2 text-xl font-black tracking-[0.42em] text-gold first:mt-0 md:text-2xl"
        >
          {line}
        </p>
      );
    }

    if (line === "") {
      return <div key={`blank-${index}`} className="h-3" aria-hidden="true" />;
    }

    return (
      <p key={`line-${index}`} className="text-lg leading-9 text-white/75">
        {line}
      </p>
    );
  });
}

function RitualCard({
  card,
  index,
  onOpenLyrics,
  onOpenGallery
}: {
  card: (typeof siteContent.ritualCards)[number];
  index: number;
  onOpenLyrics?: () => void;
  onOpenGallery?: () => void;
}) {
  const isSong = card.eyebrow === "教団歌" && "lyrics" in card && Boolean(card.lyrics);
  const hasGallery = getCardGallery(card).length > 0;
  const isInteractive = (isSong && onOpenLyrics) || (hasGallery && onOpenGallery);
  const sharedClassName = "glass-card p-8";
  const content = (
    <>
      {card.image && (
        <ContentImage
          image={card.image}
          imageAlt={card.imageAlt}
          fallback={null}
          className="mb-7 aspect-[4/3] overflow-hidden rounded-[24px] border border-white/10 bg-white/5"
        />
      )}
      <h3 className="text-lg font-black leading-9 text-white">{renderMultiline(card.title)}</h3>
      <p className="mt-5 text-lg leading-8 text-white/65">{renderMultiline(card.body)}</p>
      {isSong && <p className="mt-6 text-sm font-bold tracking-[0.2em] text-gold/80">歌詞を見る</p>}
      {hasGallery && <p className="mt-6 text-sm font-bold tracking-[0.2em] text-gold/80">イラストを見る</p>}
    </>
  );

  if (isInteractive) {
    return (
      <motion.button
        type="button"
        className={`${sharedClassName} w-full cursor-pointer border border-transparent text-left transition hover:border-gold/40 hover:shadow-glow`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 }}
        onClick={isSong ? onOpenLyrics : onOpenGallery}
        aria-label={isSong ? `${card.title}の歌詞を表示` : `${card.title}のイラストを表示`}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.article
      className={sharedClassName}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      {content}
    </motion.article>
  );
}

export default function AboutPage() {
  const [songLyricsOpen, setSongLyricsOpen] = useState(false);
  const [galleryCard, setGalleryCard] = useState<(typeof siteContent.ritualCards)[number] | null>(null);
  const [expandedGalleryImage, setExpandedGalleryImage] = useState<GalleryItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const songCard = siteContent.ritualCards.find((item) => item.eyebrow === "教団歌");
  const songLyrics = songCard && "lyrics" in songCard ? songCard.lyrics : "";
  const galleryItems = galleryCard ? getCardGallery(galleryCard) : [];
  const modalOpen = songLyricsOpen || Boolean(galleryCard) || Boolean(expandedGalleryImage);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (expandedGalleryImage) {
          setExpandedGalleryImage(null);
          return;
        }
        setSongLyricsOpen(false);
        setGalleryCard(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedGalleryImage]);

  return (
    <PageShell>
      <SectionTitle eyebrow={siteContent.timeline.eyebrow} title="教団について" />

      <section className="mx-auto max-w-6xl">
        <h2 className={sectionHeadingClass}>{siteContent.about.title}</h2>
        <motion.article
          className="glass-card p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {siteContent.about.image && (
            <ContentImage
              image={siteContent.about.image}
              imageAlt={siteContent.about.imageAlt}
              fallback={null}
              className="mb-7 aspect-[16/9] overflow-hidden rounded-[24px] border border-white/10 bg-white/5"
            />
          )}
          <p className="text-lg leading-8 text-white/65">{renderMultiline(siteContent.about.body)}</p>
        </motion.article>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <h2 className={sectionHeadingClass}>{siteContent.timeline.title}</h2>
        <div className="flex snap-x gap-5 overflow-x-auto pb-6">
          {siteContent.timeline.items.map((item, index) => (
            <motion.article
              key={item.title}
              className="glass-card min-w-[260px] snap-center p-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              {item.image && (
                <ContentImage
                  image={item.image}
                  imageAlt={item.imageAlt}
                  fallback={null}
                  className="mb-6 aspect-video overflow-hidden rounded-[22px] border border-white/10 bg-white/5"
                />
              )}
              <p className="text-sm font-black tracking-[0.35em] text-emerald/80">{renderMultiline(item.phase)}</p>
              <h3 className="mt-6 text-lg font-black text-white">{renderMultiline(item.title)}</h3>
              <p className="mt-4 text-lg leading-8 text-white/65">{renderMultiline(item.body)}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <h2 className={sectionHeadingClass}>{siteContent.organizationChart.title}</h2>
        <motion.article
          className="glass-card p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {siteContent.organizationChart.image && (
            <ContentImage
              image={siteContent.organizationChart.image}
              imageAlt={siteContent.organizationChart.imageAlt}
              fallback={null}
              className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5"
              imageClassName="mx-auto max-h-[min(80vh,720px)] w-full object-contain"
            />
          )}
          {siteContent.organizationChart.body.trim() && (
            <p className="mt-6 text-lg leading-8 text-white/65">{renderMultiline(siteContent.organizationChart.body)}</p>
          )}
        </motion.article>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <h2 className={sectionHeadingClass}>{siteContent.believerRanks.title}</h2>
        <motion.article
          className="glass-card p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {siteContent.believerRanks.image && (
            <ContentImage
              image={siteContent.believerRanks.image}
              imageAlt={siteContent.believerRanks.imageAlt}
              fallback={null}
              className="mx-auto max-w-3xl overflow-hidden rounded-[24px] border border-white/10 bg-white/5"
              imageClassName="mx-auto max-h-[min(45vh,400px)] w-full object-contain"
            />
          )}
          {siteContent.believerRanks.body.trim() && (
            <p className="mt-6 text-lg leading-8 text-white/65">{renderMultiline(siteContent.believerRanks.body)}</p>
          )}
        </motion.article>
      </section>

      {ritualSections.map(({ eyebrow, heading }, index) => {
        const card = siteContent.ritualCards.find((item) => item.eyebrow === eyebrow);
        if (!card) {
          return null;
        }

        return (
          <section key={heading} className="mx-auto mt-16 max-w-6xl">
            <h2 className={sectionHeadingClass}>{heading}</h2>
            <RitualCard
              card={card}
              index={index}
              onOpenLyrics={eyebrow === "教団歌" ? () => setSongLyricsOpen(true) : undefined}
              onOpenGallery={getCardGallery(card).length > 0 ? () => setGalleryCard(card) : undefined}
            />
          </section>
        );
      })}

      <section className="mx-auto mt-16 max-w-6xl">
        <h2 className={sectionHeadingClass}>{siteContent.alliedGroups.title}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {siteContent.alliedGroups.items.map((group, index) => (
            <motion.article
              key={group.name}
              className="glass-card p-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="flex items-center gap-4">
                {group.image && (
                  <ContentImage
                    image={group.image}
                    imageAlt={group.imageAlt}
                    fallback={null}
                    className="size-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:size-20"
                    imageClassName="h-full w-full object-contain p-1"
                  />
                )}
                <h3 className="min-w-0 flex-1 text-lg font-black leading-9 text-white">{renderMultiline(group.name)}</h3>
              </div>
              {group.body.trim() && (
                <p className="mt-5 text-lg leading-8 text-white/65">{renderMultiline(group.body)}</p>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {songLyricsOpen && songCard && songLyrics && (
              <motion.div
                key="song-lyrics-modal"
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md md:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSongLyricsOpen(false)}
              >
                <motion.div
                  className="glass-card flex max-h-[min(85dvh,720px)] w-full max-w-2xl flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96 }}
                  onClick={(event) => event.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="song-lyrics-title"
                >
                  <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-6 pb-5 md:p-8 md:pb-6">
                    <div>
                      <p className="text-sm font-black tracking-[0.35em] text-gold/80">歌詞</p>
                      <h3 id="song-lyrics-title" className="mt-3 text-2xl font-black leading-9 text-white">
                        {renderMultiline(songCard.title)}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-gold/50 hover:text-gold"
                      aria-label="歌詞を閉じる"
                      onClick={() => setSongLyricsOpen(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="song-lyrics-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5 md:px-8 md:py-6">
                    <div>{renderSongLyrics(songLyrics)}</div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {galleryCard && galleryItems.length > 0 && (
              <motion.div
                key="ritual-gallery-modal"
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md md:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setGalleryCard(null)}
              >
                <motion.div
                  className="glass-card flex max-h-[min(85dvh,820px)] w-full max-w-4xl flex-col overflow-hidden"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.96 }}
                  onClick={(event) => event.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="ritual-gallery-title"
                >
                  <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-6 pb-5 md:p-8 md:pb-6">
                    <div>
                      <p className="text-sm font-black tracking-[0.35em] text-gold/80">イラスト</p>
                      <h3 id="ritual-gallery-title" className="mt-3 text-2xl font-black leading-9 text-white">
                        {renderMultiline(galleryCard.title)}
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-gold/50 hover:text-gold"
                      aria-label="イラスト一覧を閉じる"
                      onClick={() => setGalleryCard(null)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="song-lyrics-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 md:p-8">
                    <div className="-mx-2 overflow-x-auto px-2 pb-2">
                      <div className="flex snap-x snap-mandatory gap-4">
                        {galleryItems.map((item, galleryIndex) => (
                          <button
                            key={`${item.image}-${galleryIndex}`}
                            type="button"
                            className="min-w-[260px] snap-start overflow-hidden rounded-[24px] border border-white/10 bg-white/5 text-left transition hover:border-gold/40 sm:min-w-[320px]"
                            onClick={() => setExpandedGalleryImage(item)}
                            aria-label={`${item.imageAlt}を拡大表示`}
                          >
                            <div className="grid place-items-center bg-black/40">
                              <img
                                src={item.image}
                                alt={item.imageAlt}
                                className="h-56 w-full object-contain sm:h-64"
                              />
                            </div>
                            <p className="px-4 py-3 text-sm font-bold tracking-[0.12em] text-white/75">
                              {getRitualGalleryLabel(galleryCard.eyebrow, galleryIndex, item.imageAlt)}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {expandedGalleryImage && (
              <motion.div
                key="gallery-lightbox"
                className="saying-lightbox-overlay fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-6 pt-24 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedGalleryImage(null)}
              >
                <button
                  type="button"
                  className="saying-lightbox-close absolute right-6 top-6 z-10 grid size-12 place-items-center rounded-full border border-white/20 bg-black/60 text-2xl text-white/80 transition hover:border-gold/50 hover:text-gold"
                  aria-label="拡大表示を閉じる"
                  onClick={() => setExpandedGalleryImage(null)}
                >
                  ×
                </button>
                <motion.img
                  src={expandedGalleryImage.image}
                  alt={expandedGalleryImage.imageAlt}
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
