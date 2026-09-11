import React, { useState } from 'react';
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
  Search, 
  Check, 
  ArrowLeft,
  Eye,
  FileText,
  Upload,
  AlertCircle
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute } from '../types';
import { MOCK_ESTUDOS, MOCK_DEVOCIONAIS, MOCK_LIVROS, MOCK_CONTEUDOS } from '../data/mockData';

interface AdminPageProps {
  onNavigate: (route: PageRoute) => void;
}

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

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
      
      <Breadcrumb
        items={[{ label: 'Painel Administrativo' }]}
        onNavigate={onNavigate}
      />

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
              Ambiente Demonstrativo
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            Administração do Ecossistema
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Site Público</span>
          </button>
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
                <p className="text-xs text-slate-400">Resumo consolidado dos dados do protótipo BH DIGITAL.</p>
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
                  <div className="text-[10px] text-slate-400">Demonstrativo</div>
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
                              onClick={() => showToast(`Editando demonstrativo: ${item.titulo}`)}
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
                            onClick={() => showToast(`Editando demonstrativo: ${estudo.titulo}`)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#1E3A8A] text-slate-300 hover:text-white"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => showToast(`Estudo "${estudo.titulo}" removido (demonstração).`)}
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

          {/* 3. DEVOCIONAIS MANAGEMENT */}
          {currentSection === 'devocionais' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">Gerenciar Devocionais</h2>
                  <p className="text-xs text-slate-400">Publicações diárias com referências bíblicas e meditações.</p>
                </div>

                <button
                  onClick={() => setShowNewModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C05B] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Devocional</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Título</th>
                      <th className="p-3">Passagem</th>
                      <th className="p-3">Data</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {MOCK_DEVOCIONAIS.map((dev) => (
                      <tr key={dev.id} className="hover:bg-slate-900/60">
                        <td className="p-3 font-bold text-white">{dev.titulo}</td>
                        <td className="p-3 text-[#E5C05B]">{dev.referenciaBiblica}</td>
                        <td className="p-3 text-slate-400">{dev.data}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => showToast(`Editando devocional: ${dev.titulo}`)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#1E3A8A] text-slate-300 hover:text-white"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => showToast(`Devocional "${dev.titulo}" removido (demonstração).`)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900 text-slate-300 hover:text-white"
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

          {/* 4. LIVROS MANAGEMENT */}
          {currentSection === 'livros' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">Catálogo de Livros e E-books</h2>
                  <p className="text-xs text-slate-400">Links para Amazon, UICLAP e detalhes das publicações.</p>
                </div>

                <button
                  onClick={() => setShowNewModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C05B] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Livro</span>
                </button>
              </div>

              <div className="space-y-3">
                {MOCK_LIVROS.map((livro) => (
                  <div key={livro.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 rounded overflow-hidden bg-slate-800 flex-shrink-0">
                        <img src={livro.capa} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{livro.titulo}</div>
                        <div className="text-xs text-slate-400">Por {livro.autor} • {livro.tipo}</div>
                        <div className="text-[11px] text-[#E5C05B]">{livro.paginas} páginas • {livro.formato}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast(`Editando livro: ${livro.titulo}`)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-[#1E3A8A] text-xs font-semibold text-white"
                      >
                        Editar Links
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. MULTIMEDIA CONTEÚDOS */}
          {currentSection === 'conteudos' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">Vídeos e Transmissões</h2>
                  <p className="text-xs text-slate-400">Integração com canais YouTube, TikTok e Kwai.</p>
                </div>

                <button
                  onClick={() => setShowNewModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C05B] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Vídeo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_CONTEUDOS.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex gap-3">
                    <div className="w-24 h-16 rounded bg-slate-800 overflow-hidden flex-shrink-0">
                      <img src={c.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#E5C05B] uppercase">{c.plataforma}</span>
                      <div className="text-xs font-bold text-white truncate">{c.titulo}</div>
                      <div className="text-[11px] text-slate-400">{c.duracao} • {c.visualizacoes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. FERRAMENTAS */}
          {currentSection === 'ferramentas' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">Ecossistema de Aplicativos & Ferramentas</h2>
                <p className="text-xs text-slate-400">Configuração das ferramentas integradas da plataforma.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">BÍBLIA SAGRADA BH (Android)</div>
                    <div className="text-xs text-slate-400">Pacote: br.com.bibliasagradabh.app • Versão 2.4.0</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 text-xs font-bold">Ativo</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">ESTUDA-FÁCIL (Plataforma Web)</div>
                    <div className="text-xs text-slate-400">Módulo de estudos e esboços bíblicos</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 text-xs font-bold">Ativo</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">WIPE CRM (Gestão Ministerial)</div>
                    <div className="text-xs text-slate-400">Contatos e acompanhamento ministerial</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 text-xs font-bold">Conectado</span>
                </div>
              </div>
            </div>
          )}

          {/* 7. USUÁRIOS */}
          {currentSection === 'usuarios' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">Usuários Cadastrados (Demonstração)</h2>
                <p className="text-xs text-slate-400">Lista demonstrativa de membros do ecossistema.</p>
              </div>

              <div className="space-y-2">
                {[
                  { nome: 'Carlos Eduardo Santos', email: 'carlos.pastor@exemplo.com', tipo: 'Premium', status: 'Ativo' },
                  { nome: 'Mariana Oliveira', email: 'mariana.lider@exemplo.com', tipo: 'Gratuito', status: 'Ativo' },
                  { nome: 'Pr. Roberto Silveira', email: 'roberto.igreja@exemplo.com', tipo: 'Premium', status: 'Ativo' },
                  { nome: 'Ana Beatriz Souza', email: 'ana.souza@exemplo.com', tipo: 'Gratuito', status: 'Pendente' },
                ].map((u, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{u.nome}</div>
                      <div className="text-slate-400">{u.email}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        u.tipo === 'Premium' ? 'bg-[#D4AF37]/20 text-[#E5C05B]' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {u.tipo}
                      </span>
                      <span className="text-emerald-400 font-mono text-[10px]">{u.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. BIBLIOTECA PREMIUM */}
          {currentSection === 'premium' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">Biblioteca Premium & Planos</h2>
                <p className="text-xs text-slate-400">Controle de materiais exclusivos e arquivos de alta resolução.</p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/50 to-slate-900 border border-[#D4AF37]/30 space-y-2">
                <div className="text-xs font-bold text-[#E5C05B] uppercase">Biblioteca Especial BH DIGITAL</div>
                <div className="text-base font-bold text-white">42 materiais exclusivos catalogados</div>
                <p className="text-xs text-slate-300">
                  Estudos em formato diagramado, apostilas ministeriais e esboços homiléticos para assinantes.
                </p>
              </div>
            </div>
          )}

          {/* 9. GERENCIADOR DE ARQUIVOS */}
          {currentSection === 'arquivos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Gerenciador de Arquivos & PDFs</h2>
                  <p className="text-xs text-slate-400">Repositório de mídia, capas de livros e documentos.</p>
                </div>
                <button
                  onClick={() => showToast('Upload demonstrativo de arquivo acionado.')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Enviar Arquivo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {['Apostila-Vida-de-Oracao.pdf', 'Guia-Esbocos-Homileticos.pdf', 'Plano-Leitura-Anual.pdf'].map((file, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#E5C05B] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{file}</div>
                      <div className="text-[10px] text-slate-400">PDF • Documento Oficial</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. CONFIGURAÇÕES GLOBAIS */}
          {currentSection === 'configuracoes' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">Configurações Gerais do Site</h2>
                <p className="text-xs text-slate-400">Parâmetros institucionais, links sociais e contatos.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Nome do Site</label>
                  <input
                    type="text"
                    defaultValue="BH DIGITAL"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Subtítulo Institucional</label>
                  <input
                    type="text"
                    defaultValue="Palavra • Estudos • Livros • Ferramentas"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">ID do App no Google Play</label>
                  <input
                    type="text"
                    defaultValue="br.com.bibliasagradabh.app"
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Configurações salvas no protótipo com sucesso!')}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C05B] text-slate-950 font-bold text-xs"
                >
                  Salvar Configurações
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Demonstrative New Item Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#080E1B] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Cadastrar Novo Item (Demonstração)</h3>
            <p className="text-xs text-slate-400">
              Formulário demonstrativo de cadastro no painel administrativo BH DIGITAL.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowNewModal(false);
                showToast('Novo item cadastrado com sucesso no protótipo!');
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs text-slate-300 font-semibold">Título do Conteúdo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: O Poder da Oração Eficaz"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold">Passagem / Referência</label>
                <input
                  type="text"
                  placeholder="Ex: Tiago 5:16"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold">Categoria</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white mt-1">
                  <option>Estudos Bíblicos</option>
                  <option>Esboços</option>
                  <option>Devocionais</option>
                  <option>Oração</option>
                  <option>Vida Cristã</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] text-slate-950 font-bold rounded-xl text-xs"
                >
                  Publicar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
