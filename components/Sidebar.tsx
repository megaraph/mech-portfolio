"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { introFinished, resetIntro } = useStore();

    const handleReplay = () => {
        sessionStorage.removeItem("hasVisited");
        resetIntro();
        router.push("/");
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
                        {/* Monogram */}
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 border border-industrial-ink/10 flex items-center justify-center bg-industrial-paper">
                                <Image
                                    src="/monogram.png"
                                    alt="RM Monogram"
                                    width={64} // 16 * 4 (Tailwind w-16)
                                    height={64} // 16 * 4 (Tailwind h-16)
                                    className="object-contain" // You don't strictly need w-16 h-16 here if width/height match, but keeping them is fine for responsiveness
                                    priority // Optional: Loads this image immediately since it's above the fold
                                />
                            </div>
                        </div>

                        {/* Name */}
                        <h1 className="font-serif text-2xl leading-none text-industrial-ink mb-4 text-center">
                            Raphael C. Murillo
                        </h1>

                        {/* Credentials with Gear */}
                        <div className="flex items-center justify-center gap-2">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-industrial-orange"
                                style={{
                                    animation:
                                        "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                                }}
                            >
                                {/* Center circle */}
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                />

                                {/* 4 main spokes (cardinal directions) */}
                                <line
                                    x1="12"
                                    y1="2"
                                    x2="12"
                                    y2="6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="12"
                                    y1="18"
                                    x2="12"
                                    y2="22"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="2"
                                    y1="12"
                                    x2="6"
                                    y2="12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="18"
                                    y1="12"
                                    x2="22"
                                    y2="12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                                {/* 4 diagonal spokes */}
                                <line
                                    x1="4.93"
                                    y1="4.93"
                                    x2="7.76"
                                    y2="7.76"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="16.24"
                                    y1="16.24"
                                    x2="19.07"
                                    y2="19.07"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="4.93"
                                    y1="19.07"
                                    x2="7.76"
                                    y2="16.24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <line
                                    x1="16.24"
                                    y1="7.76"
                                    x2="19.07"
                                    y2="4.93"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
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
