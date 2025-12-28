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
        name: "Nail Clipper Replica",
        featured: true,
        type: "Digital",
        role: "Reverse Engineer",
        duration: "6 Days",
        tools: "Onshape, AutoCAD, Blender",
        status: "Case Study",
        year: "2025",
        category: "CAD / REVERSE ENG",
        skills: "MODELLING / RENDERING / DRAFTING",
        description:
            "Reverse-engineered mechanical assembly with focus on industrial rendering and technical documentation.",
        emoji: "✂️",
        tagline: "Turning a physical product into a digital twin",
        background:
            "Commonplace objects often hide clever engineering. The objective was to dissect a standard nail clipper to understand its compound lever mechanism and document it to an industrial manufacturing standard.",
        execution:
            "Recreated the assembly in Onshape with G2 continuous surfacing. Generated technical draft in AutoCAD and produced editorial-grade 'product launch' renders in Blender Cycles.",
        metrics: [{ label: "Part Count", value: "5" }],
        highlights: [
            "Reverse engineering of compound lever mechanism",
            "3D modeling for replicating ergonomic lever curvature",
            "Interference detection validating mechanism clearance",
            "Technical drawing via AutoCAD",
            "Industrial rendering with Blender Cycles",
        ],
        images: [
            {
                id: 1,
                caption: "Studio 'Hero' render in Polished Chrome",
                type: "render",
                src: "/images/works/001/hero.png",
            },
            {
                id: 2,
                caption: "Exploded view showing assembly order",
                type: "exploded",
                src: "/images/works/001/Exploded.png",
            },
            {
                id: 3,
                caption: "Manufacturing technical drawing (AutoCAD)",
                type: "detail",
                src: "/images/works/001/Drawing.png",
            },
            {
                id: 4,
                caption: "Section analysis showing internal mechanism",
                type: "section view",
                src: "/images/works/001/section.png",
            },
            {
                id: 5,
                caption: "Physical reference object",
                type: "photo",
                src: "/images/works/001/reference.png",
            },
        ],
        impactMetrics: [
            {
                label: "Visual Fidelity",
                before: "Physical",
                after: "Digital",
                improvement: "1:1 Match",
            },
        ],
        beforeAfter: [
            {
                id: 1,
                beforeCaption: "Physical Reference",
                afterCaption: "Digital Twin",
                beforeSrc: "/images/works/001/reference.png",
                afterSrc: "/images/works/001/hero.png",
            },
        ],
    },
    {
        id: "002",
        name: "Iris Aperture Mechanism",
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
