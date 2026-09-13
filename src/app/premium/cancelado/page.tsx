import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PremiumCanceladoPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
        <div className="flex justify-center">
          <XCircle className="w-20 h-20 text-slate-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Assinatura não concluída</h1>
        <p className="text-slate-400">
          Você pode voltar quando quiser. O acesso premium continua disponível para quando for o momento certo.
        </p>
        <Link 
          href="/premium"
          className="inline-block w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm uppercase tracking-wider transition-all"
        >
          Voltar para a página Premium
        </Link>
      </div>
    </main>
  );
}
