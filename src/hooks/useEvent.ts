import { useEffect, useState } from "react";
import { type DetailedEvent, type EventDict} from "../types/Events"
import { getEvent } from "../api/events";


export function useEvent(id: string | undefined)  {
    const [event, setEvent] = useState<DetailedEvent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchEventError, setFetchEventError] = useState<string | null>(null);
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {
        
        setFetchEventError(null);
        if (id === undefined) return;
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
    },[id,refetchCounter])
    return {event, isLoading, fetchEventError, refetch: setRefetchCounter}
}