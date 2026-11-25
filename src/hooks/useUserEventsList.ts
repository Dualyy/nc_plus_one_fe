import { useEffect, useState } from "react";
import { type BasicEvent, type Events } from "../types/Events"
import {  getEventsListByUserId } from "../api/events";


export function useUserEventList() {
    const [userEventList, setUserEventList] = useState<BasicEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchEventError, setFetchEventError] = useState<string | null>(null);
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {
        const controller = new AbortController()
        setFetchEventError(null);
        const fetchEventList = async () => {
            try {
                const response: Events = await getEventsListByUserId(controller.signal);
                setUserEventList(response.events);
            } catch (err) {
                if (err instanceof Error) {
                    if (controller.signal.aborted) return;
                    setFetchEventError(err.message)
                } 
            }finally {
                    setIsLoading(false);
                }
        }
        fetchEventList();
        return () => controller.abort()
    },[refetchCounter])
    
    return {userEventList, isLoading, fetchEventError, refetch: setRefetchCounter}
}