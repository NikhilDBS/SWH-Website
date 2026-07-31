"use client";

import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export function ScrollProgress({ className, ref, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-[200] h-[2px] origin-left",
        className
      )}
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(to right, #B99B78, #80654F, #2A241E)",
      }}
      {...(props as Record<string, unknown>)}
    />
  );
}
