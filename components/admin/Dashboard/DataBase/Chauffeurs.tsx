// components/DriversTable.tsx
import { useDB } from '@/contexts/DBContext';
import React, { useState } from 'react';
import { DRIVERHEADERS } from '..';
import SingleDriver from './Driver';

type Driver = {
  id: number;
  accountType: string;
  userId: string;
  accessibility: string;
  name: string;
  displayName: string;
  language: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  referredBy: string;
  registeredDate: string;
  lastBooking: string;
  status: string;
  rating: string;
  activityDetails: string;
};

const users: Driver[] = [
  {
    id: 1,
    accountType: 'Individual',
    userId: 'IND0001',
    accessibility: 'Deaf',
    name: 'Michael Ajala Akinlola',
    displayName: 'Mikeay',
    language: 'French',
    dob: '01 Jan 1999',
    gender: 'Male',
    email: 'mikeajala@gmail.com',
    phone: '+234-810-346-7345',
    country: 'Nigeria',
    state: 'Lagos',
    city: 'Alakija',
    referredBy: 'REF111',
    registeredDate: '08 Nov 2024 / 9:12am WAT',
    lastBooking: '09 Nov 2024 / 9:12am WAT',
    status: 'Online',
    rating: 'Excellent',
    activityDetails: 'Device Coordinate: Lagos, 37.7749, -122.4194, Device Name: Dell Latitude, App',
  },
  {
    id: 2,
    accountType: 'Individual',
    userId: 'IND0002',
    accessibility: 'Service Dog',
    name: 'Jane Doe',
    displayName: 'JaneD',
    language: 'English',
    dob: '15 Feb 1985',
    gender: 'Female',
    email: 'janedoe@gmail.com',
    phone: '+234-810-346-7346',
    country: 'Nigeria',
    state: 'Abuja',
    city: 'Garki',
    referredBy: 'REF112',
    registeredDate: '08 Nov 2024 / 11:15am WAT',
    lastBooking: '09 Nov 2024 / 12:30pm WAT',
    status: 'Offline',
    rating: 'Good',
    activityDetails:
      'Device Coordinate: Abuja, 29.7749, -102.4194, Device Name: HP Pavillion, App, Device Coordinate: Abuja, 29.7749, -102.4194, Device Name: HP Pavillion, App',
  },
  {
    id: 2,
    accountType: 'Individual',
    userId: 'IND0002',
    accessibility: 'Blind',
    name: 'Jane Doe',
    displayName: 'JaneD',
    language: 'English',
    dob: '15 Feb 1985',
    gender: 'Female',
    email: 'janedoe@gmail.com',
    phone: '+234-810-346-7346',
    country: 'Nigeria',
    state: 'Abuja',
    city: 'Garki',
    referredBy: 'REF112',
    registeredDate: '08 Nov 2024 / 11:15am WAT',
    lastBooking: '09 Nov 2024 / 12:30pm WAT',
    status: 'Offline',
    rating: 'Good',
    activityDetails:
      'Device Coordinate: Abuja, 29.7749, -102.4194, Device Name: HP Pavillion, App, Device Coordinate: Abuja, 29.7749, -102.4194, Device Name: HP Pavillion, App',
  },
  // Add more sample users here...
];

const COMMON = ['Livery Company', 'TNC', 'Chauffeur'];

