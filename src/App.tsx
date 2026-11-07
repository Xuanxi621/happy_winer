import React, { useEffect, useRef, useState } from 'react';

const POSTER_SRC = '/assets/aistudio/cat_poster.jpg';
const FAST_VIDEO_SRC = '/assets/aistudio/cat_video_fast.mp4';
const ORIGINAL_VIDEO_SRC = '/assets/aistudio/___________-_____6886b7ae.mp4';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Video autoplay management
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    (video as unknown as { playsInline?: boolean }).playsInline = true;

    const handlePlaying = () => setIsPlaying(true);
    video.addEventListener('playing', handlePlaying);

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Deferred until touch/click
    });

    const unlockPlay = () => {
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    window.addEventListener('click', unlockPlay, { once: true });
    window.addEventListener('touchstart', unlockPlay, { once: true });

    return () => {
      video.removeEventListener('playing', handlePlaying);
      window.removeEventListener('click', unlockPlay);
      window.removeEventListener('touchstart', unlockPlay);
    };
  }, []);

  // Floating warm amber dust particles matching the kitten's golden eyes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      alpha: number;
      speedY: number;
      drift: number;
      twinkle: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        speedY: Math.random() * 0.25 + 0.08,
        drift: (Math.random() - 0.5) * 0.2,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += Math.sin(time + p.twinkle) * 0.35 + p.drift;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * 2 + p.twinkle));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 140, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(255, 190, 80, 0.85)';
        ctx.shadowBlur = p.r > 1.5 ? 8 : 3;
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0906] select-none">
      {/* 
        Instant fallback poster image:
        Guarantees the cat is visible from the very first frame with 0ms delay
      */}
      <img
        src={POSTER_SRC}
        alt="憨憨颜"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 pointer-events-none ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Full-screen looping video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={POSTER_SRC}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      >
        <source src={FAST_VIDEO_SRC} type="video/mp4" />
        <source src={ORIGINAL_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50 pointer-events-none" />

      {/* 35mm Organic Film Grain */}
      <div className="film-grain-active absolute inset-0 pointer-events-none opacity-30" />

      {/* Warm ambient bokeh dust */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 w-full h-full"
      />

      {/* 
        Artistic Cinematic Typography - 固定为「温暖快乐体」
        Pure floating text with ZERO boxes and ZERO buttons.
        Content strictly: "憨憨颜 冬至快乐 天天开心"
        Positioned at top so it never obstructs the cat's face or big golden eyes!
      */}
      <div className="absolute top-10 sm:top-14 md:top-16 inset-x-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-6">
        {/* Main Name: 憨憨颜 */}
        <h1 className="font-kuaile text-6xl sm:text-7xl md:text-8xl tracking-[0.16em] text-[#fff8eb] drop-shadow-[0_4px_30px_rgba(255,185,60,0.5)]">
          憨憨颜
        </h1>

        {/* Solstice Wish: 冬至快乐 天天开心 */}
        <p className="mt-2.5 sm:mt-4 font-kuaile text-2xl sm:text-4xl md:text-5xl tracking-[0.18em] text-[#ffecd1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          冬至快乐 · 天天开心
        </p>
      </div>
    </div>
  );
}
