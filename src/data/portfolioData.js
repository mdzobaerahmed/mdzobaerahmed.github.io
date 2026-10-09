export const profileData = {
  name: "Md. Zobaer Ahmed",
  monogram: "MZA // Code + Lens",
  roleHeadline: "CS Undergrad, Aspiring Product Manager, Digital PM Trainee, Photographer",
  status: "Available for Software/PM Internships & Editorial Photography",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  coordinates: "23.7639° N, 90.4190° E",
  email: "mdzobaerahmed31@gmail.com",
  phone: "+8801783503006",
  cvUrl: "/Academic_CV.pdf",
  portraitUrl: "/profile.jpg",
  aboutUrl: "/about.jpg",
  activeCommit: {
    hash: "z8b3e9a",
    branch: "main",
    message: "feat(workly): implement real-time chat with Prisma & WebSockets",
    timestamp: "8m ago",
    status: "clean"
  },
  stats: {
    gpa: "5.00 / 5.00 (HSC & SSC)",
    currentTrimester: "UIU CSE (10th Trimester)",
    photoExhibitions: "Greece & Scotland",
    cameraBody: "Fujifilm X-T5",
    primeOptic: "XF 35mm f/1.4 R"
  },
  bio: `Computer Science undergraduate at United International University with a strong focus on Product Management. Completing a Digital Product Management program and seeking internship opportunities to apply learning in real projects. Long-term goal: combine CSE background and PM skills to build impactful technology products for Bangladesh.`
};

