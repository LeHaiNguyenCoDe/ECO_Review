import { Select } from "@headlessui/react";
import React from "react";

interface AddressSelectorProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  label: string;
}

const AddressGroup: React.FC<AddressSelectorProps> = ({
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <Select
      name={name}
      value={value}
      onChange={onChange}
      className="w-1/3 p-2 border rounded"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default AddressGroup;
