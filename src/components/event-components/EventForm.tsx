import { useEffect, useState } from "react";
import useVenues from "../../hooks/useVenues";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import { useNavigate, useParams } from "react-router";
import { patchEvent } from "../../api/events";
import useUser from "../../hooks/useUser";
import { useEventDetails } from "../../hooks/useEventDetails";
import { format } from "date-fns/format";

export default function EventForm() {

    const { id } = useParams()
    const { event, isLoading } = useEventDetails(id)
    const { venues } = useVenues();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startsAt, setStartsAt] = useState("");
    const [endsAt, setEndsAt] = useState("");
    const [venueId, setVenueId] = useState("");
    const { submitEvent } = useCreateEvent();
    const navigate = useNavigate()
    const { userState } = useUser();


   const toLocalInput = (value?: string | null) =>
    value ? format(new Date(value), "yyyy-MM-dd'T'HH:mm") : "";

    useEffect(() => {
        if (!event) return;
        setTitle(event.title);
        setDescription(event.description ?? "");
        setStartsAt(toLocalInput(event.starts_at));
        setEndsAt(toLocalInput(event.ends_at));
        setVenueId(String(event.venue_id) ?? "");
    }, [event]);


    if (id !== undefined) {
        if (isLoading) return <p>Loading...</p>;
        if (userState.status !== "success") return <p>Please log in to edit this event</p>;
        if (!event) return <p>Event not found</p>;
        if (event.organiser_id !== userState.user.id) return <p>Unauthorized</p>;
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const created = await submitEvent({ title, description, starts_at: startsAt, ends_at: endsAt, venue_id: Number(venueId) })
        if (created) navigate(`/events/${created.id}`)
    }

    async function handleChangeSubmit(changeEvent: React.SubmitEvent<HTMLFormElement>) {
        changeEvent.preventDefault();
        if (event !== null) {
            const patch = {
                ...(event.title !== title) && { title },
                ...(event.description !== description) && { description },
                ...(event.starts_at !== startsAt) && { starts_at: startsAt },
                ...(event.ends_at !== endsAt) && { ends_at: endsAt },
                ...(event.venue_id !== Number(venueId)) && { venue_id: Number(venueId) }
            }
            const patchedEvent = await patchEvent(String(event.id), patch)
            if (patchedEvent) navigate(`/events/${event.id}`)
        }
    }






    if ((id === undefined)) {
        return (<>
            <form className="event-form" onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="title">
                    title
                    <input required value={title} id="title" type="text" onChange={(event) => setTitle(event.target.value)} />
                </label>
                <label htmlFor="description">
                    description
                    <textarea id="description" onChange={(event) => setDescription(event.target.value)} />
                </label>
                <label htmlFor="starts_at">
                    start date
                    <input required id="starts_at" type="datetime-local" onChange={(event) => setStartsAt(event.target.value)} />
                </label>
                <label htmlFor="ends_at">
                    end date
                    <input required id="ends_at" type="datetime-local" onChange={(event) => setEndsAt(event.target.value)} />
                </label>
                <select value={venueId} onChange={(event) => setVenueId(event.target.value)}>
                    <option value="" disabled>Select a venue</option>
                    {venues.map((venue) => <option key={venue.id} value={venue.id}>{venue.name}</option>)}
                </select>
                <button disabled={venueId === ""}>Submit</button>
            </form>
        </>)
    } else if (!isLoading && event !== null) {
        return (
            <form className="event-form" onSubmit={handleChangeSubmit}>
                <label htmlFor="title">
                    title
                    <input required id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label htmlFor="description">
                    description
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label htmlFor="starts_at">
                    start date
                    <input required id="starts_at" type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
                </label>
                <label htmlFor="ends_at">
                    end date
                    <input required id="ends_at" type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
                </label>
                <select required value={venueId} onChange={(e) => setVenueId(e.target.value)}>
                    <option value="" disabled>Select a venue</option>
                    {venues.map((venue) => <option key={venue.id} value={venue.id}>{venue.name}</option>)}
                </select>
                <button>Submit</button>
            </form>
        );
    }

}