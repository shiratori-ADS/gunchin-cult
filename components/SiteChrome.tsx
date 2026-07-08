"use client";

import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import siteContent from "@/content/siteContent.json";

export function renderMultiline(text: string) {
  return text.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

export function ContentImage({
  image,
  imageAlt,
  fallback,
  className,
  imageClassName = "h-full w-full object-cover"
}: {
  image: string;
  imageAlt: string;
  fallback: ReactNode;
  className: string;
  imageClassName?: string;
}) {
  const imagePath = image.trim();

  return (
    <div className={className}>
      {imagePath ? <img src={imagePath} alt={imageAlt} className={imageClassName} /> : fallback}
    </div>
  );
}

function ParticleField() {
  const positions = useMemo(() => {
    const values = new Float32Array(720);
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (Math.random() - 0.5) * 12;
      values[index + 1] = (Math.random() - 0.5) * 8;
      values[index + 2] = (Math.random() - 0.5) * 8;
    }
    return values;
  }, []);

  return (
    <points rotation={[0.25, 0.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#f7d77a" transparent opacity={0.7} />
    </points>
  );
}

export function Background() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
          <ambientLight intensity={0.8} />
          <ParticleField />
        </Canvas>
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_8%,rgba(215,179,90,0.28),transparent_28%),radial-gradient(circle_at_20%_35%,rgba(79,245,200,0.13),transparent_22%),linear-gradient(180deg,rgba(7,21,41,0.32),#050505_54%)]" />
    </>
  );
}

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEmblemIntroClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    sessionStorage.removeItem("gunchin-intro-seen");

    if (window.location.pathname === "/") {
      event.preventDefault();
      window.location.href = "/";
    }
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <nav className="fixed left-1/2 top-5 z-50 flex w-[min(980px,calc(100%-32px))] -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-black/35 px-5 py-3 shadow-glow backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="shrink-0"
            aria-label="入口演出を再生する"
            onClick={handleEmblemIntroClick}
          >
            {siteContent.brand.emblemImage.trim() ? (
              <img src={siteContent.brand.emblemImage} alt="グンチーン教団エンブレム" className="nav-emblem" />
            ) : (
              <span className="nav-emblem grid place-items-center text-gold">{renderMultiline(siteContent.brand.emblemText)}</span>
            )}
          </Link>
          <Link
            href="/#top"
            className="text-sm font-black tracking-[0.22em] text-white"
            onClick={() => setMenuOpen(false)}
          >
            {renderMultiline(siteContent.brand.navTitle)}
          </Link>
        </div>

        <div className="hidden items-center gap-5 text-xs font-bold tracking-[0.16em] text-white/70 md:flex">
          {siteContent.nav.menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-gold">
              {renderMultiline(item.label)}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-gold/40 bg-black/50 text-gold md:hidden"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="flex h-4 w-5 flex-col justify-between" aria-hidden="true">
            <span
              className={`block h-0.5 w-full origin-center rounded-full bg-gold transition-all duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full rounded-full bg-gold transition-all duration-300 ${
                menuOpen ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full origin-center rounded-full bg-gold transition-all duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              className="absolute left-1/2 top-24 max-h-[calc(100dvh-7rem)] w-[min(420px,calc(100%-32px))] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-[32px] border border-gold/30 bg-[linear-gradient(180deg,rgba(215,179,90,0.18),rgba(5,5,5,0.92))] p-8 shadow-glow"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <p className="mb-6 text-center text-xs font-bold tracking-[0.42em] text-gold/80">MENU</p>
              <div className="flex flex-col gap-4">
                {siteContent.nav.menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-sm font-black tracking-[0.18em] text-white transition hover:border-gold/50 hover:text-gold"
                    onClick={() => setMenuOpen(false)}
                  >
                    {renderMultiline(item.label)}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-12 text-center text-white/58">
      <p className="text-2xl font-black text-white">{renderMultiline(siteContent.footer.message)}</p>
      <p className="mt-4">{renderMultiline(siteContent.footer.copyright)}</p>
      <p className="mt-2 text-sm">{renderMultiline(siteContent.footer.disclaimer)}</p>
    </footer>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <p className="mb-3 text-sm font-bold tracking-[0.42em] text-gold/80">{renderMultiline(eyebrow)}</p>
      <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">{renderMultiline(title)}</h1>
    </motion.div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight px-6 pb-24 pt-32 text-white">
      <Background />
      <SiteNav />
      <div className="relative z-10">{children}</div>
      <SiteFooter />
    </main>
  );
}
