// contexts/GlobalContext.tsx
'use client';

import { GlobalLoginState } from '@/types/GlobalState';
import { NavProps, UserLoginCredentials } from '@/types/LogInTypes';
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

// Define the shape of the context state

// Create the context with an initial undefined value
const LogInPageContext = createContext<GlobalLoginState | undefined>(undefined);

// Create a provider component
export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const [userLoginCredentials, setUserLoginCredentials] = useState<UserLoginCredentials>({
    username: '',
    employeeID: '',
    privateKey1: '',
    privateKey2: '',
    email: '',
  });
  const [nav, setNav] = useState<NavProps>({
    isLoginPageActive: true,
    isPasswordPageActive: false,
    isPincodeOrPasswordPageActive: false,
    isBiometricPageActive: false,
  });
  return (
    <LogInPageContext.Provider value={{ userLoginCredentials, setUserLoginCredentials, nav, setNav }}>
      {children}
    </LogInPageContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
export const useLogInContext = () => {
  const context = useContext(LogInPageContext);
  if (context === undefined) {
    throw new Error('Must be within the GlobalState');
  }
  return context;
};
