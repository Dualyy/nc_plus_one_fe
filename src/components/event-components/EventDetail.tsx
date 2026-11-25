import { useParams } from "react-router";
import { useEvent } from "../../hooks/useEvent";
import type { DetailedEvent } from "../../types/Events";

interface EventDetailProps{
    event: DetailedEvent
}

export default function EventDetail({event}:EventDetailProps) {
 

    return (<>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
    </>
    )
}