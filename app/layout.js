import "./globals.css";

export const metadata = {
  title: "Aaman Sheikh | Software Engineer & Full-Stack Developer",
  description:
    "Portfolio of Aaman Sheikh — B.Tech CSE student at IIIT Delhi, Software Engineer, and Full-Stack Developer specializing in scalable web applications, distributed systems, and cloud-native architecture.",
  keywords: [
    "Aaman Sheikh",
    "Software Engineer",
    "Full-Stack Developer",
    "IIIT Delhi",
    "Portfolio",
    "Next.js",
    "React",
    "Web Developer",
  ],
  authors: [{ name: "Aaman Sheikh" }],
  openGraph: {
    title: "Aaman Sheikh | Software Engineer & Full-Stack Developer",
    description:
      "Portfolio of Aaman Sheikh — Software Engineer, Full-Stack Developer, and B.Tech CSE student at IIIT Delhi.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
