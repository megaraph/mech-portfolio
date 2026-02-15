"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/store/projectsData";
import Cipher from "@/components/Cipher";

// ─── DERIVE UNIQUE CATEGORIES FROM DATA ───────────────────────────────────────
const ALL_CATEGORIES = Array.from(
    new Set(projectsData.map((p) => p.category)),
).sort();

export default function WorksPage() {
    const router = useRouter();
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [activeType, setActiveType] = useState<
        "All" | "Physical" | "Digital"
    >("All");
    const [activeCategory, setActiveCategory] = useState<string>("All");

    // ─── FILTERED LIST ─────────────────────────────────────────────────────────
    const filteredProjects = useMemo(() => {
        return projectsData.filter((p) => {
            const typeMatch = activeType === "All" || p.type === activeType;
            const catMatch =
                activeCategory === "All" || p.category === activeCategory;
            return typeMatch && catMatch;
        });
    }, [activeType, activeCategory]);

    const totalCount = projectsData.length;
    const filteredCount = filteredProjects.length;
    const isFiltered = filteredCount !== totalCount;

    return (
        <div className="min-h-screen p-6 md:p-12 lg:p-20">
            {/* ══════════════════════════════════════════════
                HEADER
            ══════════════════════════════════════════════ */}
            <div className="mb-10 pt-10 md:pt-0">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <h1 className="font-serif text-5xl leading-[1.1] text-industrial-ink">
                        Works Directory
                    </h1>
                    {/* Live count — updates with filters */}
                    <div className="font-mono text-[10px] text-industrial-ink/30 uppercase tracking-widest self-end pb-2">
                        <motion.span
                            key={filteredCount}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={
                                isFiltered ? "text-industrial-orange" : ""
                            }
                        >
                            {filteredCount.toString().padStart(2, "0")}
                        </motion.span>
                        <span>
                            {" "}
                            / {totalCount.toString().padStart(2, "0")} Projects
                        </span>
                    </div>
                </div>
                <p className="text-sm text-industrial-ink/50 max-w-lg leading-relaxed">
                    A living record of design and engineering work — from first
                    sketch to final build.
                </p>
            </div>

            {/* ══════════════════════════════════════════════
                FILTER BAR — replaces the static legend
            ══════════════════════════════════════════════ */}
            <div className="mb-8 pb-6 border-b border-industrial-ink/10 space-y-4">
                {/* Type filters — these ARE the legend */}
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-[9px] text-industrial-ink/30 uppercase tracking-[0.25em] mr-1">
                        Type
                    </span>

                    {/* All */}
                    <button
                        onClick={() => setActiveType("All")}
                        className={`hover-target font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 transition-all duration-200 ${
                            activeType === "All"
                                ? "bg-industrial-ink text-industrial-paper"
                                : "text-industrial-ink/50 hover:text-industrial-ink border border-industrial-ink/20 hover:border-industrial-ink/50"
                        }`}
                    >
                        All
                    </button>

                    {/* Physical — solid pill mirrors the badge */}
                    <button
                        onClick={() => setActiveType("Physical")}
                        className={`hover-target font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 ${
                            activeType === "Physical"
                                ? "bg-industrial-ink text-white"
                                : "border border-industrial-ink/30 text-industrial-ink/50 hover:text-industrial-ink hover:border-industrial-ink/60"
                        }`}
                    >
                        Physical
                    </button>

                    {/* Digital — hollow pill mirrors the badge */}
                    <button
                        onClick={() => setActiveType("Digital")}
                        className={`hover-target font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full transition-all duration-200 ${
                            activeType === "Digital"
                                ? "border-2 border-industrial-ink bg-transparent text-industrial-ink font-bold"
                                : "border border-industrial-ink/30 text-industrial-ink/50 hover:text-industrial-ink hover:border-industrial-ink/60"
                        }`}
                    >
                        Digital
                    </button>

                    {/* Reset — only shows when filtered */}
                    <AnimatePresence>
                        {isFiltered && (
                            <motion.button
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => {
                                    setActiveType("All");
                                    setActiveCategory("All");
                                }}
                                className="hover-target font-mono text-[9px] uppercase tracking-wider text-industrial-orange/70 hover:text-industrial-orange transition-colors ml-2"
                            >
                                ✕ Clear
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* Category filters */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[9px] text-industrial-ink/30 uppercase tracking-[0.25em] mr-1">
                        Category
                    </span>
                    <button
                        onClick={() => setActiveCategory("All")}
                        className={`hover-target font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 transition-all duration-200 ${
                            activeCategory === "All"
                                ? "bg-industrial-orange text-white"
                                : "bg-industrial-ink/5 text-industrial-ink/40 hover:bg-industrial-ink/10 hover:text-industrial-ink/70"
                        }`}
                    >
                        All
                    </button>
                    {ALL_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`hover-target font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 transition-all duration-200 ${
                                activeCategory === cat
                                    ? "bg-industrial-orange text-white"
                                    : "bg-industrial-ink/5 text-industrial-ink/40 hover:bg-industrial-ink/10 hover:text-industrial-ink/70"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* ══════════════════════════════════════════════
                TABLE
            ══════════════════════════════════════════════ */}
            <div className="w-full relative">
                {/* Column headers */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-industrial-ink/20 font-mono uppercase text-[10px] font-semibold text-industrial-dim tracking-wider">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-5 md:col-span-4">Project Name</div>
                    <div className="col-span-3 hidden md:block">Skills</div>
                    <div className="col-span-2 hidden md:block">Category</div>
                    <div className="col-span-3 md:col-span-1">Year</div>
                    <div className="col-span-3 md:col-span-1 text-right">
                        Type
                    </div>
                </div>

                {/* Empty state */}
                <AnimatePresence>
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-16 text-center"
                        >
                            <p className="font-mono text-xs text-industrial-ink/30 uppercase tracking-widest">
                                No projects match this filter
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Rows */}
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => {
                        const isHovered = hoveredProject === project.id;
                        const isDimmed = hoveredProject !== null && !isHovered;

                        return (
                            <motion.div
                                key={project.id}
                                layout
                                className={`hover-target grid grid-cols-12 gap-4 py-4 border-b border-industrial-ink/10 cursor-pointer group relative items-center transition-all duration-300 ${
                                    isDimmed
                                        ? "opacity-30 blur-[0.5px]"
                                        : "opacity-100"
                                }`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{
                                    duration: 0.25,
                                    delay: index * 0.04,
                                }}
                                onMouseEnter={() =>
                                    setHoveredProject(project.id)
                                }
                                onMouseLeave={() => setHoveredProject(null)}
                                onClick={() =>
                                    router.push(`/works/${project.id}`)
                                }
                            >
                                {/* ID + featured dot */}
                                <div className="col-span-1 font-mono text-sm text-industrial-dim group-hover:text-industrial-orange transition-colors flex items-center gap-1.5">
                                    <Cipher
                                        text={project.id}
                                        trigger={isHovered}
                                    />
                                    {project.featured && (
                                        <span
                                            className="w-1.5 h-1.5 rounded-full bg-industrial-orange flex-shrink-0 opacity-70"
                                            title="Featured"
                                        />
                                    )}
                                </div>

                                {/* Project name — serif on hover for editorial feel */}
                                <div className="col-span-5 md:col-span-4">
                                    <span className="font-mono text-sm font-medium text-industrial-ink group-hover:text-industrial-orange transition-colors duration-200">
                                        {project.name}
                                    </span>
                                </div>

                                {/* Skills */}
                                <div className="col-span-3 hidden md:block font-mono text-[10px] text-industrial-dim uppercase tracking-tight">
                                    {project.skills}
                                </div>

                                {/* Category */}
                                <div className="col-span-2 hidden md:block">
                                    <span className="font-mono text-[10px] px-2 py-1 bg-industrial-ink/5 text-industrial-dim uppercase">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Year */}
                                <div className="col-span-3 md:col-span-1 font-mono text-xs text-industrial-ink/60">
                                    {project.year}
                                </div>

                                {/* Type badge */}
                                <div className="col-span-3 md:col-span-1 text-right">
                                    {project.type === "Physical" ? (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-industrial-ink text-white font-mono text-[9px] uppercase">
                                            Physical
                                        </span>
                                    ) : (
                                        <span className="inline-flex px-3 py-1 rounded-full border border-industrial-ink text-industrial-ink font-mono text-[9px] uppercase">
                                            Digital
                                        </span>
                                    )}
                                </div>

                                {/* ── HOVER PREVIEW CARD ──────────────────────── */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            className="hidden lg:block absolute top-1/2 -translate-y-1/2 w-72 z-20"
                                            style={{ left: "52%" }}
                                            initial={{
                                                opacity: 0,
                                                x: -8,
                                                scale: 0.97,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: -8,
                                                scale: 0.97,
                                            }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <div className="bg-industrial-paper border border-industrial-ink/12 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-5">
                                                {/* Category label in mono */}
                                                <p className="font-mono text-[9px] text-industrial-orange uppercase tracking-[0.25em] mb-2">
                                                    {project.category}
                                                </p>

                                                {/* Project name in serif — correct per ethos */}
                                                <h4 className="font-serif text-base text-industrial-ink leading-snug mb-2">
                                                    {project.name}
                                                </h4>

                                                {/* Description in plain text — not mono */}
                                                <p className="text-xs text-industrial-ink/55 leading-relaxed mb-4">
                                                    {project.description}
                                                </p>

                                                {/* Metrics strip if available */}
                                                {project.metrics &&
                                                    project.metrics.length >
                                                        0 && (
                                                        <div className="flex gap-4 pt-3 border-t border-industrial-ink/8 mb-4">
                                                            {project.metrics
                                                                .slice(0, 2)
                                                                .map((m, i) => (
                                                                    <div
                                                                        key={i}
                                                                    >
                                                                        <div className="font-mono text-sm font-bold text-industrial-ink">
                                                                            {
                                                                                m.value
                                                                            }
                                                                        </div>
                                                                        <div className="font-mono text-[8px] text-industrial-ink/35 uppercase tracking-wider">
                                                                            {
                                                                                m.label
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}

                                                <div className="flex justify-between items-center pt-3 border-t border-industrial-ink/8">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-[8px] text-industrial-ink/30 uppercase">
                                                            {project.year}
                                                        </span>
                                                        {project.featured && (
                                                            <span className="font-mono text-[8px] text-industrial-orange/60 uppercase tracking-wider">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="font-mono text-[9px] text-industrial-orange uppercase tracking-wider">
                                                        View Specs &rarr;
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Footer count */}
                {filteredProjects.length > 0 && (
                    <div className="pt-6 flex justify-between items-center">
                        <p className="font-mono text-[9px] text-industrial-ink/25 uppercase tracking-widest">
                            End of directory
                        </p>
                        <p className="font-mono text-[9px] text-industrial-ink/25 uppercase tracking-widest">
                            {filteredCount} / {totalCount} shown
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
