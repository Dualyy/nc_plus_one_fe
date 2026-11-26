import { useEffect, useState } from "react";
import type { Attendees } from "../types/User";
import { getAttendees } from "../api/organiser";



export default function useAttendees(eventId: string) {
    const [attendees, setAttendees] = useState<Attendees | null>(null);
    const [fetchAttendeesError, setFetchAttendeesError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {

        async function fetchAttendees(eventId: string) {
            setFetchAttendeesError(null);
            setAttendees(null);
            try {
                const response = await getAttendees(eventId);
                setAttendees(response);
            } catch (error) {
                if (error instanceof Error) setFetchAttendeesError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAttendees(eventId);
    }, [refetchCounter])
    return { attendees, fetchAttendeesError, isLoading, refetch: setRefetchCounter }
}