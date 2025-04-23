"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCityLabel } from "@/lib/cities"

interface AirQualityInsightProps {
  city: string
  aqi: number | null
  loading?: boolean
}

export function AirQualityInsight({ city, aqi, loading: initialLoading = false }: AirQualityInsightProps) {
  const [insight, setInsight] = useState<string | null>(null)
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInsight = async () => {
      if (!aqi) return

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/air-quality/insight?city=${city}&aqi=${aqi}`)
        if (!response.ok) {
          throw new Error("Failed to fetch insight")
        }

        const data = await response.json()
        setInsight(data.insight)
      } catch (err) {
        console.error("Error fetching insight:", err)
        setError("Failed to load health insights")
      } finally {
        setLoading(false)
      }
    }

    if (aqi) {
      fetchInsight()
    }
  }, [city, aqi])

  const cityLabel = getCityLabel(city)

  // Mock insights based on AQI ranges
  const getMockInsight = (aqi: number | null) => {
    if (!aqi) return "Loading air quality data to provide health insights..."

    if (aqi <= 50) {
      return "The air quality is good. It's a great day for outdoor activities. Enjoy the fresh air and consider walking or cycling instead of driving to help maintain good air quality."
    } else if (aqi <= 100) {
      return "Air quality is moderate. Most people can continue outdoor activities, but those with respiratory issues like asthma should consider limiting prolonged outdoor exertion."
    } else if (aqi <= 150) {
      return "Air quality is unhealthy for sensitive groups. People with respiratory or heart conditions, the elderly, and children should limit prolonged outdoor activities. Consider wearing a mask if you need to be outside for extended periods."
    } else if (aqi <= 200) {
      return "Air quality is unhealthy. Everyone may begin to experience health effects. Sensitive groups should avoid outdoor physical activities. Consider using air purifiers indoors and keep windows closed."
    } else if (aqi <= 300) {
      return "Air quality is very unhealthy. Health warnings of emergency conditions. Everyone should avoid outdoor activities. Use air purifiers indoors, wear masks when going outside, and consider staying indoors as much as possible."
    } else {
      return "Air quality is hazardous. Health alert: everyone may experience more serious health effects. Avoid all outdoor physical activities. Stay indoors with windows closed and use air purifiers. Wear N95 masks if you must go outside."
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Insights for {cityLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="text-muted-foreground">{insight || getMockInsight(aqi)}</div>
        )}
      </CardContent>
    </Card>
  )
}
