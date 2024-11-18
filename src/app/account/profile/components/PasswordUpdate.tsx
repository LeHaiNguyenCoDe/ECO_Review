import React, { useState, useEffect } from "react";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import Input from "@/components/elements/CustomizableInput";

interface ChangePasswordModalProps {
  onClose: () => void;
  onPasswordChange: (newPassword: string) => void;
  oldPassword: string; // Pass the old password from the parent component
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onClose,
  onPasswordChange,
  oldPassword,
}) => {
  const [passwordData, setPasswordData] = useState({
    enteredOldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordValidated, setPasswordValidated] = useState(false);

  // Real-time password validation for the old password
  useEffect(() => {
    if (passwordData.enteredOldPassword === oldPassword) {
      setPasswordValidated(true);
      setErrors((prev) => ({ ...prev, oldPassword: "" }));
    } else {
      setPasswordValidated(false);
    }
  }, [passwordData.enteredOldPassword, oldPassword]);

  const handleConfirm = () => {
    const newErrors = { oldPassword: "", newPassword: "", confirmPassword: "" };

    // Validate new password length
    if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự.";
    }

    // Validate confirmed password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không khớp với mật khẩu mới.";
    }

    // Only proceed if there are no errors
    if (!newErrors.newPassword && !newErrors.confirmPassword) {
      onPasswordChange(passwordData.newPassword);
      onClose();
    }

    setErrors(newErrors);
  };

  const handleInputChange = (
    field: "enteredOldPassword" | "newPassword" | "confirmPassword",
    value: string
  ) => {
    setPasswordData((prevData) => ({ ...prevData, [field]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setPasswordVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const renderPasswordInput = (
    placeholder: string,
    value: string,
    field: "enteredOldPassword" | "newPassword" | "confirmPassword",
    visibleField: "old" | "new" | "confirm",
    error: string,
    isDisabled: boolean = false
  ) => (
    <div className="mb-4 relative">
      <FaLock className="absolute left-3 top-[1.5rem] transform -translate-y-1/2 text-gray-400 z-10" />
      <Input
        type={passwordVisible[visibleField] ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={`border rounded-md p-3 pl-10 w-full ${
          error ? "border-red-500" : "border-gray-300"
        } ${isDisabled ? "bg-gray-100 cursor-not-allowed" : ""}`} 
        disabled={isDisabled}
        showErrorIcon={false}
      />
      <span
        onClick={() => togglePasswordVisibility(visibleField)}
        className={`absolute right-3 top-[1.5rem] transform -translate-y-1/2 cursor-pointer text-gray-400 z-10 ${
          isDisabled ? "pointer-events-none" : ""
        }`} // Disable icon click when field is disabled
      >
        {passwordVisible[visibleField] ? <FaEyeSlash /> : <FaEye />}
      </span>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 md:px-2">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[25rem]">
        <h2 className="text-lg font-bold mb-4 text-center">Đổi mật khẩu</h2>

        {/* Old Password Validation Step */}
        {renderPasswordInput(
          "Nhập lại mật khẩu để xác minh",
          passwordData.enteredOldPassword,
          "enteredOldPassword",
          "old",
          errors.oldPassword
        )}

        {/* Success Message */}
        {passwordValidated && (
          <div className="mb-4 flex items-center text-green-700">
            <FaCheckCircle className="mr-2" />
            <p>Xác minh mật khẩu thành công</p>
          </div>
        )}

        {/* New Password */}
        {renderPasswordInput(
          "Nhập mật khẩu mới",
          passwordData.newPassword,
          "newPassword",
          "new",
          errors.newPassword,
          !passwordValidated
        )}

        {/* Confirm Password */}
        {renderPasswordInput(
          "Xác nhận mật khẩu",
          passwordData.confirmPassword,
          "confirmPassword",
          "confirm",
          errors.confirmPassword,
          !passwordValidated 
        )}

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            className="bg-white border border-green-700 text-green-700 py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Trở lại
          </button>
          <button
            className={`bg-green-700 text-white py-2 px-4 rounded-md ${
              !passwordValidated ? "opacity-50 cursor-not-allowed" : ""
            }`} 
            onClick={handleConfirm}
            disabled={!passwordValidated} 
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
