import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  BookOpen, 
  Heart, 
  Volume2, 
  Moon, 
  Sun, 
  Bookmark, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface SmartphoneMockupProps {
  className?: string;
  onOpenAppStore?: () => void;
}

export const SmartphoneMockup: React.FC<SmartphoneMockupProps> = ({ 
  className = '', 
  onOpenAppStore 
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'biblia' | 'devocional' | 'audio'>('biblia');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className={`relative mx-auto flex flex-col items-center ${className}`}>
      {/* Outer Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/15 via-[#1E40AF]/20 to-[#D4AF37]/10 rounded-[50px] blur-2xl -z-10 pointer-events-none" />

      {/* Device Frame */}
      <div className="relative w-[300px] sm:w-[320px] md:w-[340px] rounded-[44px] p-3 bg-gradient-to-b from-[#334155] via-[#1E293B] to-[#0F172A] shadow-2xl border border-slate-700/60 transition-all duration-300">
        
        {/* Antenna / Outer Ring Accents */}
        <div className="absolute top-28 -left-[2px] w-[3px] h-9 bg-slate-600 rounded-l-sm" />
        <div className="absolute top-40 -left-[2px] w-[3px] h-14 bg-slate-600 rounded-l-sm" />
        <div className="absolute top-32 -right-[2px] w-[3px] h-12 bg-slate-600 rounded-r-sm" />

        {/* Screen Bezel */}
        <div className={`relative w-full h-[580px] sm:h-[620px] rounded-[36px] overflow-hidden flex flex-col transition-colors duration-300 ${
          isDarkMode ? 'bg-[#070D18] text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}>

          {/* Dynamic Island / Camera Notch */}
          <div className="pt-2 px-6 flex justify-between items-center z-20">
            <span className="text-[11px] font-semibold tracking-tight text-slate-400">09:41</span>
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-slate-700"></span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <span>5G</span>
              <div className="w-4 h-2 border border-slate-400 rounded-xs p-0.5 flex">
                <div className="w-full h-full bg-slate-300 rounded-xs"></div>
              </div>
            </div>
          </div>

          {/* In-App Header */}
          <div className="px-4 py-3 border-b border-slate-800/40 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">App Oficial</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-[#D4AF37]/20 text-[#E5C05B] rounded font-semibold">PRO</span>
              </div>
              <h4 className="text-sm font-bold tracking-tight">BÍBLIA SAGRADA BH</h4>
            </div>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Alternar tema do app demonstrativo"
              className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-[#E5C05B]" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
            </button>
          </div>

          {/* In-App Interactive Navigation Tabs */}
          <div className="px-3 pt-2.5 pb-1 flex gap-1.5">
            <button
              onClick={() => setActiveTab('biblia')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'biblia'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3 h-3 text-[#E5C05B]" />
              Bíblia
            </button>
            <button
              onClick={() => setActiveTab('devocional')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'devocional'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#E5C05B]" />
              Devocional
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`flex-1 py-1.5 px-2 text-[11px] font-medium rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'audio'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'bg-slate-800/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Volume2 className="w-3 h-3 text-[#E5C05B]" />
              Áudio
            </button>
          </div>

          {/* Screen Body Content */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 scrollbar-none text-xs">
            
            {activeTab === 'biblia' && (
              <div className="space-y-3 animate-fadeIn">
                {/* Book & Chapter selector */}
                <div className="flex items-center justify-between bg-slate-800/30 p-2 rounded-xl border border-slate-700/40">
                  <span className="font-semibold text-slate-200 text-xs">Salmos • Capítulo 23</span>
                  <span className="text-[10px] text-[#E5C05B] font-mono bg-[#E5C05B]/10 px-2 py-0.5 rounded">NVI</span>
                </div>

                {/* Verses Preview */}
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-slate-200 leading-relaxed shadow-inner">
                  <p className="flex items-start gap-1.5">
                    <span className="text-[10px] font-bold text-[#E5C05B] mt-0.5">1</span>
                    <span>O Senhor é o meu pastor; nada me faltará.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[10px] font-bold text-[#E5C05B] mt-0.5">2</span>
                    <span>Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="text-[10px] font-bold text-[#E5C05B] mt-0.5">3</span>
                    <span>Refrigera a minha alma; guia-me pelas veredas da justiça por amor do seu nome.</span>
                  </p>
                </div>

                {/* Action Bar inside card */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsSaved(!isSaved)}
                      className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                        isSaved 
                          ? 'border-[#E5C05B] text-[#E5C05B] bg-[#E5C05B]/10' 
                          : 'border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className="w-3 h-3" />
                      {isSaved ? 'Salvo' : 'Favoritar'}
                    </button>
                    <button 
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border border-slate-700 text-slate-300 hover:text-white"
                    >
                      {isPlayingAudio ? <Pause className="w-3 h-3 text-[#E5C05B]" /> : <Play className="w-3 h-3 text-[#E5C05B]" />}
                      {isPlayingAudio ? 'Pausar' : 'Ouvir'}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-500">6 versículos</span>
                </div>

                {/* Daily Reading Plan Pill */}
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-[11px] font-semibold text-white">Plano Anual: Dia 66</div>
                      <div className="text-[9px] text-slate-400">Meta concluída: 100%</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#E5C05B] font-medium">Continuar</span>
                </div>
              </div>
            )}

            {activeTab === 'devocional' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-[#E5C05B]">
                    <span>DEVOCIONAL DO DIA</span>
                    <span>Hoje</span>
                  </div>
                  <h5 className="font-bold text-slate-100 text-xs leading-snug">
                    Paz em Meio à Tempestade
                  </h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações..."
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <span className="text-[10px] text-slate-400">Filipenses 4:6-7</span>
                    <span className="text-[10px] text-[#E5C05B] font-semibold">Leitura completa →</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-[11px] text-slate-300">Lembrete ativado: 07:00</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Ativo</span>
                </div>
              </div>
            )}

            {activeTab === 'audio' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/60 text-center space-y-2.5">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#E5C05B]">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs">Áudio Narrado HD</h5>
                    <p className="text-[10px] text-slate-400">Salmos 23 • Voz Clara & Edificante</p>
                  </div>

                  {/* Audio waveform mockup */}
                  <div className="flex items-center justify-center gap-0.5 h-6">
                    {[12, 20, 16, 24, 18, 10, 22, 14, 26, 18, 12, 20].map((h, i) => (
                      <div 
                        key={i} 
                        className={`w-1 rounded-full bg-[#E5C05B] transition-all duration-300 ${
                          isPlayingAudio ? 'animate-pulse' : 'opacity-40'
                        }`}
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-full py-1.5 px-3 bg-[#D4AF37] hover:bg-[#c59b27] text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {isPlayingAudio ? 'Pausar Áudio' : 'Ouvir Agora'}
                  </button>
                </div>
              </div>
            )}

            {/* Bottom mini Google Play CTA */}
            <div className="pt-2">
              <a 
                href="https://play.google.com/store/apps/details?id=br.com.bibliasagradabh.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (onOpenAppStore) {
                    e.preventDefault();
                    onOpenAppStore();
                  }
                }}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-medium flex items-center justify-between text-[11px] shadow-sm transition-all"
              >
                <span>Baixar no Google Play</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* In-App Bottom Navigation Mockup */}
          <div className="px-5 py-2.5 border-t border-slate-800/80 bg-slate-950/90 flex justify-between items-center text-slate-400 text-[9px]">
            <div className="flex flex-col items-center gap-0.5 text-[#E5C05B]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Início</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-200">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bíblia</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devocionais</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 hover:text-slate-200">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Áudio</span>
            </div>
          </div>

          {/* Home indicator bar */}
          <div className="py-1 flex justify-center bg-slate-950">
            <div className="w-28 h-1 bg-slate-600 rounded-full" />
          </div>

        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-medium">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
        <span>Mockup Interativo: BÍBLIA SAGRADA BH (Android)</span>
      </div>
    </div>
  );
};
