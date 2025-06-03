"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemo } from "react"
import { formatCurrency } from "@/lib/utils"
import { usePortfolioData } from "@/hooks/use-portfolio-data"

interface PortfolioSummaryProps {
  timeframe: "7d" | "30d" | "ytd" | "all"
}

export default function PortfolioSummary({ timeframe }: PortfolioSummaryProps) {
  const { data } = usePortfolioData(timeframe)

  const summary = useMemo(() => {
    if (!data)
      return {
        totalValue: 0,
        totalChange: 0,
        totalChangePercent: 0,
        realizedPnl: 0,
        unrealizedPnl: 0,
      }

    return {
      totalValue: data.currentValue,
      totalChange: data.currentValue - data.previousValue,
      totalChangePercent: ((data.currentValue - data.previousValue) / data.previousValue) * 100,
      realizedPnl: data.realizedPnl,
      unrealizedPnl: data.unrealizedPnl,
    }
  }, [data])

  const isPositiveChange = summary.totalChange >= 0
  const isPositiveRealized = summary.realizedPnl >= 0
  const isPositiveUnrealized = summary.unrealizedPnl >= 0

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(summary.totalValue)}</div>
          <div className={`flex items-center text-xs ${isPositiveChange ? "text-green-500" : "text-red-500"}`}>
            {isPositiveChange ? <ArrowUpIcon className="mr-1 h-4 w-4" /> : <ArrowDownIcon className="mr-1 h-4 w-4" />}
            <span>
              {isPositiveChange ? "+" : ""}
              {formatCurrency(summary.totalChange)} ({summary.totalChangePercent.toFixed(2)}%)
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {timeframe === "7d"
              ? "Past 7 days"
              : timeframe === "30d"
                ? "Past 30 days"
                : timeframe === "ytd"
                  ? "Year to date"
                  : "All time"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Realized PNL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositiveRealized ? "text-green-500" : "text-red-500"}`}>
            {isPositiveRealized ? "+" : ""}
            {formatCurrency(summary.realizedPnl)}
          </div>
          <p className="text-xs text-muted-foreground">From completed sell transactions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unrealized PNL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${isPositiveUnrealized ? "text-green-500" : "text-red-500"}`}>
            {isPositiveUnrealized ? "+" : ""}
            {formatCurrency(summary.unrealizedPnl)}
          </div>
          <p className="text-xs text-muted-foreground">Based on current market prices</p>
        </CardContent>
      </Card>
    </>
  )
}
