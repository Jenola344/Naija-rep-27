"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, MapPin, TrendingUp, Search, Star, Lock, Unlock } from "lucide-react"

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

interface CircleDiscoveryProps {
  onViewCircle: (circle: Circle) => void
  onSwitchToMyCircles: () => void
}

const MOCK_CIRCLES: Circle[] = [
  {
    id: "1",
    name: "Lagos Tech Professionals",
    description:
      "Exclusive community for verified tech professionals in Lagos. Monthly savings, networking events, and high-paying gig opportunities.",
    category: "Tech",
    memberCount: 47,
    minRepScore: 800,
    monthlyContribution: 25000,
    totalSavings: 2400000,
    nextPayout: "Dec 15, 2024",
    benefits: ["Monthly Savings Pool", "Exclusive Job Board", "Networking Events", "Skill Workshops"],
    location: "Lagos",
    isJoined: false,
    isPending: false,
    avatar: "/vibrant-city-celebration.png",
    recentActivity: [
      { type: "member_joined", description: "Adebayo Johnson joined the circle", timestamp: "2 hours ago" },
      { type: "payout_completed", description: "Monthly payout of ₦1.2M distributed", timestamp: "1 day ago" },
    ],
  },
  {
    id: "2",
    name: "Creative Entrepreneurs Hub",
    description:
      "For designers, artists, and creative professionals building businesses. Focus on collaborative projects and creative funding.",
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
  {
    id: "3",
    name: "Abuja Business Network",
    description:
      "High-reputation business professionals and entrepreneurs in the capital. Focus on business development and investment opportunities.",
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
  {
    id: "4",
    name: "Women in Tech Lagos",
    description: "Empowering women in technology through mentorship, funding, and career advancement opportunities.",
    category: "Tech",
    memberCount: 38,
    minRepScore: 700,
    monthlyContribution: 20000,
    totalSavings: 1520000,
    nextPayout: "Dec 25, 2024",
    benefits: ["Mentorship Program", "Career Advancement", "Startup Funding", "Leadership Training"],
    location: "Lagos",
    isJoined: false,
    isPending: false,
    avatar: "/nigerian-woman.jpg",
    recentActivity: [
      { type: "member_joined", description: "Funmi Adeyemi joined the circle", timestamp: "4 hours ago" },
    ],
  },
]

const CATEGORIES = ["All", "Tech", "Business", "Creative", "Finance", "Healthcare", "Education"]

export function CircleDiscovery({ onViewCircle, onSwitchToMyCircles }: CircleDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [userRepScore] = useState(750) // Mock user rep score

  const filteredCircles = MOCK_CIRCLES.filter((circle) => {
    const matchesSearch =
      circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circle.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || circle.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const myCirclesCount = MOCK_CIRCLES.filter((c) => c.isJoined).length

  const canJoinCircle = (circle: Circle) => {
    return userRepScore >= circle.minRepScore
  }

  const getStatusBadge = (circle: Circle) => {
    if (circle.isJoined) {
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20">
          <Users className="w-3 h-3 mr-1" />
          Member
        </Badge>
      )
    }
    if (circle.isPending) {
      return (
        <Badge variant="outline" className="border-accent/20 text-accent">
          Pending
        </Badge>
      )
    }
    if (!canJoinCircle(circle)) {
      return (
        <Badge variant="outline" className="border-muted text-muted-foreground">
          <Lock className="w-3 h-3 mr-1" />
          Locked
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="border-primary/20 text-primary">
        <Unlock className="w-3 h-3 mr-1" />
        Available
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Inner Circles</h1>
            <p className="text-muted-foreground">Exclusive communities for high-reputation members</p>
          </div>
          <Button variant="outline" onClick={onSwitchToMyCircles} className="bg-transparent">
            My Circles ({myCirclesCount})
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search circles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* User Rep Status */}
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-medium">Your Rep Score: {userRepScore}</div>
            <div className="text-sm text-muted-foreground">
              {filteredCircles.filter((c) => canJoinCircle(c)).length} circles available to you
            </div>
          </div>
          <Star className="w-8 h-8 text-primary" />
        </div>
      </Card>

      {/* Circles Grid */}
      <div className="space-y-4">
        {filteredCircles.map((circle) => (
          <Card
            key={circle.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              canJoinCircle(circle) ? "hover:border-primary/50" : "opacity-75"
            }`}
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
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {circle.location}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(circle)}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{circle.description}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                <div className="text-center space-y-1">
                  <div className="text-sm font-medium">Min Rep Score</div>
                  <div
                    className={`text-lg font-bold ${canJoinCircle(circle) ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {circle.minRepScore}
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm font-medium">Monthly Pool</div>
                  <div className="text-lg font-bold text-secondary">
                    ₦{(circle.monthlyContribution / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-sm font-medium">Total Savings</div>
                  <div className="text-lg font-bold text-accent">₦{(circle.totalSavings / 1000000).toFixed(1)}M</div>
                </div>
              </div>

              {/* Benefits Preview */}
              <div className="flex flex-wrap gap-1">
                {circle.benefits.slice(0, 3).map((benefit) => (
                  <Badge key={benefit} variant="secondary" className="text-xs">
                    {benefit}
                  </Badge>
                ))}
                {circle.benefits.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{circle.benefits.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Recent Activity */}
              {circle.recentActivity.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
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

      {filteredCircles.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">No circles found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        </div>
      )}
    </div>
  )
}
