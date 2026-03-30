"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─── Data ─── */
const SKILLS = {
  expertise: [
    "Web Development",
    "Android App Dev",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Design & Modelling",
    "Distributed Systems",
    "RESTful APIs",
    "System Design",
    "SQL Optimization",
    "CI/CD",
    "AWS",
  ],
  languages: ["C++", "Python", "Java", "JavaScript", "R", "C#", "Go"],
  tools: [
    "React",
    "Next.js",
    "Node.js",
    "React Native",
    "Flask",
    "Docker",
    "Kubernetes",
    "Django",
    "SQL",
    "Selenium",
    ".NET",
    "Google Cloud",
    "Git / GitHub",
  ],
};

const PROJECTS = [
  {
    icon: "🎬",
    name: "AniVerse",
    subtitle: "Cloud-Native Anime Streaming",
    desc: "Full-stack streaming system (Next.js + PostgreSQL) deployed on Vercel with 40% faster SQL queries, scalable APIs, and robust error handling.",
    tags: ["Next.js", "PostgreSQL", "Vercel", "REST API"],
    team: 2,
    period: "Jan '25 – Apr '25",
    link: "https://ani-verse-one.vercel.app/",
  },
  {
    icon: "🧠",
    name: "Distributed Collaboration Platform",
    subtitle: "Real-Time Document Editing",
    desc: "Production-grade platform with real-time document editing and per-user isolated Jupyter execution, secured via Apache reverse proxy.",
    tags: ["Distributed Systems", "Jupyter", "Apache", "Docker"],
    team: 1,
    period: "Jan '26 – Present",
    link: "#",
  },
  {
    icon: "🕹️",
    name: "Angry Birds Clone",
    subtitle: "Java LibGDX Game",
    desc: "Real-time physics, collision detection, and trajectory algorithms at 60 FPS with 50+ concurrent objects. Full test suite with JUnit.",
    tags: ["Java", "LibGDX", "Physics", "JUnit"],
    team: 2,
    period: "Sep '24 – Nov '24",
    link: "#",
  },
  {
    icon: "🏫",
    name: "CIPD 360",
    subtitle: "Academic ERP System",
    desc: "Scalable ERP handling scheduling, automated Wi-Fi attendance, analytics dashboards, role-based access control, and audit mechanisms.",
    tags: ["ERP", "Full-Stack", "RBAC", "Analytics"],
    team: 5,
    period: "Jan '26 – Present",
    link: "#",
  },
  {
    icon: "🔐",
    name: "BedRock Password Manager",
    subtitle: "Android Security App",
    desc: "Secure Android application with encrypted credential storage and authentication mechanisms focused on data privacy.",
    tags: ["Android", "Encryption", "Java", "Security"],
    team: 5,
    period: "Aug '25 – Dec '25",
    link: "#",
  },
  {
    icon: "🤖",
    name: "AI Gmail → Calendar",
    subtitle: "NLP Automation Pipeline",
    desc: "NLP pipeline using Python & Google LLM to extract structured event data from unstructured emails, automating scheduling workflows.",
    tags: ["Python", "NLP", "Google LLM", "Automation"],
    team: 1,
    period: "Jun '25 – Aug '25",
    link: "#",
  },
];

