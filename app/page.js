"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─── Data ─── */
const SKILLS = {
  expertise: [
    "Enterprise Software Architecture",
    "Generative AI (LLMs & RAG)",
    "Backend Microservices",
    "Distributed Systems",
    "TCP/IP & OS Concepts",
    "Cloud Computing & CI/CD",
    "Database Optimization",
    "REST/gRPC APIs",
  ],
  languages: ["C/C++", "Go (Golang)", "Python", "JavaScript", "TypeScript", "Java", "SQL"],
  tools: [
    "FastAPI",
    "React Native",
    "Next.js",
    "Node.js",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "Redis",
    "Kafka",
    "LangChain",
    "VectorDBs (Chroma)",
    "Linux / POSIX",
    "AWS",
  ],
};

const EXPERIENCE = [
  {
    role: "Full Stack Software Engineer (Part Time)",
    company: "Hostiggo",
    period: "Jan 2026 – Jun 2026",
    desc: "Developed a scalable SaaS platform across a Next.js web portal and React Native app, handling 5,000+ concurrent requests. Architected a Go (Gin) & PostgreSQL microservice syncing 10,000+ monthly events with Redis-based caching, reducing latency by 40%.",
  },
  {
    role: "Software Engineer Intern",
    company: "CoRE Stack",
    period: "Feb 2026 – May 2026",
    desc: "Constructed a highly scalable data analytics platform utilizing FastAPI and React.js. Shifted 100% of data computation to the client-side via WebAssembly to eliminate backend processing overhead, decreasing rendering time by 50%.",
  },
  {
    role: "Software Engineer",
    company: "RegGenLab IIIT Delhi",
    period: "Jan 2026 – Present",
    desc: "Built a comprehensive enterprise collaboration suite powering LLM-driven Chatbots with RAG. Deployed resource-heavy backend tools using Docker containers behind an Apache Reverse Proxy, ensuring 99.9% high-availability.",
  },
];

const PROJECTS = [
  {
    icon: "🧠",
    name: "Scout",
    subtitle: "AI Smart Assistant & Enterprise Data Platform",
    desc: "Production-grade AI platform with FastAPI & LangGraph translating natural language to SQL (95% accuracy). Designed a 9-node self-correcting agent pipeline utilizing LLMs & Vector Search.",
    tags: ["FastAPI", "LangGraph", "ChromaDB", "LLMs"],
    team: 4,
    period: "Mar '26",
    link: "https://github.com/Aayushgupta2005/Scout",
  },
  {
    icon: "⚡",
    name: "Health-Aware TCP Load Balancer",
    subtitle: "High-Throughput Network Router",
    desc: "Multithreaded C++ TCP load balancer using POSIX threads. Engineered active health-check cycles and resolved race conditions via mutex locks, preventing server crashes.",
    tags: ["C++", "TCP/IP", "POSIX Threads", "Networking"],
    team: 1,
    period: "Nov '25 – Dec '25",
    link: "https://github.com/AamanPrime/LoadBalancer-Computer-Networking",
  },
  {
    icon: "📱",
    name: "BedRock",
    subtitle: "Secure Android Mobile App",
    desc: "Cross-platform React Native app implementing robust mobile SW architecture optimized for 60 FPS. Secured an encrypted credential vault handling zero-latency CRUD operations.",
    tags: ["React Native", "Android", "Security", "Crypto"],
    team: 5,
    period: "Aug '25 – Dec '25",
    link: "https://github.com/nipunagg2604/BedRock",
  },
  {
    icon: "💻",
    name: "Unix Shell & Process Manager",
    subtitle: "Concurrent OS Implementation",
    desc: "Custom Linux shell in C parsing 100+ concurrent commands, I/O redirection, and IPC. Eliminated deadlocks via POSIX mutex locks and atomic synchronization primitives.",
    tags: ["C", "Linux", "OS Concepts", "Concurrency"],
    team: 1,
    period: "Sep '24 – Nov '24",
    link: "https://github.com/AamanPrime/SimpleShell",
  },
  {
    icon: "🏢",
    name: "CIPD 360",
    subtitle: "Academic ERP System",
    desc: "Spearheaded an organizational ERP with Python/Nmap services, applying TCP/IP fundamentals to successfully process 5,000+ daily user telemetry records.",
    tags: ["Python", "ERP", "Networking", "Full-Stack"],
    team: 4,
    period: "Jan '26 – Present",
    link: "https://cipd-erp-ic24.vercel.app/",
  },
  {
    icon: "📈",
    name: "Financial Intelligence Pipeline",
    subtitle: "Real-Time ETL Data Scraper",
    desc: "Architected a Python-based automated ETL data pipeline to execute real-time scraping, parsing, and transformation of unstructured financial feeds from third-party sources.",
    tags: ["Python", "ETL", "Data Engineering", "Cron"],
    team: 1,
    period: "Jun '25 – Aug '25",
    link: "https://github.com/AamanPrime/financial-news-intelligence",
  },
];

