import Image from 'next/image';
import { settingsOptions } from './data';
import arrowRight from './svgs/arrowRight.svg';
import { useDashboardContext } from '@/contexts/DashboardContext';

interface SettingsOptionsProps {
  setSettings: any;
  settings: {};
  setSelectedText: (type: string) => void;
  setSubText: (type: string) => void;
}

export const SettingsOptions: React.FC<SettingsOptionsProps> = ({
  setSettings,
  settings,
  setSelectedText,
  setSubText,
}) => {
  const { navMap, setNavMap } = useDashboardContext();
  return (
    <div className='w-[588px] h-[432px] mt-10 flex flex-col gap-[8px]'>
      {settingsOptions.map((item, idx) => {
        const { text, img } = item;
        return (
          <div
            key={idx}
            onClick={() => {
              if (text === 'Additional Security Settings') {
                setSettings({
                  ...settings,
                  isAdditionalSecurityClicked: true,
                });
                setSelectedText(text);
                setSubText('This is a blank text for now');
              }
              if (text === 'View Your Logged In Devices') {
                setSettings({
                  ...settings,
                  isLoggedInDevicesClicked: true,
                });
                setSelectedText(text);
                setSubText("You've signed in on these devices in the past 3 months.");
              }
              // setNavMap([...navMap, 'Settings', text]);
              setNavMap([...navMap.filter((elem) => elem !== text), 'Settings', text]);
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
