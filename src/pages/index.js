import Layout from "@theme/Layout";
import React, { useEffect, useState } from "react";

const technologies = [
  {
    name: "TypeScript",
    description: "Mastering types & interfaces",
    icon: "TS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    gradientStart: "#3b82f6",
    gradientEnd: "#1d4ed8",
  },
  {
    name: "Node.js",
    description: "Backend runtime & async patterns",
    icon: "⚡",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    gradientStart: "#10b981",
    gradientEnd: "#047857",
  },
  {
    name: "Express",
    description: "RESTful APIs & middleware",
    icon: "🚂",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    gradientStart: "#4b5563",
    gradientEnd: "#1f2937",
  },
  {
    name: "Golang",
    description: "Concurrency & performance",
    icon: "🐹",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    gradientStart: "#06b6d4",
    gradientEnd: "#2563eb",
  },
  {
    name: "Next.js",
    description: "React SSR & routing",
    icon: "▲",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    gradientStart: "#1f2937",
    gradientEnd: "#000000",
  },
  {
    name: "PostgreSQL",
    description: "SQL queries & optimization",
    icon: "🐘",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    gradientStart: "#2563eb",
    gradientEnd: "#4338ca",
  },
  {
    name: "Prisma",
    description: "Type-safe database access",
    icon: "🟦",
    logo: "https://raw.githubusercontent.com/prisma/prisma-assets/main/Logo/prisma-logo.svg",
    gradientStart: "#374151",
    gradientEnd: "#111827",
  },
  {
    name: "Docker",
    description: "Containerization & orchestration",
    icon: "🐳",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    gradientStart: "#3b82f6",
    gradientEnd: "#0891b2",
  },
  {
    name: "Nginx",
    description: "Reverse proxy & load balancing",
    icon: "🌐",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    gradientStart: "#16a34a",
    gradientEnd: "#047857",
  },
];

