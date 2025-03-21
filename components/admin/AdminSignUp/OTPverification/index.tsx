'use client';
import React, { useRef, useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import Image from 'next/image';
import RydeProLogo from '@/public/RydeproLogo.png';
import arrowIcon from './arrow.svg';
import star from './star.svg';
import { useSignInContext } from '@/contexts/SignUpContext';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import toast from 'react-hot-toast';

const OTPVerification = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { navigation, setNavigation, userDetails, setSetUpToken, setUserDetails } = useSignInContext();
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !inputsRef.current[idx]?.value) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleBack = () => {
    setNavigation({ ...navigation, issignup: true, issignupotp: false });
  };

  const [verifying, setVerifying] = useState<boolean>(false);

  const handleSubmit = async () => {
    const otp = inputsRef.current.map((input) => input?.value).join('');
    if (otp.length < 6) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      setVerifying(false);

      const response = await postRequest({
        url: AdminUrls.verifyOtp,
        token: '',
        data: { otp, email: userDetails.email, username: userDetails.username },
      });

      if (response.success) {
        toast.success('OTP verified successfully');
        setSetUpToken(response.setupToken);
        setUserDetails({
          ...userDetails,
          employeeId: response.employeeId,
        });
        setNavigation({
          ...navigation,
          issignup: false,
          issignupotp: false,
          userIDGen: true,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    try {
      // Making the API request for admin signup
      toast.loading('Resending OTP code...');
      const response = await postRequest({
        url: AdminUrls.resendOtp,
        token: '', // No token required for signup
        data: {
          ...userDetails,
          // recaptchaToken,
        },
      });

      if (response.success) {
        toast.dismiss();
        toast.success('OTP code resent successfully.');
        // setNavigation({ ...navigation, issignup: false, issignupotp: true });
      } else {
        toast.dismiss();

        if (response.message.includes('OTP code already sent')) {
          toast.success('OTP code has already been sent, please check your mail.');
          setNavigation({ ...navigation, issignup: false, issignupotp: true });
          return;
        }
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error('An error occurred during signup.');
      console.error('Signup Error:', error);
    }
  };
  return (
    <>
      {/**header */}
      <div className={`flex w-full justify-between items-center `}>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <button
          onClick={handleBack}
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
      <div
        className={`mt-20 w-full px-8 flex justify-center items-center ${navigation.issignupotp && styles['slide-in']}`}
      >
        <div className='flex flex-col gap-6 container max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Create an Account</span>
            <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Verify your Identity</h2>
            <span className='text-base leading-[24px] text-[#3C3C3C]'>
              Enter the 6 digit code sent to your email address
            </span>
          </div>
          {/**code */}
          <div className='flex flex-col gap-6 mt-4 w-full'>
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
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  />
                ))}
            </div>
            <span className='text-[16px] leading-[24px] font-normal text-[#3C3C3C]'>
              Didn&apos;t get OTP?{' '}
              <span className='text-[#0E0E0E] font-medium cursor-pointer' onClick={handleResend}>
                Resend
              </span>
              .
            </span>
          </div>
          <button
            onClick={(e: React.FormEvent) => {
              e.preventDefault();
              handleSubmit();
            }}
            type='submit'
            className='h-[56px] p-[8px] rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]'
          >
            Verify OTP
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;
