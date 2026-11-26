import { useState } from "react";
import { createRSVP, deleteRSVP } from "../api/rsvps";





export default function useRSVP(refetch: () => void) {
    const [currId, setCurrId] = useState<string | null>(null);
    const [rsvpError, setRsvpError] = useState<Error | null>(null);

    async function toggleRSVP(eventId: string, isGoing: boolean) {
        setCurrId(eventId);
        setRsvpError(null);
        try {
            if (isGoing) {
                await deleteRSVP(eventId);
            }
            else {
                await createRSVP(eventId);
            }
            refetch()
        } catch (error) {
            if (error instanceof Error) {
                setRsvpError(error)
            }
        } finally {
            setCurrId(null)
        }
    }

    return { toggleRSVP, currId, rsvpError }
}