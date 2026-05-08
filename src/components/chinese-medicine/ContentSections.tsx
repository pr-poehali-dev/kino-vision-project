import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  PROCEDURES,
  BLOG_POSTS,
  REVIEWS,
  GALLERY_ITEMS,
} from "./constants";
import BlogModal from "./BlogModal";

interface ContentSectionsProps {
  isVisible: (id: string) => boolean;
  scrollTo: (id: string) => void;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
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
        ✦ {tag} ✦
      </div>
      <h2
        className="font-cormorant grad-text"
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          fontWeight: 600,
          margin: "0 0 24px",
        }}
      >
        {title}
      </h2>
      <div className="divider-gold" />
    </div>
  );
}

type BlogPost = (typeof BLOG_POSTS)[number];

export default function ContentSections({
  isVisible,
  scrollTo,
  sectionRefs,
}: ContentSectionsProps) {
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  return (
    <>
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
          <SectionHeader tag="о нас" title="О практике" />

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
            className={`section-reveal ${isVisible("procedures") ? "visible" : ""}`}
          >
            <SectionHeader tag="методы" title="Процедуры" />
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
            className={`section-reveal ${isVisible("gallery") ? "visible" : ""}`}
          >
            <SectionHeader tag="галерея" title="Фото и видео" />
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
            className={`section-reveal ${isVisible("blog") ? "visible" : ""}`}
          >
            <SectionHeader tag="знания" title="Блог" />
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
                onClick={() => setActiveBlog(post)}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  transitionDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.35)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(212,175,55,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.12)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
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
                  {"readTime" in post && (
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "rgba(10,7,4,0.7)",
                        padding: "4px 10px",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(212,175,55,0.15)",
                      }}
                    >
                      <span className="font-golos" style={{ color: "var(--gold-dim)", fontSize: "0.65rem" }}>
                        {(post as typeof post & { readTime: string }).readTime}
                      </span>
                    </div>
                  )}
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
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      color: "var(--gold)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(212,175,55,0.3)",
                      paddingBottom: 2,
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.letterSpacing = "0.2em";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.letterSpacing = "0.15em";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.3)";
                    }}
                  >
                    Читать далее
                    <Icon name="ArrowRight" size={13} color="var(--gold)" />
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
            className={`section-reveal ${isVisible("reviews") ? "visible" : ""}`}
          >
            <SectionHeader tag="истории исцеления" title="Отзывы" />
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
                      style={{
                        color: "var(--gold-dim)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                      }}
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
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 60,
            }}
          >
            <button
              className="btn-ritual"
              style={{ fontSize: "0.85rem", padding: "16px 48px" }}
              onClick={() => scrollTo("procedures")}
            >
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
                  style={{ color: "var(--parchment-dim)", fontSize: "0.85rem" }}
                >
                  {c.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogModal post={activeBlog} onClose={() => setActiveBlog(null)} />

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
    </>
  );
}