import React from "react";
import { motion } from "framer-motion";
import "./Skeleton.css";

function Skeleton({ variant = "text", width, height, className = "", style = {} }) {
  const classes = `skeleton skeleton-${variant} ${className}`;

  return (
    <motion.div
      className={classes}
      style={{ width, height, ...style }}
      animate={{ opacity: [0.4, 0.9, 0.4] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      }}
    />
  );
}

export default Skeleton;
