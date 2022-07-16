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

export interface IOrder {
    name: string;
    phone: string;
    address: string;
    total: number;
    emai: string;
    discount: IDiscount;
    order: IProduct[];

}