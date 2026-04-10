// components/LoadingSpinner.tsx
import React from "react";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  primaryColor?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = "Loading...", 
  size = "md",
  fullScreen = false,
  primaryColor = "var(--primary)"
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50"
    : "text-center py-8";

  return (
    <div className={containerClasses}>
      <div className="inline-block">
        <div 
          className={`inline-block animate-spin rounded-full border-b-2 ${sizeClasses[size]}`}
          style={{ borderColor: primaryColor }}
        ></div>
        {text && <p className="mt-2 text-gray-500">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;