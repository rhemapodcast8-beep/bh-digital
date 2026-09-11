import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#080E1B] py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 pb-8 border-b border-slate-800">
          <h1 className="text-4xl font-extrabold text-white">Termos de Uso</h1>
          <p className="text-lg text-slate-400">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar a plataforma BH DIGITAL, você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">2. Uso do Conteúdo</h2>
            <p>
              Todo o conteúdo disponível no BH DIGITAL, incluindo estudos bíblicos, esboços, devocionais e ferramentas, destina-se ao uso pessoal e não comercial. É proibida a reprodução, distribuição ou modificação do conteúdo sem autorização prévia por escrito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">3. Contas de Usuário</h2>
            <p>
              Para acessar certos recursos, você pode precisar criar uma conta. Você é responsável por manter a confidencialidade de sua conta e senha e por restringir o acesso ao seu computador.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">4. Ferramentas de IA</h2>
            <p>
              O uso do "Gerador de Sermão com IA" é fornecido como uma ferramenta de auxílio ao estudo. Os resultados gerados devem ser revisados e conferidos biblicamente. A plataforma não se responsabiliza por interpretações geradas automaticamente.
            </p>
          </section>
        </div>

        <div className="text-center pt-12 border-t border-slate-800">
          <Link href="/" className="inline-flex items-center gap-2 text-[#E5C05B] hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
