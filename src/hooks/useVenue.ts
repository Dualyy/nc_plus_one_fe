import { useEffect, useState } from "react";
import type { Venue, VenueResponse } from "../types/Venues";
import { getVenueById } from "../api/venues";


export function useVenue(id: string | undefined) {
    const [venue, setVenue] = useState<Venue | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchVenueError, setFetchVenueError] = useState<string | null>(null);
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {
        if (id === undefined) return;
        setFetchVenueError(null);
        const fetchVenue = async () => {
            try {
                const response: VenueResponse = await getVenueById(id);
                setVenue(response.venue);
            } catch (err) {
                if (err instanceof Error) {
                    setFetchVenueError(err.message)
                } 
            }finally {
                    setIsLoading(false);
                }
        }
        fetchVenue();
    },[refetchCounter])
    return {venue, isLoading, fetchVenueError, refetch: setRefetchCounter}
}