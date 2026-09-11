import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/services/tool-access';

export async function POST(request: Request) {
  try {
    const access = await checkToolAccess('gerador_esboco');
    if (!access.allowed) {
      return NextResponse.json({ error: 'Acesso negado ou limite atingido.' }, { status: 403 });
    }

    const { tema, texto, objetivo, publico, tipo } = await request.json();

    if (!tema) {
      return NextResponse.json({ error: 'O tema é obrigatório.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave da API Gemini não configurada.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `Você é um teólogo e pregador experiente. Crie um esboço de sermão estruturado.
Tema da pregação: "${tema}"
Texto bíblico principal: ${texto || 'Não especificado'}
Objetivo da mensagem: ${objetivo || 'Edificação geral'}
Público: ${publico || 'Igreja Geral'}
Tipo de mensagem: ${tipo || 'Expositiva'}

Retorne EXCLUSIVAMENTE em formato Markdown, utilizando cabeçalhos (##), listas e negrito.
Estrutura exigida:
- Título
- Texto Bíblico
- Tema Central
- Objetivo
- Introdução
- Proposição
- Tópico 1 (com Explicação, Referências Bíblicas e Aplicação)
- Tópico 2 (com Explicação, Referências Bíblicas e Aplicação)
- Tópico 3 (com Explicação, Referências Bíblicas e Aplicação)
- Conclusão
- Apelo/Reflexão
- Sugestão de Oração Final`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ resultado: text });
  } catch (error: any) {
    console.error('Erro na ferramenta gerador-esboco:', error);
    return NextResponse.json({ error: 'Falha ao conectar com o serviço de IA.' }, { status: 500 });
  }
}
