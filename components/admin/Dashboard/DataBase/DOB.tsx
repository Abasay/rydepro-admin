// components/DateOfBirthForm.tsx

import React, { useEffect, useState } from 'react';
import CustomDatePicker from './CustomDate';
import toast from 'react-hot-toast';

interface Props {
  setFilter: (filter: any) => void;
  filter: string;
  filters: any;
}

const DateOfBirthForm: React.FC<Props> = ({ setFilter, filter, filters }) => {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [age, setAge] = useState<number>(18);
  const [customAgeRange, setCustomAgeRange] = useState({ from: '', to: '' });
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [range, setRange] = useState('');
  const [dob, setDOB] = useState<string>('');

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${getDayWithSuffix(day)} ${month} ${year}`;
  };

  const handleFilterChange = (value: string) => {
    if (filters[filter] && filters[filter]?.includes(value)) {
      toast.error('This date is already added');
    } else {
      setFilter((prev: any) => {
        return {
          ...prev,
          [filter]: filters[filter] ? [...filters[filter], value] : [value],
          ['DOB']: filters[filter] ? [...filters[filter], value] : [value],
        };
      });
    }
  };

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
    setCustomAgeRange((prev) => ({ ...prev, [field]: value }));
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
            ['DOB']: filters[filter]
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customAgeRange.from || !customAgeRange.to)
      return toast.error('Please enter both fields');
    if (customAgeRange.from && customAgeRange.to) {
      const currentYear = new Date().getFullYear();
      const startDate = new Date(
        currentYear - Number(customAgeRange.from),
        0,
        1
      );
      const endDate = new Date(currentYear - Number(customAgeRange.to), 11, 31);
      const formattedRange = `${formatDate(startDate)} - ${formatDate(
        endDate
      )}`;
      handleFilterChange(formattedRange);
      setCustomAgeRange({ from: '', to: '' });
    }
  };

  useEffect(() => {
    if (dob) {
      const dateSelected = dob;

      if (filters['dob'] && filters['dob']?.includes(dateSelected)) {
        toast.error('This date is already added');
      } else {
        setFilter((prev: any) => {
          return {
            ...prev,
            [filter]: filters[filter]
              ? [...filters[filter], dateSelected]
              : [dateSelected],
            ['DOB']: filters[filter]
              ? [...filters[filter], dateSelected]
              : [dateSelected],
          };
        });
        // setFrom('');
        // setTo('');
        setDOB('');
      }
    }
  }, [dob]);

  return (
    <div className='  rounded w-full text-sm'>
      {/* Date Selection */}
      <div className='relative mb-4'>
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
            active='dob'
            setFrom={setFrom}
            setTo={setTo}
            setDOB={setDOB}
          />
        </div>
      </div>

      {/* Age Selection */}
      <div className='mb-4'>
        <label className='block text-xs mb-1 text-[#0E0E0E]'>Age</label>
        <select
          value={age}
          onChange={(e) => {
            setAge(Number(e.target.value));
            const currentYear = new Date().getFullYear();
            const startDate = new Date(
              currentYear - Number(e.target.value),
              0,
              1
            );
            const endDate = new Date(
              currentYear - Number(e.target.value),
              11,
              31
            );
            const formattedRange = `${formatDate(startDate)} - ${formatDate(
              endDate
            )}`;

            if (formattedRange !== 'Custom Range') {
              handleFilterChange(formattedRange);
              setAge(18);
            }
          }}
          className='border-[#DADADA] text-[#8A8A8A] bg-[#F8F8F8] focus-within:outline-none  border-[0.67px] rounded p-2 min-w-16 max-w-16'
        >
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Age Range */}
      <div className=' flex flex-col gap-1  mb-3'>
        <select
          value={range}
          onChange={(e) => {
            setRange(e.target.value);
            const [startAge, endAge] = e.target.value.split('-').map(Number);
            const currentYear = new Date().getFullYear();
            const startDate = new Date(currentYear - endAge, 0, 1);
            const endDate = new Date(currentYear - startAge, 11, 31);

            const formattedRange = `${formatDate(startDate)} - ${formatDate(
              endDate
            )}`;

            console.log('formattedRange', formattedRange);
            if (e.target.value !== 'Custom Range') {
              handleFilterChange(formattedRange);
              setRange('');
            }
          }}
          className='border-[#DADADA] text-[#8A8A8A] bg-[#F8F8F8] focus-within:outline-none border-[0.67px] rounded p-2 w-full'
        >
          <option value='' disabled selected hidden>
            Select Range
          </option>
          {[
            '18-25',
            '26-35',
            '36-45',
            '46-55',
            '56-65',
            '66-75',
            '76-85',
            '86-95',
            '96-105',
            'Custom Range',
          ].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {range === 'Custom Range' && (
        <form className='flex gap-2 items-center' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label className='block text-xs mb-1 text-[#0E0E0E]'>From</label>
            <input
              type='number'
              value={customAgeRange.from}
              onChange={(e) => handleCustomRangeChange('from', e.target.value)}
              className='border-[#DADADA] focus-within:outline-none border-[0.67px] rounded bg-[#F8F8F8] p-2 min-w-[90px] max-w-[90px]'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='block text-xs mb-1 text-[#0E0E0E]'>To</label>
            <input
              type='number'
              value={customAgeRange.to}
              onChange={(e) => handleCustomRangeChange('to', e.target.value)}
              className='border-[#DADADA] focus-within:outline-none border-[0.67px] rounded bg-[#F8F8F8] p-2 min-w-[90px] max-w-[90px]'
            />
          </div>
          {/* <input type="submit" value="" /> */}
          <button type='submit'>
            {' '}
            <svg
              width='15'
              height='15'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.98554 3.97111L4.04978 3.8967C4.2853 3.66118 4.65386 3.63976 4.91357 3.83247L4.98798 3.8967L7.61478 6.5232L10.2416 3.8967C10.5007 3.63762 10.9207 3.63762 11.1798 3.8967C11.4389 4.15578 11.4389 4.57582 11.1798 4.8349L8.55328 7.4617L11.1798 10.0885C11.4153 10.324 11.4367 10.6926 11.244 10.9523L11.1798 11.0267C10.9443 11.2622 10.5757 11.2836 10.316 11.0909L10.2416 11.0267L7.61478 8.4002L4.98798 11.0267C4.7289 11.2858 4.30885 11.2858 4.04978 11.0267C3.7907 10.7676 3.7907 10.3476 4.04978 10.0885L6.67628 7.4617L4.04978 4.8349C3.81425 4.59938 3.79284 4.23082 3.98554 3.97111L4.04978 3.8967L3.98554 3.97111Z'
                fill='#111111'
              />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
};

export default DateOfBirthForm;
