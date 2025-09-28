"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Wallet, Send, ArrowDownLeft, ArrowUpRight, Users, Target } from "lucide-react"

export function WalletInterface() {
  const [activeTab, setActiveTab] = useState("overview")

  const walletBalance = 45250.75
  const repScore = 847
  const savingsGoal = 100000
  const currentSavings = 67500

  const transactions = [
    {
      id: 1,
      type: "received",
      amount: 5000,
      from: "Kemi A.",
      description: "Payment for web design",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "sent",
      amount: 2500,
      to: "Tech Circle Pool",
      description: "Monthly contribution",
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      type: "received",
      amount: 15000,
      from: "Lagos Startup",
      description: "Freelance project payment",
      timestamp: "3 days ago",
      status: "completed",
    },
  ]

  const savingsPools = [
    {
      id: 1,
      name: "Tech Circle Pool",
      members: 12,
      totalPool: 180000,
      myContribution: 15000,
      nextPayout: "March 15",
      position: 3,
      status: "active",
    },
    {
      id: 2,
      name: "Lagos Developers",
      members: 8,
      totalPool: 96000,
      myContribution: 12000,
      nextPayout: "April 2",
      position: 1,
      status: "next",
    },
  ]

  const opportunities = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Fintech Startup",
      amount: 250000,
      repRequired: 800,
      deadline: "5 days",
      applicants: 23,
    },
    {
      id: 2,
      title: "UI/UX Design Project",
      company: "E-commerce Platform",
      amount: 75000,
      repRequired: 650,
      deadline: "2 weeks",
      applicants: 12,
    },
  ]

  return (
    <div className="min-h-screen bg-background p-4 mobile-safe">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground animate-neon-pulse">Financial Hub</h1>
            <p className="text-muted-foreground">Manage your reputation-backed finances</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="neon-glow">
              Rep Score: {repScore}
            </Badge>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="glass-morphism border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <CardTitle className="text-foreground">Total Balance</CardTitle>
              </div>
              <Button size="sm" className="web3-gradient text-primary-foreground">
                <Send className="h-4 w-4 mr-2" />
                Send Money
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-primary animate-neon-pulse">₦{walletBalance.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Available balance</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-accent">₦{currentSavings.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">In Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-secondary">₦12,500</p>
                  <p className="text-xs text-muted-foreground">This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">+15%</p>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass-morphism">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="transactions">History</TabsTrigger>
            <TabsTrigger value="earn">Earn</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Quick Actions */}
            <Card className="glass-morphism border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 border-primary/30 hover:bg-primary/10 bg-transparent"
                  >
                    <Send className="h-5 w-5 text-primary" />
                    <span className="text-xs">Send Money</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 border-accent/30 hover:bg-accent/10 bg-transparent"
                  >
                    <ArrowDownLeft className="h-5 w-5 text-accent" />
                    <span className="text-xs">Request</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 border-secondary/30 hover:bg-secondary/10 bg-transparent"
                  >
                    <Users className="h-5 w-5 text-secondary" />
                    <span className="text-xs">Join Pool</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 border-primary/30 hover:bg-primary/10 bg-transparent"
                  >
                    <Target className="h-5 w-5 text-primary" />
                    <span className="text-xs">Set Goal</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Savings Goal */}
            <Card className="glass-morphism border-accent/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Savings Goal</CardTitle>
                  <Badge variant="outline" className="border-accent text-accent">
                    67.5% Complete
                  </Badge>
                </div>
                <CardDescription>Target: ₦{savingsGoal.toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={67.5} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">₦{currentSavings.toLocaleString()}</span>
                    <span className="text-accent font-medium">
                      ₦{(savingsGoal - currentSavings).toLocaleString()} to go
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings" className="space-y-4">
            <div className="grid gap-4">
              {savingsPools.map((pool) => (
                <Card key={pool.id} className="glass-morphism border-secondary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-foreground">{pool.name}</CardTitle>
                        <CardDescription>{pool.members} members</CardDescription>
                      </div>
                      <Badge
                        variant={pool.status === "next" ? "default" : "secondary"}
                        className={pool.status === "next" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {pool.status === "next" ? "Next Payout" : "Active"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Pool</p>
                          <p className="text-lg font-semibold text-primary">₦{pool.totalPool.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">My Contribution</p>
                          <p className="text-lg font-semibold text-secondary">
                            ₦{pool.myContribution.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Next Payout</p>
                          <p className="font-medium text-accent">{pool.nextPayout}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Position</p>
                          <p className="font-medium text-foreground">#{pool.position}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="glass-morphism border-primary/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.type === "received"
                              ? "bg-accent/20 text-accent"
                              : "bg-secondary/20 text-secondary"
                          }`}
                        >
                          {transaction.type === "received" ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.type === "received" ? `From ${transaction.from}` : `To ${transaction.to}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "received" ? "text-accent" : "text-secondary"
                          }`}
                        >
                          {transaction.type === "received" ? "+" : "-"}₦{transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.timestamp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earn" className="space-y-4">
            <div className="space-y-4">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="glass-morphism border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-foreground">{opportunity.title}</CardTitle>
                        <CardDescription>{opportunity.company}</CardDescription>
                      </div>
                      <Badge
                        variant={repScore >= opportunity.repRequired ? "default" : "secondary"}
                        className={repScore >= opportunity.repRequired ? "bg-accent text-accent-foreground" : ""}
                      >
                        {repScore >= opportunity.repRequired ? "Eligible" : "Rep Required"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Payment</p>
                          <p className="text-lg font-semibold text-primary">₦{opportunity.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rep Required</p>
                          <p className="font-medium text-secondary">{opportunity.repRequired}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-medium text-accent">{opportunity.deadline}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Applicants</p>
                          <p className="font-medium text-foreground">{opportunity.applicants}</p>
                        </div>
                      </div>
                      <Button
                        className="w-full web3-gradient text-primary-foreground"
                        disabled={repScore < opportunity.repRequired}
                      >
                        {repScore >= opportunity.repRequired ? "Apply Now" : "Build More Rep"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
