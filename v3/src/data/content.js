// All copy for the site lives here so the structure (which mirrors the reference)
// can be re-skinned without touching components.
export { publications } from './publications.js'

export const brand = {
  wordmark: 'YASH',
  loaderName: 'YASH LAHOTI, MD',
  loaderSub: 'LOADING',
  name: 'Yash Lahoti',
  tagline: 'Physician · Engineer · Builder',
  email: 'yash.lahoti@icahn.mssm.edu',
  location: 'New York, NY',
  est: 'MD · MSE   EST. 2017',
  cv: '/documents/Lahoti_Yash_Resume.pdf',
  pubsList: '/documents/Lahoti_Yash_Publications.pdf',
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Lectures', href: '#lectures' },
  { label: 'Works', href: '#works' },
  { label: 'Publications', href: '#publications' },
  { label: 'Capabilities', href: '#capabilities' },
]

export const socials = [
  { label: 'LinkedIn', key: 'linkedin', href: 'https://www.linkedin.com/in/yash-lahoti-mse-90b477178/' },
  { label: 'Scholar', key: 'scholar', href: 'https://scholar.google.com/citations?hl=en&user=ZZACpvAAAAAJ' },
  { label: 'Twitter', key: 'x', href: 'https://twitter.com/yashlahoti' },
  { label: 'GitHub', key: 'github', href: 'https://github.com/yash-lahoti' },
]

export const hero = {
  line1: 'EXPLORE MY',
  line2: 'PORTFOLIO',
  est: brand.est,
  manifesto: 'I AM PASSIONATE ABOUT BUILDING AI THAT MAKES CLINICAL CARE FASTER, SAFER AND MORE HUMAN',
  services: ['CLINICAL AI', 'MEDICAL IMAGING', 'DIGITAL HEALTH'],
}

export const about = {
  wordA: 'ABOUT',
  wordB: 'ME',
  headline: 'TURNING CLINICAL QUESTIONS INTO FAST, RIGOROUS AI SYSTEMS',
  locale: 'BASED IN NEW YORK  •  MOUNT SINAI',
  disciplineLabel: 'DISCIPLINE & CRAFT',
  disciplines: ['CLINICAL AI', 'MEDICAL IMAGING', 'PYTORCH', 'REACT'],
  body:
    'I AM AN MD CANDIDATE AND MACHINE-LEARNING ENGINEER. AFTER AN MSE AT PENN AND A STINT SHIPPING TINYML IN INDUSTRY, I JOINED MEDICINE TO BUILD TOOLS CLINICIANS ACTUALLY USE, FROM SPINE IMAGING PIPELINES TO RETINAL BIOMARKERS. INTENTIONAL METHOD, SYSTEMATIC RIGOR, MEASURABLE IMPACT.',
  ctaPrimary: { label: 'GET IN TOUCH', href: 'mailto:' + brand.email },
  ctaSecondary: { label: 'CAPABILITIES', href: '#capabilities' },
}

