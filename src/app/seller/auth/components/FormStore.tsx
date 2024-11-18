import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CiCircleQuestion } from "react-icons/ci";


interface RegisterStoreFormData {
  shopName: string;
  phoneNumber: string;
  email: string;
  city: string;
  district: string;
  ward: string;
  businessType: string;
  taxId?: string;
  cccd: string;
  nameCCCD: string;
  files?: File[];
}

interface AddressOption {
  value: string;
  label: string;
}

type OnInputChangeType = (field: keyof RegisterStoreFormData, value: string) => void;

interface RegisterStoreFormProps {
  formData: RegisterStoreFormData;
  onFormSubmit: (data: RegisterStoreFormData) => void;
  onInputChange: OnInputChangeType;
  addressOptions: {
    city: AddressOption[];
    district: AddressOption[];
    ward: AddressOption[];
  };
  onStoreSubmit: () => void;
}

const RegisterStoreForm: React.FC<RegisterStoreFormProps> = ({
  formData,
  onFormSubmit,
  onInputChange,
  addressOptions,
  onStoreSubmit,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterStoreFormData>();

  const [isAccepted, setIsAccepted] = useState(false);
  const [openField, setOpenField] = useState<string | null>(null);
  const [formDataCity, setFormDataCity] = useState({
    city: formData.city,
    district: formData.district,
    ward: formData.ward,
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFieldChange = (field: string, value: string) => {
    setFormDataCity((prev) => ({ ...prev, [field]: value }));
    onInputChange(field as keyof RegisterStoreFormData, value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImagePreviews: string[] = [...imagePreviews];
      const newUploadedFiles: File[] = [...uploadedFiles];

      Array.from(files)
        .slice(0, 2 - newImagePreviews.length)
        .forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              newImagePreviews.push(reader.result as string);
              newUploadedFiles.push(file);
              setImagePreviews([...newImagePreviews]);
              setUploadedFiles([...newUploadedFiles]);
            }
          };
          reader.readAsDataURL(file);
        });
    }
  };
  const onSubmit: SubmitHandler<RegisterStoreFormData> = (data) => {
    data.files = uploadedFiles;
    onFormSubmit(data);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto overflow-y-auto form-container">
        <div className="flex flex-col gap-3 full overflow-y-auto p-3">
          <div className="flex gap-2">
            {[{ label: "Tên Shop", field: "shopName", placeholder: "Tên Shop" }, { label: "Số điện thoại", field: "phoneNumber", placeholder: "Số điện thoại" }]
              .map(({ label, field, placeholder }) => (
                <div key={field} className="w-1/2">
                  <h5>{label}</h5>
                  <Input
                    placeholder={placeholder}
                    {...register(field as keyof RegisterStoreFormData, {
                      // required: "*",
                      onChange: (e) => onInputChange(field as keyof RegisterStoreFormData, e.target.value),
                    })}
                  />
                  {errors[field as keyof RegisterStoreFormData] && (
                    <span className="text-red-500">{errors[field as keyof RegisterStoreFormData]?.message}</span>
                  )}
                </div>
              ))}
          </div>

          <div>
            <h5>Email</h5>
            <Input
              placeholder="Email"
              type="email"
              value={formData.email}
              {...register("email", {
                required: "*",
                onChange: (e) => onInputChange("email", e.target.value),
              })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          <div>
            <h5>Địa chỉ lấy hàng</h5>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(addressOptions).map((field) => (
                <Popover key={field} open={openField === field} onOpenChange={() => setOpenField(field)}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                      {formDataCity[field as keyof typeof formDataCity] || `Chọn ${field}`}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-2/3 mx-auto">
                    <Command>
                      <CommandInput placeholder={`Tìm ${field}...`} />
                      <CommandList>
                        <CommandEmpty>Không tìm thấy</CommandEmpty>
                        <CommandGroup>
                          {addressOptions[field as keyof typeof addressOptions].map((option) => (
                            <CommandItem
                              key={option.value}
                              onSelect={() => {
                                handleFieldChange(field, option.value);
                                setOpenField(null);
                              }}
                            >
                              {option.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  formDataCity[field as keyof typeof formDataCity] === option.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>

          <div>
            <h5>Loại hình kinh doanh</h5>
            <RadioGroup
              value={formData.businessType}
              onValueChange={(value) => onInputChange("businessType", value)}
              className="flex justify-between"
            >
              {[{ value: "personal", label: "Cá nhân" }, { value: "household", label: "Hộ kinh doanh" }, { value: "company", label: "Công ty" }]
                .map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={value} />
                    <Label htmlFor={value}>{label}</Label>
                  </div>
                ))}
            </RadioGroup>
          </div>

          <div>
            <h5>Mã số thuế</h5>
            <Input
              placeholder="Nhập mã số thuế"
              value={formData.taxId || ""}
              {...register("taxId", {
                onChange: (e) => onInputChange("taxId", e.target.value),
              })}
            />
          </div>

          {["cccd", "nameCCCD"].map((field) => (
            <div key={field}>
              <h5>{field === "cccd" ? "Căn cước công dân (CCCD)" : "Họ & Tên"}</h5>
              <Input
                placeholder={field === "cccd" ? "Căn cước công dân (CCCD)" : "Nhập họ & tên"}
                value={typeof formData[field as keyof RegisterStoreFormData] === "string"
                  ? (formData[field as keyof RegisterStoreFormData] as string)
                  : ""}
                {...register(field as keyof RegisterStoreFormData, {
                  required: "*",
                  onChange: (e) => onInputChange(field as keyof RegisterStoreFormData, e.target.value),
                })}
              />
              {errors[field as keyof RegisterStoreFormData] && (
                <span className="text-red-500">{errors[field as keyof RegisterStoreFormData]?.message}</span>
              )}
            </div>
          ))}

          <div>
            <div className="flex gap-2">
              <h5>Hình ảnh của thẻ CCCD/Hộ chiếu</h5>
              <HoverCard>
                <HoverCardTrigger><CiCircleQuestion fontSize={20} /></HoverCardTrigger>
                <HoverCardContent>
                  Hình ảnh bao gồm mặt trước và mặt sau của CCCD/Hộ chiếu 
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="flex gap-2">
              <label htmlFor="image-upload" className="relative w-fit">
                <div
                  className="w-28 h-28 border-2 border-gray-400 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    backgroundImage: imagePreviews[0] ? `url(${imagePreviews[0]})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!imagePreviews[0] && (
                    <span className="text-gray-500 text-sm">
                      +<br />Thêm hình ảnh<br />(0/2)
                    </span>
                  )}
                </div>
              </label>
              {imagePreviews[0] && (
                <label htmlFor="image-upload" className="relative w-fit">
                  <div
                    className="w-28 h-28 border-2 border-gray-400 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer"
                    style={{
                      backgroundImage: imagePreviews[1] ? `url(${imagePreviews[1]})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!imagePreviews[1] && (
                      <span className="text-gray-500 text-sm">
                        +<br />Thêm hình ảnh<br />(1/2)
                      </span>
                    )}
                  </div>
                </label>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onClick={() => setIsAccepted((prev) => !prev)} />
            <label htmlFor="terms" className="text-sm font-medium">
              Tôi xác nhận những thông tin được cung cấp ở trên là hoàn toàn chính xác
            </label>
          </div>

          <Button
            onClick={onStoreSubmit}
            type="submit"
            className="w-full bg-green-700 text-white hover:bg-green-800"
            disabled={!isAccepted}
          >
            Đăng ký
          </Button>
        </div>
      </form>
  );
};

export default RegisterStoreForm;
