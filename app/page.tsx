"use client";

import Intro from "@/components/Intro";
import { useStore } from "@/store/useStore";
import { projectsData } from "@/store/projectsData";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
    const { introKey } = useStore();
    const router = useRouter();
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    return (
        <>
            <Intro key={introKey} />

            <div className="min-h-screen p-6 md:p-12 lg:p-20">
                {/* HEADER */}
                <div className="mb-12 pt-10 md:pt-0">
                    <h1 className="font-serif text-5xl font-semibold leading-[1.1] mb-2 text-industrial-ink">
                        Featured Works
                    </h1>
                    <p className="font-mono text-sm text-industrial-ink/60 uppercase tracking-wide">
                        A COMPREHENSIVE DIRECTORY OF DESIGN + ENGINEERING WORK
                    </p>
                </div>

                {/* LEGEND */}
                <div className="flex gap-6 mb-8 pb-6 border-b border-industrial-ink/10">
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full bg-industrial-ink text-industrial-paper font-mono text-xs">
                            SOLID
                        </div>
                        <span className="font-mono text-xs text-industrial-ink/60 uppercase">
                            Physical Work
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full border border-industrial-ink text-industrial-ink font-mono text-xs">
                            HOLLOW
                        </div>
                        <span className="font-mono text-xs text-industrial-ink/60 uppercase">
                            Digital Work
                        </span>
                    </div>
                </div>

                {/* TABLE */}
                <div className="w-full relative">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 pb-3 border-b border-industrial-ink/20 font-mono uppercase text-xs font-semibold text-industrial-dim tracking-wider">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-4 md:col-span-4">
                            Project Name
                        </div>
                        <div className="col-span-3 hidden md:block">Skills</div>
                        <div className="col-span-2 hidden md:block">
                            Category
                        </div>
                        <div className="col-span-2 md:col-span-1">Year</div>
                        <div className="col-span-3 md:col-span-1 text-right">
                            Type
                        </div>
                    </div>

                    {/* Rows */}
                    {projectsData.map((project, index) => {
                        const isHovered = hoveredProject === project.id;
                        const isDimmed = hoveredProject !== null && !isHovered;

                        return (
                            <motion.div
                                key={project.id}
                                // CHANGED: Reduced blur to 0.5px and increased opacity to 30% for better legibility
                                className={`hover-target grid grid-cols-12 gap-4 py-4 border-b border-industrial-ink/10 cursor-pointer group relative items-center transition-all duration-300 ${
                                    isDimmed
                                        ? "opacity-30 blur-[0.5px]"
                                        : "opacity-100"
                                }`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                }}
                                onMouseEnter={() =>
                                    setHoveredProject(project.id)
                                }
                                onMouseLeave={() => setHoveredProject(null)}
                                onClick={() =>
                                    router.push(`/works/${project.id}`)
                                }
                            >
                                {/* ID - Now triggers Cipher on row hover */}
                                <div className="col-span-1 font-mono text-sm text-industrial-dim group-hover:text-industrial-orange transition-colors">
                                    <Cipher
                                        text={project.id}
                                        trigger={isHovered}
                                    />
                                </div>

                                {/* Name */}
                                <div className="col-span-4 md:col-span-4 font-mono text-sm font-medium text-industrial-ink group-hover:text-industrial-orange transition-colors">
                                    {project.name}
                                </div>

                                {/* Skills */}
                                <div className="col-span-3 hidden md:block font-mono text-[10px] text-industrial-dim uppercase tracking-tight">
                                    {project.skills}
                                </div>

                                {/* Category */}
                                <div className="col-span-2 hidden md:block">
                                    <span className="font-mono text-[10px] px-2 py-1 rounded bg-industrial-ink/5 text-industrial-dim uppercase">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Year */}
                                <div className="col-span-2 md:col-span-1 font-mono text-xs text-industrial-ink">
                                    {project.year}
                                </div>

                                {/* Type */}
                                <div className="col-span-3 md:col-span-1 text-right">
                                    {project.type === "Physical" ? (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-industrial-ink text-white font-mono text-[9px] uppercase">
                                            PHYSICAL
                                        </span>
                                    ) : (
                                        <span className="inline-flex px-3 py-1 rounded-full border border-industrial-ink text-industrial-ink font-mono text-[9px] uppercase">
                                            DIGITAL
                                        </span>
                                    )}
                                </div>

                                {/* Hover Preview */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            className="hidden lg:block absolute left-[85%] top-0 w-72 p-4 bg-white border border-industrial-ink/10 shadow-xl z-20 backdrop-blur-sm"
                                            initial={{
                                                opacity: 0,
                                                x: -10,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: -10,
                                                scale: 0.95,
                                            }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <h4 className="font-mono text-xs font-bold mb-2 text-industrial-ink">
                                                {project.name}
                                            </h4>
                                            <p className="font-mono text-[10px] leading-relaxed text-industrial-dim">
                                                {project.description}
                                            </p>
                                            <div className="mt-3 pt-2 border-t border-industrial-ink/5 flex justify-between items-center">
                                                <span className="font-mono text-[9px] text-industrial-orange uppercase">
                                                    View Specs
                                                </span>
                                                <span className="text-industrial-orange text-xs">
                                                    →
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

function Cipher({ text, trigger }: { text: string; trigger: boolean }) {
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        // Only run the animation logic if triggered
        if (trigger) {
            const chars = "0123456789";
            let iterations = 0;

            const interval = setInterval(() => {
                setDisplay(
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iterations) return text[index];
                            return chars[Math.floor(Math.random() * 10)];
                        })
                        .join("")
                );

                if (iterations >= text.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 30);

            return () => {
                clearInterval(interval);
            };
        }
    }, [trigger, text]);

    return (
        <span className="inline-block tabular-nums">
            {/* FIX: If not triggered, just render the original text directly.
         This bypasses the need to set state inside useEffect.
      */}
            {trigger ? display : text}
        </span>
    );
}
