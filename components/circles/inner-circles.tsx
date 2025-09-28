"use client"

import { useState } from "react"
import { AppNavigation } from "@/components/app-navigation"
import { CircleDiscovery } from "./circle-discovery"
import { MyCircles } from "./my-circles"
import { CircleDetails } from "./circle-details"

type CircleView = "discovery" | "my-circles" | "details"

interface Circle {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  minRepScore: number
  monthlyContribution: number
  totalSavings: number
  nextPayout: string
  benefits: string[]
  location: string
  isJoined: boolean
  isPending: boolean
  avatar?: string
  recentActivity: Array<{
    type: "member_joined" | "payout_completed" | "vote_passed" | "contribution_made"
    description: string
    timestamp: string
  }>
}

export function InnerCircles() {
  const [currentView, setCurrentView] = useState<CircleView>("discovery")
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null)

  const handleViewCircle = (circle: Circle) => {
    setSelectedCircle(circle)
    setCurrentView("details")
  }

  const handleBack = () => {
    setCurrentView("discovery")
    setSelectedCircle(null)
  }

  const renderView = () => {
    switch (currentView) {
      case "discovery":
        return (
          <CircleDiscovery onViewCircle={handleViewCircle} onSwitchToMyCircles={() => setCurrentView("my-circles")} />
        )
      case "my-circles":
        return <MyCircles onViewCircle={handleViewCircle} onSwitchToDiscovery={() => setCurrentView("discovery")} />
      case "details":
        return selectedCircle ? <CircleDetails circle={selectedCircle} onBack={handleBack} /> : null
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />

      <div className="pt-20 mobile-safe mobile-safe-bottom">
        <div className="py-6">{renderView()}</div>
      </div>
    </div>
  )
}
