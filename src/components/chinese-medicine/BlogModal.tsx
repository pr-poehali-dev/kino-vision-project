import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

interface ContentBlock {
  type: "lead" | "heading" | "paragraph" | "quote";
  text: string;
  author?: string;
}

interface BlogPost {
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  img: string;
  readTime: string;
  content: ContentBlock[];
}

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
      setClosing(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [post]);

  const handleClose = () => {
    setClosing(true);
    setVisible(false);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!post && !closing) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        background: visible ? "rgba(5,3,2,0.85)" : "rgba(5,3,2,0)",
        backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        transition: "background 0.5s ease, backdrop-filter 0.5s ease",
      }}
    >
      {/* Sliding panel */}
      <div
        ref={scrollRef}
        style={{
          width: "min(780px, 100vw)",
          height: "100vh",
          overflowY: "auto",
          background: "#0d0a06",
          borderLeft: "1px solid rgba(212,175,55,0.15)",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          position: "relative",
        }}
      >
        {/* Hero image */}
        <div style={{ position: "relative", height: 340, overflow: "hidden" }}>
          <img
            src={post?.img}
            alt={post?.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.5) saturate(0.8)",
              transform: "scale(1.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(13,10,6,0.3) 0%, rgba(13,10,6,0) 40%, rgba(13,10,6,1) 100%)",
            }}
          />
          {/* Close btn */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(10,7,4,0.7)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "var(--gold)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.2)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(10,7,4,0.7)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.3)";
            }}
          >
            <Icon name="X" size={18} />
          </button>

          {/* Tag + meta */}
          <div
            style={{
              position: "absolute",
              bottom: 32,
              left: 40,
              right: 40,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
              <span
                className="shimmer-text font-golos"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  background: "rgba(10,7,4,0.6)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  padding: "4px 14px",
                  backdropFilter: "blur(10px)",
                  display: "inline-block",
                }}
              >
                {post?.tag}
              </span>
              <span className="font-golos" style={{ color: "var(--gold-dim)", fontSize: "0.75rem" }}>
                {post?.date}
              </span>
              <span style={{ color: "rgba(212,175,55,0.3)" }}>·</span>
              <span className="font-golos" style={{ color: "var(--gold-dim)", fontSize: "0.75rem" }}>
                {post?.readTime} чтения
              </span>
            </div>
            <h1
              className="font-cormorant"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 600,
                color: "var(--parchment)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {post?.title}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div style={{ padding: "48px 40px 80px" }}>
          {post?.content.map((block, i) => {
            if (block.type === "lead") {
              return (
                <p
                  key={i}
                  className="font-cormorant"
                  style={{
                    fontSize: "1.35rem",
                    fontStyle: "italic",
                    color: "var(--parchment-dim)",
                    lineHeight: 1.75,
                    marginBottom: 40,
                    paddingBottom: 40,
                    borderBottom: "1px solid rgba(212,175,55,0.1)",
                  }}
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="font-cormorant grad-text"
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 600,
                    margin: "48px 0 20px",
                    lineHeight: 1.2,
                  }}
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "paragraph") {
              return (
                <p
                  key={i}
                  className="font-golos"
                  style={{
                    color: "rgba(196,169,106,0.8)",
                    fontSize: "1.05rem",
                    lineHeight: 1.85,
                    marginBottom: 24,
                  }}
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  style={{
                    margin: "40px 0",
                    padding: "28px 32px",
                    borderLeft: "3px solid var(--gold)",
                    background: "rgba(212,175,55,0.04)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "5rem",
                      color: "var(--gold)",
                      opacity: 0.15,
                      position: "absolute",
                      top: -10,
                      left: 16,
                      lineHeight: 1,
                    }}
                  >
                    "
                  </div>
                  <p
                    className="font-cormorant"
                    style={{
                      fontSize: "1.25rem",
                      fontStyle: "italic",
                      color: "var(--parchment)",
                      margin: "0 0 12px",
                      lineHeight: 1.7,
                    }}
                  >
                    {block.text}
                  </p>
                  {block.author && (
                    <cite
                      className="font-golos"
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--gold-dim)",
                        letterSpacing: "0.05em",
                        fontStyle: "normal",
                      }}
                    >
                      — {block.author}
                    </cite>
                  )}
                </blockquote>
              );
            }
            return null;
          })}

          {/* Divider */}
          <div
            style={{
              margin: "60px 0 40px",
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
            }}
          />

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <p
              className="font-golos"
              style={{
                color: "rgba(196,169,106,0.6)",
                fontSize: "0.95rem",
                marginBottom: 24,
              }}
            >
              Хотите узнать, какая практика подойдёт именно вам?
            </p>
            <button
              className="btn-ritual"
              onClick={handleClose}
              style={{ fontSize: "0.8rem" }}
            >
              <span>Записаться на консультацию</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
