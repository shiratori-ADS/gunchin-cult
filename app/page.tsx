"use client";

import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Points } from "three";
import siteContent from "@/content/siteContent.json";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

function renderMultiline(text: string) {
  return text.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

function ContentImage({
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
    const values = new Float32Array(900);
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (Math.random() - 0.5) * 12;
      values[index + 1] = (Math.random() - 0.5) * 8;
      values[index + 2] = (Math.random() - 0.5) * 8;
    }
    return values;
  }, []);

  return (
    <points rotation={[0.25, 0.2, 0]} ref={(node: Points | null) => node && (node.rotation.z = 0.08)}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#f7d77a" transparent opacity={0.8} />
    </points>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      <p className="mb-3 text-sm font-bold tracking-[0.42em] text-gold/80">{renderMultiline(eyebrow)}</p>
      <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{renderMultiline(title)}</h2>
    </motion.div>
  );
}

export default function Home() {
  const [introEntered, setIntroEntered] = useState(false);
  const [introChanting, setIntroChanting] = useState(false);
  const { scrollYProgress } = useScroll();
  const templeY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  useEffect(() => {
    const shouldSkipIntro =
      window.location.hash === "#top" || sessionStorage.getItem("gunchin-intro-seen") === "1";

    if (shouldSkipIntro) {
      setIntroEntered(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = introEntered ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [introEntered]);

  useEffect(() => {
    if (!introEntered) {
      return;
    }

    const clouds = document.querySelectorAll(".floating-cloud");
    if (clouds.length === 0) {
      return;
    }

    const tween = gsap.to(".floating-cloud", {
      x: 42,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.7
    });

    return () => {
      tween.kill();
    };
  }, [introEntered]);

  useEffect(() => {
    if (!introChanting) {
      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("gunchin-intro-seen", "1");
      setIntroEntered(true);
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [introChanting]);

  if (!introEntered) {
    return (
      <main className="grid min-h-screen place-items-center overflow-hidden bg-[#050505] text-white">
        {introChanting ? (
          <motion.div
            className="px-6 text-[4.5rem] font-black leading-none tracking-[0.18em] text-gold sm:text-[6rem] md:text-[8rem]"
            initial={{ opacity: 0, scale: 0.82, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div>
              <span>チーン</span>
            </div>
            <div className="mt-12 md:mt-16" style={{ paddingLeft: "min(26vw, 360px)" }}>
              <span>チーン</span>
            </div>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            aria-label="チーンチーンを表示する"
            onClick={() => setIntroChanting(true)}
            className="grid appearance-none place-items-center border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-gold"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <ContentImage
              image={siteContent.brand.emblemImage}
              imageAlt="グンチーン教団エンブレム"
              fallback={renderMultiline(siteContent.brand.emblemText)}
              className="grid size-44 place-items-center text-6xl font-black text-gold md:size-56 md:text-7xl"
              imageClassName="h-full w-full object-contain"
            />
          </motion.button>
        )}
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
          <ambientLight intensity={0.8} />
          <ParticleField />
        </Canvas>
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_8%,rgba(215,179,90,0.28),transparent_28%),radial-gradient(circle_at_20%_35%,rgba(79,245,200,0.13),transparent_22%),linear-gradient(180deg,rgba(7,21,41,0.32),#050505_54%)]" />

      <SiteNav />

      <section id="top" className="relative z-10 grid min-h-screen place-items-center px-6 pb-20 pt-32">
        <motion.div
          className="absolute left-1/2 top-20 h-14 w-14 -translate-x-1/2 rounded-full border border-gold/40 bg-black/70 shadow-glow"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: [1, 1, 0.18], scale: [1, 1.08, 0.82] }}
          transition={{ duration: 2.5, delay: 0.4 }}
          aria-hidden="true"
        >
          <div className="absolute inset-2 rounded-full border border-gold/60" />
          <ContentImage
            image={siteContent.brand.emblemImage}
            imageAlt="グンチーン教団エンブレム"
            fallback={renderMultiline(siteContent.brand.emblemText)}
            className="absolute inset-0 grid place-items-center overflow-hidden rounded-full text-2xl font-black text-gold"
            imageClassName="h-full w-full object-contain"
          />
        </motion.div>

        <motion.div style={{ y: templeY }} className="temple absolute bottom-0 left-1/2 h-[58vh] w-[min(1100px,100vw)] -translate-x-1/2 opacity-70" aria-hidden="true">
          <div className="mx-auto h-8 w-72 rounded-t-full border-t border-gold/50 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="mx-auto grid h-72 w-[86%] grid-cols-7 gap-4 border-t border-gold/30 pt-6">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="rounded-t-full border border-gold/20 bg-gradient-to-b from-white/10 to-white/[0.02] shadow-glow" />
            ))}
          </div>
        </motion.div>

        <div className="floating-cloud absolute left-[8%] top-[28%] h-20 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="floating-cloud absolute right-[10%] top-[38%] h-24 w-72 rounded-full bg-gold/10 blur-3xl" />

        <motion.div
          className="relative mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="mx-auto mb-8 grid size-28 place-items-center rounded-full border border-gold/40 bg-[radial-gradient(circle,rgba(255,255,255,0.24),rgba(215,179,90,0.16)_45%,rgba(5,5,5,0.72))] shadow-glow">
            <ContentImage
              image={siteContent.hero.image || siteContent.brand.deityImage}
              imageAlt={siteContent.hero.imageAlt}
              fallback={renderMultiline(siteContent.brand.deityMark)}
              className="grid size-20 place-items-center overflow-hidden rounded-full border border-white/20 bg-black/45 text-4xl font-black text-gold"
            />
          </div>
          <p className="mb-4 text-sm font-bold tracking-[0.5em] text-gold/80">{renderMultiline(siteContent.hero.eyebrow)}</p>
          <h1 className="text-5xl font-black leading-tight tracking-[-0.06em] text-white md:text-8xl">{renderMultiline(siteContent.hero.catchcopy)}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-white/76 md:text-2xl">{renderMultiline(siteContent.hero.subcopy)}</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            {siteContent.hero.buttons.map((button) => (
              <a
                key={button.href}
                href={button.href}
                className={
                  button.variant === "primary"
                    ? "glow-button rounded-full bg-gold px-8 py-4 text-sm font-black tracking-[0.24em] text-black"
                    : button.variant === "secondary"
                      ? "rounded-full border border-gold/50 bg-white/10 px-8 py-4 text-sm font-black tracking-[0.24em] text-white backdrop-blur transition hover:bg-white/20"
                      : "rounded-full border border-white/15 bg-black/40 px-8 py-4 text-sm font-black tracking-[0.24em] text-white/85 backdrop-blur transition hover:text-gold"
                }
              >
                {renderMultiline(button.label)}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}