const ROLES = [
  {
    icon: "🔬",
    title: "Software Developer & Researcher",
    org: "ReggenLab, IIITD",
    period: "Jan '26 – Present",
  },
  {
    icon: "🧪",
    title: "Product Developer & Researcher",
    org: "CiPD, IIITD",
    period: "Jan '26 – Present",
  },
  {
    icon: "💻",
    title: "Web Developer & PR Lead",
    org: "BYLD, IIITD",
    period: "Jan '24 – Dec '25",
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", text: "Peak Codeforces Rating of 1703 (Expert Tier)" },
  { icon: "⚡", text: "Solved 350+ Data Structure and Algorithm problems on LeetCode" },
  { icon: "📜", text: "HackerRank Certified in Data Structures and Algorithms" },
  { icon: "🎮", text: "Certified in Game Development with Unreal Engine" },
];

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const TYPED_TITLES = [
  "Software Engineer",
  "AI & Systems Architect",
  "Backend Developer",
  "Distributed Systems Enthusiast",
];

/* ─── Typed Text Hook ─── */
function useTypedText(texts, typingSpeed = 80, deletingSpeed = 40, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;

    if (!isDeleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIdx === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTextIdx((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, textIdx, texts, typingSpeed, deletingSpeed, pause]);

  return displayed;
}

/* ─── Intersection Observer Hook ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/* ─── Components ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""} ${navOpen ? "nav-open" : ""}`}
      id="navbar"
    >
      <a href="#" className="nav-logo">
        AS.
      </a>
      <ul className="nav-links">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={() => setNavOpen(false)}>
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="mailto:aaman23006@iiitd.ac.in"
            className="nav-cta"
            onClick={() => setNavOpen(false)}
          >
            Hire Me
          </a>
        </li>
      </ul>
      <button
        className="mobile-toggle"
        onClick={() => setNavOpen(!navOpen)}
        aria-label="Toggle navigation"
      >
        {navOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}

function HeroSection() {
  const typedText = useTypedText(TYPED_TITLES);

  return (
    <section className="hero" id="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <p className="hero-greeting">// Hello, World!</p>
          <h1 className="hero-name">Aaman Sheikh</h1>
          <h2 className="hero-title">
            <span className="typed-text">{typedText}</span>
          </h2>
          <p className="hero-description">
            B.Tech CSE student at IIIT Delhi building high-performance backend systems, enterprise AI platforms, and scalable web architectures. Passionate about C++ systems, Golang microservices, and solving complex engineering problems.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">
              View Projects ↓
            </a>
            <a href="#contact" className="btn-outline">
              Get In Touch
            </a>
          </div>
          <div className="hero-social">
            <a
              href="https://github.com/AamanPrime"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              ⌥
            </a>
            <a
              href="https://www.linkedin.com/in/aaman-sheikh-6b1361287"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://leetcode.com/u/aamanprime/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LeetCode"
            >
              LC
            </a>
            <a
              href="https://codeforces.com/profile/_atos_"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Codeforces"
            >
              CF
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="avatar-container">
            <div className="avatar-ring" />
            <Image
              src="/avatar.png"
              alt="Aaman Sheikh"
              width={360}
              height={360}
              className="avatar-img"
              priority
            />
            <span className="avatar-badge">✦ Open to Work</span>
            <span className="floating-tech">⚡ Go</span>
            <span className="floating-tech">🐳 Docker</span>
            <span className="floating-tech">🤖 AI/RAG</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const [ref, isVisible] = useInView();

  return (
    <div className="stats-bar" ref={ref}>
      {[
        { number: "1703", label: "Peak CF Rating" },
        { number: "350+", label: "LeetCode Solved" },
        { number: "10+", label: "Systems Built" },
        { number: "8", label: "Languages" },
      ].map((stat, i) => (
        <div
          key={stat.label}
          className={`stat-item animate-on-scroll ${isVisible ? "visible" : ""} animate-delay-${i + 1}`}
        >
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function AboutSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className="section" id="about" ref={ref}>
      <div className="section-header">
        <p className="section-label">// Who Am I</p>
        <h2 className="section-title">About Me</h2>
        <div className="section-divider" />
      </div>
      <div className={`about-grid animate-on-scroll ${isVisible ? "visible" : ""}`}>
        <div className="about-card">
          <ul className="about-info-list">
            <li className="about-info-item">
              <div className="about-info-icon">📍</div>
              <div>
                <div className="about-info-label">Location</div>
                <div className="about-info-value">New Delhi, India</div>
              </div>
            </li>
            <li className="about-info-item">
              <div className="about-info-icon">🎓</div>
              <div>
                <div className="about-info-label">University</div>
                <div className="about-info-value">IIIT Delhi (CSE)</div>
              </div>
            </li>
            <li className="about-info-item">
              <div className="about-info-icon">💼</div>
              <div>
                <div className="about-info-label">Current Roles</div>
                <div className="about-info-value">SWE @ Hostiggo & RegGenLab</div>
              </div>
            </li>
            <li className="about-info-item">
              <div className="about-info-icon">💻</div>
              <div>
                <div className="about-info-label">Algorithms</div>
                <div className="about-info-value">Codeforces Expert (1703)</div>
              </div>
            </li>
            <li className="about-info-item">
              <div className="about-info-icon">📧</div>
              <div>
                <div className="about-info-label">Email</div>
                <div className="about-info-value">aaman23006@iiitd.ac.in</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="about-text">
          <p>
            I&apos;m <span className="about-highlight">Aaman Sheikh</span>, a pre-final year
            Computer Science undergraduate at{" "}
            <span className="about-highlight">
              Indraprastha Institute of Information Technology, Delhi (IIITD)
            </span>
            . My engineering journey is driven by an obsession with scalable architectures, low-level system design, and competitive programming.
          </p>
          <p>
            Currently, I work as a{" "}
            <span className="about-highlight">Software Engineer at Hostiggo</span> and a researcher at{" "}
            <span className="about-highlight">RegGenLab</span>, building everything from Golang-based synchronization microservices to Dockerized enterprise LLM platforms with Retrieval-Augmented Generation (RAG).
          </p>
          <p>
            I thrive at the intersection of hardcore systems engineering and modern product development. Whether it&apos;s writing a C++ multithreaded TCP load balancer with POSIX mutex locks, or deploying a fluid React Native app, I believe in writing robust, highly concurrent code that performs under pressure.
          </p>
          <p>
            Beyond building systems, I am a highly active competitive programmer with an{" "}
            <span className="about-highlight">
              Expert rating (1703) on Codeforces
            </span>
            , constantly refining my algorithmic intuition to tackle complex data problems.
          </p>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [ref, isVisible] = useInView();

  const dotColors = {
    expertise: "purple",
    languages: "cyan",
    tools: "green",
  };

  const catLabels = {
    expertise: { icon: "🎯", title: "Expertise Areas" },
    languages: { icon: "⌨️", title: "Programming Languages" },
    tools: { icon: "🛠️", title: "Tools & Technologies" },
  };

  return (
    <section className="section" id="skills" ref={ref}>
      <div className="section-header">
        <p className="section-label">// What I Know</p>
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="section-divider" />
      </div>
      <div className="skills-container">
        {Object.entries(SKILLS).map(([category, skills], catIdx) => (
          <div
            key={category}
            className={`skill-category animate-on-scroll ${isVisible ? "visible" : ""} animate-delay-${catIdx + 1}`}
          >
            <h3 className="skill-category-title">
              <span className="cat-icon">{catLabels[category].icon}</span>
              {catLabels[category].title}
            </h3>
            <div className="skills-grid">
              {skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  <span className={`skill-dot ${dotColors[category]}`} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className="section" id="experience" ref={ref}>
      <div className="section-header">
        <p className="section-label">// Where I&apos;ve Worked</p>
        <h2 className="section-title">Experience</h2>
        <div className="section-divider" />
      </div>
      <div className={`timeline animate-on-scroll ${isVisible ? "visible" : ""}`}>
        {EXPERIENCE.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-card">
              <div className="timeline-date">{exp.period}</div>
              <h3 className="timeline-title">{exp.role}</h3>
              <div className="timeline-company">{exp.company}</div>
              <p className="timeline-desc">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="section-header">
        <p className="section-label">// What I&apos;ve Built</p>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of projects showcasing my passion for building scalable,
          performant, and complex distributed software.
        </p>
        <div className="section-divider" />
      </div>
      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <div
            key={project.name}
            className={`project-card animate-on-scroll ${isVisible ? "visible" : ""} animate-delay-${(i % 6) + 1}`}
          >
            <div className="project-icon">{project.icon}</div>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-desc">{project.desc}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-meta">
              <span className="project-team">
                👥 Team of {project.team} · {project.period}
              </span>
              {project.link !== "#" && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  GitHub / Live →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className="section" id="education" ref={ref}>
      <div className="section-header">
        <p className="section-label">// My Journey</p>
        <h2 className="section-title">Education</h2>
        <div className="section-divider" />
      </div>
      <div className="education-cards">
        {[
          {
            badge: "current",
            badgeText: "Currently Pursuing",
            institution: "IIIT Delhi",
            degree: "B.Tech — Computer Science & Engineering",
            year: "2023 – Present",
            cgpa: "CGPA: 7.38",
          },
          {
            badge: "completed",
            badgeText: "Completed",
            institution: "Balwantrai Mehta Vidya Bhawan",
            degree: "CBSE Class XII — PCM",
            year: "2022 – 2023",
            cgpa: "88%",
          },
          {
            badge: "completed",
            badgeText: "Completed",
            institution: "Govt. Boys Sr. Sec. School No.3",
            degree: "CBSE Class X",
            year: "2020 – 2021",
            cgpa: "80%",
          },
        ].map((edu, i) => (
          <div
            key={edu.institution}
            className={`edu-card animate-on-scroll ${isVisible ? "visible" : ""} animate-delay-${i + 1}`}
          >
            <span className={`edu-badge ${edu.badge}`}>{edu.badgeText}</span>
            <h3 className="edu-institution">{edu.institution}</h3>
            <p className="edu-degree">{edu.degree}</p>
            <div className="edu-details">
              <span className="edu-year">{edu.year}</span>
              <span className="edu-score" style={{color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: "bold"}}>{edu.cgpa}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RolesSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className="section" id="roles" ref={ref}>
      <div className="section-header">
        <p className="section-label">// Leadership</p>
        <h2 className="section-title">Positions of Responsibility</h2>
        <div className="section-divider" />
      </div>
      <div className="roles-grid">
        {ROLES.map((role, i) => (
          <div
            key={role.title + role.org}
            className={`role-card animate-on-scroll ${isVisible ? "visible" : ""} animate-delay-${i + 1}`}
          >
            <div className="role-icon">{role.icon}</div>
            <div>
              <h3 className="role-title">{role.title}</h3>
              <p className="role-org">{role.org}</p>
              <p className="role-period">{role.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AchievementsSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className="section" id="achievements" ref={ref}>
      <div className="section-header">
        <p className="section-label">// Milestones</p>
        <h2 className="section-title">Awards & Achievements</h2>
        <div className="section-divider" />
      </div>
      <div className="achievements-grid">
        {ACHIEVEMENTS.map((ach, i) => (
          <div
            key={i}
            className={`achievement-card animate-on-scroll ${isVisible ? "visible" : ""} animate-delay-${i + 1}`}
          >
            <div className="achievement-icon">{ach.icon}</div>
            <p className="achievement-text">{ach.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, isVisible] = useInView();

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="section-header">
        <p className="section-label">// Let&apos;s Connect</p>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          I&apos;m always open to discussing new engineering projects, software architecture, or career opportunities.
        </p>
        <div className="section-divider" />
      </div>
      <div className={`contact-container animate-on-scroll ${isVisible ? "visible" : ""}`}>
        <div className="contact-card">
          <a href="mailto:aaman23006@iiitd.ac.in" className="contact-email">
            aaman23006@iiitd.ac.in
          </a>
          <div className="contact-links">
            <a
              href="https://github.com/AamanPrime"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              ⌥ GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aaman-sheikh-6b1361287"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              in LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/aamanprime/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              ⚡ LeetCode
            </a>
            <a
              href="https://codeforces.com/profile/_atos_"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              🏁 Codeforces
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        Designed & Built with <span className="heart">♥</span> by Aaman Sheikh
        · {new Date().getFullYear()}
      </p>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Background ambient orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <RolesSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

