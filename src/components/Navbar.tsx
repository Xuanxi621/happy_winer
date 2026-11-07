import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCardMaker: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCardMaker,
  isAudioPlaying,
  onToggleAudio,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 lg:px-12 py-4 bg-[#0a0b0e]/85 backdrop-blur-md border-b border-white/[0.08]">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        className="font-serif-sc text-lg lg:text-xl font-semibold tracking-wider text-[#f5ede0] hover:text-[#e08a3c] transition-colors whitespace-nowrap shrink-0"
      >
        冬至 · 岁暮向暖
      </a>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#a0a5b8]">
        <a
          href="#cinematic-reel"
          className="hover:text-[#f5ede0] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
        >
          光影长卷
        </a>
        <a
          href="#solar-almanac"
          className="hover:text-[#f5ede0] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
        >
          节气纪事
        </a>
        <a
          href="#warm-food"
          className="hover:text-[#f5ede0] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
        >
          暖冬食肆
        </a>
        <a
          href="#xiaohan-chart"
          className="hover:text-[#f5ede0] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
        >
          九九消寒
        </a>
        <a
          href="#poetry-anthology"
          className="hover:text-[#f5ede0] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
        >
          诗韵流转
        </a>
      </nav>

      {/* Zone 3: 1 primary action button + soundscape affordance */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleAudio}
          type="button"
          aria-label={isAudioPlaying ? '静音背景音' : '开启沉浸风声与心弦'}
          title={isAudioPlaying ? '静音' : '聆听冬夜风铃'}
          className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
            isAudioPlaying
              ? 'border-[#e08a3c]/60 bg-[#e08a3c]/15 text-[#f3b469]'
              : 'border-white/10 bg-white/5 text-[#8f94a6] hover:text-white hover:bg-white/10'
          }`}
        >
          {isAudioPlaying ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={onOpenCardMaker}
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#c43c35] hover:bg-[#b0302a] active:scale-[0.98] rounded-lg transition-all shadow-md shadow-[#c43c35]/20 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ffd7a8]" />
          <span>制作光影贺卡</span>
        </button>
      </div>
    </header>
  );
};
