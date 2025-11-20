"use client"

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "@/components/ui/select"

import { subjects } from "@/constants"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

const SubjectFilter = () => {
    // extracting search params top start searching
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('subject') || '';

    // set the search query top a specific topic
    const [subject, setSubject] = useState('');

    useEffect(() => {
        if (subject === query) return; // prevent re-push of same value
        let newUrl = '';
        if (query === 'all') {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject
            });
        }
        router.push(newUrl, { scroll: false });
    }, [subject, query, router]);

    return (
        <div className="input">
            <Select
                onValueChange={setSubject}
                value={subject}
            >
                <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Select Subject</SelectItem>
                    {subjects.map((subject) => {
                        return (
                            <SelectItem key={subject} value={subject} className="capitalize">{subject}</SelectItem>
                        )   
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SubjectFilter