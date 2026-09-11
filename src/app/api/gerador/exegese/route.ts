import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/services/tool-access';

export async function POST(request: Request) {
  try {
    const access = await checkToolAccess('exegese');
    if (!access.allowed) {
      return NextResponse.json({ error: 'Acesso negado ou limite atingido.' }, { status: 403 });
    }

    const { referencia, duvida } = await request.json();

    if (!referencia) {
      return NextResponse.json({ error: 'A referência bíblica é obrigatória.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave da API Gemini não configurada.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `Você é um teólogo e exegeta experiente. Faça uma exegese profunda e clara da seguinte passagem.
Passagem: "${referencia}"
${duvida ? `Dúvida específica ou aspecto a aprofundar: "${duvida}"` : ''}

IMPORTANTE: Não invente citações. Seja historicamente e teologicamente preciso. Se houver diferentes linhas de interpretação, apresente-as.

Retorne EXCLUSIVAMENTE em formato Markdown.
Estrutura exigida:
- Texto Analisado (O trecho principal da passagem)
- Contexto Histórico
- Contexto Literário
- Contexto Cultural
- Palavras e Conceitos Importantes (grego/hebraico se pertinente)
- Estrutura da Passagem
- Tema Central
- Implicações Teológicas
- Aplicação
- Referências Relacionadas
- Observações Interpretativas`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ resultado: text });
  } catch (error: any) {
    console.error('Erro na ferramenta exegese:', error);
    return NextResponse.json({ error: 'Falha ao conectar com o serviço de IA.' }, { status: 500 });
  }
}
