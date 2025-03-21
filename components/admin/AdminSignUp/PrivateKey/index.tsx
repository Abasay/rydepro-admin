'use client';
import React, { useState } from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import copyIcon from './copyIcon.svg';
import toast from 'react-hot-toast';
import { dummyData } from './dummyData';
import { useSignInContext } from '@/contexts/SignUpContext';
import styles from '@/styles/common.module.css';
import { AdminUrls } from '@/utils/urls';
import { getRequest, postRequest } from '@/utils/requests';

const PrivateKey = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<boolean>(false);
  const [masterKey, setMasterKey] = useState<string>('');
  const [secondaryKey, setSecondaryKey] = useState<string>('');

  const [data, setData] = useState(dummyData);
  const { navigation, setNavigation, additionalSecurity, setAdditionalSecurity, setUpToken } = useSignInContext();

  const generatePrivateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Making the API request for admin signup
      const response = await getRequest({
        url: AdminUrls.generatePrivateKeys,
        token: setUpToken, // No token required for signup
      });

      if (response.success) {
        setMasterKey(response.masterKey);
        setSecondaryKey(response.secondaryKey);
        toast.success(response.message);
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
      {/**header */}
      <div className='flex w-full justify-between items-center'>
        <Image src={RydeProLogo} alt='' width={70} height={100} />
        <button
          onClick={(e) => {
            setNavigation({
              ...navigation,
              issignup: false,
              issignupotp: false,
              userIDGen: true,
              privateKeys: false,
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
      <div className={`mt-20 w-full px-8 ${navigation.privateKeys ? styles['fade-in'] : styles['fade-out']}`}>
        <div className='flex flex-col gap-2'>
          <span className='leading-[24px] text-base font-medium text-[#0E0E0E]'>Create an Account</span>
          <h2 className='text-[#0E0E0E] leading-[32px] text-[24px] font-medium'>Private Keys</h2>
          <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
            Please generate your unique RMAK (RYDEPRO Master Admin Key) and RSAK (RYDEPRO Secondary Admin Key).
          </span>
        </div>
        <button
          type='button'
          onClick={generatePrivateKey}
          className={`h-[40px] rounded-[8px] py-[8px] px-[24px] bg-[#0E0E0E] gap-[16px] flex items-center mt-6`}
        >
          <span className='text-base leading-[24px] font-medium text-[#FAF6F6]'>
            {isLoading ? 'Generating Private Key' : 'Generate Private Key'}
          </span>
          {isLoading && <i className='loading text-[#FAF6F6] loading-spinner'></i>}
        </button>
        <div className='mt-10 flex flex-col gap-6'>
          {masterKey && secondaryKey && (
            <div className='flex flex-col'>
              <span className='text-[14px] leading-[20px] font-medium text-[#2B2B2B] border-b-[1px] w-[366px] pb-2'>
                RMAK (RYDEPRO Master Admin Key)
              </span>
              <div className='flex justify-between items-end w-full flex-wrap gap-2 mb-3'>
                <div className='w-[366px] text-wrap border-b-[1px] whitespace-normal pl-4 py-2'>
                  <span className='text-base leading-[24px] text-wrap text-[#0E0E0E] break-words'>{masterKey}</span>
                </div>
                <button
                  type='button'
                  onClick={(e: React.FormEvent) => {
                    copy(e, masterKey);
                  }}
                  className='h-[36px] rounded-[100px] border-[1px] py-[6px] px-[16px] gap-[4px] bg-[#F5F5F5] border-[#EBEBEB] text-[16px] leading-[24px] font-normal flex items-center'
                >
                  <span className='text-[#3C3C3C]'>Copy Key</span>
                  <Image src={copyIcon} width={20} height={20} alt='' />
                </button>
              </div>

              <span className='text-[14px] leading-[20px] font-medium text-[#2B2B2B] border-b-[1px] w-[366px] pb-2'>
                RSAK (RYDEPRO Secondary Admin Key)
              </span>
              <div className='flex justify-between items-end w-full flex-wrap gap-2 mb-3'>
                <div className='w-[366px] text-wrap border-b-[1px] whitespace-normal pl-4 py-2'>
                  <span className='text-base leading-[24px] text-wrap text-[#0E0E0E] break-words'>{secondaryKey}</span>
                </div>
                <button
                  type='button'
                  onClick={(e: React.FormEvent) => {
                    copy(e, secondaryKey);
                  }}
                  className='h-[36px] rounded-[100px] border-[1px] py-[6px] px-[16px] gap-[4px] bg-[#F5F5F5] border-[#EBEBEB] text-[16px] leading-[24px] font-normal flex items-center'
                >
                  <span className='text-[#3C3C3C]'>Copy Key</span>
                  <Image src={copyIcon} width={20} height={20} alt='' />
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={(e: React.FormEvent) => {
            e.preventDefault();

            if (!masterKey || !secondaryKey) {
              toast.error('Please generate your private keys');
              return;
            }
            setNavigation({
              ...navigation,
              privateKeys: false,
              userIDGen: false,
              issignup: false,
              issignupotp: false,
            });
            setAdditionalSecurity({
              ...additionalSecurity,
              isMethodActive: true,
            });
          }}
          type='submit'
          className={`h-[56px] w-full p-[8px] rounded-[8px] gap-[16px] ${
            isLoading ? 'bg-[#8A8A8A]' : 'bg-[#0E0E0E]'
          } text-base leading-[24px] text-[#DADADA] mt-16`}
        >
          Proceed
        </button>
      </div>
    </>
  );
};

export default PrivateKey;
