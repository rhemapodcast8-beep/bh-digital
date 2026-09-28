import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MateriaisClient } from './MateriaisClient';
import { PremiumPageBackground } from '@/components/ui/PremiumPageBackground';

export const metadata: Metadata = {
  title: 'Materiais Bíblicos e Pedagógicos',
  description: 'Esboços, estudos detalhados, apostilas para professores, manuais de liderança e recursos no BH Digital.',
};

export default function MateriaisPage() {
  return (
    <>
      <PremiumPageBackground variant="materiais" />
      <div className="page-content">
        <Suspense fallback={<div className="min-h-screen" />}>
          <MateriaisClient />
        </Suspense>
      </div>
    </>
  );
}
