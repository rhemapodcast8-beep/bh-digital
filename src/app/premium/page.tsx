import type { Metadata } from 'next';
import { PremiumClient } from './PremiumClient';

export const metadata: Metadata = {
  title: 'Biblioteca Premium',
  description: 'Recursos teológicos avançados, geradores inteligentes de esboços, sermões e acervo exclusivo BH Digital.',
};

export default function PremiumPage() {
  return <PremiumClient />;
}
