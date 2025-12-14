"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
    const pathname = usePathname();
    const { introFinished, resetIntro } = useStore();

    const handleReplay = () => {
        sessionStorage.removeItem("hasVisited");
        resetIntro();
    };

    return (
        // Wrap with AnimatePresence for enter/exit animations
        <AnimatePresence>
            {(introFinished || pathname !== "/") && (
                <motion.aside
                    className="hidden w-[300px] flex-col justify-between border-r border-industrial-ink/10 p-8 md:flex fixed h-full z-20 bg-industrial-paper"
                    initial={{ x: "-100%" }} // Start off-screen left
                    animate={{ x: 0 }} // Slide to position
                    exit={{ x: "-100%" }} // Slide back off-screen on exit
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} // Smooth "Industrial" ease
                >
                    {/* Top: Identity */}
                    <div>
                        <h1 className="font-serif text-2xl leading-none text-industrial-ink whitespace-nowrap">
                            Raphael C. Murillo
                        </h1>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="h-2 w-2 bg-industrial-orange rounded-full animate-pulse"></span>
                            <p className="font-mono text-[10px] tracking-widest text-industrial-dim uppercase">
                                MECH. ENGINEERING // DLSU
                            </p>
                        </div>
                    </div>

                    {/* Middle: Navigation */}
                    <nav className="flex flex-col gap-3 font-mono text-sm">
                        <NavItem
                            href="/"
                            label="INDEX"
                            id="00"
                            active={pathname === "/"}
                        />
                        <NavItem
                            href="/works"
                            label="WORKS"
                            id="01"
                            active={pathname.includes("/works")}
                        />
                        <NavItem
                            href="/lab"
                            label="LAB"
                            id="02"
                            active={pathname.includes("/lab")}
                        />
                        <NavItem
                            href="/specs"
                            label="ABOUT ME"
                            id="03"
                            active={pathname.includes("/specs")}
                        />
                    </nav>

                    {/* Bottom: Status & Replay */}
                    <div className="font-mono text-[10px] text-industrial-dim space-y-4">
                        <div>
                            <p className="text-industrial-orange">
                                AVAILABLE FOR INTERNSHIPS
                            </p>
                            <p>LOC: MANILA, PH</p>
                        </div>

                        <button
                            onClick={(e) => {
                                e.currentTarget.blur();
                                handleReplay();
                            }}
                            className="group flex w-full items-center justify-between border border-industrial-ink/20 px-3 py-2 text-[10px] uppercase hover:bg-industrial-orange hover:text-white hover:border-industrial-orange transition-all cursor-pointer"
                        >
                            <span>Replay Intro</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                                ↵
                            </span>
                        </button>

                        <p className="text-industrial-ink/40">© 2025</p>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}

function NavItem({
    href,
    label,
    id,
    active,
}: {
    href: string;
    label: string;
    id: string;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 cursor-pointer group transition-colors ${
                active
                    ? "text-industrial-orange font-bold"
                    : "text-industrial-dim hover:text-industrial-ink"
            }`}
        >
            <span
                className={`transition-colors ${
                    active
                        ? "text-industrial-orange"
                        : "group-hover:text-industrial-orange"
                }`}
            >
                [{id}]
            </span>
            <span>{label}</span>
        </Link>
    );
}
