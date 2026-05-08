import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О практике" },
  { id: "procedures", label: "Процедуры" },
  { id: "blog", label: "Блог" },
  { id: "gallery", label: "Галерея" },
  { id: "reviews", label: "Отзывы" },
];

const PROCEDURES = [
  {
    icon: "✦",
    title: "Акупунктура",
    subtitle: "Игла, проникающая в суть",
    desc: "Древнейшее искусство гармонизации энергии Ци через 365 точек тела. Снимает хроническую боль, восстанавливает сон, возвращает радость жизни.",
    color: "from-amber-900/40 to-red-900/30",
    accent: "#E8A838",
  },
  {
    icon: "✿",
    title: "Фитотерапия",
    subtitle: "Мудрость тысяч трав",
    desc: "Индивидуальные сборы из более чем 500 трав и минералов. Каждый рецепт — уникальная формула, составленная по принципам пяти первоэлементов.",
    color: "from-emerald-900/40 to-teal-900/30",
    accent: "#3CB371",
  },
  {
    icon: "☯",
    title: "Массаж Туйна",
    subtitle: "Руки, помнящие путь",
    desc: "Глубокий терапевтический массаж, работающий с меридианами тела. Разгоняет застои, питает органы, пробуждает природную силу исцеления.",
    color: "from-purple-900/40 to-indigo-900/30",
    accent: "#9B7FD4",
  },
  {
    icon: "⬡",
    title: "Гуаша и Купинг",
    subtitle: "Огонь и нефрит",
    desc: "Детоксикация через кожу — мистический ритуал очищения крови и лимфы. Вытягивает скрытое воспаление, дарит коже сияние здоровья.",
    color: "from-rose-900/40 to-orange-900/30",
    accent: "#E8604A",
  },
  {
    icon: "⟡",
    title: "Цигун-терапия",
    subtitle: "Движение, рождающее покой",
    desc: "Практики управления внутренней энергией под руководством мастера. Регулирует нервную систему, укрепляет иммунитет, продлевает молодость.",
    color: "from-cyan-900/40 to-blue-900/30",
    accent: "#4ECDC4",
  },
  {
    icon: "⊕",
    title: "Диагностика по пульсу",
    subtitle: "Тело не умеет лгать",
    desc: "По трём позициям пульса мастер читает состояние всех органов. Выявляет болезнь до появления симптомов — истинная профилактика.",
    color: "from-yellow-900/40 to-amber-900/30",
    accent: "#F4C430",
  },
];

const BLOG_POSTS = [
  {
    date: "март 2025",
    tag: "Философия",
    title: "Инь и Ян: полярность как основа здоровья",
    excerpt:
      "Почему современная медицина лечит симптомы, а китайская — причину. Взгляд сквозь тысячелетия мудрости.",
    img: "https://cdn.poehali.dev/projects/2baa5af0-bcf5-488c-ad1f-c7badc9d340a/files/fdb98b91-707b-4947-b292-70a15e4bd634.jpg",
  },
  {
    date: "февраль 2025",
    tag: "Практика",
    title: "Пять первоэлементов и ваш тип конституции",
    excerpt:
      "Дерево, Огонь, Земля, Металл, Вода — узнайте свой первоэлемент и поймите, почему болеете именно вы.",
    img: "https://cdn.poehali.dev/projects/2baa5af0-bcf5-488c-ad1f-c7badc9d340a/files/a59d91c8-b64f-4490-aacf-a5d0b53ca1b2.jpg",
  },
  {
    date: "январь 2025",
    tag: "Рецепты",
    title: "Три чая, которые меняют качество сна",
    excerpt:
      "Простые рецепты на основе китайских трав, которые мастера используют уже 2000 лет для восстановления глубокого сна.",
    img: "https://cdn.poehali.dev/projects/2baa5af0-bcf5-488c-ad1f-c7badc9d340a/files/877c2dab-af1e-41a7-82b8-946d2d5af353.jpg",
  },
];

