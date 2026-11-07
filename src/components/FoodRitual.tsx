import React, { useState } from 'react';
import { Utensils, Flame, Check, Heart, Sparkles } from 'lucide-react';
import { WINTER_FOODS, FoodItem } from '../data/dongzhiData';
import { soundscape } from '../utils/audioSynthesizer';

export const FoodRitual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'north' | 'south'>('north');
  const [selectedFilling, setSelectedFilling] = useState<string>('三鲜猪肉大葱');
  const [isServing, setIsServing] = useState<boolean>(false);
  const [servedCount, setServedCount] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentFood: FoodItem = WINTER_FOODS.find((f) => f.category === activeTab) || WINTER_FOODS[0];

  const handleTabChange = (tab: 'north' | 'south') => {
    soundscape.playChime(440);
    setActiveTab(tab);
    const newFood = WINTER_FOODS.find((f) => f.category === tab) || WINTER_FOODS[0];
    setSelectedFilling(newFood.fillings[0]);
    setToastMessage(null);
  };

  const handleSelectFilling = (filling: string) => {
    soundscape.playChime(493.88);
    setSelectedFilling(filling);
    setToastMessage(null);
  };

  const handleServe = () => {
    setIsServing(true);
    soundscape.playBoilBubble();
    setTimeout(() => soundscape.playBoilBubble(), 200);
    setTimeout(() => soundscape.playChime(523.25), 450);

    setTimeout(() => {
      setIsServing(false);
      setServedCount((prev) => prev + 1);
      setToastMessage(
        `一碗热气腾腾的【${selectedFilling}】已出锅！冬至夜冷，愿你暖胃安心。`
      );
    }, 900);
  };

  return (
    <section id="warm-food" className="py-20 px-4 lg:px-12 bg-[#0a0b0e] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e08a3c]">
              <span>WINTER COMFORT FOOD</span>
              <span aria-hidden="true">·</span>
              <span>岁时烟火 · 慰藉人心</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#a0a5b8]">一口暖食抵严寒</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif-sc font-bold tracking-tight text-[#f5ede0]">
              暖冬食肆 · 水饺与汤圆
            </h2>
            <p className="mt-3 text-sm text-[#9da3b4] max-w-2xl leading-relaxed">
              古人说：“冬至大如年，人间小团圆。”在北方，吃饺子防冻耳，一家人围坐擀皮包褶；在南方，搓汤圆庆团圆，汤香糯软岁岁甘甜。
            </p>
          </div>

          {/* Interactive North/South Toggle */}
          <div className="flex items-center p-1 bg-white/[0.04] border border-white/10 rounded-xl shrink-0">
            <button
              onClick={() => handleTabChange('north')}
              type="button"
              className={`px-5 py-2.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'north'
                  ? 'bg-[#c43c35] text-white shadow-md'
                  : 'text-[#9da3b4] hover:text-white'
              }`}
            >
              北方水饺 · 祛寒娇耳
            </button>
            <button
              onClick={() => handleTabChange('south')}
              type="button"
              className={`px-5 py-2.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === 'south'
                  ? 'bg-[#e08a3c] text-white shadow-md'
                  : 'text-[#9da3b4] hover:text-white'
              }`}
            >
              南方汤圆 · 团圆如意
            </button>
          </div>
        </div>

        {/* 2-Column Balanced Culinary Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Cinematic Photography with Steam overlay */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/10 bg-[#12141a] relative min-h-[380px] lg:h-full flex flex-col justify-end p-6 film-grain">
            <img
              src="/src/assets/images/dongzhi_dumplings_steam_1794067571889.jpg"
              alt="冬至饺子与汤圆热气"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none" />

            {/* Simulated Animated Steam Wisps */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-white/20 blur-2xl animate-steam" />
              <div className="absolute top-1/4 left-1/3 w-36 h-36 rounded-full bg-[#ffeed6]/25 blur-3xl animate-steam" style={{ animationDelay: '1.2s' }} />
            </div>

            {/* Still Metadata & Tagline */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e08a3c] mb-2">
                <Flame className="w-3.5 h-3.5" />
                <span>柴薪腾火 · 蒸汽氤氲</span>
                <span className="text-white/30">|</span>
                <span>温养脾胃</span>
              </div>
              <h3 className="font-serif-sc text-xl sm:text-2xl font-bold text-[#fcf9f2]">
                “{currentFood.tagline}”
              </h3>
              <p className="mt-2 text-xs text-[#b8bdcf] leading-relaxed max-w-lg">
                {currentFood.lore}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Tasting & Bowl Preparation */}
          <div className="lg:col-span-6 rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Utensils className="w-4 h-4 text-[#e08a3c]" />
                  </div>
                  <div>
                    <h4 className="font-serif-sc text-lg font-bold text-[#f5ede0]">
                      {currentFood.name}
                    </h4>
                    <span className="text-xs text-[#8f94a6] font-mono">
                      {activeTab === 'north' ? 'NORTHERN FLAVORS' : 'SOUTHERN DELICACY'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#8f94a6]">已呈上</span>
                  <div className="font-mono text-base font-bold text-[#e08a3c] tabular-nums">
                    {servedCount} <span className="text-xs text-[#8f94a6] font-normal">碗温情</span>
                  </div>
                </div>
              </div>

              {/* Select Fillings */}
              <div className="mt-6">
                <span className="text-xs font-mono text-[#a0a5b8] tracking-wider block mb-3">
                  选择你喜爱的冬至馅料 / FLAVORS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentFood.fillings.map((filling) => {
                    const isSelected = selectedFilling === filling;
                    return (
                      <button
                        key={filling}
                        onClick={() => handleSelectFilling(filling)}
                        type="button"
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-white/[0.08] border-[#e08a3c] text-[#f5ede0] ring-1 ring-[#e08a3c]/30'
                            : 'bg-white/[0.02] border-white/10 text-[#a0a5b8] hover:text-[#f5ede0] hover:bg-white/[0.05]'
                        }`}
                      >
                        <span>{filling}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#e08a3c]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cultural Blessing for this food */}
              <div className="mt-6 p-4 rounded-xl bg-black/30 border border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs text-[#e08a3c] mb-1 font-medium">
                  <Heart className="w-3.5 h-3.5 text-[#c43c35]" />
                  <span>食俗寄寓</span>
                </div>
                <p className="font-serif-sc text-xs text-[#b8bdcf] leading-relaxed">
                  {currentFood.blessing}
                </p>
              </div>
            </div>

            {/* Serving Action & Feedback */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              {toastMessage && (
                <div className="mb-4 p-3 rounded-lg bg-[#c43c35]/15 border border-[#c43c35]/40 text-xs text-[#ffd7a8] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#f3b469]" />
                  <span>{toastMessage}</span>
                </div>
              )}

              <button
                onClick={handleServe}
                disabled={isServing}
                type="button"
                className={`w-full py-3.5 px-6 rounded-xl font-medium text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  isServing
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#c43c35] to-[#e08a3c] hover:opacity-95 text-white shadow-[#c43c35]/25 active:scale-[0.99]'
                }`}
              >
                {isServing ? (
                  <>
                    <Flame className="w-4 h-4 text-[#ffd7a8] animate-bounce" />
                    <span>翻滚沸腾中 · 正起锅盛碗...</span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-[#ffd7a8]" />
                    <span>盛一碗热腾腾的【{selectedFilling}】</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
