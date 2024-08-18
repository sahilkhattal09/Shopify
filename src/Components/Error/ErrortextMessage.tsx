interface ErrorMessageProps {
  error?: boolean;
  message?: string | undefined;
  className?: string;
}

export default function ErrorMessage({
  error,
  message,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={`text-xs ${
        error ? "text-red-600" : "text-black"
      } ${className}`}
    >
      {message}
    </div>
  );
}
