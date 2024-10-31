import React from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorBoundaryFallBack: React.FC<FallbackProps> = ({ error }) => {
  return (
    <div>
      <p>خطایی رخ داده است!</p>
      <p>پیام خطا: {error.message}</p>
    </div>
  );
};

export default ErrorBoundaryFallBack;
