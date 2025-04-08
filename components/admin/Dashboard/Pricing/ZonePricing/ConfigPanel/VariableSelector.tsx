import React from 'react';
import { ChevronDown } from 'lucide-react';

interface VariableSelectorProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const VariableSelector: React.FC<VariableSelectorProps> = ({ name, value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Currency options
  const options = ['USD', 'NGN', 'GPB', 'EUR', 'CAD'];

  return (
    <div className="flex flex-row items-center space-x-2 rounded">
      <div className="border border-[#DADADA] rounded p-2 flex-1 text-[#0E0E0E]">{name}</div>
      <div className="relative">
        <button
          className="border border-[#DADADA] rounded p-2 w-16 text-center flex items-center justify-between text-[#0E0E0E]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value}</span>
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-16 bg-white border border-[#DADADA] rounded z-10">
            {options.map((option) => (
              <div
                key={option}
                className="p-2 hover:bg-gray-100 cursor-pointer text-[#0E0E0E]"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VariableSelector;
