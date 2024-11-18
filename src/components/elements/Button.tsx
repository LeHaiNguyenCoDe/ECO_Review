"use client";

import React from "react";
import { motion as m, MotionProps } from "framer-motion";
import { Button as IButton, ButtonProps } from "@headlessui/react";

type CustomProps = MotionProps & ButtonProps;

/**
 * Button Component.
 * This component support all features that a button html supported and can be styled with motion. It should contain a word/string or a icon inside its.
 * Some attributes that you should pay attention to such as: value, children, type, onClick, ...
 * Use case:
 * - use with form
 * - in case, it isn't linked to anything url
 * - .. etc
 * Example: [Submit], [x icon]
 *
 * @component
 * @param {ButtonProps} props - The button element props.
 * @returns {ReactNode} The rendered button element.
 */
const Button = ({ children, className, ...props }: CustomProps) => {
  return (
    <IButton
      as={m.button}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1, ease: "easeInOut" },
      }}
      animate={{
        scale: 1,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className={className}
      {...props}
    >
      {children}
    </IButton>
  );
};

export default Button;
