export interface Order {
    id: number;
    shopName: string;
    orderId: string;
    status: string;
    productName: string;
    price: string;
    quantity: number;
    volume: string;
    weight: string;
    quality: string;
    imgSrc: string;
    statusText: string;
    totalPrice?: string;
    buttonText: string;
    orderStatus: string;
    buttonCancelPayment?: string;
  }
  
  export const ordersData: Order[] = [
    {
        id: 1,
        shopName: "Gia dụng Vinmart",
        orderId: "123",
        status: "shipping",
        productName: "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
        price: "1.736.000 đ",
        quantity: 2,
        volume: "200ml",
        weight: "200g",
        quality: "Loại 1",
        imgSrc: "https://via.placeholder.com/50",
        statusText: "Đơn hàng sẽ sớm được giao, vui lòng chờ điện thoại",
        totalPrice: "3.472.000 đ",
        buttonText: "Đã nhận hàng",
        orderStatus: "Chờ giao hàng",
      },
      {
        id: 2,
        shopName: "Gia dụng Vinmart",
        orderId: "124",
        status: "pending",
        productName: "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
        price: "1.736.000 đ",
        quantity: 2,
        volume: "200ml",
        weight: "200g",
        quality: "Loại 1",
        imgSrc: "https://via.placeholder.com/50",
        statusText: "Vui lòng thanh toán trước 12:00 ngày 20/12/2024",
        buttonText: "Thanh toán ngay",
        orderStatus: "Chờ thanh toán",
        buttonCancelPayment: "Huỷ thanh toán",
      },
      {
        id: 3,
        shopName: "Gia dụng Vinmart",
        orderId: "125",
        status: "processing",
        productName: "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
        price: "1.736.000 đ",
        quantity: 2,
        volume: "200ml",
        weight: "200g",
        quality: "Loại 1",
        imgSrc: "https://via.placeholder.com/50",
        statusText: "Người bán đang chuẩn bị đơn hàng",
        buttonText: "Đã nhận hàng",
        orderStatus: "Chờ lấy hàng",
      },
      {
        id: 4,
        shopName: "Gia dụng Vinmart",
        orderId: "126",
        status: "delivered",
        productName: "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
        price: "1.736.000 đ",
        quantity: 2,
        volume: "200ml",
        weight: "200g",
        quality: "Loại 1",
        imgSrc: "https://via.placeholder.com/50",
        statusText: "Giao hàng thành công",
        buttonText: "Đánh giá",
        orderStatus: "Đã giao",
      },
      {
        id: 5,
        shopName: "Gia dụng Vinmart",
        orderId: "127",
        status: "canceled",
        productName: "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
        price: "1.736.000 đ",
        quantity: 2,
        volume: "200ml",
        weight: "200g",
        quality: "Loại 1",
        imgSrc: "https://via.placeholder.com/50",
        statusText: "Người mua hủy đơn",
        buttonText: "Mua lại",
        orderStatus: "Đã hủy",
      },
      {
        id: 6,
        shopName: "Gia dụng Vinmart",
        orderId: "128",
        status: "returned",
        productName: "Nước mắm Vịnh Vân Phong (Chai du lịch mini)",
        price: "1.736.000 đ",
        quantity: 2,
        volume: "200ml",
        weight: "200g",
        quality: "Loại 1",
        imgSrc: "https://via.placeholder.com/50",
        statusText: "Đã hoàn tiền",
        buttonText: "Mua lại",
        orderStatus: "Trả hàng/Hoàn tiền",
      },
  ];
  