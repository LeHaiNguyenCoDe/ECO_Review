import { Button } from '@headlessui/react';
import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string; // Optional className prop
}

const ButtonGroup: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <div>
      <Button
        className={`${className}`}
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  );
};

export default ButtonGroup;
