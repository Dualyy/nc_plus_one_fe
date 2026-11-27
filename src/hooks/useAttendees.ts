import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getAttendees } from "../api/organiser";

type AttendeesState = 
| {status:"loading"}
| {status: "success", attendees: User[]}
| {status: "error", msg: string}


export default function useAttendees(eventId: string) {
    const [attendeesState, setAttendeesState] = useState<AttendeesState>({status:"loading"});
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {

        async function fetchAttendees(eventId: string) {
            try {
                const response = await getAttendees(eventId);
                setAttendeesState({status:"success", attendees: response.attendees});
            } catch (error) {
                if (error instanceof Error) setAttendeesState({status: "error", msg: error.message});
            }
        }
        fetchAttendees(eventId);
    }, [refetchCounter])
    return { attendeesState, refetch: setRefetchCounter }
}