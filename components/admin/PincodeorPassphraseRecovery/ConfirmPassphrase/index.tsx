'use client';
import React from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import Image from 'next/image';
import RydeProLogo from '@/public/RydeproLogo.png';

const ConfirmPassphrase = () => {
  return (
    <GeneralDesign>
      <div className='flex flex-col items-center'>
        {/**heading */}
        <div className='flex w-full justify-between items-center'>
          <Image src={RydeProLogo} alt='' width={70} height={100} />
          <button
            type='button'
            title='Sign In'
            className='w-[120px] h-[48px] rounded-[8px] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] gap-[16px] text-[#0E0E0E]'
          >
            Back
          </button>
        </div>
        {/**content */}
        <div className='w-full flex justify-center items-center mx-auto mt-20 px-10'>
          <div className='flex flex-col gap-2 container'>
            <div className='flex flex-col'>
              <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Forgot Pincode/Passphrase</span>
              <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Confirm Passphrase</h2>
              <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
                Please enter your corresponding passphrase
              </span>
            </div>
            {/**input fields */}
            <div className='grid grid-cols-2 grid-rows-3 gap-6 mt-4'>
              {/**passphrase1 */}
              <label htmlFor='passphrase1' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 1</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase1'
                  placeholder='Passphrase'
                />
              </label>
              {/**passphrase2 */}
              <label htmlFor='passphrase2' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 2</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase2'
                  placeholder='Passphrase'
                />
              </label>
              {/**passphrase3 */}
              <label htmlFor='passphrase3' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 3</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase3'
                  placeholder='Passphrase'
                />
              </label>
              {/**passphrase4 */}
              <label htmlFor='passphrase4' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 4</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase4'
                  placeholder='Passphrase'
                />
              </label>
              {/**passphrase 5 */}
              <label htmlFor='passphrase5' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Passphrase 5</span>
                <input
                  className='h-[56px] text-[#0E0E0E] outline-none rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA]'
                  type='text'
                  id='passphrase5'
                  placeholder='Passphrase'
                />
              </label>
            </div>
            {/**Proceed */}
            <button
              type='submit'
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
              }}
              className='h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]'
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </GeneralDesign>
  );
};

export default ConfirmPassphrase;
