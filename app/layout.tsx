import type { Metadata } from "next";
import { DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import MobileMenu from "@/components/MobileMenu";
import Sidebar from "@/components/Sidebar";
import Cursor from "@/components/Cursor";
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
    title: "Raphael Murillo | Mechanical Engineering Portfolio",
    description: "Mechanical Engineering Portfolio",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    // Open Graph (Facebook, Messenger, LinkedIn)
    openGraph: {
        title: "Raphael Murillo | Mechanical Engineering Portfolio",
        description:
            "I design systems that are built, not just imagined. Working from CAD and sketches to machine, I aim to bridge imagination and physical fabrication.",
        url: "https://www.raphmurillo.com",
        siteName: "Raphael Murillo",
        images: [
            {
                url: "https://www.raphmurillo.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "Raph Murillo Portfolio",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    // Twitter Card
    twitter: {
        card: "summary_large_image",
        title: "Raphael Murillo | Mechanical Engineering Portfolio",
        description:
            "I design systems that are built, not just imagined. Working from CAD and sketches to machine, I aim to bridge imagination and physical fabrication.",
        images: ["https://www.raphmurillo.com/og-image.png"],
    },
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
                {/* GLOBAL DOTTED BACKGROUND */}
                <div
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(#1A1A1A 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                        opacity: 0.15,
                    }}
                />
                <div className="print:hidden">
                    {/* MOBILE MENU */}
                    <MobileMenu />

                    {/* CUSTOM CURSOR */}
                    <Cursor />
                </div>
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
