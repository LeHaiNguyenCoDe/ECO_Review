"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import RegisterForm from "@/app/seller/auth/components/FormRegister";
import OtpVerification from "@/app/seller/auth/components/OtpVerification";
import SendSuccess from "@/app/seller/auth/components/SendSuccess";
import RegisterStoreForm from "@/app/seller/auth/components/FormStore";
import { TfiFacebook } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";

interface RegisterFormInputs {
  identifier: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp?: string[];
}

const Register: React.FC = () => {
  const [view, setView] = useState<"register" | "otpVerification" | "sendWithSMS" | "sendSuccess" | "registerStore">("register");
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState: { errors }, setValue } = useForm<RegisterFormInputs>();
  const [isOtpComplete, setIsOtpComplete] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [otpValue, setOtpValue] = useState<string>('');
  const [formData, setFormData] = useState({
    shopName: "",
    phoneNumber: "",
    email: "",
    city: "",
    district: "",
    ward: "",
    businessType: "",
    taxId: "",
    cccd: "",
    nameCCCD: "",
    files: [],
  });

  const mockOtp = ("123456");
  useEffect(() => {
    if (view === "otpVerification" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [view, countdown]);

  useEffect(() => {
    setValue("otp", otp);
  }, [otp, setValue]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const onVerify: SubmitHandler<RegisterFormInputs> = (data) => {
    if (view === "register") {
      if (data.username && data.phone && data.identifier && data.password && data.confirmPassword) {
        setSuccessMessage(`Số điện thoại ${data.phone} đã có tài khoản. Vui lòng xác thực để đăng nhập`);
        setView("otpVerification");
        setCountdown(30); // Reset countdown
      }
    }
  };

  // Handle OTP input change
  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setIsOtpComplete(updatedOtp.every((digit) => digit !== ''));
  };

  // Handle OTP submission and validation
  const handleOtpSubmit = () => {
    if (JSON.stringify(otpValue) === JSON.stringify(mockOtp)) {
      setView("sendSuccess");
    } else {
      setSuccessMessage("Mã OTP không đúng, vui lòng thử lại.");
    }
  };

  const onStoreSubmit = () => {
    setView("registerStore");
  };

  const handleFormSubmit = () => {
    console.log("Store Registration Data:", formData);
  };

  const addressOptions = {
    city: [
      { value: "hanoi", label: "Hà Nội" },
      { value: "hochiminh", label: "Hồ Chí Minh" },
      { value: "danang", label: "Đà Nẵng" },
    ],
    district: [
      { value: "district1", label: "Quận 1" },
      { value: "district2", label: "Quận 2" },
    ],
    ward: [
      { value: "ward1", label: "Phường 1" },
      { value: "ward2", label: "Phường 2" },
    ],
  };
  
  const handleStoreSubmit = () => {
    console.log("Store form submitted!");
  };
  return (
    <div className="flex items-center justify-center max-h-[40rem] min-h-[35rem] bg-transparent p-2 h-full md:h-fit md:min-h-[20rem] md:w-screen w-full">
      <div className={`w-full ${view === "sendSuccess" ? "max-w-[60rem] min-h-[35rem]" : "max-w-[60rem]"} max-h-[38rem] flex p-0 rounded-md shadow-lg bg-white`}>
        <div className="flex flex-col items-center justify-center visible md:hidden w-2/5">
          {view === "sendSuccess" || view ==="registerStore" ? (
            <img src="/images/avatar-seller.png" alt="Avatar" className="h-full w-full rounded-md" />
          ) : (
            <img src="/images/logo.png" alt="Logo" className="h-full w-full rounded-md" />
          )}
        </div>

        <div className={`grid content-center flex-col sm:w-full p-6 space-y-4 w-3/5 ${view === "registerStore"?"p-3":""}`}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-700 md:text-center">
              {view === "otpVerification" ? "Xác thực OTP" : view === "registerStore" ? "Đăng ký gian hàng" : "Đăng ký"}
            </h2>
          </div>

          {view === "sendSuccess" && (
            <SendSuccess
              onStoreSubmit={onStoreSubmit}
            />
          )}

          {view === "register" && (
            <RegisterForm
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              errors={errors}
              register={register}
              onSubmit={onVerify}
            />
          )}

          {view === "otpVerification" && (
            <OtpVerification
              otp={otp}
              handleOtpChange={handleOtpChange}
              countdown={countdown}
              onOtpSubmit={handleOtpSubmit}
              isOtpComplete={isOtpComplete}
              successMessage={successMessage}
              otpValue={otpValue}
              onOtpChange={setOtpValue}
            />
          )}

          {view === "registerStore" && (
            <RegisterStoreForm
              formData={formData}
              onFormSubmit={handleFormSubmit}
              onInputChange={(field, value) =>
                setFormData((prev) => ({ ...prev, [field]: value }))
              }
              addressOptions={addressOptions}
              onStoreSubmit={handleStoreSubmit}
            />
          )}

          {view === "register" && !successMessage && (
            <div className="text-center">
              <div className="flex items-center mb-3">
                <hr className="flex-grow border-t border-gray-300" />
                <p className="mx-2 text-sm text-gray-500">Hoặc tiếp tục bằng</p>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="flex space-x-4 justify-center">
                <Button variant="outline" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 w-20 h-10">
                  <TfiFacebook className="text-white" />
                </Button>
                <Button variant="outline" className="flex items-center space-x-2 w-20 h-10">
                  <FcGoogle className="text-red-500" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Bạn đã có tài khoản ?{"/"}
                <Link href={"/seller/auth/login"} className="text-green-700 font-medium hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;