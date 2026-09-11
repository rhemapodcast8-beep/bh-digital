import React, { useState } from 'react';
import { 
  User, 
  Bookmark, 
  BookMarked, 
  Sparkles, 
  Crown, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Check, 
  ArrowRight,
  Shield,
  Bell,
  Moon,
  Smartphone
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute, EstudoItem, DevocionalItem } from '../types';
import { MOCK_ESTUDOS, MOCK_DEVOCIONAIS } from '../data/mockData';

interface PerfilPageProps {
  onNavigate: (route: PageRoute) => void;
  onLogout: () => void;
  onSelectEstudo: (estudo: EstudoItem) => void;
  onSelectDevocional: (dev: DevocionalItem) => void;
}

type TabType = 'perfil' | 'favoritos' | 'estudos' | 'devocionais' | 'premium' | 'configuracoes';

export const PerfilPage: React.FC<PerfilPageProps> = ({
  onNavigate,
  onLogout,
  onSelectEstudo,
  onSelectDevocional
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('perfil');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // User form states
  const [nome, setNome] = useState('Pastor / Estudante Demonstrativo');
  const [email, setEmail] = useState('leitor@bhdigital.com.br');
  const [bio, setBio] = useState('Estudante e leitor assíduo da Palavra no ecossistema BH DIGITAL.');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifDaily, setNotifDaily] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Breadcrumb
        items={[{ label: 'Área do Usuário' }]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0A1124] border-2 border-[#D4AF37] flex items-center justify-center text-[#E5C05B] font-extrabold text-2xl shadow-xl">
            {nome.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {nome}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C05B] text-[10px] font-bold uppercase">
                Membro Demonstração
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{email}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-950/60 hover:text-red-400 text-slate-400 text-xs font-semibold border border-slate-800 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sair da Conta (Demo)</span>
        </button>
      </div>

      {/* Main Grid: Navigation Tabs Sidebar + Content Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Tabs (Sidebar) */}
        <div className="lg:col-span-3 bg-[#080E1B] rounded-2xl border border-slate-800 p-3 space-y-1">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'perfil'
                ? 'bg-[#1E3A8A] text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 text-[#D4AF37]" />
            <span>Meu Perfil</span>
          </button>

          <button
            onClick={() => setActiveTab('favoritos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'favoritos'
                ? 'bg-[#1E3A8A] text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#D4AF37]" />
            <span>Favoritos</span>
          </button>

          <button
            onClick={() => setActiveTab('estudos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'estudos'
                ? 'bg-[#1E3A8A] text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <BookMarked className="w-4 h-4 text-[#D4AF37]" />
            <span>Estudos Salvos</span>
          </button>

          <button
            onClick={() => setActiveTab('devocionais')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'devocionais'
                ? 'bg-[#1E3A8A] text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Devocionais Salvos</span>
          </button>

          <button
            onClick={() => setActiveTab('premium')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'premium'
                ? 'bg-[#1E3A8A] text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>Biblioteca Premium</span>
          </button>

          <button
            onClick={() => setActiveTab('configuracoes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'configuracoes'
                ? 'bg-[#1E3A8A] text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 text-[#D4AF37]" />
            <span>Configurações</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-9 bg-[#080E1B] rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl">
          
          {/* TAB 1: MEU PERFIL */}
          {activeTab === 'perfil' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Informações do Perfil</h2>
                <p className="text-xs text-slate-400">Edite suas informações cadastrais e dados de exibição.</p>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Alterações do perfil salvas com sucesso (modo demonstração).</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Nome de Exibição</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Biografia / Ministério</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-750 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C05B] text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  Salvar Alterações
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: FAVORITOS GERAIS */}
          {activeTab === 'favoritos' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">Meus Versículos e Itens Favoritados</h2>
                <p className="text-xs text-slate-400">Passagens e conteúdos guardados para consulta rápida.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#E5C05B]">João 3:16</div>
                    <p className="text-xs text-slate-300 italic mt-0.5">
                      "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito..."
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('/biblia')}
                    className="text-xs text-[#D4AF37] hover:underline"
                  >
                    Abrir no Leitor →
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#E5C05B]">Salmos 23:1</div>
                    <p className="text-xs text-slate-300 italic mt-0.5">
                      "O Senhor é o meu pastor; nada me faltará."
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('/biblia')}
                    className="text-xs text-[#D4AF37] hover:underline"
                  >
                    Abrir no Leitor →
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#E5C05B]">Filipenses 4:13</div>
                    <p className="text-xs text-slate-300 italic mt-0.5">
                      "Tudo posso naquele que me fortalece."
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('/biblia')}
                    className="text-xs text-[#D4AF37] hover:underline"
                  >
                    Abrir no Leitor →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ESTUDOS SALVOS */}
          {activeTab === 'estudos' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">Estudos Bíblicos Salvos</h2>
                <p className="text-xs text-slate-400">Estudos e esboços que você marcou para ler mais tarde.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {MOCK_ESTUDOS.slice(0, 2).map((estudo) => (
                  <div key={estudo.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-[#E5C05B] bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                      {estudo.categoria}
                    </span>
                    <h4 className="text-sm font-bold text-white">{estudo.titulo}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{estudo.resumo}</p>
                    <button
                      onClick={() => onSelectEstudo(estudo)}
                      className="text-xs text-[#D4AF37] font-semibold hover:underline flex items-center gap-1 pt-1"
                    >
                      <span>Continuar lendo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DEVOCIONAIS SALVOS */}
          {activeTab === 'devocionais' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">Devocionais Salvos</h2>
                <p className="text-xs text-slate-400">Meditações diárias que tocaram seu coração.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {MOCK_DEVOCIONAIS.slice(0, 2).map((dev) => (
                  <div key={dev.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-[#E5C05B]">{dev.referenciaBiblica}</span>
                    <h4 className="text-sm font-bold text-white">{dev.titulo}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{dev.resumo}</p>
                    <button
                      onClick={() => onSelectDevocional(dev)}
                      className="text-xs text-[#D4AF37] font-semibold hover:underline flex items-center gap-1 pt-1"
                    >
                      <span>Ler devocional</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BIBLIOTECA PREMIUM NO PERFIL */}
          {activeTab === 'premium' && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0F1C38] to-[#0A1224] border border-[#D4AF37]/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E5C05B] uppercase tracking-wider">
                  <Crown className="w-4 h-4" />
                  <span>Status da Assinatura</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">Biblioteca Premium Ativa (Demonstração)</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-lg">
                  Você tem acesso a todos os esboços teológicos, downloads em PDF e devocionais exclusivos do ecossistema BH DIGITAL.
                </p>
                <button
                  onClick={() => onNavigate('/premium')}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C05B] text-slate-950 font-bold text-xs"
                >
                  Acessar Painel da Biblioteca Premium →
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: CONFIGURAÇÕES */}
          {activeTab === 'configuracoes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Preferências e Notificações</h2>
                <p className="text-xs text-slate-400">Configure como deseja receber avisos e ler conteúdos.</p>
              </div>

              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">Devocional do Dia por E-mail</div>
                    <div className="text-[11px] text-slate-400">Receba a meditação diária às 06:00</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifDaily}
                    onChange={(e) => setNotifDaily(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white">Novos Estudos & Livros</div>
                    <div className="text-[11px] text-slate-400">Avisos de novos lançamentos na plataforma</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifEmail}
                    onChange={(e) => setNotifEmail(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="text-white font-semibold">Sincronização com o App BÍBLIA SAGRADA BH</div>
                  <p>
                    Seus favoritos e anotações deste protótipo são preparados para integração direta via nuvem com seu smartphone.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
