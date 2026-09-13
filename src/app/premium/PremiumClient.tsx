'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  ChevronRight,
  ArrowRight,
  Info,
  CheckCircle2,
  X,
  Lock
} from 'lucide-react';
import { MaterialItem } from '@/types';
import { useCheckout } from '@/hooks/useCheckout';
import { MOCK_MATERIAIS } from '@/lib/mockData';

export function PremiumClient() {
  const router = useRouter();
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  const [toolSimulating, setToolSimulating] = useState<boolean>(false);
  const [toolResult, setToolResult] = useState<any | null>(null);
  const [interestRegistered, setInterestRegistered] = useState(false);
  const { handleCheckout, isCheckoutLoading } = useCheckout();

  const premiumMaterials = MOCK_MATERIAIS.filter(m => m.premium === true);

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

  // Tool 4: Gerador de Perguntas
  const [perguntasTema, setPerguntasTema] = useState('A Parábola do Filho Pródigo');
  const [perguntasPassagem, setPerguntasPassagem] = useState('Lucas 15:11-32');
  const [perguntasNivel, setPerguntasNivel] = useState('Intermediário');

  // Tool 5: Preparação de Sermão
  const [sermaoTema, setSermaoTema] = useState('A Graça que Transforma');
  const [sermaoTextoBase, setSermaoTextoBase] = useState('Efésios 2:8-10');

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
      
      {/* Top Navigation */}
      <div className="border-b border-slate-800/80 bg-[#070D18]/90 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[#E5C05B] font-semibold">Biblioteca Premium</span>
          </nav>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#E5C05B] font-bold bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              Assinatura Premium
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#0F1E3A] via-[#0A1326] to-[#060B16]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E5C05B] text-xs font-extrabold uppercase tracking-widest">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>Plano de Assinatura Exclusivo</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Biblioteca Premium BH Digital
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Recursos teológicos avançados, geradores inteligentes de esboços e sermões, apostilas pedagógicas exclusivas e materiais práticos para liderança pastoral.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C05B] to-[#C59B27] hover:brightness-110 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-2xl shadow-amber-950/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isCheckoutLoading ? 'Abrindo checkout...' : 'Assinar Premium'}
              </button>

              <Link
                href="/materiais"
                className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm transition-all"
              >
                Ver materiais gratuitos
              </Link>
            </div>

            {interestRegistered && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Interesse registrado! Entraremos em contato no lançamento do plano Premium.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

        {/* Section 1: Ferramentas Inteligentes demonstrativas */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Automação & Preparação Teológica</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Ferramentas de Estudo & Preparação
              </h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 hidden sm:inline-block">
              5 Ferramentas de Assistência
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Tool 1 */}
            <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/60 text-[#E5C05B] flex items-center justify-center font-bold">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                  Gerador de Esboço Bíblico
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Crie uma estrutura lógica e homilética completa para pregações com introdução, tópicos e aplicação prática.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveToolModal('esboco');
                  handleRunTool('esboco');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#1E3A8A] text-white text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Testar Gerador de Esboço</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 2 */}
            <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800/60 text-indigo-300 flex items-center justify-center font-bold">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                  Explicador Exegético de Passagens
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Aprofunde o contexto histórico, pano de fundo e relevância doutrinária de qualquer texto bíblico.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveToolModal('explicacao');
                  handleRunTool('explicacao');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-900 text-white text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Testar Explicador Exegético</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 3 */}
            <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800/60 text-amber-300 flex items-center justify-center font-bold">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                  Estudo de Personagens Bíblicos
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extraia biografias, virtudes, falhas humanas e lições práticas dos homens e mulheres da Fé.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveToolModal('personagem');
                  handleRunTool('personagem');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-900 text-white text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Testar Estudo Biográfico</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 4 */}
            <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-300 flex items-center justify-center font-bold">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                  Gerador de Perguntas para Grupos
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Elabore perguntas graduadas de observação, interpretação e aplicação para EBD e pequenos grupos.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveToolModal('perguntas');
                  handleRunTool('perguntas');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-900 text-white text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Testar Gerador de Perguntas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 5 */}
            <div className="p-6 rounded-2xl bg-[#080E1B] border border-slate-800 hover:border-[#D4AF37]/50 transition-all space-y-4 flex flex-col justify-between group md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-950 border border-purple-800/60 text-purple-300 flex items-center justify-center font-bold">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#E5C05B] transition-colors">
                  Preparador Completo de Sermões
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Estruture proposição principal, transições homiléticas e ilustrações contemporâneas para pregações expositivas e temáticas.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveToolModal('sermao');
                  handleRunTool('sermao');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-purple-900 text-white text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Testar Preparador de Sermões</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </section>

        {/* Section 2: Acervo de Materiais Exclusivos */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Acervo Digital Exclusivo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Materiais Incluídos na Assinatura
              </h2>
            </div>
            <Link
              href="/materiais"
              className="text-xs text-[#E5C05B] hover:underline flex items-center gap-1"
            >
              <span>Ver catálogo público</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-[#080E1B] border border-[#D4AF37]/30 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-40 overflow-hidden bg-slate-950">
                    <img
                      src={mat.imagem}
                      alt={mat.titulo}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#D4AF37] text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      PREMIUM
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold text-[#E5C05B] uppercase tracking-wider block">
                      {mat.categoria}
                    </span>
                    <h3 className="text-base font-bold text-white line-clamp-2">
                      {mat.titulo}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3">
                      {mat.descricao}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <span>{mat.tipo} • {mat.tamanho}</span>
                    <span className="text-[#E5C05B] font-bold">Incluso no plano</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Interactive Tool Results Modal */}
      {activeToolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#080E1B] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold text-white">Demonstração Interativa Premium</h3>
              </div>
              <button
                onClick={() => setActiveToolModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {toolSimulating ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="text-sm font-semibold text-slate-300">Estruturando conteúdo teológico...</div>
              </div>
            ) : toolResult ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <h4 className="text-lg font-bold text-[#E5C05B]">{toolResult.title}</h4>
                  {toolResult.sub && <div className="text-xs text-slate-400">{toolResult.sub}</div>}
                </div>

                {toolResult.sections && (
                  <div className="space-y-3 text-xs">
                    {toolResult.sections.map((sec: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                        <strong className="text-white block font-bold">{sec.label}</strong>
                        <p className="text-slate-300">{sec.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {toolResult.contexto && (
                  <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <strong className="text-[#E5C05B] block mb-1">Contexto Histórico:</strong>
                      {toolResult.contexto}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <strong className="text-[#E5C05B] block mb-1">Tema Central:</strong>
                      {toolResult.temaCentral}
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <strong className="text-[#E5C05B] block mb-1">Aplicação Prática:</strong>
                      {toolResult.aplicacao}
                    </div>
                  </div>
                )}

                {toolResult.perguntas && (
                  <div className="space-y-2 text-xs text-slate-300">
                    {toolResult.perguntas.map((p: string, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        {p}
                      </div>
                    ))}
                  </div>
                )}

                {toolResult.passos && (
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-bold text-[#E5C05B]">
                      Proposição: {toolResult.proposicao}
                    </div>
                    {toolResult.passos.map((passo: string, idx: number) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        {passo}
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-3 rounded-xl bg-blue-950/50 border border-blue-800/40 text-[11px] text-slate-400">
                  * Este resultado demonstra a geração inteligente do plano Premium BH Digital.
                </div>
              </div>
            ) : null}

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveToolModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Fechar Demonstração
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
