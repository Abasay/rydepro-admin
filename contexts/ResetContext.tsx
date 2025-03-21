// contexts/GlobalContext.tsx
'use client';

import { GlobalResetState } from '@/types/GlobalState';
import { ResetNavProps } from '@/types/ResetTypes';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// Define the shape of the context state

// Create the context with an initial undefined value
const ResetContext = createContext<GlobalResetState | undefined>(undefined);

// Create a provider component
export const ResetProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>('');
  const [nav, setNav] = useState<ResetNavProps>({
    isForgotPasswordPageActive: true,
    isRecoveryPageActive: false,
    isVerifyingIdentityPageActive: false,
    isPincodeOrPassphrasePageActive: false,
    isOTPPageActive: false,
    isBiometricPageActive: false,
    isNewPasswordPageActive: false,
    isSuccess: false,
  });

  const [authRecovered, setAuthRecovered] = useState<string>('');

  const [details, setDetails] = useState({
    employeeID: '',
    RMAK: ``, //RMAK (RYDEPRO Master Admin Key)
    RSAK: ``, //RSAK (RYDEPRO Secondary Admin Key)
  });

  const [setupToken, setSetupToken] = useState<string>('');
  return (
    <ResetContext.Provider
      value={{
        nav,
        setNav,
        email,
        setEmail,
        setSetupToken,
        setupToken,
        details,
        setDetails,
        authRecovered,
        setAuthRecovered,
      }}
    >
      {children}
    </ResetContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
export const useResetContext = () => {
  const context = useContext(ResetContext);
  if (context === undefined) {
    throw new Error('Must be within the GlobalState');
  }
  return context;
};
