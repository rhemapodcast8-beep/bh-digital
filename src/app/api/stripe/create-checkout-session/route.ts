import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      return NextResponse.json({ error: 'STRIPE_PRICE_ID não configurado' }, { status: 500 });
    }

    // Garante que a URL base da aplicação tem o protocolo http/https
    let appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    if (!appUrl.startsWith('http')) {
      appUrl = `https://${appUrl}`;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/premium/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/premium/cancelado`,
      client_reference_id: user.id, // Para identificar o usuário
      metadata: {
        user_id: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    const safeError = {
      type: error.type || 'UnknownType',
      code: error.code || 'UnknownCode',
      message: error.message || 'Erro desconhecido',
      param: error.param || 'UnknownParam',
    };
    console.error('Erro ao criar sessão de checkout (Detalhes Seguros):', safeError);
    return NextResponse.json({ error: 'Erro interno ao criar checkout', details: safeError }, { status: 500 });
  }
}
