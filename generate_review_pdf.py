import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, PageBreak, KeepTogether, Preformatted
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

pdf_path = r"C:\Users\Hp\.gemini\antigravity\scratch\portfolio-cs-lens\public\Portfolio_Review_Summary.pdf"

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor('#64748B'))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(36, 810, "Md. Zobaer Ahmed // MZA Code + Lens — Portfolio Architecture & Code Review")
            self.setStrokeColor(colors.HexColor('#E2E8F0'))
            self.setLineWidth(0.5)
            self.line(36, 804, 559, 804)
            
        # Footer
        self.setStrokeColor(colors.HexColor('#E2E8F0'))
        self.setLineWidth(0.5)
        self.line(36, 40, 559, 40)
        
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(559, 28, footer_text)
        self.drawString(36, 28, "https://mdzobaerahmed.github.io | Confidential Portfolio Architecture Review")
        self.restoreState()

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=A4,
    leftMargin=36,
    rightMargin=36,
    topMargin=46,
    bottomMargin=46
)

styles = getSampleStyleSheet()

# Custom typography styles
title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=20,
    leading=24,
    textColor=colors.HexColor('#0F172A'),
    spaceAfter=4
)

subtitle_style = ParagraphStyle(
    'DocSubtitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=15,
    textColor=colors.HexColor('#D97706'), # Amber-600
    spaceAfter=6
)

meta_style = ParagraphStyle(
    'DocMeta',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=13,
    textColor=colors.HexColor('#475569'),
    spaceAfter=12
)

h1_style = ParagraphStyle(
    'H1Custom',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=13,
    leading=17,
    textColor=colors.HexColor('#0F172A'),
    spaceBefore=12,
    spaceAfter=4
)

h2_style = ParagraphStyle(
    'H2Custom',
    parent=styles['Heading3'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=14,
    textColor=colors.HexColor('#1E293B'),
    spaceBefore=8,
    spaceAfter=3
)

body_style = ParagraphStyle(
    'BodyCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12.5,
    textColor=colors.HexColor('#334155')
)

body_bold = ParagraphStyle(
    'BodyBold',
    parent=body_style,
    fontName='Helvetica-Bold',
    textColor=colors.HexColor('#0F172A')
)

bullet_style = ParagraphStyle(
    'BulletCustom',
    parent=body_style,
    leftIndent=12,
    spaceAfter=2
)

callout_style = ParagraphStyle(
    'CalloutText',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    textColor=colors.HexColor('#1E293B')
)

code_style = ParagraphStyle(
    'CodeSnippet',
    parent=styles['Normal'],
    fontName='Courier',
    fontSize=6.8,
    leading=8.8,
    textColor=colors.HexColor('#0F172A')
)

table_header_style = ParagraphStyle(
    'TableHeader',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8,
    leading=11,
    textColor=colors.white
)

table_cell_style = ParagraphStyle(
    'TableCell',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=7.8,
    leading=10.5,
    textColor=colors.HexColor('#1E293B')
)

table_cell_bold = ParagraphStyle(
    'TableCellBold',
    parent=table_cell_style,
    fontName='Helvetica-Bold',
    textColor=colors.HexColor('#0F172A')
)

story = []

# Title Section
story.append(Paragraph("MD. ZOBAER AHMED // MZA CODE + LENS", title_style))
story.append(Paragraph("Full-Stack Engineering &times; Documentary Photography Portfolio — Architecture Review", subtitle_style))
story.append(Paragraph("<b>Author:</b> Md. Zobaer Ahmed (UIU CSE, Aspiring Product Manager, Award-Winning Photographer)<br/><b>Live URL:</b> <font color='#2563EB'><u>https://mdzobaerahmed.github.io/</u></font> &nbsp;|&nbsp; <b>Admin Portal:</b> <font color='#2563EB'><u>#/admin</u></font><br/><b>Review Date:</b> October 2026 &nbsp;|&nbsp; <b>Version:</b> 2.0 (React 18, Vite 5, Tailwind CSS, Supabase)", meta_style))
story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceBefore=2, spaceAfter=10))

