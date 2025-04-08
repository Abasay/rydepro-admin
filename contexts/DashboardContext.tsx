// contexts/GlobalContext.tsx
'use client';

import { Service, Vehicle } from '@/components/admin/Dashboard';
import { AdminDetails, GeneralDashboardContext, Variable, Zone } from '@/types/GlobalState';
import { GET_REQUEST } from '@/utils/lib/server-requests';
import { URLS } from '@/utils/lib/urls';
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
  const [services, setServices] = useState<Service[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [activeVariable, setActiveVariable] = useState<string>('Variable 1');
  const [activeFormula, setActiveFormula] = useState<string>('');

  const [formulas, setFormulas] = useState<any[]>([]);

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

  const getServices = async () => {
    const token = Cookies.get('token') || '';
    const url = URLS.BASE_URL_ADMIN + URLS.getServices;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.success) {
          setServices(result.data.services);
        } else {
          setServices([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVariables = async () => {
    const token = Cookies.get('token') || '';
    const url = URLS.BASE_URL_ADMIN + URLS.getVariables;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.status === 200) {
          setVariables(result.variables);
        } else {
          setVariables([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFormulas = async () => {
    const token = Cookies.get('token') || '';
    const url = URLS.BASE_URL_ADMIN + URLS.formulas;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.status === 200) {
          setFormulas(result.formulas);
          setActiveFormula(result.formulas[0].formulaName);
        } else {
          setFormulas([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getVehicles = async () => {
    const token = Cookies.get('token') || '';
    const url = URLS.BASE_URL_ADMIN + URLS.getVehicles;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.success) {
          setVehicles(result.data.vehicles);
        } else {
          setVehicles([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getZones = async () => {
    const token = Cookies.get('token') || '';
    const url = URLS.BASE_URL_ADMIN + URLS.getZones;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.success) {
          setZones(result.zones);
        } else {
          setZones([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    getVehicles();
    getZones();
    getServices();
    getVariables();
    getFormulas();
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
        services,
        setServices,
        vehicles,
        setVehicles,
        variables,
        setVariables,
        zones,
        setZones,
        activeVariable,
        setActiveVariable,
        formulas,
        setFormulas,
        getFormulas,
        getServices,
        getVehicles,
        getZones,
        getVariables,
        activeFormula,
        setActiveFormula,
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
