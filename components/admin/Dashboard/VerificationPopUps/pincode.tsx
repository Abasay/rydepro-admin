'use client';
import React, { useRef, useState } from 'react';
import PopUp from '@/components/admin/Dashboard/PopUp/popUpDesign';
import { useDashboardContext } from '@/contexts/DashboardContext';
import toast from 'react-hot-toast';
import { AdminUrls } from '@/utils/urls';
import { postRequest } from '@/utils/requests';
import { useLogInContext } from '@/contexts/LoginContext';
import Cookies from 'js-cookie';

const Pincode = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState<any>('');
  const { settings, setSettings } = useDashboardContext();

  const { userLoginCredentials } = useLogInContext();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, employeeID } = userLoginCredentials;

    if (!username) return toast.error('Username is required.');

    const pinCode = inputsRef.current.map((input) => input?.value).join('');
    if (pinCode.length !== 6) return toast.error('Please enter a valid pincode');

    toast.loading('Verifying pincode...');
    try {
      const response = await postRequest({
        url: AdminUrls.verifySecurities,
        token: Cookies.get('token') || '',
        data: {
          username,
          employeeId: employeeID,
          value: pinCode,
          securityType: 'pinCode',
        },
      });

      toast.dismiss();
      if (response.success) {
        toast.success('Pincode verified successfully');
        setSettings({
          ...settings,
          additionalSecurity: {
            ...settings.additionalSecurity,
            isSecurityVerified: true,
            isPopUpOpened: false,
          },
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('An error occured, please try again');
    }
  };
  return (
    <PopUp>
      <form action='' method='post' onSubmit={handleSubmit} className='w-[480px] h-[328px] flex flex-col gap-[32px]'>
        <div className=' flex flex-col gap-[32px]'>
          <div className='gap-[8px] flex flex-col h-[92px]'>
            <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Verification</span>
            <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Pincode</h2>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
              Please verify your identity by completing your pincode
            </span>
          </div>
        </div>
        {/**code */}
        <div className='flex flex-col gap-[8px] w-full'>
          <span className='text-[14px] leading-[20px] font-medium text-[#0E0E0E]'>Pincode</span>
          <div className='flex justify-between relative gap-2 md:gap-3'>
            {Array(6)
              .fill('')
              .map((_, idx) => (
                <input
                  key={idx}
                  ref={(el: any) => (inputsRef.current[idx] = el)}
                  className='focus-within:outline-none h-[56px] w-[56px] text-[#0E0E0E] placeholder:text-[#0E0E0E] rounded-[4px] text-[20px] border-y-[1px] border-[#8A8A8A] gap-[8px] text-center font-normal text-xl'
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
        <button
          type='submit'
          className={`h-[56px] p-[8px] w-full rounded-[8px] gap-[16px] bg-[#0E0E0E] text-[#FAF6F6] text-base leading-[24px] `}
          onClick={handleSubmit}
        >
          Proceed
        </button>
      </form>
    </PopUp>
  );
};

export default Pincode;
