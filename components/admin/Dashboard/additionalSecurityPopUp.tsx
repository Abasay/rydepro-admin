'use client';
import React, { useRef, useEffect, useState } from 'react';
import styles from '@/styles/common.module.css';
import { useDashboardContext } from '@/contexts/DashboardContext';
import Image from 'next/image';
import { popUpOptions } from './data';
import checkedIcon from './svgs/checkedIcon.svg';
import PopUp from './PopUp/popUpDesign';

const AdditionalSecurityPopUp = () => {
  const { settings, setSettings, navMap, setNavMap } = useDashboardContext();
  const [isRadioChecked, setIsRadioChecked] = useState<boolean>(false);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRadioChecked(true);
  };

  const disablePopUp = () => {
    setSettings({
      ...settings,
      additionalSecurity: {
        ...settings.additionalSecurity,
        isPopUpOpened: false,
      },
    });
  };

  return (
    <PopUp className='min-h-[572px]'>
      <div className='h-[116px] gap-[8px] flex flex-col'>
        <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Additional Security</span>
        <h2 className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>Verify your Identity!</h2>
        <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>
          Please confirm your identity by verifying any of your chosen additional security options.
        </span>
      </div>
      <div className='h-[304px] flex flex-col gap-[16px]'>
        {popUpOptions.map((item, idx) => {
          const { text, img } = item;
          return (
            <label
              htmlFor={text}
              key={idx}
              title={text}
              onClick={() => {
                setSettings({
                  ...settings,
                  selectedSecurityVerification: text,
                });
              }}
              className='h-[64px] w-[480px] cursor-pointer flex justify-between py-[20px] px-[16px] bg-[#F7F7F7] rounded-[8px]'
            >
              <div className='h-[24px] flex items-center gap-[8px]'>
                <Image src={img} alt={text} width={24} height={24} className='w-[24px] h-[24px]' />
                <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>{text}</span>
              </div>
              <div>
                {' '}
                <input
                  type='radio'
                  name='option'
                  onChange={handleRadioChange}
                  className={`w-[20px] h-[20px] radio border-[#DADADA] bg-transparent`}
                  id={text}
                />
              </div>
            </label>
          );
        })}
      </div>
      <button
        onClick={(e: React.FormEvent) => {
          e.preventDefault();
          if (settings.additionalSecurity.isChangeSecurityClicked) {
            disablePopUp();

            return;
          }
          if (settings.additionalSecurity.isEnableOrDisableClicked) {
            disablePopUp();
            return;
          }
        }}
        type='submit'
        className={`h-[56px] p-[8px] w-full rounded-[8px] gap-[16px] ${
          isRadioChecked ? 'bg-[#0E0E0E] text-[#FAF6F6]' : 'bg-[#8A8A8A] text-[#DADADA]'
        }  text-base leading-[24px] `}
      >
        Proceed
      </button>
    </PopUp>
  );
};

export default AdditionalSecurityPopUp;
