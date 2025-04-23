import { type NextRequest, NextResponse } from "next/server"
import { getCurrentAirQuality } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city") || "bangalore"

  try {
    const data = await getCurrentAirQuality(city)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in current air quality API:", error)
    return NextResponse.json({ error: "Failed to fetch current air quality data" }, { status: 500 })
  }
}
