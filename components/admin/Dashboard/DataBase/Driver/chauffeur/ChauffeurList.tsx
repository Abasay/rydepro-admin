import { useState } from 'react';
import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/admin/Dashboard/LucideUI/avatar';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/admin/Dashboard/LucideUI/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Chauffeur {
  id: string;
  name: string;
  photo: string;
  vehicleAssigned: string;
  vehicleClass: string;
  driverId: string;
}

const mockChauffeurs: Chauffeur[] = [
  {
    id: '1',
    name: 'John Doe',
    photo: '/driver-avatar.jpg',
    vehicleAssigned: 'Toyota Camry',
    vehicleClass: 'Standard Sedan',
    driverId: '#ABCD1234',
  },
  {
    id: '2',
    name: 'John Doe',
    photo: '/driver-avatar.jpg',
    vehicleAssigned: 'Toyota Camry',
    vehicleClass: 'Standard Sedan',
    driverId: '#ABCD1234',
  },
  // Add more mock data as needed
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `${i + 3}`,
    name: 'John Doe',
    photo: '/driver-avatar.jpg',
    vehicleAssigned: 'Toyota Camry',
    vehicleClass: 'Standard Sedan',
    driverId: '#ABCD1234',
  })),
];

export const ChauffeurList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(mockChauffeurs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChauffeurs = mockChauffeurs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Card className="border border-[#00000080] rounded-[20px]">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Chauffeur List</h3>
          <span className="text-sm text-muted-foreground">
            {startIndex + 1} of {mockChauffeurs.length}
          </span>
        </div>

        {/* Chauffeur Cards */}
        <div className="space-y-6">
          {currentChauffeurs.map((chauffeur) => (
            <div key={chauffeur.id} className="flex gap-6 items-start">
              {/* Driver Photo and Button */}
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <div
                  className="w-[280px] h-[250px] bg-white rounded-[20px]  p-3 flex items-center justify-center"
                  style={{ boxShadow: '0px 4px 10px 0px #00000040' }}
                >
                  <Avatar className="w-[250px] h-[230px] rounded-[16px]">
                    <AvatarImage src={chauffeur.photo} alt={`${chauffeur.name} photo`} className="object-cover" />
                    <AvatarFallback className="text-lg bg-muted rounded-[16px]">
                      {chauffeur.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-[40px] px-6 py-2 text-sm font-medium">
                  View More Details
                </Button>
              </div>

              {/* Driver Information */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between py-3 border-b border-[#0000004D]">
                  <span className="font-medium ">Name</span>
                  <span className="">{chauffeur.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#0000004D]">
                  <span className="font-medium ">Vehicle Assigned</span>
                  <span className="">{chauffeur.vehicleAssigned}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#0000004D]">
                  <span className="font-medium ">Vehicle Class</span>
                  <span className="">{chauffeur.vehicleClass}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium ">Driver ID</span>
                  <span className="">{chauffeur.driverId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="w-10 h-10 p-0 border border-[#00000040] rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant={currentPage === 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(1)}
              className={`w-10 h-10 p-0 rounded-lg ${
                currentPage === 1
                  ? 'bg-black text-white'
                  : 'border border-[#00000040] bg-white text-black hover:bg-gray-50'
              }`}
            >
              1
            </Button>

            <Button
              variant={currentPage === 2 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(2)}
              className={`w-10 h-10 p-0 rounded-lg ${
                currentPage === 2
                  ? 'bg-black text-white'
                  : 'border border-[#00000040] bg-white text-black hover:bg-gray-50'
              }`}
            >
              2
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="w-10 h-10 p-0 border border-[#00000040] rounded-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
