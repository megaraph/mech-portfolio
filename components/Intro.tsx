"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function Intro() {
    const { introFinished, setIntroFinished } = useStore();

    // Detect if user is in mobile
    const [isMobile, setIsMobile] = useState(false);

    // STARTUP STATE:
    // false = Only Loader (Center)
    // true = Loader moves up, Text appears
    const [started, setStarted] = useState(false);

    // SEQUENCE STAGES:
    // 0: Waiting for User Input (Enter)
    // 1: Strikethrough + Text Move Up + Font Shrink
    // 2: Orange Flood (Camouflage) + "Nevermind" (Centered)
    // 3: Clarity (Background clears, Orange text remains)
    // 4: Identity (Name Drop) -> Triggers Layout Shift
    const [stage, setStage] = useState(0);

    // --- 1. SEQUENCE LOGIC ---
    const runSequence = useCallback(() => {
        // Step 1: Strikethrough + Move Up + Shrink
        setStage(1);

        // Step 2: Orange Flood (After 1s)
        setTimeout(() => {
            setStage(2);
        }, 1000);

        // Step 3: Clarity/Reveal (After 2.5s of Orange)
        // NOTE: "nevermind." stays centered here, but fades out at end of this stage
        setTimeout(() => {
            setStage(3);
        }, 3500);

        // Step 4: Name Drop (After 1s of Clarity)
        // This triggers the shift of "I TURN DREAMS" upwards
        setTimeout(() => {
            setStage(4);
        }, 4500);

        // Step 5: Exit (After 2.5s reading time)
        setTimeout(() => {
            setIntroFinished(true);
            sessionStorage.setItem("hasVisited", "true");
        }, 7000);
    }, [setIntroFinished]);

    // --- 2. EFFECTS ---

    // Initial Startup Timer (Loader plays alone for 1.5s)
    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setIntroFinished(true);
            return;
        }

        const startTimer = setTimeout(() => {
            setStarted(true);
        }, 1500);

        return () => clearTimeout(startTimer);
    }, [setIntroFinished]);

    // Key Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && started && stage === 0) {
                runSequence();
            }
        };

        const handleClick = () => {
            if (started && stage === 0 && isMobile) {
                runSequence();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleClick);
        };
    }, [started, stage, runSequence, isMobile]);

    // Mobile responsiveness
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <AnimatePresence>
            {!introFinished && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-default overflow-hidden"
                    // Background Color Transition
                    animate={{
                        backgroundColor: stage === 2 ? "#FF4F00" : "#F7F5F0",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    initial={{ y: 0 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                    }}
                >
                    <div className="relative w-full max-w-7xl px-6 md:px-12 h-screen flex flex-col justify-center">
                        {/* --- 1. THE DREAM SECTION (CENTERED) --- */}
                        {/* Only visible during stage 0 and 1 */}
                        <motion.div
                            className="flex flex-col items-center gap-6 relative z-10"
                            animate={{
                                y: stage >= 1 ? -60 : 0,
                                opacity: stage >= 2 ? 0 : 1, // STRICT FADE OUT
                            }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            style={{ display: stage >= 2 ? "none" : "flex" }} // Remove from layout to prevent ghosts
                        >
                            {/* LOADER */}
                            <motion.div
                                animate={{ y: started ? -20 : 0 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                <DimensionLoader />
                            </motion.div>

                            {/* TEXT: "i once had a dream" */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: started ? 1 : 0,
                                    y: started ? 0 : 10,
                                    scale: stage >= 1 ? 0.9 : 1,
                                }}
                                transition={{ duration: 1 }}
                                className="relative"
                            >
                                <h1 className="font-serif text-2xl italic text-industrial-ink md:text-3xl relative">
                                    i once had a dream
                                    {/* Strikethrough Line */}
                                    <motion.div
                                        className="absolute top-1/2 left-0 h-[2px] bg-industrial-orange w-full origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: stage >= 1 ? 1 : 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.1,
                                        }}
                                    />
                                </h1>
                            </motion.div>

                            {/* PROMPT */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity:
                                        started && stage === 0
                                            ? [1, 0.3, 1]
                                            : 0,
                                }}
                                transition={{
                                    opacity: {
                                        repeat: Infinity,
                                        duration: 0.8,
                                        ease: "linear",
                                    },
                                }}
                                className="font-mono text-[10px] text-industrial-dim tracking-[0.2em] uppercase absolute -bottom-12"
                            >
                                {isMobile
                                    ? "Tap to Wake Up"
                                    : "Press [Enter] to Wake Up"}
                            </motion.p>
                        </motion.div>

                        {/* --- 2. "NEVERMIND" (CENTERED ABSOLUTE) --- */}
                        {/* Strictly centered, independent of other text */}
                        <AnimatePresence>
                            {stage >= 2 && stage < 3 && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }} // Delay ensures orange is full
                                >
                                    <div className="font-mono text-4xl md:text-7xl font-bold tracking-tighter text-industrial-ink text-center">
                                        <Typewriter
                                            text="nevermind."
                                            speed={60}
                                            startDelay={300}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* --- 3. THE REALITY SECTION (RIGHT ALIGNED) --- */}
                        {/* This container sits on top and handles the right-aligned text flow */}
                        <div className="absolute top-0 right-0 h-full w-full flex flex-col justify-center items-end px-6 md:px-20 pointer-events-none z-20">
                            <LayoutGroup>
                                {/* "I TURN DREAMS INTO REALITY" */}
                                <AnimatePresence>
                                    {stage >= 3 && (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.16, 1, 0.3, 1], // Smooth easing
                                                layout: {
                                                    duration: 0.8,
                                                    ease: [0.16, 1, 0.3, 1],
                                                },
                                            }}
                                            className="text-right"
                                        >
                                            <h2 className="font-mono text-xl md:text-5xl font-bold tracking-tighter text-industrial-orange leading-tight max-w-4xl">
                                                I ACTUALLY BUILD THINGS
                                            </h2>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* IDENTITY REVEAL - Pushes previous text up naturally via LayoutGroup */}
                                {stage >= 4 && (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="mt-4 md:mt-6 text-right"
                                    >
                                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-industrial-dim">
                                            This is Raphael Murillo.
                                        </p>
                                    </motion.div>
                                )}
                            </LayoutGroup>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// --- SUB-COMPONENT: Typewriter (Unchanged) ---
function Typewriter({
    text,
    speed = 50,
    startDelay = 0,
}: {
    text: string;
    speed?: number;
    startDelay?: number;
}) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                i++;
                setDisplayedText(text.slice(0, i));

                if (i >= text.length) {
                    clearInterval(timer);
                }
            }, speed);
            return () => clearInterval(timer);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [text, speed, startDelay]);

    return <span>{displayedText}</span>;
}

// --- SUB-COMPONENT: Dimension Loader (Unchanged) ---
function DimensionLoader() {
    const [count, setCount] = useState(0);

    useEffect(() => {
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
                <span className="w-12 text-center tabular-nums text-industrial-ink">
                    {count.toString().padStart(3, "0")}mm
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
