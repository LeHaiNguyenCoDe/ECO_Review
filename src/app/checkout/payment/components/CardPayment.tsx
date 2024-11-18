"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CardTitle } from "@/components/ui/card"

interface AccountInfo {
  name: string;
  accountNumber: string;
  bankBranch: string;
}

interface PaymentMethod {
  value: string;
  label: string;
  accountInfo?: AccountInfo[];
}

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  paymentMethods: PaymentMethod[];
}

const AccountInfoSection: React.FC<{ accountInfo: AccountInfo[] }> = ({ accountInfo }) => (
  <div className="mt-6 flex gap-4 text-sm hg:grid-cols-2 md:grid">
    {accountInfo.map((info, index) => (
      <section key={index} className="flex-1 min-w-[300px] p-4 bg-gray-100 rounded-lg">
        <p className="font-semibold">{info.name}</p>
        <p>Số tài khoản: {info.accountNumber}</p>
        <p>Ngân hàng: {info.bankBranch}</p>
      </section>
    ))}
  </div>
);

const OrderInfo: React.FC<PaymentMethodProps> = ({ selectedMethod, onMethodChange, paymentMethods }) => {
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.value === selectedMethod
  );

  return (
    <section className="p-4 bg-white rounded-lg shadow-md mb-3">
      <CardTitle className="font-bold text-lg text-gray-800 mb-3">Phương thức thanh toán</CardTitle>
      <RadioGroup
        value={selectedMethod}
        onValueChange={onMethodChange}
        className="space-y-4 grid"
      >
        {paymentMethods.map(({ value, label }) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value}>{label}</Label>
          </div>
        ))}
      </RadioGroup>

      {selectedPaymentMethod?.accountInfo && (
        <AccountInfoSection accountInfo={selectedPaymentMethod.accountInfo} />
      )}
    </section>
  );
};

export default OrderInfo; 