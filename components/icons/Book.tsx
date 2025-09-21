export default function Book({className=""}:{className?:string}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.6" d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5A2.5 2.5 0 0 1 17.5 21H6.5A2.5 2.5 0 0 1 4 18.5V5.5Z"/>
      <path strokeWidth="1.6" d="M20 17H6.5A2.5 2.5 0 0 0 4 19.5"/>
    </svg>
  );
}
