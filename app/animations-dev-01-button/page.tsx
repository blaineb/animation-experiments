"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "./Spinner";
import "./styles.css";

const buttonCopy = {
  idle: "Send me a login link",
  loading: <Spinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  success: "Login link sent!",
};

export default function SmoothButton() {
  const [buttonState, setButtonState] = useState("idle");

  return (
    <div className="outer-wrapper">
      <button
        className="blue-button"
        disabled={buttonState !== "idle"}
        onClick={() => {
          if (buttonState === "success") return;
          setButtonState("loading");

          setTimeout(() => {
            setButtonState("success");
          }, 1750);

          setTimeout(() => {
            setButtonState("idle");
          }, 3500);
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={buttonState}
            transition={{ type: "spring", bounce:0, duration:.3}}
            initial={{ y: -25, opacity: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ y: 25, opacity: 0 }}>{buttonCopy[buttonState]}</motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}