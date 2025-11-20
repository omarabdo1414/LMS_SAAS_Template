
import CompanionCard from "@/components/companions/companionCard";
import CompanionsList from "@/components/companions/companionsList";
import CTA from "@/components/companions/CTA";
import { getRecentSessions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import Footer from "@/components/Footer/footer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Companion {
  id: string;
  subject: string;
  name: string;
  topic: string;
  duration: number;
}

async function PageContent() {
  const companions: Companion[] = await getRecentSessions(3);
  const recentSessionsCompanions: Companion[] = await getRecentSessions(10);
  return (
    <>
      <h2>Popular Companions</h2>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
      <section className="home-section pb-15">
        <CompanionsList
          title="Recently Completed Sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-64 w-full mt-8" />
    </div>
  );
}

export default async function Page() {
  return (
    <main>
      <Suspense fallback={<LoadingSkeleton />}>
        <PageContent />
      </Suspense>
      <Footer />
    </main>
  );
}