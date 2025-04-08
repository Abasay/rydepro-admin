import React, { useState } from 'react';

interface InputProps {
  labelText: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  important?: boolean;
  name: string;
  type?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({ labelText, placeholder, value, onChange, important, name, type, disabled }) => {
  const [disabledInput, setDisabled] = useState(true);
  return (
    <div
      className=" flex flex-col gap-3 w-[181px] items-start border-b border-[#CCCCCC]"
      onClick={() => setDisabled(false)}
    >
      <label className="text-[#0E0E0E] font-bold text-sm">
        {labelText} {important && <span className="text-[#D21B34]">*</span>}
      </label>
      <input
        className="w-full py-2 text-sm text-[#0E0E0E] border-none focus:outline-none"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        type={type}
        disabled={disabled && disabledInput}
      />
    </div>
  );
};

export default Input;
