"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    city: "Delhi",
    aqi: 185,
    message: "Unhealthy air quality detected in Delhi",
    timestamp: "2023-06-15T08:30:00Z",
    read: false,
  },
  {
    id: "2",
    city: "Bangalore",
    aqi: 120,
    message: "Moderate air quality in Bangalore",
    timestamp: "2023-06-14T14:45:00Z",
    read: true,
  },
  {
    id: "3",
    city: "Mumbai",
    aqi: 160,
    message: "Unhealthy air quality detected in Mumbai",
    timestamp: "2023-06-13T11:15:00Z",
    read: true,
  },
]

export function NotificationsList() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Notifications</CardTitle>
        {notifications.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No notifications to display</div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start justify-between p-4 rounded-lg border ${
                  notification.read ? "bg-background" : "bg-muted"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{notification.city}</span>
                    <Badge variant={notification.aqi > 150 ? "destructive" : "outline"}>AQI {notification.aqi}</Badge>
                    {!notification.read && (
                      <Badge variant="default" className="bg-primary">
                        New
                      </Badge>
                    )}
                  </div>
                  <p>{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(notification.timestamp)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      Mark as read
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
