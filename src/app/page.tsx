
import CompanionCard from "@/components/companions/companionCard";
import CompanionsList from "@/components/companions/companionsList";
import CTA from "@/components/companions/CTA";
import { getRecentSessions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import Footer from "@/components/Footer/footer";

async function Page() {
  const companions = await getRecentSessions(3);
  const recentSessionsCompanions = await getRecentSessions(10);
  return (
    <>
      <main>
        <h2>Popular Companions</h2>
        <section className="home-section">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {companions.map((companion: any) => {
            return (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            );
          })}
        </section>
        <section className="home-section pb-15">
          <CompanionsList
            title="Recently Completed Sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Page