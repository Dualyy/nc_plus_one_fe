import { useEffect, useState } from "react";
import { type BasicEvent, type Events } from "../types/Events"
import { getEventsList } from "../api/events";


type useEventListType =
 | {status:"success", events: BasicEvent[]}
 | {status:"error", msg: string}
 | {status:"loading"}


export function useEventList() {
    const [eventListState, setEventListState] = useState<useEventListType>({status: "loading"});
    const [refetchCounter, setRefetchCounter] = useState(0);

    useEffect(() => {
        const controller = new AbortController()
        const fetchEventList = async () => {
            try {
                const response: Events = await getEventsList(controller.signal);
                setEventListState({status:"success", events: response.events});
            } catch (err) {
                if (controller.signal.aborted) return;
                if (err instanceof Error) {
                     setEventListState({status:"error", msg: (err.message)});
                } 
            }
        }
        fetchEventList();
        return () => controller.abort()
    },[refetchCounter])
    
    return {eventListState, refetch: setRefetchCounter}
}