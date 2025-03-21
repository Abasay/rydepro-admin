'use client';
import React, { useEffect, useRef, useState } from 'react';
import GeneralDesign from '@/components/admin//GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useResetContext } from '@/contexts/ResetContext';
import axios from 'axios';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';

const IdentityVerification1 = () => {
  const { nav, setNav, setupToken, email, details, setDetails } = useResetContext();
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  //handle submit on click on sign in
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { employeeID, RSAK, RMAK } = details;

    if (!employeeID) return;
    if (!RSAK) return;
    if (!RMAK) return;

    toast.loading('Verifying Identity...');

    try {
      const request = await postRequest({
        url: AdminUrls.verifyIdentity,
        token: setupToken,
        data: {
          email: email,
          employeeId: employeeID,
          masterKey: RMAK,
          secondaryKey: RSAK,
        },
      });

      toast.dismiss();
      if (request.success) {
        toast.success(request.message);
        setNav({
          ...nav,
          isForgotPasswordPageActive: false,
          isRecoveryPageActive: false,
          isVerifyingIdentityPageActive: false,
          isPincodeOrPassphrasePageActive: true,
        });
        setDetails({
          ...details,
          RMAK: '',
          RSAK: '',
        });
      } else {
        toast.error(request.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error verifying identity';
      toast.error(errorMessage);
    }

    //conditional testing to simulate between pages
  };

  useEffect(() => {
    const { employeeID, RMAK, RSAK } = details;
    employeeID && RMAK && RSAK ? setIsFormFilled(true) : setIsFormFilled(false);
  }, [details]);
  return (
    <>
      {/**header */}
      <div className='flex w-full justify-between items-center'>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <button
          onClick={() => {
            setNav({
              ...nav,
              isForgotPasswordPageActive: false,
              isRecoveryPageActive: true,
              isVerifyingIdentityPageActive: false,
            });
          }}
          type='button'
          title='Sign In'
          className='w-[120px] flex gap-3 h-[48px] justify-center rounded-[8px] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] items-center text-[#0E0E0E]'
        >
          <span>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.3544 13.8537C10.1594 14.0493 9.84285 14.0499 9.64724 13.855L4.16276 8.39C3.94705 8.17505 3.94705 7.82574 4.16276 7.6108L9.64725 2.14582C9.84285 1.9509 10.1594 1.95147 10.3544 2.14708C10.5493 2.34269 10.5487 2.65927 10.3531 2.85418L5.18851 8.0004L10.3531 13.1466C10.5487 13.3415 10.5493 13.6581 10.3544 13.8537Z'
                fill='#0E0E0E'
              />
            </svg>
          </span>
          <span>Back</span>
        </button>
      </div>
      {/**content */}
      <div className={`mt-20 flex flex-col justify-center items-center w-full px-8 ${styles['slide-in']}`}>
        <div className='container flex flex-col gap-2 max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='leading-[24px] text-base font-medium text-[#0E0E0E]'>Forgot Password</span>
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
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>
                RMAK (RYDEPRO Master Admin Key)
              </span>
              <textarea
                // type='text'
                // placeholder='AJK-1234-9587'
                placeholder='MIICXQIBAAKBgQCmSzU13xLBJvOiEal2E6N5o0RbwbzX1B86IwdIfL6LsgdBJbjeDk4UIaR5xgXfUyNN3gdBxYbn2iaGPnf8OsB9Y6e4F1FbvJ+3xnu/e2iNVmTJN9W'
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
                placeholder='MIICXQIBAAKBgQCmSzU13xLBJvOiEal2E6N5o0RbwbzX1B86IwdIfL6LsgdBJbjeDk4UIaR5xgXfUyNN3gdBxYbn2iaGPnf8OsB9Y6e4F1FbvJ+3xnu/e2iNVmTJN9W'
                value={details.RSAK}
                onChange={(e: { target: { value: string } }) => {
                  setDetails({ ...details, RSAK: e.target.value });
                }}
                className='h-[120px] break-words outline-none rounded-[8px] text-[#0E0E0E] border-y-[1px] p-[16px] border-[#DADADA] text-base leading-[24px] bg-white resize-none scrollbar-hide'
              ></textarea>
            </label>
          </div>
          <button
            disabled={!isFormFilled}
            onClick={handleSubmit}
            type='submit'
            className={`h-[56px] mt-4 p-[8px] w-full rounded-[8px] gap-[16px] ${
              isFormFilled
                ? 'bg-[#0E0E0E] text-[#FAF6F6] cursor-pointer'
                : 'bg-[#8A8A8A] cursor-not-allowed text-[#DADADA]'
            } text-base leading-[24px] text-[#FAF6F6]`}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default IdentityVerification1;
