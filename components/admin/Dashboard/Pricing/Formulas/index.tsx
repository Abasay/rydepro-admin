import React, { useState } from 'react';
import { Plus, Pencil, SquarePen, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../LucideUI/Buttont';
import { FormulaTable } from './Table';
import { useDB } from '@/contexts/DBContext';
import { useDashboardContext } from '@/contexts/DashboardContext';

interface FormulaTable {
  id: string;
  name: string;
  description: string;
  status: string;
}

export const FormulaSetup = ({ setShowSetup }: { setShowSetup: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [activeTab, setActiveTab] = useState('Variable 1');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(3);
  const [itemsPerPage] = useState(10);

  const { formulas } = useDashboardContext();

  // Sample data
  const [formulaTable, setFormulaTable] = useState<FormulaTable[]>([]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleJumpToPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = parseInt(event.target.value);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#0E0E0E]">Formula Type Setup</h1>
        </div>

        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant="outline"
            size="icon"
            className="h-[30px] w-[62px] rounded-[7px] bg-[#FFFFFF] "
            onClick={() => setShowSetup(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-[30px] w-[62px] rounded-[7px] bg-[#FFFFFF] ">
            <Pencil className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-[30px] w-[62px] rounded-[7px] bg-[#FFFFFF] ">
            <SquarePen className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="h-[30px] w-[62px] rounded-[7px] bg-[#FFFFFF] ">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

        <FormulaTable data={formulas} />

        {/* <div className="flex items-center justify-between w-max mx-auto mt-4 text-sm text-[#0E0E0E]">
          <div>
            Showing 1-<span className=" font-medium">{Math.min(totalItems, itemsPerPage)} </span>of{' '}
            <span className=" font-medium">{totalItems}</span> Results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="h-8 w-8 "
            >
              <span className="sr-only">Previous page</span>
              <span className="font-semibold">
                <ChevronLeft />
              </span>
            </Button>

            <div className="flex items-center">
              <input
                type="text"
                value={currentPage}
                onChange={handleJumpToPage}
                className="w-8 h-8 text-center border rounded"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
              className="h-8 w-8"
            >
              <span className="sr-only">Next page</span>
              <span className="font-semibold">
                <ChevronRight />
              </span>
            </Button>

            <span className="ml-2">Jump to page</span>
            <input type="text" placeholder="-" className="w-10 h-8 text-center border rounded" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FormulaSetup;
