"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function StaggerGrid({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { delay, staggerChildren: reduceMotion ? 0 : stagger } },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 14, filter: reduceMotion ? "blur(0px)" : "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: reduceMotion ? 0 : 0.7, ease: [0.21, 0.98, 0.23, 0.99] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
