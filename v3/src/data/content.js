// All copy for the site lives here so the structure (which mirrors the reference)
// can be re-skinned without touching components.

export const brand = {
  wordmark: 'YASH',
  name: 'Yash Lahoti',
  tagline: 'Physician · Engineer · Builder',
  email: 'yash.lahoti@icahn.mssm.edu',
  location: 'New York, NY',
  est: 'MD · MSE   EST. 2017',
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About me', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#works' },
  { label: 'Services', href: '#services' },
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
    'I AM AN MD CANDIDATE AND MACHINE-LEARNING ENGINEER. AFTER AN MSE AT PENN AND A STINT SHIPPING TINYML IN INDUSTRY, I JOINED MEDICINE TO BUILD TOOLS CLINICIANS ACTUALLY USE — FROM SPINE IMAGING PIPELINES TO RETINAL BIOMARKERS. INTENTIONAL METHOD, SYSTEMATIC RIGOR, MEASURABLE IMPACT.',
  ctaPrimary: { label: 'GET IN TOUCH', href: 'mailto:' + brand.email },
  ctaSecondary: { label: 'SERVICES', href: '#services' },
}

export const experience = {
  eyebrow: 'ORIGIN & FOUNDATIONS',
  pill: 'FOUNDATION & JOURNEY',
  title: ['WHERE', "I'VE BEEN"],
  intro: 'My professional journey through research labs, industry and the clinic.',
  tabs: ['RESEARCH', 'INDUSTRY', 'CLINIC'],
  ghost: 'RESEARCH ENGINEER  2019  ML ENGINEER  2021  CTO  2022  AI SCIENTIST  PRESENT  COURSE DIRECTOR  ',
  panels: [
    {
      years: '2019 — 2021',
      org: 'PENN NEUROSURGERY',
      tag: 'RESEARCH',
      title: ['RESEARCH', 'ENGINEER'],
      body: 'Wolf Lab, Perelman School of Medicine. Instrumentation and signal analysis for implanted brain electrodes.',
      milestones: [
        ['MILESTONE 01', '3D-printed surgical caps from MRI reconstructions for electrode implants'],
        ['MILESTONE 02', 'Automated hippocampal recording analysis, 3× scans per hour at 98% accuracy'],
        ['MILESTONE 03', 'BAS Biomedical Science → MSE Electrical Engineering, UPenn'],
      ],
    },
    {
      years: '2021 — 2022',
      org: 'TDK INVENSENSE · AUTOML',
      tag: 'INDUSTRY',
      title: ['MACHINE LEARNING', 'ENGINEER'],
      body: 'Edge inference on microcontrollers. Shipping models that run on milliwatts, not GPUs.',
      milestones: [
        ['DELIVERY', 'TinyML model predicting cardiac pressures from ECG at 95% accuracy'],
        ['INFRASTRUCTURE', 'AutoML fault-detection pipeline for motors, +20% defect identification'],
        ['EDUCATION', 'Taught Python & AI to 100+ high-school students with Inspirit AI'],
      ],
    },
    {
      years: '2022 — PRESENT',
      org: 'SPINESIGHT · MOUNT SINAI',
      tag: 'CLINIC',
      title: ['CHIEF TECHNOLOGY', 'OFFICER'],
      body: 'Targeted Healthcare Innovation Fellowship. An AI platform automating MRI measurements for spine disease.',
      milestones: [
        ['PRODUCT', 'Reduced diagnostic measurement time by 85%'],
        ['STANDARDS', '140+ clinical metrics standardised with surgeons'],
        ['DISCOVERY', '100+ clinicians, patients and staff interviewed'],
      ],
    },
    {
      years: '2022 — PRESENT',
      org: 'CHO / KIM AI SPINE LAB',
      tag: 'RESEARCH',
      title: ['LEAD AI', 'SCIENTIST'],
      body: 'Research director across 15+ projects. Deep learning for scoliosis, alignment and ophthalmic imaging.',
      milestones: [
        ['TEAM', 'Led 20+ students; 3 prototypes in live Mount Sinai workflows'],
        ['DATA', 'Scoliosis database of 1,200+ cases powering Cobb-angle models'],
        ['TEACHING', 'Course director, AI in Medicine curriculum at Icahn'],
      ],
    },
  ],
}

