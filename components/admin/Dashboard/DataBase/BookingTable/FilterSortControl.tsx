// components/FilterSortControls.tsx
import React, { useState } from 'react';

const FilterSortControls: React.FC = () => {
  const [sortBy, setSortBy] = useState('Registration Date');
  const [order, setOrder] = useState('Descending');
  const [filter, setFilter] = useState('All');

  return (
    <div className='flex items-center mt-4  gap-20 pr-4'>
      {/* Sort By Dropdown */}
      <div className=' flex items-center gap-8 border-[#EBEBEB]'>
        <div className='flex items-center gap-2 min-w-[260px] max-w-[260px]'>
          <span className='text-[#0E0E0E] min-w-[53px] text-sm max-w-[53px]'>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className='px-4 min-w-[176px] max-w-[176px] py-2 text-[#2B2B2B] font-normal text-[16px] leading-6 bg-[#F8F8F8] border-[0.5px] border-[#D5D5D5] rounded-[8px] shadow-sm focus:outline-none focus:ring-1 focus:bg-[#D5D5D5]'
          >
            <option>Registration Date</option>
            <option>Last Booking</option>
            <option>Name</option>
            <option>Status</option>
          </select>
        </div>

        <div className=' w-0 border h-6 text-[#EBEBEB]' />
        {/* Order Dropdown */}
        <div className='flex items-center min-w-[188px] max-w-[188px] gap-2 '>
          <span className='text-[#0E0E0E] min-w-[40px] text-sm max-w-[40px]'>Order:</span>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className='px-4 py-2 min-w-[140px] max-w-[140px]  text-[#2B2B2B] font-normal text-[16px] leading-6 bg-[#F8F8F8] border-[0.5px] border-[#D5D5D5] rounded-[8px] shadow-sm focus:outline-none focus:ring-1 focus:bg-[#D5D5D5]'
          >
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </div>
      </div>

      <div className=' flex items-center gap-8'>
        {/* Filter By Dropdown */}
        <div className='flex items-center gap-2'>
          <span className='text-[#0E0E0E] min-w-[53px] text-sm max-w-[53px]'>Filter by:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='px-2 py-2 min-w-[76px] max-w-[80px] text-[#2B2B2B] font-normal text-[16px] leading-6 bg-[#F8F8F8] border-[0.5px] border-[#D5D5D5] rounded-[8px] shadow-sm focus:outline-none focus:ring-1 focus:bg-[#D5D5D5]'
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Banned</option>
          </select>
        </div>
        <div className=' w-0 border h-6 text-[#EBEBEB]' />
        <div className='flex items-center min-w-[188px] max-w-[188px] gap-2 '>
          <span className='text-[#0E0E0E] min-w-[40px] text-sm max-w-[40px]'>Order:</span>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className='px-4 py-2 min-w-[140px] max-w-[140px]  text-[#2B2B2B] font-normal text-[16px] leading-6 bg-[#F8F8F8] border-[0.5px] border-[#D5D5D5] rounded-[8px] shadow-sm focus:outline-none focus:ring-1 focus:bg-[#D5D5D5]'
          >
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSortControls;
