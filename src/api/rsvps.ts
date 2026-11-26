
import type { Events } from "../types/Events";
import type { requestRSVP, RSVP} from "../types/RSVPS";
import { apiDelete, apiPost } from "./clients";



export function createRSVP(eventId: string ,signal? :AbortSignal):Promise<RSVP>{
    return apiPost<RSVP>(`/events/${eventId}/rsvp`,{event_id : Number(eventId)} ,signal)
}

export function deleteRSVP(eventId: string ,signal? :AbortSignal){
    return apiDelete(`/events/${eventId}/rsvp/me`)
}