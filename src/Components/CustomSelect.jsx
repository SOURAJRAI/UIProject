import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './styles/CustomSelect.css';

const CustomSelect = ({ options, placeholder, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="custom-select-container">
            <div 
                className={`custom-select ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="select-value">{value || placeholder}</span>
                <ChevronDown className="select-arrow" />
            </div>
            <div className={`custom-options ${isOpen ? 'show' : ''}`}>
                {options.map((option, index) => (
                    <div 
                        key={index}
                        className="custom-option"
                        onClick={() => {
                            onChange(option);
                            setIsOpen(false);
                        }}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;