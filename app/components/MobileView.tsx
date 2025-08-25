"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import type { MotionProps } from "framer-motion";

const MotionDiv = motion.div as unknown as React.FC<
  ComponentPropsWithoutRef<"div"> & MotionProps
>;

type Props = { children: React.ReactNode };

export default function MobileView({ children }: Props) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 p-6 bg-black/90 text-white shadow-md rounded-2xl"
    >
      <Link href="/blog" className="text-xl hover:text-yellow-300 transition-colors">
        📚 Blog
      </Link>
      {children}
    </MotionDiv>
  );
}
