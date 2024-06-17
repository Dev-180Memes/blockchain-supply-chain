import React, { useEffect, useState } from 'react';
import invoiceService from '../services/invoice.service';
import { Order } from '../types';
import OrderList from '../components/Order/OrderList';

const OrderPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await invoiceService.getOrders();
                // console.log(response.data.orders);
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders', error);
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    
  return (
    <div>
        <h1>Orders</h1>
        <OrderList orders={orders} />
    </div>
  )
}

export default OrderPage
