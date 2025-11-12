"use server";

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../subabase";

export const createCompanion = async (fromData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
    .from('companions')
    .insert({
        ...fromData, 
        author
    }).select();

    if(error || !data) throw Error(error?.message || "Failed to create a companion");

    return data[0];
}