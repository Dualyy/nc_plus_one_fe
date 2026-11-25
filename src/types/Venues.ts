export interface Venue {
    id: number;
    name: string;
    address: string;
    capacity: number;
}

export interface VenueArray{
    venues: Venue[];
}