const REVIEWS = [
  {
    name: "Марина К.",
    city: "Москва",
    stars: 5,
    text: "После 12 лет мигреней — три сеанса акупунктуры и я забыла, что это такое. Это не преувеличение, это моя жизнь после.",
    procedure: "Акупунктура",
  },
  {
    name: "Алексей В.",
    city: "Санкт-Петербург",
    stars: 5,
    text: "Пришёл с хроническим бессонием и тревожностью. Месяц фитотерапии — и я сплю как ребёнок. Мастер слышит тело лучше, чем любой кардиолог.",
    procedure: "Фитотерапия",
  },
  {
    name: "Светлана Р.",
    city: "Екатеринбург",
    stars: 5,
    text: "Туйна буквально вернул мне подвижность после грыжи. Хирург говорил — операция неизбежна. Теперь я танцую.",
    procedure: "Массаж Туйна",
  },
  {
    name: "Дмитрий Н.",
    city: "Казань",
    stars: 5,
    text: "Диагностика по пульсу — мистика, которая работает. Мастер назвал мои проблемы раньше, чем я успел открыть рот. Невероятно.",
    procedure: "Диагностика",
  },
];

const GALLERY_ITEMS = [
  {
    type: "img",
    src: "https://cdn.poehali.dev/projects/2baa5af0-bcf5-488c-ad1f-c7badc9d340a/files/877c2dab-af1e-41a7-82b8-946d2d5af353.jpg",
    label: "Сеанс акупунктуры",
  },
  {
    type: "img",
    src: "https://cdn.poehali.dev/projects/2baa5af0-bcf5-488c-ad1f-c7badc9d340a/files/a59d91c8-b64f-4490-aacf-a5d0b53ca1b2.jpg",
    label: "Фитотерапия",
  },
  {
    type: "img",
    src: "https://cdn.poehali.dev/projects/2baa5af0-bcf5-488c-ad1f-c7badc9d340a/files/fdb98b91-707b-4947-b292-70a15e4bd634.jpg",
    label: "Ритуал исцеления",
  },
  {
    type: "video",
    src: "",
    label: "Процедура Гуаша",
    placeholder: true,
  },
  {
    type: "video",
    src: "",
    label: "Цигун-медитация",
    placeholder: true,
  },
  {
    type: "video",
    src: "",
    label: "Купинг-терапия",
    placeholder: true,
  },
];

const HIEROGLYPHS = ["道", "氣", "陰", "陽", "命", "靈", "術", "醫"];

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

