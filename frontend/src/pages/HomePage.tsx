import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Blockchain Supply Chain Platform</h1>
            <p>This platform facilitates secure and transparent transactions between buyers and sellers using blockchain technology.</p>
            <section>
                <h2>Features</h2>
                <ul>
                    <li>Secure transactions using Ethereum blockchain</li>
                    <li>Invoice management and tracking</li>
                    <li>Escrow service to ensure payment security</li>
                    <li>Role-based access for buyers and sellers</li>
                    <li>Real-time order tracking and updates</li>
                </ul>
            </section>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
