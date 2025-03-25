import React from 'react';

interface InputProps {
  labelText: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  important?: boolean;
  name: string;
}

const Input: React.FC<InputProps> = ({ labelText, placeholder, value, onChange, important, name }) => {
  return (
    <div className=" flex flex-col gap-11 w-[181px] items-start border-b border-[#CCCCCC]">
      <label className="text-[#0E0E0E] font-bold text-sm">
        {labelText} {important && <span className="text-[#D21B34]">*</span>}
      </label>
      <input
        className="w-full py-2 text-sm text-[#0E0E0E] border-none focus:outline-none"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
