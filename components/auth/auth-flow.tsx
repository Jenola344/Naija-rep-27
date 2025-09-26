"use client"

import { useState } from "react"
import { PhoneVerification } from "./phone-verification"
import { ProfileSetup } from "./profile-setup"
import { FirstVouch } from "./first-vouch"
import { Tutorial } from "./tutorial"

type AuthStep = "phone" | "profile" | "first-vouch" | "tutorial" | "complete"

export function AuthFlow() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("phone")
  const [userData, setUserData] = useState({
    phone: "",
    name: "",
    skills: [] as string[],
    location: "",
    photo: null as File | null,
  })

  const handleStepComplete = (step: AuthStep, data?: any) => {
    if (data) {
      setUserData((prev) => ({ ...prev, ...data }))
    }

    const stepOrder: AuthStep[] = ["phone", "profile", "first-vouch", "tutorial", "complete"]
    const currentIndex = stepOrder.indexOf(step)
    const nextStep = stepOrder[currentIndex + 1]

    if (nextStep) {
      setCurrentStep(nextStep)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "phone":
        return <PhoneVerification onComplete={(data) => handleStepComplete("phone", data)} />
      case "profile":
        return <ProfileSetup onComplete={(data) => handleStepComplete("profile", data)} />
      case "first-vouch":
        return <FirstVouch onComplete={() => handleStepComplete("first-vouch")} />
      case "tutorial":
        return <Tutorial onComplete={() => handleStepComplete("tutorial")} />
      case "complete":
        return <div className="text-center p-8">Welcome to Naija Rep!</div>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Indicator */}
      <div className="mobile-safe mobile-safe-top pt-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2">
            {["phone", "profile", "first-vouch", "tutorial"].map((step, index) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors ${
                  ["phone", "profile", "first-vouch", "tutorial"].indexOf(currentStep) >= index
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Step {["phone", "profile", "first-vouch", "tutorial"].indexOf(currentStep) + 1} of 4
          </span>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1">{renderStep()}</div>
    </div>
  )
}