function OrbSphere({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        background:
          "radial-gradient(circle at 35% 35%, rgba(212,175,55,0.6), rgba(180,100,20,0.3) 50%, transparent 70%)",
        filter: "blur(1px)",
        animation: "orbFloat 8s ease-in-out infinite",
      }}
    />
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
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
    <div className="min-h-screen" style={{ background: "var(--bg-deep)" }}>
      <style>{`
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
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.4s",
          background:
            scrollY > 50
              ? "rgba(10,7,4,0.95)"
              : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom:
            scrollY > 50
              ? "1px solid rgba(212,175,55,0.1)"
              : "1px solid transparent",
          padding: "18px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => scrollTo("home")}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.6rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
              className="grad-text"
            >
              道 Дао Исцеления
            </div>
          </div>

          {/* Desktop Nav */}
          <div
            className="hidden md:flex"
            style={{ gap: 32, alignItems: "center" }}
          >
            {NAV_ITEMS.map((item) => (
              <span
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </span>
            ))}
            <button
              className="btn-ritual"
              style={{ padding: "10px 24px", fontSize: "0.7rem" }}
              onClick={() => scrollTo("procedures")}
            >
              <span>Записаться</span>
            </button>
          </div>

          {/* Mobile Burger */}
          <button
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--gold)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            style={{
              background: "rgba(10,7,4,0.98)",
              borderTop: "1px solid rgba(212,175,55,0.1)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <span
                key={item.id}
                className="nav-link"
                style={{ fontSize: "1rem" }}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </span>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        ref={(el) => (sectionRefs.current["home"] = el)}
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
        {/* Floating Hieroglyphs */}
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

        {/* 3D Orbs */}
        <OrbSphere
          className="w-96 h-96"
          style={{
            top: "10%",
            right: "-10%",
            animation: "orbFloat 10s ease-in-out infinite",
          } as React.CSSProperties}
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
          } as React.CSSProperties}
        />

        {/* Ripple rings */}
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

        {/* Center Yin-Yang */}
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

      {/* ABOUT */}
      <section
        id="about"
        ref={(el) => (sectionRefs.current["about"] = el)}
        style={{ padding: "120px 24px", background: "var(--bg-mid)" }}
      >
        <div
          style={{ maxWidth: 1100, margin: "0 auto" }}
          className={`section-reveal ${isVisible("about") ? "visible" : ""}`}
        >
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div
              style={{
                fontFamily: "Golos Text, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                color: "var(--gold-dim)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ✦ о нас ✦
            </div>
            <h2
              className="font-cormorant grad-text"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 600,
                margin: "0 0 24px",
              }}
            >
              О практике
            </h2>
            <div className="divider-gold" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
            className="md-grid-1"
          >
            <div>
              <p
                className="font-golos"
                style={{
                  color: "var(--parchment)",
                  fontSize: "1.1rem",
                  lineHeight: 1.9,
                  marginBottom: 24,
                }}
              >
                Наш центр основан мастером Сун Вэем — учеником пекинской
                школы традиционной медицины с 30-летней практикой. Каждый
                специалист центра прошёл обучение непосредственно у носителей
                живой традиции в Китае.
              </p>
              <p
                className="font-golos"
                style={{
                  color: "rgba(196,169,106,0.7)",
                  fontSize: "1rem",
                  lineHeight: 1.9,
                  marginBottom: 40,
                }}
              >
                Мы работаем с телом как с единой системой — где каждый орган
                связан с эмоцией, каждая эмоция — с первоэлементом, каждый
                первоэлемент — с временем года и жизненным циклом. Болезнь для
                нас — это сообщение тела о дисбалансе, а не враг, которого
                нужно уничтожить.
              </p>

              <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                {[
                  { num: "30+", label: "лет практики" },
                  { num: "2 000+", label: "пациентов" },
                  { num: "12", label: "специалистов" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div
                      className="grad-text font-cormorant"
                      style={{ fontSize: "2.5rem", fontWeight: 700 }}
                    >
                      {stat.num}
                    </div>
                    <div
                      className="font-golos"
                      style={{
                        color: "var(--parchment-dim)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  border: "1px solid rgba(212,175,55,0.1)",
                  transform: "rotate(2deg)",
                  borderRadius: 4,
                }}
              />
              <img
                src="https://cdn.poehali.dev/projects/2baa5af0-bcf5-488c-ad1f-c7badc9d340a/files/877c2dab-af1e-41a7-82b8-946d2d5af353.jpg"
                alt="Практика"
                style={{
                  width: "100%",
                  borderRadius: 4,
                  display: "block",
                  filter: "brightness(0.85) contrast(1.1)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                }}
                className="card-3d"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -16,
                  right: -16,
                  background: "var(--bg-deep)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  padding: "16px 24px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="grad-text font-cormorant"
                  style={{ fontSize: "1.8rem", fontWeight: 600 }}
                >
                  道法自然
                </div>
                <div
                  className="font-golos"
                  style={{
                    color: "var(--parchment-dim)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  Дао следует природе
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCEDURES */}
      <section
        id="procedures"
        ref={(el) => (sectionRefs.current["procedures"] = el)}
        className="mesh-bg-2"
        style={{ padding: "120px 24px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", marginBottom: 80 }}
            className={`section-reveal ${isVisible("procedures") ? "visible" : ""}`}
          >
            <div
              style={{
                fontFamily: "Golos Text, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                color: "var(--gold-dim)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ✦ методы ✦
            </div>
            <h2
              className="font-cormorant grad-text"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, margin: "0 0 24px" }}
            >
              Процедуры
            </h2>
            <div className="divider-gold" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 24,
            }}
          >
            {PROCEDURES.map((proc, i) => (
              <div
                key={i}
                className={`proc-card section-reveal ${isVisible("procedures") ? "visible" : ""}`}
                style={{
                  padding: "36px 32px",
                  borderRadius: 4,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: 20,
                    color: proc.accent,
                    lineHeight: 1,
                    textShadow: `0 0 20px ${proc.accent}50`,
                    animation: `breathe ${3 + i * 0.5}s ease-in-out infinite`,
                  }}
                >
                  {proc.icon}
                </div>
                <div
                  className="font-golos"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: proc.accent,
                    opacity: 0.7,
                    marginBottom: 8,
                  }}
                >
                  {proc.subtitle}
                </div>
                <h3
                  className="font-cormorant"
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    color: "var(--parchment)",
                    margin: "0 0 16px",
                  }}
                >
                  {proc.title}
                </h3>
                <p
                  className="font-golos"
                  style={{
                    color: "rgba(196,169,106,0.7)",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                    margin: "0 0 24px",
                  }}
                >
                  {proc.desc}
                </p>
                <button
                  className="btn-jade"
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => scrollTo("home")}
                >
                  Записаться
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        ref={(el) => (sectionRefs.current["gallery"] = el)}
        style={{ padding: "120px 24px", background: "var(--bg-deep)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", marginBottom: 80 }}
            className={`section-reveal ${isVisible("gallery") ? "visible" : ""}`}
          >
            <div
              style={{
                fontFamily: "Golos Text, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                color: "var(--gold-dim)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ✦ галерея ✦
            </div>
            <h2
              className="font-cormorant grad-text"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, margin: "0 0 24px" }}
            >
              Фото и видео
            </h2>
            <div className="divider-gold" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "260px 260px",
              gap: 16,
            }}
          >
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`gallery-item section-reveal ${isVisible("gallery") ? "visible" : ""}`}
                style={{
                  borderRadius: 4,
                  gridColumn: i === 0 ? "span 2" : undefined,
                  transitionDelay: `${i * 0.1}s`,
                  cursor: "pointer",
                }}
              >
                {item.placeholder ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "rgba(255,255,255,0.03)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        border: "1px solid rgba(212,175,55,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="Play" size={20} color="var(--gold)" />
                    </div>
                    <span
                      className="font-golos"
                      style={{
                        color: "var(--parchment-dim)",
                        fontSize: "0.8rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ) : (
                  <>
                    <img src={item.src} alt={item.label} />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "16px",
                        background:
                          "linear-gradient(transparent, rgba(10,7,4,0.8))",
                        zIndex: 1,
                      }}
                    >
                      <span
                        className="font-golos"
                        style={{
                          color: "var(--parchment-dim)",
                          fontSize: "0.8rem",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section
        id="blog"
        ref={(el) => (sectionRefs.current["blog"] = el)}
        style={{ padding: "120px 24px", background: "var(--bg-mid)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", marginBottom: 80 }}
            className={`section-reveal ${isVisible("blog") ? "visible" : ""}`}
          >
            <div
              style={{
                fontFamily: "Golos Text, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                color: "var(--gold-dim)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ✦ знания ✦
            </div>
            <h2
              className="font-cormorant grad-text"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, margin: "0 0 24px" }}
            >
              Блог
            </h2>
            <div className="divider-gold" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 32,
            }}
          >
            {BLOG_POSTS.map((post, i) => (
              <article
                key={i}
                className={`card-3d section-reveal ${isVisible("blog") ? "visible" : ""}`}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    height: 200,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={post.img}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                      filter: "brightness(0.8)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "rgba(10,7,4,0.8)",
                      border: "1px solid rgba(212,175,55,0.3)",
                      padding: "4px 12px",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <span
                      className="font-golos shimmer-text"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
                    >
                      {post.tag}
                    </span>
                  </div>
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <div
                    className="font-golos"
                    style={{
                      color: "var(--gold-dim)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.1em",
                      marginBottom: 12,
                    }}
                  >
                    {post.date}
                  </div>
                  <h3
                    className="font-cormorant"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "var(--parchment)",
                      margin: "0 0 16px",
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="font-golos"
                    style={{
                      color: "rgba(196,169,106,0.65)",
                      fontSize: "0.9rem",
                      lineHeight: 1.7,
                      margin: "0 0 24px",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    className="font-golos"
                    style={{
                      color: "var(--gold)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(212,175,55,0.3)",
                      paddingBottom: 2,
                      transition: "border-color 0.3s",
                    }}
                  >
                    Читать далее →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        id="reviews"
        ref={(el) => (sectionRefs.current["reviews"] = el)}
        className="mesh-bg"
        style={{ padding: "120px 24px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{ textAlign: "center", marginBottom: 80 }}
            className={`section-reveal ${isVisible("reviews") ? "visible" : ""}`}
          >
            <div
              style={{
                fontFamily: "Golos Text, sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                color: "var(--gold-dim)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              ✦ истории исцеления ✦
            </div>
            <h2
              className="font-cormorant grad-text"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, margin: "0 0 24px" }}
            >
              Отзывы
            </h2>
            <div className="divider-gold" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className={`review-card section-reveal ${isVisible("reviews") ? "visible" : ""}`}
                style={{
                  padding: "40px 28px 32px",
                  borderRadius: 4,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                  {[...Array(rev.stars)].map((_, s) => (
                    <span key={s} style={{ color: "var(--gold)", fontSize: "0.9rem" }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  className="font-golos"
                  style={{
                    color: "var(--parchment)",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    margin: "0 0 28px",
                    fontStyle: "italic",
                  }}
                >
                  {rev.text}
                </p>
                <div
                  style={{
                    borderTop: "1px solid rgba(212,175,55,0.1)",
                    paddingTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      className="font-golos"
                      style={{
                        color: "var(--parchment-dim)",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {rev.name}
                    </div>
                    <div
                      className="font-golos"
                      style={{ color: "var(--gold-dim)", fontSize: "0.75rem" }}
                    >
                      {rev.city}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(212,175,55,0.08)",
                      border: "1px solid rgba(212,175,55,0.2)",
                      padding: "4px 12px",
                      borderRadius: 2,
                    }}
                  >
                    <span
                      className="font-golos"
                      style={{ color: "var(--gold-dim)", fontSize: "0.65rem", letterSpacing: "0.1em" }}
                    >
                      {rev.procedure}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section
        style={{
          padding: "120px 24px",
          background: "var(--bg-mid)",
          borderTop: "1px solid rgba(212,175,55,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            className="font-cormorant"
            style={{
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              fontWeight: 300,
              color: "rgba(212,175,55,0.15)",
              lineHeight: 1,
              marginBottom: -40,
              fontStyle: "italic",
            }}
          >
            道
          </div>
          <h2
            className="font-cormorant grad-text"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 600,
              margin: "0 0 24px",
            }}
          >
            Начните путь к гармонии
          </h2>
          <p
            className="font-golos"
            style={{
              color: "rgba(196,169,106,0.7)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              marginBottom: 48,
            }}
          >
            Запишитесь на первичную диагностику — и мастер составит
            индивидуальный план восстановления именно для вас.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
            <button className="btn-ritual" style={{ fontSize: "0.85rem", padding: "16px 48px" }} onClick={() => scrollTo("procedures")}>
              <span>Записаться на сеанс</span>
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: 40,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "Phone", text: "+7 (495) 123-45-67" },
              { icon: "MapPin", text: "Москва, ул. Мира, 12" },
              { icon: "Clock", text: "Пн–Вс, 9:00–21:00" },
            ].map((c) => (
              <div
                key={c.icon}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <Icon name={c.icon as "Phone"} size={16} color="var(--gold-dim)" />
                <span
                  className="font-golos"
                  style={{
                    color: "var(--parchment-dim)",
                    fontSize: "0.85rem",
                  }}
                >
                  {c.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <footer
        style={{
          borderTop: "1px solid rgba(212,175,55,0.08)",
          padding: "24px",
          textAlign: "center",
          background: "var(--bg-deep)",
        }}
      >
        <p
          className="font-golos"
          style={{
            color: "rgba(196,169,106,0.3)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
          }}
        >
          © 2025 Дао Исцеления · Традиционная Китайская Медицина
        </p>
      </footer>
    </div>
  );
}
