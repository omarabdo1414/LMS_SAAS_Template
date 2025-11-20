import { getAllCompanions } from "@/lib/actions/companion.action";
import CompanionCard from "@/components/companions/companionCard";
import { getSubjectColor } from "@/lib/utils";

// Filter and Searching
import SearchInputs from "@/components/SearchInputs";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async ({searchParams} : SearchParams) => {

  const filters = await searchParams;
  
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({subject, topic});

  
  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInputs />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => {
          return (
            <CompanionCard key={companion.id} {...companion} /*color={getSubjectColor(companion.subject)}*/ />
          );
        })}
      </section>
    </main>
  )
}

export default CompanionsLibrary;