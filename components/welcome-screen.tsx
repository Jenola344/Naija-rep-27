"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Shield, Smartphone, Star, ArrowRight, CheckCircle, Zap } from "lucide-react"
import Link from "next/link"

export function WelcomeScreen() {
  return (
    <div className="pt-20 mobile-safe">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              {"Powered by Web3 • Built for Nigeria"}
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-balance high-contrast">
              Turn Your <span className="naija-gradient bg-clip-text text-transparent">Reputation</span> Into Real Money
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto">
              {
                "Build trust, showcase skills, and unlock financial opportunities in Nigeria's first social reputation platform."
              }
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground touch-target px-8 animate-pulse-naija"
              >
                Start Building Rep
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="touch-target px-8 border-border hover:bg-muted bg-transparent"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Download App
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Free to start
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              No crypto knowledge needed
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Made for Nigerians
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-secondary">₦2M+</div>
            <div className="text-sm text-muted-foreground">Earned by Users</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-accent">50K+</div>
            <div className="text-sm text-muted-foreground">Vouches Given</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-primary">25+</div>
            <div className="text-sm text-muted-foreground">Cities</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">How Naija Rep Works</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            {
              "Build your reputation through real skills and connections, then unlock exclusive opportunities and financial benefits."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 bg-card border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Get Vouched</h3>
              <p className="text-muted-foreground">
                {"Friends and colleagues vouch for your skills, building your reputation score."}
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-secondary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Level Up</h3>
              <p className="text-muted-foreground">
                {"Higher reputation unlocks better opportunities, exclusive communities, and financial benefits."}
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border hover:border-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Earn Money</h3>
              <p className="text-muted-foreground">
                {"Access high-paying gigs, join savings circles, and get paid for your reputation."}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to Build Your Rep?</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            {"Join thousands of Nigerians already building their reputation and unlocking new opportunities."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground touch-target px-8">
            <Star className="w-5 h-5 mr-2" />
            Start Your Journey
          </Button>

          <Button variant="outline" size="lg" className="touch-target px-8 border-border hover:bg-muted bg-transparent">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  )
}
