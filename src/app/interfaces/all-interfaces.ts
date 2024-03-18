import { Observable } from "rxjs";

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
  code: string;
  message: string;
  type: string;
  data: {
    id: string;
    name: string;
    deleted: boolean;
    description: string;
    promotion?: any;
    promotionProduct?: any;
    images: { id: string; url: string }[];
    price: number;
    discount: number;
    variations: { [key: string]: string }[];
    isActive: boolean;
    category: string;
    quantity: number;
    store: string;
    reStockLevel: number;
    rating: number;
  };
}

export interface SavedProducts {
  code: string;
  data: {
    category: string;
    discount: number;
    id: string;
    images: { url: string }[];
    isActive: boolean;
    name: string;
    price: number;
    quantity: number;
    storeProducts: { storeName: string };
    variations: Varaiation[];
  }[];
  message: string;
  type: string;
}

export interface Shop {
  code: string;
  data: {
    business: string;
    createdAt: string;
    currency: string;
    id: string;
    storeName: string;
    storeType: string;
    template: { id: string; options: string; store: string };
    updatedAt: string;
  }[];
  message: string;
  type: string;
}

export interface SavedProducts {
  code: string;
  data: {
    category: string;
    discount: number;
    id: string;
    images: { url: string }[];
    isActive: boolean;
    name: string;
    price: number;
    quantity: number;
    storeProducts: { storeName: string };
    variations: Varaiation[];
  }[];
  message: string;
  type: string;
}

export interface Order {
  code: string;
  data: SingleCustomerOrder[];
  message: string;
  type: string;
}

export interface SingleCustomerOrder {
  amount: number;
  createdAt: string;
  id: string;
  items: {
    createdAt: string;
    id: string;
    image: string;
    name: string;
    order: string;
    price: number;
    product: string;
    quantity: number;
    total: number;
    updatedAt: string;
  }[];
  orderId: string;
  orderShipping: {
    apartmentNo: string;
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
}

export interface MerchantOrder {
  code: string;
  data: SingleOrder[];
  message: string;
  type: string;
}

export interface SingleOrder {
  amount: number;
  createdAt: string;
  currency: string;
  customerOrder: {
    customerAccount: {
      email: string;
    };
    firstName: string;
    lastName: string;
    phone: string;
  };
  id: string;
  items: {
    createdAt: string;
    discount: number;
    id: string;
    image: string;
    name: string;
    order: string;
    price: number;
    product: string;
    quantity: number;
    total: number;
    updatedAt: string;
  }[];
  orderId: string;
  orderShipping: {
    apartmentNo: string;
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
  updatedAt: string;
}

export interface Payout {
  code: string;
  data: {
    amount: number;
    commission: number;
    createdAt: string;
    currency: string;
    id: string;
    order: string;
    orderPayout: {
      amount: number;
      orderId: string;
    };
    payoutId: string;
    store: string;
    updatedAt: string;
    wallet: string;
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
export interface CustomerInfo {
  code: string;
  message: string;
  type: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string | number;
    account: string;
  };
}
export interface MerchantInfo {
  code: string;
  message: string;
  type: string;
  data: {
    id: string;
    businessName: string;
    businessType: string;
    account: string;
    stores?: { [key: string]: string }[];
  };
}
export interface MerchantInfo {
  id: string;
  businessName: string;
  businessType: string;
}

export interface PasswordResetData {
  code: string;
  data: {
      business: null;
      canResetPassword: boolean;
      createdAt: string;
      customer: string;
      email: string;
      id: string;
      isActive: boolean;
      mustChangePassword: boolean;
      type: string;
      updatedAt: string;
      verified: boolean;
  };
  message: string;
      type: string;
}


