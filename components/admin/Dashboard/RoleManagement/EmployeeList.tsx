import { Avatar, AvatarFallback, AvatarImage } from '../LucideUI/avatar';
import { Input } from '../LucideUI/input';
import { Button } from '../LucideUI/button';
import { Search, Plus } from 'lucide-react';
import type { Employee, JobTitle } from './types/employee';
import AccessRights from './AccessRights';
import { useState } from 'react';
import type { AccessRightSection } from './types/access';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../LucideUI/badge';
import { useRoleManagement } from '@/contexts/RoleManagementContext';
import { initialAccessRights } from './AccessRight';

type EmployeeListProps = {
  onAddMember: () => void;
};

// Sample data - in a real app, this would come from an API
const initialJobTitles: JobTitle[] = [
  { title: 'All employees', count: 20 },
  { title: 'Administrator', count: 3 },
  { title: 'Manager', count: 3 },
  { title: 'Accountant', count: 3 },
  { title: 'Designers', count: 3 },
  { title: 'Developers', count: 3 },
];

const sampleEmployees: Employee[] = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: `emp-${index}`,
    name: 'Ajala Michael',
    role: index % 2 === 0 ? 'CEO' : 'Founder',
    avatarUrl: '/lovable-uploads/1a41656f-6cb5-4566-93f5-4c7d6d157a77.png',
  }));

const EmployeeList = ({ onAddMember }: EmployeeListProps) => {
  const [showAccessRights, setShowAccessRights] = useState(false);
  const [accessRights, setAccessRights] = useState(initialAccessRights);
  const { toast } = useToast();
  const { selectedTitle, employees } = useRoleManagement();
  const handleAddMember = () => {
    toast({
      title: 'Add New Member',
      description: 'This feature would open a form to add a new team member.',
    });
  };

  // employees = employees || sampleEmployees; // Fallback to sample data if no employees are provided
  // onAddMember = onAddMember || handleAddMember; // Fallback to a no-op function if no handler is provided

  const handlePermissionChange = (
    documentId: string,
    permissionType: 'view' | 'printEmail' | 'edit',
    fieldId: string,
    checked: boolean
  ) => {
    setAccessRights((prev) =>
      prev.map((section) => ({
        ...section,
        documents: section.documents.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                permissions: {
                  ...doc.permissions,
                  [permissionType]: {
                    ...doc.permissions[permissionType],
                    fields: doc.permissions[permissionType].fields.map((field) =>
                      field.id === fieldId ? { ...field, isSelected: checked } : field
                    ),
                  },
                },
              }
            : doc
        ),
      }))
    );
  };

  const handleDocSectionSelect = (sectionId: string, checked: boolean) => {
    setAccessRights((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, isSelected: checked } : section))
    );
  };

  const handleModalClose = (sectionId: string) => {
    setAccessRights((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, closeModal: !section.closeModal } : section))
    );
  };

  const handlePermissionSelect = (
    documentId: string,
    checked: boolean,
    permissionType: 'view' | 'printEmail' | 'edit'
  ) => {
    setAccessRights((prev) =>
      prev.map((section) => ({
        ...section,
        documents: section.documents.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                permissions: {
                  ...doc.permissions,
                  [permissionType]: {
                    ...doc.permissions[permissionType],
                    fields: checked
                      ? doc.permissions[permissionType].fields.map((field) => ({ ...field, isSelected: true }))
                      : doc.permissions[permissionType].fields.map((field) => ({ ...field, isSelected: false })),
                  },
                },
              }
            : doc
        ),
      }))
    );
  };

  const handleDocumentSelect = (documentId: string, checked: boolean) => {
    setAccessRights((prev) =>
      prev.map((section) => ({
        ...section,
        documents: section.documents.map((doc) => (doc.id === documentId ? { ...doc, isSelected: checked } : doc)),
      }))
    );
  };

  const handleSaveChanges = () => {
    // Implement save functionality
    console.log('Saving changes:', accessRights);
  };

  const employeeBadgeBgs: Record<string, string> = {
    Administrator: 'bg-yellow-100 text-yellow-600',
    Manager: 'bg-green-100 text-green-600',
    Accountant: 'bg-blue-100 text-blue-600',
    Designers: 'bg-purple-100 text-purple-600',
    Developers: 'bg-pink-100 text-pink-600',
  };

  return (
    <div className="flex-1 p-3 pl-5 border-l-[2px] h-full border-[#DADADA] border-t-0">
      <div className="flex justify-between w-full items-center mb-6">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold ">{selectedTitle}</h2>
          <div className="flex gap-6 w-full border-b-[2px] pb-0 border-[#EBEBEB] text-base text-muted-foreground">
            <button
              className={`font-medium pb-4 min-w-[164px] flex gap-1 items-center justify-center ${
                !showAccessRights ? 'text-primary border-b-[2px] border-[#0E0E0E]' : ''
              }`}
              onClick={() => setShowAccessRights(false)}
            >
              Members{' '}
              <span className=" grid place-content-center h-[36px] w-[36px] rounded-full bg-[#F8F8FF] text-[#1511A8]">
                {employees.length}
              </span>
            </button>
            <button
              className={
                showAccessRights
                  ? 'text-primary min-w-[164px] pb-4 border-b-[2px] border-[#0E0E0E] font-medium'
                  : ' min-w-[164px] pb-4'
              }
              onClick={() => setShowAccessRights(true)}
            >
              Access Rights
            </button>
          </div>

          <div className=" flex gap-6 items-center w-full">
            <Button
              onClick={() => {
                // Logic to assign Super Admin
                console.log('Super Admin assigned');
              }}
              className="bg-[#F5F5F5] text-primary  px-4 py-2 rounded-lg hover:text-[#FAF6F6] hover:bg-[#0E0E0E]"
            >
              Assign Super Admin
            </Button>
            <Button
              onClick={handleSaveChanges}
              className="bg-[#0E0E0E] text-[#FAF6F6] px-4 py-2 rounded-lg hover:bg-[#F5F5F5] hover:text-primary"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {!showAccessRights ? (
        <>
          <div className=" flex w-full justify-between items-center mb-6">
            <div className="relative min-w-[360px] ">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for a member by name etc" className="pl-9" />
            </div>
            <Button onClick={onAddMember} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Member</span>
            </Button>
          </div>

          {employees.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 pb-10 w-full max-w-[1440px]">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center space-x-4 p-4  rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatarUrl} />
                    <AvatarFallback>{employee.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className=" flex flex-col gap-1">
                    <div className="font-medium text-primary">{employee.name}</div>

                    <div
                      className={`text-xs px-2 py-1 rounded-full w-fit inline-block ${
                        employeeBadgeBgs[employee.role] || 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {employee.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex  flex-col gap-9 items-center  p-12 w-[560px] mx-auto">
              <h4 className=" text-2xl font-bold ">No employee Assigned</h4>
              <p className=" text-base text-[#3C3C3C]">Click on the button below to assign an employee to this role</p>
              <Button
                onClick={handleAddMember}
                className=" py-2 px-6 bg-[#F5F5F5] text-primary hover:bg-[#0E0E0E] hover:text-[#FAF6F6] rounded-lg flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add New Member</span>
              </Button>
            </div>
          )}
        </>
      ) : (
        <AccessRights
          sections={accessRights}
          onPermissionChange={handlePermissionChange}
          onDocumentSelect={handleDocumentSelect}
          onSave={handleSaveChanges}
          onDocSectionSelect={handleDocSectionSelect}
          onPermissionSelect={handlePermissionSelect}
          onModalClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default EmployeeList;
