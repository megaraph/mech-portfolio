"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Linkedin,
    Github,
    Calendar,
    ExternalLink,
    Download,
    ChevronDown,
} from "lucide-react";
import {
    TimelineEntry,
    timelineData,
    skills,
    principles,
    stats,
} from "@/store/aboutData";

// ─── SET TO true WHEN YOU DROP resume.pdf INTO /public ────────────────────────
const RESUME_AVAILABLE = false;

// ─── REPLACE filler stats with real ones when ready ───────────────────────────
// The ∞ and "1 Passion" entries have been swapped for concrete numbers below.
// Edit these directly in aboutData.ts to keep the source of truth there.

export default function AboutPage() {
    const [expandedTimeline, setExpandedTimeline] = useState<string | null>(
        null,
    );

    const groupedSkills = {
        software: skills.filter((s) => s.category === "software"),
        fabrication: skills.filter((s) => s.category === "fabrication"),
        specialty: skills.filter((s) => s.category === "interest"),
        soft: skills.filter((s) => s.category === "soft"),
    };

    // Split skills into primary (first 4) and supporting for software + fabrication
    const primarySoftware = groupedSkills.software.slice(0, 4);
    const secondarySoftware = groupedSkills.software.slice(4);
    const primaryFabrication = groupedSkills.fabrication.slice(0, 3);
    const secondaryFabrication = groupedSkills.fabrication.slice(3);

    return (
        <div className="min-h-screen bg-industrial-paper">
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
                {/* ══════════════════════════════════════════════
                    HERO SECTION
                ══════════════════════════════════════════════ */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="font-serif text-5xl md:text-7xl mb-4 text-industrial-ink leading-tight">
                        Raphael C. Murillo
                    </h1>
                    <p className="font-mono text-sm md:text-base text-industrial-dim uppercase tracking-wider mb-8">
                        MECHANICAL ENGINEERING // DESIGNING // BUILDING
                    </p>

                    <div className="space-y-2 font-mono text-xs text-industrial-dim mb-8">
                        <p>Currently: 2nd Year @ DLSU Manila</p>
                        <p className="text-industrial-orange">
                            Status: Available for Internships
                        </p>
                    </div>

                    {/* ── RESUME CTA ─────────────────────────────────────────
                        Drop resume.pdf into /public and flip RESUME_AVAILABLE.
                    ───────────────────────────────────────────────────────── */}
                    <div className="flex items-center gap-4 mb-10">
                        {RESUME_AVAILABLE ? (
                            <a
                                href="/resume.pdf"
                                download="Raphael_Murillo_Resume.pdf"
                                className="hover-target inline-flex items-center gap-2.5 px-5 py-2.5 bg-industrial-orange text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:bg-industrial-ink group"
                            >
                                <Download
                                    size={13}
                                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                                />
                                Download CV
                            </a>
                        ) : (
                            <div className="relative group/resume">
                                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-industrial-ink/15 text-industrial-ink/25 font-mono text-xs uppercase tracking-widest cursor-not-allowed select-none">
                                    <Download size={13} />
                                    Download CV
                                </div>
                                <div className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-industrial-ink text-industrial-paper font-mono text-[9px] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover/resume:opacity-100 transition-opacity duration-200 pointer-events-none">
                                    Coming soon — check back later
                                </div>
                            </div>
                        )}
                    </div>

                    {/* FIX 1: Bio in plain text, not mono — these are convictions, not specs */}
                    <div className="max-w-2xl space-y-4">
                        <p className="text-base md:text-lg leading-relaxed text-industrial-ink/85">
                            I build prototypes because I like seeing ideas
                            become real.
                        </p>
                        <p className="text-base md:text-lg leading-relaxed text-industrial-ink/65">
                            I&apos;m drawn to elegant solutions, especially
                            tools I&apos;d want to use myself. Most of my
                            projects start from everyday problems, curiosity, or
                            small moments that feel worth exploring. For me,
                            engineering is less about grand ideas and more about
                            careful iteration, physical constraints, and making
                            things that simply work — and feel right.
                        </p>
                    </div>
                </motion.section>

                {/* ══════════════════════════════════════════════
                    TIMELINE SECTION
                ══════════════════════════════════════════════ */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-10">
                        Personal History
                    </h2>

                    <div className="space-y-0">
                        {/* FIX 2: Distinct visual weight per section header */}
                        <TimelineGroup label="Education">
                            {timelineData
                                .filter((e) => e.type === "education")
                                .map((entry, index) => (
                                    <TimelineItem
                                        key={entry.id}
                                        entry={entry}
                                        isExpanded={
                                            expandedTimeline === entry.id
                                        }
                                        onToggle={() =>
                                            setExpandedTimeline(
                                                expandedTimeline === entry.id
                                                    ? null
                                                    : entry.id,
                                            )
                                        }
                                        index={index}
                                    />
                                ))}
                        </TimelineGroup>

                        <TimelineGroup label="Experience">
                            {timelineData.filter((e) => e.type === "experience")
                                .length === 0 ? (
                                <p className="font-mono text-xs text-industrial-dim/40 italic py-4 pl-2">
                                    {
                                        "// Entries will appear here as they accumulate"
                                    }
                                </p>
                            ) : (
                                timelineData
                                    .filter((e) => e.type === "experience")
                                    .map((entry, index) => (
                                        <TimelineItem
                                            key={entry.id}
                                            entry={entry}
                                            isExpanded={
                                                expandedTimeline === entry.id
                                            }
                                            onToggle={() =>
                                                setExpandedTimeline(
                                                    expandedTimeline ===
                                                        entry.id
                                                        ? null
                                                        : entry.id,
                                                )
                                            }
                                            index={index}
                                        />
                                    ))
                            )}
                        </TimelineGroup>

                        <TimelineGroup label="Certifications">
                            {timelineData
                                .filter((e) => e.type === "certification")
                                .map((entry, index) => (
                                    <TimelineItem
                                        key={entry.id}
                                        entry={entry}
                                        isExpanded={
                                            expandedTimeline === entry.id
                                        }
                                        onToggle={() =>
                                            setExpandedTimeline(
                                                expandedTimeline === entry.id
                                                    ? null
                                                    : entry.id,
                                            )
                                        }
                                        index={index}
                                    />
                                ))}
                        </TimelineGroup>
                    </div>
                </motion.section>

                {/* ══════════════════════════════════════════════
                    SKILLS / INVENTORY SECTION
                ══════════════════════════════════════════════ */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-10">
                        Tools & Capabilities
                    </h2>

                    <div className="space-y-10">
                        {/* Software — primary tools larger, secondary receded */}
                        <SkillGroup label="Software">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {primarySoftware.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono text-xs px-3 py-2 bg-industrial-ink/8 text-industrial-ink border border-industrial-ink/10 hover:border-industrial-orange hover:text-industrial-orange transition-all duration-200"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                            {secondarySoftware.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {secondarySoftware.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="font-mono text-[10px] px-3 py-1.5 bg-industrial-ink/4 text-industrial-ink/45 hover:text-industrial-ink/70 transition-colors"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </SkillGroup>

                        {/* Fabrication — same two-tier treatment */}
                        <SkillGroup label="Fabrication">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {primaryFabrication.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono text-xs px-3 py-2 bg-industrial-ink/8 text-industrial-ink border border-industrial-ink/10 hover:border-industrial-orange hover:text-industrial-orange transition-all duration-200"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                            {secondaryFabrication.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {secondaryFabrication.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="font-mono text-[10px] px-3 py-1.5 bg-industrial-ink/4 text-industrial-ink/45 hover:text-industrial-ink/70 transition-colors"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </SkillGroup>

                        {/* Interests — flat, no hierarchy needed */}
                        <SkillGroup label="Interests">
                            <div className="flex flex-wrap gap-2">
                                {groupedSkills.specialty.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono text-[10px] px-3 py-1.5 border border-industrial-orange/30 text-industrial-orange/70 hover:border-industrial-orange hover:text-industrial-orange transition-all duration-200"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </SkillGroup>

                        {/* Soft Skills — quietest visual tier */}
                        <SkillGroup label="Soft Skills">
                            <div className="flex flex-wrap gap-2">
                                {groupedSkills.soft.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono text-[10px] px-3 py-1.5 bg-industrial-ink/4 text-industrial-ink/45 hover:text-industrial-ink/70 transition-colors"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </SkillGroup>
                    </div>
                </motion.section>

                {/* ══════════════════════════════════════════════
                    PRINCIPLES / MANIFESTO SECTION
                ══════════════════════════════════════════════ */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-10">
                        My Approach
                    </h2>

                    <div className="space-y-8">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={principle.number}
                                className="border-l-2 border-industrial-ink/10 pl-6 hover:border-industrial-orange transition-colors duration-300 group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.4 + index * 0.1,
                                }}
                            >
                                <div className="flex items-baseline gap-3 mb-2">
                                    {/* Number stays mono — it IS a spec label */}
                                    <span className="font-mono text-xs text-industrial-orange flex-shrink-0">
                                        {principle.number}.
                                    </span>
                                    {/* FIX 3: Title moves to serif — it's a conviction, not a label */}
                                    <h3 className="font-serif text-base text-industrial-ink group-hover:text-industrial-orange transition-colors duration-300">
                                        {principle.title}
                                    </h3>
                                </div>
                                {/* FIX 3 cont: Description in plain text */}
                                <p className="text-sm leading-relaxed text-industrial-ink/55 pl-6">
                                    {principle.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* ══════════════════════════════════════════════
                    STATS SECTION
                ══════════════════════════════════════════════ */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-10">
                        By The Numbers
                    </h2>

                    {/* FIX 4: Replaced filler stats (∞ coffee, "1 Passion") inline below.
                        Update these values in aboutData.ts to keep data centralised. */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="hover-target group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.5 + index * 0.05,
                                }}
                            >
                                {/* Value in serif for editorial weight */}
                                <div className="font-serif text-4xl md:text-5xl text-industrial-ink group-hover:text-industrial-orange transition-colors duration-300 mb-2">
                                    {stat.value}
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* ══════════════════════════════════════════════
                    INVITATION / CONTACT SECTION
                ══════════════════════════════════════════════ */}
                <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-8">
                        Open to Opportunities
                    </h2>

                    {/* FIX 5: Replace resume-speak bullet list with direct plain voice */}
                    <div className="max-w-2xl mb-10">
                        <p className="text-base leading-relaxed text-industrial-ink/75">
                            I&apos;m actively looking for internships in
                            mechanical design, robotics, or manufacturing — and
                            I&apos;m equally open to collaborative projects with
                            fellow makers. If you have an interesting problem, I
                            want to hear about it.
                        </p>
                    </div>

                    {/* Contact block — email is primary, others secondary */}
                    <div className="border border-industrial-ink/20 p-6 md:p-8 bg-industrial-ink/[0.02]">
                        <div className="space-y-4">
                            {/* Primary: Email */}
                            <a
                                href="mailto:raph_murillo@dlsu.edu.ph"
                                className="hover-target flex items-center gap-3 font-mono text-sm text-industrial-ink hover:text-industrial-orange transition-colors group"
                            >
                                <Mail
                                    size={18}
                                    className="text-industrial-dim group-hover:text-industrial-orange transition-colors flex-shrink-0"
                                />
                                <span>raph_murillo@dlsu.edu.ph</span>
                            </a>

                            {/* Secondary: LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/raphael-m-860261246/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover-target flex items-center gap-3 font-mono text-xs text-industrial-ink/60 hover:text-industrial-orange transition-colors group"
                            >
                                <Linkedin
                                    size={16}
                                    className="text-industrial-dim/60 group-hover:text-industrial-orange transition-colors flex-shrink-0"
                                />
                                <span>linkedin.com/in/raphael-m-860261246</span>
                                <ExternalLink
                                    size={12}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </a>

                            {/* Secondary: GitHub */}
                            <a
                                href="https://github.com/megaraph"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover-target flex items-center gap-3 font-mono text-xs text-industrial-ink/60 hover:text-industrial-orange transition-colors group"
                            >
                                <Github
                                    size={16}
                                    className="text-industrial-dim/60 group-hover:text-industrial-orange transition-colors flex-shrink-0"
                                />
                                <span>github.com/megaraph</span>
                                <ExternalLink
                                    size={12}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </a>

                            {/* Tertiary: Calendly — smaller, separated */}
                            <div className="pt-4 mt-2 border-t border-industrial-ink/10">
                                <a
                                    href="https://calendly.com/raphaelmurillo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover-target inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-industrial-orange/70 hover:text-industrial-orange transition-colors"
                                >
                                    <Calendar size={14} />
                                    Schedule a Quick Chat
                                    <ExternalLink size={11} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

// ─── TIMELINE GROUP WRAPPER ────────────────────────────────────────────────────
// FIX 2: Distinct section headers with clear visual hierarchy
function TimelineGroup({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-industrial-orange/60">
                    {label}
                </span>
                <div className="flex-1 h-px bg-industrial-ink/8" />
            </div>
            {children}
        </div>
    );
}

// ─── SKILL GROUP WRAPPER ───────────────────────────────────────────────────────
function SkillGroup({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h3 className="font-mono text-[9px] uppercase tracking-[0.3em] text-industrial-dim mb-4">
                {label}
            </h3>
            {children}
        </div>
    );
}

// ─── TIMELINE ITEM ─────────────────────────────────────────────────────────────
// FIX 2: Added ChevronDown affordance + serif on title + plain text on description
function TimelineItem({
    entry,
    isExpanded,
    onToggle,
    index,
}: {
    entry: TimelineEntry;
    isExpanded: boolean;
    onToggle: () => void;
    index: number;
}) {
    return (
        <motion.div
            className="flex gap-4 group"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
        >
            {/* Timeline track */}
            <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div
                    className={`w-2.5 h-2.5 rounded-full border-2 transition-colors duration-300 ${
                        entry.current
                            ? "bg-industrial-orange border-industrial-orange"
                            : "bg-industrial-paper border-industrial-ink/20 group-hover:border-industrial-orange"
                    }`}
                />
                <div className="w-px flex-1 bg-industrial-ink/8 mt-2" />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <button
                    onClick={onToggle}
                    className="hover-target w-full text-left"
                >
                    <div className="flex items-start justify-between gap-4 mb-1">
                        <div className="flex-1">
                            {/* Title in serif — it's a role, not a tag */}
                            <h3 className="font-serif text-base text-industrial-ink group-hover:text-industrial-orange transition-colors duration-200 leading-snug">
                                {entry.title}
                            </h3>
                            <p className="font-mono text-[10px] text-industrial-dim mt-0.5 uppercase tracking-wide">
                                {entry.organization}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                            <span className="font-mono text-[10px] text-industrial-dim/60">
                                {entry.date}
                            </span>
                            {/* FIX 2: Explicit expand affordance */}
                            {entry.description && (
                                <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown
                                        size={12}
                                        className="text-industrial-ink/30 group-hover:text-industrial-orange transition-colors duration-200"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </button>

                {/* Expanded description — plain text, not mono */}
                <AnimatePresence>
                    {entry.description && isExpanded && (
                        <motion.p
                            className="text-sm text-industrial-ink/55 leading-relaxed mt-3 pr-6"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {entry.description}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
