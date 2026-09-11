import type { Metadata } from 'next';
import { BibliaClient } from './BibliaClient';

export const metadata: Metadata = {
  title: 'Bíblia Online',
  description: 'Leitor bíblico digital interativo com navegação por livros do Antigo e Novo Testamento, capítulos e áudio narração.',
};

export default function BibliaPage() {
  return <BibliaClient />;
}
