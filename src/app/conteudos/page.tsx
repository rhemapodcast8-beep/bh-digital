import type { Metadata } from 'next';
import { ConteudosClient } from './ConteudosClient';
import { PremiumPageBackground } from '@/components/ui/PremiumPageBackground';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Biblioteca de Conteúdos',
  description: 'Acompanhe vídeos, ensinamentos e mensagens em vídeo no YouTube, TikTok e Kwai reunidos no BH Digital.',
};

export default function ConteudosPage() {
  return (
    <>
      <PremiumPageBackground variant="conteudos" />
      <div className="page-content">
        <PageHero
          badge="Biblioteca Digital"
          title="CONTEÚDOS"
          description="Artigos, vídeos e ensinamentos organizados por tema para aprofundar seu conhecimento das Escrituras."
          accentColor="#D4AF37"
          decorationVariant="dots"
        />
        <ConteudosClient />
      </div>
    </>
  );
}
