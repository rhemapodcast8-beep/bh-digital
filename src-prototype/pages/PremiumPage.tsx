import React, { useState } from 'react';
import { 
  Crown, 
  Sparkles, 
  FileText, 
  BookOpen, 
  User, 
  HelpCircle, 
  Mic, 
  Layers, 
  Download, 
  Check, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ArrowRight,
  ShieldAlert,
  Info,
  Sliders,
  Copy,
  CheckCircle2,
  X,
  Eye
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { PageRoute, MaterialItem } from '../types';
import { MOCK_MATERIAIS } from '../data/mockData';

interface PremiumPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PremiumPage: React.FC<PremiumPageProps> = ({ onNavigate }) => {
  // Tool Active State
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  const [toolSimulating, setToolSimulating] = useState<boolean>(false);
  const [toolResult, setToolResult] = useState<any | null>(null);

  // Subscription Interest Feedback
  const [interestRegistered, setInterestRegistered] = useState(false);

  // Filter for Materials in Premium Page
  const premiumMaterials = MOCK_MATERIAIS.filter(m => m.tipoAcesso === 'Premium');

  // Tool 1: Gerador de Esboço
  const [esbocoTema, setEsbocoTema] = useState('O Poder da Oração no Secreto');
  const [esbocoPublico, setEsbocoPublico] = useState('Igreja Local / Jovens e Adultos');
  const [esbocoObjetivo, setEsbocoObjetivo] = useState('Incentivar a disciplina da comunhão diária');
  const [esbocoTempo, setEsbocoTempo] = useState('35 minutos');

  // Tool 2: Explicação de Passagem
  const [passagemLivro, setPassagemLivro] = useState('Filipenses');
  const [passagemCapitulo, setPassagemCapitulo] = useState('4');
  const [passagemVersiculo, setPassagemVersiculo] = useState('6-7');

  // Tool 3: Estudo de Personagem
  const [personagemNome, setPersonagemNome] = useState('Neemias');
  const [personagemLivro, setPersonagemLivro] = useState('Neemias');
  const [personagemObjetivo, setPersonagemObjetivo] = useState('Lições de liderança, oração e perseverança');

  // Tool 4: Gerador de Perguntas
  const [perguntasTema, setPerguntasTema] = useState('A Parábola do Filho Pródigo');
  const [perguntasPassagem, setPerguntasPassagem] = useState('Lucas 15:11-32');
  const [perguntasQuantidade, setPerguntasQuantidade] = useState('5');
  const [perguntasNivel, setPerguntasNivel] = useState('Intermediário');

  // Tool 5: Preparação de Sermão
  const [sermaoTema, setSermaoTema] = useState('A Graça que Transforma');
  const [sermaoTextoBase, setSermaoTextoBase] = useState('Efésios 2:8-10');
  const [sermaoPublico, setSermaoPublico] = useState('Público Geral');
  const [sermaoTempo, setSermaoTempo] = useState('40 minutos');

  // Handlers for Tool Simulators
  const handleRunTool = (toolId: string) => {
    setToolSimulating(true);
    setToolResult(null);

    setTimeout(() => {
      setToolSimulating(false);

      if (toolId === 'esboco') {
        setToolResult({
          type: 'esboco',
          title: `Esboço Homilético: ${esbocoTema}`,
          sub: `Público: ${esbocoPublico} • Tempo Estimado: ${esbocoTempo}`,
          sections: [
            { label: 'I. Introdução & Gancho de Atenção', desc: 'Apresentação do contexto de Mateus 6 e o contraste com as práticas religiosas externas da época.' },
            { label: 'II. O Fechar da Porta', desc: 'O significado prático de retirar as distrações e dedicar atenção plena à presença invisível do Pai.' },
            { label: 'III. A Recompensa Divina', desc: 'A recompensa no secreto não é material, mas a transformação interior do caráter pelo Espírito.' },
            { label: 'IV. Aplicação Pessoal & Apelo', desc: 'Desafio aos ouvintes a estabelecerem um horário inegociável de oração nesta semana.' }
          ]
        });
      } else if (toolId === 'explicacao') {
        setToolResult({
          type: 'explicacao',
          title: `Apoio Exegético: ${passagemLivro} ${passagemCapitulo}:${passagemVersiculo}`,
          contexto: 'Escrita pelo apóstolo Paulo durante sua prisão em Roma, com o objetivo de confortar e exortar os crentes de Filipos à alegria santa.',
          temaCentral: 'A paz transcendental de Deus guardando o coração e mente mediante a entrega confiante em oração com ações de graças.',
          aplicacao: 'Trocar o ciclo mental de preocupação crônica por uma postura ativa de dependência através de súplica diária.'
        });
      } else if (toolId === 'personagem') {
        setToolResult({
          type: 'personagem',
          title: `Estudo Biográfico: ${personagemNome}`,
          livro: personagemLivro,
          virtudes: ['Dependência em oração antes de qualquer ação governamental', 'Integridade e rejeição a privilégios indevidos', 'Capacidade de mobilização e restauração comunitária'],
          advertencias: 'A oposição externa e interna requer discernimento espiritual constante para não descer aos vales do engano.'
        });
      } else if (toolId === 'perguntas') {
        setToolResult({
          type: 'perguntas',
          title: `Perguntas para Pequenos Grupos (${perguntasNivel})`,
          passagem: perguntasPassagem,
          perguntas: [
            '1. [Observação] Qual atitude do filho mais novo desencadeia a narrativa e o que isso significava na cultura do Antigo Oriente?',
            '2. [Interpretação] Qual o significado do abraço, da melhor túnica e do anel entregues pelo pai ao jovem que retornava?',
            '3. [Interpretação] Em que aspectos o filho mais velho também estava distante do coração do pai, mesmo vivendo dentro de casa?',
            '4. [Aplicação] Com qual dos dois irmãos você mais se identifica nos seus momentos de fraqueza e por quê?',
            '5. [Aplicação] Como nossa comunidade de fé pode ser um reflexo acolhedor da festa do perdão celebrada nessa parábola?'
          ]
        });
      } else if (toolId === 'sermao') {
        setToolResult({
          type: 'sermao',
          title: `Estrutura de Sermão: ${sermaoTema}`,
          texto: sermaoTextoBase,
          proposicao: 'A salvação bíblica é uma obra soberana e graciosa de Deus, que nos capacita para boas obras preparadas de antemão.',
          passos: [
            '1. O Estado Anterior: Mortos espiritualmente e sem recursos próprios (Ef 2:1-3)',
            '2. O Ponto de Inflexão Divino: "Mas Deus, sendo rico em misericórdia..." (Ef 2:4)',
            '3. A Causa Exclusiva: Salvos pela graça, mediante a fé, como dom de Deus (Ef 2:8-9)',
            '4. A Finalidade Prática: Feitura d’Ele criados para boas obras (Ef 2:10)'
          ]
        });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#060B16] text-slate-100 pb-28">
      
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-800/80 bg-[#070D18]/90 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Breadcrumb
            items={[{ label: 'Biblioteca Premium' }]}
            onNavigate={onNavigate}
          />

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#E5C05B] font-semibold bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Área de Monetização Futura
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#0F1D38] via-[#091124] to-[#060B16]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-bold uppercase tracking-wider mb-5">
            <Crown className="w-3.5 h-3.5" />
            <span>ECOSSISTEMA EXCLUSIVO</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            BIBLIOTECA PREMIUM
          </h1>

          <p className="text-lg sm:text-2xl text-[#E5C05B] font-semibold max-w-3xl mx-auto mb-4">
            Ferramentas e conteúdos para ajudar você a estudar, ensinar e preparar mensagens.
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Um ecossistema digital inteligente criado para pregadores, professores de escola bíblica, líderes de ministério e estudantes dedicados das Escrituras Sagradas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#plano-premium"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/30 transition-all hover:scale-[1.02]"
            >
              CONHECER PLANO PREMIUM
            </a>
            <a
              href="#ferramentas-premium"
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              TESTAR FERRAMENTAS DEMO
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">

        {/* SECTION 1: AS 6 FERRAMENTAS DA BIBLIOTECA PREMIUM */}
        <section id="ferramentas-premium" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E5C05B] uppercase tracking-widest">
              <Sliders className="w-3.5 h-3.5" />
              <span>FERRAMENTAS EM PROTÓTIPO DEMONSTRATIVO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Recursos de Apoio ao Ensino e Ministério
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Experimente os fluxos demonstrativos abaixo. Cada ferramenta foi desenhada para otimizar o tempo de preparação sem comprometer a reverência e o estudo bíblico sério.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Tool 1: Gerador de Esboço para Pregação */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-400 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:text-[#E5C05B] group-hover:border-[#D4AF37]/40 transition-all">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                    1. Gerador de Esboço para Pregação
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Crie uma estrutura organizada para preparação de mensagens e estudos.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div><strong>Fluxo demonstrativo:</strong></div>
                  <div className="text-slate-400">Tema • Público • Objetivo • Tempo aproximado</div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800/80 mt-6">
                <button
                  onClick={() => {
                    setActiveToolModal('esboco');
                    handleRunTool('esboco');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E5C05B] border border-[#D4AF37]/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>GERAR ESBOÇO</span>
                </button>
              </div>
            </div>

            {/* Tool 2: Explicação de Passagem Bíblica */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:text-[#E5C05B] group-hover:border-[#D4AF37]/40 transition-all">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                    2. Explicação de Passagem Bíblica
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Uma ferramenta de apoio para compreender melhor uma passagem bíblica, observando contexto, tema e aplicação.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-[11px] text-amber-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Ferramenta de apoio. Não substitui o discernimento espiritual nem autoridade teológica.</span>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800/80 mt-6">
                <button
                  onClick={() => {
                    setActiveToolModal('explicacao');
                    handleRunTool('explicacao');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E5C05B] border border-[#D4AF37]/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EXPLICAR PASSAGEM</span>
                </button>
              </div>
            </div>

            {/* Tool 3: Estudo de Personagem Bíblico */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:text-[#E5C05B] group-hover:border-[#D4AF37]/40 transition-all">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                    3. Estudo de Personagem Bíblico
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Biografias e lições práticas extraídas da vida dos servos e servos de Deus através dos tempos.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div><strong>Campos de entrada:</strong></div>
                  <div className="text-slate-400">Nome do personagem • Livro bíblico • Objetivo do estudo</div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800/80 mt-6">
                <button
                  onClick={() => {
                    setActiveToolModal('personagem');
                    handleRunTool('personagem');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E5C05B] border border-[#D4AF37]/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CRIAR ESTUDO</span>
                </button>
              </div>
            </div>

            {/* Tool 4: Gerador de Perguntas para Estudo */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:text-[#E5C05B] group-hover:border-[#D4AF37]/40 transition-all">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                    4. Gerador de Perguntas para Estudo
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Perguntas didáticas divididas por níveis para pequenos grupos, células e classes dominicais.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div><strong>Seleção dinâmica:</strong></div>
                  <div className="text-slate-400">Tema • Passagem • Quantidade de perguntas • Nível</div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800/80 mt-6">
                <button
                  onClick={() => {
                    setActiveToolModal('perguntas');
                    handleRunTool('perguntas');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E5C05B] border border-[#D4AF37]/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>GERAR PERGUNTAS</span>
                </button>
              </div>
            </div>

            {/* Tool 5: Auxílio para Preparação de Sermão */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 flex items-center justify-center group-hover:bg-[#D4AF37]/20 group-hover:text-[#E5C05B] group-hover:border-[#D4AF37]/40 transition-all">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                    5. Auxílio para Preparação de Sermão
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Ferramenta demonstrativa para estruturar proposição, ilustrações e transições lógicas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div><strong>Parâmetros:</strong></div>
                  <div className="text-slate-400">Tema • Texto-base • Público • Tempo pretendido</div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800/80 mt-6">
                <button
                  onClick={() => {
                    setActiveToolModal('sermao');
                    handleRunTool('sermao');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#E5C05B] border border-[#D4AF37]/40 flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PREPARAR ESTRUTURA</span>
                </button>
              </div>
            </div>

            {/* Tool 6: Biblioteca de Materiais */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C05B] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-[#D4AF37] text-slate-950">
                      Acervo Exclusivo
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                    6. Biblioteca de Materiais
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    Esboços, estudos bíblicos, devocionais, apostilas, PDFs e materiais diagramados para professores e líderes.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Esboços', 'Apostilas', 'PDFs', 'Professores', 'Líderes'].map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-slate-800/80 mt-6">
                <button
                  onClick={() => onNavigate('/materiais')}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] hover:brightness-110 text-slate-950 flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>ACESSAR CATÁLOGO DE MATERIAIS</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: MODELO DE ASSINATURA — PLANO PREMIUM */}
        <section id="plano-premium" className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#0F1E3D] via-[#0A1326] to-[#040812] border-2 border-[#D4AF37]/60 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5" />
                <span>ÁREA EXCLUSIVA PARA ASSINANTES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                PLANO PREMIUM
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                Tudo o que você precisa para aprofundar seu ministério e acelerar sua preparação de estudos e sermões.
              </p>
            </div>

            {/* Benefit Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 text-[#E5C05B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 font-bold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Acesso às ferramentas</h4>
                  <p className="text-xs text-slate-400">Esboços, perguntas, estudos de personagens e exegese pastoral.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 text-[#E5C05B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 font-bold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Acesso aos materiais exclusivos</h4>
                  <p className="text-xs text-slate-400">Apostilas completas, PDFs formatados e roteiros para professores.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 text-[#E5C05B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 font-bold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Novos conteúdos</h4>
                  <p className="text-xs text-slate-400">Atualizações editoriais periódicas com novas séries de estudos.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 text-[#E5C05B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 font-bold" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Biblioteca organizada</h4>
                  <p className="text-xs text-slate-400">Pesquisa avançada, categorização temática e favoritos sincronizados.</p>
                </div>
              </div>
            </div>

            {/* Conversion CTA & Mandatory Observation */}
            <div className="text-center space-y-4 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => setInterestRegistered(true)}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:brightness-110 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-2xl shadow-amber-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                QUERO SER PREMIUM
              </button>

              <p className="text-xs sm:text-sm text-[#E5C05B] font-medium tracking-wide">
                "Assinatura e valores serão disponibilizados em breve."
              </p>

              {interestRegistered && (
                <div className="max-w-md mx-auto p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs text-center animate-in fade-in">
                  <span className="font-bold block mb-1">✓ Demonstração Registrada com Sucesso!</span>
                  <span>Obrigado pelo interesse no Plano Premium. Você será notificado em primeira mão assim que a área oficial de assinaturas for lançada.</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: VITRINE DE MATERIAIS PREMIUM EM DESTAQUE */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5C05B] uppercase tracking-wider mb-1">
                <Crown className="w-3.5 h-3.5" />
                <span>Acervo em Preparação</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Materiais Exclusivos para Membros
              </h3>
            </div>

            <button
              onClick={() => onNavigate('/materiais')}
              className="inline-flex items-center gap-1.5 text-xs text-[#E5C05B] hover:text-white font-semibold transition-colors self-start sm:self-auto"
            >
              <span>Ver todos os materiais</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between p-4 space-y-3"
              >
                <div className="space-y-3">
                  <div className="relative h-36 rounded-xl overflow-hidden bg-slate-950">
                    <img
                      src={mat.imagem}
                      alt={mat.titulo}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D4AF37] text-slate-950">
                        PREMIUM
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#E5C05B] font-semibold block mb-1">
                      {mat.categoria} • {mat.formato}
                    </span>
                    <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {mat.titulo}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('/materiais')}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-[#E5C05B]" />
                  <span>Visualizar no Acervo</span>
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* MODAL INTERATIVO PARA FERRAMENTAS DEMONSTRATIVAS */}
      {activeToolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-[#D4AF37]/50 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative custom-scrollbar">
            
            <button
              onClick={() => {
                setActiveToolModal(null);
                setToolResult(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E5C05B] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Protótipo Demonstrativo da Ferramenta</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {activeToolModal === 'esboco' && 'Gerador de Esboço para Pregação'}
                {activeToolModal === 'explicacao' && 'Explicação de Passagem Bíblica'}
                {activeToolModal === 'personagem' && 'Estudo de Personagem Bíblico'}
                {activeToolModal === 'perguntas' && 'Gerador de Perguntas para Estudo'}
                {activeToolModal === 'sermao' && 'Auxílio para Preparação de Sermão'}
              </h3>
            </div>

            {/* Inputs based on active tool */}
            {activeToolModal === 'esboco' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tema da Mensagem</label>
                    <input
                      type="text"
                      value={esbocoTema}
                      onChange={(e) => setEsbocoTema(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Público</label>
                    <input
                      type="text"
                      value={esbocoPublico}
                      onChange={(e) => setEsbocoPublico(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Objetivo da Pregação</label>
                    <input
                      type="text"
                      value={esbocoObjetivo}
                      onChange={(e) => setEsbocoObjetivo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tempo Aproximado</label>
                    <input
                      type="text"
                      value={esbocoTempo}
                      onChange={(e) => setEsbocoTempo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleRunTool('esboco')}
                  disabled={toolSimulating}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  {toolSimulating ? 'Estruturando esboço demonstrativo...' : 'GERAR ESBOÇO'}
                </button>
              </div>
            )}

            {activeToolModal === 'explicacao' && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
                  <strong className="block text-white mb-0.5">Aviso Teológico de Respeito</strong>
                  Esta ferramenta é um suporte exegético e devocional para consulta histórica e reflexiva. Não tem pretensão de estabelecer interpretações dogmáticas infalíveis.
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Livro</label>
                    <input
                      type="text"
                      value={passagemLivro}
                      onChange={(e) => setPassagemLivro(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Capítulo</label>
                    <input
                      type="text"
                      value={passagemCapitulo}
                      onChange={(e) => setPassagemCapitulo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Versículo(s)</label>
                    <input
                      type="text"
                      value={passagemVersiculo}
                      onChange={(e) => setPassagemVersiculo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleRunTool('explicacao')}
                  disabled={toolSimulating}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  {toolSimulating ? 'Consultando contexto demonstrativo...' : 'EXPLICAR PASSAGEM'}
                </button>
              </div>
            )}

            {activeToolModal === 'personagem' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Nome do Personagem</label>
                    <input
                      type="text"
                      value={personagemNome}
                      onChange={(e) => setPersonagemNome(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Livro Bíblico</label>
                    <input
                      type="text"
                      value={personagemLivro}
                      onChange={(e) => setPersonagemLivro(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Objetivo do Estudo</label>
                    <input
                      type="text"
                      value={personagemObjetivo}
                      onChange={(e) => setPersonagemObjetivo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleRunTool('personagem')}
                  disabled={toolSimulating}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  {toolSimulating ? 'Compilando lições do personagem...' : 'CRIAR ESTUDO'}
                </button>
              </div>
            )}

            {activeToolModal === 'perguntas' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tema</label>
                    <input
                      type="text"
                      value={perguntasTema}
                      onChange={(e) => setPerguntasTema(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Passagem Bíblica</label>
                    <input
                      type="text"
                      value={perguntasPassagem}
                      onChange={(e) => setPerguntasPassagem(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Quantidade de Perguntas</label>
                    <select
                      value={perguntasQuantidade}
                      onChange={(e) => setPerguntasQuantidade(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    >
                      <option value="3">3 Perguntas</option>
                      <option value="5">5 Perguntas</option>
                      <option value="8">8 Perguntas</option>
                      <option value="10">10 Perguntas</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Nível de Profundidade</label>
                    <select
                      value={perguntasNivel}
                      onChange={(e) => setPerguntasNivel(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    >
                      <option value="Iniciante">Iniciante (Discipulado Inicial)</option>
                      <option value="Intermediário">Intermediário (Pequenos Grupos)</option>
                      <option value="Avançado">Avançado (Teológico / Liderança)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => handleRunTool('perguntas')}
                  disabled={toolSimulating}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  {toolSimulating ? 'Gerando questionário reflexivo...' : 'GERAR PERGUNTAS'}
                </button>
              </div>
            )}

            {activeToolModal === 'sermao' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tema Principal</label>
                    <input
                      type="text"
                      value={sermaoTema}
                      onChange={(e) => setSermaoTema(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Texto-Base</label>
                    <input
                      type="text"
                      value={sermaoTextoBase}
                      onChange={(e) => setSermaoTextoBase(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Público Ouvinte</label>
                    <input
                      type="text"
                      value={sermaoPublico}
                      onChange={(e) => setSermaoPublico(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Tempo Previsto</label>
                    <input
                      type="text"
                      value={sermaoTempo}
                      onChange={(e) => setSermaoTempo(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleRunTool('sermao')}
                  disabled={toolSimulating}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C05B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  {toolSimulating ? 'Preparando proposição e divisões...' : 'PREPARAR ESTRUTURA'}
                </button>
              </div>
            )}

            {/* Results Display */}
            {toolResult && (
              <div className="p-5 rounded-xl bg-slate-950/80 border border-[#D4AF37]/40 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono text-[#E5C05B] font-bold">
                    RESULTADO GERADO (DEMONSTRAÇÃO)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Modo Protótipo
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white">
                    {toolResult.title}
                  </h4>
                  {toolResult.sub && (
                    <p className="text-xs text-slate-400">{toolResult.sub}</p>
                  )}
                  {toolResult.proposicao && (
                    <div className="p-3 rounded-lg bg-slate-900 text-xs text-slate-200 border border-slate-800">
                      <strong>Proposição:</strong> {toolResult.proposicao}
                    </div>
                  )}
                </div>

                {toolResult.sections && (
                  <div className="space-y-2">
                    {toolResult.sections.map((sec: any, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs">
                        <strong className="text-[#E5C05B] block mb-0.5">{sec.label}</strong>
                        <span className="text-slate-300">{sec.desc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {toolResult.contexto && (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-blue-400 block mb-0.5">Contexto Histórico</strong>
                      <p className="text-slate-300">{toolResult.contexto}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-[#E5C05B] block mb-0.5">Tema Central</strong>
                      <p className="text-slate-300">{toolResult.temaCentral}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-emerald-400 block mb-0.5">Aplicação Prática</strong>
                      <p className="text-slate-300">{toolResult.aplicacao}</p>
                    </div>
                  </div>
                )}

                {toolResult.perguntas && (
                  <div className="space-y-2 text-xs">
                    {toolResult.perguntas.map((p: string, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                        {p}
                      </div>
                    ))}
                  </div>
                )}

                {toolResult.passos && (
                  <div className="space-y-1.5 text-xs">
                    {toolResult.passos.map((passo: string, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                        {passo}
                      </div>
                    ))}
                  </div>
                )}

                {toolResult.virtudes && (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-emerald-400 block mb-1">Virtudes e Princípios:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-slate-300">
                        {toolResult.virtudes.map((v: string, idx: number) => (
                          <li key={idx}>{v}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-amber-400 block mb-0.5">Advertência Pastoral:</strong>
                      <p className="text-slate-300">{toolResult.advertencias}</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Na versão completa, você poderá salvar nos seus favoritos ou exportar em PDF.</span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
