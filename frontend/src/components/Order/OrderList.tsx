import React from 'react';
import { Order } from '../../types';
import OrderItem from './OrderItem';

interface OrderListProps {
    orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div>
        {orders.length === 0 ? (
            <p>No orders found</p>
        ) : (
            <ul>
                {orders.map((order) => (
                    <OrderItem key={order._id} order={order} />
                ))}
            </ul>
        )}
    </div>
  );
};

export default OrderList;
