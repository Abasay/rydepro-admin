'use client';
import React from 'react';
import ChangeSecurityOptions from '@/components/admin/Dashboard/ChangeSecuritySettings';
import ChangePrivateKey from '@/components/admin/Dashboard/ChangeSecuritySettings/privateKey';
import ChangePassword from '@/components/admin/Dashboard/ChangeSecuritySettings/password';
import ChangePincode from '@/components/admin/Dashboard/ChangeSecuritySettings/pincode';
import ChangePassphrase from '@/components/admin/Dashboard/ChangeSecuritySettings/passphrase';
import ConfirmChangePassphrase from '@/components/admin/Dashboard/ChangeSecuritySettings/confirmPassphrase';
import EnableOrDisableSecurity from '@/components/admin/Dashboard/EnableOrDisableSecurity';
import { useDashboardContext } from '@/contexts/DashboardContext';
import { SettingsOptions } from '@/components/admin/Dashboard/settingsOptions';
import AdditionalSecurityOptions from '@/components/admin/Dashboard/additionalSecurityOptions';
import Image from 'next/image';
import arrowRight from '@/components/admin/Dashboard/svgs/arrowRight.svg';
import styles from '@/styles/common.module.css';
import LoggedInDevices from '@/components/admin/Dashboard/LoggedInDevices';

const Settings = () => {
  const {
    isSettingsClicked,
    setSettings,
    settings,
    navMap,
    setNavMap,
    selectedText,
    setSelectedText,
    subText,
    setSubText,
  } = useDashboardContext();
  const dynamicSettingOptionsRendering = () => {
    const { isAdditionalSecurityClicked, isLoggedInDevicesClicked, additionalSecurity, changeSecuritySettings } =
      settings;

    const {
      isChangePasswordClicked,
      isChangePinClicked,
      iaChangePassphraseClicked,
      isChangePrivateKeyClicked,
      isConfirmChangedPassphraseActive,
    } = changeSecuritySettings;

    //checking if the additional security or logged in device has been clicked
    if (isAdditionalSecurityClicked || isLoggedInDevicesClicked) {
      //is additional security clicked
      if (isAdditionalSecurityClicked) {
        if (
          //isSecurityVerified alongside
          isAdditionalSecurityClicked &&
          additionalSecurity.isSecurityVerified
        ) {
          if (additionalSecurity.isChangeSecurityClicked) {
            if (isChangePrivateKeyClicked) return <ChangePrivateKey />;
            if (isChangePasswordClicked) return <ChangePassword />;
            if (isChangePinClicked) return <ChangePincode />;
            if (iaChangePassphraseClicked) return <ChangePassphrase />;
            if (isConfirmChangedPassphraseActive) return <ConfirmChangePassphrase />;
            return <ChangeSecurityOptions />;
          } else if (additionalSecurity.isEnableOrDisableClicked) {
            return <EnableOrDisableSecurity />;
          }
        } else {
          return <AdditionalSecurityOptions />;
        }
      } else if (isLoggedInDevicesClicked) {
        return <LoggedInDevices />;
      } else return null;
    } else {
      return (
        <SettingsOptions
          settings={settings}
          setSelectedText={setSelectedText}
          setSettings={setSettings}
          setSubText={setSubText}
        />
      );
    }
  };
  return (
    <div className={`flex flex-col justify-center items-center w-full ${styles['slide-from-bottom']}`}>
      <div className='mt-[58px] w-full min-h-[60px] pr-[48px] pl-[32px] flex flex-col'>
        <div className='flex gap-[8px] mb-3 w-[800px] flex-wrap'>
          {navMap.map((item, idx) => {
            return (
              <div
                className={`text-[14px] font-normal leading-[20px] ${
                  navMap.length - 1 === idx ? 'text-[#0E0E0E]' : 'text-[#8A8A8A] '
                } flex items-center`}
                key={idx}
              >
                {idx === 0 ? null : (
                  <Image src={arrowRight} alt='' width={18} height={18} className='w-[18px] h-[18px]' />
                )}
                <span
                  className='cursor-pointer'
                  onClick={() => {
                    if (item === 'Settings') {
                      setNavMap([]); //set nav map back to empty when settings is clicked
                      setSelectedText(item);
                      setSubText('This is a blank text for now');
                      return setSettings({
                        ...settings,
                        isAdditionalSecurityClicked: false,
                        isLoggedInDevicesClicked: false,
                      });
                    }

                    const modifyText = item.replace(/\s+/g, '');
                    // Remove non-alphabetic characters and ensure the first letter is lowercase
                    const toCamelCase = (text: string) => {
                      // Remove any non-alphabet characters and make the first character lowercase
                      return text
                        .replace(/[^a-zA-Z]+/g, '') // Remove non-alphabetic characters
                        .replace(/^./, (char) => char.toLowerCase()); // Lowercase the first character
                    };
                    const camelCaseText = toCamelCase(modifyText);

                    //handle Navigation
                    //yet to find the right logic for dynamic display
                    setSettings({
                      ...settings,
                      additionalSecurity: {
                        ...settings.additionalSecurity,
                        [camelCaseText]: false,
                      },
                    });

                    setSettings({
                      ...Object.keys(settings).reduce((acc: any, key: any) => {
                        acc[key] = key === item; // Set the property to true only if it matches `item`, otherwise false
                        return acc;
                      }, {} as typeof settings),
                    });
                    const getIdx = navMap.indexOf(item);
                    if (getIdx < navMap.length) {
                      navMap.splice(getIdx + 1, navMap.length);
                    }
                    setSelectedText(item);
                    setSubText('This is a blank text for now');
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <h2 className='text-[24px] leading-[32px] font-medium text-[#2B2B2B]'>{selectedText}</h2>
        <span className='text-base leading-[24px] font-normal text-[#555555]'>{subText}</span>
      </div>
      {dynamicSettingOptionsRendering()}
    </div>
  );
};

export default Settings;
