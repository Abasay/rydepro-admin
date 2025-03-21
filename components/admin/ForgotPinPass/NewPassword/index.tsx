import React, { useState } from 'react';
import GeneralDesign from '@/components/admin//GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import {
  validateSpecialSymbols,
  validateNumber,
  validateLowerCase,
  validateUpperCase,
  validatePassword,
} from '@/utils/passwordCheck';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useResetContext } from '@/contexts/ResetContext';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import { useRouter } from 'next/navigation';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { nav, setNav, setupToken, email, setAuthRecovered } = useResetContext();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSpecialSymbols(newPassword) || !validateSpecialSymbols(confirmPassword)) {
      toast.error('Must include special character');
      return;
    }
    // if (!validateNumber(newPassword) || !validateNumber(confirmPassword)) {
    //   toast.error('Must ');
    //   return;
    // }
    if (!validateLowerCase(newPassword) || !validateLowerCase(confirmPassword)) {
      toast.error('Must include a lowercase character');
      return;
    }
    if (!validateUpperCase(newPassword) || !validateUpperCase(confirmPassword)) {
      toast.error('Must include Upper case character ');
      return;
    }
    if (newPassword.length < 8 || confirmPassword.length < 8) {
      toast.error('Password should be at least 8 characters long');
      return;
    }

    if (confirmPassword !== newPassword) {
      toast.error('Passwords do not match');
      return;
    }

    toast.loading('Resetting your password...');

    try {
      const request = await postRequest({
        url: AdminUrls.setPassword,
        token: setupToken,
        data: {
          email,
          password: newPassword,
          confirm: newPassword,
        },
      });

      toast.dismiss();
      if (request.success) {
        // toast.success()
        setAuthRecovered('Password');
        setNav({
          ...nav,
          // isForgotPasswordPageActive: false,
          // isRecoveryPageActive: false,
          // isVerifyingIdentityPageActive: false,
          // isPincodeOrPassphrasePageActive: false,
          // isOTPPageActive: false,
          // isBiometricPageActive: false,
          // isNewPasswordPageActive: false,
          isSuccess: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
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
              isPincodeOrPassphrasePageActive: false,
              isOTPPageActive: false,
              isBiometricPageActive: true,
              isNewPasswordPageActive: false,
            });
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
      <div className={`mt-20 flex flex-col justify-center items-center w-full px-8 ${styles['slide-from-left']}`}>
        <div className='container flex flex-col gap-2 max-w-[480px]'>
          <div className='flex flex-col gap-1'>
            <span className='leading-[24px] text-base font-medium text-[#0E0E0E]'>Forgot Password</span>
            <h2 className='text-[#0E0E0E] leading-[32px] text-[24px] font-medium'>New Password</h2>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>Enter your new password.</span>
          </div>
          {/**inputs */}
          <div className='flex flex-col gap-4 mt-8'>
            <label htmlFor='' className='flex flex-col gap-1'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>New Password</span>
              <input
                type='password'
                placeholder='**********'
                value={newPassword}
                onChange={(e: { target: { value: string } }) => {
                  setNewPassword(e.target.value);
                }}
                className='h-[56px] rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA] outline-none text-[#0E0E0E]'
              />
              <span className='flex items-center gap-2'>
                <span>
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M6 5C6.27614 5 6.5 5.22386 6.5 5.5V8.5C6.5 8.77614 6.27614 9 6 9C5.72386 9 5.5 8.77614 5.5 8.5V5.5C5.5 5.22386 5.72386 5 6 5ZM6.00001 4.24907C6.41369 4.24907 6.74905 3.91371 6.74905 3.50003C6.74905 3.08635 6.41369 2.751 6.00001 2.751C5.58633 2.751 5.25098 3.08635 5.25098 3.50003C5.25098 3.91371 5.58633 4.24907 6.00001 4.24907ZM0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6ZM6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1Z'
                      fill='#111111'
                    />
                  </svg>
                </span>
                <span className='text-[12px] leading-[16px] font-normal text-[#3C3C3C]'>
                  Password should be at least 8 characters long, contain at least 1 uppercase, 1 lowercase, & 1 special
                  character
                </span>
              </span>
            </label>
            <label htmlFor='' className='flex flex-col gap-1 mt-2'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Confirm New Password</span>
              <input
                type='password'
                placeholder='**********'
                value={confirmPassword}
                onChange={(e: { target: { value: string } }) => {
                  setConfirmPassword(e.target.value);
                }}
                className='h-[56px] rounded-[8px] border-b-[1px] p-[16px] border-[#DADADA] outline-none text-[#0E0E0E]'
              />
            </label>
          </div>
          <button
            onClick={handleSubmit}
            type='submit'
            className={`h-[56px] mt-10 p-[8px] w-full rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]`}
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
