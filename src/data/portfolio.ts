export const profile = {
  name: "Amirul Ichsandina",
  headline: "Information Systems Student",
  tagline: "Exploring technology, digital solutions, system analysis, and project development.",
  location: "Karawang, West Java, Indonesia",
  email: "amirulsanz17@gmail.com",
  github: "https://github.com/amirulSanz17",
  linkedin: "https://www.linkedin.com/in/amirul-ichsandina/",
  instagram: "https://www.instagram.com/ichsanz_17",
  whatsapp: "https://wa.me/62895401327573",
  about:
    "I am an Information Systems student passionate about technology, system analysis, product development, and digital solutions. I enjoy learning through hands-on projects, team collaboration, and real-world experiences — from web application development to IoT deployment and network infrastructure.",
  education: "Information Systems — Universitas Singaperbangsa Karawang",
  status: "Open to internship & collaboration",
  interests: ["System Analysis", "Product Development", "IoT", "Web Development", "Digital Solutions"],
};

export const skills = {
  technical: [
    "System Analysis",
    "Requirements Analysis",
    "Business Process Analysis",
    "Product Analysis",
    "Web Development",
    "Database Design",
    "Network Configuration",
    "IoT Systems",
  ],
  programming: ["PHP", "Laravel", "JavaScript", "React", "MySQL", "HTML", "CSS", "Git", "GitHub"],
  soft: [
    "Analytical Thinking",
    "Problem Solving",
    "Critical Thinking",
    "Project Coordination",
    "Team Collaboration",
    "Technical Communication",
    "Task Management",
  ],
};

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  date: string;
  image: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  gallery: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "PT Asteria Riksa Indonesia",
    position: "Project Development",
    location: "Karawang, Indonesia",
    date: "Jan 2026 – Jul 2026",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&auto=format",
    description:
      "Contributed to the development of an integrated inspection and testing management system — conducting system analysis, requirements gathering, and building web application modules for operational efficiency.",
    responsibilities: [
      "Conducted system analysis and requirements gathering",
      "Designed and developed web-based application modules",
      "Performed business process analysis and documentation",
      "Collaborated with cross-functional teams on project delivery",
    ],
    skills: ["System Analysis", "Laravel", "MySQL", "Requirements Analysis", "Business Process Analysis"],
    gallery: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
    ],
  },
  {
    id: "exp-2",
    company: "BGN IoT Project",
    position: "IoT Developer & Field Technician",
    location: "Karawang, Indonesia",
    date: "Dec 2025 – Mar 2026",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
    description:
      "Developed and deployed IoT monitoring systems, handling device staging, configuration, and integration with real-time web dashboards.",
    responsibilities: [
      "IoT device staging, configuration, and field deployment",
      "Developed real-time monitoring dashboard",
      "Performed device testing and troubleshooting",
      "Documented technical specifications and procedures",
    ],
    skills: ["IoT", "Arduino", "Network Configuration", "JavaScript", "Team Collaboration"],
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555664373-7b5778b81f57?w=1200&h=800&fit=crop&auto=format",
    ],
  },
  {
    id: "exp-3",
    company: "CCTV & Network Installation",
    position: "Field Installation Technician",
    location: "Karawang Region, Indonesia",
    date: "Aug 2025 – Nov 2025",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop&auto=format",
    description:
      "Performed professional CCTV and network infrastructure installations across multiple client sites, ensuring proper configuration and system verification.",
    responsibilities: [
      "Installed and configured CCTV surveillance systems",
      "Set up network infrastructure including switches and routers",
      "Performed structured cabling and cable management",
      "Conducted system testing and client handover",
    ],
    skills: ["Network Configuration", "CCTV Installation", "Structured Cabling", "Technical Communication"],
    gallery: [
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&auto=format",
    ],
  },
];

