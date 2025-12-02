"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingUp, Home } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { EquityDataPoint } from "@/types/property";

interface EquityTrackerProps {
  currentValue: number;
  purchasePrice: number;
  currentBalance: number;
  equityHistory: EquityDataPoint[];
  timeRange?: "1M" | "6M" | "1Y" | "ALL";
  onTimeRangeChange?: (range: string) => void;
}

export function EquityTracker({
  currentValue,
  purchasePrice,
  currentBalance,
  equityHistory,
  timeRange = "1Y",
  onTimeRangeChange,
}: EquityTrackerProps) {
  const equity = currentValue - currentBalance;
  const equityPercentage = (equity / currentValue) * 100;
  const appreciation = currentValue - purchasePrice;
  const appreciationPercent = (appreciation / purchasePrice) * 100;

  // Filter history based on time range
  const filteredHistory = equityHistory.filter((point) => {
    const now = new Date();
    const pointDate = new Date(point.date);
    const monthsAgo = timeRange === "1M" ? 1 : timeRange === "6M" ? 6 : timeRange === "1Y" ? 12 : 999;
    const cutoffDate = new Date(now);
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsAgo);
    return pointDate >= cutoffDate;
  });

  const chartData = filteredHistory.map((point) => ({
    date: new Date(point.date).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    equity: point.equity,
    value: point.homeValue,
    balance: point.loanBalance,
  }));

  const latestEquity = equityHistory[equityHistory.length - 1]?.equity || equity;
  const previousEquity = equityHistory[equityHistory.length - 2]?.equity || equity;
  const monthlyGain = latestEquity - previousEquity;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary-600" />
            Home Value & Equity
          </CardTitle>
          {onTimeRangeChange && (
            <div className="flex gap-2">
              {(["1M", "6M", "1Y", "ALL"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    timeRange === range
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Home Value</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(currentValue)}
            </div>
            <div className="text-sm text-success-600 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              {formatCurrency(appreciation)} ({formatPercent(appreciationPercent)})
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Your Equity</div>
            <div className="text-2xl font-bold text-primary-600">
              {formatCurrency(equity)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {formatPercent(equityPercentage)} of home value
            </div>
          </div>
        </div>

        {/* Monthly Gain */}
        {monthlyGain > 0 && (
          <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
            <div className="text-sm text-success-700 font-medium">
              You've built {formatCurrency(monthlyGain)} in equity this month
            </div>
          </div>
        )}

        {/* Equity Growth Chart */}
        {chartData.length > 0 && (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="equity"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEquity)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Comparison */}
        <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <div className="font-medium text-gray-900 mb-1">
            If you'd rented, you'd have $0 equity
          </div>
          <div>Your home is building wealth every month through principal paydown and appreciation.</div>
        </div>
      </CardContent>
    </Card>
  );
}

