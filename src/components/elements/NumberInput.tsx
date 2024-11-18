"use client";

import { Button, Input } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { motion as m } from "framer-motion";

interface NumberInputProps {
  size: "small" | "normal" | "big" | "custom";
  value?: number;
  onValChange: (val: number) => void;
  onDecreaseBtnClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onIncreaseBtnClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  customStyleBtn?: string;
  customStyleInput?: string;
}

const NumberInput = ({
  onValChange,
  onDecreaseBtnClick,
  onIncreaseBtnClick,
  ...props
}: NumberInputProps) => {
  const [val, setVal] = useState<string>(props.value?.toString() ?? "1");

  useEffect(() => {
    setVal(props.value?.toString() || "1");
  }, [props.value]);

  const increaseByBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newVal = parseInt(val, 0) + 1;

    setVal(newVal.toString());

    if (onIncreaseBtnClick) {
      onIncreaseBtnClick(e);
    }

    onValChange(newVal);
  };

  const decreaseByBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newVal = parseInt(val, 0) - 1;
    if (newVal <= 0) {
      return;
    }

    setVal(newVal.toString());

    if (onDecreaseBtnClick) {
      onDecreaseBtnClick(e);
    }

    onValChange(newVal);
  };

  const handleInputValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);

    if (newVal < 1 || isNaN(newVal)) {
      setVal("");
      onValChange(0);
      return;
    }

    setVal(newVal.toString());
    onValChange(newVal);
  };

  return (
    <div className="inline-flex flex-row gap-2 items-center">
      <Button
        as={m.button}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1, ease: "easeInOut" },
        }}
        animate={{ scale: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
        onClick={decreaseByBtn}
        className={`${props.size == "custom" && props.customStyleBtn} ${clsx(
          "bg-slate-100 rounded flex items-center justify-center data-[hover]:bg-slate-200 data-[hover]:text-green-900 shadow-inner",
          {
            "w-7 h-7 min-w-6 min-h-6": props.size == "small",
            "w-8 h-8 min-w-8 min-h-8": props.size == "normal",
            "w-12 h-10 min-w-12 min-h-10": props.size == "big",
          }
        )}`}
      >
        <FaMinus />
      </Button>
      <Input
        type="number"
        value={val}
        min={1}
        onInput={handleInputValChange}
        required
        name="Buy Quantity Input"
        className={`${props.size == "custom" && props.customStyleInput} ${clsx(
          "block border border-slate-300 rounded no-spinner text-center",
          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          {
            "w-10 h-6 min-w-10 min-h-7 text-xs": props.size == "small",
            "w-16 h-8 min-w-16 min-h-8 text-sm": props.size == "normal",
            "w-24 h-10 min-w-24 min-h-10 text-lg": props.size == "big",
          }
        )}`}
      ></Input>
      <Button
        as={m.button}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.1, ease: "easeInOut" },
        }}
        animate={{ scale: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
        onClick={increaseByBtn}
        className={`${props.size == "custom" && props.customStyleBtn} ${clsx(
          "bg-slate-100 rounded flex items-center justify-center data-[hover]:bg-slate-200 data-[hover]:text-green-900 shadow-inner",
          {
            "w-7 h-7 min-w-6 min-h-6": props.size == "small",
            "w-8 h-8 min-w-8 min-h-8": props.size == "normal",
            "w-12 h-10 min-w-12 min-h-10": props.size == "big",
          }
        )}`}
      >
        <FaPlus />
      </Button>
    </div>
  );
};

export default NumberInput;