# 1. Executive Summary & Philosophy
story.append(Paragraph("1. Executive Summary & Design Philosophy", h1_style))
story.append(Paragraph(
    "The <b>MZA Code + Lens</b> portfolio represents a modern, high-performance web platform designed to harmonize two distinct disciplines: "
    "<b>Rigorous Computer Science / Product Engineering</b> and <b>Fine Art Documentary Photography (Fujifilm X-T5)</b>. "
    "The website delivers an immersive dark-aesthetic user experience (`#0B0F17` zinc-slate canvas, amber `#F59E0B` micro-accents, and monospace data typography), "
    "featuring instant client-side hash navigation, an interactive terminal simulator, an automated fine art photo gallery with EXIF camera telemetry, "
    "a password-protected administrator back-office protected by SHA-256 cryptographic hashing, and serverless direct-to-inbox messaging via Web3Forms.",
    body_style
))
story.append(Spacer(1, 8))

# 2. Tech Stack & Libraries Used
story.append(Paragraph("2. Tech Stack & Libraries Breakdown", h1_style))
story.append(Paragraph("A comprehensive inventory of frameworks, toolchains, APIs, and utility libraries powering the production build:", body_style))
story.append(Spacer(1, 4))

tech_table_data = [
    [Paragraph("Layer / Category", table_header_style), Paragraph("Technology / Library", table_header_style), Paragraph("Version", table_header_style), Paragraph("Architectural Purpose & Implementation Detail", table_header_style)],
    
    [Paragraph("Frontend Core", table_cell_bold), Paragraph("React 18", table_cell_style), Paragraph("^18.3.1", table_cell_style), 
     Paragraph("Declarative UI architecture, functional component model, hooks (`useState`, `useEffect`), client-side hash router.", table_cell_style)],
     
    [Paragraph("Build Engine", table_cell_bold), Paragraph("Vite 5", table_cell_style), Paragraph("^5.4.21", table_cell_style), 
     Paragraph("Blazing fast Hot Module Replacement (HMR), Rollup-based tree-shaking production bundler generating optimized static assets.", table_cell_style)],
     
    [Paragraph("Styling & Design", table_cell_bold), Paragraph("Tailwind CSS", table_cell_style), Paragraph("^3.4.17", table_cell_style), 
     Paragraph("Utility-first styling with customized dark theme palette (`#0B0F17`), responsive breakpoints, custom scrollbars, and film grain textures.", table_cell_style)],
     
    [Paragraph("Icon System", table_cell_bold), Paragraph("Lucide React", table_cell_style), Paragraph("^1.16.0", table_cell_style), 
     Paragraph("Over 40 crisp vector icons (Camera, Terminal, Shield, Download, Lock, CheckCircle2, ShoppingBag, Eye, Mail, etc.).", table_cell_style)],
     
    [Paragraph("Cloud & Database", table_cell_bold), Paragraph("Supabase Client", table_cell_style), Paragraph("^2.49.1", table_cell_style), 
     Paragraph("PostgreSQL cloud storage & photo sync via `@supabase/supabase-js`, hybrid offline-first LocalStorage fallback.", table_cell_style)],
     
    [Paragraph("Form Dispatch", table_cell_bold), Paragraph("Web3Forms API", table_cell_style), Paragraph("REST API", table_cell_style), 
     Paragraph("Direct-to-inbox message forwarding to `mdzobaerahmed31@gmail.com` with zero exposed SMTP secrets; fallback to FormSubmit.", table_cell_style)],
     
    [Paragraph("PDF Generation", table_cell_bold), Paragraph("jsPDF & html2canvas", table_cell_style), Paragraph("^2.5.2 / ^1.4.1", table_cell_style), 
     Paragraph("Client-side dynamic generation of invoices and order receipts for photography print sales in the admin portal.", table_cell_style)],
     
    [Paragraph("Security & Auth", table_cell_bold), Paragraph("Web Crypto API", table_cell_style), Paragraph("Native SHA-256", table_cell_style), 
     Paragraph("Cryptographic SHA-256 hashing (`crypto.subtle.digest`) for administrator verification. Zero plain-text passwords in code.", table_cell_style)],
     
    [Paragraph("Sanitization", table_cell_bold), Paragraph("DOMPurify", table_cell_style), Paragraph("^3.2.4", table_cell_style), 
     Paragraph("XSS protection sanitizing rendered content, user messages, and dynamic markdown strings.", table_cell_style)],
     
    [Paragraph("Hosting & CI/CD", table_cell_bold), Paragraph("GitHub Pages + Actions", table_cell_style), Paragraph("v4 actions", table_cell_style), 
     Paragraph("Automated CI/CD pipeline (`.github/workflows/deploy.yml`) running Node 20 `npm run build` and zero-downtime publishing.", table_cell_style)],
]

