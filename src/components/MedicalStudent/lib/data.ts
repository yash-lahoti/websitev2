import type { EducationWorkTimelineItem } from "../components/ide/timeline/education-work-timeline";

export const profile = {
  name: "Yash Lahoti",
  title: "Medical Student & AI Researcher",
  roles: ["Medical Student", "AI/ML Engineer", "Entrepreneur"],
  tagline: "Building intelligent systems for healthcare",
  email: "yash.lahoti@icahn.mssm.edu",
  location: "New York, NY",
  school: "Icahn School of Medicine at Mount Sinai",
  links: {
    github: "https://github.com/yashlahoti",
    linkedin: "https://linkedin.com/in/yashlahoti",
    scholar: "https://scholar.google.com",
    twitter: "https://twitter.com/yashlahoti"
  },
  bio: [
    {
      text: "My name is",
      highlight: false
    },
    {
      text: "Yash Lahoti",
      highlight: true
    },
    {
      text: ", and I am a",
      highlight: false
    },
    {
      text: "medical student",
      highlight: true
    },
    {
      text: ",",
      highlight: false
    },
    {
      text: "ML engineer",
      highlight: true
    },
    {
      text: ", and aspiring entrepreneur. Over the past 8 years, I have developed an interdisciplinary knowledge of",
      highlight: false
    },
    {
      text: "artificial intelligence",
      highlight: true
    },
    {
      text: "and",
      highlight: false
    },
    {
      text: "medicine.",
      highlight: true
    }
  ],
  aboutParagraphs: [
    "After completing my master's education and ML startup experience, I decided to join medical school in order to develop medical domain expertise and ideate how digital health solutions can innovate future clinical practice.",
    "Since joining Mount Sinai, I have interviewed 100+ clinicians, surgeons, patients, and healthcare workers to better understand the interaction between the healthcare ecosystem and key stakeholders. I have also received funding to create my own AI-driven digital health solution - SpineSight.",
    "Outside of the classroom, I dedicate time towards education and mentorship. I advise prospective medical students, mentor students interested in data science, and organize an annual AI in Medicine lecture series highlighting industry leaders working at the forefront of AI."
  ],
  stats: {
    publications: "10+",
    patients: "1,200+",
    students: "100+",
    years: "8+"
  }
};

export const experiences = [
  {
    title: "Chief Technology Officer",
    organization: "SpineSight",
    subtitle: "Targeted Healthcare Innovation Fellowship",
    location: "New York, NY",
    category: "Industry/Innovation",
    duration: "2022 - Present",
    details: [
      "Developed SpineSight, an AI platform automating MRI measurements and reducing diagnostic time by 85%.",
      "Standardized 140+ clinical metrics with clinicians for faster, personalized spinal disease treatment."
    ],
    url: "",
    icon: "briefcase"
  },
  {
    title: "Lead AI Scientist & Research Director",
    organization: "Cho/Kim AI Spine Lab",
    subtitle: "Mount Sinai Health System",
    location: "New York, NY",
    category: "Academic/Research",
    duration: "2022 - Present",
    details: [
      "Led team of 20+ students on 15+ AI research projects, creating 3 clinical software prototypes used in Mount Sinai workflows.",
      "Built a scoliosis database of 1,200+ cases to train AI models, enhancing surgical decision-making."
    ],
    url: "",
    icon: "flask"
  },
  {
    title: "AI Panelist",
    organization: "6th Prostate Cancer Symposium",
    subtitle: "World Congress of Urologic Oncology",
    location: "New York, NY",
    category: "Academic/Research",
    duration: "2024",
    details: [
      "Invited AI Panelist - AI and Innovations in Prostate Cancer",
      "Topics: Prostate Cancer Surgery, Large AI Databases in Healthcare, LLM Integration in Urologic Care"
    ],
    url: "https://mountsinaiurologycme.com/",
    icon: "mic"
  },
  {
    title: "Course Director",
    organization: "Icahn School of Medicine",
    subtitle: "AI in Medicine Curriculum",
    location: "New York, NY",
    category: "Mentorship/Education",
    duration: "2022 - Present",
    details: [
      "Taught AI to 50+ medical students via coding workshops and F500 speaker-series lectures.",
      "Integrated AI training into the medical curriculum, addressing ethical risks and clinical strengths."
    ],
    url: "",
    icon: "graduation-cap"
  },
  {
    title: "Machine Learning Engineer",
    organization: "TDK InvenSense",
    subtitle: "AutoML Division",
    location: "Pittsburgh, PA",
    category: "Industry/Innovation",
    duration: "2021 - 2022",
    details: [
      "Developed TinyML solution predicting cardiac pressures with 95% accuracy from ECG data.",
      "Created fault detection models for motors, improving defective product identification by 20%."
    ],
    url: "https://invensense.tdk.com/",
    icon: "cpu"
  },
  {
    title: "Research Engineer",
    organization: "Perelman School of Medicine",
    subtitle: "Neurosurgery Department",
    location: "Philadelphia, PA",
    category: "Academic/Research",
    duration: "2019 - 2021",
    details: [
      "Designed 3D-printed surgical caps for brain electrode implants using pig MRI reconstructions.",
      "Automated hippocampal recording analysis, tripling scans processed per hour with 98% accuracy."
    ],
    url: "https://www.med.upenn.edu/wolflab/",
    icon: "brain"
  },
  {
    title: "AI/ML Python Course Instructor",
    organization: "Inspirit AI",
    subtitle: "Stanford/MIT Alumni Program",
    location: "New York, NY",
    category: "Mentorship/Education",
    duration: "2021 - 2022",
    details: [
      "Designed 3 healthcare AI projects: SARS-CoV-2 genome classification, skin cancer diagnosis, facial emotion detection.",
      "Taught Python programming and introductory AI/ML concepts to 100+ high school students."
    ],
    url: "https://www.inspiritai.com/home",
    icon: "code"
  }
];

