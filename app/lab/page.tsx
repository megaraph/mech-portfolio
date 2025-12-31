"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Import data from your store
// Adjust the path "../../store/labData" if your alias "@/" is configured
import { labItems, LabItem } from "../../store/labData";

export default function LabPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedItem, setSelectedItem] = useState<LabItem | null>(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Video opacity and scale based on scroll
    const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const videoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    const categories = [
        { id: "all", label: "ALL" },
        { id: "sketch", label: "SKETCHES" },
        { id: "prototype", label: "PROTOTYPES" },
        { id: "failure", label: "FAILURES" },
        { id: "test", label: "TESTS" },
        { id: "other", label: "OTHER" },
    ];

    const filteredItems =
        selectedCategory === "all"
            ? labItems
            : labItems.filter((item) => item.category === selectedCategory);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0.3) {
                setVideoEnded(true);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <div ref={containerRef} className="min-h-screen bg-industrial-paper">
            {/* HERO VIDEO SECTION */}
            <motion.section
                className="relative h-screen w-full overflow-hidden sticky top-0"
                style={{ opacity: videoOpacity }}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{ scale: videoScale }}
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover"
                        poster="/lab-poster.png"
                    >
                        <source src="/lab-teaser-web.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-industrial-ink/40 via-transparent to-industrial-ink/60" />
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                    style={{ opacity: textOpacity }}
                >
                    <motion.h1
                        className="font-mono text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        {"RAPH'S LAB"}
                    </motion.h1>
                    <motion.p
                        className="font-mono text-sm md:text-base text-white/80 uppercase tracking-wider"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        Where Ideas Become Reality
                    </motion.p>

                    <motion.div
                        className="absolute bottom-12 flex flex-col items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                            Scroll to Explore
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="text-white/60 text-2xl"
                        >
                            ↓
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* MAIN CONTENT */}
            <section className="relative bg-industrial-paper min-h-screen pt-12 pb-20 px-6 md:px-12 lg:px-20">
                <div className="mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 text-industrial-ink">
                        Workshop Archive
                    </h2>
                    <p className="font-mono text-sm text-industrial-dim uppercase tracking-wide mb-8">
                        Raw Prototypes / Failed Prints / Sketches / Experiments
                    </p>

                    <div className="font-mono text-xs text-industrial-orange mb-8">
                        ITERATIONS LOGGED:{" "}
                        {labItems.length.toString().padStart(3, "0")}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`hover-target px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                                    selectedCategory === cat.id
                                        ? "bg-industrial-orange text-white"
                                        : "bg-industrial-ink/5 text-industrial-ink hover:bg-industrial-ink/10"
                                }`}
                            >
                                [{cat.label}]
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`hover-target group relative overflow-hidden bg-industrial-ink/5 cursor-pointer ${
                                item.aspectRatio === "portrait"
                                    ? "row-span-2 aspect-[3/4]"
                                    : item.aspectRatio === "landscape"
                                    ? "col-span-2 aspect-[2/1]"
                                    : "aspect-square"
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.image}
                                    alt={item.caption}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                            </div>

                            <div className="absolute inset-0 bg-industrial-ink/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                                <p className="font-mono text-xs text-white mb-2 leading-relaxed">
                                    {item.caption}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] text-white/60 uppercase">
                                        {item.date}
                                    </span>
                                    <span
                                        className={`font-mono text-[9px] px-2 py-1 rounded ${
                                            item.category === "failure"
                                                ? "bg-red-500/20 text-red-300"
                                                : item.category === "prototype"
                                                ? "bg-industrial-orange/20 text-industrial-orange"
                                                : item.category === "test"
                                                ? "bg-blue-500/20 text-blue-300"
                                                : item.category === "sketch"
                                                ? "bg-purple-500/20 text-purple-300"
                                                : "bg-industrial-ink/20 text-white/60"
                                        }`}
                                    >
                                        {item.category.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute top-2 left-2 font-mono text-[9px] bg-industrial-ink/80 text-white px-2 py-1 rounded z-10">
                                LAB_{item.id}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* LIGHTBOX MODAL */}
            {selectedItem && (
                <motion.div
                    className="fixed inset-0 md:left-[300px] bg-industrial-ink/95 z-50 flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedItem(null)}
                >
                    <motion.div
                        className="max-w-4xl w-full bg-industrial-paper rounded overflow-hidden"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative aspect-video bg-industrial-ink/10">
                            <Image
                                src={selectedItem.image}
                                alt={selectedItem.caption}
                                fill
                                className="object-contain"
                                sizes="90vw"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-xs text-industrial-dim">
                                    LAB_{selectedItem.id} / /{" "}
                                    {selectedItem.date}
                                </span>
                                <span
                                    className={`font-mono text-[10px] px-3 py-1 rounded uppercase ${
                                        selectedItem.category === "failure"
                                            ? "bg-red-500/10 text-red-600"
                                            : selectedItem.category ===
                                              "prototype"
                                            ? "bg-industrial-orange/10 text-industrial-orange"
                                            : selectedItem.category === "test"
                                            ? "bg-blue-500/10 text-blue-600"
                                            : selectedItem.category === "sketch"
                                            ? "bg-purple-500/10 text-purple-600"
                                            : "bg-industrial-ink/10 text-industrial-ink"
                                    }`}
                                >
                                    {selectedItem.category}
                                </span>
                            </div>
                            <p className="font-mono text-sm text-industrial-ink leading-relaxed">
                                {selectedItem.caption}
                            </p>
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="hover-target mt-6 w-full border border-industrial-ink/20 py-3 font-mono text-xs uppercase hover:bg-industrial-orange hover:text-white hover:border-industrial-orange transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
