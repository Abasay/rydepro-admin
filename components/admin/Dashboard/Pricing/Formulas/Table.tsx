import { useDashboardContext } from '@/contexts/DashboardContext';
import { Formula } from '@/types/GlobalState';
import { DeleteIcon, Edit, Trash2 } from 'lucide-react';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../LucideUI/tooltip';
import { StatusBadge } from '../Variables/DataTable';
import { useVariables } from '@/contexts/VariablesContext';

interface VariableData {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface DataTableProps {
  data: Formula[];
}

export const FormulaTable: React.FC<DataTableProps> = ({ data }) => {
  const { deleteFormula, setFormulaOnEdit, setShowFormulaSetup } = useDashboardContext();
  const { setFormulaTokens } = useVariables();
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-sm font-medium text-[#0E0E0E] border-r">Formula Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-[#0E0E0E] border-r">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-[#0E0E0E] border-r">Formula</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-[#0E0E0E] border-r">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-[#0E0E0E] border-r">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-[#0E0E0E] border-r">{item.formulaName}</td>
                <td className="px-6 py-4 text-sm text-[#0E0E0E] border-r text-start">{item.description}</td>
                <td className="px-6 py-4 text-sm text-[#0E0E0E] border-r">
                  Formula=
                  {item.mainFormula.map((formulaPart, index) => (
                    <span key={index} className="mr-1">
                      {formulaPart.value}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm border-r">
                  <StatusBadge status={item.isActive ? 'active' : 'inactive'} />
                </td>{' '}
                <td className="px-6 py-4 text-sm text-[#0E0E0E] border-r">
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => {
                              setFormulaOnEdit(item);
                              setShowFormulaSetup(true);
                              setFormulaTokens(
                                item.mainFormula.map((token, idx) => {
                                  return {
                                    ...token,
                                    id: idx.toString(),
                                    display: token.value,
                                    type: token.type,
                                  };
                                })
                              );
                            }}
                          >
                            <Edit size={18} className="text-gray-600" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => deleteFormula(item._id)}
                          >
                            <Trash2 size={18} className="text-gray-600" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <button className=" ">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z"
                          fill="#555555"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-sm text-[#0E0E0E] font-medium text-center">
                <span className=" text-[#0E0E0E] font-medium">No formula added</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
