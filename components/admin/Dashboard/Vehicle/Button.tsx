import React from 'react';

const Button = ({
  className,
  text,
  onClick,
  disabled,
}: {
  className: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 px-6 rounded-lg ${className} disabled:bg-opacity-50 disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
