"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons"

interface AirQualityStatsProps {
  city: string
}

interface StatsData {
  avgAqi: number
  maxAqi: number
  minAqi: number
  trend: "up" | "down" | "stable"
  percentChange: number
}

export function AirQualityStats({ city }: AirQualityStatsProps) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/air-quality/stats?city=${city}`)
        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error("Error fetching stats:", err)
        setError("Failed to load statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [city])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Air Quality Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Air Quality Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  // If we don't have real stats from the API, use mock data
  const mockStats: StatsData = stats || {
    avgAqi: 85,
    maxAqi: 120,
    minAqi: 65,
    trend: "up",
    percentChange: 12.5,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Air Quality Statistics (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Average AQI</div>
            <div className="text-2xl font-bold mt-1">{mockStats.avgAqi}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-muted-foreground">Peak AQI</div>
            <div className="text-2xl font-bold mt-1">{mockStats.maxAqi}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-muted-foreground">AQI Trend</div>
            <div className="flex items-center mt-1">
              <div className="text-2xl font-bold mr-2">{mockStats.percentChange.toFixed(1)}%</div>
              {mockStats.trend === "up" ? (
                <div className="flex items-center text-red-500">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  <span className="text-xs">Increasing</span>
                </div>
              ) : (
                <div className="flex items-center text-green-500">
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                  <span className="text-xs">Decreasing</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
