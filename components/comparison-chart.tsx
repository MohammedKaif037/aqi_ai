"use client"

import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"
import { Skeleton } from "@/components/ui/skeleton"
import { getCityLabel } from "@/lib/cities"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface HistoricalData {
  timestamp: string
  aqi: number
}

interface ComparisonChartProps {
  city1: string
  city2: string
  hours: number
}

export function ComparisonChart({ city1, city2, hours }: ComparisonChartProps) {
  const [city1Data, setCity1Data] = useState<HistoricalData[]>([])
  const [city2Data, setCity2Data] = useState<HistoricalData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [city1Response, city2Response] = await Promise.all([
          fetch(`/api/air-quality/historical?city=${city1}&hours=${hours}`),
          fetch(`/api/air-quality/historical?city=${city2}&hours=${hours}`),
        ])

        if (!city1Response.ok || !city2Response.ok) {
          throw new Error("Failed to fetch comparison data")
        }

        const city1Data = await city1Response.json()
        const city2Data = await city2Response.json()

        setCity1Data(city1Data)
        setCity2Data(city2Data)
      } catch (err) {
        console.error("Error fetching comparison data:", err)
        setError("Failed to load comparison data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [city1, city2, hours])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  // Create a merged timeline for both cities
  const mergeTimelines = () => {
    const allTimestamps = [
      ...new Set([...city1Data.map((item) => item.timestamp), ...city2Data.map((item) => item.timestamp)]),
    ].sort()

    return allTimestamps
  }

  const getAQIForTimestamp = (data: HistoricalData[], timestamp: string) => {
    const entry = data.find((item) => item.timestamp === timestamp)
    return entry ? entry.aqi : null
  }

  const chartData = {
    labels: mergeTimelines().map(formatDate),
    datasets: [
      {
        label: getCityLabel(city1),
        data: mergeTimelines().map((timestamp) => getAQIForTimestamp(city1Data, timestamp)),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        tension: 0.2,
      },
      {
        label: getCityLabel(city2),
        data: mergeTimelines().map((timestamp) => getAQIForTimestamp(city2Data, timestamp)),
        borderColor: "rgb(244, 63, 94)",
        backgroundColor: "rgba(244, 63, 94, 0.5)",
        tension: 0.2,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "AQI Value",
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  }

  if (loading) {
    return <Skeleton className="w-full h-full" />
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">{error}</div>
  }

  if (city1Data.length === 0 || city2Data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No historical data available for comparison
      </div>
    )
  }

  return <Line data={chartData} options={options} />
}
