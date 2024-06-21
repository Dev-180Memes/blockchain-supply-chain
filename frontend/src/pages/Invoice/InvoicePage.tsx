import React, { useEffect, useState } from 'react';
import invoiceService from '../../services/invoice.service';
import { Invoice } from '../../types';
import InvoiceList from '../../components/Invoice/InvoiceList';
import './InvoicePage.scss';

const InvoicePage: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[] | undefined>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await invoiceService.getInvoices();
                // console.log(response.invoices);
                setInvoices(response.invoices);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching invoices:', error);
                setError('Failed to fetch invoices. Please try again later.');
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) {
        return <p className='loading'>Loading...</p>
    }

    if (error) {
        return <p className='error'>{error}</p>
    }

  return (
    <div className='app__invoice'>
        <h1>Invoices</h1>
        <InvoiceList invoices={invoices} />
    </div>
  )
}

export default InvoicePage
