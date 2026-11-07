import React, { useEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ *
 * Media sources
 *
 * The CDN copy is Byte-identical to /assets/aistudio/cat_video_fast.mp4
 * and is served by Cloudflare with `Accept-Ranges: bytes`, so it is the
 * most reliable "plays on any phone" entry in the fallback chain.
 * ------------------------------------------------------------------ */
const CDN_VIDEO = 'https://cdn.videotourl.net/videos/582e34f4-aa01-477f-b7b3-8d184feddc0c.mp4';
const LOCAL_1080 = '/assets/aistudio/cat_video_fast.mp4';
const LOCAL_720 = '/assets/aistudio/cat_video_720p.mp4';
const LOCAL_480 = '/assets/aistudio/cat_video_480p.mp4';

/* 1920×1080 poster (~114 KB) instead of the 4K 472 KB original: same crop,
 * 4× fewer pixels to decode on a phone. Remote thumbnail = last-resort poster. */
const POSTER_LOCAL = '/assets/aistudio/cat_poster_1080.jpg';
const POSTER_REMOTE = 'https://cdn.videotourl.net/thumbnails/582e34f4-aa01-477f-b7b3-8d184feddc0c.jpg';

type PlaybackStatus = 'loading' | 'playing' | 'blocked' | 'failed';

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

/** Ordered list of sources to try. First entry is the preferred one. */
function buildVideoSources(): string[] {
  if (typeof window === 'undefined') return [CDN_VIDEO];

  const nav = navigator as Navigator & { connection?: NetworkInformationLike };
  const conn = nav.connection;
  const saveData = Boolean(conn?.saveData);
  const slowNetwork = saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '');

  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const shortEdge = Math.min(window.innerWidth, window.innerHeight);
  const isPhone = coarsePointer || shortEdge <= 820;

  if (slowNetwork) return [LOCAL_480, LOCAL_720, CDN_VIDEO];
  // Phones: lighter 720p/30 first (easy to decode, ~1.3 MB), CDN as the safety net.
  if (isPhone) return [LOCAL_720, CDN_VIDEO, LOCAL_1080];
  // Desktops: crisp CDN stream first, local files as fallback.
  return [CDN_VIDEO, LOCAL_1080, LOCAL_720];
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<PlaybackStatus>('loading');
  const [posterSrc, setPosterSrc] = useState<string>(POSTER_LOCAL);

  const isPhone = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    return coarse || Math.min(window.innerWidth, window.innerHeight) <= 820;
  }, []);

  /* ---------------- video: inline playback + source fallback chain ---------------- */
  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    const video: HTMLVideoElement = element;

    // Keep mobile WebViews (WeChat X5, iOS Safari, Android) from replacing the
    // element with their own fullscreen player / download chrome.
    const inlineAttrs: Record<string, string> = {
      'webkit-playsinline': 'true',
      'x5-playsinline': 'true',
      'x5-video-player-type': 'h5-page',
      'x5-video-orientation': 'portrait',
      'x5-video-player-fullscreen': 'false',
    };
    Object.keys(inlineAttrs).forEach((key) => video.setAttribute(key, inlineAttrs[key]));
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const chain = buildVideoSources();
    let index = 0;
    let disposed = false;
    let exhausted = false;
    let stallTimer: number | undefined;
    let gestureHandler: (() => void) | null = null;

    function clearStall() {
      if (stallTimer !== undefined) {
        window.clearTimeout(stallTimer);
        stallTimer = undefined;
      }
    }

    function disarmGesture() {
      if (!gestureHandler) return;
      (['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'] as const).forEach((evt) =>
        window.removeEventListener(evt, gestureHandler as EventListener)
      );
      gestureHandler = null;
    }

    function startPlayback() {
      if (disposed) return;
      const attempt = video.play();
      if (attempt && typeof attempt.then === 'function') {
        attempt
          .then(() => {
            if (!disposed) setStatus('playing');
          })
          .catch(() => {
            // Autoplay policy blocked it: wait for the first user gesture.
            if (disposed || exhausted) return;
            setStatus('blocked');
            armGestureUnlock();
          });
      }
    }

    function armGestureUnlock() {
      if (gestureHandler || disposed) return;
      const handler = () => {
        if (disposed) return;
        disarmGesture();
        if (video.paused) startPlayback();
      };
      gestureHandler = handler;
      (['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'] as const).forEach((evt) =>
        window.addEventListener(evt, handler as EventListener, { passive: true })
      );
    }

    function scheduleStallCheck() {
      clearStall();
      // Nothing usable after a few seconds? Move on to the next source.
      stallTimer = window.setTimeout(
        () => {
          if (disposed) return;
          if (video.paused || video.readyState < 2) advance();
        },
        index === 0 ? 5000 : 9000
      );
    }

    function loadCurrent() {
      if (disposed || index >= chain.length) return;
      video.src = chain[index];
      video.load();
      setStatus((prev) => (prev === 'playing' ? prev : 'loading'));
      scheduleStallCheck();
      startPlayback();
    }

    function advance() {
      if (disposed) return;
      clearStall();
      index += 1;
      if (index >= chain.length) {
        exhausted = true;
        disarmGesture();
        setStatus('failed');
        return;
      }
      loadCurrent();
    }

    const onPlaying = () => {
      clearStall();
      setStatus('playing');
    };
    const onCanPlay = () => clearStall();
    const onError = () => advance();
    // WeChat's X5 kernel only allows programmatic play after this bridge is ready.
    const onWeixinReady = () => startPlayback();

    video.addEventListener('playing', onPlaying);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);
    document.addEventListener('WeixinJSBridgeReady', onWeixinReady as EventListener, false);

    loadCurrent();

    return () => {
      disposed = true;
      clearStall();
      disarmGesture();
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
      document.removeEventListener('WeixinJSBridgeReady', onWeixinReady as EventListener, false);
    };
  }, []);

  /* ---------------- warm amber dust, matched to the kitten's eyes ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
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

    const count = isPhone ? 14 : 30;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * (isPhone ? 1.6 : 2) + 0.8,
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
  }, [isPhone]);

  return (
    <main className="hero-stage select-none">
      {/* Full-bleed looping video. Source is assigned at runtime so the
          fallback chain can swap streams without remounting the element. */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={posterSrc}
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
        className="hero-media pointer-events-none"
      />

      {/* Instant poster: visible at 0 ms, cross-fades out once playback starts. */}
      <img
        src={posterSrc}
        alt="憨憨颜"
        decoding="async"
        fetchPriority="high"
        onError={() => setPosterSrc((current) => (current === POSTER_LOCAL ? POSTER_REMOTE : current))}
        className={`hero-media pointer-events-none transition-opacity duration-700 ${
          status === 'playing' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Cinematic vignette */}
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      {/* 35mm organic film grain */}
      <div className="hero-grain film-grain-active pointer-events-none absolute inset-0 opacity-30" />

      {/* Warm ambient bokeh dust */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full" />

      {/* Floating typography — no boxes, no buttons. */}
      <header className="hero-copy pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center text-center">
        <h1 className="hero-title font-kuaile text-[#fff8eb] drop-shadow-[0_4px_30px_rgba(255,185,60,0.5)]">
          憨憨颜
        </h1>
        <p className="hero-sub font-kuaile text-[#ffecd1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          冬至快乐 · 天天开心
        </p>
      </header>

      {/* Only ever shown when the browser refuses to autoplay. */}
      {status === 'blocked' && <div className="hero-hint z-30">轻触屏幕播放</div>}
    </main>
  );
}
