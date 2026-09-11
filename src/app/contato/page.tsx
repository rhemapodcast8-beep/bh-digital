import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-[#080E1B] py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-white">Contato & Dúvidas</h1>
          <p className="text-lg text-slate-400">
            Estamos aqui para ajudar. Entre em contato conosco através dos canais abaixo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/30 text-[#E5C05B] flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">E-mail</h3>
            <p className="text-slate-400 text-sm">suporte@bhdigital.com.br</p>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/30 text-[#E5C05B] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">WhatsApp</h3>
            <p className="text-slate-400 text-sm">(00) 00000-0000</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#1E3A8A]/30 text-[#E5C05B] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Endereço</h3>
            <p className="text-slate-400 text-sm">Belo Horizonte, MG</p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Envie uma mensagem</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">Nome</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300">E-mail</label>
                <input type="email" className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="seu@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300">Mensagem</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-[#D4AF37] outline-none" placeholder="Como podemos ajudar?"></textarea>
            </div>
            <button type="button" className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-slate-950 font-bold rounded-xl hover:opacity-90 transition-opacity">
              Enviar Mensagem
            </button>
          </form>
        </div>

        <div className="text-center pt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#E5C05B] hover:text-white transition-colors">
            <BookOpen className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
