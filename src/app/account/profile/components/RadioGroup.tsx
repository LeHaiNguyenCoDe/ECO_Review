import React from 'react';
import { Radio, RadioGroup } from '@headlessui/react';

interface SelectionProps {
  radioGroup: string;
  setradioGroup: (value: string) => void;
}

const Selection: React.FC<SelectionProps> = ({ radioGroup, setradioGroup,}) => {
  const options = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
    { value: 'Khác', label: 'Khác' },
  ];

  return (
    <div className="flex flex-col col-span-2 mb-4">
      <label className="font-medium mb-3">Giới tính</label>
      <RadioGroup value={radioGroup} onChange={setradioGroup} className="flex space-x-6">
        {options.map(({ value, label }) => (
          <Radio key={value} value={value} as="div">
            {({ checked }) => (
              <div className="flex items-center space-x-2">
                <div
                  className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    checked ? 'border-primary' : 'border-gray-300'
                  }`}
                >
                  {checked && (
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  )}
                </div>
                <span className={`font-medium ${checked ? 'text-green-700' : 'text-gray-800'}`}>
                  {label}
                </span>
              </div>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Selection;
