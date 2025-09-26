"use client"
import { Card } from "@/components/ui/card"
import { Heart, Users, Briefcase, Plus } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      icon: Heart,
      label: "Get Vouched",
      description: "Ask friends to vouch",
      color: "bg-primary/10 text-primary",
      href: "/vouch",
    },
    {
      icon: Users,
      label: "Vouch Someone",
      description: "Vouch for a friend",
      color: "bg-secondary/10 text-secondary",
      href: "/vouch",
    },
    {
      icon: Briefcase,
      label: "Find Opportunities",
      description: "Browse available gigs",
      color: "bg-accent/10 text-accent",
      href: "/opportunities",
    },
    {
      icon: Plus,
      label: "Add Skills",
      description: "Update your profile",
      color: "bg-muted text-muted-foreground",
      href: "/profile",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Link key={index} href={action.href}>
              <Card className="p-4 cursor-pointer hover:border-primary/50 transition-colors bg-card border-border h-full">
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
