'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Bell,
  Smartphone
} from 'lucide-react';
import { MOCK_ESTUDOS, MOCK_DEVOCIONAIS } from '@/lib/mockData';
import { useI18n } from '@/lib/i18n/I18nContext';

type TabType = 'perfil' | 'favoritos' | 'estudos' | 'devocionais' | 'premium' | 'configuracoes';

export function PerfilClient() {
  const router = useRouter();
  const { t, localizePath } = useI18n();

  const [activeTab, setActiveTab] = useState<TabType>('perfil');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [nome, setNome] = useState('Pastor / Estudante Demonstrativo');
  const [email, setEmail] = useState('leitor@bhdigital.com.br');
  const [bio, setBio] = useState('Estudante e leitor assíduo da Palavra no ecossistema BH DIGITAL.');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifDaily, setNotifDaily] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleCustomerPortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/customer-portal', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Erro ao acessar o portal.');
      }
    } catch (e) {
      alert('Erro interno.');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    router.push(localizePath('/auth/login'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href={localizePath('/')} className="hover:text-white transition-colors">{t.nav.inicio}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#E5C05B] font-semibold">{t.perfil.breadcrumb}</span>
      </nav>

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
                {t.perfil.memberBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-950/60 hover:text-red-400 text-slate-400 text-xs font-semibold border border-slate-800 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t.perfil.logoutBtn}</span>
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
            <span>{t.perfil.tabProfile}</span>
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
            <span>{t.perfil.tabBookmarks}</span>
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
            <span>{t.perfil.tabStudies}</span>
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
            <span>{t.perfil.tabDevotionals}</span>
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
            <span>{t.perfil.tabPremium}</span>
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
            <span>{t.perfil.tabSettings}</span>
          </button>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9 bg-[#080E1B] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
          
          {/* Tab 1: Perfil */}
          {activeTab === 'perfil' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white">{t.perfil.tabProfile}</h3>
                <p className="text-xs text-slate-400">{t.perfil.pageDesc}</p>
              </div>

              {savedSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t.perfil.profileSavedSuccess}</span>
                </div>
              )}

              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.auth.fullName}
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.auth.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.perfil.bioLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-750 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#1E3A8A] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  {t.perfil.btnSaveProfile}
                </button>
              </div>
            </form>
          )}

          {/* Tab 2: Favoritos */}
          {activeTab === 'favoritos' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white">{t.perfil.tabBookmarks}</h3>
                <p className="text-xs text-slate-400">{t.biblia.bookmarks}</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-[#E5C05B]">João 3:16</span>
                  <p className="text-sm text-slate-200 font-serif-reading">
                    "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-[#E5C05B]">Filipenses 4:13</span>
                  <p className="text-sm text-slate-200 font-serif-reading">
                    "Tudo posso naquele que me fortalece."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-[#E5C05B]">Salmos 23:1</span>
                  <p className="text-sm text-slate-200 font-serif-reading">
                    "O Senhor é o meu pastor; nada me faltará."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Estudos Salvos */}
          {activeTab === 'estudos' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white">{t.perfil.tabStudies}</h3>
                <p className="text-xs text-slate-400">{t.estudos.pageTitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_ESTUDOS.slice(0, 2).map((e) => {
                  const catSlug = e.categoria.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  return (
                    <Link
                      key={e.id}
                      href={localizePath(`/estudos/${catSlug}/${e.slug}`)}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 space-y-2 group block"
                    >
                      <span className="text-[10px] font-bold uppercase text-[#E5C05B]">{e.categoria}</span>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#E5C05B] transition-colors">{e.titulo}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{e.resumo}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: Devocionais Salvos */}
          {activeTab === 'devocionais' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white">{t.perfil.tabDevotionals}</h3>
                <p className="text-xs text-slate-400">{t.devocionais.pageTitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_DEVOCIONAIS.slice(0, 2).map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#E5C05B]">{d.referenciaBiblica}</span>
                    <h4 className="text-sm font-bold text-white">{d.titulo}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{d.resumo}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Premium */}
          {activeTab === 'premium' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white">{t.perfil.tabPremium}</h3>
                <p className="text-xs text-slate-400">{t.premium.heroDesc}</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-900/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="w-8 h-8 text-[#D4AF37]" />
                    <div>
                      <h4 className="text-base font-bold text-white">Plano Gratuito / Visitante</h4>
                      <p className="text-xs text-slate-400">Acesso aos conteúdos abertos</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCustomerPortal}
                      disabled={portalLoading}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase disabled:opacity-50"
                    >
                      {portalLoading ? t.nav.loading : t.perfil.stripePortalBtn}
                    </button>
                    <Link
                      href={localizePath('/premium')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-slate-950 font-bold text-xs uppercase hover:brightness-110"
                    >
                      {t.nav.premium}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Configurações */}
          {activeTab === 'configuracoes' && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white">{t.perfil.tabSettings}</h3>
                <p className="text-xs text-slate-400">Notificações e ajustes de experiência.</p>
              </div>

              <div className="space-y-4 max-w-xl text-xs text-slate-300">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-[#D4AF37]" />
                    <span>Receber resumo semanal por e-mail</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifEmail}
                    onChange={(e) => setNotifEmail(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                    <span>Lembretes de leitura diária</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifDaily}
                    onChange={(e) => setNotifDaily(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
