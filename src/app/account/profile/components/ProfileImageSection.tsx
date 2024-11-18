import React from 'react';
import { FiEdit } from 'react-icons/fi';
import Logo from '@/public/images/logo-hhb.png';
import Image from 'next/image';
interface ProfileImageSectionProps {
  profileImage: string | ArrayBuffer | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageSection: React.FC<ProfileImageSectionProps> = ({
  profileImage,
  handleImageChange,
}) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-start">
      <div className="relative w-48 h-48">
        <div className="rounded-full overflow-hidden w-full h-full border-4 border-gray-200">
          {profileImage ? (
            <img
              src={profileImage.toString()}
              alt="User Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src={Logo}
              alt="Default Avatar"
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="absolute bottom-0 w-full bg-white bg-opacity-60 text-black text-sm py-2 flex justify-center items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center"
          >
            <FiEdit className="mr-1" />
            Đổi ảnh
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageSection;
