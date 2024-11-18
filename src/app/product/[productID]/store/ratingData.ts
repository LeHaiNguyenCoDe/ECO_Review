import avatarIcon from "@/public/images/avatar-icon.png";
import { StaticImageData } from "next/image";

export interface Comment {
    id: number;
    avatar: StaticImageData;
    name: string;
    date: string;
    rate: number;
    comment: string;
    img: string[];
    brandsLogo: string;
    brandname: string;
    details: string;
}

export const ratingList: Comment[] = [
    {
        id: 1,
        avatar: avatarIcon,
        name: "Nguyễn Văn A",
        date: "2024-10-01",
        rate: 5,
        comment: "Hàng tốt, rất chắc chắn và đẹp !!",
        img: [
            "/images/product-detail.png",
            "/images/product-detail.png"
        ],
        brandsLogo: "/images/product-detail.png",
        brandname: "Thương hiệu A",
        details: "Cám ơn Anh/Chị đã ủng hộ shop, Phan Lê rất mong tiếp tục được phục vụ Anh/Chị ở những đơn hàng sau. Anh/Chị nhớ theo dõi để nhận được những chương trình khuyến mại hấp dẫn từ Phan Lê nhé. Chúc Anh/Chị luôn vui khỏe!"
    },
    {
        id: 2,
        avatar: avatarIcon,
        name: "Trần Thị B",
        date: "2024-10-02",
        rate: 4,
        comment: "Hàng tốt, rất chắc chắn và đẹp !!",
        img: [
            "/images/product-detail.png",
            "/images/product-detail.png"
        ],
        brandsLogo: "/images/product-detail.png",
        brandname: "Thương hiệu B",
        details: "Cám ơn Anh/Chị đã ủng hộ shop, Phan Lê rất mong tiếp tục được phục vụ Anh/Chị ở những đơn hàng sau. Anh/Chị nhớ theo dõi để nhận được những chương trình khuyến mại hấp dẫn từ Phan Lê nhé. Chúc Anh/Chị luôn vui khỏe!"
    },
    {
        id: 3,
        avatar: avatarIcon,
        name: "Lê Văn C",
        date: "2024-10-03",
        rate: 3,
        comment: "Hàng tốt, rất chắc chắn và đẹp !!",
        img: [
            "/images/product-detail.png",
            "/images/product-detail.png"
        ],
        brandsLogo: "/images/product-detail.png",
        brandname: "Thương hiệu C",
        details: "Cám ơn Anh/Chị đã ủng hộ shop, Phan Lê rất mong tiếp tục được phục vụ Anh/Chị ở những đơn hàng sau. Anh/Chị nhớ theo dõi để nhận được những chương trình khuyến mại hấp dẫn từ Phan Lê nhé. Chúc Anh/Chị luôn vui khỏe!"
    },
    {
        id: 4,
        avatar: avatarIcon,
        name: "Phạm Văn D",
        date: "2024-10-04",
        rate: 4,
        comment: "Hàng tốt, rất chắc chắn và đẹp !!",
        img: [
            "/images/product-detail.png",
            "/images/product-detail.png"
        ],
        brandsLogo: "/images/product-detail.png",
        brandname: "Thương hiệu D",
        details: "Cám ơn Anh/Chị đã ủng hộ shop, Phan Lê rất mong tiếp tục được phục vụ Anh/Chị ở những đơn hàng sau. Anh/Chị nhớ theo dõi để nhận được những chương trình khuyến mại hấp dẫn từ Phan Lê nhé. Chúc Anh/Chị luôn vui khỏe!"
    },
    {
        id: 5,
        avatar: avatarIcon,
        name: "Trương Thị E",
        date: "2024-10-05",
        rate: 5,
        comment: "Hàng tốt, rất chắc chắn và đẹp !!",
        img: [
            "/images/product-detail.png",
            "/images/product-detail.png"
        ],
        brandsLogo: "/images/product-detail.png",
        brandname: "Thương hiệu E",
        details: "Cám ơn Anh/Chị đã ủng hộ shop, Phan Lê rất mong tiếp tục được phục vụ Anh/Chị ở những đơn hàng sau. Anh/Chị nhớ theo dõi để nhận được những chương trình khuyến mại hấp dẫn từ Phan Lê nhé. Chúc Anh/Chị luôn vui khỏe!"
    },
    {
        id: 6,
        avatar: avatarIcon,
        name: "Trương Thị F",
        date: "2024-10-06",
        rate: 5,
        comment: "Hàng tốt, rất chắc chắn và đẹp !!",
        img: [
            "/images/product-detail.png",
            "/images/product-detail.png"
        ],
        brandsLogo: "/images/product-detail.png",
        brandname: "Thương hiệu E",
        details: "Cám ơn Anh/Chị đã ủng hộ shop, Phan Lê rất mong tiếp tục được phục vụ Anh/Chị ở những đơn hàng sau. Anh/Chị nhớ theo dõi để nhận được những chương trình khuyến mại hấp dẫn từ Phan Lê nhé. Chúc Anh/Chị luôn vui khỏe!"
    },
    {
        id: 7,
        avatar: avatarIcon,
        name: "Nguyễn Zăn 7",
        date: "2024-20-12",
        rate: 2,
        comment: "Hàng tốt, rất chắc chắn và đẹp !!",
        img: [
            "/images/product-detail.png",
            "/images/product-detail.png"
        ],
        brandsLogo: "/images/product-detail.png",
        brandname: "Thương hiệu E",
        details: "Cám ơn Anh/Chị đã ủng hộ shop, Phan Lê rất mong tiếp tục được phục vụ Anh/Chị ở những đơn hàng sau. Anh/Chị nhớ theo dõi để nhận được những chương trình khuyến mại hấp dẫn từ Phan Lê nhé. Chúc Anh/Chị luôn vui khỏe!"
    },
];
export interface filters {
    star:string;
}
export const filterbutton : filters[]= [
    {star: "Mới nhất"},
    {star: "1 sao"},
    {star: "2 sao"},
    {star: "3 sao"},
    {star: "4 sao"},
    {star: "5 sao"},
];

export const getRatingMessage = (rate: number): string => {
    if (rate === 5) return "Cực kì hài lòng";
    if (rate >= 4) return "Rất hài lòng";
    if (rate >= 3) return "Hài lòng";
    if (rate >= 2) return "Bình thường";
    return "Không hài lòng";
  
};

export const getAverageRating = (ratings: Comment[]): number => {
    let sum = 0;
    const count = ratings.length;

    if (count > 0) {
        ratings.forEach(rating => {
            sum += rating.rate;
        });
        return parseFloat((sum / count).toFixed(2));
    }

    return 0;
};

export const calculateRatingPercentages = (ratings: Comment[]) => {
    const totalCount = ratings.length;
    const ratingCounts = [0, 0, 0, 0, 0];

    ratings.forEach(rating => {
        if (rating.rate >= 1 && rating.rate <= 5) {
            ratingCounts[rating.rate - 1] += 1;
        }
    });

    const ratingPercentages = ratingCounts.map(count => {
        return totalCount > 0 ? ((count / totalCount) * 100).toFixed(0) : "0";
    });

    return ratingPercentages;
};

export const getLenghtDetals = (detail: Comment, maxLength: number) => {
    if (detail.details.length <= maxLength) {
        return { truncated: detail.details, isTruncated: false };
    }

    const truncatedDetail = detail.details.substring(0, maxLength) + '...';
    return { truncated: truncatedDetail, isTruncated: true };
};
