import type { OrganiserStatsResponse } from "../hooks/useOrganiserStats";
import type { Attendees} from "../types/User";
import { apiGet } from "./clients";




export function getAttendees(eventId: string,signal?: AbortSignal) :Promise<Attendees>{
    return apiGet<Attendees>(`/events/${eventId}/attendees`, signal)
}

export function getOrganiserStats(organiserId: string,signal?: AbortSignal) :Promise<OrganiserStatsResponse>{
    return apiGet<OrganiserStatsResponse>(`/organisers/${organiserId}/stats`, signal)
}