const ROLES = [
  {
    icon: "🔬",
    title: "Software Developer",
    org: "Reggen Lab, IIITD",
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
    title: "Web Developer",
    org: "BYLD, IIITD",
    period: "Jan '24 – Present",
  },
  {
    icon: "📢",
    title: "Content & PR Lead",
    org: "BYLD, IIITD",
    period: "Jul '24 – Jan '25",
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", text: "350+ LeetCode Questions Solved" },
  { icon: "📜", text: "HackerRank Problem Solver Certified" },
  { icon: "⚡", text: "Codeforces Rating: 1300+" },
  { icon: "🎮", text: "Certified in Game Dev with Unreal Engine" },
  {
    icon: "🚀",
    text: "Multiple full-stack & system-level projects with active GitHub repos",
  },
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
  "Full-Stack Developer",
  "Software Engineer",
  "Cloud-Native Builder",
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
            B.Tech CSE student at IIIT Delhi crafting scalable web applications,
            distributed systems, and cloud-native solutions. Passionate about
            building software that makes a difference.
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
              href="https://github.com/aamanprime"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub"
            >
              ⌥
            </a>
            <a
              href="https://linkedin.com/in/aamanprime"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              href="https://leetcode.com/aamanprime"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LeetCode"
            >
              LC
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
            <span className="floating-tech">⚛ React</span>
            <span className="floating-tech">🐳 Docker</span>
            <span className="floating-tech">☸ K8s</span>
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
        { number: "350+", label: "LeetCode Solved" },
        { number: "10+", label: "Projects Built" },
        { number: "7", label: "Languages" },
        { number: "1300+", label: "CF Rating" },
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
                <div className="about-info-value">IIIT Delhi</div>
              </div>
            </li>
            <li className="about-info-item">
              <div className="about-info-icon">💼</div>
              <div>
                <div className="about-info-label">Current Role</div>
                <div className="about-info-value">SWE Intern @ Hostiggo</div>
              </div>
            </li>
            <li className="about-info-item">
              <div className="about-info-icon">📅</div>
              <div>
                <div className="about-info-label">Born</div>
                <div className="about-info-value">August 5, 2004</div>
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
            I&apos;m <span className="about-highlight">Aaman Sheikh</span>, a third-year
            Computer Science undergraduate at{" "}
            <span className="about-highlight">
              Indraprastha Institute of Information Technology, Delhi
            </span>
            . My journey in tech is fueled by a deep curiosity for how things
            work at scale.
          </p>
          <p>
            Currently interning as a{" "}
            <span className="about-highlight">Software Engineer at Hostiggo</span>,
            where I develop scalable web and Android features for a travel
            platform. I specialize in crafting performant APIs, responsive
            interfaces, and reliable backend architectures.
          </p>
          <p>
            Beyond academics, I&apos;m an active contributor at{" "}
            <span className="about-highlight">Reggen Lab</span> and{" "}
            <span className="about-highlight">CiPD IIITD</span>, working on
            cutting-edge research and product development. I believe in writing
            clean, maintainable code and building systems that stand the test of
            scale.
          </p>
          <p>
            When I&apos;m not coding, you&apos;ll find me diving deep into{" "}
            <span className="about-highlight">
              distributed systems architecture
            </span>{" "}
            and exploring large-scale software design patterns.
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
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-card">
            <div className="timeline-date">Jan 2026 – Present</div>
            <h3 className="timeline-title">Software Engineer Intern</h3>
            <div className="timeline-company">Hostiggo</div>
            <p className="timeline-desc">
              Developing scalable web and Android features for a travel platform
              connecting users with verified homestays. Optimizing API
              performance, improving UI responsiveness, and ensuring reliable
              integration of backend services.
            </p>
          </div>
        </div>
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
          performant, and user-centric software.
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
                  Live Demo →
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
          },
          {
            badge: "completed",
            badgeText: "Completed",
            institution: "Balwantrai Mehta Vidya Bhawan",
            degree: "CBSE Class XII — PCM",
            year: "2022 – 2023",
          },
          {
            badge: "completed",
            badgeText: "Completed",
            institution: "Govt. Boys Sr. Sec. School No.3",
            degree: "CBSE Class X",
            year: "2020 – 2021",
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
          I&apos;m always open to discussing new projects, collaboration opportunities,
          or just having a chat about tech.
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
              href="https://github.com/aamanprime"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              ⌥ GitHub
            </a>
            <a
              href="https://linkedin.com/in/aamanprime"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              in LinkedIn
            </a>
            <a
              href="https://leetcode.com/aamanprime"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              ⚡ LeetCode
            </a>
            <a
              href="https://codeforces.com/profile/aamanprime"
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
