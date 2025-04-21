"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"
import { getCityLabel } from "@/lib/cities"

interface CityAirQualityCardProps {
  city: string
}

interface AirQualityData {
  aqi: number
  pm25: number
  timestamp: string
}

export function CityAirQualityCard({ city }: CityAirQualityCardProps) {
  const [data, setData] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(true)
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
    if (aqi <= 50) return { label: "Good", color: "bg-green-500" }
    if (aqi <= 100) return { label: "Moderate", color: "bg-yellow-500" }
    if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "bg-orange-500" }
    if (aqi <= 200) return { label: "Unhealthy", color: "bg-red-500" }
    if (aqi <= 300) return { label: "Very Unhealthy", color: "bg-purple-500" }
    return { label: "Hazardous", color: "bg-rose-900" }
  }

  const cityLabel = getCityLabel(city)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{cityLabel}</CardTitle>
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
        ) : data ? (
          <div>
            <div className="flex items-end gap-2 mb-4">
              <div className="text-4xl font-bold">{data.aqi}</div>
              <Badge className={`${getAQICategory(data.aqi).color} text-white`}>{getAQICategory(data.aqi).label}</Badge>
            </div>

            <div className="text-sm text-muted-foreground">
              <div>PM2.5: {data.pm25} µg/m³</div>
              <div className="mt-1">Last updated: {new Date(data.timestamp).toLocaleString()}</div>
            </div>
          </div>
        ) : (
          <div>No data available</div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/dashboard/cities/${city}`}>
            View Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
