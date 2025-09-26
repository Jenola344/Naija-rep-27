"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, ArrowLeft, Vote, Wallet } from "lucide-react"

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

interface MyCirclesProps {
  onViewCircle: (circle: Circle) => void
  onSwitchToDiscovery: () => void
}

const MY_CIRCLES: Circle[] = [
  {
    id: "2",
    name: "Creative Entrepreneurs Hub",
    description: "For designers, artists, and creative professionals building businesses.",
    category: "Creative",
    memberCount: 32,
    minRepScore: 600,
    monthlyContribution: 15000,
    totalSavings: 960000,
    nextPayout: "Dec 20, 2024",
    benefits: ["Creative Project Funding", "Portfolio Reviews", "Client Referrals", "Equipment Sharing"],
    location: "Lagos",
    isJoined: true,
    isPending: false,
    avatar: "/helping-hand.jpg",
    recentActivity: [
      {
        type: "vote_passed",
        description: "Approved ₦200K funding for Chioma's design studio",
        timestamp: "3 hours ago",
      },
    ],
  },
]

const PENDING_CIRCLES: Circle[] = [
  {
    id: "3",
    name: "Abuja Business Network",
    description: "High-reputation business professionals and entrepreneurs in the capital.",
    category: "Business",
    memberCount: 28,
    minRepScore: 1000,
    monthlyContribution: 50000,
    totalSavings: 1800000,
    nextPayout: "Dec 10, 2024",
    benefits: ["Investment Opportunities", "Business Mentorship", "Government Contracts", "Capital Access"],
    location: "Abuja",
    isJoined: false,
    isPending: true,
    avatar: "/professional-man.jpg",
    recentActivity: [
      { type: "contribution_made", description: "Ibrahim contributed ₦50K to the pool", timestamp: "1 hour ago" },
    ],
  },
]

export function MyCircles({ onViewCircle, onSwitchToDiscovery }: MyCirclesProps) {
  const totalMonthlyContributions = MY_CIRCLES.reduce((sum, circle) => sum + circle.monthlyContribution, 0)
  const totalSavings = MY_CIRCLES.reduce((sum, circle) => sum + circle.totalSavings, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onSwitchToDiscovery} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">My Circles</h1>
          <p className="text-muted-foreground">Your exclusive communities and savings groups</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Monthly Contributions</span>
          </div>
          <div className="text-2xl font-bold text-primary">₦{(totalMonthlyContributions / 1000).toFixed(0)}K</div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Total Savings</span>
          </div>
          <div className="text-2xl font-bold text-secondary">₦{(totalSavings / 1000000).toFixed(1)}M</div>
        </Card>
      </div>

      {/* Active Circles */}
      {MY_CIRCLES.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Active Memberships ({MY_CIRCLES.length})</h2>

          <div className="space-y-4">
            {MY_CIRCLES.map((circle) => (
              <Card
                key={circle.id}
                className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => onViewCircle(circle)}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={circle.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{circle.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{circle.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {circle.memberCount} members
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {circle.category}
                            </Badge>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">Member</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Contribution Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Monthly Contribution Progress</span>
                      <span className="font-medium">₦{(circle.monthlyContribution / 1000).toFixed(0)}K / month</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-muted-foreground">Next contribution due in 12 days</div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className="text-center space-y-1">
                      <div className="text-xs text-muted-foreground">Next Payout</div>
                      <div className="text-sm font-medium">{circle.nextPayout}</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-xs text-muted-foreground">Pool Size</div>
                      <div className="text-sm font-medium">₦{(circle.totalSavings / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-xs text-muted-foreground">Your Share</div>
                      <div className="text-sm font-medium">
                        ₦{(circle.totalSavings / circle.memberCount / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  {circle.recentActivity.length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Vote className="w-3 h-3" />
                        <span>{circle.recentActivity[0].description}</span>
                        <span>•</span>
                        <span>{circle.recentActivity[0].timestamp}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pending Applications */}
      {PENDING_CIRCLES.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Pending Applications ({PENDING_CIRCLES.length})</h2>

          <div className="space-y-4">
            {PENDING_CIRCLES.map((circle) => (
              <Card key={circle.id} className="p-4 border-accent/20 bg-accent/5">
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={circle.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{circle.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{circle.name}</h3>
                          <div className="text-sm text-muted-foreground">{circle.location}</div>
                        </div>
                        <Badge variant="outline" className="border-accent/20 text-accent">
                          Pending Review
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Your application is being reviewed by current members. You'll be notified within 3-5 business days.
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {MY_CIRCLES.length === 0 && PENDING_CIRCLES.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">No circles yet</h3>
            <p className="text-sm text-muted-foreground">
              Join your first inner circle to start building wealth with your community
            </p>
          </div>
          <Button onClick={onSwitchToDiscovery} className="bg-primary hover:bg-primary/90">
            Discover Circles
          </Button>
        </div>
      )}
    </div>
  )
}
