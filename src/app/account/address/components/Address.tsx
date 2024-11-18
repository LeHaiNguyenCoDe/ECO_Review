import React from "react";
import ButtonGroup from "../../components/ButtonGroup";

interface TypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="flex space-x-4">
      <ButtonGroup
        onClick={() => onSelectType("Nhà riêng")}
        className={`px-4 py-2 border rounded ${
          selectedType === "Nhà riêng"
            ? "bg-green-700 text-white"
            : "bg-white text-gray-700"
        }`}
        label="Nhà riêng"
      />
      <ButtonGroup
        onClick={() => onSelectType("Văn phòng")}
        className={`px-4 py-2 border rounded ${
          selectedType === "Văn phòng"
            ? "bg-green-700 text-white"
            : "bg-white text-gray-700"
        }`}
        label="Văn phòng"
      />
    </div>
  );
};

export default TypeSelector;
