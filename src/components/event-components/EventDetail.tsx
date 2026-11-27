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
        <section className="header__event-detail">

            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Organiser: <Link to={`/organisers/${event.organiser_id}/stats`} id="link__event-detail">{organiserStatState.stats.name} </Link></p>
        </section>
        <hr />
        <section className="body__event-details">
            <h2 className="header-body__event-details">Venue details:</h2>
            {event.venue?.address ?
                <><h2>{event.venue.name}</h2>
                    <p>{event.venue.address}</p>
                    <p>Venue capacity: {event.venue.capacity}</p>
                </> : <p>online</p>}
        </section>
    </>
    )
}