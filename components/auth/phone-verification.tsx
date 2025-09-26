"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Smartphone, ArrowRight, Check } from "lucide-react"

interface PhoneVerificationProps {
  onComplete: (data: { phone: string }) => void
}

export function PhoneVerification({ onComplete }: PhoneVerificationProps) {
  const [phone, setPhone] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [step, setStep] = useState<"phone" | "verify">("phone")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendCode = async () => {
    if (!phone) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep("verify")
  }

  const handleVerifyCode = async () => {
    if (!verificationCode) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    onComplete({ phone })
  }

  return (
    <div className="mobile-safe flex-1 flex items-center justify-center py-8">
      <Card className="w-full max-w-md p-8 space-y-6 bg-card border-border">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              {step === "phone" ? "Enter Your Phone Number" : "Verify Your Number"}
            </h1>
            <p className="text-muted-foreground">
              {step === "phone"
                ? "We'll send you a verification code via SMS or WhatsApp"
                : `We sent a code to ${phone}`}
            </p>
          </div>
        </div>

        {step === "phone" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="flex">
                <div className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                  <span className="text-sm text-muted-foreground">+234</span>
                </div>
                <Input
                  type="tel"
                  placeholder="8012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
              <p className="text-xs text-muted-foreground">Nigerian phone numbers only</p>
            </div>

            <Button
              onClick={handleSendCode}
              disabled={!phone || isLoading}
              className="w-full touch-target bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Verification Code</label>
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>

            <Button
              onClick={handleVerifyCode}
              disabled={verificationCode.length !== 6 || isLoading}
              className="w-full touch-target bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
              <Check className="w-4 h-4 ml-2" />
            </Button>

            <Button variant="ghost" onClick={() => setStep("phone")} className="w-full">
              Change Phone Number
            </Button>
          </div>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  )
}
