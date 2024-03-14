export interface UserCredentials {
  email: string;
  password: string;
}

export interface Response {
  code: string;
  message: string;
  type: string;
  data?: {
    [key: string]: any;
  };
}
export interface SavedProducts {
  code: string;
  message: string;
  type: string;
  data: {
    id: string;
    name: string;
    images: { [key: string]: string }[];
    price: number;
    discount: number;
    variations: { [key: string]: string }[];
    isActive: boolean;
    category: string;
    quantity: number;
    storeProducts: { [key: string]: string };
  }[];
}

export interface SingleProductResponseData {
  code:string;
  message:string;
  type:string;
  data:{
    id: string;
    name: string;
    deleted:boolean;
    description:string;
    promotion?:any
    promotionProduct?:any
    images: { id:string, url:string}[];
    price: number;
    discount: number;
    variations: { [key: string]: string }[];
    isActive: boolean;
    category: string;
    quantity: number;
    store: string;
    reStockLevel:number
    rating:number
  }
}
export interface ProductObject {
  products: string[];
}

export interface Varaiation {
  type: string;
  values: string[];
}

export interface merchantProduct {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  quantity: number;
  reStockLevel: number;
  category: string;
  price: number;
  discount: number;
  promotion?: null;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  store: string;
  variations: any[];
  images: { id: string; url: string }[];
  reviews: string[];
  promotionProduct: null;
  rating: number;
}

export interface UserInterface {
  checkbox: string;
  name: any;
  store: string;
  category: string;
  price: number;
  images: any;
  quantity: number;
  items: any;
  orderShipping: any;
  id: string;
  discount: number;
  storeProducts: { [key: string]: string };
}
