"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO_MEDIA } from "@/lib/constants";

/** Video de fondo con imagen de respaldo y efecto parallax suave */
export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [preferStatic, setPreferStatic] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    if (reduced || mobile) {
      setPreferStatic(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setVideoReady(true);
    video.addEventListener("canplaythrough", onReady);
    video.play().catch(() => setPreferStatic(true));

    return () => video.removeEventListener("canplaythrough", onReady);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, opacity }}
      className="absolute inset-0 will-change-transform"
    >
      <Image
        src={HERO_MEDIA.poster}
        alt=""
        fill
        priority
        className={`object-cover transition-opacity duration-1000 ${
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
          preload="auto"
          poster={HERO_MEDIA.poster}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
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
