'use client';
import React, { useRef, useState } from 'react';
import styles from '@/styles/common.module.css';
import { useLogInContext } from '@/contexts/LoginContext';
import toast from 'react-hot-toast';
import { AdminUrls } from '@/utils/urls';
import Cookies from 'js-cookie';
import { postRequest } from '@/utils/requests';
import Success from '../VerificationPopUps/Success';
import PopUp from '../PopUp/popUpDesign';
import { useDashboardContext } from '@/contexts/DashboardContext';

const ChangePincode = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const newPassRef = useRef<(HTMLInputElement | null)[]>([]);
  const confirmPassRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<any>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const { userLoginCredentials } = useLogInContext();
  const { settings, setSettings, setAuthChanged } = useDashboardContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value))) {
      setError({
        inputsRef: 'Please enter a valid number',
      });

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

  const handleNewPincode = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value))) {
      setError({
        newPassRef: 'Please enter a valid number',
      });

      e.target.value = '';
      setTimeout(() => {
        setError({ newPassRef: '' });
      }, 3000);

      return;
    }
    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }
    if (value.length === 1 && idx < newPassRef.current.length - 1) {
      newPassRef.current[idx + 1]?.focus();
    }
  };

  const handleConfirmPincode = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    if (Number.isNaN(Number(value))) {
      setError({
        confirmPassRef: 'Please enter a valid number',
      });

      e.target.value = '';
      setTimeout(() => {
        setError({ confirmPassRef: '' });
      }, 3000);

      return;
    }
    if (value.length > 1) {
      e.target.value = value.charAt(0);
    }
    if (value.length === 1 && idx < confirmPassRef.current.length - 1) {
      confirmPassRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !inputsRef.current[idx]?.value) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleNewPinCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !newPassRef.current[idx]?.value) {
      newPassRef.current[idx - 1]?.focus();
    }
  };

  const handleConfirmPinCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && idx > 0 && !confirmPassRef.current[idx]?.value) {
      confirmPassRef.current[idx - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, employeeID } = userLoginCredentials;

    if (!username) return toast.error('Username is required.');

    const pinCode = inputsRef.current.map((input) => input?.value).join('');
    const newPinCode = newPassRef.current.map((input) => input?.value).join('');
    const confirmPinCode = confirmPassRef.current.map((input) => input?.value).join('');

    if (pinCode.length !== 6) return toast.error('Please enter a valid pincode');

    if (newPinCode.length !== 6) return toast.error('Please enter a valid pincode');

    if (newPinCode !== confirmPinCode) return toast.error('Pincode does not match');

    setSuccess(false);

    setIsButtonDisabled(true);

    toast.loading('Changing your pincode...');
    try {
      const response = await postRequest({
        url: AdminUrls.changePinCode,
        token: Cookies.get('token') || '',
        data: {
          username,
          employeeId: employeeID,
          oldPinCode: pinCode,
          pinCode: newPinCode,
        },
      });

      toast.dismiss();

      if (response.success) {
        toast.success(response.message);
        setAuthChanged('Pincode');

        setSuccess(true);
        inputsRef.current.forEach((input: any) => (input.value = ''));
        newPassRef.current.forEach((input: any) => (input.value = ''));
        confirmPassRef.current.forEach((input: any) => (input.value = ''));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occured, please try again');
    } finally {
      setIsButtonDisabled(false);
    }
  };
  return (
    <>
      <section className='flex justify-center w-full'>
        <form
          action=''
          method='post'
          onSubmit={handleSubmit}
          className={`w-[480px] h-[436px] flex flex-col gap-[64px] mt-10 ${styles['slide-from-bottom']}`}
        >
          <div className='flex flex-col gap-[32px] h-[316px]'>
            {/**Current pin code */}
            <div className='flex flex-col gap-[8px] w-full'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Pincode</span>
              <div className='flex justify-between relative gap-2 md:gap-3'>
                {Array(6)
                  .fill('')
                  .map((_, idx) => (
                    <input
                      key={idx}
                      ref={(el: any) => (inputsRef.current[idx] = el)}
                      className='focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] rounded-[4px] text-[20px] border-b-[1px] border-[#8A8A8A] gap-[8px] text-center font-normal text-xl'
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
            </div>
            {/** New Pincode */}
            <div className='flex flex-col gap-[8px] w-full'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>New Pincode</span>
              <div className='flex justify-between relative gap-2 md:gap-3'>
                {Array(6)
                  .fill('')
                  .map((_, idx) => (
                    <input
                      key={idx}
                      ref={(el: any) => (newPassRef.current[idx] = el)}
                      className='focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] rounded-[4px] text-[20px] border-b-[1px] border-[#8A8A8A] gap-[8px] text-center font-normal text-xl'
                      maxLength={1}
                      type='text'
                      inputMode='numeric'
                      placeholder='*'
                      pattern='[0-9]*'
                      onChange={(e) => handleNewPincode(e, idx)}
                      onKeyDown={(e) => handleNewPinCodeKeyDown(e, idx)}
                    />
                  ))}
              </div>
            </div>
            {/** Confirm Pincode */}
            <div className='flex flex-col gap-[8px] w-full'>
              <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Confirm Pincode</span>
              <div className='flex justify-between relative gap-2 md:gap-3'>
                {Array(6)
                  .fill('')
                  .map((_, idx) => (
                    <input
                      key={idx}
                      ref={(el: any) => (confirmPassRef.current[idx] = el)}
                      className='focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] rounded-[4px] text-[20px] border-b-[1px] border-[#8A8A8A] gap-[8px] text-center font-normal text-xl'
                      maxLength={1}
                      type='text'
                      inputMode='numeric'
                      placeholder='*'
                      pattern='[0-9]*'
                      onChange={(e) => handleConfirmPincode(e, idx)}
                      onKeyDown={(e) => handleConfirmPinCodeKeyDown(e, idx)}
                    />
                  ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            type='submit'
            // disabled={isButtonDisabled}
            className={`h-[56px] w-full p-[8px] rounded-[8px] gap-[16px] text-base leading-[24px] disabled:bg-[#8A8A8A] disabled:text-[#DADADA] text-[#FAF6F6] bg-[#0E0E0E]`}
          >
            Change Pincode
          </button>
        </form>
      </section>
      {/* {success && (
        <div className='w-full filter brightness-75 min-h-full top-0'>
          <div className=' w-full justify-center absolute top-[134px] h-full items-center flex'>
            <Success authChanged='Pincode' />
          </div>
        </div>
      )} */}
    </>
  );
};

export default ChangePincode;
