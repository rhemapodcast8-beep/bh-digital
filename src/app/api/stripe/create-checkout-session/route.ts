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

    // A URL base da aplicação
    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json({ error: 'Erro interno ao criar checkout' }, { status: 500 });
  }
}
