import { createContext} from "react"
import type { Venue } from "../types/Venues";





export interface VenueContextValue {
    venues: Venue[] ;
}

export const VenueContext = createContext<VenueContextValue | null>(null);


