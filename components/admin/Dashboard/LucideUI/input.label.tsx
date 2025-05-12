import React, { ChangeEvent, InputHTMLAttributes } from 'react';

interface InputWithLabelProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  value,
  onChange,
  placeholder,
  label,
  className = '',
  //   showIcon = true,
  ...restProps
}) => {
  return (
    <div className={`relative w-full flex flex-col gap-2 mx-auto     min-h-[45px] max-h-[48px] ${className}`}>
      {label && <label className=" text-sm">{label}</label>}

      {/* {showIcon && (
        <span className="">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.30887 10.016C8.53903 10.6318 7.56252 11 6.5 11C4.01472 11 2 8.98531 2 6.50002C2 4.01473 4.01472 2 6.5 2C8.98528 2 11 4.01473 11 6.50002C11 7.56252 10.6318 8.53901 10.016 9.30885L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L9.30887 10.016ZM10 6.50002C10 4.56701 8.433 3 6.5 3C4.567 3 3 4.56701 3 6.50002C3 8.43302 4.567 10 6.5 10C8.433 10 10 8.43302 10 6.50002Z"
              fill="#0E0E0E"
            />
          </svg>
        </span>
      )} */}

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-full outline-none border-b rounded-lg py-3  border-[#DADADA] px-4  focus-within:outline-none placeholder:text-[#8A8A8A] font-[400] text-[16px] leading-6"
        {...restProps}
      />
    </div>
  );
};

export default InputWithLabel;
