"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComparisonChart } from "@/components/comparison-chart"
import { cities, getCityLabel } from "@/lib/cities"

export default function ComparePage() {
  const [city1, setCity1] = useState("bangalore")
  const [city2, setCity2] = useState("delhi")
  const [timeRange, setTimeRange] = useState("24h")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Compare Cities</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select First City</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={city1} onValueChange={setCity1}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value} disabled={city.value === city2}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Second City</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={city2} onValueChange={setCity2}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.value} value={city.value} disabled={city.value === city1}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <CardTitle>
              Comparing {getCityLabel(city1)} and {getCityLabel(city2)}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full h-full">
            <TabsList className="mb-4">
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
            </TabsList>
            <div className="h-[400px]">
              <TabsContent value="24h" className="h-full">
                <ComparisonChart city1={city1} city2={city2} hours={24} />
              </TabsContent>
              <TabsContent value="7d" className="h-full">
                <ComparisonChart city1={city1} city2={city2} hours={168} />
              </TabsContent>
              <TabsContent value="30d" className="h-full">
                <ComparisonChart city1={city1} city2={city2} hours={720} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
