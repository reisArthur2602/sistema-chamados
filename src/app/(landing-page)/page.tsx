import type { Metadata } from 'next';
import { LandingFeatures } from './components/landing-features';
import { LandingFooter } from './components/landing-footer';
import { LandingHero } from './components/landing-hero';
import { LandingNav } from './components/landing-nav';

export const metadata: Metadata = {
    title: 'Nexo — Sistema de Chamados',
    description: 'Plataforma de atendimento e gestão de chamados internos.',
};

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <LandingNav />
            <LandingHero />
            <LandingFeatures />
            <LandingFooter />
        </div>
    );
}
