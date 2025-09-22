import { Card, CardContent } from '@/components/admin/Dashboard/LucideUI/card';
import { Button } from '@/components/admin/Dashboard/LucideUI/button';

export const OtherInformation = () => {
  return (
    <div className="space-y-6">
      {/* Important Information */}
      <div className="bg-black text-white p-4 rounded-[10px]">
        <h2 className="text-lg font-bold">Important Information</h2>
      </div>

      {/* Drivers License */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Drivers License</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Drivers License Number</span>
              <span className="">W462-660-61-147-0</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">State of Issue</span>
              <span className="">Miami</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Issue Date</span>
              <span className="">Jan 05, 2025</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Expiry Date</span>
              <span className="">Jan 04, 2026</span>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <span className="text-primary font-medium block mb-2">Front Image</span>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Button variant="secondary" size="sm" className="text-[#fff]">
                    View Image
                  </Button>
                </div>
              </div>
              <div>
                <span className="text-primary font-medium block mb-2">Back Image</span>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Button variant="secondary" size="sm" className="text-[#fff]">
                    View Image
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Citizenship Status */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Citizenship Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">US Citizen</span>
              <span className="">Yes</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">State of Birth</span>
              <span className="">Miami</span>
            </div>

            <div className="mt-6">
              <span className="text-primary font-medium block mb-2">Birth Certificate</span>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Button variant="secondary" size="sm" className="text-[#fff]">
                  View Image
                </Button>
              </div>
            </div>
            <hr className="bg-[#0000004D] w-full mt-3 mx-auto " />
            <h3 className="text-lg font-semibold">Residency Documents</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-primary font-medium block mb-2">Front Image</span>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Button variant="secondary" size="sm" className="text-[#fff]">
                    View Image
                  </Button>
                </div>
              </div>
              <div>
                <span className="text-primary font-medium block mb-2">Back Image</span>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Button variant="secondary" size="sm" className="text-[#fff]">
                    View Image
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background Check Report */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Background Check Report</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Expiry Date</span>
              <span className="">Jan 04, 2026</span>
            </div>

            <div className="mt-6">
              <span className="text-primary font-medium block mb-2">Report Image</span>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Button variant="secondary" size="sm" className="text-[#fff]">
                  View Image
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FBI Identity Check */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">FBI Identity Check</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Date Submitted</span>
              <span className="">Jan 04, 2026</span>
            </div>

            <div className="mt-6">
              <span className="text-primary font-medium block mb-2">Report Image</span>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Button variant="secondary" size="sm" className="text-[#fff]">
                  View Image
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MVR Vehicle Report */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">MVR Vehicle Report</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Report Date</span>
              <span className="">Jan 04, 2026</span>
            </div>

            <div className="mt-6">
              <span className="text-primary font-medium block mb-2">Report Image</span>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Button variant="secondary" size="sm" className="text-[#fff]">
                  View Image
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optional Information */}
      <div className="bg-black text-white p-4 rounded-[10px]">
        <h2 className="text-lg font-bold">Optional Information</h2>
      </div>

      {/* Business Certificate */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Business Certificate</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Type of Business</span>
              <span className="">Minority Business Enterprise (MBE)</span>
            </div>

            <div className="mt-6">
              <span className="text-primary font-medium block mb-2">Proof Of Certification</span>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Button variant="secondary" size="sm" className="text-[#fff]">
                  View Image
                </Button>
              </div>
            </div>

            <div className="flex justify-between border-y py-4 border-[#0000004D]">
              <span className="text-primary font-medium">Type of Business</span>
              <span className="">Woman Business Enterprise</span>
            </div>

            <div className="mt-6">
              <span className="text-primary font-medium block mb-2">Proof Of Certification</span>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Button variant="secondary" size="sm" className="text-[#fff]">
                  View Image
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Military Service - Dynamic based on status */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Military Service</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Served in Military</span>
              <span className="">Yes</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Branch</span>
              <span className="">Navy</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Discharge Type</span>
              <span className="">Dishonorables</span>
            </div>
            <div className="space-y-2">
              <span className="text-primary font-medium">Discharge Paper Photo</span>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Button variant="secondary" size="sm" className="text-[#fff]">
                  View Image
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Clearance - Dynamic based on status */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Security Clearance</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Top-Secret Security Clearance Holder</span>
              <span className="">Yes</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Type</span>
              <span className="">CIA</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Issuing Agency</span>
              <span className="">CIA</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Law Enforcement - Dynamic based on status */}
      <Card className=" border border-[#00000080] rounded-[20px]">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Law Enforcement</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Served in Law Enforcement/Federal Agent</span>
              <span className="">Yes</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Agency</span>
              <span className="">FBI</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-[#0000004D]">
              <span className="text-primary font-medium">Status</span>
              <span className="">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demographics Information */}
      <div className="bg-black text-white p-4 rounded-[10px]">
        <h2 className="text-lg font-bold">Demographics Information</h2>
      </div>

      <Card className=" border-none shadow-none drop-shadow-none">
        <CardContent className=" px-0">
          <div className="space-y-4">
            <div className="flex justify-between border p-5 rounded-[40px] border-[#0000004D]">
              <span className="text-primary font-bold">Ethnicity & Cultural Identity</span>
              <span className="">African Descent (West African)</span>
            </div>
            <div className="flex justify-between border p-5 rounded-[40px] border-[#0000004D]">
              <span className="text-primary font-bold">Language & Cultural Affiliation</span>
              <span className="">African American Vernacular English (AAVE)</span>
            </div>
            <div className="flex justify-between border p-5 rounded-[40px] border-[#0000004D]">
              <span className="text-primary font-bold">Gender Identity</span>
              <span className="">Male</span>
            </div>
            <div className="flex justify-between border p-5 rounded-[40px] border-[#0000004D]">
              <span className="text-primary font-bold">Sexual Orientation</span>
              <span className="">Heterosexual</span>
            </div>
            <div className="flex justify-between border p-5 rounded-[40px] border-[#0000004D]">
              <span className="text-primary font-bold">Disability Status</span>
              <span className="">No</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
