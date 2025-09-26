"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Users, Zap, Award, Target } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  earned: boolean
  progress?: number
  maxProgress?: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

export function AchievementBadges() {
  const achievements: Achievement[] = [
    {
      id: "first-vouch",
      title: "First Vouch",
      description: "Received your first vouch",
      icon: Star,
      earned: true,
      rarity: "common",
    },
    {
      id: "network-builder",
      title: "Network Builder",
      description: "Connected with 10 people",
      icon: Users,
      earned: true,
      rarity: "common",
    },
    {
      id: "skill-master",
      title: "Skill Master",
      description: "Verified in 5 different skills",
      icon: Award,
      earned: false,
      progress: 3,
      maxProgress: 5,
      rarity: "rare",
    },
    {
      id: "rep-champion",
      title: "Rep Champion",
      description: "Reached 1000 rep score",
      icon: Trophy,
      earned: false,
      progress: 750,
      maxProgress: 1000,
      rarity: "epic",
    },
    {
      id: "community-leader",
      title: "Community Leader",
      description: "Helped 50 people build rep",
      icon: Zap,
      earned: false,
      progress: 12,
      maxProgress: 50,
      rarity: "legendary",
    },
    {
      id: "inner-circle",
      title: "Inner Circle",
      description: "Joined your first exclusive circle",
      icon: Target,
      earned: false,
      rarity: "rare",
    },
  ]

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "border-gray-400 bg-gray-400/10"
      case "rare":
        return "border-blue-400 bg-blue-400/10"
      case "epic":
        return "border-purple-400 bg-purple-400/10"
      case "legendary":
        return "border-yellow-400 bg-yellow-400/10"
    }
  }

  const earnedAchievements = achievements.filter((a) => a.earned)
  const inProgressAchievements = achievements.filter((a) => !a.earned && a.progress !== undefined)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Achievements</h2>
        <Badge variant="secondary" className="text-xs">
          {earnedAchievements.length}/{achievements.length}
        </Badge>
      </div>

      {/* Earned Achievements */}
      {earnedAchievements.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Earned</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {earnedAchievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <Card
                  key={achievement.id}
                  className={`flex-shrink-0 w-20 h-20 p-3 flex flex-col items-center justify-center space-y-1 ${getRarityColor(achievement.rarity)} border-2`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {achievement.title.split(" ")[0]}
                  </span>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      {inProgressAchievements.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">In Progress</h3>
          <div className="space-y-2">
            {inProgressAchievements.slice(0, 3).map((achievement) => {
              const Icon = achievement.icon
              const progressPercentage =
                achievement.progress && achievement.maxProgress
                  ? (achievement.progress / achievement.maxProgress) * 100
                  : 0

              return (
                <Card key={achievement.id} className="p-4 bg-card border-border">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${getRarityColor(achievement.rarity)} flex items-center justify-center border`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {achievement.progress}/{achievement.maxProgress}
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
