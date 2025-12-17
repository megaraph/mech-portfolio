export interface TimelineEntry {
    id: string;
    type: "education" | "experience" | "certification" | "award";
    title: string;
    organization: string;
    date: string;
    description?: string;
    current?: boolean;
}

interface Skill {
    name: string;
    category: "software" | "fabrication" | "specialty" | "soft";
}

interface Principle {
    number: string;
    title: string;
    description: string;
}

interface Stat {
    value: string | number;
    label: string;
}

export const timelineData: TimelineEntry[] = [
    // EDUCATION
    {
        id: "edu-000",
        type: "education",
        title: "Senior High School - STEM Strand",
        organization: "De La Salle University-Integrated School Manila",
        date: "2022–2024",
        description:
            "Silver Academic Awardee, Outstanding Research | Remote Sensing & Agriculture",
        current: false,
    },
    {
        id: "edu-001",
        type: "education",
        title: "BS Mechanical Engineering",
        organization: "De La Salle University Manila",
        date: "2024–2028",
        description: "Specialization in Mechatronics",
        current: true,
    },

    // EXPERIENCES
    {
        id: "exp-000",
        type: "experience",
        title: "Electrical Committee - Trainee",
        organization: "DLSU Eco Car Team",
        date: "2024-2025",
        description:
            "Assisted in wiring and electrical system setup for DLSU's Eco Car. Designed an RFID system for organization-wide attendance management.",
    },
    {
        id: "exp-001",
        type: "experience",
        title: "Junior Associate",
        organization: "DLSU Archers Consulting Group",
        date: "2024-2025",
        description:
            "Participated and won in consulting case competitions focused on business strategy, operations, and marketing improvement.",
    },
    {
        id: "exp-002",
        type: "experience",
        title: "Externals Officer",
        organization: "Society of Manufacturing Engineers - DLSU",
        date: "2024-2025",
        description:
            "Assisted in contacting external organizational partners for events and sponsorships.",
    },

    // CERTIFICATIONS
    {
        id: "cert-000",
        type: "certification",
        title: "CS50x",
        organization: "Harvard University",
        date: "2021",
        description:
            "Introduction to computer science. Learned foundational programming concepts in C, Python, SQL, and JavaScript. https://certificates.cs50.io/1488bde8-f380-4a61-8906-fab47b1e63d4.pdf?size=letter",
    },
    {
        id: "cert-001",
        type: "certification",
        title: "Fundamentals of Deep Learning",
        organization: "NVIDIA",
        date: "2025",
        description:
            "Introduction to deep learning concepts and applications using NVIDIA's deep learning frameworks. https://learn.nvidia.com/certificates?id=OLF_HDWxQQCbM42YHD4drQ ",
    },
    // Add experience entries here as you get them
];

export const skills: Skill[] = [
    // Software
    { name: "SolidWorks", category: "software" },
    { name: "Fusion 360", category: "software" },
    { name: "OnShape", category: "software" },
    { name: "Blender", category: "software" },
    { name: "SimScale", category: "software" },
    { name: "MATLAB", category: "software" },
    { name: "Python", category: "software" },
    { name: "C/C++", category: "software" },
    { name: "SQL", category: "software" },
    { name: "React", category: "software" },
    { name: "Figma", category: "software" },

    // Fabrication
    { name: "3D Printing (FDM)", category: "fabrication" },
    { name: "CNC Milling", category: "fabrication" },
    { name: "Laser Cutting", category: "fabrication" },
    { name: "Manual Machining", category: "fabrication" },
    { name: "SMAW", category: "fabrication" },

    // Specialties
    { name: "Mechatronics", category: "specialty" },
    { name: "FEA/CFD", category: "specialty" },
    { name: "Rapid Prototyping", category: "specialty" },
    { name: "DFAM", category: "specialty" },
    { name: "CAM", category: "specialty" },

    // Soft Skills
    { name: "Technical Writing", category: "soft" },
    { name: "Project Management", category: "soft" },
    { name: "Presenting/Public Speaking", category: "soft" },
];

export const principles: Principle[] = [
    {
        number: "01",
        title: "Form Follows Function (But Function Can Be Beautiful)",
        description:
            "I don't compromise performance for aesthetics, but I believe good design considers both.",
    },
    {
        number: "02",
        title: "Iterate in Public",
        description:
            "Failed prototypes teach more than successful ones. I document the mess, not just the wins.",
    },
    {
        number: "03",
        title: "Engineering is Communication",
        description:
            "If I can't explain how it works, I don't understand it well enough. I value clarity over complexity.",
    },
    {
        number: "04",
        title: "Build, Measure, Learn",
        description:
            "CAD is the hypothesis. The prototype is the experiment. Data informs the next iteration.",
    },
];

export const stats: Stat[] = [
    { value: "247", label: "Prototypes Tested" },
    { value: "12", label: "Failed Prints This Month" },
    { value: "∞", label: "Glasses of Oat Milk" },
    { value: "5", label: "Programming Languages" },
    { value: "8", label: "Countries Visited" },
    { value: "1", label: "Passion for Making Things Work" },
];
