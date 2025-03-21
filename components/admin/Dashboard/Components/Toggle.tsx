import React, { FC } from 'react';

interface ToggleProps {
  active: boolean;
  setActive: (active: boolean) => void;
  toggleText: string;
  reverse?: boolean;
}

const Toggle: FC<ToggleProps> = ({ active, setActive, toggleText, reverse }) => {
  return (
    <div className={`flex items-center gap-2 ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
      <p className='text-base'>{toggleText}</p>

      <div className='relative'>
        <input
          type='checkbox'
          id={toggleText.toLowerCase().replace(/\s+/g, '-')} // Generate a unique ID
          name={toggleText.toLowerCase()}
          className='sr-only'
          checked={active}
          onChange={(e) => setActive(e.target.checked)} // Use onChange instead of onClick
        />
        <label
          htmlFor={toggleText.toLowerCase().replace(/\s+/g, '-')} // Match the input ID
          className={`block w-14 pl-1 h-7 rounded-full cursor-pointer transition ${
            active ? 'bg-[#059B14]' : 'bg-[#DADADA]'
          }`}
        >
          <div
            className={`absolute top-[4px] bg-[#FCFCFC] w-5 h-5 rounded-full transition-transform ${
              active ? 'translate-x-[26px]' : 'translate-x-[4px]'
            }`}
          ></div>
        </label>
      </div>
    </div>
  );
};

export default Toggle;
