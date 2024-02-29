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