const ChauffeurTable = ({ chauffeurDrivers }: { chauffeurDrivers: any[] }) => {
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([]);

  const { activeHeader, showSingleDriver, setShowSingleDriver } = useDB();

  const handleSelectAll = () => {
    if (selectedDrivers.length === users.length) {
      setSelectedDrivers([]);
    } else {
      setSelectedDrivers(users.map((user) => user.id));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedDrivers((prev) => (prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]));
  };

  if (showSingleDriver) {
    return <SingleDriver driverType="chauffeur" />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className=" text-left text-sm">
        <thead className="bg-[#F8F8F8] pt-8 ">
          <tr className=" text-[#0E0E0E] flex pb-2 pt-2 items-end tracking-widest text-sm font-medium">
            <th className="py-2 px-4 mr-4">
              <input
                type="checkbox"
                checked={selectedDrivers.length === users.length}
                onChange={handleSelectAll}
                className="border-[0.67px] rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px]"
              />
            </th>
            <th className=" flex items-start gap-12 min-w-[1124px] mr-12">
              <th className="py-2 min-w-12 max-w-12 flex gap-2 items-center">
                <span>S/N</span>
                <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px] max-w-[124px] ">Account Type</th>
              <th className="py-2 min-w-[164px] max-w-[164px] flex gap-2">
                <span>Driver ID</span>
                <span>
                  <UpsAndDowns />
                </span>
              </th>
              <th className="py-2 min-w-[140px] max-w-[140px] flex gap-2">
                <span>Accessibility</span>
                <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[200px] max-w-[200px] flex gap-2">
                <span>Name</span> <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[128px] max-[128px] flex gap-2">
                <span>Display Name</span>
                <UpsAndDowns />
              </th>
            </th>
            <th className={`flex gap-12 items-end  min-w-[3096px]`}>
              <th className="py-2 min-w-[164px] max-w-[164px] flex gap-2">
                <span>Other Languages</span> <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px] max-w-[124px] flex gap-2">
                <span>DOB</span> <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px] max-w-[124px] flex gap-2">
                <span>Gender</span> <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[200px] max-w-[200px] flex gap-2">
                <span> Email Address</span>
                <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[138px] max-w-[138px] flex gap-2">
                <span>Phone Number</span>
                <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px] max-w-[124px] flex gap-2">
                <span>Country</span> <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px] max-w-[124px] flex gap-2">
                <span>State</span> <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px] max-w-[124px] flex gap-2">
                <span>City</span>
                <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px] max-w-[124px]">Referred By</th>
              <th className="py-2 min-w-[210px] max-w-[210px] flex gap-2">
                <span> Registered Date / Time</span>
                <UpsAndDowns />
              </th>
              <th className="py-2  min-w-[320px] max-w-[320px] flex gap-2">
                <span>Activity Details</span>
                <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px]  max-w-[124px] flex gap-2">
                <span>Ratings</span>
                <UpsAndDowns />
              </th>

              <th className="py-2 min-w-[200px]  max-w-[200px] flex gap-2">
                <span>Last Booking</span>
                <UpsAndDowns />
              </th>
              <th className="py-2 min-w-[124px] max-w-[124px] flex gap-2">Status</th>

              <th className="py-2 min-w-[124px] max-w-[124px] flex gap-2">Actions</th>
            </th>

            <th className=" flex flex-col gap-1 items-center ">
              <th className=" flex gap-12 items-end min-w-[5020px] ">
                <th className=" flex flex-col items-center min-w-[1548px] max-w-[1548px] gap-1">
                  <span>Personal Document</span>
                  <th className=" flex gap-12  ">
                    <th className="min-w-[220px] max-w-[220px]">
                      <span>Driver License Information</span>
                    </th>
                    <th className="min-w-[154px] max-w-[154px] flex gap-2">
                      <span>Social Security</span> <UpsAndDowns />
                    </th>
                    <th className="min-w-[212px] max-w-[212px]">
                      <span>Residential Address</span>
                    </th>
                    <th className="min-w-[250px] max-w-[250px] ">
                      <span> Proof of Residential Address</span>
                    </th>
                    <th className="min-w-[138px] max-w-[138px]">
                      <span>Demographics</span>
                    </th>
                    <th className="min-w-[150px] max-w-[150px] flex gap-2">
                      <span>Country of Birth</span> <UpsAndDowns />
                    </th>
                    <th className="min-w-[250px] max-w-[250px]">
                      <span>Citizenship</span>
                    </th>
                  </th>
                </th>

                {/* <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  Status
                </th> */}
                {/* FOR Companies */}
                {
                  // <th className=' flex flex-col items-center bg-[#EAFCEC] min-w-[1615px] max-w-[1880px] gap-1'>
                  //   <span>Company Information</span>
                  //   <th className=' flex gap-12  items-center'>
                  //     <th className='  text-sm min-w-[340px]  max-w-[340px]'>
                  //       <span>Company Documentation</span>
                  //     </th>
                  //     <th className=' min-w-[230px]  max-w-[230px] '>
                  //       <span>Registered Business Address</span>
                  //     </th>
                  //     <th className=' min-w-[214px]  max-w-[214px] '>
                  //       <span>Proof of Business Address</span>
                  //     </th>
                  //     <th className=' min-w-[310px]  max-w-[310px] '>
                  //       <span>Livery Certification</span>
                  //     </th>
                  //     <th className=' min-w-[220px]  max-w-[220px] '>
                  //       <span>Airport Permit Certificates</span>
                  //     </th>
                  //     <th className=' min-w-[310px]  max-w-[310px] '>
                  //       <span>Business Certification</span>
                  //     </th>
                  //   </th>
                  // </th>
                }

                {/* Vehicle Info */}
                {
                  <th className=" flex flex-col items-center bg-[#FFE5E9] min-w-[770px] max-w-[770px] gap-1">
                    <span>Vehicle Information</span>
                    <th className=" flex gap-12 items-center">
                      <th className=" text-sm min-w-[234px]  max-w-[124px] ">
                        <span>Vehicle Insurance Certificate</span>
                      </th>
                      <th className="min-w-[254px]  max-w-[254px] ">
                        <span>Vehicle Information and Images</span>
                      </th>
                      <th className=" min-w-[184px]  max-w-[184px] ">
                        <span>Approved Drivers</span>
                      </th>
                    </th>
                  </th>
                }

                {/* Vehicle Info */}
                {
                  <th className=" flex flex-col items-center bg-[#FFF7E5] min-w-[1047px] max-w-[1547px] gap-1">
                    <span>Background Check</span>
                    <th className=" flex gap-12 items-center">
                      <th className=" text-sm min-w-[164px]  max-w-[164px] ">
                        <span>MV or DMV Report</span>
                      </th>
                      <th className=" min-w-[190px]  max-w-[190px] ">
                        <span>Checker</span>
                      </th>
                      <th className=" min-w-[268px]  max-w-[268px] ">
                        <span>Proof of Live Scan Submission</span>
                      </th>
                      <th className=" min-w-[189px]  max-w-[189px] ">
                        <span>Submit LSR Information</span>
                      </th>
                      <th className=" min-w-[188px]  max-w-[188px] ">
                        <span>Live Scan Final Report</span>
                      </th>
                    </th>
                  </th>
                }

                {
                  <th className=" flex flex-col items-start bg-[#D7EED9] min-w-[200px] max-w-[200px] gap-1">
                    <span>Deposit Information</span>
                    <th className=" flex gap-12 items-center">
                      <th className=" text-sm min-w-[124px]  max-w-[124px] ">
                        <span>Deposit Details</span>
                      </th>
                    </th>
                  </th>
                }

                {
                  <th className=" flex flex-col items-center bg-[#FFF7E5] min-w-[1092px] max-w-[1047px] gap-1">
                    <span>Optional Information</span>
                    <th className=" flex gap-12 items-center">
                      <th className=" text-sm min-w-[240px]  max-w-[240px] ">
                        <span>Military Service</span>
                      </th>
                      <th className=" min-w-[320px]  max-w-[320px] ">
                        <span>Law Enforcement/Federal Agent Service</span>
                      </th>
                      <th className=" min-w-[440px]  max-w-[440px] ">
                        <span>Security Clearance</span>
                      </th>
                    </th>
                  </th>
                }
                <th className="py-2 min-w-[124px] max-w-[124px] flex gap-2">Actions</th>
              </th>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {chauffeurDrivers.map((user, index) => (
            <tr key={user.id} className="border-b flex pt-2 hover:bg-gray-50">
              <td className="py-3 mr-4 px-4">
                <input
                  type="checkbox"
                  checked={selectedDrivers.includes(user.id)}
                  onChange={() => handleSelectRow(user.id)}
                  className="border-[0.67px] rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px] focus-within:bg-[#0E0E0E]"
                />
              </td>
              <td className="flex items-start gap-12 min-w-[1124px] mr-12">
                <td className="py-3 items-start  min-w-12 max-w-12">{index + 1}</td>
                <td
                  className={`py-3 items-start  min-w-[124px] max-w-[124px] text-xs min-h-[20px] grid place-content-center ${
                    user['Account Type'] === 'Livery Company' && 'text-[#97A816] '
                  } ${user['Account Type'] === 'Chauffeur Drivers' && 'text-[#AC24CB] '} ${
                    user['Account Type'] === 'TNC' && 'text-[#2AFD00] '
                  } `}
                >
                  <span
                    className={`-ml-7 rounded-[100px]  px-2 ${
                      user['Account Type'] === 'Livery Company' && 'bg-[#FBFFDC] '
                    } ${user['Account Type'] === 'Chauffeur Drivers' && 'bg-[#FAE4FF] '} ${
                      user['Account Type'] === 'TNC' && 'bg-[#ECFFE8] '
                    }  min-w-min`}
                  >
                    {user['Account Type']}
                  </span>
                </td>
                <td className="py-2 items-start  min-w-[164px] max-w-[164px]">{user['User ID']}</td>
                <td
                  className={`py-2 items-start text-xs  min-w-[140px] max-w-[140px] ${
                    user['Accessibility'] === 'Service Dog' && 'text-[#FD6B7F]'
                  } ${user['Accessibility'] === 'Deaf' && 'text-[#059B14]'} ${
                    user['Accessibility'] === 'Sign Language (ASL)' && 'text-[#D21B34]'
                  }`}
                >
                  {user['Accessibility']}
                </td>
                <td className="py-2 items-start  min-w-[200px] text-[#0E0E0E] font-bold max-w-[200px]">
                  {user['Name']}
                </td>
                <td className="py-2 text-[#0E0E0E]  font-medium items-start  min-w-[128px] max-w-[128px]">
                  {user['Display Name']}
                </td>
              </td>

              <td className=" flex gap-12 min-w-[3096px] ">
                <td className="py-2 items-start text-[#0E0E0E] font-medium  min-w-[164px] max-w-[164px]">
                  {user['Other Languages']}
                </td>
                <td className="py-2 items-start  text-[#0E0E0E] font-medium min-w-[124px] max-w-[124px]">
                  {user['Date of Birth & Age']}
                </td>
                <td className="py-2 items-start text-[#0E0E0E] font-medium min-w-[124px] max-w-[124px]">
                  {user['Gender']}
                </td>
                <td className="py-2 items-start text-[#0E0E0E] font-medium min-w-[200px] max-w-[200px]">
                  {user['Email Address']}
                </td>
                <td className="py-2 items-start text-[#0E0E0E] font-medium min-w-[138px] max-w-[138px]">
                  {user['Phone Number']}
                </td>
                <td className="py-2 min-w-[124px] text-[#0E0E0E] font-medium max-w-[124px]">{user['Country']}</td>
                <td className="py-2 min-w-[124px]  text-[#0E0E0E] font-medium max-w-[124px]">{user['State']}</td>
                <td className="py-2 min-w-[124px] text-[#0E0E0E] font-medium max-w-[124px]">{user['City']}</td>
                <td className="py-2 min-w-[124px] text-[#0E0E0E] font-medium max-w-[124px]">{user['Referred By']}</td>
                <td className="py-2 min-w-[210px] text-[#0E0E0E] font-medium max-w-[210px]">
                  {user['Registered Date']}
                </td>
                <td className="py-2 min-w-[320px] flex flex-col gap-0 items-start text-[#0E0E0E] font-medium max-w-[320px]">
                  <span className=" font-bold text-[#0C8418] ">{user['Activity Details']}</span>
                  <span className=" font-bold text-[#1F1AFC] ">{user['Activity Details']}</span>
                  <button className=" underline text-[#1511A8] underline-offset-2">View</button>
                </td>
                <td className="mt-2 text-[#059B14]  text-xs  min-h-[20px] max-h-[20px] grid place-content-center  min-w-[124px]   max-w-[124px]">
                  <span className=" min-w-min px-2 place-content-start -ml-[60px] rounded-[100px] bg-[#EAFCEC]">
                    {user['Ratings']}
                  </span>
                </td>
                <td className="py-2 items-start  min-w-[200px] max-w-[200px]">{user['Last Booking']}</td>
                <td className="mt-2 min-w-[124px] text-[#008000] min-h-[20px] grid place-content-center  max-w-[124px] max-h-[20px]">
                  <span className=" px-2 bg-[#F6FFF6] place-content-start text-xs rounded-[100px] min-w-min -ml-[60px]">
                    {user['Status']}
                  </span>
                </td>
              </td>

              <td className=" flex flex-col gap-1 items-start min-w-[5020px]  ">
                <td className=" flex gap-12 items-start  ">
                  <td className=" min-w-[1548px] max-w-[1548px]">
                    <td className=" flex gap-12 -ml-[58px] ">
                      <td className="py-2 min-w-[220px] max-w-[220px]">
                        <span>{user['Driver License Information']}</span>
                      </td>
                      <td className="py-2 min-w-[154px] max-w-[154px]">
                        <span>{user['Social Security']}</span>
                      </td>
                      <td className="py-2 min-w-[212px] max-w-[212px]">
                        <span>{user['Residential Address']}</span>
                      </td>
                      <td className="py-2 min-w-[250px] max-w-[250px] ">
                        <span>{user['Proof of Residential Address']}</span>
                      </td>
                      <td className="py-2 min-w-[138px] max-w-[138px]">
                        <span>{user['Demographics']}</span>
                      </td>
                      <td className="py-2 min-w-[150px]  max-w-[150px]">
                        <span>{user['Country of Birth']}</span>
                      </td>
                      <td className="py-2 min-w-[250px] max-w-[250px]">
                        <span>{user['Citizenship']}</span>
                      </td>
                    </td>
                  </td>

                  {/* <td className='py-2 min-w-[124px] max-w-[124px]'>
                  Status
                </td> */}
                  {/* FOR Companies */}
                  {
                    // <td className=' min-w-[1615px] max-w-[1880px]'>
                    //   <td className=' flex gap-12  items-center'>
                    //     <td className='py-2  text-sm min-w-[340px]  max-w-[340px]'>
                    //       <span>Company Documentation</span>
                    //     </td>
                    //     <td className='py-2 min-w-[230px]  max-w-[230px] '>
                    //       <span>Registered Business Address</span>
                    //     </td>
                    //     <td className='py-2 min-w-[214px]  max-w-[214px] '>
                    //       <span>Proof of Business Address</span>
                    //     </td>
                    //     <td className='py-2 min-w-[310px]  max-w-[310px] '>
                    //       <span>Livery Certification</span>
                    //     </td>
                    //     <td className='py-2 min-w-[190px]  max-w-[190px] '>
                    //       <span>Airport Permit certificates</span>
                    //     </td>
                    //     <td className='py-2 min-w-[310px]  max-w-[310px] '>
                    //       <span>Business Certification</span>
                    //     </td>
                    //   </td>
                    // </td>
                  }

                  {/* Vehicle Info */}
                  {
                    <td className=" min-w-[770px] max-w-[770px]">
                      <td className=" flex gap-12 items-center">
                        <td className="py-2 text-sm min-w-[234px]  max-w-[234px] ">
                          <span>{user['Vehicle Insurance Certificate']}</span>
                        </td>
                        <td className="py-2 min-w-[254px]  max-w-[254px] ">
                          <span>{user['Vehicle Information and Images']}</span>
                        </td>
                        <td className="py-2 min-w-[184px]  max-w-[184px] ">
                          <span>{user['Approved Drivers']}</span>
                        </td>
                      </td>
                    </td>
                  }

                  {/* Vehicle Info */}
                  {
                    <td className=" min-w-[1047px] max-w-[1547px]">
                      <td className=" flex gap-12 items-center">
                        <td className="py-2 text-sm min-w-[164px]  max-w-[164px] ">
                          <span>{user['MV or DMV Report']}</span>
                        </td>
                        <td className="py-2 min-w-[190px]  max-w-[190px] ">
                          <span>{user['Checker']}</span>
                        </td>
                        <td className="py-2 min-w-[268px]   max-w-[268px] ">
                          <span>{user['Proof of Live Scan Submission']}</span>
                        </td>
                        <td className="py-2 min-w-[189px]  max-w-[189px] ">
                          <span>{user['Submit LSR Information']}</span>
                        </td>
                        <td className="py-2 min-w-[188px]  max-w-[188px] ">
                          <span>{user['Live Scan Final Report']}</span>
                        </td>
                      </td>
                    </td>
                  }

                  {
                    <td className="  min-w-[200px] max-w-[200px] px-2 pt-2 -ml-[5px]">
                      <td className=" flex gap-12 items-start">
                        <td className="py-2 text-sm min-w-[124px]  max-w-[124px] flex gap-[2px] flex-col">
                          <span className=" text-[#1511A8] underline underline-offset-4">View</span>
                          <span className=" text-xs rounded-[100px] py-1 px-[2px] max-w-min bg-[#FFF5F6] text-[#A8162A]">
                            Restricted
                          </span>
                        </td>
                      </td>
                    </td>
                  }

                  {
                    <td className=" min-w-[1092px] max-w-[1047px] ">
                      <td className=" flex gap-12 items-center">
                        <td className="py-2 text-sm min-w-[240px]  max-w-[240px] ">
                          <span>{user['Military Service']}</span>
                        </td>
                        <td className="py-2 min-w-[320px]  max-w-[320px] ">
                          <span>{user['Law Enforcement/Federal Agent Service']}</span>
                        </td>
                        <td className="py-2 min-w-[440px]  max-w-[440px] ">
                          <span>{user['Security Clearance']}</span>
                        </td>
                      </td>
                    </td>
                  }

                  <td className="py-2 flex items-start gap-4 min-w-[124px] max-w-[124px]">
                    <button className="">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.4403 4.56066C14.6927 3.81314 13.4808 3.81311 12.7332 4.5606L5.33829 11.9548C5.15725 12.1359 5.02085 12.3566 4.93989 12.5994L4.02567 15.3421C3.96578 15.5218 4.01254 15.7198 4.14646 15.8538C4.28038 15.9877 4.47846 16.0344 4.65813 15.9746L7.40087 15.0603C7.64368 14.9794 7.86432 14.843 8.04531 14.662L15.4402 7.26783C16.1878 6.52029 16.1878 5.30823 15.4403 4.56066ZM13.4403 5.26774C13.7973 4.91074 14.3761 4.91076 14.7331 5.26777C15.0902 5.6248 15.0902 6.20367 14.7331 6.56069L13.9994 7.29437L12.7065 6.00148L13.4403 5.26774ZM11.9993 6.70855L13.2922 8.00145L7.33823 13.9549C7.26701 14.0261 7.18019 14.0798 7.08464 14.1116L5.29058 14.7096L5.88858 12.9157C5.92044 12.8201 5.97412 12.7332 6.04536 12.662L11.9993 6.70855Z"
                          fill="#212121"
                        />
                      </svg>
                    </button>
                    <button className="">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 3C7.27614 3 7.5 3.22386 7.5 3.5V4H9.5V3.5C9.5 3.22386 9.72386 3 10 3C10.2761 3 10.5 3.22386 10.5 3.5V4H12.5V3.5C12.5 3.22386 12.7239 3 13 3C13.2761 3 13.5 3.22386 13.5 3.5V4C14.3284 4 15 4.67157 15 5.5V8.03605C14.648 8.09733 14.3063 8.23252 14 8.44161V5.5C14 5.22386 13.7761 5 13.5 5H6.5C6.22386 5 6 5.22386 6 5.5V15.5C6 15.7761 6.22386 16 6.5 16H8.04666L8.0461 16.0022C7.95763 16.3561 7.99196 16.7 8.11523 17H6.5C5.67157 17 5 16.3284 5 15.5V5.5C5 4.67157 5.67157 4 6.5 4V3.5C6.5 3.22386 6.72386 3 7 3ZM12 10C12.1071 10 12.2063 10.0337 12.2877 10.091L11.3787 11H8C7.72386 11 7.5 10.7761 7.5 10.5C7.5 10.2239 7.72386 10 8 10H12ZM8.99583 13.4352C8.96404 13.1896 8.75417 13 8.5 13H8C7.72386 13 7.5 13.2239 7.5 13.5C7.5 13.7761 7.72386 14 8 14H8.5C8.55475 14 8.60744 13.9912 8.65673 13.9749C8.75426 13.786 8.86767 13.6054 8.99583 13.4352ZM8 7C7.72386 7 7.5 7.22386 7.5 7.5C7.5 7.77614 7.72386 8 8 8H12C12.2761 8 12.5 7.77614 12.5 7.5C12.5 7.22386 12.2761 7 12 7H8ZM14.3375 9.45503C14.947 8.84556 15.9351 8.84556 16.5446 9.45503C17.1541 10.0645 17.1541 11.0527 16.5446 11.6621L12.2562 15.9505C11.9003 16.3064 11.4543 16.5589 10.966 16.681L9.75486 16.9838C9.30853 17.0954 8.90424 16.6911 9.01582 16.2448L9.31861 15.0336C9.44069 14.5453 9.69319 14.0993 10.0491 13.7434L14.3375 9.45503Z"
                          fill="#212121"
                        />
                      </svg>
                    </button>
                    <button className=" " onClick={() => setShowSingleDriver(true)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z"
                          fill="#555555"
                        />
                      </svg>
                    </button>
                  </td>
                  {/* <td className='py-2 min-w-[124px] max-w-[124px]'>Actions</td> */}
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChauffeurTable;

const UpsAndDowns = () => {
  return (
    <span className=" flex flex-col gap-0 items-center">
      <span className=" -mb-[2px]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.21967 7.53033C2.51256 7.82322 2.98744 7.82322 3.28033 7.53033L6 4.81066L8.71967 7.53033C9.01256 7.82322 9.48744 7.82322 9.78033 7.53033C10.0732 7.23744 10.0732 6.76256 9.78033 6.46967L6.53033 3.21967C6.23744 2.92678 5.76256 2.92678 5.46967 3.21967L2.21967 6.46967C1.92678 6.76256 1.92678 7.23744 2.21967 7.53033Z"
            fill="#D2D1FE"
          />
        </svg>
      </span>
      <span className=" -mt-[2px]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.21967 4.46967C2.51256 4.17678 2.98744 4.17678 3.28033 4.46967L6 7.18934L8.71967 4.46967C9.01256 4.17678 9.48744 4.17678 9.78033 4.46967C10.0732 4.76256 10.0732 5.23744 9.78033 5.53033L6.53033 8.78033C6.23744 9.07322 5.76256 9.07322 5.46967 8.78033L2.21967 5.53033C1.92678 5.23744 1.92678 4.76256 2.21967 4.46967Z"
            fill="#1511A8"
          />
        </svg>
      </span>
    </span>
  );
};
