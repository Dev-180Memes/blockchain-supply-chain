import React from 'react';
import { Invoice } from '../../types';
import invoiceService from '../../services/invoice.service';

interface InvoiceItemProps {
    invoice: Invoice;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice }) => {
    const role = localStorage.getItem('role');

    const handleApprove = async () => {
        try {
            await invoiceService.approveInvoice(invoice._id);
            alert('Invoice approved successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error approving invoice:', error);
            alert('Failed to approve invoice. Please try again later.');
        }
    };

  return (
    <li>
        <p>Invoice Number: {invoice.invoiceNumber}</p>
        <p>Buyer: {invoice.buyer.username}</p>
        <p>Seller: {invoice.seller.username}</p>
        <p>Amount: {invoice.amount}</p>
        <p>Status: {invoice.status}</p>
        <p>Product Details: {invoice.productDetails}</p>
        {invoice.status === 'pending' && role === 'buyer' && (
            <button onClick={handleApprove}>Approve</button>
        )}
    </li>
  )
}

export default InvoiceItem
