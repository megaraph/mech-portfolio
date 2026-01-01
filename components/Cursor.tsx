"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const rafId = useRef<number | undefined>(undefined);

    // Throttle hover checks for better performance
    const lastHoverCheck = useRef(0);

    const updateMousePosition = useCallback((e: MouseEvent) => {
        // Cancel any pending animation frame
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
        }

        // Use requestAnimationFrame for smooth updates
        rafId.current = requestAnimationFrame(() => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        });
    }, []);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        // Throttle to every 100ms for performance
        const now = Date.now();
        if (now - lastHoverCheck.current < 100) return;
        lastHoverCheck.current = now;

        const target = e.target as HTMLElement;
        const isInteractive =
            target.tagName === "A" ||
            target.tagName === "BUTTON" ||
            target.closest("a") !== null ||
            target.closest("button") !== null ||
            target.closest(".hover-target") !== null;

        setIsHovering(isInteractive);
    }, []);

    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);

    useEffect(() => {
        // Use passive event listeners for better scroll performance
        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [updateMousePosition, handleMouseOver, handleMouseDown, handleMouseUp]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
            style={{
                x: mousePosition.x - 16,
                y: mousePosition.y - 16,
                // GPU acceleration hints
                willChange: "transform",
            }}
            animate={{
                scale: isClicking ? 0.8 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 500, // Much higher for snappier response
                damping: 60,
                mass: 0.2,
            }}
        >
            <div className="relative flex items-center justify-center w-8 h-8">
                <motion.div
                    className="absolute w-4 h-[1px] bg-white"
                    animate={{ width: isHovering ? 0 : 16 }}
                    transition={{ duration: 0.12 }}
                />
                <motion.div
                    className="absolute h-4 w-[1px] bg-white"
                    animate={{ height: isHovering ? 0 : 16 }}
                    transition={{ duration: 0.12 }}
                />
                <motion.div
                    className="absolute border border-white rounded-sm"
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{
                        width: isHovering ? 24 : 0,
                        height: isHovering ? 24 : 0,
                        opacity: isHovering ? 1 : 0,
                    }}
                    transition={{ duration: 0.12 }}
                />
            </div>
        </motion.div>
    );
}
