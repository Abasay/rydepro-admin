import React from 'react';
import { LoggedInDevicesDummyData } from './data';
import Component from './component';
import { useDashboardContext } from '@/contexts/DashboardContext';

const LoggedInDevices = () => {
  const { settings, setSettings } = useDashboardContext();
  return (
    <div className='w-[608px] h-[392px] flex flex-col gap-[16px] mt-10'>
      {LoggedInDevicesDummyData.map((item, idx) => {
        return (
          <Component
            idx={idx}
            key={idx}
            {...item}
            onClick={() => {
              setSettings({
                ...settings,
                isSignOutEnabled: true && settings.alertCondition,
                isAlertEnabled: true,
                alertData: {
                  text: item.model,
                  info: 'Are you sure you want to sign out of this device?',
                },
              });
            }}
          />
        );
      })}
    </div>
  );
};
//{ text, img, value, as, info }
export default LoggedInDevices;
