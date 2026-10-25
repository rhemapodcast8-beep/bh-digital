'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, 
  ChevronRight,
  BookOpen,
  Search,
  User,
  MessageCircle,
  FileText,
  Smartphone,
  Star,
  Library,
  Book
} from 'lucide-react';
import Image from 'next/image';

const FERRAMENTAS_IA = [
  {
    id: 'esboco',
    title: 'Gerador de Esboço Bíblico',
    description: 'Crie uma estrutura lógica e homilética completa para pregações com introdução, tópicos e aplicação prática.',
    icon: BookOpen,
    href: '/ferramentas/gerador-esboco',
    buttonText: 'TESTAR GERADOR',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'exegese',
    title: 'Explicador Exegético de Passagens',
    description: 'Faça uma exegese profunda e clara de qualquer texto bíblico considerando o contexto histórico, literário e teológico.',
    icon: Search,
    href: '/ferramentas/exegese',
    buttonText: 'EXPLICAR PASSAGEM',
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 'personagem',
    title: 'Estudo de Personagens Bíblicos',
    description: 'Gere um estudo detalhado e biográfico sobre qualquer personagem bíblico, com virtudes, falhas e lições.',
    icon: User,
    href: '/ferramentas/personagens',
    buttonText: 'GERAR ESTUDO',
    color: 'from-emerald-600 to-emerald-800'
  },
  {
    id: 'perguntas',
    title: 'Gerador de Perguntas para Grupos',
    description: 'Crie perguntas para discussão em grupo (EBD, PG, Jovens) focadas em observação, interpretação e aplicação.',
    icon: MessageCircle,
    href: '/ferramentas/perguntas',
    buttonText: 'GERAR PERGUNTAS',
    color: 'from-orange-600 to-orange-800'
  },
  {
    id: 'sermao',
    title: 'Preparador Completo de Sermões',
    description: 'Desenvolva um sermão completo e detalhado, com transições, ilustrações, e apelo final focado no público-alvo.',
    icon: FileText,
    href: '/ferramentas/sermao',
    buttonText: 'PREPARAR SERMÃO',
    color: 'from-[#D4AF37] to-[#C59B27]'
  }
];

import { useI18n } from '@/lib/i18n/I18nContext';

