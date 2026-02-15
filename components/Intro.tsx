"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useStore } from "@/store/useStore";

export default function Intro() {
    const { introFinished, setIntroFinished } = useStore();

    const [isMobile, setIsMobile] = useState(false);

    // STARTUP STATE:
    // false = Only Loader (Center)
    // true = Loader moves up, Text appears
    const [started, setStarted] = useState(false);

    // SEQUENCE STAGES:
    // 0: Waiting for User Input (Enter / Tap)
    // 1: Strikethrough + Text Move Up + Font Shrink
    // 2: Orange Flood (Camouflage) + "nevermind." (Centered)
    // 3: Clarity (Background clears, Orange text remains)
    // 4: Identity (Signature Drop) → Triggers Layout Shift
    const [stage, setStage] = useState(0);

    // ─── SEQUENCE LOGIC ───────────────────────────────────────────────────────
    const runSequence = useCallback(() => {
        // Stage 1: Strikethrough + Move Up + Shrink
        setStage(1);

        // Stage 2: Orange Flood (1s after trigger)
        setTimeout(() => setStage(2), 1000);

        // Stage 3: Clarity — background drains, "I ACTUALLY BUILD THINGS" appears
        setTimeout(() => setStage(3), 3500);

        // Stage 4: Signature drop — pushes headline up via LayoutGroup
        setTimeout(() => setStage(4), 4500);

        // FIX 1: Exit bumped from 7000ms → 8000ms for comfortable reading time
        setTimeout(() => {
            setIntroFinished(true);
            sessionStorage.setItem("hasVisited", "true");
        }, 8000);
    }, [setIntroFinished]);

    // ─── EFFECTS ──────────────────────────────────────────────────────────────

    // Initial startup timer — loader plays alone for 1.5s
    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setIntroFinished(true);
            return;
        }
        const startTimer = setTimeout(() => setStarted(true), 1500);
        return () => clearTimeout(startTimer);
    }, [setIntroFinished]);

    // Input listeners — keyboard (desktop) and tap (mobile)
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

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <AnimatePresence>
            {!introFinished && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-default overflow-hidden"
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
                        {/* ── 1. DREAM SECTION (CENTERED) ──────────────────────
                            FIX 2: Replaced style={{ display: none }} workaround
                            with proper AnimatePresence conditional render.
                            The exit animation now fades before unmounting,
                            preventing ghost elements without fighting Framer.
                        ─────────────────────────────────────────────────────── */}
                        <AnimatePresence>
                            {stage < 2 && (
                                <motion.div
                                    className="flex flex-col items-center gap-6 relative z-10"
                                    animate={{ y: stage >= 1 ? -60 : 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "circOut",
                                    }}
                                >
                                    {/* LOADER */}
                                    <motion.div
                                        animate={{ y: started ? -20 : 0 }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <DimensionLoader />
                                    </motion.div>

                                    {/* "i once had a dream" */}
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
                                        <h1 className="font-serif text-2xl md:text-3xl italic text-industrial-ink relative">
                                            i once had a dream
                                            {/* Strikethrough */}
                                            <motion.div
                                                className="absolute top-1/2 left-0 h-[2px] bg-industrial-orange w-full origin-left"
                                                initial={{ scaleX: 0 }}
                                                animate={{
                                                    scaleX: stage >= 1 ? 1 : 0,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.1,
                                                }}
                                            />
                                        </h1>
                                    </motion.div>

                                    {/* Prompt — blinking, absolutely positioned below */}
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
                            )}
                        </AnimatePresence>

                        {/* ── 2. "NEVERMIND." (STRICTLY CENTERED, ABSOLUTE) ── */}
                        <AnimatePresence>
                            {stage >= 2 && stage < 3 && (
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
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

                        {/* ── 3. REALITY SECTION (RIGHT-ALIGNED) ──────────────
                            FIX 3 + FIX 4: Identity reveal reworked.
                            - "— Raphael Murillo" as a first-person serif
                              signature, not a third-person mono caption.
                            - Larger on mobile so it's legible at small sizes.
                        ─────────────────────────────────────────────────────── */}
                        <div className="absolute top-0 right-0 h-full w-full flex flex-col justify-center items-end px-6 md:px-20 pointer-events-none z-20">
                            <LayoutGroup>
                                {/* Main headline */}
                                <AnimatePresence>
                                    {stage >= 3 && (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.16, 1, 0.3, 1],
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

                                {/* FIX 3 & 4: Signature — first-person, serif, legible on mobile */}
                                {stage >= 4 && (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="mt-4 md:mt-5 text-right"
                                    >
                                        {/* Serif signature — conviction, not caption */}
                                        <p className="font-serif text-lg md:text-2xl text-industrial-ink/70 italic">
                                            — Raphael Murillo
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

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
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
                if (i >= text.length) clearInterval(timer);
            }, speed);
            return () => clearInterval(timer);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [text, speed, startDelay]);

    return <span>{displayedText}</span>;
}

// ─── DIMENSION LOADER ─────────────────────────────────────────────────────────
// FIX 5: Arrow characters now JSX string expressions — fixes UTF-8 encoding artifacts
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
                {/* Left track */}
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
                    {/* FIX 5: JSX string expression prevents encoding corruption */}
                    <span className="text-[6px] text-industrial-dim z-10">
                        {"◀"}
                    </span>
                </div>

                {/* Counter */}
                <span className="w-12 text-center tabular-nums text-industrial-ink">
                    {count.toString().padStart(3, "0")}mm
                </span>

                {/* Right track */}
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
                    {/* FIX 5: JSX string expression prevents encoding corruption */}
                    <span className="text-[6px] text-industrial-dim z-10">
                        {"▶"}
                    </span>
                </div>
            </div>
            <div className="h-3 w-px bg-industrial-dim/40" />
        </div>
    );
}
