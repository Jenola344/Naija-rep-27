"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Users,
  MapPin,
  Wallet,
  TrendingUp,
  Vote,
  CheckCircle,
  Clock,
  Star,
  Shield,
  Heart,
} from "lucide-react"

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

interface CircleDetailsProps {
  circle: Circle
  onBack: () => void
}

const MOCK_MEMBERS = [
  { id: "1", name: "Adebayo Johnson", avatar: "/nigerian-man.jpg", repScore: 890, role: "Admin" },
  { id: "2", name: "Chioma Okafor", avatar: "/nigerian-woman.jpg", repScore: 820, role: "Member" },
  { id: "3", name: "Ibrahim Musa", avatar: "/professional-man.jpg", repScore: 950, role: "Treasurer" },
  { id: "4", name: "Funmi Adeyemi", avatar: "/helping-hand.jpg", repScore: 780, role: "Member" },
]

const MOCK_VOTES = [
  {
    id: "1",
    title: "Approve ₦500K emergency fund for Kemi's medical expenses",
    description: "Kemi needs urgent medical treatment. Requesting emergency fund access.",
    status: "active",
    votesFor: 12,
    votesAgainst: 2,
    totalVotes: 14,
    requiredVotes: 16,
    timeLeft: "2 days",
  },
  {
    id: "2",
    title: "Increase monthly contribution to ₦30K starting January",
    description: "Proposal to increase monthly contributions to grow our savings pool faster.",
    status: "passed",
    votesFor: 18,
    votesAgainst: 4,
    totalVotes: 22,
    requiredVotes: 16,
    timeLeft: "Completed",
  },
]

export function CircleDetails({ circle, onBack }: CircleDetailsProps) {
  const [isJoining, setIsJoining] = useState(false)
  const [userRepScore] = useState(750)

  const canJoin = userRepScore >= circle.minRepScore && !circle.isJoined && !circle.isPending

  const handleJoinCircle = async () => {
    setIsJoining(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsJoining(false)
    // In real app, would update circle state
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "member_joined":
        return <Users className="w-4 h-4 text-primary" />
      case "payout_completed":
        return <Wallet className="w-4 h-4 text-secondary" />
      case "vote_passed":
        return <Vote className="w-4 h-4 text-accent" />
      case "contribution_made":
        return <TrendingUp className="w-4 h-4 text-primary" />
      default:
        return <Heart className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{circle.name}</h1>
        </div>
      </div>

      {/* Circle Overview */}
      <Card className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={circle.avatar || "/placeholder.svg"} />
            <AvatarFallback>{circle.name.substring(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{circle.category}</Badge>
                {circle.isJoined && <Badge className="bg-primary/10 text-primary border-primary/20">Member</Badge>}
                {circle.isPending && (
                  <Badge variant="outline" className="border-accent/20 text-accent">
                    Pending
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground">{circle.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {circle.memberCount} members
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {circle.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Min {circle.minRepScore} rep
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center space-y-1">
            <div className="text-sm text-muted-foreground">Monthly Contribution</div>
            <div className="text-xl font-bold text-primary">₦{(circle.monthlyContribution / 1000).toFixed(0)}K</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm text-muted-foreground">Total Savings</div>
            <div className="text-xl font-bold text-secondary">₦{(circle.totalSavings / 1000000).toFixed(1)}M</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm text-muted-foreground">Next Payout</div>
            <div className="text-xl font-bold text-accent">{circle.nextPayout.split(",")[0]}</div>
          </div>
        </div>

        {/* Join Button */}
        {!circle.isJoined && !circle.isPending && (
          <div className="space-y-3">
            {canJoin ? (
              <Button
                onClick={handleJoinCircle}
                disabled={isJoining}
                className="w-full touch-target bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isJoining ? "Joining..." : `Join Circle - ₦${(circle.monthlyContribution / 1000).toFixed(0)}K/month`}
              </Button>
            ) : (
              <div className="text-center space-y-2">
                <Button disabled className="w-full touch-target" size="lg">
                  <Shield className="w-4 h-4 mr-2" />
                  Requires {circle.minRepScore} Rep Score
                </Button>
                <div className="text-sm text-muted-foreground">
                  Your current rep score: {userRepScore}. Need {circle.minRepScore - userRepScore} more points.
                </div>
              </div>
            )}
          </div>
        )}

        {circle.isPending && (
          <Card className="p-4 bg-accent/10 border-accent/20">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent" />
              <div className="space-y-1">
                <div className="font-medium text-accent-foreground">Application Under Review</div>
                <div className="text-sm text-accent-foreground">
                  Current members are reviewing your application. You'll be notified within 3-5 business days.
                </div>
              </div>
            </div>
          </Card>
        )}
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="benefits" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="voting">Voting</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="benefits" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Circle Benefits</h3>
            <div className="space-y-3">
              {circle.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Members ({MOCK_MEMBERS.length})</h3>
            <div className="space-y-3">
              {MOCK_MEMBERS.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">Rep Score: {member.repScore}</div>
                    </div>
                  </div>
                  <Badge variant={member.role === "Admin" ? "default" : "secondary"} className="text-xs">
                    {member.role}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="voting" className="space-y-4">
          {MOCK_VOTES.map((vote) => (
            <Card key={vote.id} className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{vote.title}</h4>
                    <Badge variant={vote.status === "active" ? "default" : "secondary"} className="text-xs">
                      {vote.status === "active" ? "Active" : "Passed"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{vote.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {vote.votesFor} Yes, {vote.votesAgainst} No
                    </span>
                    <span>
                      {vote.totalVotes}/{vote.requiredVotes} votes
                    </span>
                  </div>
                  <Progress value={(vote.totalVotes / vote.requiredVotes) * 100} className="h-2" />
                  <div className="text-xs text-muted-foreground">Time left: {vote.timeLeft}</div>
                </div>

                {vote.status === "active" && circle.isJoined && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      Vote Yes
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      Vote No
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          {circle.recentActivity.map((activity, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <div className="text-sm">{activity.description}</div>
                  <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
