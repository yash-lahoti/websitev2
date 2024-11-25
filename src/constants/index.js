import {
  mobile,
  sapient,
  biodesign,
  reactjs,
  nodejs,
  git,
  python,
  pytorch,
  django,
  meta,
  starbucks,
  tesla,
  shopify,
  penn,
  mountsinai,
  qeexo,
  carrent,
  jobit,
  tripguide, spinesight, otoai,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Timeline",
  },
  {
    id: "activity",
    title: "Experiences",
  },
  {
    id: "research",
    title: "Research",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },

  
];

const services = [
  {
    title: "Sinai Biodesign",
    icon: biodesign,
    url: "https://www.sinaibio.design/"
  },
  {
    title: "Sapient Academy",
    icon: sapient,
    url: "https://www.sapientacademy.com/about"
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Pytorch",
    icon: pytorch,
  },
  {
    name: "React",
    icon: reactjs,
  },
  {
    name: "Django",
    icon: django,
  },
  {
    name: "Node.js",
    icon: nodejs,
  },
  {
    name: "Git",
    icon: git,
  }
];

const experiences = [
    {
    title: "Doctor of Medicine (MD)",
    company_name: "Icahn School of Medicine at Mount Sinai",
    icon: mountsinai,
    iconBg: "#545a80",
    date: "2022-2026",
    points: [],
  },
  {
    title: "ML Engineer",
    company_name: "Qeexo AutML",
    icon: qeexo,
    iconBg: "#E6DEDD",
    date: "2022",
    points: [],
  },
  {
    title: "MSE Electrical Engineering",
    company_name: "University of Pennsylvania School of Engineering",
    icon: penn,
    iconBg: "#545a80",
    date: "2021-2022",
    points: [],
  },
  {
    title: "BAS Biomedical Science",
    company_name: "University of Pennsylvania School of Engineering",
    icon: penn,
    iconBg: "#E6DEDD",
    date: "2017-2021",
    points: [],
  },
];

const testimonials_old = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  }
];

const testimonials = [];

const projects = [
  {
    name: "SpineSight",
    description: [
        "Spinal Insights in Seconds.",
        "Mount Sinai Pitch Challenge Winner.",
        "NSF Regional I-Corps Hub Program.",
        "Targeted Healthcare Innovation Fellowship (THRIVE'23)."
    ],
    tags: [
      {
        name: "healthcare",
        color: "blue-text-gradient",
      },
      {
        name: "innovation",
        color: "green-text-gradient",
      },
      {
        name: "fellowship",
        color: "pink-text-gradient",
      },
    ],
    image: spinesight, // Replace with actual image variable
    source_code_link: "https://ip.mountsinai.org/blog/announcing-the-winners-of-the-mount-sinai-pitch-challenge-2023-2/", // Replace with actual source code link if available
},
  {
    name: "OtoAI",
    description: [
        "AI-Driven Digital Otoscope Solution.",
        "Technology and Innovation Prize for Penn Engineering's Senior Design Competition.",
        "2020 Wharton Venture Labs Innovation Fund Validation Phase Award.",
        "Bioengineering Senior Design competition Winner."
    ],
    tags: [
      {
        name: "AI",
        color: "blue-text-gradient",
      },
      {
        name: "digital health",
        color: "green-text-gradient",
      },
      {
        name: "innovation",
        color: "pink-text-gradient",
      },
    ],
    image: otoai, // Replace with actual image variable
    source_code_link: "https://drive.google.com/file/d/1aV3i6k64DIJy6s8fY2Hlh7xgr0FxmGLn/view", // Replace with actual source code link if available
}
];

export { services, technologies, experiences, testimonials, projects };