export const engineeringProjects = [
  {
    id: "workly",
    title: "Workly (Freelance Marketplace)",
    category: "Full-Stack & Backend Systems",
    tagline: "Comprehensive backend system for a freelance marketplace featuring authentication, real-time chat & user dashboards",
    stars: 32,
    forks: 8,
    language: "Node.js / Express.js / TypeScript / Prisma",
    problemStatement: 
      "Freelance platforms demand secure multi-role access control, low-latency messaging between clients and freelancers, and reliable proposal tracking.",
    architectureOverview: 
      "Developed a comprehensive backend system for a freelance marketplace featuring authentication, real-time chat, job postings, proposals, quizzes, and user dashboards.",
    metrics: [
      { label: "Backend", value: "Node.js / Express" },
      { label: "Language", value: "TypeScript" },
      { label: "Database ORM", value: "Prisma ORM" },
      { label: "Real-Time", value: "WebSockets" }
    ],
    techStack: ["Node.js", "Express.js", "TypeScript", "Prisma"],
    githubUrl: "https://github.com/mdzobaerahmed/Workly",
    demoUrl: "https://github.com/mdzobaerahmed/Workly",
    featured: true,
    codeSnippet: `// Workly Real-Time Chat & Proposal Service
export const handleMessageDispatch = async (req: AuthRequest, res: Response) => {
  const { recipientId, content } = req.body;
  const message = await prisma.message.create({
    data: {
      senderId: req.user.id,
      recipientId,
      content,
      readStatus: false
    }
  });
  io.to(recipientId).emit("receive_message", message);
  return res.status(201).json(message);
};`
  },
  {
    id: "opportunity-hub",
    title: "OpportunityHub",
    category: "Web Application & Database",
    tagline: "Centralized web portal to track jobs, internships, and global scholarships with relational data management",
    stars: 24,
    forks: 5,
    language: "PHP / MySQL / JavaScript / CSS",
    problemStatement: 
      "Students face fragmented sources when searching for scholarships and internships, leading to missed application deadlines and poor tracking.",
    architectureOverview: 
      "Developed a centralized web portal to track jobs, internships, and global scholarships, featuring dynamic opportunity filtering, user bookmarking, and relational data management.",
    metrics: [
      { label: "Server", value: "PHP" },
      { label: "Database", value: "MySQL Relational" },
      { label: "Client Layer", value: "JavaScript / CSS / HTML" },
      { label: "Architecture", value: "MVC Pattern" }
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "CSS", "HTML"],
    githubUrl: "https://github.com/mdzobaerahmed/OpportunityHub",
    demoUrl: "https://github.com/mdzobaerahmed/OpportunityHub",
    featured: true,
    codeSnippet: `<?php
// OpportunityHub Dynamic Filter Engine
$category = mysqli_real_escape_string($conn, $_GET['category'] ?? 'all');
$query = "SELECT * FROM opportunities WHERE deadline >= CURDATE()";
if ($category !== 'all') {
    $query .= " AND type = '$category'";
}
$query .= " ORDER BY deadline ASC";
$result = mysqli_query($conn, $query);
?>`
  },
  {
    id: "chat-system",
    title: "Multi-Client Chat System",
    category: "Computer Networks & Socket Programming",
    tagline: "Real-time multi-threaded chat server supporting broadcast, private direct messaging & session tracking",
    stars: 18,
    forks: 4,
    language: "Python / Socket Programming / TCP/IP",
    problemStatement: 
      "Concurrent network communication requires thread synchronization and clean socket serialization to handle multiple client connections simultaneously.",
    architectureOverview: 
      "Developed a real-time multi-threaded chat server supporting broadcast, private direct messaging, group conversations, and dynamic active user session tracking.",
    metrics: [
      { label: "Protocol", value: "TCP/IP Sockets" },
      { label: "Concurrency", value: "Multithreading" },
      { label: "Language", value: "Python" },
      { label: "Features", value: "Broadcast & Private DM" }
    ],
    techStack: ["Python", "Socket Programming", "Multithreading", "TCP/IP"],
    githubUrl: "https://github.com/mdzobaerahmed/Computer-Networks-Socket-Programming",
    demoUrl: "https://github.com/mdzobaerahmed/Computer-Networks-Socket-Programming",
    featured: false,
    codeSnippet: `# Multi-Threaded TCP Socket Server
import socket, threading

def handle_client(client_socket, client_address):
    while True:
        try:
            message = client_socket.recv(1024).decode('utf-8')
            if not message: break
            broadcast(message, client_socket)
        except ConnectionResetError:
            break
    remove_client(client_socket)`
  },
  {
    id: "livestock-manager",
    title: "Livestock Manager",
    category: "System Analysis & Design",
    tagline: "Project proposal and LaTeX architectural documentation for a farm management system",
    stars: 12,
    forks: 2,
    language: "LaTeX / UML / System Design",
    problemStatement: 
      "Complex agricultural operations require formal system modeling, functional requirement decomposition, and domain diagrams prior to software development.",
    architectureOverview: 
      "Authored project proposal and LaTeX documentation for a farm management system as part of the System Analysis & Design Laboratory.",
    metrics: [
      { label: "Documentation", value: "LaTeX Typesetting" },
      { label: "Modeling", value: "UML Diagrams" },
      { label: "Curriculum", value: "UIU SAD Lab" },
      { label: "Scope", value: "Farm Management" }
    ],
    techStack: ["LaTeX", "UML", "System Design"],
    githubUrl: "https://github.com/mdzobaerahmed",
    demoUrl: "https://github.com/mdzobaerahmed",
    featured: false,
    codeSnippet: `% Livestock Manager Architecture Specification
\\section{System Analysis \\& Design}
\\subsection{Domain Architecture}
The Livestock Manager coordinates animal health registries,
vaccination schedules, and yield tracking across farm sectors.`
  }
];

