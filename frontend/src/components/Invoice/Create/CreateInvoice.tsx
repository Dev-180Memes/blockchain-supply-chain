import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import invoiceService from '../../../services/invoice.service';
import authService from '../../../services/auth.service';
import { Invoice, User } from '../../../types';
import "./CreateInvoice.scss";
import Button from '../../App/Button/Button';

const CreateInvoice: React.FC = () => {
    const [users, setUsers] = useState<User[] | undefined>([]);
    const [buyerId, setBuyerId] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [productDetails, setProductDetails] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await authService.getAllUsers();
                // console.log(response);
                // Only store users where the role is buyer
                const buyers = response.data.filter((user: User) => user.role === 'buyer');
                setUsers(buyers);
                // console.log(buyers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const invoiceData: Partial<Invoice> = {
                buyerId: buyerId,
                amount,
                productDetails
            };
            await invoiceService.createInvoice(invoiceData);
            navigate('/invoices');
        } catch (error) {
            console.error('Error creating invoice:', error);
            setError('Failed to create invoice. Please try again later.');
        }
    }

  return (
    <div className='app__create'>
        <h2>Create Invoice</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Buyer:</label>
                <select onChange={(e) => setBuyerId(e.target.value)} required>
                    <option value="">Select a buyer</option>
                    {users?.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
            </div>
            <div className='form-group'>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
            </div>
            <div className='form-group'>
                <label>Product Details:</label>
                <textarea value={productDetails} onChange={(e) => setProductDetails(e.target.value)} required ></textarea>
            </div>
            <Button type="submit" text='Create Invoice' />
            {error && <p>{error}</p>}
        </form>
    </div>
  );
};

export default CreateInvoice