export const research = {
  label: 'PUBLICATIONS',
  title: 'FEATURED RESEARCH',
  items: [
    { id: 'cobb', venue: 'SPINE JOURNAL · 2025', title: 'Automated Scoliosis Cobb Angle Classification', sub: 'Explainable ML on biplanar radiographs', img: '/img/projects/scoliosis.jpg', theme: 'light', metric: '91% precision' },
    { id: 'llm', venue: 'SAGE · 2023', title: 'Artificially Intelligent Billing in Spine Surgery', sub: 'Large language model analysis', img: null, theme: 'dark', metric: 'LLM · CPT' },
    { id: 'seg', venue: 'SGIM · 2023', title: 'Deep Learning Spinal Cord Segmentation', sub: 'EOS full-body radiographs, U-Net', img: '/img/projects/spine-segmentation.jpg', theme: 'light', metric: 'DSC 0.96' },
    { id: 'rin', venue: 'NASS · 2024', title: 'Scoliosis Classification with RadImageNet', sub: 'Transfer learning on hardware-present images', img: '/img/projects/radimagenet.jpg', theme: 'dark', metric: 'F1 0.86' },
    { id: 'ibd', venue: 'DDW · 2024', title: 'Body Composition in Inflammatory Bowel Disease', sub: 'Deep learning on CT', img: null, theme: 'light', metric: 'CT · IBD' },
    { id: 'glc', venue: 'ARVO · 2026', title: 'EHR Predictive Model for Open-Angle Glaucoma', sub: 'Multifactorial risk quantification', img: null, theme: 'dark', metric: 'OPHTHALMOLOGY' },
  ],
}

export const works = {
  label: "WORKS '26",
  hint: '↓  SCROLL OR DRAG DRUM TO CYCLE',
  items: [
    { id: 'spinesight', name: 'SpineSight', title: 'Measure the spine in seconds.', sub: 'AI platform automating MRI measurements', img: '/img/projects/spinesight.jpg', theme: 'light', tags: 'PYTORCH · REACT · AWS' },
    { id: 'cobb', name: 'Cobb Matrix', title: 'Explainable scoliosis grading.', sub: 'Spine contouring + Cobb angle estimation', img: '/img/projects/scoliosis.jpg', theme: 'light', tags: 'CNN · EOS IMAGING' },
    { id: 'seg', name: 'Spine Segmentation', title: 'Pixel-accurate cord contours.', sub: 'Two-stage ROI + mask pipeline', img: '/img/projects/spine-segmentation.jpg', theme: 'dark', tags: 'U-NET · 500 PATIENTS' },
    { id: 'rin', name: 'RadImageNet', title: 'Transfer learning that holds up.', sub: 'Robust to surgical hardware artefacts', img: '/img/projects/radimagenet.jpg', theme: 'light', tags: 'TRANSFER LEARNING' },
    { id: 'cardiac', name: 'Cardiac TinyML', title: 'Pressure from a heartbeat.', sub: 'ECG → cardiac pressure on-device', img: null, theme: 'dark', tags: 'TINYML · 95% ACC', art: 'ecg' },
    { id: 'oculomics', name: 'Oculomics', title: 'The eye as a window to the heart.', sub: 'Retinal perfusion and systemic risk', img: null, theme: 'light', tags: 'OCTA · DOPPLER HOLOGRAPHY', art: 'retina' },
  ],
}

export const services = {
  title: 'WHAT I CAN HELP WITH',
  sub: 'ADVISING TEAMS, CLINICIANS AND STUDENTS AT THE INTERSECTION OF MEDICINE AND MACHINE LEARNING. PRACTICAL, EVIDENCE-LED, MEASURABLE.',
  items: [
    { n: '1', title: 'CLINICAL AI CONSULTING', body: 'From problem framing to deployment: data audits, model selection, validation design (STARD/TRIPOD+AI) and clinician-facing interfaces.', deliverables: 'DELIVERABLES: SCOPING MEMO, VALIDATION PLAN, PROTOTYPE, HANDOFF DOCS' },
    { n: '2', title: 'MED-SCHOOL ADMISSIONS ADVISING', body: 'One-on-one strategy for applicants with technical or non-traditional backgrounds. 100+ students advised.', deliverables: 'DELIVERABLES: SCHOOL LIST, NARRATIVE REVIEW, MOCK INTERVIEWS' },
    { n: '3', title: 'TALKS & WORKSHOPS', body: 'AI in Medicine lectures and hands-on coding workshops for medical schools, hospitals and conferences.', deliverables: 'DELIVERABLES: KEYNOTE, CURRICULUM, NOTEBOOKS' },
  ],
  inquire: 'INQUIRE',
}

export const footer = {
  talk: "LET'S TALK",
  links: [
    ...socials.map((s) => ({ label: s.label.toUpperCase(), href: s.href })),
    { label: 'CONTACT ME', href: 'mailto:' + brand.email, primary: true },
  ],
  left: 'PORTFOLIO · ALL RIGHTS RESERVED',
  right: 'DESIGN BY YASH LAHOTI',
}
