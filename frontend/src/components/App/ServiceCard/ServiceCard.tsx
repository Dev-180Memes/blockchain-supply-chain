import React from 'react';
// import { search } from '../../../assets';
import './ServiceCard.scss';
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

interface ServiceCardProps {
    title: string;
    colorScheme: string;
    image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, colorScheme, image }) => {
  return (
    <div className={`app__service-card ${colorScheme === "light" ? "service-light" : colorScheme === "dark" ? "service-dark" : colorScheme === "green" ? "service-green" : "" }`}>
      <div className="content">
        <div className="text">
            <h3>{title}</h3>
        </div>
        <div className="link">
            <div className="icon">
                <ArrowUpRightIcon width={30} height={30} />
            </div>
            <p>Learn More</p>
        </div>
      </div>
      <img src={image} alt="Image" />
    </div>
  )
}

export default ServiceCard
