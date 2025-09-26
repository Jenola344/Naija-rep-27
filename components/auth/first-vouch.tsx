"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, UserPlus, ArrowRight, Users } from "lucide-react"

interface FirstVouchProps {
  onComplete: () => void
}

const MOCK_CONTACTS = [
  { id: 1, name: "Adebayo Johnson", phone: "+2348012345678", mutual: 3 },
  { id: 2, name: "Chioma Okafor", phone: "+2348087654321", mutual: 7 },
  { id: 3, name: "Ibrahim Musa", phone: "+2348098765432", mutual: 2 },
  { id: 4, name: "Funmi Adeyemi", phone: "+2348076543210", mutual: 5 },
]

export function FirstVouch({ onComplete }: FirstVouchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContact, setSelectedContact] = useState<number | null>(null)
  const [vouchSent, setVouchSent] = useState(false)

  const filteredContacts = MOCK_CONTACTS.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendVouch = async () => {
    if (!selectedContact) return

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVouchSent(true)

    // Auto-complete after showing success
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  if (vouchSent) {
    return (
      <div className="mobile-safe flex-1 flex items-center justify-center py-8">
        <Card className="w-full max-w-md p-8 text-center space-y-6 bg-card border-border">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="w-8 h-8 text-primary animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Vouch Sent!</h2>
            <p className="text-muted-foreground">
              Your friend will be notified and can vouch back for you. This is how reputation grows!
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mobile-safe flex-1 py-8">
      <Card className="w-full max-w-2xl mx-auto p-8 space-y-8 bg-card border-border">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Vouch for a Friend</h1>
            <p className="text-muted-foreground">
              Start building your network by vouching for someone you know and trust
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search your contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Contact List */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Suggested from your contacts</h3>

            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedContact === contact.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.phone}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {contact.mutual} mutual
                      </Badge>
                      {selectedContact === contact.id && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Option */}
          <div className="p-4 rounded-lg border border-dashed border-border text-center space-y-2">
            <UserPlus className="w-6 h-6 mx-auto text-muted-foreground" />
            <div className="text-sm">
              <div className="font-medium">Don't see them?</div>
              <div className="text-muted-foreground">Invite them to join Naija Rep</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleSendVouch}
            disabled={!selectedContact}
            className="w-full touch-target bg-primary hover:bg-primary/90"
          >
            Send Vouch
            <Heart className="w-4 h-4 ml-2" />
          </Button>

          <Button variant="ghost" onClick={onComplete} className="w-full">
            Skip for now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
