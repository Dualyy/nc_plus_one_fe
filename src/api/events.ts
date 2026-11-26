import type { BasicEvent, CreateEvent, EventDetails, EventDict, Events, PatchEvent } from "../types/Events";
import { apiGet, apiPatch, apiPost } from "./clients";

export function getEventsList(signal?: AbortSignal) :Promise<Events>{
    return apiGet<Events>("/events", signal)
}

export function getEventsListByUserId(signal?: AbortSignal) :Promise<Events>{
    return apiGet<Events>("/user/me/events", signal)
}

export function getEvent(id: string ,signal?: AbortSignal) :Promise<EventDict>{
    return apiGet<EventDict>("/events/" + id, signal)
}

export function getEventDetails(id: string ,signal?: AbortSignal) :Promise<EventDetails>{
    return apiGet<EventDetails>(`/events/${id}/details`, signal)
}

export function createEvent(body: CreateEvent ,signal? :AbortSignal):Promise<BasicEvent>{
    return apiPost<BasicEvent>('/events',body,signal)
}

export function patchEvent(id:string,body: PatchEvent ,signal? :AbortSignal):Promise<PatchEvent>{
    return apiPatch<PatchEvent>(`/events/${id}`,body,signal)
}