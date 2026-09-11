import type { Metadata } from 'next';
import { PerfilClient } from './PerfilClient';

export const metadata: Metadata = {
  title: 'Meu Perfil',
  description: 'Área do usuário, preferências, salvos e favoritos no BH Digital.',
};

export default function PerfilPage() {
  return <PerfilClient />;
}
