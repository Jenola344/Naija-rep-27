"use client"

import { RepScoreCard } from "./rep-score-card"
import { QuickActions } from "./quick-actions"
import { ActivityFeed } from "./activity-feed"
import { AchievementBadges } from "./achievement-badges"
import { Navigation } from "@/components/navigation"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 mobile-safe mobile-safe-bottom">
        <div className="space-y-6 py-6">
          {/* Rep Score - Hero Section */}
          <RepScoreCard />

          {/* Quick Actions */}
          <QuickActions />

          {/* Achievement Badges */}
          <AchievementBadges />

          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
