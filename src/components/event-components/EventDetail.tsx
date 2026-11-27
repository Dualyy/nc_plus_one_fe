import type { EventDetails } from "../../types/Events";
import useOrganiserStats from "../../hooks/useOrganiserStats";
import { Link } from "react-router";


interface EventDetailProps {
    event: EventDetails
}

export default function EventDetail({ event }: EventDetailProps) {

    const { organiserStatState } = useOrganiserStats(event.organiser_id);
    if (organiserStatState.status === "loading") return <p>Loading...</p>
    if (organiserStatState.status === "error") return <p>{organiserStatState.msg}</p>


    return (<>
        <section>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <Link to={`/organisers/${event.organiser_id}/stats`}>{organiserStatState.stats.name} </Link>
        </section>
        <hr />
        <section>
            {event.venue?.address ?
                <><h2>{event.venue.name}</h2>
                    <p>{event.venue.address}</p>
                    <p>{event.venue.capacity}</p>
                </> : <p>online</p>}
        </section>

        <section>

        </section>
    </>
    )
}