"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Share2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface RateAdvantageCardProps {
  userRate: number;
  marketRate: number;
  monthlySavings: number;
  lifetimeSavings: number;
  score: number;
  percentile: number;
  onShare?: () => void;
}

export function RateAdvantageCard({
  userRate,
  marketRate,
  monthlySavings,
  lifetimeSavings,
  score,
  percentile,
  onShare,
}: RateAdvantageCardProps) {
  const scoreColor = score >= 80 ? "success" : score >= 60 ? "default" : "warning";
  const scoreWidth = `${score}%`;

  return (
    <Card className="overflow-hidden border-2 border-primary-100 bg-gradient-to-br from-primary-50 to-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Your Rate Advantage
          </CardTitle>
          {onShare && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="text-gray-600 hover:text-primary-700"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rate Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Your Rate</div>
            <div className="text-3xl font-bold text-success-600">
              {formatPercent(userRate)}
            </div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Market Rate</div>
            <div className="text-3xl font-bold text-gray-700">
              {formatPercent(marketRate)}
            </div>
          </div>
        </div>

        {/* Savings Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-6 bg-gradient-to-r from-success-500 to-success-600 rounded-xl text-white"
        >
          <div className="text-sm font-medium mb-2 opacity-90">
            Your rate saves buyers
          </div>
          <div className="text-5xl font-bold mb-2">
            {formatCurrency(monthlySavings)}
          </div>
          <div className="text-lg font-medium opacity-90">per month</div>
          <div className="mt-4 text-sm opacity-75">
            {formatCurrency(lifetimeSavings)} over the life of the loan
          </div>
        </motion.div>

        {/* Rate Advantage Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Rate Advantage Score</span>
            <span className="font-bold text-gray-900">{score}/100</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: scoreWidth }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${
                score >= 80
                  ? "bg-success-500"
                  : score >= 60
                  ? "bg-primary-500"
                  : "bg-accent-500"
              }`}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>Better than {percentile}% of homeowners</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-gray-200">
          <Button className="w-full" size="lg">
            See What Buyers Would Pay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

