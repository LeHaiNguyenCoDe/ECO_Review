import React from "react";
import { Button } from "@/components/ui/button";
import { CiCircleCheck } from "react-icons/ci";

interface SendSuccessProps {
    onStoreSubmit: () => void;
}
const SendSuccess: React.FC<SendSuccessProps> = ({ onStoreSubmit }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
            <h2 className="text-2xl font-semibold text-green-700 text-center">
                Chúc mừng bạn đã tạo tài khoản thành công
            </h2>
            <p className="text-sm text-gray-600 text-center">
                Vui lòng cung cấp thông tin để tiến hành đăng bán sản phẩm
            </p>
            <div className="flex justify-center items-center mt-4">
                <CiCircleCheck className="text-green-700 size-20"/>
            </div>
            <Button
                onClick={onStoreSubmit}
                className="w-full bg-green-700 text-white hover:bg-green-800"
            >
                Đăng ký ngay
            </Button>
        </div>
    );
};

export default SendSuccess;