export const photographyGallery = [
  {
    id: "photo-1",
    title: "Street Story I",
    category: "Street",
    location: "Dhaka, Bangladesh",
    coordinates: "23.7639° N, 90.4190° E",
    year: "2025",
    aspect: "vertical",
    imageUrl: "/photos/street_01.jpg",
    exif: {
      camera: "Fujifilm X-T5",
      lens: "Fujinon XF 35mm f/1.4 R",
      focalLength: "35mm (53mm eq)",
      aperture: "f/1.4",
      shutterSpeed: "1/200s",
      iso: "200",
      exposureComp: "0.0 EV",
      filmSimulation: "Monochrome + Green Filter"
    },
    story: "Captured on the bustling streets of Dhaka. The morning light filtered through urban transit, creating a high-contrast threshold between human expressions and city architecture."
  },
  {
    id: "photo-1b",
    title: "Street Story II",
    category: "Street",
    location: "Dhaka, Bangladesh",
    coordinates: "23.7500° N, 90.3900° E",
    year: "2025",
    aspect: "horizontal",
    imageUrl: "/photos/street_02.jpg",
    exif: {
      camera: "Fujifilm X-T5",
      lens: "Fujinon XF 35mm f/1.4 R",
      focalLength: "35mm (53mm eq)",
      aperture: "f/2.0",
      shutterSpeed: "1/250s",
      iso: "320",
      exposureComp: "-0.3 EV",
      filmSimulation: "Acros Standard"
    },
    story: "Urban motion and evening transit silhouettes in Dhaka. Documenting the quiet moments of commuters amidst the dense pulse of the capital."
  },
  {
    id: "photo-2",
    title: "Architectural Form I",
    category: "Architecture",
    location: "Dhaka, Bangladesh",
    coordinates: "23.7925° N, 90.4078° E",
    year: "2025",
    aspect: "vertical",
    imageUrl: "/photos/arch_01.jpg",
    exif: {
      camera: "Fujifilm X-T5",
      lens: "Fujinon XF 18-55mm f/2.8-4 R",
      focalLength: "28mm",
      aperture: "f/8.0",
      shutterSpeed: "1/500s",
      iso: "100",
      exposureComp: "-0.7 EV",
      filmSimulation: "High-Contrast Monochrome"
    },
    story: "High-contrast structural geometry and angular concrete shadows. Exploring the repetitive Brutalist forms and clean vertical lines of contemporary Dhaka architecture."
  },
  {
    id: "photo-2b",
    title: "Architectural Form II",
    category: "Architecture",
    location: "Dhaka, Bangladesh",
    coordinates: "23.7808° N, 90.4152° E",
    year: "2025",
    aspect: "horizontal",
    imageUrl: "/photos/arch_02.jpg",
    exif: {
      camera: "Fujifilm X-T5",
      lens: "Fujinon XF 18-55mm f/2.8-4 R",
      focalLength: "24mm",
      aperture: "f/5.6",
      shutterSpeed: "1/400s",
      iso: "160",
      exposureComp: "0.0 EV",
      filmSimulation: "Classic Chrome Custom"
    },
    story: "Modern urban perspective showcasing glass reflection symmetry and dramatic sky balance. Awarded in national student exhibition curation."
  },
  {
    id: "photo-3",
    title: "Natural Elements I",
    category: "Landscape",
    location: "Bangladesh Coast",
    coordinates: "21.9864° N, 89.8406° E",
    year: "2025",
    aspect: "vertical",
    imageUrl: "/photos/nature_01.jpg",
    exif: {
      camera: "Fujifilm X-T5",
      lens: "Fujinon XF 50-140mm f/2.8 R WR",
      focalLength: "100mm (150mm eq)",
      aperture: "f/4.0",
      shutterSpeed: "1/320s",
      iso: "200",
      exposureComp: "-0.3 EV",
      filmSimulation: "Velvia Rich Tone"
    },
    story: "Natural landscape study highlighting textures, horizon mist, and the tranquil atmospheric depth of Bangladesh riverways and coastal geography."
  },
  {
    id: "photo-3b",
    title: "Natural Elements II",
    category: "Landscape",
    location: "Riverine Bengal",
    coordinates: "22.7010° N, 90.3535° E",
    year: "2025",
    aspect: "horizontal",
    imageUrl: "/photos/nature_02.jpg",
    exif: {
      camera: "Fujifilm X-T5",
      lens: "Fujinon XF 50-140mm f/2.8 R WR",
      focalLength: "100mm (150mm eq)",
      aperture: "f/5.6",
      shutterSpeed: "1/250s",
      iso: "160",
      exposureComp: "0.0 EV",
      filmSimulation: "Acros Black & White"
    },
    story: "Early morning riverbank scenery. Mist rising from the water while local fishermen navigate calm waters before sunrise."
  }
];

