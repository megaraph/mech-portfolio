"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, ZoomIn } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { projectsData } from "@/store/projectsData";

export default function WorksDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const project = projectsData.find((p) => p.id === projectId);
    const currentIndex = projectsData.findIndex((p) => p.id === projectId);
    const otherProjects = projectsData.filter((p) => p.id !== projectId);

    const [scrollProgress, setScrollProgress] = useState(0);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollableDiv = document.getElementById("scrollable-content");
            if (scrollableDiv) {
                const scrollTop = scrollableDiv.scrollTop;
                const scrollHeight =
                    scrollableDiv.scrollHeight - scrollableDiv.clientHeight;
                const progress = (scrollTop / scrollHeight) * 100;
                setScrollProgress(progress);
            }
        };

        const scrollableDiv = document.getElementById("scrollable-content");
        scrollableDiv?.addEventListener("scroll", handleScroll);
        return () => scrollableDiv?.removeEventListener("scroll", handleScroll);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Project not found
            </div>
        );
    }

    const handlePrevProject = () => {
        const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : projectsData.length - 1;
        router.push(`/works/${projectsData[prevIndex].id}`);
    };

    const handleNextProject = () => {
        const nextIndex =
            currentIndex < projectsData.length - 1 ? currentIndex + 1 : 0;
        router.push(`/works/${projectsData[nextIndex].id}`);
    };

    return (
        <div className="min-h-screen bg-industrial-paper text-industrial-ink font-mono">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 md:left-[300px] h-1 bg-industrial-orange z-50"
                style={{ width: `${scrollProgress}%` }}
                transition={{ duration: 0.1 }}
            />

            {/* Breadcrumb */}
            <div className="fixed top-0 left-0 md:left-[300px] right-0 bg-industrial-paper/95 backdrop-blur-sm border-b border-industrial-ink/10 z-40 px-6 py-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
                    <button
                        onClick={() => router.push("/works")}
                        className="text-industrial-ink/40 hover:text-industrial-orange transition-colors"
                    >
                        [01] Works
                    </button>
                    <span className="text-industrial-ink/20">/</span>
                    <span className="text-industrial-orange">
                        {project.name}
                    </span>
                </div>
            </div>

            <div className="flex pt-16">
                {/* LEFT COLUMN - Fixed Specs */}
                <div className="hidden lg:block w-[35%] min-w-[400px] h-screen sticky top-16 p-8 pr-6 overflow-y-auto border-r border-industrial-ink/10">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-serif text-4xl mb-2 leading-tight">
                            {project.name}
                        </h1>
                        <p className="text-xs text-industrial-dim uppercase tracking-wider">
                            Project {project.id} — {project.year}
                        </p>
                    </div>

                    {/* Specification Table */}
                    <div className="mb-8 space-y-3 pb-8 border-b border-industrial-ink/10">
                        <SpecRow label="TYPE" value={project.type} />
                        <SpecRow label="ROLE" value={project.role} />
                        <SpecRow label="DURATION" value={project.duration} />
                        <SpecRow label="TOOLS" value={project.tools} />
                        <SpecRow
                            label="STATUS"
                            value={project.status}
                            highlight
                        />
                    </div>

                    {/* Problem Statement */}
                    <div className="mb-6">
                        <h3 className="text-[10px] uppercase tracking-widest text-industrial-orange mb-3">
                            Problem Statement
                        </h3>
                        <p className="text-sm leading-relaxed text-industrial-ink/80">
                            {project.problem}
                        </p>
                    </div>

                    {/* Solution */}
                    <div className="mb-6">
                        <h3 className="text-[10px] uppercase tracking-widest text-industrial-orange mb-3">
                            Solution
                        </h3>
                        <p className="text-sm leading-relaxed text-industrial-ink/80">
                            {project.solution}
                        </p>
                    </div>

                    {/* Key Metrics */}
                    {project.metrics && project.metrics.length > 0 && (
                        <div className="mb-6 pb-6 border-b border-industrial-ink/10">
                            <h3 className="text-[10px] uppercase tracking-widest text-industrial-orange mb-4">
                                Key Metrics
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {project.metrics.map((metric, i) => (
                                    <div
                                        key={i}
                                        className="bg-industrial-ink/5 p-3 rounded"
                                    >
                                        <div className="text-2xl font-bold mb-1">
                                            {metric.value}
                                        </div>
                                        <div className="text-[9px] uppercase text-industrial-dim tracking-wider">
                                            {metric.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Technical Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-[10px] uppercase tracking-widest text-industrial-orange mb-3">
                                Technical Highlights
                            </h3>
                            <ul className="space-y-2">
                                {project.highlights.map((highlight, i) => (
                                    <li
                                        key={i}
                                        className="text-xs leading-relaxed flex gap-2"
                                    >
                                        <span className="text-industrial-orange mt-1">
                                            —
                                        </span>
                                        <span className="text-industrial-ink/80">
                                            {highlight}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Download Button */}
                    <button className="hover-target w-full flex items-center justify-between border border-industrial-ink/20 px-4 py-3 text-xs uppercase hover:bg-industrial-orange hover:text-white hover:border-industrial-orange transition-all group">
                        <span>Download Spec Sheet</span>
                        <Download
                            size={14}
                            className="group-hover:translate-y-0.5 transition-transform"
                        />
                    </button>

                    {/* Mini Nav */}
                    <div className="mt-8 pt-6 border-t border-industrial-ink/10">
                        <h4 className="text-[9px] uppercase tracking-widest text-industrial-dim mb-4">
                            Other Projects
                        </h4>
                        <div className="space-y-2">
                            {otherProjects.slice(0, 3).map((proj) => (
                                <button
                                    key={proj.id}
                                    onClick={() =>
                                        router.push(`/works/${proj.id}`)
                                    }
                                    className="hover-target w-full flex items-center gap-3 p-2 hover:bg-industrial-ink/5 rounded transition-colors group text-left"
                                >
                                    <div className="text-2xl">
                                        {proj.emoji || "📦"}
                                    </div>
                                    <div>
                                        <div className="text-xs group-hover:text-industrial-orange transition-colors">
                                            {proj.name}
                                        </div>
                                        <div className="text-[9px] text-industrial-dim">
                                            [{proj.id}]
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - Scrollable Images */}
                <div
                    id="scrollable-content"
                    className="flex-1 p-6 md:p-12 overflow-y-auto"
                    style={{ height: "calc(100vh - 4rem)" }}
                >
                    {/* Mobile Specs (visible only on mobile) */}
                    <div className="lg:hidden mb-8">
                        <h1 className="font-serif text-3xl mb-2 leading-tight">
                            {project.name}
                        </h1>
                        <p className="text-xs text-industrial-dim uppercase tracking-wider mb-6">
                            Project {project.id} — {project.year}
                        </p>

                        <div className="space-y-3 mb-6 pb-6 border-b border-industrial-ink/10">
                            <SpecRow label="TYPE" value={project.type} />
                            <SpecRow label="ROLE" value={project.role} />
                            <SpecRow label="TOOLS" value={project.tools} />
                        </div>
                    </div>

                    {/* Hero Image */}
                    {project.images && project.images.length > 0 && (
                        <motion.div
                            className="mb-12 hover-target group relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            onClick={() => setSelectedImage(0)}
                        >
                            <div className="aspect-[16/10] bg-gradient-to-br from-industrial-ink/5 to-industrial-orange/10 rounded flex items-center justify-center overflow-hidden relative">
                                <div className="text-6xl">
                                    {project.images[0].emoji || "🔧"}
                                </div>
                                <div className="absolute inset-0 bg-industrial-ink/0 group-hover:bg-industrial-ink/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <ZoomIn
                                        size={32}
                                        className="text-industrial-orange"
                                    />
                                </div>
                            </div>
                            <p className="mt-3 text-[10px] uppercase tracking-wider text-industrial-dim">
                                FIG 00: {project.images[0].caption}
                            </p>
                        </motion.div>
                    )}

                    {/* Image Grid */}
                    {project.images && project.images.length > 1 && (
                        <div className="space-y-12">
                            {project.images.slice(1).map((img, index) => (
                                <motion.div
                                    key={img.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                    }}
                                    className="hover-target group relative"
                                    onClick={() => setSelectedImage(index + 1)}
                                >
                                    <div
                                        className={`${
                                            index % 3 === 0
                                                ? "aspect-[16/9]"
                                                : index % 3 === 1
                                                ? "aspect-[4/3]"
                                                : "aspect-square"
                                        } bg-gradient-to-br from-industrial-ink/5 to-industrial-orange/10 rounded flex items-center justify-center overflow-hidden relative`}
                                    >
                                        <div className="text-5xl">
                                            {img.emoji || "📐"}
                                        </div>
                                        <div className="absolute inset-0 bg-industrial-ink/0 group-hover:bg-industrial-ink/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <ZoomIn
                                                size={28}
                                                className="text-industrial-orange"
                                            />
                                        </div>
                                    </div>
                                    <p className="mt-3 text-[10px] uppercase tracking-wider text-industrial-dim">
                                        FIG {String(index + 1).padStart(2, "0")}
                                        : {img.caption}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Failure Gallery */}
                    {project.failures && project.failures.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-industrial-ink/10">
                            <h3 className="text-[10px] uppercase tracking-widest text-industrial-orange mb-6">
                                {"Iteration Gallery — What Didn't Work"}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {project.failures.map((failure, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square bg-industrial-ink/5 rounded flex items-center justify-center"
                                    >
                                        <span className="text-3xl">❌</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-xs text-industrial-dim leading-relaxed">
                                {project.failureNotes ||
                                    "Early iterations revealed critical design flaws that informed the final solution."}
                            </p>
                        </div>
                    )}

                    {/* Navigation Footer */}
                    <div className="mt-16 pt-8 border-t border-industrial-ink/10 flex justify-between items-center">
                        <button
                            onClick={handlePrevProject}
                            className="hover-target flex items-center gap-2 text-xs uppercase text-industrial-dim hover:text-industrial-orange transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Previous
                        </button>
                        <button
                            onClick={handleNextProject}
                            className="hover-target flex items-center gap-2 text-xs uppercase text-industrial-dim hover:text-industrial-orange transition-colors"
                        >
                            Next
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Lightbox */}
            <AnimatePresence>
                {selectedImage !== null &&
                    project.images &&
                    project.images[selectedImage] && (
                        <motion.div
                            className="fixed inset-0 md:left-[300px] bg-industrial-ink/95 z-50 flex items-center justify-center p-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <button
                                className="hover-target absolute top-6 right-6 text-white hover:text-industrial-orange transition-colors"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={32} />
                            </button>
                            <motion.div
                                className="max-w-5xl w-full aspect-video bg-gradient-to-br from-industrial-orange/20 to-industrial-ink/20 rounded flex items-center justify-center"
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="text-9xl">
                                    {project.images[selectedImage].emoji ||
                                        "🔧"}
                                </div>
                            </motion.div>
                            <p className="absolute bottom-8 text-white/60 text-xs uppercase tracking-wider">
                                FIG {String(selectedImage).padStart(2, "0")}:{" "}
                                {project.images[selectedImage]?.caption}
                            </p>
                        </motion.div>
                    )}
            </AnimatePresence>
        </div>
    );
}

function SpecRow({
    label,
    value,
    highlight = false,
}: {
    label: string;
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="flex justify-between items-start text-xs">
            <span className="text-industrial-dim uppercase tracking-wider min-w-[80px]">
                {label}
            </span>
            <span
                className={`text-right ${
                    highlight
                        ? "text-industrial-orange font-bold"
                        : "text-industrial-ink"
                }`}
            >
                {value}
            </span>
        </div>
    );
}
