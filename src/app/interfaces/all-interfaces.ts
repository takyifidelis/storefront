export interface UserCredentials {
    email: string;
    password: string;
}

export interface Response {
    code: string,
    message: string,
    type: string,
    data?: {
        [key: string]: any;
      }
}

export interface ProductObject {
    products: string[];
}

export interface Varaiation {
type: string,
values: string[]
}

export interface merchantProduct{
    id: string,
    name: string,
    description: string,
    isActive: boolean,
    quantity: number,
    reStockLevel: number,
    category: string,
    price: number,
    discount: number,
    promotion?: null,
    deleted: boolean,
    createdAt: string,
    updatedAt: string,
    store: string,
    variations: any[],
    images: {id:string, url:string}[],
    reviews: string[],
    promotionProduct: null,
    rating: number
}