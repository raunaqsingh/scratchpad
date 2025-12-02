"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RateAdvantageCard } from "@/components/dashboard/rate-advantage-card";
import { EquityTracker } from "@/components/dashboard/equity-tracker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { calculateRateAdvantage } from "@/lib/calculations/rate-advantage";
import { generateEquityHistory } from "@/lib/calculations/equity";
import { MOCK_MARKET_RATE, MOCK_NEIGHBORHOOD_AVG_RATE, MOCK_NEIGHBORHOOD_RATES } from "@/lib/mock-data";
import type { Property, MortgageDetails } from "@/types/property";
import { Bell, User, Share2, Home } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [rateAdvantage, setRateAdvantage] = useState<any>(null);
  const [equityHistory, setEquityHistory] = useState<any[]>([]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Load property from localStorage (in production, this would come from API)
    const storedProperty = localStorage.getItem("roam_property");
    const storedRateAdvantage = localStorage.getItem("roam_rate_advantage");

    if (!storedProperty) {
      router.push("/");
      return;
    }

    try {
      const prop: Property = JSON.parse(storedProperty);
      
      // Convert date strings back to Date objects
      if (prop.mortgage) {
        prop.mortgage.originationDate = new Date(prop.mortgage.originationDate);
        prop.mortgage.maturityDate = new Date(prop.mortgage.maturityDate);
      }
      if (prop.valuation) {
        prop.valuation.estimateDate = new Date(prop.valuation.estimateDate);
      }
      prop.createdAt = new Date(prop.createdAt);
      prop.updatedAt = new Date(prop.updatedAt);
      
      setProperty(prop);

      if (storedRateAdvantage) {
        setRateAdvantage(JSON.parse(storedRateAdvantage));
      } else if (prop.mortgage) {
        // Calculate if not stored
        const result = calculateRateAdvantage(
          prop.mortgage,
          MOCK_MARKET_RATE,
          MOCK_NEIGHBORHOOD_AVG_RATE,
          MOCK_NEIGHBORHOOD_RATES
        );
        setRateAdvantage(result);
      }

      // Generate equity history
      if (prop.mortgage && prop.valuation) {
        const history = generateEquityHistory(prop.mortgage, prop.valuation, 12);
        setEquityHistory(history);
      }
    } catch (error) {
      console.error("Error loading property:", error);
      router.push("/");
    }
  }, [router]);

  const handleShare = async () => {
    if (rateAdvantage && property?.mortgage) {
      const text = `My ${property.mortgage.interestRate}% mortgage rate could save a buyer ${formatCurrency(rateAdvantage.monthlyPaymentSavings)}/month! See your rate advantage at Roam.`;
      const url = window.location.origin;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: "My Rate Advantage",
            text,
            url,
          });
        } catch (err) {
          // User cancelled or error occurred
          console.log("Share cancelled");
        }
      } else {
        try {
          await navigator.clipboard.writeText(`${text} ${url}`);
          alert("Link copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      }
    }
  };

  if (!property || !rateAdvantage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const address = property.address;
  const mortgage = property.mortgage!;
  const valuation = property.valuation!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">Roam</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Property Address */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {address.street}
            {address.unit && `, ${address.unit}`}
          </h1>
          <p className="text-gray-600">
            {address.city}, {address.state} {address.zip}
          </p>
        </div>

        {/* Rate Advantage Card */}
        <div className="mb-8">
          <RateAdvantageCard
            userRate={mortgage.interestRate}
            marketRate={rateAdvantage.currentMarketRate}
            monthlySavings={rateAdvantage.monthlyPaymentSavings}
            lifetimeSavings={rateAdvantage.lifetimeSavings}
            score={rateAdvantage.rateAdvantageScore}
            percentile={rateAdvantage.neighborhoodPercentile}
            onShare={handleShare}
          />
        </div>

        {/* Home Value & Equity */}
        <div className="mb-8">
          <EquityTracker
            currentValue={valuation.currentEstimate}
            purchasePrice={mortgage.originalAmount * 1.1} // Estimate purchase price
            currentBalance={mortgage.currentBalance}
            equityHistory={equityHistory}
          />
        </div>

        {/* Buyer Demand (Mock) */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buyer Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl font-bold text-primary-600 mb-2">23</div>
              <p className="text-lg text-gray-600 mb-4">buyers searching for your rate range</p>
              <p className="text-sm text-gray-500">Average days to contract: 18</p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Footer */}
        <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to unlock your rate's value?</h2>
            <p className="text-primary-100 mb-6">
              Talk to a Roam expert or list your home to capture your rate premium
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Talk to an Expert
              </Button>
              <Button variant="outline" size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                List My Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

