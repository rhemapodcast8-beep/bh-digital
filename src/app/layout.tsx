import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { RouteTracker } from '@/components/analytics/RouteTracker';
import { I18nProvider } from '@/lib/i18n/I18nContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bhdigitaltech.com'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en': '/en',
      'es': '/es',
      'x-default': '/',
    },
  },
  title: {
    default: 'BH DIGITAL — Palavra, Estudos, Livros e Ferramentas',
    template: '%s | BH DIGITAL',
  },
  description:
    'Plataforma digital cristã profissional reunindo conteúdos edificantes, estudos bíblicos, devocionais, livros e ferramentas tecnológicas em um ecossistema seguro e inspirador.',
  keywords: [
    'bíblia sagrada',
    'estudos bíblicos',
    'devocionais',
    'livros cristãos',
    'BH Digital',
    'plataforma cristã',
    'lições bíblicas',
  ],
  authors: [{ name: 'BH DIGITAL' }],
  creator: 'BH DIGITAL',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'BH DIGITAL — Ecossistema Cristão Digital',
    description:
      'Palavra, Estudos, Devocionais, Livros e Ferramentas em uma única plataforma.',
    siteName: 'BH DIGITAL',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col bg-[#060B16] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-slate-950 antialiased">
        <I18nProvider>
          {/* GA4: carrega o script e inicializa sem page_view automático */}
          <GoogleAnalytics />
          {/* GA4: envia page_view em cada mudança de rota */}
          <RouteTracker />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
