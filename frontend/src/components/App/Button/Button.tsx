import React from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    colorScheme?: 'green' | 'dark';
    type?: "" | "submit";
}

const Button: React.FC<ButtonProps> = ({ text, onClick, colorScheme, type }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <button className={`app__button ${colorScheme === 'green' ? 'button-green' : colorScheme === 'dark' ? 'button-dark' : 'button-default'}`} type={`${type === "submit" ? "submit" : ""}`} onClick={handleClick}>
            {text}
        </button>
    );
}

export default Button
