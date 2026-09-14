import type { Metadata } from 'next';
import { Suspense } from 'react';
import { MateriaisClient } from './MateriaisClient';

export const metadata: Metadata = {
  title: 'Materiais Bíblicos e Pedagógicos',
  description: 'Esboços, estudos detalhados, apostilas para professores, manuais de liderança e recursos no BH Digital.',
};

export default function MateriaisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060B16]" />}>
      <MateriaisClient />
    </Suspense>
  );
}
