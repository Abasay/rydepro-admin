import React from 'react';

const Button = ({ className, text, onClick }: { className: string; text: string; onClick: () => void }) => {
  return (
    <button onClick={onClick} className={`p-2 rounded-lg ${className}`}>
      {text}
    </button>
  );
};

export default Button;
