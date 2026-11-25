import { apiGet } from "./clients";
import {type VenueArray} from "../types/Venues"



export function getVenues(signal?: AbortSignal) :Promise<VenueArray>{
    return apiGet<VenueArray>("/venues", signal)
}