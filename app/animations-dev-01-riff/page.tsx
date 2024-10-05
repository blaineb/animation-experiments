"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import styles from './styles.module.css';

const buttonText = {
  1: "Making a plan...",
  2: "Researching...",
  3: "Finishing up..."
};

const LoadingText = () => {
  const [currentText, setCurrentText] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev % 3) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentText}
          transition={{ type: "spring", bounce: 0.35, duration: 0.8 }}
          initial={{ y: -25, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: 25, opacity: 0 }}
          className={styles.loadingText}
        >
          {buttonText[currentText as keyof typeof buttonText].split("").map((child, idx) => (
            <motion.span
              className={styles.cursor}
              key={idx}
              animate={{
                padding: hoveredIndex === idx
                  ? "0 3px"
                  : hoveredIndex === idx - 1 || hoveredIndex === idx + 1
                  ? "0 2px"
                  : hoveredIndex === idx + 2 || hoveredIndex === idx - 2
                  ? "0 1px"
                  : "0",
              }}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              transition={{ type: "spring", bounce: .1, duration: 0.4 }}
            >
              {child}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default LoadingText;
