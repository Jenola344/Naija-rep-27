"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Shield, Zap, ArrowRight, ArrowLeft } from "lucide-react"

interface TutorialProps {
  onComplete: () => void
}

const TUTORIAL_STEPS = [
  {
    icon: Users,
    title: "Build Your Network",
    description:
      "Connect with friends, colleagues, and professionals. The stronger your network, the higher your reputation.",
    tip: "Start by vouching for people you know well!",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Rep Score",
    description:
      "As people vouch for your skills, your reputation score increases. Higher scores unlock better opportunities.",
    tip: "Be active! Vouch for others and they'll vouch back.",
  },
  {
    icon: Shield,
    title: "Join Inner Circles",
    description: "High reputation gets you into exclusive communities with premium benefits and opportunities.",
    tip: "Inner Circles have savings groups and high-paying gigs.",
  },
  {
    icon: Zap,
    title: "Earn Real Money",
    description:
      "Use your reputation to access better jobs, join savings circles, and get paid for your trustworthiness.",
    tip: "Your reputation is your financial superpower!",
  },
]

export function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = TUTORIAL_STEPS[currentStep]
  const Icon = step.icon

  return (
    <div className="mobile-safe flex-1 flex items-center justify-center py-8">
      <Card className="w-full max-w-md p-8 space-y-8 bg-card border-border">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-10 h-10 text-primary" />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{step.title}</h1>
            <p className="text-muted-foreground text-balance">{step.description}</p>

            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <p className="text-sm text-accent-foreground">
                <strong>Pro Tip:</strong> {step.tip}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          {TUTORIAL_STEPS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentStep ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handlePrevious} className="flex-1 touch-target bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          <Button
            onClick={handleNext}
            className={`touch-target bg-primary hover:bg-primary/90 ${currentStep === 0 ? "flex-1" : "flex-1"}`}
          >
            {currentStep === TUTORIAL_STEPS.length - 1 ? "Get Started" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Skip Option */}
        <div className="text-center">
          <Button variant="ghost" onClick={onComplete} className="text-sm text-muted-foreground">
            Skip tutorial
          </Button>
        </div>
      </Card>
    </div>
  )
}
