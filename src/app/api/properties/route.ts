import { NextResponse } from "next/server";
import { createMockProperty, getMockPropertyValue } from "@/lib/mock-data";
import type { Address } from "@/types/property";

// Mock API route for demo purposes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const address: Address = body.address;

    if (!address || !address.street || !address.city || !address.state || !address.zip) {
      return NextResponse.json(
        { error: "Invalid address" },
        { status: 400 }
      );
    }

    // In production, this would fetch from a real property data API
    const propertyValue = getMockPropertyValue(address);
    const property = createMockProperty(address, {
      originalAmount: propertyValue * 0.8, // 80% LTV
      currentBalance: propertyValue * 0.7, // 70% LTV
    });

    return NextResponse.json({ property });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch property data" },
      { status: 500 }
    );
  }
}

