import React from "react";
import styles from "./SharedButton.module.css";

interface SharedButtonProps {
  label: string;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "cancel" | "delete";
  onClick?: () => void;
  disabled?: boolean;
}

const SharedButton: React.FC<SharedButtonProps> = ({
  label,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SharedButton;
