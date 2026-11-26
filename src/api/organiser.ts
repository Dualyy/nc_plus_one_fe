import type { Attendees} from "../types/User";
import { apiGet } from "./clients";




export function getAttendees(eventId: string,signal?: AbortSignal) :Promise<Attendees>{
    return apiGet<Attendees>(`/events/${eventId}/attendees`, signal)
}