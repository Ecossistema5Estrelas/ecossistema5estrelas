import GradientBG from "@/components/GradientBG";

export const revalidate = 60;

export default function BlogLayout({children}:{children:React.ReactNode}) {
  return (
    <GradientBG>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 text-[17px] leading-7">
        {children}
      </div>
    </GradientBG>
  );
}
