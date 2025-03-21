'use client';
import React from 'react';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import Image from 'next/image';
import RydeProLogo from '@/public/RydeproLogo.png';
import RecComponent from './RecComponent';
import img from './biometric.svg';
import phoneImg from './phone.svg';
import { useSignInContext } from '@/contexts/SignUpContext';
import styles from '@/styles/common.module.css';

const AdditionalSecurity = () => {
  const { navigation, setNavigation, setAdditionalSecurity, additionalSecurity } = useSignInContext();
  return (
    <>
      <div className='flex flex-col items-center'>
        {/**heading */}
        <div className='flex w-full justify-between items-center'>
          <Image src={RydeProLogo} alt='' width={70} height={100} />
          <button
            onClick={(e: React.FormEvent) => {
              e.preventDefault();
              setNavigation({
                ...navigation,
                privateKeys: true,
                userIDGen: false,
                issignup: false,
                issignupotp: false,
              });
              setAdditionalSecurity({
                ...additionalSecurity,
                isMethodActive: false,
              });
            }}
            type='button'
            title='Sign In'
            className='w-[120px] flex gap-3 h-[48px] justify-center rounded-[8px] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] items-center text-[#0E0E0E]'
          >
            <span>
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M10.3544 13.8537C10.1594 14.0493 9.84285 14.0499 9.64724 13.855L4.16276 8.39C3.94705 8.17505 3.94705 7.82574 4.16276 7.6108L9.64725 2.14582C9.84285 1.9509 10.1594 1.95147 10.3544 2.14708C10.5493 2.34269 10.5487 2.65927 10.3531 2.85418L5.18851 8.0004L10.3531 13.1466C10.5487 13.3415 10.5493 13.6581 10.3544 13.8537Z'
                  fill='#0E0E0E'
                />
              </svg>
            </span>
            <span>Back</span>
          </button>
        </div>
        {/**content */}
        <div className={`w-full justify-center items-center mx-auto mt-20 px-10 ${styles['slide-from-top']}`}>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Additional Security</span>
              <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Protect your Account!</h2>
              <span className='text-[#3C3C3C] text-base leading-[24px] font-normal'>
                Please enable the following authentication methods to secure your account.
              </span>
            </div>
            <div className='flex flex-col mt-4 gap-4'>
              <RecComponent
                img={img}
                className='bg-[#F7F7F7]'
                isClicked={additionalSecurity.isBiometricSelected}
                onClick={() => {
                  setAdditionalSecurity({
                    ...additionalSecurity,
                    isBiometricSelected: !additionalSecurity.isBiometricSelected,
                  });
                }}
                text='Biometric'
              />
              <RecComponent
                img={phoneImg}
                className='bg-[#F7F7F7]'
                isClicked={additionalSecurity.isPincodeOrPassphraseSelected}
                onClick={() => {
                  setAdditionalSecurity({
                    ...additionalSecurity,
                    isPincodeOrPassphraseSelected: !additionalSecurity.isPincodeOrPassphraseSelected,
                  });
                }}
                text='Pincode/Passphrase'
              />
            </div>
            {/** */}
            <button
              type='submit'
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                const { isBiometricSelected, isPincodeOrPassphraseSelected } = additionalSecurity;

                console.log('isBiometricSelected', isBiometricSelected);
                console.log('isPincodeOrPassphraseSelected', isPincodeOrPassphraseSelected);

                if (isBiometricSelected && isPincodeOrPassphraseSelected) {
                  setNavigation({
                    ...navigation,
                    privateKeys: false,
                    userIDGen: false,
                    issignup: false,
                    issignupotp: false,
                  });
                  setAdditionalSecurity({
                    ...additionalSecurity,
                    isMethodActive: false,
                    isBiometricActive: true,
                  });
                } else if (isBiometricSelected) {
                  setNavigation({
                    ...navigation,
                    privateKeys: false,
                    userIDGen: false,
                    issignup: false,
                    issignupotp: false,
                  });
                  setAdditionalSecurity({
                    ...additionalSecurity,
                    isMethodActive: false,
                    isBiometricActive: true,
                  });
                } else if (isPincodeOrPassphraseSelected) {
                  setNavigation({
                    ...navigation,
                    privateKeys: false,
                    userIDGen: false,
                    issignup: false,
                    issignupotp: false,
                  });
                  setAdditionalSecurity({
                    ...additionalSecurity,
                    isMethodActive: false,
                    isPincodeOrPassphraseActive: true,
                  });
                }
              }}
              className={`h-[56px] w-[480px] mt-10 p-[8px] rounded-[8px] gap-[16px] ${
                additionalSecurity.isPincodeOrPassphraseSelected || additionalSecurity.isBiometricSelected
                  ? 'bg-[#0E0E0E]'
                  : 'bg-[#8A8A8A] '
              } text-base leading-[24px] text-[#FAF6F6]`}
            >
              Confirm Security Method
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalSecurity;
