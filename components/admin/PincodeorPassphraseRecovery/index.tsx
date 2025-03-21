'use client';
import React, { useState } from 'react';
import GeneralDesign from '@/components/admin//GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import toast from 'react-hot-toast';

const PincodeOrPassphraseRecovery = () => {
  const [email, setEmail] = useState<string>('');

  return (
    <GeneralDesign>
      {/**header */}
      <div className='flex w-full justify-between items-center'>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <button
          type='button'
          title='Sign In'
          className='w-[120px] h-[48px] rounded-[8px] text-[#0E0E0E] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] gap-[16px] flex items-center justify-center'
        >
          {/* <Image src={arrowIcon} alt='' width={20} height={20}/> */}
          <span>Back</span>
        </button>
      </div>
      {/**content */}
      <div className='mt-20 flex flex-col justify-center items-center w-full px-8'>
        <div className='container flex flex-col gap-2 max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='leading-[24px] text-base font-medium text-[#0E0E0E]'>Forgot Pincode/Passphrase</span>
            <h2 className='text-[#0E0E0E] leading-[32px] text-[24px] font-medium'>Forgot Pincode/Passphrase</h2>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
              Please enter your registered email address.
            </span>
          </div>
          <label htmlFor='email' className='flex flex-col gap-2 mt-8'>
            <span className='text-[14px] text-[#0E0E0E] leading-[20px] font-medium'>Email Address</span>
            <input
              type='email'
              value={email}
              onChange={(e: { target: { value: string } }) => {
                setEmail(e.target.value);
              }}
              className='h-[56px] rounded-[8px] border-y-[1px] p-[16px] border-[#DADADA] text-base leading-[24px] font-normal text-[#0E0E0E] outline-none'
              placeholder='ajalamicheal1@gmail.com'
              required
            />
          </label>
          <button
            type='submit'
            className='h-[56px] mt-16 p-[8px] w-full rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]'
          >
            Proceed
          </button>
        </div>
      </div>
    </GeneralDesign>
  );
};

export default PincodeOrPassphraseRecovery;
