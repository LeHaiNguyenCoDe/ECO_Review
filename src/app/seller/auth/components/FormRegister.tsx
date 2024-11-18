import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash, FaPhoneAlt, FaUser } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, FieldErrors, UseFormRegister } from "react-hook-form";
import { validateUserInput, ValidationResult } from "../register/validate/validate";

interface RegisterFormInputs {
    identifier: string;
    username: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterFormProps {
    onSubmit: SubmitHandler<RegisterFormInputs>;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    errors: FieldErrors<RegisterFormInputs>;
    register: UseFormRegister<RegisterFormInputs>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, showPassword, togglePasswordVisibility }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const [validationErrors, setValidationErrors] = useState<ValidationResult['errors']>({});
    const existingUsers = [
        { username: 'existingUser', phoneNumber: '0123456789', identifier: 'user@example.com' },
      ];
    const handleFormSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
        const { username, phone, identifier, password, confirmPassword} = data;
        const result = validateUserInput(username, phone, identifier, password, confirmPassword, existingUsers);

        if (result.isValid) {
            onSubmit(data);
        } else {
            setValidationErrors(result.errors);
        }
    };
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="row flex gap-3">
                <div className="relative w-1/2">
                    <Input
                        id="username"
                        placeholder="Tên người dùng"
                        {...register("username", { required: "Vui lòng nhập tên người dùng" })}
                        className="pl-10 h-[3.25rem]"
                    />
                    <FaUser className="absolute left-3 top-[1.25rem] text-gray-500" />
                    {validationErrors.username && <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>}
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                </div>
                <div className="relative w-1/2">
                    <Input
                        id="phone"
                        placeholder="Số điện thoại"
                        {...register("phone", { required: "Vui lòng nhập số điện thoại" })}
                        className="pl-10 h-[3.25rem]"
                    />
                    <FaPhoneAlt className="absolute left-3 top-[1.25rem] text-gray-500" />
                    {validationErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{validationErrors.phoneNumber}</p>}
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
            </div>

            <div className="relative">
                <Input
                    id="identifier"
                    placeholder="Email"
                    {...register("identifier", { required: "Vui lòng nhập email" })}
                    className="pl-10 h-[3.25rem]"
                />
                <FiMail className="absolute left-3 top-[1.25rem] text-gray-500" />
                {validationErrors.identifier && <p className="text-red-500 text-xs mt-1">{validationErrors.identifier}</p>}
                {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>}
            </div>

            <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                    className="pl-10 h-[3.25rem]"
                />
                <FiLock className="absolute left-3 top-[1.25rem] text-gray-500" />
                {validationErrors.password && <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>}
                <div className="absolute right-3 top-[1.25rem] text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="relative mb-3">
                <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Xác nhận lại mật khẩu"
                    {...register("confirmPassword", { required: "Vui lòng xác nhận mật khẩu" })}
                    className="pl-10 h-[3.25rem]"
                />
                <FiLock className="absolute left-3 top-[1.25rem] text-gray-500" />
                {validationErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>}
                <div className="absolute right-3 top-[1.25rem] text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800">
                Tạo tài khoản
            </Button>
        </form>
    );
};

export default RegisterForm;
