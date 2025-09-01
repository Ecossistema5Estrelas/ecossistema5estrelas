export default function PageHeader({
  icon,
  title,
  subtitle,
}: { icon: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <div className="text-5xl leading-none">{icon}</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-2 text-white/90">{subtitle}</p> : null}
      </div>
    </section>
  );
}
