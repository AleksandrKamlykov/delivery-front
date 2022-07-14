export interface IProduct {
    name: string;
    description: string;
    id: number;
    image: string;
    price: number;
    count: number;
    category: string;
}

export interface IShop {
    id: number;
    name: string;
}

export interface IDiscount {
    precent: number;
    code: string;
}