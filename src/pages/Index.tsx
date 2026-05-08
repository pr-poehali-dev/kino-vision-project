import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/chinese-medicine/Navbar";
import HeroSection from "@/components/chinese-medicine/HeroSection";
import ContentSections from "@/components/chinese-medicine/ContentSections";
import CinematicBackground from "@/components/chinese-medicine/CinematicBackground";

const GLOBAL_STYLES = `
  :root {
    --bg-deep: #0a0704;
    --bg-mid: #120e08;
    --gold: #D4AF37;
    --gold-light: #F0D060;
    --gold-dim: #8B6914;
    --jade: #2E8B6E;
    --jade-light: #3CB371;
    --crimson: #8B1A1A;
    --parchment: #F5E6C8;
    --parchment-dim: #C4A96A;
  }
  * { box-sizing: border-box; }
  body { margin: 0; }
  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-golos { font-family: 'Golos Text', sans-serif; }

  @keyframes floatHiero {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
    33% { transform: translateY(-20px) rotate(3deg); opacity: 1; }
    66% { transform: translateY(10px) rotate(-2deg); opacity: 0.4; }
  }
  @keyframes orbFloat {
    0%, 100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(20px,-15px) scale(1.1); }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse3d {
    0%, 100% { transform: scale(1) rotateY(0deg); box-shadow: 0 0 30px rgba(212,175,55,0.3); }
    50% { transform: scale(1.03) rotateY(5deg); box-shadow: 0 0 60px rgba(212,175,55,0.6); }
  }
  @keyframes rotateSlow {
    from { transform: rotateZ(0deg) rotateX(15deg); }
    to { transform: rotateZ(360deg) rotateX(15deg); }
  }
  @keyframes breathe {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes ripple {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
  }

  .grad-text {
    background: linear-gradient(135deg, #D4AF37 0%, #F0D060 30%, #C4A96A 60%, #D4AF37 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease infinite;
  }
  .shimmer-text {
    background: linear-gradient(90deg, #8B6914 0%, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, #8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  .card-3d {
    transform-style: preserve-3d;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
  }
  .card-3d:hover {
    transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateZ(10px);
    box-shadow: 20px 20px 60px rgba(0,0,0,0.6), -5px -5px 20px rgba(212,175,55,0.1);
  }
  .btn-ritual {
    position: relative;
    overflow: hidden;
    font-family: 'Golos Text', sans-serif;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: 1px solid var(--gold);
    color: var(--gold);
    background: transparent;
    padding: 14px 36px;
    cursor: pointer;
    transition: all 0.4s ease;
    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
  }
  .btn-ritual::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold) 0%, #F0D060 100%);
    transform: translateX(-100%) skewX(-15deg);
    transition: transform 0.4s ease;
  }
  .btn-ritual:hover::before {
    transform: translateX(0) skewX(-15deg);
  }
  .btn-ritual:hover {
    color: #0a0704;
    border-color: var(--gold-light);
  }
  .btn-ritual span { position: relative; z-index: 1; }

  .btn-jade {
    position: relative;
    font-family: 'Golos Text', sans-serif;
    font-weight: 500;
    letter-spacing: 0.1em;
    border: 1px solid var(--jade);
    color: var(--jade-light);
    background: rgba(46,139,110,0.1);
    padding: 12px 28px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 2px;
  }
  .btn-jade:hover {
    background: rgba(46,139,110,0.25);
    box-shadow: 0 0 20px rgba(60,179,113,0.3);
    transform: translateY(-2px);
  }

  .nav-link {
    font-family: 'Golos Text', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--parchment-dim);
    cursor: pointer;
    position: relative;
    padding: 4px 0;
    transition: color 0.3s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    height: 1px;
    background: var(--gold);
    width: 0;
    transition: width 0.3s ease;
  }
  .nav-link:hover, .nav-link.active {
    color: var(--gold-light);
  }
  .nav-link:hover::after, .nav-link.active::after {
    width: 100%;
  }

  .section-reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .section-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .yin-yang-3d {
    width: 120px; height: 120px;
    animation: rotateSlow 20s linear infinite;
    filter: drop-shadow(0 0 20px rgba(212,175,55,0.5));
  }

  .divider-gold {
    width: 80px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 0 auto;
  }

  .mesh-bg {
    background: 
      radial-gradient(ellipse at 20% 20%, rgba(139,26,26,0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(46,139,110,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 60%),
      #0a0704;
  }
  .mesh-bg-2 {
    background: 
      radial-gradient(ellipse at 70% 20%, rgba(155,127,212,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.1) 0%, transparent 50%),
      #0f0b06;
  }

  .proc-card {
    border: 1px solid rgba(212,175,55,0.15);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(10px);
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
  }
  .proc-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }
  .proc-card:hover::before { transform: scaleX(1); }
  .proc-card:hover {
    border-color: rgba(212,175,55,0.4);
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.1);
  }

  .review-card {
    border: 1px solid rgba(212,175,55,0.12);
    background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
    transition: all 0.4s;
    position: relative;
  }
  .review-card::before {
    content: '"';
    position: absolute;
    top: -10px; left: 20px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 6rem;
    color: var(--gold);
    opacity: 0.15;
    line-height: 1;
  }
  .review-card:hover {
    border-color: rgba(212,175,55,0.3);
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }

  .gallery-item {
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(212,175,55,0.1);
    transition: all 0.4s;
  }
  .gallery-item::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(212,175,55,0.1), transparent);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .gallery-item:hover::after { opacity: 1; }
  .gallery-item:hover { border-color: rgba(212,175,55,0.4); transform: scale(1.02); }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .gallery-item:hover img { transform: scale(1.08); }

  .ripple-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(212,175,55,0.3);
    animation: ripple 3s ease-out infinite;
  }

  .scroll-indicator {
    animation: breathe 2s ease-in-out infinite;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0704; }
  ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }
`;

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSection(e.target.id);
            setVisibleSections((prev) => new Set([...prev, e.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-deep)", cursor: "none" }}>
      <style>{GLOBAL_STYLES}</style>

      <CinematicBackground />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar
        scrollY={scrollY}
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      <HeroSection
        scrollTo={scrollTo}
        sectionRef={(el) => (sectionRefs.current["home"] = el)}
      />

      <ContentSections
        isVisible={isVisible}
        scrollTo={scrollTo}
        sectionRefs={sectionRefs}
      />
      </div>
    </div>
  );
}