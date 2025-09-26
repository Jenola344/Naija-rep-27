"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Camera, MapPin, ArrowRight } from "lucide-react"

interface ProfileSetupProps {
  onComplete: (data: { name: string; skills: string[]; location: string; photo: File | null }) => void
}

const SKILL_CATEGORIES = [
  "Tech",
  "Business",
  "Creative",
  "Trades",
  "Academic",
  "Social",
  "Marketing",
  "Design",
  "Writing",
  "Sales",
  "Teaching",
  "Healthcare",
]

const NIGERIAN_CITIES = [
  "Lagos",
  "Abuja",
  "Kano",
  "Ibadan",
  "Port Harcourt",
  "Benin City",
  "Kaduna",
  "Jos",
  "Ilorin",
  "Enugu",
  "Abeokuta",
  "Onitsha",
]

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [name, setName] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(
      (prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill].slice(0, 5)), // Max 5 skills
    )
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onload = (e) => setPhotoPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleComplete = () => {
    if (name && selectedSkills.length > 0 && location) {
      onComplete({ name, skills: selectedSkills, location, photo })
    }
  }

  return (
    <div className="mobile-safe flex-1 py-8">
      <Card className="w-full max-w-2xl mx-auto p-8 space-y-8 bg-card border-border">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Set Up Your Profile</h1>
            <p className="text-muted-foreground">Tell us about yourself so others can vouch for your skills</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <p className="text-sm text-muted-foreground">Tap to add your photo (optional)</p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Your Skills</label>
              <span className="text-xs text-muted-foreground">{selectedSkills.length}/5 selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedSkills.includes(skill) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Select up to 5 skills that best describe you</p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select your city</option>
                {NIGERIAN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Button
          onClick={handleComplete}
          disabled={!name || selectedSkills.length === 0 || !location}
          className="w-full touch-target bg-primary hover:bg-primary/90"
        >
          Continue to Next Step
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    </div>
  )
}
