import { toastEmitter } from "./toastEmitter";

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
      { 
        id: "1-4", 
        title: "Firewalls and Honeypots", 
        duration: "50m",
        quiz: {
          quizId: "q-1-4",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "What is the primary function of a stateful firewall?",
              options: [
                "Logs user browsing history",
                "Monitors the state of active TCP connections",
                "Decrypts SSL payloads",
                "Blocks physical ethernet ports"
              ],
              correctOptionIndex: 1
            },
            {
              id: "q2",
              question: "Which type of honeypot simulates production services to collect comprehensive intelligence?",
              options: [
                "Low-interaction honeypot",
                "High-interaction honeypot",
                "Physical honeypot",
                "Static honeypot"
              ],
              correctOptionIndex: 1
            },
            {
              id: "q3",
              question: "Which protocol operates on TCP port 443 by default?",
              options: [
                "HTTP",
                "HTTPS",
                "SSH",
                "FTP"
              ],
              correctOptionIndex: 1
            }
          ]
        }
      },
      { id: "1-5", title: "Incidence Response Planning", duration: "1h 10m" },
      { id: "1-6", title: "Cryptographic Fundamentals", duration: "1h 20m" },
      { id: "1-7", title: "Identity and Access Management", duration: "40m" },
      { 
        id: "1-8", 
        title: "Vulnerability Scanning", 
        duration: "55m",
        quiz: {
          quizId: "q-1-8",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "What does CVE stand for in vulnerability assessments?",
              options: [
                "Common Vulnerabilities and Exposures",
                "Critical Vulnerability Engine",
                "Central Virtual Exploits",
                "Common Vulnerabilities and Exploits"
              ],
              correctOptionIndex: 0
            },
            {
              id: "q2",
              question: "Which of the following operates as an active network vulnerability scanner?",
              options: [
                "Wireshark",
                "Nessus",
                "Snort",
                "Tcpdump"
              ],
              correctOptionIndex: 1
            }
          ]
        }
      },
      { id: "1-9", title: "Intrusion Detection Systems", duration: "1h 05m" },
      { id: "1-10", title: "Security Auditing Basics", duration: "50m" },
      { id: "1-11", title: "Cloud Security Concepts", duration: "1h 00m" },
      { 
        id: "1-12", 
        title: "Cybersecurity Certification Prep", 
        duration: "1h 15m",
        quiz: {
          quizId: "q-1-12",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "Which certification is widely considered the gold standard for security management?",
              options: [
                "CompTIA Security+",
                "CISSP",
                "CEH",
                "CISA"
              ],
              correctOptionIndex: 1
            },
            {
              id: "q2",
              question: "CompTIA Security+ primarily focuses on which skills?",
              options: [
                "Advanced penetration testing",
                "Core baseline security principles",
                "Database administration",
                "Software engineering"
              ],
              correctOptionIndex: 1
            }
          ]
        }
      }
    ],
    skillTree: [
      { id: "node-1-1", title: "Foundations", moduleIds: ["1-1", "1-2", "1-3", "1-4"], icon: "FiShield" },
      { id: "node-1-2", title: "Network Defense", moduleIds: ["1-5", "1-6", "1-7", "1-8"], icon: "FiLock" },
      { id: "node-1-3", title: "Threat Detection", moduleIds: ["1-9", "1-10", "1-11"], icon: "FiEye" },
      { id: "node-1-4", title: "Certification Ready", moduleIds: ["1-12"], icon: "FiAward" }
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
      { 
        id: "2-3", 
        title: "Scanning Networks (Nmap)", 
        duration: "1h 15m",
        quiz: {
          quizId: "q-2-3",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "Which Nmap switch enables OS detection?",
              options: ["-sV", "-O", "-sT", "-p-"],
              correctOptionIndex: 1
            },
            {
              id: "q2",
              question: "What does the -p- flag in Nmap do?",
              options: ["Scans only top 100 ports", "Scans all 65,535 ports", "Ping scan only", "Runs default scripts"],
              correctOptionIndex: 1
            }
          ]
        }
      },
      { id: "2-4", title: "Enumeration and OS Fingerprinting", duration: "55m" },
      { id: "2-5", title: "Vulnerability Analysis Concepts", duration: "50m" },
      { 
        id: "2-6", 
        title: "System Hacking & Password Cracking", 
        duration: "1h 30m",
        quiz: {
          quizId: "q-2-6",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "Which attack uses a list of pre-calculated password hashes?",
              options: ["Dictionary attack", "Rainbow Table attack", "Brute Force attack", "Social Engineering"],
              correctOptionIndex: 1
            },
            {
              id: "q2",
              question: "What is salting in password hashing?",
              options: ["Encrypting twice", "Adding random data to password before hashing", "Shortening the hash", "Exposing the salt to public access"],
              correctOptionIndex: 1
            }
          ]
        }
      },
      { id: "2-7", title: "Malware Threats & Trojans", duration: "1h 10m" },
      { id: "2-8", title: "Packet Sniffing and Wireshark", duration: "1h 00m" },
      { id: "2-9", title: "Social Engineering Attacks", duration: "45m" },
      { id: "2-10", title: "Denial of Service (DoS/DDoS)", duration: "50m" },
      { id: "2-11", title: "Session Hijacking Techniques", duration: "1h 00m" },
      { id: "2-12", title: "Evading IDS, Firewalls, and Honeypots", duration: "1h 15m" },
      { 
        id: "2-13", 
        title: "SQL Injection Attacks", 
        duration: "1h 20m",
        quiz: {
          quizId: "q-2-13",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "Which of the following is an example of an input payload that triggers an SQL injection tautology?",
              options: ["admin' AND '1'='2", "admin' OR '1'='1", "SELECT * FROM users", "DROP TABLE users"],
              correctOptionIndex: 1
            },
            {
              id: "q2",
              question: "How do you primarily defend against SQL Injection?",
              options: ["Enable HTTPS", "Use Parameterized Queries / Prepared Statements", "Install an Antivirus", "Increase password length"],
              correctOptionIndex: 1
            }
          ]
        }
      },
      { id: "2-14", title: "Hacking Web Servers & Web Apps", duration: "1h 30m" },
      { id: "2-15", title: "Wireless Network Security Hacking", duration: "1h 05m" },
      { id: "2-16", title: "Mobile Platform Attack Vectors", duration: "55m" },
      { id: "2-17", title: "IoT and OT Hacking Introduction", duration: "1h 00m" },
      { id: "2-18", title: "Cryptography & Hashing Algorithms", duration: "1h 10m" }
    ],
    skillTree: [
      { id: "node-2-1", title: "Recon & Info Gathering", moduleIds: ["2-1", "2-2", "2-3", "2-4", "2-5"], icon: "FiSearch" },
      { id: "node-2-2", title: "System Exploitation", moduleIds: ["2-6", "2-7", "2-8", "2-9", "2-10"], icon: "FiTerminal" },
      { id: "node-2-3", title: "Advanced Attacks", moduleIds: ["2-11", "2-12", "2-13", "2-14"], icon: "FiCpu" },
      { id: "node-2-4", title: "Mobile & IoT Defense", moduleIds: ["2-15", "2-16", "2-17", "2-18"], icon: "FiSmartphone" }
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
      { 
        id: "3-5", 
        title: "Data Structures: Lists, Dicts, Tuples", 
        duration: "1h 10m",
        quiz: {
          quizId: "q-3-5",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "Which Python data structure is mutable and ordered?",
              options: ["Tuple", "List", "Dictionary", "Set"],
              correctOptionIndex: 1
            },
            {
              id: "q2",
              question: "How do you add an element to the end of a List in Python?",
              options: [".add()", ".insert()", ".append()", ".push()"],
              correctOptionIndex: 2
            }
          ]
        }
      },
      { id: "3-6", title: "File Input/Output Operations", duration: "40m" },
      { id: "3-7", title: "Object-Oriented Programming in Python", duration: "1h 20m" },
      { id: "3-8", title: "Modules, Packages, and pip", duration: "50m" },
      { id: "3-9", title: "Error Handling & Exception Management", duration: "45m" },
      { id: "3-10", title: "Regular Expressions and String Parsing", duration: "55m" },
      { id: "3-11", title: "Introduction to NumPy library", duration: "1h 05m" },
      { 
        id: "3-12", 
        title: "Data Manipulation with Pandas", 
        duration: "1h 20m",
        quiz: {
          quizId: "q-3-12",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "What is the primary 2-dimensional data structure in Pandas?",
              options: ["Series", "DataFrame", "Matrix", "Panel"],
              correctOptionIndex: 1
            },
            {
              id: "q2",
              question: "Which method is used to read a CSV file into a DataFrame?",
              options: ["pd.read_file()", "pd.read_csv()", "pd.open_csv()", "pd.load_csv()"],
              correctOptionIndex: 1
            }
          ]
        }
      },
      { id: "3-13", title: "Data Visualization (Matplotlib/Seaborn)", duration: "1h 10m" },
      { id: "3-14", title: "Intro to Machine Learning with Scikit-Learn", duration: "1h 30m" },
      { id: "3-15", title: "Supervised vs Unsupervised Learning", duration: "1h 15m" },
      { id: "3-16", title: "Building a Simple Classification Model", duration: "1h 10m" },
      { id: "3-17", title: "Introduction to Neural Networks", duration: "1h 25m" },
      { 
        id: "3-18", 
        title: "Deep Learning with TensorFlow/PyTorch", 
        duration: "1h 40m",
        quiz: {
          quizId: "q-3-18",
          passingScore: 2,
          questions: [
            {
              id: "q1",
              question: "What is the role of an activation function in a neural network?",
              options: ["Normalizes weights", "Introduces non-linearity", "Minimizes cost functions", "Performs matrix dot multiplication"],
              correctOptionIndex: 1
            },
            {
              id: "q2",
              question: "Which optimizer is widely preferred for adaptive learning rates?",
              options: ["SGD", "Adam", "Adagrad", "RMSprop"],
              correctOptionIndex: 1
            }
          ]
        }
      },
      { id: "3-19", title: "Deploying Python AI Models", duration: "1h 05m" },
      { id: "3-20", title: "Capstone Python Project Presentation", duration: "1h 30m" }
    ],
    skillTree: [
      { id: "node-3-1", title: "Python Core", moduleIds: ["3-1", "3-2", "3-3", "3-4", "3-5"], icon: "FiCode" },
      { id: "node-3-2", title: "Data Science & Scripting", moduleIds: ["3-6", "3-7", "3-8", "3-9", "3-10", "3-11", "3-12", "3-13"], icon: "FiDatabase" },
      { id: "node-3-3", title: "Machine Learning Basics", moduleIds: ["3-14", "3-15", "3-16"], icon: "FiActivity" },
      { id: "node-3-4", title: "AI & Deep Learning", moduleIds: ["3-17", "3-18", "3-19", "3-20"], icon: "FiCpu" }
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
  
  // Check enrollment achievement
  checkAndUnlockAchievements();
  
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

  // Expose passed quiz module IDs
  const quizResults = getMockQuizResults();
  const passedIds = quizResults.filter(r => r.passed).map(r => r.moduleId);

  return {
    completedLessons: completedIds.length,
    data: completedIds,
    quizPassedIds: passedIds
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
    // Check if module has a quiz and if it has been passed
    const course = mockCourses.find(c => c.id === numericId);
    const mod = course?.modules?.find(m => m.id === moduleId);
    if (mod?.quiz) {
      const quizResults = getMockQuizResults();
      const passed = quizResults.some(r => r.moduleId === moduleId && r.passed);
      if (!passed) {
        throw new Error(`You must pass the quiz for "${mod.title}" before completing this lesson.`);
      }
    }

    if (!completedIds.includes(moduleId)) {
      completedIds.push(moduleId);
    }
  } else {
    progress[numericId] = completedIds.filter(id => id !== moduleId);
  }
  localStorage.setItem("lms_mock_progress", JSON.stringify(progress));

  // Trigger achievements check
  checkAndUnlockAchievements();

  return {
    completedLessons: progress[numericId].length,
    data: progress[numericId]
  };
}

