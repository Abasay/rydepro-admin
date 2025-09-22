'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DBContextProps {
  data: any;
  setData: (data: any) => void;
  advancedSearch: boolean;
  setAdvancedSearch: (advancedSearch: boolean) => void;
  activeHeader: string;
  setActiveHeader: (activeHeader: string) => void;
  filters: any;
  setFilters: (filters: any) => void;
  errorText: string;
  setErrorText: (errorText: string) => void;
  successText: string;
  setSuccessText: (successText: string) => void;
  showSingleDriver: boolean;
  setShowSingleDriver: (showSingleDriver: boolean) => void;
  showSingleRider: boolean;
  setShowSingleRider: (showSingleRider: boolean) => void;
}

const DBContext = createContext<DBContextProps | undefined>(undefined);

export const DBProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);
  const [activeHeader, setActiveHeader] = useState<string>('');
  const [filters, setFilters] = useState<any>({});

  const [errorText, setErrorText] = useState<string>('');
  const [successText, setSuccessText] = useState<string>('');
  const [showSingleDriver, setShowSingleDriver] = useState<boolean>(false);
  const [showSingleRider, setShowSingleRider] = useState<boolean>(false);

  return (
    <DBContext.Provider
      value={{
        data,
        setData,
        advancedSearch,
        setAdvancedSearch,
        activeHeader,
        setActiveHeader,
        filters,
        setFilters,
        errorText,
        setErrorText,
        successText,
        setSuccessText,
        showSingleDriver,
        setShowSingleDriver,
        showSingleRider,
        setShowSingleRider,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export const useDB = () => {
  const context = useContext(DBContext);
  if (context === undefined) {
    throw new Error('useDB must be used within a DBProvider');
  }
  return context;
};
