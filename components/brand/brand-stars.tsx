import React from "react";
export default function BrandStars({ large=false }: { large?: boolean }){
  const cls = "star " + (large ? "star--lg" : "");
  const Star = () => (
    <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2l2.9 6.2 6.8.9-5 4.8 1.2 6.8L12 17.8 6.1 20.7 7.3 13.9 2.3 9.1l6.8-.9L12 2z"/>
    </svg>
  );
  return (
    <div className="stars" role="img" aria-label={large ? "5 estrelas grandes" : "5 estrelas"}>
      <Star/><Star/><Star/><Star/><Star/>
    </div>
  );
}
