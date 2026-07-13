// Toggle this one flag to switch the whole app between:
//   true  -> mock mode: Register/Login work instantly with fake data,
//            no backend required at all.
//   false -> real mode: Register/Login call your actual backend API
//            at VITE_API_URL (defaults to http://localhost:5000/api).
//
// When your backend is ready, just flip this to false — no other
// code changes needed in RegisterPage/LoginPage.
export const MOCK_MODE = true;

// Small helper so mock user objects look consistent everywhere
// (dashboards, etc. can import this too later if needed).
export function buildMockUser({ name, email, mobile, role }) {
  return {
    id: `mock-${Date.now()}`,
    name: name || "Demo User",
    email: email || "demo@intexia.com",
    mobile: mobile || "",
    role: role || "student",
  };
}

export function buildMockTokens() {
  return {
    token: `mock-token-${Date.now()}`,
    refreshToken: `mock-refresh-${Date.now()}`,
  };
}

// ==========================================
// COURSE & PROGRESS MOCK DATA
// ==========================================

export const mockCourses = [
  {
    id: 1,
    title: "Cyber Security",
    tag: "Security",
    description: "Master the fundamentals of network security, threat intelligence, and digital defense strategies to protect systems from cyber attacks.",
    totalLessons: 12,
    duration: "8h 30m",
    difficulty: "Beginner",
    instructor: "Dr. Sarah Jenkins, Chief Security Officer",
    skills: ["Network Security", "Threat Analysis", "Ethical Hacking", "Penetration Testing", "Malware Detection", "Cyber Defense"],
    modules: [
      { id: "1-1", title: "Introduction to Cybersecurity", duration: "45m" },
      { id: "1-2", title: "Network Protocols and Hardening", duration: "1h 15m" },
      { id: "1-3", title: "Understanding Threat Vectors", duration: "1h 0m" },
      { id: "1-4", title: "Firewalls and Honeypots", duration: "50m" },
      { id: "1-5", title: "Incidence Response Planning", duration: "1h 10m" },
      { id: "1-6", title: "Cryptographic Fundamentals", duration: "1h 20m" },
      { id: "1-7", title: "Identity and Access Management", duration: "40m" },
      { id: "1-8", title: "Vulnerability Scanning", duration: "55m" },
      { id: "1-9", title: "Intrusion Detection Systems", duration: "1h 05m" },
      { id: "1-10", title: "Security Auditing Basics", duration: "50m" },
      { id: "1-11", title: "Cloud Security Concepts", duration: "1h 00m" },
      { id: "1-12", title: "Cybersecurity Certification Prep", duration: "1h 15m" }
    ]
  },
  {
    id: 2,
    title: "Ethical Hacking",
    tag: "Hacking",
    description: "Learn advanced penetration testing, system exploitation, and vulnerability assessment techniques to think like a hacker and defend like a pro.",
    totalLessons: 18,
    duration: "12h 45m",
    difficulty: "Intermediate",
    instructor: "Marcus Vance, Certified Ethical Hacker",
    skills: ["Penetration Testing", "Vulnerability Assessment", "Footprinting", "Social Engineering", "Wireless Security", "Web App Hacking"],
    modules: [
      { id: "2-1", title: "Ethical Hacking Methodologies", duration: "40m" },
      { id: "2-2", title: "Reconnaissance & Footprinting", duration: "1h 05m" },
      { id: "2-3", title: "Scanning Networks (Nmap)", duration: "1h 15m" },
      { id: "2-4", title: "Enumeration and OS Fingerprinting", duration: "55m" },
      { id: "2-5", title: "Vulnerability Analysis Concepts", duration: "50m" },
      { id: "2-6", title: "System Hacking & Password Cracking", duration: "1h 30m" },
      { id: "2-7", title: "Malware Threats & Trojans", duration: "1h 10m" },
      { id: "2-8", title: "Packet Sniffing and Wireshark", duration: "1h 00m" },
      { id: "2-9", title: "Social Engineering Attacks", duration: "45m" },
      { id: "2-10", title: "Denial of Service (DoS/DDoS)", duration: "50m" },
      { id: "2-11", title: "Session Hijacking Techniques", duration: "1h 00m" },
      { id: "2-12", title: "Evading IDS, Firewalls, and Honeypots", duration: "1h 15m" },
      { id: "2-13", title: "SQL Injection Attacks", duration: "1h 20m" },
      { id: "2-14", title: "Hacking Web Servers & Web Apps", duration: "1h 30m" },
      { id: "2-15", title: "Wireless Network Security Hacking", duration: "1h 05m" },
      { id: "2-16", title: "Mobile Platform Attack Vectors", duration: "55m" },
      { id: "2-17", title: "IoT and OT Hacking Introduction", duration: "1h 00m" },
      { id: "2-18", title: "Cryptography & Hashing Algorithms", duration: "1h 10m" }
    ]
  },
  {
    id: 3,
    title: "Python Programming",
    tag: "AI & Development",
    description: "Master Python programming from scratch, with a focus on data science, artificial intelligence models, automation scripts, and machine learning pipelines.",
    totalLessons: 20,
    duration: "15h 15m",
    difficulty: "Beginner",
    instructor: "Prof. Alan Turing, Data Scientist",
    skills: ["Python Basics", "Numpy & Pandas", "Machine Learning", "Neural Networks", "TensorFlow / PyTorch", "AI Deployment"],
    modules: [
      { id: "3-1", title: "Introduction to Python and Setup", duration: "35m" },
      { id: "3-2", title: "Variables, Data Types, and Operators", duration: "45m" },
      { id: "3-3", title: "Control Flow: Loops and Conditionals", duration: "55m" },
      { id: "3-4", title: "Functions and Scope", duration: "1h 00m" },
      { id: "3-5", title: "Data Structures: Lists, Dicts, Tuples", duration: "1h 10m" },
      { id: "3-6", title: "File Input/Output Operations", duration: "40m" },
      { id: "3-7", title: "Object-Oriented Programming in Python", duration: "1h 20m" },
      { id: "3-8", title: "Modules, Packages, and pip", duration: "50m" },
      { id: "3-9", title: "Error Handling & Exception Management", duration: "45m" },
      { id: "3-10", title: "Regular Expressions and String Parsing", duration: "55m" },
      { id: "3-11", title: "Introduction to NumPy library", duration: "1h 05m" },
      { id: "3-12", title: "Data Manipulation with Pandas", duration: "1h 20m" },
      { id: "3-13", title: "Data Visualization (Matplotlib/Seaborn)", duration: "1h 10m" },
      { id: "3-14", title: "Intro to Machine Learning with Scikit-Learn", duration: "1h 30m" },
      { id: "3-15", title: "Supervised vs Unsupervised Learning", duration: "1h 15m" },
      { id: "3-16", title: "Building a Simple Classification Model", duration: "1h 10m" },
      { id: "3-17", title: "Introduction to Neural Networks", duration: "1h 25m" },
      { id: "3-18", title: "Deep Learning with TensorFlow/PyTorch", duration: "1h 40m" },
      { id: "3-19", title: "Deploying Python AI Models", duration: "1h 05m" },
      { id: "3-20", title: "Capstone Python Project Presentation", duration: "1h 30m" }
    ]
  }
];

