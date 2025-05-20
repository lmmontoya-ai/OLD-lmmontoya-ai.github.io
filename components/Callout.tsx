import React from "react";

interface CalloutProps {
  type?: "info" | "success" | "warning" | "error";
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  type = "info",
  children,
}) => {
  const base = "rounded-lg p-4 mb-4";
  const variants: Record<string, string> = {
    info: "bg-blue-50 text-blue-800",
    success: "bg-green-50 text-green-800",
    warning: "bg-yellow-50 text-yellow-800",
    error: "bg-red-50 text-red-800",
  };
  const className = `${base} ${variants[type]}`;
  return <div className={className}>{children}</div>;
};
