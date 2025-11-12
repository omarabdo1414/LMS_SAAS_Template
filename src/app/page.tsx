import { Button } from "@/components/ui/button"
import CompanionCard from "@/components/companions/companionCard"
import CompanionsList from "@/components/companions/companionsList"
import CTA from "@/components/companions/CTA"
import { recentSessions } from "@/constants"

const Page = () => {
  return (
    <main>
      <h2>Popular Companions</h2>
        <section className="home-section">
            <CompanionCard 
              id={crypto.randomUUID()}
              name="Neura the Brainy Explorer"
              topic="Neura Network of the Brain"
              subject="Science"
              duration={45}
              color="#E5D0FF"
            />
            <CompanionCard 
              id={crypto.randomUUID()}
              name="Countsy the Number Wizard"
              topic="Derivatives & Integrals"
              subject="Mathematics"
              duration={30}
              color="#FFDA6E"
            />
            <CompanionCard 
              id={crypto.randomUUID()}
              name="Verba the Vocabulary Builder"
              topic="Language"
              subject="English Literature"
              duration={30}
              color="#BDE7FF"
            />
        </section>
        <section className="home-section">
            <CompanionsList
              title="Recently Completed Sessions"
              companions={recentSessions}
              classNames="w-2/3 max-lg:w-full"
            />
            <CTA 
              
            />
        </section>
    </main>
    
  )
}

export default Page