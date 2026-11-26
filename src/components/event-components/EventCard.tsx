import type { BasicEvent } from "../../types/Events";
import { parseDate } from "../../util/dateutil";
import "./EventCard.css"
import "../NavBar.css"
import { Link } from "react-router";
import { RsvpButton } from "../rsvp/RSVPButton";

interface EventCardProps {
    event: BasicEvent;
    refetch: ()=> void;
}


export default function EventCard({ event, refetch }: EventCardProps) {
    return (
        <article className="event-card">
            <header className="event-card__header">
                <h2 className="event-card__title">
                     <Link to={`/events/${event.id}`}>{event.title}</Link>
                    </h2>
                <div className="event-card__meta">
                    <p className="event-card__location">{event.location ?? 'Online'}</p>
                    <p className="event-card__time">
                        <time dateTime={event.starts_at}>
                            {parseDate(event.starts_at)} { event.ends_at && <span>- {parseDate(event.ends_at)}</span>}
                        </time>
                    </p>
                </div>
            </header>
            <div className="event-card__footer">
                <RsvpButton event={event} refetch={refetch}/>
            </div>
        </article>
    )

}