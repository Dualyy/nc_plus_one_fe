import { useUserEventList } from "../../hooks/useUserEventsList";
import type { BasicEvent } from "../../types/Events";
import EventCard from "./EventCard";
import "./EventGrid.css"

interface EventGridProps{
    events: BasicEvent[];
    userEventList: BasicEvent[]
    refetch: () => void;
}


export default function EventGrid({events, userEventList, refetch}:EventGridProps){
const { isLoading ,refetch: rsvpRefetch} = useUserEventList();

if(isLoading) return <p>Loading...</p>

return(
    <div className="event-grid-container">
        <ul className="event-grid__list">
            {events.map((event)=> <EventCard key={event.id} userEventList={userEventList} event={event} refetch={refetch} />)}
        </ul>
    </div>
)
}