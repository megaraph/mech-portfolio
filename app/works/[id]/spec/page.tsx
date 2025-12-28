"use client";

import { projectsData } from "@/store/projectsData";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Printer } from "lucide-react";
import QRCode from "react-qr-code"; // If you installed it. If not, delete this import.

export default function SpecSheetPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;
    const project = projectsData.find((p) => p.id === projectId);

    if (!project) return <div>Project not found</div>;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-industrial-paper text-industrial-ink font-mono selection:bg-industrial-orange selection:text-white print:[print-color-adjust:exact]">
            {/* ----------------- WEB-ONLY CONTROLS (Hidden on Print) ----------------- */}
            <nav className="print:hidden fixed top-0 left-0 right-0 bg-industrial-paper/80 backdrop-blur border-b border-industrial-ink/10 p-4 flex justify-between items-center z-50">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-xs uppercase hover:text-industrial-orange transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Project
                </button>
                <div className="flex gap-4">
                    <div className="text-xs text-industrial-dim flex items-center">
                        <span className="hidden md:inline">
                            {
                                'PRO TIP: Enable "Background Graphics" in Print Settings'
                            }
                        </span>
                    </div>
                    <button
                        onClick={handlePrint}
                        className="bg-industrial-ink text-white px-4 py-2 text-xs uppercase hover:bg-industrial-orange transition-colors flex items-center gap-2"
                    >
                        <Printer size={16} /> Save as PDF
                    </button>
                </div>
            </nav>

            {/* ----------------- THE A4 SHEET ----------------- */}
            {/* 'print:p-0' removes padding to fit paper perfectly */}
            <div className="max-w-[210mm] mx-auto bg-industrial-paper min-h-screen pt-20 pb-12 print:pt-0 print:pb-0 print:h-screen print:overflow-hidden flex flex-col">
                {/* HEADER ROW */}
                <header className="border-b-2 border-industrial-ink pb-6 mb-8 flex justify-between items-end print:pt-8 print:px-8 px-8">
                    <div>
                        <h1 className="font-serif text-4xl mb-1 text-industrial-ink leading-none">
                            COMPONENT SPEC // {project.id}
                        </h1>
                        <p className="text-xs uppercase tracking-widest text-industrial-dim">
                            {project.category} — {project.year}
                        </p>
                    </div>
                    <div className="text-right font-mono text-[10px] leading-tight text-industrial-ink/60">
                        <div>REF: {project.id}-A01</div>
                        <div>REV: FINAL</div>
                        <div>AUTH: RAPHAEL C. MURILLO</div>
                    </div>
                </header>

                <div className="flex flex-1 gap-8 px-8 print:px-8 h-full">
                    {/* --- LEFT COLUMN: META DATA (30%) --- */}
                    <aside className="w-[30%] border-r border-industrial-ink/10 pr-6 flex flex-col justify-between">
                        {/* Specs Table */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[9px] uppercase tracking-widest text-industrial-orange mb-3 border-b border-industrial-orange/20 pb-1">
                                    Technical Specs
                                </h3>
                                <dl className="space-y-2 text-[10px]">
                                    <div className="flex justify-between border-b border-industrial-ink/5 pb-1">
                                        <dt className="text-industrial-dim">
                                            TYPE
                                        </dt>
                                        <dd className="text-right font-bold">
                                            {project.type}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between border-b border-industrial-ink/5 pb-1">
                                        <dt className="text-industrial-dim">
                                            STATUS
                                        </dt>
                                        <dd className="text-right text-industrial-orange">
                                            {project.status}
                                        </dd>
                                    </div>
                                    <div className="flex justify-between border-b border-industrial-ink/5 pb-1">
                                        <dt className="text-industrial-dim">
                                            DURATION
                                        </dt>
                                        <dd className="text-right">
                                            {project.duration}
                                        </dd>
                                    </div>
                                    <div className="flex flex-col border-b border-industrial-ink/5 pb-1">
                                        <dt className="text-industrial-dim mb-1">
                                            TOOLS
                                        </dt>
                                        <dd className="text-right leading-tight">
                                            {project.tools}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Performance Metrics (If Any) */}
                            {project.metrics && (
                                <div>
                                    <h3 className="text-[9px] uppercase tracking-widest text-industrial-orange mb-3 border-b border-industrial-orange/20 pb-1">
                                        Performance Data
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {project.metrics
                                            .slice(0, 5)
                                            .map((m, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-industrial-ink/5 p-2 border-l-2 border-industrial-ink"
                                                >
                                                    <div className="text-[9px] text-industrial-dim uppercase">
                                                        {m.label}
                                                    </div>
                                                    <div className="text-sm font-bold">
                                                        {m.value}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer / QR */}
                        <div className="mt-auto pt-8">
                            <div className="border border-industrial-ink/10 p-2 bg-white inline-block">
                                {/* Use real URL in production */}
                                <QRCode
                                    value={`https://your-portfolio.com/works/${project.id}`}
                                    size={80}
                                    bgColor="#FFFFFF"
                                    fgColor="#1A1A1A"
                                />
                            </div>
                            <div className="text-[9px] mt-2 text-industrial-dim uppercase tracking-wider">
                                SCAN FOR WEB VIEW
                            </div>
                        </div>
                    </aside>

                    {/* --- RIGHT COLUMN: VISUALS & NARRATIVE (70%) --- */}
                    <main className="flex-1 flex flex-col">
                        {/* HERO IMAGE */}
                        {/* Fixed height aspect ratio for consistency */}
                        <div className="w-full aspect-[16/9] bg-industrial-ink/5 border border-industrial-ink/10 relative overflow-hidden mb-6 grayscale print:grayscale-0">
                            {project.images?.[0] && (
                                <Image
                                    src={project.images[0].src || ""}
                                    alt="Hero Spec"
                                    fill
                                    className="object-cover"
                                />
                            )}
                            {/* Technical Overlay */}
                            <div className="absolute bottom-2 right-2 bg-industrial-paper px-2 py-1 text-[9px] border border-industrial-ink">
                                FIG 1.0 // ISO VIEW
                            </div>
                        </div>

                        {/* HEADLINES */}
                        <div className="mb-6">
                            <h2 className="font-serif text-2xl leading-tight mb-2 text-industrial-orange">
                                {project.tagline || project.description}
                            </h2>
                            <p className="text-xs leading-relaxed text-industrial-ink/80 max-w-prose">
                                {project.description}
                            </p>
                        </div>

                        {/* ENGINEERING NARRATIVE GRID */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="text-[9px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-industrial-ink"></span>
                                    Problem Space
                                </h4>
                                <p className="text-[10px] leading-relaxed text-justify">
                                    {project.background}
                                </p>
                            </div>
                            <div>
                                <h4 className="text-[9px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-industrial-orange"></span>
                                    Solution Architecture
                                </h4>
                                <p className="text-[10px] leading-relaxed text-justify">
                                    {project.execution}
                                </p>
                            </div>
                        </div>

                        {/* HIGHLIGHTS / IMPACT */}
                        <div className="mt-auto border-t border-industrial-ink/10 pt-4">
                            <div className="flex justify-between items-start">
                                {/* Technical Bullets */}
                                <div className="w-2/3 pr-4">
                                    <h4 className="text-[9px] uppercase tracking-widest mb-2 text-industrial-dim">
                                        System Highlights
                                    </h4>
                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                                        {project.highlights
                                            ?.slice(0, 4)
                                            .map((h, i) => (
                                                <li
                                                    key={i}
                                                    className="text-[9px] list-disc list-inside marker:text-industrial-orange"
                                                >
                                                    {h}
                                                </li>
                                            ))}
                                    </ul>
                                </div>

                                {/* Impact Callout */}
                                {project.impactMetrics &&
                                    project.impactMetrics[0] && (
                                        <div className="w-1/3 bg-industrial-orange/10 p-3 border-l-2 border-industrial-orange">
                                            <div className="text-[9px] uppercase text-industrial-orange font-bold mb-1">
                                                Primary Result
                                            </div>
                                            <div className="text-xl font-mono font-bold">
                                                {
                                                    project.impactMetrics[0]
                                                        .improvement
                                                }
                                            </div>
                                            <div className="text-[9px] opacity-60">
                                                {
                                                    project.impactMetrics[0]
                                                        .before
                                                }{" "}
                                                →{" "}
                                                {project.impactMetrics[0].after}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </main>
                </div>

                {/* FOOTER */}
                <footer className="mt-auto px-8 print:px-8 pb-8 pt-4 border-t border-industrial-ink flex justify-between text-[9px] uppercase text-industrial-dim">
                    <div>Proprietary Data // Raphael C. Murillo Portfolio</div>
                    <div>
                        Gen Date: {new Date().toISOString().split("T")[0]}
                    </div>
                </footer>
            </div>
        </div>
    );
}
