import { useParams } from "react-router";
import EventDetail from "../components/event-components/EventDetail";
import { useEvent } from "../hooks/useEvent";

export default function EventDetailPage() {

    const { id } = useParams();
    if (typeof (id) == "undefined") {
        return <p>404 not Found: Event with id: {id} does not exist</p>
    }
    if (!Number(id) || Number(id) === 0) {
        return <>
            <p>Invalid Event id: {id}</p>
        </>
    }

    const { event } = useEvent(id);
    if (event === null) {
        return <p>no event found</p>
    }


    return (<>
        <EventDetail event={event} />
    </>)
}