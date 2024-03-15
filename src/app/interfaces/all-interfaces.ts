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
// export interface SavedProducts {
//   code: string;
//   message: string;
//   type: string;
//   data: {
//     id: string;
//     name: string;
//     images: { [key: string]: string }[];
//     price: number;
//     discount: number;
//     variations: { [key: string]: string }[];
//     isActive: boolean;
//     category: string;
//     quantity: number;
//     storeProducts: { [key: string]: string };
//   }[];
// }

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

export interface Product{
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
    variations: {type: string, values: string[]}[];
    isActive: boolean;
    category: string;
    quantity: number;
    store: string;
    reStockLevel:number;
    rating:number;
  }[];
}

export interface SavedProducts{
code: string;
data: {
  category: string;
  discount: number;
  id: string;
  images: {url: string}[];
  isActive: boolean;
  name: string;
  price: number;
  quantity: number;
  storeProducts: {storeName: string;};
  variations: Varaiation[];
}[];
message: string;
type: string;
}

export interface Shop{
  code: string;
  data: {business: string;
  createdAt: string;
currency: string;
id: string;
storeName: string;
storeType: string;
template: {id: string;
options: string;
store: string;
};
updatedAt: string;
}[];
message: string;
type: string;
}

export interface SavedProducts{
code: string;
data: {
  category: string;
  discount: number;
  id: string;
  images: {url: string}[];
  isActive: boolean;
  name: string;
  price: number;
  quantity: number;
  storeProducts: {storeName: string;};
  variations: Varaiation[];
}[];
message: string;
type: string;
}

export interface Order{
code: string;
data: {amount: number;
createdA: string;
id: string;
items: {createdAt: string;
id: string;
image: string;
name: string;
order: string;
price: number;
product: string;
quantity: number;
total: number;
updatedAt: string;}[];
orderId: string;
orderShipping: {apartmentNo: string;
city: string;
countryCode: string;
customer: string;
id: string;
isActive: boolean;
name: string;
phone: string;
postalCode: string;
streetAddress: string;
};
paid: boolean;
status: string;
storeOrder: {
  businessStore: {
businessName: string;
  };
  storeName: string;
};
updatedAt: string;
}[];
message: string;
type: string;
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
