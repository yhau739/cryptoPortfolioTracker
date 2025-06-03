"use client"

import { useEffect, useState } from "react"

// Types for our portfolio data
interface CoinData {
  id: string
  name: string
  symbol: string
  currentPrice: number
  averageBuyPrice: number
  quantity: number
  realizedPnl: number
  unrealizedPnl: number
}

interface PerformancePoint {
  date: string
  portfolioValue: number
  btcValue: number
  ethValue: number
}

interface PortfolioData {
  currentValue: number
  previousValue: number
  realizedPnl: number
  unrealizedPnl: number
  coins: CoinData[]
  performanceHistory: PerformancePoint[]
}

// Mock data generator
const generateMockData = (timeframe: "7d" | "30d" | "ytd" | "all"): PortfolioData => {
  // Generate different data based on timeframe
  const daysCount = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : timeframe === "ytd" ? 180 : 365

  // Generate performance history
  const performanceHistory: PerformancePoint[] = []
  const today = new Date()
  let portfolioValue = 10000 + Math.random() * 5000
  let btcValue = 10000
  let ethValue = 10000

  for (let i = daysCount; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Add some randomness to the values
    portfolioValue = portfolioValue * (1 + (Math.random() * 0.04 - 0.02))
    btcValue = btcValue * (1 + (Math.random() * 0.05 - 0.02))
    ethValue = ethValue * (1 + (Math.random() * 0.06 - 0.03))

    performanceHistory.push({
      date: date.toISOString(),
      portfolioValue,
      btcValue,
      ethValue,
    })
  }

  // Generate coin data
  const coins: CoinData[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      currentPrice: 65000 + Math.random() * 2000,
      averageBuyPrice: 60000 + Math.random() * 5000,
      quantity: 0.5 + Math.random() * 0.2,
      realizedPnl: 2000 + Math.random() * 1000,
      unrealizedPnl: 1500 + Math.random() * 1000,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      currentPrice: 3500 + Math.random() * 200,
      averageBuyPrice: 3200 + Math.random() * 300,
      quantity: 5 + Math.random() * 2,
      realizedPnl: 1200 + Math.random() * 500,
      unrealizedPnl: 800 + Math.random() * 400,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      currentPrice: 140 + Math.random() * 20,
      averageBuyPrice: 120 + Math.random() * 30,
      quantity: 25 + Math.random() * 10,
      realizedPnl: 600 + Math.random() * 300,
      unrealizedPnl: 400 + Math.random() * 200,
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      currentPrice: 0.5 + Math.random() * 0.1,
      averageBuyPrice: 0.45 + Math.random() * 0.15,
      quantity: 5000 + Math.random() * 1000,
      realizedPnl: 300 + Math.random() * 150,
      unrealizedPnl: -100 - Math.random() * 50,
    },
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      currentPrice: 7 + Math.random(),
      averageBuyPrice: 8 + Math.random(),
      quantity: 200 + Math.random() * 50,
      realizedPnl: -200 - Math.random() * 100,
      unrealizedPnl: -150 - Math.random() * 75,
    },
  ]

  // Calculate totals
  const currentValue = performanceHistory[performanceHistory.length - 1].portfolioValue
  const previousValue = performanceHistory[0].portfolioValue
  const realizedPnl = coins.reduce((sum, coin) => sum + coin.realizedPnl, 0)
  const unrealizedPnl = coins.reduce((sum, coin) => sum + coin.unrealizedPnl, 0)

  return {
    currentValue,
    previousValue,
    realizedPnl,
    unrealizedPnl,
    coins,
    performanceHistory,
  }
}

export function usePortfolioData(timeframe: "7d" | "30d" | "ytd" | "all") {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)

    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      try {
        const mockData = generateMockData(timeframe)
        setData(mockData)
        console.log("chartData", mockData)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [timeframe])

  return { data, loading, error }
}
