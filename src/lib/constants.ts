export const personalInfo = {
  name: "Dineth Perera",
  studentId: "E/21/291",
  university: "University of Peradeniya",
  department: "Electrical & Electronic Engineering",
  email: "dp18perera@gmail.com",
  github: "https://github.com/Dineth14",
  linkedin: "https://linkedin.com/in/dineth-perera",
  website: "https://dinethperera.com",
  racedayUrl: "https://raceday.lk",
  bio: "I'm an Electrical & Electronic Engineering undergraduate at the University of Peradeniya, Sri Lanka, working at the intersection of signal processing, computer vision, and remote sensing AI. My research on UrbanMamba — a dual-encoder semantic segmentation architecture combining VMamba and NSST texture analysis — has been accepted to IEEE IGARSS 2026. Beyond research, I founded raceday.lk, Sri Lanka's premier motorsport and car culture media brand.",
  tagline: "Research Engineer · IEEE Author · Founder",
};

export const researchAreas = [
  {
    title: "Remote Sensing & Semantic Segmentation",
    description:
      "Deep learning approaches for urban scene understanding from aerial/satellite imagery. Focus on LoveDA and ISPRS Potsdam datasets with state-of-the-art Mamba-based architectures.",
    icon: "satellite",
    tags: ["VMamba", "Mamba-SSM", "Semantic Seg"],
  },
  {
    title: "Signal Processing & Texture Analysis",
    description:
      "Non-Subsampled Shearlet Transform (NSST) for multi-scale texture feature extraction. Illumination-robust preprocessing using Retinex theory for enhanced remote sensing inputs.",
    icon: "waveform",
    tags: ["NSST", "Retinex", "Feature Extraction"],
  },
  {
    title: "Embedded Systems & Edge AI",
    description:
      "Real-time audio classification on ESP32 microcontrollers, FreeRTOS task scheduling, and edge inference pipelines. Bridging research to practical hardware deployments.",
    icon: "chip",
    tags: ["ESP32", "FreeRTOS", "k-NN"],
  },
];

export const projects = [
  {
    name: "UrbanMamba — Mamba-Segmentation Benchmark",
    category: "RESEARCH",
    description:
      "Controlled benchmark comparing VMamba, MambaVision, Spatial-Mamba, CNN DeepLabv3+, and UNetFormer on LoveDA and ISPRS Potsdam under a unified pipeline.",
    tech: ["PyTorch", "VMamba", "Python", "LoveDA", "NSST"],
    github: "https://github.com/Dineth14",
    status: "ACTIVE",
    featured: true,
    stars: "--",
  },
  {
    name: "ESP32 Real-Time Noise Logger",
    category: "EMBEDDED",
    description:
      "Complete system for real-time audio classification on ESP32 microcontroller with offline k-NN classifier and Python GUI for monitoring and labeling.",
    tech: ["ESP32", "C++", "Python", "k-NN", "GUI"],
    github: "https://github.com/Dineth14/ESP32-Real-Time-Noise-Logger",
    status: "COMPLETE",
    featured: false,
    stars: "--",
  },
  {
    name: "Power Electronics Simulator",
    category: "TOOLS",
    description:
      "Open-source Python repository with Plotly Dash dashboard. Physics-correct ODE solvers for converter families with oscilloscope-grade theming.",
    tech: ["Python", "Dash", "Plotly", "ODE Solvers", "Power Electronics"],
    github: "https://github.com/Dineth14",
    status: "COMPLETE",
    featured: false,
    stars: "--",
  },
  {
    name: "raceday.lk",
    category: "WEB",
    description:
      "Sri Lanka's premier motorsport and car enthusiast media brand. Race coverage, car reviews, and community platform for the local motorsport scene.",
    tech: ["Next.js", "React", "Motorsport", "Media"],
    url: "https://raceday.lk",
    status: "LIVE",
    featured: true,
    stars: "--",
  },
  {
    name: "Interactive EE Textbook Suite",
    category: "WEB",
    description:
      "Browser-based interactive textbooks for Control Systems, Electromagnetics, Communication Systems, and Power Engineering with live simulations.",
    tech: ["React", "Three.js", "LaTeX", "Simulation"],
    github: "https://github.com/Dineth14",
    status: "IN PROGRESS",
    featured: false,
    stars: "--",
  },
  {
    name: "Two-Factor Auth FSM (AVR Assembly)",
    category: "EMBEDDED",
    description:
      "Two-factor authentication state machine implemented in AVR Assembly for Arduino/AVR microcontroller platforms.",
    tech: ["AVR Assembly", "Arduino", "FSM", "Security"],
    github: "https://github.com/Dineth14",
    status: "COMPLETE",
    featured: false,
    stars: "--",
  },
];

export const awards = [
  {
    title: "IEEE IGARSS 2026 — Paper Accepted",
    org: "IEEE International Geoscience and Remote Sensing Symposium",
    year: 2026,
    description:
      'UrbanMamba: Dual-Encoder Semantic Segmentation for Remote Sensing via VMamba and NSST. Attending for advisor networking & PhD outreach. Washington D.C., 2026.',
    featured: true,
  },
  {
    title: "University of Peradeniya — Strong Academic Standing",
    org: "University of Peradeniya",
    year: 2021,
    description:
      "Maintaining target GPA of 3.9 across EE curriculum including power systems, DSP, embedded systems, and electromagnetics.",
    featured: false,
  },
  {
    title: "IGARSS 2026 Conference Presenter",
    org: "IEEE IGARSS 2026, Washington D.C.",
    year: 2026,
    description:
      "Presenting UrbanMamba research at the world's premier remote sensing conference, IEEE IGARSS 2026, Washington D.C.",
    featured: false,
  },
  {
    title: "raceday.lk — Founder & Chief",
    org: "raceday.lk",
    year: 2023,
    description:
      "Built and maintaining Sri Lanka's dedicated motorsport media brand from scratch.",
    featured: false,
  },
];

export const beyond = [
  {
    title: "Cars & Speed",
    description:
      "Every great engineer knows the satisfaction of a perfectly tuned system. For me, that's a well-sorted car on a challenging road.",
    icon: "tachometer",
  },
  {
    title: "Embedded Systems Tinkering",
    description:
      "Where research meets hardware — building physical systems that respond to the real world.",
    icon: "circuit",
  },
  {
    title: "Teaching & Knowledge Sharing",
    description:
      "Built interactive textbook simulations for EE courses. Learning is better when you can play with the system.",
    icon: "knowledge",
  },
];

export const skills = {
  large: ["Python", "PyTorch", "Remote Sensing", "MATLAB"],
  medium: ["GLSL/Shaders", "React", "Next.js", "LaTeX", "FreeRTOS"],
  small: ["C/C++", "VHDL", "AVR Assembly", "Embedded Systems"],
};

export const timeline = [
  { year: 2021, event: "Enrolled, University of Peradeniya EE" },
  { year: 2023, event: "Founded raceday.lk" },
  { year: 2024, event: "IEEE IGARSS 2026 paper accepted (UrbanMamba)" },
  { year: 2025, event: "Targeting PhD applications" },
];
