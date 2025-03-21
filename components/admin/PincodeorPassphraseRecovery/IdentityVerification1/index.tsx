'use client';
import React, { useRef, useState } from 'react';
import GeneralDesign from '@/components/admin//GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Link from 'next/link';

const PRIdentityVerification1 = () => {
  const [password, setPassword] = useState<string>('');
  const [details, setDetails] = useState({
    employeeID: '',
    RMAK: `MIICXQIBAAKBgQCmSzU13xLBJvOiEal2E6N5o0RbwbzX1B86IwdIfL6LsgdBJbjeDk4UIaR5xgXfUyNN3gdBxYbn2iaGPnf8OsB9Y6e4F1FbvJ+3xnu/e2iNVmTJN9W`, //RMAK (RYDEPRO Master Admin Key)
    RSAK: `MIICXQIBAAKBgQCmSzU13xLBJvOiEal2E6N5o0RbwbzX1B86IwdIfL6LsgdBJbjeDk4UIaR5xgXfUyNN3gdBxYbn2iaGPnf8OsB9Y6e4F1FbvJ+3xnu/e2iNVmTJN9W`, //RSAK (RYDEPRO Secondary Admin Key)
  });
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
            <h2 className='text-[#0E0E0E] leading-[32px] text-[24px] font-medium'>Verify your Identity!</h2>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>Please fill in your details.</span>
          </div>
          <div className='mt-8 flex flex-col gap-6'>
            <label htmlFor='' className='flex flex-col gap-2'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Employee ID</span>
              <input
                type='text'
                value={details.employeeID}
                onChange={(e: { target: { value: string } }) => {
                  setDetails({ ...details, employeeID: e.target.value });
                }}
                placeholder='AJK-1234-9587'
                className='h-[56px] outline-none rounded-[8px] text-[#0E0E0E] border-b-[1px] p-[16px] border-[#DADADA] text-base leading-[24px]'
              />
            </label>
            <label htmlFor='' className='flex flex-col gap-2'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Password</span>
              <input
                type='password'
                value={password}
                onChange={(e: { target: { value: string } }) => {
                  setPassword(e.target.value);
                }}
                placeholder='**********'
                className='h-[56px] outline-none rounded-[8px] text-[#0E0E0E] border-b-[1px] p-[16px] border-[#DADADA] text-base leading-[24px]'
              />
            </label>
            <label htmlFor='' className='flex flex-col gap-2'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>
                RMAK (RYDEPRO Master Admin Key)
              </span>
              <textarea
                // type='text'
                // placeholder='AJK-1234-9587'
                value={details.RMAK}
                onChange={(e: { target: { value: string } }) => {
                  setDetails({ ...details, RMAK: e.target.value });
                }}
                className='h-[120px] break-words outline-none rounded-[8px] text-[#0E0E0E] border-y-[1px] p-[16px] border-[#DADADA] text-base leading-[24px] bg-white resize-none scrollbar-hide'
              ></textarea>
            </label>
            <label htmlFor='' className='flex flex-col gap-2'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>
                RSAK (RYDEPRO Secondary Admin Key)
              </span>
              <textarea
                // type='text'
                // placeholder='AJK-1234-9587'
                value={details.RSAK}
                onChange={(e: { target: { value: string } }) => {
                  setDetails({ ...details, RSAK: e.target.value });
                }}
                className='h-[120px] break-words outline-none rounded-[8px] text-[#0E0E0E] border-y-[1px] p-[16px] border-[#DADADA] text-base leading-[24px] bg-white resize-none scrollbar-hide'
              ></textarea>
            </label>
          </div>
          <button
            type='submit'
            className={`h-[56px] mt-4 p-[8px] w-full rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]`}
          >
            Sign In
          </button>
        </div>
      </div>
    </GeneralDesign>
  );
};

export default PRIdentityVerification1;
