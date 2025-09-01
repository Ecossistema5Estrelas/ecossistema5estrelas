import React from "react";
type HeroProps = { title: string; subtitle?: string; icon?: React.ReactNode };
export default function Hero({ title, subtitle, icon }: HeroProps){
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="flex items-center gap-3">
          {icon ? <div className="shrink-0">{icon}</div> : null}
          <div>
            <h1 className="hero__title">{title}</h1>
            {subtitle ? <p className="hero__subtitle">{subtitle}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