export function getMockCertificates() {
  const enrolled = getMockEnrolled();
  const progress = getMockProgress();
  
  let storedCerts = [];
  try {
    const stored = localStorage.getItem("lms_mock_certificates");
    if (stored) {
      storedCerts = JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to parse stored certificates", e);
  }

  if (storedCerts.length === 0) {
    storedCerts = [
      {
        id: "cert-mock-1",
        certId: "HH-CERT-MOCK1",
        verifyUrl: "/verify/HH-CERT-MOCK1",
        studentName: "Demo User",
        courseTitle: "Network Defense Essentials",
        instructorName: "Dr. Sarah Jenkins, Chief Security Officer",
        course: { id: 99, title: "Network Defense Essentials" },
        issuedAt: "2026-05-10T12:00:00.000Z"
      },
      {
        id: "cert-mock-2",
        certId: "HH-CERT-MOCK2",
        verifyUrl: "/verify/HH-CERT-MOCK2",
        studentName: "Demo User",
        courseTitle: "Intro to Penetration Testing",
        instructorName: "Marcus Vance, Certified Ethical Hacker",
        course: { id: 98, title: "Intro to Penetration Testing" },
        issuedAt: "2026-06-15T12:00:00.000Z"
      }
    ];
  }

  let updated = false;
  enrolled.forEach(courseId => {
    const course = mockCourses.find(c => c.id === courseId);
    if (course) {
      const completedIds = progress[courseId] || [];
      if (completedIds.length === course.modules.length && course.modules.length > 0) {
        const alreadyExists = storedCerts.some(c => c.id === `cert-course-${courseId}`);
        if (!alreadyExists) {
          const randStr = Math.random().toString(36).substring(2, 8).toUpperCase();
          const certId = `HH-CERT-${courseId}D${randStr}`;
          storedCerts.push({
            id: `cert-course-${courseId}`,
            certId: certId,
            verifyUrl: `/verify/${certId}`,
            studentName: "Demo User",
            courseTitle: course.title,
            instructorName: course.instructor || "Dr. Sarah Jenkins",
            course: { id: course.id, title: course.title },
            issuedAt: new Date().toISOString()
          });
          updated = true;
        }
      }
    }
  });

  if (updated || localStorage.getItem("lms_mock_certificates") === null) {
    localStorage.setItem("lms_mock_certificates", JSON.stringify(storedCerts));
  }

  // Trigger achievements check if newly generated
  if (updated) {
    checkAndUnlockAchievements();
  }

  return storedCerts;
}

// ==========================================
// QUIZ MOCK DATA & API IMPLEMENTATION
// ==========================================

export function getMockQuizResults() {
  const stored = localStorage.getItem("lms_mock_quiz_results");
  return stored ? JSON.parse(stored) : [];
}

export function submitMockQuizResult(courseId, moduleId, quizId, score, total, passed) {
  const results = getMockQuizResults();
  
  // replace or add new result
  const index = results.findIndex(r => r.moduleId === moduleId && r.quizId === quizId);
  const newResult = {
    courseId: parseInt(courseId),
    moduleId,
    quizId,
    score,
    total,
    passed,
    timestamp: new Date().toISOString()
  };

  if (index >= 0) {
    results[index] = newResult;
  } else {
    results.push(newResult);
  }

  localStorage.setItem("lms_mock_quiz_results", JSON.stringify(results));
  
  // check achievements
  checkAndUnlockAchievements();
  
  return newResult;
}

// ==========================================
// TERMINAL LABS MOCK DATA & API
// ==========================================

export const mockLabs = [
  {
    labId: "lab-nmap",
    courseId: 1,
    title: "Network Mapping with Nmap",
    briefing: "In this lab, you will perform host discovery, port scanning, and OS detection against a mock staging server. Your goal is to map target IP 10.10.10.5 and discover any vulnerabilities.",
    steps: [
      {
        prompt: "Execute a basic port scan on target IP 10.10.10.5.",
        expectedCommand: "nmap 10.10.10.5",
        output: "Starting Nmap 8.01... Host is up (0.003s latency).\nNot shown: 998 closed ports\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http",
        hint: "Run: nmap 10.10.10.5"
      },
      {
        prompt: "Run an OS detection scan on the target system.",
        expectedCommand: "nmap -O 10.10.10.5",
        output: "Starting Nmap 8.01... OS detection scanning...\nDevice type: general purpose\nRunning: Linux 5.X\nOS details: Linux 5.4.0-74-generic (Ubuntu)",
        hint: "Add the -O flag: nmap -O 10.10.10.5"
      },
      {
        prompt: "Perform a complete full-port scan (65535 ports) to check for hidden services.",
        expectedCommand: "nmap -p- 10.10.10.5",
        output: "Scanning all 65535 ports...\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n8888/tcp open  sun-answer",
        hint: "Use -p- flag to scan all ports: nmap -p- 10.10.10.5"
      }
    ],
    flag: "HH{NMAP_DISCOVERY_COMPLETED_7482}"
  },
  {
    labId: "lab-privesc",
    courseId: 2,
    title: "SUID Privilege Escalation",
    briefing: "Enumerate SUID permissions on a local compromised target system and exploit a misconfigured binary to gain root authority.",
    steps: [
      {
        prompt: "Check who the current shell session user is.",
        expectedCommand: "whoami",
        output: "www-data",
        hint: "Type: whoami"
      },
      {
        prompt: "Find all binaries with SUID permission enabled on the file system.",
        expectedCommand: "find / -perm -4000 -type f 2>/dev/null",
        output: "/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/find (VULNERABLE!)",
        hint: "Type: find / -perm -4000 -type f 2>/dev/null"
      },
      {
        prompt: "Exploit the SUID 'find' binary to launch an interactive root shell.",
        expectedCommand: "find . -exec /bin/sh -p ; -quit",
        output: "Launching shell... uid=0(root) gid=0(root) euid=0(root) egid=0(root).\nWelcome to Root!",
        hint: "Use find's -exec flag to invoke a shell: find . -exec /bin/sh -p ; -quit"
      }
    ],
    flag: "HH{SUID_FIND_ROOT_ESCALATED_2984}"
  },
  {
    labId: "lab-python-scanner",
    courseId: 3,
    title: "Python Port Scanner Script",
    briefing: "Learn the core scripting syntax for creating a raw TCP port scanner using Python socket libraries.",
    steps: [
      {
        prompt: "Import the core python socket library module.",
        expectedCommand: "import socket",
        output: ">>> socket module loaded successfully.",
        hint: "Type: import socket"
      },
      {
        prompt: "Create a socket client object connection stream.",
        expectedCommand: "s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
        output: ">>> Socket client initialized.",
        hint: "Type: s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)"
      }
    ],
    flag: "HH{SOCKET_PROGRAMMING_MASTERED}"
  }
];

export function getMockLabProgress() {
  const stored = localStorage.getItem("lms_mock_lab_progress");
  return stored ? JSON.parse(stored) : [];
}

export function completeMockLab(labId) {
  const completed = getMockLabProgress();
  if (!completed.includes(labId)) {
    completed.push(labId);
    localStorage.setItem("lms_mock_lab_progress", JSON.stringify(completed));
  }
  
  // check achievements
  checkAndUnlockAchievements();
  
  return completed;
}

// ==========================================
// ACHIEVEMENTS MOCK DATA & ENGINE
// ==========================================

export const ACHIEVEMENT_DEFINITIONS = [
  {
    id: "enroll-first",
    title: "Getting Started",
    description: "Enrolled in your first cybersecurity course.",
    icon: "FiBookOpen"
  },
  {
    id: "quiz-perfect",
    title: "Trivia King",
    description: "Scored 100% on any module checkpoint quiz.",
    icon: "FiAward"
  },
  {
    id: "lab-first",
    title: "Terminal Warrior",
    description: "Completed your first hands-on terminal lab.",
    icon: "FiTerminal"
  },
  {
    id: "cert-first",
    title: "Certified Professional",
    description: "Earned your first verified course completion certificate.",
    icon: "FiCheckCircle"
  },
  {
    id: "streak-3",
    title: "Consistent Learner",
    description: "Maintained a learning streak of 3 or more days.",
    icon: "FiTrendingUp"
  }
];

export function checkAndUnlockAchievements() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return [];

  // load progress
  const enrolled = getMockEnrolled();
  const progress = getMockProgress();
  const certs = getMockCertificates();
  const completedLabs = getMockLabProgress();
  const quizResults = getMockQuizResults();
  
  const perfectQuiz = quizResults.some(r => r.passed && r.score === r.total);
  const streak = parseInt(localStorage.getItem("lms_streak_count") || "0");

  let unlockedIds = [];
  try {
    const stored = localStorage.getItem("lms_mock_achievements");
    if (stored) unlockedIds = JSON.parse(stored);
  } catch (e) {
    console.error(e);
  }

  let updated = false;

  ACHIEVEMENT_DEFINITIONS.forEach(ach => {
    if (unlockedIds.includes(ach.id)) return;

    let conditionMet = false;
    if (ach.id === "enroll-first" && enrolled.length > 0) {
      conditionMet = true;
    } else if (ach.id === "quiz-perfect" && perfectQuiz) {
      conditionMet = true;
    } else if (ach.id === "lab-first" && completedLabs.length > 0) {
      conditionMet = true;
    } else if (ach.id === "cert-first" && certs.length > 0) {
      conditionMet = true;
    } else if (ach.id === "streak-3" && streak >= 3) {
      conditionMet = true;
    }

    if (conditionMet) {
      unlockedIds.push(ach.id);
      updated = true;
      
      // trigger a toast!
      toastEmitter.emit(`🏆 Achievement Unlocked: ${ach.title}!`, "success");
    }
  });

  if (updated) {
    localStorage.setItem("lms_mock_achievements", JSON.stringify(unlockedIds));
  }

  return unlockedIds;
}

