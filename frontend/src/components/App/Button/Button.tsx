import React from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    colorScheme?: 'green' | 'dark';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, colorScheme }) => {
        const handleClick = () => {
                if (onClick) {
                        onClick();
                }
        };
    return (
        <button className={`app__button ${colorScheme === 'green' ? 'green' : colorScheme === 'dark' ? 'dark' : 'default'}`} onClick={handleClick}>
            {text}
        </button>
    );
}

export default Button
