'use client';
import React from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import Image from 'next/image';
import RydeProLogo from '@/public/RydeproLogo.png';
import RecComponent from './RecComponent';
import img from './passphrase.svg';
import phoneImg from '@/components/admin/AdminSignUp/AdditionalSecurity/AuthenticationMethod/phone.svg';

const AdditionalSecurity = () => {
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
        <div className='w-full justify-center items-center mx-auto mt-20 px-10'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Forgot Pincode/Passphrase</span>
              <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Reset Pincode/Passphrase</h2>
              <span className='text-[#3C3C3C] text-base leading-[24px] font-normal'>
                Please select pincode or passphrase, or both.
              </span>
            </div>
            <div className='flex flex-col mt-4 gap-4'>
              <RecComponent img={phoneImg} onClick={() => {}} text='Pincode' />
              <RecComponent img={img} onClick={() => {}} text='Passphrase' />
            </div>
            {/** */}
            <button
              type='submit'
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
              }}
              className='h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] bg-[#8A8A8A] text-base leading-[24px] text-[#FAF6F6]'
            >
              Confirm Security Method
            </button>
          </div>
        </div>
      </div>
    </GeneralDesign>
  );
};

export default AdditionalSecurity;
