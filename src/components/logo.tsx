interface LogoMarkProps {
    size?: number;
    className?: string;
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="32" height="32" rx="8" fill="var(--primary)" />
            <rect x="6" y="11" width="13" height="10" rx="2" fill="white" fillOpacity="0.95" />
            <rect x="20" y="11" width="6" height="10" rx="2" fill="white" fillOpacity="0.55" />
            <line
                x1="20"
                y1="13.5"
                x2="20"
                y2="18.5"
                stroke="var(--primary)"
                strokeWidth="0.75"
                strokeDasharray="1.5 1.2"
            />
            <line
                x1="9"
                y1="14.5"
                x2="15"
                y2="14.5"
                stroke="var(--primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <line
                x1="9"
                y1="17"
                x2="13"
                y2="17"
                stroke="var(--primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

interface LogoFullProps {
    size?: number;
    className?: string;
}

export function LogoFull({ size = 28, className }: LogoFullProps) {
    return (
        <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
            <LogoMark size={size} />
            <span className="font-title font-semibold leading-none">Nexo</span>
        </span>
    );
}
