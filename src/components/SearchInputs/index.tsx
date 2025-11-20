"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import Image from "next/image";

const SearchInputs = () => {
    // extracting search params top start searching
    const pathName = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    // set the search query top a specific topic
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=> {
        const delayTime = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "topic",
                value: searchQuery,
                });

                router.push(newUrl, {scroll: false});
            } else {
                if(pathName === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 1000);
    },[searchQuery, router, searchParams, pathName]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
        <Image src="/icons/search.svg" alt="seatch" width={15} height={15} />

        <input 
            type="text" 
            name="" 
            id="" 
            placeholder="Search Companion..." 
            value={searchQuery}
            onChange={(e)=> {
                setSearchQuery(e.target.value);
            }}
        />
    </div>
  )
}

export default SearchInputs;