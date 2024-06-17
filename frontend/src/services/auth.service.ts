import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterData, ApiResponse, User } from '../types';

const API_URL = 'http://localhost:5000/api/auth/';

const login = async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await axios.post(`${API_URL}login`, credentials);
    return response;
}

const register = async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await axios.post(`${API_URL}register`, data);
    return response.data;
}

const getAllUsers = async(): Promise<ApiResponse<User[]>> => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    window.location.href = '/login';
}

export default {
    login,
    register,
    logout,
    getAllUsers
}