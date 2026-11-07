import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Camera, Film, Sparkles } from 'lucide-react';
import { FILM_SCENES, FilmScene } from '../data/dongzhiData';
import { SnowfallCanvas } from './SnowfallCanvas';
import { soundscape } from '../utils/audioSynthesizer';

interface CinematicHeroProps {
  onOpenCardWithScene: (scene: FilmScene) => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onOpenCardWithScene }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSnow, setShowSnow] = useState(true);
  const [timecode, setTimecode] = useState('00:21:12:08');

  const currentScene = FILM_SCENES[activeIndex];

  // Auto-advance scenes if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FILM_SCENES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Rolling film timecode simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`00:21:${s}:${f}`);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    soundscape.playChime(523.25);
    setActiveIndex((prev) => (prev + 1) % FILM_SCENES.length);
  };

  const handlePrev = () => {
    soundscape.playChime(440);
    setActiveIndex((prev) => (prev - 1 + FILM_SCENES.length) % FILM_SCENES.length);
  };

  const handleSelect = (idx: number) => {
    soundscape.playChime(392);
    setActiveIndex(idx);
  };

  return (
    <section id="cinematic-reel" className="relative w-full px-4 lg:px-12 pt-4 pb-14 bg-[#0a0b0e]">
      {/* Editorial Kicker & Solar Term Identity */}
      <div className="max-w-7xl mx-auto mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e08a3c]">
            <span>SOLAR TERM XXII</span>
            <span aria-hidden="true">·</span>
            <span>日南之至 · 阴极之极</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#a0a5b8]">冬至大如年</span>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-serif-sc font-bold tracking-tight text-[#f8f6f0] text-balance">
            冬至 · 岁暮向暖
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8f94a6]">
          <span className="text-[#e08a3c] font-semibold">35MM KODAK STILLS</span>
          <span aria-hidden="true">/</span>
          <span>昼最短 · 夜最长</span>
          <span aria-hidden="true">/</span>
          <span>静候阳和起蛰</span>
        </div>
      </div>

      {/* Main Cinematic Viewport Container */}
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl relative film-grain">
        {/* Top Letterbox Cinema Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-black/90 text-[11px] font-mono text-[#9da3b4] border-b border-white/[0.06] tracking-wider z-20 relative">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#e08a3c] font-semibold">
              <Film className="w-3.5 h-3.5" />
              <span>35mm ARCHIVE</span>
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline">{currentScene.filmStock}</span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline">{currentScene.lens}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#f5ede0] tabular-nums font-mono">{timecode}</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-[#e08a3c]">24 FPS CINEMASCOPE</span>
          </div>
        </div>

        {/* Cinematic Screen Canvas (16:9 / 2.39:1 widescreen) */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#111218]">
          {/* Background image with cinematic grading */}
          <img
            key={currentScene.id}
            src={currentScene.image}
            alt={currentScene.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-1000 ease-out scale-100 hover:scale-[1.01]"
          />

          {/* Vignette & Anamorphic Mood Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
          <div className="cinematic-vignette absolute inset-0 pointer-events-none" />

          {/* Live falling snow overlay */}
          {showSnow && <SnowfallCanvas flakeCount={55} speed={0.9} opacity={0.8} />}

          {/* Traditional Calligraphy Stamp in Top-Right Corner */}
          <div className="absolute top-4 right-5 sm:top-6 sm:right-8 z-20 pointer-events-none select-none">
            <div className="writing-vertical border border-[#c43c35]/80 bg-[#c43c35]/20 backdrop-blur-sm px-2 py-3 rounded text-[13px] font-serif-sc font-medium text-[#ffc6c4] shadow-lg">
              冬至日短 · 阳生春又来
            </div>
          </div>

          {/* Location & Scene Marker */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
            <div className="flex items-center gap-2 text-xs font-mono text-white/80 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
              <Camera className="w-3.5 h-3.5 text-[#e08a3c]" />
              <span>{currentScene.location}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">{currentScene.aperture}</span>
            </div>
          </div>

          {/* Film Navigation Chevrons */}
          <button
            onClick={handlePrev}
            type="button"
            aria-label="上一帧画面"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            type="button"
            aria-label="下一帧画面"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Cinematic Subtitle Bar */}
          <div className="absolute bottom-0 inset-x-0 z-20 film-subtitle-bar px-4 sm:px-8 py-3 sm:py-4 flex flex-col items-center justify-center text-center">
            <p className="font-serif-sc text-base sm:text-xl md:text-2xl font-medium tracking-wide text-[#fcf9f2] drop-shadow-md">
              {currentScene.subtitle}
            </p>
            <p className="mt-1 font-sans text-xs sm:text-sm tracking-wider text-[#b8bdcf]/80 max-w-3xl drop-shadow">
              {currentScene.englishSubtitle}
            </p>
          </div>
        </div>

        {/* Bottom Cinema Controls & Strip */}
        <div className="p-4 sm:p-6 bg-[#0e1017] border-t border-white/[0.08] flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Left: Film description & poetry source */}
          <div className="max-w-md text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-[#e08a3c] font-medium mb-1">
              <span>{currentScene.title}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#a0a5b8]">{currentScene.quoteAuthor}</span>
            </div>
            <p className="text-xs text-[#9096aa] line-clamp-2 leading-relaxed">
              {currentScene.story}
            </p>
          </div>

          {/* Center: Film Thumbnail Reel */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 max-w-full">
            {FILM_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => handleSelect(idx)}
                type="button"
                className={`group relative w-16 sm:w-20 aspect-video rounded-md overflow-hidden border transition-all cursor-pointer shrink-0 ${
                  activeIndex === idx
                    ? 'border-[#e08a3c] ring-2 ring-[#e08a3c]/30 scale-105'
                    : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-mono text-center text-white/90 py-0.5 truncate px-1">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Right: Functional Action Affordances */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Play / Pause Auto Reel */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#a0a5b8] hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#e08a3c]" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? '定格静止' : '光影放映'}</span>
            </button>

            {/* Snowfall Toggle */}
            <button
              onClick={() => setShowSnow(!showSnow)}
              type="button"
              className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-colors cursor-pointer ${
                showSnow
                  ? 'border-[#8eb8e6]/40 bg-[#8eb8e6]/10 text-[#c2dcff]'
                  : 'border-white/10 bg-white/5 text-[#8f94a6]'
              }`}
            >
              <span>{showSnow ? '飞雪中' : '雪隐'}</span>
            </button>

            {/* Make Postcard With this exact still */}
            <button
              onClick={() => onOpenCardWithScene(currentScene)}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#c43c35] hover:bg-[#b0302a] rounded-md transition-all cursor-pointer shadow-sm shadow-[#c43c35]/30 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffd7a8]" />
              <span>以此帧寄语</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
