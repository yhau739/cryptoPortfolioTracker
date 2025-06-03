"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PnlBreakdown from "./pnl-breakdown"
import PerformanceComparison from "./performance-comparison"
import PortfolioSummary from "./portfolio-summary"
import { TimeframeSelector } from "./timeframe-selector"

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "ytd" | "all">("30d")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your portfolio performance and profit/loss metrics</p>
      </div>

      <TimeframeSelector value={timeframe} onValueChange={(value) => setTimeframe(value as any)} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PortfolioSummary timeframe={timeframe} />
      </div>

      <Tabs defaultValue="pnl" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="pnl">PNL Breakdown</TabsTrigger>
          <TabsTrigger value="performance">Performance Comparison</TabsTrigger>
        </TabsList>
        <TabsContent value="pnl" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Breakdown</CardTitle>
              <CardDescription>View your realized and unrealized PNL for each cryptocurrency</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <PnlBreakdown timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Compare your portfolio performance against BTC or ETH</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
              <PerformanceComparison timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
