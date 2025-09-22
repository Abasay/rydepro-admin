/** @format  */

import Image from 'next/image';
import React from 'react';
import searchIcon from '@/components/admin/Dashboard/svgs/search.svg';
import bellIcon from '@/components/admin/Dashboard/svgs/bell.svg';
import dummyImage from '@/public/oldman.png';
import dropDownIcon from '@/components/admin/Dashboard/svgs/dropdown.svg';
import styles from '@/styles/common.module.css';
import { useDB } from '@/contexts/DBContext';

const DBHeader = () => {
  const { advancedSearch, setAdvancedSearch } = useDB();
  return (
    <div
      className={`h-[100px] z-50  fixed top-0 left-[280px] right-0 bg-[#FFFFFF] border-b-[1px] py-[8px] pr-[48px] pl-[32px] border-[#F1F1F1] flex items-center justify-between ${styles['slide-from-top']}`}
    >
      <div className=" min-w-[191px] flex gap-8 items-center">
        <span className=" w-full text-[16px] leading-6 text-[#000000]">Advanced Search</span>

        <div className="relative">
          <input type="checkbox" id="toggle" className="sr-only" onClick={() => setAdvancedSearch(!advancedSearch)} />
          <label
            htmlFor="toggle"
            className={`block w-12 h-7 ${
              advancedSearch ? ' bg-[#059B14]' : 'bg-[#DADADA]'
            } rounded-full cursor-pointer`}
          >
            <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
          </label>
          <style jsx>{`
            input:checked + label .dot {
              transform: translateX(20px); /* Updated for full width shift */
            }
          `}</style>
        </div>
      </div>
      <div className=" w-12 h-12 grid place-items-center rounded-full border-[0.5px] bg-[#F8F8F8] border-[#D5D5D5]">
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.0008 1.99622C16.0508 1.99622 19.3575 5.19096 19.4967 9.24527L19.5008 9.49622V13.5932L20.8808 16.7492C20.9499 16.9071 20.9855 17.0776 20.9855 17.25C20.9855 17.9403 20.4259 18.5 19.7355 18.5L15.0008 18.5015C15.0008 20.1583 13.6577 21.5015 12.0008 21.5015C10.4032 21.5015 9.09718 20.2526 9.00594 18.6778L9.00039 18.4992L4.27571 18.5C4.10437 18.5 3.93486 18.4648 3.77771 18.3965C3.1445 18.1215 2.85416 17.3852 3.12919 16.752L4.50084 13.5941V9.49611C4.50144 5.34132 7.85293 1.99622 12.0008 1.99622ZM13.5004 18.4992L10.5008 18.5015C10.5008 19.3299 11.1724 20.0015 12.0008 20.0015C12.7805 20.0015 13.4213 19.4066 13.494 18.6459L13.5004 18.4992ZM12.0008 3.49622C8.68068 3.49622 6.00132 6.17047 6.00084 9.49622V13.9058L4.65686 17H19.3534L18.0008 13.9068L18.001 9.50907L17.9972 9.28387C17.8861 6.0504 15.2424 3.49622 12.0008 3.49622Z"
              fill="#212121"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default DBHeader;
