import React, { useEffect } from 'react';
import UserTable from '../UserTable';
import searchIcon from '@/components/admin/Dashboard/svgs/search.svg';

import Image from 'next/image';
import FilterSortControls from './FilterSortControl';
import { useDB } from '@/contexts/DBContext';
import { filterDrivers } from '../FilterFunctions';
import { generateUsers } from '../dummyDatas';
import BookingsTable from './Table';

const BookingTable = () => {
  const { activeHeader, filters } = useDB();
  const [allUsers, setAllUsers] = React.useState(generateUsers(60));
  const [userDatas, setUserDatas] = React.useState(generateUsers(60));

  useEffect(() => {
    const newAllUsers = filterDrivers(userDatas, filters);
    // console.log(newAllDrivers);
    console.log(newAllUsers);
    console.log(filters);
    setAllUsers(newAllUsers);
  }, [activeHeader, filters]);

  useEffect(() => {
    if (activeHeader === 'All Users') {
      setUserDatas(userDatas);
    } else {
      const newUsers = userDatas.filter(
        (user) => (user['Account Type'] as string).toLowerCase() === activeHeader.toLowerCase()
      );
      setAllUsers(newUsers);
    }
  }, [activeHeader]);
  return (
    <div className=' mt-6 flex flex-col gap-4 px-6 min-h-[300px] max-h-[771px]'>
      <h3 className='text-[#2B2B2B]  text-2xl font-medium'>{activeHeader}</h3>
      {/* Table */}
      <div className=' w-full bg-[#FFFFFF] rounded-2xl pt-4 max-w-full overflow-auto min-h-min max-h-[989px]'>
        <div className=' flex justify-between items-center pr-4 overflow-auto'>
          {/* Care about using Absolute for the elemnts? */}
          <div className=' flex gap-6 border-b-2 min-w-[800px] border-[#8A8A8A]  items-center'>
            {['All Rides', 'Delay Alerts', 'Non-Push', 'Resolved Rides'].map((header, index) => (
              <div className=' flex flex-col gap-3' key={index}>
                <div className=' px-5 items-center flex gap-4'>
                  <span className={`${header === 'All' ? 'text-[#0E0E0E] font-medium' : 'text-[#8A8A8A]'} w-full`}>
                    {header}
                  </span>
                  <span className=' w-8 p-2 text-[#1511A8] font-medium h-8 bg-[#F8F8FF] rounded-full grid place-content-center'>
                    24
                  </span>
                </div>
                {header === 'All' && <div className='border-[#0E0E0E] -mb-[2px] h-0 w-full border' />}
              </div>
            ))}
          </div>
        </div>

        <div className=' min-w-[900px] bg-[#F8F8F8] w-full overflow-auto scroll-smooth scroll'>
          <div className=' flex gap-6 p-2   w-full overflow-x-auto scroll-smooth' style={{ scrollbarWidth: 'none' }}>
            {[
              {
                name: 'Unassigned Rides',
                bgColor: 'bg-[#0E0E0E]',
                value: 24,
              },
              {
                name: 'Assigned Rides',
                bgColor: 'bg-[#FFCF64]',
                value: 15,
              },
              {
                name: 'Accepted Rides',
                bgColor: 'bg-[#9AD49F]',
                value: 10,
              },
              {
                name: 'Late Pickup',
                bgColor: 'bg-[#FD6B7F]',
                value: 5,
              },
              {
                name: 'En-route Pickup',
                bgColor: 'bg-[#1F1AFC]',
                value: 8,
              },
              {
                name: 'Arrived Location',
                bgColor: 'bg-[#059B14]',
                value: 12,
              },
              {
                name: 'En-Route Dropoff',
                bgColor: 'bg-[#1A16D2]',
                value: 7,
              },
              {
                name: 'Ride In-Progress',
                bgColor: 'bg-[#D4A539]',
                value: 9,
              },
              {
                name: 'Ride Complete',
                bgColor: 'bg-[#0C8418]',
                value: 20,
              },
            ].map((status, idx) => (
              <button
                className={`rounded-lg px-6 py-2 w-full min-w-[192px] max-w-[180px] flex items-center gap-2 ${status.bgColor}`}
                key={idx}
              >
                <span className=' text-[#F7F7F7] text-sm font-normal w-full'>{status.name}</span>
                {status.value > 0 && (
                  <span className=' min-h-5 min-w-5 rounded-[62.5px] bg-[#F8F8FF] grid place-content-center text-sm'>
                    {status.value}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className=' flex  scrollbar-hide justify-between gap-12 items-center  overflow-auto'>
          <div className=' flex gap-6 py-2 px-4 mt-4 '>
            {['Select All', 'Email', 'Print', 'Delete'].map((action, idx) => (
              <span
                key={idx}
                className=' text-sm px-6 min-w-[115px] text-center max-w-[115px] py-2 border border-[#DADADA] rounded-lg cursor-pointer'
              >
                {action}
              </span>
            ))}
          </div>
        </div>

        <div className=' w-full pr-10'>
          <BookingsTable allUsers={allUsers} />
        </div>
      </div>
    </div>
  );
};

export default BookingTable;