export const journey = {
  title: ['WHERE', "I'VE BEEN"],
  intro: 'Four chapters from Penn to the clinic. The ship marks the stop; the panel holds the story.',
  ghost: 'PENN  2017  TINYML  SPINESIGHT  MOUNT SINAI  2022  NYEE  OCULOMICS  2025  ',
  stops: [
    {
      years: '2017 – 2021',
      kind: 'EDUCATION',
      place: 'University of Pennsylvania',
      role: 'Undergrad & Masters',
      body: 'Biomedical science into electrical engineering. Research, emergency medicine and the first models.',
      experiences: [
        {
          flag: 'Degrees',
          title: 'BAS Biomedical Science · MSE Electrical Engineering',
          where: 'Penn Engineering',
          when: '2017 – 2021',
          points: [
            'Summa cum laude, GPA 3.86; MSE GPA 3.87',
            'Engineering track through physiology, signals and TinyML',
          ],
        },
        {
          flag: 'Research',
          title: 'ML Research Engineer',
          where: 'Perelman School of Medicine · Wolf Lab',
          when: '2019 – 2021',
          points: [
            'Automated 4,000+ hours of 64-channel hippocampal recordings',
            '98% ROI identification for epilepsy classification, 3× scans per hour',
            '3D-printed surgical caps from MRI reconstructions',
          ],
        },
        {
          flag: 'Service',
          title: 'EMT-Basic',
          where: 'UPenn Medical Emergency Response Team',
          when: '2018 – 2021',
          points: [
            '750 volunteer hours and 60+ emergency calls',
            'Co-founded Mergineers, an analytics committee for campus response data',
          ],
        },
        {
          flag: 'Teaching',
          title: 'AI & neuroscience instructor',
          where: 'InspiritAI · Neuroscience Pipeline',
          when: '2017 – 2021',
          points: [
            'Taught AI math and code to 20 high-school students',
            'STEM curricula for underserved West Philadelphia students',
          ],
        },
      ],
      artifacts: [
        { kind: 'mark', label: 'Penn', note: 'BAS · MSE' },
        { kind: 'mark', label: 'Wolf Lab', note: 'Neurosurgery ML' },
        { kind: 'metric', value: '4,000+', note: 'hours of EEG' },
        { kind: 'metric', value: '750', note: 'EMT hours' },
        { kind: 'link', label: 'UPenn Engineering', href: 'https://www.seas.upenn.edu/' },
      ],
    },
    {
      years: '2021 – 2022',
      kind: 'STARTUP',
      place: 'TDK SensEI · SpineSight',
      role: 'Industry & Startup',
      body: 'Models that run on milliwatts, then a company that measures the spine in seconds.',
      experiences: [
        {
          flag: 'Industry',
          title: 'Machine Learning Engineer',
          where: 'TDK SensEI · Pittsburgh',
          when: '2022',
          points: [
            'TinyML central venous pressure from wearable ECG, 95% accuracy over 2,000+ hours',
            'AutoML motor fault detection, +20% defect identification',
          ],
        },
        {
          flag: 'Co-founder',
          title: 'Co-Founder & Lead Engineer',
          where: 'SpineSight · Mount Sinai Biodesign',
          when: '2022 – 2025',
          points: [
            'AI platform automating spine MRI measurement, 85% faster diagnostics',
            'NSF National I-Corps ($50K) and Regional I-Corps ($5K); 150+ clinician and patient interviews',
            '2nd Place Pitch Challenge ($10K), Mount Sinai Innovation Partners',
          ],
        },
      ],
      artifacts: [
        { kind: 'image', src: '/img/projects/spinesight.jpg', alt: 'SpineSight product', caption: 'SpineSight' },
        { kind: 'mark', label: 'TDK', note: 'SensEI TinyML' },
        { kind: 'metric', value: '85%', note: 'faster diagnostics' },
        { kind: 'metric', value: '$50K', note: 'NSF I-Corps' },
        { kind: 'link', label: 'Mount Sinai Biodesign', href: 'https://icahn.mssm.edu/' },
      ],
    },
    {
      years: '2022 – 2025',
      kind: 'MED SCHOOL',
      place: 'Icahn School of Medicine at Mount Sinai',
      role: 'Medical School',
      body: 'MD training alongside a spine AI lab, a new AI course and admissions consulting.',
      experiences: [
        {
          flag: 'MD',
          title: 'MD Candidate',
          where: 'Icahn School of Medicine at Mount Sinai',
          when: '2022 – 2027',
          points: [
            'Clinical training with a through-line in clinical AI',
            'Admissions Committee student member, 30+ applications reviewed',
          ],
        },
        {
          flag: 'Lab',
          title: 'Lead AI Student Research Director',
          where: 'Cho / Kim AI Spine Lab',
          when: '2022 – 2024',
          points: [
            'Directed 10+ AI initiatives and 2 software prototypes for spine workflows',
            'Longitudinal scoliosis database of 1,200+ cases',
            'RAG LLM agent assigning CPT codes to 160K+ operative notes',
          ],
        },
        {
          flag: 'Teaching',
          title: 'Course Co-Director, AI in Medicine',
          where: 'NEXUS · Icahn SOM',
          when: '2022 – 2024',
          points: [
            'First AI elective for medical students at Mount Sinai',
            '50+ students, 8 coding workshops, F500 speaker series',
          ],
        },
        {
          flag: 'Consulting',
          title: 'Academic & Admissions Consultant',
          where: 'Sapient Academy',
          when: '2022 – 2026',
          points: [
            'Advising applicants on medical school strategy and storytelling',
          ],
        },
      ],
      artifacts: [
        { kind: 'image', src: '/img/projects/scoliosis.jpg', alt: 'Scoliosis AI', caption: 'Cho / Kim lab' },
        { kind: 'image', src: '/img/projects/nlp.jpg', alt: 'Clinical NLP', caption: 'LLM billing' },
        { kind: 'mark', label: 'Icahn SOM', note: 'MD Candidate' },
        { kind: 'metric', value: '1,200+', note: 'scoliosis cases' },
        { kind: 'metric', value: '50+', note: 'students taught' },
        { kind: 'link', label: 'View slides', href: '#lectures', action: 'lectures' },
      ],
    },
    {
      years: '2025 – Present',
      kind: 'RESEARCH YEAR',
      place: 'New York Eye and Ear · Harris Lab',
      role: 'Research Year',
      body: 'Oculomics as the through-line: the eye as a window to systemic disease.',
      experiences: [
        {
          flag: 'Lab',
          title: 'Clinical Research Scholar',
          where: 'Barry Family Center · Harris Lab, NYEE',
          when: '2025 – 2026',
          points: [
            '10-TB multimodal ophthalmic database across 5+ NIH studies',
            'Glaucoma progression models and capillary-level OCTA phenotyping',
            'NYEE Foundation grant funded; NIH and BrightFocus proposals under review',
          ],
        },
        {
          flag: 'Consulting',
          title: 'Ophthalmology & AI Consultant',
          where: 'Theta Tech AI',
          when: '2026',
          points: [
            'Applied oculomics and clinical AI methods in industry collaborations',
          ],
        },
        {
          flag: 'Informatics',
          title: 'Lead, Medical Student Engagement & Ophthalmology Informatics',
          where: 'Scientific Computing and Data · AIR-MS',
          when: '2026 – Present',
          points: [
            'Ophthalmic ontology across 12.5M patient records',
            'AI-Ready Mount Sinai Departmental Champion Scholarship ($10K)',
          ],
        },
        {
          flag: 'Community',
          title: 'SAIVO founding member · EHHOP Senior Clinician',
          where: 'Vision AI society · East Harlem ophthalmology clinic',
          when: '2025 – Present',
          points: [
            'Education at the intersection of AI and vision science',
            'Student-run clinics for uninsured patients in East Harlem',
          ],
        },
      ],
      artifacts: [
        { kind: 'mark', label: 'NYEE', note: 'Barry Family Center' },
        { kind: 'mark', label: 'Harris Lab', note: 'Oculomics' },
        { kind: 'metric', value: '10 TB', note: 'imaging archive' },
        { kind: 'metric', value: '8', note: 'ARVO 2026' },
        { kind: 'link', label: 'OPTIC-Dx', href: 'https://sinai-barry-center-hub.vercel.app/login' },
      ],
    },
  ],
}

