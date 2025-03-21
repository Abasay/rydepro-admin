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

const RecoveryCode = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { nav, setNav, email, setSetupToken } = useResetContext();
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [errorRecoveryCode, setErrorRecoveryCode] = useState({
    isError: false,
    message: 'Recovery Code is incorrect! Please try again.',
  });
  const [error, setError] = useState<any>('');
  const [requesting, setRequesting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value))) {
      setError({ inputsRef: 'Please enter a valid number' });
      e.target.value = '';
      setTimeout(() => {
        setError({ inputsRef: '' });
      }, 3000);

      return;
    }
    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }
    if (value.length === 1 && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
    // Check if all inputs are filled to set isCodeComplete
    const allFilled = inputsRef.current.every((input) => input?.value);
    setIsCodeComplete(allFilled); // Set to true if all are filled, false otherwise
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !inputsRef.current[idx]?.value) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  //handle submit on proceed
  const resendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    setRequesting(true);

    try {
      const request = await postRequest({
        url: AdminUrls.recoveryEmail,
        token: '',
        data: { email },
      });
      if (request.success) {
        toast.success(request.message);
        setNav({
          ...nav,
          isForgotPasswordPageActive: false,
          isRecoveryPageActive: true,
        });
      } else {
        toast.error(request.message);
      }
    } catch (error) {
      toast.error('Failed to send Recovery Code');
      //return;
    } finally {
      setRequesting(false);
    }
  };

  //verify the recovery code
  const verifyRecoveryCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = inputsRef.current.map((input) => input?.value).join('');

    if (!isCodeComplete) return;
    try {
      const request = await postRequest({
        url: AdminUrls.recoveryCode,
        token: '',
        data: { email, otp: otpCode },
      });
      if (request.success) {
        toast.success(request.message);
        setNav({
          ...nav,
          isForgotPasswordPageActive: false,
          isRecoveryPageActive: false,
          isVerifyingIdentityPageActive: true,
        });
        setSetupToken(request.setupToken);
      } else {
        toast.error(request.message);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || errorRecoveryCode.message;
      setErrorRecoveryCode({ isError: true, message: errorMessage });
      //toast.error(errorMessage);
      toast.error('Failed to verify Recovery Code, please try again.');
    }

    //conditional testing to simulate between pages
  };

  return (
    <>
      {/**header */}
      <div className='flex w-full justify-between items-center'>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <button
          onClick={() => {
            //conditional testing to simulate between pages
            setNav({
              ...nav,
              isForgotPasswordPageActive: true,
              isRecoveryPageActive: false,
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
      <div className={`mt-20 flex flex-col justify-center items-center w-full px-8 ${styles['slide-from-left']}`}>
        <div className='container flex flex-col gap-2 max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='leading-[24px] text-base font-medium text-[#0E0E0E]'>Forgot Password</span>
            <h2 className='text-[#0E0E0E] leading-[32px] text-[24px] font-medium'>Recovery Code</h2>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
              Enter the 6 digit recovery code sent to your email address
            </span>
          </div>
          {/**code */}
          <div className='flex flex-col gap-6 mt-6 w-full'>
            <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Code</span>
            <div className='flex justify-between relative gap-2 md:gap-3'>
              {Array(6)
                .fill('')
                .map((_, idx) => (
                  <input
                    key={idx}
                    ref={(el: any) => (inputsRef.current[idx] = el)}
                    className='focus-within:outline-none h-[56px] w-[56px] text-zinc-700 placeholder-inputcolor rounded-[4px] text-[20px] border-b-[1px] border-[#8A8A8A] gap-[8px] text-center font-[500]'
                    maxLength={1}
                    type='text'
                    inputMode='numeric'
                    placeholder='*'
                    pattern='[0-9]*'
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  />
                ))}
            </div>
            {errorRecoveryCode.isError && (
              <span className='text-[#D21B34] text-[12px] leading-[16px] font-normal flex gap-2 items-center'>
                <span>
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0ZM6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1ZM3.83859 3.96569L3.89645 3.89645C4.07001 3.72288 4.33944 3.7036 4.53431 3.83859L4.60355 3.89645L6 5.293L7.39645 3.89645C7.57001 3.72288 7.83944 3.7036 8.03431 3.83859L8.10355 3.89645C8.27712 4.07001 8.2964 4.33944 8.16141 4.53431L8.10355 4.60355L6.707 6L8.10355 7.39645C8.27712 7.57001 8.2964 7.83944 8.16141 8.03431L8.10355 8.10355C7.92999 8.27712 7.66056 8.2964 7.46569 8.16141L7.39645 8.10355L6 6.707L4.60355 8.10355C4.42999 8.27712 4.16056 8.2964 3.96569 8.16141L3.89645 8.10355C3.72288 7.92999 3.7036 7.66056 3.83859 7.46569L3.89645 7.39645L5.293 6L3.89645 4.60355C3.72288 4.42999 3.7036 4.16056 3.83859 3.96569L3.89645 3.89645L3.83859 3.96569Z'
                      fill='#D21B34'
                    />
                  </svg>
                </span>
                <span>{errorRecoveryCode.message}</span>
              </span>
            )}
            <span className='text-[16px] leading-[24px] font-normal text-[#3C3C3C]'>
              Didn&apos;t get Recovery Code?{' '}
              <button onClick={resendCode} className='text-[#0E0E0E] no-underline font-medium'>
                Resend
              </button>
              .
            </span>
          </div>
          <button
            onClick={verifyRecoveryCode}
            type='submit'
            disabled={!isCodeComplete || requesting}
            className={`h-[56px] mt-16 p-[8px] w-full rounded-[8px] gap-[16px] ${
              isCodeComplete
                ? 'bg-[#0E0E0E] text-[#FAF6F6] cursor-pointer'
                : 'bg-[#8A8A8A] cursor-not-allowed text-[#DADADA]'
            } text-base leading-[24px]`}
          >
            Verify Recovery Code
          </button>
        </div>
      </div>
    </>
  );
};

export default RecoveryCode;
