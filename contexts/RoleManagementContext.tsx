import { sampleEmployees } from '@/components/admin/Dashboard/RoleManagement';
import { Employee } from '@/components/admin/Dashboard/RoleManagement/types/employee';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface RoleManagementContextProps {
  roles: Role[];
  addRole: (role: Role) => void;
  updateRole: (id: string, updatedRole: Role) => void;
  deleteRole: (id: string) => void;
  addNewJobTitle: boolean;
  setAddNewJobTitle: React.Dispatch<React.SetStateAction<boolean>>;
  addNewMember: boolean;
  setAddNewMember: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTitle: string;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  assignEmployee: boolean;
  setAssignEmployee: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateEmployee: boolean;
  setOpenCreateEmployee: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleManagementContext = createContext<RoleManagementContextProps | undefined>(undefined);

export const RoleManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);

  const [addNewJobTitle, setAddNewJobTitle] = useState<boolean>(false);
  const [addNewMember, setAddNewMember] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<string>('All employees');
  const [employees, setEmployees] = useState<Employee[]>(sampleEmployees);
  const [assignEmployee, setAssignEmployee] = useState<boolean>(false);
  const [openCreateEmployee, setOpenCreateEmployee] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTitle === 'All employees') {
      setEmployees(sampleEmployees);
      return;
    }
    const newEmployeees = sampleEmployees.filter((employee) => employee.role === selectedTitle);
    setEmployees(newEmployeees);
  }, [selectedTitle]);

  const addRole = (role: Role) => {
    setRoles((prevRoles) => [...prevRoles, role]);
  };

  const updateRole = (id: string, updatedRole: Role) => {
    setRoles((prevRoles) => prevRoles.map((role) => (role.id === id ? updatedRole : role)));
  };

  const deleteRole = (id: string) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
  };

  useEffect(() => {
    setEmployees(sampleEmployees);
  }, []);

  return (
    <RoleManagementContext.Provider
      value={{
        roles,
        addRole,
        updateRole,
        deleteRole,
        addNewJobTitle,
        setAddNewJobTitle,
        addNewMember,
        setAddNewMember,
        selectedTitle,
        setSelectedTitle,
        employees,
        setEmployees,
        assignEmployee,
        setAssignEmployee,
        openCreateEmployee,
        setOpenCreateEmployee,
      }}
    >
      {children}
    </RoleManagementContext.Provider>
  );
};

export const useRoleManagement = (): RoleManagementContextProps => {
  const context = useContext(RoleManagementContext);
  if (!context) {
    throw new Error('useRoleManagement must be used within a RoleManagementProvider');
  }
  return context;
};
