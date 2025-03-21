'use client';
import React, { useRef, useEffect, useState } from 'react';
import styles from '@/styles/common.module.css';
import RydeProLogo from '@/public/svgs/logo_black.svg';
import { useDashboardContext } from '@/contexts/DashboardContext';
import Image from 'next/image';

const PopUp = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const getRef = useRef<HTMLDivElement>(null);
  const { settings, setSettings } = useDashboardContext();

  const handleClickOutside = (event: MouseEvent) => {
    if (getRef.current && !getRef.current.contains(event.target as Node)) {
      setSettings({
        ...settings,
        selectedSecurityVerification: '',
        additionalSecurity: {
          ...settings.additionalSecurity,
          isPopUpOpened: false,
        },
      });
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRef]);

  return (
    (settings.additionalSecurity.isEnableOrDisableClicked || settings.additionalSecurity.isChangeSecurityClicked) && (
      <div
        ref={getRef}
        className={`${styles['slide-from-bottom']} w-[624px] rounded-3xl py-12 px-[72px] gap-[48px] flex flex-col bg-[#FFFFFF] items-center justify-center`}
      >
        <div className='w-[240px] h-[100px] flex items justify-center gap-[32px]'>
          <Image src={RydeProLogo} alt='' width={78} height={64} className='w-[77.42px] h-[70px]' />
        </div>
        <div className={`w-[480px] flex flex-col gap-[64px] ${className}`}>{children}</div>
      </div>
    )
  );
};

export default PopUp;
