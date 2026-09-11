import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DemoBanner } from './components/DemoBanner';
import { Modal } from './components/Modal';

import { HomePage } from './pages/HomePage';
import { BibliaOnlinePage } from './pages/BibliaOnlinePage';
import { EstudosPage } from './pages/EstudosPage';
import { EstudoDetailPage } from './pages/EstudoDetailPage';
import { DevocionaisPage } from './pages/DevocionaisPage';
import { LivrosPage } from './pages/LivrosPage';
import { ConteudosPage } from './pages/ConteudosPage';
import { FerramentasPage } from './pages/FerramentasPage';
import { PremiumPage } from './pages/PremiumPage';
import { LicoesPage } from './pages/LicoesPage';
import { MateriaisPage } from './pages/MateriaisPage';
import { AuthPage } from './pages/AuthPage';
import { PerfilPage } from './pages/PerfilPage';
import { AdminPage } from './pages/AdminPage';

import { PageRoute, EstudoItem, DevocionalItem, EstudoCategoria } from './types';
import { CATEGORIAS_ESTUDOS } from './data/mockData';
import { Smartphone, ExternalLink, Check, Download } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('/');
  const [selectedEstudo, setSelectedEstudo] = useState<EstudoItem | null>(null);
  const [selectedDevocional, setSelectedDevocional] = useState<DevocionalItem | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState<boolean>(false);

  // Scroll to top upon page navigation
  const navigateTo = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEstudo = (estudo: EstudoItem) => {
    setSelectedEstudo(estudo);
    navigateTo('/estudos');
  };

  const handleSelectDevocional = (dev: DevocionalItem | null) => {
    setSelectedDevocional(dev);
    navigateTo('/devocionais');
  };

  // Helper to resolve which page component to render
  const renderCurrentPage = () => {
    // 1. If study detail is currently active and route is within /estudos
    if (selectedEstudo && (currentRoute === '/estudos' || currentRoute.startsWith('/estudos/'))) {
      return (
        <EstudoDetailPage 
          estudo={selectedEstudo} 
          onNavigate={(route) => {
            setSelectedEstudo(null);
            navigateTo(route);
          }} 
        />
      );
    }

    // 2. Studies category subroutes or main /estudos
    if (currentRoute === '/estudos' || currentRoute.startsWith('/estudos/')) {
      const categoryMatch = CATEGORIAS_ESTUDOS.find(c => currentRoute === `/estudos/${c.slug}`);
      const initialCat: EstudoCategoria | 'Todas' = categoryMatch ? categoryMatch.id : 'Todas';

      return (
        <EstudosPage
          currentRoute={currentRoute}
          onNavigate={navigateTo}
          onSelectEstudo={handleSelectEstudo}
          initialCategory={initialCat}
        />
      );
    }

    // 3. Bible Online
    if (currentRoute === '/biblia') {
      return (
        <BibliaOnlinePage
          onNavigate={navigateTo}
          onOpenAppModal={() => setIsAppModalOpen(true)}
        />
      );
    }

    // 4. Devocionais
    if (currentRoute === '/devocionais') {
      return (
        <DevocionaisPage
          onNavigate={navigateTo}
          selectedDevocional={selectedDevocional}
          onSelectDevocional={handleSelectDevocional}
        />
      );
    }

    // 5. Livros
    if (currentRoute === '/livros') {
      return <LivrosPage onNavigate={navigateTo} />;
    }

    // 6. Conteúdos
    if (currentRoute === '/conteudos') {
      return <ConteudosPage onNavigate={navigateTo} />;
    }

    // 7. Ferramentas
    if (currentRoute === '/ferramentas') {
      return <FerramentasPage onNavigate={navigateTo} />;
    }

    // 8. Biblioteca Premium
    if (currentRoute === '/premium') {
      return <PremiumPage onNavigate={navigateTo} />;
    }

    // 9. Lições Bíblicas
    if (currentRoute === '/licoes') {
      return <LicoesPage onNavigate={navigateTo} />;
    }

    // 10. Materiais
    if (currentRoute === '/materiais') {
      return <MateriaisPage onNavigate={navigateTo} />;
    }

    // 9. Login / Cadastro
    if (currentRoute === '/login' || currentRoute === '/cadastro') {
      return (
        <AuthPage
          initialMode={currentRoute === '/cadastro' ? 'cadastro' : 'login'}
          onNavigate={navigateTo}
          onLoginSuccess={() => setIsLoggedIn(true)}
        />
      );
    }

    // 10. Perfil
    if (currentRoute === '/perfil') {
      return (
        <PerfilPage
          onNavigate={navigateTo}
          onLogout={() => {
            setIsLoggedIn(false);
            navigateTo('/');
          }}
          onSelectEstudo={handleSelectEstudo}
          onSelectDevocional={handleSelectDevocional}
        />
      );
    }

    // 11. Admin Panel
    if (currentRoute === '/admin') {
      return <AdminPage onNavigate={navigateTo} />;
    }

    // Default: Home Page
    return (
      <HomePage
        onNavigate={navigateTo}
        onSelectEstudo={handleSelectEstudo}
        onSelectDevocional={handleSelectDevocional}
        onOpenAppModal={() => setIsAppModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060B16] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-slate-950">
      
      {/* Top Prototype Navigation Controller Banner */}
      <DemoBanner
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
      />

      {/* Main Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        isLoggedIn={isLoggedIn}
      />

      {/* Dynamic Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* App Download Modal */}
      <Modal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        title="Baixar Aplicativo BÍBLIA SAGRADA BH"
      >
        <div className="space-y-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1E3A8A] border border-[#D4AF37]/60 flex items-center justify-center text-[#E5C05B] shadow-xl flex-shrink-0">
              <Smartphone className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Bíblia Sagrada BH para Android</h4>
              <p className="text-xs text-slate-400">Pacote oficial: br.com.bibliasagradabh.app</p>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Disponível gratuitamente no Google Play</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Tenha a Bíblia completa no seu celular com recursos de áudio narrado, estudos, devocionais diários, marcação de versículos, anotações e modo noturno.
          </p>

          <div className="space-y-2 text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Texto bíblico completo com busca rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Narração em áudio de alta qualidade</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Devocionais diários com notificações</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => setIsAppModalOpen(false)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Fechar
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#E5C05B] hover:to-[#D4AF37] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Ir para o Google Play</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Modal>

    </div>
  );
}
