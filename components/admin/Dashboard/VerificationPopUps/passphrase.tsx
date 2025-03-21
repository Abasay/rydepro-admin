'use client';
import React, { useState } from 'react';
import PopUp from '@/components/admin/Dashboard/PopUp/popUpDesign';
import { useDashboardContext } from '@/contexts/DashboardContext';
import toast from 'react-hot-toast';
import { AdminUrls } from '@/utils/urls';
import Cookies from 'js-cookie';
import { useLogInContext } from '@/contexts/LoginContext';
import { postRequest } from '@/utils/requests';

const Passphrase = () => {
  const [passphrases, setPassphrases] = useState({
    passphrase1: '',
    passphrase2: '',
    passphrase3: '',
    passphrase4: '',
    passphrase5: '',
  });
  const { settings, setSettings } = useDashboardContext();
  const { userLoginCredentials } = useLogInContext();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setPassphrases({ ...passphrases, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, employeeID } = userLoginCredentials;

    const newPassphrase = Object.values(passphrases).map((pass, idx) => {
      return { [`pass_${idx + 1}`]: pass };
    });
    console.log(newPassphrase);

    if (!username) return toast.error('Username is required.');

    if (newPassphrase.length < 5) return toast.error('Please enter a valid passphrase');

    toast.loading('Verifying passphrase...');
    try {
      const response = await postRequest({
        url: AdminUrls.verifySecurities,
        token: Cookies.get('token') || '',
        data: {
          username,
          employeeId: employeeID,
          value: newPassphrase,
          securityType: 'passphrase',
        },
      });

      toast.dismiss();
      if (response.success) {
        toast.success('Passphrase verified successfully');
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
      <form
        action=''
        method='post'
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
        }}
        className='w-[480px] min-h-[544px] flex flex-col gap-[64px]'
      >
        <div className='min-h-[424px] flex flex-col gap-[32px]'>
          <div className='gap-[8px] flex flex-col h-[92px]'>
            <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Verification</span>
            <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Passphrase</h2>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
              Please verify your identity by completing your passphrase
            </span>
          </div>
          <div className='min-h-[300px] grid grid-cols-2 grid-rows-3 gap-[24px]'>
            <label htmlFor='passphrase1' className='flex flex-col gap-[8px]'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Passphrase 1</span>
              <input
                type='text'
                id='passphrase1'
                name='passphrase1'
                value={passphrases.passphrase1}
                onChange={handleChange}
                placeholder='Passphrase 1'
                className='h-[56px] rounded-[8px] border-y-[1px] p-[16px] border-[#DADADA] text-[16px] leading-[24px] text-[#0E0E0E] font-normal outline-none'
              />
            </label>
            <label htmlFor='passphrase2' className='flex flex-col gap-[8px]'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Passphrase 2</span>
              <input
                type='text'
                id='passphrase2'
                name='passphrase2'
                placeholder='Passphrase 2'
                value={passphrases.passphrase2}
                onChange={handleChange}
                className='h-[56px] rounded-[8px] border-y-[1px] p-[16px] border-[#DADADA] text-[16px] leading-[24px] text-[#0E0E0E] font-normal outline-none'
              />
            </label>
            <label htmlFor='passphrase3' className='flex flex-col gap-[8px]'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Passphrase 3</span>
              <input
                id='passphrase3'
                name='passphrase3'
                placeholder='Passphrase 3'
                value={passphrases.passphrase3}
                onChange={handleChange}
                type='text'
                className='h-[56px] rounded-[8px] border-y-[1px] p-[16px] border-[#DADADA] text-[16px] leading-[24px] text-[#0E0E0E] font-normal outline-none'
              />
            </label>
            <label htmlFor='passphrase4' className='flex flex-col gap-[8px]'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Passphrase 4</span>
              <input
                id='passphrase4'
                name='passphrase4'
                placeholder='Passphrase 4'
                value={passphrases.passphrase4}
                onChange={handleChange}
                type='text'
                className='h-[56px] rounded-[8px] border-y-[1px] p-[16px] border-[#DADADA] text-[16px] leading-[24px] text-[#0E0E0E] font-normal outline-none'
              />
            </label>
            <label htmlFor='passphrase5' className='flex flex-col gap-[8px]'>
              <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Passphrase 5</span>
              <input
                id='passphrase5'
                placeholder='Passphrase 5'
                value={passphrases.passphrase5}
                name='passphrase5'
                onChange={handleChange}
                type='text'
                className='h-[56px] rounded-[8px] border-y-[1px] p-[16px] border-[#DADADA] text-[16px] leading-[24px] text-[#0E0E0E] font-normal outline-none'
              />
            </label>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type='submit'
          className={`h-[56px] mt-10 p-[8px] w-full rounded-[8px] gap-[16px] bg-[#0E0E0E] text-[#FAF6F6] text-base leading-[24px] `}
        >
          Proceed
        </button>
      </form>
    </PopUp>
  );
};

export default Passphrase;
