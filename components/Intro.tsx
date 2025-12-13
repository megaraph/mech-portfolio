"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function Intro() {
    const { introFinished, setIntroFinished } = useStore();
    const [phase, setPhase] = useState<"dream" | "reality">("dream");
    const [showText, setShowText] = useState(false); // NEW: Controls the text delay

    useEffect(() => {
        // 1. Check if we've visited before
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setIntroFinished(true);
            return;
        }

        // 2. DELAY: Show text after 2.5 seconds (Loader plays first)
        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 2500);

        // 3. Key listener
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only allow "Enter" if the text is actually visible
            if (e.key === "Enter" && phase === "dream" && showText) {
                setPhase("reality");

                setTimeout(() => {
                    setIntroFinished(true);
                    sessionStorage.setItem("hasVisited", "true");
                }, 2200);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            clearTimeout(textTimer);
        };
    }, [phase, setIntroFinished, showText]);

    return (
        <AnimatePresence>
            {!introFinished && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-industrial-paper cursor-default"
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                    }}
                >
                    {/* PHASE 1: THE DREAM */}
                    {phase === "dream" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, filter: "blur(10px)" }}
                            className="flex flex-col items-center gap-6"
                        >
                            {/* 1. LOADER PLAYS IMMEDIATELY */}
                            <DimensionLoader />

                            {/* 2. TEXT FADES IN AFTER DELAY */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: showText ? 1 : 0,
                                    y: showText ? 0 : 10,
                                }}
                                transition={{ duration: 1 }}
                                className="flex flex-col items-center gap-6"
                            >
                                <h1 className="font-serif text-xl italic text-industrial-ink md:text-2xl">
                                    i once had a dream
                                </h1>

                                <p className="font-mono text-[10px] text-industrial-dim animate-pulse tracking-widest uppercase">
                                    Press [Enter] to Wake Up
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* PHASE 2: THE REALITY */}
                    {phase === "reality" && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.1 }}
                            className="text-center"
                        >
                            <div className="relative inline-block mb-6">
                                <span className="font-serif text-2xl italic text-industrial-dim decoration-industrial-orange/50 line-through md:text-3xl opacity-50">
                                    i once had a dream
                                </span>
                            </div>

                            <div className="flex flex-col items-center">
                                <h2 className="font-mono text-4xl font-bold tracking-tighter text-industrial-ink md:text-7xl">
                                    NEVERMIND.
                                </h2>
                                <h2 className="font-mono text-xl font-bold tracking-tighter text-industrial-orange md:text-4xl mt-2">
                                    I TURN THEM INTO REALITY.
                                </h2>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- SUB-COMPONENT: The Dimension Animation ---
function DimensionLoader() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Counts from 0 to 100 in exactly 2 seconds (20ms * 100)
        const interval = setInterval(() => {
            setCount((prev) => (prev < 100 ? prev + 1 : 0));
        }, 20);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-3 font-mono text-[10px] text-industrial-dim select-none">
            <div className="h-3 w-px bg-industrial-dim/40" />
            <div className="flex items-center gap-2">
                <div className="relative w-12 h-px bg-industrial-dim/20 flex justify-end items-center overflow-hidden">
                    <motion.div
                        className="absolute right-0 h-px bg-industrial-orange w-full"
                        initial={{ x: "100%" }}
                        animate={{ x: ["100%", "0%", "100%"] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <span className="text-[6px] text-industrial-dim z-10">
                        ◀
                    </span>
                </div>

                <span className="w-10 text-center tabular-nums text-industrial-ink">
                    {count.toString().padStart(2, "0")}mm
                </span>

                <div className="relative w-12 h-px bg-industrial-dim/20 flex justify-start items-center overflow-hidden">
                    <motion.div
                        className="absolute left-0 h-px bg-industrial-orange w-full"
                        initial={{ x: "-100%" }}
                        animate={{ x: ["-100%", "0%", "-100%"] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <span className="text-[6px] text-industrial-dim z-10">
                        ▶
                    </span>
                </div>
            </div>
            <div className="h-3 w-px bg-industrial-dim/40" />
        </div>
    );
}
