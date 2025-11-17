import React, { useState } from "react";
import "./Switch.scss";

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = "",
  label,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  // Update internal state when controlled value changes
  if (checked !== undefined && checked !== isChecked) {
    setIsChecked(checked);
  }

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange?.(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`switch-wrapper ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
        className={`switch-container ${isChecked ? "switch-checked" : ""} ${
          disabled ? "switch-disabled" : ""
        }`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <span
          className={`switch-track ${isChecked ? "switch-track-checked" : ""}`}
        >
          <span
            className={`switch-thumb ${
              isChecked ? "switch-thumb-checked" : ""
            }`}
          />
        </span>
      </button>
      {label && (
        <span
          className={`switch-label ${disabled ? "switch-label-disabled" : ""}`}
        >
          {label}
        </span>
      )}
    </div>
  );
};
