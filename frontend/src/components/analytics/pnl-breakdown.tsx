"use client"

import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { usePortfolioData } from "@/hooks/use-portfolio-data"

interface PnlBreakdownProps {
  timeframe: "7d" | "30d" | "ytd" | "all"
}

export default function PnlBreakdown({ timeframe }: PnlBreakdownProps) {
  const [pnlType, setPnlType] = useState<"both" | "realized" | "unrealized">("both")
  const { data } = usePortfolioData(timeframe)

  const chartData = useMemo(() => {
    if (!data) return []

    return data.coins.map((coin) => ({
      name: coin.symbol,
      realized: coin.realizedPnl,
      unrealized: coin.unrealizedPnl,
      total: coin.realizedPnl + coin.unrealizedPnl,
    }))
  }, [data])

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ToggleGroup type="single" value={pnlType} onValueChange={(value) => value && setPnlType(value as any)}>
          <ToggleGroupItem value="both" aria-label="Show both PNL types">
            Both
          </ToggleGroupItem>
          <ToggleGroupItem className="px-4" value="realized" aria-label="Show only realized PNL">
            Realized
          </ToggleGroupItem>
          <ToggleGroupItem className="px-4" value="unrealized" aria-label="Show only unrealized PNL">
            Unrealized
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <ChartContainer
        config={{
          realized: {
            label: "Realized PNL",
            color: "hsl(var(--chart-8))",
          },
          unrealized: {
            label: "Unrealized PNL",
            color: "hsl(var(--chart-7))",
          },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            {(pnlType === "both" || pnlType === "realized") && (
              <Bar dataKey="realized" fill="var(--color-realized)" name="Realized PNL" radius={[4, 4, 0, 0]} />
            )}
            {(pnlType === "both" || pnlType === "unrealized") && (
              <Bar dataKey="unrealized" fill="var(--color-unrealized)" name="Unrealized PNL" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