// ==========================================
// LEADERBOARD MOCK DATA
// ==========================================

export function getUserPoints() {
  const enrolled = getMockEnrolled();
  const progress = getMockProgress();
  const completedLabs = getMockLabProgress();
  const quizResults = getMockQuizResults();

  // count completed modules
  let completedModules = 0;
  enrolled.forEach(cId => {
    const list = progress[cId] || [];
    completedModules += list.length;
  });

  // count quizzes passed
  const passedQuizzes = quizResults.filter(r => r.passed).length;

  // count labs completed
  const completedLabsCount = completedLabs.length;

  return (completedModules * 20) + (passedQuizzes * 50) + (completedLabsCount * 100);
}

export function getMockLeaderboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userPoints = getUserPoints();

  const staticLeaderboard = [
    { userId: "leader-1", name: "Alice Security", points: 950, rank: 1 },
    { userId: "leader-2", name: "Hax0r Bob", points: 750, rank: 2 },
    { userId: "leader-3", name: "Charlie Root", points: 500, rank: 3 },
    { userId: "leader-4", name: "Dave Enigma", points: 320, rank: 4 },
    { userId: "leader-5", name: "Eva Cipher", points: 180, rank: 5 }
  ];

  // Insert current user
  const currentUserItem = {
    userId: user?.id || "mock-current",
    name: user?.name || "Demo User",
    points: userPoints,
    rank: 0 // to be calculated
  };

  // Check if current user already in leaderboard list
  const combined = [...staticLeaderboard, currentUserItem];
  
  // Sort by points descending
  combined.sort((a, b) => b.points - a.points);

  // Assign ranks
  return combined.map((item, idx) => ({
    ...item,
    rank: idx + 1
  }));
}

