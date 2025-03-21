'use client';
import React, { useRef, useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import Image from 'next/image';
import RydeProLogo from '@/public/RydeproLogo.png';
import arrowIcon from './arrow.svg';
import star from './star.svg';
import { useResetContext } from '@/contexts/ResetContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from '@/styles/common.module.css';
import { AdminUrls } from '@/utils/urls';
import { postRequest } from '@/utils/requests';

const OTPVerificationFP = () => {
  const { nav, setNav, email } = useResetContext();
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [errorRecoveryCode, setErrorRecoveryCode] = useState({
    isError: false,
    message: 'Recovery Code is incorrect! Please try again.',
  });
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<any>('');
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

  //handle resendOTP
  //handle submit on proceed
  const resendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    // setRequesting(true);

    try {
      const request = await postRequest({
        url: AdminUrls.recoveryEmail,
        token: '',
        data: { email },
      });
      if (request.success) {
        toast.success(request.message);
      } else {
        toast.error(request.message);
      }
    } catch (error) {
      toast.error('Failed to send Recovery Code');
      //return;
    } finally {
      // setRequesting(false);
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
        // setNav({
        //   ...nav,
        //   isForgotPasswordPageActive: false,
        //   isRecoveryPageActive: false,
        //   isVerifyingIdentityPageActive: false,
        //   isPincodeOrPassphrasePageActive: false,
        //   isOTPPageActive: false,
        //   isBiometricPageActive: true,
        // });
        setNav({
          ...nav,
          isForgotPasswordPageActive: false,
          isRecoveryPageActive: false,
          isVerifyingIdentityPageActive: false,
          isPincodeOrPassphrasePageActive: false,
          isOTPPageActive: false,
          isBiometricPageActive: false,
          isNewPasswordPageActive: true,
        });
        // setSetupToken(request.setupToken);
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
              isForgotPasswordPageActive: false,
              isRecoveryPageActive: false,
              isVerifyingIdentityPageActive: false,
              isPincodeOrPassphrasePageActive: true,
              isOTPPageActive: false,
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
      <div className={`mt-20 w-full px-8 flex justify-center items-center ${styles['slide-from-left']}`}>
        <div className='flex flex-col gap-6 container max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Forgot Password</span>
            <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Verify your Identity</h2>
            <span className='text-base leading-[24px] text-[#3C3C3C]'>
              Enter the 6 digit code sent to your email address
            </span>
          </div>
          {/**code */}
          <div className='flex flex-col gap-2 mt-4 w-full'>
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
                    pattern='[0-9]*'
                    placeholder='*'
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  />
                ))}
            </div>
            <span className='text-[16px] leading-[24px] mt-2 font-normal text-[#3C3C3C]'>
              Didn&apos;t get OTP?{' '}
              <span title='resend OTP' className='text-[#0E0E0E] font-medium cursor-pointer' onClick={resendCode}>
                Resend
              </span>
              .
            </span>
          </div>
          <button
            onClick={verifyRecoveryCode}
            type='submit'
            className={`h-[56px] p-[8px] rounded-[8px] gap-[16px] ${
              isCodeComplete
                ? 'bg-[#0E0E0E] text-[#FAF6F6] cursor-pointer'
                : 'bg-[#8A8A8A] cursor-not-allowed text-[#DADADA]'
            } text-base leading-[24px] text-[#FAF6F6]`}
          >
            Verify OTP
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPVerificationFP;
