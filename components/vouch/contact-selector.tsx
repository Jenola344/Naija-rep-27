"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus, ArrowRight, Users, Phone, Mail } from "lucide-react"

interface Contact {
  id: string
  name: string
  phone: string
  avatar?: string
  mutualConnections: number
  isOnPlatform: boolean
  skills?: string[]
  location?: string
}

interface ContactSelectorProps {
  onComplete: (contact: Contact) => void
  selectedContact: Contact | null
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Adebayo Johnson",
    phone: "+2348012345678",
    avatar: "/nigerian-man.jpg",
    mutualConnections: 12,
    isOnPlatform: true,
    skills: ["JavaScript", "React", "Node.js"],
    location: "Lagos",
  },
  {
    id: "2",
    name: "Chioma Okafor",
    phone: "+2348087654321",
    avatar: "/nigerian-woman.jpg",
    mutualConnections: 8,
    isOnPlatform: true,
    skills: ["UI/UX Design", "Figma", "Branding"],
    location: "Lagos",
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    phone: "+2348098765432",
    mutualConnections: 5,
    isOnPlatform: true,
    skills: ["Marketing", "Social Media", "Content"],
    location: "Abuja",
  },
  {
    id: "4",
    name: "Funmi Adeyemi",
    phone: "+2348076543210",
    mutualConnections: 15,
    isOnPlatform: false,
    skills: ["Business Development", "Sales"],
    location: "Lagos",
  },
  {
    id: "5",
    name: "Kemi Ogundimu",
    phone: "+2348065432109",
    mutualConnections: 3,
    isOnPlatform: true,
    skills: ["Data Science", "Python", "Analytics"],
    location: "Lagos",
  },
]

export function ContactSelector({ onComplete, selectedContact }: ContactSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(selectedContact?.id || null)

  const filteredContacts = MOCK_CONTACTS.filter(
    (contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.includes(searchQuery),
  )

  const handleContinue = () => {
    const contact = MOCK_CONTACTS.find((c) => c.id === selectedId)
    if (contact) {
      onComplete(contact)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Who do you want to vouch for?</h1>
        <p className="text-muted-foreground">Select someone from your contacts or invite them to join</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Contact List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Your Contacts ({filteredContacts.length})</h3>
          <Badge variant="outline" className="text-xs">
            <Users className="w-3 h-3 mr-1" />
            {filteredContacts.filter((c) => c.isOnPlatform).length} on platform
          </Badge>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <Card
              key={contact.id}
              onClick={() => setSelectedId(contact.id)}
              className={`p-4 cursor-pointer transition-all ${
                selectedId === contact.id ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{contact.name}</span>
                        {contact.isOnPlatform && (
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                            On Naija Rep
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {contact.phone}
                        </div>
                        {contact.location && <div>{contact.location}</div>}
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <Badge variant="outline" className="text-xs">
                        {contact.mutualConnections} mutual
                      </Badge>
                      {selectedId === contact.id && (
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center ml-auto">
                          <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {contact.skills && contact.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {contact.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {contact.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{contact.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Invite Option */}
      <Card className="p-4 border-dashed border-border text-center space-y-3">
        <UserPlus className="w-8 h-8 mx-auto text-muted-foreground" />
        <div className="space-y-1">
          <div className="font-medium">Don't see them here?</div>
          <div className="text-sm text-muted-foreground">Invite them to join Naija Rep and build their reputation</div>
        </div>
        <Button variant="outline" size="sm" className="touch-target bg-transparent">
          <Mail className="w-4 h-4 mr-2" />
          Send Invite
        </Button>
      </Card>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!selectedId}
        className="w-full touch-target bg-primary hover:bg-primary/90"
        size="lg"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}
