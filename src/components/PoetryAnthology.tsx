import React, { useState } from 'react';
import { BookOpen, Copy, Check, Feather } from 'lucide-react';
import { soundscape } from '../utils/audioSynthesizer';

interface Poem {
  id: string;
  title: string;
  dynasty: string;
  author: string;
  verses: string[];
  translationOrNote: string;
}

const POEMS: Poem[] = [
  {
    id: 'baijuyi',
    title: '邯郸冬至夜思家',
    dynasty: '唐',
    author: '白居易',
    verses: [
      '邯郸驿里逢冬至，',
      '抱膝灯前影伴身。',
      '想得家中夜深坐，',
      '还应说着远行人。',
    ],
    translationOrNote:
      '冬至之夜客宿邯郸驿馆，独自抱膝面对孤灯，惟有身影相伴。料想此刻家中亲人定然围坐夜话，也该正念叨着我这个远行在外的游子吧。',
  },
  {
    id: 'dufu',
    title: '冬至',
    dynasty: '唐',
    author: '杜甫',
    verses: [
      '年年至日长为客，忽忽穷愁泥杀人。',
      '江上形容吾独老，天边风俗自相亲。',
      '杖藜雪后立残照，执热狂歌忆往晨。',
      '天时人事日相催，冬至阳生春又来。',
    ],
    translationOrNote:
      '虽然常年客居异乡，但天时造化与人事变迁从不停歇。冬至过后阴消阳长，春天又会如期归来。体现了老诗人豁达深沉的天地情怀。',
  },
  {
    id: 'sushi',
    title: '冬至日独游吉祥寺',
    dynasty: '宋',
    author: '苏轼',
    verses: [
      '井底微阳回未回，',
      '萧萧寒雨九天来。',
      '何人更似苏夫子，',
      '不是骑驴便钓台。',
    ],
    translationOrNote:
      '寒雨萧萧，地底潜藏的一线微阳不知复苏与否。在这至冷至深的冬至，东坡居士独游古寺，悠然豁达，自得其乐。',
  },
  {
    id: 'ruanyuan',
    title: '吴兴杂诗',
    dynasty: '清',
    author: '阮元',
    verses: [
      '萧疏白发望霜天，',
      '执手相看意万千。',
      '家家捣米做汤圆，',
      '知是明朝冬至天。',
    ],
    translationOrNote:
      '江南岁暮风物，水乡人家在冬至前夜纷纷推磨舂米做汤圆，街巷炊烟袅袅，祈愿来年合家欢聚、岁岁甘甜。',
  },
];

export const PoetryAnthology: React.FC = () => {
  const [selectedPoemId, setSelectedPoemId] = useState<string>('baijuyi');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activePoem = POEMS.find((p) => p.id === selectedPoemId) || POEMS[0];

  const handleSelect = (id: string) => {
    soundscape.playChime(392);
    setSelectedPoemId(id);
  };

  const handleCopy = (poem: Poem) => {
    soundscape.playChime(523.25);
    const text = `${poem.title}\n[${poem.dynasty}] ${poem.author}\n\n${poem.verses.join('\n')}\n\n${poem.translationOrNote}`;
    navigator.clipboard.writeText(text);
    setCopiedId(poem.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="poetry-anthology" className="py-20 px-4 lg:px-12 bg-[#0a0b0e] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e08a3c]">
              <span>POETIC HERITAGE</span>
              <span aria-hidden="true">·</span>
              <span>千载诗心 · 围炉吟诵</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#a0a5b8]">字里行间藏暖阳</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif-sc font-bold tracking-tight text-[#f5ede0]">
              古典诗韵 · 岁暮长夜思
            </h2>
            <p className="mt-3 text-sm text-[#9da3b4] max-w-2xl leading-relaxed">
              千百年来，无数文人墨客在冬至这夜把盏沉吟。无论身处羁旅亦或归卧草堂，他们笔下的冬至，总有对亲友的深深挂怀，以及对春日新阳的坚定守望。
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#8f94a6]">
            <Feather className="w-4 h-4 text-[#e08a3c]" />
            <span>唐宋清风 · 墨迹温存</span>
          </div>
        </div>

        {/* Poetry Reader Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Poem Index List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {POEMS.map((poem) => {
              const isSelected = selectedPoemId === poem.id;
              return (
                <button
                  key={poem.id}
                  onClick={() => handleSelect(poem.id)}
                  type="button"
                  className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#c43c35] ring-1 ring-[#c43c35]/30 shadow-md'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif-sc font-bold text-base text-[#f5ede0]">
                      《{poem.title}》
                    </span>
                    <span className="text-xs font-mono text-[#e08a3c]">
                      [{poem.dynasty}] {poem.author}
                    </span>
                  </div>
                  <p className="font-serif-sc text-xs text-[#9da3b4] line-clamp-1 italic">
                    {poem.verses[0]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Poem Parchment Scroll Display */}
          <div className="lg:col-span-7 rounded-2xl bg-[#12141c] border border-white/10 p-6 sm:p-10 flex flex-col justify-between relative film-grain overflow-hidden">
            {/* Subtle vintage texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#e08a3c]/[0.03] to-transparent pointer-events-none" />

            <div>
              {/* Header with Copy affordance */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-serif-sc text-2xl sm:text-3xl font-bold text-[#fcf9f2]">
                    《{activePoem.title}》
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[#e08a3c] font-mono">
                    <span>朝代：{activePoem.dynasty}</span>
                    <span aria-hidden="true">·</span>
                    <span>作者：{activePoem.author}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(activePoem)}
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-[#a0a5b8] hover:text-white transition-all cursor-pointer"
                >
                  {copiedId === activePoem.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">已复制诗篇</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制诗句</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verses Layout with Classical Spacing */}
              <div className="my-8 py-4 sm:px-6 bg-black/30 rounded-xl border border-white/[0.04] text-center">
                {activePoem.verses.map((verse, idx) => (
                  <p
                    key={idx}
                    className="font-serif-sc text-lg sm:text-2xl text-[#f5ede0] tracking-widest my-3 font-medium leading-relaxed"
                  >
                    {verse}
                  </p>
                ))}
              </div>

              {/* Translation and Context */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#e08a3c] mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>【诗境鉴赏】</span>
                </div>
                <p className="text-xs sm:text-sm text-[#9da3b4] leading-relaxed">
                  {activePoem.translationOrNote}
                </p>
              </div>
            </div>

            {/* Traditional Seal Stamp */}
            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#82889c]">
              <span>岁末天寒 · 静诵古意</span>
              <div className="font-serif-sc text-xs text-[#c43c35] border border-[#c43c35]/50 bg-[#c43c35]/10 px-2 py-0.5 rounded">
                冬至印存
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
