import { WelcomeScreen } from "@/components/welcome-screen"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <main className="flex-1">
      <Navigation />
      <WelcomeScreen />
    </main>
  )
}