export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  category: string;
  tech: string[];
  image: string;
  github: string | null;
  demo: string | null;
  problem: string;
  solution: string;
  features: string[];
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Asteria Riksa Uji Integrated",
    description:
      "Integrated web application for managing inspection and testing processes — streamlining operations, documenting results, and generating reports.",
    role: "Full Stack Developer",
    category: "Web Application",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "PHP"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=500&fit=crop&auto=format",
    github: "https://github.com/amirulsandina",
    demo: null,
    problem:
      "The inspection workflow was managed manually through spreadsheets, causing data inconsistency and delayed reporting.",
    solution:
      "Built a centralized web platform to manage inspection records, assign tasks, track status, and generate PDF reports automatically.",
    features: [
      "Inspection record management",
      "User role & permission system",
      "PDF report generation",
      "Real-time status dashboard",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format",
    ],
  },
  {
    id: "proj-2",
    name: "IoT Monitoring Dashboard",
    description:
      "Real-time web dashboard for monitoring IoT sensor data with live readings, historical charts, and device health status.",
    role: "Developer",
    category: "IoT / Web",
    tech: ["JavaScript", "React", "Node.js", "MQTT"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
    github: "https://github.com/amirulsandina",
    demo: null,
    problem:
      "IoT devices lacked a unified monitoring interface, making it difficult to track system health and sensor values remotely.",
    solution:
      "Developed a responsive dashboard with real-time data visualization, alert notifications, and device management.",
    features: [
      "Real-time sensor data display",
      "Historical data charts",
      "Device health monitoring",
      "Alert notifications",
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop&auto=format",
    ],
  },
  {
    id: "proj-3",
    name: "Campus Information System",
    description:
      "Web-based platform for managing campus activities, announcements, and student organization events with role-based access.",
    role: "System Analyst & Developer",
    category: "Web Application",
    tech: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop&auto=format",
    github: "https://github.com/amirulsandina",
    demo: null,
    problem:
      "Campus event information was scattered across multiple channels, leading to missed announcements and poor coordination.",
    solution:
      "Centralized platform with event management, announcements, and member coordination with role-based access control.",
    features: ["Event management", "Announcement system", "Member management", "Role-based access"],
    screenshots: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format",
    ],
  },
];

export interface Achievement {
  id: string;
  title: string;
  event: string;
  organizer: string;
  date: string;
  position: string;
  positionColor: "gold" | "silver" | "bronze" | "blue";
  description: string;
  role: string;
  image: string;
  gallery: string[];
}

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "2nd Place — Business Plan Competition",
    event: "COMFAIR 2025",
    organizer: "Universitas XYZ",
    date: "November 2025",
    position: "2nd Place",
    positionColor: "silver",
    description:
      "Competed against 40+ teams in a national-level business plan competition, presenting an innovative digital solution for SME supply chain management.",
    role: "Team Leader & Presenter",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16d5?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16d5?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop&auto=format",
    ],
  },
  {
    id: "ach-2",
    title: "Best Project — Campus Tech Exhibition",
    event: "EXPO TEKNOLOGI 2025",
    organizer: "Universitas Singaperbangsa Karawang",
    date: "September 2025",
    position: "Best Project",
    positionColor: "gold",
    description:
      "IoT monitoring project recognized as Best Project at the campus technology exhibition for its practical application and technical implementation.",
    role: "Project Lead",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop&auto=format",
    ],
  },
  {
    id: "ach-3",
    title: "Cisco Network Fundamentals Certificate",
    event: "Cisco NetAcad",
    organizer: "Cisco",
    date: "August 2025",
    position: "Certified",
    positionColor: "blue",
    description:
      "Completed Cisco's Introduction to Networks course, earning certification in networking fundamentals including protocols, IP addressing, and configuration.",
    role: "Individual",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&auto=format",
    ],
  },
];

export interface Activity {
  id: string;
  title: string;
  category: "Work" | "Project" | "Organization" | "Competition" | "Campus" | "Other";
  date: string;
  location: string;
  description: string;
  image: string;
  gallery: string[];
  whatIDid: string;
  whatILearned: string;
  skillsUsed: string[];
}

