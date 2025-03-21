// contexts/GlobalContext.tsx
'use client';

import { GlobalState } from '@/types/GlobalState';
import { AdditionalSecurityTypes, NavigationLogicTypes, SignUpTypes } from '@/types/SignUpTypes/SignUp';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// Define the shape of the context state

// Create the context with an initial undefined value
const SignInPageContext = createContext<GlobalState | undefined>(undefined);

// Create a provider component
export const SignInProvider = ({ children }: { children: ReactNode }) => {
  //user Authentication
  const [userDetails, setUserDetails] = useState<SignUpTypes>({
    email: '',
    username: '',
    employeeId: '',
  });
  //navigationLogic
  const [navigation, setNavigation] = useState<NavigationLogicTypes>({
    issignup: true,
    issignupotp: false,
    userIDGen: false,
    privateKeys: false,
  });

  const [pinCode, setPinCode] = useState<string>('');
  const [passphrase, setPassphrase] = useState<{ text: string }[]>([
    {
      text: '',
    },
  ]);

  //faceID
  const [isFaceID, setIsFaceID] = useState<boolean>(false);

  const [additionalSecurity, setAdditionalSecurity] = useState<AdditionalSecurityTypes>({
    isMethodActive: false,
    isPincodeOrPassphraseActive: false,
    isConfirmPassphraseActive: false,
    isBiometricActive: false,
    isBiometricSelected: false,
    isPincodeOrPassphraseSelected: false,
  });

  const [setUpToken, setSetUpToken] = useState('');

  return (
    <SignInPageContext.Provider
      value={{
        userDetails,
        setUserDetails,
        navigation,
        setNavigation,
        additionalSecurity,
        setAdditionalSecurity,
        isFaceID,
        setIsFaceID,
        setSetUpToken,
        setUpToken,
        pinCode,
        setPinCode,
        passphrase,
        setPassphrase,
      }}
    >
      {children}
    </SignInPageContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
export const useSignInContext = () => {
  const context = useContext(SignInPageContext);
  if (context === undefined) {
    throw new Error('Must be within the GlobalState');
  }
  return context;
};
