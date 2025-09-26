"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"

interface SkillSelectorProps {
  onComplete: (skills: string[]) => void
  onBack: () => void
  selectedSkills: string[]
  contactName: string
}

const SKILL_CATEGORIES = {
  Tech: ["JavaScript", "Python", "React", "Node.js", "Mobile Development", "Data Science", "AI/ML", "Cybersecurity"],
  Business: [
    "Project Management",
    "Business Development",
    "Sales",
    "Marketing",
    "Strategy",
    "Operations",
    "Finance",
    "Accounting",
  ],
  Creative: [
    "UI/UX Design",
    "Graphic Design",
    "Video Editing",
    "Photography",
    "Writing",
    "Content Creation",
    "Branding",
    "Animation",
  ],
  Trades: [
    "Electrical Work",
    "Plumbing",
    "Carpentry",
    "Welding",
    "Automotive",
    "Construction",
    "Tailoring",
    "Catering",
  ],
  Academic: ["Teaching", "Research", "Mathematics", "Science", "Languages", "History", "Literature", "Public Speaking"],
  Social: [
    "Leadership",
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Customer Service",
    "Event Planning",
    "Community Building",
    "Mentoring",
  ],
}

export function SkillSelector({ onComplete, onBack, selectedSkills, contactName }: SkillSelectorProps) {
  const [skills, setSkills] = useState<string[]>(selectedSkills)
  const [activeCategory, setActiveCategory] = useState<string>("Tech")

  const handleSkillToggle = (skill: string) => {
    setSkills(
      (prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill].slice(0, 5)), // Max 5 skills
    )
  }

  const handleContinue = () => {
    if (skills.length > 0) {
      onComplete(skills)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">What skills does {contactName} have?</h1>
        <p className="text-muted-foreground">Select up to 5 skills you can personally vouch for</p>
      </div>

      {/* Selected Skills */}
      {skills.length > 0 && (
        <Card className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Selected Skills</h3>
            <Badge variant="secondary" className="text-xs">
              {skills.length}/5
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="default"
                className="bg-primary text-primary-foreground cursor-pointer"
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
                <span className="ml-1 text-xs">×</span>
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Category Tabs */}
      <div className="space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.keys(SKILL_CATEGORIES).map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-2">
          {SKILL_CATEGORIES[activeCategory as keyof typeof SKILL_CATEGORIES].map((skill) => (
            <Badge
              key={skill}
              variant={skills.includes(skill) ? "default" : "outline"}
              className={`cursor-pointer transition-all p-3 text-center justify-center ${
                skills.includes(skill) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              } ${skills.length >= 5 && !skills.includes(skill) ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => {
                if (skills.length < 5 || skills.includes(skill)) {
                  handleSkillToggle(skill)
                }
              }}
            >
              <div className="flex items-center gap-1">
                {skills.includes(skill) && <Star className="w-3 h-3 fill-current" />}
                <span className="text-xs">{skill}</span>
              </div>
            </Badge>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <Card className="p-4 bg-accent/10 border-accent/20">
        <div className="space-y-2">
          <div className="font-medium text-accent-foreground">Pro Tip</div>
          <div className="text-sm text-accent-foreground">
            Only vouch for skills you've personally witnessed or worked with {contactName} on. Your reputation is also
            on the line!
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 touch-target bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleContinue}
          disabled={skills.length === 0}
          className="flex-1 touch-target bg-primary hover:bg-primary/90"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
