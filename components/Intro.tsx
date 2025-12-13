"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function Intro() {
    const { introFinished, setIntroFinished } = useStore();
    const [phase, setPhase] = useState<"dream" | "reality">("dream");

    useEffect(() => {
        // Check if user has already visited in this session
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setIntroFinished(true);
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && phase === "dream") {
                setPhase("reality");

                // Wait 2.2 seconds for the "Reality" impact, then lift the curtain
                setTimeout(() => {
                    setIntroFinished(true);
                    sessionStorage.setItem("hasVisited", "true");
                }, 2200);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [phase, setIntroFinished]);

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
                            className="text-center"
                        >
                            <h1 className="font-serif text-3xl italic text-industrial-ink md:text-5xl">
                                i once had a dream
                            </h1>
                            <div className="mt-12 flex flex-col items-center gap-2">
                                <div className="h-px w-24 bg-industrial-dim/30 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-industrial-orange"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            ease: "linear",
                                        }}
                                    />
                                </div>
                                <p className="font-mono text-xs text-industrial-dim animate-pulse">
                                    PRESS [ENTER] TO WAKE UP
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* PHASE 2: THE REALITY */}
                    {phase === "reality" && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.1 }} // Instant snap
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