// Education + Work timeline (used by the MedicalStudent IDE "Experience" tab)
export const educationWorkTimeline = [
  {
    kind: "Education",
    title: "Doctor of Medicine (MD)",
    org: "Icahn School of Medicine at Mount Sinai",
    date: "2022 – 2026",
  },
  {
    kind: "Work",
    title: "Chief Technology Officer",
    org: "SpineSight",
    date: "2022 – Present",
    subtitle: "Targeted Healthcare Innovation Fellowship",
  },
  {
    kind: "Education",
    title: "MSE, Electrical Engineering",
    org: "University of Pennsylvania",
    date: "2021 – 2022",
  },
  {
    kind: "Work",
    title: "Machine Learning Engineer",
    org: "TDK InvenSense (AutoML)",
    date: "2021 – 2022",
  },
  {
    kind: "Education",
    title: "BAS, Biomedical Science",
    org: "University of Pennsylvania",
    date: "2017 – 2021",
  },
] as const satisfies ReadonlyArray<EducationWorkTimelineItem>;

export const publications = [
  {
    conference: "Spine Journal",
    type: "Manuscript",
    title: "Automated Scoliosis Cobb Angle Classification in Biplanar Radiograph Imaging with Explainable Machine Learning Models",
    authors: "Yu J, Lahoti Y, McCandless KC, et al.",
    year: "2025",
    status: "Accepted",
    department: "Orthopedics",
    previewImage: "/medicalstudent/projects/scoliosis-cobb/figure-1.png",
    featured: true
  },
  {
    conference: "Sage 2023",
    type: "Manuscript",
    title: "Artificially Intelligent Billing in Spine Surgery: An Analysis of a Large Language Model",
    authors: "Zaidat B, Lahoti Y, Yu A, et al.",
    year: "2023",
    url: "https://pubmed.ncbi.nlm.nih.gov/38147047/",
    department: "Orthopedics",
    previewImage: "/pdfs/gpt_billing-page-001.jpg",
    featured: true
  },
  {
    conference: "AAOS 2025",
    type: "Presentation",
    title: "Global Sagittal Alignment Variations with Body Mass Index in Patients",
    authors: "Mohamed K, Duey A, Yu A, Lahoti Y, et al.",
    year: "2025",
    department: "Orthopedics",
    previewImage: "/medicalstudent/projects/spine-segmentation/figure-1.png",
    featured: true
  },
  {
    conference: "EOA 2024",
    type: "Presentation",
    title: "Automated Scoliosis Classification from AI-enabled Spine Contouring and Cobb Angle Estimation",
    authors: "Lahoti Y, Yu J, Cho S, Kim J",
    year: "2024",
    department: "Orthopedics"
  },
  {
    conference: "NASS 2024",
    type: "Abstract/Poster",
    title: "Automated Scoliosis Classification from EOS Full Body Imaging: A Deep Learning Approach with RadImageNet",
    authors: "Lahoti Y, Yu J, Cho S, Kim J",
    year: "2024",
    department: "Orthopedics"
  },
  {
    conference: "CNS 2024",
    type: "Abstract/Poster",
    title: "Automated Scoliosis Classification from AI-enabled Spine Contouring",
    authors: "Lahoti Y, Yu J, Cho S, Kim J",
    year: "2024",
    department: "Orthopedics"
  },
  {
    conference: "DDW 2024",
    type: "Abstract/Poster",
    title: "Deep Learning Software to Evaluate Body Composition in Inflammatory Bowel Disease",
    authors: "Gold SL, Blankemeier L, Lahoti Y, et al.",
    year: "2024",
    department: "Gastroenterology",
    url: "https://eposters.ddw.org/ddw/2024/"
  },
  {
    conference: "SGIM 2023",
    type: "Abstract/Poster",
    title: "Development of a Deep Learning Algorithm to Automate the Segmentation of Spinal Cord from EOS Radiographic Images",
    authors: "Lahoti Y, Cho S, Kim J",
    year: "2023",
    department: "Orthopedics"
  }
];

