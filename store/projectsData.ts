export interface ProjectImage {
    id: number;
    caption: string;
    type: "render" | "exploded" | "section view" | "detail" | "photo" | "graph";
    src?: string;
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
        beforeSrc: string;
        afterSrc: string;
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
                src: "/images/works/001/drawing.png",
            },
            {
                id: 2,
                caption: "Exploded view of drive components",
                type: "exploded",
                src: "/images/works/001/sample.png",
            },
            {
                id: 3,
                caption: "Cross-section highlighting eccentric mechanism",
                type: "section view",
                src: "/images/works/001/final.png",
            },
            {
                id: 4,
                caption: "Tooth profile detail with measurement annotations",
                type: "detail",
                src: "/images/works/001/final.png",
            },
            {
                id: 5,
                caption: "Physical prototype during torque testing",
                type: "photo",
                src: "/images/works/001/final.png",
            },
            {
                id: 6,
                caption: "Backlash measurement results over 50 cycles",
                type: "graph",
                src: "/images/works/001/final.png",
            },
        ],
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
                beforeSrc: "/images/works/001/drawing.png",
                afterSrc: "/images/works/001/final.png",
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
                src: "/images/works/002/drawing.png",
            },
            {
                id: 2,
                caption: "50% aperture state showing blade overlap",
                type: "detail",
                src: "/images/works/002/final.png",
            },
        ],
        beforeAfter: [
            {
                id: 1,
                beforeCaption: "Disassembled regulator",
                afterCaption: "Complete CAD model",
                beforeSrc: "/images/works/002/drawing.png",
                afterSrc: "/images/works/002/final.png",
            },
        ],
    },
];
