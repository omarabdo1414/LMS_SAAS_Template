"use server";

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../subabase";
import { cp } from "fs";

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

export const getAllCompanions = async ({limit= 10, page= 1, subject, topic}: GetAllCompanions) => {
    const supabase = await createSupabaseClient();

    let query = supabase.from('companions').select();

    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if(error) throw Error(error.message);

    return companions;
}

export const getCompanionById = async (id: string) => {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase.from('companions').select().eq('id', id);

    if (error) throw Error(error.message);

    return data[0];
}

export const addToSessionHistory = async (companionId : string) => {
    const { userId } = await auth();
    const subabase = createSupabaseClient();

    // Insert conversation record
    const { data, error } = await subabase.from("session_history")
    .insert({
        user_id: userId,
        companion_id: companionId
    });

    if (error) throw new Error (error.message);

    return data;
}

export const getRecentSessions = async (limit=10) => {
    const subabase = await createSupabaseClient();

    const { data, error } = await subabase
        .from('session_history')
        .select('companions: companion_id (*)')
        .order('created_at', { ascending: false })
        .limit(limit);
    
    if (error) throw new Error(error.message);
    
    return data.map(({ companions }) => companions);
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const subabase = await createSupabaseClient();

    const { data, error } = await subabase
        .from('session_history')
        .select('companions: companion_id (*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
    
    if (error) throw new Error(error.message);
    
    return data.map(({ companions }) => companions);
}

export const getUserCompanions = async (userId: string) => {
    const subabase = await createSupabaseClient();

    const { data, error } = await subabase
        .from('companions')
        .select()
        .eq('author', userId);
    
    if (error) throw new Error(error.message);
    
    return data;
}

export const newCompanionPermessions = async () => {
    const { userId, has } = await auth();
    const supabase = await createSupabaseClient();

    let limit = 0;

    if(has({plan: "pro"})) {
        return true;
    } else if (has({feature: "3_active_companions"})) {
        limit = 3;
    } else if (has({feature: "10_active_companions"})) {
        limit = 10;
    }

    // get access for the amount of companions that the user has created
    const { data, error } = await supabase
        .from('companions')
        .select('id', {count: 'exact'})
        .eq('author', userId)

    if(error) throw new Error (error.message);

    const companionsCount = data.length;

    if(companionsCount >= limit) {
        return false;
    } else {
        return true;
    }
}