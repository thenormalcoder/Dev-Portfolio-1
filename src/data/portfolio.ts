export interface Profile {
  name: string;
  shortName: string;
  roles: string[];
  tagline: string;
  location: string;
  email: string;
  phone: string;
  showPhone: boolean;
  resumeUrl: string;
  photo: string;
  availability: string;
  socials: {
    github: string;
    linkedin: string;
    codechef: string;
    codeforces: string;
  };
  techChips: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface JourneyItem {
  type: "work" | "education";
  title: string;
  org: string;
  location?: string;
  period: string;
  score?: string;
  points: string[];
  tags: string[];
}

export interface Project {
  title: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  url: string;
}

export interface Achievement {
  title: string;
  detail: string;
  icon: "trophy" | "rocket" | "award" | "google";
}

export interface CodingProfile {
  platform: string;
  rating: string;
  url: string | null;
}

export const profile: Profile = {
  name: "Jatin Bhojwani",
  shortName: "Jatin",
  roles: [
    "Software Developer @ Kickdrum",
    "AI Systems Builder",
    "Full-Stack & Cloud Engineer",
    "Competitive Programmer",
  ],
  tagline:
    "I build production AI systems and cloud-native backends — from RAG pipelines and agentic workflows to energy-delivery platforms running at 99.9% uptime.",
  location: "Bengaluru, India",
  email: "jatinbhojwani@nitmanipur.ac.in",
  phone: "+91-6397037850",
  showPhone: false,
  resumeUrl: "/resume/Jatin_Bhojwani_Resume.pdf",
  photo: "/images/profile.webp?v=2", // bump ?v= when you replace the photo
  availability: "Open to interesting collaborations",
  socials: {
    github: "ADD_GITHUB_URL",
    linkedin: "https://www.linkedin.com/in/jatin-bhojwani-52548b1a7/",
    codechef: "ADD_CODECHEF_URL",
    codeforces: "ADD_CODEFORCES_URL",
  },
  techChips: [
    "TypeScript",
    "React",
    "NestJS",
    "Spring Boot",
    "AWS",
    "LangGraph",
    "RAG",
    "MCP",
  ],
};

export const heroStats: HeroStat[] = [
  { value: "9.19", label: "CGPA · NIT Manipur" },
  { value: "99.9%", label: "Uptime on shipped infra" },
];

export const journey: JourneyItem[] = [
  {
    type: "work",
    title: "Software Developer 1",
    org: "Kickdrum",
    location: "Koramangala, Bengaluru",
    period: "Jul 2026 – Present",
    points: [
      "Engineered an on-demand Energy-Delivery Platform (React Native, NestJS) applying quick-commerce logistics to electricity — dispatching charge units from a central powerhouse to hubs and routing them to customers by priority.",
      "Owned infrastructure and deployment of OCPP servers with UIs (CitrineOS via Docker, SteVe), delivered to clients in 3 and 2 days with 99.9% uptime since day one.",
      "Leading data modeling of a Customer + Admin Portal unifying 3 apps: fleet charging schedules, billing, invoices, session monitoring and admin user management.",
    ],
    tags: ["React Native", "NestJS", "Docker", "OCPP"],
  },
  {
    type: "work",
    title: "Software Developer Intern",
    org: "Kickdrum",
    location: "Bengaluru",
    period: "Jan 2026 – Jun 2026",
    points: [
      "Architected a cloud-native, event-driven backend (Spring Boot, 6+ AWS services): 15+ secure REST APIs, RBAC, concurrency control, 20+ tests, centralized observability.",
      "Built production AI systems across RAG, agentic workflows and LLM fine-tuning, plus a reusable agentic harness that cut feature-build time 3×.",
    ],
    tags: ["Spring Boot", "AWS", "RAG", "Agents"],
  },
  {
    type: "work",
    title: "Cloud Engineering (FinOps) Intern",
    org: "ICICI Bank",
    location: "BKC, Mumbai",
    period: "Jun 2025 – Aug 2025",
    points: [
      "Analyzed cost patterns across 3+ cloud projects; designed a cost-deviation model projected to cut infra costs 15% and speed deployment decisions 25%.",
    ],
    tags: ["FinOps", "Cloud"],
  },
  {
    type: "education",
    title: "B.Tech, Computer Science & Engineering",
    org: "National Institute of Technology Manipur",
    period: "Aug 2022 – May 2026",
    score: "CGPA 9.19",
    points: [],
    tags: [],
  },
  {
    type: "education",
    title: "Intermediate (Class XII)",
    org: "Madhavrao Scindia Public School, Bareilly",
    period: "2021",
    score: "92%",
    points: [],
    tags: [],
  },
  {
    type: "education",
    title: "Matriculation (Class X)",
    org: "Madhavrao Scindia Public School, Bareilly",
    period: "2019",
    score: "91.4%",
    points: [],
    tags: [],
  },
];

export const projects: Project[] = [
  {
    title: "Org Learning Engine",
    period: "Jun 2026",
    summary:
      "Slack-first serverless system that captures team learning moments and makes them searchable.",
    points: [
      "Captures learning moments in under 10s via a draft → sandbox → committed lifecycle and a 3-layer anonymisation pipeline (Presidio + LLM verifier).",
      "End-to-end RAG for conversational search plus an EventBridge-scheduled daily digest, fully traced at $0.013 per submission.",
    ],
    stack: ["AWS", "Slack Bolt", "Pinecone", "LangGraph"],
    image: "/images/projects/org-learning.svg",
    liveUrl: "ADD_ORG_LEARNING_LIVE_URL",
    githubUrl: "ADD_ORG_LEARNING_GITHUB_URL",
    featured: true,
  },
  {
    title: "AI Kitchen Auto-Design System",
    period: "May 2026",
    summary:
      "LLM agent that turns room dimensions and a prompt into spatially valid kitchen layouts.",
    points: [
      "Generates 3–5 valid L/U/I layouts and resolves colour requests to catalog SKUs through an MCP-exposed catalog.",
      "Collision detection plus an NKBA rule pack (work triangle, clearances) ranks variants, with 2D/3D renders and rationale in under 30s.",
    ],
    stack: ["Python", "MCP", "LLM APIs"],
    image: "/images/projects/kitchen.svg",
    liveUrl: "ADD_KITCHEN_LIVE_URL",
    githubUrl: "ADD_KITCHEN_GITHUB_URL",
    featured: true,
  },
  {
    title: "IBE — Internet Booking Engine",
    period: "Mar 2026",
    summary:
      "Configurable multi-tenant hotel booking platform built for high concurrency.",
    points: [
      "Concurrency control and dynamic room assignment; infra provisioned with Terraform (ECS, Service Connect, Cognito).",
      "Handles 1000+ concurrent users at sub-500ms latency, validated with JMeter load tests and CI/CD.",
    ],
    stack: ["React", "Spring Boot", "AWS ECS", "Terraform"],
    image: "/images/projects/ibe.svg",
    liveUrl: "ADD_IBE_LIVE_URL",
    githubUrl: "ADD_IBE_GITHUB_URL",
    featured: true,
  },
];

export const certifications: Certification[] = [
  {
    name: "Claude Certified Architect – Foundations",
    issuer: "Anthropic",
    url: "https://www.linkedin.com/in/jatin-bhojwani-52548b1a7/",
  },
  {
    name: "Oracle Cloud Infrastructure Foundations Associate",
    issuer: "Oracle",
    url: "https://pdflink.to/6392615b/",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Finalist — IIT Madras Programming Contest",
    detail: "Shortlisted for Microsoft and JP Morgan SDE interviews.",
    icon: "trophy",
  },
  {
    title: "Hackathon Finalist ×3",
    detail:
      "Void Hacks 6.0 and North East Tech Summit (2 consecutive years) — Landslide Prediction System, AI-based Smart Food Waste Management.",
    icon: "rocket",
  },
  {
    title: "Google Student Ambassador",
    detail: "Represented Google developer programs on campus.",
    icon: "google",
  },
  {
    title: "Best Student Director (Northeast) — Unstop",
    detail: "Recognised as Student Director for the Northeast region.",
    icon: "award",
  },
];

export const codingProfiles: CodingProfile[] = [
  { platform: "CodeChef", rating: "1751", url: "ADD_CODECHEF_URL" },
  { platform: "Codeforces", rating: "1410", url: "ADD_CODEFORCES_URL" },
  { platform: "Problems solved", rating: "800+", url: null },
];

export interface GalleryItem {
  src: string;
  alt: string;
}

/**
 * Photos shown as a swapping card stack beside the contact form.
 * Files live in public/images/gallery/ — first item is on top.
 */
export const gallery: GalleryItem[] = [
  { src: "/images/gallery/hackathon-finale.webp", alt: "Team photo at a hackathon grand finale" },
  { src: "/images/gallery/grand-finalist-trophy.webp", alt: "Grand Finalist trophy" },
  { src: "/images/gallery/unstop-director-badge.webp", alt: "Unstop Student Director badge" },
  { src: "/images/gallery/unstop-swag.webp", alt: "Unstop swag kit" },
];

export interface CertificateImage {
  src: string;
  title: string;
}

/** Certificate screenshots that float under the certifications. Files live in public/images/certificates/. */
export const certificateImages: CertificateImage[] = [
  { src: "/images/certificates/tata-imagination.webp", title: "National Semi-Finalist — Tata Imagination Challenge 2024" },
  { src: "/images/certificates/naukri-young-turks.webp", title: "Certificate of Merit — Naukri Campus Young Turks" },
  { src: "/images/certificates/google-cloud-skills-boost.webp", title: "Google Cloud Skills Boost badge" },
  { src: "/images/certificates/jsss-anmol-ratan.webp", title: "Anmol Ratan Award 2023 — Jiye Sindhi Seva Sangam" },
];

/** Hide any value starting with ADD_ (placeholder not yet filled). */
export const isPlaceholder = (value: string): boolean =>
  typeof value === "string" && value.startsWith("ADD_");
