"use client";

import React, { useState } from "react";
import UpdateAddressModal from "./components/AddressModal";
import Button from "./../components/ButtonGroup";
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

const ProfileAddresses = () => {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            name: "Vy Nguyễn",
            phone: "034 5678 789",
            email: "vy.nguyen@gmail.com",
            city: "Hồ Chí Minh",
            district: "Quận 3",
            ward: "Phường 05",
            street: "Số 01",
            type: "Nhà riêng",
            isDefault: true,
        },
        {
            id: 2,
            name: "Vy Nguyễn",
            phone: "034 5678 789",
            email: "vy.nguyen@gmail.com",
            city: "Hồ Chí Minh",
            district: "Quận Gò Vấp",
            ward: "Phường 06",
            street: "Số 02",
            type: "Văn phòng",
            isDefault: false,
        },
        {
            id: 3,
            name: "Vy Nguyễn",
            phone: "034 5678 789",
            email: "vy.nguyen@gmail.com",
            city: "Hồ Chí Minh",
            district: "Quận Gò Vấp",
            ward: "Phường 06",
            street: "Số 03",
            type: "Văn phòng",
            isDefault: false,
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Open modal for adding a new address
    const handleAddNewAddress = () => {
        setSelectedAddress({
            id: addresses.length + 1,
            name: "",
            phone: "",
            email: "",
            city: "Hồ Chí Minh",
            district: "",
            ward: "",
            street: "",
            type: "Nhà riêng",
            isDefault: false,
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    // Open modal for editing an address
    const handleUpdateClick = (address: Address) => {
        setSelectedAddress(address);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleSave = (updatedAddress: Address) => {
        // If adding a new address or editing an existing one and marked as default
        if (updatedAddress.isDefault) {
            setAddresses((prevAddresses) =>
                prevAddresses.map((address) => ({
                    ...address,
                    isDefault: address.id === updatedAddress.id,
                }))
            );
        }

        if (isEditing) {
            setAddresses((prevAddresses) =>
                prevAddresses.map((address) =>
                    address.id === updatedAddress.id ? updatedAddress : address
                )
            );
        } else {
            // Handle adding a new address
            setAddresses((prevAddresses) => [...prevAddresses, updatedAddress]);
        }

        setIsModalOpen(false);
    };

    return (
        <div className="flex-grow lg:p-4 p-8">
            <div className="bg-white p-6 rounded-lg shadow-md w-[70.31rem] lg:w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-green-700">Địa chỉ của tôi</h1>
                    <button
                        onClick={handleAddNewAddress}
                        className="flex items-center text-green-700 border border-green-700 px-4 py-2 rounded hover:bg-green-50"
                    >
                        <span className="mr-2">+</span> Thêm địa chỉ mới
                    </button>
                </div>

                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="border p-4 mb-4 rounded-lg flex justify-between items-center"
                    >
                        <div>
                            <p className="font-bold">
                                {address.name} | {address.phone}
                            </p>
                            <p>
                                {address.street}, {address.ward}, {address.district}, {address.city}
                            </p>
                            {address.isDefault && (
                                <Button label="Địa chỉ mặc định" className="bg-green-100 text-green-700 px-2 py-1 rounded mt-2" />
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <Button
                                onClick={() => handleUpdateClick(address)}
                                className="text-green-700 hover:underline"
                                label="Cập nhật"
                            />
                            <Button
                                onClick={() => setAddresses(addresses.filter((addr) => addr.id !== address.id))}
                                label="Xóa"
                                className="text-red-500 hover:underline"
                            />
                        </div>
                    </div>
                ))}

                {selectedAddress && (
                    <UpdateAddressModal
                        isOpen={isModalOpen}
                        address={selectedAddress}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </div>

    );
};

export default ProfileAddresses;
