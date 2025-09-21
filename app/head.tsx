export default function Head() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecossistema5estrelas.org";

  return (
    <>
      {/* SEO base */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical SEM www */}
      <link rel="canonical" href={site} />

      {/* PWA / Ícones */}
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="icon" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
    </>
  );
}




