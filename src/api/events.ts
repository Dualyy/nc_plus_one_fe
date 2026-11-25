import type { EventDetails, EventDict, Events } from "../types/Events";
import { apiGet } from "./clients";

export function getEventsList(signal?: AbortSignal) :Promise<Events>{
    return apiGet<Events>("/events", signal)
}

export function getEvent(id: string ,signal?: AbortSignal) :Promise<EventDict>{
    return apiGet<EventDict>("/events/" + id, signal)
}

export function getEventDetails(id: string ,signal?: AbortSignal) :Promise<EventDetails>{
    return apiGet<EventDetails>(`/events/${id}/details`, signal)
}