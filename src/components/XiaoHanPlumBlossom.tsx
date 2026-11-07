import React, { useState } from 'react';
import { Sparkles, RotateCcw, Calendar, CheckCircle2 } from 'lucide-react';
import { NINE_STAGES, NineStage } from '../data/dongzhiData';
import { soundscape } from '../utils/audioSynthesizer';

export const XiaoHanPlumBlossom: React.FC = () => {
  // We keep track of which "Nine" stage is currently dyed (default to 1, or let user dye them)
  const [dyedStages, setDyedStages] = useState<number[]>([1]);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const currentStage: NineStage = NINE_STAGES[activeStageIndex];

  const handleToggleStage = (step: number) => {
    soundscape.playChime(350 + step * 35);
    setActiveStageIndex(step - 1);

    if (dyedStages.includes(step)) {
      // If clicking already dyed, keep selection
    } else {
      // Dye up to this step
      const newDyed = Array.from({ length: step }, (_, i) => i + 1);
      setDyedStages(newDyed);
    }
  };

  const handleDyeAll = () => {
    soundscape.playChime(587.33);
    setDyedStages([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setActiveStageIndex(8);
  };

  const handleReset = () => {
    soundscape.playChime(329.63);
    setDyedStages([1]);
    setActiveStageIndex(0);
  };

  const daysPassed = dyedStages.length * 9;
  const daysRemaining = 81 - daysPassed;

  return (
    <section id="xiaohan-chart" className="py-20 px-4 lg:px-12 bg-[#0d0f15] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e08a3c]">
              <span>COUNTING THE COLD DAYS</span>
              <span aria-hidden="true">·</span>
              <span>八十一日 · 九九消寒</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#a0a5b8]">点染梅瓣候春归</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif-sc font-bold tracking-tight text-[#f5ede0]">
              九九消寒图 · 素梅染朱砂
            </h2>
            <p className="mt-3 text-sm text-[#9da3b4] max-w-2xl leading-relaxed">
              明代刘侗《帝京景物略》载：“冬至日，画素梅一枝，为瓣八十有一。日染一瓣，瓣尽而九九出，则春深矣。”
              古人将漫长苦寒化为一幅笔尖生花的风雅日历。
            </p>
          </div>

          {/* Progress Pill / Stats */}
          <div className="flex items-center gap-4 p-3 bg-white/[0.03] border border-white/10 rounded-xl shrink-0">
            <div>
              <span className="text-xs text-[#8f94a6] font-mono block">已染寒天</span>
              <span className="font-mono text-xl font-bold text-[#e08a3c] tabular-nums">
                {daysPassed} <span className="text-xs font-sans text-[#a0a5b8]">/ 81 天</span>
              </span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <span className="text-xs text-[#8f94a6] font-mono block">距春深花开</span>
              <span className="font-mono text-xl font-bold text-[#f5ede0] tabular-nums">
                {daysRemaining <= 0 ? '春已至' : `${daysRemaining} 天`}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive 9-Blossom Branch Canvas & Photo */}
          <div className="lg:col-span-7 rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background subtle art bloom */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#c43c35]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#a0a5b8]">
                  <Calendar className="w-4 h-4 text-[#e08a3c]" />
                  <span>点击梅朵 · 点染朱砂消寒印记</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    type="button"
                    title="重新开始消寒"
                    className="p-1.5 rounded-lg border border-white/10 text-[#8f94a6] hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">重置</span>
                  </button>
                  <button
                    onClick={handleDyeAll}
                    type="button"
                    className="px-2.5 py-1.5 rounded-lg border border-[#c43c35]/40 bg-[#c43c35]/15 text-[#ffd7a8] hover:bg-[#c43c35]/30 transition-colors cursor-pointer text-xs flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#e08a3c]" />
                    <span>九九尽染</span>
                  </button>
                </div>
              </div>

              {/* 9 Plum Blossoms Grid (九九八十一番花信) */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3.5 sm:gap-4 my-6">
                {NINE_STAGES.map((stage) => {
                  const isDyed = dyedStages.includes(stage.step);
                  const isCurrent = activeStageIndex === stage.step - 1;

                  return (
                    <button
                      key={stage.step}
                      onClick={() => handleToggleStage(stage.step)}
                      type="button"
                      className={`group relative p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        isCurrent
                          ? 'border-[#c43c35] bg-[#c43c35]/15 ring-2 ring-[#c43c35]/40 shadow-lg'
                          : isDyed
                          ? 'border-[#c43c35]/50 bg-[#c43c35]/10 text-white'
                          : 'border-white/10 bg-white/[0.02] text-[#8f94a6] hover:bg-white/[0.05] hover:border-white/20'
                      }`}
                    >
                      {/* Stylized Plum Blossom Petal Icon */}
                      <div className="relative w-10 h-10 mb-2 flex items-center justify-center">
                        <svg
                          viewBox="0 0 40 40"
                          className={`w-full h-full transition-transform group-hover:scale-110 ${
                            isDyed ? 'text-[#c43c35]' : 'text-white/20'
                          }`}
                        >
                          {/* 5 Petals of Plum Blossom */}
                          <circle cx="20" cy="11" r="6" fill="currentColor" fillOpacity={isDyed ? '0.85' : '0.2'} />
                          <circle cx="27" cy="17" r="6" fill="currentColor" fillOpacity={isDyed ? '0.85' : '0.2'} />
                          <circle cx="24" cy="26" r="6" fill="currentColor" fillOpacity={isDyed ? '0.85' : '0.2'} />
                          <circle cx="16" cy="26" r="6" fill="currentColor" fillOpacity={isDyed ? '0.85' : '0.2'} />
                          <circle cx="13" cy="17" r="6" fill="currentColor" fillOpacity={isDyed ? '0.85' : '0.2'} />
                          <circle cx="20" cy="20" r="3.5" fill="#f5ede0" />
                        </svg>

                        {isDyed && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd7a8] absolute -top-1 -right-1" />
                        )}
                      </div>

                      <div className="font-serif-sc font-bold text-sm text-[#f5ede0]">
                        {stage.name}
                      </div>
                      <span className="text-[10px] text-[#9096aa] font-mono mt-0.5">
                        {stage.rhyme.split('，')[0].substring(0, 7)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Insight Bar */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#8f94a6]">
              <span className="font-serif-sc text-[#ffd7a8]">
                {daysRemaining === 0 ? '“九尽桃花开，天下尽春风。”' : '“日染一瓣，瓣尽春生。”'}
              </span>
              <span className="font-mono text-[#e08a3c]">
                进度 {Math.round((daysPassed / 81) * 100)}%
              </span>
            </div>
          </div>

          {/* Right Column: Active Stage Lore & Poetic Stanza */}
          <div className="lg:col-span-5 rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-mono text-[#c43c35] border border-[#c43c35]/40 bg-[#c43c35]/10">
                    第 {currentStage.step} 候九
                  </span>
                  <h3 className="font-serif-sc text-xl font-bold text-[#f5ede0]">
                    {currentStage.name} · {currentStage.dates}
                  </h3>
                </div>
              </div>

              {/* Classic Rhyme Stanza */}
              <div className="mt-6 p-4 rounded-xl bg-black/40 border border-[#c43c35]/20">
                <span className="text-xs font-mono text-[#e08a3c] block mb-1">
                  【数九消寒歌诀】
                </span>
                <p className="font-serif-sc text-lg sm:text-xl font-bold text-[#ffdad8] tracking-wide">
                  “{currentStage.rhyme}”
                </p>
              </div>

              {/* Phenomenon lore */}
              <div className="mt-6">
                <span className="text-xs font-mono text-[#a0a5b8] block mb-2">
                  【候温与气象】
                </span>
                <p className="text-sm text-[#b8bdcf] leading-relaxed">
                  {currentStage.phenomenon}
                </p>
              </div>

              {/* Ancient Poetic Resonance */}
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <span className="text-xs font-mono text-[#a0a5b8] block mb-2">
                  【诗意寄情】
                </span>
                <p className="font-serif-sc text-sm text-[#f5ede0] italic leading-relaxed">
                  “{currentStage.quote}”
                </p>
              </div>
            </div>

            {/* Plum Blossom still snippet */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-3">
              <img
                src="/src/assets/images/dongzhi_plum_blossom_1794067571672.jpg"
                alt="冬至红梅傲雪"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-lg object-cover border border-white/10 shrink-0"
              />
              <div className="text-xs text-[#8f94a6]">
                <span className="text-[#f5ede0] font-medium block">雪里红梅傲霜雪</span>
                <span>严冬虽深，春意已在枝头生发</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
