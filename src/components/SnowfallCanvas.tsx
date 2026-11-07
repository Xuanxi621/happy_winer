import React, { useEffect, useRef } from 'react';

interface SnowfallCanvasProps {
  flakeCount?: number;
  speed?: number;
  opacity?: number;
  className?: string;
}

interface Flake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  driftOffset: number;
  alpha: number;
}

export const SnowfallCanvas: React.FC<SnowfallCanvasProps> = ({
  flakeCount = 65,
  speed = 1.0,
  opacity = 0.75,
  className = 'pointer-events-none absolute inset-0 z-10 w-full h-full',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize flakes
    const flakes: Flake[] = [];
    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speed: (Math.random() * 0.8 + 0.4) * speed,
        drift: Math.random() * 0.5 - 0.25,
        driftOffset: Math.random() * Math.PI * 2,
        alpha: (Math.random() * 0.6 + 0.25) * opacity,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.speed;
        f.x += Math.sin(time + f.driftOffset) * 0.6 + f.drift;

        // Wrap around
        if (f.y > height + 5) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width + 5) {
          f.x = -5;
        } else if (f.x < -5) {
          f.x = width + 5;
        }

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 244, 255, ${f.alpha})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = f.radius > 2 ? 4 : 0;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [flakeCount, speed, opacity]);

  return <canvas ref={canvasRef} className={className} />;
};