export function FerramentasClient() {
  const { t, localizePath } = useI18n();

  const FERRAMENTAS_IA = [
    {
      id: 'esboco',
      title: 'Gerador de Esboço Bíblico',
      description: 'Crie uma estrutura lógica e homilética completa para pregações com introdução, tópicos e aplicação prática.',
      icon: BookOpen,
      href: '/ferramentas/gerador-esboco',
      buttonText: t.ferramentas.testGenerator,
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: 'exegese',
      title: 'Explicador Exegético de Passagens',
      description: 'Faça uma exegese profunda e clara de qualquer texto bíblico considerando o contexto histórico, literário e teológico.',
      icon: Search,
      href: '/ferramentas/exegese',
      buttonText: t.ferramentas.explainPassage,
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 'personagem',
      title: 'Estudo de Personagens Bíblicos',
      description: 'Gere um estudo detalhado e biográfico sobre qualquer personagem bíblico, com virtudes, falhas e lições.',
      icon: User,
      href: '/ferramentas/personagens',
      buttonText: t.ferramentas.generateStudy,
      color: 'from-emerald-600 to-emerald-800'
    },
    {
      id: 'perguntas',
      title: 'Gerador de Perguntas para Grupos',
      description: 'Crie perguntas para discussão em grupo (EBD, PG, Jovens) focadas em observação, interpretação e aplicação.',
      icon: MessageCircle,
      href: '/ferramentas/perguntas',
      buttonText: t.ferramentas.generateQuestions,
      color: 'from-orange-600 to-orange-800'
    },
    {
      id: 'sermao',
      title: 'Preparador Completo de Sermões',
      description: 'Desenvolva um sermão completo e detalhado, com transições, ilustrações, e apelo final focado no público-alvo.',
      icon: FileText,
      href: '/ferramentas/sermao',
      buttonText: t.ferramentas.prepareSermon,
      color: 'from-[#D4AF37] to-[#C59B27]'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href={localizePath('/')} className="hover:text-white transition-colors">{t.nav.inicio}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#E5C05B] font-semibold">{t.nav.ferramentas}</span>
      </nav>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
          <Wrench className="w-4 h-4" />
          <span>{t.ferramentas.pageBadge}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {t.ferramentas.pageTitle}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          {t.ferramentas.pageDesc}
        </p>
      </div>

      {/* Principais Aplicações (WIPE CRM, ESTUDA FACIL, ETC) */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Star className="w-5 h-5 text-[#D4AF37]" />
          Aplicações em Destaque
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* WIPE CRM */}
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-[#D4AF37]/50 transition-all">
            <div className="relative w-full h-64 sm:h-72">
              <Image 
                src="/images/ferramentas/wipe-crm.png" 
                alt="WIPE CRM" 
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                7 DIAS GRÁTIS
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">WIPE CRM</h3>
                <p className="text-sm font-semibold text-[#E5C05B] uppercase tracking-wider">CRM para WhatsApp Web</p>
                <p className="text-slate-300 text-sm leading-relaxed mt-4">
                  Organize seus clientes, acompanhe seus leads, gerencie orçamentos e acompanhe suas vendas diretamente no WhatsApp Web.
                </p>
                <p className="text-slate-400 text-xs italic mt-2">
                  Teste o WIPE CRM gratuitamente por 7 dias. Depois do período de teste, caso tenha interesse em continuar utilizando, entre em contato conosco.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
                <Link href="/ferramentas/wipe-crm" className="flex-1 text-center bg-[#D4AF37] hover:bg-[#C59B27] text-[#070D18] font-bold text-sm py-3 px-4 rounded-xl transition-colors">
                  CONHECER O WIPE CRM
                </Link>
                <Link href="/ferramentas/wipe-crm" className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors">
                  TESTAR 7 DIAS GRÁTIS
                </Link>
                <a href="https://wa.me/5582987616759?text=Ol%C3%A1%21+Tenho+interesse+no+WIPE+CRM+e+gostaria+de+saber+mais+sobre+o+teste+gr%C3%A1tis+de+7+dias." target="_blank" rel="noopener noreferrer" className="w-full sm:flex-1 text-center bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors">
                  FALAR NO WHATSAPP
                </a>
              </div>
            </div>
          </div>

          {/* ESTUDA-FÁCIL */}
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-[#D4AF37]/50 transition-all">
            <div className="relative w-full h-64 sm:h-72 bg-[#0A1121] flex items-center justify-center p-8">
              <Image 
                src="/images/ferramentas/estuda-facil.png" 
                alt="ESTUDA-FÁCIL" 
                width={200}
                height={200}
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                DISPONÍVEL NA PLAY STORE
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">ESTUDA-FÁCIL</h3>
                <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Aplicativo Educacional</p>
                <p className="text-slate-300 text-sm leading-relaxed mt-4">
                  Aplicativo de estudos com recursos inteligentes para ajudar na aprendizagem.
                </p>
              </div>
              
              <div className="mt-6">
                <a
                  href="https://play.google.com/store/apps/details?id=com.aistudio.estudafacil.kfudix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-4 rounded-xl transition-colors shadow-lg"
                >
                  <Smartphone className="w-4 h-4" />
                  BAIXAR NA GOOGLE PLAY
                </a>
              </div>
            </div>
          </div>

          {/* MEU DIA 2.0 */}
          <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg hover:border-[#D4AF37]/50 transition-all">
            <div className="relative w-full h-64 sm:h-72 bg-[#0A1832] flex items-center justify-center p-8">
              <Image 
                src="/images/ferramentas/meu-dia-2.png" 
                alt="Meu Dia 2.0" 
                width={200}
                height={200}
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute top-4 left-4 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                EM BREVE
              </div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Meu Dia 2.0</h3>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Aplicativo de Organização</p>
                <p className="text-slate-300 text-sm leading-relaxed mt-4">
                  Gerencie suas tarefas, rotinas e compromissos do dia a dia com praticidade e eficiência.
                </p>
              </div>
              
              <div className="mt-6">
                <button 
                  disabled
                  className="w-full text-center bg-slate-800 border border-slate-700 text-slate-500 font-bold text-sm py-4 rounded-xl cursor-not-allowed"
                >
                  EM BREVE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Outras Ferramentas e Seções Existentes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <Link href="/biblia" className="group p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex flex-col items-center text-center transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">BÍBLIA SAGRADA BH</h4>
            <p className="text-xs text-slate-400">Leia e estude a Bíblia com nossa interface otimizada.</p>
          </Link>
          
          <Link href="/premium" className="group p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex flex-col items-center text-center transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">Biblioteca Premium</h4>
            <p className="text-xs text-slate-400">Conteúdos exclusivos para assinantes.</p>
          </Link>
          
          <Link href="/materiais" className="group p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 flex flex-col items-center text-center transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Library className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">Materiais Digitais</h4>
            <p className="text-xs text-slate-400">E-books, guias e PDFs para download.</p>
          </Link>
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* Grid de Ferramentas IA */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-[#D4AF37]" />
          Inteligência Artificial
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FERRAMENTAS_IA.map((ferramenta) => {
            const Icon = ferramenta.icon;
            return (
              <Link 
                href={ferramenta.href} 
                key={ferramenta.id}
                className="group block p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-[#D4AF37]/10 transition-all cursor-pointer h-full flex flex-col"
              >
                <div className="flex flex-col h-full space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ferramenta.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                      {ferramenta.title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {ferramenta.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-auto">
                    <div className="w-full text-center px-4 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs border border-slate-700 group-hover:bg-slate-700 transition-colors">
                      {ferramenta.buttonText}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
