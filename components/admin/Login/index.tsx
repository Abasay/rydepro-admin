'use client';
import React, { useEffect } from 'react';
import { useLogInContext } from '@/contexts/LoginContext';
import Login from './login';
import Password from './Password';
import PinCodeOrPassphrase from './PincodeOrPassphrase';
import GeneralDesign from '@/components/admin/GeneralDesign/index';
import styles from '@/styles/common.module.css';
import Biometrics from './Biometric';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Index = () => {
  const { nav, setNav } = useLogInContext();
  const token = Cookies.get('token');
  const router = useRouter();

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, []);
  return (
    <GeneralDesign>
      {nav.isLoginPageActive && <div className={`${styles['fade-in']}`}>{<Login />}</div>}
      {nav.isPasswordPageActive && <Password />}
      {nav.isPincodeOrPasswordPageActive && <PinCodeOrPassphrase />}
      {nav.isBiometricPageActive && <Biometrics />}
    </GeneralDesign>
  );
};

export default Index;
