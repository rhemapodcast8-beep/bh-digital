import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  BookMarked, 
  Smartphone, 
  Wrench, 
  ShieldCheck, 
  ExternalLink,
  Heart,
  ArrowUp
} from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate,
  onOpenPrivacy,
  onOpenTerms,
  onOpenContact
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040812] border-t border-slate-800/80 text-slate-300">
      
      {/* Top Banner / Mission */}
      <div className="border-b border-slate-800/50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0A1124] border border-[#D4AF37]/50 flex items-center justify-center text-[#E5C05B] font-bold text-xl shadow-lg">
              BH
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">BH DIGITAL</h3>
              <p className="text-sm text-slate-400">
                Palavra • Estudos • Livros • Ferramentas — Um ecossistema digital para edificação cristã.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all hover:border-[#D4AF37]/60"
            >
              <Smartphone className="w-4 h-4 text-[#E5C05B]" />
              <span>Bíblia Sagrada BH (Google Play)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 7 Columns Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-sm">
          
          {/* Col 1: BH DIGITAL */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase text-[#D4AF37]">
              BH DIGITAL
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma digital profissional integrando conteúdos bíblicos, literatura, aplicativos e ferramentas tecnológicas.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300">Versão do Protótipo:</div>
              <div className="font-mono text-[11px] text-[#E5C05B]">v1.0 • Antigravity Ready</div>
            </div>
          </div>

          {/* Col 2: Estudos */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Estudos</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/estudos')} className="hover:text-white transition-colors">
                  Todos os Estudos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estudos/esbocos')} className="hover:text-white transition-colors">
                  Esboços de Pregação
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estudos/estudos-biblicos')} className="hover:text-white transition-colors">
                  Estudos Bíblicos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estudos/personagens')} className="hover:text-white transition-colors">
                  Personagens
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estudos/parabolas')} className="hover:text-white transition-colors">
                  Parábolas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estudos/fe')} className="hover:text-white transition-colors">
                  Fé e Oração
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Devocionais */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Devocionais</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/devocionais')} className="hover:text-white transition-colors">
                  Devocional de Hoje
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/devocionais')} className="hover:text-white transition-colors">
                  Palavra Diária
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/devocionais')} className="hover:text-white transition-colors">
                  Série Paz Interior
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/biblia')} className="hover:text-white transition-colors">
                  Leitura Bíblica Anual
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Livros */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Livros</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/livros')} className="hover:text-white transition-colors">
                  Catálogo de Livros
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/livros')} className="hover:text-[#E5C05B] font-medium transition-colors">
                  Quando Deus Soprar
                </button>
              </li>
              <li>
                <a href="https://www.amazon.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  Amazon Brasil <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://loja.uiclap.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  UICLAP Loja <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Aplicativos */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Aplicativos</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a 
                  href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#E5C05B] font-semibold flex items-center gap-1"
                >
                  BÍBLIA SAGRADA BH
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('/biblia')} className="hover:text-white transition-colors">
                  Bíblia Online Web
                </button>
              </li>
              <li>
                <span className="text-slate-500 text-[11px]">Versão Android disponível</span>
              </li>
            </ul>
          </div>

          {/* Col 6: Ferramentas */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Ferramentas</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('/ferramentas')} className="hover:text-white transition-colors">
                  ESTUDA-FÁCIL
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/ferramentas')} className="hover:text-white transition-colors">
                  WIPE CRM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/premium')} className="hover:text-[#E5C05B] font-medium transition-colors">
                  Biblioteca Premium
                </button>
              </li>
            </ul>
          </div>

          {/* Col 7: Suporte & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase">Suporte</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenContact || (() => alert('Canal de Contato demonstrativo BH DIGITAL'))} className="hover:text-white transition-colors">
                  Contato & Dúvidas
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy || (() => alert('Política de Privacidade demonstrativa BH DIGITAL'))} className="hover:text-white transition-colors">
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms || (() => alert('Termos de Uso demonstrativos BH DIGITAL'))} className="hover:text-white transition-colors">
                  Termos de Uso
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/admin')} className="text-slate-500 hover:text-slate-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Painel Admin</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Social Media Channels Row */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Redes Sociais:</span>
            
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-red-950/40 hover:text-red-400 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-all"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-cyan-300 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-all"
            >
              <span>TikTok</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a 
              href="https://kwai.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-950/40 hover:text-amber-400 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition-all"
            >
              <span>Kwai</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-xs text-slate-500 text-center sm:text-right">
            <span>© {new Date().getFullYear()} </span>
            <strong className="text-slate-300 font-semibold">BH DIGITAL</strong>
            <span>. Todos os direitos reservados. Protótipo navegável de alta fidelidade.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
