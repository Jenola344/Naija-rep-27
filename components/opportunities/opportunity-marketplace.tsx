"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppNavigation } from "@/components/app-navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  MapPin,
  Clock,
  Users,
  Star,
  Briefcase,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Heart,
  Share2,
} from "lucide-react"

interface Opportunity {
  id: string
  title: string
  company: string
  companyLogo?: string
  type: "full-time" | "part-time" | "contract" | "gig" | "internship"
  category: string
  description: string
  requirements: string[]
  skills: string[]
  location: string
  isRemote: boolean
  salary: {
    min: number
    max: number
    currency: string
    period: "hourly" | "monthly" | "yearly" | "project"
  }
  repRequired: number
  deadline: string
  applicants: number
  maxApplicants?: number
  postedBy: {
    name: string
    avatar?: string
    repScore: number
    verified: boolean
  }
  postedAt: string
  featured: boolean
  urgent: boolean
  tags: string[]
  benefits?: string[]
}

export function OpportunityMarketplace() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const userRepScore = 847

  const opportunities: Opportunity[] = [
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechFlow Nigeria",
      companyLogo: "/tech-company-logo.jpg",
      type: "full-time",
      category: "Technology",
      description:
        "We are looking for an experienced React developer to join our growing team. You will be responsible for building scalable web applications and mentoring junior developers.",
      requirements: [
        "5+ years of React experience",
        "Strong TypeScript skills",
        "Experience with Next.js",
        "Knowledge of state management (Redux/Zustand)",
        "Experience with testing frameworks",
      ],
      skills: ["React", "TypeScript", "Next.js", "Redux", "Jest"],
      location: "Lagos",
      isRemote: true,
      salary: {
        min: 300000,
        max: 500000,
        currency: "NGN",
        period: "monthly",
      },
      repRequired: 800,
      deadline: "2024-02-15",
      applicants: 23,
      maxApplicants: 50,
      postedBy: {
        name: "Sarah Okafor",
        avatar: "/professional-woman-diverse.png",
        repScore: 920,
        verified: true,
      },
      postedAt: "2024-01-15",
      featured: true,
      urgent: false,
      tags: ["High Growth", "Equity Options", "Remote First"],
      benefits: ["Health Insurance", "Learning Budget", "Flexible Hours"],
    },
    {
      id: "2",
      title: "UI/UX Design for E-commerce App",
      company: "ShopNaija",
      type: "contract",
      category: "Design",
      description:
        "Design a complete mobile app interface for our e-commerce platform. This is a 3-month contract with potential for extension.",
      requirements: [
        "Portfolio of mobile app designs",
        "Experience with e-commerce UX",
        "Proficiency in Figma",
        "Understanding of Nigerian market",
      ],
      skills: ["UI/UX Design", "Figma", "Mobile Design", "E-commerce"],
      location: "Abuja",
      isRemote: true,
      salary: {
        min: 150000,
        max: 200000,
        currency: "NGN",
        period: "project",
      },
      repRequired: 650,
      deadline: "2024-01-30",
      applicants: 12,
      postedBy: {
        name: "David Adebayo",
        repScore: 780,
        verified: true,
      },
      postedAt: "2024-01-10",
      featured: false,
      urgent: true,
      tags: ["Quick Start", "Portfolio Builder"],
    },
    {
      id: "3",
      title: "Content Writer - Tech Blog",
      company: "NaijaCode",
      type: "part-time",
      category: "Content",
      description:
        "Write engaging technical articles for our developer blog. Topics include web development, mobile apps, and emerging technologies.",
      requirements: [
        "Strong writing skills",
        "Technical background",
        "SEO knowledge",
        "Ability to explain complex topics simply",
      ],
      skills: ["Technical Writing", "SEO", "Content Strategy", "Research"],
      location: "Remote",
      isRemote: true,
      salary: {
        min: 15000,
        max: 25000,
        currency: "NGN",
        period: "monthly",
      },
      repRequired: 500,
      deadline: "2024-02-01",
      applicants: 8,
      postedBy: {
        name: "Kemi Johnson",
        repScore: 690,
        verified: false,
      },
      postedAt: "2024-01-12",
      featured: false,
      urgent: false,
      tags: ["Flexible", "Remote"],
    },
    {
      id: "4",
      title: "Mobile App Development - Fintech",
      company: "PayFlow",
      type: "contract",
      category: "Technology",
      description:
        "Build a React Native app for our fintech platform. Must have experience with payment integrations and security best practices.",
      requirements: [
        "React Native expertise",
        "Payment gateway integration",
        "Security best practices",
        "App store deployment experience",
      ],
      skills: ["React Native", "Payment Integration", "Security", "Mobile Development"],
      location: "Lagos",
      isRemote: false,
      salary: {
        min: 400000,
        max: 600000,
        currency: "NGN",
        period: "project",
      },
      repRequired: 850,
      deadline: "2024-01-25",
      applicants: 31,
      maxApplicants: 40,
      postedBy: {
        name: "Ahmed Musa",
        repScore: 950,
        verified: true,
      },
      postedAt: "2024-01-08",
      featured: true,
      urgent: true,
      tags: ["Fintech", "High Pay", "Urgent"],
    },
  ]

  const categories = ["all", "Technology", "Design", "Content", "Marketing", "Finance", "Operations"]
  const types = ["all", "full-time", "part-time", "contract", "gig", "internship"]

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || opp.category === selectedCategory
    const matchesType = selectedType === "all" || opp.type === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      case "salary":
        return b.salary.max - a.salary.max
      case "rep":
        return a.repRequired - b.repRequired
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      default:
        return 0
    }
  })

  const formatSalary = (salary: Opportunity["salary"]) => {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: salary.currency,
      minimumFractionDigits: 0,
    })

    if (salary.min === salary.max) {
      return `${formatter.format(salary.min)}/${salary.period}`
    }
    return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}/${salary.period}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-primary text-primary-foreground"
      case "part-time":
        return "bg-secondary text-secondary-foreground"
      case "contract":
        return "bg-accent text-accent-foreground"
      case "gig":
        return "bg-muted text-muted-foreground"
      case "internship":
        return "bg-destructive/20 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />

      <div className="pt-20 mobile-safe mobile-safe-bottom">
        <div className="max-w-6xl mx-auto space-y-6 py-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground animate-neon-pulse">Opportunity Marketplace</h1>
                <p className="text-muted-foreground">Discover reputation-based opportunities</p>
              </div>
              <Badge variant="secondary" className="neon-glow">
                Your Rep: {userRepScore}
              </Badge>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-morphism border-primary/20"
                />
              </div>

              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 glass-morphism border-primary/20">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32 glass-morphism border-primary/20">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 glass-morphism border-primary/20">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="salary">Highest Pay</SelectItem>
                    <SelectItem value="rep">Lowest Rep</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass-morphism">
              <TabsTrigger value="browse">Browse ({sortedOpportunities.length})</TabsTrigger>
              <TabsTrigger value="applied">Applied</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="recommended">For You</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4">
              {/* Featured Opportunities */}
              {sortedOpportunities.some((opp) => opp.featured) && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Star className="h-5 w-5 text-accent" />
                    Featured Opportunities
                  </h2>
                  <div className="grid gap-4">
                    {sortedOpportunities
                      .filter((opp) => opp.featured)
                      .map((opportunity) => (
                        <Card key={opportunity.id} className="glass-morphism border-accent/30 relative overflow-hidden">
                          {opportunity.urgent && (
                            <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-3 py-1 text-xs font-medium">
                              URGENT
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                {opportunity.companyLogo && (
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage
                                      src={opportunity.companyLogo || "/placeholder.svg"}
                                      alt={opportunity.company}
                                    />
                                    <AvatarFallback>{opportunity.company.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                )}
                                <div>
                                  <CardTitle className="text-foreground">{opportunity.title}</CardTitle>
                                  <CardDescription className="flex items-center gap-2">
                                    <span>{opportunity.company}</span>
                                    {opportunity.postedBy.verified && <CheckCircle className="h-4 w-4 text-accent" />}
                                  </CardDescription>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <p className="text-muted-foreground text-sm line-clamp-2">{opportunity.description}</p>

                              <div className="flex flex-wrap gap-2">
                                <Badge className={getTypeColor(opportunity.type)}>{opportunity.type}</Badge>
                                {opportunity.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="border-primary/30">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-accent" />
                                  <span className="text-foreground font-medium">
                                    {formatSalary(opportunity.salary)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">
                                    {opportunity.isRemote ? "Remote" : opportunity.location}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-secondary" />
                                  <span className="text-muted-foreground">Rep: {opportunity.repRequired}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">{opportunity.applicants} applicants</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                                </div>
                                <Button
                                  className="web3-gradient text-primary-foreground"
                                  disabled={userRepScore < opportunity.repRequired}
                                >
                                  {userRepScore >= opportunity.repRequired ? "Apply Now" : "Rep Too Low"}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              )}

              {/* All Opportunities */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">All Opportunities</h2>
                <div className="grid gap-4">
                  {sortedOpportunities
                    .filter((opp) => !opp.featured)
                    .map((opportunity) => (
                      <Card
                        key={opportunity.id}
                        className="glass-morphism border-primary/20 hover:border-primary/40 transition-colors"
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-foreground">{opportunity.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <span>{opportunity.company}</span>
                                {opportunity.postedBy.verified && <CheckCircle className="h-4 w-4 text-accent" />}
                              </CardDescription>
                            </div>
                            <Badge className={getTypeColor(opportunity.type)}>{opportunity.type}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p className="text-muted-foreground text-sm line-clamp-2">{opportunity.description}</p>

                            <div className="flex flex-wrap gap-1">
                              {opportunity.skills.slice(0, 4).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {opportunity.skills.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{opportunity.skills.length - 4} more
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-accent font-medium">{formatSalary(opportunity.salary)}</span>
                                <span className="text-muted-foreground">Rep: {opportunity.repRequired}</span>
                                <span className="text-muted-foreground">{opportunity.applicants} applicants</span>
                              </div>
                              <Button
                                size="sm"
                                variant={userRepScore >= opportunity.repRequired ? "default" : "secondary"}
                                disabled={userRepScore < opportunity.repRequired}
                              >
                                {userRepScore >= opportunity.repRequired ? "Apply" : "Build Rep"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applied" className="space-y-4">
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start applying to opportunities that match your reputation score
                </p>
                <Button onClick={() => setActiveTab("browse")} className="web3-gradient text-primary-foreground">
                  Browse Opportunities
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="saved" className="space-y-4">
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Saved Opportunities</h3>
                <p className="text-muted-foreground mb-4">Save opportunities you're interested in for later</p>
                <Button onClick={() => setActiveTab("browse")} className="web3-gradient text-primary-foreground">
                  Browse Opportunities
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="space-y-4">
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Building Your Recommendations</h3>
                <p className="text-muted-foreground mb-4">
                  Complete more vouches and build your reputation to get personalized recommendations
                </p>
                <Button onClick={() => setActiveTab("browse")} className="web3-gradient text-primary-foreground">
                  Browse All Opportunities
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
