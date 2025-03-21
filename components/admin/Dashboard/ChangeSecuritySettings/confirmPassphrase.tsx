'use client';
import React, { useEffect, useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import copyIcon from '@/components/admin/AdminSignUp/PrivateKey/copyIcon.svg';
import toast from 'react-hot-toast';
import { dummyData } from '@/components/admin/AdminSignUp/PrivateKey/dummyData';
import { useSignInContext } from '@/contexts/SignUpContext';
import styles from '@/styles/common.module.css';
import { nestedData } from '@/components/admin/AdminSignUp/AdditionalSecurity/PinCodeOrPassphrase/dummydata';
import Component from '@/components/Button/button';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { postRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import Cookies from 'js-cookie';
import { useLogInContext } from '@/contexts/LoginContext';

const ConfirmChangePassphrase = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<boolean>(false);
  const [data, setData] = useState(dummyData);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const { navigation } = useSignInContext();
  const { passPhrases, setAuthChanged } = useDashboardContext();
  const { userLoginCredentials } = useLogInContext();

  const [passphrases, setPassphrases] = useState({
    passphrase1: '',
    passphrase2: '',
    passphrase3: '',
    passphrase4: '',
    passphrase5: '',
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setPassphrases({ ...passphrases, [name]: value });
  };

  const token = Cookies.get('token');
  const handleChangePassphrase = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !passphrases.passphrase1 ||
      !passphrases.passphrase2 ||
      !passphrases.passphrase3 ||
      !passphrases.passphrase4 ||
      !passphrases.passphrase5
    ) {
      toast.error('Please enter all passphrases');
      return;
    }

    const sortPassphrase = Object.values(passphrases);

    // console.log(sortPassphrase.join(''));
    if (sortPassphrase.join('') !== passPhrases.join('')) {
      toast.error('Passphrase does not match');
      return;
    }

    const newPassphrase = passPhrases.map((pass, idx) => {
      return { [`pass_${idx + 1}`]: pass };
    });

    toast.loading('Changing your passphrase...');
    // console.log(setUpToken);

    try {
      const request = await postRequest({
        url: AdminUrls.changePassphrase,
        token: token ?? '',
        data: {
          passphrase: newPassphrase,
          username: userLoginCredentials.username,
        },
      });

      toast.dismiss();

      if (request.success) {
        toast.success(request.message);
        setPassphrases({
          passphrase1: '',
          passphrase2: '',
          passphrase3: '',
          passphrase4: '',
          passphrase5: '',
        });
        setAuthChanged('Passphrase');
      } else {
        toast.error(request.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
    }
  };

  return (
    <>
      {/**content */}
      <div className={`w-full px-8 ${navigation.privateKeys ? styles['fade-in'] : styles['fade-out']}`}>
        <div className='flex justify-center w-full mt-4'>
          {
            <div className='mt-10 flex flex-col justify-center min-w-[640px] items-center gap-6'>
              <div className='min-h-[300px] grid grid-cols-2 grid-rows-3 gap-[24px]'>
                <label htmlFor='passphrase1' className='flex flex-col gap-[8px]'>
                  <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Passphrase 1</span>
                  <input
                    type='text'
                    id='passphrase1'
                    name='passphrase1'
                    value={passphrases.passphrase1}
                    onChange={handleChange}
                    className='h-[56px] rounded-[8px] border-y-[1px] p-[16px] border-[#DADADA] text-[16px] leading-[24px] text-[#0E0E0E] font-normal outline-none'
                  />
                </label>
                <label htmlFor='passphrase2' className='flex flex-col gap-[8px]'>
                  <span className='text-[14px] leading-[20px] text-[#0E0E0E] font-medium'>Passphrase 2</span>
                  <input
                    type='text'
                    id='passphrase2'
                    name='passphrase2'
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
                    value={passphrases.passphrase5}
                    name='passphrase5'
                    onChange={handleChange}
                    type='text'
                    className='h-[56px] rounded-[8px] border-y-[1px] p-[16px] border-[#DADADA] text-[16px] leading-[24px] text-[#0E0E0E] font-normal outline-none'
                  />
                </label>
              </div>

              <button
                onClick={handleChangePassphrase}
                type='submit'
                // disabled={isButtonDisabled}

                className={`h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] text-base leading-[24px] disabled:bg-[#8A8A8A] disabled:text-[#DADADA] text-[#FAF6F6] bg-[#0E0E0E]`}
              >
                Change Passphrase
              </button>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default ConfirmChangePassphrase;
