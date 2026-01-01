"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Smile, Meh, Zap, Angry } from "lucide-react"

// Mock data for analytics
const emotionDistribution = [
  { emotion: "Happy", count: 145, color: "oklch(0.65 0.15 250)" },
  { emotion: "Neutral", count: 89, color: "oklch(0.7 0.01 240)" },
  { emotion: "Surprised", count: 45, color: "oklch(0.8 0.1 80)" },
  { emotion: "Sad", count: 32, color: "oklch(0.55 0.1 240)" },
  { emotion: "Angry", count: 12, color: "oklch(0.6 0.18 25)" },
  { emotion: "Disgusted", count: 8, color: "oklch(0.5 0.15 140)" },
  { emotion: "Fearful", count: 15, color: "oklch(0.4 0.2 300)" },
  { emotion: "Contemptuous", count: 5, color: "oklch(0.45 0.1 20)" },
  { emotion: "Confused", count: 22, color: "oklch(0.75 0.12 60)" },
  { emotion: "Excited", count: 38, color: "oklch(0.7 0.2 40)" },
  { emotion: "Bored", count: 18, color: "oklch(0.6 0.05 200)" },
  { emotion: "Calm", count: 55, color: "oklch(0.8 0.08 180)" },
]

const emotionTrend = [
  { time: "09:00", happiness: 65, stress: 30 },
  { time: "10:00", happiness: 75, stress: 25 },
  { time: "11:00", happiness: 45, stress: 55 },
  { time: "12:00", happiness: 85, stress: 15 },
  { time: "13:00", happiness: 70, stress: 20 },
  { time: "14:00", happiness: 55, stress: 40 },
  { time: "15:00", happiness: 60, stress: 35 },
]

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Emotion Analytics</h1>
        <p className="text-muted-foreground">Historical breakdown and trends of detected emotions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Smile className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Emotion</p>
                <p className="text-2xl font-bold">Happy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                <p className="text-2xl font-bold">87.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Meh className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sessions</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <Angry className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Detections</p>
                <p className="text-2xl font-bold">1,248</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Emotion Distribution</CardTitle>
            <CardDescription>Frequency of detected emotions across all sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionDistribution} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.1} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="emotion" type="category" width={100} tick={{ fontSize: 12 }} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="count" fill="var(--color-primary)" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Trends</CardTitle>
            <CardDescription>Daily emotional volatility tracker.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emotionTrend}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} axisLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="happiness"
                    stroke="oklch(0.65 0.15 250)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="stress"
                    stroke="oklch(0.6 0.18 25)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>Performance metrics per emotional category.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {emotionDistribution.map((item) => (
              <div key={item.emotion} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.emotion}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {item.count} hits
                    </Badge>
                  </div>
                  <span className="text-muted-foreground">{Math.round((item.count / 323) * 100)}% of total</span>
                </div>
                <Progress value={(item.count / 150) * 100} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
