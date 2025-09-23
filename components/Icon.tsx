/* components/Icon.tsx - SVG icons sem depender de fontes/emoji */
type IconName = "home" | "blog" | "store" | "dash" | "contact" | "star";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = "w-5 h-5 inline-block align-[-2px]";
  const cls = (className ? className + " " : "") + common;
  switch (name) {
    case "home":
      return (<svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 3 10h2v10h5v-6h4v6h5V10h2z"/></svg>);
    case "blog":
      return (<svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4z"/></svg>);
    case "store":
      return (<svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M4 10h16l-1.6-5H5.6L4 10zm1 2v7h14v-7H5z"/></svg>);
    case "dash":
      return (<svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3zm10 8h8V3h-8zm-10 0h8v-6H3z"/></svg>);
    case "contact":
      return (<svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-9 9a9 9 0 0 1 18 0z"/></svg>);
    case "star":
      return (<svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 18l-6.2 3.3 1.2-6.8-5-4.9 6.9-1z"/></svg>);
  }
  return null;
}
export default Icon;