export const projects = [
  {
    id: "spinesight",
    title: "SpineSight",
    category: "AI Healthcare Platform",
    description: "AI platform automating MRI measurements for spinal disease diagnosis. Reduces diagnostic time by 85% and standardizes 140+ clinical metrics for personalized treatment planning.",
    image: "/medicalstudent/projects/spinesight/cover.jpeg",
    tech: ["Python", "PyTorch", "Medical Imaging", "React", "AWS"],
    metrics: [
      { label: "Time Reduction", value: "85%" },
      { label: "Clinical Metrics", value: "140+" },
      { label: "Clinicians Interviewed", value: "100+" }
    ],
    highlights: [
      "Automated MRI measurements to reduce diagnostic friction in spine workflows.",
      "Standardized clinical metrics with clinicians to enable consistent reporting.",
      "Built end-to-end product: model training, inference, and clinician-facing UI.",
    ],
    status: "Production",
    demo: "",
    github: "",
    publication: "/pdfs/Spine_Search.pptx.pdf",
    featured: true,
  },
  {
    id: "spine-segmentation",
    title: "Spine Segmentation Algorithm",
    category: "AI Spine Contouring",
    description: "Deep learning algorithm automating spinal cord segmentation from EOS radiographic images with high accuracy across both AP and lateral views.",
    image: "/medicalstudent/projects/spine-segmentation/figure-1.png",
    tech: ["Python", "PyTorch", "U-Net", "Medical Imaging"],
    metrics: [
      { label: "Patients", value: "500" },
      { label: "DSC (AP)", value: "0.92" },
      { label: "DSC (LAT)", value: "0.96" }
    ],
    highlights: [
      "Two-stage pipeline: ROI detection + mask generation for robust performance.",
      "Validated across AP and LAT views with strong Dice similarity coefficients.",
      "Designed outputs to serve downstream curvature and alignment metrics.",
    ],
    status: "Production",
    demo: "",
    github: "",
    publication: "",
    featured: true,
  },
  {
    id: "scoliosis-cobb",
    title: "Scoliosis Classifier",
    category: "Scoliosis Classification",
    description: "AI-enabled spine contouring and Cobb Angle estimation for automated scoliosis classification using deep learning with explainable models.",
    image: "/medicalstudent/projects/scoliosis-cobb/figure-1.png",
    tech: ["Python", "CNN", "TensorFlow", "EOS Imaging"],
    metrics: [
      { label: "Patients", value: "215" },
      { label: "Precision", value: "91%" },
      { label: "Recall", value: "91%" }
    ],
    highlights: [
      "Automated contouring + Cobb angle estimation for classification at scale.",
      "Focused on explainability and clinically meaningful error analysis.",
      "Optimized for real-world variability in imaging conditions and posture.",
    ],
    status: "Beta",
    demo: "",
    github: "",
    publication: "/medicalstudent/projects/scoliosis-cobb/Cobb_Matrix.pptx.pdf",
    featured: true,
  },
  {
    id: "radimagenet",
    title: "RadImageNet Classifier",
    category: "Transfer Learning",
    description: "Deep learning approach using RadImageNet for scoliosis classification, demonstrating robust performance across standard and hardware-present images.",
    image: "/medicalstudent/projects/radimagenet/figure-1.png",
    tech: ["Python", "RadImageNet", "Transfer Learning", "U-Net"],
    metrics: [
      { label: "Patients", value: "215" },
      { label: "Precision", value: "87%" },
      { label: "F1 Score", value: "86%" }
    ],
    highlights: [
      "Two-stage approach: U-Net segmentation + RadImageNet fine-tuning for classification.",
      "Maintained performance on images with and without hardware artifacts.",
      "Produced fusion overlays to improve signal for downstream classifiers.",
    ],
    status: "Beta",
    demo: "",
    github: "",
    publication: "",
  }
];

export const skills = {
  languages: [
    { name: "Python", level: 95 },
    { name: "TypeScript", level: 85 },
    { name: "SQL", level: 80 },
    { name: "R", level: 70 },
    { name: "MATLAB", level: 75 }
  ],
  frameworks: [
    { name: "PyTorch", level: 95 },
    { name: "TensorFlow", level: 90 },
    { name: "React/Next.js", level: 80 },
    { name: "scikit-learn", level: 90 }
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 75 },
    { name: "AWS", level: 70 },
    { name: "GCP", level: 65 }
  ],
  domains: [
    "Medical Imaging",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Clinical AI",
    "Healthcare Innovation"
  ]
};
