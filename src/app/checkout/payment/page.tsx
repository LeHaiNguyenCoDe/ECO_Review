"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CardPayment from "./components/CardPayment";
import CardProduct from "./components/CardProduct";
import { paymentMethods, inputFields, selectFields, validateInput } from "@/app/store/payment";
import { CiCircleCheck } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Logo from "@/public/icons/logo.svg"; 
import Logo_project from "@/public/icons/logo_project.svg";
import Voucher from "@/public/icons/voucher.svg";

type FormData = {
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  city: string;
  district: string;
  ward: string;
  houseNumber: string;
};

const PaymentPage: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitted } } = useForm<FormData>();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bankTransfer1");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submission:", data);
  };

  const shopData = [
    {
      shopInfo: { shopName: "Cửa hàng ABC", logo: Logo },
      products: [
        {
          id: 3,
          productName: "Sản phẩm XYZ",
          volume: "500ml",
          weight: "500g",
          type: "Loại 2",
          quantity: 1,
          price: "500.000 đ",
          productLogo: Logo_project,
        },
      ],
      voucher: { title: "Mã giảm giá đặc biệt", icon: Voucher },
    },
  ]

  return (
    <div className="p-6 rounded-lg shadow-md grid grid-cols-12 gap-6">
      <h2 className="col-span-12 text-xl font-semibold select-none hover:text-primary">
        Thanh toán
      </h2>

      <div className="col-span-8 lg:col-span-8 sm:col-span-12 mb-3">
        <CardPayment selectedMethod={selectedPaymentMethod} onMethodChange={setSelectedPaymentMethod} paymentMethods={paymentMethods} />
        <Card>
          <CardHeader className="pb-[1.25rem] pt-[1.25rem]  ">
            <CardTitle className="font-bold text-lg text-gray-800">Sản phẩm</CardTitle>
          </CardHeader>
          {shopData.map((shop, index) => (
            <CardProduct
              key={index}
              shopInfo={shop.shopInfo}
              products={shop.products}
              voucher={shop.voucher}
            />
          ))}
        </Card>
      </div>
      <div className="col-span-4 lg:col-span-12">
      <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="mb-3">
            <CardHeader>
              <CardTitle className="font-bold text-lg text-gray-800">Thông tin người nhận</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-12 gap-4">
                {inputFields.map(({ key, type, placeholder }) => (
                  <div key={key} className={`relative ${type === "email" ? "col-span-12" : "col-span-6"}`}>
                    <Input
                      type={type}
                      placeholder={placeholder}
                      {...register(key as keyof FormData, { validate: validateInput[key as keyof FormData] })}
                      className="h-[3.25rem]"
                    />
                    {isSubmitted && (
                      <CiCircleCheck
                        className={`absolute right-3 top-[1rem] ${errors[key as keyof FormData] ? "text-red-500" : "text-green-500"}`}
                        fontSize={25}
                      />
                    )}
                    {errors[key as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[key as keyof FormData]?.message}</p>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                {selectFields.map(({ key, options, placeholder }) => (
                  <div key={key} className="relative">
                    <Controller
                      name={key as keyof FormData}
                      control={control}
                      rules={{ validate: validateInput[key as keyof FormData] }}
                      render={({ field }) => (
                        <div className="relative">
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full h-[3.25rem] text-gray-500">
                              <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel className="text-gray-300">{placeholder}</SelectLabel>
                                {options.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />
                    {errors[key as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[key as keyof FormData]?.message}</p>}
                  </div>
                ))}
              </div>

              <div className="relative mt-4">
                <Textarea
                  placeholder="Số nhà..."
                  {...register("houseNumber", { validate: validateInput.houseNumber })}
                  className="h-[5.25rem]"
                />
                {isSubmitted && (
                  <CiCircleCheck
                    className={`absolute right-3 top-[1.25rem] ${errors.houseNumber ? "text-red-500" : "text-green-500"}`}
                    fontSize={25}
                  />
                )}
                {errors.houseNumber && <p className="text-red-500 text-xs mt-1">{errors.houseNumber?.message}</p>}
              </div>
            </CardContent>
          
          </Card>

          <Card>
            <CardContent className="mt-4">
            <div className="flex justify-between mb-3">
                  <span className="text-sm">Tạm tính</span>
                  <span className="text-sm">5.208.000 ₫</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm">Tổng giảm giá</span>
                  <span className="text-sm">-100.000 ₫</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tổng tiền</span>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-[#ffaa00] mb-3">5.152.000 ₫</span>
                    <span className="text-xs text-gray-500">(Đã bao gồm VAT nếu có)</span>
                  </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="bg-red-600 text-white text-center rounded-md px-3 py-2 w-full">
                Đặt hàng
              </Button>
            </CardFooter>
          </Card>
          </form>
        </div> 
      
    </div>
  );
};

export default PaymentPage;