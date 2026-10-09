import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, ExternalLink, Code2, Database, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { engineeringProjects } from '../data/portfolioData';

export function AcademicProjectsPage({ darkMode, onBack }) {
  const [selectedCourse, setSelectedCourse] = useState('all');

  const academicProjectsList = [
    {
      id: "workly-marketplace",
      title: "Workly (Freelance Marketplace)",
      course: "Software Engineering & Web Systems",
      semester: "2025",
      institution: "United International University (UIU)",
      techStack: ["Node.js", "Express.js", "TypeScript", "Prisma"],
      problemStatement:
        "Freelance platforms demand secure multi-role access control, low-latency messaging between clients and freelancers, and reliable proposal tracking.",
      solutionArchitecture:
        "Developed a comprehensive backend system for a freelance marketplace featuring authentication, real-time chat, job postings, proposals, quizzes, and user dashboards.",
      keyMetrics: [
        { label: "Backend", value: "Node.js / Express" },
        { label: "Language", value: "TypeScript" },
        { label: "ORM", value: "Prisma ORM" },
        { label: "Real-Time", value: "WebSockets" }
      ],
      githubUrl: "https://github.com/mdzobaerahmed/Workly",
      codeSnippet: `// Prisma Real-Time Chat Dispatcher
export const sendMessage = async (req: AuthRequest, res: Response) => {
  const { recipientId, content } = req.body;
  const message = await prisma.message.create({
    data: { senderId: req.user.id, recipientId, content, readStatus: false }
  });
  io.to(recipientId).emit("receive_message", message);
  return res.status(201).json(message);
};`
    },
    {
      id: "opportunity-hub",
      title: "OpportunityHub",
      course: "Web Development & Relational Databases",
      semester: "2024",
      institution: "United International University (UIU)",
      techStack: ["PHP", "MySQL", "JavaScript", "CSS", "HTML"],
      problemStatement:
        "Students and applicants frequently face fragmented portals when tracking job listings, internships, and global scholarships, leading to missed application deadlines.",
      solutionArchitecture:
        "Developed a centralized web portal to track jobs, internships, and global scholarships, featuring dynamic opportunity filtering, user bookmarking, and relational data management.",
      keyMetrics: [
        { label: "Database", value: "MySQL Relational" },
        { label: "Server", value: "PHP Backend" },
        { label: "Filtering", value: "Dynamic Client-Side" },
        { label: "Architecture", value: "Relational 3NF" }
      ],
      githubUrl: "https://github.com/mdzobaerahmed/OpportunityHub",
      codeSnippet: `<?php
// Dynamic Opportunity Filter Query Engine
$category = mysqli_real_escape_string($conn, $_GET['category'] ?? 'all');
$query = "SELECT * FROM opportunities WHERE deadline >= CURDATE()";
if ($category !== 'all') {
    $query .= " AND type = '$category'";
}
$query .= " ORDER BY deadline ASC";
$result = mysqli_query($conn, $query);`
    },
    {
      id: "multi-client-chat-system",
      title: "Multi-Client Chat System",
      course: "Computer Networks & Socket Programming",
      semester: "2024",
      institution: "United International University (UIU)",
      techStack: ["Python", "Socket Programming", "Multithreading", "TCP/IP"],
      problemStatement:
        "Concurrent network communication over raw TCP sockets requires reliable thread synchronization to prevent race conditions during message serialization and client disconnects.",
      solutionArchitecture:
        "Developed a real-time multi-threaded chat server supporting broadcast, private direct messaging, group conversations, and dynamic active user session tracking.",
      keyMetrics: [
        { label: "Protocol", value: "TCP/IP Sockets" },
        { label: "Concurrency", value: "Multi-Threading" },
        { label: "Language", value: "Python" },
        { label: "Routing", value: "Broadcast & Private DM" }
      ],
      githubUrl: "https://github.com/mdzobaerahmed/Computer-Networks-Socket-Programming",
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
      course: "System Analysis & Design Laboratory",
      semester: "2024",
      institution: "United International University (UIU)",
      techStack: ["LaTeX", "UML", "System Design"],
      problemStatement:
        "Complex agricultural operations require structured domain modeling, UML sequence workflows, and formal requirement decomposition prior to software engineering.",
      solutionArchitecture:
        "Authored project proposal and LaTeX documentation for a farm management system as part of the System Analysis & Design Laboratory.",
      keyMetrics: [
        { label: "Typesetting", value: "LaTeX / BibTeX" },
        { label: "Modeling", value: "UML 2.0 Diagrams" },
        { label: "Curriculum", value: "UIU SAD Lab" },
        { label: "Deliverable", value: "Formal Specification" }
      ],
      githubUrl: "https://github.com/mdzobaerahmed"
    }
  ];

  return (
    <div className={`min-h-screen py-24 sm:py-28 ${darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="mb-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs transition-all ${
              darkMode 
                ? 'border-slate-800 bg-[#0E1524]/80 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 shadow-sm' 
                : 'border-slate-200 bg-white text-slate-700 hover:text-amber-600 hover:border-amber-500/50 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>← Back to Portfolio</span>
          </button>

          <span className="font-mono text-xs text-amber-500/90 tracking-wider hidden sm:inline">
            ACTIVITIES // [02] ACADEMIC PROJECTS
          </span>
        </div>

        {/* Title Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>UIU CSE COURSEWORK & TECHNICAL ARCHIVES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight mb-4">
            Academic Projects
          </h1>
          <p className={`text-base sm:text-lg font-sans max-w-3xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            University software engineering solutions, machine learning implementations, and database architectures developed during Bachelor of Science in Computer Science & Engineering at United International University.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {academicProjectsList.map((project, idx) => (
            <div
              key={idx}
              className={`p-8 sm:p-10 rounded-2xl border transition-all ${
                darkMode ? 'bg-[#0E1524]/80 border-slate-800/80 shadow-xl shadow-black/20' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/60">
                <div>
                  <div className="flex items-center gap-2.5 font-mono text-xs mb-2">
                    <span className="text-amber-500 font-semibold">{project.course}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{project.semester}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{project.institution}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                    {project.title}
                  </h2>
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs text-amber-500 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-colors w-fit shrink-0"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Problem & Architecture Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-mono text-xs text-amber-500 uppercase tracking-wider mb-2 font-semibold">
                    Problem Statement
                  </h3>
                  <p className={`text-sm font-sans leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.problemStatement}
                  </p>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-amber-500 uppercase tracking-wider mb-2 font-semibold">
                    Engineering Solution
                  </h3>
                  <p className={`text-sm font-sans leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {project.solutionArchitecture}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {project.keyMetrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className={`p-4 rounded-xl border font-mono ${
                      darkMode ? 'bg-[#121927]/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">{m.label}</div>
                    <div className="text-base font-bold text-amber-400">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Code Snippet (if available) */}
              {project.codeSnippet && (
                <div className="mt-6 rounded-xl border border-slate-800/80 bg-[#090D14] p-4 overflow-x-auto font-mono text-xs">
                  <div className="text-[10.5px] text-slate-500 pb-2 mb-2 border-b border-slate-800/60 flex items-center justify-between">
                    <span>// SOURCE ARTIFACT EXCERPT</span>
                    <span className="text-amber-500">SYNTAX HIGHLIGHTED</span>
                  </div>
                  <pre className="text-slate-300 leading-relaxed">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-6 border-t border-slate-800/60 flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-slate-500 text-[11px] uppercase mr-2 font-semibold">Stack:</span>
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className={`px-3 py-1 rounded-lg border ${
                      darkMode 
                        ? 'border-slate-800 bg-slate-900/80 text-slate-300' 
                        : 'border-slate-200 bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
