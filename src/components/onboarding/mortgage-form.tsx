"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home } from "lucide-react";
import type { MortgageDetails } from "@/types/property";

const mortgageSchema = z.object({
  loanType: z.enum(["FHA", "VA", "Conventional", "USDA"]),
  interestRate: z.number().min(0).max(10),
  originalAmount: z.number().min(10000),
  currentBalance: z.number().min(0),
  originationDate: z.string(),
  monthlyPayment: z.number().min(100),
  lender: z.string().optional(),
});

type MortgageFormData = z.infer<typeof mortgageSchema>;

interface MortgageFormProps {
  onMortgageSubmit: (mortgage: Partial<MortgageDetails>) => void;
  initialMortgage?: Partial<MortgageDetails>;
}

export function MortgageForm({ onMortgageSubmit, initialMortgage }: MortgageFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MortgageFormData>({
    resolver: zodResolver(mortgageSchema),
    defaultValues: {
      loanType: (initialMortgage?.loanType || "FHA") as "FHA" | "VA" | "Conventional" | "USDA",
      interestRate: initialMortgage?.interestRate || 2.75,
      originalAmount: initialMortgage?.originalAmount || 350000,
      currentBalance: initialMortgage?.currentBalance || 320000,
      originationDate: initialMortgage?.originationDate
        ? new Date(initialMortgage.originationDate).toISOString().split("T")[0]
        : "2021-03-15",
      monthlyPayment: initialMortgage?.monthlyPayment || 1428,
      lender: initialMortgage?.lender || "",
    },
  });

  const onSubmit = (data: MortgageFormData) => {
    const originationDate = new Date(data.originationDate);
    const maturityDate = new Date(originationDate);
    maturityDate.setFullYear(maturityDate.getFullYear() + 30);

    const mortgage: Partial<MortgageDetails> = {
      loanType: data.loanType,
      isAssumable: data.loanType === "FHA" || data.loanType === "VA",
      originalAmount: data.originalAmount,
      currentBalance: data.currentBalance,
      interestRate: data.interestRate,
      originationDate,
      maturityDate,
      monthlyPayment: data.monthlyPayment,
      lender: data.lender,
    };

    onMortgageSubmit(mortgage);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-primary-600" />
          <CardTitle>Tell Us About Your Mortgage</CardTitle>
        </div>
        <CardDescription>
          Enter your mortgage details to calculate your rate advantage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="loanType">Loan Type</Label>
            <select
              id="loanType"
              {...register("loanType")}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <option value="FHA">FHA</option>
              <option value="VA">VA</option>
              <option value="Conventional">Conventional</option>
              <option value="USDA">USDA</option>
            </select>
            {errors.loanType && (
              <p className="text-sm text-danger-600 mt-1">{errors.loanType.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              {...register("interestRate", { valueAsNumber: true })}
              placeholder="2.75"
            />
            {errors.interestRate && (
              <p className="text-sm text-danger-600 mt-1">{errors.interestRate.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="originalAmount">Original Loan Amount</Label>
              <Input
                id="originalAmount"
                type="number"
                {...register("originalAmount", { valueAsNumber: true })}
                placeholder="350000"
              />
              {errors.originalAmount && (
                <p className="text-sm text-danger-600 mt-1">{errors.originalAmount.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="currentBalance">Current Balance</Label>
              <Input
                id="currentBalance"
                type="number"
                {...register("currentBalance", { valueAsNumber: true })}
                placeholder="320000"
              />
              {errors.currentBalance && (
                <p className="text-sm text-danger-600 mt-1">{errors.currentBalance.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="originationDate">Loan Start Date</Label>
            <Input
              id="originationDate"
              type="date"
              {...register("originationDate")}
            />
            {errors.originationDate && (
              <p className="text-sm text-danger-600 mt-1">{errors.originationDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="monthlyPayment">Monthly Payment</Label>
            <Input
              id="monthlyPayment"
              type="number"
              {...register("monthlyPayment", { valueAsNumber: true })}
              placeholder="1428"
            />
            {errors.monthlyPayment && (
              <p className="text-sm text-danger-600 mt-1">{errors.monthlyPayment.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lender">Lender (optional)</Label>
            <Input
              id="lender"
              {...register("lender")}
              placeholder="Quicken Loans"
            />
          </div>

          <div className="pt-4 border-t">
            <Button type="submit" className="w-full" size="lg">
              Calculate My Rate Advantage
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

