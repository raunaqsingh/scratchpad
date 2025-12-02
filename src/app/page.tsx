"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AddressLookup } from "@/components/onboarding/address-lookup";
import { MortgageForm } from "@/components/onboarding/mortgage-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { calculateRateAdvantage } from "@/lib/calculations/rate-advantage";
import { createMockProperty, MOCK_MARKET_RATE, MOCK_NEIGHBORHOOD_AVG_RATE, MOCK_NEIGHBORHOOD_RATES } from "@/lib/mock-data";
import type { Address, MortgageDetails } from "@/types/property";
import { Sparkles, TrendingUp } from "lucide-react";

type OnboardingStep = "address" | "mortgage" | "results";

export default function HomePage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("address");
  const [address, setAddress] = useState<Address | null>(null);
  const [mortgage, setMortgage] = useState<Partial<MortgageDetails> | null>(null);
  const [rateAdvantage, setRateAdvantage] = useState<any>(null);

  const handleAddressSubmit = (addr: Address) => {
    setAddress(addr);
    setStep("mortgage");
  };

  const handleMortgageSubmit = (mort: Partial<MortgageDetails>) => {
    if (!address || !mort.interestRate || !mort.currentBalance) return;

    setMortgage(mort);
    
    // Calculate rate advantage
    const result = calculateRateAdvantage(
      mort as MortgageDetails,
      MOCK_MARKET_RATE,
      MOCK_NEIGHBORHOOD_AVG_RATE,
      MOCK_NEIGHBORHOOD_RATES
    );
    
    setRateAdvantage(result);
    setStep("results");
  };

  const handleCreateAccount = () => {
    // Store data in localStorage for demo
    if (address && mortgage) {
      const property = createMockProperty(address, mortgage);
      localStorage.setItem("roam_property", JSON.stringify(property));
      localStorage.setItem("roam_rate_advantage", JSON.stringify(rateAdvantage));
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Your mortgage rate is worth money.
            <br />
            <span className="text-primary-600">See how much.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turn your low rate into a selling advantage. See exactly how valuable your assumable mortgage is to potential buyers.
          </p>
        </div>

        {/* Onboarding Steps */}
        {step === "address" && (
          <AddressLookup onAddressSubmit={handleAddressSubmit} />
        )}

        {step === "mortgage" && address && (
          <MortgageForm onMortgageSubmit={handleMortgageSubmit} />
        )}

        {step === "results" && rateAdvantage && (
          <Card className="border-2 border-success-200">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-success-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Great news!
                </h2>
                <p className="text-lg text-gray-600">
                  Your {mortgage?.interestRate}% rate could save a buyer
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-success-600 mb-2">
                  {formatCurrency(rateAdvantage.monthlyPaymentSavings)}
                </div>
                <div className="text-xl text-gray-600 mb-4">per month</div>
                <div className="text-lg text-gray-500">
                  That's {formatCurrency(rateAdvantage.lifetimeSavings)} over the life of the loan!
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 text-gray-700 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary-600" />
                  <span className="font-semibold">Your Rate Advantage Score: {rateAdvantage.rateAdvantageScore}/100</span>
                </div>
                <p className="text-sm text-gray-600">
                  Better than {rateAdvantage.neighborhoodPercentile}% of homeowners in your area
                </p>
              </div>

              <div className="space-y-3">
                <Button onClick={handleCreateAccount} className="w-full" size="lg">
                  Create Free Account to Track This
                </Button>
                <p className="text-center text-sm text-gray-500">
                  Get weekly updates on your rate advantage and home value
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>1,000+ families have sold with Roam</p>
          <p className="mt-1">Buyers have saved $50M+ through Roam</p>
        </div>
      </div>
    </div>
  );
}

