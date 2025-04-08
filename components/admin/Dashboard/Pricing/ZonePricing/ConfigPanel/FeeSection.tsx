import React from 'react';
import VariableSelector from './VariableSelector';
import { SectionData } from '@/types/DashboardTypes/fees';
import FeeRow from './FeeRow';
import { cn } from '@/utils';

interface FeeSectionProps {
  id: number;
  section: SectionData;
  onValueChange: (
    sectionId: string,
    feeId: string,
    rowIndex: number,
    columnIndex: number,
    field: 'value1' | 'value2',
    value: string
  ) => void;
  onVariableChange: (sectionId: string, feeId: string, variableIndex: number, value: string) => void;
}

const FeeSection: React.FC<FeeSectionProps> = ({ section, onValueChange, onVariableChange, id }) => {
  // Function to determine text color based on background color
  const getTextColor = (backgroundColor: string): string => {
    return backgroundColor === '#0E0E0E' ? 'text-white' : 'text-[#0E0E0E]';
  };

  return (
    <div className="mb-8">
      <div
        className={cn(
          'rounded-[10px] p-2.5 ',
          id === 0 && 'bg-none',
          id % 2 === 1 && 'bg-[#8C8A8A] text-[#ffffff]',
          id % 2 === 0 && id !== 0 && 'bg-[#0E0E0E] text-[#FFFFFF]'
        )}
      >
        <h2 className="text-xl font-medium">{section.category}</h2>
      </div>

      <div className=" flex items-start gap-4 min-w-[1000px] ">
        {section.fees.map((fee) => (
          <div key={fee.id} className="p-4 max-w-[500px]  ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
              {fee.variables.map((variable, varIndex) => (
                <div key={varIndex} className="space-y-4 min-w-[300px] border border-[#DADADA] rounded-2xl p-2.5">
                  {
                    <VariableSelector
                      name={variable.name}
                      value={variable.value}
                      onChange={(value) => onVariableChange(section.id, fee.id, varIndex, value)}
                    />
                  }

                  {fee.rows.map((row, rowIndex) => (
                    <FeeRow
                      key={`${fee.id}-${rowIndex}-${varIndex}`}
                      name={row.name}
                      value1={row.values[varIndex]?.value1 || '0.0'}
                      value2={row.values[varIndex]?.value2 || '0.0'}
                      onValue1Change={(value) => onValueChange(section.id, fee.id, rowIndex, varIndex, 'value1', value)}
                      onValue2Change={(value) => onValueChange(section.id, fee.id, rowIndex, varIndex, 'value2', value)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeeSection;
