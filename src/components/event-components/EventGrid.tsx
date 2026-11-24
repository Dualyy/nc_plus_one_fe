import type { BasicEvent, Events } from "../../types/Events";
import EventCard from "./EventCard";
import "./EventGrid.css"

interface EventGridProps{
    events: BasicEvent[];
}


export default function EventGrid({events}:EventGridProps){


return(
    <div className="event-grid-container">
        <ul className="event-grid__list">
            {events.map((event)=> <EventCard key={event.id} event={event} />)}
        </ul>
    </div>
)
}