export interface SignupResponseData {
  code: string;
  message: string;
  type: string;
  data?: {
    id: string;
    businessName: string;
    email: string;
    type: string;
    verified: boolean;
    isActive: boolean;
    mustChangePassword: boolean;
    canResetPassword: boolean;
    createdAt: string;
    updatedAt: string;
  };
  error?: {
    validation: string;
    message: string;
    path: string[];
  }[];
}

export interface ResetPasswordResponse {
  code: string;
  message: string;
  type: string;
  error?: {
    validation: string;
    message: string;
    path: string[];
  }[];
}

export interface AccountVerified {
  code: string;
  message: string;
  type: string;
  data: Data;
}

export interface ForgetPasswordResponse {
  code: string;
  message: string;
  type: string;
  data: Data;
}

export interface Data {
  id: string;
  businessName: string;
  email: string;
  type: string;
  verified: boolean;
  isActive: boolean;
  mustChangePassword: boolean;
  canResetPassword: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ReviewResponseData {
  id: string;
  replies: string[];
  productReview: {
    id: string;
    name: string;
    images: { url: string }[];
  };
  orderReview: {
    id: string;
    paid: boolean;
    orderId: string;
    status: string;
    currency: string;
    items: {
      name: string;
      image: string;
      price: number;
      total: number;
      discount: number;
      variations: any[];
      product: string;
    }[];
  };
  customerReview: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  rating: number;
  remarks: string;
  comment: string;
}


export interface ProductResponseData {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  quantity: number;
  reStockLevel: number;
  category: string;
  price: number;
  discount: number;
  promotion: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  store: string;
  variations: string;
  images: {
    url: string;
    id: string;
  }[];
  reviews: string;
  promotionProduct: string;
  rating: number;
}

