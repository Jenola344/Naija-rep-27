"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Zap, Home, Users, Wallet, MessageSquare, User, Bell } from "lucide-react"
import Link from "next/link"

export function AppNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const repScore = 847
  const unreadNotifications = 3

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism mobile-safe mobile-safe-top border-b border-primary/20">
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg web3-gradient flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground animate-neon-pulse">naija rep</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/vouch"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Vouch</span>
          </Link>
          <Link
            href="/circles"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Circles</span>
          </Link>
          <Link
            href="/wallet"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Wallet className="w-4 h-4" />
            <span>Wallet</span>
          </Link>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-accent text-accent-foreground">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
            <Badge variant="secondary" className="neon-glow">
              Rep: {repScore}
            </Badge>
            <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden touch-target" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
          <div className="py-4 space-y-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/vouch"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Vouch</span>
            </Link>
            <Link
              href="/circles"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users className="w-4 h-4" />
              <span>Circles</span>
            </Link>
            <Link
              href="/wallet"
              className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Wallet className="w-4 h-4" />
              <span>Wallet</span>
            </Link>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Badge variant="secondary" className="neon-glow">
                Rep Score: {repScore}
              </Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-accent text-accent-foreground">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0">
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
