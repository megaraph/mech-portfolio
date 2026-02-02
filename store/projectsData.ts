export interface ProjectLink {
    label: string;
    url: string;
}

export interface ProjectImage {
    id: number;
    caption: string;
    type:
        | "render"
        | "exploded"
        | "section view"
        | "schematic"
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
    links?: ProjectLink[];
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
                src: "/images/works/002/reference.png",
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
    {
        id: "003",
        name: "Tuned Mass Damper Experiment",
        featured: true,
        type: "Physical",
        role: "Lead Researcher",
        duration: "1 Week",
        tools: "Python (SciPy), Arduino, MPU-6050",
        status: "Experimental Validation",
        year: "2025",
        category: "STRUCTURAL DYNAMICS",
        skills: "SIGNAL PROCESSING / DAQ / VIBRATION ANALYSIS",
        description:
            "Experimental validation of passive vibration control systems using a variable-stiffness oscillating tower and custom Python telemetry.",
        emoji: "📉",
        tagline:
            "Mitigating structural resonance through frequency-tuned passive damping",
        background:
            "Modern skyscrapers are susceptible to wind and seismic oscillations that compromise structural integrity. The objective was to empirically validate the physics of a Tuned Mass Damper (TMD) using a simplified Single Degree of Freedom (SDOF) model.",
        execution:
            "Constructed a flexible testing rig with an adjustable pendulum damper. Developed a custom DAQ system using an MPU-6050 accelerometer and Arduino to stream real-time vibration data to a Python dashboard for Fast Fourier Transform (FFT) analysis.",
        metrics: [
            { label: "Damping Increase", value: "+68%" }, // Improvement in Log Dec [cite: 25]
            { label: "Natural Freq", value: "2.29 Hz" }, // Measured fn [cite: 21]
            { label: "Tuning Length", value: "47.3 mm" }, // Calculated L [cite: 23]
            { label: "Sample Rate", value: "100 Hz" }, // Sensor capability [cite: 191]
            { label: "Algorithm", value: "Savitzky-Golay" }, // Filtering method [cite: 193]
        ],
        highlights: [
            "Real-time signal processing pipeline using Python (SciPy/Matplotlib)",
            "Logarithmic decrement analysis to quantify energy dissipation efficiency",
            "Frequency domain identification (FFT) of structural natural modes",
            "Hardware integration of MEMS accelerometers with serial telemetry",
        ],
        links: [
            {
                label: "Read Paper",
                url: "https://drive.google.com/file/d/1Urj53TkxPSavPeiYhQufXObDKXYTeD-Y/view?usp=sharing",
            },
            {
                label: "View Code",
                url: "https://colab.research.google.com/drive/1E1IHy9mQynIf_j31I1eUttf3Zw4tPvlu?usp=sharing",
            },
        ],
        images: [
            {
                id: 1,
                caption:
                    "Variable stiffness tower with adjustable pendulum damper",
                type: "photo",
                src: "/images/works/003/hero.png",
            },
            {
                id: 2,
                caption:
                    "Amplitude decay comparison illustrating energy transfer (Beat Pattern)",
                type: "graph",
                src: "/images/works/003/result.png",
            },
            {
                id: 3,
                caption:
                    "DAQ architecture: MPU-6050 integration with Arduino interface",
                type: "schematic",
                src: "/images/works/003/schematic.png",
            },
            {
                id: 4,
                caption:
                    "Frequency domain analysis identifying natural frequency (2.29 Hz)",
                type: "analysis",
                src: "/images/works/003/fft.png",
            },
            {
                id: 5,
                caption:
                    "Real-time Python telemetry dashboard for vibration monitoring",
                type: "photo",
                src: "/images/works/003/lab.png",
            },
        ],
        impactMetrics: [
            {
                label: "Damping (Log Dec)",
                before: "0.264",
                after: "0.444",
                improvement: "+68%",
            },
        ],
        beforeAfter: [
            {
                id: 1,
                beforeCaption: "Untuned Oscillation",
                afterCaption: "Tuned Damping",
                beforeSrc: "/images/works/003/untuned.png",
                afterSrc: "/images/works/003/tuned.png",
            },
        ],
    },
    {
        id: "004",
        name: "Adaptive Vacuum Nozzle",
        featured: true,
        type: "Physical",
        role: "Design Engineer",
        duration: "2 Days",
        tools: "SimScale (CFD), OnShape, Orca Slicer, Bambu Lab A1",
        status: "Operational",
        year: "2026",
        category: "FLUID DYNAMICS / ADDITIVE MFG",
        skills: "CFD ANALYSIS / DFAM / RAPID PROTOTYPING",
        description:
            "Development of a high-velocity vacuum cleaner attachment for precision cleaning of the Bambu Lab A1 eletronics bay, featuring a passive bypass system for motor thermal management.",
        emoji: "💨",
        tagline:
            "Safely maintaining airflow and suction performance in tight electronic enclosures",
        background:
            "Cleaning the electronics bay of consumer 3D printers in high-density condo environments presents unique contamination challenges such as dust, cockroach waste and eggs, and other types of debris. Narrow geometries can easily block standard vacuum nozzles, leading to sudden airflow restriction that causes 600 W vacuum motors to rapidly overheat or stall.",
        execution:
            "Designed and fabricated a custom vacuum nozzle with a passive airflow bypass that maintains intake flow if the primary opening becomes obstructed. The internal geometry balances suction effectiveness with motor safety by reducing sudden inlet restriction. Airflow behavior was validated using CFD in SimScale, and the part was optimized for FDM printing that minimized the need for unnecessary amounts of internal supports.",
        metrics: [
            { label: "Tip Velocity", value: "32+ m/s" }, // Confirmed via CFD Streamlines
            { label: "Pressure Drop", value: "-2.0 kPa" }, // Minimal motor impedance
            { label: "Tip Clearance", value: "8.0 mm" }, // Geometric constraint met
            { label: "Reynolds No.", value: "32,800" }, // Validated by Reynolds check
            { label: "Material", value: "Matte PLA" }, // Aesthetic choice
        ],
        highlights: [
            "Passive Bypass Architecture to prevent vacuum motor stall/overheating",
            "CFD validation of pressure recovery and laminar flow topology",
            "Venturi-accelerated tip velocity (>30 m/s) for heavy debris entrainment",
        ],
        images: [
            {
                id: 1,
                caption:
                    "Matte black PLA prototype rendered in Blender with chamfered 'Industrial Editor' topology",
                type: "photo",
                src: "/images/works/004/hero.jpg",
            },
            {
                id: 2,
                caption:
                    "Operational clearance check within the restricted geometry of the Y-axis electronics bay",
                type: "photo",
                src: "/images/works/004/insitu.jpg",
            },
            {
                id: 3,
                caption:
                    "CFD simulation confirms Venturi-accelerated tip velocity (>38 m/s) for debris entrainment",
                type: "analysis",
                src: "/images/works/004/cfd-velocity-cleaning.png",
            },
            {
                id: 4,
                caption:
                    "Pressure gradient simulation proving efficient pressure recovery (-2 kPa drop)",
                type: "analysis",
                src: "/images/works/004/cfd-pressure-side.png",
            },
            {
                id: 5,
                caption:
                    "Integrated passive bypass array (knurled section) decoupling cooling airflow from suction velocity",
                type: "photo",
                src: "/images/works/004/vents.jpg",
            },
            {
                id: 6,
                caption: "Orthographic projections",
                type: "schematic",
                src: "/images/works/004/drawing.png",
            },
            {
                id: 7,
                caption: "Final Physical Product",
                type: "schematic",
                src: "/images/works/004/physical.jpg",
            },
        ],
        impactMetrics: [
            {
                label: "Geometric Clearance",
                before: "35.0 mm (Standard OEM)",
                after: "8.0 mm (Custom Profile)",
                improvement: "4.3x Access",
            },
        ],
    },
];
