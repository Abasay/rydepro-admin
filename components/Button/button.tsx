'use client';
import React from 'react';

type ComponentProps = {
  text: string;
  className?: string;
  isClicked?: boolean;
  onClick?: () => void;
  id?: number;
  num?: number;
};
const Component = ({ className, text, onClick, isClicked, id, num }: ComponentProps) => {
  return (
    <div
      key={id}
      title={text}
      onClick={onClick}
      className={`h-[36px] text-base leading-[24px] transition duration-500 font-medium ${
        isClicked ? 'text-[#F7F7F7] bg-[#111111]' : 'text-[#3C3C3C] bg-[#F5F5F5]'
      }  rounded-[100px] border-[1px] py-[6px] px-[24px] gap-[4px] flex items-center border-[#DADADA] text-center cursor-pointer ${className}`}
    >
      {num && <span className='text-[#8A8A8A]'>{num}.</span>}
      <span>{text}</span>
    </div>
  );
};

export default Component;
