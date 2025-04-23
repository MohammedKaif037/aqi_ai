import { type NextRequest, NextResponse } from "next/server"
import { getHistoricalAirQuality } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city") || "bangalore"
  const hours = Number.parseInt(searchParams.get("hours") || "24", 10)

  try {
    const data = await getHistoricalAirQuality(city, hours)

    // If we don't have data from the database, generate mock data
    if (data.length === 0) {
      const mockData = generateMockHistoricalData(hours)
      return NextResponse.json(mockData)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in historical air quality API:", error)
    return NextResponse.json({ error: "Failed to fetch historical air quality data" }, { status: 500 })
  }
}

function generateMockHistoricalData(hours: number) {
  const data = []
  const now = new Date()

  // Generate data points for the requested number of hours
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000)

    // Generate a somewhat realistic AQI pattern with some randomness
    // Base value between 50-150 with some hourly fluctuation
    const baseAqi = 80 + Math.sin((i / 12) * Math.PI) * 30
    const randomVariation = Math.random() * 20 - 10
    const aqi = Math.round(Math.max(0, baseAqi + randomVariation))

    data.push({
      timestamp: timestamp.toISOString(),
      aqi,
      pm25: Math.round(aqi * 0.4 * 10) / 10,
      pm10: Math.round(aqi * 0.7 * 10) / 10,
    })
  }

  return data
}
