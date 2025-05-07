"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-city">Default City</Label>
                <Select defaultValue="bangalore">
                  <SelectTrigger id="default-city">
                    <SelectValue placeholder="Select default city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refresh-interval">Data Refresh Interval</Label>
                <Select defaultValue="60">
                  <SelectTrigger id="refresh-interval">
                    <SelectValue placeholder="Select refresh interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
                <Switch id="auto-refresh" defaultChecked />
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the application appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    Light
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Dark
                  </Button>
                  <Button variant="default" className="flex-1">
                    System
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chart-color">Chart Color</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="chart-color">
                    <SelectValue placeholder="Select chart color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button>Save Appearance</Button>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About Air Quality Alert</CardTitle>
              <CardDescription>Application information and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Version</h3>
                <p className="text-muted-foreground">1.0.0</p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-muted-foreground">
                  Air Quality Alert is a web application that monitors air quality for selected cities, stores data in
                  Supabase, analyzes it with ChatAnywhere API for health insights, and displays results on a clean
                  Next.js frontend.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Resources</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  <li>OpenWeather Air Pollution API</li>
                  <li>ChatAnywhere API</li>
                  <li>Supabase Database</li>
                  <li>Next.js Framework</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
