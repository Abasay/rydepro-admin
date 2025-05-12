import { useState } from 'react';
import { Button } from '../LucideUI/button';
import { Input } from '../LucideUI/input';
import { FileText, Mail, Printer, Trash, Edit, ChevronRight } from 'lucide-react';
import type { EmployeeDetails } from './types/employee';

const sampleEmployee: EmployeeDetails = {
  loginInfo: {
    lastLogin: '18- 07-04, 21:14',
    lastSeen: '18- 07-04, 21:14',
    department: 'Human Resource',
    jobTitle: 'CEO',
    updateDate: '04/14/2024',
    operatorId: 'LA824Y525(FC/FO/TNC)',
    currentStatus: 'Active',
  },
  personalInfo: {
    firstName: 'John',
    middleName: 'Mike',
    lastName: 'Edward',
    age: 32,
    dob: '03/14/1982',
    gender: 'Male',
    primaryPhone: '1234567890',
    secondaryPhone: '1234567890',
    emergencyPhone: '1234567890',
    email: 'johnE2@outlook.com',
    secondEmail: 'johnE1@outlook.com',
    profileImage: '/lovable-uploads/da89bacd-cb9f-418f-9d93-757ad194a522.png',
  },
  residentialAddress: {
    buildingNumber: '',
    streetAddress: '',
    aptSuite: '',
    city: '',
    state: '',
    region: '',
    postalCode: '',
    country: '',
  },
  demographics: {
    demographic: 'Asian',
    countryOfBirth: 'India',
    isUsCitizen: false,
    hasGreenCard: true,
    otherLanguages: 'Yes',
    ethnicity: 'White',
    speaksEnglish: false,
    country: '',
  },
  bankInfo: {
    routingNumber: '******',
    accountNumber: '0012345678',
  },
};

