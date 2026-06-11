export const FRAME_COUNT = 198;

export function getFramePath(index: number): string {
  const num = Math.max(0, Math.min(FRAME_COUNT - 1, index)) + 1;
  return `/frames/ezgif-frame-${String(num).padStart(3, '0')}.jpg`;
}

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
    id: 'datacrawl',
    name: 'DataCrawl',
    date: 'Mar 2026',
    tags: ['Gemini', 'LangGraph', 'FastAPI', 'Firebase'],
    award: 'Best Use of Solana @ HackDuke',
    bullets: [
      'Built an AI-powered financial data pipeline converting natural language requests into structured datasets via APIs, web scraping, and gated sources.',
      'Designed a multi-agent system (Gemini + LangGraph) with specialized agents for compliance, cost estimation, normalization, and schema validation.',
    ],
  },
  {
    id: 'fencing-viz',
    name: 'Fencing Visualizer',
    date: 'Aug 2024 – May 2025',
    tags: ['OpenCV', 'YOLOv11', 'React', 'Vite', 'FastAPI'],
    bullets: [
      'Built a computer vision system tracking fencing blades with OpenCV and a custom-trained YOLOv11 model.',
      'Served via a React/Vite/FastAPI web app that overlays motion trails on uploaded videos in real time.',
    ],
  },
  {
    id: 'fred',
    name: 'F.R.E.D Fencing Robot',
    date: 'Jun 2022 – Aug 2022',
    tags: ['Arduino', '3D Printing', 'Robotics'],
    bullets: [
      'Co-created a fencing robot to enable remote training during the COVID-19 pandemic.',
      'Integrated 3D-printed components, motors, and Arduino-based controllers.',
    ],
  },
];

export const experience = [
  {
    id: 'duke-data',
    role: 'Duke Data+ Intern',
    org: 'Badea Lab, Duke University',
    location: 'Durham, NC',
    date: 'May 2026 – Jul 2026',
    bullets: [
      'Investigating whether GLP-1 treatment promotes a coordinated brain–heart resilience phenotype in APOE2/3/4 mice by integrating cardiac MRI, structural brain MRI, diffusion/connectome, behavioral, and body-mass data.',
      'Modeling brain-age and cardiac-age gaps on a 95-mouse discovery cohort using regularized regression, PLS, and sparse CCA.',
      'Applying learned signatures to a 30-mouse GLP-1 treatment cohort to test whether GLP-1 shifts animals toward healthier brain–heart aging profiles.',
    ],
  },
  {
    id: 'ta',
    role: 'Teaching Assistant',
    org: 'Math Enrichment Services',
    location: 'McLean, VA',
    date: 'Jul 2024',
    bullets: [
      'Designed quizzes and practice problems tailored to competitive middle school math curricula (AMC 8, MATHCOUNTS).',
      'Led individualized and group review sessions on advanced problem-solving techniques.',
    ],
  },
  {
    id: 'emory',
    role: 'Researcher / First Author',
    org: 'Emory University',
    location: 'Atlanta, GA',
    date: 'Jun 2023 – Sep 2023',
    bullets: [
      'Evaluated ML models (ARIMA, Prophet, TipRanks) for stock forecasting under Dr. Karan Uppal.',
      'Published at the 8th International Conference on Research in Business, Management and Economics, Prague, Czech Republic.',
    ],
  },
];

export const education = [
  {
    id: 'duke',
    school: 'Duke University',
    location: 'Durham, NC',
    degree: 'B.S. in Mathematics and Computer Science',
    date: 'Expected Jun 2029',
  },
  {
    id: 'tj',
    school: 'Thomas Jefferson High School for Science and Technology',
    location: 'Alexandria, VA',
    degree: 'Advanced Studies Diploma — Weighted GPA: 4.3/4.0, ACT: 35/36',
    date: 'Graduated Jun 2025',
  },
];

export const activities = [
  'Duke Asian Athletes Network (Chief Technology Officer)',
  'Duke Varsity Fencing (Member)',
];

export const awards = [
  'USA Computing Olympiad Gold Division (Dec 2023)',
  '3× American Invitational Mathematics Examination Qualifier (2022–2024)',
];

export const skills = {
  languages: ['Python', 'Java', 'JavaScript', 'HTML/CSS', 'SQL'],
  frameworks: ['React', 'Vite', 'FastAPI', 'LangGraph', 'Flask'],
  tools: ['Git', 'Docker', 'Firebase', 'Arduino', 'VS Code'],
  ml: ['OpenCV', 'YOLOv11', 'Gemini', 'pandas', 'NumPy', 'Matplotlib'],
};

export const sections = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'] | 'hero';
