import React from "react";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterStoreInputs {
    storeName: string;
    storeAddress: string;
    storePhone: string;
}

const RegisterStore: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterStoreInputs>();

    const onSubmit: SubmitHandler<RegisterStoreInputs> = (data) => {
        console.log("Store Registration Data:", data);
        // Handle store registration logic here
    };

    return (
        <div className="flex items-center justify-center min-h-[35rem] bg-transparent p-2 h-full md:h-fit md:min-h-[20rem] md:w-screen w-full">
            <div className="w-full max-w-[60rem] flex p-0 rounded-md shadow-lg bg-white">
                <div className="grid content-center flex-col sm:w-full p-6 space-y-4 w-3/5">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-green-700 md:text-center">
                            Đăng ký gian hàng
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <input
                                id="storeName"
                                placeholder="Tên gian hàng"
                                {...register("storeName", { required: "Vui lòng nhập tên gian hàng" })}
                                className="pl-10 h-[3.25rem] w-full border border-gray-300 rounded-md"
                            />
                            {errors.storeName && <p className="text-red-500 text-xs mt-1">{errors.storeName.message}</p>}
                        </div>
                        <div className="relative">
                            <input
                                id="storeAddress"
                                placeholder="Địa chỉ gian hàng"
                                {...register("storeAddress", { required: "Vui lòng nhập địa chỉ gian hàng" })}
                                className="pl-10 h-[3.25rem] w-full border border-gray-300 rounded-md"
                            />
                            {errors.storeAddress && <p className="text-red-500 text-xs mt-1">{errors.storeAddress.message}</p>}
                        </div>
                        <div className="relative">
                            <input
                                id="storePhone"
                                placeholder="Số điện thoại gian hàng"
                                {...register("storePhone", { required: "Vui lòng nhập số điện thoại gian hàng" })}
                                className="pl-10 h-[3.25rem] w-full border border-gray-300 rounded-md"
                            />
                            {errors.storePhone && <p className="text-red-500 text-xs mt-1">{errors.storePhone.message}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800">
                            Đăng ký
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterStore;