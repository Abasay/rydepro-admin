import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';

export const VehicleDocuments = () => {
  return (
    <Card className=" border-none shadow-none drop-shadow-none">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Vehicle Registration Card */}
          <div>
            <h4 className="font-medium mb-4 border-b border-[#0000004D] pb-4">Vehicle Registration Card</h4>
            <div className="mb-3">
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">Expiry Date</span>
                <span>25th Dec, 2025</span>
              </div>
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

          {/* Vehicle Insurance Card */}
          <div>
            <h4 className="font-medium mb-4 border-b border-[#0000004D] pb-4">Vehicle Insurance Card</h4>
            <div className="mb-3">
              <div className="flex justify-between border-b pb-4 border-[#0000004D]">
                <span className="text-primary font-medium">Expiry Date</span>
                <span>25th Dec, 2025</span>
              </div>
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
        </div>
      </CardContent>
    </Card>
  );
};
