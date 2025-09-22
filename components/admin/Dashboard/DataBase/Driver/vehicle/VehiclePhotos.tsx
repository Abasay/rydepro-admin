import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';

export const VehiclePhotos = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Front View */}
          <div className="">
            <h4 className="font-medium mb-4">Front View</h4>
            <div className=" border border-[#00000080] rounded-[20px] p-4 ">
              <div className="aspect-video bg-muted rounded-[20px] flex items-center justify-center mb-3 max-h-[250px] w-full">
                <div className="w-32 h-20 bg-gray-800 rounded"></div>
              </div>
              <Button variant="link" size="sm" className="w-full">
                See Full Image
              </Button>
            </div>
          </div>

          {/* Back View */}
          <div className="">
            <h4 className="font-medium mb-4">Back View</h4>
            <div className=" border border-[#00000080] rounded-[20px] p-4 ">
              <div className="aspect-video bg-muted rounded-[20px] flex items-center justify-center mb-3 max-h-[250px] w-full">
                <div className="w-32 h-20 bg-gray-800 rounded"></div>
              </div>
              <Button variant="link" size="sm" className="w-full">
                See Full Image
              </Button>
            </div>
          </div>

          {/* Left Side View */}
          <div className="">
            <h4 className="font-medium mb-4">Left Side View</h4>
            <div className=" border border-[#00000080] rounded-[20px] p-4 ">
              <div className="aspect-video bg-muted rounded-[20px] flex items-center justify-center mb-3 max-h-[250px] w-full">
                <div className="w-32 h-20 bg-gray-800 rounded"></div>
              </div>
              <Button variant="link" size="sm" className="w-full">
                See Full Image
              </Button>
            </div>
          </div>

          {/* Right Side View */}
          <div className="">
            <h4 className="font-medium mb-4">Right Side View</h4>
            <div className=" border border-[#00000080] rounded-[20px] p-4 ">
              <div className="aspect-video bg-muted rounded-[20px] flex items-center justify-center mb-3 max-h-[250px] w-full">
                <div className="w-32 h-20 bg-gray-800 rounded"></div>
              </div>
              <Button variant="link" size="sm" className="w-full">
                See Full Image
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Door VIN Image */}
          <div className="">
            <h4 className="font-medium mb-4">Door VIN Image View</h4>
            <div className=" border border-[#00000080] rounded-[20px] p-4 ">
              <div className="aspect-video bg-muted rounded-[20px] flex items-center justify-center mb-3 max-h-[250px] w-full">
                <div className="w-32 h-20 bg-gray-800 rounded"></div>
              </div>
              <Button variant="link" size="sm" className="w-full">
                See Full Image
              </Button>
            </div>
          </div>

          {/* Windshield VIN Image */}
          <div className="">
            <h4 className="font-medium mb-4">Windshield VIN Image</h4>
            <div className=" border border-[#00000080] rounded-[20px] p-4 ">
              <div className="aspect-video bg-muted rounded-[20px] flex items-center justify-center mb-3 max-h-[250px] w-full">
                <div className="w-32 h-20 bg-gray-800 rounded"></div>
              </div>
              <Button variant="link" size="sm" className="w-full">
                See Full Image
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
