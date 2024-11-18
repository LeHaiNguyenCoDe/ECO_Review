export interface imagePartner {
    id: number;
    imgURL: string;
    imgWidth: number;
    imgHeight: number;
    link: string;
}

export const listItems: imagePartner[] = [
    {
        id: 1,
        imgURL: "/images/logo/BinhAn.png",
        imgWidth: 71.38,
        imgHeight: 80,
        link: "#",
    },
    {
        id: 2,
        imgURL: "/images/logo/AGRD.png",
        imgWidth: 90,
        imgHeight: 45,
        link: "#",
    },
    {
        id: 3,
        imgURL: "/images/logo/PLATEAU.png",
        imgWidth: 150,
        imgHeight: 52.94,
        link: "#",
    },
    {
        id: 4,
        imgURL: "/images/logo/DURICA.png",
        imgWidth: 85,
        imgHeight: 48,
        link: "#",
    },
    {
        id: 5,
        imgURL: "/images/logo/Farm.png",
        imgWidth: 90,
        imgHeight: 69.04,
        link: "#",
    },
    {
        id: 6,
        imgURL: "/images/logo/SOKFARM.png",
        imgWidth: 65,
        imgHeight: 65,
        link: "#",
    },
];

export interface categories {
    id: number;
    name: string;
}

export const categoryListItems: categories[] = [
    { id: 1, name: "Coffee" },
    { id: 2, name: "Phụ kiện" },
    { id: 3, name: "Rượu" },
    { id: 4, name: "Nước mắm" },
    { id: 5, name: "Trái cây" },
];