import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export const CustomAlert = ({ type, title, message, className = "" }) => {
  const isError = type === "error";

  return (
    <Alert variant={isError ? "destructive" : "default"} className={className}>
      {isError ? (
        <AlertCircle className="h-5 w-5" />
      ) : (
        <CheckCircle className="h-5 w-5" />
      )}
      <AlertTitle>{title || (isError ? "Error" : "Success")}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

