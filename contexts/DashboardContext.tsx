// contexts/GlobalContext.tsx
'use client';

import { GeneralDashboardContext } from '@/types/GlobalState';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// Define the shape of the context state

// Create the context with an initial undefined value
const DashboardContext = createContext<GeneralDashboardContext | undefined>(undefined);

// Create a provider component
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [isSettingsClicked, setIsSettingsClicked] = useState<boolean>(false);
  const [navMap, setNavMap] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState<string>('Settings');
  const [subText, setSubText] = useState<string>('This is a blank text for now');
  const [authChanged, setAuthChanged] = useState<string>('');
  const [passPhrases, setPassphrases] = useState<string[]>([]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setAuthChanged('');
    }, 3000);

    return () => clearInterval(timeInterval);
  }, [authChanged]);

  const [settings, setSettings] = useState<SettingsProps>({
    isAdditionalSecurityClicked: false,
    isLoggedInDevicesClicked: false,
    additionalSecurity: {
      isChangeSecurityClicked: false,
      isEnableOrDisableClicked: false,
      isPopUpOpened: false,
      isSecurityVerified: false,
    },
    changeSecuritySettings: {
      isChangePrivateKeyClicked: false,
      isChangePasswordClicked: false,
      isChangePinClicked: false,
      iaChangePassphraseClicked: false,
      isConfirmChangedPassphraseActive: false,
    },
    enableOrDisableSecurity: {
      isChangePrivateKeyClicked: false,
      isBiometricsClicked: false,
      isChangePinClicked: false,
      isChangePassphraseClicked: false,
    },
    selectedSecurityVerification: '',
    isAlertEnabled: false,
    alertCondition: false,
    alertData: { text: '', img: undefined, value: false, as: '', info: '' },
    isSignOutEnabled: false,
  });
  return (
    <DashboardContext.Provider
      value={{
        isSettingsClicked,
        setIsSettingsClicked,
        setSettings,
        settings,
        navMap,
        setNavMap,
        selectedText,
        setSelectedText,
        setSubText,
        subText,
        authChanged,
        setAuthChanged,
        passPhrases,
        setPassphrases,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('Must be within the DashboardContext');
  }
  return context;
};
