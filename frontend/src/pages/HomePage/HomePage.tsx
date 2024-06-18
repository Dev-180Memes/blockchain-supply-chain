import React from 'react';
import { Link } from 'react-router-dom';
import { illustration } from '../../assets';
import './HomePage.scss';
import Button from '../../components/App/Button/Button';
import ServiceCard from '../../components/App/ServiceCard/ServiceCard';
import { search, click, analytics, content, message, smily } from '../../assets';

const HomePage: React.FC = () => {
    return (
        <>
            <div className="app__hero">
                <div className="content">
                    <h1>Revolutionize Supply Chain with Blockchain</h1>
                    <p>Experience unparalleled security and transparency in your transactions. Streamline your operations with cutting-edge blockchain technology. Empower your business with next-level supply chain management.</p>
                    <Link to={"/signup"}>
                        <Button text='Get Started' colorScheme='dark' />
                    </Link>
                </div>
                <img src={illustration} alt="Illustration" />
            </div>

            <div className="app__services">
                <div className="heading">
                    <h2 className="title">Services</h2>
                    <p>Unlock the potential of secure and transparent supply chain management with our blockchain platform. Our services streamline transactions, real-time tracking, and invoice management, ensuring efficiency and trust for both buyers and sellers.</p>
                </div>
                <div className="service-container">
                    <div className="services">
                        <ServiceCard 
                            title='Invoice Management'
                            colorScheme='light'
                            image={search}
                        />
                        <ServiceCard 
                            title='Secure Payments'
                            colorScheme='green'
                            image={click}
                        />
                    </div>
                    <div className="services">
                        <ServiceCard 
                            title='Premium Order Tracking'
                            colorScheme='dark'
                            image={smily}
                        />
                        <ServiceCard 
                            title='User Authentication'
                            colorScheme='light'
                            image={message}
                        />
                    </div>
                    <div className="services">
                        <ServiceCard 
                            title='Secure Smart Contracts'
                            colorScheme='green'
                            image={content}
                        />
                        <ServiceCard 
                            title='Real-Time Analytics'
                            colorScheme='dark'
                            image={analytics}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
