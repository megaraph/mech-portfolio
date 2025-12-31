export interface ProjectImage {
    id: number;
    caption: string;
    type:
        | "render"
        | "exploded"
        | "section view"
        | "detail"
        | "photo"
        | "graph"
        | "analysis";
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
                src: "/images/works/001/exploded.png",
            },
            {
                id: 3,
                caption: "Manufacturing technical drawing (AutoCAD)",
                type: "detail",
                src: "/images/works/001/drawing.png",
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
        name: "Rocket Static Fire Stand",
        featured: true,
        type: "Physical",
        role: "Lead Engineer",
        duration: "2 Weeks",
        tools: "Onshape, SimScale, Arduino, Python",
        status: "Operational",
        year: "2025",
        category: "AEROSPACE / GSE",
        skills: "WELDMENTS / FEA / DAQ / PYTHON",
        description:
            "Ground support equipment for static firing H-Class solid rocket motors with wireless telemetry.",
        emoji: "🚀",
        tagline:
            "Full-stack propulsion testing: From welded stainless frame to wireless telemetry",
        background:
            "Validating solid rocket motor performance requires a secured ground test platform capable of isolating thrust data from structural vibration while maintaining operator safety distance.",
        execution:
            "Designed a welded Stainless Steel 304 frame optimized for stiffness using FEA. Developed a custom wireless DAQ system (Arduino/NRF24L01) to stream real-time thrust curves to a Python dashboard from 100m safety range.",
        metrics: [
            { label: "Rated Capacity", value: "200N (Limit: Load Cell)" },
            { label: "Material", value: "Stainless Steel 304" },
            { label: "Max Stress", value: "67.6 MPa" },
            { label: "Min F.O.S.", value: "3.00" },
            { label: "Telemetry", value: "2.4GHz Wireless" },
        ],
        highlights: [
            "Generated weldment drawings and cut-lists for fabrication communication",
            "Finite Element Analysis (FEA) validating frame rigidity (<0.15mm deflection)",
            "Custom Python script for real-time serial plotting and CSV logging",
            "Integrated MCXK-E Load Cell with HX711 amplification circuit",
        ],
        images: [
            {
                id: 1,
                caption: "Test stand render showing motor mounting rails",
                type: "render",
                src: "/images/works/002/hero.png",
            },
            {
                id: 2,
                caption: "Exploded view of frame and sensor stack",
                type: "exploded",
                src: "/images/works/002/exploded.png",
            },
            {
                id: 3,
                caption: "Fabrication drawing for welder communication",
                type: "detail",
                src: "/images/works/002/drawing.png",
            },
            {
                id: 4,
                caption: "Physical assembly with blue solid motor installed",
                type: "photo",
                src: "/images/works/002/Reference.png",
            },
            {
                id: 5,
                caption:
                    "Von Mises Stress analysis showing safe load distribution (Max 67.6 MPa)",
                type: "analysis",
                src: "/images/works/002/fea-stress.png",
            },
            {
                id: 6,
                caption:
                    "Displacement analysis validating sensor isolation behavior",
                type: "analysis",
                src: "/images/works/002/fea-disp.png",
            },
        ],
        impactMetrics: [
            {
                label: "Safety Range",
                before: "10m (Wired)",
                after: "100m (Wireless)",
                improvement: "10x Standoff",
            },
        ],
        beforeAfter: [
            {
                id: 1,
                beforeCaption: "CAD Design Concept",
                afterCaption: "Fabricated Assembly",
                beforeSrc: "/images/works/002/hero.png",
                afterSrc: "/images/works/002/reference.png",
            },
        ],
    },
];
