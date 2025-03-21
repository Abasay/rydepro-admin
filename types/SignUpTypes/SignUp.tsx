export type SignUpTypes = {
  email: string;
  username: string;
  employeeId: string;
};

export type NavigationLogicTypes = {
  issignup: boolean;
  issignupotp: boolean;
  userIDGen: boolean;
  privateKeys: boolean;
};

export type AdditionalSecurityTypes = {
  isMethodActive: boolean;
  isPincodeOrPassphraseActive: boolean;
  isConfirmPassphraseActive: boolean;
  isBiometricActive: boolean;
  isBiometricSelected: boolean;
  isPincodeOrPassphraseSelected: boolean;
};
