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

const ChangePassphrase = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPrivateKeys, setShowPrivateKeys] = useState<boolean>(false);
  const [data, setData] = useState(dummyData);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const { navigation } = useSignInContext();
  const { settings, setSettings, setSelectedText, setSubText, navMap, setNavMap, setAuthChanged, setPassphrases } =
    useDashboardContext();

  const generatePrivateKey = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsButtonDisabled(true);
    }, 1000);
    setShowPrivateKeys(true);
  };

  const [isCopied, setIsCopied] = useState(false);
  const copy = async (e: React.FormEvent, array: any) => {
    e.preventDefault();
    let actualText = ``;
    array?.forEach((item: any) => {
      actualText += `${item.text}, `;
    });
    try {
      await navigator.clipboard.writeText(actualText);
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

  const [randomPassphrase, setRandomPassphrase] = useState<{ text: string }[]>([
    {
      text: '',
    },
  ]);
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * nestedData.length);
  };
  useEffect(() => {
    setRandomPassphrase(nestedData[generateRandomNumber()]);
    // console.log('Random Number:', randomNumber);
  }, []);
  return (
    <>
      {/**content */}
      <div className={`w-full px-8 ${navigation.privateKeys ? styles['fade-in'] : styles['fade-out']}`}>
        <button
          type='button'
          onClick={generatePrivateKey}
          className={`h-[40px] rounded-[8px] py-[8px] px-[24px] ${
            isButtonDisabled ? 'bg-[#8A8A8A]' : 'bg-[#0E0E0E]'
          }  gap-[16px] flex items-center mt-6`}
        >
          <span className='text-base leading-[24px] font-medium text-[#FAF6F6]'>
            {isLoading ? 'Generating New Passphrase' : 'Generate New Passphrase'}
          </span>
          {isLoading && <i className='loading text-[#FAF6F6] loading-spinner'></i>}
        </button>
        <div className='flex justify-center w-full mt-4'>
          {!showPrivateKeys ? null : (
            <div className='mt-10 flex flex-col justify-center min-w-[640px] items-center gap-6'>
              <div className='flex flex-col items-center'>
                <div className='grid grid-cols-2 gap-4'>
                  {randomPassphrase.map((item, idx) => {
                    const { text } = item;
                    return <Component className='w-fit' key={idx} num={idx + 1} text={text} />;
                  })}
                </div>
                <button
                  type='button'
                  onClick={(e: React.FormEvent) => {
                    copy(e, randomPassphrase);
                  }}
                  className='h-[36px] w-fit mt-10 text-center rounded-[100px] border-[1px] py-[6px] px-[16px] gap-[4px] bg-[#F5F5F5] border-[#EBEBEB] text-[16px] leading-[24px] font-normal flex items-center'
                >
                  <span className='text-[#3C3C3C]'>Copy Passphrase</span>
                  <Image src={copyIcon} width={20} height={20} alt='' />
                </button>
                <span className='text-base w-[480px] leading-[24px] font-normal text-left mt-8 text-[#D21B34]'>
                  Do not share your passphrase with any one.
                </span>
              </div>
              <button
                onClick={(e: React.FormEvent) => {
                  e.preventDefault();
                  setSettings({
                    ...settings,
                    changeSecuritySettings: {
                      ...settings.changeSecuritySettings,
                      isChangePasswordClicked: false,
                      isChangePinClicked: false,
                      isChangePrivateKeyClicked: false,
                      iaChangePassphraseClicked: false,
                      isConfirmChangedPassphraseActive: true,
                    },
                  });

                  setPassphrases(randomPassphrase.map((item) => item.text) as unknown as []);
                  setSelectedText('Confirm New Passphrase');
                  setSubText('Please enter your new passphrase');
                  setNavMap([...navMap.filter((elem) => elem != 'Confirm New Passphrase'), 'Confirm New Passphrase']);
                }}
                type='submit'
                // disabled={isButtonDisabled}
                className={`h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] text-base leading-[24px] disabled:bg-[#8A8A8A] disabled:text-[#DADADA] text-[#FAF6F6] bg-[#0E0E0E]`}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePassphrase;
