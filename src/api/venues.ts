import { apiGet } from "./clients";
import {type VenueArray, type VenueResponse} from "../types/Venues"



export function getVenues(signal?: AbortSignal) :Promise<VenueArray>{
    return apiGet<VenueArray>("/venues", signal)
}

export function getVenueById(id: string,signal?: AbortSignal) :Promise<VenueResponse>{
    return apiGet<VenueResponse>("/venues/" + id, signal)
}
