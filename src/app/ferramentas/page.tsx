import type { Metadata } from 'next';
import { FerramentasClient } from './FerramentasClient';
import { PremiumPageBackground } from '@/components/ui/PremiumPageBackground';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Ferramentas Digitais',
  description: 'Aplicativos, plataformas de estudo e sistemas de gestão integrados ao ecossistema BH Digital.',
};

export default function FerramentasPage() {
  return (
    <>
      <PremiumPageBackground variant="ferramentas" />
      <div className="page-content">
        <PageHero
          badge="Ecossistema de Soluções"
          title="FERRAMENTAS DIGITAIS"
          description="Aplicativos, plataformas de estudo e sistemas de gestão integrados ao ecossistema BH Digital."
          accentColor="#1E3A8A"
          decorationVariant="dots"
        />
        <FerramentasClient />
      </div>
    </>
  );
}
