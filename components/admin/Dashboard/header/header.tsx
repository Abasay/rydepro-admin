/** @format  */

import Image from 'next/image';
import React from 'react';
import searchIcon from '@/components/admin/Dashboard/svgs/search.svg';
import bellIcon from '@/components/admin/Dashboard/svgs/bell.svg';
import dummyImage from '@/public/oldman.png';
import dropDownIcon from '@/components/admin/Dashboard/svgs/dropdown.svg';
import styles from '@/styles/common.module.css';

const Header = () => {
  return (
    <div
      className={`h-[100px] border-b-[1px] py-[8px] pr-[48px] pl-[32px] border-[#F1F1F1] flex items-center justify-between ${styles['slide-from-top']}`}>
      <div>
        <Image
          src={searchIcon}
          alt=''
          width={12}
          height={12}
          className='w-[12px] h-[12px] absolute mt-5 ml-4'
        />
        <input
          type='search'
          name=''
          id=''
          className='h-[48px] gap-[8px] w-[560px] rounded-[8px] border-[0.5px] py-[12px] px-[16px] border-[#BFBFBF] outline-none text-base font-normal text-[#0E0E0E] leading-[24px] placeholder:text-[#AAAAAA] pl-10'
          placeholder='Search for any document by name, email etc'
        />
      </div>
      <div className='w-[325px] h-[48px] flex gap-[24px]'>
        <Image
          src={bellIcon}
          width={48}
          height={48}
          alt=''
          className='w-[48px] h-[48px]'
        />
        <div className='w-[253px] flex gap-[16px]'>
          <div className='flex gap-[8px]'>
            <Image
              src={dummyImage}
              alt=''
              width={48}
              height={48}
              className='w-[48px] h-[48px] rounded-full'
            />
            <div className='flex flex-col gap-[4px]'>
              <span className='font-medium text-base leading-[24px] text-[#2B2B2B]'>
                Ajala Michael
              </span>
              <span className='text-[14px] leading-[20px] font-normal text-[#555555]'>
                ajalamicheal1@gmail.com
              </span>
            </div>
          </div>
          <div className='flex items-center'>
            <Image
              src={dropDownIcon}
              width={24}
              height={24}
              alt=''
              className='w-[24px] h-[24px]'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
