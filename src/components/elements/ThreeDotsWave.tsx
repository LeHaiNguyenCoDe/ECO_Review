"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const ThreeDotsWave = () => {
  return (
    <motion.div
      className="flex justify-around w-32 h-11"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.span
          key={index}
          className={clsx("block w-6 h-6 rounded-full", {
            "bg-red-600": index == 0,
            "bg-green-600": index == 1,
            "bg-yellow-400": index == 2,
          })}
          transition={{
            ease: "easeInOut",
            repeat: Infinity,
            duration: 0.7,
            delay: index * 0.15,
          }}
          animate={{ y: ["0%", "100%", "0%"] }}
        />
      ))}
    </motion.div>
  );
};

export default ThreeDotsWave;