export const activities: Activity[] = [
  {
    id: "act-1",
    title: "IoT Device Staging & Testing",
    category: "Work",
    date: "Dec 2025 – Mar 2026",
    location: "Karawang, Indonesia",
    description:
      "Documentation of IoT device staging, configuration, and field testing activities for the BGN IoT infrastructure project.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555664373-7b5778b81f57?w=1200&h=800&fit=crop&auto=format",
    ],
    whatIDid:
      "Set up, configured, and tested IoT sensor devices in the field. Verified connectivity, calibrated sensors, and documented technical specifications.",
    whatILearned:
      "Hands-on experience with IoT hardware, field deployment challenges, and the importance of thorough documentation.",
    skillsUsed: ["IoT Staging", "Device Testing", "Network Configuration", "Team Collaboration"],
  },
  {
    id: "act-2",
    title: "CCTV System Installation",
    category: "Work",
    date: "Aug 2025 – Nov 2025",
    location: "Karawang Region, Indonesia",
    description:
      "Professional installation of CCTV surveillance systems at multiple client locations, including cable routing, camera positioning, and DVR configuration.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&auto=format",
    ],
    whatIDid:
      "Performed site surveys, planned camera placement, installed cabling, and configured DVR/NVR systems.",
    whatILearned:
      "Technical skills in surveillance systems, client communication, and professional installation standards.",
    skillsUsed: ["CCTV Installation", "Structured Cabling", "Technical Communication"],
  },
  {
    id: "act-3",
    title: "Business Plan Competition — COMFAIR 2025",
    category: "Competition",
    date: "November 2025",
    location: "Karawang, Indonesia",
    description:
      "Led a team at COMFAIR 2025 Business Plan Competition presenting an innovative digital solution. Achieved 2nd place among 40+ teams.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16d5?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16d5?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop&auto=format",
    ],
    whatIDid:
      "Led team research, designed the business model, prepared financial projections, and delivered the pitch presentation.",
    whatILearned:
      "Business planning, presentation skills, competitive pitching, and collaborative problem-solving under pressure.",
    skillsUsed: ["Project Coordination", "Analytical Thinking", "Technical Communication", "Team Collaboration"],
  },
  {
    id: "act-4",
    title: "Campus Student Council — Active Member",
    category: "Organization",
    date: "2024 – 2025",
    location: "UNSIKA, Karawang",
    description:
      "Active member of the campus student council, organizing events, coordinating student activities, and representing the Information Systems department.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=800&fit=crop&auto=format",
    ],
    whatIDid:
      "Organized department events, coordinated inter-department activities, and managed logistics for workshops and seminars.",
    whatILearned:
      "Event management, team coordination, public communication, and organizational leadership.",
    skillsUsed: ["Project Coordination", "Task Management", "Team Collaboration", "Critical Thinking"],
  },
  {
    id: "act-5",
    title: "Web Development Workshop",
    category: "Campus",
    date: "July 2025",
    location: "UNSIKA, Karawang",
    description:
      "Participated in a hands-on workshop on modern JavaScript frameworks, focusing on React and responsive design principles.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=800&fit=crop&auto=format",
    ],
    whatIDid:
      "Attended workshops, completed coding exercises, and built a mini project as part of the course deliverables.",
    whatILearned:
      "Deepened knowledge in React, component architecture, and modern front-end development practices.",
    skillsUsed: ["JavaScript", "React", "Web Development", "Problem Solving"],
  },
  {
    id: "act-6",
    title: "Network Infrastructure Project",
    category: "Project",
    date: "September 2025",
    location: "Karawang, Indonesia",
    description:
      "Collaborated on a structured network cabling and configuration project, setting up LAN infrastructure for a small office environment.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&auto=format",
    ],
    whatIDid:
      "Designed network topology, performed cable installation and termination, configured network switches and routers.",
    whatILearned:
      "Practical networking skills, structured cabling standards, and the importance of documentation.",
    skillsUsed: ["Network Configuration", "Structured Cabling", "Analytical Thinking"],
  },
];
