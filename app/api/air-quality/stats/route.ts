import { type NextRequest, NextResponse } from "next/server"
import { getHistoricalAirQuality } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city") || "bangalore"
  const hours = Number.parseInt(searchParams.get("hours") || "24", 10)

  try {
    const data = await getHistoricalAirQuality(city, hours)

    if (data.length === 0) {
      return NextResponse.json({
        avgAqi: 0,
        maxAqi: 0,
        minAqi: 0,
        trend: "stable",
        percentChange: 0,
      })
    }

    // Calculate statistics
    const aqiValues = data.map((item) => item.aqi)
    const avgAqi = Math.round(aqiValues.reduce((sum, val) => sum + val, 0) / aqiValues.length)
    const maxAqi = Math.max(...aqiValues)
    const minAqi = Math.min(...aqiValues)

    // Calculate trend (comparing first and last values)
    const firstValue = data[0].aqi
    const lastValue = data[data.length - 1].aqi
    const difference = lastValue - firstValue
    const percentChange = firstValue > 0 ? Math.abs((difference / firstValue) * 100) : 0
    const trend = difference > 0 ? "up" : difference < 0 ? "down" : "stable"

    return NextResponse.json({
      avgAqi,
      maxAqi,
      minAqi,
      trend,
      percentChange: Math.round(percentChange * 10) / 10,
    })
  } catch (error) {
    console.error("Error in air quality stats API:", error)
    return NextResponse.json({ error: "Failed to fetch air quality statistics" }, { status: 500 })
  }
}
