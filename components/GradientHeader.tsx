export default function GradientHeader(
  {title, subtitle}:{title:string; subtitle?:string}
){
  return (
    <div className="rounded-2xl px-6 py-7 sm:px-8 sm:py-9 text-white shadow-sm ring-1 ring-black/10
                    bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-2 text-white/90 text-sm sm:text-base">{subtitle}</p> : null}
    </div>
  );
}
