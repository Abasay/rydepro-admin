import { useState } from 'react';
import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/admin/Dashboard/LucideUI/tabs';
import { ArrowLeft } from 'lucide-react';
import { VehiclePhotos } from './VehiclePhotos';
import { VehicleDocuments } from './VehicleDocuments';
import { AirportPermits } from './AirportPermits';
import { AdminInspection } from './AdminInspection';

interface Vehicle {
  id: number;
  name: string;
  make: string;
  vehicleType: string;
  vehicleClass: string;
  licensePlateState: string;
  licensePlateNumber: string;
  vinNumber: string;
}

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onBack: () => void;
  isInDialog?: boolean;
}

export const VehicleDetails = ({ vehicle, onBack, isInDialog = false }: VehicleDetailsProps) => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="space-y-6">
      {/* Header - Only show if not in dialog */}
      {!isInDialog && (
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vehicles
          </Button>
        </div>
      )}

      {/* Vehicle Summary */}
      {/* <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                <div className="w-24 h-16 bg-gray-800 rounded"></div>
              </div>
              <p className="text-center mt-2 font-medium">Standard Sedan</p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary font-medium">Vehicle Make</span>
                  <span className="font-medium">{vehicle.make}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary font-medium">Vehicle Type</span>
                  <span className="font-medium">{vehicle.vehicleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary font-medium">Vehicle Class</span>
                  <span className="font-medium">{vehicle.vehicleClass}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary font-medium">License Plate State</span>
                  <span className="font-medium">{vehicle.licensePlateState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary font-medium">License Plate Nuber</span>
                  <span className="font-medium">{vehicle.licensePlateNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary font-medium">VIN Number</span>
                  <span className="font-medium">{vehicle.vinNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* Vehicle Detail Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="grid w-full grid-cols-5 bg-[#F8F8F8] rounded-[12px] p-2 h-full">
          <TabsTrigger
            value="basic"
            className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
          >
            Basic Vehicle Information
          </TabsTrigger>
          <TabsTrigger
            className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
            value="documents"
          >
            Vehicle Documents
          </TabsTrigger>
          <TabsTrigger
            className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
            value="permits"
          >
            Airport Permits
          </TabsTrigger>
          <TabsTrigger
            className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
            value="photos"
          >
            Vehicle Photos
          </TabsTrigger>
          <TabsTrigger
            className=" text-[#0E0E0E] font-normal data-[state=active]:text-primary data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-[40px] data-[state=active]:py-2 data-[state=active]:bg-[#0E0E0E]  "
            value="inspection"
          >
            Admin Vehicle Inspection
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className=" border-none shadow-none drop-shadow-none">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">Vehicle Type</span>
                    <span className="">Sedan</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">Vehicle Class</span>
                    <span className="">Premier</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">Vehicle Make</span>
                    <span className="">Toyota</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">Vehicle Model</span>
                    <span className="">Corolla</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">Vehicle Exterior Color</span>
                    <span className="">Black</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">Vehicle Interior Color</span>
                    <span className="">White</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">Vehicle Year</span>
                    <span className="">2025</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">License Plate State</span>
                    <span className="">Miami</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                    <span className="text-primary font-medium">License Plate Number</span>
                    <span className="">345ADC34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary font-medium">VIN Number</span>
                    <span className="">1HGBH41JXMN109186</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <VehicleDocuments />
        </TabsContent>

        <TabsContent value="permits">
          <AirportPermits />
        </TabsContent>

        <TabsContent value="photos" className=" h-full max-h-[600px] overflow-auto">
          <VehiclePhotos />
        </TabsContent>

        <TabsContent value="inspection">
          <AdminInspection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
