'use client';
import React from 'react';
import { useResetContext } from '@/contexts/ResetContext';
import ForgotPassword from './forgotpassword';
import RecoveryCode from './RecoveryCode';
import IdentityVerification1 from './IdentityVerification1';
import OTPVerificationFP from './OTPverification';
import Biometrics from './Biometrics';
import NewPassword from './NewPassword';
import IdentityVerification2 from './IdentityVerification2';
import GeneralDesign from '../GeneralDesign';

const Index = () => {
  const { nav, setNav } = useResetContext();
  return (
    <GeneralDesign>
      {nav.isForgotPasswordPageActive && <ForgotPassword />}
      {nav.isRecoveryPageActive && <RecoveryCode />}
      {nav.isVerifyingIdentityPageActive && <IdentityVerification1 />}
      {nav.isPincodeOrPassphrasePageActive && <IdentityVerification2 />}
      {nav.isOTPPageActive && <OTPVerificationFP />}
      {nav.isBiometricPageActive && <Biometrics />}
      {nav.isNewPasswordPageActive && <NewPassword />}
    </GeneralDesign>
  );
};

export default Index;
