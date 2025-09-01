import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import type { MotionProps } from "framer-motion";

const MotionDiv = motion.div as unknown as React.FC<
  ComponentPropsWithoutRef<"div"> & MotionProps
>;

type Props = { children: React.ReactNode };

export default function DesktopView({ children }: Props) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hidden md:block lg:p-8 p-6 bg-zinc-900 rounded-2xl shadow-xl border border-white/10 text-white"
    >
      {children}
    </MotionDiv>
  );
}

