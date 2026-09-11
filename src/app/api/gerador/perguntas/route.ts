import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/services/tool-access';

export async function POST(request: Request) {
  try {
    const access = await checkToolAccess('perguntas');
    if (!access.allowed) {
      return NextResponse.json({ error: 'Acesso negado ou limite atingido.' }, { status: 403 });
    }

    const { tema, texto, quantidade, nivel, tipo } = await request.json();

    if (!tema && !texto) {
      return NextResponse.json({ error: 'Informe o tema ou o texto bíblico.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chave da API Gemini não configurada.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `Você é um desenvolvedor de material didático cristão. Crie perguntas para discussão em grupo baseadas no seguinte:
Tema: "${tema || 'Não especificado'}"
Texto bíblico: "${texto || 'Não especificado'}"
Quantidade de perguntas desejadas (aproximado): ${quantidade || '5'}
Nível das perguntas: ${nivel || 'Intermediário'}
Tipo de grupo: ${tipo || 'Pequeno Grupo'}

Retorne EXCLUSIVAMENTE em formato Markdown.
Estrutura exigida (distribua a quantidade solicitada nestas categorias):
- Perguntas de Observação (O que o texto diz?)
- Perguntas de Interpretação (O que o texto significa?)
- Perguntas de Aplicação (Como vivemos isso?)
- Perguntas para Discussão (Debate em grupo)
- Perguntas de Reflexão (Introspecção)
- Gabarito / Orientação para o Líder
- Referências Bíblicas Adicionais`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ resultado: text });
  } catch (error: any) {
    console.error('Erro na ferramenta perguntas:', error);
    return NextResponse.json({ error: 'Falha ao conectar com o serviço de IA.' }, { status: 500 });
  }
}
