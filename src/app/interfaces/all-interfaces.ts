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

export interface ProductObject {
  products: string[];
}

export interface Varaiation {
  type: string;
  values: string[];
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
}
