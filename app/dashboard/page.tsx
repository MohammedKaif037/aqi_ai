"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { AirQualityChart } from "@/components/air-quality-chart"
import { AirQualityCard } from "@/components/air-quality-card"
import { AirQualityInsight } from "@/components/air-quality-insight"
import { AirQualityStats } from "@/components/air-quality-stats"
import { cities } from "@/lib/cities"

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("bangalore")
  const [currentAQI, setCurrentAQI] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("24h")

  useEffect(() => {
    const fetchCurrentAQI = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/air-quality/current?city=${selectedCity}`)
        const data = await response.json()
        setCurrentAQI(data.aqi)
      } catch (error) {
        console.error("Error fetching current AQI:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentAQI()
  }, [selectedCity])

  return (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="w-full md:w-auto">
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    {currentAQI && currentAQI > 100 && (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Poor Air Quality Alert</AlertTitle>
        <AlertDescription>
          The current Air Quality Index (AQI) is {currentAQI}, which is considered unhealthy. Take necessary
          precautions.
        </AlertDescription>
      </Alert>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AirQualityCard city={selectedCity} loading={loading} />
      <AirQualityInsight city={selectedCity} aqi={currentAQI} loading={loading} />
    </div>

    <AirQualityStats city={selectedCity} />

    <Card>
      <CardHeader className="pb-2 flex flex-col md:flex-row justify-between items-start md:items-center">
        <CardTitle>Historical AQI Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="h-[350px]">
          <TabsList>
            <TabsTrigger value="24h">24h</TabsTrigger>
            <TabsTrigger value="7d">7d</TabsTrigger>
            <TabsTrigger value="30d">30d</TabsTrigger>
          </TabsList>

          <TabsContent value="24h" className="h-full">
            <AirQualityChart city={selectedCity} hours={24} />
          </TabsContent>
          <TabsContent value="7d" className="h-full">
            <AirQualityChart city={selectedCity} hours={168} />
          </TabsContent>
          <TabsContent value="30d" className="h-full">
            <AirQualityChart city={selectedCity} hours={720} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  </div>
)

}
