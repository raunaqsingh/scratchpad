"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import type { Address } from "@/types/property";

interface AddressLookupProps {
  onAddressSubmit: (address: Address) => void;
  initialAddress?: Partial<Address>;
}

export function AddressLookup({ onAddressSubmit, initialAddress }: AddressLookupProps) {
  const [address, setAddress] = useState<Partial<Address>>({
    street: initialAddress?.street || "",
    unit: initialAddress?.unit || "",
    city: initialAddress?.city || "",
    state: initialAddress?.state || "",
    zip: initialAddress?.zip || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.street && address.city && address.state && address.zip) {
      onAddressSubmit({
        street: address.street,
        unit: address.unit,
        city: address.city,
        state: address.state,
        zip: address.zip,
        county: address.county,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary-600" />
          <CardTitle>Enter Your Address</CardTitle>
        </div>
        <CardDescription>
          We'll show you your home's current value and how your rate compares to today's market
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              placeholder="123 Main Street"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="unit">Unit / Apt (optional)</Label>
            <Input
              id="unit"
              placeholder="Apt 4B"
              value={address.unit}
              onChange={(e) => setAddress({ ...address, unit: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Austin"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="TX"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value.toUpperCase() })}
                maxLength={2}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              placeholder="78704"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              pattern="[0-9]{5}"
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

