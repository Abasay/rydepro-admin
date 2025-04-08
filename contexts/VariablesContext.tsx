import React, { createContext, useState, useContext, useEffect } from 'react';
import { FormulaToken, Variable } from '@/types/DashboardTypes/formulaTypes';
import Cookies from 'js-cookie';
import { URLS } from '@/utils/lib/urls';
import { GET_REQUEST } from '@/utils/lib/server-requests';
import { SectionData } from '@/types/DashboardTypes/fees';

interface VariablesContextType {
  variables: Variable[];
  addVariable: (variable: Variable) => void;
  deleteVariable: (id: string) => void;
  updateVariable: (variable: Variable) => void;
  formulaTokens: FormulaToken[];
  setFormulaTokens: (formulaTokens: FormulaToken[]) => void;
  feeSections: SectionData[];
  getFeeSections: () => void;
  setFeeSections: React.Dispatch<React.SetStateAction<SectionData[]>>;
}

// const mockVariables: Variable[] = [
//   { id: '1', name: 'Base Fare', value: 5, description: 'Base fare charged for every ride' },
//   { id: '2', name: 'Distance', value: 0, description: 'Distance in miles/kilometers' },
//   { id: '3', name: 'Rate Per Mile', value: 2.5, description: 'Rate charged per mile/kilometer' },
//   { id: '4', name: 'Time', value: 0, description: 'Time in minutes/hours' },
//   { id: '5', name: 'Rate Per Minute', value: 0.5, description: 'Rate charged per minute/hour' },
// ];

const VariablesContext = createContext<VariablesContextType | undefined>(undefined);

export const VariablesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [variables, setVariables] = useState<Variable[]>([]);

  const [formulaTokens, setFormulaTokens] = useState<FormulaToken[]>([]);

  const [feeSections, setFeeSections] = React.useState<SectionData[]>([]);

  const addVariable = (variable: Variable) => {
    setVariables([...variables, variable]);
  };

  const deleteVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id));
  };

  const updateVariable = (updatedVariable: Variable) => {
    setVariables(variables.map((v) => (v.id === updatedVariable.id ? updatedVariable : v)));
  };

  const getVariables = async () => {
    const token = Cookies.get('token') || '';
    const url = URLS.BASE_URL_ADMIN + URLS.getVariables;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.status === 200) {
          const respVariables = result.variables
            .map((item: any) => item.fee)
            .flat()
            .map((it: any) => {
              return { ...it, id: it._id };
            });
          setVariables(respVariables);
          console.log(respVariables);
        } else {
          setVariables([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFeeSections = async () => {
    const token = Cookies.get('token') || '';
    const url = URLS.BASE_URL_ADMIN + URLS.getFeeSections;
    await GET_REQUEST(url, token)
      .then((result: any) => {
        if (result.success) {
          setFeeSections(result.result);
        } else {
          setFeeSections([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVariables();
    getFeeSections();
  }, []);

  return (
    <VariablesContext.Provider
      value={{
        variables,
        addVariable,
        deleteVariable,
        updateVariable,
        formulaTokens,
        setFormulaTokens,
        feeSections,
        getFeeSections,
        setFeeSections,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariables = () => {
  const context = useContext(VariablesContext);
  if (context === undefined) {
    throw new Error('useVariables must be used within a VariablesProvider');
  }
  return context;
};
