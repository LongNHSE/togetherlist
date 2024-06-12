'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const SectionOne = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {/* First + Last name */}
        <div className="grid grid-cols-2 gap-7">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="firstname">Firstname</Label>
            <Input id="firstname" type="text" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="lastname">Lastname</Label>
            <Input id="lastname" type="text" />
          </div>
        </div>
        {/* Work email */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        {/* Phonenumber */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phonenumber">Phonenumber</Label>
          <Input id="phonenumber" type="number" />
        </div>
        {/* Company name */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="companyname">Company Name</Label>
          <Input id="companyname" type="text" />
        </div>
        {/* Company size */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="companysize">Company Size</Label>
          <Input id="companysize" type="number" />
        </div>
        {/* Company country */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="companycountry">Company Country</Label>
          <Input id="companycountry" type="text" />
        </div>
        {/* More details */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="moredetails">More Details</Label>
          <Textarea id="moredetails" />
        </div>
      </div>

      <Button size="sm">Send</Button>
    </>
  );
};

export default SectionOne;
