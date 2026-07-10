export const FRAME_COUNT = 198;

export function getFramePath(index: number): string {
  const num = Math.max(0, Math.min(FRAME_COUNT - 1, index)) + 1;
  return `/frames/ezgif-frame-${String(num).padStart(3, '0')}.jpg`;
}

export const resumeUrl = '/Aidan_Lee_Resume.pdf';

export const contact = {
  name: 'Aidan Lee',
  email: 'aidan.lee@duke.edu',
  phone: '+1 (571) 550-1398',
  location: 'Durham, NC',
  github: 'https://github.com/fencingdude2007',
  linkedin: 'https://www.linkedin.com/in/aidan-lee-032171265',
};

export const tagline =
  'Mathematics & Computer Science · Duke Varsity Fencing';

export const projects = [
  {
    id: 'myweb-ai',
    name: 'MyWeb AI',
    date: 'Jul 2026',
    tags: [
      'FastAPI',
      'PostgreSQL/pgvector',
      'React/TypeScript',
      'Chrome Extension (MV3)',
      'Claude API',
    ],
    bullets: [
      'Engineered a hybrid search engine fusing BM25, 384-dim semantic vector similarity (pgvector + sentence-transformers), and trigram fuzzy matching into one weighted ranker over a 12-table PostgreSQL schema.',
      'Built a Manifest V3 Chrome extension and async FastAPI backend (31 REST endpoints) ingesting 5+ content types — web pages, PDFs, YouTube transcripts, Google Docs/Sheets/Slides — with AI summaries, embeddings, and JWT + Google OAuth.',
    ],
  },
  {
    id: 'fencerhub',
    name: 'FencerHub',
    date: 'Jun 2026 – Jul 2026',
    tags: ['Next.js', 'TypeScript', 'Prisma/PostgreSQL', 'Cloudflare Stream'],
    bullets: [
      'Architected a full-stack fencing training platform (Next.js, TypeScript, Prisma/PostgreSQL) serving 3 roles — fencers, coaches, parents — over a 20+-table database with per-user access controls.',
      'Developed a private-video system on Cloudflare Stream that delivers bout footage via signed access tokens, letting coaches pin timestamped feedback to specific moments.',
    ],
  },
  {
    id: 'datacrawl',
    name: 'DataCrawl',
    date: 'Mar 2026',
    tags: ['Gemini', 'LangGraph', 'FastAPI', 'Firebase'],
    award: 'HackDuke 2026 Award',
    bullets: [
      'Engineered an AI-powered financial data pipeline converting natural-language requests into structured datasets from web sources via APIs, web scraping, and gated feeds.',
      'Designed a 5+-subagent LangGraph system (Gemini) for compliance, cost estimation, normalization, and schema validation; won HackDuke 2026 award.',
    ],
  },
  {
    id: 'fencing-viz',
    name: 'Fencing Visualizer',
    date: 'Aug 2024 – May 2025',
    tags: ['OpenCV', 'YOLOv11', 'React', 'FastAPI'],
    bullets: [
      'Achieved 98.5% mAP and 95% multi-blade association accuracy by training a custom YOLOv11 model (transfer learning via Roboflow) on thousands of hand-annotated frames across 3 classes (blade, tip, guard).',
      'Built a markerless CV pipeline overlaying motion trails on uploaded footage — no tracking hardware needed — processing 30s clips in under 3 min via a React/FastAPI app on AWS EC2.',
    ],
  },
];

export const experience = [
  {
    id: 'qial',
    role: 'Software Engineering Research Assistant',
    org: 'QIAL Lab, Duke University',
    location: 'Durham, NC',
    date: 'May 2026 – Jul 2026',
    bullets: [
      'Engineered an automated Python pipeline (ANTs/SimpleITK) that registered and propagated a 332-region atlas across 27 brain MRIs, replacing manual per-region labeling.',
      'Built a data-processing pipeline (pandas/NumPy) merging multimodal MRI, metadata, and behavioral tables into a unified analysis-ready dataset of 400+ features per mouse.',
      'Automated an end-to-end pipeline over 162 mice and 14 metrics, replacing manual analysis with parameterized, reproducible scripts that generate figures, tables, and reports.',
    ],
  },
  {
    id: 'emory',
    role: 'Researcher / First Author',
    org: 'Emory University',
    location: 'Atlanta, GA',
    date: 'Jun 2023 – Sep 2023',
    bullets: [
      'Improved stock-price forecasting accuracy by 30% over a Facebook Prophet baseline (RMSE 27.4 vs. 39.3) across 11 equities by implementing and tuning ARIMA models.',
      'Published as first author at the 8th Intl. Conference on Research in Business, Management and Economics (Prague), advised by Dr. Karan Uppal.',
    ],
  },
  {
    id: 'ta',
    role: 'Teaching Assistant',
    org: 'Math Enrichment Services',
    location: 'McLean, VA',
    date: 'Jul 2024',
    bullets: [
      'Designed and taught a two-week competitive-math curriculum (AMC 8, MATHCOUNTS) to 30 students, delivering daily problem-solving lectures with quizzes and practice sets.',
      'Administered end-of-week assessments and group review sessions targeting weak areas; top scorers improved by around 3 points over the two weeks.',
    ],
  },
];

export const education = [
  {
    id: 'duke',
    school: 'Duke University',
    location: 'Durham, NC',
    degree: 'B.S. in Mathematics and Computer Science',
    date: 'Expected May 2028',
  },
  {
    id: 'tj',
    school: 'Thomas Jefferson High School for Science and Technology',
    location: 'Alexandria, VA',
    degree: 'Advanced Studies Diploma — Weighted GPA: 4.3/4.0',
    date: 'Graduated May 2025',
  },
];

export const activities = [
  'NCAA Division I Varsity Fencing — Duke University (Foil, 2026 ACC Team Men’s Fencing Champion)',
  'Duke Asian Athletes Network (Chief Technology Officer)',
];

export const awards = [
  'USA Computing Olympiad Gold Division — Python (Dec 2023)',
  '3× American Invitational Mathematics Examination Qualifier (2022–2024)',
];

export const skills = {
  languages: ['Python', 'C++', 'Java', 'JavaScript', 'SQL', 'HTML/CSS'],
  frameworks: ['React', 'Vite', 'FastAPI', 'Flask', 'LangGraph', 'PyTorch'],
  ml: ['OpenCV', 'Scikit-learn', 'pandas', 'NumPy', 'Matplotlib'],
  tools: ['Git', 'Docker', 'AWS (EC2)', 'Firebase', 'Arduino', 'VS Code'],
};

export const sections = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'] | 'hero';
