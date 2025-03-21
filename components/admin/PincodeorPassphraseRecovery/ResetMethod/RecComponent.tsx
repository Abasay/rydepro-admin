import Image from 'next/image';
import React, { useState } from 'react';
import './styles.modules.css';

const RecComponent = ({ img, text, onClick }: { img: any; text: string; onClick: () => void }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className='flex h-[68px] w-[480px] rounded-[8px] justify-between py-[20px] px-[16px] bg-[#F7F7F7]'>
      <div className='flex gap-2 items-center'>
        <Image src={img} alt='' width={20} height={21} />
        <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>{text}</span>
      </div>
      <div onClick={handleToggle} className={`radio-circle ${isOn ? 'active' : ''}`}></div>
    </div>
  );
};

export default RecComponent;
