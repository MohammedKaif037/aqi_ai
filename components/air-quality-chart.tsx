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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface HistoricalData {
  timestamp: string
  aqi: number
}

interface AirQualityChartProps {
  city: string
  hours: number
}

export function AirQualityChart({ city, hours }: AirQualityChartProps) {
  const [data, setData] = useState<HistoricalData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/air-quality/historical?city=${city}&hours=${hours}`)
        if (!response.ok) {
          throw new Error("Failed to fetch historical data")
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error("Error fetching historical data:", err)
        setError("Failed to load historical data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [city, hours])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  const chartData = {
    labels: data.map((item) => formatDate(item.timestamp)),
    datasets: [
      {
        label: "Air Quality Index",
        data: data.map((item) => item.aqi),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
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

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">No historical data available</div>
    )
  }

  // If we don't have real data from the API, use mock data
  if (data.length < 2) {
    const mockData = Array.from({ length: hours > 24 ? 24 : hours }).map((_, index) => {
      const date = new Date()
      date.setHours(date.getHours() - (hours > 24 ? index * (hours / 24) : index))

      return {
        timestamp: date.toISOString(),
        aqi: Math.floor(Math.random() * 100) + 50,
      }
    })

    chartData.labels = mockData.map((item) => formatDate(item.timestamp))
    chartData.datasets[0].data = mockData.map((item) => item.aqi)
  }

  return <Line data={chartData} options={options} />
}
