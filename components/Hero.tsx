import React from "react";

type FiveStarsProps = { size?: number; className?: string };
function FiveStars({ size = 22, className = "" }: FiveStarsProps) {
  const style = { width: size, height: size, display: "inline-block" } as const;
  return (
    <div className={`inline-flex gap-1 ${className}`} aria-label="cinco estrelas">
      <span style={style}>⭐</span>
      <span style={style}>⭐</span>
      <span style={style}>⭐</span>
      <span style={style}>⭐</span>
      <span style={style}>⭐</span>
    </div>
  );
}

type Props = {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function Hero({ title, subtitle, className = "", children }: Props) {
  return (
    <section className={`py-10 text-center ${className}`}>
      <div className="mb-3">
        <FiveStars size={22} />
      </div>
      {title ? <h1 className="text-3xl font-bold">{title}</h1> : null}
      {subtitle ? (
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{subtitle}</p>
      ) : null}
      {children}
    </section>
  );
}