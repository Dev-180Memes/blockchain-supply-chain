import React from 'react';
import { Order } from '../../types';
import invoiceService from '../../services/invoice.service';
import Button from '../App/Button/Button';

interface OrderItemProps {
    order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
    const role = localStorage.getItem('role');

    const handleMarkAsDelivered = async () => {
        try {
            await invoiceService.markAsDelivered(order._id);
            alert('Order marked as delivered');
            window.location.reload();
        } catch (error) {
            console.error('Error marking order as delivered:', error);
            alert('Failed to mark order as delivered. Please try again later.');
        }
    }

    const handleMarkInTransit = async () => {
        try {
            await invoiceService.markInTransit(order._id);
            alert('Order marked as in transit');
            window.location.reload();
        } catch (error) {
            console.error('Error marking order as in transit:', error);
            alert('Failed to mark order as in transit. Please try again later.');
        }
    }

  return (
    <li>
        <p>Order ID: {order.orderId}</p>
        <p>Invoice Number: {order.invoice.invoiceNumber}</p>
        <p>Tracking ID: {order.trackingId}</p>
        <p>Status: {order.status}</p>
        <p>Delivery Details: {order.deliveryDetails}</p>
        {role === 'seller' && order.status === 'shipped' && (
            <Button onClick={handleMarkInTransit} text='Mark as In Transit' />
        )}
        {role === 'buyer' && order.status === 'in transit' && (
            <Button onClick={handleMarkAsDelivered} text='Mark as Delivered' />
        )}
    </li>
  )
}

export default OrderItem
