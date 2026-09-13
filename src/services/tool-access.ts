import { requirePremium } from '@/lib/premium';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export interface ToolAccessResult {
  allowed: boolean;
  reason?: 'limit_reached' | 'premium_required' | 'unauthenticated';
  usageCount?: number;
  limit?: number;
}

export async function checkToolAccess(
  toolKey: string,
  userId?: string
): Promise<ToolAccessResult> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { allowed: false, reason: 'unauthenticated' };
  }

  const isPremium = await requirePremium();
  if (!isPremium) {
    return { allowed: false, reason: 'premium_required' };
  }

  return {
    allowed: true,
  };
}
