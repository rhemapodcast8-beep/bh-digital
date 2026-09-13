# Configuração Stripe e Supabase (BH Digital Premium)

Este guia documenta o processo para finalizar a integração entre o Stripe Checkout e as assinaturas armazenadas no banco de dados Supabase do BH Digital.

## 1. Instalação e Requisitos

A dependência `stripe` do Node foi instalada via `npm install stripe`.

## 2. Variáveis de Ambiente Necessárias

Você deve configurar as seguintes variáveis no arquivo `.env.local` e no painel da Vercel:

```env
# Stripe Config
STRIPE_SECRET_KEY=sk_test_...         # Chave secreta da API do Stripe
STRIPE_WEBHOOK_SECRET=whsec_...       # Segredo de assinatura do Webhook
STRIPE_PRICE_ID=price_...             # ID do Preço do produto Premium cadastrado no Stripe

# Supabase Config (já devem existir)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...         # OBRIGATÓRIO: Chave secreta de serviço, usada para pular a RLS no webhook
```

**ATENÇÃO**: A chave `SUPABASE_SERVICE_ROLE_KEY` não deve nunca ser enviada ao client ou exposta no `NEXT_PUBLIC_`.

## 3. Configuração da Tabela Subscriptions

A tabela atual possui as colunas essenciais, mas nós precisamos adicionar a coluna `stripe_customer_id` para permitir o funcionamento do **Customer Portal** (onde o usuário pode alterar cartão e cancelar).

Execute esta migration SQL no Editor SQL do seu projeto no Supabase:

```sql
ALTER TABLE public.subscriptions ADD COLUMN stripe_customer_id TEXT;
```

## 4. Configuração do Webhook na Stripe

1. Vá até o seu [Dashboard do Stripe](https://dashboard.stripe.com/).
2. Clique em **Developers** > **Webhooks**.
3. Clique em **Add an endpoint**.
4. Insira a URL do seu site seguido de `/api/stripe/webhook` (ex: `https://seusite.com/api/stripe/webhook`).
5. Adicione **obrigatoriamente** estes eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
6. Clique em **Add endpoint**.
7. Após criar, na aba do webhook recém criado, clique em **Reveal** no bloco de *Signing secret*. Este é o seu `STRIPE_WEBHOOK_SECRET`.

## 5. Testando Localmente (Opcional)

Se desejar testar os pagamentos e o webhook rodando a aplicação localmente (`localhost:3000`):

1. Instale o [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Faça login pelo terminal: `stripe login`
3. Inicie o encaminhamento do webhook para o seu servidor local:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
4. O terminal vai imprimir uma chave `whsec_...`. Coloque ela no seu `.env.local` como `STRIPE_WEBHOOK_SECRET`.
5. Pronto! Agora pagamentos feitos com cartões de teste da Stripe vão atualizar seu banco de dados local Supabase.

## 6. Proteger Recursos com o Premium Helper

Sempre que você criar uma nova rota, página de curso ou API e quiser travar somente para quem for Premium, importe o utilitário seguro no servidor:

```typescript
import { requirePremium } from '@/lib/premium';

export async function GET() {
  const isPremium = await requirePremium();
  if (!isPremium) {
    return new Response('Acesso Negado', { status: 403 });
  }
  // Lógica premium aqui
}
```
Para páginas estáticas/server-components:
```tsx
import { requirePremium } from '@/lib/premium';
import { redirect } from 'next/navigation';

export default async function AreaMembros() {
  const isPremium = await requirePremium();
  if (!isPremium) {
    redirect('/premium');
  }

  return <div>Área secreta</div>;
}
```
