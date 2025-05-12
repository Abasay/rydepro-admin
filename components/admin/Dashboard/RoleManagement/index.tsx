import { useEffect, useState } from 'react';
import JobTitleSidebar from './JobTitleSidebar';
import EmployeeList from './EmployeeList';
import type { Employee, JobTitle } from './types/employee';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../LucideUI/button';
import { useRoleManagement } from '@/contexts/RoleManagementContext';
import { Dialog, DialogContent } from '../LucideUI/dialog';
import { ChevronLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle, Plus, Search } from 'lucide-react';
import { Input } from '../LucideUI/input';
import { Avatar, AvatarFallback, AvatarImage } from '../LucideUI/avatar';

// Sample data - in a real app, this would come from an API
const initialJobTitles: JobTitle[] = [
  { title: 'All employees', count: 20 },
  { title: 'Administrator', count: 3 },
  { title: 'Manager', count: 3 },
  { title: 'Accountant', count: 3 },
  { title: 'Designers', count: 3 },
  { title: 'Developers', count: 3 },
];

export const sampleEmployees: Employee[] = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: `emp-${index}`,
    name: 'Ajala Michael',
    role: initialJobTitles[Math.floor(Math.random() * 5) + 1].title,
    avatarUrl: '/lovable-uploads/1a41656f-6cb5-4566-93f5-4c7d6d157a77.png',
  }));

const RoleManagement = () => {
  const {
    selectedTitle,
    setSelectedTitle,
    employees,
    addNewJobTitle,
    setAddNewJobTitle,
    setAddNewMember,
    addNewMember,
    assignEmployee,
    setAssignEmployee,
    setEmployees,
  } = useRoleManagement();
  const { toast } = useToast();

  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(5);

  const handleAddMember = () => {
    setAssignEmployee(true);
    toast({
      title: 'Add New Member',
      description: 'This feature would open a form to add a new team member.',
    });
  };

  useEffect(() => {
    setEmployees(sampleEmployees);
  }, []);

  return (
    <div className=" flex flex-col gap-4 bg-[#F9FAFB] px-4">
      <div className="flex items-center justify-between p-4 ">
        <h1 className="text-2xl text-[#0E0E0E] font-bold">Employee Roles</h1>
        <Button className="btn btn-primary p-2" onClick={() => setAddNewJobTitle(true)}>
          Create New Roles
        </Button>
      </div>

      <div className="flex h-full bg-[#FFFFFF] rounded-2xl gap-6 p-4">
        <JobTitleSidebar titles={initialJobTitles} selectedTitle={selectedTitle} onSelectTitle={setSelectedTitle} />
        <EmployeeList onAddMember={handleAddMember} />
      </div>

      <Dialog open={addNewJobTitle} onOpenChange={setAddNewJobTitle}>
        <DialogContent className="bg-none sm:rounded-3xl" title="Create New Job Title">
          <div className=" flex flex-col gap-9 p-12 text-primary">
            <h1 className=" font-bold text-2xl">Create New Job Title</h1>

            <div className=" flex flex-col">
              <label htmlFor="jobTitle" className=" text-sm  font-semibold">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                className="border-b border-[#DADADA] outline-none focus-within:outline-none p-4 rounded-lg"
                placeholder="Enter job title"
              />
            </div>
            <div className=" flex gap-2 items-center justify-end">
              <Button className=" bg-[#F5F5F5] text-primary p-2 px-6 ">Cancel</Button>
              <Button className=" bg-primary text-white p-2 px-6 ">Save</Button>
            </div>
          </div>

          {/* sSuccess Message */}
          {/* <div className=" flex flex-col items-center gap-6 p-10">
            <h1 className=" text-2xl text-primary font-bold">New Job Title Created</h1>
            <p className=" font-normal text-base">A new job title has been added to the list</p>
            <Button
              className=" bg-primary w-full text-white p-2 px-6"
              onClick={() => {
                setAddNewJobTitle(false);
                toast({
                  title: 'Success',
                  description: 'New job title has been created successfully.',
                });
              }}
            >
              Continue
            </Button>
          </div> */}
        </DialogContent>
      </Dialog>

      <Dialog open={assignEmployee} onOpenChange={setAssignEmployee}>
        <DialogContent className=" min-w-[860px] sm:rounded-3xl" title="Add New Member">
          <div className=" flex flex-col gap-4 p-10 w-full ">
            <div className=" flex items-center flex-col gap-4 justify-center">
              <h3 className=" text-primary font-bold">Assign Employee</h3>
              <p className=" text-[#3C3C3C] text-base ">Search and click on an employee to assign this role to them</p>
            </div>
            <div className="relative min-w-[360px] max-w-[360px] ">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for a member by name etc" className="pl-9 focus-within:border-none" />
            </div>
            <div className=" flex flex-col gap-6 items-start w-full">
              <p className=" text-[#3C3C3C] text-base">Available Employee</p>
              {employees.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 pb-10 w-full">
                  {employees.slice(startIndex, endIndex).map((employee, idx) => (
                    <div key={employee.id} className="flex items-center space-x-4 p-4  rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatarUrl} />
                        <AvatarFallback>{employee.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className=" flex flex-col gap-1 w-full">
                        <div className="font-medium text-primary w-full">{employee.name}</div>

                        <p className="text-sm w-full">
                          <span className=" text-[#8A8A]">ID:</span>
                          <span className=" text-primary">ADL976{employee.id}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex  flex-col gap-9 items-center  p-12 w-[560px] mx-auto">
                  <h4 className=" text-2xl font-bold ">No employee Assigned</h4>
                  <p className=" text-base text-[#3C3C3C]">
                    Click on the button below to assign an employee to this role
                  </p>
                  <Button className=" py-2 px-6 bg-[#F5F5F5] text-primary hover:bg-[#0E0E0E] hover:text-[#FAF6F6] rounded-lg flex items-center space-x-2">
                    <Plus size={16} />
                    <span>Add New Member</span>
                  </Button>
                </div>
              )}
            </div>

            <div className=" flex items-center gap-3 justify-end">
              <Button
                onClick={() => {
                  setStartIndex((prev) => Math.max(prev - 5, 0));
                  setEndIndex((prev) => Math.max(prev - 5, 5));
                }}
                disabled={startIndex === 0}
                className=" bg-[#d3d3d3] text-primary p-2 px-6  disabled:cursor-not-allowed h-12 w-12 rounded-full hover:text-white "
              >
                <ChevronLeft size={16} className="" />
              </Button>
              <Button
                onClick={() => {
                  setStartIndex((prev) => Math.min(prev + 5, employees.length - 1));
                  setEndIndex((prev) => Math.min(prev + 5, employees.length));
                }}
                className=" bg-[#d3d3d3] text-primary p-2 px-6  disabled:cursor-not-allowed h-12 w-12 rounded-full hover:text-white "
              >
                <ChevronRight size={16} className="" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
