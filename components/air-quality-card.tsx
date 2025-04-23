"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getCityLabel } from "@/lib/cities"

interface AirQualityCardProps {
  city: string
  loading?: boolean
}

interface AirQualityData {
  aqi: number
  pm25: number
  pm10: number
  timestamp: string
}

export function AirQualityCard({ city, loading: initialLoading = false }: AirQualityCardProps) {
  const [data, setData] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/air-quality/current?city=${city}`)
        if (!response.ok) {
          throw new Error("Failed to fetch air quality data")
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error("Error fetching air quality data:", err)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [city])

  const getAQICategory = (aqi: number) => {
    if (aqi <= 50)
      return {
        label: "Good",
        color: "bg-green-500",
        description: "Air quality is satisfactory, and air pollution poses little or no risk.",
      }
    if (aqi <= 100)
      return {
        label: "Moderate",
        color: "bg-yellow-500",
        description:
          "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
      }
    if (aqi <= 150)
      return {
        label: "Unhealthy for Sensitive Groups",
        color: "bg-orange-500",
        description:
          "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      }
    if (aqi <= 200)
      return {
        label: "Unhealthy",
        color: "bg-red-500",
        description:
          "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.",
      }
    if (aqi <= 300)
      return {
        label: "Very Unhealthy",
        color: "bg-purple-500",
        description: "Health alert: The risk of health effects is increased for everyone.",
      }
    return {
      label: "Hazardous",
      color: "bg-rose-900",
      description: "Health warning of emergency conditions: everyone is more likely to be affected.",
    }
  }

  const cityLabel = getCityLabel(city)

  // Mock data if we don't have real data from the API
  const mockData: AirQualityData = {
    aqi: 85,
    pm25: 25.4,
    pm10: 48.9,
    timestamp: new Date().toISOString(),
  }

  const displayData = data || mockData

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Air Quality in {cityLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div>
            <div className="flex items-end gap-2 mb-4">
              <div className="text-5xl font-bold">{displayData.aqi}</div>
              <Badge className={`${getAQICategory(displayData.aqi).color} text-white`}>
                {getAQICategory(displayData.aqi).label}
              </Badge>
            </div>

            <p className="text-muted-foreground mb-4">{getAQICategory(displayData.aqi).description}</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <div className="text-sm font-medium text-muted-foreground">PM2.5</div>
                <div className="text-xl font-semibold mt-1">{displayData.pm25} µg/m³</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">PM10</div>
                <div className="text-xl font-semibold mt-1">{displayData.pm10} µg/m³</div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-6">
              Last updated: {new Date(displayData.timestamp).toLocaleString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
