import React from 'react';
import CancelIcon from './cancel.svg';
import styles from '@/styles/stylish.module.css';
import Error from './failed.svg';
import Image from 'next/image';

const ErrorModal = ({ text, handleClose }: { text: string; handleClose: () => void }) => {
  return (
    <div className={`absolute top-16 w-full flex justify-center ${styles['fade-in']}`}>
      <div className=' p-4  border border-[#D21B34]  rounded-2xl w-full max-w-[430px] mx-auto flex items-center gap-4 justify-between bg-[#FFF5F6]'>
        <p className=' flex gap-1 items-center text-base text-[#D21B34]'>
          <Image src={Error} alt='error' width={20} height={20} />
          <span>{text}</span>
        </p>
        <button className=' ' onClick={handleClose}>
          <Image src={CancelIcon} alt='cancel' width={20} height={20} />
          {/* <CancelIcon /> */}
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
