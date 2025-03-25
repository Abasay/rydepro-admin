// contexts/GlobalContext.tsx
'use client';

import { AdminDetails, GeneralDashboardContext } from '@/types/GlobalState';
import { getRequest } from '@/utils/requests';
import { AdminUrls } from '@/utils/urls';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

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

  const router = useRouter();

  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>({
    id: '',
    email: '',
    username: '',
    employeeId: '',
    role: '',
    authEnabled: null,
    devices: [],
    location: null,
    webAuthN: null,
    createdAt: '',
    updatedAt: '',
  });

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

  const getAdmin = async () => {
    const url = AdminUrls.getAdmin;
    const token = Cookies.get('token') || '';

    if (token === '') {
      return;
    }

    await getRequest({ url, token: Cookies.get('token') || '' }).then((response) => {
      if (response.success) {
        setAdminDetails((response as unknown as { admin: AdminDetails } & { success: boolean }).admin);
      } else {
        if (
          response.message.toLowerCase().includes('jwt') ||
          response.message.toLowerCase().includes('expired') ||
          response.message.toLowerCase().includes('invalid') ||
          response.message.toLowerCase().includes('malformed') ||
          response.message.toLowerCase().includes('not')
        ) {
          Cookies.remove('token');
          toast.error('Session expired. Please login again');
          router.push('/login');
        }
        // if(response)
      }
    });
  };

  useEffect(() => {
    getAdmin();
  }, []);

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
        adminDetails,
        setAdminDetails,
        getAdmin,
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
