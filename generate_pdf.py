import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

pdf_path = r"C:\Users\Hp\.gemini\antigravity\scratch\portfolio-cs-lens\public\Academic_CV.pdf"

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=A4,
    leftMargin=36,
    rightMargin=36,
    topMargin=32,
    bottomMargin=32
)

styles = getSampleStyleSheet()

# Custom styles
title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=22,
    alignment=1, # Center
    textColor=colors.HexColor('#0F172A'),
    spaceAfter=2
)

subtitle_style = ParagraphStyle(
    'DocSubtitle',
    parent=styles['Normal'],
    fontName='Helvetica-Oblique',
    fontSize=9.5,
    leading=13,
    alignment=1,
    textColor=colors.HexColor('#334155'),
    spaceAfter=2
)

contact_style = ParagraphStyle(
    'DocContact',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    alignment=1,
    textColor=colors.HexColor('#475569'),
    spaceAfter=8
)

sec_title_style = ParagraphStyle(
    'SecTitle',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    textColor=colors.HexColor('#0F172A'),
    spaceBefore=8,
    spaceAfter=2,
    textTransform='uppercase'
)

body_style = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12.5,
    textColor=colors.HexColor('#1E293B')
)

bold_style = ParagraphStyle(
    'BoldTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=12.5,
    textColor=colors.HexColor('#0F172A')
)

meta_style = ParagraphStyle(
    'MetaTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    alignment=2, # Right
    textColor=colors.HexColor('#64748B')
)

bullet_style = ParagraphStyle(
    'BulletTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    leftIndent=12,
    textColor=colors.HexColor('#334155')
)

story = []

# Header
story.append(Paragraph("MD. ZOBAER AHMED", title_style))
story.append(Paragraph("CS Undergrad, Aspiring Product Manager, Digital PM Trainee, Photographer", subtitle_style))
story.append(Paragraph("Dhaka, Bangladesh &nbsp;|&nbsp; +8801783503006 &nbsp;|&nbsp; <font color='#2563EB'>mdzobaerahmed31@gmail.com</font><br/><font color='#2563EB'>linkedin.com/in/mdzobaerahmed</font> &nbsp;|&nbsp; <font color='#2563EB'>github.com/mdzobaerahmed</font> &nbsp;|&nbsp; <font color='#2563EB'>facebook.com/mdzobaerahmed31</font>", contact_style))

def add_section_header(title):
    story.append(Paragraph(title, sec_title_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#CBD5E1'), spaceBefore=1, spaceAfter=5))

# 1. Career Objective
add_section_header("CAREER OBJECTIVE")
story.append(Paragraph("Computer Science undergraduate at United International University with a strong focus on Product Management. Completing a Digital Product Management program and seeking internship opportunities to apply learning in real projects. Long-term goal: combine CSE background and PM skills to build impactful technology products for Bangladesh.", body_style))
story.append(Spacer(1, 4))

# 2. Education
add_section_header("EDUCATION")
edu_data = [
    [
        Paragraph("<b>United International University</b><br/><i>B.Sc. in Computer Science and Engineering</i>", body_style),
        Paragraph("Dhaka, Bangladesh<br/><b>(10th Trimester)</b>", meta_style)
    ],
    [
        Paragraph("<b>Dhaka Residential Model College</b><br/><i>Higher Secondary Certificate (HSC)</i> – GPA: 5.00/5.00", body_style),
        Paragraph("Dhaka, Bangladesh<br/>2021", meta_style)
    ],
    [
        Paragraph("<b>Chairman Bazar Secondary School</b><br/><i>Secondary School Certificate (SSC)</i> – GPA: 5.00/5.00", body_style),
        Paragraph("Barisal, Bangladesh<br/>2019", meta_style)
    ]
]
t_edu = Table(edu_data, colWidths=[380, 140])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
story.append(t_edu)
story.append(Spacer(1, 3))

# 3. Experience
add_section_header("EXPERIENCE")
exp_data = [
    [
        Paragraph("<b>IDP Education Ltd</b><br/><i>IELTS Invigilator</i>", body_style),
        Paragraph("Dhaka, Bangladesh<br/>Jan 2026 – Present", meta_style)
    ]
]
t_exp1 = Table(exp_data, colWidths=[380, 140])
t_exp1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_exp1)
story.append(Spacer(1, 4))

exp_data2 = [
    [
        Paragraph("<b>UIU Photography Club</b><br/><i>Vice President</i>", body_style),
        Paragraph("Dhaka, Bangladesh<br/>Jan 2026 – Sep 2026", meta_style)
    ]
]
t_exp2 = Table(exp_data2, colWidths=[380, 140])
t_exp2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_exp2)
story.append(Paragraph("• Organized major events: Photo Carnival 23, Friday Exposure Exhibition and Shutter Stories: Chapter IV at UIU.", bullet_style))
story.append(Spacer(1, 4))

exp_data3 = [
    [
        Paragraph("<b>Interactive Cares</b><br/><i>Brand Representative</i>", body_style),
        Paragraph("Dhaka, Bangladesh<br/>May 2025 – Sep 2025", meta_style)
    ]
]
t_exp3 = Table(exp_data3, colWidths=[380, 140])
t_exp3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_exp3)
story.append(Paragraph("• Represented the Interactive Cares brand at university and community events.", bullet_style))
story.append(Spacer(1, 4))

