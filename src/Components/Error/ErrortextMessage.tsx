interface ErrorMessageProps {
  error?: boolean;
  message?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  message,
  className = "",
}) => {
  return (
    <div
      className={`text-xs ${
        error ? "text-red-600" : "text-black"
      } ${className}`}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