// ==========================================
// THREAT OF THE DAY MOCK DATA
// ==========================================

export const mockFacts = [
  {
    title: "Phishing Attack Vector",
    description: "Over 90% of all cybersecurity breaches start with an email spear-phishing attack targeted at employees.",
    mitigation: "Always check the sender's full email address domain and do not click links that request credentials."
  },
  {
    title: "Password Stuffing Protection",
    description: "Attackers use leaked credentials databases to systematically compromise accounts across alternative web portals.",
    mitigation: "Adopt a password manager and ensure unique, high-entropy passwords are set for every interface."
  },
  {
    title: "Log4Shell (CVE-2021-44228)",
    description: "A zero-day vulnerability in Apache Log4j library allowed remote code execution simply by printing logs containing JNDI headers.",
    mitigation: "Ensure all java application modules are updated to Log4j v2.17.1 or higher to patch JNDI lookup exploits."
  },
  {
    title: "SQL Injection Mechanics",
    description: "SQLi occurs when unchecked user input is directly concatenated into database query parameters, altering the query syntax.",
    mitigation: "Always adopt parameterized queries, prepared statements, and validate inputs against whitelist rules."
  },
  {
    title: "Man-in-the-Middle (MitM)",
    description: "Attackers intercept network packets on public Wi-Fi networks using ARP spoofing or DNS poisoning techniques.",
    mitigation: "Use encrypted HTTPS channels, virtual private networks (VPN), and disable automatic Wi-Fi joining."
  },
  {
    title: "MFA Exhaustion (Push Bombing)",
    description: "Social engineers spam users with push notifications until they fatigue and click 'Approve' to confirm login.",
    mitigation: "Train staff to reject unrecognized notifications, and adopt context-aware number matching verification."
  },
  {
    title: "Zero Trust Architecture",
    description: "Zero Trust assumes threat actors reside inside the network boundaries, enforcing authentication checks on every request.",
    mitigation: "Enforce micro-segmentation, continuous access validation, and strict least-privilege policies."
  },
  {
    title: "Cross-Site Scripting (XSS)",
    description: "Stored XSS allows malicious scripts to be injected into databases and executed on the browsers of users viewing page contents.",
    mitigation: "Sanitize user inputs, escape HTML characters during rendering, and implement Content Security Policies (CSP)."
  },
  {
    title: "Social Engineering Attacks",
    description: "Baiting uses physical media (like infected USB drives left in parking lots) to tempt users into execution.",
    mitigation: "Enforce endpoint lockouts, disable USB autoplay configurations, and block unauthorized physical media."
  },
  {
    title: "Buffer Overflow Attacks",
    description: "An exploit writing data past allocated buffers into the execution stack, corrupting stack return pointers to execute shellcode.",
    mitigation: "Use modern safe programming languages, apply stack canary checks, and compile with ASLR and DEP flags."
  }
];

