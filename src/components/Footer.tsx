import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenCardMaker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCardMaker }) => {
  return (
    <footer className="py-14 px-6 lg:px-12 bg-[#08090d] border-t border-white/[0.08] text-[#8f94a6] text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Theme */}
        <div className="text-center md:text-left">
          <div className="font-serif-sc font-bold text-base text-[#f5ede0] mb-1">
            冬至 · 岁暮向暖
          </div>
          <p className="text-[#787e92] leading-relaxed max-w-md">
            “天时人事日相催，冬至阳生春又来。” 以三十五毫米胶片质感与古典物候，致敬每一个在漫长寒冬中向光而行的灵魂。
          </p>
        </div>

        {/* Quick Nav & Greeting Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-4 text-[#a0a5b8]">
            <a href="#cinematic-reel" className="hover:text-white transition-colors">
              光影长卷
            </a>
            <span aria-hidden="true">·</span>
            <a href="#solar-almanac" className="hover:text-white transition-colors">
              节气纪事
            </a>
            <span aria-hidden="true">·</span>
            <a href="#warm-food" className="hover:text-white transition-colors">
              暖冬食肆
            </a>
            <span aria-hidden="true">·</span>
            <a href="#xiaohan-chart" className="hover:text-white transition-colors">
              九九消寒
            </a>
          </div>

          <button
            onClick={onOpenCardMaker}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e08a3c]" />
            <span>寄一纸光影</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#606577]">
        <div className="flex items-center gap-1">
          <span>愿岁岁安康，朝暮有光</span>
          <Heart className="w-3 h-3 text-[#c43c35]" />
        </div>
        <div>
          <span>冬至节气文化数字化体验 · 35mm 胶片光影呈现</span>
        </div>
      </div>
    </footer>
  );
};
