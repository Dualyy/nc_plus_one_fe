import { useEffect, useState } from "react";
import { getEventDetails } from "../api/events";
import type { EventDetails } from "../types/Events";

export function useEventDetails(id: string | undefined) {
    const [event, setEvent] = useState<EventDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id === undefined) return;
        const controller = new AbortController();

        async function load(eventId: string) {
            try {
                setError(null);
                setEvent(await getEventDetails(eventId, controller.signal));
            } catch (err) {
                if (controller.signal.aborted) return;
                setError(err instanceof Error ? err.message : "Failed to load event");
            }
        }
        load(id);

        return () => controller.abort();
    }, [id]);

    return { event, error };
}