import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';

export const Accessibility = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Accessibility</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Wheelchair</span>
              <span className="font-medium">Folding</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Mobility Scooter</span>
              <span className="font-medium">Yes</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Mobility Aids</span>
              <span className="font-medium">Walker</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Service Dog</span>
              <span className="font-medium">Yes</span>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-muted-foreground block mb-2">Document Image</span>
            <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
              <Button variant="secondary" size="sm">
                View Image
              </Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Hearing Accomodation</span>
              <span className="font-medium">Deaf</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Low Visual Support</span>
              <span className="font-medium">Blind</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Oxygen Tank</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Dialysis Machine</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-muted-foreground">Custom Request</span>
              <span className="font-medium">I need my car to be clean</span>
            </div>
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
