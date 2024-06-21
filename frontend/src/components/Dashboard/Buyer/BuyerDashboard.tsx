import React from 'react';
import { Link } from 'react-router-dom';
import "./BuyerDashboard.scss";

const BuyerDashboard: React.FC = () => {
    return (
        <div className='app__buyer'>
            {/* <h2>Buyer Dashboard</h2> */}
            <>
                <ul>
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

export default BuyerDashboard;
