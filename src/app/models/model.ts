export interface LoginDetails {
    userEmail: string;
    password: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface BookViewModel {
    id: number;
    name: string;
    author: string;
    price: number;
}

export interface UserRegistration {
    name: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}