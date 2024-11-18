"use client";

import React, { useState } from "react";
import ProfileImageSection from "./components/ProfileImageSection";
import UserInfoInput from "./components/UserInfoInput";
import GenderSelection from "./components/RadioGroup";
import PasswordSection from "./components/PasswordSection";
import Button from "../components/ButtonGroup";
import DateSelection from "./components/DateSelection";
import ChangePasswordModal from "./components/PasswordUpdate";

export default function ProfilePage() {
  const [userName, setUserName] = useState("Mai Vy Nguyen");
  const [phone, setPhone] = useState("0912345325");
  const [email, setEmail] = useState("vy@gmail.com");
  const [maskedPhone, setMaskedPhone] = useState(maskPhone(phone));
  const [maskedEmail, setMaskedEmail] = useState(maskEmail(email));
  const [birthDay, setBirthDay] = useState({ day: "", month: "", year: "" });
  const [radioGroup, setRadioGroup] = useState("Khác");
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    null
  );
  const [password, setPassword] = useState("123456789");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setShowChangePasswordModal(false);
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function maskPhone(phone: string) {
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "*******$3");
  }

  function maskEmail(email: string) {
    const [name, domain] = email.split("@");
    const maskedName = name.substring(0, 2) + "****";
    return maskedName + "@" + domain;
  }

  const handleSave = () => {
    const formData = {
      userName,
      phone,
      email,
      birthDay,
      setRadioGroup,
      profileImage,
      password,
    };
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex flex-grow xl:px-2 p-8 justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-[70.31rem] xl:w-11/12">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Hồ sơ cá nhân
        </h1>

        <div className="flex lg:flex-col flex-row gap-8">
          <ProfileImageSection
            profileImage={profileImage}
            handleImageChange={handleImageChange}
          />

          {/* Profile Details Form */}
          <div className="flex-grow">
            <div className="grid grid-cols-12 lg:grid-cols-1 gap-4 w-full">
              <UserInfoInput
                label="Tên người dùng"
                value={userName}
                setValue={setUserName}
                className="col-span-6 lg:col-span-12"
              />

              <UserInfoInput
                label="Số điện thoại"
                value={phone}
                setValue={setPhone}
                maskedValue={maskedPhone}
                onBlur={() => setMaskedPhone(maskPhone(phone))}
                onFocus={() => setMaskedPhone(phone)}
                className="col-span-6 lg:col-span-12 font-mono"
              />

              <UserInfoInput
                label="Email"
                value={email}
                setValue={setEmail}
                maskedValue={maskedEmail}
                onBlur={() => setMaskedEmail(maskEmail(email))}
                onFocus={() => setMaskedEmail(email)}
                className="col-span-12"
              />
            </div>

            {/* Date of Birth Selection */}
            <label className="font-medium mb-1">Ngày sinh</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <DateSelection
                labelOption="Ngày"
                value={birthDay.day}
                onChange={(day) => setBirthDay({ ...birthDay, day })}
                className="col-span-1"
                options={Array.from({ length: 31 }, (_, i) => i + 1)}
              />
              <DateSelection
                labelOption="Tháng"
                value={birthDay.month}
                onChange={(month) => setBirthDay({ ...birthDay, month })}
                className="col-span-1"
                options={Array.from({ length: 12 }, (_, i) => i + 1)}
              />
              <DateSelection
                labelOption="Năm"
                value={birthDay.year}
                onChange={(year) => setBirthDay({ ...birthDay, year })}
                className="col-span-1"
                options={Array.from({ length: 100 }, (_, i) => 2023 - i)}
              />
            </div>

            <GenderSelection
              radioGroup={radioGroup}
              setradioGroup={setRadioGroup}
            />

            <PasswordSection
              password={password}
              onChangePasswordClick={() => setShowChangePasswordModal(true)}
            />

            <Button label="Lưu thay đổi" className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800" onClick={handleSave} />
          </div>
        </div>

        {/* Change Password Modal */}
        {showChangePasswordModal && (
          <ChangePasswordModal
            onClose={() => setShowChangePasswordModal(false)}
            onPasswordChange={handlePasswordChange}
            oldPassword={password}
          />
        )}
      </div>
    </div>
  );
}
