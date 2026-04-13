import { defaultLocale, isValidLocale } from '@/lib/i18n-config';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'hi' },
    { locale: 'ta' },
    { locale: 'bn' },
  ];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!isValidLocale(params.locale)) {
    return null;
  }

  return children;
}
