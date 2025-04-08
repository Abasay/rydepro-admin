'use client';
import React, { useState } from 'react';
import GeneralDesign from '@/components/admin//GeneralDesign/index';
import RydeProLogo from '@/public/RydeproLogo.png';
import Image from 'next/image';
import copyIcon from './copy.svg';
import toast from 'react-hot-toast';
import { useSignInContext } from '@/contexts/SignUpContext';
import styles from '@/styles/common.module.css';

const UserIDGeneration = () => {
  const { navigation, setNavigation, userDetails } = useSignInContext();
  const [employeeNumber, setEmployeeNumber] = useState<string>('AJK-1234-9587'); //employee number
  const [isCopied, setIsCopied] = useState(false);
  const copy = async (e: React.FormEvent) => {
    e.preventDefault();
    await navigator.clipboard
      .writeText(userDetails.employeeId)
      .then((result) => {
        toast.success('Copied');
      })
      .catch((err) => {
        toast.error('Failed to copy');
      });
  };

  return (
    <>
      {/**header */}
      <div className="flex w-full justify-between items-center">
        <Image src={RydeProLogo} alt="" width={70} height={100} />
        <button
          onClick={(e) => {
            setNavigation({
              ...navigation,
              issignup: false,
              issignupotp: true,
              userIDGen: false,
            });
          }}
          type="button"
          title="Sign In"
          className="w-[120px] flex gap-3 h-[48px] justify-center rounded-[8px] bg-[#F5F5F5] border-[#D0D0D0] border-[0.5px] p-[8px] items-center text-[#0E0E0E]"
        >
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.3544 13.8537C10.1594 14.0493 9.84285 14.0499 9.64724 13.855L4.16276 8.39C3.94705 8.17505 3.94705 7.82574 4.16276 7.6108L9.64725 2.14582C9.84285 1.9509 10.1594 1.95147 10.3544 2.14708C10.5493 2.34269 10.5487 2.65927 10.3531 2.85418L5.18851 8.0004L10.3531 13.1466C10.5487 13.3415 10.5493 13.6581 10.3544 13.8537Z"
                fill="#0E0E0E"
              />
            </svg>
          </span>
          <span>Back</span>
        </button>
      </div>
      {/**content */}
      <div className={`mt-20 w-full px-8 ${styles['slide-from-left']}`}>
        <div className="flex flex-col gap-2">
          <span className="leading-[24px] text-base font-medium text-[#0E0E0E]">Create an Account</span>
          <h2 className="text-[#0E0E0E] leading-[32px] text-[24px] font-medium">Employee ID</h2>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <span className="text-[16px] leading-[24px] font-normal text-[#3C3C3C]">
            Please copy your employee number
          </span>
          <div className="flex flex-row justify-between">
            <h2 className="text-[24px] leading-[32px] font-medium text-[#0E0E0E]">{userDetails.employeeId}</h2>
            <button
              type="button"
              onClick={copy}
              className="h-[36px] rounded-[100px] border-[1px] py-[6px] px-[16px] gap-[4px] bg-[#F5F5F5] border-[#EBEBEB] text-[16px] leading-[24px] font-normal flex items-center"
            >
              <span className="text-[#3C3C3C]">Copy ID</span>
              <Image src={copyIcon} width={20} height={20} alt="" />
            </button>
          </div>
        </div>
        <button
          onClick={(e: React.FormEvent) => {
            setNavigation({
              ...navigation,
              issignup: false,
              issignupotp: false,
              userIDGen: false,
              privateKeys: true,
            });
          }}
          type="submit"
          className="h-[56px] mt-16 p-[8px] w-full rounded-[8px] gap-[16px] bg-[#0E0E0E] text-base leading-[24px] text-[#FAF6F6]"
        >
          Proceed
        </button>
      </div>
    </>
  );
};

export default UserIDGeneration;
