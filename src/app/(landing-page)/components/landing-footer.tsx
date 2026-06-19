import { LogoFull } from '@/components/logo';

export function LandingFooter() {
    return (
        <footer className="border-t px-6 py-5">
            <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-muted-foreground">
                <LogoFull size={20} />
                <span>
                    © {new Date().getFullYear()} · feito por{' '}
                    <a
                        href="https://github.com/dev-arthur"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                        @dev.arthur
                    </a>
                </span>
            </div>
        </footer>
    );
}
