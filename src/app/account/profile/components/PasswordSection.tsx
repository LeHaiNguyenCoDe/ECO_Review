import React from "react";
import Input from "@/components/elements/CustomizableInput";
import Button from "./../../components/ButtonGroup";

interface PasswordSectionProps {
  password: string;
  onChangePasswordClick: () => void;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({ password, onChangePasswordClick }) => {
  return (
    <div className="flex justify-between items-center col-span-12">
      <div className="relative w-full">
        <label className="font-medium mb-1">Mật khẩu</label>
        <Input
          type="password"
          className="border rounded-md p-2 w-full pr-24"
          value={password}
          disabled
        />
        <Button
          label="Đổi mật khẩu"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-700 font-medium"
          onClick={onChangePasswordClick}
        />
          
      </div>
    </div>
  );
};

export default PasswordSection;
