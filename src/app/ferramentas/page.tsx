import type { Metadata } from 'next';
import { FerramentasClient } from './FerramentasClient';

export const metadata: Metadata = {
  title: 'Ferramentas Digitais',
  description: 'Aplicativos, plataformas de estudo e sistemas de gestão integrados ao ecossistema BH Digital.',
};

export default function FerramentasPage() {
  return <FerramentasClient />;
}
