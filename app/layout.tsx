import type { Metadata } from "next";
import { DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const serifFont = DM_Serif_Display({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-editorial",
});

const monoFont = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Raphael Murillo | Mechanical Engineer",
    description: "Mechanical Engineering Portfolio",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${serifFont.variable} ${monoFont.variable} bg-industrial-paper text-industrial-ink antialiased overflow-x-hidden selection:bg-industrial-orange selection:text-white`}
            >
                {/* GLOBAL DOTTED BACKGROUND - FIX 3 */}
                <div
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{
                        // Changed from transparent to a stronger dot color (#111)
                        // Increased opacity from 0.05 to 0.08
                        backgroundImage:
                            "radial-gradient(#111 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                        opacity: 0.08,
                    }}
                />

                <div className="flex min-h-screen">
                    <Sidebar />

                    <main className="flex-1 md:ml-[300px] relative z-10">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
