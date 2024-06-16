export interface User {
    _id: string;
    username: string;
    email: string;
    password? : string;
    role: 'buyer' | 'seller';
    walletAddress: string;
}

export interface Invoice {
    _id: string;
    invoiceNumber: string;
    buyer: User;
    seller: User;
    buyerWalletAddress: string;
    sellerWalletAddress: string;
    amount: number;
    status: 'pending' | 'approved' | 'paid' | 'delivered';
    productDetails: string;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    _id: string;
    orderId: string;
    invoice: Invoice;
    trackingId: string;
    status: 'shipped' | 'in transit' | 'delivered';
    deliveryDetails: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    message?: string;
    token?: string;
    userId?: string;
    role?: 'buyer' | 'seller';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    role: 'buyer' | 'seller';
    walletAddress: string;
}

export interface ApiResponse<T> {
    invoices?: Invoice[];
    data: T;
    message?: string;
}