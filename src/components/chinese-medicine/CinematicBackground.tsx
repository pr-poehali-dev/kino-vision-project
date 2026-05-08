import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const PARTICLE_COLORS = [
  "rgba(212,175,55,",
  "rgba(196,169,106,",
  "rgba(60,179,113,",
  "rgba(139,26,26,",
];

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    const count = Math.floor((window.innerWidth * window.innerHeight) / 12000);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // === GRAIN noise overlay ===
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 18;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = Math.random() * 25;
      }
      ctx.putImageData(imageData, 0, 0);

      // === Light beams from top ===
      const beams = [
        { x: canvas.width * 0.2, color: "rgba(212,175,55,0.025)", width: 180 },
        { x: canvas.width * 0.6, color: "rgba(139,26,26,0.02)", width: 220 },
        { x: canvas.width * 0.85, color: "rgba(46,139,110,0.018)", width: 150 },
      ];
      beams.forEach((beam) => {
        const grad = ctx.createLinearGradient(beam.x, 0, beam.x, canvas.height * 0.8);
        grad.addColorStop(0, beam.color.replace("0.025", "0.04").replace("0.02", "0.035").replace("0.018", "0.03"));
        grad.addColorStop(0.6, beam.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(beam.x - beam.width / 2, 0);
        ctx.lineTo(beam.x + beam.width / 2, 0);
        ctx.lineTo(beam.x + beam.width * 1.5, canvas.height * 0.8);
        ctx.lineTo(beam.x - beam.width * 1.5, canvas.height * 0.8);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      // === Cursor spotlight ===
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0) {
        const spotlight = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        spotlight.addColorStop(0, "rgba(212,175,55,0.04)");
        spotlight.addColorStop(0.5, "rgba(212,175,55,0.015)");
        spotlight.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // === Particles ===
      particlesRef.current.forEach((p) => {
        // Attract to cursor subtly
        if (mx > 0) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            p.vx += (dx / dist) * 0.003;
            p.vy += (dy / dist) * 0.003;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });

      // === SVG-like Chinese pattern overlay (drawn on canvas) ===
      ctx.save();
      ctx.strokeStyle = "rgba(212,175,55,0.025)";
      ctx.lineWidth = 0.5;
      // Diagonal grid
      const step = 80;
      for (let x = -step; x < canvas.width + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + canvas.height * 0.3, canvas.height);
        ctx.stroke();
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const onLeave = () => setCursorVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Canvas background layer */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
          mixBlendMode: "screen",
          opacity: 0.9,
        }}
      />

      {/* SVG decorative pattern — Chinese lattice */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chinese-lattice" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              {/* Outer square */}
              <rect x="4" y="4" width="52" height="52" fill="none" stroke="rgba(212,175,55,0.06)" strokeWidth="0.5"/>
              {/* Inner square rotated 45deg */}
              <rect x="18" y="18" width="24" height="24" fill="none" stroke="rgba(212,175,55,0.04)" strokeWidth="0.5" transform="rotate(45 30 30)"/>
              {/* Center dot */}
              <circle cx="30" cy="30" r="1.5" fill="none" stroke="rgba(212,175,55,0.05)" strokeWidth="0.5"/>
              {/* Corner connectors */}
              <line x1="4" y1="4" x2="18" y2="18" stroke="rgba(212,175,55,0.03)" strokeWidth="0.5"/>
              <line x1="56" y1="4" x2="42" y2="18" stroke="rgba(212,175,55,0.03)" strokeWidth="0.5"/>
              <line x1="4" y1="56" x2="18" y2="42" stroke="rgba(212,175,55,0.03)" strokeWidth="0.5"/>
              <line x1="56" y1="56" x2="42" y2="42" stroke="rgba(212,175,55,0.03)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="clouds" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Ruyi cloud motif */}
              <path d="M20,100 Q30,80 50,90 Q60,70 80,80 Q90,60 100,70" fill="none" stroke="rgba(212,175,55,0.04)" strokeWidth="0.7"/>
              <path d="M120,40 Q130,20 150,30 Q160,10 180,20" fill="none" stroke="rgba(196,169,106,0.03)" strokeWidth="0.7"/>
              <path d="M10,160 Q20,140 40,150 Q50,130 70,140 Q80,120 100,130" fill="none" stroke="rgba(139,26,26,0.03)" strokeWidth="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chinese-lattice)"/>
          <rect width="100%" height="100%" fill="url(#clouds)"/>
        </svg>
      </div>

      {/* Custom cursor glow */}
      {cursorVisible && (
        <div
          style={{
            position: "fixed",
            left: cursorPos.x - 20,
            top: cursorPos.y - 20,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.4)",
            pointerEvents: "none",
            zIndex: 9999,
            transition: "left 0.05s linear, top 0.05s linear",
            boxShadow: "0 0 12px rgba(212,175,55,0.2)",
          }}
        />
      )}
      {cursorVisible && (
        <div
          style={{
            position: "fixed",
            left: cursorPos.x - 3,
            top: cursorPos.y - 3,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--gold)",
            pointerEvents: "none",
            zIndex: 9999,
            opacity: 0.8,
          }}
        />
      )}
    </>
  );
}