exp_data4 = [
    [
        Paragraph("<b>Remains Art Club</b><br/><i>Executive Member</i>", body_style),
        Paragraph("Dhaka, Bangladesh<br/>Feb 2020 – Mar 2021", meta_style)
    ]
]
t_exp4 = Table(exp_data4, colWidths=[380, 140])
t_exp4.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_exp4)
story.append(Paragraph("• Organized national fest \"Artsy Overlap 2021\" at Dhaka Residential Model College.", bullet_style))
story.append(Spacer(1, 3))

# 4. Projects
add_section_header("PROJECTS")

p1 = [
    [
        Paragraph("<b>Workly (Freelance Marketplace)</b>", body_style),
        Paragraph("<font color='#2563EB'>[Github: github.com/mdzobaerahmed/Workly]</font>", meta_style)
    ]
]
t_p1 = Table(p1, colWidths=[340, 180])
t_p1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_p1)
story.append(Paragraph("Developed a comprehensive backend system for a freelance marketplace featuring authentication, real-time chat, job postings, proposals, quizzes, and user dashboards.<br/><b>Tech Stack:</b> Node.js, Express.js, TypeScript, Prisma.", bullet_style))
story.append(Spacer(1, 4))

p2 = [
    [
        Paragraph("<b>OpportunityHub</b>", body_style),
        Paragraph("<font color='#2563EB'>[Github: github.com/mdzobaerahmed/OpportunityHub]</font>", meta_style)
    ]
]
t_p2 = Table(p2, colWidths=[340, 180])
t_p2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_p2)
story.append(Paragraph("Developed a centralized web portal to track jobs, internships, and global scholarships, featuring dynamic opportunity filtering, user bookmarking, and relational data management.<br/><b>Tech Stack:</b> PHP, MySQL, JavaScript, CSS, HTML.", bullet_style))
story.append(Spacer(1, 4))

p3 = [
    [
        Paragraph("<b>Multi-Client Chat System</b>", body_style),
        Paragraph("<font color='#2563EB'>[Github: socket-programming]</font>", meta_style)
    ]
]
t_p3 = Table(p3, colWidths=[340, 180])
t_p3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_p3)
story.append(Paragraph("Developed a real-time multi-threaded chat server supporting broadcast, private direct messaging, group conversations, and dynamic active user session tracking.<br/><b>Tech Stack:</b> Python, Socket Programming, Multithreading, TCP/IP.", bullet_style))
story.append(Spacer(1, 4))

p4 = [
    [
        Paragraph("<b>Livestock Manager</b>", body_style),
        Paragraph("<font color='#2563EB'>[Github: github.com/mdzobaerahmed]</font>", meta_style)
    ]
]
t_p4 = Table(p4, colWidths=[340, 180])
t_p4.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_p4)
story.append(Paragraph("Authored project proposal and LaTeX documentation for a farm management system as part of the System Analysis & Design Laboratory.<br/><b>Tech Stack:</b> LaTeX, UML, System Design.", bullet_style))
story.append(Spacer(1, 3))

# 5. Skills
add_section_header("SKILLS")
story.append(Paragraph("<b>Programming:</b> C, C++, Python, JavaScript, PHP, SQL, NoSQL", body_style))
story.append(Paragraph("<b>Tools:</b> MS Office, Canva, Adobe Lightroom, Google Workspace", body_style))
story.append(Paragraph("<b>Soft Skills:</b> Team Management, Event Organization, Photography", body_style))
story.append(Paragraph("<b>Languages:</b> Bangla (Native), English (Professional)", body_style))
story.append(Spacer(1, 3))

# 6. Certifications & Programs
add_section_header("CERTIFICATIONS & PROGRAMS")
story.append(Paragraph("• <b>Digital Product Management Career Path</b> – Interactive Cares (Oct 2025)<br/>• <b>Aspire Leaders Program</b> – Aspire Institute, Harvard Business School<br/>• <b>Introduction to Digital Marketing</b> – Futurenation<br/>• <b>Fundamentals of Cybersecurity</b> – Ostad", bullet_style))
story.append(Spacer(1, 3))

# 7. Awards & Achievements
add_section_header("AWARDS & ACHIEVEMENTS")
story.append(Paragraph("• <b>Winner</b> – Life at UIU Photography Contest 2024.<br/>• <b>Winner</b> – Camera Photography (Senior Category), Reflection 3.0 National GSCPC Photography Festival.<br/>• <b>1st Runner-up</b> – Nature Through Your Lens, 3rd DRMC National Nature Festival (Nov 2024).<br/>• <b>International Recognition</b> – Selected for exhibitions in Greece and Scotland (2024–2026).<br/>• <b>Government Scholarships</b> – PSC (2013), JSC (2016), SSC (2019).", bullet_style))
story.append(Spacer(1, 3))

# 8. References
add_section_header("REFERENCES")
ref_data = [
    [
        Paragraph("<b>Charles Aunkan Gomes</b><br/><i>Lecturer, Dept. of CSE</i><br/>United International University<br/><font color='#2563EB'>charles@cse.uiu.ac.bd</font>", body_style),
        Paragraph("<b>Md Asique Iqbal</b><br/><i>Lecturer, ICT</i><br/>Dhaka Residential Model College<br/><font color='#2563EB'>asique.iqbaldrmc@gmail.com</font>", body_style)
    ]
]
t_ref = Table(ref_data, colWidths=[260, 260])
t_ref.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
story.append(t_ref)

doc.build(story)
print("PDF generated successfully at:", pdf_path)
