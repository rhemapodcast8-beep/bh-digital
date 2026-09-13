import { createSupabaseServerClient } from './supabase/server';

export async function isUserPremium(userId: string): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('status, end_date')
    .eq('user_id', userId)
    .single();

  if (error || !subscription) {
    return false;
  }

  // Verificar se o status é válido
  const validStatuses = ['active', 'trialing'];
  if (!validStatuses.includes(subscription.status)) {
    return false;
  }

  // Verificar se a assinatura já expirou
  if (subscription.end_date) {
    const endDate = new Date(subscription.end_date);
    if (endDate < new Date()) {
      return false;
    }
  }

  return true;
}

export async function requirePremium(): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return false;
  }

  return isUserPremium(user.id);
}
