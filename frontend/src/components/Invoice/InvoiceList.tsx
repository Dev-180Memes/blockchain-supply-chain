import React from 'react';
import { Invoice } from '../../types';
import InvoiceItem from './InvoiceItem';

interface InvoiceListProps {
  invoices: Invoice[] | undefined;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices }) => {
  return (
    <div className='invoice_list'>
      {invoices?.length === 0 ? (
        <p>No invoices available</p>
      ) : (
        <ul>
          {invoices?.map((invoice) => (
            <InvoiceItem key={invoice._id} invoice={invoice} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default InvoiceList
