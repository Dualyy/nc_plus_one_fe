import { useEffect, useState } from "react";
import { type DetailedEvent, type EventDict, type Events } from "../types/Events"
import { getEvent } from "../api/events";


export function useEvent(id: string) {
    const [event, setEvent] = useState<DetailedEvent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchEventError, setFetchEventError] = useState<string | null>(null);
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {
        setFetchEventError(null);
        const fetchEvent = async () => {
            try {
                const response: EventDict = await getEvent(id);
                setEvent(response.event);
            } catch (err) {
                if (err instanceof Error) {
                    setFetchEventError(err.message)
                } 
            }finally {
                    setIsLoading(false);
                }
        }
        fetchEvent();
    },[refetchCounter])
    return {event, isLoading, fetchEventError, refetch: setRefetchCounter}
}