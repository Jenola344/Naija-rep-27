"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Users, Award, Briefcase, TrendingUp } from "lucide-react"

interface ActivityItem {
  id: string
  type:
    | "vouch_received"
    | "vouch_given"
    | "skill_verified"
    | "opportunity_applied"
    | "milestone_reached"
    | "inner_circle_joined"
  user: {
    name: string
    avatar?: string
    location: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
  metadata?: {
    skill?: string
    opportunity?: string
    milestone?: string
    circle?: string
  }
}

export function ActivityFeed() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "vouch_received",
      user: {
        name: "Adebayo Johnson",
        avatar: "/nigerian-man.jpg",
        location: "Lagos",
      },
      content:
        'vouched for your JavaScript skills! "Ade is one of the best developers I know. His React skills are top-notch."',
      timestamp: "2 hours ago",
      likes: 12,
      comments: 3,
      isLiked: false,
      metadata: { skill: "JavaScript" },
    },
    {
      id: "2",
      type: "milestone_reached",
      user: {
        name: "You",
        avatar: "/vibrant-city-celebration.png",
        location: "Lagos",
      },
      content: "reached 750 Rep Score! 🎉 You're now in the top 25% of users in Lagos.",
      timestamp: "1 day ago",
      likes: 28,
      comments: 8,
      isLiked: true,
      metadata: { milestone: "750 Rep Score" },
    },
    {
      id: "3",
      type: "vouch_given",
      user: {
        name: "You",
        avatar: "/helping-hand.jpg",
        location: "Lagos",
      },
      content:
        'vouched for Chioma Okafor\'s UI/UX Design skills. "Chioma creates beautiful, user-friendly designs that convert."',
      timestamp: "2 days ago",
      likes: 15,
      comments: 2,
      isLiked: false,
      metadata: { skill: "UI/UX Design" },
    },
    {
      id: "4",
      type: "opportunity_applied",
      user: {
        name: "Ibrahim Musa",
        avatar: "/professional-man.jpg",
        location: "Abuja",
      },
      content: "applied for Senior Frontend Developer at TechCorp Nigeria. Rep Score: 890 ⭐",
      timestamp: "3 days ago",
      likes: 6,
      comments: 1,
      isLiked: false,
      metadata: { opportunity: "Senior Frontend Developer" },
    },
    {
      id: "5",
      type: "inner_circle_joined",
      user: {
        name: "Funmi Adeyemi",
        avatar: "/nigerian-woman.jpg",
        location: "Lagos",
      },
      content: "joined the Lagos Tech Professionals Inner Circle! Welcome to the exclusive community.",
      timestamp: "1 week ago",
      likes: 22,
      comments: 5,
      isLiked: true,
      metadata: { circle: "Lagos Tech Professionals" },
    },
  ]

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "vouch_received":
      case "vouch_given":
        return <Heart className="w-4 h-4 text-primary" />
      case "skill_verified":
        return <Award className="w-4 h-4 text-secondary" />
      case "opportunity_applied":
        return <Briefcase className="w-4 h-4 text-accent" />
      case "milestone_reached":
        return <TrendingUp className="w-4 h-4 text-primary" />
      case "inner_circle_joined":
        return <Users className="w-4 h-4 text-purple-500" />
      default:
        return <Heart className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "vouch_received":
      case "vouch_given":
        return "border-l-primary"
      case "skill_verified":
        return "border-l-secondary"
      case "opportunity_applied":
        return "border-l-accent"
      case "milestone_reached":
        return "border-l-primary"
      case "inner_circle_joined":
        return "border-l-purple-500"
      default:
        return "border-l-muted"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Activity Feed</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className={`p-4 border-l-4 ${getActivityColor(activity.type)} bg-card border-border`}>
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {activity.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.user.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.user.location}
                    </Badge>
                    <div className="flex items-center gap-1">{getActivityIcon(activity.type)}</div>
                  </div>

                  <p className="text-sm text-muted-foreground">{activity.content}</p>

                  <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                </div>
              </div>

              {/* Metadata */}
              {activity.metadata && (
                <div className="flex gap-2">
                  {activity.metadata.skill && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.metadata.skill}
                    </Badge>
                  )}
                  {activity.metadata.opportunity && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.metadata.opportunity}
                    </Badge>
                  )}
                  {activity.metadata.milestone && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.metadata.milestone}
                    </Badge>
                  )}
                  {activity.metadata.circle && (
                    <Badge variant="secondary" className="text-xs">
                      {activity.metadata.circle}
                    </Badge>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-xs ${activity.isLiked ? "text-primary" : "text-muted-foreground"}`}
                >
                  <Heart className={`w-4 h-4 mr-1 ${activity.isLiked ? "fill-current" : ""}`} />
                  {activity.likes}
                </Button>

                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {activity.comments}
                </Button>

                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
