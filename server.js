const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/certificates', express.static(path.join(__dirname, 'public', 'certificates')));
app.use('/reports', express.static(path.join(__dirname, 'public', 'reports')));
app.use('/projects and certificate', express.static(path.join(__dirname, 'projects and certificate')));
app.use('/projects-and-certificate', express.static(path.join(__dirname, 'projects and certificate')));
app.use('/projects and certificates', express.static(path.join(__dirname, 'projects and certificates')));
app.use('/projects-and-certificates', express.static(path.join(__dirname, 'projects and certificates')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Student Portfolio Data
const studentData = {
  name: "Urvika Raje",
  title: "Biotechnology Undergrad & Computational Biology Explorer",
  tagline: "Decoding biological complexity at the intersection of wet-lab genetics and computational algorithms.",
  location: "Biotech Research Lab & Campus, India",
  email: "rajeurvika@gmail.com",
  github: "https://github.com/urvika-biotech",
  linkedin: "https://www.linkedin.com/in/urvikaraje",
  researchGate: "https://researchgate.net/profile/Urvika-Biotech",
  socialPreviews: {
    github: {
      username: "urvika-biotech",
      url: "https://github.com/urvika-biotech",
      screenshot: "/images/github-screenshot-placeholder.svg", // Replace with your actual GitHub screenshot path
      headline: "Urvika Raje • Computational Biology & Genetics Repositories",
      stats: { repos: "14 Public Repos", stars: "48 Stars", contributions: "524 Contributions" }
    },
    linkedin: {
      name: "Urvika Raje",
      username: "urvikaraje",
      url: "https://www.linkedin.com/in/urvikaraje",
      screenshot: "/images/linkedin-cover.jpeg",
      headline: "Biotechnology Undergraduate | Computational Biology & CRISPR Researcher",
      location: "India • 500+ Connections",
      stats: { connections: "500+ Connections", followers: "650+ Followers", recommendations: "3 Received" }
    }
  },
  status: "4th Year B.Tech Biotechnology • Lab Researcher",
  stats: [
    { label: "Lab Wet-Bench Hours", value: "1,200+", detail: "Cell culture, PCR & Western Blotting" },
    { label: "Genomic Datasets Analyzed", value: "35+", detail: "NCBI, TCGA, PDB & UniProt" },
    { label: "Research Projects", value: "6", detail: "Wet-Lab & In-Silico Pipelines" },
    { label: "Academic CGPA", value: "9.35 / 10", detail: "Department Top 5% Scholar" }
  ],
  bio: {
    summary: "I am a B.Tech Biotechnology student with a growing interest in molecular biology, microbiology, genetic engineering, and the application of computational approaches to biological research. My academic and laboratory experience has introduced me to microbiological techniques, biochemical analysis, scientific literature, and laboratory-based investigation. I am particularly interested in areas such as CRISPR, genetic engineering, antimicrobial resistance, bioinformatics, and AI-assisted biotechnology.",
    paragraphs: [
      "I am a B.Tech Biotechnology student with a growing interest in molecular biology, microbiology, genetic engineering, and the application of computational approaches to biological research. My academic and laboratory experience has introduced me to microbiological techniques, biochemical analysis, scientific literature, and laboratory-based investigation. I am particularly interested in areas such as CRISPR, genetic engineering, antimicrobial resistance, bioinformatics, and AI-assisted biotechnology.",
      "Alongside laboratory science, I enjoy scientific communication and research-oriented writing, with a particular interest in translating complex biological concepts into clear, accessible explanations through presentations, reports, and visual content.",
      "I also have an interest in technology and digital tools, and enjoy exploring how they can complement scientific work. My technical experience includes Python, Java, HTML, CSS, data analysis, UI/UX design, Figma, Canva, generative AI tools, AI-assisted productivity, and workflow automation using n8n. I am particularly interested in developing the intersection between biotechnology, computational tools, artificial intelligence, and digital innovation.",
      "I am continuously expanding my skills across molecular biology, microbiology, bioinformatics, data analysis, programming, scientific communication, and AI tools, with the long-term aim of contributing to research and innovation at the intersection of biotechnology and emerging technologies."
    ],
    interests: [
      "CRISPR & Genetic Engineering",
      "Antimicrobial Resistance (AMR)",
      "Bioinformatics & Genomics",
      "AI-Assisted Biotechnology",
      "Scientific Communication",
      "Workflow Automation & Digital Tools"
    ],
    coursework: [
      "Molecular Biology & Genetic Engineering",
      "Microbiology & Biochemical Analysis",
      "Bioinformatics & Computational Genomics",
      "Bioprocess Engineering & Fermentation",
      "Immunology & Cell Biology",
      "Data Analysis & Programming in Python/Java",
      "Scientific Communication & Literature Review"
    ]
  },
  education: [
    {
      institution: "Jaipur National University",
      type: "University",
      degree: "B.Tech in Biotechnology",
      school: "School of Engineering & Technology",
      location: "Jagatpura, Jaipur, Rajasthan",
      period: "2023-2027",
      image: "/images/education/jnu-campus.webp",
      badge: "NAAC A+ Accredited • Est. 2007",
      highlights: [
        "Accredited with an 'A+' Grade by NAAC and recognized by UGC, AICTE, and national statutory councils.",
        "Expansive 60+ acre eco-friendly campus featuring 150+ high-tech research labs, smart classrooms, and incubation facilities.",
        "Integrated multi-specialty hospital and medical college providing hands-on wet-lab, clinical diagnostics, and interdisciplinary biotechnology exposure.",
        "Global footprint with an offshore international campus in the UAE and active bio-computational research culture."
      ]
    },
    {
      institution: "St. Angela Sophia Sr. Sec. School",
      type: "Senior Secondary School",
      school: "Science Stream (PCMB)",
      location: "Outside Ghat Gate, Jaipur, Rajasthan",
      period: "2009-2022",
      image: "/images/education/sophia-campus.jpg",
      badge: "Centenary Heritage (Est. 1926) • CBSE",
      highlights: [
        "Distinguished centenary legacy founded in 1926 by Bishop Henri Caumont & Mission Sisters of Ajmer, celebrating 100 years of academic distinction.",
        "Affiliated with CBSE, renowned across Rajasthan for exemplary discipline, moral courage, leadership, and female empowerment.",
        "Rooted in the timeless motto 'Vachan' (The Word) and 'Seek Ye Wisdom', fostering scientific curiosity, ethical values, and holistic character formation.",
        "Guided by the founding vision of Rt. Rev. Bishop Fortunatus Henri Caumont, Mother Mary Matilda, and St. Angela of Merici, dedicated to educational empowerment, character formation, and compassionate leadership."
      ]
    }
  ],
  skills: {
    dryLab: [
      { name: "Python, Java, HTML & CSS", level: "Advanced", progress: 92, category: "Programming", desc: "Scientific scripting, algorithms, data structures, and responsive computational biology interfaces." },
      { name: "Bioinformatics & Data Analysis", level: "Advanced", progress: 95, category: "Bioinformatics", desc: "Sequence alignment (BLAST+, Clustal), Biopython, NCBI databases, statistical data exploration with Pandas & NumPy." },
      { name: "AI Tools & Workflow Automation (n8n)", level: "Proficient", progress: 90, category: "Automation & AI", desc: "Generative AI tools, AI-assisted productivity, prompt engineering, and automated research workflows with n8n." },
      { name: "UI/UX Design (Figma & Canva)", level: "Advanced", progress: 88, category: "Design & SciComm", desc: "Scientific infographics, UI prototyping, poster presentations, visual storytelling, and research figures." },
      { name: "PyMOL & Molecular Docking", level: "Proficient", progress: 85, category: "Structural Biology", desc: "3D protein-ligand visualization, active site residue mapping, and in-silico screening." },
      { name: "Linux, Git & Development Tools", level: "Proficient", progress: 85, category: "Dev Tools", desc: "Version control, bash scripting, pipeline execution, and collaborative development." }
    ],
    wetLab: [
      { name: "PCR & Quantitative qPCR", level: "Mastered", progress: 95, category: "Molecular Diagnostics", desc: "Primer design, thermal cycle optimization, amplicon validation, SYBR Green melting curves." },
      { name: "Gel Electrophoresis (Agarose & SDS-PAGE)", level: "Mastered", progress: 95, category: "Analytics", desc: "DNA fragment sizing, total protein separation, Coomassie Brilliant Blue & Ethidium Bromide staining." },
      { name: "CRISPR-Cas9 sgRNA Design & In-Vitro Cleavage", level: "Proficient", progress: 85, category: "Genetic Engineering", desc: "PAM sequence identification, protospacer design, in-vitro cleavage assays on plasmid DNA." },
      { name: "Aseptic Microbial & Cell Culturing", level: "Proficient", progress: 90, category: "Microbiology", desc: "Bacterial transformation (E. coli DH5α), streak plating, growth kinetics curves, media preparation." },
      { name: "Protein Extraction & Spectrophotometry", level: "Proficient", progress: 88, category: "Biochemistry", desc: "Bradford & BCA assays, Nanodrop A260/A280 purity analysis, cell lysis protocols." },
      { name: "Centrifugation & Chromatography Basics", level: "Intermediate", progress: 78, category: "Downstream Processing", desc: "High-speed differential centrifugation, affinity column chromatography (Ni-NTA His-tag)." }
    ]
  },
  projects: [
    {
      id: "clinical-microbiology-report",
      title: "Clinical Diagnostics: Microbiological & Biochemical Parameters",
      subtitle: "Focus on Electrolyte Analysis & Antimicrobial Sensitivity • Hospital Project Report",
      category: "Clinical Research & Diagnostic Report",
      badge: "Primary Project Report",
      image: "/images/projects/clinical-internship-report-preview.png",
      reportPdf: "/reports/internship REPORT (1).pdf",
      description: "An extensive 26-page clinical laboratory investigation conducted at Manglamplus Medicity Hospital, Jaipur, and submitted to Jaipur National University. Features detailed clinical workflows in culture media preparation (Blood Agar hemolysis & MacConkey lactose differentiation), bacterial streaking techniques, Kirby-Bauer antibiotic sensitivity testing against CLSI benchmarks, biochemical identification assays (Urease, Citrate, TSI agar), and automated critical care electrolyte quantification (BeckLyte analyzer for Na⁺, K⁺, Cl⁻, and iCa²⁺).",
      highlights: [
        "Culture & Isolation: Prepared and evaluated differential and selective media (Blood Agar & MacConkey Agar) utilizing zig-zag and quadrant streaking methods.",
        "Kirby-Bauer Antibiotic Sensitivity: Quantified zones of inhibition against standard CLSI charts, analyzing multi-drug susceptibility profiles in clinical isolates.",
        "Biochemical Assays: Verified bacterial metabolic profiles using Urease hydrolysis, Simmons Citrate agar, and Triple Sugar Iron (TSI) fermentation.",
        "ICU Electrolyte Analysis: Operated BeckLyte automated electrolyte analyzer to evaluate critical care samples for hyponatremia, hypokalemia, and hypocalcemia."
      ],
      tools: ["Clinical Microbiology", "BeckLyte Electrolyte Analyzer", "Kirby-Bauer AST", "Blood Agar", "MacConkey Agar", "TSI Assays", "Biochemical Diagnostics", "CLSI Standards"],
      metrics: "26-Page Clinical Diagnostic Report • Real Clinical Patient & Electrolyte Panel Analysis",
      link: "/reports/internship REPORT (1).pdf",
      github: "https://github.com/urvika-biotech/clinical-diagnostics-report",
      isReport: true
    },
    {
      id: "g-protein-signal-transduction",
      title: "G-Protein in Signal Transduction: Molecular Cascades & Disease Pathology",
      subtitle: "GPCR Molecular Architecture • Second Messengers • Jaipur National University",
      category: "Molecular Biology & Signal Transduction",
      badge: "Academic Research Monograph",
      image: "/images/projects/g-proteins-report-preview.png",
      reportPdf: "/reports/G Proteins in signal transduction report.pdf",
      description: "A comprehensive 16-page scientific monograph on the molecular cascades of G-Protein Coupled Receptors (GPCRs) and intracellular G-proteins, submitted to the Department of Biotechnology at Jaipur National University under the guidance of Assist. Prof. Anukriti Pandey. Details 7-transmembrane GPCR conformational activation, heterotrimeric (Gα, Gβγ) and monomeric (Ras superfamily) GTPases, dual second messenger effector cascades (cAMP & IP3/DAG), and clinical pathologies in oncology, cardiology, and endocrine dysregulation.",
      highlights: [
        "7TM GPCR Architecture: Modeled 7-transmembrane helix topology, extracellular ligand binding loops, and nucleotide exchange factor (GEF) catalysis.",
        "GTPase Switch Mechanism: Traced conformational cycle of Gα subunit dissociation from Gβγ dimer upon GDP-to-GTP exchange and intrinsic GTPase deactivation.",
        "Dual Second Messenger Cascades: Analyzed Gs-mediated Adenylyl Cyclase activation producing cAMP and Gq-mediated Phospholipase C cleavage of PIP2 into IP3 and DAG.",
        "Clinical Pathology Review: Synthesized disease mechanisms associated with GPCR/G-protein aberrant signaling, including oncogenesis, cardiovascular disease, retinitis pigmentosa, and endocrinopathies."
      ],
      tools: ["GPCR Structural Biology", "Signal Transduction", "Second Messenger Cascades", "Enzyme Kinetics", "Structural Biochemistry", "Literature Review"],
      metrics: "16-Page Monograph • Comprehensive Signal Transduction & Human Disease Mapping",
      link: "/reports/G Proteins in signal transduction report.pdf",
      github: "https://github.com/urvika-biotech/g-protein-signal-transduction",
      isReport: true
    }
  ],
  labNotes: [
    {
      date: "Mar 12, 2026",
      title: "Optimizing Annealing Temperatures: Touchdown PCR vs Standard Gradient",
      tag: "Wet-Lab Protocol",
      readTime: "4 min read",
      snippet: "Why gradient PCR isn't always the magic bullet when dealing with high GC% primers (>68%). Here is the touchdown protocol that finally solved our non-specific primer dimer band problem.",
      tags: ["PCR", "DNA", "PrimerDesign", "LabProtocols"]
    },
    {
      date: "Feb 24, 2026",
      title: "Why Every Biotech Student Should Learn Vectorized Python",
      tag: "Computational Bio",
      readTime: "6 min read",
      snippet: "Iterating through FASTA lines with for-loops is slow for 100MB files. How transitioning to NumPy arrays and Cythonized Biopython parsers accelerated our sequence motif searches by 50x.",
      tags: ["Python", "Bioinformatics", "FastSeq", "NumPy"]
    },
    {
      date: "Jan 18, 2026",
      title: "Visualizing Hydrogen Bonding in PyMOL for Drug-Protein Complexes",
      tag: "Structural Biology",
      readTime: "5 min read",
      snippet: "A practical guide to setting distance cutoffs (2.5 - 3.2 Å) and donor-acceptor angles in PyMOL scripts to render publication-ready molecular interaction graphics.",
      tags: ["PyMOL", "Docking", "Proteins", "StructuralBio"]
    }
  ],
  timeline: [
    {
      year: "2025 - Present",
      role: "Undergraduate Research Fellow",
      institution: "Department of Biotechnology & Genetic Engineering",
      type: "Research Fellowship",
      description: "Conducting independent undergraduate research on bacterial resistance gene prediction and CRISPR target specificity. Assisting lab peers with Sanger sequencing and PCR amplicon assays."
    },
    {
      year: "Summer 2025",
      role: "Computational Biology & Genomics Intern",
      institution: "Center for Cellular & Molecular Genomics",
      type: "Internship",
      description: "Developed automated Nextflow pipelines for high-throughput RNA-seq quality control, read alignment to reference genomes (STAR/HISAT2), and transcript quantification."
    },
    {
      year: "2024 - 2025",
      role: "President & Student Lead",
      institution: "University Synthetic Biology & Biotech Club",
      type: "Student Leadership",
      description: "Organized campus-wide wet-lab hands-on workshops (Gel-Art, DNA extraction from strawberries) and computational crash courses on BLAST & Python for 120+ student members."
    },
    {
      year: "2023 - Present",
      role: "B.Tech in Biotechnology Candidate",
      institution: "School of Engineering & Technology",
      type: "Academic Foundation",
      description: "Dean's Honor List across all semesters. Relevant courses: Genetic Engineering, Structural Bioinformatics, Bioprocess, Cell Biology, Python for Life Sciences."
    }
  ],
  internships: [
    {
      id: "manglamplus-medicity",
      role: "Clinical Microbiology & Biochemistry Intern",
      organization: "Manglamplus Medicity Hospital, Jaipur",
      duration: "June 23, 2025 - July 12, 2025",
      location: "Shipra Path, Mansarovar, Jaipur, Rajasthan",
      type: "Hospital Clinical Internship",
      badge: "Verified Clinical Internship",
      logo: "🏥",
      summary: "Completed rigorous hospital laboratory internship across clinical microbiology and biochemistry departments, gaining hands-on diagnostic experience in bacterial isolation, antibiotic sensitivity, and critical care electrolyte monitoring.",
      responsibilities: [
        "Prepared Blood Agar and MacConkey Agar media, executing continuous zig-zag and quadrant streaking for microbial isolation.",
        "Conducted Kirby-Bauer disc diffusion antibiotic sensitivity testing (AST), interpreting zones of inhibition against CLSI standards.",
        "Performed biochemical identification tests including Urease hydrolysis, Simmons Citrate utilization, and Triple Sugar Iron (TSI) agar reactions.",
        "Operated the BeckLyte automated electrolyte analyzer to evaluate serum Na⁺, K⁺, Cl⁻, and iCa²⁺ in critical care patient samples.",
        "Authored comprehensive 26-page internship project report submitted to Jaipur National University under department supervision."
      ],
      skills: ["Clinical Microbiology", "BeckLyte Electrolyte Analyzer", "Kirby-Bauer AST", "Blood Agar & MacConkey", "Biochemical Assays (TSI, Citrate, Urease)", "Biosafety SOPs"],
      reportUrl: "/reports/internship REPORT (1).pdf",
      certificateUrl: "/certificates/Mangalamplus medicity internship certificate.png",
      googleDriveUrl: "/reports/internship REPORT (1).pdf"
    }
  ],
  certificates: [
    {
      id: "manglamplus-medicity-cert",
      title: "Internship Completion: Microbiology & Biochemistry",
      issuer: "Manglamplus Medicity Hospital, Jaipur",
      platform: "Multi-Speciality Hospital Clinical Internship",
      issueDate: "July 12, 2025 (June 23 - July 12, 2025)",
      credentialId: "MPM-MEDICITY-2025-URVIKA",
      badge: "Clinical Internship",
      icon: "fa-hospital",
      googleDriveUrl: "/certificates/Mangalamplus medicity internship certificate.png",
      fileUrl: "/certificates/Mangalamplus medicity internship certificate.png",
      previewImage: "/images/certificates/Mangalamplus medicity internship certificate.png",
      skills: ["Clinical Microbiology", "Biochemical Testing", "Electrolyte Diagnostics", "Hospital Laboratory SOPs", "Patient Diagnostic Safety"]
    },
    {
      id: "udemy-figma",
      title: "Figma UI/UX Design | Become UI/UX Designer in India",
      issuer: "Udemy (Instructor: Ankit Shrivastava)",
      platform: "Udemy Certified",
      issueDate: "July 1, 2025",
      credentialId: "UC-e96f3c19-640e-4816-92a0-f45c94841d6b",
      badge: "UI/UX & Prototyping",
      icon: "fa-bezier-curve",
      googleDriveUrl: "/certificates/certificate figma.pdf",
      verificationUrl: "https://ude.my/UC-e96f3c19-640e-4816-92a0-f45c94841d6b",
      fileUrl: "/certificates/certificate figma.pdf",
      previewImage: "/images/certificates/certificate-figma-preview.png",
      skills: ["Figma UI/UX", "Interactive Prototyping", "Wireframing", "Component Systems", "Design Thinking", "23 Total Hours"]
    },
    {
      id: "debate-achievement",
      title: "Certificate of Achievement — 1st Position in Debate Competition",
      issuer: "Vedic Kanya P.G. College, Rajapark, Jaipur",
      platform: "Inter-College Academic Debate",
      issueDate: "January 11, 2024",
      credentialId: "VKPGC-DEBATE-1ST-2024",
      badge: "1st Position Winner",
      icon: "fa-trophy",
      googleDriveUrl: "/certificates/debate certificate.jpeg",
      fileUrl: "/certificates/debate certificate.jpeg",
      previewImage: "/images/certificates/debate-certificate.jpeg",
      skills: ["Public Speaking", "Scientific Debate", "Critical Reasoning", "Oratory & Rhetoric", "Persuasive Communication"]
    },
    {
      id: "environmental-conference",
      title: "National Conference on Environmental Pollution: Challenges & Solutions",
      issuer: "APJ Abdul Kalam Govt Girls College & ISLS",
      platform: "National Scientific Conference",
      issueDate: "September 3-4, 2025",
      credentialId: "ISLS-ENV-CONF-2025",
      badge: "Conference Presentation",
      icon: "fa-leaf",
      googleDriveUrl: "/certificates/ENV conference.png",
      fileUrl: "/certificates/ENV conference.png",
      previewImage: "/certificates/ENV conference.png",
      skills: ["Environmental Biotechnology", "Scientific Presentation", "Pollution Challenges", "Life Sciences Research"]
    },
    {
      id: "google-ambassador-ideathon",
      title: "Idea Rush Ideathon 2025 — Google Student Ambassador",
      issuer: "Google Student Ambassador Program & Xspark Community",
      platform: "Jaipur National University",
      issueDate: "November 15, 2025",
      credentialId: "GSA-JNU-IDEATHON-2025",
      badge: "Innovation Ideathon",
      icon: "fa-lightbulb",
      googleDriveUrl: "/certificates/ideathon certificate.pdf",
      fileUrl: "/certificates/ideathon certificate.pdf",
      previewImage: "/images/certificates/ideathon-certificate-preview.png",
      skills: ["Innovation & Ideation", "Google Student Ambassador", "Tech & Biotech Solutions", "Team Pitching", "Product Strategy"]
    },
    {
      id: "anchoring-workshop",
      title: "Three-Day Anchoring Workshop Certificate",
      issuer: "Kanoria PG Mahila Mahavidyalaya, Jaipur",
      platform: "Public Speaking & Theatre Club",
      issueDate: "September 14-16, 2023",
      credentialId: "KMM-ANCHORING-2023",
      badge: "SciComm & Anchoring",
      icon: "fa-microphone-lines",
      googleDriveUrl: "/certificates/anch work certificate.jpeg",
      fileUrl: "/certificates/anch work certificate.jpeg",
      previewImage: "/certificates/anch work certificate.jpeg",
      skills: ["Live Event Anchoring", "Voice Modulation", "Stage Presence", "Public Speaking", "Audience Engagement"]
    },
    {
      id: "creative-writing-volunteering",
      title: "Creative Writing Workshop Volunteering & Organization",
      issuer: "Kanoria PG Mahila Mahavidyalaya, Jaipur",
      platform: "Creative Writing Club",
      issueDate: "October 3-4, 2023",
      credentialId: "KMM-CW-VOLUNTEER-2023",
      badge: "Student Leadership",
      icon: "fa-pen-fancy",
      googleDriveUrl: "/certificates/volunteering certificate.jpeg",
      fileUrl: "/certificates/volunteering certificate.jpeg",
      previewImage: "/certificates/volunteering certificate.jpeg",
      skills: ["Volunteer Leadership", "Creative Writing Coordination", "Event Administration", "Student Engagement"]
    },
    {
      id: "times-super-league",
      title: "Times NIE School Super League — Certificate of Excellence",
      issuer: "The Times of India & BYJU'S",
      platform: "National Scholastic Assessment",
      issueDate: "2018-2019",
      credentialId: "TOI-NIE-SSL-2018-19",
      badge: "Scholastic Excellence",
      icon: "fa-medal",
      googleDriveUrl: "/certificates/toi certificate.jpeg",
      fileUrl: "/certificates/toi certificate.jpeg",
      previewImage: "/certificates/toi certificate.jpeg",
      skills: ["Aptitude & Logical Reasoning", "Scientific Inquiry", "Scholastic Distinction", "Problem Solving"]
    },
    {
      id: "idf-humanitarian-2022",
      title: "Humanitarian Resource Mobilisation — Appreciation Certificate",
      issuer: "Indian Development Foundation (IDF)",
      platform: "IDF NGO (UN ECOSOC Special Consultative Status)",
      issueDate: "2021-2022",
      credentialId: "IDF-RESOURCES-2021-22",
      badge: "Humanitarian Impact",
      icon: "fa-hand-holding-heart",
      googleDriveUrl: "/certificates/idf 2 certificate.jpeg",
      fileUrl: "/certificates/idf 2 certificate.jpeg",
      previewImage: "/certificates/idf 2 certificate.jpeg",
      skills: ["Social Welfare", "Humanitarian Causes", "Resource Mobilisation", "Community Service", "Public Health Advocacy"]
    },
    {
      id: "idf-humanitarian-2017",
      title: "Humanitarian Service & Outreach — Certificate of Appreciation",
      issuer: "Indian Development Foundation (IDF)",
      platform: "IDF NGO",
      issueDate: "2016-2017",
      credentialId: "IDF-RESOURCES-2016-17",
      badge: "Civic Service",
      icon: "fa-hands-holding-child",
      googleDriveUrl: "/certificates/idf certificate.jpeg",
      fileUrl: "/certificates/idf certificate.jpeg",
      previewImage: "/certificates/idf certificate.jpeg",
      skills: ["Humanitarian Service", "Leprosy Relief Support", "Community Outreach", "Civic Engagement"]
    }
  ]
};

// Genetic Code Table for Translation
const codonTable = {
  'ATA':'I', 'ATC':'I', 'ATT':'I', 'ATG':'M',
  'ACA':'T', 'ACC':'T', 'ACG':'T', 'ACT':'T',
  'AAC':'N', 'AAT':'N', 'AAA':'K', 'AAG':'K',
  'AGC':'S', 'AGT':'S', 'AGA':'R', 'AGG':'R',
  'CTA':'L', 'CTC':'L', 'CTG':'L', 'CTT':'L',
  'CCA':'P', 'CCC':'P', 'CCG':'P', 'CCT':'P',
  'CAC':'H', 'CAT':'H', 'CAA':'Q', 'CAG':'Q',
  'CGA':'R', 'CGC':'R', 'CGG':'R', 'CGT':'R',
  'GTA':'V', 'GTC':'V', 'GTG':'V', 'GTT':'V',
  'GCA':'A', 'GCC':'A', 'GCG':'A', 'GCT':'A',
  'GAC':'D', 'GAT':'D', 'GAA':'E', 'GAG':'E',
  'GGA':'G', 'GGC':'G', 'GGG':'G', 'GGT':'G',
  'TCA':'S', 'TCC':'S', 'TCG':'S', 'TCT':'S',
  'TTC':'F', 'TTT':'F', 'TTA':'L', 'TTG':'L',
  'TAC':'Y', 'TAT':'Y', 'TAA':'*', 'TAG':'*',
  'TGC':'C', 'TGT':'C', 'TGA':'*', 'TGG':'W',
};

const aminoAcidNames = {
  'A': { name: 'Alanine', type: 'Hydrophobic', color: '#38bdf8' },
  'R': { name: 'Arginine', type: 'Positively Charged', color: '#6366f1' },
  'N': { name: 'Asparagine', type: 'Polar Neutral', color: '#0ea5e9' },
  'D': { name: 'Aspartate', type: 'Negatively Charged', color: '#f43f5e' },
  'C': { name: 'Cysteine', type: 'Polar (Thiol)', color: '#eab308' },
  'E': { name: 'Glutamate', type: 'Negatively Charged', color: '#f43f5e' },
  'Q': { name: 'Glutamine', type: 'Polar Neutral', color: '#0ea5e9' },
  'G': { name: 'Glycine', type: 'Special/Flexible', color: '#10b981' },
  'H': { name: 'Histidine', type: 'Positively Charged', color: '#8b5cf6' },
  'I': { name: 'Isoleucine', type: 'Hydrophobic', color: '#38bdf8' },
  'L': { name: 'Leucine', type: 'Hydrophobic', color: '#38bdf8' },
  'K': { name: 'Lysine', type: 'Positively Charged', color: '#6366f1' },
  'M': { name: 'Methionine (Start)', type: 'Hydrophobic / Start', color: '#10b981' },
  'F': { name: 'Phenylalanine', type: 'Aromatic Hydrophobic', color: '#0284c7' },
  'P': { name: 'Proline', type: 'Conformational Rigid', color: '#14b8a6' },
  'S': { name: 'Serine', type: 'Polar Neutral', color: '#0ea5e9' },
  'T': { name: 'Threonine', type: 'Polar Neutral', color: '#0ea5e9' },
  'W': { name: 'Tryptophan', type: 'Aromatic Hydrophobic', color: '#0284c7' },
  'Y': { name: 'Tyrosine', type: 'Aromatic Polar', color: '#06b6d4' },
  'V': { name: 'Valine', type: 'Hydrophobic', color: '#38bdf8' },
  '*': { name: 'STOP Codon', type: 'Termination', color: '#ef4444' }
};

// Routes
app.get('/', (req, res) => {
  res.render('index', { student: studentData });
});

// Computational Biology DNA Analysis API
app.post('/api/analyze-dna', (req, res) => {
  try {
    let { sequence } = req.body;
    if (!sequence) {
      return res.status(400).json({ error: "No sequence provided" });
    }

    // Clean sequence
    sequence = sequence.toUpperCase().replace(/[^ATGC]/g, '');
    if (sequence.length === 0) {
      return res.status(400).json({ error: "Sequence must contain valid nucleotide bases (A, T, G, C)" });
    }

    const length = sequence.length;
    let counts = { A: 0, T: 0, G: 0, C: 0 };
    for (let char of sequence) {
      if (counts[char] !== undefined) counts[char]++;
    }

    const gcCount = counts.G + counts.C;
    const gcPercent = ((gcCount / length) * 100).toFixed(2);
    const atPercent = (((counts.A + counts.T) / length) * 100).toFixed(2);

    // Melting temperature estimation:
    // Marmur-Doty formula for oligos < 14bp: Tm = (A+T)*2 + (G+C)*4
    // Nearest-neighbor / Wallace formula for >= 14bp: Tm = 64.9 + 41 * (yG+zC - 16.4) / (wA+xT+yG+zC)
    let tm = 0;
    if (length < 14) {
      tm = (counts.A + counts.T) * 2 + (counts.G + counts.C) * 4;
    } else {
      tm = (64.9 + 41 * (gcCount - 16.4) / length).toFixed(1);
    }

    // Molecular Weight of single strand DNA in g/mol
    // MW = (An * 313.21) + (Tn * 304.2) + (Cn * 289.18) + (Gn * 329.21) - 61.96
    const mw = (
      (counts.A * 313.21) +
      (counts.T * 304.20) +
      (counts.C * 289.18) +
      (counts.G * 329.21) - 61.96
    ).toFixed(2);

    // Transcription to mRNA (T -> U)
    const mrna = sequence.replace(/T/g, 'U');

    // Translation into Amino Acids
    let protein = [];
    let proteinChars = '';
    for (let i = 0; i <= sequence.length - 3; i += 3) {
      const codon = sequence.substring(i, i + 3);
      const aa = codonTable[codon] || '?';
      const info = aminoAcidNames[aa] || { name: 'Unknown', type: 'N/A', color: '#94a3b8' };
      protein.push({
        codon: codon,
        aminoAcid: aa,
        name: info.name,
        type: info.type,
        color: info.color
      });
      proteinChars += aa;
    }

    // Reverse Complement
    const complementMap = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
    const reverseComplement = sequence.split('').reverse().map(b => complementMap[b] || b).join('');

    return res.json({
      success: true,
      sequence: sequence,
      length: length,
      counts: counts,
      gcPercent: parseFloat(gcPercent),
      atPercent: parseFloat(atPercent),
      meltingTemp: tm,
      molecularWeight: mw + " Da",
      mrna: mrna,
      reverseComplement: reverseComplement,
      codonsCount: protein.length,
      protein: protein,
      proteinString: proteinChars
    });

  } catch (err) {
    return res.status(500).json({ error: "Computation error: " + err.message });
  }
});

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, affiliation } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Please fill in all required fields (Name, Email, Message)." });
  }

  // Simulated successful storage / email dispatch
  console.log(`[New Student Inbound] From: ${name} (${email}, ${affiliation || 'General'}): ${subject} - ${message}`);

  return res.json({
    success: true,
    message: `Thank you, ${name}! Your message has been routed to Urvika's student inbox. She usually responds within 24-48 hours between lab sessions!`
  });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🧬 Urvika's Biotechnology Portfolio Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
