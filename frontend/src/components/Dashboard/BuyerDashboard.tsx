import React from 'react';
import { Link } from 'react-router-dom';

const BuyerDashboard: React.FC = () => {
    return (
        <div>
            <h2>Buyer Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/invoices">View Invoices</Link></li>
                    <li><Link to="/orders">View Orders</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default BuyerDashboard;
