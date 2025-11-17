import React, { useState, useRef, useEffect } from "react";
import "./Select.scss";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Select an option",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const selectRef = useRef<HTMLDivElement>(null);

  // Update internal state when controlled value changes
  if (value !== undefined && value !== selectedValue) {
    setSelectedValue(value);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: SelectOption) => {
    if (!disabled) {
      setSelectedValue(option.value);
      setIsOpen(false);
      onChange?.(option.value);
    }
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div
      className={`select-container ${
        disabled ? "select-disabled" : ""
      } ${className}`}
      ref={selectRef}
    >
      <div
        className={`select-trigger ${isOpen ? "select-open" : ""}`}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <span className={selectedValue ? "" : "select-placeholder"}>
          {displayText}
        </span>
        <span className={`select-arrow ${isOpen ? "select-arrow-up" : ""}`}>
          ▼
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="select-dropdown" role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-option ${
                option.value === selectedValue ? "select-option-selected" : ""
              }`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={option.value === selectedValue}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(option);
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