export function getMockThreatOfTheDay() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const idx = dayOfYear % mockFacts.length;
  return mockFacts[idx];
}

// ==========================================
// MOCK HTTP ROUTE DISPATCHER
// ==========================================

export function handleMockRequest(path, options) {
  const method = (options.method || "GET").toUpperCase();

  // 1. GET /courses
  if (path === "/courses" && method === "GET") {
    return new Response(JSON.stringify({
      success: true,
      data: mockCourses,
      message: "Courses retrieved successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 2. GET /courses/enrolled
  if (path === "/courses/enrolled" && method === "GET") {
    const enrolledIds = getMockEnrolled();
    const enrolled = mockCourses.filter(c => enrolledIds.includes(c.id));
    return new Response(JSON.stringify({
      success: true,
      data: enrolled,
      message: "Enrolled courses retrieved successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 3. GET /courses/certificates
  if (path === "/courses/certificates" && method === "GET") {
    const certs = getMockCertificates();
    return new Response(JSON.stringify({
      success: true,
      data: certs,
      message: "Certificates retrieved successfully"
    }), {
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
      return new Response(JSON.stringify({
        success: true,
        data: course,
        message: "Course details retrieved successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        data: null,
        message: "Course not found",
        code: "COURSE_NOT_FOUND"
      }), {
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
      return new Response(JSON.stringify({
        success: true,
        data: prog,
        message: "Progress retrieved successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else if (method === "POST") {
      const body = JSON.parse(options.body || "{}");
      const { moduleId, completed } = body;
      
      try {
        const updatedProg = toggleModuleComplete(id, moduleId, completed);
        return new Response(JSON.stringify({
          success: true,
          data: updatedProg,
          message: "Progress updated successfully"
        }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({
          success: false,
          data: null,
          message: err.message,
          code: "QUIZ_REQUIRED"
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  }

  // 5b. GET /courses/:id/labs
  const labsMatch = path.match(/^\/courses\/([^/]+)\/labs$/);
  if (labsMatch && method === "GET") {
    const id = parseInt(labsMatch[1]);
    const labs = mockLabs.filter(l => l.courseId === id);
    const completedList = getMockLabProgress();
    const data = labs.map(l => ({
      ...l,
      completed: completedList.includes(l.labId)
    }));
    return new Response(JSON.stringify({
      success: true,
      data: data,
      message: "Course labs retrieved successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 6. POST /courses/:id/enroll
  const enrollMatch = path.match(/^\/courses\/([^/]+)\/enroll$/);
  if (enrollMatch && method === "POST") {
    const id = parseInt(enrollMatch[1]);
    const result = enrollInCourse(id);
    return new Response(JSON.stringify({
      success: true,
      data: result,
      message: "Enrolled in course successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 7. GET /certificates/verify/:certId
  const verifyMatch = path.match(/^\/certificates\/verify\/([^/]+)$/);
  if (verifyMatch && method === "GET") {
    const certId = verifyMatch[1];
    const certs = getMockCertificates();
    const foundCert = certs.find(c => c.certId === certId);
    if (foundCert) {
      return new Response(JSON.stringify({
        success: true,
        data: {
          valid: true,
          studentName: foundCert.studentName,
          courseTitle: foundCert.courseTitle,
          instructorName: foundCert.instructorName,
          issuedAt: foundCert.issuedAt
        },
        message: "Certificate verified successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        data: {
          valid: false,
          message: "Certificate not found"
        },
        message: "Certificate verification failed",
        code: "CERTIFICATE_NOT_FOUND"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // 8. POST /courses/:id/quiz/:quizId/submit
  const quizSubmitMatch = path.match(/^\/courses\/([^/]+)\/quiz\/([^/]+)\/submit$/);
  if (quizSubmitMatch && method === "POST") {
    const courseId = parseInt(quizSubmitMatch[1]);
    const quizId = quizSubmitMatch[2];
    const body = JSON.parse(options.body || "{}");
    const { answers } = body; // array of indexes
    
    // Find quiz in modules
    const course = mockCourses.find(c => c.id === courseId);
    let quizObj = null;
    let moduleId = "";
    
    course?.modules?.forEach(mod => {
      if (mod.quiz && mod.quiz.quizId === quizId) {
        quizObj = mod.quiz;
        moduleId = mod.id;
      }
    });

    if (quizObj) {
      let score = 0;
      quizObj.questions.forEach((q, idx) => {
        if (answers[idx] === q.correctOptionIndex) {
          score += 1;
        }
      });
      const passed = score >= quizObj.passingScore;

      const result = submitMockQuizResult(courseId, moduleId, quizId, score, quizObj.questions.length, passed);
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          score,
          total: quizObj.questions.length,
          passed,
          result
        },
        message: "Quiz evaluated successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        data: null,
        message: "Quiz not found",
        code: "QUIZ_NOT_FOUND"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // 9. GET /labs/:labId
  const labGetMatch = path.match(/^\/labs\/([^/]+)$/);
  if (labGetMatch && method === "GET") {
    const labId = labGetMatch[1];
    const lab = mockLabs.find(l => l.labId === labId);
    if (lab) {
      const completedList = getMockLabProgress();
      return new Response(JSON.stringify({
        success: true,
        data: {
          ...lab,
          completed: completedList.includes(labId)
        },
        message: "Lab details retrieved successfully"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        data: null,
        message: "Lab not found",
        code: "LAB_NOT_FOUND"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // 10. POST /labs/:labId/complete
  const labCompleteMatch = path.match(/^\/labs\/([^/]+)\/complete$/);
  if (labCompleteMatch && method === "POST") {
    const labId = labCompleteMatch[1];
    const progressList = completeMockLab(labId);
    return new Response(JSON.stringify({
      success: true,
      data: progressList,
      message: "Lab completed recorded successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 11. GET /leaderboard
  if (path === "/leaderboard" && method === "GET") {
    const board = getMockLeaderboard();
    return new Response(JSON.stringify({
      success: true,
      data: board,
      message: "Leaderboard retrieved successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Default fallback for unhandled mock endpoints
  return new Response(JSON.stringify({
    success: false,
    data: null,
    message: "Mock endpoint not found",
    code: "ENDPOINT_NOT_FOUND"
  }), {
    status: 404,
    headers: { "Content-Type": "application/json" }
  });
}