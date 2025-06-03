"use client"

import { useMemo, useState } from "react"
import { Area, AreaChart, LineChart, CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { usePortfolioData } from "@/hooks/use-portfolio-data"
// import { LineChart } from "lucide-react"

interface PerformanceComparisonProps {
  timeframe: "7d" | "30d" | "ytd" | "all"
}

export default function PerformanceComparison({ timeframe }: PerformanceComparisonProps) {
  const [benchmark, setBenchmark] = useState<"btc" | "eth">("btc")
  const { data } = usePortfolioData(timeframe)

  const chartData = useMemo(() => {
    if (!data) return []

    return data.performanceHistory.map((point) => ({
      date: new Date(point.date).toLocaleDateString(),
      portfolio: point.portfolioValue,
      btc: point.btcValue,
      eth: point.ethValue,
    }))
  }, [data])

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ToggleGroup type="single" value={benchmark} onValueChange={(value) => value && setBenchmark(value as any)}>
          {/* <ToggleGroup type="single" value={benchmark} onValueChange={(value) => {
          if (value) {
            console.log("Selected benchmark:", value) // ✅ Log here
            setBenchmark(value as "btc" | "eth")
          }
        }}> */}
          <ToggleGroupItem value="btc" aria-label="Compare with Bitcoin">
            vs BTC
          </ToggleGroupItem>
          <ToggleGroupItem value="eth" aria-label="Compare with Ethereum">
            vs ETH
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <ChartContainer
        config={{
          portfolio: {
            label: "Portfolio",
            color: "hsl(var(--chart-2))",
          },
          btc: {
            label: "Bitcoin",
            color: "hsl(var(--chart-3))"
          },
          eth: {
            label: "Ethereum",
            color: "hsl(var(--chart-6))"
          },
          // [benchmark]: {
          //   label: benchmark === "btc" ? "Bitcoin" : "Ethereum",
          //   color: "hsl(var(--chart-3))",
          // },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={["auto", "auto"]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--background)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--background)" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* Portfolio Line */}
            <Line
              type="monotone"
              dataKey= "portfolio"
              stroke="var(--color-portfolio)"
              dot={false}
              fillOpacity={1}
              fill="url(#colorPortfolio)"
              name="Portfolio"
            />
            {/* Benchmark line */}
            <Line
              type="monotone"
              dataKey={benchmark}
              // stroke="var(--color-btc)"
              stroke={`var(--color-${benchmark})`}
              strokeWidth={2}
              dot={false}
              name={benchmark === "btc" ? "Bitcoin" : "Ethereum"}
            />
            {/* <Area
              type="monotone"
              dataKey="portfolio"
              stroke="var(--color-portfolio)"
              fillOpacity={1}
              fill="url(#colorPortfolio)"
              name="Portfolio"
            /> */}

          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
