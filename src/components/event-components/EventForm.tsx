
import { useState } from "react";
import { createEvent } from "../../api/events";
import useVenues from "../../hooks/useVenues";
import { useCreateEvent } from "../../hooks/useCreateEvent";
import { useNavigate } from "react-router";

export default function EventForm() {

    const {venues} = useVenues();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [startsAt,setStartsAt] = useState("");
    const [endsAt,setEndsAt] = useState("");
    const [venueId,setVenueId] = useState("");
    const { submitEvent, isSubmitting, createError } = useCreateEvent();
    const navigate = useNavigate()


    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault()
        const created = await submitEvent({title,description,starts_at:startsAt, ends_at: endsAt, venue_id: Number(venueId)})
        if(created) navigate(`/events/${created.id}`)
    }

    if(createError !== null){
        return <p>{createError}</p>
    }


    return (<>
        <form onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="title">
                title
                <input required value={title} id="title" type="text" onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label htmlFor="description">
                description
                <textarea id="description" onChange={(event) => setDescription(event.target.value)}/>
            </label>
            <label htmlFor="starts_at">
                start date
                <input required id="starts_at" type="datetime-local"  onChange={(event) => setStartsAt(event.target.value)}/>
            </label>
            <label htmlFor="ends_at">
                end date
                <input required id="ends_at" type="datetime-local" onChange={(event) => setEndsAt(event.target.value)}/>
            </label>
            <select value={venueId} onChange={(event) => setVenueId(event.target.value)}>
                <option value="" disabled>Select a venue</option>
                {venues.map((venue)=><option key={venue.id} value={venue.id}>{venue.name}</option>)}
            </select>
            <button>Submit</button>
        </form>
    </>)
}