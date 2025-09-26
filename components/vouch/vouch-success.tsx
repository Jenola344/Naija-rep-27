"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, MessageCircle, Plus, Home, Trophy } from "lucide-react"
import Link from "next/link"

interface VouchSuccessProps {
  vouchData: {
    contact: {
      id: string
      name: string
      phone: string
      avatar?: string
    } | null
    skills: string[]
    message: string
    evidence?: File[]
    isPublic: boolean
  }
  onNewVouch: () => void
}

export function VouchSuccess({ vouchData, onNewVouch }: VouchSuccessProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "I just vouched for someone on Naija Rep!",
        text: `I vouched for ${vouchData.contact?.name}'s skills on Naija Rep. Building trust in our community! 🇳🇬`,
        url: window.location.origin,
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(
        `I just vouched for ${vouchData.contact?.name} on Naija Rep! Join us in building trust in our community. ${window.location.origin}`,
      )
    }
  }

  return (
    <div className="space-y-6 text-center">
      {/* Success Animation */}
      <div className="space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse-naija">
          <Heart className="w-10 h-10 text-primary fill-current" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Vouch Sent Successfully!</h1>
          <p className="text-muted-foreground">
            {vouchData.contact?.name} has been notified and will receive reputation points
          </p>
        </div>
      </div>

      {/* Vouch Preview */}
      <Card className="p-4 space-y-4 text-left">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={vouchData.contact?.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {vouchData.contact?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{vouchData.contact?.name}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {vouchData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <Heart className="w-5 h-5 text-primary fill-current" />
        </div>

        <div className="text-sm text-muted-foreground">{vouchData.message}</div>

        <div className="flex items-center gap-4 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" className="text-xs">
            <Heart className="w-4 h-4 mr-1" />
            12
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <MessageCircle className="w-4 h-4 mr-1" />3
          </Button>
          <Button variant="ghost" size="sm" className="text-xs" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </Card>

      {/* Impact Stats */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2 justify-center">
          <Trophy className="w-5 h-5 text-accent" />
          <span className="font-medium">Your Impact</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">+25</div>
            <div className="text-xs text-muted-foreground">Rep Points Given</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-secondary">+10</div>
            <div className="text-xs text-muted-foreground">Your Rep Boost</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-accent">47</div>
            <div className="text-xs text-muted-foreground">Total Vouches</div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <div className="space-y-4">
        <h3 className="font-medium">What's next?</h3>

        <div className="grid grid-cols-1 gap-3">
          <Button onClick={onNewVouch} className="touch-target bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Vouch for Someone Else
          </Button>

          <Link href="/dashboard">
            <Button variant="outline" className="w-full touch-target bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Social Sharing */}
      <Card className="p-4 bg-accent/10 border-accent/20">
        <div className="space-y-3">
          <div className="font-medium text-accent-foreground">Spread the Word!</div>
          <div className="text-sm text-accent-foreground">
            Share your vouch on social media to help build trust in the Nigerian community
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="w-full border-accent/20 hover:bg-accent/20 bg-transparent"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share on Social Media
          </Button>
        </div>
      </Card>
    </div>
  )
}
