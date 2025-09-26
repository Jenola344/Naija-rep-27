"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ContactSelector } from "./contact-selector"
import { SkillSelector } from "./skill-selector"
import { VouchComposer } from "./vouch-composer"
import { VouchSuccess } from "./vouch-success"

type VouchStep = "contact" | "skill" | "compose" | "success"

interface VouchData {
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

export function VouchInterface() {
  const [currentStep, setCurrentStep] = useState<VouchStep>("contact")
  const [vouchData, setVouchData] = useState<VouchData>({
    contact: null,
    skills: [],
    message: "",
    evidence: [],
    isPublic: true,
  })

  const handleStepComplete = (step: VouchStep, data: Partial<VouchData>) => {
    setVouchData((prev) => ({ ...prev, ...data }))

    const stepOrder: VouchStep[] = ["contact", "skill", "compose", "success"]
    const currentIndex = stepOrder.indexOf(step)
    const nextStep = stepOrder[currentIndex + 1]

    if (nextStep) {
      setCurrentStep(nextStep)
    }
  }

  const handleBack = () => {
    const stepOrder: VouchStep[] = ["contact", "skill", "compose", "success"]
    const currentIndex = stepOrder.indexOf(currentStep)
    const prevStep = stepOrder[currentIndex - 1]

    if (prevStep) {
      setCurrentStep(prevStep)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case "contact":
        return (
          <ContactSelector
            onComplete={(contact) => handleStepComplete("contact", { contact })}
            selectedContact={vouchData.contact}
          />
        )
      case "skill":
        return (
          <SkillSelector
            onComplete={(skills) => handleStepComplete("skill", { skills })}
            onBack={handleBack}
            selectedSkills={vouchData.skills}
            contactName={vouchData.contact?.name || ""}
          />
        )
      case "compose":
        return (
          <VouchComposer
            onComplete={(data) => handleStepComplete("compose", data)}
            onBack={handleBack}
            vouchData={vouchData}
          />
        )
      case "success":
        return (
          <VouchSuccess
            vouchData={vouchData}
            onNewVouch={() => {
              setCurrentStep("contact")
              setVouchData({
                contact: null,
                skills: [],
                message: "",
                evidence: [],
                isPublic: true,
              })
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 mobile-safe mobile-safe-bottom">
        {/* Progress Indicator */}
        <div className="py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              {["contact", "skill", "compose"].map((step, index) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    ["contact", "skill", "compose"].indexOf(currentStep) >= index ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {currentStep === "success"
                ? "Complete"
                : `Step ${["contact", "skill", "compose"].indexOf(currentStep) + 1} of 3`}
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="pb-6">{renderStep()}</div>
      </div>
    </div>
  )
}
