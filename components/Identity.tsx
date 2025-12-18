import Image from "next/image";

export default function Identity({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {/* Monogram Container */}
            <div className="w-12 h-12 border border-industrial-ink/10 flex items-center justify-center bg-industrial-paper flex-shrink-0">
                <Image
                    src="/monogram-v.png"
                    alt="RM Monogram"
                    width={48}
                    height={48}
                    className="object-contain w-12 h-12"
                    priority
                />
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
                {/* Name */}
                <h1 className="font-serif text-xl leading-tight text-industrial-ink mb-1">
                    Raphael Murillo
                </h1>

                {/* Credentials & Status */}
                <div className="flex items-center gap-2">
                    {/* Industrial Status Icon (SVG) */}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        // Tailwind arbitrary value for a slow, 10-second rotation
                        className="text-industrial-orange animate-[spin_10s_linear_infinite] flex-shrink-0"
                    >
                        {/* Center Hole */}
                        <circle cx="12" cy="12" r="3" />
                        {/* Gear Teeth Path */}
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>

                    <p className="font-mono text-[9px] tracking-widest text-industrial-dim uppercase leading-tight whitespace-nowrap">
                        MECH ENGINEERING // DLSU
                    </p>
                </div>
            </div>
        </div>
    );
}
