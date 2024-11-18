import React from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OtpVerificationProps {
    otp: string[];
    handleOtpChange: (value: string, index: number) => void;
    countdown: number;
    onOtpSubmit: () => void;
    isOtpComplete: boolean;
    successMessage: string;
    otpValue: string;
    onOtpChange: (value: string) => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
    otpValue,
    onOtpChange,
    countdown,
    onOtpSubmit,
    successMessage,
}) => {
    // Handle OTP input change
    const handleOtpInputChange = (value: string) => {
        if (!isNaN(Number(value)) || value === "") {
            onOtpChange(value);
        }
    };

    // Check if OTP value has the correct length (6 characters)
    const isOtpLengthValid = otpValue.length === 6;

    return (
        <div className="grid justify-items-center">
            <p className="text-center mb-4 flex items-center">{successMessage}</p>
            <div className="space-y-2">
                <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={handleOtpInputChange}
                >
                    <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot
                                key={index}
                                index={index}
                                onChange={(e) => handleOtpInputChange((e.target as HTMLInputElement).value)}
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm">
                    {otpValue === "" ? (
                        <>Enter your one-time password.</>
                    ) : (
                        <>You entered: {otpValue}</>
                    )}
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-3 mt-3">Mã hết hạn sau: {countdown} giây</p>
            <Button
                onClick={onOtpSubmit}
                className="w-full bg-green-700 text-white hover:bg-green-800"
                disabled={!isOtpLengthValid}
            >
                Tiếp tục
            </Button>
        </div>
    );
};

export default OtpVerification;
