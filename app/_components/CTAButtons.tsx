type Btn = { href:string; emoji:string; label:string; tone:"amber"|"fuchsia"|"emerald" };
const toneClass = (t:Btn["tone"]) => t==="amber"?"btn-amber":t==="fuchsia"?"btn-fuchsia":"btn-emerald";
export default function CTAButtons(){
  const items:Btn[] = [
    { href:"/blog", emoji:"📚", label:"Blog",  tone:"amber" },
    { href:"/loja", emoji:"🛍", label:"Loja",  tone:"fuchsia" },
    { href:"/sobre",emoji:"🏛", label:"Sobre", tone:"emerald" },
  ];
  return (
    <nav aria-label="Ações principais" className="grid gap-4 md:grid-cols-3">
      {items.map((b)=>(
        <a key={b.href} href={b.href} className={`btn-xxl ${toneClass(b.tone)}`}>
          <span className="emoji" aria-hidden="true">{b.emoji}</span>
          <span>{b.label}</span>
        </a>
      ))}
    </nav>
  );
}



