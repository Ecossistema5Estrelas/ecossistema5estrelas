export default function SemanticAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-6 space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">Painel Editorial Semântico</h1>
        <p className="text-sm opacity-70">Observabilidade cognitiva · Read-only · Determinístico</p>
      </header>
      <main>{children}</main>
    </section>
  );
}