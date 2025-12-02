import { NextResponse } from "next/server";
import { calculateRateAdvantage } from "@/lib/calculations/rate-advantage";
import { MOCK_MARKET_RATE, MOCK_NEIGHBORHOOD_AVG_RATE, MOCK_NEIGHBORHOOD_RATES } from "@/lib/mock-data";
import type { MortgageDetails } from "@/types/property";

// API route to calculate rate advantage
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mortgage: MortgageDetails = body.mortgage;

    if (!mortgage || !mortgage.interestRate || !mortgage.currentBalance) {
      return NextResponse.json(
        { error: "Invalid mortgage data" },
        { status: 400 }
      );
    }

    const result = calculateRateAdvantage(
      mortgage,
      MOCK_MARKET_RATE,
      MOCK_NEIGHBORHOOD_AVG_RATE,
      MOCK_NEIGHBORHOOD_RATES
    );

    return NextResponse.json({ rateAdvantage: result });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to calculate rate advantage" },
      { status: 500 }
    );
  }
}

