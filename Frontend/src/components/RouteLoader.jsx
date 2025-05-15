import { motion } from "framer-motion";
import { useState } from "react";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 1.2,
    },
  },
};

export default function RouteLoader() {
    const [loader, setLoader] = useState(true)
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        variants={spinnerVariants}
        animate="animate"
      />
    </div>
  );
}
