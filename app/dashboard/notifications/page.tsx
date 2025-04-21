"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cities } from "@/lib/cities"
import { NotificationsList } from "@/components/notifications-list"

export default function NotificationsPage() {
  const [email, setEmail] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [threshold, setThreshold] = useState([100])
  const [selectedCities, setSelectedCities] = useState<Record<string, boolean>>(
    cities.reduce((acc, city) => ({ ...acc, [city.value]: true }), {}),
  )

  const handleCityToggle = (city: string) => {
    setSelectedCities((prev) => ({
      ...prev,
      [city]: !prev[city],
    }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save settings to the backend
    console.log({
      email,
      emailNotifications,
      pushNotifications,
      threshold: threshold[0],
      selectedCities,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              {emailNotifications && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label>AQI Alert Threshold: {threshold[0]}</Label>
                <Slider value={threshold} onValueChange={setThreshold} min={50} max={300} step={1} className="mt-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Good (50)</span>
                  <span>Moderate (100)</span>
                  <span>Unhealthy (150)</span>
                  <span>Very Unhealthy (300)</span>
                </div>
              </div>
            </div>

            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cities to Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cities.map((city) => (
                <div key={city.value} className="flex items-center justify-between">
                  <Label htmlFor={`city-${city.value}`}>{city.label}</Label>
                  <Switch
                    id={`city-${city.value}`}
                    checked={selectedCities[city.value]}
                    onCheckedChange={() => handleCityToggle(city.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <NotificationsList />
    </div>
  )
}
