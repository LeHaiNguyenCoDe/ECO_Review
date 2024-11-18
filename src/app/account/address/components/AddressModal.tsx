"use client";

import React, { useState, useEffect } from "react";
import AddressSelector from "../../components/AddressGroup";
import TypeSelector from "./Address";
import Checkbox from "../../components/CheckboxGroup";
import Input from "@/components/elements/CustomizableInput";
import ButtonGroup from "../../components/ButtonGroup";

interface Address {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  type: string;
  isDefault: boolean;
}

interface LocationOptions {
  [city: string]: {
    districts: {
      [district: string]: string[];
    };
  };
}

const LOCATION_OPTIONS: LocationOptions = {
  "Hồ Chí Minh": {
    districts: {
      "Quận 1": ["Phường 1", "Phường 2", "Phường 3"],
      "Quận 3": ["Phường 1", "Phường 2"],
      "Quận Gò Vấp": ["Phường 1", "Phường 3"],
    },
  },
  "Hà Nội": {
    districts: {
      "Quận Ba Đình": ["Phường Cống Vị", "Phường Điện Biên"],
      "Quận Hoàn Kiếm": ["Phường Hàng Bạc", "Phường Hàng Đào"],
    },
  },
  "Đà Nẵng": {
    districts: {
      "Quận Hải Châu": ["Phường Hải Châu 1", "Phường Hải Châu 2"],
      "Quận Thanh Khê": ["Phường Tân Chính", "Phường Vĩnh Trung"],
    },
  },
};

interface UpdateAddressModalProps {
  isOpen: boolean;
  address: Address;
  onClose: () => void;
  onSave: (updatedAddress: Address) => void;
}

const UpdateAddressModal: React.FC<UpdateAddressModalProps> = ({
  isOpen,
  address,
  onClose,
  onSave,
}) => {
  const [updatedAddress, setUpdatedAddress] = useState<Address>(address);

  useEffect(() => {
    setUpdatedAddress(address);
  }, [address]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedAddress((prev) => ({ ...prev, [name]: value }));
  };

  const getDistricts = () => {
    return updatedAddress.city
      ? Object.keys(LOCATION_OPTIONS[updatedAddress.city]?.districts || {})
      : [];
  };

  const getWards = () => {
    return updatedAddress.city && updatedAddress.district
      ? LOCATION_OPTIONS[updatedAddress.city]?.districts[updatedAddress.district] || []
      : [];
  };

  const handleSave = () => {
    onSave(updatedAddress);
    onClose();
  };

  const handleTypeChange = (type: string) => {
    setUpdatedAddress((prev) => ({ ...prev, type }));
  };

  const handleDefaultChange = (checked: boolean) => {
    setUpdatedAddress((prev) => ({ ...prev, isDefault: checked }));
  };
  

  if (!isOpen) return null;

  // Fields to be mapped for generating text inputs
  const formFields = [
    { name: "name", value: updatedAddress.name, placeholder: "Họ và tên" },
    { name: "phone", value: updatedAddress.phone, placeholder: "Số điện thoại" },
    { name: "email", value: updatedAddress.email, placeholder: "Email" },
  ];

  // Combine AddressSelectors into one array
  const addressSelectors = [
    { name: "city", value: updatedAddress.city, label: "Thành phố", options: Object.keys(LOCATION_OPTIONS) },
    { name: "district", value: updatedAddress.district, label: "Quận", options: getDistricts() },
    { name: "ward", value: updatedAddress.ward, label: "Phường", options: getWards() }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-lg font-bold mb-4">
          {updatedAddress.id ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
        </h2>

        <div className="space-y-4">
          {/* Map over form fields to create inputs */}
          {formFields.map(({ name, value, placeholder }) => (
            <Input
              key={name}
              name={name}
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              showErrorIcon={false}
            />
          ))}

          <div className="flex space-x-2">
            {/* Map over the address selectors */}
            {addressSelectors.map(({ name, value, label, options }) => (
              <AddressSelector
                key={name}
                name={name}
                value={value}
                onChange={handleInputChange}
                label={label}
                options={options}
              />
            ))}
          </div>
 
          <Input
            name="street"
            value={updatedAddress.street}
            onChange={handleInputChange}
            placeholder="Địa chỉ cụ thể (Số nhà, đường...)"
            as="textarea"
            showErrorIcon={false}
          />

          <TypeSelector
            selectedType={updatedAddress.type}
            onSelectType={handleTypeChange}
          />

          <Checkbox
            checked={updatedAddress.isDefault}
            onChange={handleDefaultChange}
            label="Đặt làm địa chỉ mặc định"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <ButtonGroup
            label="Trở lại"
            onClick={onClose}
            className="px-4 py-2 border border-green-700 text-green-700 rounded hover:bg-green-50"
          />
          <ButtonGroup
            label="Xác nhận"
            onClick={handleSave}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateAddressModal;
