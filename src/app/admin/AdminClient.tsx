'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookMarked, 
  Sparkles, 
  BookOpen, 
  Tv, 
  Wrench, 
  Users, 
  Crown, 
  FolderGit2, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  ArrowLeft,
  X
} from 'lucide-react';
import { MOCK_ESTUDOS, MOCK_DEVOCIONAIS, MOCK_LIVROS, MOCK_CONTEUDOS } from '@/lib/mockData';

type AdminSection = 
  | 'dashboard' 
  | 'estudos' 
  | 'devocionais' 
  | 'livros' 
  | 'conteudos' 
  | 'ferramentas' 
  | 'usuarios' 
  | 'premium' 
  | 'arquivos' 
  | 'configuracoes';

export function AdminClient() {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const navItems = [
    { id: 'dashboard' as AdminSection, label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'estudos' as AdminSection, label: 'Estudos Bíblicos', icon: BookMarked, count: MOCK_ESTUDOS.length },
    { id: 'devocionais' as AdminSection, label: 'Devocionais', icon: Sparkles, count: MOCK_DEVOCIONAIS.length },
    { id: 'livros' as AdminSection, label: 'Livros & E-books', icon: BookOpen, count: MOCK_LIVROS.length },
    { id: 'conteudos' as AdminSection, label: 'Conteúdos Multimídia', icon: Tv, count: MOCK_CONTEUDOS.length },
    { id: 'ferramentas' as AdminSection, label: 'Ferramentas & Apps', icon: Wrench, count: 3 },
    { id: 'usuarios' as AdminSection, label: 'Usuários Cadastrados', icon: Users, count: 148 },
    { id: 'premium' as AdminSection, label: 'Biblioteca Premium', icon: Crown, count: 42 },
    { id: 'arquivos' as AdminSection, label: 'Gerenciador de Arquivos', icon: FolderGit2, count: 19 },
    { id: 'configuracoes' as AdminSection, label: 'Configurações Globais', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A8A] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-blue-400/50 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-[#E5C05B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Painel de Controle • BH DIGITAL
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-[10px] font-mono">
              Ambiente de Gestão
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Administração do Ecossistema
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Site Público</span>
          </Link>
        </div>
      </div>

      {/* Layout Grid: Admin Sidebar + Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Admin Sidebar Navigation */}
        <div className="lg:col-span-3 bg-[#080E1B] rounded-2xl border border-slate-800 p-3 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
            Módulos de Gestão
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#1E3A8A] text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-[#E5C05B]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    active ? 'bg-blue-900 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Admin Content Area */}
        <div className="lg:col-span-9 bg-[#080E1B] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
          
          {/* 1. DASHBOARD OVERVIEW */}
          {currentSection === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Métricas & Indicadores Gerais</h2>
                <p className="text-xs text-slate-400">Resumo consolidado dos dados da plataforma BH DIGITAL.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Estudos Publicados</div>
                  <div className="text-2xl font-extrabold text-white">{MOCK_ESTUDOS.length}</div>
                  <div className="text-[10px] text-emerald-400">9 categorias ativas</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Devocionais Diários</div>
                  <div className="text-2xl font-extrabold text-white">{MOCK_DEVOCIONAIS.length}</div>
                  <div className="text-[10px] text-emerald-400">100% catalogados</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Usuários Registrados</div>
                  <div className="text-2xl font-extrabold text-[#E5C05B]">148</div>
                  <div className="text-[10px] text-slate-400">Ativos</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Downloads Premium</div>
                  <div className="text-2xl font-extrabold text-white">1.420</div>
                  <div className="text-[10px] text-blue-400">PDFs e apostilas</div>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-white">Últimos Conteúdos Cadastrados</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Título</th>
                        <th className="p-3">Módulo</th>
                        <th className="p-3">Data</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {MOCK_ESTUDOS.slice(0, 3).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/50">
                          <td className="p-3 font-semibold text-white">{item.titulo}</td>
                          <td className="p-3"><span className="text-[#E5C05B]">{item.categoria}</span></td>
                          <td className="p-3 text-slate-400">{item.data}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                              Publicado
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => showToast(`Ação de edição: ${item.titulo}`)}
                              className="text-xs text-[#D4AF37] hover:underline"
                            >
                              Editar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. ESTUDOS MANAGEMENT */}
          {currentSection === 'estudos' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">Gerenciar Estudos Bíblicos</h2>
                  <p className="text-xs text-slate-400">Cadastre, edite e remova estudos teológicos e esboços.</p>
                </div>

                <button
                  onClick={() => setShowNewModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C05B] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Estudo</span>
                </button>
              </div>

              {/* Table of Studies */}
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Título & Referência</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Autor</th>
                      <th className="p-3">Data</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {MOCK_ESTUDOS.map((estudo) => (
                      <tr key={estudo.id} className="hover:bg-slate-900/60">
                        <td className="p-3">
                          <div className="font-bold text-white">{estudo.titulo}</div>
                          <div className="text-[11px] text-[#E5C05B]">{estudo.referencia}</div>
                        </td>
                        <td className="p-3">{estudo.categoria}</td>
                        <td className="p-3 text-slate-400">{estudo.autor}</td>
                        <td className="p-3 text-slate-400">{estudo.data}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => showToast(`Editando estudo: ${estudo.titulo}`)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#1E3A8A] text-slate-300 hover:text-white"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => showToast(`Estudo "${estudo.titulo}" removido.`)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900 text-slate-300 hover:text-white"
                            title="Excluir"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other Sections Fallback */}
          {currentSection !== 'dashboard' && currentSection !== 'estudos' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white uppercase tracking-tight">
                Módulo: {currentSection}
              </h2>
              <p className="text-xs text-slate-400">
                Gerenciamento operacional ativado para {currentSection} no painel administrativo BH Digital.
              </p>
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                Tabela e formulários operacionais integrados com Supabase.
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Modal Novo Conteúdo */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#080E1B] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Cadastrar Novo Item</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Título</label>
                <input
                  type="text"
                  placeholder="Digite o título do conteúdo..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Categoria / Módulo</label>
                <input
                  type="text"
                  placeholder="Ex: Oração, Fé, Devocional..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Resumo / Descrição</label>
                <textarea
                  rows={3}
                  placeholder="Resumo do conteúdo..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowNewModal(false);
                  showToast('Conteúdo cadastrado com sucesso!');
                }}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C05B] text-slate-950 font-bold text-xs"
              >
                Salvar Conteúdo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
