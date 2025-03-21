import React, { FC } from 'react';

interface TextareaProps {
  labelText: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  htmlFor: string;
  important?: boolean;
  className?: string;
}

const Textarea: FC<TextareaProps> = ({
  labelText,
  placeholder,
  type,
  value,
  onChange,
  htmlFor,
  important,
  className,
}) => {
  return (
    <div className=' flex flex-col gap-2'>
      <label htmlFor={htmlFor} className=' font-medium text-base '>
        {important && <span className=' text-lg text-[#D21B34] font-medium'>*</span>}
        {labelText}
      </label>

      <textarea
        placeholder={placeholder}
        draggable={false}
        onChange={onChange}
        onDragStart={(e) => e.preventDefault()}
        value={value}
        cols={30}
        name={htmlFor}
        className={`max-w-[747px] text-base outline-none focus-within:outline-none bg-transparent border-b border-[#8A8A8A]  py-3 px-4 placeholder:text-[#8A8A8A] ${className}`}
      ></textarea>
    </div>
  );
};

export default Textarea;
