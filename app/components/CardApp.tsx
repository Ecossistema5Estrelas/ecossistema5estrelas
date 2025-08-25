import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import type { MotionProps } from "framer-motion";

const MotionDiv = motion.div as unknown as React.FC<
  ComponentPropsWithoutRef<"div"> & MotionProps
>;

type Props = { href: string; title: string; children?: React.ReactNode };

export default function CardApp({ href, title, children }: Props) {
  return (
    <MotionDiv className="rounded-2xl p-4 shadow">
      <Link href={href} className="inline-flex items-center gap-2">
        <span className="font-semibold">{title}</span>
      </Link>
      {children}
    </MotionDiv>
  );
}
