export interface ProjectImage {
    id: number;
    caption: string;
    type: "render" | "exploded" | "section" | "detail" | "photo" | "graph";
    emoji?: string;
}

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface ProjectData {
    id: string;
    name: string;
    featured?: boolean;
    type: "Physical" | "Digital";
    role: string;
    duration: string;
    tools: string;
    status: string;
    year: string;
    category: string;
    skills: string;
    description: string;
    tagline?: string;
    background: string;
    execution: string;
    emoji?: string;
    metrics?: ProjectMetric[];
    highlights?: string[];
    images?: ProjectImage[];
    failures?: number[];
    failureNotes?: string;
    impactMetrics?: {
        label: string;
        before: string;
        after: string;
        improvement: string;
    }[];
    beforeAfter?: {
        id: number;
        beforeCaption: string;
        afterCaption: string;
        beforeEmoji: string; // Use emoji as placeholder, or image path later
        afterEmoji: string;
    }[];
}

export const projectsData: ProjectData[] = [
    {
        id: "001",
        name: "Cycloidal Drive Actuator",
        type: "Physical",
        role: "Solo Designer / Engineer",
        duration: "8 Weeks",
        tools: "SolidWorks, Fusion 360, Cura, Caliper",
        status: "Functional Prototype",
        year: "2025",
        category: "PROTOTYPE",
        skills: "SOLIDWORKS / FUSION 360",
        description:
            "High-torque robotic actuator with 20:1 reduction ratio. 3D printed ABS.",
        emoji: "🔧",
        tagline: "Achieved 20:1 torque multiplication at 94% cost savings",
        background:
            "Robotic applications require high-torque, low-backlash actuators in compact form factors. Commercial cycloidal drives are prohibitively expensive for student projects.",
        execution:
            "Designed and fabricated a 3D-printable cycloidal drive with 20:1 reduction ratio achieving <0.5° backlash in a 60mm diameter envelope using FDM-printed ABS.",
        metrics: [
            { label: "Reduction Ratio", value: "20:1" },
            { label: "Backlash", value: "<0.5°" },
            { label: "Max Torque", value: "15 Nm" },
            { label: "Weight", value: "180g" },
            { label: "Cost", value: "$12 USD" },
        ],
        highlights: [
            "Parametric tooth profile generation using involute equations",
            "Tolerance analysis for print-in-place assembly",
            "Custom eccentric bearing mount to minimize wobble",
            "Integrated torque testing rig for validation",
        ],
        images: [
            {
                id: 1,
                caption: "Isometric render showing assembled configuration",
                type: "render",
                emoji: "🔧",
            },
            {
                id: 2,
                caption: "Exploded view of drive components",
                type: "exploded",
                emoji: "💥",
            },
            {
                id: 3,
                caption: "Cross-section highlighting eccentric mechanism",
                type: "section",
                emoji: "✂️",
            },
            {
                id: 4,
                caption: "Tooth profile detail with measurement annotations",
                type: "detail",
                emoji: "🔍",
            },
            {
                id: 5,
                caption: "Physical prototype during torque testing",
                type: "photo",
                emoji: "📸",
            },
            {
                id: 6,
                caption: "Backlash measurement results over 50 cycles",
                type: "graph",
                emoji: "📊",
            },
        ],
        failures: [1, 2, 3],
        failureNotes:
            "Early prototypes exhibited excessive gear wobble due to undersized bearing races. Tolerance stacking required three iterations to achieve target backlash.",
        impactMetrics: [
            {
                label: "Cost Efficiency",
                before: "$200",
                after: "$12",
                improvement: "94% savings",
            },
        ],
        beforeAfter: [
            {
                id: 1,
                beforeCaption: "Initial hand sketch",
                afterCaption: "Final CAD model",
                beforeEmoji: "✏️",
                afterEmoji: "📐",
            },
        ],
    },
    {
        id: "002",
        name: "Iris Aperture Mechanism",
        featured: true,
        type: "Physical",
        role: "Lead Designer",
        duration: "6 Weeks",
        tools: "SOLIDWORKS, DFM Analysis",
        status: "Production Ready",
        year: "2025",
        category: "CAD / MFG",
        skills: "DFM / TOLERANCING",
        description:
            "Mechanical iris with 12 overlapping blades. Designed for flow control experiments.",
        emoji: "🔵",
        background:
            "Variable aperture mechanisms for fluid dynamics research require precise, repeatable control with minimal friction.",
        execution:
            "Developed a 12-blade iris mechanism with cam-driven actuation, achieving 0-90% aperture range with <2% repeatability error.",
        metrics: [
            { label: "Blade Count", value: "12" },
            { label: "Aperture Range", value: "0-90%" },
            { label: "Repeatability", value: "<2%" },
            { label: "Material", value: "Aluminum" },
        ],
        highlights: [
            "Blade overlap optimization for light-tight seal",
            "Cam profile designed for linear aperture response",
            "Anodized aluminum for corrosion resistance",
        ],
        images: [
            {
                id: 1,
                caption: "Fully closed configuration",
                type: "render",
                emoji: "🔵",
            },
            {
                id: 2,
                caption: "50% aperture state showing blade overlap",
                type: "render",
                emoji: "🔵",
            },
            {
                id: 3,
                caption: "Cam mechanism detail",
                type: "detail",
                emoji: "🔍",
            },
        ],
        beforeAfter: [
            {
                id: 1,
                beforeCaption: "Disassembled regulator",
                afterCaption: "Complete CAD model",
                beforeEmoji: "🔧",
                afterEmoji: "📐",
            },
        ],
    },
    {
        id: "003",
        name: "Rocket Nozzle Thermodynamics",
        type: "Digital",
        role: "Research Lead",
        duration: "10 Weeks",
        tools: "MATLAB, Python, CFD",
        status: "Published Research",
        year: "2024",
        category: "RESEARCH",
        skills: "PYTHON / MATLAB",
        description:
            "CFD analysis of bell nozzle efficiency at varying altitudes using MATLAB.",
        emoji: "🟡",
        background:
            "Optimizing rocket nozzle geometry for multi-altitude performance requires extensive computational analysis.",
        execution:
            "Developed MATLAB-based CFD simulation suite analyzing bell nozzle efficiency across 0-30km altitude range.",
        metrics: [
            { label: "Altitude Range", value: "0-30km" },
            { label: "Efficiency Gain", value: "+8.2%" },
            { label: "Sim Time", value: "45min" },
        ],
        highlights: [
            "Method of characteristics for nozzle contour optimization",
            "Validated against published NASA data",
            "Automated mesh generation for rapid iteration",
        ],
        images: [
            {
                id: 1,
                caption: "Pressure contour visualization at sea level",
                type: "graph",
                emoji: "📊",
            },
            {
                id: 2,
                caption: "Efficiency vs altitude curve comparison",
                type: "graph",
                emoji: "📊",
            },
        ],
    },
    {
        id: "004",
        name: "Compliant Flexure Clamp",
        featured: true,
        type: "Digital",
        role: "Solo Engineer",
        duration: "4 Weeks",
        tools: "ANSYS, FEA, SOLIDWORKS",
        status: "Prototype Testing",
        year: "2024",
        category: "SIMULATION",
        skills: "ANSYS / FEA",
        description:
            "Monolithic print-in-place mechanism utilizing flexure hinges for grip.",
        emoji: "🟢",
        background:
            "Traditional clamps require assembly and have friction losses. Compliant mechanisms eliminate these issues.",
        execution:
            "Designed monolithic flexure-based clamp achieving 50N grip force with single-piece 3D printable design.",
        metrics: [
            { label: "Grip Force", value: "50N" },
            { label: "Deflection", value: "15mm" },
            { label: "Cycles", value: "10,000+" },
        ],
        highlights: [
            "Pseudo-rigid-body model for force prediction",
            "Stress concentration mitigation via fillet optimization",
            "Print-in-place design eliminates assembly",
        ],
        images: [
            {
                id: 1,
                caption: "Stress analysis at maximum deflection",
                type: "graph",
                emoji: "📊",
            },
            {
                id: 2,
                caption: "Flexure hinge detail showing living hinge",
                type: "detail",
                emoji: "🔍",
            },
        ],
    },
];
