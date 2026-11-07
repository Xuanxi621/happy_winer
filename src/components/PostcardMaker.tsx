import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Download, Copy, Check, Sparkles, RefreshCw, Palette } from 'lucide-react';
import { FILM_SCENES, FilmScene, GREETING_PRESETS, GreetingPreset } from '../data/dongzhiData';
import { soundscape } from '../utils/audioSynthesizer';

interface PostcardMakerProps {
  isOpen: boolean;
  onClose: () => void;
  initialScene?: FilmScene | null;
}

const SEALS = ['冬至安康', '岁岁平安', '温暖如初', '阳生春来'];
const STYLES = [
  { id: 'cinemascope', label: '经典宽银幕 (2.39:1)' },
  { id: 'polaroid', label: '拍立得明信片' },
  { id: 'minimalist', label: '典雅金线框' },
];

export const PostcardMaker: React.FC<PostcardMakerProps> = ({
  isOpen,
  onClose,
  initialScene,
}) => {
  const [selectedScene, setSelectedScene] = useState<FilmScene>(
    initialScene || FILM_SCENES[0]
  );
  const [recipient, setRecipient] = useState<string>('致远方的亲友');
  const [blessingText, setBlessingText] = useState<string>(
    GREETING_PRESETS[0].content
  );
  const [selectedSeal, setSelectedSeal] = useState<string>('冬至安康');
  const [cardStyle, setCardStyle] = useState<string>('cinemascope');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (initialScene) {
      setSelectedScene(initialScene);
    }
  }, [initialScene]);

  // Render to canvas whenever properties change
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRendering(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedScene.image;

    img.onload = () => {
      // Base canvas size for high-res crisp export
      const targetWidth = 1200;
      let targetHeight = 750;

      if (cardStyle === 'cinemascope') {
        targetHeight = 675; // 16:9 - 2.39 cinematic
      } else if (cardStyle === 'polaroid') {
        targetHeight = 1000;
      } else {
        targetHeight = 800;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 1. Clear background
      ctx.fillStyle = '#0b0c10';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      if (cardStyle === 'polaroid') {
        // Polaroid Frame
        ctx.fillStyle = '#f8f6f0';
        ctx.fillRect(40, 40, targetWidth - 80, targetHeight - 80);

        // Photo inside
        const photoX = 70;
        const photoY = 70;
        const photoW = targetWidth - 140;
        const photoH = targetHeight - 340;

        ctx.drawImage(img, photoX, photoY, photoW, photoH);

        // Film Grain over photo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(photoX, photoY, photoW, photoH);

        // Text below photo
        ctx.fillStyle = '#1c1e24';
        ctx.font = 'bold 36px "Noto Serif SC", serif';
        ctx.fillText(recipient, photoX + 20, photoY + photoH + 70);

        ctx.font = '24px "Noto Serif SC", serif';
        ctx.fillStyle = '#444857';

        // Wrap lines
        const maxTextW = photoW - 180;
        const words = blessingText.split('');
        let line = '';
        let yPos = photoY + photoH + 120;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxTextW && n > 0) {
            ctx.fillText(line, photoX + 20, yPos);
            line = words[n];
            yPos += 36;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, photoX + 20, yPos);

        // Seal stamp in bottom right
        drawSeal(ctx, targetWidth - 180, photoY + photoH + 80, selectedSeal);

        // Small date
        ctx.font = '16px "Outfit", sans-serif';
        ctx.fillStyle = '#8f94a6';
        ctx.fillText('WINTER SOLSTICE · 冬至物语', photoX + 20, targetHeight - 70);

      } else if (cardStyle === 'cinemascope') {
        // Full bleed photo with cinematic letterbox
        const barHeight = 85;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Vignette
        const gradient = ctx.createLinearGradient(0, 0, 0, targetHeight);
        gradient.addColorStop(0, 'rgba(0,0,0,0.65)');
        gradient.addColorStop(0.2, 'rgba(0,0,0,0.1)');
        gradient.addColorStop(0.7, 'rgba(0,0,0,0.2)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Top letterbox bar
        ctx.fillStyle = 'rgba(5, 6, 8, 0.88)';
        ctx.fillRect(0, 0, targetWidth, barHeight);

        // Top metadata
        ctx.font = '16px "Cinzel", "Outfit", monospace';
        ctx.fillStyle = '#e08a3c';
        ctx.fillText('35MM KODAK STILLS · SCENE 01', 50, 48);

        ctx.font = '16px "Noto Serif SC", serif';
        ctx.fillStyle = '#f5ede0';
        ctx.fillText(recipient, 480, 48);

        ctx.font = '15px monospace';
        ctx.fillStyle = '#a0a5b8';
        ctx.fillText('SOLAR TERM XXII · 24 FPS', targetWidth - 280, 48);

        // Bottom letterbox bar
        ctx.fillStyle = 'rgba(5, 6, 8, 0.92)';
        ctx.fillRect(0, targetHeight - barHeight * 1.5, targetWidth, barHeight * 1.5);

        // Movie Subtitles inside bottom bar
        ctx.textAlign = 'center';
        ctx.font = 'bold 30px "Noto Serif SC", serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 6;
        ctx.fillText(blessingText, targetWidth / 2, targetHeight - barHeight * 1.5 + 50);

        ctx.font = '18px "Cinzel", "Outfit", sans-serif';
        ctx.fillStyle = '#d5dae8';
        ctx.shadowBlur = 0;
        ctx.fillText(
          '“Winter Solstice brings the longest night, and the gentlest return of light.”',
          targetWidth / 2,
          targetHeight - barHeight * 1.5 + 90
        );
        ctx.textAlign = 'left';

        // Red Seal Stamp
        drawSeal(ctx, targetWidth - 150, targetHeight - barHeight * 1.5 - 110, selectedSeal);

      } else {
        // Minimalist Gold Frame
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Dark elegant scrim
        ctx.fillStyle = 'rgba(10, 12, 18, 0.75)';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Gold Hairline border
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, targetWidth - 100, targetHeight - 100);

        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(60, 60, targetWidth - 120, targetHeight - 120);

        // Content
        ctx.fillStyle = '#d4af37';
        ctx.font = '18px "Cinzel", serif';
        ctx.fillText('冬至 · 岁暮向暖', 100, 120);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px "Noto Serif SC", serif';
        ctx.fillText(recipient, 100, 200);

        // Text
        ctx.font = '24px "Noto Serif SC", serif';
        ctx.fillStyle = '#e5e9f5';
        const maxTextW = targetWidth - 320;
        const words = blessingText.split('');
        let line = '';
        let yPos = 280;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxTextW && n > 0) {
            ctx.fillText(line, 100, yPos);
            line = words[n];
            yPos += 42;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 100, yPos);

        // Seal stamp
        drawSeal(ctx, targetWidth - 210, targetHeight - 210, selectedSeal);
      }

      setIsRendering(false);
    };

    img.onerror = () => {
      setIsRendering(false);
    };
  }, [selectedScene, recipient, blessingText, selectedSeal, cardStyle]);

  // Helper to draw authentic cinnabar red seal stamp
  const drawSeal = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    text: string
  ) => {
    ctx.save();
    ctx.fillStyle = '#c43c35';
    ctx.fillRect(x, y, 76, 76);

    ctx.strokeStyle = '#9e2a2b';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 2, y + 2, 72, 72);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px "Noto Serif SC", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 2x2 grid for 4 Chinese characters
    if (text.length >= 4) {
      ctx.fillText(text[0], x + 55, y + 24);
      ctx.fillText(text[1], x + 55, y + 52);
      ctx.fillText(text[2], x + 23, y + 24);
      ctx.fillText(text[3], x + 23, y + 52);
    } else {
      ctx.fillText(text, x + 38, y + 38);
    }
    ctx.restore();
  };

  useEffect(() => {
    if (isOpen) {
      renderCanvas();
    }
  }, [isOpen, renderCanvas]);

  if (!isOpen) return null;

  const handleDownload = () => {
    soundscape.playChime(587.33);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `冬至电影贺卡_${selectedScene.title}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopyBlessing = () => {
    soundscape.playChime(523.25);
    const text = `【冬至电影寄语】\n${recipient}：\n\n${blessingText}\n\n印信：${selectedSeal}\n—— 来自《冬至 · 岁暮向暖》电影质感明信片`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePresetSelect = (preset: GreetingPreset) => {
    soundscape.playChime(440);
    setBlessingText(preset.content);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-[#0f1118] border border-white/10 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Workshop Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141620] border-b border-white/[0.08] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c43c35]/15 border border-[#c43c35]/30">
              <Sparkles className="w-4 h-4 text-[#e08a3c]" />
            </div>
            <div>
              <h3 className="font-serif-sc text-lg font-bold text-[#f5ede0]">
                光影贺卡工坊 · 定格冬至温存
              </h3>
              <span className="text-xs text-[#8f94a6] font-mono">
                CINEMATIC POSTCARD WORKSHOP
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="关闭贺卡工坊"
            className="p-2 rounded-lg text-[#8f94a6] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Canvas Preview, Right Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto">
          {/* Left Preview: Real Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-black/50 rounded-xl p-4 border border-white/[0.06]">
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-lg shadow-xl">
              <canvas
                ref={canvasRef}
                className="w-full h-auto max-h-[500px] object-contain rounded"
              />
              {isRendering && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs text-[#ffd7a8] font-mono gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#e08a3c]" />
                  <span>胶片渲染中...</span>
                </div>
              )}
            </div>

            {/* Quick Action Bar below preview */}
            <div className="flex items-center gap-3 mt-4 w-full justify-between">
              <button
                onClick={handleCopyBlessing}
                type="button"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-[#a0a5b8] hover:text-white transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">已复制祝福文案</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>复制祝福文字</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                type="button"
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#c43c35] hover:bg-[#b0302a] text-white text-xs font-medium shadow-md shadow-[#c43c35]/30 transition-all cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-[#ffd7a8]" />
                <span>保存高清电影贺卡</span>
              </button>
            </div>
          </div>

          {/* Right Controls: Customization */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-xs">
            {/* 1. Choose Film Still */}
            <div>
              <span className="font-mono text-[#a0a5b8] tracking-wider block mb-2 font-medium">
                1. 选择电影胶片画面 / SCENE:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {FILM_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      soundscape.playChime(392);
                      setSelectedScene(scene);
                    }}
                    type="button"
                    className={`relative aspect-video rounded-md overflow-hidden border transition-all cursor-pointer ${
                      selectedScene.id === scene.id
                        ? 'border-[#e08a3c] ring-2 ring-[#e08a3c]/40 scale-105'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={scene.image}
                      alt={scene.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Framing Style */}
            <div>
              <span className="font-mono text-[#a0a5b8] tracking-wider block mb-2 font-medium">
                2. 电影画幅样式 / FRAME STYLE:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      soundscape.playChime(440);
                      setCardStyle(style.id);
                    }}
                    type="button"
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      cardStyle === style.id
                        ? 'border-[#e08a3c] bg-[#e08a3c]/15 text-[#ffd7a8]'
                        : 'border-white/10 bg-white/5 text-[#8f94a6] hover:text-white'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Recipient Name */}
            <div>
              <span className="font-mono text-[#a0a5b8] tracking-wider block mb-1.5 font-medium">
                3. 称谓 / RECIPIENT:
              </span>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                maxLength={20}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-[#f5ede0] focus:border-[#e08a3c] focus:outline-none transition-colors text-xs"
                placeholder="例如：致远方的亲友 / 致亲爱的妈妈"
              />
            </div>

            {/* 4. Blessing Message & Presets */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[#a0a5b8] tracking-wider font-medium">
                  4. 贺冬心语 / BLESSING:
                </span>
                <span className="text-[10px] text-[#787e92]">
                  {blessingText.length}/120 字
                </span>
              </div>
              <textarea
                value={blessingText}
                onChange={(e) => setBlessingText(e.target.value)}
                maxLength={120}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-[#f5ede0] focus:border-[#e08a3c] focus:outline-none transition-colors text-xs leading-relaxed resize-none"
                placeholder="写下你想在冬至对TA说的话..."
              />

              {/* Quick Presets Carousel */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 mt-1">
                {GREETING_PRESETS.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => handlePresetSelect(preset)}
                    type="button"
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/[0.08] text-[11px] text-[#b8bdcf] hover:text-white whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Red Cinnabar Seal */}
            <div>
              <span className="font-mono text-[#a0a5b8] tracking-wider block mb-2 font-medium">
                5. 岁暮朱砂印 / SEAL:
              </span>
              <div className="flex items-center gap-2">
                {SEALS.map((seal) => (
                  <button
                    key={seal}
                    onClick={() => {
                      soundscape.playChime(523.25);
                      setSelectedSeal(seal);
                    }}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg border text-xs font-serif-sc transition-all cursor-pointer ${
                      selectedSeal === seal
                        ? 'border-[#c43c35] bg-[#c43c35] text-white shadow'
                        : 'border-[#c43c35]/40 bg-[#c43c35]/10 text-[#ffb5b3] hover:bg-[#c43c35]/20'
                    }`}
                  >
                    {seal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
