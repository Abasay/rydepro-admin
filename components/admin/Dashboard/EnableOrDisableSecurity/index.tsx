import Image from 'next/image';
import React, { useState } from 'react';
import { changeSecurityOptions } from '../data/index';
import arrowRight from '../svgs/arrowRight.svg';
import styles from '@/styles/common.module.css';
import { useDashboardContext } from '@/contexts/DashboardContext';
import RecComponent from '@/components/RecComponent/index';
import lockGuard from '@/components/admin/Dashboard/svgs/lockGuard.svg';
import keyIcon from '@/components/admin/Dashboard/svgs/key.svg';
import pncodeIcon from '@/components/admin/Dashboard/svgs/pincode.svg';
import passphraseIcon from '@/components/admin/Dashboard/svgs/passphrase.svg';
import guardIcon from '@/components/admin/Dashboard/svgs/lockGuard.svg';
import Alert from './alert';

const EnableOrDisableSecurity = () => {
  const { settings, setSettings, navMap, setNavMap, setSubText, setSelectedText } = useDashboardContext();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { enableOrDisableSecurity } = settings;

  const enableOrDisableSecurityOptions: {
    text: string;
    img: any;
    value: boolean;
    as: string;
    info: string;
  }[] = [
    {
      text: 'Change Private Key',
      img: keyIcon,
      value: enableOrDisableSecurity.isChangePrivateKeyClicked,
      as: 'isChangePrivateKeyClicked',
      info: `Are you sure you want to disable your Private Key?
A new Private Key will be generated if you enable it after.`,
    },

    {
      text: 'Change Pincode',
      img: pncodeIcon,
      value: enableOrDisableSecurity.isChangePinClicked,
      as: 'isChangePinClicked',
      info: `Are you sure you want to disable your Pincode/Password?
A new Pincode/Password will be generated if you enable it after.`,
    },
    {
      text: 'Change Passphrase',
      img: passphraseIcon,
      value: enableOrDisableSecurity.isChangePassphraseClicked,
      as: 'isChangePassphraseClicked',
      info: `Are you sure you want to disable your Secret Phrase?
A new Secret Phrase will be generated if you enable it after.`,
    },
    {
      text: 'Biometrics',
      img: guardIcon,
      value: enableOrDisableSecurity.isBiometricsClicked,
      as: 'isBiometricsClicked',
      info: `Are you sure you want to disable your Biometrics?`,
    },
  ];

  return (
    <React.Fragment>
      <div className={`w-[588px] h-[432px] mt-10 flex flex-col gap-[8px] ${styles['slide-from-left']}`}>
        {enableOrDisableSecurityOptions.map((item, idx) => {
          const { text, img, value, as, info } = item;
          return (
            <RecComponent
              idLabel={text}
              onClick={() => {
                setSettings({
                  ...settings,
                  enableOrDisableSecurity: {
                    ...settings.enableOrDisableSecurity,
                    [as]: !value && settings.alertCondition,
                  },
                  isAlertEnabled: true,
                  alertData: item,
                });
              }}
              key={idx}
              id={idx}
              isClicked={value}
              className='border-[1px] cursor-pointer border-[#F5F5F5]'
              img={img}
              text={text}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default EnableOrDisableSecurity;
