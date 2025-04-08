import { AdditionalSecurityTypes, NavigationLogicTypes, SignUpTypes } from '@/types/SignUpTypes/SignUp';
import { NavProps, UserLoginCredentials } from './LogInTypes';
import { ResetNavProps } from './ResetTypes';
import { Service, Vehicle } from '@/components/admin/Dashboard';

export interface GlobalState {
  userDetails: SignUpTypes;
  setUserDetails: ({ email, username, employeeId }: SignUpTypes) => void;
  navigation: NavigationLogicTypes;
  setNavigation: ({ issignup }: NavigationLogicTypes) => void;
  additionalSecurity: AdditionalSecurityTypes;
  setAdditionalSecurity: ({}: AdditionalSecurityTypes) => void;
  isFaceID: boolean;
  setIsFaceID: (type: boolean) => void;
  setUpToken: string;
  setSetUpToken: (setUpToken: string) => void;
  pinCode: string;
  setPinCode: (pinCode: string) => void;
  passphrase: {
    text: string;
  }[];
  setPassphrase: (passphrase: { text: string }[]) => void;
}

export interface GlobalLoginState {
  userLoginCredentials: UserLoginCredentials;
  setUserLoginCredentials: ({}: UserLoginCredentials) => void;
  nav: NavProps;
  setNav: ({}: NavProps) => void;
}

export interface GlobalResetState {
  nav: ResetNavProps;
  setNav: ({}: ResetNavProps) => void;
  email: string;
  setEmail: (email: string) => void;
  setupToken: string;
  setSetupToken: (setupToken: string) => void;
  details: {
    employeeID: string;
    RMAK: string;
    RSAK: string;
  };
  setDetails: (details: { employeeID: string; RMAK: string; RSAK: string }) => void;
  authRecovered: string;
  setAuthRecovered: (authRecovered: string) => void;
}

export interface GeneralDashboardContext {
  navMap: string[];
  setNavMap: (type: string[]) => void;
  isSettingsClicked: boolean;
  setIsSettingsClicked: (type: boolean) => void;
  settings: SettingsProps;
  setSettings: ({}: SettingsProps) => void;
  selectedText: string;
  setSelectedText: (type: string) => void;
  subText: string;
  setSubText: (type: string) => void;
  authChanged: string;
  setAuthChanged: (type: string) => void;
  passPhrases: string[];
  setPassphrases: (passphrases: []) => void;
  adminDetails: AdminDetails | null;
  setAdminDetails: ({}: AdminDetails | null) => void;
  getAdmin: () => void;
  services: Service[];
  setServices: (services: Service[]) => void;
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
  variables: Variable[];
  setVariables: (variables: Variable[]) => void;
  zones: Zone[];
  setZones: (zones: Zone[]) => void;
  activeVariable: string;
  setActiveVariable: (variable: string) => void;
  formulas: Formula[];
  setFormulas: (formulas: Formula[]) => void;
  getFormulas: () => void;
  getServices: () => void;
  getVehicles: () => void;
  getZones: () => void;
  getVariables: () => void;
  activeFormula: string;
  setActiveFormula: (formula: string) => void;
}

export interface Formula {
  _id: string;
  formulaName: string;
  description: string;
  mainFormula: {
    type: 'variable' | 'operator';
    value: string;
  }[];
  __v: number;
  status: boolean;
}

export interface Variable {
  id: string;
  category: string;
  variableName: string;
  fee: { id: string; feeType: string; description: string; status: boolean }[];
}
export interface AdminDetails {
  id: string;
  email: string;
  username: string;
  employeeId: string;
  role: string;
  authEnabled: boolean | null;
  devices: {
    deviceId: string;
    deviceName: string;
    deviceType: string;
    status?: string;
    logInFrom?: string;
    dateAdded?: string;
    lastLogInDate?: string;
  }[];
  location: string | null;
  webAuthN: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Zone {
  _id: string;
  zoneName: string;
  country: string;
  county: string;
  city: string;
  state: string;
  zoneType: string;
  timeZone: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
