export const SITE = {
  name: "Riya Jain",
  role: "CSE (IoT) Student · Full-Stack & GenAI Developer",
  tagline: "CSE (IoT) @ VIT Vellore · Web & GenAI",
  openTo: "OPEN TO — FULL-TIME ROLES & 2026 COLLABS",
  email: "jainriya9705@gmail.com",
  github: "https://github.com/RiyaJain99",
  linkedin: "https://www.linkedin.com/in/riya-jain",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: SITE.github,
    subtext: "github.com/RiyaJain99",
  },
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    subtext: "linkedin.com/in/riya-jain",
  },
  {
    label: "Email",
    href: `mailto:${SITE.email}`,
    subtext: SITE.email,
  },
];

export const STATS = [{ value: "8.69", label: "CGPA at VIT" }];

export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["Java", "Python", "C / C++", "SQL", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Tools",
    items: [
      "ReactJS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "FastAPI",
      "Git & GitHub",
      "Vercel",
      "Arduino",
    ],
  },
  {
    title: "ML / AI",
    items: [
      "Machine Learning",
      "Data Analysis",
      "LLM Fundamentals",
      "Prompt Engineering",
    ],
  },
  {
    title: "Core Concepts",
    items: ["DSA", "OOP", "DBMS", "REST APIs", "System Design"],
  },
];

export type Project = {
  id: string;
  title: string;
  year: string;
  featured: boolean;
  badge?: string;
  tags: string[];
  description: string;
  problem: string;
  role: string;
  outcome: string;
  github: string | null;
  gradient: string;
  emoji: string;
};

export const PROJECTS: Project[] = [
  {
    id: "claro",
    title: "Claro — Full-Stack AI Email Assistant",
    year: "2026",
    featured: true,
    tags: ["FastAPI", "React", "TypeScript", "Groq Llama 3.1", "Gmail OAuth"],
    description:
      "A full-stack AI email assistant with Gmail OAuth 2.0, automated 18-category email classification, human-in-the-loop feedback, and auto-draft replies.",
    problem:
      "Inboxes drown important messages in noise — recruiters and busy professionals need triage, not another dashboard.",
    role: "Built the FastAPI + SQLAlchemy backend and the React/TypeScript/Tailwind frontend end-to-end, integrated Gmail OAuth 2.0, and wired Groq's Llama 3.1 8B for classification.",
    outcome:
      "Shipped a Priority Inbox and Recharts-based analytics dashboards that surface important emails and visualize response trends.",
    github: "https://github.com/RiyaJain99/Claro",
    gradient: "from-teal-500/25 via-sky-500/10 to-transparent",
    emoji: "📬",
  },
  {
    id: "allergen-detector",
    title: "Food Allergen Detection System",
    year: "Nov 2025",
    featured: true,
    tags: ["PyTorch", "Hugging Face", "Vision Transformer", "ReactJS"],
    description:
      "A Vision Transformer (ViT) fine-tuned on Food-101, achieving 94% classification accuracy across 8+ allergens including dairy, nuts, and gluten.",
    problem:
      "People with allergies need fast, reliable identification of risky ingredients from a photo, not a label they have to hunt for.",
    role: "Fine-tuned the ViT model in PyTorch/Hugging Face, built a JSON-based allergen database, and shipped a responsive real-time UI.",
    outcome:
      "A working end-to-end ML pipeline, deployed via Google Colab with GitHub version control, ready to extend to more allergen classes.",
    github: "https://github.com/RiyaJain99/AI-PROJECT_ALLERGENDETECTOR",
    gradient: "from-amber-500/25 via-orange-500/10 to-transparent",
    emoji: "🥗",
  },
  {
    id: "drowsiness-detector",
    title: "Drowsiness Detector — Real-Time Driver Safety",
    year: "2026",
    featured: true,
    tags: ["OpenCV", "MediaPipe", "NumPy", "Pygame"],
    description:
      "A real-time driver drowsiness detection system combining Eye Aspect Ratio (EAR) tracking and head-nod detection with an audio alarm.",
    problem:
      "Driver fatigue is a leading cause of accidents, and drivers rarely notice their own microsleeps in time.",
    role: "Implemented face detection and EAR calculation with MediaPipe and OpenCV, added head-nod detection and a real-time alarm system.",
    outcome:
      "A responsive computer-vision pipeline that reliably flags eye closure and nodding in real time to alert a fatigued driver.",
    github: "https://github.com/RiyaJain99/Drowsiness-Detector",
    gradient: "from-sky-500/25 via-teal-500/10 to-transparent",
    emoji: "🚗",
  },
  {
    id: "anveshak",
    title: "Anveshak — Cybersecurity Threat Detection",
    year: "Sep 2025",
    featured: false,
    badge: "🏆 Smart India Hackathon 2025",
    tags: ["Node.js", "MongoDB", "Blockchain", "Cybersecurity"],
    description:
      "Real-time cybersecurity threat monitoring platform built for SIH 2025, combining anomaly detection, log visualisation, and tamper-proof storage on Ethereum Sepolia.",
    problem:
      "Security teams struggle to trust logs and spot anomalies quickly enough to act.",
    role: "Full-stack developer — data model, APIs, dashboard views, and blockchain integration for tamper-proof audit trails.",
    outcome:
      "Demoed to SIH juries; designed to scale into real infrastructure or plug into existing SIEM flows.",
    github: "https://github.com/RiyaJain99/Anveshak",
    gradient: "from-violet-500/20 via-teal-500/10 to-transparent",
    emoji: "🔐",
  },
  {
    id: "railway-track",
    title: "Railway Track Management System",
    year: "2025",
    featured: false,
    tags: ["IoT", "Arduino Uno", "Sensors"],
    description:
      "A low-cost IoT prototype that monitors track conditions using vibration and IR sensors, triggering buzzer/LED alerts for operators.",
    problem:
      "Manual track inspection is slow and reactive — cracks and obstacles need earlier, automated detection.",
    role: "Hardware wiring, sensor calibration, and alert logic on Arduino.",
    outcome:
      "A working hardware prototype favoring reliability over polish — clear thresholds, predictable behaviour.",
    github: null,
    gradient: "from-zinc-500/20 via-zinc-400/5 to-transparent",
    emoji: "🚆",
  },
  {
    id: "student-management",
    title: "Student Management System",
    year: "2024",
    featured: false,
    tags: ["MySQL", "DBMS", "SQL"],
    description:
      "A database-driven system for managing students, courses, and enrolments with a normalised schema and clean query patterns.",
    problem:
      "Ad-hoc spreadsheets don't hold up once you need real relationships between students, courses, and enrolments.",
    role: "Schema design, indexing strategy, and CRUD operations.",
    outcome: "Consistent performance and data integrity over UI flash.",
    github: "https://github.com/RiyaJain99/dbms_student_management",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    emoji: "🗄️",
  },
  {
    id: "anime-gaming",
    title: "Anime Gaming Website (UI Experiment)",
    year: "2024",
    featured: false,
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "A high-energy landing page exploring video backgrounds, animated navigation, and card-based layouts — a fun UI experiment, not a main design direction.",
    problem:
      "Wanted to stretch outside a calm/minimal comfort zone and practice bold, high-motion UI.",
    role: "Designed and built the entire front end solo, from video-background hero to animated nav.",
    outcome:
      "A playful portfolio piece proving range beyond the calm-engineering aesthetic of her other work.",
    github: "https://github.com/RiyaJain99/Gaming_website_landingpage",
    gradient: "from-pink-500/20 via-fuchsia-500/10 to-transparent",
    emoji: "🎮",
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "Clarify constraints, users, and edge cases. Turn vague ideas into concrete problem statements and flows.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Sketch data models, APIs, and simple UIs. Prefer boring, proven patterns over clever complexity.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Ship small, vertical slices end-to-end. Instrument for errors and add basic observability early.",
  },
  {
    number: "04",
    title: "Iterate",
    description:
      "Refine based on feedback and metrics. Clean up code, docs, and UX as I go so projects stay healthy.",
  },
];

