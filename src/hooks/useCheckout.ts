'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useCheckout() {
  const router = useRouter();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (isCheckoutLoading) return;
    setIsCheckoutLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout-session', { method: 'POST' });
      
      if (res.status === 401) {
        // Redireciona para o login se não estiver logado
        router.push('/auth/login?redirect=/premium');
        return;
      }

      const data = await res.json();
      if (data.url) {
        // Redireciona para o Stripe Checkout
        window.location.href = data.url;
      } else {
        alert('Erro ao iniciar checkout: ' + (data.error || 'Desconhecido'));
      }
    } catch (error) {
      console.error('Erro na chamada de checkout:', error);
      alert('Erro interno. Tente novamente mais tarde.');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return { handleCheckout, isCheckoutLoading };
}
