import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ExternalLink,
  ArrowRight,
  Folder,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  projects,
  profile,
  isPlaceholder,
  type Project,
} from "@/data/portfolio";
import SectionHeading from "@/components/layout/SectionHeading";
import Chip from "@/components/ui/Chip";
import IconLink from "@/components/ui/IconLink";

function ProjectImage({
  project,
}: {
  project: Project;
}) {
  const [imgError, setImgError] = useState(false);
  const reduced = useReducedMotion();

  // Extract domain from liveUrl for fake URL bar, fallback to localhost
  let domain = "localhost:3000";
  if (!isPlaceholder(project.liveUrl)) {
    try {
      const url = new URL(project.liveUrl);
      domain = url.hostname;
    } catch {
      domain = "localhost:3000";
    }
  }

  return (
    <div className="rounded-xl border border-border bg-surface-2 overflow-hidden group/img">
      {/* Browser frame */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-surface">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#FF5F57" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#FEBC2E" }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "#28C840" }}
        />
        <div className="ml-2 flex-1 px-2 py-0.5 rounded bg-surface-2 font-mono text-xs text-text-muted truncate">
          {domain}
        </div>
      </div>

      {/* Image or placeholder */}
      <div className="aspect-video relative overflow-hidden">
        {!imgError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            width={640}
            height={360}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.03]"
            style={reduced ? undefined : undefined}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            <span className="font-mono text-sm text-text-muted">
              {project.title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduced = useReducedMotion();
  const imageLeft = index % 2 === 0;

  const fadeUp = reduced
    ? { initial: {}, animate: {}, transition: {} }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  const showLive = !isPlaceholder(project.liveUrl);
  const showCode = !isPlaceholder(project.githubUrl);

  return (
    <motion.article
      {...fadeUp}
      className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center"
    >
      {/* Image */}
      <div className={imageLeft ? "lg:order-1" : "lg:order-2"}>
        <ProjectImage project={project} />
      </div>

      {/* Text */}
      <div className={imageLeft ? "lg:order-2" : "lg:order-1"}>
        <p className="font-mono text-xs text-accent">{project.period}</p>
        <h3 className="mt-2 font-heading text-2xl font-bold text-text">
          {project.title}
        </h3>
        <p className="mt-3 text-text-muted leading-relaxed">
          {project.summary}
        </p>
        <ul className="mt-4 space-y-2">
          {project.points.map((point, i) => (
            <li
              key={i}
              className="text-sm text-text-muted leading-relaxed pl-4 relative"
            >
              <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-accent-2" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {showLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-accent to-accent-2 text-bg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Live demo <ExternalLink size={15} />
            </a>
          )}
          {showCode && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-text hover:border-accent hover:bg-accent-soft transition-colors text-sm"
            >
              <FaGithub size={15} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function NonFeaturedCard({ project }: { project: Project }) {
  const showLive = !isPlaceholder(project.liveUrl);
  const showCode = !isPlaceholder(project.githubUrl);

  return (
    <div className="rounded-2xl bg-surface border border-border p-5 hover:border-accent/40 hover:-translate-y-1 transition-all duration-200">
      <Folder size={24} className="text-accent" />
      <h3 className="mt-3 font-heading text-lg font-semibold text-text">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">
        {project.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        {showLive && (
          <IconLink href={project.liveUrl} label={`Live demo of ${project.title}`}>
            <ExternalLink size={16} />
          </IconLink>
        )}
        {showCode && (
          <IconLink href={project.githubUrl} label={`Code of ${project.title}`}>
            <FaGithub size={14} />
          </IconLink>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const nonFeatured = projects.filter((p) => !p.featured);
  const showGithubLink = !isPlaceholder(profile.socials.github);

  return (
    <section id="projects" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading tag="projects" title="Things I've built" />

        <div className="space-y-20 md:space-y-28">
          {featured.map((project, index) => (
            <FeaturedProject
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {nonFeatured.length > 0 && (
          <>
            <div className="mt-20 grid md:grid-cols-3 gap-6">
              {nonFeatured.map((project) => (
                <NonFeaturedCard
                  key={project.title}
                  project={project}
                />
              ))}
            </div>
          </>
        )}

        {showGithubLink && (
          <div className="mt-16 text-center">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent hover:opacity-80 transition-opacity"
            >
              More on GitHub <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
