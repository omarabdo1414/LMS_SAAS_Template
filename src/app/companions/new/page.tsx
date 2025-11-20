import CompanionForm from '@/components/companionForm'
import { newCompanionPermessions } from '@/lib/actions/companion.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

async function NewCompanion() {
  const { userId } = await auth();
  if(!userId) redirect('/sign-in');

  // 
  const canCreateCompanion = await newCompanionPermessions();

  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center'>
        {canCreateCompanion ? (
          <article className='w-full gap-4 flex flex-col'>
            <h1>Companion Builder</h1>
            <CompanionForm />
        </article>
        ) : 
          <article className='companion-limit'>
            <Image src="/images/limit.svg" alt='Companion Limit reached' width={360} height={230} />
            <div className='cta-badge'>
              Upgrade your plan
            </div>
            <h2 className='font-bold text-2xl'>You have Reached your Limit</h2>
            <p>
              
            </p>
            <Link href="/subscription" className='btn-primary w-full justify-center'>
              Upgrade My Plan
            </Link>
          </article>
        }
    </main>
  )
}

export default NewCompanion;