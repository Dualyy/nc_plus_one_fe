import type { Venue } from "./Venues";

export interface BasicEventDict{
    event: BasicEvent;
}

export interface BasicEvent{
    id: number;
    title: string;
    description: string | null;
    starts_at: string;
    ends_at: string;
    location: string;
}

export interface CreateEvent{
    title: string;
    description: string | null;
    starts_at: string;
    ends_at: string;
    venue_id: number;
}

export interface Events {
    events: BasicEvent[]
}

export interface DetailedEvent{
    id: number;
    title: string;
    description: string | null;
    starts_at: string;
    ends_at: string;
    location: string;
    organiser: number;
    venue_id: number;
    created_at: number;
}

export interface EventDict { 
    event: DetailedEvent 
}

export interface EventDetails extends DetailedEvent {  
    venue: Venue;
}

