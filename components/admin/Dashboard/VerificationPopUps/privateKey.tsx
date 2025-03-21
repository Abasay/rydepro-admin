'use client';
import React, { useState } from 'react';
import styles from '@/styles/common.module.css';
import { useDashboardContext } from '@/contexts/DashboardContext';
import Image from 'next/image';
import checkedIcon from './svgs/checkedIcon.svg';
import PopUp from '@/components/admin/Dashboard/PopUp/popUpDesign';
import toast from 'react-hot-toast';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import Cookies from 'js-cookie';
import { useLogInContext } from '@/contexts/LoginContext';

const PrivateKey = () => {
  const [placeholder, setPlaceholder] =
    useState<string>(`MIICXQIBAAKBgQCmSzU13xLBJvOiEal2E6N5o0RbwbzX1B86IwdIfL6LsgdBJbjeDk4UIaR5xgXfUyNN3gdBxYbn2iaGPnf8OsB9Y6e4F1FbvJ+3xnu/e2iNVmTJN9W
`);
  const [privateKeys, setPrivateKeys] = useState({
    RMAK: '',
    RSAK: '',
  });
  const { settings, setSettings } = useDashboardContext();
  const {
    userLoginCredentials: { username, employeeID, email },
  } = useLogInContext();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setPrivateKeys({ ...privateKeys, [name]: value });
  };

  const handleSubmit = async () => {
    const { RMAK, RSAK } = privateKeys;
    if (!RMAK || !RSAK) return toast.error('Both private keys are required!');

    toast.loading('Verifying your private keys.');

    try {
      const request = await postRequest({
        url: AdminUrls.verifyPrivateKeys,
        token: Cookies.get('token') || '',
        data: {
          username,
          // employeeId: employeeID,
          masterKey: privateKeys.RMAK,
          secondaryKey: privateKeys.RSAK,
          email,
        },
      });

      toast.dismiss();

      if (request.success) {
        toast.success('Private keys verified.');
        setSettings({
          ...settings,
          additionalSecurity: {
            ...settings.additionalSecurity,
            isSecurityVerified: true,
            isPopUpOpened: false,
          },
        });
      } else {
        toast.error(request.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };
  return (
    <PopUp>
      <form
        method='post'
        action=''
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
        }}
        className='w-[480px] h-[580px] flex flex-col gap-[6px]'
      >
        <div className='flex flex-col h-[116px] gap-[8px]'>
          <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Verification</span>
          <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Private Keys</h2>
          <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
            Please verify your identity by completing your RMAK (RYDEPRO Master Admin Key) and RSAK (RYDEPRO Secondary
            Admin Key).
          </span>
        </div>
        <label htmlFor='RMAK' className='h-[148px] flex flex-col gap-[8px] mt-6'>
          <span className='text-[14px] leading-[20px] font-medium text-[#2B2B2B]'>RMAK (RYDEPRO Master Admin Key)</span>
          <textarea
            id='RMAK'
            name='RMAK'
            onChange={handleChange}
            value={privateKeys.RMAK}
            placeholder={placeholder}
            className='h-[120px] text-base leading-[24px] text-[#0E0E0E] placeholder:text-gray-500 rounded-[8px] border-y-[1px] py-[8px] px-[16px] border-[#DADADA] bg-transparent resize-none outline-none'
          ></textarea>
        </label>
        <label htmlFor='RSAK' className='h-[148px] flex flex-col gap-[8px] mt-6'>
          <span className='text-[14px] leading-[20px] font-medium text-[#2B2B2B]'>
            RSAK (RYDEPRO Secondary Admin Key)
          </span>
          <textarea
            id='RSAK'
            name='RSAK'
            onChange={handleChange}
            value={privateKeys.RSAK}
            placeholder={placeholder}
            className='h-[120px] text-base leading-[24px] text-[#0E0E0E] placeholder:text-gray-500 rounded-[8px] border-y-[1px] py-[8px] px-[16px] border-[#DADADA] bg-transparent resize-none outline-none'
          ></textarea>
        </label>
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

export default PrivateKey;
