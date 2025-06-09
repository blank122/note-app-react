import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export const CustomAlert = ({ 
  type, 
  title, 
  message, 
  className = "", 
  onDismiss 
}) => {
  const isError = type === "error";
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setIsVisible(false);
          onDismiss?.();
          return 0;
        }
        return prev - 1;
      });
    }, 30); // Decrease every 30ms for 3 seconds total (100 * 30ms = 3000ms)

    return () => clearInterval(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  return (
    <Alert 
      variant={isError ? "destructive" : "default"} 
      className={`relative overflow-hidden ${className}`}
    >
      {/* Progress bar */}
      <div
        className={`absolute top-0 left-0 h-1 ${isError ? "bg-red-500" : "bg-green-500"}`}
        style={{ width: `${progress}%` }}
      />
      
      <div className="flex items-start gap-3">
        {isError ? (
          <AlertCircle className="h-5 w-5 mt-0.5" />
        ) : (
          <CheckCircle className="h-5 w-5 mt-0.5" />
        )}
        <div>
          <AlertTitle>{title || (isError ? "Error" : "Success")}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
};