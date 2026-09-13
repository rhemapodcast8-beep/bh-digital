import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PremiumSucessoPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-[#D4AF37]/30 rounded-2xl p-8 text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-[#E5C05B]" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Assinatura concluída!</h1>
        <p className="text-slate-300">
          Seu acesso ao BH DIGITAL Premium está sendo ativado. Aproveite todos os recursos exclusivos preparados para sua edificação.
        </p>
        <Link 
          href="/perfil"
          className="inline-block w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all"
        >
          Ir para o Perfil
        </Link>
      </div>
    </main>
  );
}