/* ---------- Lectures (slides open in the in-site viewer; no download) ---------- */
export const lectures = {
  title: 'FEATURED LECTURES',
  label: 'LECTURES',
  enter: 'ENTER LECTURE',
  items: [
    {
      id: 'glaucoma-ai',
      title: 'AI in Glaucoma Diagnostics',
      event: 'Ophthalmology Grand Rounds',
      date: 'Fall 2024',
      tags: ['Glaucoma', 'Deep learning', 'OCT'],
      summary: 'Deep learning approaches for early detection of glaucomatous damage using OCT and fundus imaging.',
      src: '/lectures/glaucoma-ai.pdf',
      theme: 'dark',
    },
    {
      id: 'cobb-matrix',
      title: 'Cobb Angle Matrix Analysis',
      event: 'Spine Research Symposium',
      date: '2024',
      tags: ['Scoliosis', 'Explainable AI', 'EOS'],
      summary: 'A matrix-based approach to Cobb angle measurement and automated scoliosis classification.',
      src: '/lectures/cobb-matrix.pdf',
      theme: 'light',
    },
    {
      id: 'spine-search',
      title: 'Spine Search',
      event: 'Spine Research Symposium',
      date: '2024',
      tags: ['Spine MRI', 'Search', 'SpineSight'],
      summary: 'AI search algorithms for automated spine structure identification across radiographic imaging.',
      src: '/lectures/spine-search.pdf',
      theme: 'dark',
    },
  ],
}

