import { useDashboardContext } from '@/contexts/DashboardContext';
import { cn } from '@/utils';
import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['Variable 1', 'Variable 2', 'Variable 3'];

  const { setActiveVariable } = useDashboardContext();

  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            'px-4 py-2 text-lg font-medium',
            activeTab === tab
              ? 'text-[#0E0E0E] border-b-2 border-[#0E0E0E]'
              : 'text-[#DADADA] hover:text-gray-600 border-none'
          )}
          onClick={() => {
            onTabChange(tab);
            setActiveVariable(tab);
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
