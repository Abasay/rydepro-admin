import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';

export const AirportPermits = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4 ">Airport Permit</h3>
        <div className="space-y-4">
          <div className="flex justify-between border-b pb-4 border-[#0000004D]">
            <span className="text-primary font-medium">Airport Zone</span>
            <span className="">JFK Zone 1</span>
          </div>
          <div className="flex justify-between border-b pb-4 border-[#0000004D]">
            <span className="text-primary font-medium">Permit Number</span>
            <span className="">AKL2FCFF9</span>
          </div>
          <div className="mb-4">
            <p className="text-primary font-medium mb-2">Document Image</p>
            <div className="aspect-video bg-[#F8F8F8] rounded-lg border-2 border-dashed border-[#8A8A8A] flex items-center justify-center max-h-[180px] w-full">
              <Button variant="secondary" size="sm" className="text-[#fff] border-[#8A8A8A]">
                View Image
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
