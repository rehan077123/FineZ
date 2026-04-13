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
  return children;
}
