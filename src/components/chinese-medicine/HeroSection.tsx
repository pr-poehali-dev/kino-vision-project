import Icon from "@/components/ui/icon";
import { HIEROGLYPHS } from "./constants";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
  sectionRef: (el: HTMLElement | null) => void;
}

function FloatingHieroglyph({
  char,
  style,
}: {
  char: string;
  style: React.CSSProperties;
}) {
  return (
    <span
      className="absolute font-cormorant pointer-events-none select-none"
      style={{
        fontFamily: "serif",
        fontSize: "clamp(2rem, 5vw, 7rem)",
        color: "transparent",
        WebkitTextStroke: "1px rgba(212,175,55,0.15)",
        animation: `floatHiero ${6 + Math.random() * 8}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
        ...style,
      }}
    >
      {char}
    </span>
  );
}

function OrbSphere({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        background:
          "radial-gradient(circle at 35% 35%, rgba(212,175,55,0.6), rgba(180,100,20,0.3) 50%, transparent 70%)",
        filter: "blur(1px)",
        animation: "orbFloat 8s ease-in-out infinite",
        ...style,
      }}
    />
  );
}

export default function HeroSection({ scrollTo, sectionRef }: HeroSectionProps) {
  return (
    <section
      id="home"
      ref={sectionRef}
      className="mesh-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {HIEROGLYPHS.map((h, i) => (
        <FloatingHieroglyph
          key={i}
          char={h}
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 3) * 25}%`,
          }}
        />
      ))}

      <OrbSphere
        className="w-96 h-96"
        style={{
          top: "10%",
          right: "-10%",
          animation: "orbFloat 10s ease-in-out infinite",
        }}
      />
      <OrbSphere
        className="w-64 h-64"
        style={{
          bottom: "15%",
          left: "-5%",
          background:
            "radial-gradient(circle at 35% 35%, rgba(46,139,110,0.5), rgba(0,100,60,0.3) 50%, transparent 70%)",
          filter: "blur(1px)",
          animation: "orbFloat 12s ease-in-out infinite reverse",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="ripple-ring"
            style={{
              width: 200 + i * 150,
              height: 200 + i * 150,
              top: "50%",
              left: "50%",
              marginLeft: -(100 + i * 75),
              marginTop: -(100 + i * 75),
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="yin-yang-3d"
          style={{ opacity: 0.08 }}
        >
          <circle cx="50" cy="50" r="48" fill="var(--gold)" />
          <path
            d="M50,2 A48,48 0 0,1 50,98 A24,24 0 0,1 50,50 A24,24 0 0,0 50,2 Z"
            fill="#0a0704"
          />
          <circle cx="50" cy="26" r="8" fill="var(--gold)" />
          <circle cx="50" cy="74" r="8" fill="#0a0704" />
        </svg>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: 800,
          padding: "0 24px",
          animation: "slideUp 1.2s ease",
        }}
      >
        <div
          style={{
            fontFamily: "Golos Text, sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--gold-dim)",
            marginBottom: 24,
          }}
        >
          ✦ Традиционная Китайская Медицина ✦
        </div>

        <h1
          className="font-cormorant"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            margin: "0 0 8px",
            color: "var(--parchment)",
          }}
        >
          Искусство
        </h1>
        <h1
          className="grad-text font-cormorant"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            margin: "0 0 32px",
            fontStyle: "italic",
          }}
        >
          исцеления
        </h1>

        <p
          className="font-golos"
          style={{
            color: "rgba(196,169,106,0.8)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.8,
            marginBottom: 48,
            maxWidth: 560,
            margin: "0 auto 48px",
          }}
        >
          Пять тысяч лет мудрости, воплощённые в каждом сеансе.
          Мы не лечим болезнь — мы восстанавливаем гармонию, из которой рождается здоровье.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-ritual" onClick={() => scrollTo("procedures")}>
            <span>Начать путь</span>
          </button>
          <button className="btn-jade" onClick={() => scrollTo("about")}>
            О нашей практике
          </button>
        </div>

        <div
          className="scroll-indicator"
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "var(--gold-dim)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            fontFamily: "Golos Text, sans-serif",
          }}
        >
          <span>ПРОКРУТИ</span>
          <Icon name="ChevronDown" size={16} color="var(--gold-dim)" />
        </div>
      </div>
    </section>
  );
}
