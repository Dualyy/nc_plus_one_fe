import type { EventDict, Events } from "../types/Events";
import { apiGet } from "./auth/clients";

export function getEventsList(signal?: AbortSignal) :Promise<Events>{
    return apiGet<Events>("/events", signal)
}

export function getEvent(id: string ,signal?: AbortSignal) :Promise<EventDict>{
    return apiGet<EventDict>("/events/" + id, signal)
}