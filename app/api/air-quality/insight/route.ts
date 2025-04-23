import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city") || "bangalore"
  const aqi = Number.parseInt(searchParams.get("aqi") || "0", 10)

  try {
    // In a real app, we would call the AI service here
    // const insight = await generateAIInsight(city, aqi)

    // For now, generate a mock insight based on AQI
    const insight = getMockInsight(city, aqi)

    return NextResponse.json({ insight })
  } catch (error) {
    console.error("Error generating insight:", error)
    return NextResponse.json({ error: "Failed to generate health insight" }, { status: 500 })
  }
}

function getMockInsight(city: string, aqi: number): string {
  // Get city name from value
  const cityName = city.charAt(0).toUpperCase() + city.slice(1)

  if (aqi <= 50) {
    return `The air quality in ${cityName} is good with an AQI of ${aqi}. It's a great day for outdoor activities. Enjoy the fresh air and consider walking or cycling instead of driving to help maintain good air quality.`
  } else if (aqi <= 100) {
    return `Air quality in ${cityName} is moderate (AQI: ${aqi}). Most people can continue outdoor activities, but those with respiratory issues like asthma should consider limiting prolonged outdoor exertion. Stay hydrated and take breaks if needed.`
  } else if (aqi <= 150) {
    return `${cityName}'s air quality is unhealthy for sensitive groups (AQI: ${aqi}). People with respiratory or heart conditions, the elderly, and children should limit prolonged outdoor activities. Consider wearing a mask if you need to be outside for extended periods. Keep windows closed during peak pollution hours.`
  } else if (aqi <= 200) {
    return `Air quality in ${cityName} is unhealthy (AQI: ${aqi}). Everyone may begin to experience health effects. Sensitive groups should avoid outdoor physical activities. Consider using air purifiers indoors and keep windows closed. If you must go outside, wear a proper mask and limit your exposure time.`
  } else if (aqi <= 300) {
    return `${cityName} is experiencing very unhealthy air quality (AQI: ${aqi}). Health warnings of emergency conditions. Everyone should avoid outdoor activities. Use air purifiers indoors, wear masks when going outside, and consider staying indoors as much as possible. Check on elderly neighbors and those with respiratory conditions.`
  } else {
    return `HEALTH ALERT: Air quality in ${cityName} is hazardous (AQI: ${aqi}). Everyone may experience more serious health effects. Avoid all outdoor physical activities. Stay indoors with windows closed and use air purifiers. Wear N95 masks if you must go outside. Consider temporarily relocating if possible, especially for vulnerable individuals.`
  }
}