export const experienceTimeline = [
  {
    role: "IELTS Invigilator",
    company: "IDP Education Ltd",
    location: "Dhaka, Bangladesh",
    period: "Jan 2026 – Present",
    bullets: []
  },
  {
    role: "Vice President",
    company: "UIU Photography Club",
    location: "Dhaka, Bangladesh",
    period: "Jan 2026 – Sep 2026",
    bullets: [
      "Organized major events: Photo Carnival 23, Friday Exposure Exhibition and Shutter Stories: Chapter IV at UIU."
    ]
  },
  {
    role: "Brand Representative",
    company: "Interactive Cares",
    location: "Dhaka, Bangladesh",
    period: "May 2025 – Sep 2025",
    bullets: [
      "Represented the Interactive Cares brand at university and community events."
    ]
  },
  {
    role: "Executive Member",
    company: "Remains Art Club",
    location: "Dhaka, Bangladesh",
    period: "Feb 2020 – Mar 2021",
    bullets: [
      "Organized national fest \"Artsy Overlap 2021\" at Dhaka Residential Model College."
    ]
  }
];

export const educationList = [
  {
    degree: "B.Sc. in Computer Science and Engineering",
    statusBadge: "10th Trimester",
    institution: "United International University",
    location: "Dhaka, Bangladesh",
    description: "Undergraduate degree focusing on Product Management, Software Systems, and Networks.",
    focusAreas: ["Product Management", "Software Engineering", "System Analysis & Design", "Socket Programming"]
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    statusBadge: "2021",
    institution: "Dhaka Residential Model College",
    location: "Dhaka, Bangladesh",
    description: "Science Group. GPA: 5.00/5.00"
  },
  {
    degree: "Secondary School Certificate (SSC)",
    statusBadge: "2019",
    institution: "Chairman Bazar Secondary School",
    location: "Barisal, Bangladesh",
    description: "Science Group. GPA: 5.00/5.00"
  }
];

export const certificationsAndAwards = [
  {
    category: "AWARDS",
    title: "Winner",
    issuer: "Life at UIU Photography Contest (2024)",
    year: "2024",
    type: "Award",
    description: "Awarded top place for exceptional street photography capturing campus life dynamics."
  },
  {
    category: "AWARDS",
    title: "Winner - Camera Photography (Senior Category)",
    issuer: "Reflection 3.0 National GSCPC Photography Festival",
    year: "2024",
    type: "Award",
    description: "Won first prize in the national-level camera category for creative street compositions."
  },
  {
    category: "AWARDS",
    title: "1st Runner-up",
    issuer: "Nature Through Your Lens, 3rd DRMC National Nature Festival (Nov 2024)",
    year: "2024",
    type: "Award",
    description: "Achieved runner-up prize for landscape compositions highlighting natural geometry."
  },
  {
    category: "EXHIBITIONS",
    title: "International Recognition",
    issuer: "Selected for exhibitions in Greece and Scotland (2024–2026)",
    year: "2024–2026",
    type: "International",
    description: "Photographs selected for curation in international exhibitions in Greece and Scotland."
  },
  {
    category: "SCHOLARSHIPS",
    title: "Government Scholarships",
    issuer: "PSC (2013), JSC (2016), SSC (2019)",
    year: "2013–2019",
    type: "Scholarship",
    description: "Academic merit scholarship awarded by the Government of Bangladesh for performance in examinations."
  },
  {
    category: "LEADERSHIP & FELLOWSHIP",
    title: "Aspire Leaders Program",
    issuer: "Aspire Institute, Harvard Business School",
    year: "2025",
    type: "Leadership",
    description: "Selected for global leadership development program founded by Harvard Business School faculty."
  }
];

