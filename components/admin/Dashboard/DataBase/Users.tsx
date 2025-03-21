import React, { useEffect } from 'react';
import UserTable from './UserTable';
import searchIcon from '@/components/admin/Dashboard/svgs/search.svg';

import Image from 'next/image';
import FilterSortControls from './FilterSort';
import { useDB } from '@/contexts/DBContext';
import { filterDrivers } from './FilterFunctions';
import { generateUsers } from './dummyDatas';

const Users = () => {
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

  useEffect(()=>{
    if(activeHeader === 'All Users'){
      setUserDatas(userDatas)
    } else{
      const newUsers = userDatas.filter((user) => (user['Account Type'] as string).toLowerCase() === activeHeader.toLowerCase());
    setAllUsers(newUsers);
    }
  }, [activeHeader])
  return (
    <div className=' mt-6 flex flex-col gap-4 px-6 min-h-[300px] max-h-[771px]'>
      <h3 className='text-[#2B2B2B]  text-2xl font-medium'>{activeHeader}</h3>
      {/* Table */}
      <div className=' w-full bg-[#FFFFFF] rounded-2xl pt-4 max-w-full overflow-auto min-h-min max-h-[989px]'>
        <div className=' flex justify-between items-center pr-4 overflow-auto'>
          {/* Care about using Absolute for the elemnts? */}
          <div className=' flex gap-6 border-b-2 min-w-[800px] border-[#8A8A8A]  items-center'>
            {['All', 'Header Section', 'Header Section', 'Header Section'].map(
              (header, index) => (
                <div className=' flex flex-col gap-3' key={index}>
                  <div className=' px-5 items-center flex gap-4'>
                    <span
                      className={`${
                        header === 'All'
                          ? 'text-[#0E0E0E] font-medium'
                          : 'text-[#8A8A8A]'
                      } w-full`}
                    >
                      {header}
                    </span>
                    <span className=' w-8 p-2 text-[#1511A8] font-medium h-8 bg-[#F8F8FF] rounded-full grid place-content-center'>
                      24
                    </span>
                  </div>
                  {header === 'All' && (
                    <div className='border-[#0E0E0E] -mb-[2px] h-0 w-full border' />
                  )}
                </div>
              )
            )}
          </div>
          <div className='border-[0.5px] flex items-center gap-2 py-[12px] px-[16px] border-[#BFBFBF] min-w-[257px] max-w-[387px] min-h-[40px] max-h-[48px] rounded-[8px] '>
            <Image
              src={searchIcon}
              alt=''
              width={12}
              height={12}
              className='w-[12px] h-[12px] '
            />
            <input
              type='search'
              name=''
              id=''
              className=' focus-within:outline-none outline-none text-base font-normal text-[#0E0E0E] leading-[24px] placeholder:text-[#AAAAAA]'
              placeholder='Search for any document by name, email etc'
            />
          </div>
        </div>

        <div className=' flex  scrollbar-hide justify-between gap-12 items-center  overflow-auto'>
          <div className=' flex gap-6 py-2 px-4 mt-4 '>
            {['Select All', 'Email', 'Print', 'Delete'].map((action, idx) => (
              <span key={idx} className=' text-sm px-6 min-w-[115px] text-center max-w-[115px] py-2 border border-[#DADADA] rounded-lg cursor-pointer'>
                {action}
              </span>
            ))}
          </div>
          <FilterSortControls />
        </div>

        <div className=' w-full pr-10'>
          <UserTable allUsers={allUsers} />
        </div>
      </div>
    </div>
  );
};

export default Users;