t_tech = Table(tech_table_data, colWidths=[80, 95, 55, 293])
t_tech.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0F172A')),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
    ('TOPPADDING', (0,0), (-1,-1), 3),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#F8FAFC'), colors.white])
]))
story.append(t_tech)
story.append(Spacer(1, 10))

# 3. Page Architecture & Section Breakdown
story.append(Paragraph("3. Page Architecture & Section-by-Section Breakdown", h1_style))
story.append(Paragraph(
    "The portfolio operates on a responsive Single Page Architecture (SPA). A unified client-side hash listener (`window.location.hash`) "
    "manages both high-speed scrolling within the primary landing page and zero-latency sub-page rendering (`#/skills`, `#/academic-projects`, `#/admin`, etc.).",
    body_style
))
story.append(Spacer(1, 4))

sections_data = [
    ("3.1 Navbar Component (`src/components/Navbar.jsx`)", [
        "<b>Layout & Shell:</b> Fixed sticky header with blurred glass backdrop (`backdrop-blur-md bg-[#0B0F17]/85`), high z-index (50).",
        "<b>Branding:</b> Minimalist logo `⚡ MZA` with amber accents linking back to the home view.",
        "<b>Navigation Links & Menus:</b> Direct jump links to #about, #experience, #education, #projects, and #gallery.",
        "<b>Dropdown Menus:</b> Interactive dropdown for <i>Activities</i> (Skills, Academic Projects, Publications, Extra Curricular, Tech Blog) and <i>Photography</i> (Exhibition Gallery, Print Sale, Documentary, Admin Portal).",
        "<b>Controls:</b> Smooth Dark/Light mode theme toggle persisting state in `localStorage`, 'Let's Talk' contact CTA, and mobile hamburger drawer."
    ]),
    ("3.2 Hero Section (`src/components/Hero.jsx`)", [
        "<b>Dual-Identity Header:</b> 'Full-Stack Engineering &times; Documentary Photography' positioning Md. Zobaer Ahmed as a CS undergrad and product manager who shoots fine-art photography.",
        "<b>Live Availability Badge:</b> Pulsing status indicator: 'Available for Summer 2026 PM / Tech Roles & Documentary Inquiries'.",
        "<b>Typography & Key Bio:</b> High-contrast heading (`text-4xl sm:text-6xl`), subtitle outlining United International University (UIU) 10th Trimester standing, and international photo curations in Greece & Scotland.",
        "<b>Dual Action CTAs:</b> 'Explore Tech & Engineering' (smooth scrolls to #activities) and 'View Fine Art Photography' (smooth scrolls to #gallery).",
        "<b>Interactive Terminal Card (`src/components/TerminalCard.jsx`):</b> Simulated developer terminal with clickable command buttons (`skills`, `experience`, `gear`, `contact`) and interactive CLI text output."
    ]),
    ("3.3 About & Career Journey Section (`src/components/AboutSection.jsx`)", [
        "<b>Modular Section Tabs:</b> In-page filter pills toggling between All, Work Experience, Education, and Achievements.",
        "<b>01 // About Me:</b> Narrative biography detailing algorithmic problem solving, software engineering, digital product management, and visual storytelling.",
        "<b>02 // Professional Experience:</b> Structured timeline cards featuring IDP Education Ltd (IELTS Invigilator), UIU Photography Club (Vice President), Interactive Cares (Brand Representative), and Remains Art Club (Executive Member). Clean footer: <code>Professional & Leadership Roles | 2020 — Present</code>.",
        "<b>03 // Education & Academic History:</b> Comprehensive timeline: United International University (B.Sc. in CSE, 10th Trimester), Dhaka Residential Model College (HSC Science, GPA 5.00), and Chairman Bazar Secondary School (SSC Science). Clean footer: <code>UIU CSE • DRMC</code>.",
        "<b>04 // Credentials & Honors:</b> Certifications (Digital PM, Aspire Leaders Harvard Business School, Digital Marketing, Cybersecurity) and Awards (Life at UIU Winner, Reflection 3.0 Senior Winner, DRMC National Nature Festival, Government Merit Scholarships).",
        "<b>05 // Technical & Photographic Arsenal:</b> Side-by-side matrices comparing Software Engineering (C, C++, Python, JavaScript, PHP, MySQL, React, Node.js, Git) and Optics Gear (Fujifilm X-T5, Fujinon XF 35mm f/1.4 R, Adobe Lightroom, Classic Chrome simulation)."
    ]),
    ("3.4 Academic & Engineering Projects (`src/components/EngineeringSection.jsx`)", [
        "<b>Curated Showcase:</b> Featured high-impact software projects: <b>Workly</b> (Freelance Marketplace backend with Node.js, Express, TypeScript, Prisma), <b>OpportunityHub</b> (PHP/MySQL Scholarship and Job portal), <b>Multi-Client Chat System</b> (Python socket programming with multithreading), and <b>Livestock Manager</b> (System analysis & LaTeX).",
        "<b>Card Architecture:</b> Project category tags, system architecture highlights, technology badges, and live GitHub repository links.",
        "<b>Interactive Modal (`ProjectModal.jsx`):</b> Detailed system walkthrough, database schema description, and feature specifications upon clicking any project card."
    ]),
    ("3.5 Fine Art Photography Gallery (`src/components/PhotographyGallery.jsx`)", [
        "<b>Exhibition-Grade Visual Grid:</b> Masonry / responsive grid showcasing authentic Fujifilm X-T5 photography in Dhaka and beyond.",
        "<b>Dynamic Filtering:</b> Real-time category selector pills: All, Street, Architecture, Nature, and Documentary.",
        "<b>EXIF Camera Telemetry:</b> Technical camera specs attached to every photo: Fujifilm X-T5, Fujinon XF 35mm f/1.4 R, 35mm, f/2.0, 1/250s, ISO 200, Classic Chrome.",
        "<b>Lightbox Modal (`LightboxModal.jsx`):</b> Fullscreen high-resolution modal with image zoom, contextual visual story, and quick print purchase action."
    ]),
    ("3.6 Contact & Communication Sub-Section", [
        "<b>Web3Forms Direct Email Dispatch:</b> Contact form capturing Sender Name, Email, Subject, and Message. Submits directly via Web3Forms API to `mdzobaerahmed31@gmail.com` with real-time feedback states.",
        "<b>Direct Channels:</b> Clickable contact badges for Email, Phone (+8801783503006), Location (Dhaka, Bangladesh), LinkedIn, and GitHub.",
        "<b>Academic CV Download:</b> One-click button to download the formatted PDF CV (`Academic_CV.pdf`)."
    ]),
    ("3.7 Footer Component (`src/components/Footer.jsx`)", [
        "<b>Minimalist Technical Footer:</b> Copyright notice, tech stack acknowledgement ('Engineered with React 18, Vite & Tailwind CSS'), quick Back to Top smooth scroll, and external social links."
    ]),
    ("3.8 Dedicated Sub-Pages (Hash-Routed)", [
        "<b>#/skills:</b> Deep dive technical competency matrix across programming languages, backend frameworks, databases, and DevOps.",
        "<b>#/academic-projects:</b> Extended catalog of academic coursework and laboratory implementations.",
        "<b>#/publications:</b> Research topics in machine learning, class imbalance, and computational health informatics.",
        "<b>#/extra-curricular:</b> Comprehensive leadership record managing 70+ members at UIU Photography Club and cultural festivals.",
        "<b>#/blog:</b> In-depth technical articles (e.g., 'Tackling Severe Class Imbalance with SMOTE in Clinical ML').",
        "<b>#/exhibitions:</b> Curated gallery features in European exhibitions across Greece and Scotland.",
        "<b>#/prints:</b> Fine art print collection with size selection (A4, A3, Exhibition 16x24), paper selection (Hahnemuhle Photo Rag), cart system, and USD/BDT currency toggle.",
        "<b>#/documentary:</b> Long-form visual documentary photo-essays.",
        "<b>#/admin:</b> Restricted administrator console for managing gallery photos, print orders, messages, and cloud settings."
    ])
]