export function getMockEnrolled() {
  const stored = localStorage.getItem("lms_mock_enrolled");
  if (!stored) {
    const initial = [1, 2];
    localStorage.setItem("lms_mock_enrolled", JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
}

export function enrollInCourse(courseId) {
  const enrolled = getMockEnrolled();
  const numericId = parseInt(courseId);
  if (!enrolled.includes(numericId)) {
    enrolled.push(numericId);
    localStorage.setItem("lms_mock_enrolled", JSON.stringify(enrolled));
  }
  const progress = getMockProgress();
  if (!progress[numericId]) {
    progress[numericId] = [];
    localStorage.setItem("lms_mock_progress", JSON.stringify(progress));
  }
  return {
    completedLessons: progress[numericId].length,
    data: progress[numericId]
  };
}

export function getMockProgress() {
  const stored = localStorage.getItem("lms_mock_progress");
  if (!stored) {
    const initial = {
      1: ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8"],
      2: ["2-1", "2-2", "2-3", "2-4", "2-5", "2-6"]
    };
    localStorage.setItem("lms_mock_progress", JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
}

export function getCourseProgress(courseId) {
  const enrolled = getMockEnrolled();
  const numericId = parseInt(courseId);
  if (!enrolled.includes(numericId)) {
    return null;
  }
  const progress = getMockProgress();
  const completedIds = progress[numericId] || [];
  return {
    completedLessons: completedIds.length,
    data: completedIds
  };
}

export function toggleModuleComplete(courseId, moduleId, completed) {
  const numericId = parseInt(courseId);
  const progress = getMockProgress();
  if (!progress[numericId]) {
    progress[numericId] = [];
  }
  const completedIds = progress[numericId];
  if (completed) {
    if (!completedIds.includes(moduleId)) {
      completedIds.push(moduleId);
    }
  } else {
    progress[numericId] = completedIds.filter(id => id !== moduleId);
  }
  localStorage.setItem("lms_mock_progress", JSON.stringify(progress));
  return {
    completedLessons: progress[numericId].length,
    data: progress[numericId]
  };
}

export function getMockCertificates() {
  const enrolled = getMockEnrolled();
  const progress = getMockProgress();
  
  const certs = [
    {
      id: "cert-mock-1",
      course: { id: 99, title: "Network Defense Essentials" },
      issuedAt: "2026-05-10T12:00:00.000Z"
    },
    {
      id: "cert-mock-2",
      course: { id: 98, title: "Intro to Penetration Testing" },
      issuedAt: "2026-06-15T12:00:00.000Z"
    }
  ];

  enrolled.forEach(courseId => {
    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      const completedIds = progress[courseId] || [];
      if (completedIds.length === course.modules.length && course.modules.length > 0) {
        certs.push({
          id: `cert-course-${courseId}`,
          course: { id: course.id, title: course.title },
          issuedAt: new Date().toISOString()
        });
      }
    }
  });

  return certs;
}

export function handleMockRequest(path, options) {
  const method = (options.method || "GET").toUpperCase();

  // 1. GET /courses
  if (path === "/courses" && method === "GET") {
    return new Response(JSON.stringify(mockCourses), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 2. GET /courses/enrolled
  if (path === "/courses/enrolled" && method === "GET") {
    const enrolledIds = getMockEnrolled();
    const enrolled = mockCourses.filter(c => enrolledIds.includes(c.id));
    return new Response(JSON.stringify(enrolled), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 3. GET /courses/certificates
  if (path === "/courses/certificates" && method === "GET") {
    const certs = getMockCertificates();
    return new Response(JSON.stringify(certs), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 4. GET /courses/:id
  const courseMatch = path.match(/^\/courses\/([^/]+)$/);
  if (courseMatch && method === "GET") {
    const id = parseInt(courseMatch[1]);
    const course = mockCourses.find(c => c.id === id);
    if (course) {
      return new Response(JSON.stringify(course), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: "Course not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // 5. GET or POST /courses/:id/progress
  const progressMatch = path.match(/^\/courses\/([^/]+)\/progress$/);
  if (progressMatch) {
    const id = parseInt(progressMatch[1]);
    if (method === "GET") {
      const prog = getCourseProgress(id);
      return new Response(JSON.stringify(prog), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "POST") {
      const body = JSON.parse(options.body || "{}");
      const { moduleId, completed } = body;
      const updatedProg = toggleModuleComplete(id, moduleId, completed);
      return new Response(JSON.stringify(updatedProg), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // 6. POST /courses/:id/enroll
  const enrollMatch = path.match(/^\/courses\/([^/]+)\/enroll$/);
  if (enrollMatch && method === "POST") {
    const id = parseInt(enrollMatch[1]);
    const result = enrollInCourse(id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Default fallback for unhandled mock endpoints
  return new Response(JSON.stringify({ error: "Mock endpoint not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" }
  });
}