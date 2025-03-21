// components/BookingsTable.tsx
import { useDB } from '@/contexts/DBContext';
import React, { useState } from 'react';
import dummyData from './dummy';

type User = {
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

const RidersORG = ['All Users', 'Organization'];

const users: User[] = [
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

const BookingsTable = ({ allUsers }: { allUsers: any[] }) => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { activeHeader } = useDB();

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]));
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className=' text-left text-sm'>
        <thead className='bg-[#F8F8F8] pt-8 h-9'>
          <tr className=' text-[#0E0E0E] gap-12 flex items-end pb-1 pt-1 tracking-wider text-sm font-medium'>
            <th className='py-2  px-4 '>
              <input
                type='checkbox'
                checked={selectedUsers.length === users.length}
                onChange={handleSelectAll}
                className='border-[0.67px]  bg-none accent-black rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px]'
              />
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[1324px] items-center '>
              <p className=' h-full'>&nbsp;</p>
              <th className=' flex items-end gap-12 w-full  '>
                <th className='py-2 min-w-12 max-w-12 flex gap-2'>
                  <span>S/N</span>
                  <UpsAndDowns />
                </th>
                <th className='py-2 min-w-[134px] flex gap-2 max-w-[124px] '>
                  <span>Geo-location</span>
                  <UpsAndDowns />
                </th>
                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Pickup Date</span>
                  <UpsAndDowns />
                </th>
                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Pickup Time</span>
                  <UpsAndDowns />
                </th>
                <th className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>
                  <span>Booking Option</span>
                  <UpsAndDowns />
                </th>
                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Ride Format</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[134px] max-w-[134px] flex gap-2'>
                  <span>Pre-Ride Date</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Booking ID</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[134px] max-w-[134px] flex gap-2'>
                  <span>Booking Type</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Customer Name</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[280px] max-w-[280px] flex gap-2'>
                  <span>Pickup Information</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>
                  <span>Airport Information</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Stops</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[280px] max-w-[280px] flex gap-2'>
                  <span>Drop-Off Information</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[260px] max-w-[260px]  flex gap-2'>
                  <span>Airport Drop-Off Information</span>
                  <UpsAndDowns />
                </th>
              </th>
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[1876px] items-center bg-[#FA03D933]'>
              <p className=' h-full'>&nbsp;</p>
              <th className=' w-full flex gap-12 items-end'>
                <th className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>
                  <span>No of Passenger</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>
                  <span>Luggage Details</span>
                  <UpsAndDowns />
                </th>
                <th className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>
                  <span>Accessibility Information</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Child Seat</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Beverage</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>
                  <span>Service Type</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>
                  <span>Vehicle Category</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[150px] max-w-[150px] flex gap-2'>
                  <span>Estimated Miles</span>
                  <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[150px] max-w-[150px] flex gap-2'>
                  <span>Estimated Time</span>
                  <UpsAndDowns />
                </th>
              </th>
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[1939px] items-center bg-[#827EFB33]'>
              <span>Flight Details</span>
              <th className=' w-full flex gap-12 items-end'>
                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Flight Type</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Airline</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>
                  <span>Flight Number</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>APUP</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>ADOP</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>
                  <span>Flight Status</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>APUM</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>APCL</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[220px] max-w-[220px] flex gap-2'>
                  <span>Estimated Landing Time</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[220px] max-w-[220px] flex gap-2'>
                  <span>Actual Landing Time</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Terminal/Gate</span> <UpsAndDowns />
                </th>
              </th>
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[484px] items-center bg-[#F5F5F5]'>
              <span>Flight Details</span>
              <th className=' w-full flex gap-12 items-end'>
                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Notes</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>
                  <span>Booking Date</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>
                  <span>Booking Time</span> <UpsAndDowns />
                </th>
              </th>
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[2706px] items-center bg-[#EAFCEC]'>
              <p className=' h-full'>&nbsp;</p>
              <th className=' w-full flex gap-12 items-end'>
                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Gratuity</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Pre-Estimated Fare</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>
                  <span>Payment Type</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Cash Back Used</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Cash Back Earned </span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Miles Point Used</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Miles Point Earned</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>
                  <span>Discount/Promo</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[164px] max-w-[164px] flex gap-2'>
                  <span>Driver Percentage</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[164px] max-w-[164px] flex gap-2'>
                  <span>Driver Payment</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[182px] text-sm max-w-[182px] flex gap-2'>
                  <span>Rydepro Percentage</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[152px] max-w-[152px] flex gap-2'>
                  <span>Rydepro Amount</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>
                  <span>Estimated Gross Fare</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>
                  <span>Payment Status</span> <UpsAndDowns />
                </th>
              </th>
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[1913px] items-center bg-[#827EFB33]'>
              <span></span>
              <th className=' w-full flex gap-12 items-end'>
                <th className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>
                  <span>Area/IP Coordinates</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>
                  <span>Pre-Ride Admin Status</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>
                  <span>Pre-Ride Driver Status</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Driver Information</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>
                  <span>Vehicle Details</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[220px] max-w-[220px] flex gap-2'>
                  <span>Ride in Progress Status</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[220px] max-w-[220px] flex gap-2'>
                  <span>Ride Completion Status</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>
                  <span>Problem Resolution Status</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Emergency Status</span> <UpsAndDowns />
                </th>
              </th>
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[424px] items-center bg-[#FFE5E9]'>
              <span></span>
              <th className=' w-full flex gap-12 items-end'>
                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Rider Fees</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Driver Fees</span> <UpsAndDowns />
                </th>
              </th>
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[936px] items-center bg-[#F5F5F5]'>
              <span></span>
              <th className=' w-full flex gap-12 items-end'>
                <th className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>
                  <span>Pre-Estimated Miles</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Final Miles</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>
                  <span>Pre-Estimated Total Miles</span> <UpsAndDowns />
                </th>
                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Final Miles</span> <UpsAndDowns />
                </th>

                <th className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>
                  <span>Addtional Fees</span> <UpsAndDowns />
                </th>
              </th>
            </th>

            <th className=' flex flex-col px-2 py-1 min-w-[140px] items-center bg-[#EAFCEC]'>
              <span></span>
              <th className=' w-full flex gap-12 items-end'>
                <th className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                  <span>Actions</span> <UpsAndDowns />
                </th>
              </th>
            </th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((user, index) => (
            <tr
              key={user.id}
              className='text-[#2B2B2B] gap-12 flex items-start pb-1 pt-1 tracking-wider text-sm font-medium'
            >
              <td className='py-2 px-4'>
                <input
                  type='checkbox'
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectRow(user.id)}
                  className='border-[0.67px] bg-none accent-black rounded-[2.67px] h-4 w-4 border-[#DADADA] p-[5.33px]'
                />
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[1324px] items-center'>
                <td className='flex items-end gap-12 w-full'>
                  <td className='py-2 min-w-12 max-w-12 flex gap-2'>{index + 1}</td>
                  <td className='py-2 min-w-[134px] flex gap-2 max-w-[124px]'>{user.geoLocation}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.pickupDate}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.pickupTime}</td>
                  <td className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>{user.bookingOption}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.rideFormat}</td>
                  <td className='py-2 min-w-[134px] max-w-[134px] flex gap-2'>{user.preRideDate}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.bookingId}</td>
                  <td className='py-2 min-w-[134px] max-w-[134px] flex gap-2'>{user.bookingType}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.customerName}</td>
                  <td className='py-2 min-w-[280px] max-w-[280px] flex gap-2'>{user.pickupInformation}</td>
                  <td className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>{user.airportInformation}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.stops}</td>
                  <td className='py-2 min-w-[280px] max-w-[280px] flex gap-2'>{user.dropOffInformation}</td>
                  <td className='py-2 min-w-[260px] max-w-[260px] flex gap-2'>{user.airportDropOffInformation}</td>
                </td>
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[1876px] items-center '>
                <td className='w-full flex gap-12 items-end'>
                  <td className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>{user.noOfPassenger}</td>
                  <td className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>{user.luggageDetails}</td>
                  <td className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>{user.accessibilityInformation}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.childSeat}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.beverage}</td>
                  <td className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>{user.serviceType}</td>
                  <td className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>{user.vehicleCategory}</td>
                  <td className='py-2 min-w-[150px] max-w-[150px] flex gap-2'>{user.estimatedMiles}</td>
                  <td className='py-2 min-w-[150px] max-w-[150px] flex gap-2'>{user.estimatedTime}</td>
                </td>
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[1939px] items-center '>
                <td className='w-full flex gap-12 items-end'>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.flightType}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.airline}</td>
                  <td className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>{user.flightNumber}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.apup}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.adop}</td>
                  <td className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>{user.flightStatus}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.apum}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.apcl}</td>
                  <td className='py-2 min-w-[220px] max-w-[220px] flex gap-2'>{user.estimatedLandingTime}</td>
                  <td className='py-2 min-w-[220px] max-w-[220px] flex gap-2'>{user.actualLandingTime}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.terminalGate}</td>
                </td>
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[484px] items-center '>
                <td className='w-full flex gap-12 items-start'>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.notes}</td>
                  <td className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>{user.bookingDate}</td>
                  <td className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>{user.bookingTime}</td>
                </td>
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[2706px] items-center '>
                <td className='w-full flex gap-12 items-start'>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.gratuity}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.preEstimatedFare}</td>
                  <td className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>{user.paymentType}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.cashBackUsed}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.cashBackEarned}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.milesPointUsed}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.milesPointEarned}</td>
                  <td className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>{user.discountPromo}</td>
                  <td className='py-2 min-w-[164px] max-w-[164px] flex gap-2'>{user.driverPercentage}</td>
                  <td className='py-2 min-w-[164px] max-w-[164px] flex gap-2'>{user.driverPayment}</td>
                  <td className='py-2 min-w-[182px] text-sm max-w-[182px] flex gap-2'>{user.rydeproPercentage}</td>
                  <td className='py-2 min-w-[152px] max-w-[152px] flex gap-2'>{user.rydeproAmount}</td>
                  <td className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>{user.estimatedGrossFare}</td>
                  <td className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>{user.paymentStatus}</td>
                </td>
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[1913px] items-center '>
                <td className='w-full flex gap-12 items-start'>
                  <td className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>{user.areaIpCoordinates}</td>
                  <td className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>{user.preRideAdminStatus}</td>
                  <td className='py-2 min-w-[200px] max-w-[200px] flex gap-2'>{user.preRideDriverStatus}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.driverInformation}</td>
                  <td className='py-2 min-w-[140px] max-w-[140px] flex gap-2'>{user.vehicleDetails}</td>
                  <td className='py-2 min-w-[220px] max-w-[220px] flex gap-2'>{user.rideInProgressStatus}</td>
                  <td className='py-2 min-w-[220px] max-w-[220px] flex gap-2'>{user.rideCompletionStatus}</td>
                  <td className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>{user.problemResolutionStatus}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.emergencyStatus}</td>
                </td>
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[424px] items-center '>
                <td className='w-full flex gap-12 items-start'>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.riderFees}</td>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.driverFees}</td>
                </td>
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[936px] items-center '>
                <td className='w-full flex gap-12 items-start'>
                  <td className='py-2 min-w-[180px] max-w-[180px] flex gap-2'>{user.preEstimatedMiles}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.finalMiles}</td>
                  <td className='py-2 min-w-[240px] max-w-[240px] flex gap-2'>{user.preEstimatedTotalMiles}</td>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>{user.finalMiles}</td>
                  <td className='py-2 min-w-[160px] max-w-[160px] flex gap-2'>{user.additionalFees}</td>
                </td>
              </td>

              <td className='flex flex-col px-2 py-1 min-w-[140px] items-center '>
                <td className='w-full flex gap-12 items-end'>
                  <td className='py-2 min-w-[124px] max-w-[124px] flex gap-2'>
                    <button onClick={() => handleEdit(user.id)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;

const UpsAndDowns = () => {
  return (
    <span className=' flex flex-col gap-0 items-center'>
      <span className=' -mb-[2px]'>
        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M2.21967 7.53033C2.51256 7.82322 2.98744 7.82322 3.28033 7.53033L6 4.81066L8.71967 7.53033C9.01256 7.82322 9.48744 7.82322 9.78033 7.53033C10.0732 7.23744 10.0732 6.76256 9.78033 6.46967L6.53033 3.21967C6.23744 2.92678 5.76256 2.92678 5.46967 3.21967L2.21967 6.46967C1.92678 6.76256 1.92678 7.23744 2.21967 7.53033Z'
            fill='#D2D1FE'
          />
        </svg>
      </span>
      <span className=' -mt-[2px]'>
        <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M2.21967 4.46967C2.51256 4.17678 2.98744 4.17678 3.28033 4.46967L6 7.18934L8.71967 4.46967C9.01256 4.17678 9.48744 4.17678 9.78033 4.46967C10.0732 4.76256 10.0732 5.23744 9.78033 5.53033L6.53033 8.78033C6.23744 9.07322 5.76256 9.07322 5.46967 8.78033L2.21967 5.53033C1.92678 5.23744 1.92678 4.76256 2.21967 4.46967Z'
            fill='#1511A8'
          />
        </svg>
      </span>
    </span>
  );
};