export const works = {
  label: "WORKS '26",
  hint: '↓  SCROLL OR DRAG DRUM TO CYCLE',
  items: [
    {
      id: 'spinesight', name: 'SpineSight', title: 'Measure the spine in seconds.', sub: 'AI platform automating MRI measurements', img: '/img/projects/spinesight.jpg', theme: 'light', tags: 'PYTORCH · REACT · AWS',
      abstract: 'An AI platform that automates spine MRI measurements so surgeons get standardized, longitudinal metrics instead of manual calipers. Built end to end: model training, inference service and a clinician-facing UI.',
      metrics: [['85%', 'faster measurement'], ['140+', 'clinical metrics'], ['150+', 'interviews']],
      slides: 'spine-search', pubs: ['vertebral-seg-tsj-2025'],
      /* Artifacts are chips/links beside the drum — never re-show the card image. */
      artifacts: [
        { kind: 'mark', label: 'NSF', note: 'I-Corps' },
        { kind: 'mark', label: 'Sinai', note: 'Biodesign' },
        { kind: 'link', label: 'Lecture slides', href: '#lectures' },
      ],
    },
    {
      id: 'cobb', name: 'Cobb Matrix', title: 'Explainable scoliosis grading.', sub: 'Spine contouring + Cobb angle estimation', img: '/img/projects/scoliosis.jpg', theme: 'light', tags: 'CNN · EOS IMAGING',
      abstract: 'Automated spine contouring and Cobb angle estimation for scoliosis classification, designed so every grade can be traced back to the vertebral levels that produced it.',
      metrics: [['215', 'patients'], ['91%', 'precision'], ['91%', 'recall']],
      slides: 'cobb-matrix', pubs: ['cobb-spine-2025', 'cobb-esj-2026', 'eoa-2024-cobb'],
      artifacts: [
        { kind: 'mark', label: 'Spine', note: '2025' },
        { kind: 'mark', label: 'ESJ', note: '2026' },
        { kind: 'link', label: 'View slides', href: '#lectures' },
      ],
    },
    {
      id: 'seg', name: 'Spine Segmentation', title: 'Pixel-accurate cord contours.', sub: 'Two-stage ROI + mask pipeline', img: '/img/projects/spine-segmentation.jpg', theme: 'dark', tags: 'U-NET · 500 PATIENTS',
      abstract: 'A two-stage pipeline finds the region of interest, then generates spinal cord masks on EOS radiographs. Outputs feed downstream curvature and alignment metrics.',
      metrics: [['500', 'patients'], ['0.92', 'Dice AP'], ['0.96', 'Dice LAT']],
      pubs: ['vertebral-seg-tsj-2025', 'aaos-2025-bmi'],
      artifacts: [
        { kind: 'mark', label: 'EOS', note: 'biplanar' },
        { kind: 'mark', label: 'U-Net', note: 'two-stage' },
      ],
    },
    {
      id: 'rin', name: 'RadImageNet', title: 'Transfer learning that holds up.', sub: 'Robust to surgical hardware artefacts', img: '/img/projects/radimagenet.jpg', theme: 'light', tags: 'TRANSFER LEARNING',
      abstract: 'U-Net segmentation fused with RadImageNet fine-tuning for scoliosis classification that stays stable when surgical hardware is in the image.',
      metrics: [['215', 'patients'], ['87%', 'precision'], ['0.86', 'F1']],
      pubs: ['nass-2024-radimagenet', 'cobb-esj-2026'],
      artifacts: [
        { kind: 'mark', label: 'NASS', note: '2024' },
        { kind: 'mark', label: 'RadImageNet', note: 'transfer' },
      ],
    },
    {
      id: 'cardiac', name: 'Cardiac TinyML', title: 'Pressure from a heartbeat.', sub: 'ECG → cardiac pressure on-device', theme: 'dark', tags: 'TINYML · 95% ACC', art: 'ecg',
      abstract: 'Predicts invasive central venous pressure from non-invasive ECG on a microcontroller, trained on 2,000+ hours of outpatient sensor data with cardiologists in the loop.',
      metrics: [['95%', 'accuracy'], ['2,000+', 'hours of ECG'], ['mW', 'power budget']],
      pubs: [],
      artifacts: [
        { kind: 'mark', label: 'TDK', note: 'SensEI' },
        { kind: 'mark', label: 'TinyML', note: 'on-device' },
      ],
    },
    {
      id: 'oculomics', name: 'Oculomics', title: 'The eye as a window to the heart.', sub: 'Retinal perfusion and systemic risk', theme: 'light', tags: 'OCTA · DOPPLER HOLOGRAPHY', art: 'retina',
      abstract: 'Multimodal ophthalmic imaging linked to systemic health: OCTA phenotypes, Doppler holography and EHR risk models feeding OPTIC-Dx, an oculomics foundation model.',
      metrics: [['8', 'ARVO 2026 abstracts'], ['4', 'imaging modalities'], ['1', 'foundation model']],
      slides: 'glaucoma-ai', link: { label: 'OPTIC-Dx', href: 'https://sinai-barry-center-hub.vercel.app/login' },
      pubs: ['arvo-2026-ehr', 'arvo-2026-perfusion', 'arvo-2026-faz', 'arvo-2026-doppler', 'doppler-scientific-reports-2026'],
      artifacts: [
        { kind: 'mark', label: 'NYEE', note: 'Harris Lab' },
        { kind: 'mark', label: 'ARVO', note: '2026 × 8' },
        { kind: 'link', label: 'OPTIC-Dx', href: 'https://sinai-barry-center-hub.vercel.app/login' },
      ],
    },
  ],
}

