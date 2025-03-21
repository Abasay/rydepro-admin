'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from '@/styles/common.module.css';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import Cookies from 'js-cookie';
import { useLogInContext } from '@/contexts/LoginContext';
import Success from '../VerificationPopUps/Success';
import { useDashboardContext } from '@/contexts/DashboardContext';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>({});
  const [message, setMessage] = useState({
    success: {
      text: '',
      color: '#0C8418',
    },
    failure: {
      text: '',
      color: '#D21B34',
    },
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const { userLoginCredentials } = useLogInContext();
  const { setAuthChanged } = useDashboardContext();

  const handlePasswordChange = async (e: { target: { value: string; name: string } }) => {
    const { name, value } = e.target;
    const { currentPassword, newPassword, confirmPassword } = passwords;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { currentPassword, newPassword } = passwords;
    if (!currentPassword || !newPassword) return toast.error('Please enter your password');

    setIsDisabled(true);
    setSuccess(false);
    try {
      const response = await postRequest({
        url: AdminUrls.changePassword,
        token: Cookies.get('token') || '',
        data: {
          username: userLoginCredentials.username,
          currentPassword,
          newPassword,
        },
      });
      if (response.success) {
        toast.success('Password successfully changed!');
        setPasswords({
          newPassword: '',
          confirmPassword: '',
          currentPassword: '',
        });
        setSuccess(true);
        setAuthChanged('Password');
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    const { newPassword, currentPassword, confirmPassword } = passwords;
    if (!newPassword || !currentPassword || !confirmPassword) setIsButtonDisabled(true);
  }, [passwords]);
  return (
    <>
      <section className='flex justify-center w-full'>
        <form
          onSubmit={handleSubmit}
          action=''
          method='post'
          className={`w-[480px] min-h-[436px] mt-10 flex flex-col gap-[64px] ${styles['slide-from-left']}`}
        >
          <div className='w-[inherit] h-[316px] flex flex-col gap-[32px]'>
            <label htmlFor='currentPassword' className='h-[84px] gap-[8px] flex flex-col'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Current Password</span>
              <input
                type='password'
                name='currentPassword'
                id='currentPassword'
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                placeholder='**********'
                className='h-[56px] rounded-[8px] text-[#0E0E0E] border-b-[1px] p-[16px] border-[#DADADA] outline-none'
              />
            </label>
            {message.success.text ? (
              <span className='text-[12px] leading-[16px] font-normal text-[#0C8418] flex items-center gap-[4px] rounded-[8px]'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2ZM8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3ZM7.24953 9.04242L10.1203 6.16398C10.3153 5.96846 10.6319 5.96803 10.8274 6.16304C11.0012 6.33637 11.0208 6.60577 10.8861 6.80082L10.8283 6.87014L7.60403 10.1031C7.43053 10.277 7.16082 10.2965 6.96576 10.1615L6.89645 10.1036L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645C5.32001 7.47288 5.58944 7.4536 5.78431 7.58859L5.85355 7.64645L7.24953 9.04242L10.1203 6.16398L7.24953 9.04242Z'
                    fill={message.success.color}
                  />
                </svg>

                <span>{message.success.text}</span>
              </span>
            ) : null}
            {/**New Password */}
            <label htmlFor='newPassword' className='h-[84px] gap-[8px] flex flex-col'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>New Password</span>
              <input
                type='password'
                name='newPassword'
                id='newPassword'
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                disabled={passwords.currentPassword === ''}
                placeholder='**********'
                className='h-[56px] rounded-[8px] text-[#0E0E0E] border-b-[1px] p-[16px] disabled:bg-[#EBEBEB] disabled:border-[#8A8A8A] border-[#DADADA] outline-none'
              />
              {error?.samePassword ? <span className=''>{error?.samePassword}</span> : null}
            </label>
            {/**Confirm Password */}
            <label htmlFor='confirmPassword' className='h-[84px] gap-[8px] flex flex-col'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Confirm Password</span>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                disabled={passwords.newPassword === ''}
                placeholder='**********'
                className='h-[56px] text-[#0E0E0E] rounded-[8px] border-b-[1px] p-[16px] disabled:bg-[#EBEBEB] disabled:border-[#8A8A8A] border-[#DADADA] outline-none'
              />
            </label>
          </div>
          <button
            onClick={(e: React.FormEvent) => {}}
            type='submit'
            disabled={
              (passwords.newPassword === '' && passwords.confirmPassword === '' && passwords.currentPassword === '') ||
              isDisabled
            }
            className={`h-[56px] w-full p-[8px] rounded-[8px] gap-[16px] text-base leading-[24px] disabled:bg-[#8A8A8A] disabled:text-[#DADADA] text-[#FAF6F6] bg-[#0E0E0E]`}
          >
            Change Password
          </button>
        </form>
      </section>

      {/* {success && <Success authChanged='Password' />} */}
    </>
  );
};

export default ChangePassword;
