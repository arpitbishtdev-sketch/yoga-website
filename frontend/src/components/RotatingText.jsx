import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function RotatingText({ texts = [], interval = 2000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(id);
  }, [texts.length, interval]);

  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "inline-block" }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default RotatingText;
