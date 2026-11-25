import { useParams } from "react-router";
import EventDetail from "../components/event-components/EventDetail";
import { useEventDetails } from "../hooks/useEventDetails";

export default function EventDetailPage() {

    const { id } = useParams()
    const { event, error } = useEventDetails(id);

    if (id === undefined) return <p>Invalid event id: {id}</p>;
    if (error) return <p>{error}</p>;
    if (event === null) return <p>Loading...</p>;





    return (<>
        <EventDetail event={event} />
    </>)
}