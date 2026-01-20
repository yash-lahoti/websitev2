import { Stethoscope, Clipboard, Award, Microscope, Brain, Database, Activity, Scan, Eye, FileText, Layers } from 'lucide-react';

export const clinicalExperience = [
    {
        title: "AI Strategist & Clinical Research Scientist",
        organization: "New York Eye and Ear Research Fellowship | Dr. Alon Harris",
        date: "2025 - Present",
        location: "New York, NY",
        description: [
            "Pioneered large-scale, AI-ready data infrastructure unifying raw imaging, biomarker measurements, and longitudinal progression data across multimodal ophthalmic imaging sources for glaucoma studies.",
            "Designed cutting-edge AI prototypes predicting longitudinal glaucoma risk progression combining fundoscopy, OCT, OCTA, and VF perimetry data.",
            "Drove high-impact research collaborations and funding initiatives, designing AI-motivated grant proposals and forging partnerships with leading AI experts and clinicians."
        ],
        icon: Eye,
    },
    {
        title: "Chief Technology Officer",
        organization: "SpineSight - Targeted Healthcare Innovation Fellowship",
        date: "2021 - Present",
        location: "Pittsburgh, PA → New York, NY",
        description: [
            "Spearheaded technical development of SpineSight, an AI-driven platform enhancing quantification and diagnosis of spinal cord diseases, reducing patient diagnostic time by 85%.",
            "Coordinated multidisciplinary team of neurosurgeons and neuroradiologists to co-develop 140+ novel clinical metrics for spinal disease tracking.",
            "Conducted market research through 150+ interviews with clinicians and patients to refine clinical workflow integration."
        ],
        icon: Activity,
    },
    {
        title: "Lead AI Scientist & Research Director",
        organization: "Cho/Kim AI Spine Lab",
        date: "2022 - 2024",
        location: "New York, NY",
        description: [
            "Directed engineering and experimental design of 15+ active AI initiatives, delegating responsibilities across 25 graduate students.",
            "Implemented RAG LLM-Agent System (PydanticAI) with 90% accuracy in assigning CPT billing codes to 160K+ orthopedic operative notes.",
            "Established proprietary longitudinal database of 1,200+ scoliosis cases to train AI models and evaluate against 10,000+ active patients."
        ],
        icon: Microscope,
    },
    {
        title: "Course Director and Educator",
        organization: "Artificial Intelligence in Medicine - Mount Sinai",
        date: "2022 - 2024",
        location: "New York, NY",
        description: [
            "Administered and taught first iteration of AI education for 50+ medical students.",
            "Developed curriculum of 8 interactive coding workshops and F500 industry leader speaker-series lectures.",
            "Educated students on how AI can augment clinical decision-making."
        ],
        icon: Award,
    },
    {
        title: "Machine Learning Engineer",
        organization: "TDK SensEI",
        date: "2021 - 2022",
        location: "Pittsburgh, PA",
        description: [
            "Constructed TinyML solution for predicting invasive cardiac pressures using non-invasive ECG data from 2000+ hours of patient sensor data.",
            "Achieved 95% prediction accuracy for central venous pressure in outpatient monitoring facility.",
            "Supervised interdisciplinary collaboration between cardiologists and engineers for seamless clinical integration."
        ],
        icon: Activity,
    },
    {
        title: "Machine Learning Research Engineer",
        organization: "Perelman School of Medicine: Neurosurgery",
        date: "2019 - 2021",
        location: "Philadelphia, PA",
        description: [
            "Architected ML pipeline to automate analysis of 4000+ hours of 64-channel electrode recordings of the hippocampus.",
            "Assisted neurologists in classification of epilepsy, achieving 98% ROI identification.",
            "Enabled 3-fold increase in scans processed per hour."
        ],
        icon: Brain,
    }
];

