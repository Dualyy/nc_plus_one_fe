import { useState } from "react";
import type { BasicEvent, CreateEvent } from "../types/Events";
import { createEvent } from "../api/events";

export function useCreateEvent() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    async function submitEvent(newEvent: CreateEvent){
        setIsSubmitting(true);
        setCreateError(null);
        try {
            return await createEvent(newEvent);
        } catch (err) {
            setCreateError(err instanceof Error ? err.message : "Failed to create event");

        } finally {
            setIsSubmitting(false);
        }
    }

    return { submitEvent, isSubmitting, createError };
}