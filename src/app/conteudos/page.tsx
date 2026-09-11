import type { Metadata } from 'next';
import { ConteudosClient } from './ConteudosClient';

export const metadata: Metadata = {
  title: 'Biblioteca de Conteúdos',
  description: 'Acompanhe vídeos, ensinamentos e mensagens em vídeo no YouTube, TikTok e Kwai reunidos no BH Digital.',
};

export default function ConteudosPage() {
  return <ConteudosClient />;
}
