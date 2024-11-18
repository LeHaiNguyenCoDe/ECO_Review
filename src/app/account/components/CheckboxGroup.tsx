import React from "react";
import { Checkbox } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const CheckboxGroup: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="relative h-4 w-4 flex items-center justify-center"
      >
        {({ checked }) => (
          <div
            className={`h-4 w-4 p-[2.5px] flex items-center justify-center rounded ${
              checked ? 'bg-green-700' : 'bg-gray-300'
            }`}
          >
            {checked && (
              <FaCheck className="text-white h-4 w-4" /> 
            )}
          </div>
        )}
      </Checkbox>
      <label className="text-gray-700">{label}</label>
    </div>
  );
};

export default CheckboxGroup;
