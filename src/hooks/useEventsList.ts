import { useEffect, useState } from "react";
import { type BasicEvent, type Events } from "../types/Events"
import { getEventsList } from "../api/events";


export function useEventList() {
    const [eventList, setEventList] = useState<BasicEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchEventError, setFetchEventError] = useState<string | null>(null);
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {
        setFetchEventError(null);
        const fetchEventList = async () => {
            try {
                const response: Events = await getEventsList();
                setEventList(response.events);
            } catch (err) {
                if (err instanceof Error) {
                    setFetchEventError(err.message)
                } 
            }finally {
                    setIsLoading(false);
                }
        }
        fetchEventList();
    },[refetchCounter])
    return {eventList, isLoading, fetchEventError, refetch: setRefetchCounter}
}