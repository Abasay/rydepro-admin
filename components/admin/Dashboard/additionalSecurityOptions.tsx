'use client';
import Image from 'next/image';
import React from 'react';
import { additionalSecurityOptions } from './data';
import arrowRight from './svgs/arrowRight.svg';
import styles from '@/styles/common.module.css';
import { useDashboardContext } from '@/contexts/DashboardContext';

const AdditionalSecurityOptions = () => {
  const { settings, setSettings, navMap, setNavMap, selectedText, setSelectedText, subText, setSubText } =
    useDashboardContext();
  return (
    <div className={`w-[588px] h-[432px] mt-10 flex flex-col gap-[8px] ${styles['slide-from-left']}`}>
      {additionalSecurityOptions.map((item, idx) => {
        const { text, img } = item;
        return (
          <div
            key={idx}
            onClick={() => {
              if (text === 'Change Security Settings') {
                setSettings({
                  ...settings,
                  additionalSecurity: {
                    ...settings.additionalSecurity,
                    isChangeSecurityClicked: true,
                    isEnableOrDisableClicked: false,
                    isPopUpOpened: true,
                    isSecurityVerified: false,
                  },
                  selectedSecurityVerification: '',
                });
                setSelectedText(text);
              }
              if (text === 'Enable/Disable Security Settings') {
                setSettings({
                  ...settings,
                  additionalSecurity: {
                    ...settings.additionalSecurity,
                    isEnableOrDisableClicked: true,
                    isChangeSecurityClicked: false,
                    isPopUpOpened: true,
                    isSecurityVerified: false,
                  },
                  selectedSecurityVerification: '',
                });
                setSelectedText(text);
              }
              setNavMap([
                ...navMap.filter(
                  (elem) =>
                    elem !== text && elem !== 'Change Security Settings' && elem !== 'Enable/Disable Security Settings'
                ),
                text,
              ]);
            }}
            title={text}
            className='flex cursor-pointer h-[80px] rounded-[8px] border-[1px] justify-between items-center p-[16px] border-[#F5F5F5]'
          >
            <div className='flex items-center gap-[16px] h-[48px]'>
              <Image src={img} width={48} height={48} className='w-[48px] h-[48px]' alt='' />
              <span className='text-[18px] leading-[24px] font-medium text-[#0E0E0E]'>{text}</span>
            </div>
            <Image src={arrowRight} alt='' width={24} height={24} className='w-[24px] h-[24px]' />
          </div>
        );
      })}
    </div>
  );
};

export default AdditionalSecurityOptions;
