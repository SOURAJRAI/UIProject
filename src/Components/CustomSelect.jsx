import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import "./styles/CustomSelect.css";

const CustomSelect = ({ options, placeholder, value, onChange,showIcons=false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-select-container">
      <div
        className={`custom-select ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="select-value">{value || placeholder}</span>
        <ChevronDown className="select-arrow" />
      </div>
      <div className={`custom-options ${isOpen ? "show" : ""}`}>
        {options.map((option, index) => (
          
          <div
            key={index}
            className="custom-option"
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
          >
              <span className="option-icon">
            {showIcons && value === option && <Check className="check-icon" />}
              </span>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
