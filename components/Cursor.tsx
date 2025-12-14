"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // CHANGED: Added check for '.hover-target' class
            const isInteractive =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".hover-target"); // <--- THIS FIXES IT

            if (isInteractive) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
            animate={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                scale: isClicking ? 0.8 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5,
            }}
        >
            <div className="relative flex items-center justify-center w-8 h-8">
                <motion.div
                    className="absolute w-4 h-[1px] bg-white"
                    animate={{ width: isHovering ? 0 : 16 }}
                />
                <motion.div
                    className="absolute h-4 w-[1px] bg-white"
                    animate={{ height: isHovering ? 0 : 16 }}
                />
                <motion.div
                    className="absolute border border-white"
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{
                        width: isHovering ? 24 : 0,
                        height: isHovering ? 24 : 0,
                        opacity: isHovering ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                />
            </div>
        </motion.div>
    );
}
