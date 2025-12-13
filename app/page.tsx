"use client";

import Intro from "@/components/Intro";
import { useStore } from "@/store/useStore";

export default function Home() {
    // Use the global key from the store
    const { introKey } = useStore();

    return (
        <>
            {/* The key prop forces a complete re-mount when it changes */}
            <Intro key={introKey} />

            <div className="min-h-screen p-6 md:p-12 lg:p-20">
                {/* Header */}
                <div className="mb-12 md:mb-20 pt-10 md:pt-0">
                    <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl opacity-100">
                        Featured
                        <br />
                        Works
                    </h2>
                    <div className="mt-6 flex gap-4 text-xs font-mono uppercase tracking-widest text-industrial-dim">
                        <span className="border border-industrial-ink px-3 py-1 rounded-full bg-industrial-ink text-white">
                            Solid = Physical
                        </span>
                        <span className="border border-industrial-ink px-3 py-1 rounded-full text-industrial-ink">
                            Hollow = Digital
                        </span>
                    </div>
                </div>

                {/* TABLE */}
                <div className="w-full border-t border-industrial-ink">
                    <div className="grid grid-cols-12 py-3 text-[10px] font-mono tracking-widest text-industrial-dim uppercase border-b border-industrial-ink/10">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-4 md:col-span-5">
                            Project Name
                        </div>
                        <div className="col-span-3 md:col-span-2 hidden md:block">
                            Skills
                        </div>
                        <div className="col-span-2 md:col-span-2">Category</div>
                        <div className="col-span-2 text-right">Type</div>
                    </div>

                    <ProjectRow
                        id="01"
                        title="Cycloidal Drive Actuator"
                        skills="SOLIDWORKS / FUSION 360"
                        category="PROTOTYPE"
                        type="PHYSICAL"
                    />
                    <ProjectRow
                        id="02"
                        title="Iris Aperture Mechanism"
                        skills="DFM / TOLERANCING"
                        category="CAD / MFG"
                        type="PHYSICAL"
                    />
                    <ProjectRow
                        id="03"
                        title="Rocket Nozzle Thermodynamics"
                        skills="PYTHON / MATLAB"
                        category="RESEARCH"
                        type="DIGITAL"
                    />
                    <ProjectRow
                        id="04"
                        title="Compliant Flexure Clamp"
                        skills="ANSYS / FEA"
                        category="SIMULATION"
                        type="DIGITAL"
                    />
                </div>
            </div>
        </>
    );
}

function ProjectRow({
    id,
    title,
    skills,
    category,
    type,
}: {
    id: string;
    title: string;
    skills: string;
    category: string;
    type: string;
}) {
    const isPhysical = type === "PHYSICAL";

    return (
        <div className="group grid grid-cols-12 py-6 border-b border-industrial-ink/10 items-center cursor-pointer hover:bg-white/50 transition-colors">
            <div className="col-span-1 font-mono text-sm text-industrial-dim group-hover:text-industrial-orange transition-colors">
                [{id}]
            </div>
            <div className="col-span-4 md:col-span-5 font-serif text-xl md:text-3xl group-hover:translate-x-2 transition-transform duration-300">
                {title}
            </div>
            <div className="col-span-3 md:col-span-2 hidden md:block font-mono text-[10px] text-industrial-dim uppercase tracking-tight">
                {skills}
            </div>
            <div className="col-span-2 md:col-span-2 font-mono text-xs text-industrial-dim uppercase">
                {category}
            </div>
            <div className="col-span-2 text-right">
                <span
                    className={`font-mono text-[9px] px-2 py-1 rounded-full border uppercase ${
                        isPhysical
                            ? "bg-industrial-ink text-white border-industrial-ink"
                            : "bg-transparent text-industrial-ink border-industrial-ink"
                    }`}
                >
                    {type}
                </span>
            </div>
        </div>
    );
}
