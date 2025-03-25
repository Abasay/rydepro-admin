import { AdditionalSecurityTypes, NavigationLogicTypes, SignUpTypes } from '@/types/SignUpTypes/SignUp';
import { NavProps, UserLoginCredentials } from './LogInTypes';
import { ResetNavProps } from './ResetTypes';

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
