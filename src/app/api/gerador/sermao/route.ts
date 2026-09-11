import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/services/tool-access';

export async function POST(request: Request) {
  try {
    const access = await checkToolAccess('sermao');
    if (!access.allowed) {
      return NextResponse.json({ error: 'Acesso negado ou limite atingido.' }, { status: 403 });
    }

    const { tema, texto, tipo, publico, duracao } = await request.json();

    if (!tema || !texto) {
      return NextResponse.json({ error: 'O tema e o texto bíblico são obrigatórios.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave da API Gemini não configurada.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `Você é um pastor e homileta experiente. Desenvolva um sermão completo e detalhado.
Tema: "${tema}"
Texto Bíblico: "${texto}"
Tipo de Sermão: ${tipo || 'Expositivo'}
Público-alvo: ${publico || 'Igreja Geral'}
Duração Estimada: ${duracao || '30 minutos'}

Retorne EXCLUSIVAMENTE em formato Markdown.
Estrutura exigida rigorosamente:
- Título
- Texto Principal
- Tema
- Proposição
- Objetivo
- Introdução
- Contexto Bíblico
- Tópico 1
  - Subpontos
  - Explicação
  - Aplicação
- Tópico 2
  - Subpontos
  - Explicação
  - Aplicação
- Tópico 3
  - Subpontos
  - Explicação
  - Aplicação
- Transições
- Ilustração Sugerida
- Aplicação Geral
- Conclusão
- Apelo/Reflexão
- Oração Sugerida`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ resultado: text });
  } catch (error: any) {
    console.error('Erro na ferramenta sermao:', error);
    return NextResponse.json({ error: 'Falha ao conectar com o serviço de IA.' }, { status: 500 });
  }
}
