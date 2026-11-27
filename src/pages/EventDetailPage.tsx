import { useNavigate, useParams } from "react-router";
import EventDetail from "../components/event-components/EventDetail";
import { useEventDetails } from "../hooks/useEventDetails";
import { RsvpButton } from "../components/rsvp/RSVPButton";
import { useUserEventList } from "../hooks/useUserEventsList";
import useUser from "../hooks/useUser";

export default function EventDetailPage() {


    const { id } = useParams()
    const { event, error } = useEventDetails(id);
    const { userEventListState, refetch } = useUserEventList()
    const navigate = useNavigate();
    const { userState } = useUser();





    if (id === undefined) return <p>Invalid event id: {id}</p>;
    if (error) return <p>{error}</p>;
    if (event === null) return <p>Loading...</p>;
    if (userState.status === "loading" || userEventListState.status === "loading") return <p>Loading...</p>;
    if (error || userEventListState.status === "error") return <p>Something went wrong. {userEventListState.status === "error" && userEventListState.msg}</p>;
    if (!event) return <p>Loading...</p>;
    return (<>
        <EventDetail event={event} />
        <div className="rsvpbutton-container">
            <RsvpButton userEventList={userEventListState.status === "success" ? userEventListState.userRsvpEventList.events : []} refetch={() => refetch((count) => count + 1)} event={event} />
        </div>
        <hr />

        {userState.status === "success" && userState.user.id === event.organiser_id && (
            <section>
                <button type="button" onClick={() => navigate(`/events/${id}/attendees`)}>
                    Attendees list
                </button>
                <button type="button" id="edit-button" onClick={() => navigate(`/events/${id}/edit`)}>
                    edit event
                </button>
            </section>


        )}

    </>)
}