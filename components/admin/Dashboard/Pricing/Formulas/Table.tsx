import { Formula } from '@/types/GlobalState';
import { DeleteIcon } from 'lucide-react';
import React from 'react';

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
                <td className="px-6 py-4 text-sm text-[#0E0E0E] border-r">{item.status}</td>
                <td className="px-6 py-4 text-sm text-[#0E0E0E] border-r">
                  <div className="flex items-center space-x-2">
                    <button className="" onClick={() => {}}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15.4403 4.56066C14.6927 3.81314 13.4808 3.81311 12.7332 4.5606L5.33829 11.9548C5.15725 12.1359 5.02085 12.3566 4.93989 12.5994L4.02567 15.3421C3.96578 15.5218 4.01254 15.7198 4.14646 15.8538C4.28038 15.9877 4.47846 16.0344 4.65813 15.9746L7.40087 15.0603C7.64368 14.9794 7.86432 14.843 8.04531 14.662L15.4402 7.26783C16.1878 6.52029 16.1878 5.30823 15.4403 4.56066ZM13.4403 5.26774C13.7973 4.91074 14.3761 4.91076 14.7331 5.26777C15.0902 5.6248 15.0902 6.20367 14.7331 6.56069L13.9994 7.29437L12.7065 6.00148L13.4403 5.26774ZM11.9993 6.70855L13.2922 8.00145L7.33823 13.9549C7.26701 14.0261 7.18019 14.0798 7.08464 14.1116L5.29058 14.7096L5.88858 12.9157C5.92044 12.8201 5.97412 12.7332 6.04536 12.662L11.9993 6.70855Z"
                          fill="#212121"
                        />
                      </svg>
                    </button>
                    <button className="" onClick={() => {}}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 3C7.27614 3 7.5 3.22386 7.5 3.5V4H9.5V3.5C9.5 3.22386 9.72386 3 10 3C10.2761 3 10.5 3.22386 10.5 3.5V4H12.5V3.5C12.5 3.22386 12.7239 3 13 3C13.2761 3 13.5 3.22386 13.5 3.5V4C14.3284 4 15 4.67157 15 5.5V8.03605C14.648 8.09733 14.3063 8.23252 14 8.44161V5.5C14 5.22386 13.7761 5 13.5 5H6.5C6.22386 5 6 5.22386 6 5.5V15.5C6 15.7761 6.22386 16 6.5 16H8.04666L8.0461 16.0022C7.95763 16.3561 7.99196 16.7 8.11523 17H6.5C5.67157 17 5 16.3284 5 15.5V5.5C5 4.67157 5.67157 4 6.5 4V3.5C6.5 3.22386 6.72386 3 7 3ZM12 10C12.1071 10 12.2063 10.0337 12.2877 10.091L11.3787 11H8C7.72386 11 7.5 10.7761 7.5 10.5C7.5 10.2239 7.72386 10 8 10H12ZM8.99583 13.4352C8.96404 13.1896 8.75417 13 8.5 13H8C7.72386 13 7.5 13.2239 7.5 13.5C7.5 13.7761 7.72386 14 8 14H8.5C8.55475 14 8.60744 13.9912 8.65673 13.9749C8.75426 13.786 8.86767 13.6054 8.99583 13.4352ZM8 7C7.72386 7 7.5 7.22386 7.5 7.5C7.5 7.77614 7.72386 8 8 8H12C12.2761 8 12.5 7.77614 12.5 7.5C12.5 7.22386 12.2761 7 12 7H8ZM14.3375 9.45503C14.947 8.84556 15.9351 8.84556 16.5446 9.45503C17.1541 10.0645 17.1541 11.0527 16.5446 11.6621L12.2562 15.9505C11.9003 16.3064 11.4543 16.5589 10.966 16.681L9.75486 16.9838C9.30853 17.0954 8.90424 16.6911 9.01582 16.2448L9.31861 15.0336C9.44069 14.5453 9.69319 14.0993 10.0491 13.7434L14.3375 9.45503Z"
                          fill="#212121"
                        />
                      </svg>
                    </button>
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
