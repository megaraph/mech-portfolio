import Image from "next/image";

export default function Identity({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {/* Monogram Container */}
            <div className="w-14 h-14 border border-industrial-ink/10 flex items-center justify-center bg-industrial-paper flex-shrink-0">
                <Image
                    src="/monogram-v.png"
                    alt="RM Monogram"
                    width={64}
                    height={64}
                    className="object-contain w-14 h-14"
                    priority
                />
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
                {/* Name */}
                <h1 className="font-serif text-lg leading-tight text-industrial-ink mb-1">
                    Raphael C. Murillo
                </h1>

                {/* Credentials & Status */}
                <div className="flex items-center gap-2">
                    {/* Industrial Status Icon (SVG) */}
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-industrial-orange animate-pulse flex-shrink-0"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                        />
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

                    <p className="font-mono text-[8px] tracking-widest text-industrial-dim uppercase leading-tight whitespace-nowrap">
                        MECH. ENGINEERING // DLSU
                    </p>
                </div>
            </div>
        </div>
    );
}
