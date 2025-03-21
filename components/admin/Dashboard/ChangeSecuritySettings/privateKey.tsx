'use client';
import React, { useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import copyIcon from '@/components/admin/AdminSignUp/PrivateKey/copyIcon.svg';
import toast from 'react-hot-toast';
import { dummyData } from '@/components/admin/AdminSignUp/PrivateKey/dummyData';
import { useSignInContext } from '@/contexts/SignUpContext';
import styles from '@/styles/common.module.css';
import { getRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import Cookies from 'js-cookie';
import { text } from 'stream/consumers';

const ChangePrivateKey = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<boolean>(false);
  const [data, setData] = useState(dummyData);
  const { navigation, setNavigation, additionalSecurity, setAdditionalSecurity } = useSignInContext();

  // const generatePrivateKey = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   setShowPrivateKeys(true);
  // };

  const generatePrivateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Making the API request for admin signup
      const response = await getRequest({
        url: AdminUrls.generatePrivateKeys,
        token: Cookies.get('token') || '', // No token required for signup
      });

      if (response.success) {
        const newData = [
          {
            ...data[0],
            text: response.masterKey,
          },
          {
            ...data[1],
            text: response.secondaryKey,
          },
        ];
        setData(newData);
        toast.success(response.message);
        setShowPrivateKeys(true);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [isCopied, setIsCopied] = useState(false);
  const copy = async (e: React.FormEvent, text: string) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success('Copied');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
    if (isCopied) {
      toast.success('Copied');
    }
  };
  return (
    <>
      {/**content */}
      <div className={`w-full px-8 ${navigation.privateKeys ? styles['fade-in'] : styles['fade-out']}`}>
        <button
          type='button'
          onClick={generatePrivateKey}
          className={`h-[40px] rounded-[8px] py-[8px] px-[24px] bg-[#0E0E0E] gap-[16px] flex items-center mt-6`}
        >
          <span className='text-base leading-[24px] font-medium text-[#FAF6F6]'>
            {isLoading ? 'Generating New Private Key' : 'Generate New Private Key'}
          </span>
          {isLoading && <i className='loading text-[#FAF6F6] loading-spinner'></i>}
        </button>
        <div className='flex justify-center w-full mt-4'>
          {!showPrivateKeys ? null : (
            <div className='mt-10 flex flex-col justify-center min-w-[640px] items-center gap-6'>
              {data.map((item, idx) => {
                const { head, text } = item;
                return (
                  <div key={idx} className='flex flex-col'>
                    <span className='text-[14px] leading-[20px] font-medium text-[#2B2B2B] border-b-[1px] w-[366px] pb-2'>
                      {head}
                    </span>
                    <div className='flex justify-between items-end w-full'>
                      <div className='w-[366px] text-wrap border-y-[1px] border-[#DADADA] rounded-[8px] whitespace-normal pl-4 py-2'>
                        <span className='text-base leading-[24px] text-wrap text-[#0E0E0E] break-words'>{text}</span>
                      </div>
                      <button
                        type='button'
                        onClick={(e: React.FormEvent) => {
                          copy(e, text);
                        }}
                        className='h-[36px] ml-6 rounded-[100px] border-[1px] py-[6px] px-[16px] gap-[4px] bg-[#F5F5F5] border-[#EBEBEB] text-[16px] leading-[24px] font-normal flex items-center'
                      >
                        <span className='text-[#3C3C3C]'>Copy ID</span>
                        <Image src={copyIcon} width={20} height={20} alt='' />
                      </button>
                    </div>
                  </div>
                );
              })}
              <span className='text-base leading-[24px] font-normal text-[#D21B34]'>
                Please copy your unique private keys and store it somewhere safe.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePrivateKey;
