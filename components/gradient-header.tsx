type Props = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

export function GradientHeader({ title, subtitle, icon }: Props) {
  return (
    <section className="hero-banner" aria-label={title}>
      <div className="hero-inner">
        {icon ? <div className="hero-icon">{icon}</div> : null}
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}


