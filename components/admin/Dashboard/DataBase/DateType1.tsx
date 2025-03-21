// components/DateType1.tsx

import React, { useEffect, useState } from 'react';
import CustomDatePicker from './CustomDate';
import toast from 'react-hot-toast';

interface Props {
  setFilter: (filter: any) => void;
  filter: string;
  filters: any;
}

const DateType1: React.FC<Props> = ({ setFilter, filter, filters }) => {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [range, setRange] = useState('');
  const [customRange, setCustomRange] = useState({ from: '', to: '' });
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

  // const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => getDayWithSuffix(i + 1));
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const years = [
    ...Array.from({ length: 120 }, (_, i) => `${new Date().getFullYear() + i}`),
    ...Array.from({ length: 120 }, (_, i) => `${new Date().getFullYear() - i}`),
  ];

  const handleCustomRangeChange = (field: 'from' | 'to', value: string) => {
    setCustomRange((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (day && month && year) {
      if (
        filters[filter] &&
        filters[filter]?.includes(`${day} ${month} ${year}`)
      ) {
        toast.error('This date is already added');
      } else {
        setFilter((prev: any) => {
          return {
            ...prev,
            [filter]: filters[filter]
              ? [...filters[filter], `${day} ${month} ${year}`]
              : [`${day} ${month} ${year}`],
          };
        });

        setDay('');
        setMonth('');
        setYear('');
      }
    }
  }, [day, month, year]);

  useEffect(() => {
    if (from && to) {
      const dateSelected = `${from} - ${to}`;

      if (filters[filter] && filters[filter]?.includes(dateSelected)) {
        toast.error('This date is already added');
      } else {
        setFilter((prev: any) => {
          return {
            ...prev,
            [filter]: filters[filter]
              ? [...filters[filter], dateSelected]
              : [dateSelected],
          };
        });
        setFrom('');
        setTo('');
      }
    }
  }, [from, to]);
  return (
    <div className='  rounded w-full text-sm'>
      {/* Date Selection */}
      <div className='mb-4 relative'>
        <div className='flex gap-2 items-center'>
          {/* Day */}
          <div className='flex flex-col gap-1'>
            <label className='block text-xs mb-1 text-[#0E0E0E]'>Date</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className='border-[#DADADA] text-[#8A8A8A] bg-[#F8F8F8] focus-within:outline-none border-[0.67px] rounded p-2 min-w-[67px] max-w-[67px]'
            >
              <option
                value=''
                className='text-[#8A8A8A]'
                disabled
                selected
                hidden
              >
                Day
              </option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Month */}

          <div className=' flex  flex-col  gap-1 '>
            <label className='block text-xs mb-1 text-[#0E0E0E]'>Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className='border-[#DADADA] text-[#8A8A8A] bg-[#F8F8F8] focus-within:outline-none border-[0.67px] rounded p-2 min-w-[70px] max-w-[70px]'
            >
              <option value='' disabled selected hidden>
                Month
              </option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className=' flex flex-col gap-1 '>
            <label className='block text-xs mb-1 text-[#0E0E0E]'>Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className='border-[#DADADA] text-[#8A8A8A] bg-[#F8F8F8] focus-within:outline-none border-[0.67px] rounded p-2 min-w-20 max-w-20'
            >
              <option value='' disabled selected hidden>
                Year
              </option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=' mt-2'>
          <CustomDatePicker
            setFilter={setFilter}
            filter={filter}
            filters={filters}
            active='date'
            setFrom={setFrom}
            setTo={setTo}
            setDOB={() => {}}
          />
        </div>
      </div>

      <div className=' flex flex-col gap-1  mb-3'>
        <select
          value={range}
          onChange={(e) => {
            setRange(e.target.value);
            if (e.target.value !== 'Custom Range') {
              if (
                filters[filter] &&
                filters[filter]?.includes(e.target.value)
              ) {
                toast.error('This date is already added');
              } else {
                setFilter((prev: any) => {
                  return {
                    ...prev,
                    [filter]: filters[filter]
                      ? [...filters[filter], e.target.value]
                      : [e.target.value],
                  };
                });
                setRange('');
              }
            }
          }}
          className='border-[#DADADA] text-[#8A8A8A] bg-[#F8F8F8] focus-within:outline-none border-[0.67px] rounded p-2 w-full'
        >
          <option value='' disabled selected hidden>
            Select Range
          </option>
          {[
            'Past 7 Days',
            'Past 14 Days',
            'Past 30 Days',
            'Past 3 months',
            'Past 6 months',
            'Past Year',
            'Custom Range',
          ].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Age Range */}
      {range === 'Custom Range' && (
        <div className='mb-4 relative'>
          <div className='flex text-xs gap-2'>
            <div className=' flex  flex-col items-start gap-1'>
              <span>From</span>
              <input
                type='text'
                placeholder='From'
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className='border-[#DADADA] focus-within:outline-none border-[0.67px] rounded bg-[#F8F8F8] p-2 min-w-[110px] max-w-[110px]'
              />

              <div className=' '>
                <CustomDatePicker
                  setFilter={setFilter}
                  filter={filter}
                  filters={filters}
                  active='from'
                  setFrom={setFrom}
                  setTo={setTo}
                />
              </div>
            </div>

            <div className=' flex flex-col gap-1'>
              <span>To</span>
              <input
                type='text'
                placeholder='To'
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className='border-[#DADADA] focus-within:outline-none border-[0.67px] bg-[#F8F8F8] rounded p-2 min-w-[110px] max-w-[110px]'
              />
              <div className=''>
                <CustomDatePicker
                  setFilter={setFilter}
                  filter={filter}
                  filters={filters}
                  active='to'
                  setFrom={setFrom}
                  setTo={setTo}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateType1;
