"use client";

import { useState, useEffect } from "react";

export default function Cipher({
    text,
    trigger,
}: {
    text: string;
    trigger: boolean;
}) {
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        if (trigger) {
            const chars = "0123456789";
            let iterations = 0;

            const interval = setInterval(() => {
                setDisplay(
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iterations) return text[index];
                            return chars[Math.floor(Math.random() * 10)];
                        })
                        .join("")
                );

                if (iterations >= text.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 30);

            return () => {
                clearInterval(interval);
            };
        }
    }, [trigger, text]);

    return <span className="inline-block tabular-nums">{display}</span>;
}
