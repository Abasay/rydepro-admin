'use client';
import React, { useState } from 'react';
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
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Login = () => {
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const { userLoginCredentials, setUserLoginCredentials, nav, setNav } = useLogInContext();

  const [keys, setKeys] = useState<{ masterkey: string; secondaryKey: string }>({
    masterkey: '',
    secondaryKey: '',
  });

  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { name, value } = e.target;
    setUserLoginCredentials({ ...userLoginCredentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log('not available to execute recaptcha');
      return;
    }

    const gRecaptchaToken = await executeRecaptcha('inquirySubmit');
    // console.log('gRecaptchaToken', gRecaptchaToken);
    const { username, employeeID } = userLoginCredentials;
    if (!username || !employeeID) return toast.error('All fields are required.');
    setLoggingIn(true);
    toast.loading('Logging in...');
    try {
      const response = await postRequest({
        url: AdminUrls.login,
        token: '',
        data: {
          username,
          employeeId: employeeID,
          masterKey: keys.masterkey,
          secondaryKey: keys.secondaryKey,
          gRecaptchaToken,
        },
      });

      toast.dismiss();
      if (response.success) {
        setLoggingIn(false);
        toast.success('Details verified, please continue.');
        setNav({
          ...nav,
          isLoginPageActive: false,
          isPasswordPageActive: true,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occurred, please try again.');
    } finally {
      setLoggingIn(false);
    }
  };
  return (
    <>
      {/**header */}
      <div className='flex w-full justify-between items-center'>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <Link href={'/signup'}>
          <button
            type='button'
            title='Sign In'
            className='w-[120px] h-[48px] rounded-[8px] text-[#0E0E0E] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] gap-[16px] flex items-center justify-center'
          >
            {/* <Image src={arrowIcon} alt='' width={20} height={20}/> */}
            <span>Sign Up</span>
          </button>
        </Link>
      </div>
      {/**content */}
      <div className={`mt-10 flex flex-col justify-center items-center w-full px-8 }`}>
        <div className='container flex flex-col gap-2 max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Login into your Account</span>
            <h2 className='text-[#0E0E0E] text-[24px] leading-[32px] font-medium'>Welcome back to RYDEPRO!</h2>
            <span className='text-base text-[#3C3C3C] leading-[24px] font-normal'>
              We&apos;re happy to have you back with us.
            </span>
          </div>
          {/**inputs */}
          <form onSubmit={handleSubmit} className='flex w-full flex-col gap-6 mt-10'>
            <label htmlFor='username' className='flex flex-col gap-2'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Username</span>
              <input
                className='h-[56px] rounded-[8px] border-b-[1px] p-[16px] text-[#0E0E0E] border-[#DADADA] text-base leading-[24px] :placeholder:text-[#8A8A8A] outline-none'
                type='text'
                placeholder='John Doe'
                value={userLoginCredentials.username}
                name='username'
                id='username'
                onChange={handleChange}
              />
            </label>
            <label htmlFor='employeeID' className='flex flex-col gap-2'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Employee ID</span>
              <input
                className='h-[56px] rounded-[8px] border-b-[1px] p-[16px] text-[#0E0E0E] border-[#DADADA] text-base leading-[24px] :placeholder:text-[#8A8A8A] outline-none'
                type='text'
                placeholder='AJK-1234-9587'
                value={userLoginCredentials.employeeID}
                name='employeeID'
                id='employeeID'
                onChange={handleChange}
              />
            </label>
            <label htmlFor='privateKey1' className='flex flex-col gap-2'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Private Key 1</span>
              <span className='flex items-center'>
                <Image src={keyIcon} alt='' className='absolute ml-4' width={16} height={16} />
                <input
                  className='h-[56px] rounded-[8px] border-b-[1px] pl-10 pr-[16px] py-[16px] text-[#0E0E0E] border-[#DADADA] text-base leading-[24px] :placeholder:text-[#8A8A8A] outline-none'
                  type='text'
                  placeholder='**********'
                  value={keys.masterkey}
                  name='privateKey1'
                  id='privateKey1'
                  onChange={(e: any) => {
                    setKeys({ ...keys, masterkey: e.target.value });
                  }}
                />
              </span>
            </label>
            <label htmlFor='privateKey2' className='flex flex-col gap-2'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Private Key 2</span>
              <span className='flex items-center'>
                <Image src={keyIcon} alt='' className='absolute ml-4' width={16} height={16} />
                <input
                  className='h-[56px] rounded-[8px] border-b-[1px] pl-10 pr-[16px] py-[16px] text-[#0E0E0E] border-[#DADADA] text-base leading-[24px] :placeholder:text-[#8A8A8A] outline-none'
                  type='text'
                  placeholder='**********'
                  value={keys.secondaryKey}
                  name='privateKey2'
                  id='privateKey2'
                  onChange={(e: any) => {
                    setKeys({ ...keys, secondaryKey: e.target.value });
                  }}
                />
              </span>
            </label>
            {/**recaptcha */}
            <div className='recaptcha-container w-full mx-auto'>
              {/* <ReCAPTCHA
                className='w-full'
                style={{ width: '100%' }}
                sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY} // Ensure to add this to your .env.local
                onChange={(token: any) => setRecaptchaToken(token)}
              /> */}
            </div>
            {/**Sign In Button */}
            <input
              type='submit'
              value={loggingIn ? 'Signing In' : 'Sign In'}
              disabled={loggingIn}
              onClick={handleSubmit}
              className='h-[56px] p-[8px] cursor-pointer rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]'
            />

            {/**text */}
            <span className='mt-8 text-base leading-[24px] text-center text-[#3C3C3C]'>
              Already have an account? Click here to{' '}
              <Link href={'/signup'} className='no-underline font-medium text-[#0E0E0E]'>
                Sign Up
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
