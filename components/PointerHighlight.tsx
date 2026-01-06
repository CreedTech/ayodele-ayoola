"use client";
import { motion } from "motion/react";
import { useRef, useEffect, useState } from "react";

const PointerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="1" strokeLinecap="round"
    strokeLinejoin="round" viewBox="0 0 16 16" height="1em" width="1em"
    xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
  </svg>
);

export default function PointerHighlight({
  children,
  color = "var(--accent)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <span ref={containerRef} style={{ position: "relative", display: "inline-block" }}>
      {children}
      {dimensions.width > 0 && (
        <motion.span
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Animated border */}
          <motion.span
            style={{
              position: "absolute",
              top: -4,
              left: -6,
              border: `1px solid ${color}`,
              borderRadius: 4,
              opacity: 0.6,
              display: "block",
            }}
            initial={{ width: 0, height: 0 }}
            whileInView={{ width: dimensions.width + 12, height: dimensions.height + 8 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          {/* Pointer in bottom-right corner */}
          <motion.span
            style={{
              position: "absolute",
              color,
              display: "block",
              rotate: "-90deg",
              fontSize: 14,
            }}
            initial={{ opacity: 0, x: 0, y: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 10,
              y: dimensions.height + 6,
            }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <PointerIcon />
          </motion.span>
        </motion.span>
      )}
    </span>
  );
}
