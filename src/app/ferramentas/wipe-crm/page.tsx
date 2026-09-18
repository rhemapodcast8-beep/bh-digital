import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Wrench, 
  CheckCircle2, 
  LayoutDashboard, 
  Users, 
  TrendingUp 
} from 'lucide-react';
import { WipeCrmAnalytics, WhatsAppCTA } from './WipeCrmClient';

export const metadata: Metadata = {
  title: 'WIPE CRM | BH Digital',
  description: 'Organize seus clientes, acompanhe seus leads e gerencie orçamentos diretamente no WhatsApp Web.',
};

export default function WipeCrmPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* GA4: rastreia visualização da página e cliques no WhatsApp */}
      <WipeCrmAnalytics />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">Início</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/ferramentas" className="hover:text-white transition-colors">Ferramentas</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#E5C05B] font-semibold">WIPE CRM</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 sm:h-96 lg:h-full min-h-[300px]">
            <Image 
              src="/images/ferramentas/wipe-crm.png" 
              alt="WIPE CRM Interface" 
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          
          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                7 Dias Grátis
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                WIPE CRM
              </h1>
              <p className="text-xl text-[#E5C05B] font-semibold">
                O seu funil de vendas no WhatsApp Web
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Transforme o seu WhatsApp em uma verdadeira máquina de vendas. Organize conversas, gerencie leads através de Kanban e não perca mais nenhuma negociação.
              </p>
            </div>

            <div className="space-y-4">
              <WhatsAppCTA />
              <p className="text-xs text-center text-slate-400 italic">
                Teste grátis por 7 dias. Entre em contato para ativar sua licença.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-12 space-y-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Principais Recursos</h2>
          <p className="text-slate-400">Tudo que você precisa para gerenciar seus clientes de forma eficiente e profissional.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#080E1B] border border-slate-800 rounded-2xl hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Kanban Integrado</h3>
            <p className="text-sm text-slate-400">Visualize seu funil de vendas com colunas arrastáveis diretamente na tela do WhatsApp Web.</p>
          </div>

          <div className="p-6 bg-[#080E1B] border border-slate-800 rounded-2xl hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-12 h-12 bg-purple-900/30 text-purple-400 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Gestão de Leads</h3>
            <p className="text-sm text-slate-400">Salve informações importantes dos clientes, gere orçamentos e acompanhe o status de cada um.</p>
          </div>

          <div className="p-6 bg-[#080E1B] border border-slate-800 rounded-2xl hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-12 h-12 bg-emerald-900/30 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Aumento de Vendas</h3>
            <p className="text-sm text-slate-400">Nunca mais esqueça de responder um cliente ou fazer follow-up de uma negociação em aberto.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
