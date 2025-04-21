"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { ArrowLeft, Bell, BellOff } from "lucide-react"
import { AirQualityChart } from "@/components/air-quality-chart"
import { AirQualityCard } from "@/components/air-quality-card"
import { AirQualityInsight } from "@/components/air-quality-insight"
import { AirQualityStats } from "@/components/air-quality-stats"
import { getCityLabel } from "@/lib/cities"
import Link from "next/link"

export default function CityDetailPage() {
  const params = useParams()
  const city = params.city as string
  const [currentAQI, setCurrentAQI] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("24h")
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    const fetchCurrentAQI = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/air-quality/current?city=${city}`)
        const data = await response.json()
        setCurrentAQI(data.aqi)
      } catch (error) {
        console.error("Error fetching current AQI:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentAQI()
  }, [city])

  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed)
    // In a real app, this would call an API to subscribe/unsubscribe
  }

  const cityLabel = getCityLabel(city)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/cities">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{cityLabel}</h1>
        </div>
        <Button variant={isSubscribed ? "outline" : "default"} onClick={toggleSubscription}>
          {isSubscribed ? (
            <>
              <BellOff className="mr-2 h-4 w-4" />
              Unsubscribe from Alerts
            </>
          ) : (
            <>
              <Bell className="mr-2 h-4 w-4" />
              Subscribe to Alerts
            </>
          )}
        </Button>
      </div>

      {currentAQI && currentAQI > 100 && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Poor Air Quality Alert</AlertTitle>
          <AlertDescription>
            The current Air Quality Index (AQI) in {cityLabel} is {currentAQI}, which is considered unhealthy. Take
            necessary precautions.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AirQualityCard city={city} loading={loading} />
        <AirQualityInsight city={city} aqi={currentAQI} loading={loading} />
      </div>

      <AirQualityStats city={city} />

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <CardTitle>Historical AQI Trends</CardTitle>
            <Tabs value={timeRange} onValueChange={setTimeRange} className="mt-2 md:mt-0">
              <TabsList>
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <TabsContent value="24h" className="h-full">
              <AirQualityChart city={city} hours={24} />
            </TabsContent>
            <TabsContent value="7d" className="h-full">
              <AirQualityChart city={city} hours={168} />
            </TabsContent>
            <TabsContent value="30d" className="h-full">
              <AirQualityChart city={city} hours={720} />
            </TabsContent>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
