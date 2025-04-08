import React from 'react';

interface FeeRowProps {
  name: string;
  value1: string;
  value2: string;
  onValue1Change: (value: string) => void;
  onValue2Change: (value: string) => void;
}

const FeeRow: React.FC<FeeRowProps> = ({ name, value1, value2, onValue1Change, onValue2Change }) => {
  return (
    <div className="flex flex-row items-center mb-2">
      <div className="w-full flex items-center space-x-2">
        <div className="border border-[#DADADA] rounded p-2 flex-1 text-[#0E0E0E]">{name}</div>
        <div className="border border-[#DADADA] rounded p-2 w-16 text-center text-[#0E0E0E]">
          <input
            type="text"
            value={value1}
            onChange={(e) => onValue1Change(e.target.value)}
            className="w-full outline-none text-center"
          />
        </div>
        <div className="text-[#0E0E0E]">:</div>
        <div className="border border-[#DADADA] rounded p-2 w-16 text-center text-[#0E0E0E]">
          <input
            type="text"
            value={value2}
            onChange={(e) => onValue2Change(e.target.value)}
            className="w-full outline-none text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default FeeRow;
