'use client';
import React, { useEffect } from 'react';
import { useSignInContext } from '@/contexts/SignUpContext';
import AdminSignUp from './Authentication/signup';
import OTPVerification from './OTPverification';
import PrivateKey from './PrivateKey';
import UserIDGeneration from './UserIDGeneration';
import AdditionalSecurity from './AdditionalSecurity/AuthenticationMethod';
import PinCodeOrPassphrase from './AdditionalSecurity/PinCodeOrPassphrase';
import ConfirmPassphrase from './AdditionalSecurity/ConfirmPassphrase';
import Biometrics from './AdditionalSecurity/Biometrics';
import styles from '@/styles/common.module.css';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Index = () => {
  const { navigation, additionalSecurity } = useSignInContext();

  const token = Cookies.get('token');
  const router = useRouter();

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, []);

  return (
    <GeneralDesign>
      {/**Creating Account */}
      {navigation.issignup && (
        <div className={`w-full h-full ${styles['fade-in']}`}>
          <AdminSignUp />
        </div>
      )}
      {navigation.issignupotp && <OTPVerification />}
      {navigation.privateKeys && <PrivateKey />}
      {navigation.userIDGen && <UserIDGeneration />}
      {/**Additional Security */}
      {additionalSecurity.isMethodActive && <AdditionalSecurity />}
      {additionalSecurity.isPincodeOrPassphraseActive && <PinCodeOrPassphrase />}
      {additionalSecurity.isConfirmPassphraseActive && <ConfirmPassphrase />}
      {additionalSecurity.isBiometricActive && <Biometrics />}
    </GeneralDesign>
  );
};

export default Index;
