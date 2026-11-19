import type { Metadata } from 'next';
import { DesafioBiblicoClient } from './DesafioBiblicoClient';

export const metadata: Metadata = {
  title: 'Desafio Bíblico BH',
  description: 'Responda perguntas bíblicas, aprenda com cada explicação e acompanhe sua evolução.',
};

export default function DesafioBiblicoPage() {
  return <DesafioBiblicoClient />;
}
