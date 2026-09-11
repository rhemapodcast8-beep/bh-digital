import type { Metadata } from 'next';
import { AdminClient } from './AdminClient';

export const metadata: Metadata = {
  title: 'Painel Administrativo',
  description: 'Gestão de conteúdos, estudos, devocionais, usuários e acervo da plataforma BH Digital.',
};

export default function AdminPage() {
  return <AdminClient />;
}
