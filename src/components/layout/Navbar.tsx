import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiCodechef, SiCodeforces } from "react-icons/si";
import { useTheme } from "@/theme/ThemeProvider.tsx";
import useActiveSection from "@/hooks/useActiveSection.ts";
import { profile, isPlaceholder } from "@/data/portfolio";
import IconLink from "@/components/ui/IconLink";

const NAV_LINKS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Credentials", href: "#credentials", id: "credentials" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function scrollToId(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.id));
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener("keydown", onKey);
      // Trap focus
      const sheet = sheetRef.current;
      if (sheet) {
        const focusables = sheet.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const onTab = (e: KeyboardEvent) => {
          if (e.key !== "Tab" || focusables.length === 0) return;
          const first = focusables[0] as HTMLElement;
          const last = focusables[focusables.length - 1] as HTMLElement;
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        };
        document.addEventListener("keydown", onTab);
        return () => {
          document.removeEventListener("keydown", onKey);
          document.removeEventListener("keydown", onTab);
        };
      }
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToId(href);
  };

  const renderSocialIcons = () => (
    <>
      {!isPlaceholder(profile.socials.github) && (
        <IconLink href={profile.socials.github} label="GitHub">
          <FaGithub size={16} />
        </IconLink>
      )}
      {!isPlaceholder(profile.socials.linkedin) && (
        <IconLink href={profile.socials.linkedin} label="LinkedIn">
          <FaLinkedinIn size={16} />
        </IconLink>
      )}
    </>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? "bg-bg/70 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto w-full px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="font-mono text-lg font-medium text-text hover:text-accent transition-colors"
            aria-label="Go to top"
          >
            <span className="text-accent">{"</>"}</span>{" "}
            <span>jatin</span>
            <span className="text-text-muted">.dev</span>
          </a>

          {/* Center nav (desktop) */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative font-mono text-sm transition-colors ${
                    activeSection === link.id
                      ? "text-accent"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--accent), var(--accent-2))",
                      }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              {renderSocialIcons()}
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative w-10 h-10 rounded-lg border border-border bg-surface-2 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors"
            >
              <span className="transition-transform duration-200 rotate-0">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            </button>

            <a
              href={profile.resumeUrl}
              download
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-accent text-accent font-mono text-sm hover:bg-accent-soft transition-colors"
            >
              Resume
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-10 h-10 rounded-lg border border-border bg-surface-2 flex items-center justify-center text-text"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            ref={sheetRef}
            className="absolute right-0 top-0 h-full w-72 bg-surface border-l border-border flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-mono text-sm text-text-muted">menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-lg border border-border bg-surface-2 flex items-center justify-center text-text"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <li key={link.id}>
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block px-4 py-3 rounded-lg font-mono text-sm transition-colors ${
                        activeSection === link.id
                          ? "text-accent bg-surface-2"
                          : "text-text-muted hover:text-text hover:bg-surface-2"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-border space-y-4">
              <div className="flex items-center gap-2">
                {renderSocialIcons()}
                {!isPlaceholder(profile.socials.codechef) && (
                  <IconLink href={profile.socials.codechef} label="CodeChef">
                    <SiCodechef size={18} />
                  </IconLink>
                )}
                {!isPlaceholder(profile.socials.codeforces) && (
                  <IconLink href={profile.socials.codeforces} label="Codeforces">
                    <SiCodeforces size={18} />
                  </IconLink>
                )}
              </div>
              <a
                href={profile.resumeUrl}
                download
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-accent text-accent font-mono text-sm hover:bg-accent-soft transition-colors"
              >
                <ArrowUp size={16} className="rotate-45" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
