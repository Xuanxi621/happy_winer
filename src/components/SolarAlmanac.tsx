import React, { useState } from 'react';
import { Sun, Moon, Compass, Sparkles, Droplets, Shield, ArrowUpRight } from 'lucide-react';
import { SOLAR_PENTADS, SolarPentad } from '../data/dongzhiData';
import { soundscape } from '../utils/audioSynthesizer';

export const SolarAlmanac: React.FC = () => {
  const [selectedPentadIndex, setSelectedPentadIndex] = useState(0);
  const activePentad: SolarPentad = SOLAR_PENTADS[selectedPentadIndex];

  const handleSelectPentad = (index: number) => {
    soundscape.playChime(349.23 + index * 40); // F4
    setSelectedPentadIndex(index);
  };

  const getPentadIcon = (name: string) => {
    switch (name) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#e08a3c]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#f3b469]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#8eb8e6]" />;
      default:
        return <Sun className="w-5 h-5 text-[#e08a3c]" />;
    }
  };

  return (
    <section id="solar-almanac" className="py-20 px-4 lg:px-12 bg-[#0d0f15] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e08a3c]">
              <span>SOLAR RECKONING</span>
              <span aria-hidden="true">·</span>
              <span>岁次甲子 · 极阴孕阳</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#a0a5b8]">第七百八十一次交节</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif-sc font-bold tracking-tight text-[#f5ede0]">
              阴极之至 · 阳和起蛰
            </h2>
            <p className="mt-3 text-sm text-[#9da3b4] max-w-2xl leading-relaxed">
              古人以土圭测日影，日影最长之日，即为冬至。此时阴气凝盛至极，而潜伏于地层深处的一缕微阳已悄然萌动。物极必反，否极泰来。
            </p>
          </div>

          {/* Celestial Angle & Light Hours Card */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 shrink-0 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono text-[#8f94a6] mb-2">
              <span className="flex items-center gap-1.5 text-[#f3b469]">
                <Compass className="w-3.5 h-3.5" />
                <span>黄经 270°</span>
              </span>
              <span>日南至 · 极夜长</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-white/[0.08]">
              <div>
                <div className="flex items-center justify-center gap-1 text-xs text-[#9da3b4]">
                  <Sun className="w-3.5 h-3.5 text-[#e08a3c]" />
                  <span>昼长</span>
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-[#f5ede0] tabular-nums">
                  09<span className="text-xs font-sans text-[#a0a5b8]">时</span>20<span className="text-xs font-sans text-[#a0a5b8]">分</span>
                </div>
                <span className="text-[10px] text-[#717688]">年内最短白昼</span>
              </div>
              <div className="border-l border-white/[0.08]">
                <div className="flex items-center justify-center gap-1 text-xs text-[#9da3b4]">
                  <Moon className="w-3.5 h-3.5 text-[#8eb8e6]" />
                  <span>夜长</span>
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-[#8eb8e6] tabular-nums">
                  14<span className="text-xs font-sans text-[#a0a5b8]">时</span>40<span className="text-xs font-sans text-[#a0a5b8]">分</span>
                </div>
                <span className="text-[10px] text-[#717688]">年内最深长夜</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Three Pentads (冬至三候) Interactive Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Pentad Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-xs font-mono text-[#a0a5b8] uppercase tracking-wider mb-1">
              冬至三候 · 物候感知
            </span>
            {SOLAR_PENTADS.map((pentad, idx) => {
              const isSelected = selectedPentadIndex === idx;
              return (
                <button
                  key={pentad.order}
                  onClick={() => handleSelectPentad(idx)}
                  type="button"
                  className={`p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#e08a3c]/60 shadow-lg shadow-black/40 ring-1 ring-[#e08a3c]/20'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                        {getPentadIcon(pentad.iconName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#e08a3c] font-medium">{pentad.order}</span>
                          <span aria-hidden="true" className="text-white/30">·</span>
                          <span className="font-serif-sc font-bold text-[#f5ede0] text-lg">{pentad.name}</span>
                        </div>
                        <span className="text-xs text-[#8f94a6] font-mono">{pentad.english}</span>
                      </div>
                    </div>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-[#e08a3c] rotate-45' : 'text-white/20'
                      }`}
                    />
                  </div>
                  <p className="mt-3 text-xs text-[#a0a5b8] line-clamp-2 leading-relaxed">
                    {pentad.phenology}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Pentad Philosophy & Macro Still */}
          <div className="lg:col-span-7 rounded-xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle radial ambient warmth */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#e08a3c]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#e08a3c] border border-[#e08a3c]/40 px-2 py-0.5 rounded">
                    第 {selectedPentadIndex + 1} 候
                  </span>
                  <h3 className="font-serif-sc text-xl sm:text-2xl font-bold text-[#f8f6f0]">
                    {activePentad.order} · {activePentad.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#8f94a6]">
                  每候五日 · 循环往复
                </span>
              </div>

              {/* Phenological Observation */}
              <div className="mt-6">
                <span className="text-xs font-mono text-[#a0a5b8] tracking-wider block mb-2">
                  【物候经义】
                </span>
                <p className="font-serif-sc text-base sm:text-lg text-[#e6e9f2] leading-relaxed italic">
                  “{activePentad.phenology}”
                </p>
              </div>

              {/* Deep Wisdom / Philosophical Commentary */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-[#a0a5b8] tracking-wider block mb-2">
                  【天人智慧与生机】
                </span>
                <p className="text-sm text-[#9da3b4] leading-relaxed">
                  {activePentad.significance}
                </p>
              </div>
            </div>

            {/* Cultural Footnote */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#82889c]">
              <div className="flex items-center gap-2">
                <span>古籍依据</span>
                <span aria-hidden="true">·</span>
                <span>《月令七十二候集解》</span>
                <span aria-hidden="true">·</span>
                <span>元 · 吴澄</span>
              </div>
              <span className="font-mono text-[#e08a3c]">阳气初动 · 静候春临</span>
            </div>
          </div>
        </div>

        {/* 3 Solstice Wisdom Proof Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/[0.06]">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="font-mono text-xs text-[#e08a3c]">01. 历法枢纽</span>
            <h4 className="font-serif-sc text-base font-bold text-[#f5ede0] mt-1 mb-2">
              冬至大如年 · 岁首之祭
            </h4>
            <p className="text-xs text-[#9096aa] leading-relaxed">
              周代以冬至所在的十一月为岁首，汉代官府举行“贺冬”仪式，百官绝事，商旅歇业，亲友互赠暖物，视为新生之起点。
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="font-mono text-xs text-[#e08a3c]">02. 履长纳庆</span>
            <h4 className="font-serif-sc text-base font-bold text-[#f5ede0] mt-1 mb-2">
              履长拜尊长 · 迎祥纳福
            </h4>
            <p className="text-xs text-[#9096aa] leading-relaxed">
              从冬至起，日影渐短，白昼渐长。古人有“履长”之俗，女子为公婆及尊长敬献新履棉袜，寄寓步步踏春、福寿绵长的祝愿。
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <span className="font-mono text-xs text-[#e08a3c]">03. 围炉静守</span>
            <h4 className="font-serif-sc text-base font-bold text-[#f5ede0] mt-1 mb-2">
              安身静体 · 顺天应时
            </h4>
            <p className="text-xs text-[#9096aa] leading-relaxed">
              《易经》复卦云：“先王以至日闭关，商旅不行，后不省方。”冬至宜节欲省思，潜心涵养，于最漫长的夜里静储能量。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