for title, points in sections_data:
    story.append(Paragraph(title, h2_style))
    for pt in points:
        story.append(Paragraph(f"&bull; {pt}", bullet_style))
    story.append(Spacer(1, 3))

story.append(PageBreak())

# 4. Security & Administrator Architecture
story.append(Paragraph("4. Security Architecture & Administrator Access Control", h1_style))
story.append(Paragraph(
    "To ensure complete data protection and maintain an uncompromised public repository on GitHub, "
    "the portfolio implements several key security mechanisms:",
    body_style
))
story.append(Spacer(1, 4))

sec_points = [
    "<b>Cryptographic SHA-256 Hash Verification:</b> No plain-text administrator passwords exist anywhere in the source code or git history. The system hashes input strings using the browser's native <code>crypto.subtle.digest('SHA-256')</code> and compares them against a cryptographic hash (`6051fc84a...`).",
    "<b>Zero Plain-Text Hints:</b> The login interface (`#/admin`) displays zero default password hints or debugging clues. Incorrect authentication attempts return a generic <code>'Incorrect administrator password. Access denied.'</code> message.",
    "<b>Session Isolation & LocalStorage Scope:</b> Administrator session authentication is preserved strictly in <code>sessionStorage</code>. Data modifications performed locally remain strictly within the client's browser sandbox and cannot modify the production codebase on GitHub.",
    "<b>Secretless Email Forwarding:</b> Contact form messages and print orders are dispatched via the Web3Forms public access token, routing emails directly to <code>mdzobaerahmed31@gmail.com</code> without exposing private mail server SMTP credentials or database connection strings.",
    "<b>Client-Side Hash Routing:</b> Hash-based routing (`#/`) guarantees 100% routing stability on static hosts like GitHub Pages without requiring server-side URL rewrite rules or causing 404 errors."
]

for pt in sec_points:
    story.append(Paragraph(f"&bull; {pt}", bullet_style))
story.append(Spacer(1, 8))

# 5. Full Main Component Code (src/App.jsx)
story.append(Paragraph("5. Main Component Code Listing (`src/App.jsx`)", h1_style))
story.append(Paragraph(
    "The core orchestrator of the entire application (`src/App.jsx`), managing theme persistence, hash route changes, smooth anchor scrolling, and sub-page mounting:",
    body_style
))
story.append(Spacer(1, 4))

# Read actual App.jsx content
with open(r"C:\Users\Hp\.gemini\antigravity\scratch\portfolio-cs-lens\src\App.jsx", "r", encoding="utf-8") as f:
    app_code = f.read()

# Split into manageable chunks or preformatted blocks
story.append(Preformatted(app_code, code_style))

# Build Document
doc.build(story, canvasmaker=NumberedCanvas)
print("Review PDF created successfully at:", pdf_path)
