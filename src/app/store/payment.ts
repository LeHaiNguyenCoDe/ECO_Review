export const paymentMethods = [
    {
      value: "COD",
      label: "Thanh toán tiền mặt (COD)",
    },
    {
      value: "bankTransfer1",
      label: "Chuyển khoản ngân hàng",
      accountInfo: [
        { name: "Cty TNHH DT TM và DV QT Eco-HHB", accountNumber: "152704073686868", bankBranch: "HD Bank chi nhánh Long Khánh, Đồng Nai" },
        { name: "Hồ Thị Hồng", accountNumber: "0908265127", bankBranch: "HD Bank chi nhánh Long Khánh, Đồng Nai" },
      ],
    },
  ];
  
  export const cities = [
    { value: "Hanoi", label: "Hà Nội" },
    { value: "HCM", label: "Hồ Chí Minh" },
  ];
  
  export const districts = [
    { value: "District1", label: "Quận 1" },
    { value: "District2", label: "Quận 2" },
  ];
  
  export const wards = [
    { value: "Ward1", label: "Phường 1" },
    { value: "Ward2", label: "Phường 2" },
  ];
  
  export const inputFields = [
    { key: "recipientName", placeholder: "Tên người nhận", type: "text" },
    { key: "recipientPhone", placeholder: "Số điện thoại", type: "text" },
    { key: "recipientEmail", placeholder: "Email", type: "email" },
  ];
  
  export const selectFields = [
    { key: "city", options: cities, placeholder: "Tỉnh thành" },
    { key: "district", options: districts, placeholder: "Quận/huyện" },
    { key: "ward", options: wards, placeholder: "Phường/xã" },
  ];
  
  export const validateInput = {
    recipientName: (value: string) => value.trim() ? true : "Recipient name is required.",
    recipientPhone: (value: string) => /^[0-9]{10,11}$/.test(value) || "Phone number must be 10-11 digits.",
    recipientEmail: (value: string) => /\S+@\S+\.\S+/.test(value) || "Please enter a valid email address.",
    city: (value: string) => value ? true : "City is required.",
    district: (value: string) => value ? true : "District is required.",
    ward: (value: string) => value ? true : "Ward is required.",
    houseNumber: (value: string) => value.trim() ? true : "House number is required.",
  };