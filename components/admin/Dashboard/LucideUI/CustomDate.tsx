'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Select from 'react-select';
import { cn } from '@/utils';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from 'date-fns';

export default function CustomDatePicker({
  handleDateSelect,
}: {
  handleDateSelect: (value: Date) => void;
  //   value: string;
}) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate month options
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(0, i), 'MMMM'),
  }));

  console.log(monthOptions);

  // Generate year options (e.g., from 1900 to current year)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
    value: 1900 + i,
    label: `${1900 + i}`,
  }));

  const handleDateClick = (date: Date) => {
    setSelectedRange({ start: date, end: date });
    handleDateSelect(date);
  };

  const handleMonthChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      const newMonth = new Date(currentMonth.getFullYear(), selectedOption.value + 1);
      setCurrentMonth(newMonth);
    }
  };

  const handleYearChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      const newMonth = new Date(selectedOption.value, currentMonth.getMonth());
      setCurrentMonth(newMonth);
    }
  };

  const renderCalendar = (month: Date, onPreviousMonth?: () => void, onNextMonth?: () => void) => {
    const range =
      selectedRange.start && selectedRange.end
        ? {
            start: startOfDay(selectedRange.start),
            end: endOfDay(selectedRange.end),
          }
        : null;

    return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{format(month, 'MMMM yyyy')}</h2>
          <button onClick={onPreviousMonth}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={onNextMonth}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((day) => (
            <div key={day} className="text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {eachDayOfInterval({
            start: startOfMonth(month),
            end: endOfMonth(month),
          }).map((date) => {
            const isStart = selectedRange.start && isSameDay(date, selectedRange.start);
            const isEnd = selectedRange.end && isSameDay(date, selectedRange.end);
            const inRange = range && isWithinInterval(date, range);

            return (
              <button
                key={date.toString()}
                onClick={() => handleDateClick(date)}
                className={cn(
                  'p-2 text-sm rounded-md transition-colors',
                  !isSameMonth(date, month) && 'text-gray-300',
                  (isStart || isEnd) && 'bg-[#0E0E0E] text-white',
                  inRange && 'bg-[#0E0E0E] text-white',
                  'hover:bg-[#0E0E0E] hover:text-white'
                )}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="flex gap-8 p-2">
      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-6">Select Date</h3>
        <div className="flex gap-4 mb-6">
          <Select
            options={monthOptions}
            value={monthOptions[monthOptions.findIndex((option) => option.value === currentMonth.getMonth()) - 1]}
            onChange={handleMonthChange}
            className="w-32"
            placeholder="Select Month"
          />
          <Select
            options={yearOptions}
            value={yearOptions.find((option) => option.value === currentMonth.getFullYear())}
            onChange={handleYearChange}
            className="w-32"
            placeholder="Select Year"
          />
        </div>
        <div className="flex gap-6">
          {renderCalendar(subMonths(currentMonth, 1), handlePreviousMonth, handleNextMonth)}
          {/* {renderCalendar(currentMonth, undefined, handleNextMonth)} */}
        </div>
      </div>
    </div>
  );
}
