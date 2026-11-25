import {  useEffect, useMemo, useState, type ReactNode } from "react"
import  {VenueContext}  from "../VenueContext";
import type { Venue } from "../../types/Venues";
import { getVenues } from "../../api/venues";



export default function UserProvider({ children }: { children: ReactNode }) {
    const controller = new AbortController();
    const [venues, setVenues] = useState<Venue[]>([]);

    useEffect(() => {
         async function loadVenues() {
            try {
                const allVenues = await getVenues(controller.signal);
                setVenues(allVenues.venues)
            } catch (err){
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