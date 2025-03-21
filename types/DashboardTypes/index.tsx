type SettingsProps = {
  isAdditionalSecurityClicked: boolean;
  isLoggedInDevicesClicked: boolean;
  additionalSecurity: {
    isChangeSecurityClicked: boolean;
    isEnableOrDisableClicked: boolean;
    isPopUpOpened: boolean;
    isSecurityVerified: boolean;
  };
  changeSecuritySettings: {
    isChangePrivateKeyClicked: boolean;
    isChangePasswordClicked: boolean;
    isChangePinClicked: boolean;
    iaChangePassphraseClicked: boolean;
    isConfirmChangedPassphraseActive: boolean;
  };
  enableOrDisableSecurity: {
    isChangePrivateKeyClicked: boolean;
    isBiometricsClicked: boolean;
    isChangePinClicked: boolean;
    isChangePassphraseClicked: boolean;
  };
  selectedSecurityVerification: string;
  isAlertEnabled: boolean;
  alertData: {
    text: string;
    img?: any;
    value?: boolean;
    as?: string;
    info: string;
  };
  alertCondition: boolean;
  isSignOutEnabled: boolean;
};
