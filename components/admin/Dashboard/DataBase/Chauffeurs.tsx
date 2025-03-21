// components/DriversTable.tsx
import { useDB } from '@/contexts/DBContext';
import React, { useState } from 'react';
import { DRIVERHEADERS } from '..';

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
    activityDetails:
      'Device Coordinate: Lagos, 37.7749, -122.4194, Device Name: Dell Latitude, App',
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

const ChauffeurTable = ({chauffeurDrivers}: {chauffeurDrivers: any[]}) => {
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([]);

  const { activeHeader } = useDB();

  const handleSelectAll = () => {
    if (selectedDrivers.length === users.length) {
      setSelectedDrivers([]);
    } else {
      setSelectedDrivers(users.map((user) => user.id));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedDrivers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className=' text-left text-sm'>
        <thead className='bg-[#F8F8F8] pt-8 '>
          <tr className=' text-[#0E0E0E] flex pb-2 pt-2 items-end tracking-widest text-sm font-medium'>
            <th className='py-2 px-4 mr-4'>
              <input
                type='checkbox'
                checked={selectedDrivers.length === users.length}
                onChange={handleSelectAll}
                className='border-[0.67px] rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px]'
              />
            </th>
            <th className=' flex items-start gap-12 min-w-[1124px] mr-12'>
              <th className='py-2 min-w-12 max-w-12 flex gap-2 items-center'>
                <span>S/N</span>
                <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px] max-w-[124px] '>
                Account Type
              </th>
              <th className='py-2 min-w-[164px] max-w-[164px] flex gap-2'>
                <span>Driver ID</span>
                <span>
                  <UpsAndDowns />
                </span>
              </th>
              <th className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>
                <span>Accessibility</span>
                <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>
                <span>Name</span> <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[128px] max-[128px] flex gap-2'>
                <span>Display Name</span>
                <UpsAndDowns />
              </th>
            </th>
            <th className={`flex gap-12 items-end  min-w-[3096px]`}>
              <th className='py-2 min-w-[164px] max-w-[164px] flex gap-2'>
                <span>Other Languages</span> <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                <span>DOB</span> <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                <span>Gender</span> <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>
                <span> Email Address</span>
                <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[138px] max-w-[138px] flex gap-2'>
                <span>Phone Number</span>
                <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                <span>Country</span> <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                <span>State</span> <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                <span>City</span>
                <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px] max-w-[124px]'>Referred By</th>
              <th className='py-2 min-w-[210px] max-w-[210px] flex gap-2'>
                <span> Registered Date / Time</span>
                <UpsAndDowns />
              </th>
              <th className='py-2  min-w-[320px] max-w-[320px] flex gap-2'>
                <span>Activity Details</span>
                <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px]  max-w-[124px] flex gap-2'>
                <span>Ratings</span>
                <UpsAndDowns />
              </th>

              <th className='py-2 min-w-[200px]  max-w-[200px] flex gap-2'>
                <span>Last Booking</span>
                <UpsAndDowns />
              </th>
              <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                Status
              </th>

              {/* <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                Actions
              </th> */}
            </th>

            <th className=' flex flex-col gap-1 items-center '>
              <th className=' flex gap-12 items-end min-w-[5020px] '>
                <th className=' flex flex-col items-center min-w-[1548px] max-w-[1548px] gap-1'>
                  <span>Personal Document</span>
                  <th className=' flex gap-12  '>
                    <th className='min-w-[220px] max-w-[220px]'>
                      <span>Driver License Information</span>
                    </th>
                    <th className='min-w-[154px] max-w-[154px] flex gap-2'>
                      <span>Social Security</span> <UpsAndDowns />
                    </th>
                    <th className='min-w-[212px] max-w-[212px]'>
                      <span>Residential Address</span>
                    </th>
                    <th className='min-w-[250px] max-w-[250px] '>
                      <span> Proof of Residential Address</span>
                    </th>
                    <th className='min-w-[138px] max-w-[138px]'>
                      <span>Demographics</span>
                    </th>
                    <th className='min-w-[150px] max-w-[150px] flex gap-2'>
                      <span>Country of Birth</span> <UpsAndDowns />
                    </th>
                    <th className='min-w-[250px] max-w-[250px]'>
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
                  <th className=' flex flex-col items-center bg-[#FFE5E9] min-w-[770px] max-w-[770px] gap-1'>
                    <span>Vehicle Information</span>
                    <th className=' flex gap-12 items-center'>
                      <th className=' text-sm min-w-[234px]  max-w-[124px] '>
                        <span>Vehicle Insurance Certificate</span>
                      </th>
                      <th className='min-w-[254px]  max-w-[254px] '>
                        <span>Vehicle Information and Images</span>
                      </th>
                      <th className=' min-w-[184px]  max-w-[184px] '>
                        <span>Approved Drivers</span>
                      </th>
                    </th>
                  </th>
                }

                {/* Vehicle Info */}
                {
                  <th className=' flex flex-col items-center bg-[#FFF7E5] min-w-[1047px] max-w-[1547px] gap-1'>
                    <span>Background Check</span>
                    <th className=' flex gap-12 items-center'>
                      <th className=' text-sm min-w-[164px]  max-w-[164px] '>
                        <span>MV or DMV Report</span>
                      </th>
                      <th className=' min-w-[190px]  max-w-[190px] '>
                        <span>Checker</span>
                      </th>
                      <th className=' min-w-[268px]  max-w-[268px] '>
                        <span>Proof of Live Scan Submission</span>
                      </th>
                      <th className=' min-w-[189px]  max-w-[189px] '>
                        <span>Submit LSR Information</span>
                      </th>
                      <th className=' min-w-[188px]  max-w-[188px] '>
                        <span>Live Scan Final Report</span>
                      </th>
                    </th>
                  </th>
                }

                {
                  <th className=' flex flex-col items-start bg-[#D7EED9] min-w-[200px] max-w-[200px] gap-1'>
                    <span>Deposit Information</span>
                    <th className=' flex gap-12 items-center'>
                      <th className=' text-sm min-w-[124px]  max-w-[124px] '>
                        <span>Deposit Details</span>
                      </th>
                    </th>
                  </th>
                }

                {
                  <th className=' flex flex-col items-center bg-[#FFF7E5] min-w-[1092px] max-w-[1047px] gap-1'>
                    <span>Optional Information</span>
                    <th className=' flex gap-12 items-center'>
                      <th className=' text-sm min-w-[240px]  max-w-[240px] '>
                        <span>Military Service</span>
                      </th>
                      <th className=' min-w-[320px]  max-w-[320px] '>
                        <span>Law Enforcement/Federal Agent Service</span>
                      </th>
                      <th className=' min-w-[440px]  max-w-[440px] '>
                        <span>Security Clearance</span>
                      </th>
                    </th>
                  </th>
                }
                {/* <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  Actions
                </th> */}
              </th>
            </th>
          </tr>
        </thead>
        <tbody className=''>
          {chauffeurDrivers.map((user, index) => (
            <tr key={user.id} className='border-b flex pt-2 hover:bg-gray-50'>
              <td className='py-3 mr-4 px-4'>
                <input
                  type='checkbox'
                  checked={selectedDrivers.includes(user.id)}
                  onChange={() => handleSelectRow(user.id)}
                  className='border-[0.67px] rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px] focus-within:bg-[#0E0E0E]'
                />
              </td>
              <td className='flex items-start gap-12 min-w-[1124px] mr-12'>
                <td className='py-3 items-start  min-w-12 max-w-12'>
                  {index + 1}
                </td>
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
                <td className='py-2 items-start  min-w-[164px] max-w-[164px]'>
                  {user['User ID']}
                </td>
                <td
                  className={`py-2 items-start text-xs  min-w-[140px] max-w-[140px] ${
                    user['Accessibility'] === 'Service Dog' && 'text-[#FD6B7F]'
                  } ${user['Accessibility'] === 'Deaf' && 'text-[#059B14]'} ${
                    user['Accessibility'] === 'Sign Language (ASL)' &&
                    'text-[#D21B34]'
                  }`}
                >
                  {user['Accessibility']}
                </td>
                <td className='py-2 items-start  min-w-[200px] text-[#0E0E0E] font-bold max-w-[200px]'>
                  {user['Name']}
                </td>
                <td className='py-2 text-[#0E0E0E]  font-medium items-start  min-w-[128px] max-w-[128px]'>
                  {user['Display Name']}
                </td>
              </td>

              <td className=' flex gap-12 min-w-[3096px] '>
                <td className='py-2 items-start text-[#0E0E0E] font-medium  min-w-[164px] max-w-[164px]'>
                  {user['Other Languages']}
                </td>
                <td className='py-2 items-start  text-[#0E0E0E] font-medium min-w-[124px] max-w-[124px]'>
                  {user['Date of Birth & Age']}
                </td>
                <td className='py-2 items-start text-[#0E0E0E] font-medium min-w-[124px] max-w-[124px]'>
                  {user['Gender']}
                </td>
                <td className='py-2 items-start text-[#0E0E0E] font-medium min-w-[200px] max-w-[200px]'>
                  {user['Email Address']}
                </td>
                <td className='py-2 items-start text-[#0E0E0E] font-medium min-w-[138px] max-w-[138px]'>
                  {user['Phone Number']}
                </td>
                <td className='py-2 min-w-[124px] text-[#0E0E0E] font-medium max-w-[124px]'>
                  {user['Country']}
                </td>
                <td className='py-2 min-w-[124px]  text-[#0E0E0E] font-medium max-w-[124px]'>
                  {user['State']}
                </td>
                <td className='py-2 min-w-[124px] text-[#0E0E0E] font-medium max-w-[124px]'>
                  {user['City']}
                </td>
                <td className='py-2 min-w-[124px] text-[#0E0E0E] font-medium max-w-[124px]'>
                  {user['Referred By']}
                </td>
                <td className='py-2 min-w-[210px] text-[#0E0E0E] font-medium max-w-[210px]'>
                  {user['Registered Date']}
                </td>
                <td className='py-2 min-w-[320px] flex flex-col gap-0 items-start text-[#0E0E0E] font-medium max-w-[320px]'>
                  <span className=' font-bold text-[#0C8418] '>
                    {user['Activity Details']}
                  </span>
                  <span className=' font-bold text-[#1F1AFC] '>
                    {user['Activity Details']}
                  </span>
                  <button className=' underline text-[#1511A8] underline-offset-2'>
                    View
                  </button>
                </td>
                <td className='mt-2 text-[#059B14]  text-xs  min-h-[20px] max-h-[20px] grid place-content-center  min-w-[124px]   max-w-[124px]'>
                  <span className=' min-w-min px-2 place-content-start -ml-[60px] rounded-[100px] bg-[#EAFCEC]'>
                    {user['Ratings']}
                  </span>
                </td>
                <td className='py-2 items-start  min-w-[200px] max-w-[200px]'>
                  {user['Last Booking']}
                </td>
                <td className='mt-2 min-w-[124px] text-[#008000] min-h-[20px] grid place-content-center  max-w-[124px] max-h-[20px]'>
                  <span className=' px-2 bg-[#F6FFF6] place-content-start text-xs rounded-[100px] min-w-min -ml-[60px]'>
                    {user['Status']}
                  </span>
                </td>
              </td>

              <td className=' flex flex-col gap-1 items-start min-w-[5020px]  '>
                <td className=' flex gap-12 items-start  '>
                  <td className=' min-w-[1548px] max-w-[1548px]'>
                    <td className=' flex gap-12 -ml-[58px] '>
                      <td className='py-2 min-w-[220px] max-w-[220px]'>
                        <span>{user['Driver License Information']}</span>
                      </td>
                      <td className='py-2 min-w-[154px] max-w-[154px]'>
                        <span>{user['Social Security']}</span>
                      </td>
                      <td className='py-2 min-w-[212px] max-w-[212px]'>
                        <span>{user['Residential Address']}</span>
                      </td>
                      <td className='py-2 min-w-[250px] max-w-[250px] '>
                        <span>{user['Proof of Residential Address']}</span>
                      </td>
                      <td className='py-2 min-w-[138px] max-w-[138px]'>
                        <span>{user['Demographics']}</span>
                      </td>
                      <td className='py-2 min-w-[150px]  max-w-[150px]'>
                        <span>{user['Country of Birth']}</span>
                      </td>
                      <td className='py-2 min-w-[250px] max-w-[250px]'>
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
                    <td className=' min-w-[770px] max-w-[770px]'>
                      <td className=' flex gap-12 items-center'>
                        <td className='py-2 text-sm min-w-[234px]  max-w-[234px] '>
                          <span>{user['Vehicle Insurance Certificate']}</span>
                        </td>
                        <td className='py-2 min-w-[254px]  max-w-[254px] '>
                          <span>{user['Vehicle Information and Images']}</span>
                        </td>
                        <td className='py-2 min-w-[184px]  max-w-[184px] '>
                          <span>{user['Approved Drivers']}</span>
                        </td>
                      </td>
                    </td>
                  }

                  {/* Vehicle Info */}
                  {
                    <td className=' min-w-[1047px] max-w-[1547px]'>
                        <td className=' flex gap-12 items-center'>
                        <td className='py-2 text-sm min-w-[164px]  max-w-[164px] '>
                          <span>{user['MV or DMV Report']}</span>
                        </td>
                        <td className='py-2 min-w-[190px]  max-w-[190px] '>
                          <span>{user['Checker']}</span>
                        </td>
                        <td className='py-2 min-w-[268px]   max-w-[268px] '>
                          <span>{user['Proof of Live Scan Submission']}</span>
                        </td>
                        <td className='py-2 min-w-[189px]  max-w-[189px] '>
                          <span>{user['Submit LSR Information']}</span>
                        </td>
                        <td className='py-2 min-w-[188px]  max-w-[188px] '>
                          <span>{user['Live Scan Final Report']}</span>
                        </td>
                        </td>
                    </td>
                  }

                  {
                    <td className='  min-w-[200px] max-w-[200px] px-2 pt-2 -ml-[5px]'>
                      <td className=' flex gap-12 items-start'>
                        <td className='py-2 text-sm min-w-[124px]  max-w-[124px] flex gap-[2px] flex-col'>
                          <span className=' text-[#1511A8] underline underline-offset-4'>
                            View
                          </span>
                          <span className=' text-xs rounded-[100px] py-1 px-[2px] max-w-min bg-[#FFF5F6] text-[#A8162A]'>
                            Restricted
                          </span>
                        </td>
                      </td>
                    </td>
                  }

                  {
                    <td className=' min-w-[1092px] max-w-[1047px] '>
                        <td className=' flex gap-12 items-center'>
                        <td className='py-2 text-sm min-w-[240px]  max-w-[240px] '>
                          <span>{user['Military Service']}</span>
                        </td>
                        <td className='py-2 min-w-[320px]  max-w-[320px] '>
                          <span>{user['Law Enforcement/Federal Agent Service']}</span>
                        </td>
                        <td className='py-2 min-w-[440px]  max-w-[440px] '>
                          <span>{user['Security Clearance']}</span>
                        </td>
                      </td>
                    </td>
                  }
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
    <span className=' flex flex-col gap-0 items-center'>
      <span className=' -mb-[2px]'>
        <svg
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.21967 7.53033C2.51256 7.82322 2.98744 7.82322 3.28033 7.53033L6 4.81066L8.71967 7.53033C9.01256 7.82322 9.48744 7.82322 9.78033 7.53033C10.0732 7.23744 10.0732 6.76256 9.78033 6.46967L6.53033 3.21967C6.23744 2.92678 5.76256 2.92678 5.46967 3.21967L2.21967 6.46967C1.92678 6.76256 1.92678 7.23744 2.21967 7.53033Z'
            fill='#D2D1FE'
          />
        </svg>
      </span>
      <span className=' -mt-[2px]'>
        <svg
          width='12'
          height='12'
          viewBox='0 0 12 12'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2.21967 4.46967C2.51256 4.17678 2.98744 4.17678 3.28033 4.46967L6 7.18934L8.71967 4.46967C9.01256 4.17678 9.48744 4.17678 9.78033 4.46967C10.0732 4.76256 10.0732 5.23744 9.78033 5.53033L6.53033 8.78033C6.23744 9.07322 5.76256 9.07322 5.46967 8.78033L2.21967 5.53033C1.92678 5.23744 1.92678 4.76256 2.21967 4.46967Z'
            fill='#1511A8'
          />
        </svg>
      </span>
    </span>
  );
};
