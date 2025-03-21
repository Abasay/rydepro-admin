'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import './styles.modules.css';

const RecComponent = ({
  img,
  text,
  onClick,
  isClicked,
  className,
}: {
  img: any;
  text: string;
  onClick: () => void;
  isClicked?: boolean;
  className?: string;
}) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  return (
    <div className={`flex h-[68px] w-[480px] rounded-[8px] justify-between py-[20px] px-[16px] ${className}`}>
      <div className='flex gap-2 items-center'>
        <Image src={img} alt='' width={20} height={21} />
        <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>{text}</span>
      </div>
      {/**toggle */}
      <div>
        <div
          onClick={onClick}
          className={`toggle-switch rounded-[100px] flex items-center justify-center py-[6px] px-[4px] ${
            isClicked ? 'active' : ''
          }`}
        >
          <div className='circle'></div>
        </div>
      </div>
    </div>
  );
};

export default RecComponent;
