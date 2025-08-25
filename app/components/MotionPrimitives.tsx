"use client";
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import type { MotionProps } from "framer-motion";

export const MotionDiv = motion.div as unknown as React.FC<
  ComponentPropsWithoutRef<"div"> & MotionProps
>;
