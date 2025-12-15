"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { resetIntro } = useStore();

    const navItems = [
        { href: "/", label: "INDEX", id: "00" },
        { href: "/works", label: "WORKS", id: "01" },
        { href: "/lab", label: "LAB", id: "02" },
        { href: "/specs", label: "ABOUT ME", id: "03" },
    ];

    const handleReplay = () => {
        sessionStorage.removeItem("hasVisited");
        resetIntro();
        router.push("/");
        setIsOpen(false);
    };

    const handleNavClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover-target md:hidden fixed top-6 right-6 z-50 bg-industrial-paper border border-industrial-ink/20 p-3 rounded hover:bg-industrial-orange hover:text-white hover:border-industrial-orange transition-all"
                aria-label="Menu"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="md:hidden fixed inset-0 bg-industrial-ink/80 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            className="md:hidden fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-industrial-paper z-40 p-8 overflow-y-auto"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                        >
                            {/* Header */}
                            <div className="mb-8 pt-12">
                                <h2 className="font-serif text-2xl mb-1">
                                    Raphael C. Murillo
                                </h2>
                                <div className="mt-4 flex items-center gap-2">
                                    <span className="h-2 w-2 bg-industrial-orange rounded-full animate-pulse"></span>
                                    <p className="font-mono text-[10px] text-industrial-dim uppercase tracking-wider">
                                        MECH. ENGINEERING // DLSU
                                    </p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-4 mb-12">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() =>
                                            handleNavClick(item.href)
                                        }
                                        className={`hover-target w-full flex items-center gap-3 transition-colors font-mono text-sm text-left ${
                                            pathname === item.href ||
                                            (item.href !== "/" &&
                                                pathname.includes(item.href))
                                                ? "text-industrial-orange font-bold"
                                                : "text-industrial-ink hover:text-industrial-orange"
                                        }`}
                                    >
                                        <span
                                            className={
                                                pathname === item.href ||
                                                (item.href !== "/" &&
                                                    pathname.includes(
                                                        item.href
                                                    ))
                                                    ? "text-industrial-orange"
                                                    : "text-industrial-dim"
                                            }
                                        >
                                            [{item.id}]
                                        </span>
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </nav>

                            {/* Status */}
                            <div className="font-mono text-[10px] text-industrial-dim space-y-4 border-t border-industrial-ink/10 pt-6">
                                <div>
                                    <p className="text-industrial-orange">
                                        AVAILABLE FOR INTERNSHIPS
                                    </p>
                                    <p>LOC: MANILA, PH</p>
                                </div>

                                {/* Replay Button */}
                                <button
                                    onClick={handleReplay}
                                    className="hover-target w-full flex items-center justify-between border border-industrial-ink/20 px-3 py-2 text-[10px] uppercase hover:bg-industrial-orange hover:text-white hover:border-industrial-orange transition-all"
                                >
                                    <span>Replay Intro</span>
                                    <span>↵</span>
                                </button>

                                <p className="text-industrial-ink/40">© 2025</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