const EmployeeDetails = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [employee] = useState<EmployeeDetails>(sampleEmployee);

  return (
    <div className=" bg-[#F9FAFB] px-4 w-full">
      {' '}
      <div className="flex flex-col gap-4  max-w-[1500px] w-full mx-auto py-4">
        <div className=" flex gap-2 items-center text-[#8A8A8A] text-sm ">
          <Button className=" bg-transparent text-[#8A8A8A] px-0 hover:bg-transparent">Employee</Button>
          <span className="text-primary font-semibold">
            <ChevronRight size={16} />
          </span>
          <Button variant="link" className="text-primary px-0 font-normal bg-transparent">
            Employee Details
          </Button>
        </div>
        <h1 className=" text-primary font-bold text-2xl">Employee Details</h1>
        <div className=" bg-white rounded-[16px]  px-5 py-4">
          <div className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-[#EBEBEB]">
              <div className="flex gap-8">
                {['Profile', 'Activities', 'Overview'].map((tab) => (
                  <button
                    key={tab}
                    className={`py-2 pb-4 px-4 font-medium ${
                      activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-[#8A8A8A]'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                {/* <FileText className="h-4 w-4" /> */}
                Select All
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                {/* <Mail className="h-4 w-4" /> */}
                Email
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                {/* <Printer className="h-4 w-4" /> */}
                Print
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                {/* <Trash className="h-4 w-4" /> */}
                Delete
              </Button>
            </div>

            {/* Employee Info Card */}
            <div className="border border-dashed border-[#8A8A8A] rounded-[16px] p-4 px-6">
              <div className="overflow-x-auto w-full">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b  border-[#DFE6F0]">
                      <th className="text-left py-2">Employee Last Login</th>
                      <th className="text-left py-2">Last Seen</th>
                      <th className="text-left py-2">
                        Department <Edit className="h-4 w-4 inline ml-1 text-primary font-semibold" />
                      </th>
                      <th className="text-left py-2">
                        Job Title <Edit className="h-4 w-4 inline ml-1 text-primary font-semibold" />
                      </th>
                      <th className="text-left py-2">Update Date</th>
                      <th className="text-left py-2">Operator ID</th>
                      <th className="text-left py-2">Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3">{employee.loginInfo.lastLogin}</td>
                      <td className="py-3">{employee.loginInfo.lastSeen}</td>
                      <td className="py-3">{employee.loginInfo.department}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded-full text-xs">
                          {employee.loginInfo.jobTitle}
                        </span>
                      </td>
                      <td className="py-3">{employee.loginInfo.updateDate}</td>
                      <td className="py-3">{employee.loginInfo.operatorId}</td>
                      <td className="py-3">{employee.loginInfo.currentStatus}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Personal Information */}
            <div className=" w-full p-[10px]  border border-[#111111] bg-[#F8F8F8] rounded-[8px]">
              <div className=" flex justify-end items-center  gap-4">
                <Button variant="outline" size="icon" className="gap-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="border border-dashed rounded-lg p-6">
              <div className="grid grid-cols-[250px,1fr] gap-8">
                <img
                  src={
                    'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fwww.gravatar.com%2Favatar%2F2c7d99fe281ecd3bcd65ab915bac6dd5%3Fs%3D250'
                  }
                  alt="Employee"
                  className="w-full rounded-lg"
                />
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-primary font-semibold">First Name</label>
                      <Input
                        value={employee.personalInfo.firstName}
                        readOnly
                        className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-primary font-semibold">Age</label>
                      <Input
                        value={employee.personalInfo.age}
                        className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm text-primary font-semibold">Primary Phone Number</label>
                      <div className="flex gap-2">
                        <div className="w-16">
                          <Input
                            value="🇺🇸"
                            className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                            readOnly
                          />
                        </div>
                        <Input
                          value={employee.personalInfo.primaryPhone}
                          className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none flex-1"
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-primary font-semibold">Email Address</label>
                      <Input
                        value={employee.personalInfo.email}
                        className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-primary font-semibold">Middle Name</label>
                      <Input
                        value={employee.personalInfo.middleName}
                        className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm text-primary font-semibold">DOB</label>
                      <Input
                        value={employee.personalInfo.dob}
                        className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm text-primary font-semibold">Secondary Phone Number</label>
                      <div className="flex gap-2">
                        <div className="w-16">
                          <Input
                            value="🇺🇸"
                            className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                            readOnly
                          />
                        </div>
                        <Input
                          value={employee.personalInfo.secondaryPhone}
                          className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none flex-1"
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-primary font-semibold">Second Email Address</label>
                      <Input
                        value={employee.personalInfo.secondEmail}
                        className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-primary font-semibold">Last Name</label>
                      <Input
                        value={employee.personalInfo.lastName}
                        className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm text-primary font-semibold">Gender</label>
                      <Input
                        value={employee.personalInfo.gender}
                        className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-sm text-primary font-semibold">Emergency Phone Number</label>
                      <div className="flex gap-2">
                        <div className="w-16">
                          <Input
                            value="🇺🇸"
                            className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                            readOnly
                          />
                        </div>
                        <Input
                          value={employee.personalInfo.emergencyPhone}
                          className="border-t-0 border-x-0  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none flex-1"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Residential Address Section */}
            <div className=" w-full p-[10px]  border border-[#111111] bg-[#F8F8F8] rounded-[8px]">
              <div className=" flex justify-end items-center  gap-4">
                <Button variant="outline" size="icon" className="gap-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="border border-dashed border-[#D0D0D0] bg-[#FFF5F6] rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  Residential Address
                  <span className="text-xs px-2 py-1 bg-red-100 text-[#DC5353] rounded-full">Suspend</span>
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-primary font-semibold">Building Number</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Street Address</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Apt/Suite</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">City</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">State</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Region/Country</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Postal Code/Zip Code</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Country</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Demographics Section */}
            <div className=" w-full p-[10px]  border border-[#111111] bg-[#F8F8F8] rounded-[8px]">
              <div className=" flex justify-end items-center  gap-4">
                <Button variant="outline" size="icon" className="gap-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-6 border-dashed border-[#D0D0D0] bg-[#F7FFF8]">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  Demographics
                  <span className="text-xs px-2 py-1 bg-green-100 text-[#008000] rounded-full">Accepted</span>
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-primary font-semibold">Demographic</label>
                  <Input
                    value={employee.demographics.demographic}
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Country of Birth</label>
                  <Input
                    value={employee.demographics.countryOfBirth}
                    readOnly
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">
                    United States Citizenship by Naturalization
                  </label>
                  <Input
                    value={employee.demographics.isUsCitizen ? 'Yes' : 'No'}
                    readOnly
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Green Card/Work Permit</label>
                  <Input
                    value={employee.demographics.hasGreenCard ? 'Yes' : 'No'}
                    readOnly
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Other Languages</label>
                  <Input
                    value={employee.demographics.otherLanguages}
                    readOnly
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Ethnicity</label>
                  <Input
                    value={employee.demographics.ethnicity}
                    readOnly
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Do you Speak English?</label>
                  <Input
                    value={employee.demographics.speaksEnglish ? 'Yes' : 'No'}
                    readOnly
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Country</label>
                  <Input
                    placeholder="Input"
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bank Account Section */}
            <div className=" w-full p-[10px]  border border-[#111111] bg-[#F8F8F8] rounded-[8px]">
              <div className=" flex justify-end items-center  gap-4">
                <Button variant="outline" size="icon" className="gap-2">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="gap-2">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-6 border-dashed border-[#D0D0D0] bg-[#FFF5F6]">
              <div className="flex justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  Bank Account
                  <span className="text-xs px-2 py-1 bg-red-100 text-[#7E101F] rounded-full">Rejected</span>
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-primary font-semibold">Routing Number</label>
                  <Input
                    value={employee.bankInfo.routingNumber}
                    readOnly
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-primary font-semibold">Account Number</label>
                  <Input
                    value={employee.bankInfo.accountNumber}
                    readOnly
                    className="border-t-0 border-x-0 bg-transparent  border-b-[2px] rounded-none border-[#CCCCCC] focus-within:outline-none outline-none focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <Button className="w-full">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
