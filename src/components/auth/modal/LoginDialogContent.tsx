import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TfiFacebook } from "react-icons/tfi";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiCircleCheck } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface LoginDialogContentProps {
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

interface LoginFormInputs {
  identifier: string;
  password?: string;
  otp?: string[];
}

const LoginDialogContent: React.FC<LoginDialogContentProps> = ({ onClose, onLoginSuccess }) => {
  const [view, setView] = useState<"login" | "forgotPassword" | "loginWithSMS" | "otpVerification" | "register">("login");
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  
  useEffect(() => {
    if (view === "otpVerification" && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [view, countdown]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    if (view === "forgotPassword") {
      const { identifier } = data;
      setSuccessMessage(`Link lấy lại mật khẩu vừa được gửi qua ${identifier}, vui lòng kiểm tra tin nhắn hoặc gmail đã nhập`);
    } else if (view === "loginWithSMS") {
      const { identifier } = data;
      setSuccessMessage(`Số điện thoại ${identifier} đã có tài khoản. Vui lòng xác thực để đăng nhập`);
      setView("otpVerification");
      setCountdown(30);
    } else if (view === "otpVerification") {
      console.log("OTP Data:", data.otp);
      onClose();
    } else {
      console.log("Form Data:", data);
      onLoginSuccess(data.identifier); // Call the login success callback with the user's name
      onClose(); // Close the dialog
    }
  };

  return (
    <DialogContent className="w-full max-w-[50rem] flex p-0 rounded-md">
      <div className="flex flex-col items-center justify-center visible md:hidden">
        <img src="/images/logo.png" alt="Logo" className="h-full rounded-md" />
      </div>

      <div className="row content-center flex-col w-[88rem] sm:w-full p-6 space-y-4">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-green-700 md:text-center">
            {view === "forgotPassword" ? "Quên mật khẩu" : view === "loginWithSMS" ? "Đăng nhập với SMS" : view === "otpVerification" ? "Xác thực OTP" : "Đăng nhập"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!successMessage && (
            <>
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
              {view === "login" && (
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
              )}

              <div className="flex justify-between text-sm text-gray-500 mt-2">
                {view === "login" && !successMessage && (
                  <>
                    <a href="#" onClick={() => setView("forgotPassword")} className="hover:underline">Quên mật khẩu</a>
                    <a href="#" onClick={() => setView("loginWithSMS")} className="hover:underline">Đăng nhập với SMS</a>
                  </>
                )}
              </div>
            </>
          )}
          
          {!successMessage && (
              <div className="w-full">
                <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800">
                  {view === "forgotPassword" ? "Gửi yêu cầu" : view === "loginWithSMS" ? "Gửi mã" : "Đăng nhập"}
                </Button>
              </div>
             
            )}
            {successMessage && (
              <div className="grid justify-items-center">
                <p className="text-center mb-4 flex items-center">
                  {successMessage}
                </p>
                {view === "forgotPassword" && (
                  <>
                    <CiCircleCheck className="mr-2 text-green-700 mb-3" fontSize={120} />
                    <Button
                      onClick={() => {
                        setSuccessMessage("");
                        setView("login");
                      }}
                      className="w-full bg-green-700 text-white hover:bg-green-800"
                    >
                      Quay lại
                    </Button>
                  </>
                )}
                {view === "otpVerification" && (
                  <>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} {...register(`otp.0`, { required: "Vui lòng nhập mã OTP" })} />
                        <InputOTPSlot index={1} {...register(`otp.1`, { required: "Vui lòng nhập mã OTP" })} />
                        <InputOTPSlot index={2} {...register(`otp.2`, { required: "Vui lòng nhập mã OTP" })} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} {...register(`otp.3`, { required: "Vui lòng nhập mã OTP" })} />
                        <InputOTPSlot index={4} {...register(`otp.4`, { required: "Vui lòng nhập mã OTP" })} />
                        <InputOTPSlot index={5} {...register(`otp.5`, { required: "Vui lòng nhập mã OTP" })} />
                      </InputOTPGroup>
                    </InputOTP>
                    {errors.otp && <p className="text-red-500 text-xs mt-3 mb-3">{errors.otp.message}</p>}
                    <p className="text-sm text-gray-500 mb-3 mt-3">Mã hết hạn sau: {countdown} giây</p>
                    <Button
                      onClick={() => {
                        setSuccessMessage("");
                        setView("login");
                      }}
                      className="w-full bg-green-700 text-white hover:bg-green-800"
                    >
                      Quay lại
                    </Button>
                    <div className="flex justify-center mt-6 text-sm text-center">
                      <p className="text-gray-500">
                        Hoặc <a href="#" className="text-green-700 font-medium">Gửi mã qua email</a>
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
            {view === "login" && !successMessage && (
              <>
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
                  Bạn chưa có tài khoản? 
                  <a 
                    href="#" 
                    className="text-green-700 font-medium hover:underline" 
                    onClick={() => setView("register")}
                  >
                    {" "}
                    Tạo tài khoản
                  </a>
                </p>
              </div>
              </>
            )}
          {/* <DialogFooter className="flex-col mt-4 space-y-2 md:flow-root md:w-full md:grid md:grid-col">
            
          </DialogFooter> */}
        </form>
      </div>
    </DialogContent>
  );
};

export default LoginDialogContent;