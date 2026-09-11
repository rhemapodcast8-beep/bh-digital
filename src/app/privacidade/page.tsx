import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#080E1B] py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 pb-8 border-b border-slate-800">
          <h1 className="text-4xl font-extrabold text-white">Política de Privacidade</h1>
          <p className="text-lg text-slate-400">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">1. Informações Coletadas</h2>
            <p>
              Coletamos informações que você nos fornece diretamente, como quando você cria uma conta, assina nossa newsletter ou entra em contato conosco para suporte. As informações podem incluir seu nome, endereço de e-mail e outras informações de contato.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">2. Como Usamos Suas Informações</h2>
            <p>
              Utilizamos as informações coletadas para fornecer, manter e melhorar nossos serviços, além de desenvolver novos recursos e proteger nossos usuários. Também podemos usar suas informações para comunicar com você sobre atualizações, ofertas e novidades.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">3. Compartilhamento de Informações</h2>
            <p>
              Não vendemos, trocamos ou de outra forma transferimos para terceiros suas informações pessoais identificáveis. Isso não inclui terceiros de confiança que nos auxiliam na operação do nosso site ou na condução dos nossos negócios, desde que essas partes concordem em manter essas informações confidenciais.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-white">4. Segurança</h2>
            <p>
              Implementamos uma variedade de medidas de segurança para manter a segurança das suas informações pessoais quando você as envia ou acessa. Utilizamos criptografia avançada e servidores seguros.
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
