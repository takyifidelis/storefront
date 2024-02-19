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

export interface AccountVerified {
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
