"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HERO_MEDIA } from "@/lib/constants";

/** Video de fondo con imagen de respaldo y parallax opcional (solo desktop) */
export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [preferStatic, setPreferStatic] = useState(true);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.5]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = window.matchMedia("(max-width: 1024px)").matches;
    if (reduced || lowPower) {
      setPreferStatic(true);
      return;
    }

    setPreferStatic(false);

    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setVideoReady(true);
    video.addEventListener("canplaythrough", onReady, { once: true });
    video.play().catch(() => setPreferStatic(true));

    return () => video.removeEventListener("canplaythrough", onReady);
  }, []);

  const parallaxEnabled = !preferStatic && !prefersReduced;

  return (
    <motion.div
      ref={ref}
      style={parallaxEnabled ? { y, opacity } : undefined}
      className="absolute inset-0"
    >
      <Image
        src={HERO_MEDIA.poster}
        alt=""
        fill
        priority
        className={`object-cover transition-opacity duration-700 ${
          videoReady && !preferStatic ? "opacity-0" : "opacity-100"
        }`}
        sizes="100vw"
        aria-hidden="true"
      />

      {!preferStatic && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_MEDIA.poster}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <source src={HERO_MEDIA.video} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-bamboo-dark/60 via-black/30 to-bamboo-dark/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />
    </motion.div>
  );
}
