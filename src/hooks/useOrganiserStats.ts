import { useEffect, useState } from "react";
import { getOrganiserStats } from "../api/organiser";

export interface OrganiserStats {
    organiser_id: number,
    name: string,
    total_events: number,
    avg_attendance: number,
    best_attended_count: number,
    organiser_rank: number
}

export interface OrganiserStatsResponse{
    stats: OrganiserStats
}


type OrganiserState =
    | { status: "loading" }
    | { status: "success", stats: OrganiserStats }
    | { status: "error", msg: string }



export default function useOrganiserStats(organiserId: number | undefined | null) {
    const [organiserStatState, setOrganiserStatState] = useState<OrganiserState>({ status: "loading" });

    useEffect(()=>{
        const fetchOrganiserStats = async () => {
        try {
            const stats : OrganiserStatsResponse = await getOrganiserStats(String(organiserId));
            if (stats) setOrganiserStatState({ status: "success", stats: stats.stats })
        } catch (error) {
            if (error instanceof Error) setOrganiserStatState({ status: "error", msg: error.message })
        } 
    }
    if(!organiserId) return 
    else fetchOrganiserStats();
    },[organiserId])

    

    return {organiserStatState}
}