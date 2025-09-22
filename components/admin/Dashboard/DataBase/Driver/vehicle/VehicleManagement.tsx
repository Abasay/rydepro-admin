import { useState } from 'react';
import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/admin/Dashboard/LucideUI/dialog';
import { VehicleDetails } from './VehicleDetails';

export const VehicleManagement = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const vehicles = [
    {
      id: 1,
      name: 'Vehicle 1',
      type: 'Standard Sedan',
      make: 'Toyota Corolla',
      vehicleType: 'Sedan',
      vehicleClass: 'Premier',
      licensePlateState: 'Miami',
      licensePlateNumber: '345ASD34',
      vinNumber: '8DUR949R84IF8D',
    },
    {
      id: 2,
      name: 'Vehicle 2',
      type: 'Standard Sedan',
      make: 'Toyota Corolla',
      vehicleType: 'Sedan',
      vehicleClass: 'Premier',
      licensePlateState: 'Miami',
      licensePlateNumber: '345ASD34',
      vinNumber: '8DUR949R84IF8D',
    },
  ];

  const handleViewDetails = (vehicleId: number) => {
    setSelectedVehicle(vehicleId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <div className="s">
      <div className="space-y-6 border border-[#00000080] rounded-[20px] p-5">
        {' '}
        {vehicles.map((vehicle, index) => (
          <Card key={vehicle.id} className="  border-none  shadow-none drop-shadow-none">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6 text-start">{vehicle.name}</h2>
              <div className="flex items-start gap-6">
                {/* Vehicle Image */}
                <div className="flex-shrink-0 items-center justify-center flex flex-col">
                  <h3 className="text-lg font-medium mb-4 text-center">{vehicle.type}</h3>
                  <div className="w-[320px] h-[150px] bg-muted rounded-lg flex items-center justify-center">
                    <div className="w-24 h-16 bg-gray-800 rounded"></div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-fit mt-3 rounded-[40px] py-3.5 px-6 mx-auto bg-[#000000] text-white text-center"
                    onClick={() => handleViewDetails(vehicle.id)}
                  >
                    View More Details
                  </Button>
                </div>

                {/* Vehicle Info */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                        <span className="text-primary font-medium">Vehicle Make</span>
                        <span className="">{vehicle.make}</span>
                      </div>
                      <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                        <span className="text-primary font-medium">Vehicle Type</span>
                        <span className="">{vehicle.vehicleType}</span>
                      </div>
                      <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                        <span className="text-primary font-medium">Vehicle Class</span>
                        <span className="">{vehicle.vehicleClass}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                        <span className="text-primary font-medium">License Plate State</span>
                        <span className="">{vehicle.licensePlateState}</span>
                      </div>
                      <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                        <span className="text-primary font-medium">License Plate Nuber</span>
                        <span className="">{vehicle.licensePlateNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary font-medium">VIN Number</span>
                        <span className="">{vehicle.vinNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            {index < vehicles.length - 1 && <hr className=" bg-[#0000004D] w-[95%] mt-4 mx-auto" />}
          </Card>
        ))}
      </div>

      {/* Vehicle Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Vehicle Details</DialogTitle>
          </DialogHeader>
          {selectedVehicle && (
            <VehicleDetails
              vehicle={vehicles.find((v) => v.id === selectedVehicle)!}
              onBack={handleCloseDialog}
              isInDialog={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
