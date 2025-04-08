import { Variable } from '@/types/GlobalState';
import { DeleteIcon, Edit, Eye, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { Badge } from '../../LucideUI/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../LucideUI/tooltip';
import { useDashboardContext } from '@/contexts/DashboardContext';

interface VariableData {
  id: string;
  category: string;
  feeType: string;
  description: string;
  status: string;
}

interface DataTableProps {
  data: Variable[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [dataTodisplay, setDataToDisplay] = React.useState<Variable[]>([]);
  const { activeVariable } = useDashboardContext();

  useEffect(() => {
    const filteredData = data.filter((item) => item.variableName.toLowerCase() === activeVariable.toLowerCase());
    setDataToDisplay(filteredData);
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) => item.variableName.toLowerCase() === activeVariable.toLowerCase());
    setDataToDisplay(filteredData);
  }, [activeVariable]);

  return (
    <div className="w-full border rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-r">Category</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-r">Fee Type</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-r">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-r">Status</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataTodisplay.length > 0 ? (
            dataTodisplay.map((item) => (
              <React.Fragment key={item.id}>
                {item.fee.map((fee, feeIndex) => (
                  <tr
                    key={`${item.id}-${fee.id}`}
                    className={`hover:bg-gray-50 ${
                      feeIndex !== item.fee.length - 1 ? 'border-b border-dashed' : 'border-b'
                    }`}
                  >
                    {feeIndex === 0 ? (
                      <td className="px-6 py-4 text-sm text-gray-800 border-r bg-gray-50" rowSpan={item.fee.length}>
                        <div className="font-medium">{item.category}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.fee.length} fee types</div>
                      </td>
                    ) : null}
                    <td className="px-6 py-4 text-sm text-gray-800 border-r">{fee.feeType}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 border-r">{fee.description}</td>
                    <td className="px-6 py-4 text-sm border-r">
                      <StatusBadge status={fee.status === true ? 'active' : 'inactive'} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                // onClick={() => onEdit(item, feeIndex)}
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
                                // onClick={() => onDelete(item.id)}
                              >
                                <Trash2 size={18} className="text-gray-600" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Delete</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                // onClick={() => onView(item)}
                              >
                                <Eye size={18} className="text-gray-600" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>View Details</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-gray-500 text-center">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-300 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium text-gray-600">No fee structures found</p>
                  <p className="text-sm text-gray-500 mt-1">Add a new fee structure to get started</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let badgeStyle = '';

  switch (status.toLowerCase()) {
    case 'active':
      badgeStyle = 'bg-green-100 text-green-800 border-green-200';
      break;
    case 'pending':
      badgeStyle = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      break;
    case 'inactive':
      badgeStyle = 'bg-gray-100 text-gray-800 border-gray-200';
      break;
    case 'draft':
      badgeStyle = 'bg-blue-100 text-blue-800 border-blue-200';
      break;
    default:
      badgeStyle = 'bg-gray-100 text-gray-800 border-gray-200';
  }

  return (
    <Badge variant="outline" className={`${badgeStyle} font-medium`}>
      {status}
    </Badge>
  );
};
