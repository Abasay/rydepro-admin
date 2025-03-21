import React, { FC } from 'react';

interface InputProps {
  labelText: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  htmlFor: string;
  className?: string;
  important?: boolean;
}

const Input: FC<InputProps> = ({ labelText, placeholder, type, value, onChange, htmlFor, important, className }) => {
  return (
    <div className=' flex flex-col gap-2 border-b border-[#8A8A8A] py-3 '>
      <label htmlFor={htmlFor} className=' font-medium text-base '>
        {important && <span className=' text-lg text-[#D21B34] font-medium'>*</span>} {labelText}
      </label>

      <input
        type={type}
        name={htmlFor}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`text-base outline-none focus-within:outline-none bg-transparent  px-4 placeholder:text-[#8A8A8A]  w-full`}
      />
    </div>
  );
};

export default Input;
