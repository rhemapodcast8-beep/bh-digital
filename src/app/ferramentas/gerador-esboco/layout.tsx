import { redirect } from 'next/navigation';
import { requirePremium } from '@/lib/premium';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function FerramentaPremiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?redirectTo=/ferramentas/gerador-esboco');
  }

  const isPremium = await requirePremium();
  
  if (!isPremium) {
    redirect('/premium');
  }

  return <>{children}</>;
}
