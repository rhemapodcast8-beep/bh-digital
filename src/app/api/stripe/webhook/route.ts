import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET is missing');
    }
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id || session.metadata?.user_id;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (userId && subscriptionId) {
          // Precisamos dos detalhes da assinatura para saber o end_date inicial
          const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
          
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            external_id: subscriptionId, // O id real da subscription stripe
            stripe_customer_id: customerId, // Precisamos dessa coluna na tabela!
            status: subscription.status,
            plan: 'premium',
            start_date: new Date(subscription.current_period_start * 1000).toISOString(),
            end_date: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString()
          }, { onConflict: 'external_id' }); // Supondo que external_id é único ou lidaremos via ID
          // No schema atual external_id não é unique, então upsert só com external_id pode não funcionar
          // Vamos fazer uma busca primeiro:
          
          const { data: existing } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('user_id', userId)
            .single();

          if (existing) {
            await supabase.from('subscriptions').update({
              external_id: subscriptionId,
              stripe_customer_id: customerId,
              status: subscription.status,
              start_date: new Date(subscription.current_period_start * 1000).toISOString(),
              end_date: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString()
            }).eq('id', existing.id);
          } else {
            await supabase.from('subscriptions').insert({
              user_id: userId,
              external_id: subscriptionId,
              stripe_customer_id: customerId,
              status: subscription.status,
              plan: 'premium',
              start_date: new Date(subscription.current_period_start * 1000).toISOString(),
              end_date: new Date(subscription.current_period_end * 1000).toISOString()
            });
          }
        }
        break;
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        const subscriptionId = subscription.id;
        
        await supabase.from('subscriptions')
          .update({
            status: subscription.status,
            start_date: new Date(subscription.current_period_start * 1000).toISOString(),
            end_date: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('external_id', subscriptionId);
        break;
      }
      
      case 'invoice.paid': {
        const invoice = event.data.object as any;
        if (invoice.subscription) {
          const subscriptionId = invoice.subscription as string;
          // Pega detalhes da subscription
          const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
          await supabase.from('subscriptions')
            .update({
              status: subscription.status,
              end_date: new Date(subscription.current_period_end * 1000).toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('external_id', subscriptionId);
        }
        break;
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;
        if (invoice.subscription) {
          const subscriptionId = invoice.subscription as string;
          await supabase.from('subscriptions')
            .update({
              status: 'past_due',
              updated_at: new Date().toISOString()
            })
            .eq('external_id', subscriptionId);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json({ error: 'Erro interno ao processar' }, { status: 500 });
  }
}
