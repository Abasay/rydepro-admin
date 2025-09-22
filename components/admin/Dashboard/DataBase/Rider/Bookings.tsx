import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';

export const Bookings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Booking History</h3>
            <p className="text-muted-foreground">No booking history available</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline">Download Data</Button>
        <Button variant="outline">Suspend User</Button>
        <Button variant="outline">Ban User</Button>
      </div>
    </div>
  );
};
