import { Card, CardContent, CardHeader, CardTitle } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/admin/Dashboard/LucideUI/select';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

export const Financials = () => {
  return (
    <div className="space-y-6">
      {/* Payout Methods */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardHeader>
          <CardTitle className=" text-base font-medium">Payout Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4 border-[#0000004D]">
              <div>
                <h4 className="font-medium">Visa Card</h4>
                <p className="text-sm ">**** **** **** **** Expiry: **/** CVC: •••</p>
              </div>
              <Button variant="outline" size="sm" className=" rounded-[40px] py-3.5 px-6 bg-black text-white border-0 ">
                Disable
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Bank Account</h4>
              <div className="flex justify-between items-center ">
                <div className="space-y-1">
                  <p className="text-sm">Account Number: **********</p>
                  <p className="text-sm">Routing Number: **********</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className=" rounded-[40px] py-3.5 px-6 bg-black text-white border-0 "
                >
                  Disable
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Information */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardHeader>
          <CardTitle className=" text-base font-medium">Tax Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4 border-[#0000004D]">
            <span className="font-medium">Federal Tax Information</span>
            <span className="">Individual/Sole Proprietor with EIN</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4 border-[#0000004D]">
            <span className="font-medium">Full Name</span>
            <span className="">John Doe</span>
          </div>
          <div className="flex justify-between items-center border-b pb-4 border-[#0000004D]">
            <span className="font-medium">Social Security Number (SSN)</span>
            <span className="">**************</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="font-medium">Address</span>
            <span className=" text-right">No 20 Richard Suite, Caramel boulevard, Miami, 34567 FL</span>
          </div>
        </CardContent>
      </Card>

      {/* Tax Summaries */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base font-medium">
            Tax Summaries
            <Select defaultValue="annually">
              <SelectTrigger className="w-32 bg-black text-white rounded-[40px] px-5 py-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annually">Annually</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            {[2025, 2024, 2023, 2022].map((year, idx) => (
              <div
                key={year}
                className={cn(
                  'flex items-center justify-between pb-4 border-[#0000004D] border-b  hover:bg-accent cursor-pointer',
                  idx === 3 && 'border-0'
                )}
              >
                <span className="font-medium">{year} Annual Tax Summary</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <Button variant="outline" size="lg" className=" border-[#00000080] rounded-[8px]">
          Download Data
        </Button>
        <Button variant="outline" size="lg" className=" border-[#00000080] rounded-[8px]">
          Suspend User
        </Button>
        <Button variant="outline" size="lg" className=" border-[#00000080] rounded-[8px]">
          Ban User
        </Button>
      </div>
    </div>
  );
};
