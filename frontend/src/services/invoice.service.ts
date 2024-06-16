import axios from "axios";
import { Invoice, ApiResponse } from "../types";

const API_URL = "http://localhost:5000/api/invoices/";

const createInvoice = async (invoiceData: Partial<Invoice>): Promise<ApiResponse<Invoice>> => {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/create`, invoiceData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

const getInvoices = async (): Promise<ApiResponse<Invoice[]>> => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

const approveInvoice = async (invoiceId: string): Promise<ApiResponse<Invoice>> => {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/approve`, { invoiceId }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

const markAsDelivered = async (orderId: string): Promise<ApiResponse<Invoice>> => {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/delivered`, { orderId }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export default {
    createInvoice,
    getInvoices,
    approveInvoice,
    markAsDelivered
}