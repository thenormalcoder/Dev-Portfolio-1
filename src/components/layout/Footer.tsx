import { useState } from "react";
import { Copy, Check, Phone, Send, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiCodechef, SiCodeforces } from "react-icons/si";
import { profile, gallery, isPlaceholder } from "@/data/portfolio";
import IconLink from "@/components/ui/IconLink";
import PhotoStack from "@/components/ui/PhotoStack";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "mailto"
  >("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email";
    if (!form.message.trim()) next.message = "Please enter a message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Netlify Forms picks this up on the deployed site (the matching hidden
  // form lives in index.html). Locally / on other hosts it falls back to mailto.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", ...form }).toString(),
      });
      if (!res.ok) throw new Error(`Form submit failed: ${res.status}`);
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      openMailto();
    }
  };

  const openMailto = () => {
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n");

    const subject = form.subject || `Portfolio contact from ${form.name}`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("mailto");
    setTimeout(() => setStatus("idle"), 4000);
  };

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const inputBase =
    "w-full px-4 py-3 rounded-xl bg-surface-2 border text-text placeholder:text-text-muted transition-colors outline-none";

  return (
    <footer
      id="contact"
      className="relative py-24 md:py-32 px-5 md:px-8 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: heading + direct contact */}
          <div>
            <p
              className="font-mono text-[13px] text-accent"
              style={{ letterSpacing: "0.08em" }}
            >
              // contact
            </p>
            <h2 className="mt-3 font-heading text-4xl md:text-6xl font-bold text-text">
              Let&apos;s build something.
            </h2>
            <p className="mt-6 text-text-muted text-lg max-w-xl">
              Open to interesting collaborations, full-time roles, and
              conversations about AI systems and cloud backends.
            </p>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <a
                href={`mailto:${profile.email}`}
                className="font-heading text-xl md:text-2xl font-bold text-accent hover:opacity-80 transition-opacity break-all"
              >
                {profile.email}
              </a>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-surface-2 text-text-muted hover:text-accent hover:border-accent transition-colors"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied && (
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface border border-border font-mono text-xs text-accent whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              {!isPlaceholder(profile.socials.github) && (
                <IconLink href={profile.socials.github} label="GitHub">
                  <FaGithub size={18} />
                </IconLink>
              )}
              {!isPlaceholder(profile.socials.linkedin) && (
                <IconLink href={profile.socials.linkedin} label="LinkedIn">
                  <FaLinkedinIn size={18} />
                </IconLink>
              )}
              {!isPlaceholder(profile.socials.codechef) && (
                <IconLink href={profile.socials.codechef} label="CodeChef">
                  <SiCodechef size={20} />
                </IconLink>
              )}
              {!isPlaceholder(profile.socials.codeforces) && (
                <IconLink href={profile.socials.codeforces} label="Codeforces">
                  <SiCodeforces size={20} />
                </IconLink>
              )}
              {profile.showPhone && !isPlaceholder(profile.phone) && (
                <IconLink
                  href={`tel:${profile.phone}`}
                  label="Phone"
                  external={false}
                >
                  <Phone size={18} />
                </IconLink>
              )}
            </div>

            <div className="mt-14 lg:pl-4">
              <PhotoStack items={gallery} />
            </div>
          </div>

          {/* Right: contact form */}
          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Mail size={20} className="text-accent" />
              <h3 className="font-heading text-xl font-semibold text-text">
                Send a message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm text-text-muted mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    className={`${inputBase} ${
                      errors.name
                        ? "border-red-400"
                        : "border-border focus:border-accent"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm text-text-muted mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className={`${inputBase} ${
                      errors.email
                        ? "border-red-400"
                        : "border-border focus:border-accent"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm text-text-muted mb-1.5"
                >
                  Subject{" "}
                  <span className="text-text-muted/60">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="What's this about?"
                  className={`${inputBase} border-border focus:border-accent`}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm text-text-muted mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell me about your project, role, or idea..."
                  rows={5}
                  className={`${inputBase} resize-none ${
                    errors.message
                      ? "border-red-400"
                      : "border-border focus:border-accent"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-br from-accent to-accent-2 text-bg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                <Send size={16} />
                {status === "sending"
                  ? "Sending..."
                  : status === "sent"
                    ? "Message sent!"
                    : status === "mailto"
                      ? "Opening your email app..."
                      : "Send message"}
              </button>

              {status === "sent" && (
                <p className="text-center text-sm text-accent-2">
                  Thanks! I'll get back to you soon.
                </p>
              )}
              {status === "mailto" && (
                <p className="text-center text-sm text-accent-2">
                  Your email client should open with the message pre-filled.
                  Just hit send!
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 w-full max-w-md mx-auto border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-text-muted">
            &copy; 2026 Jatin Bhojwani
          </p>
          <p className="font-mono text-xs text-text-muted">
            Built with React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
