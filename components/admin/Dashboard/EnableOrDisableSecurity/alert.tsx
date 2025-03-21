import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import RydeProLogo from '@/public/RydeproLogo.png';
import { useDashboardContext } from '@/contexts/DashboardContext';

const Alert = ({
  heading,
  text,
  isEnabled,
  onClick,
}: {
  heading: string;
  text: string;
  onClick: any;
  isEnabled?: boolean;
}) => {
  const getRef = useRef<HTMLDivElement>(null);
  const { settings, setSettings } = useDashboardContext();
  const { alertCondition } = settings;

  const handleClickOutside = (event: MouseEvent) => {
    if (getRef.current && !getRef.current.contains(event.target as Node)) {
      setSettings({
        ...settings,
        isAlertEnabled: false,
        enableOrDisableSecurity: {
          ...settings.enableOrDisableSecurity,
        },
        isSignOutEnabled: false,
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
    isEnabled && (
      <section
        ref={getRef}
        className=' w-[624px] min-h-[432px] rounded-[24px] py-[48px] px-[72px] flex flex-col justify-center items-center gap-[48px] bg-[#FFFFFF]'
      >
        <div className='h-[100px] justify-center items-center w-[240px] flex flex-col gap-[32px]'>
          <Image width={78} height={78} className='w-[82px] h-[78px]' src={RydeProLogo} alt='' />
        </div>
        <div className='min-h-[92px] flex flex-col gap-[40px]'>
          <div className='min-h-[92px] flex flex-col gap-[8px]'>
            <span className='text-base leading-[24px] font-medium text-[#0E0E0E]'>Additional Security</span>
            <div className='text-[24px] leading-[32px] font-medium text-[#0E0E0E]'>{heading}</div>
            <span className='text-base leading-[24px] font-normal text-[#3C3C3C]'>{text}</span>
          </div>
          {/**buttons */}
          <div className='h-[56px] flex gap-[24px]'>
            <button
              type='button'
              onClick={() => {
                setSettings({
                  ...settings,
                  alertCondition: false,
                  isAlertEnabled: false,
                });
              }}
              className='w-[228px] h-[56px] rounded-[8px] p-[8px] gap-[16px] bg-[#0E0E0E] text-[#FAF6F6]'
            >
              Do not disable
            </button>
            <button
              type='button'
              onClick={() => {
                setSettings({
                  ...settings,
                  alertCondition: true,
                  isAlertEnabled: false,
                });
              }}
              className='w-[228px] h-[inherit] rounded-[8px] p-[8px] gap-[16px] bg-[#F5F5F5] border-[0.5px] border-[#D0D0D0] text-[#0E0E0E]'
            >
              Enable
            </button>
          </div>
        </div>
      </section>
    )
  );
};

export default Alert;
