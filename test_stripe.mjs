import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2024-12-18.acacia',
});

async function run() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/premium/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/premium/cancelado`,
    });
    console.log('Success!', session.url);
  } catch (error) {
    console.error('Stripe Error:', {
      type: error.type,
      rawType: error.rawType,
      code: error.code,
      message: error.message,
      param: error.param,
    });
  }
}

run();
