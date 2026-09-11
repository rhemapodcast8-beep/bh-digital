import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/services/tool-access';

export async function POST(request: Request) {
  try {
    const access = await checkToolAccess('personagens');
    if (!access.allowed) {
      return NextResponse.json({ error: 'Acesso negado ou limite atingido.' }, { status: 403 });
    }

    const { nome, passagem } = await request.json();

    if (!nome) {
      return NextResponse.json({ error: 'O nome do personagem é obrigatório.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave da API Gemini não configurada.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `Você é um historiador e teólogo bíblico. Faça um estudo detalhado e biográfico sobre o seguinte personagem bíblico.
Personagem: "${nome}"
${passagem ? `Com ênfase na passagem: "${passagem}"` : ''}

Retorne EXCLUSIVAMENTE em formato Markdown.
Estrutura exigida:
- Nome
- Contexto
- Origem
- Família / Contexto
- Chamado
- Principais Acontecimentos
- Virtudes
- Falhas
- Decisões Importantes
- Relacionamentos
- Lições Espirituais
- Lições Práticas
- Principais Referências Bíblicas
- Resumo Final
- Perguntas para Reflexão`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ resultado: text });
  } catch (error: any) {
    console.error('Erro na ferramenta personagens:', error);
    return NextResponse.json({ error: 'Falha ao conectar com o serviço de IA.' }, { status: 500 });
  }
}
