// components/DriversTable.tsx
import { useDB } from '@/contexts/DBContext';
import React, { useState } from 'react';
import { DRIVERHEADERS } from '..';
import { headers } from './Tables';
import { Filters, filterDrivers } from './FilterFunctions';

export type Driver = {
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

// const filterDrivers = (users: Driver[], filters: Record<string, any>) => {
//   return users.filter((user) => {
//     // Loop through each filter and check if the user matches
//     return Object.entries(filters).every(([key, values]) => {
//       if (Array.isArray(values) && values.length > 0) {
//         // Special case for keys that don't map directly to user properties
//         if (key === "Registered Date") {
//           // Filter by date ranges
//           return values.some((range) => {
//             if (range.includes("Past")) {
//               const days = parseInt(range.match(/\d+/)?.[0] || "0", 10);
//               const cutoffDate = new Date();
//               cutoffDate.setDate(cutoffDate.getDate() - days);
//               return new Date(user.registeredDate) >= cutoffDate;
//             } else if (range.includes("-")) {
//               const [start, end] = range.split("-").map((d) => new Date(d.trim()));
//               const registeredDate = new Date(user.registeredDate);
//               return registeredDate >= start && registeredDate <= end;
//             }
//             return false;
//           });
//         } else if (key === "Date of Birth & Age") {
//           // Handle DOB filtering
//           return values.some((dob) => {
//             const user

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

const users1: any[] = [
  {
    'Country of Birth': 'Nigeria',
    'Citizen and Residency': '', // No direct data
    'Social Security': '', // No direct data
    'Residential Address': 'Alakija, Lagos',
    'Vehicle Information': '', // No direct data
    'Registered Date': '08 Nov 2024 / 9:12am WAT',
    'Account Type': 'Individual',
    'First Name': 'Michael',
    Name: 'Michael Ajala Akinlola',
    'Last Name': 'Akinlola',
    'Middle Name': 'Ajala',
    Alias: 'Mikeay',
    'User ID_0': '', // No direct data
    'User ID': 'IND0001',
    Accessibility: 'Deaf',
    'Date of Birth & Age': '01 Jan 1999',
    Gender: 'Male',
    'Social Security Number': '', // No direct data
    'Street Address': 'Alakija, Lagos',
    Demographics: 'Nigeria',
    'Company Documentation': '', // No direct data
    'Company Name': '', // No direct data
    'Deposit Information': '', // No direct data
    'Account Name': '', // No direct data
    'Bank Name': '', // No direct data
    'Routing Number': '', // No direct data
  },
  {
    'Country of Birth': 'Nigeria',
    'Citizen and Residency': '', // No direct data
    'Social Security': '', // No direct data
    'Residential Address': 'Garki, Abuja',
    'Vehicle Information': '', // No direct data
    'Registered Date': '08 Nov 2024 / 11:15am WAT',
    'Account Type': 'Individual',
    'First Name': 'Jane',
    Name: 'Jane Doe',
    'Last Name': 'Doe',
    'Middle Name': '',
    Alias: 'JaneD',
    'User ID_0': '', // No direct data
    'User ID': 'IND0002',
    Accessibility: 'Service Dog',
    'Date of Birth & Age': '15 Feb 1985',
    Gender: 'Female',
    'Social Security Number': '', // No direct data
    'Street Address': 'Garki, Abuja',
    Demographics: 'Nigeria',
    'Company Documentation': '', // No direct data
    'Company Name': '', // No direct data
    'Deposit Information': '', // No direct data
    'Account Name': '', // No direct data
    'Bank Name': '', // No direct data
    'Routing Number': '', // No direct data
  },
  {
    'Country of Birth': 'Nigeria',
    'Citizen and Residency': '', // No direct data
    'Social Security': '', // No direct data
    'Residential Address': 'Garki, Abuja',
    'Vehicle Information': '', // No direct data
    'Registered Date': '08 Nov 2024 / 11:15am WAT',
    'Account Type': 'Individual',
    'First Name': 'Jane',
    Name: 'Jane Doe',
    'Last Name': 'Doe',
    'Middle Name': '',
    Alias: 'JaneD',
    'User ID_0': '', // No direct data
    'User ID': 'IND0002',
    Accessibility: 'Blind',
    'Date of Birth & Age': '15 Feb 1985',
    Gender: 'Female',
    'Social Security Number': '', // No direct data
    'Street Address': 'Garki, Abuja',
    Demographics: 'Nigeria',
    'Company Documentation': '', // No direct data
    'Company Name': '', // No direct data
    'Deposit Information': '', // No direct data
    'Account Name': '', // No direct data
    'Bank Name': '', // No direct data
    'Routing Number': '', // No direct data
  },
];

const COMMON = ['Livery Company', 'TNC', 'Chauffeur'];

interface Props {
  allDrivers: Driver[];
}

const DriversTable: React.FC<Props> = ({ allDrivers }) => {
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([]);

  const selectedFilters: Filters = {
    'Account Type': ['Individual', 'Organization'],
    // 'Registered Date': ['Past 14 Days', '13th Nov 2024 - 15th Nov 2024'],
    Name: ['Michael', 'Jane'],
    Accessibility: ['Wheel Chair', 'Service Dog', 'Blind'],
    // Gender: ['Male', 'Female'],
    // Demographics: ['Africa'],
  };

  // const filteredUsers = filterDrivers(users1, selectedFilters);

  // console.log(filteredUsers);
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
          <>
            <tr className=' text-[#0E0E0E] flex pb-2 pt-2 items-end tracking-widest text-sm font-medium'>
              <th className='pb-1 px-4 mr-4'>
                <input
                  type='checkbox'
                  checked={selectedDrivers.length === users.length}
                  onChange={handleSelectAll}
                  className='border-[0.67px] rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px]'
                />
              </th>
              {headers.map((header: any, index) => (
                <>
                  {!header.externalContainer && (
                    <th key={index} className={header.className}>
                      {header.data && <span>{header.data}</span>}
                      {/* Render subHeaders if available */}
                      {header.subHeaders && (
                        <th className='flex gap-12'>
                          {header.subHeaders.map(
                            (subHeader: any, subIndex: number) => (
                              <th
                                key={subIndex}
                                className={subHeader.className}
                              >
                                <span>{subHeader.data}</span>
                                {subHeader.hasIcon && (
                                  <span className='flex items-center gap-1'>
                                    <UpsAndDowns />
                                  </span>
                                )}
                              </th>
                            )
                          )}
                        </th>
                      )}
                    </th>
                  )}
                  {header.externalContainer && (
                    <th className={header.className}>
                      {header.externalContainer && (
                        <>
                          {header?.containerContent && (
                            <th className={header.containerContent.className}>
                              {Array.isArray(
                                header.containerContent?.containerContent
                              ) && (
                                <>
                                  {header.containerContent.containerContent.map(
                                    (elem: any, idx: number) => {
                                      const { containerContent } = elem;
                                      // console.log(containerContent);
                                      return (
                                        <th
                                          className={elem.className}
                                          key={`${elem.headerText}_${idx}`}
                                        >
                                          <span>{elem.headerText}</span>
                                          <th
                                            className={
                                              containerContent.className
                                            }
                                          >
                                            {containerContent?.subHeaders.map(
                                              (
                                                subHeader: any,
                                                subIndex: number
                                              ) => {
                                                return (
                                                  <th
                                                    key={subIndex}
                                                    className={
                                                      subHeader.className
                                                    }
                                                  >
                                                    <span>
                                                      {subHeader.data}
                                                    </span>
                                                    {subHeader.hasIcon && (
                                                      <span>
                                                        <UpsAndDowns />
                                                      </span>
                                                    )}
                                                  </th>
                                                );
                                              }
                                            )}
                                          </th>
                                        </th>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </th>
                          )}
                        </>
                      )}
                    </th>
                  )}
                  {/* Render external container if available */}
                </>
              ))}
            </tr>
          </>
        </thead>
        <tbody className=''>
          {allDrivers.map((user: any, index) => (
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
                    user['Account Type'] === 'Livery Company' &&
                    'text-[#97A816] '
                  } ${
                    user['Account Type'] === 'Chauffeur Drivers' && 'text-[#AC24CB] '
                  } ${user['Account Type'] === 'TNC' && 'text-[#2AFD00] '} `}
                >
                  <span
                    className={`-ml-7 rounded-[100px]  px-2 ${
                      user['Account Type'] === 'Livery Company' &&
                      'bg-[#FBFFDC] '
                    } ${
                      user['Account Type'] === 'Chauffeur Drivers' && 'bg-[#FAE4FF] '
                    } ${
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

              <td className=' flex flex-col gap-1 items-start min-w-[6900px]  '>
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
                    <td className=' min-w-[1615px] max-w-[1880px]'>
                      <td className=' flex gap-12  items-center'>
                        <td className='py-2  text-sm min-w-[340px]  max-w-[340px]'>
                          <span>{user['Company Documentation']}</span>
                        </td>
                        <td className='py-2 min-w-[230px]  max-w-[230px] '>
                          <span>{user['Registered Business Address']}</span>
                        </td>
                        <td className='py-2 min-w-[214px]  max-w-[214px] '>
                          <span>{user['Proof of Business Address']}</span>
                        </td>
                        <td className='py-2 min-w-[310px]  max-w-[310px] '>
                          <span>{user['Livery Certification']}</span>
                        </td>
                        <td className='py-2 min-w-[190px]  max-w-[190px] '>
                          <span>{user['Airport Permit certificates']}</span>
                        </td>
                        <td className='py-2 min-w-[310px]  max-w-[310px] ml-7'>
                          <span>{user['Business Certification']}</span>
                        </td>
                      </td>
                    </td>
                  }

                  {/* Vehicle Info */}
                  {
                    <td className=' min-w-[770px] max-w-[770px] '>
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
                          <span>{user['Checkr']}</span>
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
                    <td className='  min-w-[200px] max-w-[200px] px-2 pt-2 '>
                      <td className=' flex gap-12 items-center'>
                        <td className='py-2 text-sm min-w-[124px]  max-w-[124px] '>
                          <span>{user['Deposit Details']}</span>
                        </td>
                      </td>
                    </td>
                  }

                  {
                    <td className=' min-w-[1092px] max-w-[1047px] '>
                      <td className=' flex gap-12 items-center'>
                        <td className='py-2 text-sm min-w-[240px]  max-w-[240px] -ml-[2px] '>
                          <span>{user['Military Service']}</span>
                        </td>
                        <td className='py-2 min-w-[320px]  max-w-[320px] -ml-[2px] '>
                          <span>
                            {user['Law Enforcement/Federal Agent Service']}
                          </span>
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

export default DriversTable;

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
