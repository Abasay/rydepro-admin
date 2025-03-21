import { useState } from 'react';
import Toggle from './Toggle';
import { ChevronDown, LucideChevronsDown, LucideChevronsUpDown } from 'lucide-react';

interface ColorCodeProps {
  setColor: (color: string) => void;
  hideColorCode: boolean;
  setHideColorCode: (hideColorCode: boolean) => void;
}

export function ColorCodeSelector({ setColor, hideColorCode, setHideColorCode }: ColorCodeProps) {
  const colors = [
    { hex: '#FF0000', className: 'bg-red-500' }, // Red
    { hex: '#0000FF', className: 'bg-blue-500' }, // Blue
    { hex: '#008000', className: 'bg-green-500' }, // Green
    { hex: '#FFFF00', className: 'bg-yellow-400' }, // Yellow
    { hex: '#000000', className: 'bg-black' }, // Black
    { hex: '#FFFFFF', className: 'bg-white border border-gray-300' }, // White
  ];

  const [selectedColor, setSelectedColor] = useState<string>('#808080');
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setColor(color);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className='flex flex-col w-72 h-full justify-between'>
      <label className='text-sm font-semibold'>
        <span className='text-[#D21B34]'>*</span> Color Code
      </label>

      {/* Color Selector Trigger */}
      <div className=' flex items-end gap-5'>
        <div className=' items-center flex gap-4'>
          <div
            className={`w-20 h-4 border border-gray-300 rounded flex items-center justify-center cursor-pointer ${
              selectedColor ? '' : 'bg-gray-200'
            }`}
            style={{ backgroundColor: selectedColor || 'transparent' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* {!selectedColor && <span className='text-gray-600'>Select Color</span>} */}
          </div>
          <button className='text-gray-500' onClick={() => setIsOpen(!isOpen)}>
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Dropdown List */}
        {isOpen && (
          <div className='absolute bg-white border border-gray-300 shadow-lg rounded-md mt-1 p-2 w-48 z-10'>
            <div className='grid grid-cols-3 gap-2'>
              {colors.map(({ hex, className }) => (
                <div
                  key={hex}
                  className={`w-10 h-10 rounded cursor-pointer ${className}`}
                  style={{ backgroundColor: hex }}
                  onClick={() => handleColorSelect(hex)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Hide Color Code Toggle */}
        <div className='mt-3'>
          <Toggle active={hideColorCode} setActive={setHideColorCode} toggleText='Hide Color Code' />
        </div>
      </div>
    </div>
  );
}
