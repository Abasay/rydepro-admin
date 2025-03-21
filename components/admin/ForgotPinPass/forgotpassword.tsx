'use client';
import React, { useEffect, useState } from 'react';
import GeneralDesign from '@/components/admin//GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useResetContext } from '@/contexts/ResetContext';
import axios from 'axios';
import { validEmail } from '@/utils/passwordCheck';
import { useLogInContext } from '@/contexts/LoginContext';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';

const ForgotPassword = () => {
  const [isEmailEmpty, setEmailEmpty] = useState<boolean>(true);
  const { nav, setNav, email, setEmail } = useResetContext();
  const { nav: logInNav, setNav: setLoginNav } = useLogInContext();
  const [requesting, setRequesting] = useState<boolean>(false);

  //handle submit on proceed
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailEmpty) return;

    if (!validEmail(email)) {
      toast.error('Not a valid email');
      return;
    }

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

  useEffect(() => {
    email === '' ? setEmailEmpty(true) : setEmailEmpty(false);
  }, [email]);
  return (
    <>
      {/**header */}
      <div className='flex w-full justify-between items-center'>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <button
          onClick={() => {
            window.location.href = '/login';
            setLoginNav({ ...logInNav, isPasswordPageActive: true });
          }}
          type='button'
          title='Sign In'
          className='w-[120px] h-[48px] rounded-[8px] text-[#0E0E0E] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] gap-[16px] flex items-center justify-center'
        >
          {/* <Image src={arrowIcon} alt='' width={20} height={20}/> */}
          <span>Back</span>
        </button>
      </div>
      {/**content */}
      <div className={`mt-20 flex flex-col justify-center items-center w-full px-8 ${styles['fade-in']}`}>
        <form className='container flex flex-col gap-2 max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='leading-[24px] text-base font-medium text-[#0E0E0E]'>Forgot Password</span>
            <h2 className='text-[#0E0E0E] leading-[32px] text-[24px] font-medium'>Forgot Password</h2>
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
            onClick={handleSubmit}
            type='submit'
            className={`h-[56px] mt-16 p-[8px] w-full rounded-[8px] gap-[16px] ${
              isEmailEmpty
                ? 'bg-[#8A8A8A] text-[#DADADA] cursor-not-allowed'
                : 'bg-[#0E0E0E] text-[#FAF6F6] cursor-pointer'
            }  text-base leading-[24px]`}
          >
            Proceed
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
