import React, { useState, useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { Input, Textarea } from "@headlessui/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  as?: "input" | "textarea";
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
  validate?: (value: string) => string | undefined | null;
  triggerValidation?: boolean;
  fullWidth?: boolean;
  textareaHeight?: string;
  showErrorIcon?: boolean;
}

const BInput = ({
  as = "input",
  type = "text",
  placeholder,
  value = "",
  onChange,
  label,
  validate,
  triggerValidation = false,
  fullWidth = false,
  textareaHeight = "h-[150px]",
  showErrorIcon = true,
  ...props
}: InputProps) => {
  const [error, setError] = useState<string | undefined | null>("");
  const [touched, setTouched] = useState(false);

  // Trigger validation effect
  useEffect(() => {
    if (triggerValidation && validate) {
      const validationError = validate(value || "");
      setError(validationError || "");
      setTouched(true);
    }
  }, [triggerValidation, value, validate]);

  // Handle blur event
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setTouched(true);
    const validationError = validate ? validate(e.target.value) : "";
    setError(validationError || "");
  };

  // Select the element type (textarea or input)
  const InputElement = as === "textarea" ? Textarea : Input;

  return (
    <div className={`mb-4 ${fullWidth ? "w-full" : "w-auto"}`}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}

      <div className="relative flex items-center">
        <InputElement
          {...(as === "input" && { type })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={`block w-full p-3 pr-10 text-sm rounded-lg focus:outline-none ${
            error
              ? "border border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500"
              : "border border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
          } ${as === "textarea" ? textareaHeight : "h-[43px]"}`}
          aria-invalid={!!error}
          {...props}
        />

        {/* Conditional rendering for validation icons */}
        {showErrorIcon && touched && (
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            {error ? (
              <MdErrorOutline className="h-5 w-5 text-red-500" />
            ) : (
              <CiCircleCheck className="h-5 w-5 text-green-500" />
            )}
          </div>
        )}
      </div>

      {/* Error message display */}
      {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
    </div>
  );
};

export default BInput;
