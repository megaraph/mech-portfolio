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
    {
        id: "edu-001",
        type: "education",
        title: "BS Mechanical Engineering",
        organization: "De La Salle University Manila",
        date: "2023–2027",
        description: "Focus: Robotics, Manufacturing, Design for Manufacturing",
        current: true,
    },
    {
        id: "cert-001",
        type: "certification",
        title: "SolidWorks Associate Certification",
        organization: "Dassault Systèmes",
        date: "2024",
        description: "CSWA - Mechanical Design",
    },
    // Add experience entries here as you get them
];

export const skills: Skill[] = [
    // Software
    { name: "SolidWorks", category: "software" },
    { name: "Fusion 360", category: "software" },
    { name: "ANSYS", category: "software" },
    { name: "MATLAB", category: "software" },
    { name: "Python", category: "software" },
    { name: "React", category: "software" },
    { name: "Figma", category: "software" },

    // Fabrication
    { name: "3D Printing (FDM/SLA)", category: "fabrication" },
    { name: "CNC Milling", category: "fabrication" },
    { name: "Laser Cutting", category: "fabrication" },
    { name: "Manual Machining", category: "fabrication" },

    // Specialties
    { name: "Mechanism Design", category: "specialty" },
    { name: "FEA/CFD", category: "specialty" },
    { name: "Rapid Prototyping", category: "specialty" },
    { name: "DFM", category: "specialty" },
    { name: "CAM", category: "specialty" },

    // Soft Skills
    { name: "Technical Writing", category: "soft" },
    { name: "Project Management", category: "soft" },
    { name: "Teaching/Mentoring", category: "soft" },
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
    { value: "∞", label: "Cups of Coffee" },
    { value: "5", label: "Programming Languages" },
    { value: "3", label: "Countries Visited" },
    { value: "1", label: "Passion for Making Things Work" },
];
