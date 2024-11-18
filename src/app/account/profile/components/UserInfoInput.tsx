// components/UserInfoInput.tsx
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import Input from "../../../../components/elements/CustomizableInput";

interface UserInfoInputProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
  maskedValue?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  className?: string;
}

const UserInfoInput: React.FC<UserInfoInputProps> = ({
  label,
  value,
  setValue,
  maskedValue,
  onBlur,
  onFocus,
  className, // Use className prop
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-medium mb-1">{label}</label>
      <div className="relative">
        <Input
          type="text"
          className="border rounded-md p-2 w-full pr-10"
          value={maskedValue ? maskedValue : value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <span className="absolute right-3 top-[1.25rem] transform -translate-y-1/2 cursor-pointer text-gray-400 z-10">
          <FiEdit className="text-gray-500" />
        </span>
      </div>
    </div>
  );
};

export default UserInfoInput;
