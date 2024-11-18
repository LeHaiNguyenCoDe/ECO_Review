"use client";

import {
  ReactNode,
  createContext,
  useContext,
} from "react";
import { motion as m, MotionProps } from "framer-motion";
import { Field, Label, LabelProps } from "@headlessui/react";
import { Checkbox as ICheckbox } from "@headlessui/react";

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

interface CheckboxContextProps {
  id: string;
  isChecked: boolean;
  disabled?: boolean;
  onCheck?: (val: boolean) => void;
}

const CheckboxContext = createContext<CheckboxContextProps>({
  id: "",
  isChecked: false,
});

interface CheckboxProps {
  children: ReactNode;
  id: string;
  value?: boolean;
  disabled?: boolean;
  onCheck?: (val: boolean) => void;
}

const Checkbox = ({ children, id, value, disabled, onCheck }: CheckboxProps) => {
  return (
    <Field className="flex items-center gap-2">
      <CheckboxContext.Provider
        value={{
          id,
          isChecked: value || false,
          disabled: disabled || false,
          onCheck: onCheck,
        }}
      >
        {children}
      </CheckboxContext.Provider>
    </Field>
  );
};

const CheckboxIndicator = ({ className }: { className?: string }) => {
  const { id, isChecked, disabled, onCheck } = useContext(CheckboxContext);

  return (
    <ICheckbox
      id={id}
      checked={isChecked}
      disabled={disabled}
      onChange={onCheck}
      className={`${
        className ||
        "group flex items-center justify-center border-blue-gray-200 h-5 w-5 min-h-5 min-w-5 cursor-pointer appearance-none rounded-md border transition-all duration-500 data-[checked]:border-blue-500 data-[checked]:bg-[#e5e9ec]"
      }`}
    >
      <m.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="4"
        stroke="currentColor"
        className="h-3.5 w-3.5"
        initial={false}
        animate={isChecked ? "checked" : "unchecked"}
      >
        <m.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
          variants={tickVariants}
          className="text-[#353535]"
        />
      </m.svg>
    </ICheckbox>
  );
};

Checkbox.Indicator = CheckboxIndicator;

type CheckboxLabelProps = LabelProps & MotionProps;

const CheckboxLabel = ({
  children,
  className,
  ...props
}: CheckboxLabelProps) => {
  const { isChecked } = useContext(CheckboxContext);

  return (
    <Label
      as={m.span}
      className={`${
        className ?? "relative ml-1 overflow-hidden text-base cursor-pointer"
      }`}
      animate={{
        x: isChecked ? [0, -4, 0] : [0, 4, 0],
      }}
      initial={false}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      {...props}
    >
      {children}
    </Label>
  );
};

Checkbox.Label = CheckboxLabel;

export default Checkbox;
