import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { tema, publico, estilo } = await request.json();

    if (!tema) {
      return NextResponse.json({ error: 'O tema é obrigatório.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave da API Gemini não configurada.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Você é um pastor experiente e teólogo. Crie um esboço de sermão estruturado sobre o tema: "${tema}".
Público-alvo: ${publico || 'Geral'}.
Estilo da pregação: ${estilo || 'Expositivo'}.

O esboço deve conter:
1. Título impactante
2. Texto Bíblico Base
3. Introdução breve
4. 3 a 4 pontos principais com breve explicação
5. Conclusão e Aplicação Prática
6. Oração Final

Seja bíblico, edificante e direto. Use formatação em Markdown.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ sermao: text });
  } catch (error: any) {
    console.error('Erro na geração do sermão:', error);
    return NextResponse.json({ error: 'Erro ao gerar sermão.' }, { status: 500 });
  }
}
