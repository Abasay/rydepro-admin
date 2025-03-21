'use client';
import React, { useEffect, useState } from 'react';
import GeneralDesign from '@/components/admin//GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Link from 'next/link';
import keyIcon from './key.svg';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLogInContext } from '@/contexts/LoginContext';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';

const Password = () => {
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const { nav, setNav, userLoginCredentials } = useLogInContext();
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    const { username } = userLoginCredentials;
    if (!username) return toast.error('Username is required.');

    try {
      const response = await postRequest({
        url: AdminUrls.verifyPassword,
        token: '',
        data: {
          username: userLoginCredentials.username,
          password,
        },
      });

      if (response.success) {
        toast.success(response.message);
        setNav({
          ...nav,
          isPasswordPageActive: false,
          isLoginPageActive: false,
          isPincodeOrPasswordPageActive: true,
        });
        return;
      }
      toast.error(response.message);
    } catch (error) {
      toast.error('An error occured. Please try again.');
    }
  };

  useEffect(() => {
    password === '' ? setIsPasswordEmpty(true) : setIsPasswordEmpty(false);
  }, [password]);
  return (
    <>
      {/**header */}
      <div className='flex w-full justify-between items-center'>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <Link href={'#'}>
          <button
            onClick={() => {
              setNav({
                ...nav,
                isLoginPageActive: true,
                isPasswordPageActive: false,
              });
            }}
            type='button'
            title='Back'
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
        </Link>
      </div>
      {/**content */}
      <div
        className={`mt-20 flex flex-col h-[screen] justify-center items-center w-full px-8 ${styles['slide-from-left']}`}
      >
        <div className='container min-h-[384px] flex flex-col gap-2 max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Additional Security</span>
            <h2 className='text-[#0E0E0E] text-[24px] leading-[32px] font-medium'>Password!</h2>
            <span className='text-base text-[#3C3C3C] leading-[24px] font-normal'>Please enter your password.</span>
          </div>
          {/**inputs */}
          <div className='flex w-full flex-col gap-6 mt-4'>
            <div className='flex flex-col'>
              <label htmlFor='' className='flex flex-col gap-2'>
                <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Password</span>
                <input
                  className='h-[56px] rounded-[8px] border-b-[1px] p-[16px] text-[#0E0E0E] border-[#DADADA] text-base leading-[24px] :placeholder:text-[#8A8A8A] outline-none'
                  type='password'
                  placeholder='**********'
                  value={password}
                  onChange={(e: { target: { value: string } }) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <Link
                href={'/reset'}
                className='w-full no-underline text-[#0E0E0E] font-medium mt-4 text-right text-base leading-[24px]'
              >
                Forgot Password?
              </Link>
            </div>
            {/**Sign In Button */}
            {/** */}
            <button
              type='submit'
              onClick={handleSubmit}
              className={`h-[56px] p-[8px] rounded-[8px] gap-[16px] ${
                isPasswordEmpty ? 'bg-[#8A8A8A]' : 'bg-[#0E0E0E]'
              }  text-base leading-[24px] text-[#FAF6F6]`}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
