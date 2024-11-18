import React from 'react';
import { Select } from '@headlessui/react';
interface DateSelectionProps {
  label?: string;
  labelOption: string;
  value: string | number;
  onChange: (value: string) => void;
  className?: string;
  options: Array<number | string>;
}

const DateSelection: React.FC<DateSelectionProps> = ({
  label,
  labelOption,
  value,
  onChange,
  className,
  options,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="font-medium mb-1">{label}</label>
      <Select
        className="border rounded-md p-2"
        value={value.toString()}
        onChange={(e) => onChange(e.target.value)}
      >
        <option>{labelOption}</option>
        {options.map((option) => (
          <option key={option} value={option.toString()}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default DateSelection;
