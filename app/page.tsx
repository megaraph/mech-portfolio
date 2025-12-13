"use client";

import Intro from "@/components/Intro";

export default function Home() {
    return (
        <main className="min-h-screen w-full relative bg-industrial-paper text-industrial-ink overflow-hidden selection:bg-industrial-orange selection:text-white">
            {/* 1. THE INTRO LAYER (Z-Index 50) */}
            {/* This sits on top and slides up when finished */}
            <Intro />

            {/* 2. THE MAIN SYSTEM (Z-Index 0) */}
            {/* This is the actual portfolio that gets revealed */}
            <div className="flex h-screen w-full">
                {/* GLOBAL SIDEBAR (Fixed Left) */}
                <aside className="hidden w-[300px] flex-col justify-between border-r border-industrial-ink/10 p-8 md:flex z-10 bg-industrial-paper/80 backdrop-blur-sm">
                    {/* Top: Identity */}
                    <div>
                        <h1 className="font-serif text-4xl leading-none">
                            Raphael
                            <br />
                            Murillo
                        </h1>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="h-2 w-2 bg-industrial-orange rounded-full animate-pulse"></span>
                            <p className="font-mono text-[10px] tracking-widest text-industrial-dim uppercase">
                                Mech. Engineer // DLSU
                            </p>
                        </div>
                    </div>

                    {/* Middle: Navigation System */}
                    <nav className="flex flex-col gap-3 font-mono text-sm">
                        <div className="flex items-center gap-3 text-industrial-orange font-bold cursor-pointer">
                            <span>[00]</span>
                            <span>INDEX</span>
                        </div>
                        <div className="flex items-center gap-3 text-industrial-dim hover:text-industrial-ink transition-colors cursor-pointer group">
                            <span className="group-hover:text-industrial-orange transition-colors">
                                [01]
                            </span>
                            <span>WORKS</span>
                        </div>
                        <div className="flex items-center gap-3 text-industrial-dim hover:text-industrial-ink transition-colors cursor-pointer group">
                            <span className="group-hover:text-industrial-orange transition-colors">
                                [02]
                            </span>
                            <span>LAB</span>
                        </div>
                        <div className="flex items-center gap-3 text-industrial-dim hover:text-industrial-ink transition-colors cursor-pointer group">
                            <span className="group-hover:text-industrial-orange transition-colors">
                                [03]
                            </span>
                            <span>SPECS</span>
                        </div>
                    </nav>

                    {/* Bottom: Status */}
                    <div className="font-mono text-[10px] text-industrial-dim">
                        <p>STATUS: ONLINE</p>
                        <p>LOC: MANILA, PH</p>
                        <p className="mt-2 text-industrial-ink/40">© 2025</p>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA (Scrollable Right) */}
                <section className="flex-1 relative overflow-y-auto">
                    {/* The Dot Grid Texture (Absolute Background) */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#000 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />

                    {/* The Content Container */}
                    <div className="relative z-10 min-h-full p-6 md:p-12 lg:p-20">
                        {/* Section Header */}
                        <div className="mb-12 md:mb-20">
                            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl opacity-100">
                                Selected
                                <br />
                                Works
                            </h2>
                        </div>

                        {/* The "Bill of Materials" Table */}
                        <div className="w-full border-t border-industrial-ink">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 py-3 text-[10px] font-mono tracking-widest text-industrial-dim uppercase border-b border-industrial-ink/10">
                                <div className="col-span-1">ID</div>
                                <div className="col-span-6 md:col-span-7">
                                    Project Name
                                </div>
                                <div className="col-span-2 md:col-span-2 text-right md:text-left">
                                    Year
                                </div>
                                <div className="col-span-3 md:col-span-2 text-right">
                                    Type
                                </div>
                            </div>

                            {/* Project Rows */}
                            <ProjectRow
                                id="01"
                                title="Cycloidal Drive Actuator"
                                year="2025"
                                type="PROTOTYPE"
                                isPhysical={true}
                            />
                            <ProjectRow
                                id="02"
                                title="Iris Aperture Mechanism"
                                year="2025"
                                type="CAD / MFG"
                                isPhysical={true}
                            />
                            <ProjectRow
                                id="03"
                                title="Rocket Nozzle Thermodynamics"
                                year="2024"
                                type="RESEARCH"
                                isPhysical={false}
                            />
                            <ProjectRow
                                id="04"
                                title="Compliant Flexure Clamp"
                                year="2024"
                                type="SIMULATION"
                                isPhysical={false}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

// A simple sub-component for the table rows to keep code clean
function ProjectRow({
    id,
    title,
    year,
    type,
    isPhysical,
}: {
    id: string;
    title: string;
    year: string;
    type: string;
    isPhysical: boolean;
}) {
    return (
        <div className="group grid grid-cols-12 py-6 border-b border-industrial-ink/10 items-center cursor-pointer hover:bg-white/50 transition-colors">
            <div className="col-span-1 font-mono text-sm text-industrial-dim group-hover:text-industrial-orange transition-colors">
                [{id}]
            </div>
            <div className="col-span-6 md:col-span-7 font-serif text-xl md:text-3xl group-hover:translate-x-2 transition-transform duration-300">
                {title}
            </div>
            <div className="col-span-2 md:col-span-2 font-mono text-xs text-industrial-dim">
                {year}
            </div>
            <div className="col-span-3 md:col-span-2 text-right">
                <span
                    className={`
                    font-mono text-[9px] px-2 py-1 rounded-full border
                    ${
                        isPhysical
                            ? "bg-industrial-ink text-white border-industrial-ink" // Solid Pill (Physical)
                            : "bg-transparent text-industrial-ink border-industrial-ink" // Hollow Pill (Digital)
                    }
                `}
                >
                    {type}
                </span>
            </div>
        </div>
    );
}
