import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash, FaPhoneAlt, FaUser } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface RegisterDialogContentProps {
  onClose: () => void;
  onRegisterSuccess: (name: string) => void;
}

interface RegisterFormInputs {
  identifier: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp?: string[];
}

const RegisterDialogContent: React.FC<RegisterDialogContentProps> = ({ onClose, onRegisterSuccess }) => {
  const [view, setView] = useState<"register" | "forgotPassword" | "sendWithSMS" | "otpVerification">("register");
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();

  const otp = watch("otp") || [];

  useEffect(() => {
    if (view === "otpVerification" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [view, countdown]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onVerify: SubmitHandler<RegisterFormInputs> = (data) => {
    if (view === "register") {
      if (data.username && data.phone && data.identifier && data.password && data.confirmPassword) {
        setSuccessMessage(`Số điện thoại ${data.phone} đã có tài khoản. Vui lòng xác thực để đăng nhập`);
        setView("otpVerification");
        setCountdown(30);
      }
    } 
  };
  
  const isOtpComplete = otp.length === 6 && otp.every((val) => val !== "");

  return (
      <DialogContent className="w-full max-w-[50rem] flex p-0 rounded-md">
        <div className="flex flex-col items-center justify-center visible md:hidden">
          <img src="/images/logo.png" alt="Logo" className="h-full rounded-md" />
        </div>

        <div className="grid content-center flex-col w-[88rem] sm:w-full p-6 space-y-4">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-green-700 md:text-center">
            {view === "otpVerification" ? "Xác thực OTP" : "Đăng ký"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onVerify)} className="space-y-4">
          {!successMessage && (
            <>
              {/* Username and Phone Inputs */}
              <div className="row flex gap-3">
                <div className="relative w-1/2">
                  <Input
                    id="username"
                    placeholder="Tên người dùng"
                    {...register("username", { required: "Vui lòng nhập tên người dùng" })}
                    className="pl-10 h-[3.25rem]"
                  />
                  <FaUser className="absolute left-3 top-[1.25rem] text-gray-500" />
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
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Identifier Input */}
              <div className="relative">
                <Input
                  id="identifier"
                  placeholder="Email hoặc số điện thoại"
                  {...register("identifier", { required: "Vui lòng nhập email hoặc số điện thoại" })}
                  className="pl-10 h-[3.25rem]"
                />
                <FiMail className="absolute left-3 top-[1.25rem] text-gray-500" />
                {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>}
              </div>

              {/* Password Inputs */}
              {view === "register" && (
                <>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu"
                      {...register("password", { required: "Vui lòng nhập mật khẩu" })}
                      className="pl-10 h-[3.25rem]"
                    />
                    <FiLock className="absolute left-3 top-[1.25rem] text-gray-500" />
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
                    <div className="absolute right-3 top-[1.25rem] text-gray-500 cursor-pointer" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                  </div>
                </>
              )}
            </>
          )}

          <DialogFooter className="flex flex-col items-center mt-4 space-y-2">
            {!successMessage && (
              <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800">
                {view === "sendWithSMS" ? "Gửi mã" : "Tạo tài khoản"}
              </Button>
            )}

            {successMessage && view === "otpVerification" && (
              <div className="grid justify-items-center">
                <p className="text-center mb-4 flex items-center">{successMessage}</p>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot key={index} index={index} {...register(`otp.${index}`, { required: "Vui lòng nhập mã OTP" })} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {errors.otp && <p className="text-red-500 text-xs mt-3 mb-3">{errors.otp.message}</p>}
                <p className="text-sm text-gray-500 mb-3 mt-3">Mã hết hạn sau: {countdown} giây</p>
                <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800" disabled={!isOtpComplete}>
                  Tiếp tục
                </Button>
              </div>
            )}
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  );
};

export default RegisterDialogContent;
