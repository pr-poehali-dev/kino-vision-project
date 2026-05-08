import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "./constants";

interface NavbarProps {
  scrollY: number;
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function Navbar({
  scrollY,
  activeSection,
  menuOpen,
  setMenuOpen,
  scrollTo,
}: NavbarProps) {
  return (
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
        <div onClick={() => scrollTo("home")} style={{ cursor: "pointer" }}>
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
  );
}
