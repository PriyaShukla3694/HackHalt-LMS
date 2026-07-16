import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.15 } },
      }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
      };

  return (
    <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}
