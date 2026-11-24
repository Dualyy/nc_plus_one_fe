import type { BasicEvent } from "../../types/Events";
import { parseDate } from "../../util/dateutil";
import "./EventCard.css"
import "../NavBar.css"

interface EventCardProps {
    event: BasicEvent;
}


export default function EventCard({ event }: EventCardProps) {
    return (
        <article className="event-card">
            <header className="event-card__header">
                <h2 className="event-card__title">{event.title}</h2>
                <div className="event-card__meta">
                    <p className="event-card__location">{event.location ?? 'Online'}</p>
                    <p className="event-card__time">
                        <time dateTime={event.starts_at}>
                            {parseDate(event.starts_at)} - {parseDate(event.ends_at)}
                        </time>
                    </p>
                </div>
            </header>
            <div className="event-card__footer">
                <button className="event-card__rsvp" type="button">RSVP</button>
            </div>
        </article>
    )

}