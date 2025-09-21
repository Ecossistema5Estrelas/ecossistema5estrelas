export default function Star({className=""}:{className?:string}) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden focusable="false">
      <defs>
        <linearGradient id="g-star" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F9E075"/>
          <stop offset="50%" stopColor="#F0C53A"/>
          <stop offset="100%" stopColor="#D9B545"/>
        </linearGradient>
      </defs>
      <path fill="url(#g-star)" d="M12 2l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 19.9l1.1-6.5L2.6 8.8l6.5-.9L12 2z"/>
    </svg>
  );
}
