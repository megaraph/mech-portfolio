"use client";

import Intro from "@/components/Intro";
import Cipher from "@/components/Cipher";
import { useStore } from "@/store/useStore";
import { projectsData } from "@/store/projectsData";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// ─── FADE-UP ANIMATION VARIANT ────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
    }),
};

export default function Home() {
    const { introKey } = useStore();
    const router = useRouter();
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    // Pull featured projects, highest ID first
    const featuredProjects = projectsData
        .filter((p) => p.featured)
        .sort((a, b) => Number(b.id) - Number(a.id));

    // Hero project = most recently featured
    const heroProject = featuredProjects[0];
    // Supporting two
    const supportingProjects = featuredProjects.slice(1, 3);

    return (
        <>
            <Intro key={introKey} />

            {/* ══════════════════════════════════════════════
                SECTION 01 — IDENTITY / HERO
            ══════════════════════════════════════════════ */}
            <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-16 md:pt-0 relative overflow-hidden">
                {/* Subtle section marker */}
                <motion.p
                    className="font-mono text-[10px] text-industrial-ink/30 uppercase tracking-[0.3em] mb-10"
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    {"// 00 — Introduction"}
                </motion.p>

                {/* Name */}
                <motion.h1
                    className="font-serif text-[clamp(2.8rem,8vw,6rem)] leading-[1.05] text-industrial-ink mb-6 max-w-3xl"
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    Raphael
                    <br />
                    <span className="text-industrial-orange">Murillo.</span>
                </motion.h1>

                {/* Conviction line — pure sans-serif per ethos */}
                <motion.p
                    className="text-lg md:text-xl text-industrial-ink/70 max-w-xl leading-relaxed mb-3"
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    Mechanical Engineering student at{" "}
                    <span className="text-industrial-ink font-medium">
                        De La Salle University Manila
                    </span>
                    , specialising in mechatronics.
                </motion.p>

                {/* Philosophy line */}
                <motion.p
                    className="text-base text-industrial-ink/50 max-w-lg leading-relaxed mb-12"
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    I design systems that are built, not just imagined —
                    bridging the gap between a sketch, a CAD file, and a working
                    machine.
                </motion.p>

                {/* CTA Row */}
                <motion.div
                    className="flex items-center gap-4 flex-wrap"
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                >
                    {/* Primary CTA */}
                    <Link
                        href="/specs"
                        className="hover-target inline-flex items-center gap-3 px-6 py-3 bg-industrial-orange text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:bg-industrial-ink group"
                    >
                        Read My Story
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>

                    {/* Secondary CTA */}
                    <Link
                        href="/works"
                        className="hover-target inline-flex items-center gap-3 px-6 py-3 border border-industrial-ink/30 text-industrial-ink font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:border-industrial-orange hover:text-industrial-orange group"
                    >
                        All Works
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-6 md:left-12 lg:left-20 flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <motion.div
                        className="w-px h-12 bg-industrial-ink/20 origin-top"
                        animate={{ scaleY: [1, 0.4, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <span className="font-mono text-[9px] text-industrial-ink/30 uppercase tracking-[0.3em] rotate-0">
                        Scroll
                    </span>
                </motion.div>

                {/* Corner spec tag — JPL nod */}
                <div className="hidden lg:block absolute bottom-10 right-0 font-mono text-[9px] text-industrial-ink/20 uppercase tracking-widest text-right pr-6 space-y-1">
                    <p>ME / Mechatronics</p>
                    <p>Manila, PH — 2024–2028</p>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                DIVIDER
            ══════════════════════════════════════════════ */}
            <div className="px-6 md:px-12 lg:px-20">
                <div className="flex items-center gap-4 py-0">
                    <span className="font-mono text-[10px] text-industrial-orange uppercase tracking-[0.3em]">
                        {"// 01 — Selected Works"}
                    </span>
                    <div className="flex-1 h-px bg-industrial-ink/10" />
                    <span className="font-mono text-[10px] text-industrial-ink/30 uppercase tracking-widest">
                        {featuredProjects.length.toString().padStart(2, "0")}{" "}
                        Featured
                    </span>
                </div>
            </div>

            {/* ══════════════════════════════════════════════
                SECTION 02 — FEATURED PROJECTS
            ══════════════════════════════════════════════ */}
            <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
                {/* ── ASYMMETRIC GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
                    {/* ── HERO PROJECT (spans 7 cols) ── */}
                    {heroProject && (
                        <motion.article
                            className="hover-target lg:col-span-7 group relative cursor-pointer overflow-hidden bg-industrial-ink/5"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={() =>
                                router.push(`/works/${heroProject.id}`)
                            }
                        >
                            {/* Image container */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                                {heroProject.images?.[0]?.src ? (
                                    <Image
                                        src={heroProject.images[0].src}
                                        alt={heroProject.name}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] grayscale-[15%] group-hover:grayscale-0"
                                        sizes="(max-width: 1024px) 100vw, 58vw"
                                    />
                                ) : (
                                    /* Fallback — no image */
                                    <div className="w-full h-full bg-industrial-ink/8 flex items-center justify-center">
                                        <span className="text-6xl opacity-40">
                                            {heroProject.emoji}
                                        </span>
                                    </div>
                                )}

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-industrial-ink/80 via-industrial-ink/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Type badge */}
                                <div className="absolute top-4 left-4">
                                    {heroProject.type === "Physical" ? (
                                        <span className="inline-flex px-3 py-1 rounded-full bg-industrial-ink text-white font-mono text-[9px] uppercase tracking-wider">
                                            Physical
                                        </span>
                                    ) : (
                                        <span className="inline-flex px-3 py-1 rounded-full border border-white/60 text-white font-mono text-[9px] uppercase tracking-wider backdrop-blur-sm">
                                            Digital
                                        </span>
                                    )}
                                </div>

                                {/* Project ID watermark */}
                                <div className="absolute top-4 right-4 font-mono text-[9px] text-white/40 uppercase tracking-wider">
                                    <Cipher
                                        text={`REF-${heroProject.id}`}
                                        trigger={
                                            hoveredProject === heroProject.id
                                        }
                                    />
                                </div>
                            </div>

                            {/* Card body */}
                            <div
                                className="p-6 md:p-8"
                                onMouseEnter={() =>
                                    setHoveredProject(heroProject.id)
                                }
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* Category */}
                                <p className="font-mono text-[10px] text-industrial-orange uppercase tracking-[0.25em] mb-3">
                                    {heroProject.category}
                                </p>

                                {/* Name */}
                                <h2 className="font-serif text-2xl md:text-3xl text-industrial-ink leading-tight mb-3 group-hover:text-industrial-orange transition-colors duration-300">
                                    {heroProject.name}
                                </h2>

                                {/* Tagline — this is where the Kinfolk warmth lives */}
                                {heroProject.tagline && (
                                    <p className="text-sm text-industrial-ink/60 leading-relaxed mb-5 max-w-sm">
                                        {heroProject.tagline}
                                    </p>
                                )}

                                {/* Metrics strip */}
                                {heroProject.metrics &&
                                    heroProject.metrics.length > 0 && (
                                        <div className="flex flex-wrap gap-4 pt-5 border-t border-industrial-ink/10">
                                            {heroProject.metrics
                                                .slice(0, 3)
                                                .map((m, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex flex-col"
                                                    >
                                                        <span className="font-mono text-base font-bold text-industrial-ink">
                                                            {m.value}
                                                        </span>
                                                        <span className="font-mono text-[9px] text-industrial-ink/40 uppercase tracking-wider">
                                                            {m.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            <div className="ml-auto self-end">
                                                <span className="font-mono text-[10px] text-industrial-orange uppercase tracking-wider group-hover:gap-2 transition-all">
                                                    View Specs →
                                                </span>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </motion.article>
                    )}

                    {/* ── SUPPORTING PROJECTS (stack in 5 cols) ── */}
                    <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
                        {supportingProjects.map((project, index) => (
                            <motion.article
                                key={project.id}
                                className="hover-target group relative cursor-pointer overflow-hidden bg-industrial-ink/5 flex-1"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15 + 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                onClick={() =>
                                    router.push(`/works/${project.id}`)
                                }
                                onMouseEnter={() =>
                                    setHoveredProject(project.id)
                                }
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                <div className="flex h-full min-h-[180px]">
                                    {/* Image — left side for supporting cards */}
                                    <div className="relative w-2/5 overflow-hidden flex-shrink-0">
                                        {project.images?.[0]?.src ? (
                                            <Image
                                                src={project.images[0].src}
                                                alt={project.name}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] grayscale-[20%] group-hover:grayscale-0"
                                                sizes="25vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-industrial-ink/8 flex items-center justify-center">
                                                <span className="text-4xl opacity-40">
                                                    {project.emoji}
                                                </span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-industrial-ink/20 group-hover:bg-industrial-ink/10 transition-colors duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div>
                                            <p className="font-mono text-[9px] text-industrial-orange uppercase tracking-[0.25em] mb-2">
                                                {project.category}
                                            </p>
                                            <h3 className="font-serif text-lg text-industrial-ink leading-tight mb-2 group-hover:text-industrial-orange transition-colors duration-300">
                                                {project.name}
                                            </h3>
                                            <p className="text-xs text-industrial-ink/50 leading-relaxed line-clamp-2">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-industrial-ink/8">
                                            <div className="flex items-center gap-3">
                                                {project.type === "Physical" ? (
                                                    <span className="font-mono text-[8px] px-2 py-0.5 rounded-full bg-industrial-ink text-white uppercase">
                                                        Physical
                                                    </span>
                                                ) : (
                                                    <span className="font-mono text-[8px] px-2 py-0.5 rounded-full border border-industrial-ink/40 text-industrial-ink/60 uppercase">
                                                        Digital
                                                    </span>
                                                )}
                                                <span className="font-mono text-[9px] text-industrial-ink/30">
                                                    {project.year}
                                                </span>
                                            </div>
                                            <span className="font-mono text-[9px] text-industrial-orange opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                View →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                {/* View all projects link */}
                <motion.div
                    className="flex justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link
                        href="/works"
                        className="hover-target inline-flex items-center gap-3 font-mono text-xs text-industrial-ink/50 hover:text-industrial-orange uppercase tracking-widest transition-colors duration-300 group"
                    >
                        <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
                        View Full Works Directory
                    </Link>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════════
                DIVIDER
            ══════════════════════════════════════════════ */}
            <div className="px-6 md:px-12 lg:px-20">
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-industrial-orange uppercase tracking-[0.3em]">
                        {"// 02 — Engineering Principles"}
                    </span>
                    <div className="flex-1 h-px bg-industrial-ink/10" />
                </div>
            </div>

            {/* ══════════════════════════════════════════════
                SECTION 03 — PRINCIPLES (Kinfolk warmth)
            ══════════════════════════════════════════════ */}
            <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl">
                    {[
                        {
                            num: "01",
                            title: "Form Follows Function — But Function Can Be Beautiful",
                            body: "I don't compromise performance for aesthetics. But I believe good design considers both.",
                        },
                        {
                            num: "02",
                            title: "Iterate in Public",
                            body: "Failed prototypes teach more than successful ones. I document the mess, not just the wins.",
                        },
                        {
                            num: "03",
                            title: "Engineering is Communication",
                            body: "If I can't explain how it works, I don't understand it well enough. Clarity over complexity.",
                        },
                        {
                            num: "04",
                            title: "Build, Measure, Learn",
                            body: "CAD is the hypothesis. The prototype is the experiment. Data informs the next iteration.",
                        },
                    ].map((p, i) => (
                        <motion.div
                            key={p.num}
                            className="group"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="flex items-start gap-5">
                                {/* Number in mono — the engineered marker */}
                                <span className="font-mono text-[11px] text-industrial-orange/60 pt-1 flex-shrink-0 tabular-nums">
                                    {p.num}
                                </span>
                                <div>
                                    <h3 className="font-serif text-base text-industrial-ink mb-2 leading-snug group-hover:text-industrial-orange transition-colors duration-300">
                                        {p.title}
                                    </h3>
                                    <p className="text-sm text-industrial-ink/50 leading-relaxed">
                                        {p.body}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════
                SECTION 04 — QUIET CTA / SIGN-OFF
            ══════════════════════════════════════════════ */}
            <section className="px-6 md:px-12 lg:px-20 pb-24 pt-4">
                <motion.div
                    className="border-t border-industrial-ink/10 pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <p className="font-mono text-[10px] text-industrial-ink/30 uppercase tracking-[0.3em] mb-3">
                            {"// Currently"}
                        </p>
                        <p className="font-serif text-2xl md:text-3xl text-industrial-ink max-w-md leading-snug">
                            Open to internships,
                            <br />
                            collaborations, and{" "}
                            <span className="text-industrial-orange italic">
                                interesting problems.
                            </span>
                        </p>
                    </div>

                    <Link
                        href="/specs"
                        className="hover-target inline-flex items-center gap-3 px-6 py-3 bg-industrial-orange text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:bg-industrial-ink group flex-shrink-0"
                    >
                        Learn More About Me
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </motion.div>
            </section>
        </>
    );
}
