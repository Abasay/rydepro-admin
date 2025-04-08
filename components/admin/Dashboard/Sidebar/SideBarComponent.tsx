import { useDashboardContext } from '@/contexts/DashboardContext';
import { useDB } from '@/contexts/DBContext';
import React, { useState } from 'react';

export interface SideBarProps {
  headerTitle: string;
  sideSubs: {
    header: string;
    HeaderIcon: React.JSX.ElementType;
    subs: { title: string; Icon: React.JSX.ElementType }[];
  }[];
}

const SideBarComponent = ({ sidebar }: { sidebar: SideBarProps }) => {
  const { setActiveHeader, activeHeader } = useDB();
  const { isSettingsClicked, setIsSettingsClicked, adminDetails } = useDashboardContext();

  const { headerTitle, sideSubs } = sidebar;
  const [showSubs, setShowSubs] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');
  return (
    <div className=" relative flex flex-col gap-2 mx-auto py-1 pb-6 min-w-[200px] border-b max-w-[208px] border-[#EBEBEB]">
      <h3 className=" text-[#8A8A8A] font-[400] text-xs font-satoshi tracking-widest">{sidebar.headerTitle}</h3>
      {sideSubs.map((sidesub, idx) => {
        const { header, HeaderIcon, subs } = sidesub;
        return (
          <div key={idx} className=" flex flex-col gap-[6px]">
            <div className="px-2 py-[6px] gap-4 flex items-center ">
              <button
                className=" flex justify-between w-full items-center cursor-pointer"
                onClick={() => {
                  setActiveHeader(subs[0].title);
                  setShowSubs(!showSubs);
                  setIsSettingsClicked(false);
                  setActive(subs[0].title);
                }}
              >
                <span className=" flex items-center gap-2">
                  <HeaderIcon />
                  <span className=" text-[#3C3C3C] text-sm font-medium">{header}</span>
                </span>
                {
                  <span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${showSubs && 'rotate-180'} `}
                    >
                      <path
                        d="M3.20041 10.2603C3.48226 10.5639 3.95681 10.5814 4.26034 10.2996L8 6.77348L11.7397 10.2996C12.0432 10.5814 12.5177 10.5639 12.7996 10.2603C13.0815 9.95681 13.0639 9.48226 12.7603 9.2004L8.51034 5.2004C8.22258 4.9332 7.77743 4.9332 7.48967 5.2004L3.23966 9.2004C2.93613 9.48226 2.91856 9.95681 3.20041 10.2603Z"
                        fill="#111111"
                      />
                    </svg>
                  </span>
                }
              </button>
            </div>
            {showSubs && active === subs[0].title && (
              <div>
                {subs.map((item, index) => {
                  const { title, Icon } = item;
                  return (
                    <button
                      key={index}
                      className="px-2 py-[6px] gap-4 flex items-center cursor-pointer "
                      onClick={() => {
                        setActiveHeader(title);
                        setIsSettingsClicked(false);
                      }}
                    >
                      {Icon && (
                        <span className=" w-6 h-6">
                          <Icon />
                        </span>
                      )}
                      <span className=" text-[#3C3C3C] text-sm font-medium">{title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SideBarComponent;
