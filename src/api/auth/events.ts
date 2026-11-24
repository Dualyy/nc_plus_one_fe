import type { Events } from "../../types/Events";
import { apiGet } from "./clients";

export function getEventsList(signal?: AbortSignal) :Promise<Events>{
    return apiGet<Events>("/events", signal)
}