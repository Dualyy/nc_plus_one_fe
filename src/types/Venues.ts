export interface Venue {
    id: number;
    name: string;
    address: string | null;
    capacity: number;
}

export interface VenueArray{
    venues: Venue[];
}

export interface VenueResponse{
    venue: Venue;
}