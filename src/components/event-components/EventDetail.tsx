import type { EventDetails } from "../../types/Events";


interface EventDetailProps{
    event: EventDetails
}

export default function EventDetail({event}:EventDetailProps) {
 

    return (<>
    <section>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
    </section>

    <section>
        <h2>{event.venue.name}</h2>
        <p>{event.venue.address}</p>
        <p>{event.venue.capacity}</p>
    </section>
    </>
    )
}