const codeSnippet = `// TypeScript + Express + Prisma Example
interface User {
  id: number;
  email: string;
  name: string;
}

app.get('/api/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(user);
});`;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(
        theme === "dark" ||
          (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Also listen to media query changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", checkTheme);
    };
  }, []);

  return (
    <Layout
      title="Full-Stack Bootcamp Notes"
      description="6-Month Journey Learning TypeScript, Node.js, Express, Golang, Next.js, PostgreSQL, Prisma, Docker & Nginx"
      noFooter
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        :root {
          --navy: #0f172a;
          --teal: #14b8a6;
          --violet: #8b5cf6;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        
        .fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .float {
          animation: float 6s ease-in-out infinite;
        }
        
        .glow-effect {
          animation: glow 3s ease-in-out infinite;
        }
        
        .tech-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tech-card:hover {
          transform: translateY(-4px);
        }
        
        .code-block {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--teal), var(--violet));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: isDark
            ? "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
            : "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)",
          color: isDark ? "#e2e8f0" : "#1e293b",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating code fragments */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            opacity: 0.05,
            fontSize: "4rem",
            fontFamily: "'JetBrains Mono', monospace",
            animation: "float 8s ease-in-out infinite",
            animationDelay: "0s",
          }}
        >
          {"{ }"}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            opacity: 0.05,
            fontSize: "3rem",
            fontFamily: "'JetBrains Mono', monospace",
            animation: "float 10s ease-in-out infinite",
            animationDelay: "2s",
          }}
        >
          {"< />"}
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "10%",
            opacity: 0.05,
            fontSize: "2.5rem",
            fontFamily: "'JetBrains Mono', monospace",
            animation: "float 12s ease-in-out infinite",
            animationDelay: "4s",
          }}
        >
          {"=>"}
        </div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "4rem 2rem",
          }}
        >
          {/* Header Section */}
          <header
            className={mounted ? "fade-in" : ""}
            style={{
              textAlign: "center",
              marginBottom: "6rem",
              opacity: mounted ? 1 : 0,
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 800,
                marginBottom: "1rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              <span className="gradient-text">Next Level Bootcamp Notes</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                marginBottom: "1rem",
                color: isDark ? "#cbd5e1" : "#475569",
                fontWeight: 500,
              }}
            >
              6-Month Journey Learning TypeScript, Node.js, Express, Golang,
              Next.js, PostgreSQL, Prisma, Docker & Nginx.
            </p>

            <p
              style={{
                fontSize: "1.1rem",
                color: isDark ? "#94a3b8" : "#64748b",
                fontStyle: "italic",
                marginBottom: "3rem",
              }}
            >
              Learning, Building, and Documenting — One Stack at a Time.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/next-level-doc/docs/mission-1-be-a-critical-thinker-with-js/module-1-mindset-over-syntax"
                className="glow-effect"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 2rem",
                  background: "linear-gradient(135deg, #14b8a6, #8b5cf6)",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  boxShadow: `0 4px 20px ${
                    isDark
                      ? "rgba(139, 92, 246, 0.3)"
                      : "rgba(20, 184, 166, 0.3)"
                  }`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 30px ${
                    isDark
                      ? "rgba(139, 92, 246, 0.5)"
                      : "rgba(20, 184, 166, 0.5)"
                  }`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 20px ${
                    isDark
                      ? "rgba(139, 92, 246, 0.3)"
                      : "rgba(20, 184, 166, 0.3)"
                  }`;
                }}
              >
                📘 Start Reading
              </a>
            </div>
          </header>

          {/* Main Section - Technology Grid */}
          <section
            className={mounted ? "fade-in" : ""}
            style={{
              marginBottom: "6rem",
              opacity: mounted ? 1 : 0,
              animationDelay: "0.2s",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "3rem",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="gradient-text">Tech Stack</span>
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-card"
                  style={{
                    background: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    border: `1px solid ${
                      isDark
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(15, 23, 42, 0.1)"
                    }`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${tech.gradientStart} 0%, ${tech.gradientEnd} 100%)`,
                      opacity: 0.8,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      style={{
                        height: "2.2rem",
                        width: "2.2rem",
                        borderRadius: "0.3rem",
                        background: "#fff",
                        boxShadow: isDark
                          ? "0 1px 6px #0f172a55"
                          : "0 1px 4px #64748b25",
                        objectFit: "contain",
                        padding: "0.15rem",
                      }}
                    />
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        margin: 0,
                        color: isDark ? "#e2e8f0" : "#1e293b",
                      }}
                    >
                      {tech.name}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: isDark ? "#94a3b8" : "#64748b",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Code Snippet & Architecture Section */}
          <section
            className={mounted ? "fade-in" : ""}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              marginBottom: "6rem",
              opacity: mounted ? 1 : 0,
              animationDelay: "0.4s",
            }}
          >
            {/* Code Snippet */}
            <div
              style={{
                background: isDark ? "#1e293b" : "#f1f5f9",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: `1px solid ${
                  isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)"
                }`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1rem",
                  fontSize: "0.875rem",
                  color: isDark ? "#94a3b8" : "#64748b",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <span>⚡</span>
                <span>Example Snippet</span>
              </div>
              <pre
                className="code-block"
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  color: isDark ? "#e2e8f0" : "#1e293b",
                  overflow: "auto",
                }}
              >
                <code>{codeSnippet}</code>
              </pre>
            </div>

            {/* Architecture Diagram */}
            <div
              style={{
                background: isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                borderRadius: "1rem",
                padding: "2rem",
                border: `1px solid ${
                  isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)"
                }`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  color: isDark ? "#94a3b8" : "#64748b",
                  marginBottom: "1.5rem",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                🏗️ Architecture Flow
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #14b8a6, #8b5cf6)",
                    color: "#fff",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  Frontend (Next.js)
                </div>
                <div style={{ fontSize: "1.5rem" }}>↕</div>
                <div
                  style={{
                    background: isDark
                      ? "rgba(139, 92, 246, 0.2)"
                      : "rgba(139, 92, 246, 0.1)",
                    color: isDark ? "#c4b5fd" : "#6d28d9",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  Backend (Express/Node)
                </div>
                <div style={{ fontSize: "1.5rem" }}>↕</div>
                <div
                  style={{
                    background: isDark
                      ? "rgba(20, 184, 166, 0.2)"
                      : "rgba(20, 184, 166, 0.1)",
                    color: isDark ? "#5eead4" : "#0d9488",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                >
                  Database (PostgreSQL)
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            className={mounted ? "fade-in" : ""}
            style={{
              textAlign: "center",
              paddingTop: "4rem",
              borderTop: `1px solid ${
                isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)"
              }`,
              opacity: mounted ? 1 : 0,
              animationDelay: "0.6s",
            }}
          >
            <p
              style={{
                fontSize: "1rem",
                marginBottom: "1.5rem",
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            >
              Created with ❤️ by{" "}
              <strong style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>
                Sakib Rahman
              </strong>
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://github.com/srdo96"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: isDark ? "#94a3b8" : "#64748b",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#14b8a6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b";
                }}
              >
                GitHub
              </a>
              <a
                href="www.linkedin.com/in/sakib5/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: isDark ? "#94a3b8" : "#64748b",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#14b8a6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b";
                }}
              >
                LinkedIn
              </a>
              {/* <a
                href="https://portfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: isDark ? "#94a3b8" : "#64748b",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#14b8a6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b";
                }}
              >
                Portfolio
              </a> */}
            </div>
          </footer>
        </div>
      </main>
    </Layout>
  );
}
