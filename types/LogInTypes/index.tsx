export type UserLoginCredentials = {
  username: string;
  employeeID: string;
  privateKey1: string;
  privateKey2: string;
  email: string;
};

export type NavProps = {
  isLoginPageActive: boolean;
  isPasswordPageActive: boolean;
  isPincodeOrPasswordPageActive: boolean;
  isBiometricPageActive: boolean;
};