/* ---------- Capabilities ---------- */
export const capabilities = {
  title: 'CAPABILITIES',
  lede: 'What I bring to a team, what I am building now, and where we can work together.',
  competencies: [
    { title: 'Clinical AI', proof: 'Problem framing to validated prototypes inside Mount Sinai workflows.' },
    { title: 'Medical imaging', proof: 'Segmentation and measurement on MRI, EOS, CT and OCTA.' },
    { title: 'Oculomics', proof: 'Retinal biomarkers for glaucoma, diabetes and cardiac risk.' },
    { title: 'LLM agents & clinical NLP', proof: 'RAG agents coding 160K+ operative notes.' },
    { title: 'Edge ML', proof: 'TinyML models that run on milliwatts.' },
    { title: 'Teaching', proof: 'Course director for AI in Medicine; 150+ learners.' },
  ],
  skills: [
    { group: 'Languages', items: [['Python', 95], ['TypeScript', 85], ['SQL', 80], ['MATLAB', 75], ['R', 70]] },
    { group: 'Frameworks', items: [['PyTorch', 95], ['scikit-learn', 90], ['TensorFlow', 90], ['React', 80]] },
    { group: 'Infrastructure', items: [['Git', 90], ['Docker', 75], ['AWS', 70], ['GCP', 65]] },
  ],
  active: [
    { name: 'OPTIC-Dx', note: 'Oculomics foundation model', status: 'Building', href: 'https://sinai-barry-center-hub.vercel.app/login' },
    { name: 'SpineSight', note: 'Spine MRI measurement platform', status: 'Live' },
    { name: 'ARVO 2026', note: '8 accepted abstracts', status: 'Presenting' },
    { name: 'Med-Jarvis', note: 'Step 2 question bank and knowledge wiki', status: 'Live' },
  ],
  connect: [
    { label: 'Research collaboration', subject: 'Research collaboration' },
    { label: 'Clinical AI advising', subject: 'Clinical AI advising' },
    { label: 'Admissions advising', subject: 'Medical school admissions advising' },
    { label: 'Talks & workshops', subject: 'Talk or workshop request' },
  ],
}

export const footer = {
  talk: "LET'S TALK",
  links: [
    ...socials.map((s) => ({ label: s.label.toUpperCase(), href: s.href })),
    { label: 'GET IN TOUCH', href: 'mailto:' + brand.email, primary: true },
  ],
  left: 'PORTFOLIO · ALL RIGHTS RESERVED',
  right: 'DESIGN BY YASH LAHOTI',
}
