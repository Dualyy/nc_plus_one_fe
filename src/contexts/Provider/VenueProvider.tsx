import {  useEffect, useMemo, useState, type ReactNode } from "react"
import  {VenueContext}  from "../VenueContext";
import type { Venue } from "../../types/Venues";
import { getVenues } from "../../api/venues";



export default function VenueProvider({ children }: { children: ReactNode }) {
    const [venues, setVenues] = useState<Venue[]>([]);

    useEffect(() => {
        const controller = new AbortController();
         async function loadVenues() {
            try {
                const allVenues = await getVenues(controller.signal);
                setVenues(allVenues.venues)
            } catch (err){
                if (controller.signal.aborted) return;
                console.error("Failed to load venues", err);
                setVenues([]);
            }
        }
        loadVenues()

        return () => controller.abort();
    }, [])

    


    const value = useMemo(() => { return { venues } }, [venues])

    return (
        <VenueContext value={value}>{children}</VenueContext>
    )
}