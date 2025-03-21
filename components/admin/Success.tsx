import React from 'react';
import SuccessIcon from './success.svg';
import CancelIcon from './cancel.svg';
import styles from '@/styles/stylish.module.css';
import Image from 'next/image';
import { CircleCheck, X } from 'lucide-react';

const SuccessModal = ({ text, handleClose }: { text: string; handleClose: () => void }) => {
  return (
    <div className={`absolute top-16 w-full flex justify-center ${styles['fade-in']}`}>
      <div className=' p-4  border border-[#1F1AFC]  rounded-2xl w-full max-w-[430px] mx-auto flex items-center gap-4 justify-between bg-[#F7FFF8]'>
        <p className=' flex gap-4 items-center text-base text-[#1511A8]'>
          <Image src={SuccessIcon} alt='success' width={20} height={20} />
          {/* <CircleCheck size={20} /> */}
          <span>{text}</span>
        </p>
        <button className=' ' onClick={handleClose}>
          <Image src={CancelIcon} alt='cancel' width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
