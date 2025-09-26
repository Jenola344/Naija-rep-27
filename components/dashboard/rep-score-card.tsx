"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Info, Star, Users, Award } from "lucide-react"

interface RepScoreProps {
  currentScore?: number
  nextMilestone?: number
  trend?: "up" | "down" | "stable"
  recentActivity?: Array<{
    type: "vouch_received" | "vouch_given" | "skill_verified"
    points: number
    description: string
    timestamp: string
  }>
}

export function RepScoreCard({
  currentScore = 750,
  nextMilestone = 1000,
  trend = "up",
  recentActivity = [
    {
      type: "vouch_received",
      points: 25,
      description: "Adebayo vouched for your Tech skills",
      timestamp: "2 hours ago",
    },
    { type: "skill_verified", points: 50, description: "Completed JavaScript certification", timestamp: "1 day ago" },
    { type: "vouch_given", points: 10, description: "Vouched for Chioma's Design skills", timestamp: "2 days ago" },
  ],
}: RepScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const [showBreakdown, setShowBreakdown] = useState(false)

  const progressPercentage = (currentScore / nextMilestone) * 100
  const pointsToNext = nextMilestone - currentScore

  // Animate score on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(currentScore)
    }, 500)
    return () => clearTimeout(timer)
  }, [currentScore])

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getRepLevel = (score: number) => {
    if (score >= 2000) return { level: "Legend", color: "text-purple-500", bg: "bg-purple-500/10" }
    if (score >= 1500) return { level: "Expert", color: "text-blue-500", bg: "bg-blue-500/10" }
    if (score >= 1000) return { level: "Pro", color: "text-primary", bg: "bg-primary/10" }
    if (score >= 500) return { level: "Rising", color: "text-secondary", bg: "bg-secondary/10" }
    return { level: "Starter", color: "text-muted-foreground", bg: "bg-muted" }
  }

  const repLevel = getRepLevel(currentScore)

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card to-card/50 border-border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Your Rep Score</h2>
          <div className="flex items-center gap-2">
            <Badge className={`${repLevel.bg} ${repLevel.color} border-0`}>{repLevel.level}</Badge>
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={`text-sm ${getTrendColor()}`}>
                {trend === "up" ? "+" : trend === "down" ? "-" : ""}
                {trend !== "stable" ? "12" : "0"} this week
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="text-muted-foreground"
        >
          <Info className="w-4 h-4" />
        </Button>
      </div>

      {/* Score Circle */}
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${progressPercentage * 2.827} 282.7`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#008751" />
                <stop offset="100%" stopColor="#FF6B35" />
              </linearGradient>
            </defs>
          </svg>

          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold naija-gradient bg-clip-text text-transparent">
              {animatedScore.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">{pointsToNext} to next level</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Progress to {repLevel.level === "Starter" ? "Rising" : "Expert"}
          </span>
          <span className="font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="naija-gradient h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Breakdown */}
      {showBreakdown && (
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="font-medium">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {activity.type === "vouch_received" && <Users className="w-4 h-4 text-primary" />}
                    {activity.type === "skill_verified" && <Award className="w-4 h-4 text-secondary" />}
                    {activity.type === "vouch_given" && <Star className="w-4 h-4 text-accent" />}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{activity.description}</div>
                    <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-primary">+{activity.points}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
