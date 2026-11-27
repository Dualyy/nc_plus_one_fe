import { useEffect, useState } from "react";
import { type BasicEvent, type Events } from "../types/Events"
import { getEventsListByUserId } from "../api/events";
import useUser from "./useUser";


export interface UserRsvpEventsListResponse {
    events: BasicEvent[]
}

type userEventListStateType =
    | { status: "success", userRsvpEventList: Events }
    | { status: "error", msg: string }
    | { status: "loading" }
    | { status: "anonymous" }


export function useUserEventList() {
    const [userEventListState, setUserEventListState] = useState<userEventListStateType>({ status: "loading" });
    const [refetchCounter, setRefetchCounter] = useState(0);
    const { userState } = useUser()


    useEffect(() => {
        if (userState.status === "loading") return;

        if (userState.status === "anonymous") {
            setUserEventListState({ status: "anonymous" });
            return;
        }

        const controller = new AbortController();
        const fetchEventList = async () => {
            try {
                const response: Events = await getEventsListByUserId(controller.signal);
                setUserEventListState({ status: "success", userRsvpEventList: response });
            } catch (err) {
                if (controller.signal.aborted) return;
                if (err instanceof Error) {
                    setUserEventListState({ status: "error", msg: err.message });
                }
            }
        };
        fetchEventList();

        return () => controller.abort();
    }, [refetchCounter, userState.status]);

    return { userEventListState, refetch: setRefetchCounter }
}