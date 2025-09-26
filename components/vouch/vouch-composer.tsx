"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Camera, Heart, Send, Globe, Lock } from "lucide-react"

interface VouchComposerProps {
  onComplete: (data: { message: string; evidence?: File[]; isPublic: boolean }) => void
  onBack: () => void
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
}

const SAMPLE_MESSAGES = [
  "I've worked with {name} on multiple projects and can confidently vouch for their {skill} skills. They consistently deliver high-quality work and are reliable.",
  "{name} is one of the most skilled {skill} professionals I know. Their attention to detail and problem-solving abilities are exceptional.",
  "I highly recommend {name} for their {skill} expertise. They've helped me solve complex challenges and always go above and beyond.",
  "Having collaborated with {name} for over a year, I can attest to their outstanding {skill} abilities and professional work ethic.",
]

export function VouchComposer({ onComplete, onBack, vouchData }: VouchComposerProps) {
  const [message, setMessage] = useState(vouchData.message)
  const [isPublic, setIsPublic] = useState(vouchData.isPublic)
  const [evidence, setEvidence] = useState<File[]>(vouchData.evidence || [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEvidenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setEvidence((prev) => [...prev, ...files].slice(0, 3)) // Max 3 files
  }

  const removeEvidence = (index: number) => {
    setEvidence((prev) => prev.filter((_, i) => i !== index))
  }

  const useSampleMessage = useCallback(
    (template: string) => {
      const primarySkill = vouchData.skills[0] || "professional"
      const filledMessage = template.replace(/{name}/g, vouchData.contact?.name || "").replace(/{skill}/g, primarySkill)
      setMessage(filledMessage)
    },
    [vouchData.contact?.name, vouchData.skills],
  )

  const handleSubmit = async () => {
    if (!message.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    onComplete({ message, evidence, isPublic })
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Write your vouch</h1>
        <p className="text-muted-foreground">Share why you're vouching for {vouchData.contact?.name}</p>
      </div>

      {/* Vouch Preview */}
      <Card className="p-4 space-y-4">
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
          <Heart className="w-5 h-5 text-primary" />
        </div>
      </Card>

      {/* Message Composer */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your vouch message</label>
          <Textarea
            placeholder={`Write why you're vouching for ${vouchData.contact?.name}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="text-xs text-muted-foreground text-right">{message.length}/500 characters</div>
        </div>

        {/* Sample Messages */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Need inspiration? Try these templates:</label>
          <div className="space-y-2">
            {SAMPLE_MESSAGES.slice(0, 2).map((template, index) => (
              <Card
                key={index}
                className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => useSampleMessage(template)}
              >
                <div className="text-sm text-muted-foreground">
                  {template
                    .replace(/{name}/g, vouchData.contact?.name || "")
                    .replace(/{skill}/g, vouchData.skills[0] || "professional")}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence Upload */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Add evidence (optional)</label>
        <div className="flex gap-2">
          <label className="flex-1">
            <input type="file" accept="image/*,video/*" multiple onChange={handleEvidenceUpload} className="hidden" />
            <Card className="p-4 border-dashed border-border cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Camera className="w-4 h-4" />
                <span className="text-sm">Add photos/videos</span>
              </div>
            </Card>
          </label>
        </div>

        {evidence.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {evidence.map((file, index) => (
              <div key={index} className="relative flex-shrink-0">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-muted-foreground" />
                </div>
                <button
                  onClick={() => removeEvidence(index)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Settings */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span className="font-medium">{isPublic ? "Public vouch" : "Private vouch"}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {isPublic
                ? "Visible to everyone and helps build community trust"
                : "Only visible to you and the person you're vouching for"}
            </div>
          </div>
          <Switch checked={isPublic} onCheckedChange={setIsPublic} />
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 touch-target bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={!message.trim() || isSubmitting}
          className="flex-1 touch-target bg-primary hover:bg-primary/90"
        >
          {isSubmitting ? "Sending..." : "Send Vouch"}
          <Send className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
