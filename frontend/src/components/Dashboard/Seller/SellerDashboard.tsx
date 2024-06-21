import React from 'react';
import { Link } from 'react-router-dom';
import "./SellerDashboard.scss";

const SellerDashboard: React.FC = () => {
    return (
        <div className='app__seller'>
            {/* <h2>Seller Dashboard</h2> */}
            <>
                <ul>
                    <li>
                        <h3>Create Invoices</h3>
                        <Link to="/invoices/create">Create Invoice</Link>
                    </li>
                    <li>
                        <h3>Invoices</h3>
                        <Link to="/invoices">View Invoices</Link>
                    </li>
                    <li>
                        <h3>Orders</h3>
                        <Link to="/orders">View Orders</Link>
                    </li>
                </ul>
            </>
        </div>
    );
};

export default SellerDashboard;
