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

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (!subscription || !subscription.stripe_customer_id) {
      return NextResponse.json({ error: 'Nenhum cliente Stripe associado' }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${appUrl}/perfil`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão do Customer Portal:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
