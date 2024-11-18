export interface filterdata {
    id: number;
    name: string;
}

// Filter items for general categories
export const filterItems: filterdata[] = [
    { id: 1, name: "Giá" },
    { id: 2, name: "Loại" },
    { id: 3, name: "Thương hiệu" },
    { id: 4, name: "Khối lượng" },
];

// Sorting items for price ranges
export const sortingItemsPrice: filterdata[] = [
    { id: 1, name: "0-100.000đ" },
    { id: 2, name: "100.000-200.000đ" },
    { id: 3, name: "200.000-500.000đ" },
    { id: 4, name: "500.000đ trở lên" },
];

// Sorting items for types
export const sortingItemsType: filterdata[] = [
    { id: 1, name: "Loại A" },
    { id: 2, name: "Loại B" },
    { id: 3, name: "Loại C" },
];

// Sorting items for brands
export const sortingItemsBrand: filterdata[] = [
    { id: 1, name: "Thương hiệu X" },
    { id: 2, name: "Thương hiệu Y" },
    { id: 3, name: "Thương hiệu Z" },
];

// Sorting items for weight
export const sortingItemsWeight: filterdata[] = [
    { id: 1, name: "Dưới 1kg" },
    { id: 2, name: "1-2kg" },
    { id: 3, name: "2-5kg" },
    { id: 4, name: "Trên 5kg" },
];

export interface numPages {
    id: number;
    name: string;
}

export const numPages: numPages[] = [
    { id: 1, name: "<" },
    { id: 2, name: "1" },
    { id: 3, name: "2" },
    { id: 4, name: "3" },
    { id: 5, name: "4" },
    { id: 6, name: ">" },
];