export const researchHighlights = [
    {
        id: "oculomics-ehr",
        title: "Oculomics & EHR Exploration",
        category: "Ocular Data Science",
        description: "Integrating structured ophthalmic data with Electronic Health Records to identify systemic disease biomarkers through ocular health patterns.",
        image: "/medicalstudent/projects/oculomics/cover.jpg",
        tags: ["EHR", "Data Mining", "Oculomics", "Systemic Health"],
        metrics: "Multimodal Integration",
        status: "Research",
        icon: Database,
    },
    {
        id: "holography",
        title: "Ophthalmic Holography",
        category: "Advanced Imaging",
        description: "Developing next-generation holographic imaging techniques for high-resolution, depth-resolved visualization of retinal structures.",
        image: "/medicalstudent/projects/holography/hologram.jpg",
        tags: ["Optics", "Holography", "Imaging Physics"],
        metrics: "Micron-level Resolution",
        status: "Prototype",
        icon: Layers,
    },
    {
        id: "structured-extraction",
        title: "Structured Data Extraction",
        category: "Clinical NLP",
        description: "Automated pipeline for extracting structured clinical parameters from unstructured ophthalmology notes and reports.",
        image: "/medicalstudent/projects/nlp/extraction.jpg",
        tags: ["NLP", "LLMs", "Clinical Informatics"],
        metrics: "95% Accuracy",
        status: "Production",
        icon: FileText,
    }
];

export const expertise = [
    {
        title: "Clinical Focus",
        skills: ["Disease Diagnosis", "Surgical Planning", "Patient Outcomes", "Treatment Protocols"],
        icon: Eye,
    },
    {
        title: "Technical Approach",
        skills: ["AI-Assisted Imaging", "Data Pipeline Design", "Predictive Modeling", "Research Informatics"],
        icon: Brain,
    },
    {
        title: "Research",
        skills: ["Study Design", "Biostatistics", "Grant Writing", "Academic Publishing"],
        icon: Clipboard,
    },
    {
        title: "Engineering",
        skills: ["Python/PyTorch", "Full-Stack Web (React/Node)", "Cloud (AWS/GCP)", "System Architecture"],
        icon: Database,
    }
];

export const lectures = [
    {
        id: "glaucoma-ai",
        title: "AI in Glaucoma Diagnostics",
        event: "Ophthalmology Grand Rounds",
        date: "Fall 2024",
        type: "Lecture",
        description: "Deep learning approaches for early detection of glaucomatous damage using OCT and fundus imaging.",
        slides: "/presentations/AI in Glaucoma Diagnostics.pdf",
        thumbnail: "/presentations/glaucoma-thumb.jpg",
        tags: ["AI", "Glaucoma", "Diagnostics"],
        zoom: 76
    },
    {
        id: "cobb-matrix",
        title: "Cobb Angle Matrix Analysis",
        event: "Spine Research Symposium",
        date: "2024",
        type: "Lecture",
        description: "Novel matrix-based approach for analyzing Cobb angle measurements in spinal deformity assessment.",
        slides: "/presentations/Cobb_Matrix.pptx.pdf",
        thumbnail: "/presentations/cobb-thumb.jpg",
        tags: ["Spine", "Biomechanics", "Measurement"],
        zoom: 38
    },
    {
        id: "spine-search",
        title: "Spine Search: AI-Powered Spine Analysis",
        event: "Spine Research Symposium",
        date: "2024",
        type: "Lecture",
        description: "Leveraging AI search algorithms for automated spine structure identification and analysis in radiographic imaging.",
        slides: "/presentations/Spine_Search.pptx.pdf",
        thumbnail: "/presentations/spine-search-thumb.jpg",
        tags: ["Spine", "AI", "Search Algorithms"],
        zoom: 38
    }
];

export const articles = [
    {
        id: "retinal-implant",
        title: "A Spark of Hope: The PRIME Study Analysis",
        publication: "Personal Blog",
        date: "Dec 2024",
        description: "Reflections on the recent breakthrough in retinal implants for geographic atrophy and what it means for patient hope.",
        url: "#",
        tags: ["Retina", "Opinion", "Innovation"]
    },
    {
        id: "oculomics-review",
        title: "Oculomics: The Eye as a Window to Health",
        publication: "Student Research Journal",
        date: "Nov 2024",
        description: "A comprehensive review of current biomarkers identified through non-invasive retinal imaging.",
        url: "#",
        tags: ["Oculomics", "Review"]
    },
    {
        id: "coding-md",
        title: "Why Every Doctor Should Learn Python",
        publication: "MedTech Insider",
        date: "Oct 2023",
        description: "Bridging the literacy gap between clinicians and data scientists starts with basic programming skills.",
        url: "#",
        tags: ["Education", "Python"]
    }
];
