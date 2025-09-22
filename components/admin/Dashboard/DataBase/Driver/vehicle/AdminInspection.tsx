import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';

export const AdminInspection = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <h4 className="text-xl font-bold">Admin Vehicle Inspection</h4>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Admin Assigned</span>
              <span className="">Abdul. O</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Status</span>
              <span className="">Completed</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Date of Inspection</span>
              <span className="">Mar 20, 2025</span>
            </div>
          </div>

          <div>
            <p className=" text-primary font-medium mb-4">Odometer Photo</p>
            <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center max-h-[180px] w-full">
              <Button variant="secondary" size="sm" className="text-[#fff]">
                View Image
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