export type TimelineItem = {
  date: string;
  title: string;
  place: string;
  description: string;
  tags: string[];
};

export const TIMELINE: TimelineItem[] = [
  {
    date: "May 15 – Jun 30, 2026",
    title: "Data Science & ML Intern",
    place: "LinuxWorld Informatics Pvt. Ltd.",
    description:
      "Built and deployed 5 end-to-end ML web apps with Python and Streamlit — Customer Churn Prediction, Customer Segmentation, Sales Forecasting, Music Recommendation, and Fraud Detection — applying Random Forest, K-Means, and Linear Regression on real-world Kaggle datasets.",
    tags: ["Python", "Streamlit", "Machine Learning", "Kaggle"],
  },
  {
    date: "2023 — 2027",
    title: "B.Tech CSE (IoT)",
    place: "Vellore Institute of Technology",
    description:
      "4-year degree in CS with an IoT specialisation, currently in the 7th semester. Building across web dev, databases, and embedded systems. Active in coding clubs and tech communities.",
    tags: ["CGPA: 8.69", "IoT", "DBMS", "OOP", "System Design"],
  },
  {
    date: "Sep 2025",
    title: "SIH Hackathon",
    place: "Smart India Hackathon 2025",
    description:
      "Built Anveshak — a blockchain-powered cybersecurity threat detection platform — at India's largest student hackathon.",
    tags: ["Blockchain", "Node.js", "Ethereum"],
  },
  {
    date: "May 2025",
    title: "Generative AI Industrial Internship",
    place: "IBM Watson",
    description:
      "Worked with Large Language Models (LLMs) and prompt engineering techniques, explored real-world AI applications, and applied responsible AI principles in practical scenarios.",
    tags: ["LLMs", "Prompt Engineering", "IBM Watsonx"],
  },
  {
    date: "2021 — 2023",
    title: "Senior Secondary (CBSE)",
    place: "MDS Sr. Secondary School, Udaipur",
    description: "Class XII: 86.4% · Class X: 94.8%",
    tags: [],
  },
];

export type Certification = {
  emoji: string;
  title: string;
  issuer: string;
  date: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    emoji: "☁️",
    title: "OCI 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    date: "Aug 2025",
  },
  {
    emoji: "🤖",
    title: "Generative AI Using IBM Watsonx",
    issuer: "IBM Career Education Program",
    date: "Jun 2025",
  },
  {
    emoji: "🏦",
    title: "Quantitative Research Job Simulation",
    issuer: "JPMorgan Chase & Co. (Forage)",
    date: "Sep 2025",
  },
  {
    emoji: "📊",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (Forage)",
    date: "Sep 2025",
  },
  {
    emoji: "🎨",
    title: "UI/UX Design Fundamentals",
    issuer: "Udemy",
    date: "2024",
  },
];
