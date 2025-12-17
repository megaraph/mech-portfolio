"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Calendar, ExternalLink } from "lucide-react";
import {
    TimelineEntry,
    timelineData,
    skills,
    principles,
    stats,
} from "@/store/aboutData";

export default function AboutPage() {
    const [expandedTimeline, setExpandedTimeline] = useState<string | null>(
        null
    );

    const groupedSkills = {
        software: skills.filter((s) => s.category === "software"),
        fabrication: skills.filter((s) => s.category === "fabrication"),
        specialty: skills.filter((s) => s.category === "specialty"),
        soft: skills.filter((s) => s.category === "soft"),
    };

    return (
        <div className="min-h-screen bg-industrial-paper">
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
                {/* HERO SECTION */}
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

                    <div className="max-w-3xl">
                        <p className="font-mono text-base md:text-lg leading-relaxed text-industrial-ink/90">
                            I design systems that are built, not just imagined.
                            Working from CAD and sketches to machine, I aim to
                            bridge imagination and physical fabrication. For me,
                            engineering is a discipline of iteration, not just a
                            moment of inspiration.
                        </p>
                    </div>
                </motion.section>

                {/* TIMELINE SECTION */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-8">
                        Personal History
                    </h2>

                    <div className="space-y-6">
                        {/* Education Header */}
                        <div className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim mb-4">
                            [EDUCATION]
                        </div>

                        {timelineData
                            .filter((entry) => entry.type === "education")
                            .map((entry, index) => (
                                <TimelineItem
                                    key={entry.id}
                                    entry={entry}
                                    isExpanded={expandedTimeline === entry.id}
                                    onToggle={() =>
                                        setExpandedTimeline(
                                            expandedTimeline === entry.id
                                                ? null
                                                : entry.id
                                        )
                                    }
                                    index={index}
                                />
                            ))}

                        {/* Experience Header */}
                        <div className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim mb-4 mt-12">
                            [EXPERIENCE]
                        </div>

                        {timelineData.filter(
                            (entry) => entry.type === "experience"
                        ).length === 0 ? (
                            <div className="ml-8 font-mono text-xs text-industrial-dim/50 italic">
                                {"// Add your experience here as you grow"}
                            </div>
                        ) : (
                            timelineData
                                .filter((entry) => entry.type === "experience")
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
                                                    : entry.id
                                            )
                                        }
                                        index={index}
                                    />
                                ))
                        )}

                        {/* Certifications Header */}
                        <div className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim mb-4 mt-12">
                            [CERTIFICATIONS / SKILLS]
                        </div>

                        {timelineData
                            .filter((entry) => entry.type === "certification")
                            .map((entry, index) => (
                                <TimelineItem
                                    key={entry.id}
                                    entry={entry}
                                    isExpanded={expandedTimeline === entry.id}
                                    onToggle={() =>
                                        setExpandedTimeline(
                                            expandedTimeline === entry.id
                                                ? null
                                                : entry.id
                                        )
                                    }
                                    index={index}
                                />
                            ))}
                    </div>
                </motion.section>

                {/* INVENTORY SECTION */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-8">
                        Tools & Capabilities
                    </h2>

                    <div className="space-y-8">
                        {/* Software */}
                        <div>
                            <h3 className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim mb-4">
                                [SOFTWARE]
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {groupedSkills.software.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono text-xs px-3 py-2 bg-industrial-ink/5 text-industrial-ink hover:bg-industrial-ink/10 transition-colors"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Fabrication */}
                        <div>
                            <h3 className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim mb-4">
                                [FABRICATION]
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {groupedSkills.fabrication.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono text-xs px-3 py-2 bg-industrial-ink/5 text-industrial-ink hover:bg-industrial-ink/10 transition-colors"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Specialties */}
                        <div>
                            <h3 className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim mb-4">
                                [SPECIALTIES]
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {groupedSkills.specialty.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono text-xs px-3 py-2 bg-industrial-ink/5 text-industrial-ink hover:bg-industrial-ink/10 transition-colors"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Soft Skills */}
                        <div>
                            <h3 className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim mb-4">
                                [SOFT SKILLS]
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {groupedSkills.soft.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="font-mono text-xs px-3 py-2 bg-industrial-ink/5 text-industrial-ink hover:bg-industrial-ink/10 transition-colors"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* MANIFESTO SECTION */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-8">
                        My Approach
                    </h2>

                    <div className="space-y-8">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={principle.number}
                                className="border-l-2 border-industrial-ink/10 pl-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.4 + index * 0.1,
                                }}
                            >
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="font-mono text-xs text-industrial-orange">
                                        {principle.number}.
                                    </span>
                                    <h3 className="font-mono text-sm font-medium text-industrial-ink">
                                        {principle.title}
                                    </h3>
                                </div>
                                <p className="font-mono text-xs leading-relaxed text-industrial-dim">
                                    {principle.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* METRICS SECTION */}
                <motion.section
                    className="mb-20 md:mb-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-8">
                        By The Numbers
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
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
                                <div className="text-4xl md:text-5xl font-bold text-industrial-ink group-hover:text-industrial-orange transition-colors mb-2">
                                    {stat.value}
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-wider text-industrial-dim">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* INVITATION SECTION */}
                <motion.section
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h2 className="font-mono text-xs uppercase tracking-widest text-industrial-orange mb-8">
                        Open to Opportunities
                    </h2>

                    <div className="max-w-2xl mb-8">
                        <p className="font-mono text-sm text-industrial-ink mb-6">
                            {"I'm looking for:"}
                        </p>
                        <ul className="space-y-2 font-mono text-sm text-industrial-dim">
                            <li className="flex items-start gap-2">
                                <span className="text-industrial-orange mt-1">
                                    •
                                </span>
                                <span>
                                    Internships in mechanical design, robotics,
                                    or manufacturing
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-industrial-orange mt-1">
                                    •
                                </span>
                                <span>
                                    Collaborative projects with fellow makers
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-industrial-orange mt-1">
                                    •
                                </span>
                                <span>
                                    Opportunities to learn from experienced
                                    engineers
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Block */}
                    <div className="border border-industrial-ink/20 p-6 md:p-8 bg-industrial-ink/[0.02]">
                        <div className="space-y-4">
                            <a
                                href="mailto:raph_murillo@dlsu.edu.ph"
                                className="hover-target flex items-center gap-3 font-mono text-sm text-industrial-ink hover:text-industrial-orange transition-colors group"
                            >
                                <Mail
                                    size={18}
                                    className="text-industrial-dim group-hover:text-industrial-orange transition-colors"
                                />
                                <span>raph_murillo@dlsu.edu.ph</span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/raphael-m-860261246/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover-target flex items-center gap-3 font-mono text-sm text-industrial-ink hover:text-industrial-orange transition-colors group"
                            >
                                <Linkedin
                                    size={18}
                                    className="text-industrial-dim group-hover:text-industrial-orange transition-colors"
                                />
                                <span>linkedin.com/in/raphael-m-860261246</span>
                                <ExternalLink
                                    size={14}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </a>

                            <a
                                href="https://github.com/megaraph"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover-target flex items-center gap-3 font-mono text-sm text-industrial-ink hover:text-industrial-orange transition-colors group"
                            >
                                <Github
                                    size={18}
                                    className="text-industrial-dim group-hover:text-industrial-orange transition-colors"
                                />
                                <span>github.com/megaraph</span>
                                <ExternalLink
                                    size={14}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </a>

                            <div className="pt-4 mt-4 border-t border-industrial-ink/10">
                                <a
                                    href="https://calendly.com/raphaelmurillo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover-target inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-industrial-orange hover:text-industrial-ink transition-colors"
                                >
                                    <Calendar size={16} />
                                    Schedule a Quick Chat
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

// Timeline Item Component
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
            className="flex gap-4 hover-target group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Timeline Marker */}
            <div className="flex flex-col items-center">
                <div
                    className={`w-3 h-3 rounded-full border-2 ${
                        entry.current
                            ? "bg-industrial-orange border-industrial-orange"
                            : "bg-industrial-paper border-industrial-ink/20 group-hover:border-industrial-orange"
                    } transition-colors`}
                />
                <div className="w-px h-full bg-industrial-ink/10 mt-2" />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
                <button onClick={onToggle} className="w-full text-left">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-mono text-sm font-medium text-industrial-ink group-hover:text-industrial-orange transition-colors">
                                {entry.title}
                            </h3>
                            <p className="font-mono text-xs text-industrial-dim">
                                {entry.organization}
                            </p>
                        </div>
                        <span className="font-mono text-[10px] text-industrial-dim uppercase">
                            {entry.date}
                        </span>
                    </div>

                    {entry.description && isExpanded && (
                        <motion.p
                            className="font-mono text-xs text-industrial-dim leading-relaxed mt-3"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {entry.description}
                        </motion.p>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