export const certificationsData = [
  {
    title: "Digital Product Management Career Path",
    issuer: "Interactive Cares",
    year: "Oct 2025"
  },
  {
    title: "Aspire Leaders Program",
    issuer: "Aspire Institute, Harvard Business School",
    year: "2025"
  },
  {
    title: "Introduction to Digital Marketing",
    issuer: "Futurenation",
    year: "2024"
  },
  {
    title: "Fundamentals of Cybersecurity",
    issuer: "Ostad",
    year: "2024"
  }
];

export const cvSkills = {
  programming: ["C", "C++", "Python", "JavaScript", "PHP", "SQL", "NoSQL"],
  tools: ["MS Office", "Canva", "Adobe Lightroom", "Google Workspace"],
  softSkills: ["Team Management", "Event Organization", "Photography"],
  languages: ["Bangla (Native)", "English (Professional)"]
};

export const academicReferences = [
  {
    name: "Charles Aunkan Gomes",
    designation: "Lecturer, Dept. of CSE",
    institution: "United International University",
    email: "charles@cse.uiu.ac.bd"
  },
  {
    name: "Md Asique Iqbal",
    designation: "Lecturer, ICT",
    institution: "Dhaka Residential Model College",
    email: "asique.iqbaldrmc@gmail.com"
  }
];

export const gearAndTools = {
  softwareEngineering: [
    { category: "Programming Languages", items: ["C", "C++", "Python", "JavaScript", "PHP", "SQL", "NoSQL"] },
    { category: "Frameworks & Backend", items: ["Node.js", "Express.js", "TypeScript", "Prisma", "WebSockets", "FastAPI"] },
    { category: "Tools & Workspace", items: ["MS Office", "Canva", "Adobe Lightroom", "Google Workspace", "Git & GitHub"] },
    { category: "Soft Skills & Management", items: ["Team Management", "Event Organization", "Product Roadmapping", "Photography"] },
    { category: "Languages", items: ["Bangla (Native)", "English (Professional)"] }
  ],
  photographicArsenal: [
    { category: "Camera Body", items: ["Fujifilm X-T5 (40MP X-Trans 5 HR)"] },
    { category: "Prime & Zoom Optics", items: ["Fujinon XF 35mm f/1.4 R (Primary)", "Fujinon XF 18-55mm f/2.8-4 R LM OIS", "Fujinon XF 50-140mm f/2.8 R LM OIS WR"] },
    { category: "Film Simulations & Profiles", items: ["Acros + Yellow / Green Filter", "Classic Chrome Custom Recipe", "Monochrome High-Contrast", "Velvia Vivid"] },
    { category: "Post-Processing & Darkroom", items: ["Adobe Lightroom Classic", "Adobe Photoshop", "Color Grading & LUT Science"] },
    { category: "Fine Art Print Papers", items: ["Hahnemühle Photo Rag Matte 308gsm", "Canson Baryta Prestige 340gsm"] }
  ]
};

export const socialLinks = [
  { name: "GitHub", handle: "@mdzobaerahmed", url: "https://github.com/mdzobaerahmed" },
  { name: "LinkedIn", handle: "in/mdzobaerahmed", url: "https://linkedin.com/in/mdzobaerahmed" },
  { name: "Facebook", handle: "mdzobaerahmed31", url: "https://www.facebook.com/mdzobaerahmed31" },
  { name: "Instagram", handle: "@mdzobaerahmed", url: "https://instagram.com/mdzobaerahmed" },
  { name: "Email", handle: "mdzobaerahmed31@gmail.com", url: "mailto:mdzobaerahmed31@gmail.com" }
];
