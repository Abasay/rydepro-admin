import Image from 'next/image';
import React from 'react';
import { changeSecurityOptions } from '../data/index';
import arrowRight from '../svgs/arrowRight.svg';
import styles from '@/styles/common.module.css';
import { useDashboardContext } from '@/contexts/DashboardContext';

const ChangeSecurityOptions = () => {
  const { settings, setSettings, navMap, setNavMap, setSubText, setSelectedText } = useDashboardContext();
  return (
    <div className={`w-[588px] h-[432px] mt-10 flex flex-col gap-[8px] ${styles['slide-from-left']}`}>
      {changeSecurityOptions.map((item, idx) => {
        const { text, img } = item;
        return (
          <div
            key={idx}
            onClick={() => {
              if (text === 'Change Private Key') {
                setSettings({
                  ...settings,
                  changeSecuritySettings: {
                    ...settings.changeSecuritySettings,
                    isChangePrivateKeyClicked: true,
                    isChangePasswordClicked: false,
                    isChangePinClicked: false,
                    iaChangePassphraseClicked: false,
                    isConfirmChangedPassphraseActive: false,
                  },
                });
                setSelectedText(text);
                setSubText('');
              }
              if (text === 'Change Password') {
                setSettings({
                  ...settings,
                  changeSecuritySettings: {
                    ...settings.changeSecuritySettings,
                    isChangePasswordClicked: true,
                    isChangePinClicked: false,
                    iaChangePassphraseClicked: false,
                    isChangePrivateKeyClicked: false,
                    isConfirmChangedPassphraseActive: false,
                  },
                });
                setSelectedText(text);
                setSubText('This is a blank text for now');
              }
              if (text === 'Change Pincode') {
                setSettings({
                  ...settings,
                  changeSecuritySettings: {
                    ...settings.changeSecuritySettings,
                    isChangePasswordClicked: false,
                    isChangePinClicked: true,
                    iaChangePassphraseClicked: false,
                    isChangePrivateKeyClicked: false,
                    isConfirmChangedPassphraseActive: false,
                  },
                });
                setSelectedText(text);
                setSubText('This is a blank text for now');
              }
              if (text === 'Change Passphrase') {
                setSettings({
                  ...settings,
                  changeSecuritySettings: {
                    ...settings.changeSecuritySettings,
                    isChangePasswordClicked: false,
                    isChangePinClicked: false,
                    iaChangePassphraseClicked: true,
                    isChangePrivateKeyClicked: false,
                    isConfirmChangedPassphraseActive: false,
                  },
                });
                setSelectedText(text);
                setSubText('This is a blank text for now');
              }

              // setNavMap([...navMap, text]);
              setNavMap([...navMap.filter((elem) => elem !== text), text]);
            }}
            title={text}
            className='flex cursor-pointer h-[80px] rounded-[8px] border-[1px] justify-between items-center p-[16px] border-[#F5F5F5]'
          >
            <div className='flex items-center gap-[16px] h-[48px]'>
              <Image src={img} width={48} height={48} className='w-[38px] h-[38px]' alt='' />
              <span className='text-[18px] leading-[24px] font-medium text-[#0E0E0E]'>{text}</span>
            </div>
            <Image src={arrowRight} alt='' width={24} height={24} className='w-[24px] h-[24px]' />
          </div>
        );
      })}
    </div>
  );
};

export default ChangeSecurityOptions;
